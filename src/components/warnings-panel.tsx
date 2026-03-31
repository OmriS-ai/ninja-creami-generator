import { useMetrics } from '@/hooks/use-metrics';
import type { Warning } from '@/lib/types';

export function WarningsPanel() {
  const metrics = useMetrics();

  if (!metrics) return null;

  const allWarnings: Warning[] = [
    ...metrics.warnings,
    ...metrics.recommendations.map((rec) => ({
      type: 'info' as const,
      message: rec,
      fix: '',
    })),
  ];

  if (allWarnings.length === 0) return null;

  return (
    <section className="space-y-2">
      {allWarnings.map((warning, i) => (
        <div
          key={i}
          className={`rounded-lg border px-4 py-2.5 text-sm ${
            warning.type === 'danger'
              ? 'border-red-200 bg-red-50 text-red-800'
              : warning.type === 'warning'
                ? 'border-amber-200 bg-amber-50 text-amber-800'
                : 'border-indigo-200 bg-indigo-50 text-indigo-800'
          }`}
        >
          <div className="font-medium">{warning.message}</div>
          {warning.fix && (
            <div className="mt-0.5 text-xs opacity-75">Fix: {warning.fix}</div>
          )}
        </div>
      ))}
    </section>
  );
}
