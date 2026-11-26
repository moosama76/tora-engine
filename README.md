# Tora — Local MCP-First Playable Ad Framework
[![M8ven Score](https://m8ven.ai/badge/mcp/moosama76-tora-engine-cd3fcm?v=86d74ba3d885cd01144d1e74220cd1d2)](https://m8ven.ai/mcp/moosama76-tora-engine-cd3fcm?s=readme)

**Build editable, responsive 2D & 3D HTML5 playable ads directly from Claude Code, Cursor, OpenAI Codex, or Gemini CLI at $0 extra API cost.** Tora is open source, with deterministic authoring, automatic non-destructive asset optimization, 4-viewport Creative QA, real-assets-only provenance, and seven free ad-network exporters.

---

## Why Tora?

- **MCP-First ($0 Extra API Cost):** Connect Tora's local stdio MCP server to the AI coding subscription your dev team already pays for. No cloud credit burn, no vendor lock-in, and your game assets never leave your machine.
- **Automatic Asset Optimization:** Drop raw PNG, JPEG, WAV, or MP3 uploads up to 8 MiB. Tora retains every original master, records optimization receipts, and produces verified delivery assets up to 700 KB without changing the Creative Project 2.1 schema.
- **Seven Free Exporters:** Ship Unity Ads, AppLovin, Meta, Google Ads, ironSource / Unity LevelPlay, Mintegral, and TikTok builds with no paid network packs.
- **Editable Native Scene Graph (2D + 3D):** Playables compile from a strict, validated `tora-native` project document with scenes, transforms, sprites, UI, 2D/3D physics, path networks, audio, events, and bindings — every edit is atomic, revision-checked, and undoable.
- **Deterministic Creative QA:** Built-in Playwright checks cover four phone viewports, audio unlock/level/clipping metrics, text/UI overflow, primary gameplay interaction, and final package size.
- **Real Assets Only:** Use studio uploads or verified commercial-use CC0 packs with full license and SHA-256 provenance receipts. Originals remain available for lossless re-optimization.
- **Optional Local Studio UI & BYOK Beta:** Launch the visual browser editor to play demos, leave pinned visual review notes, run `$0` MCP handoffs, or connect a verified Gemini, OpenAI, Anthropic, OpenAI-compatible, or local model provider.

---

## Quickstart

**Prerequisites:** Node.js `>= 22`, Rust (`rustc` + `cargo`). WAV-to-MP3 optimization automatically uses local GStreamer or FFmpeg when available; otherwise Tora uses its deterministic PCM WAV fallback.

### 1. Install & Run Local Setup

```bash
npm install
npm run setup
```

Setup builds the bounded Rust media inspector and optimizer (`inspect_native`, `optimize_native`) plus `playable-cli`, ensures Playwright Chromium is ready, compiles the editor, checks trusted runtime bundles, and prints an MCP configuration with your local paths.

### 2. Connect Your AI Coding Agent (or Launch the Local Editor)

See [`docs/TORA_AGENT_SETUP.md`](docs/TORA_AGENT_SETUP.md) for per-client commands, or start the local visual studio:

```bash
npm run dev:editor
```

Open `http://127.0.0.1:8001/?view=new` to inspect demos, upload studio assets, and review playable revisions. Uploads default to `optimize:"auto"`; MCP also supports `lossless`, `none`, and `preserveResolution`.

---

## Built-In Showcase Demos

| Demo | Engine Mode | Core Loop |
|---|---|---|
| **Tiny Harvest** | 2D Native + Match-3 | Cozy farm crop-matching with particle rewards, SFX/music, and Store CTA end card |
| **Traffic Tycoon** | 2D Native + Path Economy | Tap-to-dispatch intersection management with path networks and escalating feedback |
| **Mini Golf 3D** | 3D Native (`Stage3D` + `Physics3D`) | Drag-to-aim miniature golf with camera follow, bounces, capture zone, and celebration |

```bash
npm run build:pages-editor   # Static hosted editor demo bundle (dist/pages-editor)
npm run build:website        # Complete static site: landing page, demos, live editor & manifest (dist/website)
```

---

## Ad-Network Export Matrix (Honest Status)

| Target | Package and limit | Host bridge | Verification scope |
|---|---|---|---|
| **Standalone HTML5 Draft** | Single HTML | Browser | Automated static + 4-viewport Creative QA |
| **Unity Ads** | Single HTML, `< 5,000,000` B | MRAID 3.0 | Static rules + mock-host lifecycle QA |
| **AppLovin** | Single HTML, `<= 5,000,000` B | MRAID 2.0 | Static rules + mock-host lifecycle QA |
| **Meta** | Single HTML, `<= 2,000,000` B | `FbPlayableAd` | Static rules + mock-host lifecycle QA |
| **Google Ads** | ZIP with root `index.html`, `<= 5,000,000` B | `ExitApi` | Static rules + mock-host lifecycle QA |
| **ironSource / LevelPlay** | Single HTML, `<= 5,000,000` B | DAPI | Static rules + mock-host lifecycle QA |
| **Mintegral** | ZIP with `<id>/<id>.html`, `<= 5,000,000` B | Mintegral globals | Static rules + mock-host lifecycle QA |
| **TikTok** | ZIP with `index.html` + `config.json`, `<= 5,000,000` B | Playable SDK | Static rules + mock-host lifecycle QA |

Unity and AppLovin require a real store URL in the project. Other profiles leave destination configuration to the network dashboard where supported, but still reject unresolved placeholders.

> **Honest QA Boundary:** `STATIC_PASS` means the exact artifact passed local static and mock-host checks. It does not establish human creative approval, physical-device behavior, official network acceptance, or campaign effectiveness. Always inspect real screenshots/video, test physical iOS/Android devices, and run each official preview tool before launching paid campaigns.

Check an exported artifact with:

```bash
cargo run -p playable-cli -- artifact check index.html --network unity-ads-ua-playable --confirm-reviewed YYYY-MM-DD
cargo run -p playable-cli -- artifact check tiktok.zip --network tiktok-ads-playable --confirm-reviewed YYYY-MM-DD
```

---

## Key Commands

```bash
npm run setup              # Toolchain, Rust builds, browser check, MCP snippet
npm run dev:editor         # Local visual editor on http://127.0.0.1:8001
npm run mcp:tora           # Local MCP stdio server
npm run verify             # Full schema, packer, typecheck, lint, Rust, JS/browser gate
npm run test:mcp           # MCP server + editor integration tests
```

## Documentation

- [`docs/TORA_AGENT_SETUP.md`](docs/TORA_AGENT_SETUP.md) — MCP setup and tool reference
- [`docs/PLAYABLE_BRIEF.md`](docs/PLAYABLE_BRIEF.md) — Creative, audio, and game-feel quality brief
- [`docs/TORA_CREATION_API.md`](docs/TORA_CREATION_API.md) — HTTP and document authoring contract
- [`docs/NATIVE_AGENT_TOOLS.md`](docs/NATIVE_AGENT_TOOLS.md) — Compact deterministic agent CLI

---

## Sponsor Tora

Tora and all seven ad-network exporters remain 100% open source. Monthly sponsorships and one-time donations on [GitHub Sponsors](https://github.com/sponsors/moosama76) fund ongoing maintenance, ad-network SDK updates, and creative tooling.

- **Community Backer ($25/mo):** README Backers credit, sponsor badge, feature/template voting.
- **Studio Sponsor ($250/mo):** Company logo in `README.md` & site credits, priority GitHub issue triage, early feedback access, quarterly roadmap input.
- **Enterprise Patron ($3,500/mo):** Headline partner placement, priority ad-network SDK & rule-pack updates + dedicated exporter parity, private Slack/Discord channel, monthly sync & 6 hrs/mo MCP/CI support, fast-track bug fixes.
- **Custom / One-Time Donation:** Back a specific feature or send any custom amount on [GitHub Sponsors](https://github.com/sponsors/moosama76).

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
