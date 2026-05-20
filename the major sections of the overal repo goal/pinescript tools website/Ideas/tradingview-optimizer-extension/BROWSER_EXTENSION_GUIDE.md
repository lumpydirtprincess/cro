# TradingView Optimizer - Browser Extension

**Automate strategy optimization directly in TradingView**

---

## Overview

This browser extension injects a custom optimization panel into TradingView that:
- Detects Pine Script strategy inputs automatically
- Changes parameters programmatically
- Runs backtests automatically
- Extracts and stores results
- Displays optimization progress and results
- **All without leaving TradingView**

**Compatible with**: Chrome, Brave, Firefox, Edge

---

## What This Extension Does

### Problem
Manual optimization in TradingView:
- Change parameter → Run backtest → Record results
- Repeat 100+ times
- Takes hours
- Error-prone
- Tedious

### Solution
This extension automates it:
1. Click "Optimize" button (injected by extension)
2. Define parameter ranges
3. Click "Start"
4. Extension runs all tests automatically
5. View results, select best parameters
6. Done in minutes

**Time savings**: 90%+ faster than manual

---

## Architecture

```
tradingview-optimizer-extension/
├── manifest.json              # Extension configuration
├── manifest_firefox.json      # Firefox-specific version
│
├── background/
│   └── service-worker.js      # Background tasks, handles messages
│
├── content/
│   ├── content.js             # Injected into TradingView pages
│   ├── injector.js            # Inject UI into TradingView
│   ├── detector.js            # Detect Pine Script inputs
│   ├── automator.js           # Automate parameter testing
│   └── extractor.js           # Extract backtest results
│
├── ui/
│   ├── panel/
│   │   ├── panel.html         # Optimization panel UI
│   │   ├── panel.js           # Panel logic
│   │   └── panel.css          # Panel styling
│   ├── modal/
│   │   ├── modal.html         # Parameter range input modal
│   │   ├── modal.js           # Modal logic
│   │   └── modal.css          # Modal styling
│   └── popup/
│       ├── popup.html         # Extension popup (browser toolbar)
│       ├── popup.js           # Popup logic
│       └── popup.css          # Popup styling
│
├── core/
│   ├── optimizer.js           # Optimization algorithms
│   ├── storage.js             # IndexedDB wrapper
│   ├── analytics.js           # Results analysis
│   └── export.js              # CSV/JSON export
│
├── utils/
│   ├── tradingview.js         # TradingView DOM selectors
│   ├── logger.js              # Logging utility
│   └── helpers.js             # Common utilities
│
├── icons/
│   ├── icon16.png            # Extension icons (various sizes)
│   ├── icon48.png
│   └── icon128.png
│
└── README.md                 # This file
```

---

## How Browser Extensions Work

### Key Concepts

**1. Manifest File**
- Configuration file (JSON)
- Tells browser what the extension does
- Defines permissions, scripts, icons

**2. Content Scripts**
- JavaScript injected into web pages
- Can read and modify page DOM
- Access to page's JavaScript context
- **This is how we interact with TradingView**

**3. Background Scripts (Service Worker)**
- Runs in background
- Handles events, messaging
- Persistent state
- No direct DOM access

**4. Popup/UI**
- Shown when clicking extension icon
- Separate HTML/CSS/JS
- Can communicate with content/background scripts

### Communication Flow

```
TradingView Page
    ↕
Content Script (content.js)
    ↕ (messages)
Background Script (service-worker.js)
    ↕ (messages)
Extension Popup/UI
```

---

## Installation & Setup

### Chrome/Brave

1. **Download Extension**
   - Clone or download this folder

2. **Open Extension Page**
   - Navigate to `chrome://extensions/` (or `brave://extensions/`)

3. **Enable Developer Mode**
   - Toggle "Developer mode" (top right)

4. **Load Extension**
   - Click "Load unpacked"
   - Select this folder

5. **Verify**
   - Extension icon appears in toolbar
   - Navigate to TradingView → extension activates

### Firefox

1. **Use Firefox Manifest**
   - Rename `manifest_firefox.json` to `manifest.json`

2. **Temporary Installation** (for development)
   - Navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `manifest.json` from this folder

3. **Permanent Installation** (after development)
   - Package as .xpi file
   - Sign with Mozilla
   - Install normally

---

## Development Workflow

### Phase 1: Hello World

**Goal**: Inject a simple button into TradingView

**Files to modify**:
- `content/content.js` - Add button injection code
- `content/injector.js` - Create injection logic

**Steps**:
1. Load extension in browser
2. Navigate to TradingView strategy page
3. Open browser console (F12)
4. Look for extension log messages
5. Verify button appears on page

**Test**:
```javascript
// In content.js
console.log('TradingView Optimizer: Extension loaded!');

// Inject button
const button = document.createElement('button');
button.textContent = 'Optimize';
button.style.cssText = 'position:fixed; top:10px; right:10px; z-index:10000;';
button.onclick = () => alert('Extension works!');
document.body.appendChild(button);
```

### Phase 2: Detect Inputs

**Goal**: Find all Pine Script strategy inputs

**Files to modify**:
- `content/detector.js` - Input detection logic

**Steps**:
1. Open TradingView strategy
2. Open browser DevTools (F12)
3. Inspect strategy settings panel
4. Find DOM elements for inputs
5. Create selectors in detector.js

**Inspection Guide**:
```javascript
// Right-click on input → Inspect
// Look for patterns like:
<input class="input-..." data-name="fast_ma_length" value="10">

// Create selector
const inputs = document.querySelectorAll('[data-name^="input"]');
```

### Phase 3: Change Parameters

**Goal**: Programmatically change input values

**Files to modify**:
- `content/automator.js` - Parameter changing logic

**Steps**:
1. Detect input element
2. Change value programmatically
3. Trigger change event (important!)
4. Verify TradingView updates

**Code Pattern**:
```javascript
function setInputValue(inputElement, newValue) {
  // Set value
  inputElement.value = newValue;

  // Trigger events so TradingView detects change
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  inputElement.dispatchEvent(new Event('change', { bubbles: true }));

  // May need to trigger blur as well
  inputElement.dispatchEvent(new Event('blur', { bubbles: true }));
}
```

### Phase 4: Extract Results

**Goal**: Get backtest results from page

**Files to modify**:
- `content/extractor.js` - Result extraction logic

**Steps**:
1. Run a backtest in TradingView
2. Inspect the results panel DOM
3. Find elements containing metrics
4. Create extraction selectors

**Example Selectors** (will need to verify):
```javascript
// These are examples - actual selectors need inspection
const netProfit = document.querySelector('.report-data .net-profit')?.textContent;
const totalTrades = document.querySelector('.report-data .total-trades')?.textContent;
const winRate = document.querySelector('.report-data .win-rate')?.textContent;
// etc...
```

### Phase 5: Automation Loop

**Goal**: Run full optimization automatically

**Files to modify**:
- `core/optimizer.js` - Main optimization logic
- `content/automator.js` - Automation orchestration

**Flow**:
```javascript
async function runOptimization(paramRanges) {
  const combinations = generateCombinations(paramRanges);

  for (let i = 0; i < combinations.length; i++) {
    const params = combinations[i];

    // 1. Set parameters
    await setStrategyParameters(params);

    // 2. Wait for backtest to complete
    await waitForBacktest();

    // 3. Extract results
    const results = extractResults();

    // 4. Store
    await storage.save({ params, results });

    // 5. Update UI
    updateProgress(i + 1, combinations.length);
  }

  // Show results
  displayResults();
}
```

### Phase 6: UI Polish

**Goal**: Professional-looking optimization panel

**Files to modify**:
- `ui/panel/*` - Panel UI and styling
- `ui/modal/*` - Parameter input modal

**Features**:
- Collapsible panel
- Parameter range inputs
- Progress bar
- Results table/chart
- Export buttons

---

## Key Technical Challenges

### 1. Finding TradingView DOM Elements

**Problem**: TradingView uses complex, dynamically generated classes

**Solution**:
- Use attribute selectors where possible
- Look for stable data attributes
- Create flexible selectors with fallbacks
- Use XPath if needed

```javascript
// Bad (class names change)
document.querySelector('.css-19g3ckt-input');

// Better (attribute selector)
document.querySelector('input[data-name="length"]');

// Best (flexible with fallback)
const input =
  document.querySelector('input[data-name="length"]') ||
  document.querySelector('input[name="length"]') ||
  document.querySelector('#length-input');
```

### 2. Waiting for Backtest Completion

**Problem**: Need to know when backtest finishes before extracting results

**Solutions**:

**A. Polling Method**:
```javascript
async function waitForBacktest() {
  const maxWait = 30000; // 30 seconds
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    // Check if loading indicator is gone
    const loadingElement = document.querySelector('.backtest-loading');
    if (!loadingElement || loadingElement.style.display === 'none') {
      // Wait a bit more to be safe
      await sleep(1000);
      return true;
    }

    await sleep(500);
  }

  throw new Error('Backtest timeout');
}
```

**B. MutationObserver Method**:
```javascript
function waitForBacktest() {
  return new Promise((resolve, reject) => {
    const resultsElement = document.querySelector('.backtest-results');

    const observer = new MutationObserver((mutations) => {
      // Check if results updated
      if (resultsElement.textContent.includes('Net Profit')) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(resultsElement, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Timeout after 30s
    setTimeout(() => {
      observer.disconnect();
      reject(new Error('Backtest timeout'));
    }, 30000);
  });
}
```

### 3. Rate Limiting

**Problem**: Too many backtests too fast might trigger TradingView limits

**Solution**:
```javascript
async function runOptimizationWithDelay(paramCombinations) {
  const delay = 2000; // 2 seconds between tests

  for (const combo of paramCombinations) {
    await runSingleTest(combo);
    await sleep(delay);  // Respectful delay
  }
}
```

### 4. Data Storage

**Problem**: Storing lots of optimization results

**Solution**: IndexedDB
```javascript
// core/storage.js
class OptimizationStorage {
  constructor() {
    this.dbName = 'TradingViewOptimizer';
    this.storeName = 'results';
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true
          });
        }
      };
    });
  }

  async saveResult(data) {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    return store.add({
      timestamp: Date.now(),
      ...data
    });
  }

  async getAllResults() {
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
```

---

## Testing & Debugging

### Browser DevTools

**Console**:
- View extension logs
- Test functions directly
- Check for errors

**Elements Tab**:
- Inspect injected UI
- Verify selectors
- Debug CSS

**Network Tab**:
- Monitor TradingView API calls (if any)
- Check for rate limiting

**Application Tab**:
- View IndexedDB data
- Check storage usage

### Extension-Specific Debugging

**View Background Script Console**:
- Chrome: `chrome://extensions/` → Extension → "service worker" link
- Firefox: `about:debugging` → Extension → "Inspect"

**Reload Extension**:
- After code changes
- Click reload button on extension page

**Check Permissions**:
- Ensure manifest.json has required permissions
- activeTab, storage, scripting, etc.

---

## Security & Privacy

### What This Extension Does:
- ✅ Only runs on TradingView pages
- ✅ Only accesses user's own account
- ✅ Stores data locally (IndexedDB)
- ✅ No external server communication
- ✅ No data collection/tracking

### What It Doesn't Do:
- ❌ Access other websites
- ❌ Send data to external servers
- ❌ Track user activity
- ❌ Modify TradingView account settings
- ❌ Access sensitive user data

### Permissions Needed:

```json
{
  "permissions": [
    "activeTab",      // Access current tab
    "storage",        // Store optimization results
    "scripting"       // Inject scripts
  ],
  "host_permissions": [
    "https://www.tradingview.com/*",  // Only TradingView
    "https://tradingview.com/*"
  ]
}
```

---

## Roadmap

### MVP (Weeks 1-4)
- [ ] Inject button into TradingView
- [ ] Detect Pine Script inputs
- [ ] Change one parameter
- [ ] Extract one result metric
- [ ] Run 10 automated tests

### v0.1 (Weeks 5-8)
- [ ] Full parameter detection
- [ ] Complete result extraction
- [ ] Basic optimization panel UI
- [ ] Grid search optimization
- [ ] Export to CSV

### v0.2 (Weeks 9-12)
- [ ] Advanced UI (charts, filters)
- [ ] Random search optimization
- [ ] Parameter sensitivity analysis
- [ ] Multi-strategy support

### v1.0 (Weeks 13-16)
- [ ] Genetic algorithm optimization
- [ ] Walk-forward analysis
- [ ] Out-of-sample testing workflow
- [ ] Cloud backup (optional)
- [ ] Polish and documentation

---

## Resources

### Browser Extension Development
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

### JavaScript & DOM
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [DOM Manipulation Guide](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

### Storage
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

### UI Libraries (Optional)
- [Chart.js](https://www.chartjs.org/) - For result visualization
- [Tabulator](http://tabulator.info/) - For data tables

---

## FAQ

**Q: Will this work with TradingView free plan?**
A: Should work, but backtesting features vary by plan. Test with your plan.

**Q: Can TradingView detect/block this?**
A: Technically possible, but unlikely. Extension just automates manual actions. Use respectfully (rate limiting).

**Q: Does this work on mobile?**
A: No. Browser extensions are desktop only.

**Q: Can I publish this to Chrome Web Store?**
A: Yes, after development. Need to follow Chrome Web Store policies and review process.

**Q: Will this break when TradingView updates?**
A: Possibly. DOM selectors may need updates. Design with flexibility in mind.

**Q: Can I sell this extension?**
A: Potentially, but check TradingView Terms of Service first. Could monetize as premium features.

---

## Next Steps

1. **Explore the scaffold** - Review all files in this folder
2. **Load in browser** - Install as unpacked extension
3. **Test basics** - Verify button injection works
4. **Inspect TradingView** - Find DOM selectors for inputs/results
5. **Build incrementally** - Start small, add features progressively

---

**This extension transforms your hyper-configurable templates from powerful to unstoppable!**
