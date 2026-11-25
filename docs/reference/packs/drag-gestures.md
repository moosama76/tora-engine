# Drag and gesture pack

Use `drag` with `drop-zone` for slotted sorting, item-on-item merging, card play, and occupied-slot exchange. A draggable `tag` is matched against a zone's `acceptTags`; an empty accept list accepts every item. Item drop zones take priority over background slots, then paint order and center distance.

`capacity:0` is unlimited. Full zones resolve with `onOccupied:'reject'`, `'swap'`, or `'emit'`. Center snapping, drag rejection, and return motion are deterministic. Occupancy is released when items leave, hide, or despawn. Merge bindings can use `selfInstanceId`/`otherInstanceId` semantics through `despawn:'both'`, then spawn the upgraded item at the drop target or midpoint. Despawn events whose instances no longer exist are not replayed.

Use `swipe-input` for four-direction gestures and `hold-charge` to integrate a declared numeric variable while pressed. `dragMode:'anywhere'` makes the whole stage the input surface; `'on-component'` limits input to its component. Pointer release, drag start/drop/reject, swipe, hold start/release, and contact end are separate event sources.

Use `moveToComponent` and `returnToOrigin` for deterministic eased movement. `spawnAt` can target self, other, midpoint, pointer, or the authored target. Keep legacy defaults when optional targeting fields are unnecessary.

Creative QA recognizes real drag/drop, swipe, and hold gestures. Still inspect touch feel, occupied-slot feedback, snap animation, reset behavior, and small-phone target sizes in the packaged result.
