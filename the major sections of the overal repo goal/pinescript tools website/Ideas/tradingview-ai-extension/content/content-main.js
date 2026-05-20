// ============================================================================
// Main Content Script - Entry point for extension
// ============================================================================

(function() {
  'use strict';

  // Initialize extension when DOM is ready
  async function init() {
    if (!TradingViewDOM.isChartPage()) {
      Logger.log('Not a TradingView chart page, extension inactive');
      return;
    }

    Logger.log('TradingView chart page detected, initializing extension...');

    try {
      // Wait for TradingView to load
      await TradingViewDOM.waitForChart();

      // Initialize chart analyzer (on-chart analysis)
      await ChartAnalyzer.init();

      // Initialize editor assistant (Pine Script editor helper)
      await EditorAssistant.init();

      Logger.log('Extension fully initialized');
    } catch (error) {
      Logger.error('Failed to initialize extension:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize if page dynamically changes (SPA navigation)
  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      Logger.log('URL changed, re-initializing...');
      init();
    }
  }, 1000);

  // Listen for messages from background/popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    Logger.log('Content script received message:', message);

    switch (message.action) {
      case 'runAnalysis':
        ChartAnalyzer.runAnalysis(message.timeframes || null)
          .then(() => sendResponse({ success: true }))
          .catch(err => sendResponse({ success: false, error: err.message }));
        return true; // Keep channel open for async

      case 'togglePanel':
        if (message.panel === 'chart') {
          const panel = document.getElementById('tv-ai-analysis-panel');
          if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
          }
        } else if (message.panel === 'editor') {
          const sidebar = document.getElementById('tv-ai-editor-sidebar');
          if (sidebar) {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
          }
        }
        sendResponse({ success: true });
        break;

      default:
        sendResponse({ error: 'Unknown action' });
    }
  });

})();

