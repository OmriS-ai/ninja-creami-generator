# Ninja Creami Deluxe Recipe Generator

Interactive web-based recipe generator for the Ninja Creami Deluxe NC501 with real-time formulation feedback.

## Features

- **Recipe Type Selection**: Ice Cream, Lite/Protein, Gelato, Sorbet, Keto, Vegan
- **Comprehensive Ingredient Database**: Liquids, sweeteners, fats, proteins, stabilizers
- **Real-time Calculations**:
  - Fat percentage (with buttering warnings)
  - Sugar percentage
  - Protein percentage
  - Total solids (creaminess indicator)
  - Freezing Point Depression (FPD/PAC)
  - Calories per serving
- **Smart Warnings**: Alerts for dangerous formulations
- **Program Recommendations**: Suggests optimal Creami program based on recipe

## Measurements

All ingredients use metric measurements:
- **Grams (g)** for all solid and liquid ingredients
- **Milliliters (ml)** for volume reference

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
- **Gums > 0.5g/pint**: Slimy texture
- **Volume > 709ml**: Exceeds tub capacity

## Usage

1. Select your recipe type
2. Add ingredients from each category
3. Adjust amounts using the input fields
4. Monitor the real-time metrics
5. Follow the recommended program

## Local Development

Simply open `index.html` in a web browser - no build process required.

## Deployment

Hosted on GitHub Pages at: https://omris-ai.github.io/ninja-creami-generator

## Based On

Formulation data derived from the Ninja Creami Deluxe NC501 Comprehensive Blueprint Dataset.
