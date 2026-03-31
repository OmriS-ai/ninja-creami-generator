import { useMetrics } from '@/hooks/use-metrics';
import { PROGRAMS } from '@/lib/constants';

export function ProgramRecommendation() {
  const metrics = useMetrics();
  const programName = metrics?.suggestedProgram ?? 'ICE CREAM';
  const program = PROGRAMS[programName] ?? PROGRAMS['ICE CREAM'];

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
        Recommended Program
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{program.icon}</span>
          <div>
            <div className="text-base font-semibold text-indigo-600">{programName}</div>
            <div className="text-sm text-gray-500">{program.desc}</div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="text-xs font-medium text-gray-500 mb-2">Processing Tips</div>
          <ul className="space-y-1">
            {program.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
