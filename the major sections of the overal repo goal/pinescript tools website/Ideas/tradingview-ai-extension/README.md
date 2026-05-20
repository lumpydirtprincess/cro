# TradingView AI Analysis & Pine Script Assistant Extension

A comprehensive browser extension for TradingView that provides AI-powered chart analysis and Pine Script coding assistance.

## 🚀 New to Browser Extensions?

**Start here:**
- **[QUICK_START.md](QUICK_START.md)** - Fast 5-minute setup guide
- **[STEP_BY_STEP.md](STEP_BY_STEP.md)** - Detailed beginner-friendly instructions with screenshots guide

If you've never installed a browser extension before, read one of these guides first!

## Features

### Part 1: On-Chart Analysis Tool
- **Multi-Timeframe Analysis**: Analyze indicators across 2-3 timeframes simultaneously
- **Indicator Detection**: Automatically detects and reads RSI, MACD, Moving Averages, Bollinger Bands, Stochastic, and WaveTrend
- **Signal Generation**: Rules-based system that generates trading signals (LONG/SHORT) with:
  - Entry price
  - Take Profit levels
  - Stop Loss levels
  - Confidence scores
  - Detailed explanations of which indicators triggered the signal

### Part 2: Pine Script Editor Assistant
- **Natural Language Coding**: Generate Pine Script code from plain English descriptions
- **Code Explanation**: Understand existing code with AI-powered explanations
- **Code Modification**: Modify existing scripts based on natural language requests
- **Brainstorming**: Guided question-answering session to develop trading strategies
- **Debugging**: Get help fixing Pine Script errors

## Installation

### Chrome/Brave/Edge

1. Clone or download this repository
2. Open `chrome://extensions/` (or `brave://extensions/`)
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `tradingview-ai-extension` folder

### Firefox

1. Navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder

## Setup

1. **Get Anthropic API Key**:
   - Sign up at [Anthropic Console](https://console.anthropic.com/)
   - Create an API key
   - Click the extension icon in your browser toolbar
   - Enter your API key and click "Save"

2. **Using On-Chart Analysis**:
   - Navigate to any TradingView chart
   - Click the "🤖 Analyze Chart" button (top right)
   - Select timeframes to analyze
   - View generated signals with entry, TP, and SL levels

3. **Using Editor Assistant**:
   - Open Pine Script editor in TradingView
   - The assistant sidebar will automatically appear
   - Ask questions or use quick actions (Explain, Modify, Brainstorm)
   - Generated code will be injected into the editor

## Project Structure

```
tradingview-ai-extension/
├── manifest.json                 # Extension configuration
├── background/
│   └── service-worker.js         # Background script
├── content/
│   ├── chart-analyzer/           # On-chart analysis components
│   │   ├── chart-analyzer.js
│   │   ├── indicator-extractor.js
│   │   ├── timeframe-switcher.js
│   │   ├── signal-generator.js
│   │   └── analysis-display.js
│   ├── editor-assistant/         # Editor assistant components
│   │   ├── editor-assistant.js
│   │   ├── editor-detector.js
│   │   ├── code-extractor.js
│   │   ├── ai-client.js
│   │   ├── code-injector.js
│   │   └── brainstorming-engine.js
│   └── content-main.js           # Main entry point
├── core/
│   ├── indicator-library.js      # Indicator definitions
│   ├── signal-rules.js           # Trading signal rules
│   ├── storage.js                # Storage utilities
│   └── utils/
│       ├── logger.js
│       └── tradingview-dom.js
├── ui/
│   ├── chart-panel/              # Chart analysis UI
│   │   └── panel.css
│   ├── editor-sidebar/           # Editor assistant UI
│   │   └── sidebar.css
│   └── popup/                    # Extension popup
│       ├── popup.html
│       └── popup.js
└── icons/                        # Extension icons
```

## Usage Examples

### On-Chart Analysis

1. Open a chart with indicators (RSI, MACD, etc.)
2. Click "🤖 Analyze Chart"
3. Extension analyzes indicators across selected timeframes
4. View signals with explanations like:
   - "RSI oversold (28.5)"
   - "MACD bullish crossover"
   - "Price above MA 50 (42500.5)"

### Editor Assistant

**Generate Code:**
```
User: "Create a simple RSI strategy that buys when RSI crosses above 30"
Assistant: [Generates complete Pine Script v6 code]
```

**Explain Code:**
```
User: [Selects code] → Clicks "Explain Code"
Assistant: "This strategy uses RSI to identify oversold conditions..."
```

**Modify Code:**
```
User: [Clicks "Modify"] → "Change RSI period to 14"
Assistant: [Modifies code and injects into editor]
```

## Technical Details

- **DOM Scraping**: Extracts indicator values from TradingView's chart UI
- **Timeframe Switching**: Programmatically switches chart timeframes for multi-timeframe analysis
- **Rules-Based Signals**: Weighted scoring system combining multiple indicators
- **Anthropic API**: Uses Claude 3.5 Sonnet for code generation and assistance
- **Secure Storage**: API keys stored in browser's secure storage

## Limitations

- Indicator value extraction depends on TradingView's DOM structure (may break with updates)
- Requires valid Anthropic API key (usage costs apply)
- Multi-timeframe analysis requires timeframe switching (may be slow)
- Code generation quality depends on prompt clarity

## Troubleshooting

**Extension not appearing:**
- Make sure you're on a TradingView chart page (`/chart/`)
- Check browser console for errors (F12)
- Reload the extension in `chrome://extensions/`

**API errors:**
- Verify API key is correct in extension popup
- Check API key has sufficient credits
- Ensure internet connection is active

**Indicator values not detected:**
- Make sure indicators are visible on chart
- Check that indicator legends are showing values
- TradingView may have updated their DOM structure

## Development

This extension uses:
- Manifest V3 (Chrome Extension API)
- Vanilla JavaScript (no frameworks)
- Anthropic Claude API for AI features
- DOM manipulation for TradingView integration

## License

MIT License - See LICENSE file for details

## Disclaimer

This extension is for educational purposes. Trading involves risk. Always test strategies thoroughly before using real money. The AI-generated code and signals are suggestions, not financial advice.

