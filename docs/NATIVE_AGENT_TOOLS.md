# Compact native agent tools

Run `node scripts/lean/native/agent-cli.mjs` with one JSON request on stdin. The
CLI prints one compact JSON response, or a rejection code on stderr and exits 1.
`TORA_PROJECT_STORE` selects the store; its default is `.tora/native-projects`.
No command calls a model. Existing native validation, history and compilation
remain authoritative.

For the current garden restoration module, run the supplied asset-backed concept
through the normal composition entry point. Use a fresh project ID when repeating.

```sh
node scripts/lean/native/author-garden.mjs reports/garden-review my-garden-review
node scripts/lean/native/check-garden.mjs reports/garden-review
```

The v2 contract is described below. It requires explicit claim bindings and artwork,
then creates two puzzles, persistent repair choices, recovery and executable pacing.

Low-level requests follow.

```json
{"command":"create","id":"my-game","name":"My game"}
{"command":"inspect","id":"my-game"}
{"command":"inspect","id":"my-game","search":"title"}
{"command":"inspect","id":"my-game","ids":["title"],"fields":["parameters.text"]}
{"command":"contracts","names":["native.text.v1"]}
```

`compose` also accepts legacy `tora-creative-concept-1` input. Legacy concepts
return `creativeStatus:"PROTOTYPE"` and unmet requirements. The response binds every
composition to `conceptHash`. Concept and project approval remain explicit.

Inspection returns `expected: {revisionId,contentHash}` for the edit you reviewed.
Scoped inspection includes relevant ancestors, referenced records and reverse
references; parameter inspection includes the selected property descriptors.
Overview/search responses have an 8 KiB limit and scoped responses a 24 KiB limit.
An oversized response returns `E_AGENT_NARROW_SCOPE` instead of truncating. Use
`full:true` explicitly to retrieve the complete project document.

Submit an edit with `command:"edit"`, `id`, `expected`, existing native
`operations`, and `scope`, an array of every intended changed record ID, including
new records. Use the reserved scope ID `$project.base` for project settings changes
(`setStore` and `setStartScene`). Their changed ID is reported even when no scene
or component record changes. Tombstones are automatic deletion bookkeeping, not
a separate authorable scope. Preview and commit happen within that call. If validation finds any
changed records outside scope, the result is `status:"PREVIEW"` with
`outsideScope`, changed IDs and a digest; no mutation occurs. Review those effects
and resubmit with the intended scope and optional `previewDigest`. `previewOnly`
requests inspection without committing. A stale revision fails without rebasing.
Successful edit responses fit within 4 KiB; oversized responses fail before commit.

Other commands:

- `history`: `id`, `expected`, `action:"save"|"undo"|"redo"`.
- `render`: `id`, optional `revisionId`, optional `sceneId`, and `output` HTML path.
  Produces an edit-mode preview of the requested scene, without changing the project.
  Open the artifact in a browser to capture screenshots or inspect it.
- `export`: `id`, optional `revisionId`, `output`, and optional
  `target:"standalone-browser-draft"|"unity-ads-ua-playable"|"applovin-growth-playable"|"meta-audience-playable"|"google-ads-app-playable"|"ironsource-levelplay-playable"|"mintegral-appgrowth-zip"|"tiktok-ads-playable"` (standalone is the default). ZIP targets require a `.zip` output; Mintegral requires the basename `<projectId>.zip`.
- `export` with `format:"project"`: `id` and `output` for the current editable bundle.
- `import`: `file` and optional `copy:true`; validates and imports an editable bundle.
  Project collision handling and asset validation use the shared bundle adapter.

Contract requests accept registered component contracts, behavior names, or
`operations`, `events`, `actions`, and `limits`. The registry is returned only when
explicitly requested; it is not attached to every mutation response.

Standalone HTML remains a browser draft. Every network output starts as
`ASSEMBLED_UNVERIFIED`: Unity/AppLovin use MRAID, Meta uses FbPlayableAd, Google
uses ExitApi, ironSource uses DAPI, Mintegral uses its global lifecycle, and TikTok
uses its Playable SDK. Run `playable artifact check` on the exact HTML or ZIP;
`STATIC_PASS` is static qualification only. Neither compilation nor static inspection establishes
visual, physical-device, official ad-network, or campaign acceptance.

## Creative QA gate

`tora_qa` and CLI `{"command":"qa","id":"my-game"}` run static/acoustic preflight and
Playwright checks at 320×568, 390×844, 768×1024, and 844×390. They write a
`tora-creative-qa-1` report and labeled opening/after-input PNGs under the project
QA directory unless `output` is supplied. Checks cover WAV clipping/silence,
catalog role and valence, distinct win/loss bytes, mix hierarchy, unsupported pixel
glyphs, stage/parent clipping, text fit, 44 CSS-pixel touch targets, interactive
overlap, SDK safe zones, and a primary-input response within 150 ms.

Standalone and Unity HTML exports run the same gate. Blockers reject export with
`E_CREATIVE_QA` and the structured report; successful manifests identify the QA
evidence. Review agents can call their `qa` tool on a preview digest, and candidates
with blockers are not staged. Editable project-bundle export remains available for
repair and is not represented as a playable-quality pass.

For a standalone artifact, run
`node scripts/lean/native/creative-qa.mjs path/to/index.html --output reports/my-game-qa`.
End-card and timeout capture require an explicit generic `--state-hook` global
function; unsupported states are reported as skipped or unavailable, never passed.
The integrated service currently audits opening and first-input states. Automated
QA does not replace full-loop playthrough, human visual/audio review, physical-device
testing, or official network acceptance.

## Storage and migration

Local editor and tools now default to `.tora/native-projects/`. Existing stores
remain untouched. Run `npm run migrate:native-store` to copy and validate the
old default `reports/native-final/projects` into the new default. Migration
refuses an existing destination, validates revisions/assets, retains the old
store, and transfers history pointers. Use `EDITOR_STORE` to reopen the old
store if needed. New compact tools are available for evaluation; promotion
as the preferred workflow awaits the benchmark gates. Legacy entrypoints
remain supported and have not been retired.

## Executable restoration concepts

`tora_compose` exposes the same composer through MCP after `tora_brief`. Discover
the current schema with `tora_capabilities` and `names:["creative-concept"]`.
CLI `contracts` accepts the same name. The MCP transport has a bounded 12 MiB message limit for raw base64 uploads;
large local files can instead use `tora_upload_asset` with a workspace `filePath`.
Auto optimization retains original masters and returns a delivery receipt.

`compose` also accepts `tora-creative-concept-2` with mechanic `match-restore` and
`experience.goal=2` for existing restoration projects. The historical illustrated
example preserves its saved artwork and explicit strategy plan.

New production modules require free third-party asset provenance and one visual
style family per playable. Source visuals from a coherent pack such as Kenney or
another appropriately licensed free library. Verify the source URL, author,
license identifier, source file, and downloaded bytes. Audio may use a separate
compatible sound pack. The module's asset policy checks these records against
repository source receipts and the supplied bytes. A free-form rights declaration
alone supplies no verified source evidence. Faithful file preparation preserves
the original asset and license records. Creating artwork or synthesized audio is
outside this workflow.

`restoration.binding` declares `{event:"validMatch",choice:"repairArea",persistent:true}`.
`restoration.areas` contains exactly two `{id,label,before,after}` records. Each art
record contains `{id,mime,data,rights}`, with base64 PNG/JPEG bytes and a rights
declaration. The before and after bytes must differ. `restoration.tiles` supplies
`sun`, `leaf`, and `drop` artwork. Optional `restoration.audio` supplies WAV records
for `ambient`, `impact`, `payoff`, `reject`, and optionally `complete`. Source media
passes the shared decode validation before project composition commits.

The required eight `requirements` records contain `source`, `claim`, and `effect`.
`claim` must equal the referenced strategy text exactly. Editing that strategy
without revisiting its requirement rejects with `E_CONCEPT_REQUIREMENT_STALE`.
The supported source and effect mappings are fixed for this module.

| Source | Observable effect |
| --- | --- |
| `product.gameplayTruth` | `match-rule` |
| `product.differentiator` | `world-transformation` |
| `audience.motivation` | `repair-choice` |
| `experience.fantasy` | `world-transformation` |
| `experience.interactionRationale` | `match-rule` |
| `hypothesis.statement` | `world-transformation` |
| `hypothesis.risk` | `recovery` |
| `experience.storeContinuity` | `continuity` |

Composition returns these requirements with concrete `records` references to the
matching rules, world objects, choices, recovery bindings, and CTA. This is an
author-supplied executable interpretation. Whether the supplied artwork and rules
faithfully express the prose remains part of creative review.

The module rejects wrong adjacent swaps, exposes the successful swap briefly,
then earns a choice of repair. Each repair swaps the selected area's artwork and
persists through the rest of the experience. A different second puzzle escalates
the interaction. Already repaired areas cannot earn another reward. Timed visual
hints help idle players. The interactive arc's first three durations bound the
journey to the CTA, preserving the current world when unfinished. The payoff
holds for its declared duration, with a deliberate Continue action available.
Replay restores both the world and puzzle rules.
The illustrated module reflows into two columns in landscape, keeping the garden
and puzzle at readable sizes. Rotating during play preserves repairs, puzzle
state, phase timing, and replay behavior.

Version 2 returns `creativeStatus:"REQUIRES_VISUAL_REVIEW"`. Existing version 1
concepts remain available with `creativeStatus:"PROTOTYPE"` and explicit
`unmetRequirements`. Neither status grants creative, device, network, or campaign
acceptance.

## Sourced harvest concepts

The production harvest module uses the version 2 concept format and the
harvest-restore mechanic. Its assets carry structured provenance containing
origin, sourceId, sourceFile, sourceHash, author, license, sourceUrl, and
styleFamily. Origin is third-party-free. The authoring source catalog is stored
at assets/free-assets/catalog.json and is maintained from reviewed third-party
downloads and their license files.

The asset policy binds each embedded asset to an exact catalog file hash and
checks the retained source and license files. All visual assets share one catalog
style family. Audio may use separate packs, with recorded source hashes and
ffmpeg or Web Audio OfflineAudioContext conversion arguments for WAV preparation. Attributed licenses
carry their required credit in the project asset rights. Unsupported source
records, replacement bytes, and mixed visual styles reject composition.

The current library includes the untouched Kenney Tiny Farm PNG tiles under CC0.
Scene layout assembles these sourced tiles as editable image objects. This
catalog establishes provenance for the listed files. Actual packaged composition,
readability, interaction, audio balance, and visual cohesion still require review.

The top-level `audioCollections` entries `casual-warm` and `arcade-pop` each resolve
seven distinct roles: ambient, tap, match, reject, reward, win, and loss. Collection
cue IDs point to files across explicitly named sources; they do not misrepresent a
mixed-source collection as a single sound pack. Source pages/archives, license text,
conversion receipts, and output SHA-256 values are retained under `assets/free-audio/`.
All cues have bounded PCM analysis and `auditionStatus:"analyzed"`; none is marked
human-auditioned. Regenerate the collection outputs with
`node scripts/lean/native/prepare-audio-collections.mjs`, then run the asset-policy tests.

## Review providers

OrcaRouter with DeepSeek Flash Free remains the default and preserves the existing
key setup. Set `TORA_REVIEW_PROVIDER` to `orca`, `openai`, `anthropic`, `gemini`, or
`openai-compatible`. Non-Orca providers require `TORA_REVIEW_MODEL` and their
respective `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or
`TORA_REVIEW_API_KEY`. `TORA_REVIEW_ENDPOINT` overrides the HTTPS endpoint and is
required for OpenAI-compatible services; `TORA_REVIEW_PAID_MODEL` optionally selects
the explicitly paid route. Gemini credentials are sent in its API-key header, not
the URL. Provider and model choice do not bypass Tora's typed edit validation,
Creative QA, candidate comparison, or creator approval.

Screenshots stay out of provider requests by default. Set `TORA_REVIEW_VISION=1`
only for an explicitly selected vision-capable model; up to four bounded PNG/JPEG/
WebP images can then be attached. Without this opt-in, the request records how many
screenshots were omitted. Local capture and deterministic QA still run either way.

## DeepSeek feedback resolution

Write feedback and select **Request revision**. For several notes, use **Add
another note** between comments and submit them together. A plain note applies to
the playable. **Target a part** attaches feedback to a selected element and lets
the creator restrict the fields DeepSeek may change.

Tora saves the notes first. If the editor needs credentials, enter an OrcaRouter
API key in the local feedback panel and select **Save key and retry**. Tora
validates the key with the provider and continues the saved request. The local
store keeps the key in an owner-only file outside individual projects. An editor
started with `ORCAROUTER_API_KEY` can also use that key. A verified key entered
in the editor takes precedence.

DeepSeek can inspect the selected native project, follow event and asset
references, look up native contracts, and preview typed edits. A selected moment
gives the note context. Pinning an element limits that note to the selected fields.
Replacing shared artwork requires explicit permission. Captured frames and media
stay local. The model receives textual project records and local verification
results.

DeepSeek Flash is free by default. Selecting DeepSeek Pro opts that request into
provider billing. Each request can use up to eight model turns and two attempts
to repair a rejected result. After three discovery turns, DeepSeek drafts an edit
from the evidence it has already gathered and Tora runs the checks. A rate-limited
request resumes with its tool results.
If DeepSeek needs a decision, answer its question on the saved request.

Tora validates and packages the candidate and displays its actual changes for
comparison. Select **Use this version** to apply it. Discarding a candidate leaves
the project ready for another request. On Harvest candidates with verified
outcome audio, **Replay win** and **Replay loss** play the corresponding changes.

### Deterministic revision pilot

Start the local editor with `TORA_DETERMINISTIC_REVIEW=1` to enable local
typed edits. A pinned CTA text command that completely matches the literal
form `Change the selected CTA to "Play now"` uses the existing field adapter with
zero provider calls. Extra clauses, negation and other wording remain on the
interpretation path. For the sound case, target **Final payoff**, allow **Sound
played when the last harvest completes**, and select the explicit replacement cue.
The resulting typed intent moves the current win asset to the timeout binding,
imports distinct licensed victory bytes for winning, and runs both packaged
outcome checks before staging a candidate. Explicit sound edits are submitted one
at a time. Candidates still require comparison and explicit promotion.

With the relevant field selected, `Set the opening hint delay to 2 seconds` and
`Set the tap feedback duration to 0.3 seconds` change timing in Harvest and
Tap Collect respectively. At Harvest timeout, select **Caption alignment within
the panel** and enter `Center the existing timeout caption in the panel`. The
packaged landscape check measures the caption center and verifies that the
original wording appears once.
For shared crop art, pin the crop and authorize changing all its uses. An exact
command such as `Replace all uses with "replacement-asset"` uses the chosen
asset only if the shared-art adapter lists that ID as eligible.

Set `TORA_REVIEW_INTERPRETATION=1` to pilot a single DeepSeek interpretation
call for compatible copy, timing and outcome-audio notes. An unsupported
interpretation can use the general agent with the remaining turn budget. Both
routes use Free Flash by default. This flag stays off pending a successful live
sound paraphrase.

New Harvest concepts can opt into `harvest.rewardRecipe` with
`{"id":"harvest-reward-1","variant":"bloom"}`. Use `crisp` for the existing
quicker payoff, or `seeded` to choose reproducibly from both treatments using
the recorded board seed. Both keep the supplied art and licensed cue slots.
Composition returns the recipe, resolved variant and scenario list. Agent
composition records it against the originating revision in the project journal.
Both explicit treatments require creative review for default rollout.

The editor and `tora_review_resolve` MCP tool call the same `NativeReview`
candidate service. The flag is off by default; without it, existing model and
manual-agent routing is unchanged. Every saved request has a
`tora-review-receipt-1` with route, candidate identity, provider attempts and
reported token usage, tool response sizes, repairs, clarifications, verification
runs, phase timings, rate-limit wait and disposition. Receipts exclude prompt
text, credentials, media and reasoning. Usage is zero for zero provider calls and
remains unknown when a provider call does not report it.

[OrcaRouter model card](https://www.orcarouter.ai/models/deepseek/deepseek-v4-flash-free)

## Manual review through MCP

The local editor also supports a connected Tora agent. Copy the agent instruction
from the review workspace to work on a pending request through MCP. Both clients
must point to the same native project store. The local journal uses `flock` to
coordinate the editor and agent.

- Call `tora_review_claim` with `{id, requestId}`. It returns the numbered notes, baseline,
  field IDs, their current values, and any captured frozen frames. Open
  the baseline playable to judge motion.
- Call `tora_review_propose` with `{id, requestId, proposalId, changes, summary}`.
  Use a UUID for `proposalId`. For a note list, put an entry for every scoped
  note in `changes`, such as `{"1":{"instruction":"Match three crops"},"2":{"text":"Play now"}}`.
  Whole-moment notes give the agent context. For a single note submitted
  before note lists were introduced, use `{"text":"Play now"}`.
  One unique proposal counts as one
  of the two creative passes for that request, including a rejected proposal. Retry an
  interrupted build with the same ID and payload. A shared crop request
  requires explicit selection of every-use scope. Choose a replacement from
  the returned image IDs.
- If the note needs another field or a different target, call
  `tora_review_needs_scope` with `{id, requestId, reason}`. The creator can
  then select the intended adjustment in the editor.
- The editor loads the candidate automatically and the creator can compare,
  replay, apply or discard it. Applying checks the original baseline and
  saves a new working revision. Approval and Unity or editable export use
  their existing controls.

For a new authorized studio pack, use **New playable** in the local editor.
Supply retained PNG/JPEG sprites and compatible PCM WAV audio, a source game
brief, studio name, rights and store URL. Copy the agent instruction after
submitting. Call `tora_intake_claim` with the intake ID, then
`tora_intake_build` with that ID and a Harvest v2 concept. Fill the tile, farm
and audio references using the returned asset IDs and omit `harvest.assets`.
The local service reads the original bytes, validates provenance and measures
the exact Unity package. If publication was interrupted after preparation,
`tora_intake_build` with just the ID resumes publication.
