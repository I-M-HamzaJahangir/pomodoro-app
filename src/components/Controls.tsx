import { PlayIcon, PauseIcon, ResetIcon, SkipIcon } from "../assets/icons/icons";

interface Props {
  running: boolean;
  startLabel: string;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function Controls({
  running,
  startLabel,
  onToggle,
  onReset,
  onSkip,
}: Props) {
  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={onToggle}>
        {running ? <PauseIcon /> : <PlayIcon />}
        <span>{startLabel}</span>
      </button>
      <button
        className="btn btn-ghost"
        onClick={onReset}
        aria-label="Reset"
        title="Reset (R)"
      >
        <ResetIcon />
      </button>
      <button
        className="btn btn-ghost"
        onClick={onSkip}
        aria-label="Skip session"
        title="Skip"
      >
        <SkipIcon />
      </button>
    </div>
  );
}
