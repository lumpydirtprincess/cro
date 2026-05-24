# TradingView PineScript & Description Scraper Workflow

This directory contains a custom, browser-driven scraper script: `scrape_tradingview.py`. It is designed to extract clean PineScript source code and formatted descriptions from TradingView open-source script pages.

---

## 🛠️ How it Works

Standard headless scrapers (like Firecrawl or Puppeteer) get blocked or trigger recaptchas on TradingView due to strict anti-bot systems, WebSockets, and WebGL charts. 

This utility bypasses all blocks by **connecting directly to a running Microsoft Edge (or Google Chrome) session** on your machine via the built-in **Chrome DevTools Protocol (CDP)**:
1. It uses your existing authenticated browser session and cookie profile.
2. It handles interactive actions (navigating tabs, clicking "Source code" buttons).
3. It extracts the raw code directly from React's internal fiber tree memory context (under the `.monaco-editor-tv-pine-light` component) to bypass Monaco Editor virtual scrolling rendering and layout limits.
4. **No browser extensions are required** for this setup. It utilizes the native CDP debugging capabilities built into all Chromium-based browsers.

---

## 📋 Step-by-Step Usage

### 1. Launch the Browser in Debug Mode
Close all instances of Edge, and then start it from your terminal or command prompt in remote debugging mode:
```powershell
cmd.exe /c start msedge.exe --remote-debugging-port=9222 --user-data-dir="C:\Users\primative\EdgeDebug"
```
*(Note: You can use `chrome.exe` instead of `msedge.exe` if you prefer Google Chrome; the remote debugging flag works exactly the same way.)*

### 2. Run the Scraper Script
Run the interactive Python script in your terminal:
```powershell
python "D:\Cro\pinescript section\scripts for training\scrape_tradingview.py"
```

### 3. Using the Interactive Command Line
The script will display the URL of the tab currently active in your browser. It will then prompt you:
```text
Enter TradingView script URL (or press Enter to scrape current tab, or 'q' to quit):
```

- **Option A (Fully Automated Navigation)**: Paste a TradingView script URL (e.g. `https://in.tradingview.com/script/LxaCl6Rp-Lorentzian-Dreamer-Retrieval-Architecture-DAFE/`). The script will navigate your active browser tab to that page and ask you to press **Enter** in the terminal once the page is fully loaded and any captchas are cleared.
- **Option B (Manual Navigation)**: Navigate to the page manually in Edge first. Then, in the terminal, just press **Enter** without pasting any URL. The script will extract data directly from whatever is open on the active tab.

### 4. Saved Files
The script automatically cleans folder and file titles, saving them under:
`D:\Cro\pinescript section\scripts for training\Dskyz[Dafe]_collective\Indicators\<Indicator_Name>\`
- `<Indicator_Name>.pine` (Pine Script)
- `_<Indicator_Name>.md` (About Description)

---

## ⚠️ Notes & Formatting Fixes

- **Double-Spacing Resolved**: 
  We resolved a common issue where text extraction from browser contexts duplicates line endings on Windows. The script is configured to explicitly strip out Windows-style carriage returns (`\r\n`), convert them to Unix newlines (`\n`), and save files with `newline="\n"`. This keeps the saved scripts at their exact original line count (e.g., 1500 lines instead of 3000).
