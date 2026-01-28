/**
 * Ninja Creami Deluxe Recipe Generator - Main Application
 */

const App = {
    // Current state
    state: {
        recipeType: 'ice_cream',
        currentCategory: 'liquids',
        recipe: [] // Array of { ingredient, amount }
    },

    // Program info
    programs: {
        'ICE CREAM': {
            icon: '🍦',
            desc: 'Standard program for high-fat, high-sugar recipes',
            tips: [
                'Freeze for 24 hours minimum',
                'Level any hump before processing',
                'Process once - limit re-spins on high-fat bases'
            ]
        },
        'LITE ICE CREAM': {
            icon: '💪',
            desc: 'High RPM for low-fat, low-sugar, or protein bases',
            tips: [
                'Freeze for 24 hours minimum',
                'Expect powdery texture on first spin',
                'Add 1 tbsp liquid + RE-SPIN if crumbly',
                'Stabilizers required for best results'
            ]
        },
        'GELATO': {
            icon: '🇮🇹',
            desc: 'Slow spin for dense, Italian-style with low overrun',
            tips: [
                'Freeze for 24 hours minimum',
                'Cook custard bases to 80°C',
                'Results in dense, fudgy texture'
            ]
        },
        'SORBET': {
            icon: '🍋',
            desc: 'For fruit-based, high-sugar recipes (20-30% sugar)',
            tips: [
                'Blend fruit before freezing',
                'Ensure 20-30% sugar concentration',
                'Canned fruit in syrup works great'
            ]
        },
        'FROZEN YOGURT': {
            icon: '🥛',
            desc: 'For fermented dairy bases',
            tips: [
                'Use full-fat yogurt with added sugar',
                'Non-fat yogurt freezes too hard',
                'Whisk yogurt to remove lumps first'
            ]
        }
    },

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.renderIngredients();
        this.updateMetrics();
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Recipe type selection
        document.querySelectorAll('.recipe-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.recipe-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.recipeType = btn.dataset.type;
                this.updateMetrics();
            });
        });

        // Category tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.currentCategory = btn.dataset.category;
                this.renderIngredients();
            });
        });
    },

    /**
     * Render ingredient list based on current category
     */
    renderIngredients() {
        const container = document.getElementById('ingredient-list');
        const ingredients = IngredientsDB.getByCategory(this.state.currentCategory);

        container.innerHTML = ingredients.map(ing => `
            <div class="ingredient-item" data-id="${ing.id}">
                <div class="ingredient-info">
                    <div class="ingredient-name">${ing.name}</div>
                    <div class="ingredient-stats">
                        ${ing.fatPer100g > 0 ? `F:${ing.fatPer100g}%` : ''}
                        ${ing.proteinPer100g > 0 ? `P:${ing.proteinPer100g}%` : ''}
                        ${ing.carbsPer100g > 0 ? `C:${ing.carbsPer100g}%` : ''}
                        ${ing.pac ? `PAC:${ing.pac}` : ''}
                    </div>
                </div>
                <button class="add-btn" onclick="App.addIngredient('${ing.id}')">+</button>
            </div>
        `).join('');
    },

    /**
     * Add ingredient to recipe
     */
    addIngredient(id) {
        // Find ingredient in database
        const allIngredients = IngredientsDB.getAllIngredients();
        const ingredient = allIngredients.find(ing => ing.id === id);

        if (!ingredient) return;

        // Check if already in recipe
        const existing = this.state.recipe.find(item => item.ingredient.id === id);
        if (existing) {
            // Increase amount
            existing.amount += ingredient.defaultAmount;
        } else {
            // Add new
            this.state.recipe.push({
                ingredient: ingredient,
                amount: ingredient.defaultAmount
            });
        }

        this.renderRecipe();
        this.updateMetrics();
    },

    /**
     * Remove ingredient from recipe
     */
    removeIngredient(id) {
        this.state.recipe = this.state.recipe.filter(item => item.ingredient.id !== id);
        this.renderRecipe();
        this.updateMetrics();
    },

    /**
     * Update ingredient amount
     */
    updateAmount(id, amount) {
        const item = this.state.recipe.find(item => item.ingredient.id === id);
        if (item) {
            item.amount = parseFloat(amount) || 0;
            this.updateMetrics();
        }
    },

    /**
     * Render current recipe ingredients
     */
    renderRecipe() {
        const container = document.getElementById('recipe-ingredients');

        if (this.state.recipe.length === 0) {
            container.innerHTML = '<p class="empty-state">No ingredients added yet. Select ingredients above to begin.</p>';
            return;
        }

        container.innerHTML = this.state.recipe.map(item => `
            <div class="recipe-item">
                <div class="recipe-item-name">${item.ingredient.name}</div>
                <div class="recipe-item-amount">
                    <input type="number"
                           class="amount-input"
                           value="${item.amount}"
                           min="0"
                           step="${item.ingredient.defaultAmount < 1 ? '0.1' : '10'}"
                           onchange="App.updateAmount('${item.ingredient.id}', this.value)">
                    <span class="amount-unit">g</span>
                </div>
                <button class="remove-btn" onclick="App.removeIngredient('${item.ingredient.id}')">×</button>
            </div>
        `).join('');
    },

    /**
     * Update all metrics and UI
     */
    updateMetrics() {
        if (this.state.recipe.length === 0) {
            this.resetMetricsDisplay();
            return;
        }

        // Calculate all metrics
        const metrics = Calculator.calculateAllMetrics(this.state.recipe, this.state.recipeType);

        // Update metric displays
        document.getElementById('fat-percentage').textContent = metrics.fatPercentage.toFixed(1) + '%';
        document.getElementById('sugar-percentage').textContent = metrics.sugarPercentage.toFixed(1) + '%';
        document.getElementById('protein-percentage').textContent = metrics.proteinPercentage.toFixed(1) + '%';
        document.getElementById('solids-percentage').textContent = metrics.totalSolids.toFixed(1) + '%';

        // Update bars (max at 50% for visualization)
        document.getElementById('fat-bar').style.width = Math.min(metrics.fatPercentage * 2, 100) + '%';
        document.getElementById('sugar-bar').style.width = Math.min(metrics.sugarPercentage * 2, 100) + '%';
        document.getElementById('protein-bar').style.width = Math.min(metrics.proteinPercentage * 2, 100) + '%';
        document.getElementById('solids-bar').style.width = Math.min(metrics.totalSolids * 2, 100) + '%';

        // Color code bars based on danger zones
        this.updateBarColors(metrics);

        // Update nutrition
        document.getElementById('total-calories').textContent = metrics.totalCalories;
        document.getElementById('calories-per-serving').textContent = metrics.caloriesPerServing;
        document.getElementById('fpd-value').textContent = metrics.fpd.toFixed(0);
        document.getElementById('total-weight').textContent = metrics.totalWeight.toFixed(0) + 'g';

        // Update warnings
        this.renderWarnings(metrics);

        // Update program recommendation
        this.updateProgram(metrics.suggestedProgram);
    },

    /**
     * Update bar colors based on values
     */
    updateBarColors(metrics) {
        const fatBar = document.getElementById('fat-bar');
        const solidsBar = document.getElementById('solids-bar');

        // Fat coloring
        if (metrics.fatPercentage > 16) {
            fatBar.style.background = 'var(--danger)';
        } else if (metrics.fatPercentage > 15) {
            fatBar.style.background = 'var(--warning)';
        } else {
            fatBar.style.background = 'var(--fat-color)';
        }

        // Solids coloring
        if (metrics.totalSolids < 31) {
            solidsBar.style.background = 'var(--danger)';
        } else if (metrics.totalSolids < 36) {
            solidsBar.style.background = 'var(--warning)';
        } else {
            solidsBar.style.background = 'var(--solids-color)';
        }
    },

    /**
     * Reset metrics display to zero
     */
    resetMetricsDisplay() {
        document.getElementById('fat-percentage').textContent = '0%';
        document.getElementById('sugar-percentage').textContent = '0%';
        document.getElementById('protein-percentage').textContent = '0%';
        document.getElementById('solids-percentage').textContent = '0%';
        document.getElementById('fat-bar').style.width = '0%';
        document.getElementById('sugar-bar').style.width = '0%';
        document.getElementById('protein-bar').style.width = '0%';
        document.getElementById('solids-bar').style.width = '0%';
        document.getElementById('total-calories').textContent = '0';
        document.getElementById('calories-per-serving').textContent = '0';
        document.getElementById('fpd-value').textContent = '0';
        document.getElementById('total-weight').textContent = '0g';

        document.getElementById('warnings-section').style.display = 'none';
        this.updateProgram('ICE CREAM');
    },

    /**
     * Render warnings and recommendations
     */
    renderWarnings(metrics) {
        const section = document.getElementById('warnings-section');
        const container = document.getElementById('warnings-list');

        const allWarnings = [...metrics.warnings];

        // Add recommendations as info items
        metrics.recommendations.forEach(rec => {
            allWarnings.push({
                type: 'info',
                message: rec,
                fix: ''
            });
        });

        if (allWarnings.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        container.innerHTML = allWarnings.map(warning => `
            <div class="warning-item ${warning.type}">
                <div class="warning-message">${warning.type === 'danger' ? '⚠️' : warning.type === 'warning' ? '⚡' : '💡'} ${warning.message}</div>
                ${warning.fix ? `<div class="warning-fix">Fix: ${warning.fix}</div>` : ''}
            </div>
        `).join('');
    },

    /**
     * Update program recommendation display
     */
    updateProgram(programName) {
        const program = this.programs[programName] || this.programs['ICE CREAM'];

        document.getElementById('program-icon').textContent = program.icon;
        document.getElementById('program-name').textContent = programName;
        document.getElementById('program-desc').textContent = program.desc;

        const tipsContainer = document.getElementById('program-tips').querySelector('ul');
        tipsContainer.innerHTML = program.tips.map(tip => `<li>${tip}</li>`).join('');
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
