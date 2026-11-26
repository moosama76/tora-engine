import {execFile} from 'node:child_process';
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {promisify} from 'node:util';
import {Buffer} from 'node:buffer';
import {validateMp3} from './media-validate.mjs';

const run = promisify(execFile);
const MAX_AUDIO_BYTES = 700_000;

function invalid(code = 'E_NATIVE_ASSET_DECODE') {
  throw Error(code);
}

export function parseWav(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length < 44 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE' || bytes.readUInt32LE(4) + 8 !== bytes.length) invalid();
  let offset = 12, format;
  const chunks = [];
  while (offset + 8 <= bytes.length) {
    const type = bytes.toString('ascii', offset, offset + 4), size = bytes.readUInt32LE(offset + 4);
    if (offset + 8 + size > bytes.length) invalid();
    if (type === 'fmt ') {
      if (size < 16 || bytes.readUInt16LE(offset + 8) !== 1) invalid();
      const channels = bytes.readUInt16LE(offset + 10), sampleRate = bytes.readUInt32LE(offset + 12), bits = bytes.readUInt16LE(offset + 22);
      const alignment = channels * bits / 8;
      if (![1, 2].includes(channels) || ![8, 16].includes(bits) || sampleRate < 8000 || sampleRate > 48000 || bytes.readUInt16LE(offset + 20) !== alignment || bytes.readUInt32LE(offset + 16) !== sampleRate * alignment) invalid();
      format = {channels, sampleRate, bits, alignment};
    }
    if (type === 'data') {
      if (!size || chunks.some(chunk => chunk.type === 'data')) invalid();
      chunks.push({type, offset: offset + 8, size});
    }
    offset += 8 + size + size % 2;
  }
  const data = chunks.find(chunk => chunk.type === 'data');
  if (!format || !data || data.size % format.alignment || data.size / format.alignment / format.sampleRate > 120 || offset !== bytes.length) invalid();
  return {...format, data};
}

export function validateWav(bytes) {
  parseWav(bytes);
}

function pcm(bytes, wav) {
  const frames = wav.data.size / wav.alignment, samples = new Float64Array(frames);
  for (let frame = 0; frame < frames; frame++) {
    let total = 0;
    for (let channel = 0; channel < wav.channels; channel++) {
      const offset = wav.data.offset + frame * wav.alignment + channel * (wav.bits / 8);
      total += wav.bits === 8 ? (bytes[offset] - 128) / 128 : bytes.readInt16LE(offset) / 32768;
    }
    samples[frame] = total / wav.channels;
  }
  return samples;
}

function prepareSamples(bytes, wav, operations) {
  let samples = pcm(bytes, wav);
  const threshold = 0.003, pad = Math.round(wav.sampleRate * 0.012);
  let first = samples.findIndex(sample => Math.abs(sample) >= threshold);
  if (first < 0) first = 0;
  let last = samples.length - 1;
  while (last > first && Math.abs(samples[last]) < threshold) last--;
  const start = Math.max(0, first - pad), end = Math.min(samples.length, last + pad + 1);
  if (start > 0 || end < samples.length) {
    samples = samples.slice(start, end);
    operations.push('trim-silence:threshold-0.003;pad-12ms');
  }
  const fade = Math.min(Math.round(wav.sampleRate * 0.01), Math.floor(samples.length / 2));
  for (let index = 0; index < fade; index++) {
    samples[index] *= index / fade;
    samples[samples.length - 1 - index] *= index / fade;
  }
  if (fade) operations.push('anti-click-fades:10ms');
  let peak = 0;
  for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
  if (peak > 0) {
    const scale = 0.89 / peak;
    for (let index = 0; index < samples.length; index++) samples[index] *= scale;
    operations.push('peak-normalize:-1dBFS');
  }
  return samples;
}

function resample(samples, sourceRate, targetRate) {
  if (sourceRate === targetRate) return samples;
  const length = Math.max(1, Math.round(samples.length * targetRate / sourceRate)), output = new Float64Array(length);
  for (let index = 0; index < length; index++) {
    const position = index * sourceRate / targetRate, left = Math.min(samples.length - 1, Math.floor(position)), right = Math.min(samples.length - 1, left + 1), fraction = position - left;
    output[index] = samples[left] * (1 - fraction) + samples[right] * fraction;
  }
  return output;
}

function encodeWav(samples, sampleRate, bits) {
  const dataSize = samples.length * bits / 8, bytes = Buffer.alloc(44 + dataSize);
  bytes.write('RIFF', 0); bytes.writeUInt32LE(36 + dataSize, 4); bytes.write('WAVE', 8); bytes.write('fmt ', 12);
  bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22); bytes.writeUInt32LE(sampleRate, 24);
  bytes.writeUInt32LE(sampleRate * bits / 8, 28); bytes.writeUInt16LE(bits / 8, 32); bytes.writeUInt16LE(bits, 34); bytes.write('data', 36); bytes.writeUInt32LE(dataSize, 40);
  for (let index = 0; index < samples.length; index++) {
    const value = Math.max(-1, Math.min(1, samples[index]));
    if (bits === 8) bytes[44 + index] = Math.round((value + 1) * 127.5);
    else bytes.writeInt16LE(Math.round(value * 32767), 44 + index * 2);
  }
  validateWav(bytes);
  return bytes;
}

let encoderPromise;
async function detectEncoder() {
  for (const [name, args] of [['gst-launch-1.0', ['--version']], ['ffmpeg', ['-version']]]) {
    try {
      await run(name, args, {timeout: 5000, maxBuffer: 65536, windowsHide: true});
      if (name === 'ffmpeg') {
        try { await run('ffmpeg', ['-v', 'error', '-h', 'encoder=libmp3lame'], {timeout: 5000, maxBuffer: 65536, windowsHide: true}); }
        catch { continue; }
      } else {
        try { await run('gst-inspect-1.0', ['lamemp3enc'], {timeout: 5000, maxBuffer: 65536, windowsHide: true}); }
        catch { continue; }
      }
      return name;
    } catch { /* Try the next optional local encoder. */ }
  }
  return undefined;
}

async function encodeMp3(input, output, bitrate, encoder, preparedWav) {
  if (encoder === 'gst-launch-1.0') {
    const parser = preparedWav ? 'wavparse' : 'decodebin';
    await run(encoder, ['-q', 'filesrc', `location=${input}`, '!', parser, '!', 'audioconvert', '!', 'audioresample', '!', 'audio/x-raw,format=S16LE,channels=1,rate=22050', '!', 'lamemp3enc', 'target=bitrate', `bitrate=${bitrate}`, 'cbr=true', '!', 'filesink', `location=${output}`], {timeout: 30000, maxBuffer: 65536, windowsHide: true});
  } else {
    const args = ['-v', 'error', '-y', '-i', input, '-map_metadata', '-1', '-ac', '1', '-ar', '22050', '-c:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-write_xing', '0', output];
    await run('ffmpeg', args, {timeout: 30000, maxBuffer: 65536, windowsHide: true});
  }
  const bytes = await readFile(output);
  validateMp3(bytes, 'E_NATIVE_ASSET_DECODE');
  if (bytes.length > MAX_AUDIO_BYTES) invalid('E_NATIVE_ASSET_SIZE');
  return {bytes, operations: [`mp3:${bitrate}kbps-cbr;22050hz-mono`, ...(preparedWav ? ['normalized-wav-source'] : [])]};
}

export async function optimizeAudio(input, mime, {mode = 'auto', stagingDir} = {}) {
  if (!(input instanceof Uint8Array) || !input.length || input.length > 8 * 1024 * 1024 || !['auto', 'lossless', 'none'].includes(mode)) invalid('E_NATIVE_ASSET_SIZE');
  const bytes = Buffer.from(input.buffer, input.byteOffset, input.byteLength);
  if (mime === 'audio/mpeg') validateMp3(bytes, 'E_NATIVE_ASSET_DECODE', 8 * 1024 * 1024);
  else if (mime === 'audio/wav') validateWav(bytes);
  else invalid('E_NATIVE_ASSET_MIME');
  const unchanged = (operations = ['retain-original-audio']) => ({bytes, mime, operations, originalBytes: bytes.length, optimizedBytes: bytes.length, encoder: 'none'});
  if (mode === 'none' || mode === 'lossless' || (mime === 'audio/mpeg' && bytes.length <= 250_000)) {
    if (bytes.length > MAX_AUDIO_BYTES) invalid('E_NATIVE_ASSET_SIZE');
    return unchanged(mode === 'none' ? ['validate-only;original-bytes'] : undefined);
  }
  const encoder = await (encoderPromise ??= detectEncoder());
  if (mime === 'audio/mpeg' && !encoder) {
    if (bytes.length <= MAX_AUDIO_BYTES) return unchanged(['retain-valid-mp3;no-local-encoder']);
    invalid('E_NATIVE_ASSET_SIZE');
  }
  if (!encoder) {
    if (mime !== 'audio/wav') invalid('E_NATIVE_ASSET_SIZE');
    const operations = [], wav = parseWav(bytes), samples = prepareSamples(bytes, wav, operations);
    for (const [sampleRate, bits] of [[22050, 16], [16000, 16], [16000, 8], [11025, 16], [11025, 8]]) {
      const output = encodeWav(resample(samples, wav.sampleRate, sampleRate), sampleRate, bits);
      if (output.length <= MAX_AUDIO_BYTES) {
        operations.push(`pcm-wav:${sampleRate}hz-mono-${bits}bit`);
        return {bytes: output, mime: 'audio/wav', operations, originalBytes: bytes.length, optimizedBytes: output.length, encoder: 'node-pcm'};
      }
    }
    invalid('E_NATIVE_ASSET_SIZE');
  }
  if (!stagingDir) invalid('E_NATIVE_ASSET_WRITE');
  const stage = await mkdtemp(resolve(stagingDir, '.audio-'));
  try {
    const operations = [];
    let inputPath = resolve(stage, 'source');
    if (mime === 'audio/wav') {
      const wav = parseWav(bytes), samples = prepareSamples(bytes, wav, operations), normalized = encodeWav(resample(samples, wav.sampleRate, 22050), 22050, 16);
      inputPath = resolve(stage, 'normalized.wav');
      await writeFile(inputPath, normalized);
    } else {
      await writeFile(inputPath, bytes);
    }
    const duration = mime === 'audio/wav' ? parseWav(bytes).data.size / parseWav(bytes).alignment / parseWav(bytes).sampleRate : 0;
    for (const bitrate of [...new Set(duration > 15 ? [32, 48] : [48, 32])]) {
      try {
        const result = await encodeMp3(inputPath, resolve(stage, `output-${bitrate}.mp3`), bitrate, encoder, mime === 'audio/wav');
        return {bytes: result.bytes, mime: 'audio/mpeg', operations: [...operations, ...result.operations], originalBytes: bytes.length, optimizedBytes: result.bytes.length, encoder};
      } catch (error) {
        if (bitrate === 32) throw error;
      }
    }
    invalid('E_NATIVE_ASSET_SIZE');
  } finally {
    await rm(stage, {recursive: true, force: true});
  }
}
