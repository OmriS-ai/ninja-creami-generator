import { useRecipeStore } from '@/store/recipe-store';
import { RECIPE_TYPES } from '@/lib/constants';

export function RecipeTypeSelector() {
  const recipeType = useRecipeStore((s) => s.recipeType);
  const setRecipeType = useRecipeStore((s) => s.setRecipeType);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
        Recipe Type
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {RECIPE_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setRecipeType(type.id)}
            className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-all ${
              recipeType === type.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{type.icon}</span>
            <span className="text-xs font-medium leading-tight">{type.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
