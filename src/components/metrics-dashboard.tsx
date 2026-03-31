import { useMetrics } from '@/hooks/use-metrics';
import { useRecipeStore } from '@/store/recipe-store';
import { recipeTemplates } from '@/lib/templates';
import { MetricBar } from './metric-bar';

export function MetricsDashboard() {
  const metrics = useMetrics();
  const recipeType = useRecipeStore((s) => s.recipeType);
  const template = recipeTemplates[recipeType];

  if (!metrics) {
    return (
      <section>
        <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
          Recipe Analysis
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['Fat', 'Sugar', 'Protein', 'Solids'].map((label) => (
              <div key={label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-gray-500">{label}</span>
                  <span className="text-lg font-semibold tabular-nums text-gray-300">0%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-around border-t border-gray-100 pt-3 text-center">
            <div>
              <div className="text-xs text-gray-400">Calories</div>
              <div className="text-sm font-semibold text-gray-300">0</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Per Serving</div>
              <div className="text-sm font-semibold text-gray-300">0</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">FPD</div>
              <div className="text-sm font-semibold text-gray-300">0</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
        Recipe Analysis
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricBar
            label="Fat"
            value={metrics.fatPercentage}
            color="bg-[var(--color-fat)]"
            targetMin={template.targetRanges.fatMin}
            targetMax={template.targetRanges.fatMax}
            dangerCheck={(v) => (v > 16 ? 'danger' : v > 15 ? 'warning' : 'normal')}
          />
          <MetricBar
            label="Sugar"
            value={metrics.sugarPercentage}
            color="bg-[var(--color-sugar)]"
            targetMin={template.targetRanges.sugarMin}
            targetMax={template.targetRanges.sugarMax}
          />
          <MetricBar
            label="Protein"
            value={metrics.proteinPercentage}
            color="bg-[var(--color-protein)]"
            targetMin={template.targetRanges.proteinMin}
            targetMax={template.targetRanges.proteinMax}
          />
          <MetricBar
            label="Solids"
            value={metrics.totalSolids}
            color="bg-[var(--color-solids)]"
            targetMin={template.targetRanges.solidsMin}
            targetMax={template.targetRanges.solidsMax}
            dangerCheck={(v) => (v < 31 ? 'danger' : v < 36 ? 'warning' : 'normal')}
          />
        </div>

        <div className="mt-4 flex justify-around border-t border-gray-100 pt-3 text-center">
          <div>
            <div className="text-xs text-gray-400">Calories</div>
            <div className="text-sm font-semibold text-gray-900">
              {metrics.totalCalories}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Per Serving</div>
            <div className="text-sm font-semibold text-gray-900">
              {metrics.caloriesPerServing}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">FPD</div>
            <div className="text-sm font-semibold text-gray-900">
              {metrics.fpd.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
