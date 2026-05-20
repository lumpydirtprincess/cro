// ============================================================================
// Brainstorming Engine - Guide users through strategy development
// ============================================================================

(function() {
  'use strict';

  window.BrainstormingEngine = {
    conversationState: null,

    /**
     * Start brainstorming session
     */
    async startSession(initialGoal = null) {
      this.conversationState = {
        goal: initialGoal,
        timeframe: null,
        indicators: [],
        entryConditions: null,
        exitConditions: null,
        riskManagement: null,
        questions: []
      };

      return await this.getNextQuestion();
    },

    /**
     * Get next prompting question
     */
    async getNextQuestion() {
      const state = this.conversationState;
      if (!state) return null;

      // Question flow based on what we know
      if (!state.goal) {
        return {
          question: 'What is your trading goal? Are you looking to create an indicator or a trading strategy?',
          type: 'goal'
        };
      }

      if (!state.timeframe) {
        return {
          question: 'What timeframe will you be trading on? (e.g., 5m, 15m, 1h, 4h, 1D)',
          type: 'timeframe'
        };
      }

      if (state.indicators.length === 0) {
        return {
          question: 'Which indicators do you want to use? (e.g., RSI, MACD, Moving Averages, Bollinger Bands)',
          type: 'indicators'
        };
      }

      if (!state.entryConditions) {
        return {
          question: 'What conditions should trigger an entry? (e.g., RSI crosses above 30, MACD bullish crossover)',
          type: 'entry'
        };
      }

      if (!state.exitConditions) {
        return {
          question: 'When should positions be closed? (e.g., take profit at 2%, stop loss at 1%, indicator reversal)',
          type: 'exit'
        };
      }

      // All questions answered, generate code
      return {
        question: 'Great! Ready to generate your strategy. Would you like me to create it now?',
        type: 'generate'
      };
    },

    /**
     * Answer a question and progress conversation
     */
    answerQuestion(answer, questionType) {
      if (!this.conversationState) return;

      switch (questionType) {
        case 'goal':
          this.conversationState.goal = answer;
          break;
        case 'timeframe':
          this.conversationState.timeframe = answer;
          break;
        case 'indicators':
          this.conversationState.indicators = answer.split(',').map(i => i.trim());
          break;
        case 'entry':
          this.conversationState.entryConditions = answer;
          break;
        case 'exit':
          this.conversationState.exitConditions = answer;
          break;
      }

      this.conversationState.questions.push({ type: questionType, answer });
    },

    /**
     * Generate strategy code from conversation state
     */
    async generateStrategyFromState() {
      if (!this.conversationState) {
        throw new Error('No brainstorming session active');
      }

      const state = this.conversationState;
      const isStrategy = state.goal.toLowerCase().includes('strategy');

      let prompt = `Create a ${isStrategy ? 'trading strategy' : 'indicator'} in Pine Script v6 with the following requirements:\n\n`;
      prompt += `Timeframe: ${state.timeframe}\n`;
      prompt += `Indicators: ${state.indicators.join(', ')}\n`;
      prompt += `Entry conditions: ${state.entryConditions}\n`;
      if (state.exitConditions) {
        prompt += `Exit conditions: ${state.exitConditions}\n`;
      }

      return await AIClient.generateCode(prompt);
    },

    /**
     * Reset conversation state
     */
    reset() {
      this.conversationState = null;
    }
  };

})();

