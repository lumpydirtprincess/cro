// ============================================================================
// Signal Rules Engine - Rules-based trading signal generation
// ============================================================================

(function() {
  'use strict';

  window.SignalRules = {
    /**
     * Generate trading signal from indicator readings
     */
    generateSignal(indicatorReadings, currentPrice) {
      const signals = {
        long: { score: 0, reasons: [] },
        short: { score: 0, reasons: [] }
      };

      // RSI signals
      if (indicatorReadings.RSI !== undefined) {
        const rsi = indicatorReadings.RSI.value;
        if (rsi < 30) {
          signals.long.score += 2;
          signals.long.reasons.push(`RSI oversold (${rsi.toFixed(2)})`);
        } else if (rsi > 70) {
          signals.short.score += 2;
          signals.short.reasons.push(`RSI overbought (${rsi.toFixed(2)})`);
        } else if (rsi > 50) {
          signals.long.score += 0.5;
        } else {
          signals.short.score += 0.5;
        }
      }

      // MACD signals
      if (indicatorReadings.MACD !== undefined) {
        const macd = indicatorReadings.MACD;
        if (macd.histogram > 0 && macd.macdLine > macd.signalLine) {
          signals.long.score += 2;
          signals.long.reasons.push('MACD bullish crossover');
        } else if (macd.histogram < 0 && macd.macdLine < macd.signalLine) {
          signals.short.score += 2;
          signals.short.reasons.push('MACD bearish crossover');
        }
      }

      // Moving Average signals
      if (indicatorReadings.MA !== undefined && currentPrice) {
        const ma = indicatorReadings.MA;
        if (currentPrice > ma.value) {
          signals.long.score += 1.5;
          signals.long.reasons.push(`Price above ${ma.type || 'MA'} (${ma.value.toFixed(2)})`);
        } else {
          signals.short.score += 1.5;
          signals.short.reasons.push(`Price below ${ma.type || 'MA'} (${ma.value.toFixed(2)})`);
        }
      }

      // Bollinger Bands signals
      if (indicatorReadings.BOLLINGER !== undefined && currentPrice) {
        const bb = indicatorReadings.BOLLINGER;
        const bbWidth = bb.upper - bb.lower;
        const bbMid = (bb.upper + bb.lower) / 2;
        
        if (currentPrice < bb.lower) {
          signals.long.score += 1.5;
          signals.long.reasons.push(`Price below lower Bollinger Band`);
        } else if (currentPrice > bb.upper) {
          signals.short.score += 1.5;
          signals.short.reasons.push(`Price above upper Bollinger Band`);
        }
        
        // Squeeze detection (narrow bands)
        if (bbWidth / bbMid < 0.02) {
          signals.long.score += 0.5;
          signals.short.score += 0.5;
          signals.long.reasons.push('Bollinger Band squeeze detected');
        }
      }

      // Stochastic signals
      if (indicatorReadings.STOCHASTIC !== undefined) {
        const stoch = indicatorReadings.STOCHASTIC;
        if (stoch.k < 20 && stoch.d < 20 && stoch.k > stoch.d) {
          signals.long.score += 2;
          signals.long.reasons.push(`Stochastic oversold with bullish crossover`);
        } else if (stoch.k > 80 && stoch.d > 80 && stoch.k < stoch.d) {
          signals.short.score += 2;
          signals.short.reasons.push(`Stochastic overbought with bearish crossover`);
        }
      }

      // WaveTrend signals
      if (indicatorReadings.WAVETREND !== undefined) {
        const wt = indicatorReadings.WAVETREND;
        if (wt.value < -53 && wt.crossingUp) {
          signals.long.score += 2;
          signals.long.reasons.push('WaveTrend oversold with bullish crossover');
        } else if (wt.value > 53 && wt.crossingDown) {
          signals.short.score += 2;
          signals.short.reasons.push('WaveTrend overbought with bearish crossover');
        }
      }

      // Determine final signal
      const maxScore = Math.max(signals.long.score, signals.short.score);
      const confidence = Math.min(maxScore / 5, 1); // Normalize to 0-1

      let direction = null;
      let reasons = [];
      let entry = currentPrice || 0;
      let takeProfit = entry;
      let stopLoss = entry;

      if (signals.long.score > signals.short.score && signals.long.score >= 3) {
        direction = 'LONG';
        reasons = signals.long.reasons;
        
        // Calculate TP/SL for long
        if (currentPrice) {
          takeProfit = currentPrice * 1.02; // 2% target (can be improved with support/resistance)
          stopLoss = currentPrice * 0.98; // 2% stop
        }
      } else if (signals.short.score > signals.long.score && signals.short.score >= 3) {
        direction = 'SHORT';
        reasons = signals.short.reasons;
        
        // Calculate TP/SL for short
        if (currentPrice) {
          takeProfit = currentPrice * 0.98; // 2% target
          stopLoss = currentPrice * 1.02; // 2% stop
        }
      }

      return {
        direction,
        confidence,
        reasons,
        entry,
        takeProfit,
        stopLoss,
        timestamp: Date.now()
      };
    },

    /**
     * Combine signals from multiple timeframes
     */
    combineTimeframeSignals(timeframeSignals) {
      const combined = {
        long: { count: 0, totalConfidence: 0 },
        short: { count: 0, totalConfidence: 0 }
      };

      timeframeSignals.forEach(signal => {
        if (signal.direction === 'LONG') {
          combined.long.count++;
          combined.long.totalConfidence += signal.confidence;
        } else if (signal.direction === 'SHORT') {
          combined.short.count++;
          combined.short.totalConfidence += signal.confidence;
        }
      });

      const totalTimeframes = timeframeSignals.length;
      const longStrength = combined.long.count / totalTimeframes;
      const shortStrength = combined.short.count / totalTimeframes;

      let direction = null;
      if (longStrength > 0.5) {
        direction = 'LONG';
      } else if (shortStrength > 0.5) {
        direction = 'SHORT';
      }

      const avgConfidence = direction === 'LONG' 
        ? combined.long.totalConfidence / (combined.long.count || 1)
        : combined.short.totalConfidence / (combined.short.count || 1);

      return {
        direction,
        confidence: avgConfidence,
        timeframeAlignment: {
          long: longStrength,
          short: shortStrength
        },
        allReasons: timeframeSignals.flatMap(s => s.reasons)
      };
    }
  };

})();

