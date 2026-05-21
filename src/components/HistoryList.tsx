import type { HistoryEntry } from "../types";
import { CheckIcon } from "../assets/icons/icons";
import { fmtClock } from "../utils/utils";

interface Props {
  history: HistoryEntry[];
}

export default function HistoryList({ history }: Props) {
  return (
    <ul className="history-list">
      {history.length === 0 ? (
        <li className="history-empty">
          Your completed focus sessions will collect here.
        </li>
      ) : (
        history.map((h) => (
          <li key={h.id} className="history-item">
            <span className="hi-check">
              <CheckIcon />
            </span>
            <span className="hi-dur">
              {String(h.minutes).padStart(2, "0")}:00
            </span>
            <span className="hi-tag">focus</span>
            <span className="hi-time">{fmtClock(h.endedAt)}</span>
          </li>
        ))
      )}
    </ul>
  );
}
