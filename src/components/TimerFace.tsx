import { useState, useEffect, useRef } from "react";
import type { Mode } from "../types";

interface Props {
  mode: Mode;
}

function FocusEyes() {
  return (
    <svg viewBox="0 0 52 24" width="52" height="24" fill="none" aria-hidden="true">
      <circle cx="13" cy="12" r="7.5" fill="currentColor" opacity="0.12" />
      <circle cx="13" cy="12" r="5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.6" fill="white" />
      <circle cx="39" cy="12" r="7.5" fill="currentColor" opacity="0.12" />
      <circle cx="39" cy="12" r="5" fill="currentColor" />
      <circle cx="41" cy="10" r="1.6" fill="white" />
    </svg>
  );
}

function BreakEyes() {
  return (
    <svg viewBox="0 0 52 24" width="52" height="24" fill="none" aria-hidden="true">
      <path d="M5 10 Q13 20 21 10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M31 10 Q39 20 47 10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function TimerFace({ mode }: Props) {
  const [blinking, setBlinking] = useState(false);
  const [displayed, setDisplayed] = useState<Mode>(mode);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setBlinking(true);
    const t = setTimeout(() => {
      setDisplayed(mode);
      setBlinking(false);
    }, 160);
    return () => clearTimeout(t);
  }, [mode]);

  return (
    <div className={`timer-face${blinking ? " timer-face--blink" : ""}`}>
      {displayed === "focus" ? <FocusEyes /> : <BreakEyes />}
    </div>
  );
}
