# Phase 1.5 — Section F Verification Report

**Branch:** cleanup/phase-1-5  
**Date:** 2026-11-19  
**Build result:** ✅ PASSED — 31 static pages generated, TypeScript clean, exit code 0

---

## Section F.1 — Verification Grep Results

Targeted git grep run across the entire codebase.

### People (rauchg, alexandr, zeno rocha, preston-werner, maestri, masad, copplestone, podjarny, knecht, kilpatrick)
**Result:** ✅ ZERO hits in `src/` or `public/`

### Numbers/Claims (taste, goat, 100K, 40K, 53K, 130T, 427 releases, raises $, product hunt, 2261 Market)
**Result in `src/`:** ✅ ZERO hits  
**Result in `public/`:** Only binary matches in `public/printv2/front-v4.svg` (base64-encoded sticker SVG, not live site content)

### Cloned terms (commandcode, blackhole, alumniventures, soc 2, glyph, crouton, laguna, minimax, cmd login)
**Result in `src/`:** ✅ ZERO hits in all page data and components  
- Lingering pricing matrix rows (`MiniMax M3`, `Glyph Cluster`, `Crouton Alpha`) removed cleanly in desktop grid and 5 mobile plan cards.
- Lingering changelog preview items on `home.ts` and `pricing.ts` (`cmd login`, `/login`, `DeepSeek V4.1 Flash`, `Laguna`) replaced with the single neutral early access item matching `changelog.ts`.
- Lingering `, MiniMax` in `home.ts` FAQ model list removed.

**Result in `public/`:**
- `public/gh/lobehub/lobe-icons@master/packages/static-svg/icons/deepseek.svg` — icon SVG file, referenced by ModelsGrid.tsx (docs model list, waiting for owner)
- `public/gh/lobehub/lobe-icons@master/packages/static-svg/icons/minimax.svg` — unreferenced icon (MiniMax removed from live content)
- `public/gh/lobehub/lobe-icons@master/packages/static-svg/icons/qwen.svg` — icon SVG, referenced by ModelsGrid.tsx
- `public/home/providers/deepseek.svg` — referenced by home page providers section
- `public/home/providers/minimax.svg` — unreferenced (MiniMax removed from live content)
- `public/nooes-assets/command-code/refs/...` — CommandCode sticker assets (unreferenced)

### adobe / cisco / jcodesmore
**Result:**
- `THIRD_PARTY_NOTICES.md:7: Copyright (c) 2025 JCodesMore` — expected, this is the license attribution file (committed in Phase H), not live site content.
- Binary PNG matches (`public/www/about/team/companies/megallm.png`, `public/www/about/users/adp-alpha.png`) — binary asset files, no live site reference.

### deepseek / kimi / glm / qwen in `src/` (Waiting for owner)
- `src/components/docs/ModelsGrid.tsx:19` — `name: "DeepSeek V4 Pro"`, `provider: "DeepSeek"`
- `src/components/docs/ModelsGrid.tsx:21` — icon URL for DeepSeek
- `src/components/docs/ModelsGrid.tsx:25` — `name: "Qwen 2.5 Coder 32B"`
- `src/components/docs/ModelsGrid.tsx:27` — Qwen icon URL
- `src/components/docs/ModelsGrid.tsx:31` — `name: "Kimi K3.1 Pro"`
- `src/components/docs/ModelsGrid.tsx:37` — `name: "GLM-5.3"`
- `src/components/sites/nooes/FeatureShowcase.tsx:92` — `Fast model: Groq DeepSeek-R1`
- `src/components/sites/nooes/FeatureShowcase.tsx:93` — `Local fallback: Ollama / Qwen 2.5 Coder`
- `src/data/docs/docsData.ts:471` — `ollama pull qwen2.5-coder:7b`
- `src/data/docs/docsData.ts:475` — `nooes --model ollama/qwen2.5-coder:7b`

---

## Section F.2 — Public/ File Inventory

**Total files:** 474  
**Referenced in src/:** 49  
**Unreferenced:** 425  

### Key unreferenced file categories (not deleted — listed for owner review)

| Category | Files | Action |
|---|---|---|
| Testimonial user avatars | `www/home/testimonials/*.jpg/png` (43 files) | Waiting for owner |
| YouTube video thumbnails | `vi/*/hqdefault.jpg` (36 files), `home/videos/*.webp` (29 files) | Waiting for owner |
| Team/people headshots | `www/about/team/*.jpg`, `ahmadawais.png`, `amasad.png`, etc. | Waiting for owner |
| CommandCode brand assets | `nooes-assets/command-code/...` (3 files incl. 2×659KB PNGs) | Waiting for owner |
| Old favicon variants | `favicon/2024/favicon-16x16.png`, `favicon-32x32.png` (each 659KB), `safari-pinned-tab.svg` | Waiting for owner |
| Provider icons (removed models) | `home/providers/minimax.svg`, `home/providers/zhipu.svg` | Waiting for owner |
| Provider icons (lobe-icons) | `gh/lobehub/.../minimax.svg`, `antgroup.svg`, `tencent.svg` | Waiting for owner |
| Blog visuals | `www/visuals/blog-visuals/visual[4-12]*.svg` (12 files) | Blog deleted, waiting for owner |
| Old logo variants | `logov2/*.svg` (4 files) | Waiting for owner |
| CSS themes | `assets/docs-theme-1.css`, `docs-theme-2.css` | Waiting for owner |
| Sticker print SVGs | `printv2/front-v4.svg` (1.1MB), `printv2/back-v2.svg` (6.9MB) | Referenced in src |
| Misc placeholders | `.gitkeep` files, `images/.gitkeep`, `videos/.gitkeep`, `seo/.gitkeep` | Placeholder files |

---

## Section F.3 — Build Result

```
▲ Next.js 16.3.5 (Turbopack)
✓ Compiled successfully in 3.5s
✓ TypeScript: passed in 3.5s
✓ 31/31 static pages generated
Exit code: 0
```

All 31 routes built successfully:
`/`, `/_not-found`, `/about`, `/brand`, `/changelog`, `/contact`, `/desktop`, `/docs`, `/docs/install`, `/docs/quickstart`, `/docs/config`, `/docs/troubleshooting`, `/docs/providers`, `/docs/permissions`, `/docs/privacy`, `/docs/faq`, `/enterprise`, `/features`, `/forgot`, `/legal/privacy-policy`, `/legal/terms-of-service`, `/pricing`, `/privacy`, `/security`, `/signin`, `/signup`, `/terms`

---

## Section F.4 — Screenshots (all 21 taken and verified)

Screenshots taken at 375, 768, and 1280px widths across all 7 pages:
- **home** (375, 768, 1280) — clean layout, no empty gaps, no testimonials, no logo strip, no video, no fake stats
- **pricing** (375, 768, 1280) — feature matrix clean, no Crouton/Glyph/MiniMax, no Context Engine, changelog preview clean
- **about** (375, 768, 1280) — mission and values clean, no team or investor blocks
- **brand** (375, 768, 1280) — assets, wordmark, logomark, print, colors intact
- **desktop** (375, 768, 1280) — download cards, preview, FAQ intact
- **contact** (375, 768, 1280) — clean support and sales cards
- **security** (375, 768, 1280) — 7 cards, no SOC 2 / ISO claims, no orphan headings
