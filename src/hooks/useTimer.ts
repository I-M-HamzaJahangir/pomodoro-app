import { useReducer, useEffect, useRef } from "react";
import { useSound } from "react-sounds";
import type { Mode, HistoryEntry, TimerControls, TimerState } from "../types";
import { MAX_HISTORY } from "../constants";
import { readHistory, writeHistory } from "../utils/utils";

type Action =
  | { type: "TOGGLE" }
  | { type: "TICK"; remaining: number }
  | { type: "RESET"; totalSec: number }
  | { type: "ADVANCE"; nextMode: Mode; nextTotal: number }
  | { type: "SET_HISTORY"; history: HistoryEntry[] };

function timerReducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, running: !state.running };
    case "TICK":
      return { ...state, remaining: action.remaining };
    case "RESET":
      return { ...state, running: false, remaining: action.totalSec };
    case "ADVANCE":
      return {
        ...state,
        running: false,
        mode: action.nextMode,
        remaining: action.nextTotal,
      };
    case "SET_HISTORY":
      return { ...state, history: action.history };
  }
}

export function useTimer(focusMin: number, breakMin: number): TimerControls {
  const { play: playFocusEnd } = useSound("/success_chime.mp3");
  const { play: playBreakEnd } = useSound("/success_chime.mp3");

  const initialState: TimerState = {
    mode: "focus",
    running: false,
    remaining: focusMin * 60,
    history: readHistory(),
  };
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const totalSec = (state.mode === "focus" ? focusMin : breakMin) * 60;

  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    if (!ref.current.running) dispatch({ type: "TICK", remaining: totalSec });
  }, [focusMin, breakMin, state.mode]);

  useEffect(() => {
    if (!state.running) return;
    const startTime = performance.now();
    const startRemaining = ref.current.remaining;
    let raf: number;

    const tick = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const next = Math.max(0, startRemaining - elapsed);
      if (next <= 0) {
        endSession(ref.current.mode, ref.current.history);
        return;
      }
      dispatch({ type: "TICK", remaining: next });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state.running]);

  useEffect(() => {
    const id = setInterval(() => {
      const fresh = readHistory();
      if (fresh.length !== ref.current.history.length)
        dispatch({ type: "SET_HISTORY", history: fresh });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const secsDisplay = Math.ceil(state.remaining);

  function endSession(mode: Mode, history: HistoryEntry[], record = true) {
    if (record) {
      if (mode === "focus") {
        const entry: HistoryEntry = {
          id: Math.random().toString(36).slice(2),
          minutes: focusMin,
          endedAt: Date.now(),
        };
        const updated = [entry, ...history].slice(0, MAX_HISTORY);
        dispatch({ type: "SET_HISTORY", history: updated });
        writeHistory(updated);
        playFocusEnd();
      } else {
        playBreakEnd();
      }
    }

    const nextMode: Mode = mode === "focus" ? "break" : "focus";
    dispatch({
      type: "ADVANCE",
      nextMode,
      nextTotal: (nextMode === "focus" ? focusMin : breakMin) * 60,
    });
  }

  return {
    mode: state.mode,
    running: state.running,
    secsDisplay,
    history: state.history,
    totalSec,
    toggle: () => dispatch({ type: "TOGGLE" }),
    reset: () => dispatch({ type: "RESET", totalSec }),
    skip: () => endSession(state.mode, state.history, false),
  };
}
