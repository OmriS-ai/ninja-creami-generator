import { useState } from 'react';
import { useRecipeStore } from '@/store/recipe-store';
import { useSavedRecipesStore } from '@/store/saved-recipes-store';
import { useMetrics } from '@/hooks/use-metrics';
import { RecipeItem } from './recipe-item';
import { TUB_CAPACITY_G } from '@/lib/constants';

export function RecipeEditor() {
  const recipe = useRecipeStore((s) => s.recipe);
  const recipeType = useRecipeStore((s) => s.recipeType);
  const clearRecipe = useRecipeStore((s) => s.clearRecipe);
  const saveRecipe = useSavedRecipesStore((s) => s.saveRecipe);
  const metrics = useMetrics();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');

  const totalWeight = metrics?.totalWeight ?? 0;
  const weightPercent = Math.min((totalWeight / TUB_CAPACITY_G) * 100, 100);

  const handleSave = () => {
    if (!name.trim() || recipe.length === 0) return;
    saveRecipe(
      name.trim(),
      recipeType,
      recipe.map((r) => ({ ingredientId: r.ingredient.id, amount: r.amount })),
    );
    setName('');
    setSaving(false);
  };

  if (recipe.length === 0) {
    return (
      <section>
        <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
          Your Recipe
        </h2>
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-gray-400">
          No ingredients added yet. Select ingredients above to begin.
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Your Recipe
        </h2>
        <div className="flex gap-2">
          {!saving && (
            <button
              onClick={() => setSaving(true)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Save
            </button>
          )}
          <button
            onClick={clearRecipe}
            className="text-xs font-medium text-gray-400 hover:text-red-500"
          >
            Clear
          </button>
        </div>
      </div>

      {saving && (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="Recipe name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={() => setSaving(false)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        {recipe.map((item) => (
          <RecipeItem key={item.ingredient.id} item={item} />
        ))}
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Total weight</span>
          <span className={totalWeight > TUB_CAPACITY_G ? 'font-medium text-red-500' : ''}>
            {totalWeight.toFixed(0)}g / {TUB_CAPACITY_G}ml
          </span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              totalWeight > TUB_CAPACITY_G ? 'bg-red-500' : totalWeight > 680 ? 'bg-amber-400' : 'bg-indigo-500'
            }`}
            style={{ width: `${weightPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
