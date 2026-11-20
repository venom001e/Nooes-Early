# Nooes Website

The official marketing website and documentation platform for Nooes.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Icons:** Lucide React
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start local development server
- `npm run build` — Create optimized production build
- `npm run lint` — Run ESLint check
- `npm run typecheck` — Run TypeScript type-checking
- `npm run check` — Run lint + typecheck + build in one step

## Project Rules
1. **Content Location:** Page content and copy live in `src/data/pages/` and `src/data/docs/` (or dedicated route files under `src/app/`).
2. **No UI Changes When Editing Content:** When updating copy or claims, preserve exact CSS, layout wrappers, and spacing.
3. **No Invented Claims:** Never invent features, metrics, benchmarks, certifications, or partner logos. Only use verified product facts.
4. **Closed-Source Product:** Nooes is a commercial product; do not introduce open-source or public self-hosting claims.
5. **Clean Code Style:** Strict TypeScript, no `any`, 2-space indentation, mobile-first responsive design.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
