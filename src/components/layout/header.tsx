import { useState } from 'react';
import { SavedRecipesDrawer } from '@/components/saved-recipes-drawer';
import { AiRecipeDialog } from '@/components/ai-recipe-dialog';

export function Header() {
  const [savedOpen, setSavedOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Ninja Creami
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              Deluxe NC501 Recipe Builder
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAiOpen(true)}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 sm:text-sm"
            >
              AI Generate
            </button>
            <button
              onClick={() => setSavedOpen(true)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
            >
              My Recipes
            </button>
          </div>
        </div>
      </header>
      <SavedRecipesDrawer open={savedOpen} onClose={() => setSavedOpen(false)} />
      <AiRecipeDialog open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}
