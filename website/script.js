const NODE_SNIPPETS = {
  macos: `brew install node@22`,
  windows: `winget install OpenJS.NodeJS.LTS`,
  linux: `curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs`,
};

const CLIENT_SNIPPETS = {
  claude: `mkdir my-playable
cd my-playable
npx @tora-editor/tora init --client claude-code
npx @tora-editor/tora doctor`,
  cursor: `mkdir my-playable
cd my-playable
npx @tora-editor/tora init --client cursor
npx @tora-editor/tora doctor`,
  codex: `mkdir my-playable
cd my-playable
npx @tora-editor/tora init --client codex
npx @tora-editor/tora doctor`,
  gemini: `mkdir my-playable
cd my-playable
npx @tora-editor/tora init --client gemini
npx @tora-editor/tora doctor`,
  studio: `mkdir my-playable
cd my-playable
npx @tora-editor/tora editor`,
};

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function bindTabGroup(groupName, snippets, snippetId, copyBtnId, defaultKey) {
  const snippetEl = document.getElementById(snippetId);
  const copyBtn = document.getElementById(copyBtnId);
  const tabs = [...document.querySelectorAll(`.tab-row[data-tab-group="${groupName}"] .tab-btn`)];

  function selectTab(key) {
    const code = snippets[key] ?? snippets[defaultKey];
    if (snippetEl) snippetEl.textContent = code;
    if (copyBtn) copyBtn.dataset.copy = code;
    for (const btn of tabs) {
      btn.setAttribute('aria-selected', String(btn.dataset.tab === key));
    }
  }

  for (const btn of tabs) {
    btn.addEventListener('click', () => selectTab(btn.dataset.tab));
  }
  selectTab(defaultKey);
}

bindTabGroup('os', NODE_SNIPPETS, 'node-snippet', 'node-copy-btn', 'macos');
bindTabGroup('client', CLIENT_SNIPPETS, 'mcp-snippet', 'mcp-copy-btn', 'claude');

for (const btn of document.querySelectorAll('.copy-btn')) {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy || '';
    if (!text) return;
    const original = btn.textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied ✓';
    } catch {
      btn.textContent = 'Select & Copy';
    }
    setTimeout(() => { btn.textContent = original; }, 1600);
  });
}
