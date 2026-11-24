# Playable Ad Creative & Audio Quality Brief

Every playable ad authored in Tora must feel like a cohesive, polished, rewarding mini-game **on its first generation**, not only after multiple refinement passes.

## 1. Cohesive Art Direction
- Establish a single visual direction before implementation: theme, palette, materials, lighting, shapes, typography, UI, and effects.
- **All elements must belong to the same visual world.** UI, buttons, particles, animations, backgrounds, and rewards must match the game's art style and quality.
- Use real studio uploads or verified commercial-use third-party assets (e.g., CC0 libraries with recorded license, author, source URL, and file hashes). Keep visual assets within one style family; audio may use a separate compatible pack. Never use AI-generated artwork or synthesized placeholder audio.
- Avoid generic UI, mismatched assets, default-looking effects, inconsistent rendering quality, and disconnected visual themes.
- Maintain a consistent standard of polish across gameplay, menus, transitions, and the end card.

## 2. Sound, Music & Visual Effects
- Include appropriate background music, responsive sound effects, and visual effects as part of the initial implementation.
- Every meaningful interaction should have satisfying, synchronized audio-visual feedback.
- Use layered effects where appropriate: anticipation, impact, particles, animation, screen response, and sound.
- Sound must respect ad-network restrictions, including muted startup until user interaction, and the experience must remain satisfying without audio.

## 3. Visual Reward & Game Feel
- **Visual reward is a primary design objective, not decoration.** The player should repeatedly experience satisfying moments throughout the ad.
- Make successful actions visibly rewarding through impactful reactions, satisfying motion, progression, escalating feedback, and celebratory effects.
- Give major successes noticeably stronger feedback than ordinary actions, creating a clear hierarchy of rewards.
- Prioritize immediate responsiveness, appealing transitions, anticipation, impact, and a compelling payoff.
- Never leave successful interactions feeling visually or emotionally flat.

## 4. First-Pass Quality Gate & Honest Verification
Before considering a playable complete, evaluate real rendered screenshots and footage:
- **Cohesion:** Does every visual element match the game's art direction and quality?
- **Feedback:** Do important interactions have synchronized sound, animation, and visual effects?
- **Reward:** Does gameplay consistently deliver satisfying visual payoffs?
- **Experience:** Does the ad feel polished, responsive, engaging, and rewarding from beginning to end across portrait and landscape viewports?

**If any answer is no, improve the implementation before delivery. Functionally correct but visually inconsistent, silent, or unrewarding playables are incomplete.**

Always distinguish engineering verification (tests, static checks, mock-host QA) from human visual sign-off, physical-device testing, and official ad-network acceptance.
