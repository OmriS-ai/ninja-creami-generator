import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RecipeType, SavedRecipe } from '@/lib/types';

interface SavedRecipesState {
  recipes: SavedRecipe[];
  saveRecipe: (name: string, recipeType: RecipeType, ingredients: { ingredientId: string; amount: number }[], notes?: string) => void;
  deleteRecipe: (id: string) => void;
  exportAll: () => string;
  importAll: (json: string) => boolean;
}

export const useSavedRecipesStore = create<SavedRecipesState>()(
  persist(
    (set, get) => ({
      recipes: [],

      saveRecipe: (name, recipeType, ingredients, notes) =>
        set((state) => ({
          recipes: [
            {
              id: crypto.randomUUID(),
              name,
              recipeType,
              ingredients,
              createdAt: new Date().toISOString(),
              notes,
            },
            ...state.recipes,
          ],
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => r.id !== id),
        })),

      exportAll: () => JSON.stringify(get().recipes, null, 2),

      importAll: (json) => {
        try {
          const parsed = JSON.parse(json) as SavedRecipe[];
          if (!Array.isArray(parsed)) return false;
          set({ recipes: parsed });
          return true;
        } catch {
          return false;
        }
      },
    }),
    { name: 'creami-saved-recipes' },
  ),
);
