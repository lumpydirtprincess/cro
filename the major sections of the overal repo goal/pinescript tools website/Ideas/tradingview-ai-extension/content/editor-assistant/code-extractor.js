// ============================================================================
// Code Extractor - Extract Pine Script code from editor
// ============================================================================

(function() {
  'use strict';

  window.CodeExtractor = {
    /**
     * Extract all code from editor
     */
    extractAllCode() {
      const textarea = EditorDetector.getEditorTextarea();
      if (!textarea) {
        Logger.warn('Editor textarea not found');
        return null;
      }

      // Try multiple methods to get code
      let code = textarea.value || textarea.textContent || textarea.innerText;

      // If contentEditable div, get text differently
      if (textarea.contentEditable === 'true') {
        code = textarea.innerText || textarea.textContent;
      }

      // Try Monaco editor API if available
      if (window.monaco && textarea.dataset && textarea.dataset.monacoEditor) {
        try {
          const editor = window.monaco.editor.getEditors().find(e => 
            e.getModel().uri.toString().includes('pinescript')
          );
          if (editor) {
            code = editor.getValue();
          }
        } catch (error) {
          Logger.warn('Failed to get code from Monaco editor:', error);
        }
      }

      return code ? code.trim() : null;
    },

    /**
     * Extract selected code from editor
     */
    extractSelectedCode() {
      const textarea = EditorDetector.getEditorTextarea();
      if (!textarea) return null;

      // Get selected text
      if (textarea.selectionStart !== undefined) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        if (start !== end) {
          return textarea.value.substring(start, end);
        }
      }

      // Try window selection
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        return selection.toString().trim();
      }

      return null;
    },

    /**
     * Get code context (surrounding lines of selection)
     */
    getCodeContext(linesBefore = 5, linesAfter = 5) {
      const allCode = this.extractAllCode();
      if (!allCode) return null;

      const selectedCode = this.extractSelectedCode();
      if (!selectedCode) return allCode; // Return all code if nothing selected

      const allLines = allCode.split('\n');
      const selectedLines = selectedCode.split('\n');
      
      // Find selected code position in full code
      const selectedStart = allCode.indexOf(selectedCode);
      if (selectedStart === -1) return allCode;

      // Calculate line numbers
      const startLine = allCode.substring(0, selectedStart).split('\n').length - 1;
      const endLine = startLine + selectedLines.length - 1;

      // Extract context
      const contextStart = Math.max(0, startLine - linesBefore);
      const contextEnd = Math.min(allLines.length - 1, endLine + linesAfter);

      return {
        code: allLines.slice(contextStart, contextEnd + 1).join('\n'),
        selection: {
          start: startLine - contextStart,
          end: endLine - contextStart
        },
        fullCode: allCode
      };
    }
  };

})();

