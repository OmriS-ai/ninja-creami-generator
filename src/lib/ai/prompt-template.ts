import { getAllIngredients } from '@/lib/ingredients';
import { recipeTemplates } from '@/lib/templates';
import type { RecipeType } from '@/lib/types';

export function buildSystemPrompt(): string {
  const ingredients = getAllIngredients();
  const ingredientList = ingredients
    .map(
      (ing) =>
        `- id:"${ing.id}" name:"${ing.name}" cat:${ing.category} F:${ing.fatPer100g} P:${ing.proteinPer100g} C:${ing.carbsPer100g} cal:${ing.caloriesPer100g}/100g default:${ing.defaultAmount}g${ing.pac !== undefined ? ` PAC:${ing.pac}` : ''}${ing.pod !== undefined ? ` POD:${ing.pod}` : ''}`,
    )
    .join('\n');

  return `You are a Ninja Creami Deluxe NC501 recipe formulator. You create frozen dessert recipes using ONLY the ingredients listed below.

## Available Ingredients
${ingredientList}

## Safety Rules
- Total weight MUST be <= 709g (tub capacity)
- Fat MUST be <= 16% (buttering risk above this)
- Total solids (fat + carbs + protein as % of total weight) should be 31-40%
- For sorbet: sugar must be 20-30%
- Use ingredient IDs exactly as listed

## Output Format
Respond with ONLY a JSON object, no other text:
{"ingredients": [{"id": "<ingredient_id>", "amount": <grams>}], "notes": "<brief description>"}`;
}

export function buildUserPrompt(recipeType: RecipeType, flavor: string): string {
  const template = recipeTemplates[recipeType];
  return `Create a ${template.name} recipe with flavor: ${flavor}

Target ranges for ${template.name}:
- Fat: ${template.targetRanges.fatMin}-${template.targetRanges.fatMax}%
- Sugar: ${template.targetRanges.sugarMin}-${template.targetRanges.sugarMax}%
- Protein: ${template.targetRanges.proteinMin}-${template.targetRanges.proteinMax}%
- Solids: ${template.targetRanges.solidsMin}-${template.targetRanges.solidsMax}%
${template.stabilizerRequired ? '- Stabilizer is REQUIRED for this recipe type' : ''}
Notes: ${template.notes}`;
}
