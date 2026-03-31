import type { Ingredient, IngredientCategory } from './types';

interface RawIngredient {
  id: string;
  name: string;
  fatPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  caloriesPer100g: number;
  defaultAmount: number;
  notes: string;
  pac?: number;
  pod?: number;
}

const dairyLiquids: RawIngredient[] = [
  { id: 'skim_milk', name: 'Skim Milk', fatPer100g: 0.1, proteinPer100g: 3.4, carbsPer100g: 5.0, caloriesPer100g: 34, defaultAmount: 200, notes: 'Risk of powdery/icy texture without supplements' },
  { id: 'milk_1pct', name: '1% Milk', fatPer100g: 1.0, proteinPer100g: 3.4, carbsPer100g: 5.0, caloriesPer100g: 42, defaultAmount: 200, notes: 'Good for gelato bases' },
  { id: 'milk_2pct', name: '2% Milk', fatPer100g: 2.0, proteinPer100g: 3.4, carbsPer100g: 5.0, caloriesPer100g: 50, defaultAmount: 200, notes: 'Common for gelato' },
  { id: 'whole_milk', name: 'Whole Milk', fatPer100g: 3.25, proteinPer100g: 3.2, carbsPer100g: 4.8, caloriesPer100g: 61, defaultAmount: 350, notes: 'Baseline for most recipes' },
  { id: 'fairlife_2pct', name: 'Fairlife Ultra-Filtered 2%', fatPer100g: 2.5, proteinPer100g: 6.5, carbsPer100g: 3.0, caloriesPer100g: 52, defaultAmount: 350, notes: 'RECOMMENDED for Lite/Anabolic - high protein' },
  { id: 'half_and_half', name: 'Half-and-Half', fatPer100g: 10.0, proteinPer100g: 3.0, carbsPer100g: 4.3, caloriesPer100g: 130, defaultAmount: 200, notes: 'Good for gelato-style' },
  { id: 'whipping_cream', name: 'Whipping Cream (33-36%)', fatPer100g: 35.0, proteinPer100g: 2.1, carbsPer100g: 2.8, caloriesPer100g: 340, defaultAmount: 150, notes: 'Must dilute with milk' },
  { id: 'heavy_cream', name: 'Heavy Cream (36-40%)', fatPer100g: 36.0, proteinPer100g: 2.1, carbsPer100g: 2.8, caloriesPer100g: 340, defaultAmount: 150, notes: 'MUST dilute - buttering risk!' },
  { id: 'sweetened_condensed_milk', name: 'Sweetened Condensed Milk', fatPer100g: 9.0, proteinPer100g: 8.0, carbsPer100g: 54.0, caloriesPer100g: 321, defaultAmount: 100, notes: '3-in-1: Sweetener + FPD + MSNF' },
  { id: 'greek_yogurt', name: 'Greek Yogurt (Full Fat)', fatPer100g: 5.0, proteinPer100g: 9.0, carbsPer100g: 4.0, caloriesPer100g: 97, defaultAmount: 200, notes: 'Whisk first - use full-fat only' },
];

const plantBasedLiquids: RawIngredient[] = [
  { id: 'almond_milk', name: 'Almond Milk (Unsweetened)', fatPer100g: 1.1, proteinPer100g: 0.4, carbsPer100g: 0.3, caloriesPer100g: 13, defaultAmount: 100, notes: 'Top-off only - needs stabilizers' },
  { id: 'cashew_milk', name: 'Cashew Milk', fatPer100g: 2.0, proteinPer100g: 0.5, carbsPer100g: 1.0, caloriesPer100g: 25, defaultAmount: 300, notes: 'Best plant milk - naturally creamy' },
  { id: 'oat_milk', name: 'Oat Milk', fatPer100g: 1.5, proteinPer100g: 1.0, carbsPer100g: 7.0, caloriesPer100g: 45, defaultAmount: 300, notes: 'Good for Light bases' },
  { id: 'coconut_milk', name: 'Coconut Milk (Canned)', fatPer100g: 15.0, proteinPer100g: 1.6, carbsPer100g: 3.0, caloriesPer100g: 154, defaultAmount: 200, notes: 'Whisk first to homogenize' },
  { id: 'coconut_cream', name: 'Coconut Cream', fatPer100g: 21.0, proteinPer100g: 2.2, carbsPer100g: 4.0, caloriesPer100g: 197, defaultAmount: 200, notes: 'Vegan heavy cream substitute' },
];

const sweeteners: RawIngredient[] = [
  { id: 'sugar', name: 'Sugar (Sucrose)', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 100, caloriesPer100g: 387, pod: 1.0, pac: 1.0, defaultAmount: 100, notes: 'Baseline reference' },
  { id: 'dextrose', name: 'Dextrose (Glucose)', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 92, caloriesPer100g: 370, pod: 0.7, pac: 1.9, defaultAmount: 50, notes: '2x softening power' },
  { id: 'corn_syrup', name: 'Corn Syrup', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 78, caloriesPer100g: 286, pod: 0.45, pac: 1.5, defaultAmount: 30, notes: 'Prevents recrystallization' },
  { id: 'honey', name: 'Honey', fatPer100g: 0, proteinPer100g: 0.3, carbsPer100g: 82, caloriesPer100g: 304, pod: 1.3, pac: 1.6, defaultAmount: 60, notes: 'Unique silky texture' },
  { id: 'maple_syrup', name: 'Maple Syrup', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 67, caloriesPer100g: 260, pod: 0.9, pac: 1.3, defaultAmount: 60, notes: 'Distinct flavor' },
  { id: 'allulose', name: 'Allulose', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 0, caloriesPer100g: 20, pod: 0.7, pac: 1.9, defaultAmount: 80, notes: 'GOLD STANDARD for keto' },
  { id: 'erythritol', name: 'Erythritol', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 0, caloriesPer100g: 0, pod: 0.7, pac: 3.5, defaultAmount: 40, notes: 'Sandy texture risk - blend with Allulose' },
  { id: 'stevia_drops', name: 'Stevia Drops (liquid)', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 0, caloriesPer100g: 0, pod: 250, pac: 0, defaultAmount: 1, notes: 'Sweetness boost only - no FPD' },
  { id: 'monk_fruit', name: 'Monk Fruit Extract', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 0, caloriesPer100g: 0, pod: 175, pac: 0, defaultAmount: 2, notes: 'Sweetness boost only - no FPD' },
];

const fats: RawIngredient[] = [
  { id: 'cream_cheese', name: 'Cream Cheese', fatPer100g: 34.0, proteinPer100g: 6.0, carbsPer100g: 4.1, caloriesPer100g: 342, defaultAmount: 30, notes: 'Stabilizer - whisk with sugar first' },
  { id: 'egg_yolk', name: 'Egg Yolk (1 yolk = ~18g)', fatPer100g: 27.0, proteinPer100g: 16.0, carbsPer100g: 3.6, caloriesPer100g: 322, defaultAmount: 36, notes: 'Emulsifier - cook to 80\u00b0C for custard' },
  { id: 'butter', name: 'Butter (Unsalted)', fatPer100g: 81.0, proteinPer100g: 0.9, carbsPer100g: 0.1, caloriesPer100g: 717, defaultAmount: 15, notes: 'Use sparingly' },
  { id: 'coconut_oil', name: 'Coconut Oil (Refined)', fatPer100g: 100.0, proteinPer100g: 0, carbsPer100g: 0, caloriesPer100g: 862, defaultAmount: 15, notes: 'Stracciatella method' },
  { id: 'almond_butter', name: 'Almond Butter', fatPer100g: 56.0, proteinPer100g: 21.0, carbsPer100g: 19.0, caloriesPer100g: 614, defaultAmount: 30, notes: 'Gelato-like texture' },
  { id: 'peanut_butter', name: 'Peanut Butter (Natural)', fatPer100g: 50.0, proteinPer100g: 25.0, carbsPer100g: 20.0, caloriesPer100g: 588, defaultAmount: 45, notes: 'Fat and protein source' },
  { id: 'pistachio_butter', name: 'Pistachio Butter', fatPer100g: 45.0, proteinPer100g: 20.0, carbsPer100g: 28.0, caloriesPer100g: 560, defaultAmount: 40, notes: 'Premium gelato ingredient' },
];

const proteins: RawIngredient[] = [
  { id: 'whey_casein_blend', name: 'Whey/Casein Blend Protein', fatPer100g: 3.5, proteinPer100g: 80.0, carbsPer100g: 6.0, caloriesPer100g: 390, defaultAmount: 50, notes: 'OPTIMAL for Creami' },
  { id: 'casein_protein', name: 'Casein Protein', fatPer100g: 1.5, proteinPer100g: 85.0, carbsPer100g: 4.0, caloriesPer100g: 370, defaultAmount: 40, notes: 'Best texture - natural stabilizer' },
  { id: 'whey_isolate', name: 'Whey Protein Isolate', fatPer100g: 1.0, proteinPer100g: 90.0, carbsPer100g: 2.0, caloriesPer100g: 380, defaultAmount: 40, notes: 'NOT recommended alone' },
  { id: 'skim_milk_powder', name: 'Skim Milk Powder', fatPer100g: 1.0, proteinPer100g: 36.0, carbsPer100g: 52.0, caloriesPer100g: 362, defaultAmount: 40, notes: 'Boosts MSNF - neutral flavor' },
  { id: 'collagen', name: 'Collagen Peptides', fatPer100g: 0, proteinPer100g: 90.0, carbsPer100g: 0, caloriesPer100g: 360, defaultAmount: 20, notes: 'Adds protein, less structure' },
];

const stabilizers: RawIngredient[] = [
  { id: 'xanthan_gum', name: 'Xanthan Gum', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 80, caloriesPer100g: 320, defaultAmount: 0.4, notes: 'Essential for lite - dry blend with sugar' },
  { id: 'guar_gum', name: 'Guar Gum', fatPer100g: 0, proteinPer100g: 5, carbsPer100g: 80, caloriesPer100g: 340, defaultAmount: 0.4, notes: 'Creamy texture - not acid-resistant' },
  { id: 'locust_bean_gum', name: 'Locust Bean Gum', fatPer100g: 0, proteinPer100g: 5, carbsPer100g: 75, caloriesPer100g: 320, defaultAmount: 0.4, notes: 'Requires heat (80\u00b0C)' },
  { id: 'gelatin', name: 'Gelatin (Unflavored)', fatPer100g: 0, proteinPer100g: 85, carbsPer100g: 0, caloriesPer100g: 340, defaultAmount: 3, notes: 'Clean label - needs heat (50\u00b0C)' },
  { id: 'instant_pudding', name: 'SF Instant Pudding Mix', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 90, caloriesPer100g: 360, defaultAmount: 10, notes: 'Beginner-friendly stabilizer' },
  { id: 'inulin', name: 'Inulin (Chicory Fiber)', fatPer100g: 0, proteinPer100g: 0, carbsPer100g: 90, caloriesPer100g: 150, defaultAmount: 15, notes: 'Fat replacer, bulking agent' },
];

function tagCategory(items: RawIngredient[], category: IngredientCategory): Ingredient[] {
  return items.map((item) => ({ ...item, category }));
}

const allIngredients: Ingredient[] = [
  ...tagCategory(dairyLiquids, 'liquids'),
  ...tagCategory(plantBasedLiquids, 'liquids'),
  ...tagCategory(sweeteners, 'sweeteners'),
  ...tagCategory(fats, 'fats'),
  ...tagCategory(proteins, 'proteins'),
  ...tagCategory(stabilizers, 'stabilizers'),
];

export function getAllIngredients(): Ingredient[] {
  return allIngredients;
}

export function getByCategory(category: IngredientCategory): Ingredient[] {
  return allIngredients.filter((ing) => ing.category === category);
}

export function getById(id: string): Ingredient | undefined {
  return allIngredients.find((ing) => ing.id === id);
}
