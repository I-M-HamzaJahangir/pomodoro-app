import { useState } from "react";
import "./App.css";

import { useSound } from "react-sounds";
import { STORAGE_KEYS, DEFAULTS } from "./constants";
import ProgressRing from "./components/ProgressRing";
import MinuteStepper from "./components/MinuteStepper";
import Controls from "./components/Controls";
import HistoryDrawer from "./components/HistoryDrawer";
import { ChevronUpIcon } from "./assets/icons/icons";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTimer } from "./hooks/useTimer";
import { fmtTime } from "./utils/utils";
import TimerFace from "./components/TimerFace";

export default function App() {
  const [focusMin, setFocusMin] = useLocalStorage(
    STORAGE_KEYS.focusMin,
    DEFAULTS.focusMin,
  );
  const [breakMin, setBreakMin] = useLocalStorage(
    STORAGE_KEYS.breakMin,
    DEFAULTS.breakMin,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { play: playExpand } = useSound("/panel_expand.mp3");
  const { play: playCollapse } = useSound("/panel_collapse.mp3");

  const { mode, running, secsDisplay, history, totalSec, toggle, reset, skip } =
    useTimer(focusMin, breakMin);

  const progress = 1 - secsDisplay / totalSec;
  const startLabel = running
    ? "Pause"
    : secsDisplay === totalSec
      ? "Start"
      : "Resume";

  const handlleHistoryTrigger = () => {
    setDrawerOpen(true);
    playExpand();
  };

  return (
    <div
      className={`shell mode-${mode} atm-ice ${running ? "is-running" : "is-idle"}`}
    >
      <div className="ambient" aria-hidden="true">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="grain" />
      </div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          <span className="brand-name">Poromodo</span>
        </div>
        <button className="history-trigger" onClick={handlleHistoryTrigger}>
          <span>
            {history.length === 0
              ? "No sessions yet"
              : `${history.length} session${history.length === 1 ? "" : "s"} today`}
          </span>
          <ChevronUpIcon />
        </button>
      </header>

      <main className="stage">
        <div className="mode-pill" role="status" aria-live="polite">
          <span className="dot" />
          <span className="mode-label">
            {mode === "focus" ? "Focus" : "Break"}
          </span>
        </div>

        <div className="timer-wrap">
          <ProgressRing progress={progress} mode={mode} />
          <div className="timer">
            <TimerFace mode={mode} />
            <div
              className="time-num"
              aria-label={`${fmtTime(secsDisplay)} remaining`}
            >
              {fmtTime(secsDisplay)}
            </div>
          </div>
        </div>

        <Controls
          running={running}
          startLabel={startLabel}
          onToggle={toggle}
          onReset={reset}
          onSkip={skip}
        />

        <div className="settings">
          <MinuteStepper
            label="Focus"
            value={focusMin}
            onChange={setFocusMin}
            min={1}
            max={90}
            disabled={running}
          />
          <span className="settings-sep" aria-hidden="true" />
          <MinuteStepper
            label="Break"
            value={breakMin}
            onChange={setBreakMin}
            min={1}
            max={45}
            disabled={running}
          />
        </div>
      </main>

      <HistoryDrawer
        history={history}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          playCollapse();
        }}
      />
    </div>
  );
}
