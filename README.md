# Nooes Website

The official website for Nooes, built with Next.js 16, React 19, and Tailwind CSS v4.

## Getting Started

### Prerequisites

- Node.js 24+
- npm

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

### Environment

Copy `.env.example` to `.env.local` to configure environment variables:

- `ALLOW_INDEXING` — Set to `true` only at launch to enable search engine indexing and sitemap generation. When unset or `false`, search engines are disallowed (`noindex, nofollow`).

### Production Build

```bash
npm run build
```

To run linting, typechecking, and build validation in one step:

```bash
npm run check
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4, Lucide React
- **Language:** TypeScript
