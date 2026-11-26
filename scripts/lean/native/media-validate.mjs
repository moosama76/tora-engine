/** Pure Uint8Array validators for compressed MP3 audio and Tora binary 3D meshes (browser + Node safe). */

export const AUDIO_MIMES = Object.freeze(['audio/wav', 'audio/mpeg']);
export const isAudioMime = mime => mime === 'audio/wav' || mime === 'audio/mpeg';

const MPEG1_L3_BITRATES = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
const MPEG2_L3_BITRATES = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
const SAMPLE_RATES = {
  3: [44100, 48000, 32000], // MPEG 1
  2: [22050, 24000, 16000], // MPEG 2
  0: [11025, 12000, 8000],  // MPEG 2.5
};

function fail(code, message) {
  const err = Error(message ?? code);
  err.code = code;
  throw err;
}

/** Validate bounded MPEG Layer III (MP3) frames and return stream stats. */
export function validateMp3(bytes, code = 'E_AUDIO_MP3_MALFORMED', maxBytes = 700000) {
  if (!(bytes instanceof Uint8Array) || bytes.length < 16 || bytes.length > maxBytes) fail(code);
  let offset = 0;
  // Skip optional ID3v2 tag header
  if (bytes.length >= 10 && bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
    if (bytes[3] === 0xff || bytes[4] === 0xff) fail(code);
    const s0 = bytes[6], s1 = bytes[7], s2 = bytes[8], s3 = bytes[9];
    if ((s0 | s1 | s2 | s3) & 0x80) fail(code);
    const tagSize = (s0 << 21) | (s1 << 14) | (s2 << 7) | s3;
    const footer = (bytes[5] & 0x10) ? 10 : 0;
    offset = 10 + tagSize + footer;
    if (offset >= bytes.length) fail(code);
  }
  let frames = 0, totalSamples = 0, sampleRate = 0, channels = 0;
  // Allow optional trailing ID3v1 tag (128 bytes starting with "TAG")
  let endLimit = bytes.length;
  if (endLimit >= offset + 128 && bytes[endLimit - 128] === 0x54 && bytes[endLimit - 127] === 0x41 && bytes[endLimit - 126] === 0x47) {
    endLimit -= 128;
  }
  while (offset + 4 <= endLimit) {
    const b0 = bytes[offset], b1 = bytes[offset + 1], b2 = bytes[offset + 2], b3 = bytes[offset + 3];
    if (b0 !== 0xff || (b1 & 0xe0) !== 0xe0) {
      if (frames === 0 && offset < 64) { offset++; continue; }
      break;
    }
    const version = (b1 >> 3) & 3;
    const layer = (b1 >> 1) & 3;
    const bitrateIdx = (b2 >> 4) & 0xf;
    const srIdx = (b2 >> 2) & 3;
    const padding = (b2 >> 1) & 1;
    const channelMode = (b3 >> 6) & 3;
    if (version === 1 || layer !== 1 || bitrateIdx === 0 || bitrateIdx === 15 || srIdx === 3) fail(code);
    const bitrate = (version === 3 ? MPEG1_L3_BITRATES[bitrateIdx] : MPEG2_L3_BITRATES[bitrateIdx]) * 1000;
    const sr = SAMPLE_RATES[version]?.[srIdx];
    if (!bitrate || !sr) fail(code);
    const samplesPerFrame = version === 3 ? 1152 : 576;
    const coef = version === 3 ? 144 : 72;
    const frameLen = Math.floor((coef * bitrate) / sr) + padding;
    if (frameLen < 4 || offset + frameLen > bytes.length) fail(code);
    if (frames === 0) {
      sampleRate = sr;
      channels = channelMode === 3 ? 1 : 2;
    }
    frames++;
    totalSamples += samplesPerFrame;
    offset += frameLen;
  }
  if (frames < 1 || !sampleRate) fail(code);
  const durationSec = totalSamples / sampleRate;
  if (durationSec <= 0 || durationSec > 120) fail(code);
  return {frames, sampleRate, channels, totalSamples, durationSec};
}

/** Validate TORA3DM1 binary mesh container: 8-byte magic, u32 verts, u32 indices, f32[verts*8], u16[indices]. */
export function validateToraMesh(bytes, code = 'E_NATIVE_MESH_MALFORMED') {
  if (!(bytes instanceof Uint8Array) || bytes.length < 16 || bytes.length > 700000) fail(code);
  const magic = String.fromCharCode(...bytes.subarray(0, 8));
  if (magic !== 'TORA3DM1') fail(code);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const vertexCount = view.getUint32(8, true);
  const indexCount = view.getUint32(12, true);
  if (vertexCount < 1 || vertexCount > 65535 || indexCount < 3 || indexCount > 196605 || indexCount % 3 !== 0) fail(code);
  const expectedBytes = 16 + vertexCount * 32 + indexCount * 2;
  if (bytes.length !== expectedBytes) fail(code);
  const floatCount = vertexCount * 8;
  for (let i = 0; i < floatCount; i++) {
    const v = view.getFloat32(16 + i * 4, true);
    if (!Number.isFinite(v)) fail(code);
  }
  const indexStart = 16 + vertexCount * 32;
  for (let i = 0; i < indexCount; i++) {
    if (view.getUint16(indexStart + i * 2, true) >= vertexCount) fail(code);
  }
  return {vertexCount, indexCount};
}
