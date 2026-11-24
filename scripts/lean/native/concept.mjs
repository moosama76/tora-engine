import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { createRequire } from "node:module";
import { URL } from "node:url";
import { canonical } from "../../../packages/creative-project/src/canonical.ts";
import { parseAuthoringJson } from "../../../packages/creative-project/src/strict-json.ts";
import { isStoreDestination } from "../../../packages/adapters/src/index.ts";
import {ASSET_PROVENANCE_SCHEMA,validateAssetPolicy} from "./asset-policy.mjs";
import {harvestRecipe,harvestRecipeId,harvestRecipeVariants} from "./harvest-recipe.mjs";
import {salvageRecipeId,salvageRecipeVariants} from "./salvage-recipe.mjs";
import {starSalvageModule} from "./modules/star-salvage.mjs";
import {isAudioMime} from "./media-validate.mjs";
const requireModule = createRequire(new URL("../../../packages/creative-project/package.json", import.meta.url));
const { Ajv2020 } = requireModule("ajv/dist/2020.js");
const text = (max = 240) => ({ type: "string", minLength: 1, maxLength: max, pattern: "^[^\\u0000-\\u001f]*$" });
const id = { type: "string", maxLength: 64, pattern: "^[a-z][a-z0-9-]*$" };
const color = { type: "string", pattern: "^#[0-9a-fA-F]{6}$" };
const object = (properties, required = Object.keys(properties)) => ({ type: "object", additionalProperties: false, properties, required });
const phases = ["first-seconds", "agency", "escalation", "payoff", "cta"];
const artwork = object({ id, mime: { enum: ["image/png", "image/jpeg"] }, data: { type: "string", minLength: 4, maxLength: 4000000 }, rights: text(2048), provenance:ASSET_PROVENANCE_SCHEMA },["id","mime","data","rights"]);
const audioAsset = object({ id, mime: { enum: ["audio/wav", "audio/mpeg"] }, data: { type: "string", minLength: 4, maxLength: 4000000 }, rights: text(2048),provenance:ASSET_PROVENANCE_SCHEMA },["id","mime","data","rights"]);
const restoration = object({
  binding: object({ event: { const: "validMatch" }, choice: { const: "repairArea" }, persistent: { const: true } }),
  areas: { type: "array", minItems: 2, maxItems: 3, items: object({ id, label: text(80), before: artwork, after: artwork }) },
  tiles: object({ sun: artwork, leaf: artwork, drop: artwork }),
  audio: object({ ambient: audioAsset, impact: audioAsset, payoff: audioAsset, reject: audioAsset, complete: audioAsset }, ["ambient", "impact", "payoff", "reject"])
}, ["binding", "areas"]);
const licensedAsset = object({
  id,
  mime: {enum:["image/png","image/jpeg","audio/wav","audio/mpeg"]},
  data: {type:"string",minLength:4,maxLength:4000000},
  rights:text(2048),
  provenance:{anyOf:[ASSET_PROVENANCE_SCHEMA,object({
    origin:{const:"studio-original"},
    studio:text(120),
    sourceFile:text(180),
    sourceHash:{type:"string",pattern:"^sha256:[a-f0-9]{64}$"},
    intakeId:text(36),
    styleFamily:text(80)
  })]}
});
const harvest = object({
  assets:{type:"array",minItems:5,maxItems:48,items:licensedAsset},
  tiles:object({carrot:id,corn:id,tomato:id,eggplant:id,pumpkin:id}),
  world:{type:"array",minItems:1,maxItems:64,items:object({
    id,assetId:id,x:{type:"number",minimum:-400,maximum:700},y:{type:"number",minimum:-400,maximum:700},
    width:{type:"number",minimum:1,maximum:700},height:{type:"number",minimum:1,maximum:700},
    unlockAt:{type:"integer",minimum:0,maximum:3},hideAt:{type:"integer",minimum:1,maximum:3}
  },["id","assetId","x","y","width","height","unlockAt"])},
  audio:object({ambient:id,match:id,repair:id,complete:id,loss:id,reject:id},["ambient","match","complete","reject"]),
  seed:{type:"integer",minimum:1,maximum:2147483647},
  rewardRecipe:object({id:{const:harvestRecipeId},variant:{enum:harvestRecipeVariants}}),
  firstHintSeconds:{type:"number",minimum:0.5,maximum:6}
}, ["assets","tiles","world","audio","seed"]);
const salvage = object({
  assets:{type:"array",minItems:4,maxItems:48,items:licensedAsset},
  sprites:object({ship:id,core:id,hazard:id,backdrop:id}),
  coreVariants:{type:"array",minItems:1,maxItems:4,uniqueItems:true,items:id},
  hazardVariants:{type:"array",minItems:1,maxItems:4,uniqueItems:true,items:id},
  bay:{type:"array",minItems:4,maxItems:4,items:object({id,assetId:id,unlockAt:{type:"integer",minimum:0,maximum:3}})},
  audio:object({ambient:id,catch:id,repair:id,complete:id,loss:id,reject:id},["ambient","catch","complete","reject"]),
  seed:{type:"integer",minimum:1,maximum:2147483647},
  rewardRecipe:object({id:{const:salvageRecipeId},variant:{enum:salvageRecipeVariants}}),
  firstHintSeconds:{type:"number",minimum:0.5,maximum:6}
},["assets","sprites","bay","audio","seed"]);
const strategicSources = ["product.gameplayTruth", "product.differentiator", "audience.motivation", "experience.fantasy", "experience.interactionRationale", "hypothesis.statement", "hypothesis.risk", "experience.storeContinuity"];
const requirements = { type: "array", minItems: 8, maxItems: 8, items: object({ source: { enum: strategicSources }, claim: text(400), effect: { enum: ["match-rule", "catch-rule", "world-transformation", "repair-choice", "recovery", "continuity"] } }) };
const CREATIVE_CONCEPT_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Tora creative concept 1",
  ...object({
    format: { enum: ["tora-creative-concept-1", "tora-creative-concept-2"] },
    id,
    product: object({ name: text(80), storeUrl: text(512), gameplayTruth: text(400), differentiator: text(300) }),
    audience: object({ segment: text(200), motivation: text(300) }),
    experience: object({
      fantasy: text(240),
      mechanic: { enum: ["tap-collect", "drag-catch", "match-restore", "harvest-restore", "star-salvage"] },
      interactionRationale: text(400),
      instruction: text(120),
      goal: { type: "integer", minimum: 1, maximum: 12 },
      arc: { type: "array", minItems: 5, maxItems: 5, items: object({ phase: { enum: phases }, seconds: { type: "number", minimum: 1, maximum: 15 }, description: text(240) }) },
      ctaLabel: text(60),
      storeContinuity: text(300)
    }),
    hypothesis: object({ statement: text(400), risk: text(400) }),
    presentation: object({ title: text(60), subtitle: text(120), rewardCopy: text(120), palette: object({ background: color, primary: color, accent: color, text: color }) }),
    restoration,
    harvest,
    salvage,
    requirements
  }, ["format", "id", "product", "audience", "experience", "hypothesis", "presentation"])
};
const valid = new Ajv2020({ strict: true, allErrors: false }).compile(CREATIVE_CONCEPT_SCHEMA);
function check(value, code) {
  if (!value) throw Error(code);
}
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
function validateCreativeConcept(input) {
  let value = input;
  if (typeof input !== "string") {
    let encoded;
    try {
      encoded = JSON.stringify(input);
    } catch {
      throw Error("E_CONCEPT_JSON");
    }
    check(typeof encoded === "string", "E_CONCEPT_JSON");
    check(Buffer.byteLength(encoded, "utf8") <= 4194304, "E_CONCEPT_SIZE");
  }
  if (typeof input === "string") {
    check(Buffer.byteLength(input, "utf8") <= 4194304, "E_CONCEPT_SIZE");
    try {
      value = parseAuthoringJson(input);
    } catch {
      throw Error("E_CONCEPT_JSON");
    }
  }
  if (value?.experience?.mechanic === "match-restore") {
    check(value.restoration && Array.isArray(value.restoration.areas), "E_CONCEPT_RESTORATION_REQUIRED");
    check(value.restoration.areas.length >= 2 && value.restoration.areas.every((area) => area?.before?.data && area?.after?.data), "E_CONCEPT_RESTORATION_ARTWORK");
    check(value.restoration.binding?.event === "validMatch" && value.restoration.binding?.choice === "repairArea" && value.restoration.binding?.persistent === true, "E_CONCEPT_RESTORATION_BINDING");
  }
  check(valid(value), "E_CONCEPT_SCHEMA");
  if(value.experience.mechanic === "harvest-restore")check(value.format === "tora-creative-concept-2" && value.harvest,"E_CONCEPT_HARVEST_REQUIRED");
  if(value.experience.mechanic === "star-salvage")check(value.format === "tora-creative-concept-2" && value.salvage,"E_CONCEPT_SALVAGE_REQUIRED");
  if (value.format === "tora-creative-concept-2") {
    check(["match-restore","harvest-restore","star-salvage"].includes(value.experience.mechanic), "E_CONCEPT_MODULE_REQUIRED");
    const harvesting = value.experience.mechanic === "harvest-restore", salvaging = value.experience.mechanic === "star-salvage", moduleGoal = harvesting || salvaging;
    if(harvesting)check(value.harvest,"E_CONCEPT_HARVEST_REQUIRED");
    else if(salvaging)check(value.salvage,"E_CONCEPT_SALVAGE_REQUIRED");
    else check(value.restoration.tiles, "E_CONCEPT_TILE_ARTWORK");
    const rule = salvaging ? "catch-rule" : "match-rule";
    const effects = [rule, "world-transformation", moduleGoal?"world-transformation":"repair-choice", "world-transformation", rule, "world-transformation", "recovery", "continuity"];
    check(value.requirements?.length === strategicSources.length && strategicSources.every((source, index) => value.requirements.some((requirement) => requirement.source === source && requirement.effect === effects[index])), "E_CONCEPT_REQUIREMENT_COVERAGE");
    check(value.requirements.every((requirement) => requirement.claim === requirement.source.split(".").reduce((record, key) => record[key], value)), "E_CONCEPT_REQUIREMENT_STALE");
    if(moduleGoal)check(value.experience.goal===3,salvaging?"E_CONCEPT_SALVAGE_GOAL":"E_CONCEPT_HARVEST_GOAL");
    else check(value.experience.goal === 2 && value.restoration.areas.length === 2, "E_CONCEPT_REPAIR_GOAL");
  }
  check(isStoreDestination(value.product.storeUrl), "E_CONCEPT_STORE");
  check(value.experience.arc.every((step, index) => step.phase === phases[index]), "E_CONCEPT_ARC");
  const seconds = value.experience.arc.reduce((sum, step) => sum + step.seconds, 0);
  check(seconds >= 15 && seconds <= 30, "E_CONCEPT_DURATION");
  return freeze(globalThis.structuredClone(value));
}
function conceptHash(input) {
  const concept = validateCreativeConcept(input);
  return "sha256:" + createHash("sha256").update("tora-concept/1\n" + canonical(concept)).digest("hex");
}
function builder(concept) {
  const operations = [];
  const add = (recordId, kind, x, y, width, height, parameters = {}, extra = {}) => operations.push({ kind: "createComponent", component: { id: recordId, label: recordId, contract: "native." + kind + ".v1", transform: [1, 0, 0, 1, x, y], parameters: { width, height, ...parameters }, ...extra } });
  const behavior = (recordId, componentId, kind, parameters) => operations.push({ kind: "putBehavior", behavior: { id: recordId, componentId, kind, parameters } });
  const binding = (recordId, event, actions, condition) => operations.push({ kind: "putBinding", binding: { id: recordId, event, actions, ...condition ? { condition } : {} } });
  const palette = concept.presentation.palette;
  operations.push({ kind: "putVariable", variable: { id: "score", label: "Score", type: "number", initial: 0 } });
  operations.push({ kind: "createScene", scene: { id: "scene.success", label: "Success", role: "end-card" } });
  add("background", "rectangle", 0, 0, 390, 700, { fill: palette.background, radius: 0 });
  add("title", "text", 20, 64, 350, 60, { text: concept.presentation.title, fontSize: 30, color: palette.text });
  add("subtitle", "text", 20, 130, 350, 50, { text: concept.presentation.subtitle, fontSize: 16, color: palette.text });
  add("instruction", "text", 20, 180, 350, 50, { text: concept.experience.instruction, fontSize: 16, color: palette.text });
  add("score.label", "text", 45, 590, 300, 50, { text: "{{score}} / " + concept.experience.goal, fontSize: 24, color: palette.accent });
  behavior("feedback.sound", "target", "audio", { loop: false, volume: 0.09, frequency: 760, seconds: 0.16 });
  behavior("feedback.particles", "target", "emitter", { count: 24, color: palette.accent, speed: 140 });
  behavior("feedback.pulse", "target", "animation", { property: "scale", from: 0.9, to: 1, seconds: 0.2, loop: false });
  add("success.background", "rectangle", 0, 0, 390, 700, { fill: palette.background, radius: 0 }, { sceneId: "scene.success" });
  add("success.stars", "path", 132, 92, 126, 36, { fill: palette.accent, stroke: palette.primary, strokeWidth: 2, commands: [["M",20,6],["L",24,15],["L",34,16],["L",27,22],["L",29,32],["L",20,27],["L",11,32],["L",13,22],["L",6,16],["L",16,15],["Z"],["M",63,2],["L",68,12],["L",79,13],["L",71,20],["L",73,31],["L",63,26],["L",53,31],["L",55,20],["L",47,13],["L",58,12],["Z"],["M",106,6],["L",110,15],["L",120,16],["L",113,22],["L",115,32],["L",106,27],["L",97,32],["L",99,22],["L",92,16],["L",102,15],["Z"]] }, { sceneId: "scene.success" });
  add("success.title", "text", 25, 160, 340, 100, { text: concept.presentation.rewardCopy, fontSize: 30, color: palette.text }, { sceneId: "scene.success" });
  add("success.score", "text", 45, 285, 300, 50, { text: "{{score}} / " + concept.experience.goal, fontSize: 24, color: palette.accent }, { sceneId: "scene.success" });
  add("success.cta", "button", 45, 410, 300, 82, { presentation: "shiny-cta", fill: palette.accent, stroke: palette.background, strokeWidth: 3, radius: 16 }, { sceneId: "scene.success" });
  add("success.cta.label", "text", 0, 0, 300, 82, { text: concept.experience.ctaLabel, fontSize: 20, color: palette.background }, { sceneId: "scene.success", parentId: "success.cta" });
  behavior("success.stars.bob", "success.stars", "animation", { property: "y", from: 89, to: 95, seconds: 1.0, loop: true, easing: "ease-in-out" });
  behavior("success.cta.pulse", "success.cta", "animation", { property: "y", from: 407, to: 413, seconds: 0.95, loop: true, easing: "ease-in-out" });
  behavior("success.confetti", "success.background", "emitter", { shape: "confetti", coverage: "screen", count: 56, color: palette.accent, color2: "#4ecdc4", color3: "#ff6b6b", speed: 120, lifetime: 2.6, gravity: 70 });
  binding("success.enter", { kind: "sceneEnter", sceneId: "scene.success" }, [{ kind: "emit", behaviorId: "success.confetti" }, { kind: "animate", behaviorId: "success.stars.bob" }, { kind: "animate", behaviorId: "success.cta.pulse" }]);
  binding("success.store", { kind: "click", componentId: "success.cta" }, [{ kind: "store" }]);
  binding("goal", { kind: "variableChange", variableId: "score" }, [{ kind: "changeScene", sceneId: "scene.success" }], { variableId: "score", op: "gte", value: concept.experience.goal });
  operations.push({ kind: "setStore", url: concept.product.storeUrl });
  return { operations, add, behavior, binding, palette };
}
function tapCollect(concept) {
  const b = builder(concept);
  b.add("target", "button", 115, 285, 160, 160, { fill: b.palette.primary, radius: 80, pressedFill: b.palette.accent });
  b.add("target.label", "text", 0, 0, 160, 160, { text: "+", fontSize: 72, color: b.palette.text }, { parentId: "target" });
  b.binding("target.feedback", { kind: "click", componentId: "target" }, [{ kind: "add", variableId: "score", value: 1 }, { kind: "emit", behaviorId: "feedback.particles" }, { kind: "playAudio", behaviorId: "feedback.sound" }, { kind: "animate", behaviorId: "feedback.pulse" }]);
  return b.operations;
}
function dragCatch(concept) {
  const b = builder(concept);
  b.add("controller", "group", 0, 0, 0, 0);
  b.add("target", "rectangle", 130, 510, 130, 70, { fill: b.palette.primary, radius: 18 });
  b.behavior("target.drag", "target", "drag", { axis: "x" });
  b.behavior("target.collider", "target", "collider", { shape: "box" });
  b.add("falling", "ellipse", 0, 0, 48, 48, { fill: b.palette.accent }, { prototype: true });
  b.behavior("falling.motion", "falling", "motion", { vx: 0, vy: 180, gravity: 20 });
  b.behavior("falling.collider", "falling", "collider", { shape: "circle" });
  b.behavior("spawn.timer", "controller", "timer", { seconds: 0.8, repeat: true });
  b.binding("spawn", { kind: "timer", behaviorId: "spawn.timer" }, [{ kind: "spawn", prototypeId: "falling", x: 40, y: -50 }]);
  b.binding("catch", { kind: "contactBegin", componentId: "falling", otherId: "target" }, [{ kind: "add", variableId: "score", value: 1 }, { kind: "despawn" }, { kind: "emit", behaviorId: "feedback.particles" }, { kind: "playAudio", behaviorId: "feedback.sound" }, { kind: "animate", behaviorId: "feedback.pulse" }]);
  return b.operations;
}
function matchRestore(concept) {
  if(concept.format === "tora-creative-concept-2")check(concept.restoration.audio?.ambient&&concept.restoration.audio?.impact&&concept.restoration.audio?.payoff&&concept.restoration.audio?.reject&&concept.restoration.audio?.complete,"E_CONCEPT_AUDIO_REQUIRED");
  const operations = [], assets = [], assetPolicy = [], palette = concept.presentation.palette;
  const arc = Object.fromEntries(concept.experience.arc.map((step) => [step.phase, step]));
  const add = (recordId, kind, x, y, width, height, parameters = {}, extra = {}) => operations.push({ kind: "createComponent", component: { id: recordId, label: recordId, contract: "native." + kind + ".v1", transform: [1, 0, 0, 1, x, y], parameters: { width, height, ...parameters }, ...extra } });
  const behavior = (recordId, componentId, kind, parameters) => operations.push({ kind: "putBehavior", behavior: { id: recordId, componentId, kind, parameters } });
  const binding = (recordId, event, actions, condition) => operations.push({ kind: "putBinding", binding: { id: recordId, event, actions, ...condition ? { condition } : {} } });
  const variable = (recordId, type, initial) => operations.push({ kind: "putVariable", variable: { id: recordId, label: recordId, type, initial } });
  const set = (variableId, value) => ({ kind: "set", variableId, value });
  const property = (componentId, key, value) => ({ kind: "setComponent", componentId, key, value });
  const is = (variableId, value) => ({ variableId, op: "eq", value });
  const phase = (value) => set("phase", value);
  const asset = (input) => {
    let receipt;
    if(concept.format === "tora-creative-concept-2") {
      const styleFamily=concept.restoration.areas[0].before.provenance?.styleFamily;
      receipt=validateAssetPolicy(input,{role:isAudioMime(input.mime)?'audio':'visual',styleFamily});
      assetPolicy.push({id:input.id,...receipt});
    }
    check(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.data), "E_CONCEPT_RESTORATION_ARTWORK");
    const bytes = Buffer.from(input.data, "base64");
    check(bytes.length > 0 && bytes.length <= 7e5, "E_CONCEPT_RESTORATION_ARTWORK");
    const rights=input.rights+(receipt?.attribution?"\n"+receipt.attribution:"");
    check(rights.length<=2048,"E_CONCEPT_ASSET_RIGHTS");
    const prior = assets.find((existing) => existing.id === input.id);
    if (prior) {
      check(prior.data === input.data && prior.mime === input.mime && prior.rights === rights, "E_CONCEPT_RESTORATION_ARTWORK");
      return;
    }
    assets.push({id:input.id,mime:input.mime,data:input.data,rights});
    operations.push({ kind: "registerAsset", asset: { id: input.id, hash: "sha256:" + createHash("sha256").update(bytes).digest("hex"), mime: input.mime, bytes: bytes.length, rights, provenance: receipt ? JSON.stringify(receipt) : "Concept artwork; decoded media verified by the native composition entry point." } });
  };
  const areaCount = concept.restoration.areas.length;
  const areaWidth = (366 - (areaCount - 1) * 12) / areaCount;
  check(new Set(concept.restoration.areas.map((area) => area.id)).size === areaCount, "E_CONCEPT_RESTORATION_ARTWORK");
  for (const area of concept.restoration.areas) {
    check(area.before.data !== area.after.data, "E_CONCEPT_RESTORATION_ARTWORK");
    asset(area.before);
    asset(area.after);
    variable("repaired." + area.id, "boolean", false);
  }
  for (const art of [...Object.values(concept.restoration.tiles ?? {}), ...Object.values(concept.restoration.audio ?? {})]) asset(art);
  variable("phase", "string", "first-seconds");
  variable("repairs", "number", 0);
  variable("message", "string", concept.experience.instruction);
  add("background", "rectangle", 0, 0, 700, 700, { fill: palette.background });
  const responsiveLayouts = {
    "world.layout": { x: 0, y: -15, scaleX: 1, scaleY: 1 },
    "puzzle.layout": { x: 350, y: -330, scaleX: 1, scaleY: 1 },
    "instruction.layout": { x: 344, y: -345, scaleX: .8, scaleY: 1 },
    "cta.layout": { x: 385, y: -260, scaleX: .8, scaleY: .9 }
  };
  for (const [componentId, parameters] of Object.entries(responsiveLayouts)) {
    add(componentId, "group", 0, 0, 0, 0);
    behavior(componentId + ".landscape", componentId, "responsive-layout", parameters);
  }
  add("title", "text", 56, 20, 278, 45, { text: concept.presentation.title, fontSize: 29, color: palette.text });
  add("subtitle", "text", 15, 65, 360, 35, { text: concept.presentation.subtitle, fontSize: 16, color: palette.accent });
  for (const [index, area] of concept.restoration.areas.entries()) {
    add("world." + area.id, "image", 12 + index * (areaWidth + 12), 110, areaWidth, 245, { fit: "cover" }, { parentId: "world.layout", order: 0, assetSlots: [{ slotId: "source", assetId: area.before.id }] });
    add("world.label.background." + area.id, "rectangle", 12 + index * (areaWidth + 12), 327, areaWidth, 28, { fill: "#123a32dd" }, { parentId: "world.layout", order: 1 });
    add("world.label." + area.id, "text", 12 + index * (areaWidth + 12), 327, areaWidth, 35, { text: area.label, fontSize: 17, color: palette.text }, { parentId: "world.layout", order: 2 });
  }
  add("instruction", "text", 15, 365, 360, 44, { text: "{{message}}", fontSize: 17, color: palette.text }, { parentId: "instruction.layout" });
  const boardIds = ["board.controller", "board.escalation"];
  const fills = { sun: "#f6c453", leaf: "#5ba879", drop: "#62a8d8" };
  const symbols = { sun: "\u25CF", leaf: "\u25B2", drop: "\u25A0" };
  const cells = [["sun", "leaf", "sun"], ["leaf", "sun", "drop"], ["drop", "drop", "leaf"]];
  for (const [stage, boardId] of boardIds.entries()) {
    add(boardId, "group", 0, 0, 0, 0, { visible: stage === 0 }, { parentId: "puzzle.layout" });
    for (let row = 0; row < 3; row++) for (let column = 0; column < 3; column++) {
      const recordId = stage === 0 ? `tile.${row}.${column}` : `tile.second.${row}.${column}`;
      const group = stage === 0 ? cells[row][column] : cells[2 - row][2 - column];
      add(recordId, "button", 70 + column * 86, 420 + row * 86, 78, 78, { fill: fills[group], radius: 16, stroke: palette.text, strokeWidth: 1 }, { parentId: boardId });
      const art = concept.restoration.tiles?.[group];
      if (art) add(recordId + ".art", "image", 5, 5, 68, 68, { fit: "contain" }, { parentId: recordId, assetSlots: [{ slotId: "source", assetId: art.id }] });
      else add(recordId + ".symbol", "text", 0, 0, 78, 78, { text: symbols[group], fontSize: 38, color: palette.background }, { parentId: recordId });
      behavior(recordId + ".match", recordId, "match-tile", { row, column, group });
    }
  }
  add("match.lock", "rectangle", 60, 410, 270, 270, { fill: "#ffffff00", visible: false }, { parentId: "puzzle.layout" });
  const hintIds = ["tile.0.1", "tile.1.1", "tile.second.1.1", "tile.second.2.1"];
  for (const recordId of hintIds) behavior("hint." + recordId, recordId, "animation", { property: "opacity", from: 0.45, to: 1, seconds: 0.65, loop: true, easing: "ease-in-out" });
  const stopHints = hintIds.map((recordId) => ({ kind: "stopAnimation", behaviorId: "hint." + recordId }));
  const hideBoards = boardIds.map((recordId) => property(recordId, "visible", false));
  add("director", "group", 0, 0, 0, 0);
  const audioTarget = (kind) => {
    const art = concept.restoration.audio?.[kind];
    if (!art) return "director";
    const recordId = "sound." + kind;
    add(recordId, "group", 0, 0, 0, 0, {}, { assetSlots: [{ slotId: "source", assetId: art.id }] });
    return recordId;
  };
  behavior("feedback.contact", audioTarget("impact"), "audio", { loop: false, volume: 0.2, frequency: 520, seconds: 0.12, bus: "sfx", role: "match" });
  behavior("feedback.reward", audioTarget("payoff"), "audio", { loop: false, volume: 0.28, frequency: 880, seconds: 0.4, bus: "sfx", role: "reward" });
  behavior("feedback.reject", audioTarget("reject"), "audio", { loop: false, volume: 0.12, frequency: 220, seconds: 0.09, bus: "sfx", role: "reject" });
  if (concept.restoration.audio) {
    behavior("feedback.music", audioTarget("ambient"), "audio", { loop: true, volume: 0.12, frequency: 330, seconds: 2, bus: "music", role: "ambient" });
    binding("feedback.music.start", { kind: "click", componentId: "board.controller" }, [{ kind: "playAudio", behaviorId: "feedback.music" }]);
  }
  behavior("feedback.complete", audioTarget("complete"), "audio", { loop: false, volume: 0.35, frequency: 1040, seconds: 0.65, bus: "sfx", role: "win" });
  behavior("feedback.celebration", "director", "emitter", { shape: "confetti", coverage: "screen", count: 48, color: palette.accent, color2: "#4ecdc4", color3: "#fff3b0", speed: 120, lifetime: 1.05, gravity: 85 });
  for (const [index, area] of concept.restoration.areas.entries()) {
    behavior("feedback.sparkles." + area.id, "world." + area.id, "emitter", { shape: "confetti", coverage: "local", count: 16, color: palette.accent, color2: "#4ecdc4", color3: "#fff3b0", speed: 100, lifetime: 0.85, gravity: 70 });
    behavior("celebrate." + area.id, "world." + area.id, "animation", { property: "scale", from: 0.96, to: 1, seconds: 0.7, loop: false, easing: "back-out" });
    behavior("reveal." + area.id, "world." + area.id, "animation", { property: "opacity", from: 0.25, to: 1, seconds: 0.8, loop: false, easing: "ease-out" });
    const choice = "repair." + area.id;
    add(choice, "button", 12 + index * (areaWidth + 12), 455, areaWidth, 95, { visible: false, fill: palette.primary, radius: 18, pressedFill: palette.accent }, { parentId: "cta.layout" });
    add(choice + ".label", "text", 8, 8, areaWidth - 16, 79, { text: "Restore " + area.label, fontSize: 19, color: palette.text }, { parentId: choice });
    binding(choice + ".select", { kind: "click", componentId: choice }, [
      set("repaired." + area.id, true),
      { kind: "setAsset", componentId: "world." + area.id, assetId: area.after.id },
      { kind: "animate", behaviorId: "reveal." + area.id },
      { kind: "playAudio", behaviorId: "feedback.reward" },
      { kind: "emit", behaviorId: "feedback.sparkles." + area.id },
      ...concept.restoration.areas.map((candidate) => property("repair." + candidate.id, "visible", false)),
      { kind: "add", variableId: "repairs", value: 1 }
    ], { all: [is("phase", "repair"), is("repaired." + area.id, false)] });
    binding(choice + ".offer", { kind: "variableChange", variableId: "phase" }, [property(choice, "visible", true)], { all: [is("phase", "repair"), is("repaired." + area.id, false)] });
  }
  const hideChoices = concept.restoration.areas.map((area) => property("repair." + area.id, "visible", false));
  variable("contact.elapsed", "number", 0);
  for (const [index, boardId] of boardIds.entries()) {
    binding(index === 0 ? "board.matched" : "board.second.matched", { kind: "validMatch", componentId: boardId }, [
      phase("contact"),
      set("contact.elapsed", 0),
      set("message", "A match! Choose what grows next"),
      property("match.lock", "visible", true),
      ...stopHints,
      { kind: "playAudio", behaviorId: "feedback.contact" }
    ], { any: [is("phase", "first-seconds"), is("phase", "agency"), is("phase", "escalation")] });
    binding(index === 0 ? "board.rejected" : "board.second.rejected", { kind: "invalidMatch", componentId: boardId }, [
      set("message", "Try another swap \u2014 line up three matching tiles"),
      { kind: "playAudio", behaviorId: "feedback.reject" }
    ]);
  }
  binding("contact.tick", { kind: "timer", behaviorId: "director.payoff" }, [{ kind: "add", variableId: "contact.elapsed", value: 0.1 }], is("phase", "contact"));
  binding("contact.finish", { kind: "variableChange", variableId: "contact.elapsed" }, [
    phase("repair"),
    set("message", arc.escalation.description),
    ...hideBoards,
    property("match.lock", "visible", false)
  ], { all: [is("phase", "contact"), { variableId: "contact.elapsed", op: "gte", value: 0.35 }] });
  binding("progress.first", { kind: "variableChange", variableId: "repairs" }, [
    phase("escalation"),
    set("message", "One more repair \u2014 match three again"),
    property("board.controller", "visible", false),
    { kind: "resetMatch", componentId: "board.escalation" },
    property("board.escalation", "visible", true),
    { kind: "animate", behaviorId: "hint.tile.second.1.1" },
    { kind: "animate", behaviorId: "hint.tile.second.2.1" }
  ], { all: [
    { variableId: "repairs", op: "gte", value: 1 },
    { variableId: "repairs", op: "lt", value: areaCount }
  ] });
  binding("progress.complete", { kind: "variableChange", variableId: "repairs" }, [
    phase("payoff"),
    set("message", concept.presentation.rewardCopy),
    property("continue", "visible", true),
    { kind: "playAudio", behaviorId: "feedback.complete" },
    { kind: "emit", behaviorId: "feedback.celebration" },
    ...concept.restoration.areas.map((area) => ({ kind: "animate", behaviorId: "celebrate." + area.id }))
  ], is("repairs", areaCount));
  add("continue", "button", 90, 540, 210, 52, { visible: false, fill: palette.primary, radius: 14 }, { parentId: "cta.layout" });
  add("continue.label", "text", 0, 0, 210, 52, { text: "Continue", fontSize: 18, color: palette.text }, { parentId: "continue" });
  binding("continue.action", { kind: "click", componentId: "continue" }, [phase("cta")], is("phase", "payoff"));
  add("cta", "button", 35, 505, 320, 68, { visible: false, presentation: "shiny-cta", fill: palette.accent, stroke: palette.background, strokeWidth: 3, radius: 18 }, { parentId: "cta.layout" });
  add("cta.label", "text", 0, 0, 320, 68, { text: concept.experience.ctaLabel, fontSize: 19, color: palette.background }, { parentId: "cta" });
  behavior("cta.pulse", "cta", "animation", { property: "y", from: 502, to: 508, seconds: 0.95, loop: true, easing: "ease-in-out" });
  binding("cta.store", { kind: "click", componentId: "cta" }, [{ kind: "store" }], is("phase", "cta"));
  binding("cta.enter", { kind: "variableChange", variableId: "phase" }, [
    ...hideBoards,
    ...stopHints,
    property("match.lock", "visible", false),
    ...hideChoices,
    property("continue", "visible", false),
    property("cta", "visible", true),
    { kind: "animate", behaviorId: "cta.pulse" },
    set("message", arc.cta.description)
  ], is("phase", "cta"));
  behavior("director.opening", "director", "timer", { seconds: arc["first-seconds"].seconds, repeat: false });
  binding("director.agency", { kind: "timer", behaviorId: "director.opening" }, [phase("agency"), set("message", concept.experience.instruction)], is("phase", "first-seconds"));
  behavior("director.hint", "director", "timer", { seconds: arc["first-seconds"].seconds + arc.agency.seconds, repeat: false });
  binding("director.hint.show", { kind: "timer", behaviorId: "director.hint" }, [set("message", "Try the top middle tile and the tile below it"), { kind: "animate", behaviorId: "hint.tile.0.1" }, { kind: "animate", behaviorId: "hint.tile.1.1" }], { any: [is("phase", "first-seconds"), is("phase", "agency")] });
  const deadline = arc["first-seconds"].seconds + arc.agency.seconds + arc.escalation.seconds;
  behavior("director.deadline", "director", "timer", { seconds: deadline, repeat: false });
  binding("director.deadline.cta", { kind: "timer", behaviorId: "director.deadline" }, [phase("cta")], { variableId: "phase", op: "ne", value: "payoff" });
  // Measure payoff exposure independently of the time taken to solve the puzzles.
  variable("payoff.elapsed", "number", 0);
  behavior("director.payoff", "director", "timer", { seconds: 0.1, repeat: true });
  binding("director.payoff.tick", { kind: "timer", behaviorId: "director.payoff" }, [{ kind: "add", variableId: "payoff.elapsed", value: 0.1 }], is("phase", "payoff"));
  binding("director.payoff.finish", { kind: "variableChange", variableId: "payoff.elapsed" }, [phase("cta")], { all: [is("phase", "payoff"), { variableId: "payoff.elapsed", op: "gte", value: arc.payoff.seconds }] });
  operations.push({ kind: "setStore", url: concept.product.storeUrl });
  const effects = {
    "match-rule": ["board.controller", "board.matched"],
    "world-transformation": concept.restoration.areas.map((area) => "world." + area.id),
    "repair-choice": concept.restoration.areas.map((area) => "repair." + area.id),
    recovery: ["board.rejected", "director.hint.show"],
    continuity: ["cta", "cta.store"]
  };
  return { operations, assets, assetPolicy, requirements: (concept.requirements ?? []).map((requirement) => ({ ...requirement, records: effects[requirement.effect] })) };
}
function harvestRestore(concept, studioAssets) {
  const operations = [];
  const assets = [];
  const assetPolicy = [];
  const plan = concept.harvest;
  const {treatment,receipt:recipe} = harvestRecipe(plan);
  const palette = concept.presentation.palette;
  const arc = Object.fromEntries(concept.experience.arc.map(step => [step.phase, step]));
  const add = (id, kind, x, y, width, height, parameters = {}, extra = {}) => {
    operations.push({kind: 'createComponent', component: {
      id, label: id, order: operations.length, contract: 'native.' + kind + '.v1',
      transform: [1, 0, 0, 1, x, y], parameters: {width, height, ...parameters}, ...extra,
    }});
  };
  const behavior = (id, componentId, kind, parameters) => operations.push({kind: 'putBehavior', behavior: {id, componentId, kind, parameters}});
  const bind = (id, event, actions, condition) => operations.push({kind: 'putBinding', binding: {id, event, actions, ...(condition ? {condition} : {})}});
  const property = (componentId, key, value) => ({kind: 'setComponent', componentId, key, value});
  const set = (variableId, value) => ({kind: 'set', variableId, value});
  const is = (variableId, value) => ({variableId, op: 'eq', value});
  const variable = (id, type, initial) => operations.push({kind: 'putVariable', variable: {id, label: id, type, initial}});
  const assetById = new Map(plan.assets.map(asset => [asset.id, asset]));
  check(assetById.size === plan.assets.length, 'E_CONCEPT_ASSET_DUPLICATE');
  const styleFamily = plan.assets.find(asset => asset.mime.startsWith('image/'))?.provenance.styleFamily;
  for (const source of plan.assets) {
    let receipt;
    if (source.provenance.origin === 'studio-original') {
      const original = studioAssets?.get(source.id);
      check(original && canonical(original) === canonical(source), 'E_ASSET_POLICY_STUDIO_SOURCE');
      check(source.provenance.styleFamily === styleFamily || isAudioMime(source.mime), 'E_ASSET_POLICY_STYLE');
      receipt = source.provenance;
    } else {
      receipt = validateAssetPolicy(source, {role: isAudioMime(source.mime) ? 'audio' : 'visual', styleFamily});
    }
    assetPolicy.push({id: source.id, ...receipt});
    const bytes = Buffer.from(source.data, 'base64');
    check(bytes.length <= 700000, 'E_CONCEPT_ASSET_SIZE');
    const rights = source.rights + (receipt.attribution ? '\n' + receipt.attribution : '');
    check(rights.length <= 2048, 'E_CONCEPT_ASSET_RIGHTS');
    assets.push({id: source.id, mime: source.mime, data: source.data, rights});
    operations.push({kind: 'registerAsset', asset: {
      id: source.id, hash: 'sha256:' + createHash('sha256').update(bytes).digest('hex'),
      mime: source.mime, bytes: bytes.length, rights, provenance: JSON.stringify(receipt),
    }});
  }
  const imageReference = assetId => check(assetById.get(assetId)?.mime.startsWith('image/'), 'E_CONCEPT_VISUAL_REFERENCE');
  Object.values(plan.tiles).forEach(imageReference);
  check(new Set(Object.values(plan.tiles)).size === 5, 'E_CONCEPT_TILE_PALETTE');
  Object.values(plan.audio).forEach(assetId => check(isAudioMime(assetById.get(assetId)?.mime), 'E_CONCEPT_AUDIO_REFERENCE'));
  check(new Set(plan.world.map(object => object.id)).size === plan.world.length, 'E_CONCEPT_WORLD_ID');
  for (const object of plan.world) {
    imageReference(object.assetId);
    check(object.hideAt === undefined || object.hideAt > object.unlockAt, 'E_CONCEPT_WORLD_STATE');
  }
  const worldObjects=plan.world.map(object=>{
   const left=Math.max(0,object.x),top=Math.max(0,object.y),right=Math.min(390,object.x+object.width),bottom=Math.min(332,object.y+object.height);
   check(right>left&&bottom>top,'E_CONCEPT_WORLD_STATE');
   return {...object,x:left,y:top,width:right-left,height:bottom-top};
  });
  for (const stage of [0, 1, 2, 3]) check(plan.world.some(object => object.unlockAt === stage), 'E_CONCEPT_WORLD_TRANSFORMATION');
  variable('harvest.moves', 'number', 0);
  variable('harvest.phase', 'string', 'first-seconds');
  variable('harvest.message', 'string', concept.experience.instruction);
  variable('harvest.payoff', 'number', 0);
  variable('harvest.idle', 'number', 0);
  add('harvest.background', 'rectangle', 0, 0, 700, 700, {fill: palette.background});
  const layouts = {
    'harvest.puzzle.layout': {x: 341.25, y: -270, scaleX: .95, scaleY: .95},
    'harvest.world.layout': {x: 0, y: 0, scaleX: .92, scaleY: .92},
    'harvest.instruction.layout': {x: 341.25, y: -270, scaleX: .95, scaleY: .95},
    'harvest.cta.layout': {x: 341.25, y: -270, scaleX: .95, scaleY: .95},
  };
  for (const [id, alternate] of Object.entries(layouts)) {
    add(id, 'group', 0, 0, 0, 0);
    behavior(id + '.responsive', id, 'responsive-layout', alternate);
  }
  const pixelText={fontFamily:'pixel',fontWeight:'700',pixelPanel:true,panelFill:palette.primary,panelStroke:palette.accent,color:palette.accent};
  add('harvest.brand', 'text', 60, 4, 178, 32, {text: concept.presentation.title, fontSize: 24, align: 'center', wrap:false, ...pixelText});
  add('harvest.progress', 'text', 248, 4, 82, 32, {text: '{{harvest.moves}} / 3', fontSize: 20, align: 'center', wrap:false, ...pixelText});
  add('harvest.world.frame','group',0,0,390,332,{clip:true},{parentId:'harvest.world.layout'});
  const worldBounds = new Map();
  for (let stage = 0; stage <= 3; stage++) {
    const objects = worldObjects.filter(object => object.unlockAt === stage);
    const left = Math.min(...objects.map(object => object.x));
    const top = Math.min(...objects.map(object => object.y));
    const right = Math.max(...objects.map(object => object.x + object.width));
    const bottom = Math.max(...objects.map(object => object.y + object.height));
    const bounds = {x:(left+right)/2,y:(top+bottom)/2,width:right-left,height:bottom-top};
    worldBounds.set(stage,bounds);
    const id = 'harvest.world.stage.' + stage;
    add(id, 'group', bounds.x, 40+bounds.y, bounds.width, bounds.height, {visible: stage === 0}, {parentId: 'harvest.world.frame'});
    if (stage) behavior(id + '.reveal', id, 'animation', {property: 'scale', from: stage===3?treatment.revealFrom:.2, to: 1,
      seconds: stage===3?treatment.revealSeconds:.5, loop: false, easing: stage===3?treatment.easing:'back-out'});
  }
  for (const object of worldObjects) {
    const bounds = worldBounds.get(object.unlockAt);
    add('harvest.world.' + object.id, 'image', object.x-bounds.x, object.y-bounds.y, object.width, object.height, {fit: 'contain', smoothing: false}, {
      parentId: 'harvest.world.stage.' + object.unlockAt,
      assetSlots: [{slotId: 'source', assetId: object.assetId}],
    });
  }
  add('harvest.instruction', 'text', 77, 303, 236, 28, {text: '{{harvest.message}}', fontSize: 18, minFontSize: 8, wrap:false, ...pixelText}, {parentId: 'harvest.instruction.layout'});
  add('harvest.board.shell', 'rectangle', 25, 335, 340, 334, {fill: palette.primary, radius: 0, stroke: palette.accent, strokeWidth: 3, pixelFrame: true}, {parentId: 'harvest.puzzle.layout'});
  add('harvest.board', 'group', 35, 345, 320, 320, {clip:true}, {parentId: 'harvest.puzzle.layout'});
  const groups = ['carrot', 'corn', 'tomato', 'eggplant', 'pumpkin'];
  const initial = [[0,1,0,3,4],[2,0,2,4,1],[1,2,3,0,4],[4,3,1,2,0],[3,4,2,1,3]];
  for (let row = 0; row < 5; row++) for (let column = 0; column < 5; column++) {
    const group = groups[initial[row][column]];
    const id = 'harvest.tile.' + row + '.' + column;
    add(id, 'button', column * 64+2, row * 64+2, 58, 58, {
      fill: '#d6b27c', pressedFill: '#ffe6ab', hoverFill: '#e8ca96', radius: 0,
      stroke: '#6b4a3c', strokeWidth: 2,
    }, {parentId: 'harvest.board'});
    add(id + '.crop', 'image', 8, 8, 42, 42, {fit: 'contain', smoothing: false}, {
      parentId: id, assetSlots: [{slotId: 'source', assetId: plan.tiles[group]}],
    });
    behavior(id + '.cell', id, 'match-tile', {row, column, group});
  }
  behavior('harvest.rules', 'harvest.board', 'match-board', {rows: 5, columns: 5, seed: plan.seed});
  add('harvest.board.lock', 'rectangle', 25, 335, 340, 334, {fill: palette.primary, visible: false, radius: 0, stroke: palette.accent, strokeWidth: 3, pixelFrame: true}, {parentId: 'harvest.puzzle.layout'});
  add('harvest.reward.stars', 'path', 132, 356, 126, 34, {
    visible: false, fill: '#ffd05a', stroke: palette.primary, strokeWidth: 2,
    commands: [['M',20,6],['L',24,14],['L',33,15],['L',26,21],['L',28,30],['L',20,25],['L',12,30],['L',14,21],['L',7,15],['L',16,14],['Z'],['M',63,2],['L',68,12],['L',79,13],['L',71,20],['L',73,31],['L',63,25],['L',53,31],['L',55,20],['L',47,13],['L',58,12],['Z'],['M',106,6],['L',110,14],['L',119,15],['L',112,21],['L',114,30],['L',106,25],['L',98,30],['L',100,21],['L',93,15],['L',102,14],['Z']],
  }, {parentId: 'harvest.puzzle.layout'});
  add('harvest.reward.title', 'text', 45, 400, 300, 52, {text: 'FARM RESTORED!', fontFamily: 'pixel', fontSize: 26, color: palette.accent, visible: false}, {parentId: 'harvest.puzzle.layout'});
  add('harvest.reward.detail', 'text', 45, 460, 300, 32, {text: 'WELL DONE!', fontFamily: 'pixel', fontSize: 18, color: palette.accent, visible: false}, {parentId: 'harvest.puzzle.layout'});
  add('harvest.flight', 'image', 170, 480, 44, 44, {visible: false, fit: 'contain', smoothing: false}, {
    parentId: 'harvest.world.layout', assetSlots: [{slotId: 'source', assetId: plan.tiles.carrot}],
  });
  for(const stage of [1,2,3]) {
    const bounds=worldBounds.get(stage);
    behavior('harvest.flight.x.'+stage, 'harvest.flight', 'animation', {property:'x',from:170,to:bounds.x-22,fromCurrent:true,seconds:.7,loop:false,easing:'ease-in-out'});
    behavior('harvest.flight.y.'+stage, 'harvest.flight', 'animation', {property:'y',from:480,to:40+bounds.y-22,fromCurrent:true,seconds:.7,loop:false,easing:'ease-out'});
  }
  behavior('harvest.flight.fade', 'harvest.flight', 'animation', {property: 'opacity', from: 1, to: 0, delay: .5, seconds: .25, loop: false, easing: 'ease-out'});
  behavior('harvest.celebration', 'harvest.world.stage.3', 'emitter', {
    shape: 'pixel-confetti', coverage: 'screen',
    count: treatment.particles * 2,
    color: '#ffd05a', color2: '#34714a', color3: '#ffe6ab',
    speed: treatment.speed, lifetime: treatment.lifetime + .18, gravity: 110,
  });
  for (const [cue, assetId] of Object.entries(plan.audio)) {
    const target = 'harvest.audio.' + cue;
    add(target, 'group', 0, 0, 0, 0, {}, {assetSlots: [{slotId: 'source', assetId}]});
    const volume={ambient:.09,match:.24,repair:.32,complete:treatment.gain,loss:.32,reject:.13}[cue];
    behavior(target + '.play', target, 'audio', {loop: cue === 'ambient', volume, frequency: 660, seconds: .2, bus: cue === 'ambient' ? 'music' : ['complete','loss'].includes(cue)?'stinger':'sfx', ...(cue === 'match' ? {pitchVariableId: 'harvest.moves', pitchStep: 1.5} : {})});
  }
  const sound = cue => ({kind: 'playAudio', behaviorId: 'harvest.audio.' + cue + '.play'});
  bind('harvest.music.start', {kind: 'click', componentId: 'harvest.board'}, [sound('ambient'),set('harvest.idle',0),set('harvest.message',concept.experience.instruction)]);
  bind('harvest.clear', {kind: 'matchClear', componentId: 'harvest.board'}, [
    set('harvest.idle',0),property('harvest.instruction','visible',false),sound('match'), {kind: 'copyMatchAsset', componentId: 'harvest.flight', boardId: 'harvest.board'},
    property('harvest.flight', 'visible', true), property('harvest.flight', 'opacity', 1),
    {kind: 'animate', behaviorId: 'harvest.flight.fade'},
  ],{all:[{variableId:'harvest.phase',op:'ne',value:'cta'},{variableId:'harvest.phase',op:'ne',value:'payoff'}]});
  for(const stage of [1,2,3]) bind('harvest.flight.destination.'+stage,{kind:'matchClear',componentId:'harvest.board'},[
    {kind:'animate',behaviorId:'harvest.flight.x.'+stage},{kind:'animate',behaviorId:'harvest.flight.y.'+stage},
  ],{all:[is('harvest.moves',stage-1),{variableId:'harvest.phase',op:'ne',value:'cta'},{variableId:'harvest.phase',op:'ne',value:'payoff'}]});
  bind('harvest.matched', {kind: 'validMatch', componentId: 'harvest.board'}, [{kind: 'add', variableId: 'harvest.moves', value: 1}], {all:[{variableId:'harvest.moves',op:'lt',value:3},{variableId:'harvest.phase',op:'ne',value:'cta'},{variableId:'harvest.phase',op:'ne',value:'payoff'}]});
  bind('harvest.reject', {kind: 'invalidMatch', componentId: 'harvest.board'}, [set('harvest.message', 'Try another swap'), property('harvest.instruction', 'visible', true), sound('reject')],{variableId:'harvest.phase',op:'ne',value:'cta'});
  const milestones = ['Orchard growing!', 'Crops blooming!', concept.presentation.rewardCopy];
  for (const stage of [1, 2, 3]) {
    const worldId = 'harvest.world.stage.' + stage;
    bind('harvest.restore.' + stage, {kind: 'variableChange', variableId: 'harvest.moves'}, [
      property(worldId, 'visible', true), {kind: 'animate', behaviorId: worldId + '.reveal'},
      ...plan.world.filter(object => object.hideAt === stage).map(object => property('harvest.world.' + object.id, 'visible', false)),
      set('harvest.message', milestones[stage - 1]), set('harvest.phase', stage === 3 ? 'payoff' : stage === 1 ? 'agency' : 'escalation'),
      sound(stage === 3 ? 'complete' : plan.audio.repair ? 'repair' : 'match'),
      {kind: 'floatingText', text: stage === 3 ? 'RESTORED!' : '+1', componentId: worldId, color: '#fff0bd', fontSize: 20, risePx: 36, seconds: .75},
      ...(stage === 3 ? [
        {kind: 'cameraShake', intensity: 6, seconds: .22}, {kind: 'screenFlash', color: '#fff0bd', opacity: .2, seconds: .22},
        property('harvest.instruction', 'visible', false), property('harvest.board.lock', 'visible', true),
        property('harvest.reward.stars', 'visible', true), property('harvest.reward.title', 'visible', true),
        property('harvest.reward.detail', 'visible', true), {kind: 'emit', behaviorId: 'harvest.celebration'},
      ] : [{kind: 'cameraShake', intensity: 3, seconds: .12}]),
    ], is('harvest.moves', stage));
  }
  add('harvest.cta', 'button', 45, 528, 300, 70, {
    visible: false, presentation: 'pixel-cta', fill: '#f1bb46', pressedFill: '#cf892f',
    hoverFill: '#ffd069', radius: 0, stroke: palette.primary, strokeWidth: 3, pixelFrame: true,
  }, {parentId: 'harvest.cta.layout'});
  add('harvest.cta.label', 'text', 0, 0, 300, 70, {text: concept.experience.ctaLabel, fontFamily: 'pixel', fontSize: 22, color: palette.primary}, {parentId: 'harvest.cta'});
  behavior('harvest.cta.pulse', 'harvest.cta', 'animation', {property: 'y', from: 525, to: 531, seconds: 1.9, loop: true, easing: 'ease-in-out'});
  bind('harvest.cta.click', {kind: 'click', componentId: 'harvest.cta'}, [{kind: 'store'}], is('harvest.phase', 'cta'));
  bind('harvest.cta.show', {kind: 'variableChange', variableId: 'harvest.phase'}, [
    property('harvest.instruction', 'visible', false), property('harvest.board.lock','visible',true),
    property('harvest.cta', 'visible', true), {kind: 'animate', behaviorId: 'harvest.cta.pulse'},
  ], is('harvest.phase', 'cta'));
  behavior('harvest.clock', 'harvest.background', 'timer', {seconds: .1, repeat: true});
  bind('harvest.payoff.tick', {kind: 'timer', behaviorId: 'harvest.clock'}, [{kind: 'add', variableId: 'harvest.payoff', value: .1}], is('harvest.phase', 'payoff'));
  bind('harvest.payoff.finish', {kind: 'variableChange', variableId: 'harvest.payoff'}, [
    set('harvest.message', arc.cta.description), set('harvest.phase', 'cta'),
  ], {all: [is('harvest.phase', 'payoff'), {variableId: 'harvest.payoff', op: 'gte', value: arc.payoff.seconds + .1}]});
  bind('harvest.idle.tick', {kind: 'timer', behaviorId: 'harvest.clock'}, [{kind:'add',variableId:'harvest.idle',value:.1}], {any:[is('harvest.phase','first-seconds'),is('harvest.phase','agency'),is('harvest.phase','escalation')]});
  const normalHint={variableId:'harvest.idle',op:'gte',value:arc['first-seconds'].seconds};
  const hintCondition=plan.firstHintSeconds===undefined?normalHint:{any:[
    {all:[is('harvest.moves',0),{...normalHint,value:plan.firstHintSeconds}]},
    {all:[{variableId:'harvest.moves',op:'gt',value:0},normalHint]},
  ]};
  bind('harvest.hint.show', {kind:'variableChange',variableId:'harvest.idle'}, [{kind:'hintMatch',componentId:'harvest.board'},set('harvest.idle',0)], hintCondition);
  behavior('harvest.deadline', 'harvest.background', 'timer', {seconds: arc['first-seconds'].seconds + arc.agency.seconds + arc.escalation.seconds, repeat: false});
  bind('harvest.deadline.cta', {kind: 'timer', behaviorId: 'harvest.deadline'}, [
    set('harvest.message', 'Try again'), property('harvest.instruction', 'visible', false), set('harvest.phase', 'cta'),
    property('harvest.reward.title', 'text', 'TIME IS UP!'), property('harvest.reward.title', 'visible', true),
    property('harvest.reward.detail', 'text', 'MATCH 3 CROPS'), property('harvest.reward.detail', 'visible', true),
    ...(plan.audio.loss?[sound('loss')]:[]),
  ], {all: [{variableId: 'harvest.phase', op: 'ne', value: 'payoff'}, {variableId: 'harvest.phase', op: 'ne', value: 'cta'}]});
  operations.push({kind: 'setStore', url: concept.product.storeUrl});
  check(operations.length <= 256, 'E_CONCEPT_OPERATION_LIMIT');
  const effects = {
    'match-rule': ['harvest.board', 'harvest.rules', 'harvest.matched'],
    'world-transformation': ['harvest.restore.1', 'harvest.restore.2', 'harvest.restore.3'],
    recovery: ['harvest.reject', 'harvest.hint.show'], continuity: ['harvest.cta', 'harvest.cta.click'],
  };
  return {operations, assets, assetPolicy, recipe, requirements: concept.requirements.map(requirement => ({...requirement, records: effects[requirement.effect]}))};
}
function composeNativeConcept(input, {studioAssets} = {}) {
  const concept = validateCreativeConcept(input), result = concept.experience.mechanic === "harvest-restore" ? harvestRestore(concept, studioAssets) : concept.experience.mechanic === "star-salvage" ? starSalvageModule.compose(concept, studioAssets) : concept.experience.mechanic === "match-restore" ? matchRestore(concept) : { operations: concept.experience.mechanic === "tap-collect" ? tapCollect(concept) : dragCatch(concept), assets: [] };
  return freeze({ format: "tora-native-composition-1", conceptHash: conceptHash(concept), conceptAccepted: false, creativeStatus: concept.format === "tora-creative-concept-2" ? "REQUIRES_VISUAL_REVIEW" : "PROTOTYPE", unmetRequirements: concept.format === "tora-creative-concept-2" ? [] : ["Explicit strategic requirements and creative review are pending."], operations: result.operations, assets: result.assets, assetPolicy: result.assetPolicy ?? [], requirements: result.requirements ?? [], ...(result.recipe ? {recipe:result.recipe} : {}) });
}
export {
  CREATIVE_CONCEPT_SCHEMA,
  composeNativeConcept,
  conceptHash,
  validateCreativeConcept
};
