// ============================================================================
// Analysis Display - UI for displaying analysis results
// ============================================================================

(function() {
  'use strict';

  window.AnalysisDisplay = {
    panel: null,

    /**
     * Initialize and inject analysis panel
     */
    init() {
      if (this.panel) return;

      this.panel = this.createPanel();
      document.body.appendChild(this.panel);
      Logger.log('Analysis panel injected');
    },

    /**
     * Create analysis panel element
     */
    createPanel() {
      const panel = document.createElement('div');
      panel.id = 'tv-ai-analysis-panel';
      panel.innerHTML = `
        <div class="tv-ai-panel-header">
          <h3>AI Chart Analysis</h3>
          <button class="tv-ai-close-btn">&times;</button>
        </div>
        <div class="tv-ai-panel-content">
          <div class="tv-ai-loading" style="display: none;">Analyzing...</div>
          <div class="tv-ai-results"></div>
        </div>
      `;

      // Add close button handler
      const closeBtn = panel.querySelector('.tv-ai-close-btn');
      closeBtn.addEventListener('click', () => this.hide());

      return panel;
    },

    /**
     * Show panel
     */
    show() {
      if (!this.panel) this.init();
      this.panel.style.display = 'block';
    },

    /**
     * Hide panel
     */
    hide() {
      if (this.panel) {
        this.panel.style.display = 'none';
      }
    },

    /**
     * Display analysis results
     */
    displayResults(signal, timeframes = []) {
      if (!this.panel) this.init();
      this.show();

      const resultsContainer = this.panel.querySelector('.tv-ai-results');
      const loading = this.panel.querySelector('.tv-ai-loading');
      
      loading.style.display = 'none';

      if (!signal || !signal.direction) {
        resultsContainer.innerHTML = '<div class="tv-ai-no-signal">No clear signal detected</div>';
        return;
      }

      const directionClass = signal.direction === 'LONG' ? 'tv-ai-long' : 'tv-ai-short';
      const confidencePercent = Math.round(signal.confidence * 100);

      let html = `
        <div class="tv-ai-signal ${directionClass}">
          <div class="tv-ai-signal-header">
            <h2>${signal.direction}</h2>
            <span class="tv-ai-confidence">${confidencePercent}% confidence</span>
          </div>
          
          <div class="tv-ai-symbol">${signal.symbol || 'Unknown'}</div>
          
          <div class="tv-ai-levels">
            <div class="tv-ai-level">
              <label>Entry:</label>
              <span>${signal.entry.toFixed(4)}</span>
            </div>
            <div class="tv-ai-level">
              <label>Take Profit:</label>
              <span>${signal.takeProfit.toFixed(4)}</span>
            </div>
            <div class="tv-ai-level">
              <label>Stop Loss:</label>
              <span>${signal.stopLoss.toFixed(4)}</span>
            </div>
          </div>
          
          <div class="tv-ai-reasons">
            <h4>Signal Reasons:</h4>
            <ul>
              ${signal.reasons ? signal.reasons.map(r => `<li>${r}</li>`).join('') : ''}
            </ul>
          </div>
        </div>
      `;

      if (signal.timeframeSignals && signal.timeframeSignals.length > 0) {
        html += `
          <div class="tv-ai-timeframes">
            <h4>Timeframe Analysis:</h4>
            ${signal.timeframeSignals.map(tfSignal => `
              <div class="tv-ai-timeframe-signal">
                <strong>${tfSignal.timeframe}:</strong> ${tfSignal.direction || 'No signal'} 
                (${Math.round(tfSignal.confidence * 100)}%)
              </div>
            `).join('')}
          </div>
        `;
      }

      resultsContainer.innerHTML = html;
    },

    /**
     * Show loading state
     */
    showLoading() {
      if (!this.panel) this.init();
      this.show();

      const resultsContainer = this.panel.querySelector('.tv-ai-results');
      const loading = this.panel.querySelector('.tv-ai-loading');
      
      resultsContainer.innerHTML = '';
      loading.style.display = 'block';
    }
  };

})();

