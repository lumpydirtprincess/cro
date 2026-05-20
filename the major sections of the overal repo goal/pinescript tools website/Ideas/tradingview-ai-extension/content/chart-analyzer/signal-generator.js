// ============================================================================
// Signal Generator - Generate trading signals from indicator data
// ============================================================================

(function() {
  'use strict';

  window.SignalGenerator = {
    /**
     * Generate signal for current chart state
     */
    async generateSignal(timeframe) {
      try {
        // Extract indicator readings
        const readings = await IndicatorExtractor.extractAllIndicators();
        
        if (!readings.price) {
          Logger.warn('Could not extract price, skipping signal generation');
          return null;
        }

        // Generate signal using rules engine
        const signal = SignalRules.generateSignal(readings, readings.price);
        
        // Add timeframe info
        signal.timeframe = timeframe || TradingViewDOM.getCurrentTimeframe();
        signal.symbol = TradingViewDOM.getCurrentSymbol();
        signal.readings = readings;

        Logger.log('Generated signal:', signal);
        return signal;
      } catch (error) {
        Logger.error('Error generating signal:', error);
        return null;
      }
    },

    /**
     * Generate signals for multiple timeframes
     */
    async generateMultiTimeframeSignals(timeframes) {
      const signals = [];
      const originalTimeframe = TradingViewDOM.getCurrentTimeframe();

      try {
        for (const tf of timeframes) {
          Logger.log(`Generating signal for timeframe: ${tf}`);

          // Switch timeframe
          const switched = await TimeframeSwitcher.switchTimeframe(tf);
          if (!switched) {
            Logger.warn(`Failed to switch to timeframe: ${tf}`);
            continue;
          }

          // Wait a bit for indicators to update
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Generate signal
          const signal = await this.generateSignal(tf);
          if (signal) {
            signals.push(signal);
          }
        }

        // Restore original timeframe
        await TimeframeSwitcher.restoreOriginalTimeframe();

        // Combine signals
        const combinedSignal = SignalRules.combineTimeframeSignals(signals);
        combinedSignal.timeframeSignals = signals;

        Logger.log('Combined multi-timeframe signal:', combinedSignal);
        return combinedSignal;
      } catch (error) {
        Logger.error('Error generating multi-timeframe signals:', error);
        
        // Try to restore original timeframe
        await TimeframeSwitcher.restoreOriginalTimeframe();
        
        return null;
      }
    }
  };

})();

