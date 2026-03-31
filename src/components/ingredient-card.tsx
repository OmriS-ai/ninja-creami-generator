import type { Ingredient } from '@/lib/types';
import { useRecipeStore } from '@/store/recipe-store';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const addIngredient = useRecipeStore((s) => s.addIngredient);

  const stats: string[] = [];
  if (ingredient.fatPer100g > 0) stats.push(`F:${ingredient.fatPer100g}%`);
  if (ingredient.proteinPer100g > 0) stats.push(`P:${ingredient.proteinPer100g}%`);
  if (ingredient.carbsPer100g > 0) stats.push(`C:${ingredient.carbsPer100g}%`);
  if (ingredient.pac) stats.push(`PAC:${ingredient.pac}`);

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-colors hover:border-gray-300">
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-800">
          {ingredient.name}
        </div>
        <div className="mt-0.5 text-xs text-gray-400">{stats.join(' \u00b7 ')}</div>
      </div>
      <button
        onClick={() => addIngredient(ingredient.id)}
        className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-colors hover:bg-indigo-100"
        aria-label={`Add ${ingredient.name}`}
      >
        +
      </button>
    </div>
  );
}
