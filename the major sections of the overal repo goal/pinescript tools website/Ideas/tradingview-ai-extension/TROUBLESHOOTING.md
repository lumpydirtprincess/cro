# Troubleshooting Guide

## Common Issues and Solutions

### Extension Won't Load

**Symptoms:** Extension doesn't appear in browser, or shows errors when loading

**Solutions:**
1. **Check manifest.json syntax:**
   - Ensure it's valid JSON (no trailing commas, proper quotes)
   - Verify all file paths exist

2. **Check icon files:**
   - Icons are required for the extension to load
   - Create placeholder icons if needed (see INSTALLATION.md)
   - Icon files must be PNG format

3. **Check browser console:**
   - Open `chrome://extensions/`
   - Click "Errors" button on the extension card
   - Check for file path errors or syntax errors

### Extension Loads But Doesn't Work on TradingView

**Symptoms:** No buttons appear, no sidebar shows up

**Solutions:**
1. **Check you're on the right page:**
   - Must be on a TradingView chart page (`/chart/` in URL)
   - Extension only activates on chart pages

2. **Check browser console:**
   - Press F12 on TradingView page
   - Look for errors starting with `[TradingView AI Extension]`
   - Common errors: DOM selectors not finding elements

3. **Wait for page to load:**
   - Extension waits for TradingView to fully load
   - May take 2-3 seconds after page load
   - Check console for "Extension fully initialized" message

4. **TradingView DOM changes:**
   - TradingView updates their UI frequently
   - DOM selectors may need updating
   - Check `core/utils/tradingview-dom.js` for selector issues

### API Key Issues

**Symptoms:** Editor assistant doesn't work, API errors

**Solutions:**
1. **Verify API key format:**
   - Must start with `sk-ant-`
   - Check for typos or extra spaces
   - Copy/paste from Anthropic console directly

2. **Check API key has credits:**
   - Log into [Anthropic Console](https://console.anthropic.com/)
   - Verify account has credits available
   - Check usage limits

3. **Check network connection:**
   - Extension needs internet to call Anthropic API
   - Check firewall/proxy settings
   - Try accessing api.anthropic.com directly

### Indicator Values Not Detected

**Symptoms:** Chart analysis shows "No signal" or missing indicator readings

**Solutions:**
1. **Ensure indicators are visible:**
   - Indicators must be added to chart
   - Indicator legends should be showing
   - Check that indicator values are displayed in TradingView

2. **DOM scraping limitations:**
   - Some indicators may not expose values in DOM
   - Try different indicator variants
   - Check if indicator values appear in chart legend

3. **Update selectors:**
   - TradingView may have changed DOM structure
   - Check `content/chart-analyzer/indicator-extractor.js`
   - Use browser DevTools to inspect indicator elements

### Timeframe Switching Issues

**Symptoms:** Multi-timeframe analysis fails or takes too long

**Solutions:**
1. **Timeout issues:**
   - Default timeout is 10 seconds per timeframe
   - Slow connections may need longer
   - Check `content/chart-analyzer/timeframe-switcher.js`

2. **Timeframe selector not found:**
   - TradingView UI may have changed
   - Verify timeframe buttons are clickable
   - Check DOM structure with DevTools

3. **Chart not reloading:**
   - Extension waits for chart to reload after switching
   - If chart doesn't reload, analysis may fail
   - Try manual timeframe switch first to verify it works

### Code Injection Issues

**Symptoms:** Generated code doesn't appear in editor

**Solutions:**
1. **Editor not detected:**
   - Ensure Pine Script editor is open
   - Check `content/editor-assistant/editor-detector.js`
   - Editor must be fully loaded

2. **Monaco editor API:**
   - Extension tries multiple methods to inject code
   - If Monaco API fails, falls back to DOM manipulation
   - Check browser console for injection errors

3. **Code format:**
   - Generated code may include markdown code blocks
   - Extension attempts to extract code from blocks
   - Check if code extraction is working correctly

### Performance Issues

**Symptoms:** Extension is slow, browser lagging

**Solutions:**
1. **Multi-timeframe analysis:**
   - Switching timeframes is inherently slow
   - Limit to 2-3 timeframes
   - Consider analyzing one timeframe at a time

2. **DOM queries:**
   - Extension queries DOM frequently
   - May be slow on complex charts
   - Reduce frequency of checks if possible

3. **API calls:**
   - Anthropic API calls take time
   - Large code contexts increase response time
   - Be patient for AI responses

## Debug Mode

Enable debug logging:

1. Open browser console (F12)
2. Run: `Logger.setLevel('DEBUG')`
3. Reload extension or TradingView page
4. Check console for detailed logs

## Getting Help

If issues persist:

1. **Check browser console:**
   - Look for error messages
   - Note the exact error text
   - Check which file/function failed

2. **Check extension storage:**
   - Open DevTools → Application → Storage → Extension
   - Verify API key is stored
   - Check settings values

3. **Test components individually:**
   - Try chart analysis only
   - Try editor assistant only
   - Isolate which feature is failing

4. **Check TradingView updates:**
   - TradingView updates frequently
   - DOM structure may have changed
   - Extension may need updates

## Known Limitations

1. **DOM Dependency:**
   - Extension depends on TradingView's DOM structure
   - Updates to TradingView may break features
   - Selectors need regular maintenance

2. **API Costs:**
   - Anthropic API usage incurs costs
   - Monitor usage in Anthropic console
   - Set usage limits if needed

3. **Rate Limiting:**
   - No built-in rate limiting for API calls
   - Be mindful of API usage
   - Don't spam requests

4. **Browser Compatibility:**
   - Tested on Chrome/Brave
   - Firefox may need manifest adjustments
   - Edge should work (Chromium-based)

