import { useState } from 'react';
import { useRecipeStore } from '@/store/recipe-store';
import { useSettingsStore } from '@/store/settings-store';
import { RECIPE_TYPES } from '@/lib/constants';
import { generateRecipe } from '@/lib/ai/generate-recipe';
import type { RecipeType } from '@/lib/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AiRecipeDialog({ open, onClose }: Props) {
  const recipeType = useRecipeStore((s) => s.recipeType);
  const loadRecipe = useRecipeStore((s) => s.loadRecipe);
  const apiKey = useSettingsStore((s) => s.apiKey);
  const setApiKey = useSettingsStore((s) => s.setApiKey);

  const [selectedType, setSelectedType] = useState<RecipeType>(recipeType);
  const [flavor, setFlavor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Anthropic API key first.');
      return;
    }
    if (!flavor.trim()) {
      setError('Please describe the flavor you want.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await generateRecipe(apiKey, selectedType, flavor);
      loadRecipe(selectedType, result.ingredients);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed. Check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            AI Recipe Generator
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Anthropic API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
            />
            <p className="mt-1 text-[10px] text-gray-400">
              Stored locally. Only sent to Anthropic's API.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Recipe Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as RecipeType)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
            >
              {RECIPE_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Flavor Description
            </label>
            <input
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              placeholder="e.g. chocolate peanut butter, strawberry cheesecake..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}
