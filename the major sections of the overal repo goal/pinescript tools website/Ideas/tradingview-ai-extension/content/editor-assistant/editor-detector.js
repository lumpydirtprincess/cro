// ============================================================================
// Editor Detector - Detect Pine Script editor
// ============================================================================

(function() {
  'use strict';

  window.EditorDetector = {
    /**
     * Check if Pine Script editor is currently open
     */
    isEditorOpen() {
      // Check for editor-specific DOM elements
      const editorSelectors = [
        '[class*="pinescript"]',
        '[class*="pine-editor"]',
        '[data-name="pinescript-editor"]',
        'textarea[class*="editor"]',
        '.monaco-editor' // TradingView uses Monaco editor
      ];

      for (const selector of editorSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          Logger.log('Editor detected via selector:', selector);
          return true;
        }
      }

      // Check URL for editor parameter
      if (window.location.href.includes('pinescript') || 
          window.location.href.includes('editor')) {
        return true;
      }

      // Check for editor button/indicator
      const buttons = Array.from(document.querySelectorAll('button'));
      const editorButton = buttons.find(btn => {
        const text = btn.textContent || btn.innerText;
        return /pine|script|editor/i.test(text);
      });

      return !!editorButton;
    },

    /**
     * Get editor container element
     */
    getEditorContainer() {
      const selectors = [
        '[class*="pinescript"]',
        '[class*="pine-editor"]',
        '.monaco-editor',
        '[class*="editor-container"]'
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) return element;
      }

      return null;
    },

    /**
     * Get editor textarea/input element
     */
    getEditorTextarea() {
      const container = this.getEditorContainer();
      if (!container) return null;

      // Try to find textarea or contentEditable div
      const textarea = container.querySelector('textarea') ||
                      container.querySelector('[contenteditable="true"]') ||
                      container.querySelector('[class*="monaco-input"]');

      return textarea;
    },

    /**
     * Monitor for editor open/close events
     */
    watchEditor(callback) {
      let lastState = this.isEditorOpen();

      const checkInterval = setInterval(() => {
        const currentState = this.isEditorOpen();
        if (currentState !== lastState) {
          lastState = currentState;
          callback(currentState);
        }
      }, 1000);

      // Return cleanup function
      return () => clearInterval(checkInterval);
    }
  };

})();

