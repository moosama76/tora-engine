const treatments = Object.freeze({
  crisp: Object.freeze({ revealFrom: .85, revealSeconds: .5, easing: 'back-out', particles: 64, speed: 180, lifetime: 1.2, gain: .38 }),
  bloom: Object.freeze({ revealFrom: .72, revealSeconds: .72, easing: 'ease-out', particles: 48, speed: 140, lifetime: 1.4, gain: .34 }),
});
const variants = Object.freeze(Object.keys(treatments).sort());

export const harvestRecipeId = 'harvest-reward-1';
export const harvestRecipeVariants = Object.freeze([...variants, 'seeded']);

export function harvestRecipe(plan) {
  const requested = plan.rewardRecipe?.variant;
  const variant = requested === 'seeded' ? variants[plan.seed % variants.length] : requested ?? 'crisp';
  return {
    treatment: treatments[variant],
    ...(requested ? { receipt: {
      id: harvestRecipeId, variant, seed: plan.seed,
      reviewStatus: 'pending', audioRoles: { ...plan.audio },
      scenarios: ['opening', 'first-harvest', 'invalid-swap', 'timeout', 'third-harvest', 'replay'],
    } } : {}),
  };
}
