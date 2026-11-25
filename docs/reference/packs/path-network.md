# Path network pack

Attach `path-network` to a group and declare unique nodes and directed or bidirectional edges. Routing uses deterministic Dijkstra search with lexical ID tie-breaking. Node/edge costs, holds, speed scales, enabled state, and gate state remain declarative.

`path-agent` selects network, start, target, speed, spacing, corner radius, orientation, loop behavior, and active state. An optional numeric variable scales speed. `path-gate` provides open, closed, or timed cycle control. Live network edits replan agents from their next node without teleporting.

Use `pathArrive` and `pathBlocked` for progression and recovery. Actions set edges, targets, and gates or spawn an agent prototype on a path. `spawnOnPath` requires an existing compatible network/start/target; discover exact operand requirements before authoring.

Runtime state exposes network, route, active-agent, and queued-agent snapshots for QA. Check congestion and headway, closed-gate recovery, replanning after edits, loop completion, and restart. Keep roads and agents readable at phone size and avoid putting essential controls over moving paths.
