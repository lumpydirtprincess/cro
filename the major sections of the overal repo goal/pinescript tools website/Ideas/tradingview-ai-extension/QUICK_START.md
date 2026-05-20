# Quick Start Guide - For Complete Beginners

## Step 1: Create Simple Icon Files (5 minutes)

The extension needs 3 icon images. Here's the EASIEST way:

### Option A: Use Online Tool (Recommended for Beginners)

1. Go to https://www.favicon-generator.org/ or https://realfavicongenerator.net/
2. Upload any image (or use their text generator)
3. Download the generated icons
4. Rename them to:
   - `icon16.png`
   - `icon48.png` 
   - `icon128.png`
5. Put all 3 files in the `icons` folder

### Option B: Create Simple Colored Squares (Even Easier)

1. Open Paint (Windows) or any image editor
2. Create a new image, 128x128 pixels
3. Fill it with a purple color (#667eea)
4. Add text "TV" or "AI" in white
5. Save as `icon128.png`
6. Resize to 48x48, save as `icon48.png`
7. Resize to 16x16, save as `icon16.png`
8. Put all 3 in the `icons` folder

**Don't worry about perfection - any icons will work!**

## Step 2: Load Extension in Chrome/Brave (2 minutes)

1. **Open Chrome or Brave browser**

2. **Type this in the address bar:**
   ```
   chrome://extensions/
   ```
   (Or `brave://extensions/` for Brave)

3. **Turn on "Developer mode"**
   - Look for a toggle switch in the top-right corner
   - Click it to turn it ON (it will turn blue/highlighted)

4. **Click "Load unpacked" button**
   - It's usually in the top-left area
   - A file picker window will open

5. **Navigate to and select the extension folder:**
   - Go to: `F:\Kirbys litter box\clean litter\tradingview-ai-extension`
   - Click "Select Folder" (or just click the folder and press Enter)

6. **Extension should appear!**
   - You'll see it in the list
   - The extension icon should appear in your browser toolbar (top right)

## Step 3: Get Your Anthropic API Key (5 minutes)

1. **Go to Anthropic website:**
   - Visit: https://console.anthropic.com/
   - Sign up for an account (or log in if you have one)

2. **Create API Key:**
   - Once logged in, look for "API Keys" or "Create Key"
   - Click "Create Key"
   - Give it a name (like "TradingView Extension")
   - Copy the key (it starts with `sk-ant-...`)
   - **IMPORTANT:** Save it somewhere safe - you won't see it again!

3. **Add credits to your account:**
   - You'll need to add payment method
   - Add at least $5-10 to start (you only pay for what you use)

## Step 4: Configure Extension (1 minute)

1. **Click the extension icon** in your browser toolbar (top right)
   - It might be hidden - click the puzzle piece icon to see all extensions

2. **Enter your API key:**
   - Paste the API key you copied
   - Click "Save API Key"
   - You should see a success message

## Step 5: Test It Out! (2 minutes)

### Test On-Chart Analysis:

1. **Go to TradingView:**
   - Visit: https://www.tradingview.com/
   - Open any chart (click on any symbol)

2. **Add some indicators:**
   - Click "Indicators" button (usually top toolbar)
   - Add RSI, MACD, or Moving Average
   - Make sure they're visible on the chart

3. **Look for the button:**
   - You should see a purple button that says "🤖 Analyze Chart" in the top-right
   - Click it!

4. **See the results:**
   - A panel should appear showing analysis
   - It will show signals, entry/TP/SL levels

### Test Editor Assistant:

1. **Open Pine Script editor:**
   - In TradingView, click "Pine Editor" (usually bottom of screen)
   - Or press Alt+E

2. **Sidebar should appear:**
   - A sidebar should appear on the right side
   - If not, refresh the page

3. **Try asking a question:**
   - Type in the chat: "Create a simple RSI indicator"
   - Press Enter or click Send
   - Wait for response (may take 10-20 seconds)

## Troubleshooting

### Extension doesn't show up:
- Make sure you selected the correct folder (`tradingview-ai-extension`)
- Check for errors in `chrome://extensions/` - click "Errors" button
- Make sure icon files exist in the `icons` folder

### Button doesn't appear on TradingView:
- Make sure you're on a chart page (URL has `/chart/` in it)
- Wait a few seconds for page to fully load
- Press F12 to open console, look for error messages
- Refresh the TradingView page

### API errors:
- Double-check API key is correct (starts with `sk-ant-`)
- Make sure you have credits in your Anthropic account
- Check internet connection

### Editor sidebar doesn't appear:
- Make sure Pine Script editor is actually open
- Try refreshing the page
- Check browser console (F12) for errors

## What to Expect

**On-Chart Analysis:**
- Works best with common indicators (RSI, MACD, MA)
- May take 5-10 seconds to analyze multiple timeframes
- Results show entry price, take profit, stop loss

**Editor Assistant:**
- AI responses take 10-30 seconds
- Code generation works best with clear requests
- Generated code is injected directly into editor

## Next Steps

Once it's working:
1. Experiment with different indicators
2. Try generating different types of strategies
3. Customize the signal rules if needed
4. Read the full README.md for advanced features

## Need Help?

- Check TROUBLESHOOTING.md for common issues
- Look at browser console (F12) for error messages
- Make sure all files are in the right places

**You're all set!** The extension is ready to use. 🚀

