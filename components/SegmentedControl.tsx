type SegmentedOption = {
  value: string;
  label: string;
};

type SegmentedControlProps = {
  value: string;
  options: readonly SegmentedOption[];
  onChange: (value: string) => void;
  segmentedClassName: string;
  segmentClassName: string;
  activeClassName: string;
  inactiveClassName: string;
};

export default function SegmentedControl({
  value,
  options,
  onChange,
  segmentedClassName,
  segmentClassName,
  activeClassName,
  inactiveClassName,
}: SegmentedControlProps) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );

  return (
    <div
      className={`${segmentedClassName} relative inline-grid overflow-hidden`}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        borderRadius: "9999px",
        overflow: "hidden",
      }}
      role="tablist"
      aria-label="Opciones de visualización"
    >
      <div className="pointer-events-none absolute inset-1">
        <div
          className={`h-full rounded-full ${activeClassName} transition-transform duration-[260ms] ease-in-out will-change-transform`}
          style={{
            width: `calc(100% / ${options.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
            borderRadius: "9999px",
          }}
          aria-hidden="true"
        />
      </div>

      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`relative z-10 rounded-full ${segmentClassName} ${
              isActive
                ? "text-[color:var(--color-surface)]"
                : inactiveClassName
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
