// ============================================================================
// Code Injector - Inject code back into editor
// ============================================================================

(function() {
  'use strict';

  window.CodeInjector = {
    /**
     * Inject code into editor (replace all or selected)
     */
    injectCode(code, replaceSelection = false) {
      const textarea = EditorDetector.getEditorTextarea();
      if (!textarea) {
        Logger.error('Editor textarea not found');
        return false;
      }

      try {
        if (replaceSelection && textarea.selectionStart !== undefined) {
          // Replace selected text
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const currentValue = textarea.value;
          
          textarea.value = currentValue.substring(0, start) + code + currentValue.substring(end);
          
          // Set cursor position after inserted code
          textarea.selectionStart = start + code.length;
          textarea.selectionEnd = start + code.length;
        } else {
          // Replace all code
          if (textarea.value !== undefined) {
            textarea.value = code;
          } else if (textarea.textContent !== undefined) {
            textarea.textContent = code;
          } else if (textarea.innerText !== undefined) {
            textarea.innerText = code;
          }
        }

        // Trigger change events so TradingView detects the change
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        textarea.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        // Try Monaco editor API if available
        if (window.monaco) {
          try {
            const editor = window.monaco.editor.getEditors().find(e => 
              e.getModel().uri.toString().includes('pinescript')
            );
            if (editor) {
              if (replaceSelection) {
                const selection = editor.getSelection();
                editor.executeEdits('ai-assistant', [{
                  range: selection,
                  text: code
                }]);
              } else {
                editor.setValue(code);
              }
            }
          } catch (error) {
            Logger.warn('Failed to inject code via Monaco API:', error);
          }
        }

        Logger.log('Code injected successfully');
        return true;
      } catch (error) {
        Logger.error('Failed to inject code:', error);
        return false;
      }
    },

    /**
     * Append code to end of editor
     */
    appendCode(code) {
      const allCode = CodeExtractor.extractAllCode();
      if (!allCode) {
        return this.injectCode(code, false);
      }

      const newCode = allCode + '\n\n' + code;
      return this.injectCode(newCode, false);
    }
  };

})();

