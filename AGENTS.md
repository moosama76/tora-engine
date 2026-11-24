# Workspace instructions

Before creating, revising, or reviewing any deliverable, read `PRODUCTION_MASTER.md` in this directory in full and apply its responsibilities, workflow, quality gates, and change-control rules.

Do not change `PRODUCTION_MASTER.md` or this read requirement without explicit user permission to change those instructions. Ordinary task authorization is not permission to modify them.

## Standing game-production instructions

For every game or playable-ad task, including revisions and review, read `docs/PLAYABLE_BRIEF.md` in this directory (or the path configured by `TORA_PLAYABLE_BRIEF`, if set) in full before implementation. Apply its production roles, workflow, quality gates and reporting standards. Prioritize player-perceived visual/gameplay/advertising quality within mandatory network, performance, licensing and reliability limits. Inspect real packaged screenshots and footage; tests alone do not establish visual acceptance or campaign effectiveness. Preserve unrelated work and distinguish engineering, human visual, device and official network acceptance. These instructions apply to game work, not unrelated tasks. New explicit user instructions take precedence.

## Tora authoring entry point

For requests to create, revise, or review playable ads in this workspace, read `skills/tora-playables/SKILL.md` and follow its Tora workflow. The production briefs above remain authoritative. Do not require the user to repeat their locations or provide endpoint lists.

When Tora MCP tools are connected, call `tora_brief` to load the current briefs and authoring documentation, then inspect current capabilities before authoring. Otherwise read `docs/TORA_CREATION_API.md`; use the configured local editor origin, or start the documented local editor when needed. Discover contracts through `GET /api/creation/capabilities` rather than guessing them. See `docs/TORA_AGENT_SETUP.md` for connection setup. The hosted static editor URL is not a backend API.
