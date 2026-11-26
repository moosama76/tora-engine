/** Fixed-step 3D golf/ball physics engine for Tora native 3D scenes. World units are metres; +Y is up. */

export const DT_3D = 1 / 120;

export function ground3d(body, x, z) {
  const bx = body.boundsX ?? 3;
  const bz = body.boundsZ ?? 7;
  if (Math.abs(x) > bx || Math.abs(z) > bz) return null;
  if (!body.ramp) return 0;
  const h = body.rampHeight ?? 1.1;
  if (z >= 1) return 0;
  if (z <= -1) return h;
  return (1 - z) * (h * 0.5);
}

function collideWall(body, wall, dt, onEvent) {
  const r = body.radius;
  const c = Math.cos(wall.angle);
  const s = Math.sin(wall.angle);
  const px = body.x - wall.x;
  const pz = body.z - wall.z;
  const x = c * px + s * pz;
  const z = -s * px + c * pz;
  const cx = Math.max(-wall.hx, Math.min(wall.hx, x));
  const cz = Math.max(-wall.hz, Math.min(wall.hz, z));
  let nx = x - cx;
  let nz = z - cz;
  let d = Math.hypot(nx, nz);
  const floor = ground3d(body, body.x, body.z);
  if (d >= r || (floor !== null && body.y > floor + 0.55)) return;
  if (d < 1e-8) {
    if (wall.hx - Math.abs(x) < wall.hz - Math.abs(z)) {
      nx = x < 0 ? -1 : 1;
      nz = 0;
      d = 0;
    } else {
      nx = 0;
      nz = z < 0 ? -1 : 1;
      d = 0;
    }
  } else {
    nx /= d;
    nz /= d;
  }
  const wx = c * nx - s * nz;
  const wz = s * nx + c * nz;
  body.x += wx * (r - d + 0.00001);
  body.z += wz * (r - d + 0.00001);
  const wallVx = wall.vx ?? 0;
  const wallVz = wall.vz ?? 0;
  const dot = (body.vx - wallVx) * wx + (body.vz - wallVz) * wz;
  if (dot < 0) {
    const bounce = 1 + (body.restitution ?? 0.72);
    body.vx -= bounce * dot * wx;
    body.vz -= bounce * dot * wz;
    if (Math.abs(dot) > 0.3 && dt > 0 && onEvent) {
      onEvent('bodyBounce', body, wall.sourceId ? wall : undefined);
    }
  }
}

function settle(body, onEvent) {
  body.vx = 0;
  body.vy = 0;
  body.vz = 0;
  body.airborne = false;
  body.atRest = true;
  body.restElapsed = 0;
  body.movingTime = 0;
  if (onEvent) onEvent('bodyRest', body);
}

function recover(body, onEvent) {
  body.x = body.lastSafe.x;
  body.y = body.lastSafe.y;
  body.z = body.lastSafe.z;
  settle(body, onEvent);
}

/** Advance all dynamic 3D bodies by dt using 120Hz substeps. */
export function stepPhysics3d({bodies, walls, zones, dt, onEvent}) {
  if (!Number.isFinite(dt) || dt <= 0) return;
  const substeps = Math.max(1, Math.round(dt / DT_3D));
  const stepDt = dt / substeps;
  for (let s = 0; s < substeps; s++) {
    for (const body of bodies) {
      if (body.mode !== 'dynamic' || body.captured) continue;
      if (body.atRest) continue;
      const bx = body.boundsX ?? 3;
      const bz = body.boundsZ ?? 7;
      if (body.y < -3 || Math.abs(body.x) > bx + 2 || Math.abs(body.z) > bz + 2) {
        recover(body, onEvent);
        continue;
      }
      body.movingTime = (body.movingTime ?? 0) + stepDt;
      const r = body.radius;
      const speed3 = Math.hypot(body.vx, body.vy, body.vz);
      const count = Math.max(1, Math.min(16, Math.ceil(speed3 * stepDt / (r * 0.45))));
      const h = stepDt / count;
      if (!body._perimeter || body._pbx !== bx || body._pbz !== bz) {
        body._pbx = bx;
        body._pbz = bz;
        body._perimeter = [
          {x: -(bx + 0.1), z: 0, hx: 0.1, hz: bz + 0.1, angle: 0, vx: 0, vz: 0},
          {x: bx + 0.1, z: 0, hx: 0.1, hz: bz + 0.1, angle: 0, vx: 0, vz: 0},
          {x: 0, z: -(bz + 0.1), hx: bx + 0.1, hz: 0.1, angle: 0, vx: 0, vz: 0},
          {x: 0, z: bz + 0.1, hx: bx + 0.1, hz: 0.1, angle: 0, vx: 0, vz: 0},
        ];
      }
      const perimeter = body._perimeter;
      let capturedThisStep = false;
      for (let i = 0; i < count; i++) {
        const floor = ground3d(body, body.x, body.z);
        const supported = floor !== null && body.y <= floor + r + 0.012 && body.vy <= 0.1;
        const oldFloor = floor;
        if (supported) {
          body.y = floor + r;
          body.vy = 0;
          const speed = Math.hypot(body.vx, body.vz);
          const nextSpeed = Math.max(0, speed - (body.friction ?? 1.05) * h);
          if (speed > 0) {
            body.vx *= nextSpeed / speed;
            body.vz *= nextSpeed / speed;
          }
          if (body.ramp && body.z < 1 && body.z > -1) {
            const slope = (body.rampHeight ?? 1.1) * 0.5;
            body.vz += 9.81 * slope / (1 + slope * slope) * h;
          }
        } else {
          body.vy -= 9.81 * h;
          if (!body.airborne) {
            body.airborne = true;
            if (onEvent) onEvent('bodyJump', body);
          }
        }
        body.x += body.vx * h;
        body.z += body.vz * h;
        body.y += body.vy * h;
        const nextFloor = ground3d(body, body.x, body.z);
        if (nextFloor !== null) {
          if (supported && oldFloor !== null) {
            const slope = (body.rampHeight ?? 1.1) * 0.5;
            if (body.ramp && body.z <= -1 && body.z - body.vz * h > -1.5 && body.vz < -0.8) {
              body.vy = -body.vz * slope;
              body.airborne = true;
              if (onEvent) onEvent('bodyJump', body);
            } else {
              body.y = nextFloor + r;
            }
          }
          if (body.y < nextFloor + r) {
            body.y = nextFloor + r;
            body.vy = 0;
            body.airborne = false;
          }
        }
        if (body.y < 2) {
          for (const wall of walls) collideWall(body, wall, h, onEvent);
          for (const wall of perimeter) collideWall(body, wall, h, onEvent);
        }
        body.spin = (body.spin ?? 0) + Math.hypot(body.vx, body.vz) * h / r;
        const horizSpeed = Math.hypot(body.vx, body.vz);
        for (const zone of zones) {
          const dist = Math.hypot(body.x - zone.x, body.z - zone.z);
          if (dist < zone.radius && Math.abs(body.y - (zone.y + r)) < zone.heightTolerance && horizSpeed < zone.maxCaptureSpeed) {
            body.captured = true;
            body.captureElapsed = 0;
            body.captureTarget = {x: zone.x, y: zone.y, z: zone.z};
            body.vx = 0;
            body.vy = 0;
            body.vz = 0;
            body.atRest = true;
            if (onEvent) onEvent('zoneCapture', body, zone);
            capturedThisStep = true;
            break;
          }
        }
        if (capturedThisStep) break;
        if (body.y < -3 || Math.abs(body.x) > bx + 2 || Math.abs(body.z) > bz + 2) {
          recover(body, onEvent);
          capturedThisStep = true;
          break;
        }
      }
      if (capturedThisStep) continue;
      const totalSpeed = Math.hypot(body.vx, body.vy, body.vz);
      if (totalSpeed < (body.restSpeed ?? 0.07)) {
        body.restElapsed = (body.restElapsed ?? 0) + stepDt;
        if (body.restElapsed > (body.restDelaySeconds ?? 0.25)) settle(body, onEvent);
      } else {
        body.restElapsed = 0;
      }
      if (body.movingTime > 18) recover(body, onEvent);
    }
  }
}

/** Predict dotted 3D trajectory points for aim preview (matches original predict()). */
export function predictTrajectory3d({body, walls, zones, vx, vz, dots = 15}) {
  const speed = Math.hypot(vx, vz);
  if (!Number.isFinite(speed) || speed < 0.35) return [];
  const scale = Math.min(1, (body.maxSpeed ?? 9) / speed);
  const ghost = {
    ...body,
    vx: vx * scale,
    vy: 0,
    vz: vz * scale,
    atRest: false,
    captured: false,
    airborne: false,
    restElapsed: 0,
    movingTime: 0,
    lastSafe: {x: body.x, y: body.y, z: body.z},
  };
  const staticWalls = walls.map(w => ({...w, vx: 0, vz: 0}));
  const ghostList = [ghost];
  const sim = {bodies: ghostList, walls: staticWalls, zones, dt: DT_3D};
  const points = [];
  const steps = Math.max(18, dots * 6);
  for (let i = 0; i < steps; i++) {
    stepPhysics3d(sim);
    if (i % 6 === 0) points.push({x: ghost.x, y: ghost.y, z: ghost.z});
    if (ghost.atRest || ghost.captured) break;
  }
  return points;
}

/** Push a vertical cylinder (x, z, radius) out of rotated OBB walls and arena perimeter bounds. */
export function resolveWallSlide3d(x, z, radius, walls = [], boundsX = 12, boundsZ = 12) {
  let px = x, pz = z;
  const r = Math.max(0.05, radius ?? 0.45);
  for (let pass = 0; pass < 2; pass++) {
    for (const wall of walls) {
      const c = Math.cos(wall.angle ?? 0), s = Math.sin(wall.angle ?? 0);
      const dx = px - wall.x, dz = pz - wall.z;
      const lx = c * dx + s * dz, lz = -s * dx + c * dz;
      const cx = Math.max(-wall.hx, Math.min(wall.hx, lx));
      const cz = Math.max(-wall.hz, Math.min(wall.hz, lz));
      let nx = lx - cx, nz = lz - cz;
      const d = Math.hypot(nx, nz);
      if (d >= r) continue;
      if (d < 1e-8) {
        if (wall.hx - Math.abs(lx) < wall.hz - Math.abs(lz)) { nx = lx < 0 ? -1 : 1; nz = 0; }
        else { nx = 0; nz = lz < 0 ? -1 : 1; }
      } else {
        nx /= d;
        nz /= d;
      }
      const wx = c * nx - s * nz, wz = s * nx + c * nz;
      px += wx * (r - d + 1e-4);
      pz += wz * (r - d + 1e-4);
    }
    const maxX = Math.max(0, (boundsX ?? 12) - r);
    const maxZ = Math.max(0, (boundsZ ?? 12) - r);
    px = Math.max(-maxX, Math.min(maxX, px));
    pz = Math.max(-maxZ, Math.min(maxZ, pz));
  }
  return {x: px, z: pz};
}
