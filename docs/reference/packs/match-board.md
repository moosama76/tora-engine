# Match board pack

`match-board` defines a bounded row/column grid with a deterministic seed. Attach `match-tile` to tile components and assign row, column, and one of the registered visual groups. Use the board runtime for swapping and match resolution rather than duplicating grid logic in event chains.

Events distinguish `validMatch`, `invalidMatch`, and `matchClear`. Actions include `resetMatch`, `hintMatch`, and `copyMatchAsset`; discover their exact component and board references before use. Keep tile assets in one visual family and preserve clear selected, valid, invalid, and clearing feedback.

The match-board runtime does not replace general drop-zone occupancy. Use drag/drop primitives for freeform sorting or merging and match-board primitives for grid Match-3 rules.

Verify initial boards have usable interaction, hint/reset are deterministic, invalid swaps restore cleanly, matches provide audiovisual rewards, and rapid repeated input cannot corrupt the grid. Inspect tile size and spacing on the smallest phone and in landscape.
