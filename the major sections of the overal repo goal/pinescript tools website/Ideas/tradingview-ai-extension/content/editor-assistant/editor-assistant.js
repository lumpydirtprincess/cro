// ============================================================================
// Editor Assistant - Main orchestrator for Pine Script editor assistant
// ============================================================================

(function() {
  'use strict';

  window.EditorAssistant = {
    initialized: false,
    sidebar: null,

    /**
     * Initialize editor assistant
     */
    async init() {
      if (this.initialized) return;

      Logger.log('Initializing Editor Assistant...');

      // Initialize AI client
      await AIClient.init();

      // Watch for editor open/close
      EditorDetector.watchEditor((isOpen) => {
        if (isOpen) {
          this.onEditorOpen();
        } else {
          this.onEditorClose();
        }
      });

      // Check if editor is already open
      if (EditorDetector.isEditorOpen()) {
        this.onEditorOpen();
      }

      this.initialized = true;
      Logger.log('Editor Assistant initialized');
    },

    /**
     * Handle editor open event
     */
    onEditorOpen() {
      Logger.log('Editor opened, injecting sidebar');
      this.injectSidebar();
    },

    /**
     * Handle editor close event
     */
    onEditorClose() {
      Logger.log('Editor closed');
      if (this.sidebar) {
        this.sidebar.style.display = 'none';
      }
    },

    /**
     * Inject assistant sidebar
     */
    injectSidebar() {
      // Check if sidebar already exists
      if (document.getElementById('tv-ai-editor-sidebar')) {
        this.sidebar = document.getElementById('tv-ai-editor-sidebar');
        this.sidebar.style.display = 'block';
        return;
      }

      const sidebar = document.createElement('div');
      sidebar.id = 'tv-ai-editor-sidebar';
      sidebar.innerHTML = `
        <div class="tv-ai-sidebar-header">
          <h3>🤖 Pine Script Assistant</h3>
          <button class="tv-ai-sidebar-toggle">−</button>
        </div>
        <div class="tv-ai-sidebar-content">
          <div class="tv-ai-chat-container">
            <div class="tv-ai-chat-messages"></div>
            <div class="tv-ai-chat-input-container">
              <textarea class="tv-ai-chat-input" placeholder="Ask me anything about Pine Script..."></textarea>
              <button class="tv-ai-send-btn">Send</button>
            </div>
          </div>
          <div class="tv-ai-quick-actions">
            <button class="tv-ai-action-btn" data-action="explain">Explain Code</button>
            <button class="tv-ai-action-btn" data-action="modify">Modify Code</button>
            <button class="tv-ai-action-btn" data-action="brainstorm">Brainstorm</button>
          </div>
        </div>
      `;

      // Add event listeners
      this.setupSidebarListeners(sidebar);

      document.body.appendChild(sidebar);
      this.sidebar = sidebar;
      Logger.log('Editor sidebar injected');
    },

    /**
     * Setup sidebar event listeners
     */
    setupSidebarListeners(sidebar) {
      const toggleBtn = sidebar.querySelector('.tv-ai-sidebar-toggle');
      const sendBtn = sidebar.querySelector('.tv-ai-send-btn');
      const input = sidebar.querySelector('.tv-ai-chat-input');
      const messagesContainer = sidebar.querySelector('.tv-ai-chat-messages');
      const actionButtons = sidebar.querySelectorAll('.tv-ai-action-btn');

      // Toggle sidebar
      toggleBtn.addEventListener('click', () => {
        const content = sidebar.querySelector('.tv-ai-sidebar-content');
        const isCollapsed = content.style.display === 'none';
        content.style.display = isCollapsed ? 'block' : 'none';
        toggleBtn.textContent = isCollapsed ? '−' : '+';
      });

      // Send message
      const sendMessage = async () => {
        const message = input.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(messagesContainer, 'user', message);
        input.value = '';

        // Show loading
        const loadingId = this.addMessage(messagesContainer, 'assistant', 'Thinking...', true);

        try {
          // Get code context
          const code = CodeExtractor.extractAllCode();
          const selectedCode = CodeExtractor.extractSelectedCode();

          // Generate response
          let response;
          if (selectedCode) {
            response = await AIClient.generateCode(message, selectedCode);
          } else if (code) {
            response = await AIClient.generateCode(message, code);
          } else {
            response = await AIClient.generateCode(message);
          }

          // Update loading message with response
          this.updateMessage(messagesContainer, loadingId, 'assistant', response);
        } catch (error) {
          this.updateMessage(messagesContainer, loadingId, 'assistant', `Error: ${error.message}`);
        }
      };

      sendBtn.addEventListener('click', sendMessage);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });

      // Quick action buttons
      actionButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
          const action = btn.dataset.action;
          
          switch (action) {
            case 'explain':
              await this.handleExplainCode(messagesContainer);
              break;
            case 'modify':
              await this.handleModifyCode(messagesContainer);
              break;
            case 'brainstorm':
              await this.handleBrainstorm(messagesContainer);
              break;
          }
        });
      });
    },

    /**
     * Add message to chat
     */
    addMessage(container, role, text, isLoading = false) {
      const messageId = 'msg-' + Date.now();
      const messageDiv = document.createElement('div');
      messageDiv.id = messageId;
      messageDiv.className = `tv-ai-message tv-ai-message-${role}`;
      messageDiv.innerHTML = `
        <div class="tv-ai-message-content">${this.formatMessage(text)}</div>
      `;
      
      container.appendChild(messageDiv);
      container.scrollTop = container.scrollHeight;
      
      return messageId;
    },

    /**
     * Update existing message
     */
    updateMessage(container, messageId, role, text) {
      const messageDiv = document.getElementById(messageId);
      if (messageDiv) {
        messageDiv.querySelector('.tv-ai-message-content').innerHTML = this.formatMessage(text);
      }
    },

    /**
     * Format message text (code blocks, etc.)
     */
    formatMessage(text) {
      // Convert code blocks
      text = text.replace(/```pine\n([\s\S]*?)```/g, '<pre class="tv-ai-code-block"><code>$1</code></pre>');
      text = text.replace(/```([\s\S]*?)```/g, '<pre class="tv-ai-code-block"><code>$1</code></pre>');
      
      // Convert inline code
      text = text.replace(/`([^`]+)`/g, '<code class="tv-ai-inline-code">$1</code>');
      
      // Convert line breaks
      text = text.replace(/\n/g, '<br>');
      
      return text;
    },

    /**
     * Handle explain code action
     */
    async handleExplainCode(messagesContainer) {
      const code = CodeExtractor.extractSelectedCode() || CodeExtractor.extractAllCode();
      if (!code) {
        this.addMessage(messagesContainer, 'assistant', 'Please select code or have code in the editor to explain.');
        return;
      }

      const loadingId = this.addMessage(messagesContainer, 'assistant', 'Explaining code...', true);

      try {
        const explanation = await AIClient.explainCode(code);
        this.updateMessage(messagesContainer, loadingId, 'assistant', explanation);
      } catch (error) {
        this.updateMessage(messagesContainer, loadingId, 'assistant', `Error: ${error.message}`);
      }
    },

    /**
     * Handle modify code action
     */
    async handleModifyCode(messagesContainer) {
      const code = CodeExtractor.extractAllCode();
      if (!code) {
        this.addMessage(messagesContainer, 'assistant', 'Please have code in the editor to modify.');
        return;
      }

      const modificationRequest = prompt('How would you like to modify the code?');
      if (!modificationRequest) return;

      const loadingId = this.addMessage(messagesContainer, 'assistant', 'Modifying code...', true);

      try {
        const modifiedCode = await AIClient.modifyCode(code, modificationRequest);
        
        // Extract code from response if it's in a code block
        const codeMatch = modifiedCode.match(/```(?:pine)?\n([\s\S]*?)```/);
        const codeToInject = codeMatch ? codeMatch[1] : modifiedCode;

        // Inject code
        CodeInjector.injectCode(codeToInject, false);

        this.updateMessage(messagesContainer, loadingId, 'assistant', 'Code modified and injected into editor!');
      } catch (error) {
        this.updateMessage(messagesContainer, loadingId, 'assistant', `Error: ${error.message}`);
      }
    },

    /**
     * Handle brainstorm action
     */
    async handleBrainstorm(messagesContainer) {
      this.addMessage(messagesContainer, 'assistant', 'Let\'s brainstorm your strategy! Starting session...');
      
      const session = await BrainstormingEngine.startSession();
      if (session) {
        this.addMessage(messagesContainer, 'assistant', session.question);
      }
    }
  };

})();

