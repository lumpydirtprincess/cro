# Step-by-Step Installation (With Pictures Guide)

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] Chrome or Brave browser installed
- [ ] TradingView account (free account works)
- [ ] Anthropic account (for API key)
- [ ] The extension folder: `tradingview-ai-extension`

---

## PART 1: Create Icons (Required)

### Why?
Browser extensions require icon files to load. Without them, the extension won't work.

### How to Create Icons (Choose One Method):

#### Method 1: Use Any Image (Easiest)

1. Find ANY image online (or use a screenshot)
2. Go to https://www.iloveimg.com/resize-image
3. Upload your image
4. Resize to 128x128, download
5. Resize to 48x48, download  
6. Resize to 16x16, download
7. Rename them:
   - `icon128.png`
   - `icon48.png`
   - `icon16.png`
8. Put all 3 files in: `clean litter/tradingview-ai-extension/icons/`

#### Method 2: Create in Paint (Windows)

1. Open Paint
2. Click "Resize" → Set to 128x128 pixels
3. Fill with color (use purple: #667eea)
4. Add text "TV" or "AI"
5. Save as `icon128.png` in the `icons` folder
6. Repeat for 48x48 and 16x16 sizes

#### Method 3: Use Text-to-Icon Generator

1. Go to https://favicon.io/favicon-generator/
2. Type "TV" or "AI"
3. Choose colors
4. Download the package
5. Extract and rename files to `icon16.png`, `icon48.png`, `icon128.png`
6. Put in `icons` folder

**✅ Check:** You should have 3 PNG files in the `icons` folder

---

## PART 2: Load Extension in Browser

### Step 1: Open Extensions Page

1. Open Chrome or Brave
2. In the address bar, type:
   ```
   chrome://extensions
   ```
   Press Enter

### Step 2: Enable Developer Mode

1. Look at the top-right of the page
2. Find the toggle that says "Developer mode"
3. Click it to turn it ON
4. You'll see new buttons appear below

### Step 3: Load the Extension

1. Click the "Load unpacked" button (top-left)
2. A file picker window opens
3. Navigate to:
   ```
   F:\Kirbys litter box\clean litter\tradingview-ai-extension
   ```
4. Click "Select Folder" (or just press Enter)

### Step 4: Verify It Loaded

You should see:
- ✅ Extension appears in the list
- ✅ No red error messages
- ✅ Extension icon in browser toolbar (top-right, may be hidden)

**If you see errors:**
- Check that icon files exist
- Make sure you selected the correct folder
- Click "Errors" button to see what's wrong

---

## PART 3: Get Anthropic API Key

### Step 1: Create Account

1. Go to: https://console.anthropic.com/
2. Click "Sign Up" or "Log In"
3. Create account (email + password)

### Step 2: Create API Key

1. Once logged in, look for "API Keys" in the menu
2. Click "Create Key"
3. Give it a name: "TradingView Extension"
4. Click "Create"
5. **COPY THE KEY** - it starts with `sk-ant-...`
6. Save it somewhere (you won't see it again!)

### Step 3: Add Credits

1. Go to "Billing" or "Credits"
2. Add payment method
3. Add at least $5-10 in credits
4. You only pay for what you use (very cheap per request)

---

## PART 4: Configure Extension

### Step 1: Open Extension Popup

1. Click the extension icon in browser toolbar
   - If you don't see it, click the puzzle piece icon (extensions menu)
2. Extension popup should open

### Step 2: Enter API Key

1. Paste your API key in the text box
2. Click "Save API Key"
3. You should see "API key saved successfully!"

**✅ Extension is now configured!**

---

## PART 5: Test On TradingView

### Test 1: On-Chart Analysis

1. **Go to TradingView:**
   - Visit: https://www.tradingview.com/
   - Log in (free account works)

2. **Open a chart:**
   - Search for any symbol (e.g., "BTCUSD", "AAPL")
   - Click on it to open chart

3. **Add indicators:**
   - Click "Indicators" button (top toolbar)
   - Search for "RSI" and add it
   - Search for "MACD" and add it
   - Make sure they appear on the chart

4. **Look for the button:**
   - Top-right of the chart, you should see:
   - Purple button: "🤖 Analyze Chart"
   - If you don't see it, wait 5 seconds and refresh page

5. **Click the button:**
   - A panel should appear on the right
   - It will analyze the chart
   - Shows signals, entry/TP/SL

**✅ On-chart analysis works!**

### Test 2: Editor Assistant

1. **Open Pine Script editor:**
   - In TradingView, look for "Pine Editor" button
   - Usually at the bottom of the screen
   - Or press `Alt + E` keyboard shortcut

2. **Sidebar should appear:**
   - Right side of screen should show a sidebar
   - Title: "🤖 Pine Script Assistant"
   - If not, refresh the page

3. **Test code generation:**
   - In the chat box, type:
     ```
     Create a simple RSI indicator that shows when RSI is above 70
     ```
   - Press Enter or click "Send"
   - Wait 10-30 seconds
   - Code should appear in the chat
   - Code should also be injected into the editor

4. **Test code explanation:**
   - Type some code in the editor (or select existing code)
   - Click "Explain Code" button
   - Wait for explanation

**✅ Editor assistant works!**

---

## Common Issues & Quick Fixes

### Issue: "Extension won't load"
**Fix:** 
- Make sure icon files exist in `icons` folder
- Check you selected the correct folder
- Look for error messages in `chrome://extensions/`

### Issue: "Button doesn't appear on TradingView"
**Fix:**
- Make sure you're on a chart page (URL has `/chart/`)
- Wait 5-10 seconds for page to load
- Refresh the page
- Check browser console (F12) for errors

### Issue: "API errors"
**Fix:**
- Double-check API key is correct
- Make sure you have credits in Anthropic account
- Check internet connection

### Issue: "Sidebar doesn't appear"
**Fix:**
- Make sure Pine Script editor is actually open
- Try refreshing the page
- Check browser console (F12)

---

## Success Checklist

You're all set when:
- [x] Extension loads without errors
- [x] API key is saved
- [x] "Analyze Chart" button appears on TradingView
- [x] Chart analysis works
- [x] Editor sidebar appears when editor opens
- [x] AI code generation works

---

## What's Next?

Now that it's working:
1. **Experiment** with different indicators
2. **Try generating** different strategies
3. **Read README.md** for advanced features
4. **Customize** signal rules if needed

**Congratulations! You've installed your first browser extension! 🎉**

