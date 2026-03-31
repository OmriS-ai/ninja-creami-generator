import { useRef } from 'react';
import { useSavedRecipesStore } from '@/store/saved-recipes-store';
import { useRecipeStore } from '@/store/recipe-store';
import { RECIPE_TYPES } from '@/lib/constants';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SavedRecipesDrawer({ open, onClose }: Props) {
  const recipes = useSavedRecipesStore((s) => s.recipes);
  const deleteRecipe = useSavedRecipesStore((s) => s.deleteRecipe);
  const exportAll = useSavedRecipesStore((s) => s.exportAll);
  const importAll = useSavedRecipesStore((s) => s.importAll);
  const loadRecipe = useRecipeStore((s) => s.loadRecipe);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleLoad = (recipe: (typeof recipes)[0]) => {
    loadRecipe(recipe.recipeType, recipe.ingredients);
    onClose();
  };

  const handleExport = () => {
    const data = exportAll();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'creami-recipes.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        importAll(reader.result);
      }
    };
    reader.readAsText(file);
  };

  const getTypeLabel = (id: string) =>
    RECIPE_TYPES.find((t) => t.id === id)?.label ?? id;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-semibold text-gray-900">My Recipes</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {recipes.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No saved recipes yet.
            </div>
          ) : (
            <div className="space-y-2">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {recipe.name}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400">
                        {getTypeLabel(recipe.recipeType)} &middot;{' '}
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleLoad(recipe)}
                      className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="rounded-md px-2.5 py-1 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-3 flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Export JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
