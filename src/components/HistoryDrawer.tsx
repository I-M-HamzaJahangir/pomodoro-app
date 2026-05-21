import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { HistoryEntry } from "../types";
import { CloseIcon } from "../assets/icons/icons";
import HistoryList from "./HistoryList";

interface Props {
  history: HistoryEntry[];
  open: boolean;
  onClose: () => void;
}

export default function HistoryDrawer({ history, open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const totalMinutes = history.reduce((a, b) => a + b.minutes, 0);

  return createPortal(
    <>
      <div
        className={`drawer-backdrop${open ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`drawer${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Today's focus sessions"
      >
        <div className="drawer-header">
          <div className="drawer-title">
            <span className="history-eyebrow">Today</span>
            <span className="history-meta">
              {history.length === 0
                ? "no sessions yet"
                : `${history.length} session${history.length === 1 ? "" : "s"} · ${totalMinutes} min`}
            </span>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close history"
          >
            <CloseIcon />
          </button>
        </div>

        <HistoryList history={history} />
      </div>
    </>,
    document.body,
  );
}
