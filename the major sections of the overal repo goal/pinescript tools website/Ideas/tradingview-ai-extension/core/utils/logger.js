// ============================================================================
// Logger Utility
// ============================================================================

(function() {
  'use strict';

  const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };

  let currentLogLevel = LOG_LEVELS.INFO;
  const prefix = '[TradingView AI Extension]';

  window.Logger = {
    setLevel(level) {
      currentLogLevel = LOG_LEVELS[level.toUpperCase()] || LOG_LEVELS.INFO;
    },

    debug(...args) {
      if (currentLogLevel <= LOG_LEVELS.DEBUG) {
        console.debug(prefix, ...args);
      }
    },

    log(...args) {
      if (currentLogLevel <= LOG_LEVELS.INFO) {
        console.log(prefix, ...args);
      }
    },

    warn(...args) {
      if (currentLogLevel <= LOG_LEVELS.WARN) {
        console.warn(prefix, ...args);
      }
    },

    error(...args) {
      if (currentLogLevel <= LOG_LEVELS.ERROR) {
        console.error(prefix, ...args);
      }
    }
  };

})();

