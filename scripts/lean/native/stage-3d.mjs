/* global atob,document,Image */
import {
  Scene, Color, PerspectiveCamera, WebGLRenderer, BufferGeometry, Float32BufferAttribute,
  Mesh, InstancedMesh, Matrix4, MeshLambertMaterial, MeshBasicMaterial, DirectionalLight, HemisphereLight, Group,
  BoxGeometry, CylinderGeometry, SphereGeometry, RingGeometry, CircleGeometry, Shape, Path,
  ShapeGeometry, Texture, SRGBColorSpace, Vector3, Vector2, Plane, Raycaster, PCFSoftShadowMap, DoubleSide,
} from 'three';

function decodeToraMesh(base64) {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const vertexCount = view.getUint32(8, true);
  const indexCount = view.getUint32(12, true);
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  let off = 16;
  for (let i = 0; i < vertexCount; i++) {
    positions[i * 3] = view.getFloat32(off, true);
    positions[i * 3 + 1] = view.getFloat32(off + 4, true);
    positions[i * 3 + 2] = view.getFloat32(off + 8, true);
    normals[i * 3] = view.getFloat32(off + 12, true);
    normals[i * 3 + 1] = view.getFloat32(off + 16, true);
    normals[i * 3 + 2] = view.getFloat32(off + 20, true);
    uvs[i * 2] = view.getFloat32(off + 24, true);
    uvs[i * 2 + 1] = view.getFloat32(off + 28, true);
    off += 32;
  }
  const indices = new Uint16Array(indexCount);
  for (let i = 0; i < indexCount; i++) {
    indices[i] = view.getUint16(off + i * 2, true);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geo.setIndex(Array.from(indices));
  return geo;
}

function fairwayGround(ramp, x, z) {
  if (!ramp) return 0;
  if (z >= 1) return 0;
  if (z <= -1) return 1.1;
  return (1 - z) * 0.55;
}

function buildFairwayGroup(params, sharedTexture, openGeo) {
  const group = new Group();
  const ramp = Boolean(params.fairwayRamp);
  const cupX = params.cupX ?? 0;
  const cupZ = params.cupZ ?? -4.8;
  const cupR = params.cupRadius ?? 0.23;
  // Plinth & cream border framing (matching original scene.ts verbatim)
  const unitBox = new BoxGeometry(1, 1, 1);
  const boxMats = new Map();
  const addBox = (x, y, z, w, h, d, color) => {
    let mat = boxMats.get(color);
    if (!mat) { mat = new MeshLambertMaterial({color}); boxMats.set(color, mat); }
    const mesh = new Mesh(unitBox, mat);
    mesh.position.set(x, y, z);
    mesh.scale.set(w, h, d);
    group.add(mesh);
  };
  for (const x of [-3.2, 3.2]) {
    addBox(x, -0.65, 0, 0.2, 1.1, 14.6, '#a1b8b1');
    addBox(x - Math.sign(x) * 0.1, -0.18, 0, 0.2, 0.25, 14.4, '#e9cea5');
  }
  for (const z of [-7.2, 7.2]) {
    addBox(0, -0.65, z, 6.4, 1.1, 0.2, '#a1b8b1');
    addBox(0, -0.18, z - Math.sign(z) * 0.1, 6.2, 0.25, 0.2, '#e9cea5');
  }
  let grassU = 0.5, grassV = 0.5;
  if (openGeo) {
    const uvAttr = openGeo.getAttribute('uv');
    const nAttr = openGeo.getAttribute('normal');
    if (uvAttr && nAttr) {
      let idx = 0;
      while (idx < nAttr.count && nAttr.getY(idx) < 0.9) idx++;
      if (idx < uvAttr.count) {
        grassU = uvAttr.getX(idx);
        grassV = uvAttr.getY(idx);
      }
    }
  }
  const texReady = Boolean(sharedTexture && sharedTexture.image?.complete && sharedTexture.image?.naturalWidth > 0);
  const baseMat = texReady ? new MeshLambertMaterial({map: sharedTexture}) : new MeshLambertMaterial({color: '#6ec458'});
  const slopeMat = texReady ? new MeshLambertMaterial({map: sharedTexture, color: '#779263'}) : new MeshLambertMaterial({color: '#5a9949'});
  if (sharedTexture && !texReady) {
    baseMat.userData.pendingTex = {tex: sharedTexture, color: '#ffffff'};
    slopeMat.userData.pendingTex = {tex: sharedTexture, color: '#779263'};
  }
  const bands = ramp ? [[-7, -1], [-1, 1], [1, 7]] : [[-7, 7]];
  for (const [near, far] of bands) {
    const shape = new Shape();
    shape.moveTo(-3, near);
    shape.lineTo(3, near);
    shape.lineTo(3, far);
    shape.lineTo(-3, far);
    shape.closePath();
    if (cupZ > near && cupZ < far) {
      const hole = new Path();
      hole.absarc(cupX, cupZ, cupR, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    const geo = new ShapeGeometry(shape, 32);
    const pos = geo.getAttribute('position');
    let hasZero = false, hasPos = false;
    for (let i = 0; i < pos.count; i++) {
      const gx = pos.getX(i), gz = pos.getY(i);
      const gy = fairwayGround(ramp, gx, gz);
      if (gy === 0) hasZero = true;
      if (gy > 0) hasPos = true;
      pos.setXYZ(i, gx, gy, gz);
    }
    const index = geo.getIndex();
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        const b = index.getX(i + 1);
        index.setX(i + 1, index.getX(i + 2));
        index.setX(i + 2, b);
      }
    }
    geo.computeVertexNormals();
    const uv = geo.getAttribute('uv');
    for (let i = 0; i < uv.count; i++) uv.setXY(i, grassU, grassV);
    const surface = new Mesh(geo, ramp && hasZero && hasPos ? slopeMat : baseMat);
    surface.name = 'continuous-fairway';
    group.add(surface);
  }
  // Cedar wooden perimeter rails & top bevel
  const rail = '#d69260', top = '#f1bd87';
  for (const x of [-3.1, 3.1]) {
    addBox(x, 0.12, 0, 0.2, 0.3, 14.2, rail);
    addBox(x, 0.29, 0, 0.22, 0.04, 14.2, top);
  }
  for (const z of [-7.1, 7.1]) {
    addBox(0, fairwayGround(ramp, 0, z > 0 ? 6 : -6) + 0.12, z, 6.4, 0.3, 0.2, rail);
  }
  if (ramp) {
    for (const x of [-3.1, 3.1]) addBox(x, 0.7, -4.5, 0.2, 1.1, 5.2, rail);
  }
  return group;
}

function buildCupGroup(params) {
  const group = new Group();
  const r = params.cupRadius ?? 0.23;
  const cup = new Mesh(new CylinderGeometry(r, r * 0.89, 0.48, 24, 1, true), new MeshLambertMaterial({color: '#244640', side: DoubleSide}));
  cup.position.y = -0.24;
  group.add(cup);
  const bottom = new Mesh(new CircleGeometry(r * 0.91, 24), new MeshBasicMaterial({color: '#082c2b'}));
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.475;
  group.add(bottom);
  const lining = new Mesh(new CylinderGeometry(r, r * 0.978, 0.09, 24, 1, true), new MeshLambertMaterial({color: '#eee9cf', side: DoubleSide}));
  lining.position.y = -0.045;
  group.add(lining);
  const rim = new Mesh(new RingGeometry(r, r + 0.06, 24), new MeshLambertMaterial({color: '#fff7d1'}));
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.004;
  group.add(rim);
  return group;
}

function buildGardenGroup() {
  const group = new Group();
  const trunkGeo = new BoxGeometry(0.18, 1, 0.18);
  const trunkMat = new MeshLambertMaterial({color: '#b27b59'});
  const padGeo = new BoxGeometry(1.5, 0.2, 1.6);
  const padMat = new MeshLambertMaterial({color: '#82b88b'});
  const leafGeo0 = new SphereGeometry(0.62, 7, 5);
  const leafGeo1 = new SphereGeometry(0.49, 7, 5);
  const leafMatA = new MeshLambertMaterial({color: '#77b86b'});
  const leafMatB = new MeshLambertMaterial({color: '#3e9d79'});
  const trunks = new InstancedMesh(trunkGeo, trunkMat, 14);
  const pads = new InstancedMesh(padGeo, padMat, 14);
  const countA = 5; // i = 0, 3, 6, 9, 12
  const countB = 9;
  const leavesA0 = new InstancedMesh(leafGeo0, leafMatA, countA);
  const leavesA1 = new InstancedMesh(leafGeo1, leafMatA, countA);
  const leavesB0 = new InstancedMesh(leafGeo0, leafMatB, countB);
  const leavesB1 = new InstancedMesh(leafGeo1, leafMatB, countB);
  const mat4 = new Matrix4();
  let ia = 0, ib = 0;
  for (let i = 0; i < 14; i++) {
    const side = i % 2 ? -1 : 1;
    const x = side * (3.8 + (i % 3) * 0.35);
    const z = -6.5 + Math.floor(i / 2) * 2;
    mat4.makeTranslation(x, -0.02, z);
    trunks.setMatrixAt(i, mat4);
    mat4.makeTranslation(x, -0.48, z);
    pads.setMatrixAt(i, mat4);
    if (i % 3 === 0) {
      mat4.makeTranslation(x, 0.5, z);
      leavesA0.setMatrixAt(ia, mat4);
      mat4.makeTranslation(x, 1.0, z);
      leavesA1.setMatrixAt(ia, mat4);
      ia++;
    } else {
      mat4.makeTranslation(x, 0.5, z);
      leavesB0.setMatrixAt(ib, mat4);
      mat4.makeTranslation(x, 1.0, z);
      leavesB1.setMatrixAt(ib, mat4);
      ib++;
    }
  }
  for (const inst of [trunks, pads, leavesA0, leavesA1, leavesB0, leavesB1]) {
    inst.instanceMatrix.needsUpdate = true;
    group.add(inst);
  }
  return group;
}

function waveFlagGeometry(geometry, rest, time) {
  const p = geometry.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = rest[i * 3], y = rest[i * 3 + 1], z = rest[i * 3 + 2];
    const weight = y > 0.7 ? Math.max(0, Math.min(1, (-x - 0.035) / 0.32)) : 0;
    p.setXYZ(i, x, y + Math.sin(time * 3.2 + x * 10) * 0.018 * weight, z + Math.sin(time * 3.2 + x * 10 + y * 2) * 0.07 * weight);
  }
  p.needsUpdate = true;
  geometry.computeVertexNormals();
}

/** Manages one Three.js WebGL2 offscreen canvas per active native.stage3d.v1 component. */
export function createStage3dManager(project, assetsMap, onTextureReady) {
  const meshCache = new Map();
  const textureCache = new Map();
  const stages = new Map();
  let sharedGlCanvas, sharedRenderer, sharedCacheCanvas, sharedCacheCtx, sharedStageId;

  function ensureRenderer() {
    if (sharedRenderer !== undefined) return sharedRenderer;
    try {
      sharedGlCanvas = document.createElement('canvas');
      sharedGlCanvas.addEventListener?.('webglcontextrestored', () => {
        sharedStageId = undefined;
        for (const entry of stages.values()) {
          entry.compiled = false;
          entry.textureDirty = true;
          entry.lastRenderedTime = -1;
          entry.lastFlagStep = -1;
        }
        onTextureReady?.();
      });
      sharedCacheCanvas = document.createElement('canvas');
      sharedCacheCtx = sharedCacheCanvas.getContext?.('2d');
      sharedRenderer = new WebGLRenderer({
        canvas: sharedGlCanvas,
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
      });
      sharedRenderer.shadowMap.type = PCFSoftShadowMap;
      return sharedRenderer;
    } catch {
      sharedRenderer = null;
      return null;
    }
  }

  function getMeshGeometry(assetId) {
    if (!assetId) return undefined;
    if (meshCache.has(assetId)) return meshCache.get(assetId);
    const asset = assetsMap.get(assetId);
    if (!asset || asset.mime !== 'model/tora-mesh' || !asset.data) return undefined;
    const geo = decodeToraMesh(asset.data);
    meshCache.set(assetId, geo);
    return geo;
  }

  function getTexture(assetId) {
    if (!assetId) return undefined;
    if (textureCache.has(assetId)) return textureCache.get(assetId);
    const asset = assetsMap.get(assetId);
    if (!asset || !asset.mime.startsWith('image/') || !asset.data) return undefined;
    const img = new Image();
    const tex = new Texture(img);
    tex.colorSpace = SRGBColorSpace;
    const markLoaded = notify => {
      tex.needsUpdate = true;
      for (const entry of stages.values()) {
        entry.scene.traverse(obj => {
          const mats = obj.isMesh && obj.material ? (Array.isArray(obj.material) ? obj.material : [obj.material]) : [];
          for (const m of mats) {
            if (m.userData?.pendingTex && m.userData.pendingTex.tex === tex) {
              m.map = tex;
              m.color.set(m.userData.pendingTex.color || '#ffffff');
              delete m.userData.pendingTex;
              m.needsUpdate = true;
            }
          }
        });
        entry.textureDirty = true;
      }
      if (notify) onTextureReady?.();
    };
    textureCache.set(assetId, tex);
    img.onload = () => markLoaded(true);
    img.src = 'data:' + asset.mime + ';base64,' + asset.data;
    if (img.complete && img.naturalWidth) markLoaded(false);
    return tex;
  }

  function buildStage(stageComp) {
    const p = stageComp.parameters;
    const scene = new Scene();
    scene.background = new Color(p.skyColor || '#b8e2ed');
    const camera = new PerspectiveCamera(p.cameraFov ?? 39, 1, 0.1, 160);
    camera.position.set(p.cameraX ?? 10, p.cameraY ?? 18, p.cameraZ ?? 21);
    camera.lookAt(p.lookAtX ?? 0, p.lookAtY ?? 0.15, p.lookAtZ ?? 0);
    scene.add(camera);
    scene.add(new HemisphereLight(p.hemiSkyColor || '#fff9dd', p.hemiGroundColor || '#527b75', p.hemiIntensity ?? 1.8));
    const sun = new DirectionalLight(p.sunColor || '#fff0cf', p.sunIntensity ?? 2.1);
    sun.position.set(p.sunX ?? -9, p.sunY ?? 18, p.sunZ ?? 8);
    scene.add(sun);

    const sharedTex = getTexture(stageComp.assetSlots?.[0]?.assetId);
    const nodes = new Map();
    const dynamicNodes = new Map();
    const wavingFlags = [];
    const confettiSystems = [];

    function tagSubtree(rootObj, rootId, sourceId, cameraAttached) {
      rootObj.traverse(node => {
        node.userData.toraRootId = rootId;
        node.userData.toraSourceId = sourceId;
        if (cameraAttached) node.userData.cameraAttached = true;
      });
    }

    function createMeshObject(comp, parentObj, rootId, sourceId, cameraAttached) {
      const mp = comp.parameters;
      let obj;
      const makeMat = () => {
        const opts = {};
        const texReady = Boolean(sharedTex && sharedTex.image?.complete && sharedTex.image?.naturalWidth > 0);
        if (mp.useTexture && sharedTex && texReady) opts.map = sharedTex;
        else opts.color = mp.useTexture ? (mp.waveFlag ? '#e85d56' : '#d89b6a') : (mp.color || '#ffffff');
        if (mp.doubleSide) opts.side = DoubleSide;
        if (mp.opacity < 1) { opts.transparent = true; opts.opacity = mp.opacity; opts.depthWrite = false; }
        const mat = mp.unlit ? new MeshBasicMaterial(opts) : new MeshLambertMaterial(opts);
        if (mp.useTexture && sharedTex && !texReady) mat.userData.pendingTex = {tex: sharedTex, color: '#ffffff'};
        return mat;
      };
      if (mp.primitive === 'group') {
        obj = new Group();
      } else if (mp.primitive === 'fairway') {
        obj = buildFairwayGroup(mp, sharedTex, getMeshGeometry(comp.assetSlots?.[0]?.assetId));
      } else if (mp.primitive === 'cup') {
        obj = buildCupGroup(mp);
      } else if (mp.primitive === 'garden') {
        obj = buildGardenGroup();
      } else if (mp.primitive === 'mesh') {
        const baseGeo = getMeshGeometry(comp.assetSlots?.[0]?.assetId);
        const geo = mp.waveFlag && baseGeo ? baseGeo.clone() : (baseGeo ?? new BoxGeometry(1, 1, 1));
        obj = new Mesh(geo, makeMat());
        if (mp.waveFlag && baseGeo) {
          wavingFlags.push({geo, rest: new Float32Array(geo.getAttribute('position').array)});
        }
      } else if (mp.primitive === 'sphere') {
        obj = new Mesh(new SphereGeometry(mp.radiusTop ?? 0.5, 16, 12), makeMat());
      } else if (mp.primitive === 'cylinder') {
        obj = new Mesh(new CylinderGeometry(mp.radiusTop ?? 0.23, mp.radiusBottom ?? 0.21, 1, 32, 1, Boolean(mp.openEnded)), makeMat());
      } else if (mp.primitive === 'ring') {
        obj = new Mesh(new RingGeometry(mp.innerRadius ?? 0, mp.radiusTop ?? 0.15, 24), makeMat());
      } else if (mp.primitive === 'circle') {
        obj = new Mesh(new CircleGeometry(mp.radiusTop ?? 0.21, 32), makeMat());
      } else {
        obj = new Mesh(new BoxGeometry(1, 1, 1), makeMat());
      }
      obj.position.set(mp.x ?? 0, mp.y ?? 0, mp.z ?? 0);
      obj.rotation.set(mp.rx ?? 0, mp.ry ?? 0, mp.rz ?? 0);
      obj.scale.set(mp.sx ?? 1, mp.sy ?? 1, mp.sz ?? 1);
      obj.visible = mp.visible !== false;
      tagSubtree(obj, rootId, sourceId, cameraAttached);
      parentObj.add(obj);
      return obj;
    }

    // Build all descendant native.mesh3d.v1 nodes in parent-first order
    const descendants = [];
    const rootByComp = new Map();
    const collect = (parentId, rootComp, camAttached) => {
      for (const comp of project.components) {
        if (comp.parentId === parentId && comp.contract === 'native.mesh3d.v1' && !comp.prototype) {
          const ownRoot = rootComp ?? comp;
          const attached = camAttached || Boolean(comp.parameters.attachToCamera);
          rootByComp.set(comp.id, {rootId: ownRoot.id, sourceId: ownRoot.id, cameraAttached: attached});
          descendants.push(comp);
          collect(comp.id, ownRoot, attached);
        }
      }
    };
    collect(stageComp.id, null, false);

    for (const comp of descendants) {
      const mp = comp.parameters;
      const meta = rootByComp.get(comp.id);
      const parentObj = mp.attachToCamera && comp.parentId === stageComp.id
        ? camera
        : (comp.parentId === stageComp.id ? scene : (nodes.get(comp.parentId) ?? scene));
      const obj = createMeshObject(comp, parentObj, meta.rootId, meta.sourceId, meta.cameraAttached);
      nodes.set(comp.id, obj);

      if (mp.confetti) {
        const cGroup = new Group();
        cGroup.userData.isConfetti = true;
        const cGeo = new BoxGeometry(0.08, 0.025, 0.12);
        const cMats = ['#ffda69', '#fff6c9', '#ef8774', '#7cc6bf'].map(c => new MeshBasicMaterial({color: c}));
        const pieces = Array.from({length: 28}, (_, i) => {
          const m = new Mesh(cGeo, cMats[i % 4]);
          m.visible = false;
          cGroup.add(m);
          return m;
        });
        scene.add(cGroup);
        confettiSystems.push({id: comp.id, origin: {x: mp.x ?? 0, y: mp.y ?? 0, z: mp.z ?? 0}, pieces});
      }
    }

    const guideGroup = new Group();
    scene.add(guideGroup);
    const guideDotGeo = new SphereGeometry(1, 8, 5);
    const guideDotMat = new MeshBasicMaterial({color: '#fff1a2', transparent: true, opacity: 0.85});
    const guidePool = Array.from({length: 24}, () => {
      const dot = new Mesh(guideDotGeo, guideDotMat);
      dot.visible = false;
      guideGroup.add(dot);
      return dot;
    });
    const raycaster = new Raycaster();
    const ndc = new Vector2();
    const projVec = new Vector3();
    const plane = new Plane(new Vector3(0, 1, 0), 0);
    const hitVec = new Vector3();
    let lastGuideKey = '';

    const nodeEntries = Array.from(nodes, ([id, obj]) => ({
      id,
      obj,
      comp: project.components.find(c => c.id === id),
    })).filter(item => item.comp);

    const entry = {
      id: stageComp.id,
      scene,
      camera,
      nodes,
      dynamicNodes,
      nodeEntries,
      createMeshObject,
      wavingFlags,
      confettiSystems,
      guideGroup,
      guidePool,
      compiled: false,
      lastRenderMs: 0,
      textureDirty: true,
      skyColor: p.skyColor || '#b8e2ed',
      lastWaveAt: -1,
      lastRenderedTime: -1,
      lastRenderedW: 0,
      lastRenderedH: 0,
      lastPoseSig: '',
      guideDirty: true,
      focusZ: 0,
      lastTime: -1,
      lastWidth: 0,
      lastHeight: 0,
      setGuide(points) {
        const count = points ? Math.min(points.length, guidePool.length) : 0;
        const key = count ? points.slice(0, count).map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)}`).join('|') : '';
        if (key === lastGuideKey) return;
        lastGuideKey = key;
        entry.guideDirty = true;
        for (let i = 0; i < guidePool.length; i++) {
          const dot = guidePool[i];
          if (i < count) {
            const pt = points[i];
            const r = 0.055 * (1 - (i / count) * 0.5);
            dot.visible = true;
            dot.scale.setScalar(r);
            dot.position.set(pt.x, pt.y + 0.03, pt.z);
          } else {
            dot.visible = false;
          }
        }
      },
      project(pos, width, height) {
        projVec.set(pos.x, pos.y, pos.z).project(camera);
        return {x: (projVec.x + 1) * width / 2, y: (1 - projVec.y) * height / 2};
      },
      unproject(x, y, width, height, elevation) {
        ndc.set((x / width) * 2 - 1, 1 - (y / height) * 2);
        raycaster.setFromCamera(ndc, camera);
        plane.constant = -elevation;
        return raycaster.ray.intersectPlane(plane, hitVec)
          ? {x: hitVec.x, y: hitVec.y, z: hitVec.z}
          : null;
      },
      raycast(ndcX, ndcY, maxDistance = 80, {isTarget = () => true, isOccluder = () => false} = {}) {
        scene.updateMatrixWorld(true);
        camera.updateMatrixWorld(true);
        ndc.set(ndcX, ndcY);
        raycaster.near = 0.05;
        raycaster.far = maxDistance;
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(scene.children, true);
        const seen = new Set();
        for (const hit of hits) {
          let hidden = false;
          for (let cur = hit.object; cur; cur = cur.parent) {
            if (!cur.visible || cur === guideGroup || cur.userData?.cameraAttached || cur.userData?.isConfetti) {
              hidden = true;
              break;
            }
          }
          if (hidden) continue;
          const rootId = hit.object.userData?.toraRootId;
          const sourceId = hit.object.userData?.toraSourceId;
          if (!rootId || seen.has(rootId)) continue;
          seen.add(rootId);
          if (isTarget(rootId, sourceId)) {
            return {
              id: rootId,
              sourceId,
              distance: hit.distance,
              point: {x: hit.point.x, y: hit.point.y, z: hit.point.z},
            };
          }
          if (isOccluder(rootId, sourceId)) return null;
        }
        return null;
      },
    };
    stages.set(stageComp.id, entry);
    return entry;
  }

  function getStage(stageComp) {
    return stages.get(stageComp.id) ?? buildStage(stageComp);
  }

  function syncStage(stageComp, {time = 0, ambientTime, propsOf, bodies3d, fpsPose, instances3d = [], aimLocked = false, groundFn, worldWidth = 390, worldHeight = 700}) {
    const entry = getStage(stageComp);
    const waveTime = ambientTime ?? time;
    const p = propsOf(stageComp);
    const nextSky = p.skyColor || '#b8e2ed';
    if (entry.skyColor !== nextSky) {
      entry.skyColor = nextSky;
      entry.scene.background = new Color(nextSky);
    }

    // Sync dynamically spawned mesh3d prototype instances (add missing, remove despawned)
    const liveIds = new Set(instances3d.map(item => item.id));
    for (const [dynId, dynObj] of entry.dynamicNodes) {
      if (!liveIds.has(dynId)) {
        dynObj.parent?.remove(dynObj);
        entry.dynamicNodes.delete(dynId);
      }
    }
    for (const comp of instances3d) {
      if (entry.dynamicNodes.has(comp.id)) continue;
      const parentObj = comp.parentId === stageComp.id
        ? entry.scene
        : (entry.dynamicNodes.get(comp.parentId) ?? entry.nodes.get(comp.parentId) ?? entry.scene);
      const rootId = comp.instanceId ?? comp.id;
      const rootComp = instances3d.find(node => node.id === rootId) ?? comp;
      const sourceId = rootComp.prototypeId ?? rootComp.id;
      const obj = entry.createMeshObject(comp, parentObj, rootId, sourceId, Boolean(comp.parameters.attachToCamera));
      entry.dynamicNodes.set(comp.id, obj);
    }

    // Sync mesh3d node transforms, visibility & colors from live parameters + 3D physics + drop shadows
    const allNodes = [
      ...entry.nodeEntries,
      ...instances3d.map(comp => ({id: comp.id, obj: entry.dynamicNodes.get(comp.id), comp})).filter(row => row.obj),
    ];
    let poseParts = '';
    for (const {id, obj, comp} of allNodes) {
      const mp = propsOf(comp);
      obj.visible = mp.visible !== false;
      if (!mp.useTexture && obj.isMesh && obj.material?.color && mp.color) {
        obj.material.color.set(mp.color);
      }
      const body = bodies3d?.get(id);
      if (body && body.mode === 'dynamic') {
        const cap = body.captured ? Math.min(1, (body.captureElapsed ?? 0) / 0.55) : 0;
        const tx = body.captured && body.captureTarget ? body.x + (body.captureTarget.x - body.x) * cap : body.x;
        const ty = body.y - cap * 0.45;
        const tz = body.captured && body.captureTarget ? body.z + (body.captureTarget.z - body.z) * cap : body.z;
        obj.position.set(tx, ty, tz);
        const s = 1 - cap * 0.65;
        obj.scale.set((mp.sx ?? 1) * s, (mp.sy ?? 1) * s, (mp.sz ?? 1) * s);
        obj.rotation.set(-(body.spin ?? 0), mp.ry ?? 0, (body.spin ?? 0) * 0.22);
      } else if (body && body.mode === 'kinematic') {
        obj.position.set(body.x, body.y ?? mp.y ?? 0, body.z);
        obj.rotation.set(mp.rx ?? 0, -(body.angle ?? mp.ry ?? 0), mp.rz ?? 0);
      } else if (mp.dropShadowOf && bodies3d?.has(mp.dropShadowOf)) {
        const target = bodies3d.get(mp.dropShadowOf);
        const floor = groundFn ? (groundFn(target, target.x, target.z) ?? -1) : 0;
        obj.position.set(target.x, floor + 0.008, target.z);
        const lift = Math.max(0, target.y - floor - target.radius);
        if (obj.material) obj.material.opacity = 0.22 / (1 + lift * 2);
        const s = 1 + lift * 0.4;
        obj.scale.set(s, s, s);
        obj.visible = !target.captured && mp.visible !== false;
      } else {
        obj.position.set(mp.x ?? 0, mp.y ?? 0, mp.z ?? 0);
        obj.rotation.set(mp.rx ?? 0, mp.ry ?? 0, mp.rz ?? 0);
        obj.scale.set(mp.sx ?? 1, mp.sy ?? 1, mp.sz ?? 1);
      }
      if (fpsPose || entry.dynamicNodes.size > 0) {
        poseParts += `${id}:${obj.visible ? 1 : 0},${obj.position.x.toFixed(3)},${obj.position.y.toFixed(3)},${obj.position.z.toFixed(3)},${obj.rotation.y.toFixed(3)},${mp.color ?? ''}|`;
      }
    }

    // Animate 3D confetti bursts when a dynamic ball in this stage is captured
    let capturedBody;
    if (bodies3d) {
      for (const body of bodies3d.values()) {
        if (body.stageId === stageComp.id && body.captured) { capturedBody = body; break; }
      }
    }
    for (const sys of entry.confettiSystems) {
      const active = Boolean(capturedBody);
      const t = capturedBody ? (capturedBody.captureElapsed ?? 0) : 0;
      sys.pieces.forEach((m, i) => {
        m.visible = active;
        if (!active) return;
        const a = i * 2.399;
        const ox = capturedBody.captureTarget?.x ?? sys.origin.x;
        const oy = capturedBody.captureTarget?.y ?? sys.origin.y;
        const oz = capturedBody.captureTarget?.z ?? sys.origin.z;
        m.position.set(
          ox + Math.cos(a) * t * (0.5 + (i % 4) * 0.17),
          oy + 0.3 + Math.sin(Math.min(1, t / 2) * Math.PI) * (1 + (i % 5) * 0.15),
          oz + Math.sin(a) * t * (0.5 + (i % 4) * 0.17),
        );
        m.rotation.set(t * 3 + i, t * 2 + i, Math.sin(t + i));
      });
    }

    // Camera pose: first-person FPS controller or smooth tracking / golf framing
    const portrait = worldHeight >= worldWidth;
    const dt = entry.lastTime < 0 || waveTime < entry.lastTime ? 0 : Math.min(0.05, waveTime - entry.lastTime);
    entry.camera.aspect = worldWidth / Math.max(1, worldHeight);
    let victorySway = false;
    if (fpsPose) {
      entry.lastTime = waveTime;
      entry.camera.rotation.order = 'YXZ';
      entry.camera.position.set(fpsPose.x, fpsPose.y + (fpsPose.bob ?? 0), fpsPose.z);
      entry.camera.rotation.set(fpsPose.pitch, fpsPose.yaw, 0);
      entry.camera.fov = portrait ? (p.cameraFov ?? 68) : (p.landscapeCameraFov ?? 54);
      poseParts += `cam:${entry.camera.position.x.toFixed(3)},${entry.camera.position.y.toFixed(3)},${entry.camera.position.z.toFixed(3)},${fpsPose.yaw.toFixed(4)},${fpsPose.pitch.toFixed(4)},${entry.camera.fov.toFixed(2)}`;
    } else {
      const followBody = p.followTargetId ? bodies3d?.get(p.followTargetId) : undefined;
      const targetZ = followBody ? followBody.z * (p.followZFactor ?? 0.12) : (p.lookAtZ ?? 0);
      if (entry.lastTime < 0 || waveTime < entry.lastTime) entry.focusZ = targetZ;
      else if (!aimLocked) entry.focusZ += (targetZ - entry.focusZ) * (1 - Math.exp(-6 * dt));
      entry.lastTime = waveTime;
      const intro = Math.max(0, 1 - waveTime / 1.5);
      victorySway = !p.followTargetId && (p.introLift ?? 2) === 0;
      if (!aimLocked) {
        const swayX = victorySway ? Math.sin(waveTime * 0.42) * 1.15 : 0;
        const swayZ = victorySway ? (Math.cos(waveTime * 0.42) - 1) * 0.55 : 0;
        const baseX = (portrait ? (p.cameraX ?? 10) : (p.landscapeCameraX ?? 13)) + swayX;
        const baseY = portrait ? (p.cameraY ?? 18) + intro * (p.introLift ?? 2) : (p.landscapeCameraY ?? 15);
        const baseZ = (portrait ? (p.cameraZ ?? 21) : (p.landscapeCameraZ ?? 18)) + swayZ;
        const y = dt === 0 ? baseY : entry.camera.position.y + (baseY - entry.camera.position.y) * (1 - Math.exp(-6 * dt));
        entry.camera.position.set(baseX, y, baseZ + entry.focusZ);
        entry.camera.fov = portrait ? (p.cameraFov ?? 39) : (p.landscapeCameraFov ?? 22.6199);
        entry.camera.lookAt(p.lookAtX ?? 0, p.lookAtY ?? 0.15, entry.focusZ);
      }
    }
    entry.camera.updateProjectionMatrix();
    entry.camera.updateMatrixWorld(true);
    return {entry, waveTime, victorySway, poseParts};
  }

  function renderStage(stageComp, ctx2d, pixelWidth, pixelHeight, stageWidth, stageHeight, options) {
    const {entry, waveTime, victorySway, poseParts} = syncStage(stageComp, {
      ...options,
      worldWidth: options.worldWidth ?? stageWidth,
      worldHeight: options.worldHeight ?? stageHeight,
    });
    const {bodies3d} = options;

    // Render into offscreen WebGL2 buffer & composite onto main Canvas2D stage
    if (pixelWidth < 2 || pixelHeight < 2) {
      ctx2d.fillStyle = entry.skyColor;
      ctx2d.fillRect(0, 0, stageWidth, stageHeight);
      return entry;
    }
    const renderer = ensureRenderer();
    if (!renderer || renderer.getContext?.()?.isContextLost?.()) {
      ctx2d.fillStyle = entry.skyColor;
      ctx2d.fillRect(0, 0, stageWidth, stageHeight);
      return entry;
    }
    const maxDim = Math.max(pixelWidth, pixelHeight, 1);
    const maxTarget = 520;
    const cap = maxDim > maxTarget ? maxTarget / maxDim : 1;
    const rw = Math.max(2, Math.round(pixelWidth * cap));
    const rh = Math.max(2, Math.round(pixelHeight * cap));
    const resized = sharedGlCanvas.width !== rw || sharedGlCanvas.height !== rh;
    if (resized) {
      renderer.setPixelRatio(1);
      renderer.setSize(rw, rh, false);
      sharedCacheCanvas.width = rw;
      sharedCacheCanvas.height = rh;
      sharedStageId = undefined;
    }
    if (!entry.compiled) {
      entry.compiled = true;
      const hiddenPrewarm = [];
      if (entry.guidePool[0] && !entry.guidePool[0].visible) {
        entry.guidePool[0].visible = true;
        entry.guidePool[0].position.set(0, -99, 0);
        hiddenPrewarm.push(entry.guidePool[0]);
      }
      for (const sys of entry.confettiSystems) {
        if (sys.pieces[0] && !sys.pieces[0].visible) {
          sys.pieces[0].visible = true;
          sys.pieces[0].position.set(0, -99, 0);
          hiddenPrewarm.push(sys.pieces[0]);
        }
      }
      renderer.compile(entry.scene, entry.camera);
      for (const m of hiddenPrewarm) m.visible = false;
    }
    let hasMovingBody = false;
    if (bodies3d) {
      for (const body of bodies3d.values()) {
        if (body.stageId !== stageComp.id) continue;
        if (body.mode === 'kinematic' || (body.mode === 'dynamic' && (!body.atRest || body.captured))) {
          hasMovingBody = true;
          break;
        }
      }
    }
    // Keep waving flag animation at an exact invariant 20Hz phase whether idle, pulling the ball, or rolling.
    const flagStep = Math.floor(waveTime * 20);
    const flagDirty = entry.wavingFlags.length > 0 && entry.lastFlagStep !== flagStep;
    const swayDirty = victorySway && Math.abs(waveTime - entry.lastRenderedTime) >= 0.032;
    const bodyDirty = hasMovingBody && entry.lastRenderedTime !== waveTime;
    const poseDirty = poseParts !== entry.lastPoseSig;
    const didRender = resized || sharedStageId !== stageComp.id || entry.guideDirty || entry.textureDirty || entry.lastRenderedTime < 0 || entry.lastRenderedW !== rw || entry.lastRenderedH !== rh || flagDirty || swayDirty || bodyDirty || poseDirty;
    if (didRender) {
      if (entry.wavingFlags.length > 0 && entry.lastFlagStep !== flagStep) {
        for (const flag of entry.wavingFlags) waveFlagGeometry(flag.geo, flag.rest, flagStep / 20);
        entry.lastFlagStep = flagStep;
      }
      renderer.setClearColor(entry.skyColor, 1);
      renderer.render(entry.scene, entry.camera);
      if (sharedGlCanvas.width > 0 && sharedGlCanvas.height > 0) {
        sharedCacheCtx.drawImage(sharedGlCanvas, 0, 0, rw, rh);
        sharedStageId = stageComp.id;
      }
      entry.lastRenderedTime = waveTime;
      entry.lastRenderedW = rw;
      entry.lastRenderedH = rh;
      entry.lastPoseSig = poseParts;
      entry.guideDirty = false;
      entry.textureDirty = false;
    }
    entry.lastWidth = stageWidth;
    entry.lastHeight = stageHeight;
    if (sharedCacheCanvas.width > 0 && sharedCacheCanvas.height > 0) {
      ctx2d.drawImage(sharedCacheCanvas, 0, 0, stageWidth, stageHeight);
    }
    return entry;
  }

  function reset() {
    for (const entry of stages.values()) {
      for (const dynObj of entry.dynamicNodes.values()) dynObj.parent?.remove(dynObj);
      entry.dynamicNodes.clear();
      entry.focusZ = 0;
      entry.lastTime = -1;
      entry.lastRenderedTime = -1;
      entry.lastFlagStep = -1;
      entry.lastPoseSig = '';
      entry.guideDirty = true;
      entry.setGuide([]);
    }
  }

  function dispose() {
    for (const entry of stages.values()) {
      entry.scene.traverse(o => {
        if (o.isMesh) {
          if (o.geometry && !Array.from(meshCache.values()).includes(o.geometry)) o.geometry.dispose();
          if (o.material) for (const m of Array.isArray(o.material) ? o.material : [o.material]) m.dispose();
        }
      });
    }
    for (const geo of meshCache.values()) geo.dispose();
    for (const tex of textureCache.values()) tex.dispose();
    stages.clear();
    meshCache.clear();
    textureCache.clear();
    sharedRenderer?.forceContextLoss?.();
    sharedRenderer?.dispose();
    sharedRenderer = undefined;
    sharedGlCanvas = undefined;
    sharedCacheCanvas = undefined;
    sharedCacheCtx = undefined;
    sharedStageId = undefined;
  }

  return {getStage, syncStage, renderStage, reset, dispose};
}
