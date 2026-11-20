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
