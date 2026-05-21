export type Mode = "focus" | "break";

export interface HistoryEntry {
  id: string;
  minutes: number;
  endedAt: number;
}
export interface TimerControls {
  mode: Mode;
  running: boolean;
  secsDisplay: number;
  history: HistoryEntry[];
  totalSec: number;
  toggle: () => void;
  reset:  () => void;
  skip:   () => void;
}

export interface TimerState {
  mode: Mode;
  running: boolean;
  remaining: number;
  history: HistoryEntry[];
}