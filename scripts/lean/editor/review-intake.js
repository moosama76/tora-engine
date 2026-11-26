/* global document,setInterval,URLSearchParams,location */
import {
  copyInstruction,
  createApiConnectionController,
  errorLabels,
  extractVideoKeyframes,
  formatBytes,
  populateDemosMenu,
  prepareAudioFile,
  prepareImageFile,
  reviewElement,
  reviewRequest,
  reviewShell,
  wireAutoGrowTextarea,
  wirePopoverMenu,
} from './review-editor.js';

const intakePath = '/api/review-intakes';

const statusLabels = {
  draft: 'Draft — add more assets in chat if needed',
  queued: 'Ready for build — waiting for agent',
  claimed: 'Building your first playable…',
  building: 'Building your playable…',
  failed: 'Build needs attention',
  cancelled: 'Build cancelled',
  ready: 'Playable ready to review',
};

const ASSET_DEGREES = [
  {
    index: 0,
    key: 'studio-assets',
    label: 'My assets only',
    pill: 'Your art & sounds',
    description: 'Uses strictly your uploaded art and sounds — no third-party files, no AI-generated media.',
    hint: 'My assets only · Attach your art & sounds with + or drag & drop here',
    needsFiles: true,
    needsRights: true,
  },
  {
    index: 1,
    key: 'hybrid-free',
    label: 'My assets + free assets',
    pill: 'Hybrid · Commercial use',
    description: 'Uses your uploaded art and sounds, and fills any gaps with verified commercial-use free assets (never AI-generated).',
    hint: 'My assets + free assets · Attach your files with + and Tora fills gaps with free licensed media',
    needsFiles: true,
    needsRights: true,
  },
  {
    index: 2,
    key: 'free-licensed',
    label: 'Free assets only',
    pill: 'Free · Commercial use',
    description: 'Sources verified commercial-use free art and sounds matching your brief — never generates AI media. Attach photos or video with + for reference.',
    hint: 'Free assets only · Zero AI-generated art or audio',
    needsFiles: false,
    needsRights: false,
  },
];

function deriveTitle(prompt, fallback) {
  const named = prompt.match(/(?:called|named|titled)\s+["“]?([A-Za-z0-9][A-Za-z0-9 &!' -]{1,36})["”]?/i);
  if (named) {
    const cleaned = named[1].replace(/\b(?:with|for|that|where|using)\b.*$/i, '').trim();
    if (cleaned.length >= 2) return cleaned.slice(0, 40);
  }
  const words = prompt.replace(/https?:\/\/\S+/g, '').replace(/[^A-Za-z0-9 ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return words.slice(0, 3).map(w => w[0].toUpperCase() + w.slice(1)).join(' ').slice(0, 40);
  return fallback;
}

function slugify(text, fallback = 'my-playable') {
  const base = String(text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^[^a-z]+/, '').replace(/-+$/, '').slice(0, 38);
  const rand = Math.random().toString(36).slice(2, 6);
  return (base.length >= 2 ? base : fallback) + '-' + rand;
}

export async function openIntake(initialIntakeId) {
  const $ = reviewShell(`
    <header class="review-header">
      <img class="review-wordmark" src="./brand/tora-wordmark.svg" alt="Tora">
      <h1>New playable</h1>
      <nav class="review-actions" aria-label="Workspace actions">
        <details class="review-menu tora-demo-menu" id="intake-demos" hidden>
          <summary>Demos</summary>
          <div class="tora-demo-list" id="intake-demo-list"></div>
        </details>
        <button type="button" class="tora-api-pill" id="intake-api-pill" data-connected="false">Connect API</button>
        <a class="review-button" id="intake-back" hidden>Back to project</a>
        <details class="review-menu" id="intake-projects" hidden>
          <summary>Open project</summary>
          <div><form id="intake-existing">
            <label>Playable project <select id="intake-project-choice" required></select></label>
            <button type="submit">Open playable</button>
          </form></div>
        </details>
      </nav>
    </header>
    <main class="tora-creator-wrap">
      <div class="tora-creator-card">
        <div class="tora-asset-policy-banner">
          <span class="tora-policy-badge">Real assets only</span>
          <p>Tora builds with <strong>your uploaded files</strong> or <strong>verified free licensed assets</strong> (art &amp; sounds) — it never generates AI media.</p>
        </div>

        <section class="tora-source-slider-card" aria-label="Asset source">
          <div class="tora-slider-head">
            <strong>Asset &amp; sound source</strong>
            <span class="tora-pill" id="asset-degree-pill">Your art &amp; sounds</span>
          </div>
          <div class="tora-slider-control" data-degree="0" id="asset-slider-wrap">
            <div class="tora-slider-track" aria-hidden="true">
              <div class="tora-slider-fill" id="asset-slider-fill"></div>
              <span class="tora-slider-dot" data-stop="0"></span>
              <span class="tora-slider-dot" data-stop="1"></span>
              <span class="tora-slider-dot" data-stop="2"></span>
            </div>
            <input type="range" id="asset-source-slider" min="0" max="2" step="1" value="0" aria-label="Asset source degree" aria-valuetext="My assets only">
          </div>
          <div class="tora-slider-stops" role="radiogroup" aria-label="Asset source">
            <button type="button" class="tora-stop-btn" id="source-stop-0" data-degree="0" role="radio" aria-checked="true" data-active="true">My assets only</button>
            <button type="button" class="tora-stop-btn" id="source-stop-1" data-degree="1" role="radio" aria-checked="false" data-active="false">My assets + free assets</button>
            <button type="button" class="tora-stop-btn" id="source-stop-2" data-degree="2" role="radio" aria-checked="false" data-active="false">Free assets only</button>
          </div>
          <p class="tora-slider-desc" id="asset-degree-desc"></p>
          <label class="tora-rights-check" id="intake-rights-wrap">
            <input type="checkbox" id="intake-rights-confirm">
            <span>I have commercial rights to use my uploaded assets in this playable ad.</span>
          </label>
        </section>

        <section class="tora-chat-thread" id="intake-thread" aria-live="polite" aria-label="Conversation"></section>

        <form class="tora-composer" id="intake-composer">
          <div class="tora-attach-strip" id="intake-attachments" hidden></div>
          <div class="tora-composer-bar">
            <div class="tora-plus-wrap">
              <button type="button" class="tora-plus-btn" id="intake-plus-btn" aria-label="Add assets, photos, or video" aria-expanded="false" aria-controls="intake-plus-menu">+</button>
              <div class="tora-plus-menu" id="intake-plus-menu" hidden role="menu">
                <button type="button" role="menuitem" id="menu-add-assets"><strong>Add game assets</strong><span>PNG, JPEG sprites or WAV/MP3 audio</span></button>
                <button type="button" role="menuitem" id="menu-add-photos"><strong>Add reference photos</strong><span>Screenshots, UI mockups, art style</span></button>
                <button type="button" role="menuitem" id="menu-add-video"><strong>Add gameplay video</strong><span>MP4 / WebM / MOV — extracts keyframes</span></button>
              </div>
            </div>
            <textarea id="intake-prompt" rows="1" maxlength="2000" placeholder="Describe your playable…"></textarea>
            <button type="submit" class="review-primary tora-send-btn" id="intake-send" aria-label="Send">Send ↑</button>
          </div>
          <div class="tora-composer-foot">
            <span id="intake-connection-hint"></span>
            <span id="intake-mode-hint"></span>
            <span id="intake-status" role="status"></span>
          </div>
          <p id="intake-error" class="review-error" role="alert"></p>
          <input type="file" id="picker-assets" accept=".png,.jpg,.jpeg,.wav,.mp3,.ogg,.m4a" multiple hidden>
          <input type="file" id="picker-photos" accept=".png,.jpg,.jpeg,.webp,image/*" multiple hidden>
          <input type="file" id="picker-video" accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov" hidden>
        </form>
      </div>
      <section class="tora-demo-strip" id="intake-demo-strip" aria-label="Demo playables" hidden>
        <div class="tora-demo-strip-head">
          <h2>Open a demo playable</h2>
          <span>Inspect, tweak, and export Tora-authored demos</span>
        </div>
        <div class="tora-demo-grid" id="intake-demo-grid"></div>
      </section>
    </main>
  `);

  const from = new URLSearchParams(location.search).get('from');
  if (from) {
    $('intake-back').href = '?project=' + encodeURIComponent(from);
    $('intake-back').hidden = false;
  }

  const connectionCtrl = createApiConnectionController({pillButton: $('intake-api-pill'), onStatusChange: updateConnectionHint});
  void connectionCtrl.refresh();

  populateDemosMenu($('intake-demos'), $('intake-demo-list')).then(demos => {
    if (!demos.length) return;
    const grid = $('intake-demo-grid');
    grid.replaceChildren(...demos.map(demo => {
      const card = reviewElement('button', '', 'tora-demo-card');
      card.type = 'button';
      card.dataset.demoId = demo.id;
      const head = reviewElement('div', '', 'tora-demo-card-head');
      head.append(reviewElement('strong', demo.name), reviewElement('span', demo.genre, 'tora-pill'));
      const cta = reviewElement('span', 'Open in editor →', 'tora-demo-card-cta');
      card.append(head, reviewElement('p', demo.tagline), cta);
      card.onclick = async () => {
        card.disabled = true;
        cta.textContent = 'Opening…';
        try {
          const opened = await reviewRequest('/api/demos/open', {id: demo.id});
          location.href = '?project=' + encodeURIComponent(opened.projectId ?? demo.id);
        } catch (failure) {
          card.disabled = false;
          cta.textContent = 'Open in editor →';
          setError(failure.message);
        }
      };
      return card;
    }));
    $('intake-demo-strip').hidden = false;
  });

  reviewRequest('/api/projects').then(({projects}) => {
    const native = projects.filter(project => project.kind === 'native-scene');
    if (!native.length) return;
    const selector = $('intake-project-choice');
    selector.replaceChildren(...native.map(project => {
      const title = project.name && project.name !== project.id ? project.name + ' · ' + project.id : project.id;
      const option = reviewElement('option', title);
      option.value = project.id;
      return option;
    }));
    $('intake-existing').onsubmit = event => {
      event.preventDefault();
      location.href = '?project=' + encodeURIComponent(selector.value);
    };
    $('intake-projects').hidden = false;
  }).catch(() => {});

  let degreeIndex = 0;
  let pendingAttachments = [];
  let activeIntakeId = initialIntakeId || null;
  let activeIntake = null;
  let busy = false;
  let autoOpenTimer;
  let autoOpenWhenReady = false;
  let lastRenderedStatus = null;

  function updateConnectionHint(status) {
    const hint = $('intake-connection-hint');
    if (!hint) return;
    const connected = Boolean(status?.configured && status.verified);
    hint.dataset.connected = String(connected);
    if (connected) {
      hint.textContent = `Builds with ${status.providerLabel} · ${status.modelLabel}`;
    } else {
      const connectBtn = reviewElement('button', 'Connect API', 'tora-link-btn');
      connectBtn.type = 'button';
      connectBtn.onclick = () => connectionCtrl.open();
      hint.replaceChildren(
        document.createTextNode('No API key connected — Send creates a $0 MCP brief · '),
        connectBtn,
      );
    }
  }

  const thread = $('intake-thread');
  const promptInput = $('intake-prompt');
  const statusEl = $('intake-status');
  const errorEl = $('intake-error');
  const slider = $('asset-source-slider');
  const setError = message => { errorEl.textContent = message ? (errorLabels[message] ?? message) : ''; };
  const scrollThread = () => { thread.scrollTop = thread.scrollHeight; };
  const currentDegree = () => ASSET_DEGREES[degreeIndex] ?? ASSET_DEGREES[0];

  const popover = wirePopoverMenu($('intake-plus-btn'), $('intake-plus-menu'));
  const resizePrompt = wireAutoGrowTextarea(promptInput, {
    onSubmit: () => $('intake-composer').requestSubmit(),
  });

  function setDegree(nextIndex) {
    degreeIndex = Math.max(0, Math.min(2, Number(nextIndex) || 0));
    const mode = currentDegree();
    slider.value = String(degreeIndex);
    slider.setAttribute('aria-valuetext', mode.label);
    $('asset-slider-wrap').dataset.degree = String(degreeIndex);
    $('asset-slider-fill').style.width = (degreeIndex * 50) + '%';
    const pill = $('asset-degree-pill');
    pill.textContent = mode.pill;
    pill.className = degreeIndex === 2 ? 'tora-pill tora-pill-mint' : 'tora-pill';
    $('asset-degree-desc').textContent = mode.description;
    $('intake-rights-wrap').hidden = !mode.needsRights;
    $('intake-mode-hint').textContent = mode.hint;
    for (let i = 0; i < 3; i++) {
      const stop = $('source-stop-' + i);
      const active = i === degreeIndex;
      stop.dataset.active = String(active);
      stop.setAttribute('aria-checked', String(active));
    }
  }

  slider.addEventListener('input', () => setDegree(slider.value));
  for (let i = 0; i < 3; i++) {
    $('source-stop-' + i).onclick = () => setDegree(i);
  }
  setDegree(0);

  function renderAttachments() {
    const strip = $('intake-attachments');
    strip.hidden = pendingAttachments.length === 0;
    strip.replaceChildren(...pendingAttachments.map((item, index) => {
      const chip = reviewElement('div', '', 'tora-attach-chip');
      chip.dataset.kind = item.kind;
      if (item.videoFrames) {
        const thumbs = reviewElement('div', '', 'tora-video-strip');
        for (const frame of item.videoFrames) {
          const img = reviewElement('img');
          img.src = frame.previewUrl;
          img.alt = '';
          thumbs.append(img);
        }
        chip.append(thumbs);
      } else if (item.previewUrl) {
        const img = reviewElement('img');
        img.src = item.previewUrl;
        img.alt = '';
        chip.append(img);
      } else {
        chip.append(reviewElement('span', '🔊', 'tora-attach-icon'));
      }
      const info = reviewElement('div', '', 'tora-attach-info');
      info.append(reviewElement('strong', item.name));
      const detail = item.videoFrames
        ? `Video · ${item.durationSec}s · ${item.videoFrames.length} keyframes`
        : item.kind === 'reference'
          ? `Reference photo · ${formatBytes(item.bytes)}`
          : `${item.mime === 'audio/wav' ? (item.converted ? 'Audio → WAV' : 'WAV audio') : 'Game sprite'} · ${formatBytes(item.bytes)}`;
      info.append(reviewElement('span', detail));
      const remove = reviewElement('button', '×', 'tora-attach-remove');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove ' + item.name);
      remove.onclick = () => {
        pendingAttachments.splice(index, 1);
        renderAttachments();
      };
      chip.append(info, remove);
      return chip;
    }));
  }

  async function addFiles(fileList, mode = 'auto') {
    const files = [...(fileList ?? [])];
    if (!files.length) return;
    setError('');
    for (const file of files) {
      try {
        const type = file.type || '';
        const ext = (file.name.split('.').pop() || '').toLowerCase();
        if (mode === 'video' || type.startsWith('video/') || ['mp4', 'webm', 'mov'].includes(ext)) {
          statusEl.textContent = `Extracting keyframes from ${file.name}…`;
          const extracted = await extractVideoKeyframes(file);
          pendingAttachments.push({
            kind: 'reference',
            name: extracted.name,
            durationSec: extracted.durationSec,
            videoFrames: extracted.frames,
          });
        } else if (mode === 'photo') {
          statusEl.textContent = `Preparing photo ${file.name}…`;
          pendingAttachments.push(await prepareImageFile(file, {asReference: true}));
        } else if (type.startsWith('audio/') || ['wav', 'mp3', 'ogg', 'm4a', 'aac'].includes(ext)) {
          statusEl.textContent = `Preparing audio ${file.name}…`;
          pendingAttachments.push(await prepareAudioFile(file));
        } else if (type.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
          const asRef = ext === 'webp' || degreeIndex === 2;
          statusEl.textContent = `Preparing image ${file.name}…`;
          pendingAttachments.push(await prepareImageFile(file, {asReference: asRef}));
        } else {
          throw Error(`Unsupported file "${file.name}". Attach PNG/JPEG sprites, WAV/MP3 audio, photos, or MP4/WebM video.`);
        }
      } catch (failure) {
        setError(failure.message);
      }
    }
    statusEl.textContent = '';
    renderAttachments();
  }

  $('menu-add-assets').onclick = () => { popover.close(); $('picker-assets').click(); };
  $('menu-add-photos').onclick = () => { popover.close(); $('picker-photos').click(); };
  $('menu-add-video').onclick = () => { popover.close(); $('picker-video').click(); };

  $('picker-assets').onchange = async event => {
    await addFiles(event.target.files, 'asset');
    event.target.value = '';
  };
  $('picker-photos').onchange = async event => {
    await addFiles(event.target.files, 'photo');
    event.target.value = '';
  };
  $('picker-video').onchange = async event => {
    await addFiles(event.target.files, 'video');
    event.target.value = '';
  };

  const composerEl = $('intake-composer');
  composerEl.addEventListener('dragover', event => {
    event.preventDefault();
    composerEl.dataset.dragover = 'true';
  });
  composerEl.addEventListener('dragleave', () => { composerEl.dataset.dragover = 'false'; });
  composerEl.addEventListener('drop', async event => {
    event.preventDefault();
    composerEl.dataset.dragover = 'false';
    await addFiles(event.dataTransfer?.files, 'auto');
  });
  promptInput.addEventListener('paste', async event => {
    const items = [...(event.clipboardData?.files ?? [])];
    if (items.length) {
      event.preventDefault();
      await addFiles(items, 'photo');
    }
  });

  function appendUserBubble(text, attachments = []) {
    const bubble = reviewElement('div', '', 'tora-bubble tora-bubble-user');
    bubble.append(reviewElement('div', '', 'tora-bubble-meta'));
    bubble.firstChild.append(reviewElement('strong', 'You'));
    if (text) bubble.append(reviewElement('p', text));
    if (attachments.length) {
      const gallery = reviewElement('div', '', 'tora-msg-attachments');
      for (const item of attachments) {
        if (item.videoFrames) {
          for (const frame of item.videoFrames) {
            const fig = reviewElement('div', '', 'tora-msg-thumb');
            const img = reviewElement('img');
            img.src = frame.previewUrl;
            img.alt = frame.name;
            fig.append(img, reviewElement('span', `${item.name} · ${frame.timestampSec}s`));
            gallery.append(fig);
          }
        } else if (item.previewUrl) {
          const fig = reviewElement('div', '', 'tora-msg-thumb');
          const img = reviewElement('img');
          img.src = item.previewUrl;
          img.alt = item.name;
          fig.append(img, reviewElement('span', item.name));
          gallery.append(fig);
        } else {
          gallery.append(reviewElement('span', '🔊 ' + item.name, 'tora-pill'));
        }
      }
      bubble.append(gallery);
    }
    thread.append(bubble);
    scrollThread();
    return bubble;
  }

  function appendAssistantBubble(title, text, bodyNodes = []) {
    const bubble = reviewElement('div', '', 'tora-bubble tora-bubble-assistant');
    const meta = reviewElement('div', '', 'tora-bubble-meta');
    meta.append(reviewElement('strong', 'Tora'));
    if (title) meta.append(reviewElement('span', title));
    bubble.append(meta);
    if (text) bubble.append(reviewElement('p', text));
    for (const node of bodyNodes) bubble.append(node);
    thread.append(bubble);
    scrollThread();
    return bubble;
  }

  function formatTokens(count) {
    const n = Number(count) || 0;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
    return String(n);
  }

  function renderBuildProgress(intake) {
    const build = intake.build ?? {}, wrap = reviewElement('div', '', 'tora-build-progress');
    const head = reviewElement('div', '', 'tora-build-progress-head');
    const stepText = `Step ${build.turn ?? 0} / ${build.maxTurns ?? 12}${build.usage?.totalTokens ? ` · ${formatTokens(build.usage.totalTokens)} tokens` : ''}`;
    head.append(reviewElement('strong', build.stepLabel ?? 'Building your playable…'), reviewElement('span', stepText));
    const milestones = [
      ['brief', 'Reading brief & uploads'],
      ['assets', 'Sourcing licensed CC0 assets'],
      ['authoring', 'Authoring scene & controls'],
      ['qa', 'Testing 4 screen sizes & audio'],
      ['repair', 'Polishing visuals…'],
    ];
    const currentPhase = build.phase === 'repair' ? 4 : Math.max(0, milestones.findIndex(item => item[0] === build.phase));
    const list = reviewElement('ol', '', 'tora-build-milestones');
    milestones.forEach(([, label], index) => {
      const item = reviewElement('li', label);item.dataset.state = index < currentPhase ? 'done' : index === currentPhase ? 'active' : 'pending';list.append(item);
    });
    const controls = reviewElement('div', '', 'tora-build-controls');
    const cancel = reviewElement('button', 'Cancel build');cancel.type = 'button';cancel.className = 'tora-cancel-build';
    cancel.onclick = async () => {
      cancel.disabled = true;
      try { activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(intake.id)}/cancel`, {}); refreshIntakeCard(activeIntake); }
      catch (failure) { cancel.disabled = false; setError(failure.message); }
    };
    const autoLabel = reviewElement('label', '', 'tora-auto-open'), auto = reviewElement('input');
    auto.type = 'checkbox';
    auto.checked = autoOpenWhenReady;
    auto.onchange = () => { autoOpenWhenReady = auto.checked; };
    autoLabel.append(auto, document.createTextNode(' Auto-open when ready (2s)'));
    controls.append(cancel, autoLabel);
    wrap.append(head, list, controls);return wrap;
  }

  function renderCompletion(intake, shouldAutoOpen = false) {
    const build = intake.build ?? {}, wrap = reviewElement('div', '', 'tora-completion-card');
    const top = reviewElement('div', '', 'tora-completion-top');
    top.append(reviewElement('span', 'Playable ready', 'tora-completion-kicker'), reviewElement('span', build.qa?.warningCount ? `${build.qa.warningCount} QA warnings` : 'QA Passed', 'tora-qa-badge'));
    const title = reviewElement('h2', build.title ?? intake.name);
    const summary = reviewElement('p', build.summary ?? 'Your playable is built and ready to inspect in the editor.');
    const assets = build.assetsSummary ?? {}, sourceBits = [];
    if (assets.studioCount) sourceBits.push(`${assets.studioCount} uploaded`);
    if (assets.localCc0Count) sourceBits.push(`${assets.localCc0Count} local CC0`);
    if (assets.remoteCc0Count) sourceBits.push(`${assets.remoteCc0Count} live CC0`);
    const providers = (assets.sources ?? []).map(source => source.sourceId).filter(id => id && !id.startsWith('studio')).slice(0, 3);
    const provenance = reviewElement('p', `${sourceBits.join(' + ') || 'Verified creator assets'}${providers.length ? ' · ' + providers.join(', ') : ''}`, 'tora-completion-provenance');
    const metrics = reviewElement('div', '', 'tora-completion-metrics');
    metrics.append(reviewElement('span', `Creative QA · ${build.qa?.blockerCount ?? 0} blockers`), reviewElement('span', `HTML · ${formatBytes(build.qa?.bytes ?? intake.artifact?.bytes ?? 0)}`));
    if (build.usage?.totalTokens) {
      const tokenPill = reviewElement('span', `Tokens · ${formatTokens(build.usage.totalTokens)}`);
      tokenPill.title = `${build.usage.promptTokens ?? 0} prompt + ${build.usage.completionTokens ?? 0} completion tokens`;
      metrics.append(tokenPill);
    }
    const actions = reviewElement('div', '', 'review-actions'), projectId = build.draftProjectId ?? intake.projectId;
    const open = reviewElement('a', 'Open in Editor →', 'review-button review-primary tora-open-editor');open.href = '?project=' + encodeURIComponent(projectId);
    const another = reviewElement('button', 'Build another playable');another.type = 'button';
    another.onclick = () => {
      globalThis.clearTimeout(autoOpenTimer);
      autoOpenWhenReady = false;
      activeIntakeId = null;
      activeIntake = null;
      liveIntakeBubble = null;
      lastRenderedStatus = null;
      const query = new URLSearchParams(location.search);
      query.delete('intake');
      globalThis.history.replaceState(null, '', query.toString() ? '?' + query : '?view=new');
      promptInput.focus();
    };
    actions.append(open, another);
    const autoLabel = reviewElement('label', '', 'tora-auto-open'), auto = reviewElement('input');
    auto.type = 'checkbox';
    auto.checked = autoOpenWhenReady;
    const autoText = reviewElement('span', shouldAutoOpen ? 'Opening in Editor in 2s… (uncheck to stay)' : ' Auto-open in 2s');
    autoLabel.append(auto, autoText);
    const scheduleAutoOpen = checked => {
      autoOpenWhenReady = checked;
      globalThis.clearTimeout(autoOpenTimer);
      if (checked) {
        autoText.textContent = 'Opening in Editor in 2s… (uncheck to stay)';
        autoOpenTimer = globalThis.setTimeout(() => { location.href = open.href; }, 2000);
      } else {
        autoText.textContent = ' Auto-open in 2s';
      }
    };
    auto.onchange = () => scheduleAutoOpen(auto.checked);
    if (shouldAutoOpen) scheduleAutoOpen(true);
    wrap.append(top, title, summary, provenance, metrics, actions, autoLabel);return wrap;
  }

  function renderBuildFailure(intake) {
    const wrap = reviewElement('div', '', 'tora-build-failure'), cancelled = intake.status === 'cancelled';
    const reasons = {E_BUILD_CANCELLED:'Build cancelled. Your uploaded assets and any partial draft are still available.',E_BUILD_INTERRUPTED:'The build was interrupted by a server restart. Click Retry to resume from your saved brief and draft.',E_BYOK_NOT_CONFIGURED:'Reconnect a verified API key to resume the build.',E_CREATOR_TURN_CAP:'The build reached its 12-turn safety limit. Retry to continue from the saved draft.',E_MODEL_QUOTA:'The connected provider reported insufficient quota.',E_MODEL_AUTH:'The connected API key was rejected. Reconnect it and retry.'};
    wrap.append(reviewElement('strong', cancelled ? 'Build cancelled' : 'Build needs attention'), reviewElement('p', reasons[intake.build?.error] ?? (cancelled ? 'Build cancelled.' : 'The build could not finish. Retry to continue from the saved draft, or use the free MCP handoff.')));
    const actions = reviewElement('div', '', 'review-actions');
    {
      const retry = reviewElement('button', 'Retry build', 'review-primary');retry.type = 'button';
      retry.onclick = async () => { try { activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(intake.id)}/retry`, {}); refreshIntakeCard(activeIntake); } catch (failure) { setError(failure.message); } };actions.append(retry);
    }
    if (intake.build?.draftProjectId) {
      const draft = reviewElement('a', 'Open draft in Editor', 'review-button');draft.href = '?project=' + encodeURIComponent(intake.build.draftProjectId);actions.append(draft);
    }
    const mcp = reviewElement('button', 'Use $0 MCP handoff instead');mcp.type = 'button';
    mcp.onclick = async () => { try { activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(intake.id)}/submit`, {mode:'mcp'}); refreshIntakeCard(activeIntake); } catch (failure) { setError(failure.message); } };actions.append(mcp);
    wrap.append(actions);return wrap;
  }

  function renderIntakeSummaryCard(intake, shouldAutoOpen = false) {
    const wrap = reviewElement('div', '', 'tora-intake-card');
    wrap.dataset.intakeId = intake.id;
    if (intake.status === 'building') {
      wrap.append(reviewElement('span', statusLabels.building, 'tora-status-badge'), renderBuildProgress(intake));return wrap;
    }
    if (intake.status === 'ready' && intake.build) {
      wrap.append(renderCompletion(intake, shouldAutoOpen));return wrap;
    }
    if (['failed','cancelled'].includes(intake.status)) {
      wrap.append(renderBuildFailure(intake));return wrap;
    }
    const mode = ASSET_DEGREES.find(item => item.key === intake.assetSource) ?? ASSET_DEGREES[0];
    const badge = reviewElement('span', statusLabels[intake.status] ?? intake.status, 'tora-status-badge');
    wrap.append(badge);

    const pills = reviewElement('div', '', 'tora-cap-row');
    pills.append(reviewElement('span', '✓ ' + mode.label + ' (no AI media)', 'tora-cap-pill'));
    wrap.append(pills);

    const media = reviewElement('div', '', 'review-assets');
    for (const asset of intake.assets ?? []) {
      const tile = reviewElement('div', '', 'review-asset');
      if (asset.mime.startsWith('image/')) {
        const img = reviewElement('img');
        img.src = `${intakePath}/${encodeURIComponent(intake.id)}/assets/${encodeURIComponent(asset.id)}`;
        img.alt = '';
        tile.append(img);
      } else {
        tile.append(reviewElement('div', '🔊 WAV', 'tora-wav-tile'));
      }
      tile.append(reviewElement('p', asset.name));
      if (asset.optimization) tile.append(reviewElement('p', `${formatBytes(asset.bytes)} · optimized from ${formatBytes(asset.optimization.originalBytes)} (-${asset.optimization.savedPercent}%)`));
      media.append(tile);
    }
    for (const ref of intake.references ?? []) {
      const tile = reviewElement('div', '', 'review-asset tora-ref-tile');
      const img = reviewElement('img');
      img.src = `${intakePath}/${encodeURIComponent(intake.id)}/references/${encodeURIComponent(ref.id)}`;
      img.alt = '';
      tile.append(img, reviewElement('p', 'Ref: ' + ref.name));
      media.append(tile);
    }
    if (media.childElementCount) wrap.append(media);

    const actions = reviewElement('div', '', 'review-actions');
    if (intake.status === 'ready') {
      const openLink = reviewElement('a', 'Open playable editor →', 'review-button review-primary');
      openLink.href = '?project=' + encodeURIComponent(intake.projectId);
      actions.append(openLink);
    } else if (intake.status === 'draft') {
      const submitBtn = reviewElement('button', 'Queue build', 'review-primary');
      submitBtn.type = 'button';
      submitBtn.onclick = async () => {
        try {
          setError('');
          activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(intake.id)}/submit`, {mode:'auto'});
          refreshIntakeCard(activeIntake);
        } catch (failure) {
          setError(failure.message);
        }
      };
      actions.append(submitBtn);
    } else {
      const sourceDirective = mode.key === 'free-licensed'
        ? 'source verified commercial-use free licensed art and sound matching the brief (no AI-generated media)'
        : mode.key === 'hybrid-free'
          ? 'use the supplied assets and source verified commercial-use free licensed art/sound for any missing pieces (no AI-generated media)'
          : 'use strictly the creator’s supplied art and sound files (no third-party or AI-generated media)';
      const instructionText = intake.publicationPending
        ? `Resume publication of Tora intake ${intake.id} with its saved concept.`
        : `Open Tora intake ${intake.id}, ${sourceDirective}, and build the playable. Contact sheet: ${location.href}`;
      const field = reviewElement('input');
      field.readOnly = true;
      field.value = instructionText;
      field.setAttribute('aria-label', 'Agent instruction');
      const copyBtn = reviewElement('button', 'Copy MCP agent instruction', 'review-primary');
      copyBtn.type = 'button';
      copyBtn.onclick = () => copyInstruction(field, statusEl);
      actions.append(copyBtn);
      if (!connectionCtrl.getStatus()?.configured) {
        const apiBtn = reviewElement('button', 'Connect verified API');
        apiBtn.type = 'button';
        apiBtn.onclick = () => connectionCtrl.open();
        actions.append(apiBtn);
      }
      wrap.append(actions, field);
      return wrap;
    }
    if (actions.childElementCount) wrap.append(actions);
    return wrap;
  }

  let liveIntakeBubble;
  function refreshIntakeCard(intake) {
    const transitionedToReady = lastRenderedStatus === 'building' && intake.status === 'ready';
    lastRenderedStatus = intake.status;
    activeIntake = intake;
    thread.dataset.intakeStatus = intake.status;
    $('intake-send').disabled = busy || intake.status === 'building';
    if (intake.status !== 'ready') globalThis.clearTimeout(autoOpenTimer);
    const card = renderIntakeSummaryCard(intake, transitionedToReady && autoOpenWhenReady);
    if (liveIntakeBubble) {
      liveIntakeBubble.replaceChildren(
        (() => {
          const meta = reviewElement('div', '', 'tora-bubble-meta');
          meta.append(reviewElement('strong', 'Tora'), reviewElement('span', intake.name));
          return meta;
        })(),
        card,
      );
    } else {
      liveIntakeBubble = appendAssistantBubble(intake.name, '', [card]);
    }
    scrollThread();
  }

  async function submitBrief(prompt, attachments) {
    if (activeIntake && activeIntake.status !== 'draft') {
      globalThis.clearTimeout(autoOpenTimer);
      activeIntakeId = null;
      activeIntake = null;
      liveIntakeBubble = null;
      lastRenderedStatus = null;
    }
    const mode = currentDegree();
    if (mode.needsFiles && !activeIntakeId && !attachments.length) {
      const switchBtn = reviewElement('button', 'Switch to Free assets only', 'review-primary');
      switchBtn.type = 'button';
      switchBtn.onclick = () => {
        setDegree(2);
        promptInput.value = prompt;
        resizePrompt();
        promptInput.focus();
      };
      const attachBtn = reviewElement('button', '+ Attach my files');
      attachBtn.type = 'button';
      attachBtn.onclick = () => $('picker-assets').click();
      const row = reviewElement('div', '', 'review-actions');
      row.append(attachBtn, switchBtn);
      appendAssistantBubble(
        'Assets needed',
        'Tora never generates AI artwork or sound — it builds strictly from real files. Attach your files with +, or slide to Free assets only.',
        [row],
      );
      return;
    }

    if (mode.needsRights && !$('intake-rights-confirm').checked && !activeIntakeId) {
      setError('Confirm commercial rights for your uploaded assets above before uploading.');
      $('intake-rights-confirm').focus();
      return;
    }

    const working = appendAssistantBubble(
      mode.key === 'free-licensed' ? 'Preparing brief…' : 'Validating assets…',
      mode.key === 'free-licensed'
        ? 'Saving your playable brief so verified free commercial-use art & sound can be sourced…'
        : 'Checking your files through Tora’s media pipeline…',
    );
    try {
      if (!activeIntakeId) {
        const title = deriveTitle(prompt, 'New Playable');
        const created = await reviewRequest(intakePath, {
          projectId: slugify(title),
          name: title,
          brief: prompt || `Build a playable ad for ${title}.`,
          studio: 'Creator studio',
          rights: mode.key === 'free-licensed'
            ? 'Source verified commercial-use free licensed assets (CC0 / CC-BY) with provenance; no AI-generated art or audio.'
            : mode.key === 'hybrid-free'
              ? 'Creator confirmed commercial rights to uploaded assets; missing art or sounds may be sourced from verified commercial-use free libraries (no AI-generated media).'
              : 'Creator confirmed commercial rights to use these supplied game assets in this playable ad.',
          mechanic: 'custom',
          assetSource: mode.key,
          ...(mode.key !== 'studio-assets' ? {audioPack: 'auto'} : {}),
        });
        activeIntakeId = created.id;
        activeIntake = created;
        const query = new URLSearchParams(location.search);
        query.set('intake', activeIntakeId);
        globalThis.history.replaceState(null, '', '?' + query);
      }

      for (const item of attachments) {
        if (item.videoFrames) {
          for (const frame of item.videoFrames) {
            statusEl.textContent = `Uploading ${frame.name}…`;
            activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(activeIntakeId)}/assets`, {
              name: frame.name,
              mime: frame.mime,
              data: frame.data,
              kind: 'reference',
              note: frame.note,
            });
          }
        } else {
          statusEl.textContent = `Uploading ${item.name}…`;
          activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(activeIntakeId)}/assets`, {
            name: item.name,
            mime: item.mime,
            data: item.data,
            ...(item.kind === 'reference' ? {kind: 'reference'} : {}),
          });
        }
      }
      statusEl.textContent = '';

      if (activeIntake.status === 'draft') {
        activeIntake = await reviewRequest(`${intakePath}/${encodeURIComponent(activeIntakeId)}/submit`, {mode:'auto'});
      }

      working.remove();
      refreshIntakeCard(activeIntake);
    } catch (failure) {
      statusEl.textContent = '';
      working.remove();
      setError(failure.message);
    }
  }

  $('intake-composer').onsubmit = async event => {
    event.preventDefault();
    if (busy) return;
    const text = promptInput.value.trim();
    if (!text && !pendingAttachments.length) return;
    setError('');
    busy = true;
    $('intake-send').disabled = true;
    const submittedAttachments = [...pendingAttachments];
    promptInput.value = '';
    resizePrompt();
    pendingAttachments = [];
    renderAttachments();

    appendUserBubble(text || 'Attached files for this playable.', submittedAttachments);
    try {
      await submitBrief(text, submittedAttachments);
    } finally {
      busy = false;
      $('intake-send').disabled = activeIntake?.status === 'building';
      promptInput.focus();
    }
  };

  if (activeIntakeId) {
    try {
      const existing = await reviewRequest(`${intakePath}/${encodeURIComponent(activeIntakeId)}`);
      const idx = ASSET_DEGREES.findIndex(item => item.key === existing.assetSource);
      setDegree(idx >= 0 ? idx : 0);
      refreshIntakeCard(existing);
    } catch (failure) {
      setError(failure.message);
    }
  }

  setInterval(async () => {
    if (!activeIntakeId || busy || document.hidden || !['building','queued','claimed'].includes(activeIntake?.status)) return;
    try {
      const latest = await reviewRequest(`${intakePath}/${encodeURIComponent(activeIntakeId)}`);
      if (latest.status !== activeIntake.status || JSON.stringify(latest.build) !== JSON.stringify(activeIntake.build) || Boolean(latest.publicationPending) !== Boolean(activeIntake.publicationPending)) {
        refreshIntakeCard(latest);
      }
    } catch {
      /* ignore transient poll error */
    }
  }, 1200);
}
