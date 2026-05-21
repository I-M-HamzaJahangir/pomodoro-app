import type { HistoryEntry } from "../types";
import { STORAGE_KEYS, MAX_HISTORY } from "../constants";

export const fmtTime = (sec: number): string => {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const fmtClock = (ms: number): string => {
  const d = new Date(ms);
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
};

const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function readHistory(): HistoryEntry[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "{}");
    return Array.isArray(raw[todayKey()]) ? raw[todayKey()] : [];
  } catch {
    return [];
  }
}

export function writeHistory(entries: HistoryEntry[]): void {
  try {
    const capped = entries.slice(0, MAX_HISTORY);
    localStorage.setItem(
      STORAGE_KEYS.history,
      JSON.stringify({ [todayKey()]: capped }),
    );
  } catch {}
}
