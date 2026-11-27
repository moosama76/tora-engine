# Tora — Local MCP-First Playable Ad Framework
[![M8ven Score](https://m8ven.ai/badge/mcp/moosama76-tora-engine-cd3fcm?v=86d74ba3d885cd01144d1e74220cd1d2)](https://m8ven.ai/mcp/moosama76-tora-engine-cd3fcm?s=readme)

**Build editable, responsive 2D & 3D HTML5 playable ads directly from Claude Code, Cursor, OpenAI Codex, or Gemini CLI at $0 extra API cost.**

- **Fast Local Setup:** Install with `npx` using Node.js `>= 22`. Native binaries and headless Chromium set up automatically.
- **Works With Your Existing AI Agent:** Connects locally over MCP — no cloud credit burn, no vendor lock-in, and your assets never leave your machine.
- **Real Assets & Auto-Optimization:** Drop studio PNG/JPEG/WAV/MP3 files up to 8 MiB (auto-optimized to `<= 700 KB` with untouched masters kept) or pull verified CC0 Kenney/OpenGameArt packs with license receipts.
- **Editable 2D & 3D Scene Graph:** Revision-checked, undoable scene documents instead of fragile throwaway HTML rewrites.
- **Built-In Creative QA:** Automated 4-viewport mobile layout, audio unlock/level checks, 8-frame interaction motion filmstrips, and optional WebM capture.
- **7 Free Ad-Network Exporters:** Unity Ads, AppLovin, Meta, Google Ads, ironSource / LevelPlay, Mintegral, and TikTok — all open source.

---

## Quickstart

### 1. Install Node.js (`>= 22`)

Check if you already have Node.js 22+ installed (`node -v`). If not, install it for your OS (or download the LTS installer from [nodejs.org](https://nodejs.org/)):

**macOS (Homebrew)**
```bash
brew install node@22
```

**Windows (PowerShell)**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Linux (Ubuntu / Debian)**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*(Restart your terminal after installing Node.js so `node` and `npx` are on your `PATH`.)*

### 2. Create a folder and connect your AI client

Create a folder for your playable (works on macOS, Linux, Windows PowerShell, and CMD):

```bash
mkdir my-playable
cd my-playable
```

Run **one** setup command for the AI client you use:

| AI Client | Command | What it configures |
|---|---|---|
| **Cursor** | `npx @tora-editor/tora init --client cursor` | `.cursor/mcp.json` |
| **Claude Code** | `npx @tora-editor/tora init --client claude-code` | `claude mcp add` (or `.mcp.json`) |
| **OpenAI Codex** | `npx @tora-editor/tora init --client codex` | `codex mcp add` |
| **Gemini CLI** | `npx @tora-editor/tora init --client gemini` | `~/.gemini/settings.json` |

> Add `--dry-run` to preview config changes without writing files, or `--client print` to print the MCP JSON block manually.

`tora init` automatically downloads/verifies the native binary, installs Playwright Chromium if missing, and merges `tora` into your MCP config without overwriting other servers (saving a `.bak` backup).

Verify your setup, then **restart your AI coding client**:

```bash
npx @tora-editor/tora doctor
```

### 3. Build by prompting your AI agent

Open `my-playable` in your AI client and describe the playable you want:

> *"Build a 2D portrait playable ad where the player taps matching crates to fill a delivery truck before time runs out, using verified CC0 Kenney sprites and audio. Run Creative QA and show me the contact sheet and motion filmstrip."*

Your agent can upload studio files from your workspace (`tora_upload_assets`), search/fetch/slice verified CC0 packs (`tora_list_assets`, `tora_fetch_cc0_pack`, `tora_prep_assets`, `tora_stage_cc0_assets`), edit scenes atomically (`tora_edit`), run 4-viewport + motion QA (`tora_qa`), and export for ad networks (`tora_export`).

### 4. Playtest & leave visual review notes (optional)

Launch the local browser Studio UI anytime:

```bash
npx @tora-editor/tora editor
```

Open `http://127.0.0.1:8001/?view=new` to play demos, test your builds at phone aspect ratios, upload assets visually, pin review notes for your MCP agent, or try BYOK providers (Gemini, OpenAI, Anthropic, OpenRouter, local Ollama/vLLM).

---

## Ad-Network Exports (7 Free Targets)

| Target | Package & Limit | Host Bridge | Automated Check Scope |
|---|---|---|---|
| **Standalone HTML5 Draft** | Single HTML | Browser | Static + 4-viewport Creative QA |
| **Unity Ads** | Single HTML, `< 5 MB` | MRAID 3.0 | Static rules + mock-host lifecycle QA |
| **AppLovin** | Single HTML, `<= 5 MB` | MRAID 2.0 | Static rules + mock-host lifecycle QA |
| **Meta** | Single HTML, `<= 2 MB` | `FbPlayableAd` | Static rules + mock-host lifecycle QA |
| **Google Ads** | ZIP (`index.html`), `<= 5 MB` | `ExitApi` | Static rules + mock-host lifecycle QA |
| **ironSource / LevelPlay** | Single HTML, `<= 5 MB` | DAPI | Static rules + mock-host lifecycle QA |
| **Mintegral** | ZIP (`<id>/<id>.html`), `<= 5 MB` | Mintegral globals | Static rules + mock-host lifecycle QA |
| **TikTok** | ZIP (`index.html` + `config.json`), `<= 5 MB` | Playable SDK | Static rules + mock-host lifecycle QA |

Unity and AppLovin require a real store URL in the project. Validate any exported artifact from the CLI:

```bash
npx @tora-editor/tora check index.html --network unity-ads-ua-playable --confirm-reviewed YYYY-MM-DD
npx @tora-editor/tora check tiktok.zip --network tiktok-ads-playable --confirm-reviewed YYYY-MM-DD
```

> **Honest QA Boundary:** Local `STATIC_PASS` and mock-host QA verify engineering compliance — not human creative approval, physical-device behavior, official ad-network acceptance, or campaign performance. Always inspect real screenshots/filmstrips, test on physical iOS/Android devices, and run each network's official preview tool before launching paid campaigns.

---

## Built-In Showcase Demos

Open `npx @tora-editor/tora editor` to play and inspect all three built-in demos:

| Demo | Engine Mode | Core Loop |
|---|---|---|
| **Tiny Harvest** | 2D Native + Match-3 | Cozy farm crop-matching with particle rewards, SFX/music, and Store CTA end card |
| **Traffic Tycoon** | 2D Native + Path Economy | Tap-to-dispatch intersection management with path networks and escalating feedback |
| **Mini Golf 3D** | 3D Native (`Stage3D` + `Physics3D`) | Drag-to-aim miniature golf with camera follow, bounces, capture zone, and celebration |

---

## Contributor Setup (From Source)

Only needed if you are contributing to Tora itself. Requires Node.js `>= 22` and Rust (or pass `--prebuilt` to skip compiling Rust).

```bash
git clone https://github.com/moosama76/tora-engine.git
cd tora-engine
npm install
npm run setup
```

Common repo commands:

```bash
npm run dev:editor         # Local visual editor on http://127.0.0.1:8001
npm run mcp:tora           # Local MCP stdio server from checkout
npm run verify             # Full schema, packer, typecheck, lint, Rust, JS/browser gate
npm run test:mcp           # MCP server + editor integration tests
npm run build:website      # Static showcase site + bundled live editor (dist/website)
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Documentation

- [`docs/TORA_AGENT_SETUP.md`](docs/TORA_AGENT_SETUP.md) — Detailed MCP client setup & full 23-tool reference
- [`docs/PLAYABLE_BRIEF.md`](docs/PLAYABLE_BRIEF.md) — Creative, audio, and game-feel quality brief
- [`docs/TORA_CREATION_API.md`](docs/TORA_CREATION_API.md) — HTTP and document authoring contract
- [`docs/NATIVE_AGENT_TOOLS.md`](docs/NATIVE_AGENT_TOOLS.md) — Compact deterministic agent CLI

---

## Sponsor Tora

Tora and all seven ad-network exporters remain 100% open source. Monthly sponsorships and one-time donations on [GitHub Sponsors](https://github.com/sponsors/moosama76) fund maintenance, ad-network SDK updates, and creative tooling.

- **Community Backer ($25/mo):** README Backers credit, sponsor badge, feature/template voting.
- **Studio Sponsor ($250/mo):** Company logo in `README.md` & site credits, priority GitHub issue triage, early feedback access, quarterly roadmap input.
- **Enterprise Patron ($3,500/mo):** Headline partner placement, priority ad-network SDK & rule-pack updates + dedicated exporter parity, private Slack/Discord channel, monthly sync & 6 hrs/mo MCP/CI support, fast-track bug fixes.
- **Custom / One-Time Donation:** Back a specific feature or send any custom amount on [GitHub Sponsors](https://github.com/sponsors/moosama76).
