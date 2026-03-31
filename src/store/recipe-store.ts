import { create } from 'zustand';
import type { Ingredient, RecipeItem, RecipeType } from '@/lib/types';
import { getAllIngredients } from '@/lib/ingredients';

interface RecipeState {
  recipeType: RecipeType;
  recipe: RecipeItem[];
  setRecipeType: (type: RecipeType) => void;
  addIngredient: (id: string) => void;
  removeIngredient: (id: string) => void;
  updateAmount: (id: string, amount: number) => void;
  clearRecipe: () => void;
  loadRecipe: (recipeType: RecipeType, items: { ingredientId: string; amount: number }[]) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipeType: 'ice_cream',
  recipe: [],

  setRecipeType: (type) => set({ recipeType: type }),

  addIngredient: (id) =>
    set((state) => {
      const existing = state.recipe.find((item) => item.ingredient.id === id);
      if (existing) {
        return {
          recipe: state.recipe.map((item) =>
            item.ingredient.id === id
              ? { ...item, amount: item.amount + item.ingredient.defaultAmount }
              : item,
          ),
        };
      }

      const allIngredients = getAllIngredients();
      const ingredient = allIngredients.find((ing: Ingredient) => ing.id === id);
      if (!ingredient) return state;

      return {
        recipe: [...state.recipe, { ingredient, amount: ingredient.defaultAmount }],
      };
    }),

  removeIngredient: (id) =>
    set((state) => ({
      recipe: state.recipe.filter((item) => item.ingredient.id !== id),
    })),

  updateAmount: (id, amount) =>
    set((state) => ({
      recipe: state.recipe.map((item) =>
        item.ingredient.id === id ? { ...item, amount } : item,
      ),
    })),

  clearRecipe: () => set({ recipe: [] }),

  loadRecipe: (recipeType, items) =>
    set(() => {
      const allIngredients = getAllIngredients();
      const recipe: RecipeItem[] = [];
      for (const item of items) {
        const ingredient = allIngredients.find((ing: Ingredient) => ing.id === item.ingredientId);
        if (ingredient) {
          recipe.push({ ingredient, amount: item.amount });
        }
      }
      return { recipeType, recipe };
    }),
}));
