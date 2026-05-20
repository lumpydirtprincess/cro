// ============================================================================
// Timeframe Switcher - Programmatic timeframe switching
// ============================================================================

(function() {
  'use strict';

  window.TimeframeSwitcher = {
    currentTimeframe: null,
    originalTimeframe: null,

    /**
     * Switch to a specific timeframe
     */
    async switchTimeframe(timeframe) {
      try {
        // Store original timeframe if not stored yet
        if (!this.originalTimeframe) {
          this.originalTimeframe = TradingViewDOM.getCurrentTimeframe();
        }

        Logger.log(`Switching to timeframe: ${timeframe}`);
        this.currentTimeframe = timeframe;

        // Find timeframe selector button
        const timeframeButton = this.findTimeframeButton(timeframe);
        if (!timeframeButton) {
          throw new Error(`Timeframe button not found: ${timeframe}`);
        }

        // Click the button
        timeframeButton.click();
        
        // Wait for chart to reload
        await this.waitForChartReload();

        Logger.log(`Successfully switched to timeframe: ${timeframe}`);
        return true;
      } catch (error) {
        Logger.error('Error switching timeframe:', error);
        return false;
      }
    },

    /**
     * Find timeframe button in DOM
     */
    findTimeframeButton(timeframe) {
      // Try multiple strategies to find timeframe buttons
      const buttons = document.querySelectorAll('button');
      
      for (const button of buttons) {
        const text = button.textContent || button.innerText;
        if (text.trim() === timeframe || text.includes(timeframe)) {
          return button;
        }
      }

      // Try data attributes
      const buttonWithData = document.querySelector(`[data-timeframe="${timeframe}"]`);
      if (buttonWithData) return buttonWithData;

      // Try class-based selectors
      const timeframeContainer = document.querySelector('[class*="timeframe"]') ||
                                 document.querySelector('[class*="interval"]');
      
      if (timeframeContainer) {
        const containerButtons = timeframeContainer.querySelectorAll('button');
        for (const button of containerButtons) {
          const text = button.textContent || button.innerText;
          if (text.includes(timeframe)) {
            return button;
          }
        }
      }

      return null;
    },

    /**
     * Wait for chart to reload after timeframe change
     */
    waitForChartReload(maxWait = 10000) {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let lastChartState = this.getChartStateHash();

        const checkInterval = setInterval(() => {
          const currentChartState = this.getChartStateHash();
          
          // If chart state changed and then stabilized, it's reloaded
          if (currentChartState !== lastChartState) {
            lastChartState = currentChartState;
            setTimeout(() => {
              // Check if state is stable
              if (this.getChartStateHash() === lastChartState) {
                clearInterval(checkInterval);
                setTimeout(resolve, 1000); // Extra wait for indicators to load
                return;
              }
            }, 500);
          }

          if (Date.now() - startTime > maxWait) {
            clearInterval(checkInterval);
            // Resolve anyway - chart might be loaded
            resolve();
          }
        }, 300);
      });
    },

    /**
     * Get a hash of current chart state (simple method)
     */
    getChartStateHash() {
      const chartContainer = TradingViewDOM.getChartContainer();
      if (!chartContainer) return '';

      // Create simple hash based on visible elements
      const visibleElements = chartContainer.querySelectorAll('*');
      return visibleElements.length.toString();
    },

    /**
     * Restore original timeframe
     */
    async restoreOriginalTimeframe() {
      if (this.originalTimeframe && this.currentTimeframe !== this.originalTimeframe) {
        Logger.log(`Restoring original timeframe: ${this.originalTimeframe}`);
        return await this.switchTimeframe(this.originalTimeframe);
      }
      return true;
    }
  };

})();

