# Nooes Docs Page: Full Content and Build Brief

> **How to use this:** Paste the whole document to an AI builder (Claude, Cursor, etc.) and say *"Build this docs site exactly as described."* Anything in `[SQUARE BRACKETS]` is a placeholder you must fill or delete before publishing. Facts marked *(verify)* came from your website template and must be checked against your real product.

---

## 1. Instructions for the AI Builder

- **Core Layout:** Build a documentation site with:
  - Left sidebar navigation.
  - Main content area.
  - Right-hand "On this page" table of contents that tracks heading levels of the active page.
- **Recommended Stack:** Astro Starlight, Docusaurus, or Nextra. Use Markdown/MDX files (one file per page) so content is easy to edit later.
- **Required Features:**
  - Fast search (`Ctrl+K` / `Cmd+K`).
  - Dark and light mode toggle.
  - Copy button on every code snippet.
  - Previous / Next navigation links at the bottom of each page.
  - "Edit this page on GitHub" link.
  - Mobile-responsive drawer / collapsible sidebar.
- **Visual Style:** Clean, generous whitespace, monospace font for code blocks, incorporating Nooes brand colors and logo from the main website `[BRAND COLORS / LOGO PATH]`.
- **Header:**
  - Nooes Logo (links to main site).
  - Docs.
  - Download.
  - Changelog.
  - GitHub icon / repository link.
  - Search box.
- **Footer Links:** Community (Discord), Changelog, Brand, Legal, Status.
- **Domain & Deployment:** Host the docs at `docs.nooes.dev` `[or your domain]`. The main website's `/docs` route already proxies to `docs.nooes.dev`, so deploy the docs there.
- **Strict Accuracy Rule:** Do not invent features. If a page needs a fact that is not in this document, leave a clearly visible `TODO` instead of guessing.
- **Tone:** Plain English, concise paragraphs, and each page dedicated to one clear goal.

---

## 2. Sitemap (Sidebar Order)

- **Intro** (`/docs`)
- **Install** (`/docs/install`)
- **Quickstart** (`/docs/quickstart`)
- **Config** (`/docs/config`)
- **Troubleshooting** (`/docs/troubleshooting`)

### Configure Group:
- **Providers and API keys** (`/docs/providers`)
- **Models** (`/docs/models`)
- **Themes** (`/docs/themes`)
- **Commands** (`/docs/commands`)
- **Extensions** (`/docs/extensions`)
- **MCP servers** (`/docs/mcp-servers`)
- **Permissions** (`/docs/permissions`)

### Integrations Group:
*(Your website download page already links to these three paths, so they must exist)*
- **IDE** (`/docs/ide/`)
- **GitHub** (`/docs/github/`)
- **GitLab** (`/docs/gitlab/`)

### Project Group:
- **Privacy and data** (`/docs/privacy`)
- **FAQ** (`/docs/faq`)
- **Changelog** (link to `/changelog` on main site)

> **Phased delivery note:** Start with the first five core pages plus Providers, Privacy, and FAQ. Add the remaining pages as the features actually ship.

---

## 3. Page: Intro (`/docs`)

- **Title:** Introduction
- **One-line summary:** Nooes is an AI coding agent that helps you write and run code. It is available as a terminal interface, a desktop app, and an IDE extension *(verify each)*.
- **What you can do (feature cards, keep only what is real):**
  - **LSP support:** Loads the right language servers automatically so the model understands your code.
  - **Multi-session:** Run several agents in parallel on the same project.
  - **Share links:** Share a link to any session for reference or debugging.
  - **Bring your own model:** Connect providers with your own API keys, or run local models.
  - **Use existing subscriptions:** Sign in with GitHub Copilot, or other supported accounts `[CONFIRM WHICH]`.
  - **Any editor:** Terminal, desktop app, or IDE extension.
- **Next steps (links):** [Install](/docs/install), [Quickstart](/docs/quickstart), [Providers](/docs/providers), [FAQ](/docs/faq).

---

## 4. Page: Install (`/docs/install`)

- **Title:** Install Nooes
- **Intro sentence:** Choose the terminal install, the desktop app, or an IDE extension.

### Terminal (CLI)

**Install script** *(verify URL works for Nooes)*:
```bash
curl -fsSL https://nooes.dev/install | bash
```

**Homebrew (macOS and Linux)** *(verify)*:
```bash
brew install nooes-ai/tap/nooes
```

**Other package managers shown on current homepage:**
- `npm` (`npm i -g [PACKAGE NAME]`)
- `bun` (`bun add -g [PACKAGE NAME]`)
- `paru` (Arch Linux)

> Fill in real package names or remove managers you do not publish.

### Desktop App
- **Status:** Beta, for macOS, Windows, and Linux.
- **Download table:**

| Platform | File |
| :--- | :--- |
| macOS, Apple Silicon | `nooes-desktop-mac-arm64.dmg` |
| macOS, Intel | `nooes-desktop-mac-x64.dmg` |
| Windows, x64 | `nooes-desktop-win-x64.exe` |
| Linux, Debian/Ubuntu | `nooes-desktop-linux-amd64.deb` |
| Linux, Fedora/RHEL | `nooes-desktop-linux-x86_64.rpm` |
| Linux, AppImage | `nooes-desktop-linux-x86_64.AppImage` |

**Homebrew Cask for macOS** *(verify)*:
```bash
brew install --cask nooes-desktop
```

- **Release channels:** Stable and Beta (both served from GitHub releases).
- **Repository notice:** If repository transitions from `nooes-ai/nooes` to `Sivo-dev/Sivo-Dev`, update the download route and all links on this page to the final repository `[FINAL REPO URL]`.

### IDE Extensions
- Link directly to `/docs/ide/` for editor-specific steps.

### System Requirements
`[TODO: Add OS versions, RAM, disk space, and required runtimes]`

---

## 5. Page: Quickstart (`/docs/quickstart`)

- **Title:** Quickstart
- **Goal:** Enable a new user to go from install to a working result in 5 minutes.
- **Steps:**
  1. **Install Nooes:** See [Install](/docs/install).
  2. **Open your project:** Open a project folder in your terminal or inside the desktop app.
  3. **Connect a provider:** See [Providers](/docs/providers). Free or local models need no external account.
  4. **Run a prompt:** Start Nooes and give it a small task (e.g. *explain this codebase* or *add a unit test for function X*).
  5. **Review diffs:** Review proposed code modifications and accept or reject them.
  6. **Collaborate:** Share the session with a link if you need teammate input.
- `[TODO: Add one screenshot or short GIF per step]`

---

## 6. Page: Config (`/docs/config`)

- **Title:** Configuration
- **Sections to cover (in order):**
  - Config file storage locations across macOS, Windows, and Linux `[PATH]`.
  - File format (`JSON` / `TOML` / `YAML`) with a clean annotated example snippet.
  - Project-level configuration vs. global configuration precedence rules (which wins).
  - Comprehensive options table: `Name`, `Type`, `Default`, `Description`.
  - How to reset settings to default values.
- `[TODO: Copy actual options list from source code; do not guess]`

---

## 7. Page: Providers and API Keys (`/docs/providers`)

- **Title:** Providers
- **Confirmed Principles:**
  - Nooes works with local models for free.
  - Connect popular providers (OpenAI, Anthropic, xAI, etc.) with your own API keys.
  - Paid provider usage billing is handled directly by that provider, never Nooes.
  - Existing subscription sign-ins: Claude Pro/Max, ChatGPT Plus/Pro, GitHub Copilot *(verify exactly which sign-ins your build supports)*.
- **Sections:**
  - Step-by-step provider connection guide with exact CLI command / UI flow `[FILL IN]`.
  - How to store and secure API keys locally.
  - Running local models (e.g. Ollama) with sample walkthrough.
  - Connecting custom or OpenAI-compatible endpoints with config snippet.
  - Troubleshooting: invalid key, rate limits, model unavailable.
- *(Note: Do not claim numbers like "75+ providers" unless proven).*

---

## 8. Page: Models (`/docs/models`)

- **Title:** Models
- **Topics:**
  - Listing available models and switching default model `[COMMANDS]`.
  - Free vs. paid models, and what "free" means in Nooes.
  - Recommendations by task:
    - Fast and cheap
    - Strongest reasoning
    - Local & private
  - Per-agent or per-command model override support.

---

## 9. Page: Themes, Commands, and Extensions

- **Themes (`/docs/themes`):** How to select a theme, custom theme file location, and minimal theme example.
- **Commands (`/docs/commands`):** Reusable custom commands (saved prompts), file path, arguments syntax, and examples.
- **Extensions (`/docs/extensions`):** Extension installation, marketplace architecture, authoring and publishing guide, manifest structure. *(Only describe implemented features; mark planned features as "Coming soon").*

---

## 10. Page: MCP Servers and Permissions

- **MCP Servers (`/docs/mcp-servers`):** One-paragraph overview of Model Context Protocol, configuration schema, and a working connection example.
- **Permissions (`/docs/permissions`):** Actions requiring approval (file edits, terminal execution, network requests), `allow` / `ask` / `deny` settings, safe defaults, and lockdown policies.

---

## 11. Pages: Integrations (IDE, GitHub, GitLab)

- **IDE (`/docs/ide/`):** One section per supported editor (VS Code, Cursor, JetBrains, etc.), installation steps, launching Nooes, shortcuts, known limitations `[LIST 5 SUPPORTED EDITORS]`.
- **GitHub (`/docs/github/`):** Integration setup, permissions scope, and examples of triggering Nooes on issues or PR comments.
- **GitLab (`/docs/gitlab/`):** Corresponding setup guide for GitLab merge requests and CI.
- *(If any integration is not ready, mark clearly as "Coming soon" rather than an empty page).*

---

## 12. Page: Privacy and Data (`/docs/privacy`)

- **Title:** Privacy and Data
- **Verified Statements:**
  - Nooes is built for privacy-sensitive environments and does not store your code or context data.
  - Data is stored only if you use hosted free models or explicitly generate share links.
  - Open source proprietary.
- **Required Sections:**
  - What stays on your local machine.
  - What data is transmitted to model providers (prompts and selected context).
  - Share link mechanics, stored contents, and deletion steps.
  - Telemetry opt-out instructions `[IF ANY]`.
  - Link to Privacy Policy tailored for local-first, BYOK architecture.

---

## 13. Page: FAQ (`/docs/faq`)

| Question | Answer |
| :--- | :--- |
| **What is Nooes?** | An AI coding agent that helps you write and run code with the model of your choice across terminal, desktop, or IDE. |
| **How do I get started?** | Install Nooes, connect a provider, and follow the Quickstart guide. |
| **Do I need an AI subscription?** | Not necessarily. You can run local models for free. For paid models, bring your own API key. |
| **Can I use existing subscriptions?** | Yes, for supported providers such as GitHub Copilot `[ADD OTHERS IF SUPPORTED]`. |
| **Can I only use it in the terminal?** | No. A desktop app and IDE extensions are also provided. |
| **How much does Nooes cost?** | Nooes itself is free `[CONFIRM]`. You only pay your respective model provider. |
| **What about data and privacy?** | See the [Privacy and Data](/docs/privacy) page. |
| **Where is the source code?** | On GitHub `[FINAL REPO URL]`, licensed under MIT `[CONFIRM]`. |

---

## 14. Page: Troubleshooting (`/docs/troubleshooting`)

- **Title:** Troubleshooting
- **Sections grouped by symptom (cause & fix):**
  - **Installation failures:** Permission errors, missing dependencies, antivirus false positives.
  - **App fails to start:** Log inspection guide and file paths `[PATH]`.
  - **Provider connection errors:** Invalid API key, corporate proxy, or firewall blocks.
  - **Model errors:** Rate limit reached, context window exceeded, model deprecated.
  - **Extension crashes:** Safe mode, disabling conflicts, version check.
  - **Bug Reporting:** Log collection command and GitHub Issue submission template.
  - **Community support:** Discord link and GitHub issues `[LINKS]`.

---

## 15. Supporting Links

- **Changelog:** Direct link to `/changelog` on the main site.
- **Brand:** Direct link to `/brand` (guidelines & vector assets).
- **Legal:** Updated Privacy Policy and Terms of Service.
- **Status:** Link to status page if hosted, otherwise omit.

---

## 16. Things You Must NOT Publish

> [!CAUTION]
> Avoid publishing unverified or legacy template data:
> - Do not include template metrics (e.g. 195K GitHub stars, 950 contributors, 13,000 commits, 16M monthly users).
> - Do not claim external compliance or enterprise certifications unless officially verified.
> - Do not reference discontinued tier names (Zen, Go, Black), hosted gateway billing, or Stripe referral plans.
> - Do not reference other agent names (e.g. "opencode pair", opencode.ai URLs, or third-party Docker images).
> - Do not copy-paste third-party documentation verbatim.

---

## 17. Checklist Before Launch

- [ ] All `[PLACEHOLDERS]` filled or deleted.
- [ ] Every install command verified on macOS, Windows, and Linux.
- [ ] All links verified (`/docs/ide/`, `/docs/github/`, `/docs/gitlab/`).
- [ ] Final repository URL updated everywhere.
- [ ] Privacy Policy and Terms adapted for local-first BYOK product.
- [ ] Unverified template metrics removed.
- [ ] Search, Dark/Light modes, and mobile responsiveness tested.

---

## 18. Prompt to Send to AI Builder

```text
Build the Nooes documentation website described in the attached document. Use Astro Starlight. Create one markdown file per page in the sitemap, with the exact content given, and leave visible TODO notes wherever a placeholder remains. Set up the sidebar groups, search, dark mode, copy buttons on code blocks, and the right-hand table of contents. Do not add any feature, number or claim that is not in the document. When finished, list every TODO that still needs my input.
```

