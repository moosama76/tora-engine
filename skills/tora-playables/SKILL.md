---
name: tora-playables
description: Create, revise, or review editable playable ads in Tora using its authoring tools and production briefs. Use for Tora playable-ad work, not unrelated game engines or general marketing copy.
---

# Tora playable authoring

Use Tora's existing project service and validated authoring operations. The user's creative request supplies the concept; this skill supplies the workflow and discovery entry point.

## Load current requirements and capabilities

With connected Tora MCP tools, call `tora_brief` at the start of the task. Read the returned production brief, playable brief, win and CTA guidance, and authoring documentation in full. Then use `tora_capabilities` and tool schemas to discover supported contracts, limits, and arguments. Do not invent endpoints or operations.

Without MCP, locate the Tora checkout and read `PRODUCTION_MASTER.md`, the workspace's required playable brief, and `docs/TORA_CREATION_API.md`. Use the configured editor origin; the documented local default is `http://127.0.0.1:8001`. Start the documented local editor if needed and available, then query `GET /api/creation/capabilities`. If the checkout, required brief, or connection is unavailable, identify the missing setup instead of silently authoring without it. Setup instructions live in `docs/TORA_AGENT_SETUP.md` in the checkout.

## Produce a coherent playable

Apply the [win effects and CTA guidance](references/win-effects-and-cta.md) and [Tora UI fundamentals](../tora-ui-fundamentals/SKILL.md) on the first generation. Read them here when working locally and use the same documents returned by `tora_brief` when connected.

Establish one visual style and a brief asset plan before scene construction. Source all production artwork and audio from free third-party libraries such as Kenney, Flaticon, or another source with a verified license that permits the intended commercial use. Use one coherent visual pack or style family per playable, including characters, environments, props, puzzle items, UI, and effects. Audio may come from a separate compatible sound pack. Record the source URL, author, license identifier and text, required attribution, original file path, and downloaded file hash for each asset. Verify attribution and redistribution obligations before packaging.

Prepare sourced files through faithful cropping, resizing, transparent-padding removal, or supported format conversion when needed. Preserve the original download and its license evidence. Asset creation through image generation, custom illustration, procedural drawing, or synthesized audio is outside this authoring workflow. Keep useful object/layer editability and separate interaction geometry. Build compositions from the sourced objects and inspect them at the target phone size. Existing demonstration games illustrate API usage and require their own source and style review before reuse.

Prove one representative scene at the intended phone size before expanding the ad. Include responsive motion, suitable sound, and clear visual rewards. Follow the current briefs' acceptance gates, including packaged screenshots and footage. Compilation and export cannot establish visual quality.

## Author and inspect safely

Create a new project or inspect the requested existing project. Use `tora_inspect` to get the current revision and content hash before editing; preserve unrelated objects and scenes. Use `tora_upload_asset` for prepared assets with accurate rights declarations, and connect them to image components through the supported operations.

Submit edits through `tora_edit`, with the inspected `expected` revision and all intended changed record IDs in `scope`. A `PREVIEW` response is not a committed change: inspect the effects and adjust scope only when those effects belong to the requested task. On a stale revision, inspect again before rebuilding the edit. Never blindly replay edits or bypass validation. For HTTP authoring, use the documented preview/commit sequence and revision checks.

Use `tora_render` for scene preview and `tora_export` for the packaged playable. Rendering writes an artifact; actually open and inspect it using available browser or image tools. Review motion, gameplay, transitions, and the end card in the exported playable, repair defects, and recheck affected behavior.

Deliver both an editable project bundle and the playable artifact, with paths or links and concise verification evidence. Distinguish engineering checks, AI visual inspection, user approval, real-device testing, and official network acceptance. Current standalone browser drafts are not network-qualified exports. Configure a real destination when supplied; do not claim campaign readiness with an example store URL.
