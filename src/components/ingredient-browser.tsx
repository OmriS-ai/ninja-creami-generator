import { useState } from 'react';
import { INGREDIENT_CATEGORIES } from '@/lib/constants';
import { getByCategory } from '@/lib/ingredients';
import type { IngredientCategory } from '@/lib/types';
import { IngredientCard } from './ingredient-card';

export function IngredientBrowser() {
  const [category, setCategory] = useState<IngredientCategory>('liquids');
  const ingredients = getByCategory(category);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
        Add Ingredients
      </h2>
      <div className="mb-3 flex gap-1 overflow-x-auto">
        {INGREDIENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as IngredientCategory)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              category === cat.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {ingredients.map((ing) => (
          <IngredientCard key={ing.id} ingredient={ing} />
        ))}
      </div>
    </section>
  );
}
