/* global document,window,fetch,navigator,btoa,crypto,ResizeObserver,Blob,URL,Image,OfflineAudioContext,setTimeout,clearTimeout,setInterval */


export const errorLabels = {
  E_NATIVE_STALE: 'The playable changed in another session. Refresh before submitting this message.',
  E_REVIEW_STALE: 'The playable changed after this message was written. Send a new message on the current version.',
  E_REVIEW_LIMIT: 'This request reached its revision pass limit. Reuse the note to start a fresh request.',
  E_REVIEW_CONFLICT: 'Two notes propose conflicting changes. Adjust one of them and retry.',
  E_REVIEW_SCOPE: 'The proposal tried to edit outside the allowed scope.',
  E_REVIEW_NO_CHANGE: 'The proposal repeated the current values.',
  E_REVIEW_TEXT_FIT: 'That wording is too wide for the space or uses unsupported characters.',
  E_REVIEW_VALUE: 'That value is outside the supported range.',
  E_REVIEW_BUILD: 'Tora could not package this candidate.',
  E_REVIEW_MODEL_NOT_CONFIGURED: 'Connect a verified playable-ready API key (or use MCP) to run open-ended revisions.',
  E_REVIEW_MODEL_BUSY: 'A revision is already in progress.',
  E_REVIEW_MODEL_RESPONSE: 'The connected model returned a response Tora could not apply.',
  E_REVIEW_AGENT_LIMIT: 'This request reached its turn limit. Try a more focused message.',
  E_MODEL_INPUT_LIMIT: 'This request exceeded the model context budget. Try a narrower edit.',
  E_REVIEW_NOTE_COVERAGE: 'The model could not produce a verified change for every note.',
  E_REVIEW_OUTCOME_AUDIO_MISSING: 'The packaged candidate did not play the requested outcome sound.',
  E_REVIEW_OUTCOME_AUDIO_MISMATCH: 'The packaged candidate played a different sound than requested.',
  E_REVIEW_WIN_AUDIO_MUST_BE_NEW: 'The proposed win sound already exists in the playable.',
  E_REVIEW_KEY_FORMAT: 'Enter a valid API key (8+ visible characters, no spaces or line breaks).',
  E_REVIEW_KEY_SAVE: 'Tora could not save the API connection on this machine.',
  E_MODEL_UNSUPPORTED_CAPABILITY: 'This API or model is not verified for full playable-ad creation (requires tool calling, vision, and full audio/QA support). Choose Gemini, OpenAI, or Claude.',
  E_MODEL_UNAVAILABLE: 'Your API key does not have access to that model. Pick another verified model or check your account tier.',
  E_MODEL_AUTH: 'The provider rejected that API key. Check the key and try again.',
  E_MODEL_FORBIDDEN: 'This API key does not have permission for that model.',
  E_MODEL_QUOTA: 'That API account has reached its billing quota. Check your provider balance and retry.',
  E_MODEL_FREE_ACCESS: 'This legacy free route requires an eligible GitHub account.',
  E_MODEL_FREE_PROMPT_LIMIT: 'These notes exceed the legacy free prompt limit.',
  E_MODEL_FREE_CAPACITY: 'The model is temporarily at capacity. Try again shortly.',
  E_MODEL_RATE_LIMIT: 'The provider rate-limited this request. Try again shortly.',
  E_MODEL_UPSTREAM: 'The provider is temporarily unavailable. Try again shortly.',
  E_MODEL_REQUEST: 'The provider rejected the request. Check your model access and key.',
  E_MODEL_HTTP: 'The provider rejected the request. Check your API key and account limits.',
  E_MODEL_TIMEOUT: 'The provider took too long to respond.',
  E_MODEL_TRANSPORT: 'Tora could not reach the provider API. Check your internet connection.',
  E_MODEL_INCOMPLETE: 'The model returned an incomplete answer.',
  E_CREATIVE_QA: 'Creative QA found a layout, audio, or interaction blocker that prevented staging.',
  E_INTAKE_HARVEST_MEDIA: 'Attach at least 5 distinct PNG/JPEG game sprites plus a WAV sound (or switch audio to a Free CC0 pack).',
  E_INTAKE_SALVAGE_MEDIA: 'Attach at least 4 distinct PNG/JPEG game sprites plus a WAV sound (or switch audio to a Free CC0 pack).',
  E_NATIVE_ASSET_DECODE: 'One of those files could not be decoded as a valid PNG, JPEG, or PCM WAV.',
  E_NATIVE_ASSET_SIZE: 'Each game asset must be 700 KB or smaller.',
  E_INTAKE_ASSET_SIZE: 'Each uploaded file must be 700 KB or smaller.',
  E_INTAKE_MEDIA_REQUIRED: 'Attach your game art or audio files first, or slide to Free assets only.',
  E_BYOK_NOT_CONFIGURED: 'Connect a verified API key (Gemini, OpenAI, or Claude) to build directly from Send.',
  E_BUILD_CANCELLED: 'Build cancelled.',
  E_BUILD_INTERRUPTED: 'The build was interrupted by a server restart. Click Retry build to continue.',
  E_CREATOR_TURN_CAP: 'The build reached its 12-turn safety limit. Retry to continue from the saved draft.',
  E_ASSET_SOURCE_DISALLOWED: 'That asset source is blocked by your current Asset & sound source slider setting.',
  E_ASSET_STYLE_FAMILY: 'Keep visual artwork within one consistent art style family.',
  E_NATIVE_UNSUPPORTED_TARGET: 'That export target is not supported yet.',
  E_UPLOAD_SIZE: 'This playable exceeds the selected network upload size limit.',
  E_NATIVE_STORE: 'Enter a valid Google Play or App Store URL before exporting for this network.',
  E_ARTIFACT_PLACEHOLDER: 'Replace the placeholder store link with your real Google Play or App Store URL before exporting.',
  E_PROJECT_EXISTS: 'A project with that ID already exists. Try a different title or project ID.',
};

export async function reviewRequest(path, body) {
  if (globalThis.toraHostedReview) return globalThis.toraHostedReview.request(path, body);
  const response = await fetch(path, body
    ? {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}
    : {cache: 'no-store'});
  const result = await response.json();
  if (!response.ok) throw Error(result.error ?? 'The request failed.');
  return result;
}

export function reviewElement(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function reviewShell(markup) {
  document.body.className = 'tora-review';
  document.body.innerHTML = markup;
  return id => document.getElementById(id);
}

export async function copyInstruction(field, status) {
  try {
    await navigator.clipboard.writeText(field.value);
    if (status) status.textContent = 'Agent instruction copied.';
  } catch {
    field.focus();
    field.select();
    if (status) status.textContent = 'Instruction selected — press Ctrl/Cmd+C to copy.';
  }
}

export function bytesToBase64(bytes) {
  let binary = '';
  for (let start = 0; start < bytes.length; start += 8192)
    binary += String.fromCharCode(...bytes.subarray(start, start + 8192));
  return btoa(binary);
}

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 102.4) / 10 + ' KB';
  return Math.round(bytes / 104857.6) / 10 + ' MB';
}

export function wireAutoGrowTextarea(textarea, {onSubmit, maxHeight = 160} = {}) {
  const resize = () => {
    textarea.style.height = '40px';
    const next = Math.min(maxHeight, Math.max(40, textarea.scrollHeight));
    textarea.style.height = next + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };
  textarea.addEventListener('input', resize);
  textarea.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      onSubmit?.();
    }
  });
  return resize;
}

export function wirePopoverMenu(button, menu) {
  const close = () => {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => {
    const next = menu.hidden;
    menu.hidden = !next;
    button.setAttribute('aria-expanded', String(next));
  };
  button.addEventListener('click', event => {
    event.stopPropagation();
    toggle();
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== button) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      close();
      button.focus();
    }
  });
  return {close, toggle};
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(Error('Could not decode image preview.'));
    image.src = src;
  });
}

async function encodeCanvasJpeg(source, maxDimension, quality = 0.78) {
  const width = source.videoWidth || source.naturalWidth || source.width;
  const height = source.videoHeight || source.naturalHeight || source.height;
  if (!width || !height) throw Error('Image or video frame has empty dimensions.');
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', quality);
  return {mime: 'image/jpeg', data: dataUrl.split(',')[1], previewUrl: dataUrl};
}

export async function prepareImageFile(file, {asReference = false, maxBytes = 700000} = {}) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const directMime = {png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg'}[ext];
  if (!asReference) {
    if (!directMime) throw Error(file.name + ': supply PNG or JPEG files for game sprites.');
    if (file.size > maxBytes) throw Error(file.name + ' exceeds the 700 KB game-asset limit.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    const data = bytesToBase64(bytes);
    return {
      kind: 'asset',
      name: file.name,
      mime: directMime,
      data,
      bytes: bytes.length,
      previewUrl: `data:${directMime};base64,${data}`,
    };
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await loadImageElement(url);
    const encoded = await encodeCanvasJpeg(image, 768, 0.76);
    const baseName = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    const byteLength = Math.floor(encoded.data.length * 0.75);
    return {
      kind: 'reference',
      name: baseName,
      mime: encoded.mime,
      data: encoded.data,
      bytes: byteLength,
      previewUrl: encoded.previewUrl,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function encodeMonoPcmWav(samples, sampleRate) {
  const dataBytes = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(buffer);
  const writeStr = (offset, text) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataBytes, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, dataBytes, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }
  return new Uint8Array(buffer);
}

export async function prepareAudioFile(file, {maxBytes = 700000} = {}) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const rawBytes = new Uint8Array(await file.arrayBuffer());
  if (ext === 'wav' && rawBytes.length > 0 && rawBytes.length <= maxBytes) {
    return {
      kind: 'asset',
      name: file.name,
      mime: 'audio/wav',
      data: bytesToBase64(rawBytes),
      bytes: rawBytes.length,
      converted: false,
    };
  }
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx || !window.OfflineAudioContext) {
    throw Error(file.name + ': supply a PCM WAV file up to 700 KB.');
  }
  const ctx = new AudioCtx();
  let decoded;
  try {
    decoded = await ctx.decodeAudioData(rawBytes.buffer.slice(0));
  } catch {
    throw Error(file.name + ' could not be decoded as audio.');
  } finally {
    await ctx.close().catch(() => {});
  }
  const targetRate = 22050;
  const maxSeconds = Math.min(decoded.duration, Math.floor((maxBytes - 44) / (targetRate * 2)));
  const frameCount = Math.max(1, Math.floor(maxSeconds * targetRate));
  const offline = new OfflineAudioContext(1, frameCount, targetRate);
  const source = offline.createBufferSource();
  source.buffer = decoded;
  source.connect(offline.destination);
  source.start(0);
  const rendered = await offline.startRendering();
  const wav = encodeMonoPcmWav(rendered.getChannelData(0), targetRate);
  if (wav.length > maxBytes) throw Error(file.name + ' is too long to fit the 700 KB playable audio limit.');
  const baseName = file.name.replace(/\.[^.]+$/, '') + '.wav';
  return {
    kind: 'asset',
    name: baseName,
    mime: 'audio/wav',
    data: bytesToBase64(wav),
    bytes: wav.length,
    converted: true,
    durationSec: Math.round(rendered.duration * 10) / 10,
  };
}

export async function extractVideoKeyframes(file, {frameCount = 3} = {}) {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = url;
  const waitFor = (eventName, timeoutMs = 8000) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Timed out reading video frames from ' + file.name)), timeoutMs);
    const cleanup = () => {
      clearTimeout(timer);
      video.removeEventListener(eventName, onOk);
      video.removeEventListener('error', onErr);
    };
    const onOk = () => { cleanup(); resolve(); };
    const onErr = () => { cleanup(); reject(Error('Could not read video ' + file.name)); };
    video.addEventListener(eventName, onOk, {once: true});
    video.addEventListener('error', onErr, {once: true});
  });
  try {
    await waitFor('loadedmetadata');
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
    const fractions = frameCount === 1 ? [0.2] : [0.15, 0.5, 0.85].slice(0, frameCount);
    const frames = [];
    const baseName = file.name.replace(/\.[^.]+$/, '');
    for (let i = 0; i < fractions.length; i++) {
      const targetTime = Math.min(Math.max(0, duration * fractions[i]), Math.max(0, duration - 0.05));
      const seeked = waitFor('seeked');
      video.currentTime = targetTime;
      await seeked;
      const encoded = await encodeCanvasJpeg(video, 520, 0.72);
      frames.push({
        kind: 'reference',
        name: `${baseName}-frame-${i + 1}.jpg`,
        mime: encoded.mime,
        data: encoded.data,
        bytes: Math.floor(encoded.data.length * 0.75),
        previewUrl: encoded.previewUrl,
        timestampSec: Math.round(targetTime * 10) / 10,
        note: `Keyframe ${i + 1} (${Math.round(targetTime * 10) / 10}s) from ${file.name}`,
      });
    }
    return {
      name: file.name,
      durationSec: Math.round(duration * 10) / 10,
      frames,
    };
  } finally {
    video.src = '';
    URL.revokeObjectURL(url);
  }
}

const FALLBACK_VERIFIED_PROVIDERS = [
  {
    id: 'gemini',
    label: 'Google Gemini',
    keyUrl: 'https://aistudio.google.com/apikey',
    keyPlaceholder: 'AIza...',
    defaultModel: 'gemini-4-hydrogen',
    audioSummary: 'Native audio + Tora acoustic QA',
    videoSummary: 'Native video + keyframes',
    summary: 'Handles everything natively: vision, audio, video frames, and multi-turn playable tools.',
    models: [
      {id: 'gemini-4-hydrogen', label: 'Gemini 4 Hydrogen', badge: 'Recommended', contextTokens: 1_000_000},
      {id: 'gemini-4-carbon', label: 'Gemini 4 Carbon', badge: 'Flagship', contextTokens: 1_000_000},
      {id: 'gemini-4-neon', label: 'Gemini 4 Neon', badge: 'Frontier', contextTokens: 1_000_000},
      {id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash', badge: 'Fast', contextTokens: 1_000_000},
    ],
  },
  {
    id: 'openai',
    label: 'OpenAI',
    keyUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-...',
    defaultModel: 'gpt-6.2-sol',
    audioSummary: 'Tora acoustic QA + WAV catalog',
    videoSummary: 'Extracted video keyframes',
    summary: 'Strong tool calling and vision for scenes and video frames; sounds verified via Tora acoustic analysis.',
    models: [
      {id: 'gpt-6.2-sol', label: 'GPT-6.2 Sol', badge: 'Recommended', contextTokens: 1_000_000},
      {id: 'gpt-6.2-astra', label: 'GPT-6.2 Astra', badge: 'Flagship', contextTokens: 1_050_000},
      {id: 'gpt-6.1-terra', label: 'GPT-6.1 Terra', badge: 'Fast', contextTokens: 1_000_000},
    ],
  },
  {
    id: 'anthropic',
    label: 'Anthropic Claude',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    keyPlaceholder: 'sk-ant-...',
    defaultModel: 'claude-opus-5-5',
    audioSummary: 'Tora acoustic QA + WAV catalog',
    videoSummary: 'Extracted video keyframes',
    summary: 'Precise multi-turn scene editing and vision for visuals and video frames; sounds verified via Tora acoustic analysis.',
    models: [
      {id: 'claude-opus-5-5', label: 'Claude Opus 5.5', badge: 'Recommended', contextTokens: 1_000_000},
      {id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5', badge: 'Fast', contextTokens: 1_000_000},
      {id: 'claude-fable-5-2', label: 'Claude Fable 5.2', badge: 'Deep reasoning', contextTokens: 1_000_000},
    ],
  },
  {
    id: 'openai-compatible',
    label: 'Custom / OpenRouter',
    keyUrl: 'https://openrouter.ai/keys',
    keyPlaceholder: 'sk-or-v1-...',
    defaultModel: 'qwen/qwen3.8-max',
    audioSummary: 'Tora acoustic QA + WAV catalog',
    videoSummary: 'Extracted video keyframes (when vision enabled)',
    summary: 'Connect OpenRouter, DeepSeek, Kimi, Qwen, GLM, or any custom/local OpenAI-compatible API.',
    customEndpoint: true,
    presets: [
      {id: 'openrouter', label: 'OpenRouter', endpoint: 'https://openrouter.ai/api/v1', keyUrl: 'https://openrouter.ai/keys', keyPlaceholder: 'sk-or-v1-...', defaultModel: 'qwen/qwen3.8-max', vision: true, models: [{id: 'qwen/qwen3.8-max', label: 'Qwen 3.8 Max (OpenRouter)', badge: 'Recommended', contextTokens: 1_000_000, vision: true}, {id: 'moonshotai/kimi-k3.1-pro', label: 'Kimi K3.1 Pro (OpenRouter)', badge: 'Flagship', contextTokens: 1_000_000, vision: true}, {id: 'z-ai/glm-5.3-flash', label: 'GLM-5.3 Flash (OpenRouter)', badge: 'Fast', contextTokens: 1_000_000, vision: true}, {id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro (OpenRouter)', badge: 'Coding', contextTokens: 128_000, vision: false}]},
      {id: 'deepseek', label: 'DeepSeek', endpoint: 'https://api.deepseek.com/v1', keyUrl: 'https://platform.deepseek.com/api_keys', keyPlaceholder: 'sk-...', defaultModel: 'deepseek-chat', vision: false, models: [{id: 'deepseek-chat', label: 'DeepSeek Chat', badge: 'Recommended', contextTokens: 128_000, vision: false}, {id: 'deepseek-reasoner', label: 'DeepSeek Reasoner', badge: 'Reasoning', contextTokens: 128_000, vision: false}]},
      {id: 'kimi', label: 'Kimi (Moonshot)', endpoint: 'https://api.moonshot.ai/v1', keyUrl: 'https://platform.moonshot.ai/console/api-keys', keyPlaceholder: 'sk-...', defaultModel: 'kimi-k3.1-pro', vision: true, models: [{id: 'kimi-k3.1-pro', label: 'Kimi K3.1 Pro', badge: 'Recommended', contextTokens: 1_000_000, vision: true}, {id: 'kimi-k3', label: 'Kimi K3', badge: 'Balanced', contextTokens: 1_000_000, vision: true}, {id: 'kimi-k2.7-code', label: 'Kimi K2.7 Code', badge: 'Coding', contextTokens: 256_000, vision: true}]},
      {id: 'qwen', label: 'Qwen (Alibaba)', endpoint: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1', keyUrl: 'https://modelstudio.console.alibabacloud.com/', keyPlaceholder: 'sk-...', defaultModel: 'qwen3.8-max', vision: true, models: [{id: 'qwen3.8-max', label: 'Qwen 3.8 Max', badge: 'Recommended', contextTokens: 1_000_000, vision: true}, {id: 'qwen3.7-plus', label: 'Qwen 3.7 Plus', badge: 'Balanced', contextTokens: 1_000_000, vision: true}, {id: 'qwen3.8-flash', label: 'Qwen 3.8 Flash', badge: 'Fast', contextTokens: 1_000_000, vision: true}]},
      {id: 'glm', label: 'GLM (Z.ai)', endpoint: 'https://api.z.ai/api/paas/v4', keyUrl: 'https://z.ai/manage-apikey/apikey-list', keyPlaceholder: 'Paste Z.ai / BigModel key', defaultModel: 'glm-5.3-flash', vision: true, models: [{id: 'glm-5.3-flash', label: 'GLM-5.3 Flash', badge: 'Recommended', contextTokens: 1_000_000, vision: true}, {id: 'glm-5.3', label: 'GLM-5.3', badge: 'Flagship', contextTokens: 1_000_000, vision: false}, {id: 'glm-5v-turbo', label: 'GLM-5V Turbo', badge: 'Vision', contextTokens: 256_000, vision: true}]},
      {id: 'custom', label: 'Custom / Local', endpoint: '', keyUrl: '', keyPlaceholder: 'API key (or "local" for Ollama/vLLM)', defaultModel: '', vision: true, models: []},
    ],
    models: [{id: 'qwen/qwen3.8-max', label: 'Qwen 3.8 Max (OpenRouter)', badge: 'Recommended', contextTokens: 1_000_000, vision: true}],
  },
];

export function createApiConnectionController({pillButton, onStatusChange} = {}) {
  let status = {configured: false, supportedProviders: FALLBACK_VERIFIED_PROVIDERS};
  let selectedProviderId = 'gemini';
  let selectedModelId = 'gemini-4-hydrogen';
  let selectedPresetId = 'openrouter';
  let customEndpoint = 'https://openrouter.ai/api/v1';
  let customVision = true;
  let discoveredModels = {};
  let busy = false;

  const dialog = document.createElement('dialog');
  dialog.className = 'tora-modal';
  dialog.setAttribute('aria-labelledby', 'tora-api-modal-title');
  dialog.innerHTML = `
    <div class="tora-modal-card">
      <div class="tora-modal-head">
        <div>
          <h2 id="tora-api-modal-title">Connect a playable-ready AI API</h2>
          <p class="tora-modal-sub">Connect Gemini, OpenAI, Claude, or any OpenAI-compatible API (OpenRouter, DeepSeek, Kimi, Qwen, GLM, or local).</p>
        </div>
        <button type="button" class="tora-modal-close" id="tora-api-close" aria-label="Close">×</button>
      </div>
      <div class="tora-api-current" id="tora-api-current" hidden></div>
      <div class="tora-provider-grid" id="tora-provider-grid" role="radiogroup" aria-label="Verified AI providers"></div>
      <form class="tora-api-form" id="tora-api-form">
        <div class="tora-compat-fields" id="tora-compat-fields" hidden>
          <div class="tora-preset-row" id="tora-preset-row" role="group" aria-label="OpenAI-compatible presets"></div>
          <label>API Base URL
            <input id="tora-api-endpoint" type="text" inputmode="url" maxlength="512" autocomplete="off" spellcheck="false" placeholder="https://openrouter.ai/api/v1 or http://127.0.0.1:11434/v1">
          </label>
        </div>
        <div class="tora-api-row">
          <label id="tora-api-model-wrap">Model
            <select id="tora-api-model"></select>
          </label>
          <a id="tora-api-get-key" class="tora-key-link" target="_blank" rel="noopener noreferrer">Get API key ↗</a>
        </div>
        <label id="tora-api-custom-model-wrap" hidden>Model ID (or pick above)
          <input id="tora-api-custom-model" type="text" maxlength="128" autocomplete="off" spellcheck="false" placeholder="e.g. qwen/qwen3.8-max, deepseek-chat, kimi-k3.1-pro">
        </label>
        <label class="tora-vision-check" id="tora-api-vision-wrap" hidden>
          <input id="tora-api-vision" type="checkbox" checked>
          <span>Model supports vision (inspects Creative QA screenshots)</span>
        </label>
        <div class="tora-cap-row" id="tora-cap-row" aria-label="Verified capabilities"></div>
        <p class="tora-api-note" id="tora-api-media-note"></p>
        <label>Your API key
          <input id="tora-api-key" type="password" required maxlength="4096" autocomplete="off" spellcheck="false" placeholder="Paste your API key">
        </label>
        <div class="tora-modal-actions">
          <button type="submit" class="review-primary" id="tora-api-save">Verify &amp; connect</button>
          <button type="button" id="tora-api-fetch-models">Load models from key</button>
          <button type="button" id="tora-api-disconnect" hidden>Disconnect</button>
        </div>
        <p class="review-error" id="tora-api-error" role="alert"></p>
        <p class="tora-api-footnote">Keys are verified directly with the provider before saving, stored locally (<code>0600</code>), and never exported in playables. Prefer $0 API keys? Connect Claude Code, Cursor, Codex, or Gemini CLI via Tora MCP instead.</p>
      </form>
    </div>
  `;
  document.body.append(dialog);

  const $ = id => dialog.querySelector('#' + id);
  const providersList = () => status.supportedProviders?.length ? status.supportedProviders : FALLBACK_VERIFIED_PROVIDERS;
  const activePresetFor = provider => {
    const presets = provider?.presets ?? [];
    return presets.find(item => item.id === selectedPresetId) ?? presets[0] ?? null;
  };
  const cacheKeyFor = provider => provider.id === 'openai-compatible'
    ? `openai-compatible:${selectedPresetId}:${customEndpoint}`
    : provider.id;
  const modelsForProvider = provider => {
    const preset = provider.id === 'openai-compatible' ? activePresetFor(provider) : null;
    const baseModels = preset ? [...(preset.models ?? [])] : [...(provider.models ?? [])];
    const cached = discoveredModels[cacheKeyFor(provider)];
    const list = cached?.length ? [...cached] : baseModels;
    if (status.verified && status.provider === provider.id && status.model && !list.some(item => item.id === status.model)) {
      if (provider.id !== 'openai-compatible' || status.endpoint === customEndpoint) {
        list.unshift({
          id: status.model,
          label: status.modelLabel || status.model,
          badge: 'Connected',
          contextTokens: null,
          vision: status.capabilities?.vision,
        });
      }
    }
    return list;
  };

  function formatContext(tokens) {
    if (!tokens) return '';
    return tokens >= 1_000_000 ? (tokens / 1_000_000) + 'M context' : Math.round(tokens / 1000) + 'K context';
  }

  function updatePill() {
    if (!pillButton) return;
    if (status.configured) {
      pillButton.dataset.connected = 'true';
      pillButton.textContent = status.verified ? (status.modelLabel || status.model || 'API connected') + ' ✓' : (status.modelLabel || 'Legacy API');
      pillButton.title = status.verified
        ? `Connected to ${status.providerLabel} (${status.modelLabel})`
        : 'Legacy text-only connection. Click to switch to a verified playable-ready API.';
    } else {
      pillButton.dataset.connected = 'false';
      pillButton.textContent = 'Connect API';
      pillButton.title = 'Connect Gemini, OpenAI, Claude, OpenRouter, DeepSeek, Kimi, Qwen, GLM, or a custom API key';
    }
  }

  function renderCapabilities() {
    const provider = providersList().find(item => item.id === selectedProviderId) ?? providersList()[0];
    if (!provider) return;
    const isCompat = provider.id === 'openai-compatible';
    const preset = isCompat ? activePresetFor(provider) : null;
    const list = modelsForProvider(provider);
    const model = list.find(item => item.id === selectedModelId) ?? list[0] ?? null;
    selectedProviderId = provider.id;

    const keyUrl = isCompat ? (preset?.keyUrl || '') : provider.keyUrl;
    const keyLink = $('tora-api-get-key');
    keyLink.hidden = !keyUrl;
    if (keyUrl) keyLink.href = keyUrl;
    $('tora-api-key').placeholder = (isCompat && preset?.keyPlaceholder) || provider.keyPlaceholder || 'Paste your API key';
    $('tora-api-media-note').textContent = provider.summary;

    const visionEnabled = isCompat ? customVision : true;
    const caps = [
      {text: '✓ Scene tools & JSON'},
      visionEnabled ? {text: '✓ Vision'} : {text: '⚠ Text-only (no screenshot review)', warn: true},
      {text: '✓ Audio: ' + provider.audioSummary},
      {text: '✓ Video: ' + (visionEnabled ? 'Extracted video keyframes' : 'Disabled (text-only)')},
      ...(model?.contextTokens ? [{text: '✓ ' + formatContext(model.contextTokens)}] : []),
    ];
    $('tora-cap-row').replaceChildren(...caps.map(item => reviewElement('span', item.text, item.warn ? 'tora-cap-pill tora-cap-pill-warn' : 'tora-cap-pill')));
  }

  function renderPresets(provider) {
    const isCompat = provider.id === 'openai-compatible';
    $('tora-compat-fields').hidden = !isCompat;
    $('tora-api-custom-model-wrap').hidden = !isCompat;
    $('tora-api-vision-wrap').hidden = !isCompat;
    $('tora-api-endpoint').required = isCompat;
    $('tora-api-custom-model').required = isCompat;
    if (!isCompat) return;

    const presets = provider.presets ?? [];
    if (!presets.some(item => item.id === selectedPresetId)) selectedPresetId = presets[0]?.id ?? 'openrouter';
    $('tora-preset-row').replaceChildren(...presets.map(preset => {
      const btn = reviewElement('button', preset.label, 'tora-preset-btn');
      btn.type = 'button';
      const active = preset.id === selectedPresetId;
      btn.dataset.active = String(active);
      btn.setAttribute('aria-pressed', String(active));
      btn.onclick = () => {
        selectedPresetId = preset.id;
        customEndpoint = preset.endpoint;
        selectedModelId = preset.defaultModel;
        customVision = preset.vision !== false;
        $('tora-api-endpoint').value = customEndpoint;
        $('tora-api-custom-model').value = selectedModelId;
        $('tora-api-vision').checked = customVision;
        renderPresets(provider);
        renderModels();
      };
      return btn;
    }));
    $('tora-api-endpoint').value = customEndpoint;
    $('tora-api-vision').checked = customVision;
  }

  function renderModels() {
    const provider = providersList().find(item => item.id === selectedProviderId) ?? providersList()[0];
    if (!provider) return;
    const isCompat = provider.id === 'openai-compatible';
    const list = modelsForProvider(provider);
    const select = $('tora-api-model');
    const selectWrap = $('tora-api-model-wrap');
    if (list.length) {
      selectWrap.hidden = false;
      select.required = !isCompat;
      if (!isCompat && !list.some(item => item.id === selectedModelId)) {
        selectedModelId = list.some(item => item.id === provider.defaultModel) ? provider.defaultModel : (list[0]?.id || '');
      }
      select.replaceChildren(...list.map(model => {
        const option = reviewElement('option', model.label + (model.badge ? ' · ' + model.badge : ''));
        option.value = model.id;
        return option;
      }));
      if (list.some(item => item.id === selectedModelId)) select.value = selectedModelId;
    } else {
      selectWrap.hidden = true;
      select.required = false;
      select.replaceChildren();
    }
    if (isCompat) {
      $('tora-api-custom-model').value = selectedModelId || '';
    }
    renderCapabilities();
  }

  function renderModal() {
    const providers = providersList();
    if (!providers.some(item => item.id === selectedProviderId)) {
      selectedProviderId = status.verified && status.provider ? status.provider : (providers[0]?.id ?? 'gemini');
      selectedModelId = status.verified && status.model ? status.model : '';
    }
    const currentBox = $('tora-api-current');
    if (status.configured) {
      currentBox.hidden = false;
      currentBox.replaceChildren(
        reviewElement('strong', status.verified ? 'Connected: ' + status.providerLabel + ' · ' + status.modelLabel : 'Legacy connection active'),
        reviewElement('span', status.keyHint ? 'Key ' + status.keyHint : ''),
      );
      $('tora-api-disconnect').hidden = false;
    } else {
      currentBox.hidden = true;
      $('tora-api-disconnect').hidden = true;
    }

    $('tora-provider-grid').replaceChildren(...providers.map(provider => {
      const card = reviewElement('button', '', 'tora-provider-card');
      card.type = 'button';
      card.setAttribute('role', 'radio');
      const active = provider.id === selectedProviderId;
      card.setAttribute('aria-checked', String(active));
      card.dataset.active = String(active);
      const tag = provider.id === 'gemini'
        ? 'Native audio & video'
        : provider.id === 'openai-compatible'
          ? 'OpenRouter, DeepSeek, Kimi, Qwen, GLM'
          : 'Vision + Tora audio QA';
      card.append(
        reviewElement('strong', provider.label),
        reviewElement('span', tag, 'tora-provider-tag'),
      );
      card.onclick = () => {
        selectedProviderId = provider.id;
        if (provider.id === 'openai-compatible') {
          const preset = activePresetFor(provider);
          if (preset && !customEndpoint) customEndpoint = preset.endpoint;
          selectedModelId = preset?.defaultModel ?? provider.defaultModel;
          customVision = preset?.vision !== false;
        } else {
          selectedModelId = provider.defaultModel;
        }
        renderModal();
      };
      return card;
    }));
    const activeProvider = providers.find(item => item.id === selectedProviderId) ?? providers[0];
    renderPresets(activeProvider);
    renderModels();
  }

  async function refresh() {
    try {
      status = await reviewRequest('/api/review/connection');
      if (status.verified && status.provider) {
        selectedProviderId = status.provider;
        selectedModelId = status.model;
        if (status.provider === 'openai-compatible') {
          if (status.preset) selectedPresetId = status.preset;
          if (status.endpoint) customEndpoint = status.endpoint;
          customVision = status.capabilities?.vision !== false;
        }
      }
      updatePill();
      onStatusChange?.(status);
    } catch {
      updatePill();
    }
    return status;
  }

  function open(prefillMessage = '') {
    $('tora-api-error').textContent = prefillMessage;
    renderModal();
    if (!dialog.open) dialog.showModal();
    $('tora-api-key').focus();
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  $('tora-api-close').onclick = close;
  dialog.addEventListener('click', event => {
    if (event.target === dialog) close();
  });
  $('tora-api-model').onchange = event => {
    selectedModelId = event.target.value;
    if (selectedProviderId === 'openai-compatible') {
      $('tora-api-custom-model').value = selectedModelId;
      const provider = providersList().find(item => item.id === 'openai-compatible');
      const match = modelsForProvider(provider).find(item => item.id === selectedModelId);
      if (typeof match?.vision === 'boolean') {
        customVision = match.vision;
        $('tora-api-vision').checked = customVision;
      }
    }
    renderCapabilities();
  };
  $('tora-api-endpoint').oninput = event => {
    customEndpoint = event.target.value.trim();
  };
  $('tora-api-custom-model').oninput = event => {
    selectedModelId = event.target.value.trim();
  };
  $('tora-api-vision').onchange = event => {
    customVision = event.target.checked;
    renderCapabilities();
  };

  $('tora-api-form').onsubmit = async event => {
    event.preventDefault();
    if (busy) return;
    const key = $('tora-api-key').value.trim();
    if (!key) return;
    const isCompat = selectedProviderId === 'openai-compatible';
    const modelToSave = isCompat ? ($('tora-api-custom-model').value.trim() || selectedModelId) : selectedModelId;
    const endpointToSave = isCompat ? $('tora-api-endpoint').value.trim() : undefined;
    if (isCompat && (!endpointToSave || !modelToSave)) {
      $('tora-api-error').textContent = 'Enter both an API Base URL and Model ID.';
      return;
    }
    busy = true;
    $('tora-api-error').textContent = '';
    const saveBtn = $('tora-api-save');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Verifying model access…';
    try {
      await reviewRequest('/api/review/connection', {
        provider: selectedProviderId,
        model: modelToSave,
        apiKey: key,
        ...(isCompat ? {endpoint: endpointToSave, preset: selectedPresetId, vision: customVision} : {}),
      });
      $('tora-api-key').value = '';
      await refresh();
      close();
    } catch (error) {
      $('tora-api-error').textContent = errorLabels[error.message] ?? error.message;
    } finally {
      busy = false;
      saveBtn.disabled = false;
      saveBtn.textContent = 'Verify & connect';
    }
  };

  $('tora-api-fetch-models').onclick = async () => {
    if (busy) return;
    const key = $('tora-api-key').value.trim();
    if (!key) {
      $('tora-api-error').textContent = 'Paste your API key first to load your live account models.';
      $('tora-api-key').focus();
      return;
    }
    const isCompat = selectedProviderId === 'openai-compatible';
    const endpointToQuery = isCompat ? $('tora-api-endpoint').value.trim() : undefined;
    if (isCompat && !endpointToQuery) {
      $('tora-api-error').textContent = 'Enter an API Base URL first.';
      $('tora-api-endpoint').focus();
      return;
    }
    busy = true;
    $('tora-api-error').textContent = '';
    const fetchBtn = $('tora-api-fetch-models');
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Loading models…';
    try {
      const result = await reviewRequest('/api/review/connection', {
        action: 'models',
        provider: selectedProviderId,
        apiKey: key,
        ...(isCompat ? {endpoint: endpointToQuery, preset: selectedPresetId} : {}),
      });
      if (!result.models?.length) {
        $('tora-api-error').textContent = 'No playable-ready models were returned for this API key.';
      } else {
        const provider = providersList().find(item => item.id === selectedProviderId);
        discoveredModels[cacheKeyFor(provider)] = result.models;
        selectedModelId = result.models[0].id;
        renderModels();
      }
    } catch (error) {
      $('tora-api-error').textContent = errorLabels[error.message] ?? error.message;
    } finally {
      busy = false;
      fetchBtn.disabled = false;
      fetchBtn.textContent = 'Load models from key';
    }
  };

  $('tora-api-disconnect').onclick = async () => {
    if (busy) return;
    busy = true;
    $('tora-api-error').textContent = '';
    try {
      await reviewRequest('/api/review/connection', {action: 'disconnect'});
      await refresh();
      renderModal();
    } catch (error) {
      $('tora-api-error').textContent = errorLabels[error.message] ?? error.message;
    } finally {
      busy = false;
    }
  };

  if (pillButton) pillButton.onclick = () => open();

  return {
    refresh,
    open,
    close,
    getStatus: () => status,
  };
}


function loadRuntime() {
  return new Promise((resolve, reject) => {
    const script = reviewElement('script');
    script.src = './review-runtime.js';
    script.onload = resolve;
    script.onerror = () => reject(Error('The preview could not load.'));
    document.head.append(script);
  });
}

function download(name, contents, mime) {
  const anchor = reviewElement('a');
  anchor.href = URL.createObjectURL(new Blob([contents], {type: mime}));
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
}

const statusLabels = {
  waiting: 'Saved in chat',
  claimed: 'Agent reviewing your message',
  building: 'Building revision',
  resolving: 'Working on your revision…',
  'model-error': 'Could not complete automatically',
  candidate: 'Revision ready to compare',
  promoted: 'Applied ✓',
  discarded: 'Discarded',
  rejected: 'Revision blocked',
  'needs-scope': 'Needs more scope',
  'needs-clarification': 'Quick question for you',
};

const playIcon = '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5.5 3.6 16.2 10 5.5 16.4Z" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
const pauseIcon = '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><rect x="4.5" y="3.5" width="3.8" height="13" rx="1" fill="currentColor"/><rect x="11.7" y="3.5" width="3.8" height="13" rx="1" fill="currentColor"/></svg>';
const restartIcon = '<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="M15.8 10a5.8 5.8 0 1 1-1.6-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M14.4 2.8v3.6h-3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function makePreview(figure, orientation, labelText) {
  const screen = figure.querySelector('.review-screen');
  const toggleBtn = figure.querySelector('[data-role="toggle-play"]');
  const restartBtn = figure.querySelector('[data-role="restart-play"]');
  const canvas = reviewElement('canvas');
  canvas.setAttribute('aria-label', 'Playable preview');
  const picker = reviewElement('div', '', 'review-picker');
  picker.dataset.active = 'false';
  picker.setAttribute('aria-hidden', 'true');
  screen.append(canvas, picker);
  let runtime;
  let playing = false;
  let freshStart = true;

  function syncButton() {
    figure.dataset.playing = String(playing);
    if (!toggleBtn) return;
    toggleBtn.innerHTML = playing ? pauseIcon : playIcon;
    toggleBtn.setAttribute('aria-pressed', String(playing));
    const action = playing ? 'Pause' : 'Play';
    const text = labelText ? action + ' ' + labelText : action;
    toggleBtn.setAttribute('aria-label', text);
    toggleBtn.title = text;
  }
  syncButton();
  if (restartBtn) restartBtn.innerHTML = restartIcon;

  return {
    picker,
    toggleBtn,
    restartBtn,
    isPlaying: () => playing,
    orient: () => { figure.dataset.orientation = orientation.value; },
    mount: ({project, assets}) => {
      runtime?.destroy();
      runtime = globalThis.ToraNative.mountNative({...project, assets}, canvas, {review: true});
      playing = false;
      freshStart = true;
      syncButton();
    },
    playback: () => {
      runtime.restart();
      runtime.pause(false);
      playing = true;
      freshStart = false;
      syncButton();
    },
    resume: () => {
      if (freshStart) {
        runtime.restart();
        freshStart = false;
      }
      runtime.pause(false);
      playing = true;
      syncButton();
    },
    seek: (moment, options) => {
      runtime.seekReview(moment, options);
      playing = Boolean(options?.motion);
      freshStart = !playing;
      syncButton();
    },
    freeze: () => {
      runtime?.freezeReview();
      playing = false;
      syncButton();
    },
    state: () => runtime.state(),
    capture: () => canvas.toDataURL('image/jpeg', .7).split(',')[1],
    pick: event => runtime.pickReview(event.clientX, event.clientY),
    outlines: (ids = []) => {
      picker.replaceChildren(...(runtime?.reviewBounds(ids) ?? []).map(bounds => {
        const outline = reviewElement('div', '', 'review-outline');
        for (const dimension of ['left', 'top', 'width', 'height']) outline.style[dimension] = bounds[dimension] + 'px';
        return outline;
      }));
    },
    hide: () => {
      figure.hidden = true;
      playing = false;
      freshStart = true;
      syncButton();
      runtime?.destroy();
      runtime = undefined;
    },
    show: () => { figure.hidden = false; },
  };
}

export function populateDemosMenu(menuEl, listEl, currentProjectId = '') {
  if (!menuEl || !listEl) return Promise.resolve([]);
  return reviewRequest('/api/demos').then(({demos}) => {
    if (!Array.isArray(demos) || !demos.length) return [];
    listEl.replaceChildren(...demos.map(demo => {
      const btn = reviewElement('button', '', 'tora-demo-item');
      btn.type = 'button';
      btn.dataset.demoId = demo.id;
      const active = demo.id === currentProjectId;
      btn.dataset.active = String(active);
      const top = reviewElement('span', '', 'tora-demo-item-top');
      top.append(
        reviewElement('strong', demo.name),
        reviewElement('span', active ? 'Open' : demo.genre, active ? 'tora-pill tora-pill-mint' : 'tora-pill'),
      );
      btn.append(top, reviewElement('span', demo.tagline, 'tora-demo-item-desc'));
      btn.onclick = async () => {
        if (active) {
          menuEl.open = false;
          return;
        }
        btn.disabled = true;
        top.lastChild.textContent = 'Opening…';
        try {
          const opened = await reviewRequest('/api/demos/open', {id: demo.id});
          window.location.href = '?project=' + encodeURIComponent(opened.projectId ?? demo.id);
        } catch {
          btn.disabled = false;
          top.lastChild.textContent = demo.genre;
        }
      };
      return btn;
    }));
    menuEl.hidden = false;
    return demos;
  }).catch(() => []);
}

export async function openReview(projectId, initialMetadata) {
  const $ = reviewShell(`
    <header class="review-header">
      <img class="review-wordmark" src="./brand/tora-wordmark.svg" alt="Tora">
      <h1 id="review-title"></h1>
      <nav aria-label="Project actions" class="review-actions">
        <a class="review-button" id="review-new-link" href="?view=new&amp;from=${encodeURIComponent(projectId)}">+ New</a>
        <details class="review-menu tora-demo-menu" id="review-demos" hidden>
          <summary>Demos</summary>
          <div class="tora-demo-list" id="review-demo-list"></div>
        </details>
        <button type="button" class="tora-api-pill" id="review-api-pill" data-connected="false">Connect API</button>
        <button type="button" id="review-undo" hidden>Undo</button>
        <details class="review-menu" id="review-export-menu">
          <summary>Export</summary>
          <div class="tora-export-panel">
            <label class="tora-export-target-label">Network target
              <select id="review-export-target" aria-label="Network target"></select>
            </label>
            <form class="review-store" id="review-store">
              <label><span>Store URL <span class="tora-optional-tag">(optional)</span></span>
                <input id="review-store-url" type="url" placeholder="https://play.google.com/store/... or App Store">
              </label>
              <span class="tora-export-hint">Optional for browser drafts; add your store link when exporting for an ad network.</span>
            </form>
            <button type="button" id="review-export" class="review-primary" disabled>Approve &amp; export (Unity Ads)</button>
            <button type="button" id="review-export-draft" disabled>Download browser draft (no store URL)</button>
            <button type="button" id="review-bundle" disabled>Download editable project (.tora.json)</button>
            <p class="tora-export-hint" id="review-export-verification">Export checks cover static structure and mock-host lifecycle only. Verify the exact file in the selected network's official preview tool and on physical iOS/Android devices before launch. This is not official network acceptance.</p>
          </div>
        </details>
      </nav>
    </header>
    <main class="review-workspace">
      <section class="review-stage" aria-label="Playable">
        <div class="review-toolbar">
          <div id="review-moments" class="review-actions" role="group" aria-label="Review moments"></div>
          <button type="button" id="review-replay-change" hidden>Replay change</button>
          <select id="review-orientation" aria-label="Screen orientation" disabled>
            <option value="portrait">Portrait</option><option value="landscape">Landscape</option>
          </select>
        </div>
        <div id="review-previews" class="review-previews" data-compare="false" data-orientation="portrait">
          <figure id="review-before" class="review-preview" data-orientation="portrait">
            <div class="review-preview-bar">
              <figcaption hidden>Before</figcaption>
              <div class="review-preview-controls">
                <button type="button" id="review-before-toggle" class="review-icon-btn" data-role="toggle-play" aria-label="Play Before" aria-pressed="false" disabled></button>
                <button type="button" id="review-before-restart" class="review-icon-btn review-icon-secondary" data-role="restart-play" aria-label="Restart Before" title="Restart" disabled></button>
              </div>
            </div>
            <div class="review-screen"></div>
          </figure>
          <figure id="review-after" class="review-preview" data-orientation="portrait" hidden>
            <div class="review-preview-bar">
              <figcaption>After</figcaption>
              <div class="review-preview-controls">
                <button type="button" id="review-after-toggle" class="review-icon-btn" data-role="toggle-play" aria-label="Play After" aria-pressed="false" disabled></button>
                <button type="button" id="review-after-restart" class="review-icon-btn review-icon-secondary" data-role="restart-play" aria-label="Restart After" title="Restart" disabled></button>
              </div>
            </div>
            <div class="review-screen"></div>
          </figure>
        </div>
      </section>
      <aside class="review-side tora-chat-side" aria-label="Studio chat">
        <div class="tora-chat-head">
          <div>
            <h2>Studio chat</h2>
            <span class="tora-chat-sub">Real assets only · Instant + verified AI edits</span>
          </div>
          <button type="button" class="tora-target-btn" id="review-note-toggle" aria-expanded="false" aria-controls="review-attachment" disabled>🎯 Target</button>
        </div>

        <div class="tora-chat-scroll" id="review-thread" aria-live="polite">
          <div class="tora-bubble tora-bubble-assistant" id="review-welcome">
            <div class="tora-bubble-meta"><strong>Tora</strong><span>Ready</span></div>
            <p>Tell me what to change in this playable — copy, button text, timing, sound, or layout. Use <strong>🎯 Target</strong> to click a part on screen, or <strong>+</strong> to upload new sprites or audio.</p>
            <div class="tora-starter-row" id="review-quick-chips"></div>
          </div>
          <div id="review-requests" class="tora-chat-turns"></div>
          <div id="review-active" class="tora-chat-turns"></div>
          <div id="review-local-log" class="tora-chat-turns"></div>
        </div>

        <div class="tora-chat-dock">
          <div class="tora-candidate-banner" id="review-candidate-banner" hidden>
            Compare Before &amp; After on the left, then choose <strong>Use this version</strong> or <strong>Discard</strong> above to keep chatting.
          </div>
          <form class="tora-composer" id="review-note">
            <div class="review-attachment" id="review-attachment" hidden>
              <div class="tora-attachment-head">
                <strong id="review-pick-help">Click the paused preview or pick a part</strong>
                <button type="button" class="tora-attach-remove" id="review-clear-target" aria-label="Clear target">×</button>
              </div>
              <select id="review-target" aria-label="Feedback target"></select>
              <details id="review-fields" hidden>
                <summary>Instant controls &amp; allowed fields</summary>
                <div id="review-field-options"></div>
              </details>
            </div>

            <div class="tora-attach-strip" id="review-ref-strip" hidden></div>

            <details class="review-note-list" id="review-queued" hidden>
              <summary id="review-queued-label">Notes in this message</summary>
              <ul id="review-queued-notes"></ul>
            </details>

            <div class="tora-composer-bar">
              <div class="tora-plus-wrap">
                <button type="button" class="tora-plus-btn" id="review-plus-btn" aria-label="Add target, asset, or photo" aria-expanded="false" aria-controls="review-plus-menu">+</button>
                <div class="tora-plus-menu" id="review-plus-menu" hidden role="menu">
                  <button type="button" role="menuitem" id="rev-menu-target"><strong>Target a part on screen</strong><span>Highlight an element &amp; unlock instant $0 controls</span></button>
                  <button type="button" role="menuitem" id="rev-menu-asset"><strong>Upload game asset</strong><span>Add PNG, JPEG, or WAV/MP3 directly to this playable</span></button>
                  <button type="button" role="menuitem" id="rev-menu-ref"><strong>Attach reference photo or video</strong><span>Share visual context with your verified AI model</span></button>
                  <button type="button" role="menuitem" id="rev-menu-queue"><strong>Queue multiple notes</strong><span>Bundle current message and write another</span></button>
                </div>
              </div>
              <textarea id="review-note-text" aria-label="Revision note" rows="1" maxlength="2000" placeholder="Tell Tora what to change…" disabled></textarea>
              <button type="submit" class="review-primary tora-send-btn" id="review-submit" disabled aria-label="Send">Send ↑</button>
            </div>

            <div class="tora-composer-foot">
              <span id="review-route-hint"></span>
              <label id="review-model-choice" class="tora-inline-model" hidden>
                <select id="review-model" aria-label="Legacy model tier"><option value="free">DeepSeek Flash (free)</option><option value="paid">DeepSeek Pro (paid)</option></select>
              </label>
            </div>
            <p id="review-status" role="status"></p>
            <p class="review-error" id="review-error" role="alert"></p>
            <input type="file" id="review-asset-picker" accept=".png,.jpg,.jpeg,.wav,.mp3,.ogg,.m4a" hidden>
            <input type="file" id="review-ref-picker" accept=".png,.jpg,.jpeg,.webp,video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov" hidden>
          </form>
        </div>
      </aside>
    </main>
  `);

  const orientation = $('review-orientation');
  const before = makePreview($('review-before'), orientation, 'Before');
  const after = makePreview($('review-after'), orientation, 'After');
  const prefix = '/api/projects/' + encodeURIComponent(projectId);
  const api = (route, body) => reviewRequest(prefix + route, body);
  let metadata = initialMetadata;
  let displayedRevision;
  let candidateId;
  let comparisonVersion;
  let moment;
  let draftExpected;
  let pendingRequest;
  let queuedNotes = [];
  let queuedExpected;
  let queuedSignature;
  let editingRequestId;
  let resolvingId;
  let pendingRetryRequestId;
  let attachedRefFrame = null;
  let initialized = false;
  let busy = false;
  let actions = Promise.resolve();
  let requestSignature;
  const targetMenu = $('review-target');
  const notePanel = $('review-note');
  const draftText = $('review-note-text');
  const attachment = $('review-attachment');
  const feedbackStatus = $('review-status');
  const threadEl = $('review-thread');
  let exportTargets = [
    {id:'unity-ads-ua-playable',label:'Unity Ads',mraidVersion:'3.0',filenameSuffix:'unity',hostKind:'mraid',requiresStoreUrl:true,officialPreviewLabel:'Unity Ads Creative Testing tool'},
    {id:'applovin-growth-playable',label:'AppLovin',mraidVersion:'2.0',filenameSuffix:'applovin',hostKind:'mraid',requiresStoreUrl:true,officialPreviewLabel:'AppLovin Playable Preview',officialPreviewUrl:'https://p.applov.in/playablePreview?create=1'},
  ];
  const exportTargetSelect = $('review-export-target');
  const selectedExportTarget = () => exportTargets.find(target => target.id === exportTargetSelect.value) ?? exportTargets[0];
  const renderExportTargets = () => {
    const previous = exportTargetSelect.value;
    exportTargetSelect.replaceChildren(...exportTargets.map(target => {
      const option = reviewElement('option', target.mraidVersion ? `${target.label} (MRAID ${target.mraidVersion})` : target.label);
      option.value = target.id;
      return option;
    }));
    if (exportTargets.some(target => target.id === previous)) exportTargetSelect.value = previous;
  };
  const updateExportButton = () => {
    const target = selectedExportTarget();
    $('review-export').textContent = metadata.accepted ? `Export for ${target.label}` : `Approve & export for ${target.label}`;
    const note = $('review-export-verification');
    if (note) {
      note.replaceChildren();
      note.append(document.createTextNode('Static structure & mock-host checks only — not official network acceptance. Test this exact HTML in '));
      if (target.officialPreviewUrl) {
        const link = reviewElement('a', target.officialPreviewLabel ?? `${target.label} preview tool`);
        link.href = target.officialPreviewUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        note.append(link);
      } else {
        note.append(document.createTextNode(target.officialPreviewLabel ?? `${target.label}'s official preview tool`));
      }
      note.append(document.createTextNode(' and on physical iOS/Android devices before launch.'));
    }
  };
  renderExportTargets();
  exportTargetSelect.onchange = updateExportButton;
  void reviewRequest('/api/creation/capabilities').then(result => {
    const available = result.networkTargets?.filter(target => target.hostKind !== 'browser');
    if (!available?.length) return;
    exportTargets = available;
    renderExportTargets();
    updateExportButton();
  }).catch(() => {});

  document.title = metadata.name + ' | Tora chat';

  const scrollThread = () => { threadEl.scrollTop = threadEl.scrollHeight; };
  const popover = wirePopoverMenu($('review-plus-btn'), $('review-plus-menu'));
  const resizeDraft = wireAutoGrowTextarea(draftText, {
    onSubmit: () => notePanel.requestSubmit(),
    maxHeight: 132,
  });

  const connectionCtrl = createApiConnectionController({
    pillButton: $('review-api-pill'),
    onStatusChange: async nextStatus => {
      updateRouteHint(nextStatus);
      if (!initialized) return;
      if (nextStatus?.configured && pendingRetryRequestId) {
        const retryId = pendingRetryRequestId;
        pendingRetryRequestId = undefined;
        await updateMetadata();
        resolveRequest(retryId);
      } else if (nextStatus) {
        await updateMetadata();
      }
    },
  });
  void populateDemosMenu($('review-demos'), $('review-demo-list'), projectId);

  function updateRouteHint(connStatus = connectionCtrl.getStatus()) {
    const hint = $('review-route-hint');
    if (connStatus?.configured) {
      hint.textContent = connStatus.verified
        ? `${connStatus.modelLabel} · Vision + Tora audio QA`
        : `${connStatus.modelLabel || 'Legacy API'} · Click API pill to upgrade`;
    } else if (metadata.feedbackModel) {
      hint.textContent = `${metadata.connection?.modelLabel ?? metadata.feedbackModel} connected`;
    } else {
      hint.textContent = 'Instant $0 edits active · Connect a verified API for open-ended chat';
    }
  }

  function showError(error) {
    $('review-error').textContent = errorLabels[error.message] ?? error.message;
  }

  function handle(task, clearError = true) {
    return event => {
      event?.preventDefault();
      const result = actions.then(async () => {
        busy = true;
        if (clearError) $('review-error').textContent = '';
        try { await task(); } catch (error) { showError(error); }
        finally { busy = false; }
      });
      actions = result;
      return result;
    };
  }

  function syncComparisonChoice() {
    $('review-before').dataset.selected = String(Boolean(candidateId) && comparisonVersion === 'before');
    $('review-after').dataset.selected = String(Boolean(candidateId) && comparisonVersion === 'after');
    $('review-replay-change').disabled = false;
  }

  function paintOutline() {
    const target = metadata.targets.find(item => item.id === targetMenu.value);
    before.outlines(attachment.hidden ? [] : target?.componentIds);
  }

  function drawQuickChips() {
    const row = $('review-quick-chips');
    const chips = [];
    if (metadata.targets.some(t => t.id === 'cta')) {
      chips.push({
        label: 'Edit install button',
        run: () => {
          selectMoment('end-card');
          toggleAttachment(true);
          targetMenu.value = 'cta';
          drawFields();
          $('review-fields').open = true;
          $('review-direct-text')?.focus();
        },
      });
    }
    if (metadata.targets.some(t => t.id === 'opening')) {
      chips.push({
        label: 'Adjust opening hint',
        run: () => {
          selectMoment('opening');
          toggleAttachment(true);
          targetMenu.value = 'opening';
          drawFields();
          $('review-fields').open = true;
          draftText.focus();
        },
      });
    }
    if (metadata.targets.some(t => t.id === 'ending')) {
      chips.push({
        label: 'Change win sound',
        run: () => {
          selectMoment('end-card');
          toggleAttachment(true);
          targetMenu.value = 'ending';
          drawFields();
          $('review-fields').open = true;
          ($('review-win-cue-replacement') || draftText).focus();
        },
      });
    }
    row.replaceChildren(...chips.map(chip => {
      const btn = reviewElement('button', chip.label, 'tora-starter-chip');
      btn.type = 'button';
      btn.onclick = handle(chip.run);
      return btn;
    }));
  }

  function drawFields() {
    const target = metadata.targets.find(item => item.id === targetMenu.value);
    $('review-fields').hidden = !target?.fields.length;
    $('review-fields').open = Boolean(target?.fields.some(field => field.confirm || field.id === 'text'));
    $('review-field-options').replaceChildren(...(target?.fields ?? []).map(field => {
      const label = reviewElement('label', field.label);
      const input = reviewElement('input');
      input.type = 'checkbox';
      input.value = field.id;
      input.checked = !field.confirm;
      label.prepend(input);
      if (metadata.deterministicAuthoring && (field.id === 'text' && target.id === 'cta' ||
          ['hint-delay','reveal-duration','payoff-hold','feedback-duration'].includes(field.id))) {
        const direct = reviewElement('input');
        const timing = field.id !== 'text';
        if (timing) {
          direct.dataset.directTimingField = field.id;
          if (!$('review-direct-timing')) direct.id = 'review-direct-timing';
        } else {
          direct.id = 'review-direct-text';
        }
        direct.placeholder = String(field.value ?? '');
        direct.setAttribute('aria-label', timing ? 'New ' + field.label : 'New install button wording');
        if (timing) {
          direct.type = 'number';
          direct.min = field.min;
          direct.max = field.max;
          direct.step = '0.1';
        } else {
          direct.type = 'text';
          direct.maxLength = field.maxLength;
        }
        direct.oninput = () => {
          if (!direct.value) return;
          for (const fieldInput of $('review-field-options').querySelectorAll('input[type="checkbox"]'))
            fieldInput.checked = fieldInput === input;
          drawQueued();
        };
        const apply = reviewElement('button', 'Apply instant ($0)', 'review-direct-apply');
        apply.type = 'button';
        apply.onclick = handle(() => notePanel.requestSubmit());
        label.append(direct, apply);
      }
      if (field.id === 'win-cue' && metadata.deterministicAuthoring?.outcomeCueChoices.length) {
        const select = reviewElement('select');
        select.id = 'review-win-cue-replacement';
        select.setAttribute('aria-label', 'Explicit replacement win cue');
        const prompt = reviewElement('option', 'Pick a new CC0 win cue (moves old cue to loss)');
        prompt.value = '';
        select.append(prompt, ...metadata.deterministicAuthoring.outcomeCueChoices.map(choice => {
          const option = reviewElement('option', choice.label);
          option.value = choice.catalogId;
          return option;
        }));
        select.onchange = () => {
          if (!select.value) return;
          for (const fieldInput of $('review-field-options').querySelectorAll('input[type="checkbox"]'))
            fieldInput.checked = fieldInput === input;
          drawQueued();
        };
        label.append(select);
      }
      return label;
    }));
    paintOutline();
  }

  function setTargetOptions() {
    const activeId = targetMenu.value;
    const targets = metadata.targets.filter(item => item.moment === moment);
    const entireMoment = reviewElement('option', 'Whole moment');
    entireMoment.value = '';
    targetMenu.replaceChildren(entireMoment, ...targets.map(target => {
      const option = reviewElement('option', target.label);
      option.value = target.id;
      return option;
    }));
    targetMenu.value = targets.some(target => target.id === activeId) ? activeId : '';
    drawFields();
  }

  function selectMoment(next) {
    moment = next;
    before.seek(moment);
    if (candidateId) after.seek(moment);
    before.picker.dataset.active = attachment.hidden ? 'false' : 'true';
    for (const button of $('review-moments').children)
      button.setAttribute('aria-pressed', String(button.dataset.moment === moment));
    setTargetOptions();
    if (candidateId) $('review-replay-change').hidden = !metadata.moments.some(item => item.id === moment);
  }

  function visibleMoment() {
    const variables = before.state().variables;
    if (moment) return moment;
    const rules = metadata.momentRules;
    if (rules) {
      const progress = Number(variables[rules.progressVariable] ?? 0);
      if (variables[rules.phaseVariable] === 'cta') return progress < rules.goal &&
        metadata.moments.some(item => item.id === 'timeout') ? 'timeout' : 'end-card';
      if (progress > 0 && metadata.moments.some(item => item.id === rules.progressMoment)) return rules.progressMoment;
    }
    return metadata.moments[0]?.id ?? 'live';
  }

  function toggleAttachment(open) {
    attachment.hidden = !open;
    $('review-note-toggle').setAttribute('aria-expanded', String(open));
    $('review-note-toggle').dataset.active = String(open);
    before.picker.dataset.active = open ? 'true' : 'false';
    if (open) {
      before.freeze();
      moment = visibleMoment();
      setTargetOptions();
    } else {
      targetMenu.value = '';
      drawFields();
    }
  }

  function renderRefStrip() {
    const strip = $('review-ref-strip');
    if (!attachedRefFrame) {
      strip.hidden = true;
      strip.replaceChildren();
      return;
    }
    strip.hidden = false;
    const chip = reviewElement('div', '', 'tora-attach-chip');
    const img = reviewElement('img');
    img.src = attachedRefFrame.previewUrl;
    img.alt = '';
    const info = reviewElement('div', '', 'tora-attach-info');
    info.append(reviewElement('strong', attachedRefFrame.name), reviewElement('span', 'Reference visual attached to next message'));
    const remove = reviewElement('button', '×', 'tora-attach-remove');
    remove.type = 'button';
    remove.setAttribute('aria-label', 'Remove reference photo');
    remove.onclick = () => {
      attachedRefFrame = null;
      renderRefStrip();
    };
    chip.append(img, info, remove);
    strip.replaceChildren(chip);
  }

  async function projectData(revision) {
    const encoded = encodeURIComponent(revision);
    const [document, render] = await Promise.all([api('?revision=' + encoded), api('/render?revision=' + encoded)]);
    return {project: document.project, assets: render.assets};
  }

  async function mountCurrent() {
    const revision = metadata.expected.revisionId;
    before.mount(await projectData(revision));
    displayedRevision = revision;
    if (moment && metadata.moments.some(item => item.id === moment)) selectMoment(moment);
    else before.playback();
  }

  async function closeCandidate() {
    candidateId = undefined;
    comparisonVersion = undefined;
    after.hide();
    $('review-previews').dataset.compare = 'false';
    $('review-replay-change').hidden = true;
    $('review-before').querySelector('figcaption').hidden = true;
    syncComparisonChoice();
    await mountCurrent();
    requestSignature = undefined;
  }

  let pendingComparison;
  async function compare(request) {
    if (candidateId === request.id) return;
    if (pendingComparison?.id === request.id) return pendingComparison.ready;
    const ready = mountComparison(request);
    pendingComparison = {id: request.id, ready};
    try {
      await ready;
    } finally {
      if (pendingComparison?.ready === ready) pendingComparison = undefined;
    }
  }

  async function mountComparison(request) {
    const [baseline, candidate] = await Promise.all([
      displayedRevision === request.expected.revisionId ? undefined : projectData(request.expected.revisionId),
      api('/review?candidate=' + encodeURIComponent(request.id)),
    ]);
    if (baseline) {
      before.mount(baseline);
      displayedRevision = request.expected.revisionId;
    }
    comparisonVersion = undefined;
    toggleAttachment(false);
    $('review-previews').dataset.compare = 'true';
    $('review-before').querySelector('figcaption').hidden = false;
    after.show();
    after.mount(candidate);
    candidateId = request.id;
    const requestedMoment = request.notes?.find(note => note.target)?.moment ?? request.notes?.[0]?.moment ?? request.moment;
    const checkpoint = metadata.moments.some(item => item.id === requestedMoment)
      ? requestedMoment : metadata.moments[0]?.id;
    if (checkpoint) selectMoment(checkpoint);
    syncComparisonChoice();
    drawRequests();
  }

  const unresolved = ['waiting', 'claimed', 'needs-scope', 'needs-clarification', 'model-error', 'rejected', 'resolving', 'building'];
  const onCurrentVersion = request => request.expected.revisionId === metadata.expected.revisionId;
  const notesOf = request => request.notes ?? [request];

  function editSavedNotes(request) {
    if (draftText.value.trim() || queuedNotes.length) throw Error('Send or clear your current message before reusing a past one.');
    editingRequestId = request.id;
    const notes = notesOf(request);
    const draft = notes.at(-1);
    const supported = note => metadata.targets.some(target => target.id === note.target && target.moment === note.moment &&
      note.fields.every(id => target.fields.some(field => field.id === id)));
    const normalized = ({target, fields, moment, note, intent}) => ({
      target: target && supported({target, fields, moment}) ? target : null,
      fields: target && supported({target, fields, moment}) ? fields : [],
      moment: metadata.moments.some(item => item.id === moment) ? moment : 'live',
      note,
      ...(intent && metadata.deterministicAuthoring ? {intent} : {}),
    });
    queuedNotes = notes.slice(0, -1).map(normalized);
    draftExpected = metadata.expected;
    queuedExpected = queuedNotes.length ? metadata.expected : undefined;
    draftText.value = draft.note;
    resizeDraft();
    if (metadata.moments.some(item => item.id === draft.moment)) selectMoment(draft.moment);
    if (draft.target && supported(draft)) {
      toggleAttachment(true);
      targetMenu.value = draft.target;
      drawFields();
      for (const input of $('review-field-options').querySelectorAll('input')) input.checked = draft.fields.includes(input.value);
      if (draft.intent?.arguments?.replacementCatalogId && $('review-win-cue-replacement'))
        $('review-win-cue-replacement').value = draft.intent.arguments.replacementCatalogId;
    }
    drawRequests();
    drawQueued();
    $('review-queued').open = true;
    draftText.focus();
  }

  function needsConnection(request) {
    if (request?.receipt?.route === 'deterministic' || request?.intent || request?.notes?.some(note => note.intent)) return false;
    return !metadata.feedbackModel || ['E_MODEL_AUTH', 'E_MODEL_FORBIDDEN'].includes(request?.reason);
  }

  function composeChatTurn(request) {
    const turn = reviewElement('div', '', 'tora-chat-turn');
    const current = onCurrentVersion(request);
    const status = resolvingId === request.id ? 'resolving' : request.status;

    // 1. User message bubble
    const userBubble = reviewElement('div', '', 'tora-bubble tora-bubble-user');
    const userMeta = reviewElement('div', '', 'tora-bubble-meta');
    userMeta.append(reviewElement('strong', 'You'));
    const notes = notesOf(request);
    if (notes.length === 1 && notes[0].target) {
      userMeta.append(reviewElement('span', '🎯 ' + noteLabel(notes[0]), 'tora-pill'));
    }
    userBubble.append(userMeta);
    if (notes.length === 1) {
      userBubble.append(reviewElement('p', notes[0].note));
    } else {
      const list = reviewElement('ul', '', 'review-note-items');
      for (const note of notes) {
        const row = reviewElement('li');
        row.append(reviewElement('strong', noteLabel(note)), reviewElement('p', note.note));
        list.append(row);
      }
      userBubble.append(list);
    }
    turn.append(userBubble);

    // 2. Assistant response bubble
    const botBubble = reviewElement('div', '', 'tora-bubble tora-bubble-assistant');
    botBubble.dataset.status = status;
    const botMeta = reviewElement('div', '', 'tora-bubble-meta');
    botMeta.append(reviewElement('strong', 'Tora'));
    botMeta.append(reviewElement('span', !current && unresolved.includes(status) ? 'Earlier version' : (statusLabels[status] ?? status), 'tora-status-badge'));
    if (request.receipt?.route === 'deterministic') {
      botMeta.append(reviewElement('span', 'Instant · $0', 'review-route'));
    } else if (request.receipt?.route === 'interpretation') {
      const calls = request.receipt.providerCalls?.filter(call => call.phase === 'interpretation').length ?? 0;
      botMeta.append(reviewElement('span', `Interpreted · ${calls} call${calls === 1 ? '' : 's'}`, 'review-route'));
    } else if (['general-agent', 'agent'].includes(request.receipt?.route)) {
      const modelLabel = metadata.connection?.modelLabel || 'Agent';
      botMeta.append(reviewElement('span', modelLabel, 'review-route'));
    }
    botBubble.append(botMeta);

    if (status === 'resolving' || status === 'building') {
      botBubble.append(reviewElement('p', 'Applying your edit, packaging the playable, and running Creative QA…', 'tora-working-copy'));
    }
    if (request.candidate) {
      botBubble.append(reviewElement('p', request.candidate.summary));
    }

    const evidence = request.candidate?.evidence?.filter(item => !request.candidate.summary.includes(item)) ?? [];
    if (evidence.length) {
      const details = reviewElement('details', '', 'tora-diff-details');
      details.append(reviewElement('summary', `Changed records (${evidence.length})`));
      const list = reviewElement('ul');
      for (const item of evidence) list.append(reviewElement('li', item));
      details.append(list);
      botBubble.append(details);
    }

    if (current && status === 'needs-clarification') {
      const form = reviewElement('form', '', 'tora-clarify-form');
      form.append(reviewElement('p', request.question));
      const row = reviewElement('div', '', 'tora-clarify-row');
      const input = reviewElement('input');
      input.type = 'text';
      input.required = true;
      input.maxLength = 2000;
      input.placeholder = 'Reply to Tora…';
      const submit = reviewElement('button', 'Reply ↑', 'review-primary');
      row.append(input, submit);
      form.append(row);
      form.onsubmit = event => {
        event.preventDefault();
        if (input.value.trim()) resolveRequest(request.id, input.value.trim());
      };
      botBubble.append(form);
    }

    if (current && request.reason && status !== 'resolving') {
      const message = errorLabels[request.reason] ?? request.reason;
      const retry = request.retryAt > Date.now() ? ' Available after ' + new Date(request.retryAt).toLocaleTimeString() + '.' : '';
      botBubble.append(reviewElement('p', message + retry));
    }

    const controls = reviewElement('div', '', 'review-actions');
    const action = (label, callback, primary = false, parent = controls) => {
      const button = reviewElement('button', label, primary ? 'review-primary' : '');
      button.type = 'button';
      button.onclick = handle(callback);
      parent.append(button);
      return button;
    };

    if (status === 'candidate' && current) {
      const seenLabels = new Set();
      for (const note of notes) {
        if (!metadata.moments.some(item => item.id === note.moment)) continue;
        const label = noteLabel(note);
        if (seenLabels.has(label)) continue;
        seenLabels.add(label);
        if (notes.length > 1 || candidateId !== request.id) {
          action('Compare ' + label, async () => { await compare(request); selectMoment(note.moment); });
        }
      }
      if (!seenLabels.size && candidateId !== request.id) {
        action('Compare preview', async () => { await compare(request); });
      }
      for (const [checkpoint, label] of [['end-card', 'Replay win'], ['timeout', 'Replay loss']]) {
        if (!request.candidate.audioMoments?.includes(checkpoint) || !metadata.moments.some(item => item.id === checkpoint)) continue;
        const replay = reviewElement('button', label);
        replay.type = 'button';
        replay.onclick = event => {
          if (candidateId !== request.id || !event.isTrusted) return;
          try {
            comparisonVersion = 'after';
            selectMoment(checkpoint);
            syncComparisonChoice();
            after.seek(checkpoint, {motion: true, trustedEvent: event});
          } catch (error) { showError(error); }
        };
        controls.append(replay);
      }
      action('Use this version', async () => {
        await api('/review', {action: 'promote', requestId: request.id});
        metadata = await api('/review');
        await closeCandidate();
        await updateMetadata(false);
        feedbackStatus.textContent = 'Version applied.';
      }, true);
      action('Discard', async () => {
        await api('/review', {action: 'discard', requestId: request.id});
        metadata = await api('/review');
        if (candidateId === request.id) await closeCandidate();
        await updateMetadata(false);
      });
    } else if (status === 'resolving' && request.canResume && !resolvingId) {
      action('Resume', () => resolveRequest(request.id), true);
    } else if (unresolved.includes(status) && !['resolving', 'building'].includes(status)) {
      if (current && needsConnection(request)) {
        const connectBtn = reviewElement('button', 'Connect verified API', 'review-primary');
        connectBtn.type = 'button';
        connectBtn.onclick = () => {
          pendingRetryRequestId = request.id;
          connectionCtrl.open();
        };
        controls.append(connectBtn);
      } else if (current && status !== 'needs-clarification' && metadata.feedbackModel
          && (!request.retryAt || request.retryAt <= Date.now()) && request.reason !== 'E_REVIEW_AGENT_LIMIT') {
        action(status === 'waiting' || status === 'claimed' ? 'Run with AI' : 'Try again', () => resolveRequest(request.id), true);
      }
      action(current ? 'Edit in chat' : 'Reuse', () => editSavedNotes(request));
      if (current && ['waiting', 'claimed', 'rejected'].includes(status)) {
        const manual = reviewElement('details', '', 'review-manual');
        manual.append(reviewElement('summary', 'Use MCP agent ($0)'));
        const instruction = reviewElement('input');
        instruction.setAttribute('aria-label', 'Agent instruction');
        instruction.readOnly = true;
        instruction.value = 'Open Tora review request ' + request.id + ' for project ' + projectId + ' and prepare the requested revision.';
        action('Copy MCP instruction', () => copyInstruction(instruction, feedbackStatus), false, manual);
        manual.append(instruction);
        controls.append(manual);
      }
    } else if (status === 'discarded') {
      action('Reuse', () => editSavedNotes(request));
    }

    if (controls.childElementCount) botBubble.append(controls);
    turn.append(botBubble);
    return turn;
  }

  function drawRequests() {
    const chronological = metadata.requests.filter(request => request.status !== 'superseded');
    const activeCandidate = [...chronological].reverse().find(request => onCurrentVersion(request) && request.status === 'candidate');
    const activeResolving = [...chronological].reverse().find(request => onCurrentVersion(request) && (resolvingId === request.id || ['resolving', 'building'].includes(request.status)));
    $('review-candidate-banner').hidden = !activeCandidate;

    const signature = JSON.stringify([chronological, metadata.expected.revisionId, metadata.feedbackModel, resolvingId, candidateId,
      chronological.map(request => !request.retryAt || request.retryAt <= Date.now())]);
    if (signature === requestSignature) return;
    requestSignature = signature;

    const historyItems = chronological.filter(item => item !== activeCandidate && item !== activeResolving);
    const activeItems = [activeResolving, activeCandidate].filter(Boolean);
    $('review-requests').replaceChildren(...historyItems.map(request => composeChatTurn(request)));
    $('review-active').replaceChildren(...activeItems.map(request => composeChatTurn(request)));
    scrollThread();
  }

  async function updateMetadata(fetchLatest = true, automaticCompare = false) {
    if (fetchLatest) metadata = await api('/review');
    $('review-title').textContent = metadata.name;
    $('review-model-choice').hidden = !metadata.paidFeedbackModel;
    updateRouteHint();
    const staleNote = draftExpected && draftExpected.revisionId !== metadata.expected.revisionId;
    if (staleNote) feedbackStatus.textContent = 'The playable changed. Press play to sync the preview.';
    const activeCandidate = metadata.requests.find(request => request.id === candidateId);
    if (candidateId && (activeCandidate?.status !== 'candidate' || !onCurrentVersion(activeCandidate))) {
      toggleAttachment(false);
      await closeCandidate();
      feedbackStatus.textContent = 'Reopened the latest playable version.';
    }
    drawQueued();
    drawQuickChips();
    $('review-undo').hidden = !metadata.canUndo;
    updateExportButton();
    const isDraftStore = url => !url || url === 'https://play.google.com/store/apps/details?id=com.playablelab.draft' || /id=com\.(?:example|yourcompany|yourapp|demo|test)\./i.test(url);
    if (document.activeElement !== $('review-store-url')) $('review-store-url').value = isDraftStore(metadata.storeUrl) ? '' : (metadata.storeUrl ?? '');
    if (!candidateId && !staleNote && displayedRevision !== metadata.expected.revisionId) await mountCurrent();
    drawRequests();
    const candidate = metadata.requests.findLast(request => request.status === 'candidate' && onCurrentVersion(request));
    if (automaticCompare && candidate && !candidateId && !draftText.value.trim() && !queuedNotes.length) await compare(candidate);
  }

  for (const item of metadata.moments) {
    const button = reviewElement('button', item.label);
    button.type = 'button';
    button.dataset.moment = item.id;
    button.disabled = true;
    button.setAttribute('aria-pressed', 'false');
    button.onclick = handle(() => selectMoment(item.id));
    $('review-moments').append(button);
  }
  $('review-replay-change').onclick = handle(() => {
    const version = comparisonVersion ?? 'after';
    comparisonVersion = version;
    syncComparisonChoice();
    before.seek(moment);
    after.seek(moment);
    (version === 'after' ? after : before).seek(moment, {motion: true});
  });

  async function toggleVersionPlay(version, restart = false) {
    const target = version === 'after' ? after : before;
    const other = version === 'after' ? before : after;
    if (!restart && target.isPlaying()) {
      target.freeze();
      return;
    }
    if (candidateId) {
      comparisonVersion = version;
      other.freeze();
      syncComparisonChoice();
    }
    if (draftText.value.trim()) draftExpected = metadata.expected;
    drawQueued();
    toggleAttachment(false);
    moment = undefined;
    for (const button of $('review-moments').children) button.setAttribute('aria-pressed', 'false');
    if (version === 'before' && !candidateId && displayedRevision !== metadata.expected.revisionId) {
      await mountCurrent();
    } else if (restart) {
      target.playback();
    } else {
      target.resume();
    }
    feedbackStatus.textContent = '';
  }

  $('review-before-toggle').onclick = handle(() => toggleVersionPlay('before', false));
  $('review-before-restart').onclick = handle(() => toggleVersionPlay('before', true));
  $('review-after-toggle').onclick = handle(() => toggleVersionPlay('after', false));
  $('review-after-restart').onclick = handle(() => toggleVersionPlay('after', true));
  orientation.onchange = handle(() => {
    $('review-previews').dataset.orientation = orientation.value;
    before.orient();
    after.orient();
    before.freeze();
    if (candidateId) after.freeze();
    if (moment && metadata.moments.some(item => item.id === moment)) selectMoment(moment);
  });

  $('review-note-toggle').onclick = handle(() => toggleAttachment(attachment.hidden));
  $('review-clear-target').onclick = handle(() => toggleAttachment(false));
  targetMenu.onchange = drawFields;

  $('rev-menu-target').onclick = () => {
    popover.close();
    toggleAttachment(true);
    targetMenu.focus();
  };
  $('rev-menu-asset').onclick = () => {
    popover.close();
    $('review-asset-picker').click();
  };
  $('rev-menu-ref').onclick = () => {
    popover.close();
    $('review-ref-picker').click();
  };
  $('rev-menu-queue').onclick = handle(() => {
    popover.close();
    if (!draftText.value.trim()) throw Error('Write a message first, then click Queue to add another note to the same turn.');
    queuedExpected ??= draftExpected ?? metadata.expected;
    queuedNotes.push(readDraft());
    draftExpected = undefined;
    draftText.value = '';
    resizeDraft();
    toggleAttachment(false);
    drawQueued();
    $('review-queued').open = true;
    draftText.focus();
  });

  $('review-asset-picker').onchange = handle(async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (candidateId) throw Error('Apply or discard the active candidate before uploading a new asset.');
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    feedbackStatus.textContent = `Preparing ${file.name}…`;
    const prepared = ['wav', 'mp3', 'ogg', 'm4a', 'aac'].includes(ext)
      ? await prepareAudioFile(file)
      : await prepareImageFile(file, {asReference: false});
    const baseId = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^[^a-z]+/, 'asset-').slice(0, 60);
    const assetId = `${baseId || 'asset'}-${Date.now().toString(36).slice(-4)}`;
    feedbackStatus.textContent = `Uploading ${prepared.name}…`;
    await api('/assets', {
      expected: metadata.expected,
      asset: {
        id: assetId,
        mime: prepared.mime,
        data: prepared.data,
        rights: 'Creator uploaded directly in Tora Studio chat and confirmed commercial rights.',
      },
    });
    feedbackStatus.textContent = '';
    const log = reviewElement('div', '', 'tora-bubble tora-bubble-assistant');
    const meta = reviewElement('div', '', 'tora-bubble-meta');
    meta.append(reviewElement('strong', 'Tora'), reviewElement('span', 'Asset added', 'tora-status-badge'));
    log.append(meta, reviewElement('p', `Added "${prepared.name}" (${formatBytes(prepared.bytes)}) as asset "${assetId}". Tell me in chat where you'd like to use it!`));
    $('review-local-log').append(log);
    await updateMetadata();
    scrollThread();
  });

  $('review-ref-picker').onchange = handle(async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (file.type.startsWith('video/') || ['mp4', 'webm', 'mov'].includes(ext)) {
      feedbackStatus.textContent = `Grabbing visual keyframe from ${file.name}…`;
      const extracted = await extractVideoKeyframes(file, {frameCount: 1});
      attachedRefFrame = extracted.frames[0];
    } else {
      feedbackStatus.textContent = `Preparing reference photo ${file.name}…`;
      attachedRefFrame = await prepareImageFile(file, {asReference: true});
    }
    feedbackStatus.textContent = '';
    renderRefStrip();
    draftText.focus();
  });

  before.picker.onclick = event => {
    const hit = before.pick(event);
    const cell = metadata.module === 'harvest-restore' && moment === 'opening' && hit.map(id => /^harvest\.tile\.(\d+)\.(\d+)$/.exec(id)).find(Boolean);
    const cropGroup = cell && before.state().match.boards['harvest.board']?.groups[Number(cell[1]) * 5 + Number(cell[2])];
    const target = metadata.targets.find(item => item.moment === moment && (item.cropGroup
      ? item.cropGroup === cropGroup
      : item.componentIds.some(id => hit.includes(id))));
    targetMenu.value = target?.id ?? '';
    drawFields();
  };
  new ResizeObserver(paintOutline).observe(before.picker);

  function noteLabel(note) {
    return metadata.targets.find(item => item.id === note.target)?.label
      ?? metadata.moments.find(item => item.id === note.moment)?.label
      ?? 'Whole playable';
  }

  function drawQueued() {
    const stale = [queuedExpected, draftExpected].some(expected => expected && expected.revisionId !== metadata.expected.revisionId);
    const hasText = Boolean(draftText.value.trim());
    const hasDirect = !attachment.hidden && Boolean(
      $('review-direct-text')?.value ||
      [...$('review-field-options').querySelectorAll('input[data-direct-timing-field]')].some(input => input.value) ||
      $('review-win-cue-replacement')?.value);
    const unavailable = Boolean(candidateId);
    $('review-note-toggle').hidden = !metadata.targets.length;
    $('review-note-toggle').disabled = unavailable;
    draftText.disabled = unavailable;
    $('review-queued').hidden = queuedNotes.length === 0;
    $('review-queued-label').textContent = queuedNotes.length + (queuedNotes.length === 1 ? ' note queued' : ' notes queued');
    $('review-submit').disabled = stale || unavailable || (!hasText && !hasDirect && !queuedNotes.length);
    const signature = JSON.stringify([stale, queuedNotes.map(note => [note.target, note.moment, note.note, note.intent])]);
    if (signature === queuedSignature) return;
    queuedSignature = signature;
    const items = queuedNotes.map((note, index) => {
      const item = reviewElement('li');
      item.append(reviewElement('strong', noteLabel(note)), reviewElement('p', note.note));
      const remove = reviewElement('button', 'Remove');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove note ' + (index + 1));
      remove.onclick = handle(() => {
        queuedNotes.splice(index, 1);
        if (!queuedNotes.length) queuedExpected = undefined;
        drawQueued();
      });
      item.append(remove);
      return item;
    });
    if (queuedNotes.length && stale) items.push(reviewElement('li', 'Remove these notes to revise the current version.'));
    $('review-queued-notes').replaceChildren(...items);
  }

  function readDraft() {
    const text = draftText.value.trim();
    const target = attachment.hidden ? null : targetMenu.value || null;
    const fields = target ? [...$('review-field-options').querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value) : [];
    if (target && !fields.length) throw Error('Choose at least one allowed field for the selected part.');
    const frame = attachedRefFrame?.data && attachedRefFrame.data.length < 250000
      ? attachedRefFrame.data
      : before.capture();
    const replacementCatalogId = target === 'ending' && fields.includes('win-cue')
      ? $('review-win-cue-replacement')?.value : '';
    const directText = target === 'cta' && fields.includes('text') ? $('review-direct-text')?.value : '';
    const timingField = fields.find(field => ['hint-delay', 'reveal-duration', 'payoff-hold', 'feedback-duration'].includes(field));
    const timingInput = timingField && $('review-field-options').querySelector(`input[data-direct-timing-field="${timingField}"]`);
    const directSeconds = timingInput ? timingInput.valueAsNumber : undefined;
    if ((replacementCatalogId || directText || Number.isFinite(directSeconds)) && fields.length !== 1)
      throw Error('Send an instant edit with only its selected field checked.');
    let intent;
    let note = text;
    if (replacementCatalogId) {
      intent = {
        format: 'tora-authoring-intent-1', noteId: '1', action: 'transferOutcomeCue', targetRole: 'outcomeCues',
        arguments: {sourceOutcome: 'win', destinationOutcome: 'loss', replacementCatalogId},
        constraints: {replacementMustBeNew: true, preserveOrdinaryCues: true}, requiredChecks: ['win-audio', 'loss-audio'],
      };
      note ||= 'Move the current win cue to loss and use the selected new win cue.';
    } else if (directText) {
      if (directText.trim() !== directText) throw Error('Remove leading or trailing spaces in the button wording.');
      intent = {
        format: 'tora-authoring-intent-1', noteId: '1', action: 'replaceText', targetRole: 'primaryCta',
        arguments: {text: directText}, constraints: {literal: true}, requiredChecks: ['package', 'diff-1'],
      };
      note ||= `Change the selected CTA to "${directText}"`;
    } else if (Number.isFinite(directSeconds)) {
      intent = {
        format: 'tora-authoring-intent-1', noteId: '1', action: 'setTiming', targetRole: 'reviewTiming',
        arguments: {field: timingField, seconds: directSeconds}, constraints: {absolute: true}, requiredChecks: ['package', 'diff-1'],
      };
      note ||= `Set the selected timing to ${directSeconds} seconds.`;
    }
    return {target, fields, moment: moment ?? visibleMoment(), note, ...(frame && frame.length < 250000 ? {frame} : {}), ...(intent ? {intent} : {})};
  }

  draftText.oninput = () => {
    if (draftText.value.trim()) draftExpected ??= metadata.expected;
    else draftExpected = undefined;
    drawQueued();
  };

  function resolveRequest(requestId, answer) {
    if (resolvingId) return;
    resolvingId = requestId;
    drawRequests();
    void api('/review', answer ? {action: 'answer', requestId, answer} : {action: 'resolve', requestId}).then(() =>
      handle(async () => {
        resolvingId = undefined;
        await updateMetadata(true, true);
      }, false)(),
    error => handle(async () => {
      resolvingId = undefined;
      await updateMetadata();
      throw error;
    }, false)());
  }

  notePanel.onsubmit = handle(async () => {
    const hasDirect = !attachment.hidden && Boolean(
      $('review-direct-text')?.value ||
      [...$('review-field-options').querySelectorAll('input[data-direct-timing-field]')].some(input => input.value) ||
      $('review-win-cue-replacement')?.value);
    if (!queuedNotes.length && !draftText.value.trim() && !hasDirect) return;
    const expected = queuedExpected ?? draftExpected ?? metadata.expected;
    if (expected.revisionId !== metadata.expected.revisionId ||
      (draftExpected && draftExpected.revisionId !== metadata.expected.revisionId)) throw Error(errorLabels.E_REVIEW_STALE);
    const notes = draftText.value.trim() || hasDirect ? [...queuedNotes, readDraft()] : queuedNotes;
    if (notes.length !== 1 && notes.some(note => note.intent)) throw Error('Send each instant edit on its own.');
    const paid = Boolean(metadata.paidFeedbackModel) && $('review-model').value === 'paid';
    const replaced = metadata.requests.find(request => request.id === editingRequestId && onCurrentVersion(request) && unresolved.includes(request.status));
    const input = {action: 'request', expected, notes, ...(paid ? {paid} : {}), ...(replaced ? {replacesRequestId: replaced.id} : {})};
    const fingerprint = JSON.stringify({...input, notes: notes.map(({target, fields, moment, note, intent}) => ({target, fields, moment, note, intent}))});
    if (new Blob([JSON.stringify(input)]).size > 1048400) throw Error('These notes are too large together. Remove one and retry.');
    if (pendingRequest?.fingerprint !== fingerprint) pendingRequest = {fingerprint, input, id: crypto.randomUUID()};
    $('review-submit').disabled = true;
    $('review-submit').textContent = 'Working…';
    let result;
    try {
      result = await api('/review', {...pendingRequest.input, requestId: pendingRequest.id});
    } finally {
      $('review-submit').textContent = 'Send ↑';
      drawQueued();
    }
    pendingRequest = undefined;
    $('review-model').value = 'free';
    draftText.value = '';
    resizeDraft();
    draftExpected = undefined;
    queuedNotes = [];
    queuedExpected = undefined;
    editingRequestId = undefined;
    attachedRefFrame = null;
    renderRefStrip();
    toggleAttachment(false);
    await updateMetadata(true, true);
    if (result?.status === 'waiting' && needsConnection(result)) {
      pendingRetryRequestId = result.id;
    }
  });

  async function syncOptionalStoreUrl() {
    const entered = $('review-store-url').value.trim();
    if (!entered || entered === metadata.storeUrl) return;
    await api('/review', {action: 'store', expected: metadata.expected, url: entered});
    metadata = await api('/review');
    if (candidateId) await closeCandidate();
  }

  $('review-store').onsubmit = handle(async () => {
    const entered = $('review-store-url').value.trim();
    if (!entered) return;
    await syncOptionalStoreUrl();
    feedbackStatus.textContent = 'Store destination saved.';
    await updateMetadata(false);
  });
  $('review-undo').onclick = handle(async () => {
    await api('/history', {expected: metadata.expected, action: 'undo'});
    metadata = await api('/review');
    if (candidateId) await closeCandidate();
    await updateMetadata(false);
  });
  $('review-export').onclick = handle(async () => {
    if (candidateId) throw Error('Choose Use this version or Discard before exporting.');
    const target = selectedExportTarget();
    await syncOptionalStoreUrl();
    if (target.requiresStoreUrl && /id=com\.(?:example|yourcompany|yourapp|demo|test)\./i.test(metadata.storeUrl ?? '')) {
      $('review-store-url').focus();
      throw Error('E_ARTIFACT_PLACEHOLDER');
    }
    const {revisionId, contentHash} = metadata.expected;
    const {html} = await api('/export', {revisionId, target: target.id});
    if (!metadata.accepted) await api('/accept', {revisionId, contentHash});
    download(projectId + '-' + target.filenameSuffix + '.html', html, 'text/html');
    const draftHint = metadata.storeUrl === 'https://play.google.com/store/apps/details?id=com.playablelab.draft' ? ' Replace the draft Store URL before uploading to a live campaign.' : '';
    feedbackStatus.textContent = `Approved revision downloaded for ${target.label}. Static and mock-host checks passed; official preview and device verification are still required.${draftHint}`;
    await updateMetadata();
  });
  $('review-export-draft').onclick = handle(async () => {
    if (candidateId) throw Error('Choose Use this version or Discard before exporting.');
    await syncOptionalStoreUrl();
    const {revisionId} = metadata.expected;
    const {html} = await api('/export', {revisionId, target: 'standalone-browser-draft'});
    download(projectId + '-draft.html', html, 'text/html');
    feedbackStatus.textContent = 'Standalone browser draft downloaded.';
  });
  $('review-bundle').onclick = handle(async () => {
    const bundle = await api('/review?bundle=1');
    download(projectId + '.tora.json', bundle.text ?? JSON.stringify(bundle), 'application/json');
    feedbackStatus.textContent = 'Editable project downloaded.';
  });

  const refresh = handle(() => updateMetadata(true, true), false);
  try {
    await loadRuntime();
    await connectionCtrl.refresh();
    await mountCurrent();
    initialized = true;
    await updateMetadata(false, true);
    for (const name of ['review-before-toggle', 'review-before-restart', 'review-after-toggle', 'review-after-restart', 'review-orientation', 'review-export', 'review-export-draft', 'review-bundle']) $(name).disabled = false;
    for (const button of $('review-moments').children) button.disabled = false;
    setInterval(() => { if (!document.hidden && !busy) void refresh(); }, 1800);
  } catch (error) {
    showError(error);
  }
}
