# Portfolio — Gamified Product & Visual Designer Experience

An immersive, gamified portfolio site built as an interactive world rather than a
traditional scrolling page. Visitors "spawn" into an experience, explore six themed
"worlds," open projects as game-style missions, and unlock achievements and XP as
they go.

## Stack

- **React 19 + TypeScript + Vite** — app shell and build tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite`, CSS-first `@theme` tokens in `src/index.css`)
- **Framer Motion** — micro-interactions, scroll reveals, magnetic buttons, modals
- **Three.js + React Three Fiber + drei** — floating glass "islands" background (lazy-loaded)
- **Lenis** — smooth/inertial scrolling
- **Zustand** (with persist) — gamification state: XP, levels, explored worlds, achievements

## Structure

```
src/
  components/
    background/   Aurora CSS background + Three.js floating field
    cursor/       Custom magnetic/glow cursor
    hud/          XP bar, achievement toasts, completion modal
    intro/        "Press Start" cinematic loading sequence
    nav/          Holographic radial nav + minimap/progress dock
    project/      Mission card + full mission detail modal
    ui/           Shared building blocks (glass panels, stat counters, skill radar, etc.)
    worlds/       The six explorable "world" sections
  data/content.ts Single source of truth for profile stats, projects, tokens, copy
  store/gameStore.ts  Zustand store powering XP/achievements/exploration tracking
  lib/            Small helpers (classnames, smooth-scroll bridge to Lenis)
```

## Getting Started

```bash
npm install
npm run dev      # start local dev server
npm run build    # type-check + production build
npm run lint     # eslint
```

## Personalizing

- Edit `src/data/content.ts` for profile stats, skills, timeline, project case studies,
  design tokens, and "Beyond Design" scrapbook items.
- Replace the contact links in `src/components/ContactPortal.tsx`.
- Achievement copy lives in the `ACHIEVEMENTS` map in `src/data/content.ts`.

## License

MIT
