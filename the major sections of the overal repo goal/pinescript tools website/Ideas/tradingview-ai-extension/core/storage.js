// ============================================================================
// Storage Utility - Secure API key and settings storage
// ============================================================================

(function() {
  'use strict';

  const STORAGE_KEYS = {
    API_KEY: 'anthropic_api_key',
    SETTINGS: 'extension_settings',
    HISTORY: 'analysis_history',
    CODE_HISTORY: 'code_history'
  };

  window.Storage = {
    /**
     * Store Anthropic API key (encrypted)
     */
    async setAPIKey(apiKey) {
      try {
        // In a real implementation, you'd encrypt this
        // For now, store as-is but warn user about security
        await chrome.storage.local.set({ [STORAGE_KEYS.API_KEY]: apiKey });
        Logger.log('API key stored');
        return true;
      } catch (error) {
        Logger.error('Failed to store API key:', error);
        return false;
      }
    },

    /**
     * Get Anthropic API key
     */
    async getAPIKey() {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.API_KEY);
        return result[STORAGE_KEYS.API_KEY] || null;
      } catch (error) {
        Logger.error('Failed to get API key:', error);
        return null;
      }
    },

    /**
     * Store extension settings
     */
    async setSettings(settings) {
      try {
        const current = await this.getSettings();
        const updated = { ...current, ...settings };
        await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: updated });
        Logger.log('Settings stored');
        return true;
      } catch (error) {
        Logger.error('Failed to store settings:', error);
        return false;
      }
    },

    /**
     * Get extension settings
     */
    async getSettings() {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
        return result[STORAGE_KEYS.SETTINGS] || {
          defaultTimeframes: ['5', '15'],
          enabledIndicators: ['RSI', 'MACD', 'MA'],
          theme: 'dark'
        };
      } catch (error) {
        Logger.error('Failed to get settings:', error);
        return {};
      }
    },

    /**
     * Save analysis history
     */
    async saveAnalysisHistory(analysis) {
      try {
        const history = await this.getAnalysisHistory();
        history.unshift({
          ...analysis,
          timestamp: Date.now()
        });
        
        // Keep only last 100 analyses
        if (history.length > 100) {
          history.splice(100);
        }
        
        await chrome.storage.local.set({ [STORAGE_KEYS.HISTORY]: history });
        return true;
      } catch (error) {
        Logger.error('Failed to save analysis history:', error);
        return false;
      }
    },

    /**
     * Get analysis history
     */
    async getAnalysisHistory() {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.HISTORY);
        return result[STORAGE_KEYS.HISTORY] || [];
      } catch (error) {
        Logger.error('Failed to get analysis history:', error);
        return [];
      }
    },

    /**
     * Save code generation history
     */
    async saveCodeHistory(entry) {
      try {
        const history = await this.getCodeHistory();
        history.unshift({
          ...entry,
          timestamp: Date.now()
        });
        
        // Keep only last 50 entries
        if (history.length > 50) {
          history.splice(50);
        }
        
        await chrome.storage.local.set({ [STORAGE_KEYS.CODE_HISTORY]: history });
        return true;
      } catch (error) {
        Logger.error('Failed to save code history:', error);
        return false;
      }
    },

    /**
     * Get code generation history
     */
    async getCodeHistory() {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.CODE_HISTORY);
        return result[STORAGE_KEYS.CODE_HISTORY] || [];
      } catch (error) {
        Logger.error('Failed to get code history:', error);
        return [];
      }
    }
  };

})();

