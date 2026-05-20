// ============================================================================
// Indicator Library - Standard indicator definitions and patterns
// ============================================================================

(function() {
  'use strict';

  window.IndicatorLibrary = {
    /**
     * Indicator definitions with detection patterns
     */
    indicators: {
      RSI: {
        name: 'RSI',
        fullName: 'Relative Strength Index',
        detectionPatterns: [
          /RSI/i,
          /relative.*strength/i
        ],
        levels: {
          oversold: 30,
          overbought: 70
        },
        interpretation: {
          oversold: 'RSI below 30 indicates oversold condition - potential buy signal',
          overbought: 'RSI above 70 indicates overbought condition - potential sell signal'
        }
      },
      MACD: {
        name: 'MACD',
        fullName: 'Moving Average Convergence Divergence',
        detectionPatterns: [
          /MACD/i,
          /moving.*average.*convergence/i
        ],
        interpretation: {
          bullishCrossover: 'MACD line crosses above signal line - bullish signal',
          bearishCrossover: 'MACD line crosses below signal line - bearish signal',
          divergence: 'MACD divergence suggests potential reversal'
        }
      },
      MA: {
        name: 'MA',
        fullName: 'Moving Average',
        detectionPatterns: [
          /MA\s*\d+/i,
          /moving.*average/i,
          /SMA|EMA|WMA/i
        ],
        types: ['SMA', 'EMA', 'WMA'],
        interpretation: {
          priceAbove: 'Price above MA suggests bullish trend',
          priceBelow: 'Price below MA suggests bearish trend',
          crossover: 'MA crossover indicates trend change'
        }
      },
      BOLLINGER: {
        name: 'BB',
        fullName: 'Bollinger Bands',
        detectionPatterns: [
          /bollinger/i,
          /BB\s*[BW]?/i
        ],
        interpretation: {
          squeeze: 'Band squeeze indicates low volatility, potential breakout',
          upperTouch: 'Price touching upper band - potential reversal down',
          lowerTouch: 'Price touching lower band - potential reversal up'
        }
      },
      STOCHASTIC: {
        name: 'STOCH',
        fullName: 'Stochastic Oscillator',
        detectionPatterns: [
          /stoch/i,
          /KDJ/i,
          /k.*d.*j/i
        ],
        levels: {
          oversold: 20,
          overbought: 80
        },
        interpretation: {
          oversold: 'Stochastic below 20 - oversold, potential buy',
          overbought: 'Stochastic above 80 - overbought, potential sell',
          crossover: 'K/D crossover indicates momentum shift'
        }
      },
      WAVETREND: {
        name: 'WT',
        fullName: 'WaveTrend Oscillator',
        detectionPatterns: [
          /wavetrend/i,
          /WT\s*[0-9]/i
        ],
        levels: {
          oversold: -53,
          overbought: 53
        },
        interpretation: {
          crossover: 'WT crossovers indicate momentum changes',
          divergence: 'WT divergence suggests potential reversal'
        }
      }
    },

    /**
     * Detect indicator type from name/text
     */
    detectIndicator(text) {
      if (!text) return null;

      const textUpper = text.toUpperCase();
      
      for (const [key, indicator] of Object.entries(this.indicators)) {
        for (const pattern of indicator.detectionPatterns) {
          if (pattern.test(textUpper)) {
            return {
              type: key,
              ...indicator
            };
          }
        }
      }
      
      return null;
    },

    /**
     * Get indicator interpretation for a given value
     */
    getInterpretation(indicatorType, value, context = {}) {
      const indicator = this.indicators[indicatorType];
      if (!indicator) return null;

      if (indicatorType === 'RSI') {
        if (value < indicator.levels.oversold) {
          return indicator.interpretation.oversold;
        } else if (value > indicator.levels.overbought) {
          return indicator.interpretation.overbought;
        }
      } else if (indicatorType === 'STOCHASTIC') {
        if (value < indicator.levels.oversold) {
          return indicator.interpretation.oversold;
        } else if (value > indicator.levels.overbought) {
          return indicator.interpretation.overbought;
        }
      }

      return null;
    }
  };

})();

