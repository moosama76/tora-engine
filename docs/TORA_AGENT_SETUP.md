# Tora Agent & MCP Setup

Connect Tora once via local MCP, then describe the playable ad you want using your existing AI coding subscription (**Claude Code**, **Cursor**, **OpenAI Codex**, or **Gemini CLI**) at **$0 extra API cost**. The integration supplies Tora's production briefs, deterministic authoring tools, non-destructive asset optimization, 4-viewport Creative QA, and seven free ad-network exporters; it does not generate AI artwork or replace visual review.

## 1. Zero-Rust CLI Setup (or Local Source Setup)

### Packaged CLI (`@tora-engine/tora`, no Rust required)

From your game workspace (Node `>= 22` only):

```bash
npx @tora-engine/tora init --client cursor   # or claude-code | codex | gemini | all | print
npx @tora-engine/tora doctor                 # verify Node, prebuilt native binary, Chromium & workspace
```

`tora init` resolves or downloads the SHA-256-verified prebuilt `playable` binary, ensures Playwright Chromium is installed, and non-destructively configures your MCP client to run `npx -y @tora-engine/tora mcp --workspace <your-workspace>`. Use `--dry-run` to preview edits without modifying files.

### From a Source Checkout

From the Tora repository root, install dependencies and build the local Rust binary + editor bundle (pass `--prebuilt` to skip Rust):

```bash
npm install
npm run setup
```

`npm run setup` checks Node (>= 22) and Rust (unless `--prebuilt`), builds `playable` (plus legacy decoders), ensures Playwright Chromium is available for Creative QA, builds the local editor UI, verifies trusted runtime & mock-host bundles, and prints a ready-to-paste MCP configuration.

## 2. Connect Tora to Your AI Coding Client

Use `tora init --client <client>` above, or add the single `tora mcp` command manually:

### Generic MCP (`mcpServers` — Cursor, Claude Desktop, Windsurf, Gemini CLI)

```json
{
  "mcpServers": {
    "tora": {
      "command": "npx",
      "args": ["-y", "@tora-engine/tora", "mcp", "--workspace", "<path-to-workspace>"]
    }
  }
}
```

From a source checkout, use `"command": "node"` with `"args": ["<path-to-tora>/bin/tora.mjs", "mcp", "--workspace", "<path-to-workspace>"]`.

- **Cursor:** Add to `.cursor/mcp.json` in your workspace or `~/.cursor/mcp.json` globally.
- **Gemini CLI:** Add the `mcpServers` block to `~/.gemini/settings.json`.

### Claude Code

```bash
claude mcp add tora -- npx -y @tora-engine/tora mcp --workspace "<path-to-workspace>"
```

### OpenAI Codex

```bash
codex mcp add tora -- npx -y @tora-engine/tora mcp --workspace "<path-to-workspace>"
```

Optionally install the repository skill in Codex by copying or symlinking `skills/tora-playables` into `~/.codex/skills/`. Reopen your agent session after updating MCP settings.

### Brief & Project Store Resolution

- **Single active workspace:** Pass `--workspace <dir>` (or `TORA_WORKSPACE_ROOT`) to anchor `.tora/native-projects`, `.tora/editor-state`, `.tora/remote-asset-cache`, `.tora/prepared-assets`, and `filePath` uploads strictly inside that workspace. Both the project store and revision journal enforce symlink checks (`E_WORKSPACE_SYMLINK` / `E_NATIVE_STORE_SYMLINK`) and disallow paths outside `<workspace>/.tora/` or `<workspace>/reports/`.
- **Portable briefs:** `tora_brief` loads `PRODUCTION_MASTER.md`, the playable creative brief, UI/win-effect references, and authoring docs directly from the installed package. By default it uses `TORA_PLAYABLE_BRIEF` if set, otherwise `~/.codex/PLAYABLE_AI_MASTER.md` if present, and otherwise the bundled [`docs/PLAYABLE_BRIEF.md`](PLAYABLE_BRIEF.md).
- **Fail-closed protocol:** The adapter implements MCP `2025-11-25` over stdio and rejects mutations until `tora_brief` has succeeded in that session.

Run `npm run test:mcp` to verify brief loading, revision-safe edits, media uploads, previews, and exports.

## 3. MCP Tool Reference

The connected client discovers exact argument schemas via MCP `tools/list`.

| Tool | Purpose |
|---|---|
| `tora_brief` | Load production instructions, playable brief, win/CTA guidance, and API docs. Pass `alreadyRead: [{ name, sha256 }]` from `digests` on re-reads to omit unchanged docs |
| `tora_capabilities` | Discover supported 2D/3D visual, behavior, event, action, and concept contracts (`summary: true` index, `packs` + `format: "compact"` for compact unit-bearing schemas) |
| `tora_create` | Create an empty editable native project |
| `tora_compose` | Compile a structured creative concept and prepared assets into an editable playable |
| `tora_inspect` | Read project state, compact scene outline (`tree: true`, optional `sceneId`), records, dependencies, and revision identity |
| `tora_edit` | Preview and atomically commit scoped operations against the expected revision (`scopeCreates: true` for reference-safe new records; `commitPreviewDigest` to commit cached previews without re-sending `operations`) |
| `tora_list_assets` | Search verified local & cached remote CC0 assets with dimensions and style families (`includeRemote: true` searches allowlisted Kenney/OpenGameArt packs) |
| `tora_fetch_cc0_pack` | Download, license-verify, optimize, and cache one allowlisted Kenney/OpenGameArt CC0 pack into `.tora/remote-asset-cache` (stable pack `styleFamily` across filtered fetches) |
| `tora_stage_cc0_assets` | Atomically stage up to 32 verified local/cached CC0 assets into a project with server-enforced provenance and single visual style family |
| `tora_prep_assets` | Faithfully prepare PNG/JPEG files mechanically (`crop`, `trim`, `resize`/`maxSide`, `sliceGrid` frames/strip) into `.tora/prepared-assets` with hash-bound provenance receipts |
| `tora_upload_asset` | Upload raw PNG/JPEG/WAV/MP3 up to 8 MiB with rights metadata and automatic non-destructive optimization, or register a Tora mesh. Automatically binds provenance receipts for `.tora/prepared-assets` files |
| `tora_upload_assets` | Batch upload and optimize up to 32 assets in one atomic revision (prefer workspace `filePath` to avoid the 12 MiB MCP frame limit; automatically binds `.tora/prepared-assets` provenance and checks `styleFamily`) |
| `tora_render` | Write an editable HTML scene preview artifact for visual inspection |
| `tora_qa` | Run static, acoustic, 4-viewport layout, primary-interaction, and post-SLA motion filmstrip QA (`screenshots/filmstrip-interaction.png` + real-play `filmstrip-end-card.png`; opt-in `recordVideo: true` writes `screenshots/gameplay.webm`) |
| `tora_export` | Write standalone HTML, any of seven ad-network HTML/ZIP artifacts, a multi-network batch (`targets: [...]`, `outputDir`), or a `.tora.json` project bundle. Google/Mintegral/TikTok write deterministic ZIPs |
| `tora_history` | Save, undo, or redo project revisions |
| `tora_review_*` / `tora_intake_*` | Claim and resolve visual review notes or studio intake briefs from the local editor |

### Fast Token-Saving Workflow

1. **Discover cheaply:** `tora_brief({})` once (save `digests` for `alreadyRead` on re-reads), `tora_capabilities({ summary: true })`, then `tora_capabilities({ packs: [...], format: "compact" })`.
2. **Source, prep & batch assets:** Use `tora_list_assets` / `tora_fetch_cc0_pack` + `tora_stage_cc0_assets` for verified CC0 packs (single visual style family enforced), or run `tora_prep_assets` (`trim` / `crop` / `resize` / `sliceGrid`) followed by `tora_upload_assets` (automatically preserving hash-bound provenance and `styleFamily`).
3. **Inspect & edit leanly:** Use `tora_inspect({ id, tree: true })` before targeted `ids` reads; use `tora_edit` with `scopeCreates: true` (existing targets still require explicit `scope`) and `commitPreviewDigest` when committing a reviewed `PREVIEW`.
4. **Triage motion & layout, then inspect full-size:** Use `screenshots/contact-sheet.png` and `screenshots/filmstrip-interaction.png` (plus opt-in `recordVideo: true` → `screenshots/gameplay.webm`) to inspect layout, animation, and particle payoff mid-build, then inspect the individual full-size viewport PNGs and real playback before final delivery.
5. **Batch export:** `tora_export({ id, targets: [...], outputDir })` compiles targets in parallel, reuses verified QA receipts where unchanged (note: cached passes are shared across MCP/HTTP/intake keyed by artifact, checker, and Playwright/Chromium version, so a borderline 150 ms timing pass remains cached until the artifact, checker, browser version, or stored screenshots change), runs Creative QA serially for every target before writing any files, and then writes all artifacts atomically.

### Recommended First Prompt

> Create a 20-second cozy farm match playable in Tora using verified CC0 assets, responsive portrait and landscape layouts, rewarding feedback, and a clean Store CTA end card. Run Creative QA, inspect screenshots, and export both the editable bundle and Unity/AppLovin HTML.

## 4. Local Editor UI & HTTP Fallback

Start the local visual studio & review editor anytime:

```bash
npm run dev:editor
```

Open `http://127.0.0.1:8001/?view=new` (configurable via `EDITOR_PORT`) to:
- Inspect and play built-in demos (*Tiny Harvest*, *Traffic Tycoon*, *Mini Golf 3D*).
- Drop in assets and create `$0` MCP handoff briefs, or optionally connect a verified BYOK API key (Google Gemini, OpenAI, or Anthropic Claude) for in-browser builds and visual revision notes.
- Export standalone drafts plus Unity Ads, AppLovin, Meta, Google Ads, ironSource / LevelPlay, Mintegral, and TikTok builds.

For direct HTTP automation, see [`docs/TORA_CREATION_API.md`](TORA_CREATION_API.md) and [`docs/NATIVE_AGENT_TOOLS.md`](NATIVE_AGENT_TOOLS.md).

## 5. Verification Boundaries

Automated checks and `tora_qa` establish engineering quality only. Always open and inspect real exported screenshots and gameplay footage before shipping, and treat human visual sign-off, physical-device testing, and every ad network's official preview/acceptance as separate gates.
