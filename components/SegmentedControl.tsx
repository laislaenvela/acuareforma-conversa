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
  return (
    <div className={segmentedClassName} role="tablist" aria-label="Opciones de visualización">
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`${segmentClassName} ${isActive ? activeClassName : inactiveClassName}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
