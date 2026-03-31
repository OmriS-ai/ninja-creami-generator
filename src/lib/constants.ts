import type { ProgramInfo, RecipeType } from './types';

export const TUB_CAPACITY_ML = 709;
export const TUB_CAPACITY_G = 709;
export const DEFAULT_SERVINGS = 4;

export const RECIPE_TYPES: { id: RecipeType; label: string; icon: string; description: string }[] = [
  { id: 'ice_cream', label: 'Ice Cream', icon: '🍦', description: 'Classic rich & creamy' },
  { id: 'lite_ice_cream', label: 'Lite / Protein', icon: '💪', description: 'Low-fat, high-protein' },
  { id: 'gelato', label: 'Gelato', icon: '🇮🇹', description: 'Dense Italian-style' },
  { id: 'sorbet', label: 'Sorbet', icon: '🍋', description: 'Fruit-based, dairy-free' },
  { id: 'keto', label: 'Keto', icon: '🥑', description: 'Low-carb, sugar-free' },
  { id: 'vegan', label: 'Vegan', icon: '🌱', description: 'Plant-based' },
  { id: 'frozen_yogurt', label: 'Frozen Yogurt', icon: '🥛', description: 'Tangy & light' },
];

export const PROGRAMS: Record<string, ProgramInfo> = {
  'ICE CREAM': {
    icon: '🍦',
    desc: 'Standard program for high-fat, high-sugar recipes',
    tips: [
      'Freeze for 24 hours minimum',
      'Level any hump before processing',
      'Process once - limit re-spins on high-fat bases',
    ],
  },
  'LITE ICE CREAM': {
    icon: '💪',
    desc: 'High RPM for low-fat, low-sugar, or protein bases',
    tips: [
      'Freeze for 24 hours minimum',
      'Expect powdery texture on first spin',
      'Add 1 tbsp liquid + RE-SPIN if crumbly',
      'Stabilizers required for best results',
    ],
  },
  'GELATO': {
    icon: '🇮🇹',
    desc: 'Slow spin for dense, Italian-style with low overrun',
    tips: [
      'Freeze for 24 hours minimum',
      'Cook custard bases to 80°C',
      'Results in dense, fudgy texture',
    ],
  },
  'SORBET': {
    icon: '🍋',
    desc: 'For fruit-based, high-sugar recipes (20-30% sugar)',
    tips: [
      'Blend fruit before freezing',
      'Ensure 20-30% sugar concentration',
      'Canned fruit in syrup works great',
    ],
  },
  'FROZEN YOGURT': {
    icon: '🥛',
    desc: 'For fermented dairy bases',
    tips: [
      'Use full-fat yogurt with added sugar',
      'Non-fat yogurt freezes too hard',
      'Whisk yogurt to remove lumps first',
    ],
  },
};

export const INGREDIENT_CATEGORIES: { id: string; label: string }[] = [
  { id: 'liquids', label: 'Liquids' },
  { id: 'sweeteners', label: 'Sweeteners' },
  { id: 'fats', label: 'Fats' },
  { id: 'proteins', label: 'Proteins' },
  { id: 'stabilizers', label: 'Stabilizers' },
];
