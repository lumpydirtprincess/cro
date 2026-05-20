// ============================================================================
// AI Client - Anthropic API integration
// ============================================================================

(function() {
  'use strict';

  window.AIClient = {
    apiKey: null,
    baseURL: 'https://api.anthropic.com/v1/messages',

    /**
     * Initialize with API key
     */
    async init() {
      this.apiKey = await Storage.getAPIKey();
      if (!this.apiKey) {
        Logger.warn('Anthropic API key not set');
      }
    },

    /**
     * Make API request to Anthropic
     */
    async makeRequest(messages, systemPrompt = null, maxTokens = 4096) {
      if (!this.apiKey) {
        await this.init();
        if (!this.apiKey) {
          throw new Error('Anthropic API key not configured');
        }
      }

      const requestBody = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: maxTokens,
        messages: messages
      };

      if (systemPrompt) {
        requestBody.system = systemPrompt;
      }

      try {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        return data.content[0].text;
      } catch (error) {
        Logger.error('Anthropic API request failed:', error);
        throw error;
      }
    },

    /**
     * Generate Pine Script code from natural language
     */
    async generateCode(prompt, context = null) {
      const systemPrompt = this.getPineScriptSystemPrompt();
      
      let userPrompt = prompt;
      if (context) {
        userPrompt = `Context:\n\`\`\`pine\n${context}\n\`\`\`\n\nRequest: ${prompt}`;
      }

      const messages = [{
        role: 'user',
        content: userPrompt
      }];

      return await this.makeRequest(messages, systemPrompt);
    },

    /**
     * Explain Pine Script code
     */
    async explainCode(code) {
      const systemPrompt = this.getPineScriptSystemPrompt();
      
      const messages = [{
        role: 'user',
        content: `Please explain this Pine Script code in plain English:\n\n\`\`\`pine\n${code}\n\`\`\``
      }];

      return await this.makeRequest(messages, systemPrompt);
    },

    /**
     * Modify existing code
     */
    async modifyCode(code, modificationRequest) {
      const systemPrompt = this.getPineScriptSystemPrompt();
      
      const messages = [{
        role: 'user',
        content: `Here is the current Pine Script code:\n\n\`\`\`pine\n${code}\n\`\`\`\n\nPlease modify it to: ${modificationRequest}. Return only the complete modified code.`
      }];

      return await this.makeRequest(messages, systemPrompt);
    },

    /**
     * Debug code errors
     */
    async debugCode(code, errorMessage) {
      const systemPrompt = this.getPineScriptSystemPrompt();
      
      const messages = [{
        role: 'user',
        content: `This Pine Script code has an error:\n\n\`\`\`pine\n${code}\n\`\`\`\n\nError: ${errorMessage}\n\nPlease fix the error and explain what was wrong.`
      }];

      return await this.makeRequest(messages, systemPrompt);
    },

    /**
     * Get system prompt for Pine Script tasks
     */
    getPineScriptSystemPrompt() {
      return `You are an expert Pine Script v6 programmer. You help users write, modify, and debug TradingView Pine Script indicators and strategies.

Key requirements:
- Always use @version=6
- Follow Pine Script best practices
- Use proper type declarations
- Include helpful comments
- Make code readable and maintainable
- When generating code, return complete, runnable scripts
- When modifying code, preserve the original structure and style
- Always format code blocks with proper Pine Script syntax highlighting

Common patterns:
- Use ta.rsi(), ta.macd(), ta.sma(), etc. for technical indicators
- Use strategy.entry(), strategy.close() for strategies
- Use plot() for indicators
- Use input.*() for user inputs
- Use proper variable scoping (simple, var, series)`;
    }
  };

})();

