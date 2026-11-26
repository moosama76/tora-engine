use crate::{PackError, error};
use crc32fast::Hasher;
use flate2::read::DeflateDecoder;
use std::{collections::BTreeSet, io::Read};

pub struct ZipEntry {
    pub name: String,
    pub bytes: Vec<u8>,
}
fn u16_at(bytes: &[u8], offset: usize) -> Result<u16, PackError> {
    Ok(u16::from_le_bytes(
        bytes
            .get(offset..offset + 2)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Truncated ZIP u16"))?
            .try_into()
            .map_err(|e| error("E_ARTIFACT_PACKAGE", e))?,
    ))
}
fn u32_at(bytes: &[u8], offset: usize) -> Result<u32, PackError> {
    Ok(u32::from_le_bytes(
        bytes
            .get(offset..offset + 4)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Truncated ZIP u32"))?
            .try_into()
            .map_err(|e| error("E_ARTIFACT_PACKAGE", e))?,
    ))
}
fn valid_name(name: &str) -> bool {
    !name.is_empty()
        && name.len() <= 240
        && !name.starts_with('/')
        && !name.ends_with('/')
        && !name.contains(['\\', '\0'])
        && name
            .split('/')
            .all(|part| !part.is_empty() && part != "." && part != ".." && !part.contains(':'))
}

pub fn read(bytes: &[u8]) -> Result<Vec<ZipEntry>, PackError> {
    if bytes.len() < 22 || bytes.len() > crate::MAX_HTML_BYTES {
        return Err(error("E_ARTIFACT_PACKAGE", "ZIP size outside local bounds"));
    }
    let mut eocd = None;
    for offset in (bytes.len().saturating_sub(65_557)..=bytes.len() - 22).rev() {
        if bytes.get(offset..offset + 4) == Some(&[0x50, 0x4b, 0x05, 0x06]) {
            eocd = Some(offset);
            break;
        }
    }
    let eocd = eocd.ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Missing ZIP end record"))?;
    if eocd + 22 != bytes.len() || u16_at(bytes, eocd + 20)? != 0 {
        return Err(error("E_ARTIFACT_PACKAGE", "ZIP comments are forbidden"));
    }
    let count = u16_at(bytes, eocd + 8)? as usize;
    if count == 0
        || count > 16
        || u16_at(bytes, eocd + 10)? as usize != count
        || u16_at(bytes, eocd + 4)? != 0
        || u16_at(bytes, eocd + 6)? != 0
    {
        return Err(error(
            "E_ARTIFACT_PACKAGE",
            "Unsupported ZIP entry count/disk",
        ));
    }
    let directory_size = u32_at(bytes, eocd + 12)? as usize;
    let directory_offset = u32_at(bytes, eocd + 16)? as usize;
    if directory_offset.checked_add(directory_size) != Some(eocd) {
        return Err(error("E_ARTIFACT_PACKAGE", "Invalid ZIP directory bounds"));
    }
    let mut cursor = directory_offset;
    let mut names = BTreeSet::new();
    let mut entries = Vec::new();
    let mut total = 0usize;
    for _ in 0..count {
        if u32_at(bytes, cursor)? != 0x0201_4b50 {
            return Err(error("E_ARTIFACT_PACKAGE", "Invalid ZIP directory entry"));
        }
        let flags = u16_at(bytes, cursor + 8)?;
        let method = u16_at(bytes, cursor + 10)?;
        let crc = u32_at(bytes, cursor + 16)?;
        let compressed_size = u32_at(bytes, cursor + 20)? as usize;
        let size = u32_at(bytes, cursor + 24)? as usize;
        let name_length = u16_at(bytes, cursor + 28)? as usize;
        let extra_length = u16_at(bytes, cursor + 30)? as usize;
        let comment_length = u16_at(bytes, cursor + 32)? as usize;
        let attributes = u32_at(bytes, cursor + 38)?;
        let local_offset = u32_at(bytes, cursor + 42)? as usize;
        if flags != 0x0800
            || method != 8
            || attributes & 0x10 != 0
            || (attributes >> 16) & 0xa000 != 0
        {
            return Err(error(
                "E_ARTIFACT_PACKAGE",
                "ZIP flags/method/file type forbidden",
            ));
        }
        let name_bytes = bytes
            .get(cursor + 46..cursor + 46 + name_length)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Truncated ZIP filename"))?;
        let name = std::str::from_utf8(name_bytes).map_err(|e| error("E_ARTIFACT_PACKAGE", e))?;
        if !valid_name(name) || !names.insert(name.to_owned()) {
            return Err(error("E_ARTIFACT_PACKAGE", "Invalid or duplicate ZIP path"));
        }
        total = total
            .checked_add(size)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "ZIP size overflow"))?;
        if total > 12 * 1024 * 1024 {
            return Err(error(
                "E_ARTIFACT_PACKAGE",
                "ZIP decompressed bound exceeded",
            ));
        }
        if u32_at(bytes, local_offset)? != 0x0403_4b50
            || u16_at(bytes, local_offset + 6)? != flags
            || u16_at(bytes, local_offset + 8)? != method
        {
            return Err(error("E_ARTIFACT_PACKAGE", "ZIP local header mismatch"));
        }
        let local_name = u16_at(bytes, local_offset + 26)? as usize;
        let local_extra = u16_at(bytes, local_offset + 28)? as usize;
        if bytes.get(local_offset + 30..local_offset + 30 + local_name) != Some(name_bytes) {
            return Err(error("E_ARTIFACT_PACKAGE", "ZIP local filename mismatch"));
        }
        let data_offset = local_offset
            .checked_add(30 + local_name + local_extra)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "ZIP offset overflow"))?;
        let compressed = bytes
            .get(data_offset..data_offset + compressed_size)
            .filter(|_| data_offset + compressed_size <= directory_offset)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Invalid compressed data bounds"))?;
        let mut output = Vec::with_capacity(size.min(1024 * 1024));
        DeflateDecoder::new(compressed)
            .take(size as u64 + 1)
            .read_to_end(&mut output)
            .map_err(|e| error("E_ARTIFACT_PACKAGE", e))?;
        let mut hasher = Hasher::new();
        hasher.update(&output);
        if output.len() != size || hasher.finalize() != crc {
            return Err(error("E_ARTIFACT_PACKAGE", "ZIP size or CRC32 mismatch"));
        }
        entries.push(ZipEntry {
            name: name.into(),
            bytes: output,
        });
        cursor = cursor
            .checked_add(46 + name_length + extra_length + comment_length)
            .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "ZIP directory overflow"))?;
    }
    if cursor != eocd {
        return Err(error("E_ARTIFACT_PACKAGE", "ZIP directory length mismatch"));
    }
    Ok(entries)
}
