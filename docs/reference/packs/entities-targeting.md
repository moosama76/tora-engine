# Entities and targeting pack

`instance-state` gives each authored or spawned runtime instance independent `hp`, `maxHp`, `value`, `tag`, and `team`. State belongs to the runtime instance, not its prototype. A child `value-meter` with `instanceField:'hp'` follows its parent instance without a global variable. Depletion emits once when HP crosses from positive to zero or below.

`random` uses the deterministic project seed and resets with replay. It writes a declared numeric variable; request integer output when selecting discrete content. `spawnAt` supports bounded count and jitter, including a numeric count variable. Random calls and spawned IDs therefore reproduce exactly after restart.

`steer` provides bounded chase, flee, and orbit movement toward a component, nearest team member, or pointer. `launchToward` aims at the same target kinds or an angle variable, with literal or variable speed. Range, turn rate, orientation, target references, and teams are declarative.

`modifyInstanceState` changes self, other, or an authored component's HP/value/tag. Conditions can compare instance fields as well as variables. Use `instanceDepleted` for score, rewards, and cleanup, and guard symmetric interactions with explicit self/other targeting. `compute` additionally supports modulo, floor, ceiling, absolute value, and clamp. Motion and component actions accept the documented variable operands.

Keep runtime budgets in mind even when bulk spawning. Verify multi-hit feedback, enemy HP bars, simultaneous collisions, nearest-target selection, pointer aiming, and deterministic restart in real output.
