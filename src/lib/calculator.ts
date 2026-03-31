import type { RecipeItem, RecipeMetrics, RecipeType, Warning } from './types';

const TUB_CAPACITY_G = 709;

export function calculateFatPercentage(ingredients: RecipeItem[]): number {
  let totalFat = 0;
  let totalWeight = 0;

  for (const item of ingredients) {
    const fatPer100g = item.ingredient.fatPer100g || 0;
    totalFat += (item.amount / 100) * fatPer100g;
    totalWeight += item.amount;
  }

  return totalWeight > 0 ? (totalFat / totalWeight) * 100 : 0;
}

export function calculateSugarPercentage(ingredients: RecipeItem[]): number {
  let totalSugar = 0;
  let totalWeight = 0;

  for (const item of ingredients) {
    const carbsPer100g = item.ingredient.carbsPer100g || 0;
    totalSugar += (item.amount / 100) * carbsPer100g;
    totalWeight += item.amount;
  }

  return totalWeight > 0 ? (totalSugar / totalWeight) * 100 : 0;
}

export function calculateProteinPercentage(ingredients: RecipeItem[]): number {
  let totalProtein = 0;
  let totalWeight = 0;

  for (const item of ingredients) {
    const proteinPer100g = item.ingredient.proteinPer100g || 0;
    totalProtein += (item.amount / 100) * proteinPer100g;
    totalWeight += item.amount;
  }

  return totalWeight > 0 ? (totalProtein / totalWeight) * 100 : 0;
}

export function calculateTotalSolids(ingredients: RecipeItem[]): number {
  let totalSolids = 0;
  let totalWeight = 0;

  for (const item of ingredients) {
    const solidsPer100g =
      (item.ingredient.fatPer100g || 0) +
      (item.ingredient.carbsPer100g || 0) +
      (item.ingredient.proteinPer100g || 0);
    totalSolids += (item.amount / 100) * solidsPer100g;
    totalWeight += item.amount;
  }

  return totalWeight > 0 ? (totalSolids / totalWeight) * 100 : 0;
}

export function calculateFPD(ingredients: RecipeItem[]): number {
  let totalFPD = 0;

  for (const item of ingredients) {
    const pac = item.ingredient.pac || 0;
    totalFPD += item.amount * pac;
  }

  return totalFPD;
}

export function calculateSweetness(ingredients: RecipeItem[]): number {
  let totalSweetness = 0;

  for (const item of ingredients) {
    const pod = item.ingredient.pod || 0;
    totalSweetness += item.amount * pod;
  }

  return totalSweetness;
}

export function calculateCalories(ingredients: RecipeItem[]): number {
  let totalCalories = 0;

  for (const item of ingredients) {
    const caloriesPer100g = item.ingredient.caloriesPer100g || 0;
    totalCalories += (item.amount / 100) * caloriesPer100g;
  }

  return Math.round(totalCalories);
}

export function calculateCaloriesPerServing(totalCalories: number, servings = 4): number {
  return Math.round(totalCalories / servings);
}

export function calculateTotalWeight(ingredients: RecipeItem[]): number {
  return ingredients.reduce((sum, item) => sum + item.amount, 0);
}

interface ValidationResult {
  warnings: Warning[];
  recommendations: string[];
}

export function validateRecipe(metrics: {
  fatPercentage: number;
  sugarPercentage: number;
  proteinPercentage: number;
  totalSolids: number;
  totalWeight: number;
  recipeType: RecipeType;
}): ValidationResult {
  const warnings: Warning[] = [];
  const recommendations: string[] = [];

  if (metrics.fatPercentage > 16) {
    warnings.push({
      type: 'danger',
      message: `Fat at ${metrics.fatPercentage.toFixed(1)}% - HIGH BUTTERING RISK!`,
      fix: 'Dilute cream with milk (1:1 ratio)',
    });
  } else if (metrics.fatPercentage > 15) {
    warnings.push({
      type: 'warning',
      message: `Fat at ${metrics.fatPercentage.toFixed(1)}% - approaching danger zone`,
      fix: 'Consider reducing cream or adding more milk',
    });
  }

  if (metrics.totalSolids < 31) {
    warnings.push({
      type: 'danger',
      message: `Solids at ${metrics.totalSolids.toFixed(1)}% - ICY TEXTURE likely`,
      fix: 'Add protein powder, skim milk powder, or stabilizers',
    });
  } else if (metrics.totalSolids < 36) {
    warnings.push({
      type: 'warning',
      message: `Solids at ${metrics.totalSolids.toFixed(1)}% - may feel cold/icy`,
      fix: 'Consider adding more solids for creamier texture',
    });
  }

  if (metrics.recipeType === 'sorbet' && metrics.sugarPercentage < 20) {
    warnings.push({
      type: 'danger',
      message: `Sugar at ${metrics.sugarPercentage.toFixed(1)}% - too low for sorbet`,
      fix: 'Sorbet requires 20-30% sugar concentration',
    });
  }

  if (metrics.totalWeight > TUB_CAPACITY_G) {
    warnings.push({
      type: 'danger',
      message: `Volume exceeds tub capacity (${metrics.totalWeight}g > 709ml)`,
      fix: 'Reduce quantities - liquid expands 9% when frozen',
    });
  } else if (metrics.totalWeight > 680) {
    warnings.push({
      type: 'warning',
      message: `Volume near maximum (${metrics.totalWeight}g)`,
      fix: 'Leave room for expansion during freezing',
    });
  }

  if (metrics.fatPercentage < 5 && metrics.sugarPercentage < 15) {
    recommendations.push('Use LITE ICE CREAM mode (higher RPM for hard blocks)');
    recommendations.push('Expect to RE-SPIN with 1 tbsp liquid');
  }

  if (metrics.fatPercentage >= 10 && metrics.sugarPercentage >= 15) {
    recommendations.push('Use standard ICE CREAM mode');
  }

  return { warnings, recommendations };
}

export function suggestProgram(metrics: {
  fatPercentage: number;
  sugarPercentage: number;
  proteinPercentage: number;
}): string {
  const { fatPercentage, sugarPercentage, proteinPercentage } = metrics;

  if (fatPercentage < 5 && proteinPercentage > 8) {
    return 'LITE ICE CREAM';
  }

  if (fatPercentage === 0 && sugarPercentage >= 20) {
    return 'SORBET';
  }

  if (fatPercentage >= 5 && fatPercentage <= 8 && sugarPercentage >= 18) {
    return 'GELATO';
  }

  if (fatPercentage >= 10 && fatPercentage <= 15) {
    return 'ICE CREAM';
  }

  if (fatPercentage < 10 || sugarPercentage < 15) {
    return 'LITE ICE CREAM';
  }

  return 'ICE CREAM';
}

export function calculateAllMetrics(
  ingredients: RecipeItem[],
  recipeType: RecipeType = 'ice_cream',
): RecipeMetrics {
  const fatPercentage = calculateFatPercentage(ingredients);
  const sugarPercentage = calculateSugarPercentage(ingredients);
  const proteinPercentage = calculateProteinPercentage(ingredients);
  const totalSolids = calculateTotalSolids(ingredients);
  const totalCalories = calculateCalories(ingredients);
  const totalWeight = calculateTotalWeight(ingredients);

  const sweeteners = ingredients.filter((item) => item.ingredient.pac !== undefined);
  const fpd = calculateFPD(sweeteners);
  const sweetness = calculateSweetness(sweeteners);

  const baseMetrics = {
    fatPercentage,
    sugarPercentage,
    proteinPercentage,
    totalSolids,
    totalWeight,
    recipeType,
  };

  const validation = validateRecipe(baseMetrics);
  const suggestedProgram = suggestProgram(baseMetrics);

  return {
    ...baseMetrics,
    totalCalories,
    caloriesPerServing: calculateCaloriesPerServing(totalCalories),
    fpd,
    sweetness,
    ...validation,
    suggestedProgram,
  };
}
