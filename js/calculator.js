/**
 * Ninja Creami Deluxe Recipe Calculator
 * Handles all formulation calculations based on scientific principles
 */

const Calculator = {
    // Deluxe tub capacity
    TUB_CAPACITY_ML: 709,
    TUB_CAPACITY_G: 709, // Approximate, assuming density ~1

    /**
     * Calculate total fat percentage
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Fat percentage
     */
    calculateFatPercentage(ingredients) {
        let totalFat = 0;
        let totalWeight = 0;

        ingredients.forEach(item => {
            const fatPer100g = item.ingredient.fatPer100g || 0;
            totalFat += (item.amount / 100) * fatPer100g;
            totalWeight += item.amount;
        });

        return totalWeight > 0 ? (totalFat / totalWeight) * 100 : 0;
    },

    /**
     * Calculate total sugar/carbs percentage
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Sugar percentage
     */
    calculateSugarPercentage(ingredients) {
        let totalSugar = 0;
        let totalWeight = 0;

        ingredients.forEach(item => {
            const carbsPer100g = item.ingredient.carbsPer100g || 0;
            totalSugar += (item.amount / 100) * carbsPer100g;
            totalWeight += item.amount;
        });

        return totalWeight > 0 ? (totalSugar / totalWeight) * 100 : 0;
    },

    /**
     * Calculate total protein percentage
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Protein percentage
     */
    calculateProteinPercentage(ingredients) {
        let totalProtein = 0;
        let totalWeight = 0;

        ingredients.forEach(item => {
            const proteinPer100g = item.ingredient.proteinPer100g || 0;
            totalProtein += (item.amount / 100) * proteinPer100g;
            totalWeight += item.amount;
        });

        return totalWeight > 0 ? (totalProtein / totalWeight) * 100 : 0;
    },

    /**
     * Calculate total solids percentage
     * Total Solids = Fat + Sugar/Carbs + Protein + Other Solids
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Total solids percentage
     */
    calculateTotalSolids(ingredients) {
        let totalSolids = 0;
        let totalWeight = 0;

        ingredients.forEach(item => {
            const fatPer100g = item.ingredient.fatPer100g || 0;
            const carbsPer100g = item.ingredient.carbsPer100g || 0;
            const proteinPer100g = item.ingredient.proteinPer100g || 0;

            const solidsPer100g = fatPer100g + carbsPer100g + proteinPer100g;
            totalSolids += (item.amount / 100) * solidsPer100g;
            totalWeight += item.amount;
        });

        return totalWeight > 0 ? (totalSolids / totalWeight) * 100 : 0;
    },

    /**
     * Calculate Freezing Point Depression (FPD) using PAC values
     * Higher FPD = Softer texture at freezer temps
     * @param {Array} sweeteners - Array of {ingredient, amount} objects (sweeteners only)
     * @returns {number} Total FPD units
     */
    calculateFPD(sweeteners) {
        let totalFPD = 0;

        sweeteners.forEach(item => {
            const pac = item.ingredient.pac || 0;
            totalFPD += item.amount * pac;
        });

        return totalFPD;
    },

    /**
     * Calculate perceived sweetness using POD values
     * @param {Array} sweeteners - Array of {ingredient, amount} objects (sweeteners only)
     * @returns {number} Sweetness equivalent in grams of sucrose
     */
    calculateSweetness(sweeteners) {
        let totalSweetness = 0;

        sweeteners.forEach(item => {
            const pod = item.ingredient.pod || 0;
            totalSweetness += item.amount * pod;
        });

        return totalSweetness;
    },

    /**
     * Calculate total calories
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Total calories
     */
    calculateCalories(ingredients) {
        let totalCalories = 0;

        ingredients.forEach(item => {
            const caloriesPer100g = item.ingredient.caloriesPer100g || 0;
            totalCalories += (item.amount / 100) * caloriesPer100g;
        });

        return Math.round(totalCalories);
    },

    /**
     * Calculate calories per serving
     * @param {number} totalCalories - Total recipe calories
     * @param {number} servings - Number of servings (default 4)
     * @returns {number} Calories per serving
     */
    calculateCaloriesPerServing(totalCalories, servings = 4) {
        return Math.round(totalCalories / servings);
    },

    /**
     * Calculate total weight
     * @param {Array} ingredients - Array of {ingredient, amount} objects
     * @returns {number} Total weight in grams
     */
    calculateTotalWeight(ingredients) {
        return ingredients.reduce((sum, item) => sum + item.amount, 0);
    },

    /**
     * Check if recipe is within safe parameters
     * @param {Object} metrics - Calculated metrics object
     * @returns {Object} Warnings and recommendations
     */
    validateRecipe(metrics) {
        const warnings = [];
        const recommendations = [];

        // Fat checks
        if (metrics.fatPercentage > 16) {
            warnings.push({
                type: 'danger',
                message: `Fat at ${metrics.fatPercentage.toFixed(1)}% - HIGH BUTTERING RISK!`,
                fix: 'Dilute cream with milk (1:1 ratio)'
            });
        } else if (metrics.fatPercentage > 15) {
            warnings.push({
                type: 'warning',
                message: `Fat at ${metrics.fatPercentage.toFixed(1)}% - approaching danger zone`,
                fix: 'Consider reducing cream or adding more milk'
            });
        }

        // Solids checks
        if (metrics.totalSolids < 31) {
            warnings.push({
                type: 'danger',
                message: `Solids at ${metrics.totalSolids.toFixed(1)}% - ICY TEXTURE likely`,
                fix: 'Add protein powder, skim milk powder, or stabilizers'
            });
        } else if (metrics.totalSolids < 36) {
            warnings.push({
                type: 'warning',
                message: `Solids at ${metrics.totalSolids.toFixed(1)}% - may feel cold/icy`,
                fix: 'Consider adding more solids for creamier texture'
            });
        }

        // Sugar checks for sorbet
        if (metrics.recipeType === 'sorbet' && metrics.sugarPercentage < 20) {
            warnings.push({
                type: 'danger',
                message: `Sugar at ${metrics.sugarPercentage.toFixed(1)}% - too low for sorbet`,
                fix: 'Sorbet requires 20-30% sugar concentration'
            });
        }

        // Volume check
        if (metrics.totalWeight > 709) {
            warnings.push({
                type: 'danger',
                message: `Volume exceeds tub capacity (${metrics.totalWeight}g > 709ml)`,
                fix: 'Reduce quantities - liquid expands 9% when frozen'
            });
        } else if (metrics.totalWeight > 680) {
            warnings.push({
                type: 'warning',
                message: `Volume near maximum (${metrics.totalWeight}g)`,
                fix: 'Leave room for expansion during freezing'
            });
        }

        // Program recommendations
        if (metrics.fatPercentage < 5 && metrics.sugarPercentage < 15) {
            recommendations.push('Use LITE ICE CREAM mode (higher RPM for hard blocks)');
            recommendations.push('Expect to RE-SPIN with 1 tbsp liquid');
        }

        if (metrics.fatPercentage >= 10 && metrics.sugarPercentage >= 15) {
            recommendations.push('Use standard ICE CREAM mode');
        }

        return { warnings, recommendations };
    },

    /**
     * Suggest program based on recipe composition
     * @param {Object} metrics - Calculated metrics
     * @returns {string} Recommended program
     */
    suggestProgram(metrics) {
        const { fatPercentage, sugarPercentage, proteinPercentage } = metrics;

        // Lite/Protein base
        if (fatPercentage < 5 && proteinPercentage > 8) {
            return 'LITE ICE CREAM';
        }

        // Sorbet (no fat, high sugar)
        if (fatPercentage === 0 && sugarPercentage >= 20) {
            return 'SORBET';
        }

        // Gelato (lower fat, higher sugar)
        if (fatPercentage >= 5 && fatPercentage <= 8 && sugarPercentage >= 18) {
            return 'GELATO';
        }

        // Standard ice cream
        if (fatPercentage >= 10 && fatPercentage <= 15) {
            return 'ICE CREAM';
        }

        // Low fat/sugar default to lite
        if (fatPercentage < 10 || sugarPercentage < 15) {
            return 'LITE ICE CREAM';
        }

        return 'ICE CREAM';
    },

    /**
     * Calculate all metrics for a recipe
     * @param {Array} ingredients - All ingredients with amounts
     * @param {string} recipeType - Type of recipe being made
     * @returns {Object} Complete metrics object
     */
    calculateAllMetrics(ingredients, recipeType = 'ice_cream') {
        const fatPercentage = this.calculateFatPercentage(ingredients);
        const sugarPercentage = this.calculateSugarPercentage(ingredients);
        const proteinPercentage = this.calculateProteinPercentage(ingredients);
        const totalSolids = this.calculateTotalSolids(ingredients);
        const totalCalories = this.calculateCalories(ingredients);
        const totalWeight = this.calculateTotalWeight(ingredients);

        // Extract sweeteners for FPD calculation
        const sweeteners = ingredients.filter(item => item.ingredient.pac !== undefined);
        const fpd = this.calculateFPD(sweeteners);
        const sweetness = this.calculateSweetness(sweeteners);

        const metrics = {
            fatPercentage,
            sugarPercentage,
            proteinPercentage,
            totalSolids,
            totalCalories,
            caloriesPerServing: this.calculateCaloriesPerServing(totalCalories),
            totalWeight,
            fpd,
            sweetness,
            recipeType
        };

        const validation = this.validateRecipe(metrics);
        const suggestedProgram = this.suggestProgram(metrics);

        return {
            ...metrics,
            ...validation,
            suggestedProgram
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
