// ============================================================================
// Chart Analyzer - Main orchestrator for on-chart analysis
// ============================================================================

(function() {
  'use strict';

  window.ChartAnalyzer = {
    initialized: false,
    analysisRunning: false,

    /**
     * Initialize chart analyzer
     */
    async init() {
      if (this.initialized) return;

      Logger.log('Initializing Chart Analyzer...');

      // Wait for TradingView to load
      try {
        await TradingViewDOM.waitForChart();
        
        // Initialize analysis display
        AnalysisDisplay.init();

        // Inject analyze button
        this.injectAnalyzeButton();

        this.initialized = true;
        Logger.log('Chart Analyzer initialized');
      } catch (error) {
        Logger.error('Failed to initialize Chart Analyzer:', error);
      }
    },

    /**
     * Inject analyze button into TradingView UI
     */
    injectAnalyzeButton() {
      // Check if button already exists
      if (document.getElementById('tv-ai-analyze-btn')) return;

      const button = document.createElement('button');
      button.id = 'tv-ai-analyze-btn';
      button.textContent = '🤖 Analyze Chart';
      button.className = 'tv-ai-analyze-btn';
      button.title = 'Run AI Chart Analysis';

      // Style the button
      button.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      `;

      // Hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      });

      // Click handler
      button.addEventListener('click', () => this.runAnalysis());

      document.body.appendChild(button);
      Logger.log('Analyze button injected');
    },

    /**
     * Run analysis on current chart
     */
    async runAnalysis(timeframes = null) {
      if (this.analysisRunning) {
        Logger.warn('Analysis already running');
        return;
      }

      this.analysisRunning = true;
      AnalysisDisplay.showLoading();

      try {
        // Get default timeframes from settings if not provided
        if (!timeframes) {
          const settings = await Storage.getSettings();
          timeframes = settings.defaultTimeframes || ['5', '15'];
        }

        Logger.log('Starting analysis with timeframes:', timeframes);

        // Generate signals
        let signal;
        if (timeframes.length > 1) {
          signal = await SignalGenerator.generateMultiTimeframeSignals(timeframes);
        } else {
          signal = await SignalGenerator.generateSignal(timeframes[0]);
        }

        // Display results
        AnalysisDisplay.displayResults(signal, timeframes);

        // Save to history
        if (signal) {
          await Storage.saveAnalysisHistory({
            signal,
            timeframes,
            symbol: TradingViewDOM.getCurrentSymbol()
          });
        }

        Logger.log('Analysis complete');
      } catch (error) {
        Logger.error('Analysis error:', error);
        AnalysisDisplay.displayResults(null);
      } finally {
        this.analysisRunning = false;
      }
    }
  };

})();

