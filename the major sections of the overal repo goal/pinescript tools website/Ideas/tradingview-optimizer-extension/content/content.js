// ============================================================================
// TradingView Optimizer Extension - Main Content Script
// ============================================================================

(function() {
  'use strict';

  // Extension state
  const state = {
    initialized: false,
    optimizationRunning: false,
    detectedInputs: [],
    results: []
  };

  // Initialize extension when page loads
  function init() {
    if (state.initialized) return;

    logger.log('TradingView Optimizer Extension loaded!');
    logger.log('Page URL:', window.location.href);

    // Check if we're on a TradingView chart page
    if (!isChartPage()) {
      logger.log('Not a chart page, extension inactive');
      return;
    }

    logger.log('Chart page detected, initializing...');

    // Wait for TradingView to fully load
    waitForTradingView()
      .then(() => {
        logger.log('TradingView loaded, setting up extension');

        // Inject UI
        injectOptimizationButton();
        injectOptimizationPanel();

        // Detect strategy inputs
        detectStrategyInputs();

        state.initialized = true;
        logger.log('Extension initialization complete!');
      })
      .catch(err => {
        logger.error('Failed to initialize extension:', err);
      });
  }

  // Check if current page is a TradingView chart
  function isChartPage() {
    return window.location.href.includes('/chart/');
  }

  // Wait for TradingView to load
  function waitForTradingView() {
    return new Promise((resolve, reject) => {
      const maxWait = 30000; // 30 seconds
      const startTime = Date.now();

      const checkInterval = setInterval(() => {
        // Check for TradingView main container
        const tvWidget = document.querySelector('#tv-main-content') ||
                        document.querySelector('.chart-page') ||
                        document.querySelector('[data-role="chart"]');

        if (tvWidget) {
          clearInterval(checkInterval);
          // Wait a bit more for everything to settle
          setTimeout(resolve, 2000);
          return;
        }

        if (Date.now() - startTime > maxWait) {
          clearInterval(checkInterval);
          reject(new Error('TradingView load timeout'));
        }
      }, 500);
    });
  }

  // Inject the optimization button
  function injectOptimizationButton() {
    logger.log('Injecting optimization button...');

    // Create button
    const button = document.createElement('button');
    button.id = 'tv-optimizer-button';
    button.textContent = '⚡ Optimize';
    button.className = 'tv-optimizer-btn';
    button.title = 'Open Strategy Optimizer';

    // Button styling
    button.style.cssText = `
      position: fixed;
      top: 60px;
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

    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });

    // Click handler
    button.addEventListener('click', () => {
      logger.log('Optimize button clicked');
      toggleOptimizationPanel();
    });

    // Add to page
    document.body.appendChild(button);
    logger.log('Optimization button injected');
  }

  // Inject the optimization panel
  function injectOptimizationPanel() {
    logger.log('Injecting optimization panel...');

    const panel = injector.createOptimizationPanel();
    document.body.appendChild(panel);

    logger.log('Optimization panel injected');
  }

  // Toggle optimization panel visibility
  function toggleOptimizationPanel() {
    const panel = document.getElementById('tv-optimizer-panel');
    if (!panel) {
      logger.error('Optimization panel not found');
      return;
    }

    const isVisible = panel.style.display !== 'none';
    panel.style.display = isVisible ? 'none' : 'block';

    logger.log('Panel toggled:', isVisible ? 'hidden' : 'visible');

    // If showing panel, refresh input detection
    if (!isVisible) {
      detectStrategyInputs();
    }
  }

  // Detect strategy inputs on the page
  function detectStrategyInputs() {
    logger.log('Detecting strategy inputs...');

    const inputs = detector.findStrategyInputs();
    state.detectedInputs = inputs;

    logger.log(`Detected ${inputs.length} strategy inputs:`, inputs);

    // Update panel with detected inputs
    updatePanelInputsList(inputs);
  }

  // Update panel with detected inputs
  function updatePanelInputsList(inputs) {
    const inputsList = document.getElementById('tv-optimizer-inputs-list');
    if (!inputsList) return;

    if (inputs.length === 0) {
      inputsList.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #999;">
          <p>No strategy inputs detected</p>
          <p style="font-size: 12px; margin-top: 10px;">
            Make sure you have a strategy loaded and settings panel is accessible
          </p>
        </div>
      `;
      return;
    }

    // Build inputs list HTML
    let html = '<div class="inputs-list">';

    inputs.forEach((input, index) => {
      html += `
        <div class="input-item" data-index="${index}">
          <div class="input-header">
            <span class="input-name">${input.name || `Input ${index + 1}`}</span>
            <span class="input-type">${input.type}</span>
          </div>
          <div class="input-details">
            <span>Current: ${input.currentValue}</span>
            ${input.min !== undefined ? `<span>Min: ${input.min}</span>` : ''}
            ${input.max !== undefined ? `<span>Max: ${input.max}</span>` : ''}
          </div>
          <button class="btn-optimize-input" data-index="${index}">
            Optimize This
          </button>
        </div>
      `;
    });

    html += '</div>';
    inputsList.innerHTML = html;

    // Add click handlers
    const optimizeButtons = inputsList.querySelectorAll('.btn-optimize-input');
    optimizeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        openOptimizationModal(inputs[index]);
      });
    });
  }

  // Open optimization modal for an input
  function openOptimizationModal(input) {
    logger.log('Opening optimization modal for:', input);

    // TODO: Implement modal
    alert(`Optimization modal for: ${input.name}\nComing soon!`);
  }

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    logger.log('Message received:', message);

    switch (message.action) {
      case 'getState':
        sendResponse(state);
        break;

      case 'startOptimization':
        startOptimization(message.params);
        sendResponse({ success: true });
        break;

      case 'stopOptimization':
        stopOptimization();
        sendResponse({ success: true });
        break;

      default:
        logger.warn('Unknown message action:', message.action);
    }

    return true; // Keep message channel open for async response
  });

  // Start optimization process
  function startOptimization(params) {
    if (state.optimizationRunning) {
      logger.warn('Optimization already running');
      return;
    }

    logger.log('Starting optimization with params:', params);
    state.optimizationRunning = true;

    // TODO: Implement optimization
    // automator.runOptimization(params)
    //   .then(results => {
    //     logger.log('Optimization complete:', results);
    //     state.optimizationRunning = false;
    //   })
    //   .catch(err => {
    //     logger.error('Optimization failed:', err);
    //     state.optimizationRunning = false;
    //   });

    // For now, just a placeholder
    setTimeout(() => {
      alert('Optimization started! (placeholder)');
      state.optimizationRunning = false;
    }, 1000);
  }

  // Stop optimization process
  function stopOptimization() {
    logger.log('Stopping optimization...');
    state.optimizationRunning = false;
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
      logger.log('URL changed, re-initializing...');
      state.initialized = false;
      init();
    }
  }, 1000);

})();
