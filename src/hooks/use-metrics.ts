import { useMemo } from 'react';
import { useRecipeStore } from '@/store/recipe-store';
import { calculateAllMetrics } from '@/lib/calculator';
import type { RecipeMetrics } from '@/lib/types';

export function useMetrics(): RecipeMetrics | null {
  const recipe = useRecipeStore((s) => s.recipe);
  const recipeType = useRecipeStore((s) => s.recipeType);

  return useMemo(() => {
    if (recipe.length === 0) return null;
    return calculateAllMetrics(recipe, recipeType);
  }, [recipe, recipeType]);
}
