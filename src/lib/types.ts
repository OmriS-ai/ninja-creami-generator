export type RecipeType =
  | 'ice_cream'
  | 'lite_ice_cream'
  | 'gelato'
  | 'sorbet'
  | 'frozen_yogurt'
  | 'keto'
  | 'vegan';

export type IngredientCategory =
  | 'liquids'
  | 'sweeteners'
  | 'fats'
  | 'proteins'
  | 'stabilizers';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  fatPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  caloriesPer100g: number;
  defaultAmount: number;
  notes: string;
  pac?: number;
  pod?: number;
}

export interface RecipeItem {
  ingredient: Ingredient;
  amount: number;
}

export interface Warning {
  type: 'danger' | 'warning' | 'info';
  message: string;
  fix: string;
}

export interface RecipeMetrics {
  fatPercentage: number;
  sugarPercentage: number;
  proteinPercentage: number;
  totalSolids: number;
  totalCalories: number;
  caloriesPerServing: number;
  totalWeight: number;
  fpd: number;
  sweetness: number;
  recipeType: RecipeType;
  warnings: Warning[];
  recommendations: string[];
  suggestedProgram: string;
}

export interface RecipeTemplate {
  name: string;
  program: string;
  targetRanges: {
    fatMin: number;
    fatMax: number;
    sugarMin: number;
    sugarMax: number;
    solidsMin: number;
    solidsMax: number;
    proteinMin: number;
    proteinMax: number;
  };
  stabilizerRequired: boolean;
  notes: string;
}

export interface ProgramInfo {
  icon: string;
  desc: string;
  tips: string[];
}

export interface SavedRecipe {
  id: string;
  name: string;
  recipeType: RecipeType;
  ingredients: { ingredientId: string; amount: number }[];
  createdAt: string;
  notes?: string;
}
