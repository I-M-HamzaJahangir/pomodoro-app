interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function MinuteStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 90,
  disabled = false,
}: Props) {
  return (
    <div className={`stepper${disabled ? " stepper--disabled" : ""}`}>
      <div className="stepper-label">{label}</div>
      <div className="stepper-controls">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={disabled}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          –
        </button>
        <div className="stepper-value">
          <span>{value}</span>
          <span className="stepper-unit">min</span>
        </div>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={disabled}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}
