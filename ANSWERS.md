# Answers

## 1-How to Run

**Deployed URL:** https://pomodoro-app-six-blond.vercel.app/

To run locally on a fresh machine:

**Prerequisites**

- Node.js 18+ — https://nodejs.org

**Steps**

```bash
git clone <repo-url>
cd pomodoro-app
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## 2-Stack & Design Choices

I've been working with React for years so that was an easy call. For design, two things stand out:

First, I put session history in a slide-up drawer instead of listing it below the timer. If I would stacked it below, the page would scroll as sessions pile up and the whole layout would fall apart. The drawer keeps everything on one screen.

Second, I added sounds when the drawer opens and closes. It's a small thing but it makes the app feel like you're actually interacting with something rather than just clicking buttons.

## 3-Responsive & Accessibility

The app works across screen sizes — the timer scales with `clamp()` and the steppers stay on one row on small phones. On a wide laptop everything stays centred and nothing stretches.

For accessibility I added `aria-label` on buttons and `aria-live` on the mode pill. I also handle `prefers-reduced-motion` to disable animations for users who need that.

That said, I didn't do a full accessibility audit. I skipped Keyboard nav and screen reader testing beacuse its not something that I enjoy.

## 4-AI Usage

I used Claude Code, mostly for the `useTimer` hook that's where all the core logic lives so it needed the most help.

One thing I changed: the AI implemented sounds using the WebAudio API, synthesising tones with oscillators directly in the browser. I replaced it with `react-sounds` so I could use real audio files instead. The sound logic went from 40+ lines of oscillator code down to two `useSound` calls.

I also used AI to help write these `ANSWERS.md` — the thoughts and decisions are all mine, I just used it to fix my English and make the wording cleaner.

## 5-Honest Gap

Two things. First, accessibility — I added the basics but never actually tested it properly and I am not planing to fix it on another day as I just don't enjoy this part.

Second, `useTimer` is doing too much. It handles the countdown, session history, mode switching, and sound — all in one hook. I'd break it up into smaller pieces so each part is easier to follow and test on its own.
