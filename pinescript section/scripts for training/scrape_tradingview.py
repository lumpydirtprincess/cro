import urllib.request
import json
import time
import os
import re
from websocket import create_connection

# Sanitizes the TradingView page title to create a clean folder/file name
def sanitize_title(title):
    # Extract main title by splitting common delimiters in TradingView titles
    main_title = title.split(" — ")[0].split(" - ")[0]
    # Remove special characters
    sanitized = re.sub(r'[^a-zA-Z0-9\s_-]', '', main_title)
    # Replace spaces and hyphens with underscores
    sanitized = re.sub(r'[\s-]+', '_', sanitized)
    # Collapse multiple underscores
    sanitized = re.sub(r'_+', '_', sanitized)
    return sanitized.strip('_')

# Fetches pages from local Edge remote debugger
def get_websocket_url():
    try:
        with urllib.request.urlopen("http://127.0.0.1:9222/json") as response:
            pages = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"\n[ERROR] Connection failed: {e}")
        print("Please ensure Microsoft Edge is running on port 9222 using remote debugging:")
        print('cmd.exe /c start msedge.exe --remote-debugging-port=9222 --user-data-dir="C:\\Users\\primative\\EdgeDebug"\n')
        return None, None

    # Prefer an open TradingView script tab
    for page in pages:
        url = page.get("url", "")
        if "tradingview.com/script/" in url:
            return page.get("webSocketDebuggerUrl"), url
            
    # Fallback to any active web page
    for page in pages:
        url = page.get("url", "")
        if url.startswith("http://") or url.startswith("https://"):
            return page.get("webSocketDebuggerUrl"), url
            
    return None, None

class CDPConnection:
    def __init__(self, ws_url):
        self.ws = create_connection(ws_url, suppress_origin=True)
        self.cmd_id = 1
        
    def send_cmd(self, method, params=None):
        cmd = {
            "id": self.cmd_id,
            "method": method,
            "params": params or {}
        }
        self.ws.send(json.dumps(cmd))
        
        # Read from websocket until we receive the response matching our cmd_id
        while True:
            msg = self.ws.recv()
            res = json.loads(msg)
            if res.get("id") == self.cmd_id:
                self.cmd_id += 1
                if "error" in res:
                    print(f"CDP Error: {res['error']}")
                    return None
                return res.get("result")
                
    def evaluate(self, expression):
        res = self.send_cmd("Runtime.evaluate", {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": True
        })
        if res:
            if "exceptionDetails" in res:
                print(f"JS Exception: {res['exceptionDetails']}")
                return None
            return res.get("result", {}).get("value")
        return None
        
    def close(self):
        self.ws.close()

def main():
    print("=" * 60)
    print("      TRADINGVIEW INDICATOR SCRAPER & EXTRACTOR")
    print("=" * 60)
    
    # 1. Connect to Edge
    ws_url, current_url = get_websocket_url()
    if not ws_url:
        input("Press Enter to exit...")
        return
        
    print(f"Connected to Edge tab: {current_url}")
    conn = CDPConnection(ws_url)
    
    try:
        while True:
            print("\n" + "-" * 50)
            url_input = input("Enter TradingView script URL (or press Enter to scrape current tab, or 'q' to quit): ").strip()
            
            if url_input.lower() == 'q':
                break
                
            if url_input:
                # Navigate to the new URL
                print(f"Navigating tab to: {url_input}...")
                conn.send_cmd("Page.bringToFront")
                conn.send_cmd("Page.navigate", {"url": url_input})
                print("Waiting for page load...")
                time.sleep(2)
                input("Press Enter once the page is fully loaded in Edge (and any captchas are resolved)...")
            else:
                conn.send_cmd("Page.bringToFront")
            
            # Get Page Title
            title = conn.evaluate("document.title")
            if not title:
                print("[ERROR] Could not read page title. Is the page loaded?")
                continue
                
            sanitized = sanitize_title(title)
            print(f"Sanitized Title: {sanitized}")
            
            # Click "Source code" tab
            click_js = """
            (() => {
                // Check if code container already exists (meaning source is already open)
                if (document.querySelector('.monaco-editor-tv-pine-light') || document.querySelector('div[class*="code-"]')) {
                    return "Already open";
                }
                const elements = Array.from(document.querySelectorAll('button, div, span, a, li'));
                const btn = elements.find(el => el.innerText && el.innerText.trim().toLowerCase() === 'source code');
                if (btn) {
                    btn.click();
                    return "Clicked 'Source code' button";
                }
                return "Source code button not found";
            })()
            """
            click_res = conn.evaluate(click_js)
            print(f"Source Code status: {click_res}")
            
            # Wait a moment for Monaco editor to load code into React Fiber
            print("Loading editor data...")
            time.sleep(2)
            
            # Extract Code & Description
            extract_js = """
            (() => {
                const results = { code: null, desc: null };
                
                // 1. Find Code via React Fiber
                const el = document.querySelector('.monaco-editor-tv-pine-light') || document.querySelector('div[class*="code-"]');
                if (el) {
                    const fiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
                    if (fiberKey) {
                        const fiber = el[fiberKey];
                        if (fiber && fiber.memoizedProps && typeof fiber.memoizedProps.children === 'string' && fiber.memoizedProps.children.includes('//@version')) {
                            results.code = fiber.memoizedProps.children;
                        } else {
                            let node = fiber;
                            while (node) {
                                if (node.memoizedProps) {
                                    if (typeof node.memoizedProps.sourceCode === 'string' && node.memoizedProps.sourceCode.includes('//@version')) {
                                        results.code = node.memoizedProps.sourceCode;
                                        break;
                                    }
                                    if (typeof node.memoizedProps.textToCopy === 'string' && node.memoizedProps.textToCopy.includes('//@version')) {
                                        results.code = node.memoizedProps.textToCopy;
                                        break;
                                    }
                                }
                                node = node.return;
                            }
                        }
                    }
                }
                
                // 2. Find Description
                const descEl = document.querySelector('div[class*="description-"], div[class*="text-content"], div[class*="descriptionContent"]');
                if (descEl) {
                    results.desc = descEl.innerText || descEl.textContent;
                }
                
                return results;
            })()
            """
            
            extracted = conn.evaluate(extract_js)
            if not extracted or not extracted.get("code"):
                print("[ERROR] Failed to extract Pine Script code. Make sure the 'Source code' is visible on the page.")
                continue
                
            code = extracted.get("code")
            desc = extracted.get("desc")
            
            # Save files
            dest_dir = os.path.join(
                r"D:\Cro\pinescript section\scripts for training\Dskyz[Dafe]_collective\Indicators",
                sanitized
            )
            os.makedirs(dest_dir, exist_ok=True)
            
            # Pine file
            pine_path = os.path.join(dest_dir, f"{sanitized}.pine")
            clean_code = code.replace("\r\n", "\n").strip()
            with open(pine_path, "w", encoding="utf-8", newline="\n") as pf:
                pf.write(clean_code)
            print(f"Saved Pine Script: {pine_path} ({len(clean_code)} chars)")
            
            # Markdown description file
            if desc:
                md_path = os.path.join(dest_dir, f"_{sanitized}.md")
                # Prepend indicator title
                md_content = f"# {title.split(' — ')[0].split(' - ')[0]}\n\n{desc.strip()}\n"
                clean_md_content = md_content.replace("\r\n", "\n")
                with open(md_path, "w", encoding="utf-8", newline="\n") as mf:
                    mf.write(clean_md_content)
                print(f"Saved Description: {md_path} ({len(clean_md_content)} chars)")
            else:
                print("[WARNING] Could not extract description.")
                
            print("\n[SUCCESS] Extracted indicator successfully!")
            
    finally:
        conn.close()
        print("\nDisconnected from Edge debugging port. Goodbye!")

if __name__ == "__main__":
    main()
