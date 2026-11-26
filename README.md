# Tora — Local MCP-First Playable Ad Framework
[![M8ven Score](https://m8ven.ai/badge/mcp/moosama76-tora-engine-cd3fcm?v=86d74ba3d885cd01144d1e74220cd1d2)](https://m8ven.ai/mcp/moosama76-tora-engine-cd3fcm?s=readme)

**Build editable, responsive 2D & 3D HTML5 playable ads directly from Claude Code, Cursor, OpenAI Codex, or Gemini CLI at $0 extra API cost** — backed by deterministic authoring transactions, 4-viewport Creative QA, real-assets-only provenance, and Unity Ads + AppLovin single-file HTML exports.

---

## Why Tora?

- **MCP-First ($0 Extra API Cost):** Connect Tora's local stdio MCP server to the AI coding subscription your dev team already pays for. No cloud credit burn, no vendor lock-in, and your game assets never leave your machine.
- **Editable Native Scene Graph (2D + 3D):** Playables compile from a strict, validated `tora-native` project document (`v2.1.0`) with scenes, transforms, sprites, UI, 2D/3D physics, path networks, audio, events, and bindings — every edit is atomic, revision-checked, and undoable.
- **Deterministic Creative QA:** Built-in Playwright runner checks 4 phone viewports (portrait + landscape), audio unlock/level/clipping metrics, text/UI overflow, primary gameplay interaction, and bundle size before export.
- **Real Assets Only (Zero AI Slop):** Uses your studio's uploaded PNG/JPEG/WAV/MP3/mesh files or verified commercial-use CC0 packs with full license & SHA-256 provenance receipts.
- **Optional Local Studio UI & BYOK Beta:** Launch the visual browser editor anytime to play demos, leave pinned visual review notes, run `$0` MCP handoffs, or optionally connect a verified Google Gemini, OpenAI, Anthropic Claude, or **OpenAI-compatible API** (OpenRouter, DeepSeek, Kimi, Qwen, GLM, or local Ollama/vLLM).

---

## 2-Step Quickstart

**Prerequisites:** Node.js `>= 22`, Rust (`rustc` + `cargo`).

### 1. Install & Run Local Setup

```bash
npm install
npm run setup
```

`npm run setup` verifies Node and Rust, builds the native Rust media decoder (`inspect_native`) and `playable-cli`, ensures Playwright Chromium is ready, compiles the local editor UI, checks the trusted runtime packer, and prints a ready-to-paste MCP config with your exact local paths.

### 2. Connect Your AI Coding Agent (or Launch the Local Editor)

Paste the MCP snippet printed by `npm run setup` into **Claude Code**, **Cursor**, **OpenAI Codex**, or **Gemini CLI** (see [`docs/TORA_AGENT_SETUP.md`](docs/TORA_AGENT_SETUP.md) for per-client commands), or start the local visual studio:

```bash
npm run dev:editor
```

Open `http://127.0.0.1:8001/?view=new` to inspect the built-in demos, drop in studio assets, or review playable revisions side-by-side.

---

## Built-In Showcase Demos

Tora ships with three playable-ad demos you can open, play, tweak, and export immediately inside the local editor (`Demos` menu):

| Demo | Engine Mode | Core Loop |
|---|---|---|
| **Tiny Harvest** | 2D Native + Match-3 | Cozy farm crop-matching puzzle with particle rewards, SFX/music, and Store CTA end card |
| **Traffic Tycoon** | 2D Native + Path Economy | Tap-to-dispatch intersection management with path networks, gates, and escalating feedback |
| **Mini Golf 3D** | 3D Native (`Stage3D` + `Physics3D`) | Drag-to-aim 3D miniature golf with camera follow, bounces, capture zone, and celebration end card |

Build static showcase artifacts locally:

```bash
npm run build:pages-editor   # Static hosted editor demo bundle
npm run build:website        # Static portfolio & showcase website
```

---

## Ad-Network Export Matrix (Honest Status)

| Target | Standard | Status | Verification Scope |
|---|---|---|---|
| **Standalone HTML5 Draft** | Self-contained single HTML | **Included (Core)** | Automated static + 4-viewport Creative QA |
| **Unity Ads** | MRAID 3.0 single HTML (<= 5 MB) | **Included (Core)** | Automated static rule check + mock MRAID 3.0 host tests *(official Unity Ads certification & physical-device QA remain separate)* |
| **AppLovin** | MRAID 2.0 single HTML (<= 5 MB) | **Included (Core)** | Automated static rule check + mock MRAID 2.0 host tests *(AppLovin Playable Preview & official acceptance remain separate)* |
| **Google Ads, Meta, ironSource, Mintegral, TikTok** | Network-specific wrappers & validators | **On Request** | Need another ad network? Contact [`mohamed@tora.work.gd`](mailto:mohamed@tora.work.gd?subject=Custom%20Ad-Network%20Export%20Request) |

> **Honest QA Boundary:** Automated tests and `tora_qa` prove engineering health only. Always inspect real exported screenshots/video, test on physical iOS/Android devices, and run each ad network's official preview tool before launching paid UA campaigns.

---

## Key Commands

```bash
npm run setup              # One-command toolchain check, Rust builds, browser check, MCP snippet
npm run dev:editor         # Start local visual editor on http://127.0.0.1:8001
npm run mcp:tora           # Run local MCP stdio server directly
npm run verify             # Full verification: schema, packer, typecheck, lint, Rust tests, JS/browser suites
npm run test:mcp           # MCP server + editor end-to-end integration tests
```

## Documentation

- [`docs/TORA_AGENT_SETUP.md`](docs/TORA_AGENT_SETUP.md) — MCP setup for Claude Code, Cursor, Codex, and Gemini CLI
- [`docs/PLAYABLE_BRIEF.md`](docs/PLAYABLE_BRIEF.md) — Mandatory creative, audio, and game-feel quality brief
- [`docs/TORA_CREATION_API.md`](docs/TORA_CREATION_API.md) — Native HTTP & document authoring contract
- [`docs/NATIVE_AGENT_TOOLS.md`](docs/NATIVE_AGENT_TOOLS.md) — Compact deterministic agent CLI & bundle transfer

---

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
