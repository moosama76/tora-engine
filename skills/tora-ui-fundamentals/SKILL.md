---
name: tora-ui-fundamentals
description: Apply mobile game and playable-ad UI fundamentals when designing, composing, or reviewing Tora interfaces across portrait, landscape, small phone, and tablet viewports.
---

# Tora UI Fundamentals

Apply these rules on the first generation and on every UI revision. Functional layout that passes clipping tests can still look awkward, cramped, or amateur—design for visual balance, hierarchy, and thumb ergonomics from the start.

## 0. Experience Over Tutorial (Minimal Text Discipline)
Playable ads are an **interactive visual experience, not a tutorial or slideshow**. More text actively hurts immersion and conversion:
- **Show, don't narrate:** Communicate affordances and progress through animation (tutorial hand, pulsing legal move, world transformation, particles, and sound) rather than commentary banners describing what the player already sees.
- **Hide prompts once play begins:** Active gameplay may open with at most **one** short micro-prompt (≤ 4 words, e.g., `SWIPE TO MATCH` or `DRAG TO CATCH`) that hides automatically once the player engages, and is **always hidden** on payoff, win, and timeout end cards.
- **Zero duplicate copy:** Never repeat the same message in both a top bar and an end card.
- **Lean, entertaining end cards (Store CTA only):** Use **1 punchy headline (≤ 3 words)**, an optional short 2–3 word sub-label only when needed, crisp high-resolution hero art or live diorama with celebratory motion (stars, sunburst, full-screen confetti), and **1 shiny, animated primary Store CTA (≤ 3 words, `shiny-cta` or `pixel-cta` + looping pulse/float animation)**. **Never add a `PLAY AGAIN` / `TRY AGAIN` / `REPLAY` button on a playable ad end card** — a playable ad exists to lead the player to the actual game store page, not loop inside the ad. Keep `runtime.restart()` for review/test resets only. Creative QA blocks end-card replay buttons (`end-card-replay-button`), static/unshiny CTAs (`end-card-cta-static`), bare end cards (`end-card-too-basic`), non-fullscreen win particles (`end-card-particles-not-fullscreen`), and upscaled low-res end-card art (`end-card-hero-low-res`) automatically.
- **Keep screens light:** Stay at or under ~12 visible non-button words per screen; Creative QA flags duplicate copy (`duplicate-visible-copy`) and heavy text density (`text-clutter-heavy`) automatically.

## 1. Visual Hierarchy (One Clear Focal Point per State)
- **One primary action per screen:** On end cards and timeout cards, the primary Store CTA (`GROW YOUR FARM`, `LAUNCH NOW`, `INSTALL`, `PLAY NOW`) must be the **only** action button — highest contrast, filled/elevated face, generous tap target, with no competing secondary replay button.
- **Clear typographic scale:**
  - Headline / outcome title: bold, ≥ `1.5×` subtitle size, ≤ 3–4 words.
  - Supporting copy / subtitle: 1–2 short lines, readable at phone size (`>= 14 CSS px`), never a wall of text.
  - HUD counters (`0 / 3`, score, timer): compact, single-line, visually quieter than gameplay targets and CTAs.

## 2. Alignment, Shared Containers & Spacing Rhythm
- **Shared container math (never eyeball separate transforms):** Any title, subtitle, and Store CTA that visually sit inside a panel MUST share the same coordinate space / responsive layout transform as that panel. Never place buttons in a separate layout group with different `x` or `scaleX` offsets than their enclosing panel.
- **Strict horizontal centering:** Centered headings, framed text badges/pills (`pixelPanel: true` or HUD header boxes), and single-column buttons inside a panel must center their text (`align: 'center'`) and align to the panel or stage horizontal center (`<= 2 px` drift) in **every** orientation (portrait, landscape, small phone, tablet).
- **Generous inner panel breathing room (no bottom-hugging):**
  - Keep at least `16–24 px` inner padding from every panel border (top, bottom, left, right) in stage space, and never `< 10 CSS px` on the smallest supported screen.
  - Never let the lowest button sit flush against the bottom frame of a panel.
- **Vertical rhythm & Law of Proximity (8 px grid):**
  - Group tightly related items: Title → Subtitle gap = `8–12 px`.
  - Separate distinct functional blocks: Copy block → Primary Store CTA gap = `24–36 px`.
  - Balance vertical whitespace inside a panel so the top and bottom margins feel roughly symmetric—never leave a huge empty dark void above a cramped bottom button.

## 3. Responsive Multi-Screen Adaptation
Design for **four real viewport classes** simultaneously, not just one phone preview:
1. **Small portrait (`320×568`):** Tightest horizontal width; ensure text wraps cleanly without shrinking below legible size (`>= 12–14 CSS px`) and interactive buttons stay `>= 44×44 CSS px`.
2. **Modern tall portrait (`390×844`):** Primary gameplay and CTA sit comfortably in the lower-middle thumb zone; top HUD stays clear of notches and status bars.
3. **Tablet (`768×1024`):** Wider aspect ratio (3:4); avoid stretched HUD bars or oversized floating gaps.
4. **Landscape (`844×390`):** Reflow into a balanced **two-column composition** (e.g., world/preview left, puzzle or outcome card right). Avoid letterboxing a narrow portrait strip in the center of a wide screen whenever the game supports responsive layout.

## 4. Mobile Ergonomics & Ad-Network Safe Areas
- **Touch targets:** Every tappable button/tile must be at least **`44×44 CSS px`** at every supported viewport, with at least `12 px` separation between adjacent interactive targets.
- **Ad-SDK overlay clearance:** Keep interactive buttons, titles, and essential HUD counters completely outside ad-network overlay zones:
  - Top-right `56×56` (close `X` button)
  - Top-left `48×48` (mute / countdown badge)
  - Bottom-left `48×28` (ad-info / privacy icon)
- **Thumb reach:** Place primary interactive controls and CTAs in the natural lower-center (portrait) or right-side (landscape) thumb zone.

## 5. Color, Contrast & Surface Cohesion (60-30-10 Rule)
- **60% calm world / backdrop**, **30% structured UI surfaces** (panels, HUD pills, frames), **10% high-contrast accent** reserved strictly for interactive affordances, rewards, and the primary CTA.
- **Contrast floor:** Body/HUD text `>= 4.5:1` against its panel fill; large headings and primary CTA labels `>= 3:1` (prefer `>= 4.5:1`).
- **Surface consistency:** Match corner radius, border thickness, shadow offset, and font family across all panels and buttons in the same playable. Do not mix flat modern pills with sharp pixel frames in the same UI.

## 6. State Completeness & Clean Transitions
- **No empty panels:** Every outcome state (`opening`, `active`, `win`, `timeout/loss`, `end-card`) must display complete, intentional copy and visual hierarchy—never an empty dark card body.
- **No cross-scene bleed:** Floating score text, flashes, shakes, and tutorial hands from gameplay must clear cleanly on scene transitions and replay.
- **Immediate visual feedback:** Every button press needs a visible pressed state (depth/scale/fill response within `<= 150 ms`), and muted play must remain 100% understandable through visual cues alone.

## 7. Pre-Delivery Visual Self-Audit
Before presenting any playable or UI revision as complete, inspect rendered screenshots at `320×568`, `390×844`, `768×1024`, and `844×390` across `opening`, `end-card` (win), and `timeout` (loss):
1. Is the primary Store CTA the single focal action on the end card (with no Play Again / Replay button competing with it)?
2. Are all panel titles and buttons dead-center horizontally with comfortable top and bottom breathing room?
3. Is every label crisp, unwrapped-squish-free, and readable at `320×568`?
4. Are all ad-SDK corners clear of HUD and buttons?
5. Do both win and timeout cards look complete and balanced in both portrait and landscape?
