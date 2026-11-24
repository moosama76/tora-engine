# Win effects and calls to action

Make the win draw attention to what the player achieved. Once the result reads clearly, make the primary CTA the most inviting thing to tap. Design both moments on the first generation.

## 2D wins

Draw a small palette from the game's artwork. Vary particle size, angle, and timing, and leave clear space around the achievement and primary Store CTA. Use a local burst when a specific object completes the goal. Spread the celebration more broadly when the whole scene is the achievement.

## 3D wins

Release particles from the winning object in world space. Give them lift, outward spread, tumble, and depth so they remain grounded in the scene as the camera moves. Reserve the strongest effect for the final win.

## CTA and Entertaining End Cards

An end card is the playable's climax, not a bare dialog box. Plain static cards with text and a flat button are rejected automatically by Creative QA (`end-card-too-basic`, `end-card-cta-static`, `end-card-particles-not-fullscreen`, `end-card-hero-low-res`):

- **Entertaining celebratory composition:** Showcase the player's achievement with bespoke, high-resolution hero artwork or a live animated diorama (such as a live 3D course or animated completed city), paired with celebratory motion (popping trophy stars, rotating sunburst glow, floating emblem, and full-screen continuous confetti) and a unique, musical win fanfare (never shared across games).
- **Shiny and animated Store CTA:** Reuse the game's palette and typography. Give the primary Store CTA the strongest contrast, a lit 3D bevel, visible depth, a clear pressed state, **a shiny presentation (`shiny-cta` or `pixel-cta`) with continuous diagonal specular sheen and twinkling corner sparkles**, **AND a subtle looping pulse/float animation** beneath a crisp label.
- **Store CTA only:** **Do not include a visible "Play Again" or "Replay" button on playable-ad end cards** — lead players to the advertised game rather than looping inside the ad. A timeout offers the same shiny, animated primary Store CTA alongside brief recovery copy and crisp artwork. Trigger victory confetti and fanfare only on success.

Inspect the packaged playable from the last successful move through the CTA reveal. Check portrait, landscape, the smallest supported phone size, muted play, and reduced motion. The static CTA must still draw attention, the label must stay legible throughout the highlight, and particles must clear the controls. Host/review `restart()` resets presentation effects. Only a deliberate CTA tap opens the store.

## Reference examples

- **Traffic Tycoon** uses rotating confetti around its completed scene. Use this as a reference for a broad celebration when the whole scene is the achievement. [Local win capture](../../../reports/T028/browser/victory.png)
- **Mini Golf** sends pieces up from the cup, so the ball's final destination visibly causes the celebration. [Win capture](../../../docs/evidence/T029/screenshots/victory.png)
- **Tiny Harvest baseline** puts identical cream squares under the achievement in a spiral that resembles a spinner. Its cream button blends into the text and borders. For the completed farm, use a screen-wide shower that clears before the primary action appears. Give the primary action a distinct gold pixel-art face. [Local baseline win capture](../../../reports/tiny-harvest-polished/payoff.png)
