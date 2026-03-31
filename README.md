# Ninja Creami Deluxe Recipe Generator

Interactive recipe builder for the Ninja Creami Deluxe NC501 with real-time formulation feedback, save/load recipes, and AI-powered recipe generation.

**Live:** https://omris-ai.github.io/ninja-creami-generator

## Features

- **Recipe Type Selection**: Ice Cream, Lite/Protein, Gelato, Sorbet, Frozen Yogurt, Keto, Vegan
- **Comprehensive Ingredient Database**: 50+ ingredients across liquids, sweeteners, fats, proteins, and stabilizers
- **Real-time Calculations**: Fat %, sugar %, protein %, total solids, FPD, calories per serving
- **Smart Warnings**: Alerts for buttering risk, icy texture, capacity overflow
- **Program Recommendations**: Suggests optimal Creami program based on composition
- **Save & Load Recipes**: Persist recipes in localStorage with JSON export/import
- **AI Recipe Generation**: Generate recipes via Claude API (bring your own key)
- **Mobile-First Design**: Responsive, touch-friendly UI

## Tech Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Zustand

## Target Ranges

| Recipe Type | Fat % | Sugar % | Total Solids % |
|-------------|-------|---------|----------------|
| Ice Cream | 10-15% | 15-20% | 36-40% |
| Lite/Protein | <3% | Variable | 30-35% |
| Gelato | 5-8% | 18-22% | 36-43% |
| Sorbet | 0% | 20-30% | 25-30% |

## Safety Thresholds

- **Fat > 16%**: High buttering risk
- **Solids < 31%**: Icy texture likely
- **Volume > 709ml**: Exceeds tub capacity

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

## Based On

Formulation data derived from the Ninja Creami Deluxe NC501 Comprehensive Blueprint Dataset.
