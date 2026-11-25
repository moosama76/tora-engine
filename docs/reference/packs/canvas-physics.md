# Canvas and 2D physics pack

`erase-mask` attaches to an image or rectangle. It maintains a bounded offscreen mask, stamps continuous pointer segments, and reports coarse coverage without pixel readbacks. Use `progressVariableId`, `maskProgress`, and one-shot `maskComplete` for cleaning, scratch-off, coloring, and reveal playables. `resetMask` restores the initial mask.

`draw-stroke` attaches to a group playfield and stores bounded polylines. `physics-wall` turns segments into static collision walls. `slice-blade` renders a short fading trail and emits `sliceHit` for collider hits and `jointBreak` for severed breakable distance joints. `path-trace` moves `followComponentId` along the completed line and emits `pathArrive`. `clearStrokes` removes authored runtime strokes.

`physics-body` supports dynamic, static, and kinematic circles/boxes. Optional `mass` weights impulses and collision response; `collisionGroup` and `ignoreGroup` filter unwanted pairs. `physics-joint` with `kind:'distance'` constrains a body to an anchor with stable position projection and optional rope rendering. It is not an angular or motorized joint solver.

Use `aim-launch` for pullback/direct launches, `capture-zone` for speed-gated radial capture, and `oscillate` for deterministic kinematic movement. Physics events include launch, bounce, rest, capture, and body jump. Motion and physics are fixed-step and bounded.

Creative QA recognizes draw and erase gestures, but automated coverage does not establish gesture feel. Inspect continuous trails at swipe speed, collision stability, reset/restart, mask progress feedback, and line readability at all target aspect ratios.
