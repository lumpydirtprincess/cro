// ============================================================================
// Indicator Extractor - DOM scraping for indicator values
// ============================================================================

(function() {
  'use strict';

  window.IndicatorExtractor = {
    /**
     * Extract all indicator values from chart
     */
    async extractAllIndicators() {
      const readings = {};
      
      try {
        // Extract RSI
        const rsi = this.extractRSI();
        if (rsi) readings.RSI = rsi;

        // Extract MACD
        const macd = this.extractMACD();
        if (macd) readings.MACD = macd;

        // Extract Moving Averages
        const ma = this.extractMA();
        if (ma) readings.MA = ma;

        // Extract Bollinger Bands
        const bb = this.extractBollingerBands();
        if (bb) readings.BOLLINGER = bb;

        // Extract Stochastic
        const stoch = this.extractStochastic();
        if (stoch) readings.STOCHASTIC = stoch;

        // Extract WaveTrend
        const wt = this.extractWaveTrend();
        if (wt) readings.WAVETREND = wt;

        // Extract current price
        const price = this.extractCurrentPrice();
        if (price) readings.price = price;

        Logger.log('Extracted indicators:', readings);
        return readings;
      } catch (error) {
        Logger.error('Error extracting indicators:', error);
        return readings;
      }
    },

    /**
     * Extract RSI value
     */
    extractRSI() {
      const legendItems = this.getLegendItems();
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        if (/RSI/i.test(text)) {
          const match = text.match(/RSI[:\s]+([0-9.]+)/i);
          if (match) {
            return {
              type: 'RSI',
              value: parseFloat(match[1]),
              raw: text
            };
          }
        }
      }
      
      return null;
    },

    /**
     * Extract MACD values
     */
    extractMACD() {
      const legendItems = this.getLegendItems();
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        if (/MACD/i.test(text)) {
          // Try to extract MACD line, signal line, and histogram
          const macdMatch = text.match(/MACD[:\s]+([0-9.-]+)/i);
          const signalMatch = text.match(/Signal[:\s]+([0-9.-]+)/i);
          const histMatch = text.match(/Hist[:\s]+([0-9.-]+)/i);
          
          if (macdMatch) {
            return {
              macdLine: parseFloat(macdMatch[1]),
              signalLine: signalMatch ? parseFloat(signalMatch[1]) : null,
              histogram: histMatch ? parseFloat(histMatch[1]) : null,
              raw: text
            };
          }
        }
      }
      
      return null;
    },

    /**
     * Extract Moving Average value
     */
    extractMA() {
      const legendItems = this.getLegendItems();
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        const maMatch = text.match(/(MA|SMA|EMA|WMA)\s*(\d+)[:\s]+([0-9.]+)/i);
        
        if (maMatch) {
          return {
            type: maMatch[1],
            period: parseInt(maMatch[2]),
            value: parseFloat(maMatch[3]),
            raw: text
          };
        }
      }
      
      return null;
    },

    /**
     * Extract Bollinger Bands
     */
    extractBollingerBands() {
      const legendItems = this.getLegendItems();
      let upper = null, middle = null, lower = null;
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        if (/bollinger/i.test(text)) {
          const upperMatch = text.match(/Upper[:\s]+([0-9.]+)/i);
          const middleMatch = text.match(/Middle[:\s]+([0-9.]+)/i);
          const lowerMatch = text.match(/Lower[:\s]+([0-9.]+)/i);
          
          if (upperMatch) upper = parseFloat(upperMatch[1]);
          if (middleMatch) middle = parseFloat(middleMatch[1]);
          if (lowerMatch) lower = parseFloat(lowerMatch[1]);
        }
      }
      
      if (upper && lower) {
        return {
          upper,
          middle: middle || (upper + lower) / 2,
          lower
        };
      }
      
      return null;
    },

    /**
     * Extract Stochastic values
     */
    extractStochastic() {
      const legendItems = this.getLegendItems();
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        if (/(stoch|KDJ)/i.test(text)) {
          const kMatch = text.match(/(%K|K)[:\s]+([0-9.]+)/i);
          const dMatch = text.match(/(%D|D)[:\s]+([0-9.]+)/i);
          const jMatch = text.match(/(%J|J)[:\s]+([0-9.]+)/i);
          
          if (kMatch && dMatch) {
            return {
              k: parseFloat(kMatch[2]),
              d: parseFloat(dMatch[2]),
              j: jMatch ? parseFloat(jMatch[2]) : null,
              raw: text
            };
          }
        }
      }
      
      return null;
    },

    /**
     * Extract WaveTrend values
     */
    extractWaveTrend() {
      const legendItems = this.getLegendItems();
      
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        if (/wavetrend|WT/i.test(text)) {
          const valueMatch = text.match(/(WT|WaveTrend)[:\s]+([0-9.-]+)/i);
          if (valueMatch) {
            return {
              value: parseFloat(valueMatch[2]),
              raw: text
            };
          }
        }
      }
      
      return null;
    },

    /**
     * Extract current price
     */
    extractCurrentPrice() {
      const legendItems = this.getLegendItems();
      
      // Try to find price in legend
      for (const item of legendItems) {
        const text = item.textContent || item.innerText;
        // Price usually appears first or is marked as "Close" or just a number
        const priceMatch = text.match(/^([0-9.]+)$/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1]);
          // Sanity check - price should be reasonable
          if (price > 0 && price < 1000000) {
            return price;
          }
        }
      }
      
      // Try alternative methods
      const priceElement = document.querySelector('[class*="price"]') ||
                          document.querySelector('[data-field="last"]');
      
      if (priceElement) {
        const priceText = priceElement.textContent || priceElement.innerText;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        if (!isNaN(price) && price > 0) {
          return price;
        }
      }
      
      return null;
    },

    /**
     * Get legend items from chart
     */
    getLegendItems() {
      const legendPanel = TradingViewDOM.getIndicatorPanel();
      if (!legendPanel) return [];

      // Try multiple selector strategies
      const items = legendPanel.querySelectorAll('[class*="legend"]') ||
                   legendPanel.querySelectorAll('[data-name*="legend"]') ||
                   legendPanel.querySelectorAll('div[class*="item"]') ||
                   legendPanel.querySelectorAll('span');

      return Array.from(items).filter(item => {
        const text = item.textContent || item.innerText;
        return text && text.trim().length > 0 && text.length < 200;
      });
    }
  };

})();

