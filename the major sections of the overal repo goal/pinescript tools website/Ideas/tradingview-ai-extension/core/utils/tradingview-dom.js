// ============================================================================
// TradingView DOM Utilities
// ============================================================================

(function() {
  'use strict';

  window.TradingViewDOM = {
    /**
     * Check if current page is a TradingView chart page
     */
    isChartPage() {
      return window.location.href.includes('/chart/');
    },

    /**
     * Check if Pine Script editor is open
     */
    isEditorOpen() {
      const editorContainer = document.querySelector('[data-name="legend-source-item"]') ||
                             document.querySelector('.pane-legend') ||
                             document.querySelector('[class*="pane-legend"]');
      
      // Also check for editor-specific elements
      const editorElements = document.querySelectorAll('[class*="pinescript"]');
      return editorElements.length > 0 || !!editorContainer;
    },

    /**
     * Wait for TradingView chart to load
     */
    waitForChart(maxWait = 30000) {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        const checkInterval = setInterval(() => {
          const chartContainer = document.querySelector('#tv-main-content') ||
                                document.querySelector('.chart-page') ||
                                document.querySelector('[data-role="chart"]') ||
                                document.querySelector('[class*="chart-container"]');
          
          if (chartContainer) {
            clearInterval(checkInterval);
            setTimeout(resolve, 2000); // Wait a bit more for everything to settle
            return;
          }
          
          if (Date.now() - startTime > maxWait) {
            clearInterval(checkInterval);
            reject(new Error('TradingView chart load timeout'));
          }
        }, 500);
      });
    },

    /**
     * Get current symbol from chart
     */
    getCurrentSymbol() {
      const symbolElement = document.querySelector('[data-name="legend-source-item"]') ||
                           document.querySelector('[class*="symbol"]') ||
                           document.querySelector('[class*="ticker"]');
      
      if (symbolElement) {
        return symbolElement.textContent?.trim() || symbolElement.innerText?.trim();
      }
      
      // Try extracting from URL
      const urlMatch = window.location.href.match(/symbol\/([^/]+)/);
      if (urlMatch) {
        return urlMatch[1];
      }
      
      return null;
    },

    /**
     * Get current timeframe from chart
     */
    getCurrentTimeframe() {
      const timeframeButton = document.querySelector('[class*="timeframe"]') ||
                             document.querySelector('[data-name="header-chart-panel"] [class*="button"]') ||
                             Array.from(document.querySelectorAll('button')).find(btn => 
                               btn.textContent.match(/[1-9][0-9]*(m|h|D|W|M)/)
                             );
      
      if (timeframeButton) {
        return timeframeButton.textContent?.trim() || timeframeButton.innerText?.trim();
      }
      
      // Try extracting from URL
      const urlMatch = window.location.href.match(/interval=([^&]+)/);
      if (urlMatch) {
        return urlMatch[1];
      }
      
      return null;
    },

    /**
     * Find chart container element
     */
    getChartContainer() {
      return document.querySelector('#tv-main-content') ||
             document.querySelector('.chart-page') ||
             document.querySelector('[data-role="chart"]') ||
             document.querySelector('[class*="chart-container"]');
    },

    /**
     * Find indicator legend/panel
     */
    getIndicatorPanel() {
      return document.querySelector('[data-name="legend-source-item"]') ||
             document.querySelector('[class*="pane-legend"]') ||
             document.querySelector('[class*="indicator-panel"]');
    }
  };

})();

