const SNIPPETS = {
  claude: `claude mcp add tora \\
  -e TORA_PROJECT_STORE="$(pwd)/.tora/native-projects" \\
  -- node "$(pwd)/scripts/lean/native/mcp-server.mjs"`,
  cursor: `{
  "mcpServers": {
    "tora": {
      "command": "node",
      "args": ["<path-to-tora>/scripts/lean/native/mcp-server.mjs"],
      "env": {
        "TORA_PROJECT_STORE": "<path-to-tora>/.tora/native-projects"
      }
    }
  }
}`,
  codex: `codex mcp add tora \\
  --env TORA_PROJECT_STORE="$(pwd)/.tora/native-projects" \\
  -- node "$(pwd)/scripts/lean/native/mcp-server.mjs"`,
  studio: `# Start the local visual Studio UI (BYOK + $0 MCP handoff)
npm run dev:editor

# Open http://127.0.0.1:8001/?view=new`,
};

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const snippetEl = document.getElementById('mcp-snippet');
const mcpCopyBtn = document.getElementById('mcp-copy-btn');
const tabs = [...document.querySelectorAll('.tab-btn')];

function selectTab(key) {
  const code = SNIPPETS[key] ?? SNIPPETS.claude;
  if (snippetEl) snippetEl.textContent = code;
  if (mcpCopyBtn) mcpCopyBtn.dataset.copy = code;
  for (const btn of tabs) {
    btn.setAttribute('aria-selected', String(btn.dataset.tab === key));
  }
}

for (const btn of tabs) {
  btn.addEventListener('click', () => selectTab(btn.dataset.tab));
}
selectTab('claude');

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
