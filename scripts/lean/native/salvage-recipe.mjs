const treatments=Object.freeze({
 turbo:Object.freeze({revealFrom:.82,revealSeconds:.42,easing:'back-out',particles:56,speed:210,lifetime:1,shakeIntensity:7,gain:.38}),
 nova:Object.freeze({revealFrom:.68,revealSeconds:.68,easing:'ease-out',particles:72,speed:165,lifetime:1.35,shakeIntensity:5,gain:.34}),
});
const variants=Object.freeze(Object.keys(treatments).sort());

export const salvageRecipeId='salvage-reward-1';
export const salvageRecipeVariants=Object.freeze([...variants,'seeded']);

export function salvageRecipe(plan){
 const requested=plan.rewardRecipe?.variant;
 const variant=requested==='seeded'?variants[plan.seed%variants.length]:requested??'turbo';
 return {
  treatment:treatments[variant],
  ...(requested?{receipt:{
   id:salvageRecipeId,variant,seed:plan.seed,reviewStatus:'pending',audioRoles:{...plan.audio},
   scenarios:['opening','first-catch','meteor-hit','timeout','third-catch','replay'],
  }}:{}),
 };
}
