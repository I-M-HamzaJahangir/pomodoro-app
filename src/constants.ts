export const STORAGE_KEYS = {
  history: "pomodoro.history",
  focusMin: "pom.focusMin",
  breakMin: "pom.breakMin",
} as const;

export const DEFAULTS = {
  focusMin: 25,
  breakMin: 5,
};

export const MAX_HISTORY = 50;
