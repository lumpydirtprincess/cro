# Installation Guide

## Quick Start

### 1. Prerequisites
- Chrome, Brave, Edge, or Firefox browser
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### 2. Install Extension

#### Chrome/Brave/Edge:
1. Open `chrome://extensions/` (or `brave://extensions/`)
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Navigate to and select the `tradingview-ai-extension` folder
5. Extension icon should appear in your browser toolbar

#### Firefox:
1. Navigate to `about:debugging`
2. Click "This Firefox" tab
3. Click "Load Temporary Add-on"
4. Select `manifest.json` from the extension folder
5. Extension will load (note: temporary add-ons are removed on browser restart)

### 3. Configure API Key

1. Click the extension icon in your browser toolbar
2. Enter your Anthropic API key (starts with `sk-ant-`)
3. Click "Save API Key"
4. You're ready to use the extension!

### 4. Create Extension Icons

Before using the extension, you need to add icon files:

1. Create three PNG images:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

2. Place them in the `icons/` folder

3. You can use any image editor or online tool to create these icons

**Quick Icon Creation Tips:**
- Use a purple gradient (#667eea to #764ba2)
- Add a robot/AI symbol (🤖)
- Include "TV" or "AI" text
- Keep design simple and recognizable at small sizes

### 5. Start Using

**On-Chart Analysis:**
- Go to any TradingView chart
- Click the "🤖 Analyze Chart" button (top right)
- View AI-generated trading signals

**Editor Assistant:**
- Open Pine Script editor in TradingView
- Sidebar will appear automatically
- Ask questions or use quick actions

## Troubleshooting

**Extension not loading:**
- Check that all files are present
- Verify `manifest.json` is valid JSON
- Check browser console for errors

**Icons not showing:**
- Make sure icon files exist in `icons/` folder
- Verify icon files are valid PNG images
- Check file names match exactly: `icon16.png`, `icon48.png`, `icon128.png`

**API errors:**
- Verify API key is correct
- Check API key has credits available
- Ensure internet connection is active

## Next Steps

- Read the main [README.md](README.md) for usage examples
- Check browser console (F12) if something isn't working
- Report issues or contribute improvements

