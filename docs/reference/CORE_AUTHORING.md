# Tora core authoring

Native projects are editable Creative Project `2.1.0` documents running on `tora-native/1.0.0`. Authors supply declarative records only: no functions, property paths, executable JavaScript, custom shaders, or runtime source.

## Required workflow

1. Read the production, playable, win/CTA, and UI briefs returned with this guide. They remain authoritative.
2. Discover exact contracts before editing. Use `tora_capabilities({packs:[...]})` or BYOK `discover_contracts({packs:[...]})` for only the mechanics you need. Use `tora_brief({packs:[...]})` for the matching guides. `full:true` returns the complete legacy authoring references.
3. Create or inspect a project and retain its exact `{revisionId,contentHash}`. Build edits as `tora-transaction-1` operations. Preview them, review effects and dependency removals, list every intended changed record in `scope`, then commit the exact preview digest. Reinspect stale revisions rather than replaying edits.
4. Use sourced assets with verified commercial-use rights. Keep one visual style family per playable; audio may use a separate compatible family. Preserve source URLs, authors, licenses, original paths, and hashes. Upload through the asset operation or BYOK `stage_assets`.
5. Render, run Creative QA, export, and inspect actual packaged screenshots and motion. Automated QA is not human visual approval, device testing, campaign-effectiveness evidence, or official network acceptance.

## Transaction and delivery essentials

- Native documents contain scenes, components, variables, gameplay behaviors, shared event sources, ordered event bindings, assets, and a store destination. Component transforms are local affine matrices; scene membership and world transforms are derived.
- Preview and commit enforce exact revision identity. Deleting shared records can remove dependent records; inspect `preview.effects` before commit.
- Creative QA checks static audio/text rules and exercises opening and primary input at `320×568`, `390×844`, `768×1024`, and `844×390`, with a 150 ms primary-response limit. End-card and timeout coverage requires an available state hook.
- Standalone HTML is a draft. Unity Ads and AppLovin exports use host-injected MRAID and the pinned trusted runtime. Run `playable-cli artifact check` on each exact exported file; static success is not official network acceptance.
- Configure a real HTTPS Google Play or App Store destination before campaign use. Only a deliberate trusted CTA release may open the store. Audio starts muted until permitted interaction.
- Replay resets runtime state without rewriting authored data. Runtime instances never enter authoring history.

## Domain pack index

| Pack | Load for |
|---|---|
| `core` | Always included: visual contracts, layout, tap/drag/motion, colliders, timers, animation, emitters, audio, camera, meters, variables, and common actions |
| `drag-gestures` | Drop zones, item merge/swap semantics, swipe input, hold charge, pointer/drag/contact-end events |
| `entities-targeting` | Per-instance state, deterministic random values, steering, launch targeting, instance actions and comparisons |
| `canvas-physics` | Erase masks, drawn strokes, 2D bodies, aim/capture/oscillation, distance joints, slicing and mask events |
| `match-board` | Match-3 boards and tiles, match outcomes, board reset/hint/asset actions |
| `path-network` | Node/edge routing, agents, gates, path events and actions |
| `3d` | 3D stages, meshes, 3D physics, aiming, capture, and oscillation |

Pack guides are intentionally concise. Exact property descriptors, bounds, defaults, operations, limits, conditions, variable types, and targets come from the capability registry rather than prose examples.

## Core authoring limits and safety

Discover current numeric limits programmatically. Runtime execution budgets are fixed independently of authored collection caps. Large event/action chains terminate with diagnostics rather than running unbounded. Component, variable, behavior, event, asset, scene, path, and store references must resolve and have compatible types.

Keep touch targets at least 44 CSS px, preserve ad-SDK overlay corners, and test portrait and landscape. Use one clear primary action and concise copy. End cards require a celebratory composition, full-screen success effects, musical feedback, and one shiny animated Store CTA with no visible replay button.
