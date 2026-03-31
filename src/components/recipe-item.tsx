import type { RecipeItem as RecipeItemType } from '@/lib/types';
import { useRecipeStore } from '@/store/recipe-store';

interface RecipeItemProps {
  item: RecipeItemType;
}

export function RecipeItem({ item }: RecipeItemProps) {
  const updateAmount = useRecipeStore((s) => s.updateAmount);
  const removeIngredient = useRecipeStore((s) => s.removeIngredient);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
      <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
        {item.ingredient.name}
      </span>
      <div className="flex shrink-0 items-center gap-1">
        <input
          type="number"
          value={item.amount}
          min={0}
          step={item.ingredient.defaultAmount < 1 ? 0.1 : 10}
          onChange={(e) =>
            updateAmount(item.ingredient.id, parseFloat(e.target.value) || 0)
          }
          className="w-16 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-right text-sm tabular-nums text-gray-700 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
        />
        <span className="text-xs text-gray-400">g</span>
      </div>
      <button
        onClick={() => removeIngredient(item.ingredient.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        aria-label={`Remove ${item.ingredient.name}`}
      >
        &times;
      </button>
    </div>
  );
}
