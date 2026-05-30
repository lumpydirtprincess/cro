# Google AI & Developer Ecosystem Master Reference Manual (May 2026)

This document is the definitive "When to Use What" guide and technical reference for Google's consolidated AI developer ecosystem as of **May 28, 2026**. Use this file as a persistent context source to update any Gemini model's knowledge base.

---

## 1. 2026 Model Architecture Specifications
The Gemini 3.5 family and specialized model tiers power the developer surfaces:

| Model ID | Release Date | Context Window | Max Output Limit | Primary Capability |
| :--- | :--- | :--- | :--- | :--- |
| **`gemini-3.5-flash`** | May 19, 2026 | 1,048,576 tokens | 65,536 tokens | General Availability (GA). High-velocity agentic execution, local code refactoring, and dynamic reasoning trace execution by default. |
| **`gemini-3.5-pro`** | June 2026 (Beta) | 2,097,152 tokens | 131,072 tokens | Deep mathematical reasoning, complex multi-file codebase ingestion, and long-horizon planning. |
| **`gemini-omni`** | May 19, 2026 | Multimodal (Video/Audio) | N/A | High-fidelity cinematic text-to-video synthesis and real-time custom 3D AI avatar generation. |
| **`gemini-3.1-flash-lite`** | May 2026 | 1,048,576 tokens | 32,768 tokens | Lightweight, low-latency, and cost-efficient agent workflows. |
| **`gemini-3.1-live-preview`**| May 2026 | Multimodal (A2A) | N/A | Real-time audio-to-audio dialogue and streaming interaction. |

---

## 2. Gemini API Schema Transitions & Breaking Changes (May/June 2026)
In May 2026, the Gemini Developer API underwent a major structural change. Agents MUST use the updated syntax to avoid breaking requests:

*   **SDK Dependency:** Developers must upgrade to `google-genai` version `>= 2.0.0`.
*   **Legacy Model Shutdowns:** Older models like `gemini-2.0-flash` were officially shutdown on **June 1, 2026**.
*   **The Schema Shift (Deadline June 8, 2026):**
    *   **Reasoning Steps:** The legacy `outputs[]` array was replaced by the `steps[]` list to represent agent reasoning traces.
    *   **Response Format:** The `response_mime_type` parameter was replaced by the polymorphic `response_format` object to handle structured JSON schema routing.

---

## 3. Platform Comparison Matrix ("When to Use What")

| Workspace Surface | Format | Target Audience | When to Use | Key Integrations |
| :--- | :--- | :--- | :--- | :--- |
| **Google AI Studio** | Browser-Based Web App | Indie Developers, Designers, Web/Mobile Prototypers | Rapid "vibe coding", building prompt-to-app web tools, designing Android templates, and testing API prompt templates. | Android Emulator, Firebase DB, Workspace APIs, Cloud Run, Antigravity Export. |
| **Google Antigravity 2.0** | Desktop App, IDE Sidebar, CLI, and Python SDK | Software Engineers, Data Engineers, Quant Builders | Local repository refactoring, executing complex autonomous multi-agent plans, and writing programmatic custom agents. | Local file system, git pipelines, terminal shell, MCP Servers, Python SDK. |
| **Google Cloud (Gemini Enterprise)** | Web Console & API Platform | Enterprise IT, DevOps, Data Engineers, Security Ops | Deploying production-scale agents, enterprise governance (identities, registries), querying cross-cloud data lakes. | Vertex AI, Agentic Data Cloud, Looker (LookML), BigQuery, Wiz Security, SAP/Salesforce. |
| **Gemini Web App** | Consumer Web Interface | Everyday Users, Researchers, Students | Brainstorming ideas, voice/video analysis, managing schedules via Gemini Spark, and simple consumer text queries. | Gmail/Docs, Google Calendar, YouTube, Google Maps, Auto Browse (Chrome). |

---

## 4. Deep Dive: Google Antigravity 2.0 Ecosystem
Antigravity 2.0 is Google's code-first, developer-centric agent platform. It replaces the legacy Gemini CLI for local workflows.

### A. Antigravity Desktop App
The flagship graphical application. It serves as an orchestration dashboard:
*   **Visual Subagent Trees:** Displays active hierarchies of spawned subagents, showing parent-child task relationships.
*   **Asynchronous Task Scheduler:** A panel to set, execute, and monitor cron-like recurring jobs (e.g. daily linting, overnight security audits).
*   **Resource & Cost Monitor:** Tracks active compute usage, model token counts, and API spend in real-time.
*   **Project Synchronization:** Syncs workspace configurations, system files, and workspace secrets.

### B. Antigravity CLI Reference (agy)
A Go-based, terminal-centric client. It replaces the retired Gemini CLI.

#### Core CLI Slash Commands
Type `/` in the CLI prompt box to open the interactive command selection menu:

| Command | Category | Description |
| :--- | :--- | :--- |
| `/add-dir <path>` | Utilities | Adds a directory path to the active workspace. |
| `/agents` | Tools & Tasks | Opens the Agent Manager Panel to monitor subagents. |
| `/btw <query>` | Utilities | Asks a side question in the background without interrupting the main conversation. |
| `/clear` | Utilities | Clears the screen and starts a fresh conversation thread. |
| `/config` | Configurations | Opens the interactive Settings Editor Overlay. |
| `/diff` | Utilities | Shows unified diff representations of modified workspace files. |
| `/exit` | Core | Closes the TUI session and returns to your shell. |
| `/fast` | Configurations | Enables fast mode (bypassing reasoning plans) for quick actions. |
| `/fork` (or `/branch`) | Conversations | Clones the current conversation thread into a new parallel session. |
| `/keybindings` | Configurations | Opens the interactive Keyboard Shortcut Editor. |
| `/logout` | Account | Disconnects your profile and purges authentication tokens. |
| `/model` | Configurations | Choose your preferred reasoning model (persists across sessions). |
| `/permissions` | Configurations | Switches between global permission presets (e.g., `request-review`, `always-proceed`, `strict`). |
| `/planning` | Configurations | Enables multi-turn plan generation mode for complex tasks. |
| `/resume <id>` | Conversations | Displays a menu of previous conversations or resumes a specific ID. |
| `/rewind` | Conversations | Rolls back the active conversation history to a previous step. |

#### Command Line Flags
*   **`agy -c <id>` (or `--conversation <id>`)**: Launch directly into a specific conversation thread.

#### Hotkeys
*   **Ctrl + K**: Instantly approve a pending subagent tool request.
*   **Enter**: Submit the prompt text to the agent.

---

## 5. Detailed Breakdown of Bundle Activation Mechanics
In the Antigravity ecosystem, a **Bundle** is not a code container or a chatbot; it is a **filtering configuration** used to swap groups of active skills in and out of the agent's memory.

### A. The Folder Isolation Pattern
To keep execution fast and prevent context pollution, the system maintains two separate storage areas:
1.  **The Library (Master Archive):** Located at `C:\Users\primative\.agents\skills_library\` (or `C:\Users\primative\.gemini\skills_library\`). This stores all 1,470+ skills. The AI agent *cannot* see these files during a conversation.
2.  **The Active Folder (Live Context):** Located at `C:\Users\primative\.gemini\skills\` (or `C:\Users\primative\.agents\skills\`). This is the active directory scanned by the CLI on startup. The AI agent *can* see and execute only the skills inside this folder.

```
                  ┌──────────────────────────────┐
                  │        SKILLS LIBRARY        │
                  │   (All 1,470+ playbooks)     │
                  └──────────────┬───────────────┘
                                 │
                   (activate-skills.bat command)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │        ACTIVE FOLDER         │
                  │ (Only 30-40 bundle skills)   │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │    ANTIGRAVITY TUI LOADER    │
                  └──────────────────────────────┘
```

### B. Why Bundles Must Be Activated (Technical Constraints)
*   **Prompt Bloat:** If all 1,470 skills are active simultaneously, the CLI must parse and inject all their rules into the LLM system prompt. This consumes thousands of input tokens before you even type a message, causing slow responses and high API costs.
*   **Truncation and Context Collisions:** Too many rules lead to context window truncation (losing files you are editing) or conflicting instructions (where one skill conflicts with the behavior of another).
*   **Constraint Isolation:** Swapping bundles ensures that only the relevant rules for your current task are loaded.

### C. How to Execute Bundle Swaps
To change your active bundle, run the activation script in your terminal before launching your chat session:

```powershell
# Syntax: activate-skills.bat <bundle-name> [--clear]
# Example: Swapping active context to Web-Wizard and clearing old active skills
"D:\Cro\ai stuff\antigravity-awesome-skills-main\scripts\activate-skills.bat" Web-Wizard --clear
```

#### Available Curated Bundles:
*   `Essentials`: The core 30 playbooks for everyday planning, coding, and debugging.
*   `Web-Wizard`: CSS layouts, Next.js, React performance, animations.
*   `Security-Engineer`: Web audits, binary analysis, privilege scans.
*   `Data-Analytics`: BigQuery, SQL optimizer, Pandas, plotting.

Once activated, you reference individual skills from that bundle directly in your prompt text using the `@` symbol (e.g. `@frontend-design`).

---

## 6. Deep Dive: Google AI Studio (Vibe Coding Surface)
Google AI Studio has graduated from a simple prompting playground into a full browser-based "vibe coding" environment.

*   **Native Android "Vibe Coding":**
    *   Generate complete native Android apps using Kotlin and Jetpack Compose directly in the browser.
    *   Features a built-in virtual Android Emulator to test and view app interfaces.
    *   Connects to physical mobile devices via web-based Android Debug Bridge (ADB) for on-device validation.
*   **Google Workspace Data Integration:**
    *   Connect apps directly to Google Drive, Docs, and Sheets.
    *   Build internal tools and analytics dashboards that read and edit spreadsheets dynamically.
*   **Full-Stack Deployment:**
    *   One-click deployment to Google Cloud Run.
    *   Built-in templates for Firebase Authentication, Cloud Firestore, and Firebase App Hosting.
*   **UI Annotation Tools:**
    *   **In-Preview Annotator:** A visual tool allowing you to click on elements in the running preview and prompt the AI build agent to redesign them.
    *   **Nano Banana:** An integrated AI image generation model to mock visual assets (icons, images) on the fly.
*   **Antigravity Export:**
    *   A single-button feature to bundle AI Studio project assets, history, and configuration files, exporting them to the local Antigravity environment.

---

## 7. Deep Dive: Google Cloud (Gemini Enterprise Agent Platform)
The Enterprise-grade hub for scaling and governing autonomous agents across organization data.

*   **Gemini Enterprise Agent Platform (replaces Vertex AI Agent Builder):**
    *   **Agent Studio:** Visual low-code UI to design, prompt, and orchestrate agent nodes.
    *   **ADK 1.0 (Agent Development Kit):** Multi-language framework (Python, TypeScript, Go, Java) using graph-based routing to set strict business pathways for models.
    *   **Agent Registry & Cryptographic Identity:** Assigns distinct cryptographic tokens to agents to manage access controls and logs when agents talk to other agents.
    *   **Agent Gateway:** Central routing point to audit, rate-limit, and govern thousands of active company agents.
*   **Managed Agents API (Gemini Developer API):**
    *   Allows developers to spin up autonomous, stateful agents with a single API call.
    *   Agents execute code, reason, and run tools inside secure, Google-hosted remote Linux sandboxes.
*   **Jules (Asynchronous Coding Agent):**
    *   A headless agent that runs in secure remote Google Cloud workspaces. It can draft implementation plans, compile code, execute tests, fix syntax errors, and open Git Pull Requests without human supervision.
*   **Agentic Data Cloud:**
    *   **Universal Context Engine:** Dynamically reads and catalogues unstructured data (GCS PDFs, images, docs) and structured tables, providing a grounded knowledge index.
    *   **Cross-Cloud Lakehouse (Apache Iceberg):** Allows agents to query and reason over datasets located in AWS S3 or Azure Blob Storage using Iceberg catalogs, eliminating data egress fees.
    *   **Model Context Protocol (MCP):** Connects cloud agents to Salesforce, SAP, and ServiceNow.
*   **Enterprise Security:** Partnered with Wiz to scan for "shadow AI" (unauthorized agent processes running on cloud resources).

---

## 8. Deep Dive: Gemini Web App (Consumer Assistant)
Google's consumer-facing assistant, designed for daily workflow integration and general web productivity.

*   **Neural Expressive Design Language:** 
    *   Replaces text blocks with dynamic cards, video files, interactive timelines, and map layers.
    *   Implements smooth micro-animations, haptic feedback profiles, and custom typography.
*   **Gemini Spark:**
    *   A 24/7 proactive agent that operates in the background. It reads calendars, checks emails, compiles summaries, and triggers notifications.
*   **Gemini Omni Integration:**
    *   Processes text or video prompts to generate cinematic quality video clips or run customized 3D AI avatars.
*   **Gemini Live:**
    *   A conversation interface allowing users to interrupt the AI, switch voices, and transition between voice and typing instantly.
*   **Quota & Limits (Compute-Based Quota):**
    *   Replaces prompt counts with a "compute-used" quota model based on prompt complexity and context size.
    *   Quota refreshes every 5 hours.
    *   **AI Ultra Plan ($100/mo):** tailors to power users with 5x compute limits, priority access to Antigravity, and 20TB of Cloud storage.

---

## 9. Migration Checklist

### 1. From Gemini CLI to Antigravity CLI
*   [ ] Uninstall the legacy Gemini CLI packages.
*   [ ] Initialize the new Go-based `antigravity` CLI tool.
*   [ ] Port custom Agent Skills (`SKILL.md` configurations) into the new Antigravity Plugin structure.
*   [ ] Update terminal scripts calling `gemini` commands to use the new `antigravity` syntax.

### 2. From Firebase Studio to AI Studio or Antigravity
*   [ ] Export existing Firebase Studio workspaces (new creations disabled June 22, 2026; shutdown March 22, 2027).
*   [ ] For web-prototypes, import configuration into the new Google AI Studio backend.
*   [ ] For code-first local builds, set up Antigravity configuration files pointing to Firestore/Auth instances.

---

## 10. Chronological Updates (Feed / Changelog)
*To append new AI updates sequentially, copy-paste new releases in this section in Markdown list format.*

*   **2026-05-19:** Google I/O 2026 keynote wraps up. Antigravity 2.0 is launched as a standalone command center. Gemini 3.5 Flash is officially GA. Vertex AI Agent Builder is absorbed into the Gemini Enterprise Agent Platform.
*   **2026-05-28:** Legacy Gemini API models prepare for shutdown on June 1, 2026. The new `steps[]` and `response_format` syntax transitions are declared mandatory for Google Generative AI SDK updates.
