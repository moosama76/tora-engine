import {deflateRawSync, inflateRawSync} from 'node:zlib';
import {Buffer} from 'node:buffer';

const CRC_TABLE = Uint32Array.from({length: 256}, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit++) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});
export function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function validName(name) {
  return typeof name === 'string' && name.length > 0 && name.length <= 240 && !name.startsWith('/') && !name.endsWith('/') && !name.includes('\\') && !name.includes('\0') && !name.split('/').some(part => !part || part === '.' || part === '..' || part.includes(':'));
}
function fail(code = 'E_ARTIFACT_PACKAGE') { throw Error(code); }

export function createZip(entries) {
  const normalized = (Array.isArray(entries) ? entries : Object.entries(entries).map(([name, bytes]) => ({name, bytes})))
    .map(({name, bytes}) => ({name, bytes: Buffer.from(bytes)}));
  if (!normalized.length || normalized.length > 16 || normalized.some(entry => !validName(entry.name)) || new Set(normalized.map(entry => entry.name)).size !== normalized.length) fail();
  normalized.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  if (normalized.reduce((total, entry) => total + entry.bytes.length, 0) > 12 * 1024 * 1024) fail();
  const local = [], central = [];
  let offset = 0;
  for (const {name, bytes} of normalized) {
    const filename = Buffer.from(name), compressed = deflateRawSync(bytes, {level: 9}), crc = crc32(bytes);
    const header = Buffer.alloc(30 + filename.length);
    header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x0800, 6); header.writeUInt16LE(8, 8);
    header.writeUInt16LE(0, 10); header.writeUInt16LE(33, 12); header.writeUInt32LE(crc, 14); header.writeUInt32LE(compressed.length, 18); header.writeUInt32LE(bytes.length, 22);
    header.writeUInt16LE(filename.length, 26); header.writeUInt16LE(0, 28); filename.copy(header, 30);
    local.push(header, compressed);
    const directory = Buffer.alloc(46 + filename.length);
    directory.writeUInt32LE(0x02014b50, 0); directory.writeUInt16LE(20, 4); directory.writeUInt16LE(20, 6); directory.writeUInt16LE(0x0800, 8); directory.writeUInt16LE(8, 10);
    directory.writeUInt16LE(0, 12); directory.writeUInt16LE(33, 14); directory.writeUInt32LE(crc, 16); directory.writeUInt32LE(compressed.length, 20); directory.writeUInt32LE(bytes.length, 24);
    directory.writeUInt16LE(filename.length, 28); directory.writeUInt16LE(0, 30); directory.writeUInt16LE(0, 32); directory.writeUInt16LE(0, 34); directory.writeUInt16LE(0, 36); directory.writeUInt32LE(0, 38); directory.writeUInt32LE(offset, 42); filename.copy(directory, 46);
    central.push(directory);
    offset += header.length + compressed.length;
  }
  const directoryBytes = Buffer.concat(central), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6); end.writeUInt16LE(normalized.length, 8); end.writeUInt16LE(normalized.length, 10);
  end.writeUInt32LE(directoryBytes.length, 12); end.writeUInt32LE(offset, 16); end.writeUInt16LE(0, 20);
  return Buffer.concat([...local, directoryBytes, end]);
}

export function readZip(input) {
  const bytes = Buffer.from(input);
  if (bytes.length < 22 || bytes.length > 16 * 1024 * 1024) fail();
  let eocd = -1;
  for (let offset = bytes.length - 22; offset >= Math.max(0, bytes.length - 65557); offset--) {
    if (bytes.readUInt32LE(offset) === 0x06054b50) { eocd = offset; break; }
  }
  if (eocd < 0 || eocd + 22 !== bytes.length) fail();
  const count = bytes.readUInt16LE(eocd + 8), directorySize = bytes.readUInt32LE(eocd + 12), directoryOffset = bytes.readUInt32LE(eocd + 16);
  if (!count || count > 16 || bytes.readUInt16LE(eocd + 10) !== count || bytes.readUInt16LE(eocd + 4) || bytes.readUInt16LE(eocd + 6) || directoryOffset + directorySize !== eocd) fail();
  const entries = [], names = new Set();
  let cursor = directoryOffset, total = 0;
  for (let index = 0; index < count; index++) {
    if (cursor + 46 > eocd || bytes.readUInt32LE(cursor) !== 0x02014b50) fail();
    const flags = bytes.readUInt16LE(cursor + 8), method = bytes.readUInt16LE(cursor + 10), crc = bytes.readUInt32LE(cursor + 16), compressedSize = bytes.readUInt32LE(cursor + 20), size = bytes.readUInt32LE(cursor + 24);
    const nameLength = bytes.readUInt16LE(cursor + 28), extraLength = bytes.readUInt16LE(cursor + 30), commentLength = bytes.readUInt16LE(cursor + 32), localOffset = bytes.readUInt32LE(cursor + 42), attributes = bytes.readUInt32LE(cursor + 38);
    if (flags !== 0x0800 || method !== 8 || attributes & 0x10 || (attributes >>> 16) & 0xa000) fail();
    const name = bytes.toString('utf8', cursor + 46, cursor + 46 + nameLength);
    if (!validName(name) || names.has(name)) fail(); names.add(name);
    total += size; if (total > 12 * 1024 * 1024 || size > 12 * 1024 * 1024) fail();
    if (localOffset + 30 > directoryOffset || bytes.readUInt32LE(localOffset) !== 0x04034b50 || bytes.readUInt16LE(localOffset + 6) !== flags || bytes.readUInt16LE(localOffset + 8) !== method) fail();
    const localNameLength = bytes.readUInt16LE(localOffset + 26), localExtraLength = bytes.readUInt16LE(localOffset + 28), dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    if (bytes.toString('utf8', localOffset + 30, localOffset + 30 + localNameLength) !== name || dataOffset + compressedSize > directoryOffset) fail();
    let data;
    try { data = inflateRawSync(bytes.subarray(dataOffset, dataOffset + compressedSize), {maxOutputLength: size + 1}); }
    catch { fail(); }
    if (data.length !== size || crc32(data) !== crc) fail();
    entries.push({name, bytes: data});
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  if (cursor !== eocd) fail();
  return entries;
}
