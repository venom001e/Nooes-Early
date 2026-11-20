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
    summary: 'Nooes is an AI coding IDE with an agent that plans, edits and tests your code.',
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
    summary: 'Choose the terminal install, the desktop app, or an IDE extension.',
    headings: [
      { id: 'terminal-cli', title: 'Terminal (CLI)', level: 2 },
      { id: 'desktop-app', title: 'Desktop App', level: 2 },
      { id: 'system-requirements', title: 'System Requirements', level: 2 },
    ],
    content: `
# Install Nooes

Choose the terminal install, the desktop app, or an IDE extension depending on your preferred workflow.

## Terminal (CLI)

The Nooes CLI is lightweight, fast, and runs natively across macOS, Linux, and Windows (WSL / PowerShell).

### Automated Shell Installer *(verify)*

Run the official installation script in your terminal:

\`\`\`bash
curl -fsSL https://nooes.dev/install | bash
\`\`\`

### Homebrew (macOS & Linux) *(verify)*

Install via our official Homebrew tap:

\`\`\`bash
brew install nooes-ai/tap/nooes
\`\`\`

### Package Managers

You can also install Nooes using your preferred global package manager:

\`\`\`bash
# Node.js npm
npm i -g nooes

# Bun
bun add -g nooes

# Arch Linux (AUR)
paru -S nooes-bin
\`\`\`

---

## Desktop App

> **Status:** Beta &mdash; Available for macOS (Apple Silicon & Intel), Windows x64, and Linux distributions.

| Platform | Installer Package |
| :--- | :--- |
| **macOS (Apple Silicon)** | \`nooes-desktop-mac-arm64.dmg\` |
| **macOS (Intel)** | \`nooes-desktop-mac-x64.dmg\` |
| **Windows (x64)** | \`nooes-desktop-win-x64.exe\` |
| **Linux (Debian / Ubuntu)** | \`nooes-desktop-linux-amd64.deb\` |
| **Linux (Fedora / RHEL)** | \`nooes-desktop-linux-x86_64.rpm\` |
| **Linux (Universal)** | \`nooes-desktop-linux-x86_64.AppImage\` |

### Homebrew Cask (macOS) *(verify)*

\`\`\`bash
brew install --cask nooes-desktop
\`\`\`

> [!NOTE]
> **Release Channels:** Both \`stable\` and \`beta\` builds are distributed through GitHub Releases. If the repository changes from \`nooes-ai/nooes\` to \`Sivo-dev/Sivo-Dev\`, verify downloads via \`[FINAL REPO URL]\`.

---

## System Requirements

> [!IMPORTANT]
> **TODO:**
> - Supported OS: macOS 12+ (Monterey or later), Windows 10/11 (64-bit), Ubuntu 20.04+ / Debian 11+
> - Memory: Minimum 4 GB RAM (8 GB+ recommended for large project indexing)
> - Storage: 250 MB free disk space for binary and local caches
> - Runtimes: Node.js 18+ (optional, only if using npm/bun installation path)
`,
  },

  quickstart: {
    slug: 'quickstart',
    title: 'Quickstart',
    group: 'Getting Started',
    summary: 'A new user goes from install to a working result in five minutes.',
    headings: [
      { id: 'five-minute-guide', title: '5-Minute Walkthrough', level: 2 },
      { id: 'step-1-install', title: '1. Install Nooes', level: 3 },
      { id: 'step-2-open-project', title: '2. Open Your Project', level: 3 },
      { id: 'step-3-connect-provider', title: '3. Connect a Provider', level: 3 },
      { id: 'step-4-ask-task', title: '4. Start Nooes and Run a Task', level: 3 },
      { id: 'step-5-review-changes', title: '5. Review and Accept Diffs', level: 3 },
      { id: 'step-6-share-session', title: '6. Share the Session', level: 3 },
    ],
    content: `
# Quickstart

This walkthrough will take you from zero to your first AI-assisted code patch in under five minutes.

## 5-Minute Walkthrough

### 1. Install Nooes

If you haven't already, install the CLI using your preferred package manager or shell installer:

\`\`\`bash
npm i -g nooes
# or: curl -fsSL https://nooes.dev/install | bash
\`\`\`

### 2. Open Your Project

Navigate to any existing project repository in your terminal:

\`\`\`bash
cd ~/projects/my-web-app
\`\`\`

### 3. Connect a Provider

Run the interactive setup wizard or supply an environment key:

\`\`\`bash
export OPENAI_API_KEY="sk-..."
# or: export ANTHROPIC_API_KEY="sk-ant-..."
\`\`\`

*(Free or local models like Ollama require no online account or API key!)*

### 4. Start Nooes and Run a Task

Launch Nooes in your current folder:

\`\`\`bash
nooes
\`\`\`

Give Nooes a concise instruction, for example:
- *"Explain the authentication flow in this codebase"*
- *"Add unit tests for the calculateTotal function in src/utils/billing.ts"*
- *"Fix the hydration error in src/app/page.tsx"*

### 5. Review and Accept Diffs

Nooes will read relevant files, plan the changes, and display an inline colored diff. You can:
- **Accept (Y):** Apply the changes immediately to your local working tree.
- **Reject (N):** Discard the suggestion and give follow-up guidance.
- **Inspect:** View individual file changes before committing.

### 6. Share the Session

Collaborating with a teammate or seeking peer review? Run:

\`\`\`bash
/share
\`\`\`

Nooes creates a privacy-conscious, shareable web URL containing the conversation trajectory and diff summary.

> [!TIP]
> **TODO:** Add animated GIF or screenshot previews for each step above.
`,
  },

  config: {
    slug: 'config',
    title: 'Configuration',
    group: 'Getting Started',
    summary: 'Manage global and project-level settings, file formats, and options.',
    headings: [
      { id: 'file-locations', title: 'Where Config Lives', level: 2 },
      { id: 'config-format', title: 'File Format & Example', level: 2 },
      { id: 'precedence', title: 'Configuration Precedence', level: 2 },
      { id: 'options-table', title: 'Available Options', level: 2 },
      { id: 'reset-defaults', title: 'Resetting to Defaults', level: 2 },
    ],
    content: `
# Configuration

Customize Nooes behavior, model routing, safety guardrails, and telemetry settings.

## Where Config Lives

Nooes stores configuration in standard OS configuration directories:

- **macOS:** \`~/.config/nooes/config.json\`
- **Linux:** \`~/.config/nooes/config.json\` (or \`$XDG_CONFIG_HOME/nooes/config.json\`)
- **Windows:** \`%APPDATA%\\nooes\\config.json\` (e.g. \`C:\\Users\\<Username>\\AppData\\Roaming\\nooes\\config.json\`)

## File Format & Example

Configuration is written in standard JSON format:

\`\`\`json
{
  "$schema": "https://nooes.dev/schema/config.json",
  "model": "anthropic/claude-3-7-sonnet",
  "theme": "carbon",
  "editor": "code",
  "permissions": {
    "editFiles": "allow",
    "runShell": "ask",
    "network": "ask"
  },
  "lsp": {
    "enabled": true
  },
  "telemetry": false
}
\`\`\`

## Configuration Precedence

When multiple configuration files exist, settings are resolved using strict hierarchical precedence:

1. **CLI Flags** (e.g. \`--model gpt-4o\`) &mdash; *Highest precedence*
2. **Project Config** (\`<project-root>/.nooes/config.json\`) &mdash; Shared repository settings
3. **Global User Config** (\`~/.config/nooes/config.json\`) &mdash; Personal machine defaults
4. **Built-in System Defaults** &mdash; *Fallback defaults*

## Available Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| \`model\` | \`string\` | \`"anthropic/claude-3-7-sonnet"\` | Default model identifier for prompt runs. |
| \`theme\` | \`string\` | \`"carbon"\` | UI color theme (\`"carbon"\`, \`"midnight"\`, \`"paper"\`). |
| \`editor\` | \`string\` | \`"code"\` | External editor used for reviewing large diffs. |
| \`permissions.editFiles\` | \`string\` | \`"ask"\` | File modification policy (\`"allow"\`, \`"ask"\`, \`"deny"\`). |
| \`permissions.runShell\` | \`string\` | \`"ask"\` | Terminal command execution policy. |
| \`lsp.enabled\` | \`boolean\` | \`true\` | Enable automatic Language Server Protocol integration. |
| \`telemetry\` | \`boolean\` | \`false\` | Anonymous crash reporting and performance metrics. |

## Resetting to Defaults

To revert all custom configuration back to default values, remove your global config file:

\`\`\`bash
# macOS / Linux
rm -rf ~/.config/nooes/config.json

# Windows (PowerShell)
Remove-Item "$env:APPDATA\\nooes\\config.json"
\`\`\`
`,
  },

  troubleshooting: {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    group: 'Getting Started',
    summary: 'Common issues, diagnostic log locations, and fixes.',
    headings: [
      { id: 'install-issues', title: 'Installation Failures', level: 2 },
      { id: 'startup-issues', title: 'App Fails to Start', level: 2 },
      { id: 'provider-issues', title: 'Provider & Network Errors', level: 2 },
      { id: 'model-errors', title: 'Model & Context Errors', level: 2 },
      { id: 'reporting-bugs', title: 'Collecting Logs & Filing Bugs', level: 2 },
    ],
    content: `
# Troubleshooting

Find quick resolutions for common errors and setup problems.

## Installation Failures

### Permission Denied (EACCES)
If installing via \`npm i -g nooes\` fails with permission errors:
- Use a Node version manager like \`nvm\` or \`fnm\` to avoid root npm directory issues.
- Alternatively, use the standalone shell installer: \`curl -fsSL https://nooes.dev/install | bash\`.

### Antivirus False Positives (Windows)
Windows Defender may flag newly packaged binary updates. Add an exclusion rule for \`%APPDATA%\\nooes\` or run via WSL.

---

## App Fails to Start

Inspect the local diagnostic log files to view unhandled stack traces:

- **macOS / Linux:** \`~/.local/state/nooes/logs/app.log\`
- **Windows:** \`%APPDATA%\\nooes\\logs\\app.log\`

To run Nooes with verbose debug output in the terminal:

\`\`\`bash
nooes --debug
\`\`\`

---

## Provider & Network Errors

- **401 Unauthorized:** Your API key is expired, invalid, or carries trailing whitespace. Verify via \`echo $OPENAI_API_KEY\`.
- **429 Rate Limit Exceeded:** You have exhausted your provider quota or hit requests-per-minute ceilings. Check your credit balance on your provider's dashboard.
- **Corporate Firewalls / Proxies:** Configure your HTTP proxy in config:
  \`\`\`json
  { "proxy": "http://corporate-proxy:8080" }
  \`\`\`

---

## Model & Context Errors

- **Context Window Exceeded:** Run \`/compact\` in your session to summarize previous messages and free up token buffer.
- **Model Not Found:** Verify the exact model name with \`nooes models\`.

---

## Collecting Logs & Filing Bugs

Found a reproducible bug? Please help us fix it:

\`\`\`bash
nooes doctor
\`\`\`

1. Copy the output of \`nooes doctor\`.
2. Open an issue on our [GitHub Issues](https://github.com/nooes-ai/nooes/issues) tracker.
3. Join our community on [Discord](https://discord.gg/nooes) for live assistance.
`,
  },

  providers: {
    slug: 'providers',
    title: 'Providers and API Keys',
    group: 'Configure',
    summary: 'Connect OpenAI, Anthropic, Gemini, local Ollama, and custom endpoints.',
    headings: [
      { id: 'core-principles', title: 'Core Principles', level: 2 },
      { id: 'connecting-provider', title: 'Connecting a Provider', level: 2 },
      { id: 'local-models', title: 'Using Local Models (Ollama)', level: 2 },
      { id: 'custom-endpoints', title: 'Custom & OpenAI-Compatible Endpoints', level: 2 },
    ],
    content: `
# Providers and API Keys

Nooes is model-agnostic: use cloud foundation models or run private offline models on your own hardware.

## Core Principles

- **Local models are free:** No subscription, account, or internet connection required.
- **Direct billing:** If you connect a paid provider (OpenAI, Anthropic, xAI, Google), usage fees are billed directly by that provider.
- **Your keys stay private:** API keys are stored locally on your machine and are only transmitted to the designated provider endpoint.

## Connecting a Provider

Set environment variables in your shell profile (\`~/.zshrc\` or \`~/.bashrc\`):

\`\`\`bash
# Anthropic
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# OpenAI
export OPENAI_API_KEY="sk-proj-..."

# Google Gemini
export GEMINI_API_KEY="AIzaSy..."

# xAI (Grok)
export XAI_API_KEY="xai-..."
\`\`\`

Alternatively, run the interactive config command:

\`\`\`bash
nooes provider set
\`\`\`

## Using Local Models (Ollama)

Run private open-weights models locally:

1. Install and start [Ollama](https://ollama.ai/).
2. Pull a coding model:
   \`\`\`bash
   ollama pull qwen2.5-coder:7b
   \`\`\`
3. Start Nooes pointing to Ollama:
   \`\`\`bash
   nooes --model ollama/qwen2.5-coder:7b
   \`\`\`

## Custom & OpenAI-Compatible Endpoints

Connect private vLLM, LMStudio, OpenRouter, or self-hosted proxy instances:

\`\`\`json
{
  "providers": {
    "my-custom-endpoint": {
      "baseUrl": "https://api.my-endpoint.com/v1",
      "apiKey": "custom-secret-key",
      "models": ["llama-3.3-70b-instruct"]
    }
  }
}
\`\`\`
`,
  },

  permissions: {
    slug: 'permissions',
    title: 'Permissions',
    group: 'Configure',
    summary: 'Safety guardrails, approval gates, and lockdown rules.',
    headings: [
      { id: 'approval-levels', title: 'Approval Levels', level: 2 },
      { id: 'lockdown-rules', title: 'Lockdown Rules & Sandboxing', level: 2 },
    ],
    content: `
# Permissions

Nooes gives you explicit authority over all autonomous filesystem and terminal actions.

## Approval Levels

Each category of action supports three security postures:

- **\`ask\` (Default):** Prompts you for confirmation before executing.
- **\`allow\`:** Executes automatically without pausing for user input.
- **\`deny\`:** Blocks the action completely.

\`\`\`json
{
  "permissions": {
    "editFiles": "allow",
    "runShell": "ask",
    "network": "ask"
  }
}
\`\`\`

## Lockdown Rules & Sandboxing

For CI/CD runners or high-security projects, restrict shell commands to a strictly read-only whitelist or disable terminal execution entirely by setting \`runShell: "deny"\`.
`,
  },

  privacy: {
    slug: 'privacy',
    title: 'Privacy and Data',
    group: 'Project',
    summary: 'Learn how your code, keys, and session data are protected under our local-first policy.',
    headings: [
      { id: 'local-first', title: 'What Stays on Your Machine', level: 2 },
      { id: 'data-sent', title: 'What Data is Sent to Model Providers', level: 2 },
      { id: 'share-links', title: 'How Share Links Work', level: 2 },
      { id: 'telemetry', title: 'Telemetry and Opt-Out', level: 2 },
      { id: 'data-rights', title: 'Data Rights and Retention', level: 2 },
      { id: 'software-license', title: 'Software License', level: 2 },
    ],
    content: `
# Privacy and Data

Nooes is engineered from the ground up for privacy-sensitive corporate and personal engineering environments. Our core principle is simple: **we cannot leak or train on source code we never possess.**

> [!NOTE]
> Review our complete public policy anytime at [/privacy](/privacy) or [/legal/privacy-policy](/legal/privacy-policy).

## What Stays on Your Machine

Nooes operates local-first inside your workspace:
- **Your Source Code:** Nooes never mirrors, indexes, or transmits your repository to any centralized server.
- **Your Context and History:** Prompt history and session transcripts reside strictly on your local disk.
- **Your Credentials:** Provider API keys are saved locally in plaintext or your OS keychain (\`~/.config/nooes/\`), never on remote servers.

## What Data is Sent to Model Providers

When you submit a prompt to an AI model:
- Only the specific code files, diff snippets, and prompt messages required for that task are sent over direct HTTPS to your chosen provider (e.g. OpenAI, Anthropic, xAI, Gemini).
- Data processing and retention are governed by your personal agreement with each respective provider.
- If you use local models via Ollama, **zero network packets** leave your local computer.

## How Share Links Work

If you explicitly click or run \`/share\`:
- A sanitized read-only copy of that specific conversation transcript is uploaded to an encrypted sharing endpoint.
- Secrets and API keys are automatically stripped.
- You can revoke and delete any shared link at any time from your session settings.

## Telemetry and Opt-Out

Nooes respects developer privacy and avoids invasive tracking. To disable all anonymous telemetry:

\`\`\`json
{
  "telemetry": false
}
\`\`\`

## Data Rights and Retention

Because your data lives locally, deleting your local config directory (\`~/.config/nooes\`) instantly purges all local keys, chat logs, and preferences. For cloud-held contact requests or share link removals, email **privacy@nooes.dev**.

## Software License

Nooes is proprietary software.
`,
  },

  faq: {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    group: 'Project',
    summary: 'Answers to common questions about Nooes features and pricing.',
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

