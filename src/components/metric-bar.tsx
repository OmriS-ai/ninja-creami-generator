interface MetricBarProps {
  label: string;
  value: number;
  color: string;
  targetMin?: number;
  targetMax?: number;
  dangerCheck?: (value: number) => 'danger' | 'warning' | 'normal';
}

export function MetricBar({
  label,
  value,
  color,
  targetMin,
  targetMax,
  dangerCheck,
}: MetricBarProps) {
  const barWidth = Math.min(value * 2, 100);
  const status = dangerCheck ? dangerCheck(value) : 'normal';

  const barColor =
    status === 'danger'
      ? 'bg-red-500'
      : status === 'warning'
        ? 'bg-amber-400'
        : color;

  const targetLabel =
    targetMin !== undefined && targetMax !== undefined
      ? `Target: ${targetMin}-${targetMax}%`
      : undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="text-lg font-semibold tabular-nums text-gray-900">
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
        {targetMin !== undefined && targetMax !== undefined && (
          <div
            className="absolute top-0 h-full bg-gray-200/60"
            style={{
              left: `${Math.min(targetMin * 2, 100)}%`,
              width: `${Math.min((targetMax - targetMin) * 2, 100 - targetMin * 2)}%`,
            }}
          />
        )}
        <div
          className={`relative h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
      {targetLabel && (
        <div className="mt-0.5 text-[10px] text-gray-400">{targetLabel}</div>
      )}
    </div>
  );
}
