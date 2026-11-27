# Tora Agent & MCP Setup

Connect Tora once via local MCP, then describe the playable ad you want using your existing AI coding subscription (**Claude Code**, **Cursor**, **OpenAI Codex**, or **Gemini CLI**) at **$0 extra API cost**. The integration supplies Tora's production briefs, deterministic authoring tools, non-destructive asset optimization, 4-viewport Creative QA, and seven free ad-network exporters; it does not generate AI artwork or replace visual review.

## 1. One-Command Local Setup

From the Tora repository root, install dependencies and build the local Rust media decoder + editor bundle:

```bash
npm install
npm run setup
```

`npm run setup` checks Node (>= 22) and Rust, builds `inspect_native`, `optimize_native`, and `playable-cli`, ensures Playwright Chromium is available for Creative QA, builds the local editor UI, verifies the trusted packer bundles, and prints a ready-to-paste MCP configuration with your exact local paths.

## 2. Connect Tora to Your AI Coding Client

Replace `<path-to-tora>` with the absolute path to your local checkout (or copy the JSON printed by `npm run setup`).

### Generic MCP (`mcpServers` — Cursor, Claude Desktop, Windsurf, Gemini CLI)

```json
{
  "mcpServers": {
    "tora": {
      "command": "node",
      "args": ["<path-to-tora>/scripts/lean/native/mcp-server.mjs"],
      "env": {
        "TORA_PROJECT_STORE": "<path-to-tora>/.tora/native-projects"
      }
    }
  }
}
```

- **Cursor:** Add to `.cursor/mcp.json` in your workspace or `~/.cursor/mcp.json` globally.
- **Gemini CLI:** Add the `mcpServers` block to `~/.gemini/settings.json`.

### Claude Code

```bash
claude mcp add tora \
  -e TORA_PROJECT_STORE="<path-to-tora>/.tora/native-projects" \
  -- node "<path-to-tora>/scripts/lean/native/mcp-server.mjs"
```

### OpenAI Codex

```bash
codex mcp add tora \
  --env TORA_PROJECT_STORE="<path-to-tora>/.tora/native-projects" \
  -- node "<path-to-tora>/scripts/lean/native/mcp-server.mjs"
```

Optionally install the repository skill in Codex by copying or symlinking `skills/tora-playables` into `~/.codex/skills/`. Reopen your agent session after updating MCP settings.

### Brief & Project Store Resolution

- **Shared storage:** The MCP server runs locally over stdio and shares the same project store as the local editor (`EDITOR_STORE` / `TORA_PROJECT_STORE`). Stores must reside under the checkout's `.tora/` or `reports/` directory.
- **Portable briefs:** `tora_brief` loads `PRODUCTION_MASTER.md`, the playable creative brief, UI/win-effect references, and authoring docs directly from the repository. By default it uses `TORA_PLAYABLE_BRIEF` if set, otherwise `~/.codex/PLAYABLE_AI_MASTER.md` if present, and otherwise the bundled [`docs/PLAYABLE_BRIEF.md`](PLAYABLE_BRIEF.md).
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
| `tora_upload_asset` | Upload raw PNG/JPEG/WAV/MP3 up to 8 MiB with rights metadata and automatic non-destructive optimization, or register a Tora mesh. Supports base64, workspace `filePath`, retained `sourceHash`, `auto`/`lossless`/`none`, and `preserveResolution` |
| `tora_upload_assets` | Batch upload and optimize up to 32 assets in one atomic revision (prefer workspace `filePath` to avoid the 12 MiB MCP message frame limit) |
| `tora_render` | Write an editable HTML scene preview artifact for visual inspection |
| `tora_qa` | Run static, acoustic, 4-viewport layout, and primary-interaction Creative QA (writes individual full-res PNGs plus triage-only `contact-sheet.png` / `sheet-<state>.png`; reuses warm Chromium and receipt cache) |
| `tora_export` | Write standalone HTML, any of seven ad-network HTML/ZIP artifacts, a multi-network batch (`targets: [...]`, `outputDir`), or a `.tora.json` project bundle. Google/Mintegral/TikTok write deterministic ZIPs |
| `tora_history` | Save, undo, or redo project revisions |
| `tora_review_*` / `tora_intake_*` | Claim and resolve visual review notes or studio intake briefs from the local editor |

### Fast Token-Saving Workflow

1. **Discover cheaply:** `tora_brief({})` once (save `digests` for `alreadyRead` on re-reads), `tora_capabilities({ summary: true })`, then `tora_capabilities({ packs: [...], format: "compact" })`.
2. **Batch assets:** `tora_upload_assets({ id, expected, items: [{ filePath, asset }, ...] })` uploads up to 32 assets in 1 turn and 1 atomic revision.
3. **Inspect & edit leanly:** Use `tora_inspect({ id, tree: true })` before targeted `ids` reads; use `tora_edit` with `scopeCreates: true` (existing targets still require explicit `scope`) and `commitPreviewDigest` when committing a reviewed `PREVIEW`.
4. **Triage then inspect full-size:** Use `screenshots/contact-sheet.png` for mid-build triage iterations, then inspect the individual full-size viewport PNGs (and gameplay footage for motion) before final delivery.
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
