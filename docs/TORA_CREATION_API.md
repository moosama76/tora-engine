# Tora native authoring API

Native authoring creates an empty Creative Project 2.1 scene. The HTTP API and the
local editor use the same `NativeService`, `ProjectStore`, `EditorState` commit
lock, atomic history-pointer writer, validator, asset lowering, and compiler.
Manual authoring and the supplied clients make zero model calls.

Run `npm run setup` to build the bounded PNG/JPEG decoder and optimizer entry points
(`inspect_native` and `optimize_native`). Start `npm run dev:editor` and open
<http://127.0.0.1:8001/?project=tiny-harvest-win-cta>. The default store is
`.tora/native-projects`. `EDITOR_PORT`, `EDITOR_STORE`, and
`EDITOR_PROJECT` override the defaults. The project URL opens its playable preview and review workspace.

The supplied projects are unaccepted drafts with an example Google Play URL.
Configure the intended store destination before creative approval or campaign use.
Standalone export is not network qualification. The native compiler also supports
`unity-ads-ua-playable`, `applovin-growth-playable`, `meta-audience-playable`,
`google-ads-app-playable`, `ironsource-levelplay-playable`, `mintegral-appgrowth-zip`,
and `tiktok-ads-playable`; their output is `ASSEMBLED_UNVERIFIED` until the exact HTML
or ZIP passes static inspection. Official network preview and device acceptance remain
separate gates. Unsupported network exports fail explicitly.

## Asset sourcing

Studio intake retains authorized game assets with source hashes and a rights
declaration. Sourced packs use free third-party artwork and audio with verified
commercial-use licenses. Select one visual pack or style family for the whole
playable. Audio may use a separate compatible pack. Record source URLs, authors,
license identifiers and texts, attribution requirements, and original file hashes.
Preserve downloaded source files through faithful asset preparation. Creating or
generating replacement artwork and sound is outside this workflow.

`assets/free-assets/catalog.json` also exposes `audioCollections` for **Casual Warm**
(`casual-warm`) and **Arcade Pop** (`arcade-pop`). Each maps `ambient`, `tap`,
`match`, `reject`, `reward`, `win`, and `loss` to a distinct catalog cue ID. Ambient
music comes from the retained CC0 Tarush Singhal and 3xBlast downloads; other cues
retain their individual Kenney Interface Sounds or Music Jingles provenance rather
than claiming to come from one archive. `audio-conversion.json` beside each family
records source/output hashes and Web Audio conversion settings. Metadata is
`auditionStatus:"analyzed"`: PCM measurements and licensing checks are complete,
but human speaker/headphone audition and creative suitability remain separate.

The BYOK creator uses the same validated transaction and media pipeline. Its three
asset-source modes are enforced server-side: uploads only, uploads plus verified
CC0, or verified CC0 only. The local catalog records dimensions/durations, style
families, hashes, authors, source URLs, and license evidence. Live fetching is
limited to HTTPS Kenney and CC0-filtered OpenGameArt sources, with public-DNS and
redirect checks, streaming/ZIP limits, media normalization, and immutable cache
receipts under `.tora/remote-asset-cache/`. Offline or unverifiable remote results
fall back to local matches and are never staged as verified remote media. A build
is capped at 12 model turns and four minutes, supports cancellation/retry, and
persists progress in the intake's `build.json`. Provider use remains billable to
the creator's connected key.

## HTTP boundary

Mutations require the exact local Origin and Host, `Content-Type: application/json`,
and a body no larger than 1 MiB, except project/intake asset uploads, which allow
12 MiB to carry an 8 MiB raw file in base64 JSON. IDs are local identifiers, never filesystem paths.
Project IDs use lowercase letters, digits, and hyphens, start with a letter, and
contain 2–48 characters. Object/record IDs permit lowercase letters, digits,
underscores, dots, and hyphens, start with a letter, and contain at most 96 characters.
`constructor`, `prototype`, and `__proto__` are reserved IDs; project ID `compose` is reserved for the legacy composer route.

| Endpoint | Result |
|---|---|
| `POST /api/review/connection` | Local editor only. Accepts `{apiKey}`, checks it using the authenticated OrcaRouter model catalog, stores a valid key and returns `{configured:true}` |
| `GET /api/projects/:id/review` | Feedback, candidate status, and configured feedback models |
| `POST /api/projects/:id/review` | `action:"request"` saves notes with their expected revision and runs DeepSeek when configured. Set `paid:true` to opt that request into DeepSeek Pro. With the local `TORA_DETERMINISTIC_REVIEW=1` pilot, complete literal CTA commands and explicit typed outcome-cue controls instead use the same candidate service with zero provider calls. `action:"resolve"` resumes a saved request by ID. `action:"answer"` accepts `{requestId,answer}` for a clarification. Candidates await creator approval. |
| `GET /api/creation/capabilities` | Registered visual/behavior contracts, typed defaults, constraints, units, operations, limits, conditions, and actual targets |
| `POST /api/projects` | `{id,name,kind:"native-scene",androidUrl?}` → empty default scene and working revision |
| `GET /api/projects` | Valid projects, kind, and native working revision |
| `GET /api/projects/:id?revision=ID` | Chosen immutable revision, or the working head when the query is absent |
| `POST /api/projects/:id/transactions/preview` | Validate a transaction; return its digest, affected records, dependencies, asset references, and warnings |
| `POST /api/projects/:id/transactions` | Build and atomically commit the exact previewed transaction |
| `POST /api/projects/:id/history` | `{expected:{revisionId,contentHash},action:"save"\|"undo"\|"redo"}` |
| `POST /api/projects/:id/accept` | Explicit `{revisionId,contentHash}` approval; no automatic acceptance |
| `POST /api/projects/:id/export` | Explicit `{revisionId,target}` for standalone or any of the seven network profiles → HTML and manifest, plus `archiveBase64`/`archiveFilename` for ZIP targets |
| `POST /api/review-intakes/:id/submit` | `{}` or `{mode:"auto"\|"byok"\|"mcp"}`. A verified Gemini/OpenAI/Anthropic connection starts an asynchronous BYOK build; otherwise the existing `$0` MCP handoff is queued. |
| `POST /api/review-intakes/:id/cancel` | `{}` aborts the active BYOK build and preserves its uploads and partial draft. |
| `POST /api/review-intakes/:id/retry` | `{}` resumes a failed/cancelled BYOK build without re-uploading assets. |
| `POST /api/projects/:id/assets` | `{expected,asset:{id,mime,data,rights,optimize?,preserveResolution?}}`; raw base64 up to 8 MiB, non-destructive optimization, real delivery decode validation, then one revision. A retained `sourceHash` may replace `data` when re-optimizing an existing asset |
| `GET /api/projects/:id/assets/:assetId` | Asset hash, MIME, byte count, rights declaration, and provenance |
| `GET /api/projects/:id/render?revision=ID` | Verified, lowered asset bytes and artifact identity for editor rendering |

The review workspace uses the public project and revision endpoints directly.

Successful transaction responses include `revisionId`, `contentHash`,
`previousRevisionId`, artifact identity, actual effects, capabilities, and editor URL.

Errors are JSON objects containing a stable `E_*` code, without stack traces or
filesystem paths: 400 malformed input, 403 origin/protection failure, 404 missing
project/revision/asset, 409 stale revision/preview or duplicate project, 413 limits,
and 422 invalid references, contracts, resulting documents, or unsupported targets.

## Creative QA and review providers

HTML export runs deterministic Creative QA before returning an artifact. It checks
audio semantics/acoustics and pixel text statically, then reuses one Playwright
browser across 320×568, 390×844, 768×1024, and 844×390 for layout and primary-input
response within 150 ms. Blockers return `E_CREATIVE_QA` with a `tora-creative-qa-1`
report; successful export manifests include QA evidence. Review candidates must pass
the same gate before staging. MCP `tora_qa` runs it on demand and writes labeled PNGs.
The CLI equivalent is:

```sh
node scripts/lean/native/creative-qa.mjs path/to/index.html --output reports/creative-qa
```

Opening and first-input states are covered by the integrated service. Generic
end-card/timeout states require `--state-hook <globalFunction>` and are honestly
reported as skipped or unavailable otherwise. This gate is not full-loop human
playtesting, audio audition, device certification, or ad-network acceptance.

OrcaRouter/DeepSeek remains the review default. `TORA_REVIEW_PROVIDER` also accepts
`openai`, `anthropic`, `gemini`, and `openai-compatible`. Configure
`TORA_REVIEW_MODEL` plus `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or
`TORA_REVIEW_API_KEY` respectively. `TORA_REVIEW_ENDPOINT` overrides the HTTPS URL
(and is required for compatible endpoints); `TORA_REVIEW_PAID_MODEL` sets the paid
route. Provider screenshots require explicit `TORA_REVIEW_VISION=1` and a suitable
vision model. Otherwise they are omitted and counted in the textual request. No
provider route bypasses typed edits, QA, candidate review, or explicit approval.

## Transaction example

```js
const origin = 'http://127.0.0.1:8001';
async function post(path, body) {
  const response = await fetch(origin + path, {
    method: 'POST', headers: {'Content-Type': 'application/json', Origin: origin},
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.error);
  return result;
}
const project = await post('/api/projects', {
  id: 'my-native-game', name: 'My native game', kind: 'native-scene',
});
const envelope = {
  format: 'tora-transaction-1',
  expected: {revisionId: project.revisionId, contentHash: project.contentHash},
  operations: [
    {kind: 'createComponent', component: {
      id: 'target', contract: 'native.button.v1', sceneId: 'scene.play',
      transform: [1, 0, 0, 1, 100, 250], parameters: {width: 180, height: 100},
    }},
    {kind: 'putVariable', variable: {
      id: 'score', label: 'Score', type: 'number', initial: 0,
    }},
    {kind: 'putEvent', event: {id: 'tap', kind: 'click', componentId: 'target'}},
    {kind: 'putBinding', binding: {
      id: 'award', eventId: 'tap', actions: [{kind: 'add', variableId: 'score', value: 1}],
    }},
  ],
};
const preview = await post('/api/projects/my-native-game/transactions/preview', envelope);
// Review preview.effects, particularly dependency removals and shared references.
const committed = await post('/api/projects/my-native-game/transactions', {
  ...envelope, previewDigest: preview.previewDigest,
});
```

The preview digest binds the base revision/hash, operation order, resulting
content, and effects. Caller-supplied owner, protection, approval, or scope fields
are rejected. Stale clients get a conflict rather than a silent rebase. The final
candidate is validated and built before the locked head check and atomic publish.
A failed operation or build leaves the previous revision and artifact usable.

## Document ownership

The 2.1 schema is `packages/creative-project/project-v21.schema.json`. Structural
TypeScript types and Rust schema identity are generated from the contract registry
with `node scripts/m2/generate-project-v21.mjs`. `parseCreativeProject` recognizes
both 2.0 and 2.1; the existing `parseProjectV2` entry point retains its 2.0 behavior.
Rust `parse_project` recognizes both. The existing canonical content codec and hash
domain are reused, with `revisionId` excluded from content identity.

Native documents have `base.kind="native-scene"`, runtime `tora-native/1.0.0`, and
no Merge runtime spec or bundle reference. Components own their `sceneId`, optional
`parentId`, numeric sibling `order`, local six-number affine `transform`, typed
`parameters`, and asset slots. Scene membership and world transforms are derived.
No editable scene tree is kept in extension data. Raster images are atomic leaves.

`variables`, `gameplay`, `events`, and `eventBindings` are first-class collections.
Bindings reference shared event sources by `eventId`, with typed conditions and
ordered actions. `putBinding` also accepts an inline `event` as convenience input;
the executor expands it to the stable ID `BINDING_ID.event`. The stored binding
contains only the reference. Use explicit event IDs for long binding identifiers
or intentionally shared sources.

## Operations and semantics

- Scenes: `createScene`, `renameScene`, `deleteScene`, `setStartScene`.
- Objects: `createComponent`, `renameComponent`, `duplicateComponent`,
  `deleteComponent`, `setParameter`, `setTransform`, `setPrototype`,
  `reorderComponent`, `reparentComponent`, `group`, `ungroup`.
- Gameplay: `putVariable`, `deleteVariable`, `putBehavior`, `deleteBehavior`,
  `putEvent`, `deleteEvent`, `putBinding`, `deleteBinding`.
- Assets/store: `registerAsset`, `updateAsset` (replace the record for the same asset ID), `replaceAsset` (rewire a component), `setStore`.

Read the capabilities response for the current contract/property vocabulary.
Registered contracts are group, rectangle, ellipse, bounded vector path, image,
sprite, walk sprite, text, and button. `native.sprite.v1` uses an image atlas in
its `source` slot; `frameCount`, `frameColumns`, and `frameRate` select frames at
runtime, while edit mode shows the first frame. `native.walk-sprite.v1` uses the
same atlas properties, advances frames only when its world position changes, and
returns to frame zero after movement stops. A text object can interpolate a
declared variable as `{{score}}`.
Buttons provide enabled/hover/pressed/disabled visual states and child visuals.
Authors can set a button's optional `presentation` to `pixel-cta` for a beveled
pixel face and a single reveal glint beneath its child label. Use the button's
fill, hover fill, pressed fill, and stroke color to match the scene's palette.

`deleteComponent` takes `ids` and mode `subtree` or `retainChildren`. Ancestor and
descendant selections are normalized. The preview lists dependency removals,
including behaviors, event sources, and bindings. The reviewed digest is required
for commit. Shared assets
are retained. Deleting a variable still referenced by text requires an explicit
text edit in the transaction; it cannot leave a dangling interpolation.

Reparenting accepts optional `parentId` and/or destination `sceneId`. It preserves
the full world affine matrix, rejects singular destination transforms and cycles,
and warns about changed inherited clipping, opacity, or lifecycle. Grouping uses
the nearest common parent. Sibling order drives painting and reverse hit-testing.
Duplication remaps subtree objects, behaviors, event sources, and bindings; external
references remain external and are listed in the preview.

Each transaction is one history entry. Save persists the shared working pointer;
it does not approve content. Undo/redo move that pointer. Accepted snapshots remain
immutable; subsequent edits produce new working revisions. Native history lives in
the existing `.tora/editor-state` service, not a rescue-specific save directory.

## Runtime and asset bounds

| Resource | Limit |
|---|---:|
| Authored objects / scenes | 384 / 16 |
| Behavior + binding records | 384 combined |
| Event sources / variables | 256 / 64 |
| Operations / transaction bytes | 256 / 1 MiB |
| Authored document / parsed nodes / nesting | 4 MiB / 100,000 / 64 |
| Spawned root instances / runtime nodes | 128 / 4,096 |
| Particles / colliders / narrow-phase pairs per frame | 256 / 256 / 4,096 |
| Physics bodies / adaptive substeps | 64 / 16 |
| Path nodes / edges / agents per network document | 64 / 128 / 64 |
| Processed events / actions per frame | 256 / 1,024 |
| Raw image/audio upload / optimized delivery asset | 8,000,000 / 700,000 bytes |
| Other individual assets (including Tora meshes) | 700,000 bytes |

The simulation uses a 1/60-second fixed step and at most five catch-up steps per
animation frame. Pause/visibility changes reset accumulated time. Replay resets
runtime variables, instances, contacts, animations, particles, and audio without
rewriting authored data. Instances have runtime IDs and refer back to authored
prototype subtrees. They never enter authoring history.

Behaviors implement axis/both-axis dragging, velocity/gravity, timers and authored
spawn schedules, box/circle colliders, property animation, particle emitters, and
audio. Colliders use the same world transforms and inherited visibility/clipping
as rendering. Circle collision uses a bounded 32-sided approximation after affine
transformation. Execution budgets terminate the offending chain and expose a
runtime diagnostic.

### Physics, paths, economy, and camera primitives

All packs remain additive Creative Project 2.1 JSON; authors never supply functions, property paths, or executable simulation code. Discover the exact descriptors through `/api/creation/capabilities`.

- `physics-body`: `dynamic`, `static`, or `kinematic` circles/boxes with bounded restitution, rolling `friction`, `linearDamping`, `gravity`, speed/rest thresholds, optional `wallBounce`, and optional `spinToRotation`. Dynamic bodies use at most 16 adaptive substeps per fixed tick. Linear `motion` cannot share a component with a physics body.
- `aim-launch`: pullback (`invert:true`) or direct aiming on the body or anywhere, bounded pull/speed ranges, rest gating, 3–16 trajectory dots with up to two predicted bounces, and optional numeric `powerVariableId`. It requires a dynamic `physics-body` on the same component. Release emits `launch`.
- `capture-zone`: speed-gated radial capture with optional rim `pullStrength`, body stopping, and captured-object hiding. `oscillate` provides deterministic sinusoidal kinematic gates on x/y with analytical velocity.
- `path-network`: attached to a group; contains 2–64 unique `{id,x,y,holdSeconds?,cost?}` nodes and 1–128 unique `{id,from,to,speedScale?,enabled?,bidirectional?,cost?}` edges. Routing is deterministic Dijkstra with lexical ID tie-breaking. `path-agent` selects network/start/target, speed and optional numeric speed multiplier, headway `spacing`, rounded corners, orientation, loop mode, and active state. `path-gate` provides open/closed/cycle control, phase offsets, and per-agent holds. Edge/gate edits replan live agents from their next node without teleporting.
- `value-meter`: scales a visual on x/y from a numeric variable between `min < max`, in either direction with deterministic smoothing. `camera-follow` belongs on a root world group and follows a same-scene target within world bounds using bounded smoothing and zoom. Camera-world children may extend beyond the stage without a false stage-overflow finding.

Physics events are `launch`, `bodyBounce`, `bodyRest`, and `zoneCapture`; path events are `pathArrive` and `pathBlocked`. They use `componentId`, optional `otherId`, or optional `nodeId` as described by the generated schema.

New actions are `setVelocity`, `applyImpulse`, `setPosition`, `stopBody`, `setPathEdge`, `setPathTarget`, `setPathGate`, `spawnOnPath`, and `spawnAt`. `compute` applies `add | sub | mul | div | min | max | set` to a numeric variable using either `value` or `operandVariableId`, with optional integer `round`. Results must remain finite and within the runtime variable bound. Conditions accept either a literal `value` or `compareVariableId`, for example `{variableId:'cash',op:'gte',compareVariableId:'upgradeCost'}`.

`spawnOnPath` requires a path-agent prototype and an existing network/start/target. `setPathEdge` takes the network behavior ID and optional non-negative `cost`; `setPathGate` takes the gate behavior ID. Runtime `state()` exposes read-only `physics` body/aim snapshots and `paths` network, route, active-agent, and queued-agent snapshots. Generic editor review supports `opening`, `first-input`, `end-card`, and `timeout` for the new genres while retaining the dedicated Harvest and Salvage replay paths.

Use emitter shape `pixel-confetti` for stepped pieces with varied size, turn, and
timing. Optional `color2` and `color3` add to the base `color`. Use
`origin: "anchor"` for the component's local origin or omit it for the
component's center. Set optional `direction` in degrees to aim the spread (up
is -90 and left is -180). Confetti within a clipping group stays inside
that group. The runtime honors reduced motion by suppressing pixel confetti and
the CTA glint while retaining the static button treatment. Set pixel-confetti
`coverage: "screen"` for a shower distributed across the canvas.

Edit mode does not advance simulation or execute scene-entry actions. Inspection
of another scene cannot unlock audio or invoke the store. Audio requires permitted
interaction; store actions additionally require a current trusted interaction.
Store opening requires a trusted pointer release over the original target.
Store destinations are HTTPS Google Play/App Store URLs.

Network exports bind the exact host adapter: Unity Ads requires MRAID 3.0, AppLovin
requires MRAID 2.0, Meta calls `FbPlayableAd.onCTAClick()`, Google Ads calls
`ExitApi.exit()`, ironSource uses DAPI, Mintegral uses its gameReady/gameStart/install
lifecycle, and TikTok calls `openAppStore()`. Only the declared Google ExitApi and
TikTok SDK script URLs are embedded; all other hosts are injected and no navigation
fallback exists. Simulation starts only after host readiness, visibility, and the
first trusted interaction. Hidden/closed hosts cancel input and suspend or stop audio.
Only a deliberate CTA invokes the vendor store method. Network builds use the pinned
`crates/packer/trusted/native.js` or `native-3d.js` bundle and fail if it is stale.
Google/Mintegral/TikTok produce deterministic ZIPs with fixed timestamps, sorted paths,
CRC32 checks, and exact profile-specific layouts.

Check the exact exported `index.html` before review:

```sh
cargo run -p playable-cli -- artifact check index.html \
  --network unity-ads-ua-playable --confirm-reviewed 2026-11-20 --json
cargo run -p playable-cli -- artifact check index.html \
  --network applovin-growth-playable --confirm-reviewed 2026-11-24 --json
cargo run -p playable-cli -- artifact check my-game-tiktok.zip \
  --network tiktok-ads-playable --confirm-reviewed 2026-11-26 --json
```

Use each profile's current `reviewedAt` date for confirmation. Mintegral requires
`project-id.zip` containing `project-id/project-id.html`; TikTok ZIPs contain root
`index.html` and `config.json`; Google ZIPs contain root `index.html`.

`STATIC_PASS` covers the reviewed rules, fixed shell/runtime, schema, inline assets,
hashes, size, responsive orientation, and destination. It does not establish human
creative approval, physical-device behavior, official network acceptance, or campaign
effectiveness.

PNG/JPEG uploads use a separate bounded Rust optimizer that accepts benign color
metadata and normalizes uploaded pixels without weakening strict artifact inspection.
Auto mode searches exact PNG encodings, selects JPEG for suitable opaque photo-like
images, quantizes when needed, and uses bounded proportional downscaling only to meet
limits. Lossless mode never quantizes or resizes; `none` retains exact bytes only when
they already fit delivery constraints. WAV/MP3 optimization uses local GStreamer or
FFmpeg when available and otherwise falls back to deterministic PCM WAV downsampling.
SVG/HTML uploads are rejected. Decode staging is removed on failure. Untouched original
uploads are content-addressed under `sources/assets/originals/`; delivery bytes and
optimization receipts live under `sources/assets/`. Authored asset records retain the
same six schema fields, rights, and provenance. Preview and export lower the same
verified delivery bytes. Object deletion does
not remove shared source assets. No automatic unreferenced-asset cleanup runs.

## Reproduce and verify

Use new IDs when reproducing; existing projects are never overwritten:

```sh
node scripts/lean/native/author-games.mjs http://127.0.0.1:8001 rescue-copy rescue reports/rescue-copy
node scripts/lean/native/author-games.mjs http://127.0.0.1:8001 tap-copy tap reports/tap-copy
npm run test:native
```

The client reads capabilities, creates an empty project, uploads sourced audio with verified license evidence,
authors all objects and gameplay through transactions, and exports the identified
revision. It writes downloaded HTML/manifests only. It never edits project storage,
injects scripts, or modifies compiled HTML.

Packaged-game evidence in `docs/evidence/native-authoring` covers offline
playback of both exported concepts, win and loss, replay, and trusted CTA activation.
Native tests also cover transaction conflicts, execution budgets and asset rejection. Browser and agent
visual checks do not constitute human creative approval, physical-device testing,
official network acceptance, or advertising-effectiveness evidence.

## Verification dependencies

`npm run verify:native` checks only the native SaaS stack, including the Creative QA
unit gate, trusted runtime parity, native browser tests, and the relevant Rust crates.
Native composition and native browser tests use the native asset decoder and optimizer.

## Legacy compatibility

`POST /api/projects` with `kind:"legacy-template"` explicitly selects the existing
legacy initializer. `/api/projects/compose` retains its merge-grid creative-plan
vocabulary, expected `revision/contentDigest`, and existing request bounds. It does
not compose native mechanics. Existing 2.0 projects are not migrated on open.

Legacy shared artwork definitions are separated from their visual instances for
parenting/deletion and preview restoration. The fixed Ding & Dang runtime, model,
compiler, workspace, bridge, fixtures, tests, obsolete saves, and generated outputs
were removed using the explicit inventory in
`reports/native-production/retirement-inventory.json`. No archive was created.
