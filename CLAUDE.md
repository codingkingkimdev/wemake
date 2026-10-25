# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server with HMR at http://localhost:5173
- `npm run build` — production build into `build/client` (static assets) and `build/server` (SSR bundle)
- `npm run start` — serve the production build with `react-router-serve`
- `npm run typecheck` — runs `react-router typegen` then `tsc`; this is the only static check (no linter or test runner is configured)

## Architecture

React Router v8 in **Framework Mode** (Vite plugin `@react-router/dev/vite`) with SSR enabled (`ssr: true` in `react-router.config.ts`), React 19, and Tailwind CSS v4.

- **Routes are configured explicitly** in `app/routes.ts`, not inferred from the filesystem. A new file under `app/routes/` does nothing until it is registered there (`index(...)`, `route(...)`, `layout(...)`, `prefix(...)` from `@react-router/dev/routes`).
- **Route module types are generated.** Each route imports `type { Route } from "./+types/<name>"`; these files live in the gitignored `.react-router/types/` and are mapped into `app/` via `rootDirs` in `tsconfig.json`. After adding or renaming a route, run `npm run typecheck` (or the dev server) to regenerate them before type errors are meaningful.
- **`app/root.tsx`** owns the HTML document (`Layout`), the top-level `ErrorBoundary`, and imports the global `app/app.css`. The Inter font is self-hosted via an `@import` at the top of `app/app.css`, not loaded from Google Fonts. Route modules export `meta`, `loader`, `action`, `ErrorBoundary`, etc. as needed.
- **Styling:** Tailwind v4 is configured CSS-first in `app/app.css` (`@import "tailwindcss"` + `@theme`); there is no `tailwind.config.js`. The `dark:` variant is class-based (`.dark` on an ancestor, set up by shadcn), so it does not follow `prefers-color-scheme` on its own.
- **Import alias:** `~/*` resolves to `app/*`.

## UI components (shadcn/ui)

- Configured by `components.json` (Radix UI primitives, "vega" style, lucide icons). Add components with `npx shadcn@latest add <name>`; never hand-write files that the CLI can generate.
- Generated components land in `app/components/ui/` and are project-owned source — edit them directly rather than wrapping them.
- Theme colors are CSS variables (`--background`, `--primary`, …) defined in `app/app.css`; change the theme there, not per component.
- Merge class names with `cn`. It comes from the `cn` package (shadcn's replacement for clsx + tailwind-merge) and is re-exported from `~/lib/utils`.

## Maintaining this file

When adding a significant library (database/ORM, UI kit, auth, validation, state management, etc.), update this file with how it is used in this project: where its code lives, conventions to follow, and any setup or commands it introduces. Do not list package names or versions — `package.json` is the source of truth for those.

## React Router skill

`.agents/skills/react-router/` contains a React Router skill with mode-specific references. This project is Framework Mode, so `references/framework-mode.md` applies. Check APIs against the installed package version (v8) rather than older React Router / Remix patterns.
