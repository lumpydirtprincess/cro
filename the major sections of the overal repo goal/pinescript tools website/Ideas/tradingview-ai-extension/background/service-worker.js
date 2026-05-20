// ============================================================================
// Background Service Worker
// ============================================================================

chrome.runtime.onInstalled.addListener(() => {
  console.log('TradingView AI Analysis Extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  switch (message.action) {
    case 'getAPIKey':
      chrome.storage.local.get('anthropic_api_key', (result) => {
        sendResponse({ apiKey: result.anthropic_api_key || null });
      });
      return true; // Keep channel open for async response

    case 'storeAPIKey':
      chrome.storage.local.set({ anthropic_api_key: message.apiKey }, () => {
        sendResponse({ success: true });
      });
      return true;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

