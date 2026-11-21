export interface DocHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface DocPage {
  slug: string;
  title: string;
  group: 'Getting Started' | 'Configure' | 'Integrations' | 'Project';
  summary?: string;
  headings: DocHeading[];
  content: string; // Markdown or rich structured content
}

export const DOCS_NAV_GROUPS = [
  {
    name: 'Getting Started',
    items: [
      { title: 'Introduction', slug: '', path: '/docs' },
      { title: 'Install', slug: 'install', path: '/docs/install' },
      { title: 'Quickstart', slug: 'quickstart', path: '/docs/quickstart' },
      { title: 'Configuration', slug: 'config', path: '/docs/config' },
      { title: 'Troubleshooting', slug: 'troubleshooting', path: '/docs/troubleshooting' },
    ],
  },
  {
    name: 'Configure',
    items: [
      { title: 'Providers and API Keys', slug: 'providers', path: '/docs/providers' },
      { title: 'Permissions', slug: 'permissions', path: '/docs/permissions' },
    ],
  },
  {
    name: 'Project',
    items: [
      { title: 'Privacy and Data', slug: 'privacy', path: '/docs/privacy' },
      { title: 'FAQ', slug: 'faq', path: '/docs/faq' },
      { title: 'Changelog', slug: 'changelog', path: '/changelog', isExternal: true },
    ],
  },
];

export const DOC_PAGES: Record<string, DocPage> = {
  '': {
    slug: '',
    title: 'Introduction',
    group: 'Getting Started',
    summary: 'Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.',
    headings: [],
    content: `
# Introduction

Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application. Nooes is proprietary software. Nooes is in early access. Pricing will be announced soon.
`,
  },

  install: {
    slug: 'install',
    title: 'Install Nooes',
    group: 'Getting Started',
    summary: 'Installation instructions coming soon.',
    headings: [],
    content: `
# Install Nooes

Coming soon. This page will be published when Nooes is released.
`,
  },
  quickstart: {
    slug: 'quickstart',
    title: 'Quickstart',
    group: 'Getting Started',
    summary: 'Quickstart guide coming soon.',
    headings: [],
    content: `
# Quickstart

Coming soon. This page will be published when Nooes is released.
`,
  },
  config: {
    slug: 'config',
    title: 'Configuration',
    group: 'Getting Started',
    summary: 'Configuration guide coming soon.',
    headings: [],
    content: `
# Configuration

Coming soon. This page will be published when Nooes is released.
`,
  },
  troubleshooting: {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    group: 'Getting Started',
    summary: 'Troubleshooting guide coming soon.',
    headings: [],
    content: `
# Troubleshooting

Coming soon. This page will be published when Nooes is released.
`,
  },
  providers: {
    slug: 'providers',
    title: 'Providers and API Keys',
    group: 'Configure',
    summary: 'Providers guide coming soon.',
    headings: [],
    content: `
# Providers and API Keys

Coming soon. This page will be published when Nooes is released.
`,
  },
  permissions: {
    slug: 'permissions',
    title: 'Permissions',
    group: 'Configure',
    summary: 'Permissions guide coming soon.',
    headings: [],
    content: `
# Permissions

Coming soon. This page will be published when Nooes is released.
`,
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy and Data',
    group: 'Project',
    summary: 'Privacy and data guide coming soon.',
    headings: [],
    content: `
# Privacy and Data

Coming soon. This page will be published when Nooes is released.
`,
  },
  faq: {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    group: 'Project',
    summary: 'Frequently asked questions about Nooes.',
    headings: [
      { id: 'what-is-nooes', title: 'What is Nooes?', level: 2 },
      { id: 'is-open-source', title: 'Is Nooes open source?', level: 2 },
      { id: 'what-does-it-cost', title: 'What does it cost?', level: 2 },
      { id: 'more-questions', title: 'More questions?', level: 2 },
    ],
    content: `
# Frequently Asked Questions

Find quick answers to common questions about Nooes.

### What is Nooes?
Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.

### Is Nooes open source?
No. Nooes is proprietary software.

### What does it cost?
Nooes is in early access. Pricing will be announced soon.

### More questions?
Email us at support@nooes.ai.
`,
  },
};

