# Nooes Website — Claude Code Instructions

The official marketing website and documentation platform for Nooes.

## Tech Stack & Commands
- **Framework:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4.
- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run lint` — ESLint validation
- `npm run typecheck` — TypeScript check
- `npm run check` — Full validation suite (`lint` + `typecheck` + `build`)

## Core Project Rules
1. **Content Location:** Page content lives in `src/data/pages/` and `src/data/docs/`.
2. **Preserve Layout:** Do not change CSS classes, component structure, or spacing when editing text.
3. **No Invented Claims:** Only publish verified product facts. Do not invent benchmark numbers, certifications, or enterprise integrations.
4. **Closed-Source Product:** Treat Nooes as a commercial closed-source software platform.
5. **Code Quality:** Strict TypeScript, clean commits, and always verify with `npm run check`.
