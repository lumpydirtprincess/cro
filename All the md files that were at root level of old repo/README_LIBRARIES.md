# Pine Script Libraries - Quick Start Guide

## Overview

This repository now contains **409 TradingView v6 Libraries** converted from the original 410 quantitative indicators.

### What's Included

- **409 library files** in TradingView v6 format
- **16 categories** of technical indicators
- **Full descriptive names** (no abbreviations)
- **Exported functions** ready for import
- **Original files preserved** (unchanged)

## Directory Structure

```
Model Indicators/quantitative/
├── indicators/          # ORIGINALS - 410 files (do not modify)
└── libraries/           # NEW - 409 files (ready to use)
    ├── channels/        # 22 indicators
    ├── core/            # 7 indicators
    ├── cycles/          # 16 indicators
    ├── dynamics/        # 20 indicators
    ├── errors/          # 27 indicators
    ├── filters/         # 39 indicators
    ├── forecasts/       # 2 indicators
    ├── momentum/        # 19 indicators
    ├── numerics/        # 24 indicators
    ├── oscillators/     # 26 indicators
    ├── reversals/       # 8 indicators
    ├── statistics/      # 34 indicators
    ├── trends_FIR/      # 28 indicators
    ├── trends_IIR/      # 22 indicators
    ├── volatility/      # 28 indicators
    └── volume/          # 27 indicators
```

## Usage

### Basic Example

```pine
//@version=6
strategy("My Strategy", overlay=true)

// Use library functions
rsiValue = relative_strength_index(close, 14)
macdResult = moving_average_convergence_divergence(close, 12, 26, 9)
hullMA = hull_moving_average(close, 20)

// Plot
plot(hullMA, "HMA", color.green)

// Strategy logic
if (rsiValue < 30)
    strategy.entry("Long", strategy.long)
```

### Importing Multiple Indicators

```pine
//@version=6
indicator("Custom Indicator", overlay=true)

// From statistics
betaVal = beta_function(close, open, 14)
corr = correlation_coefficient(close, open, 20)

// From momentum
rsiVal = relative_strength_index(close, 14)
macdHist = moving_average_convergence_divergence(close, 12, 26, 9)

// From volatility
atrVal = average_true_range(14)
bbUpper = bollinger_bands(close, 20, 2).upper

// Plot
plot(bbUpper, "BB Upper", color.blue)
```

## Available Libraries

### Core Price Calculations
- `average_price.pine`
- `heikin_ashi.pine`
- `median_price.pine`
- `typical_price.pine`
- `weighted_close_price.pine`

### Moving Averages
- `simple_moving_average.pine`
- `exponential_moving_average.pine`
- `hull_moving_average.pine`
- `kaufman_adaptive_moving_average.pine`
- `triple_exponential_moving_average.pine`

### Momentum Indicators
- `relative_strength_index.pine`
- `commodity_channel_index.pine`
- `momentum_oscillator.pine`
- `moving_average_convergence_divergence.pine`
- `stochastic_oscillator.pine`

### Volatility Indicators
- `average_true_range.pine`
- `bollinger_bands.pine`
- `historical_volatility.pine`
- `ulcer_index.pine`

### Volume Indicators
- `accumulation_distribution_line.pine`
- `chaikin_money_flow.pine`
- `money_flow_index.pine`
- `on_balance_volume.pine`
- `volume_weighted_average_price.pine`

### Statistics
- `beta_function.pine`
- `correlation_coefficient.pine`
- `linear_regression.pine`
- `standard_deviation.pine`
- `z_score_statistic.pine`

[See all 409 libraries in their respective folders]

## Function Reference

Each library file contains:
- `//@version=6` - Pine Script version
- `library("Name", "v1.0.0", overlay=false)` - Library declaration
- `//@function` - Function description
- `//@param` - Parameter descriptions
- `//@returns` - Return value description
- `export function_name(params) =>` - Exported function

## Important Notes

### Original Files
✅ All original indicators are preserved in `indicators/` folder  
⚠️ Do not modify original files  
✅ Use `libraries/` folder for new projects

### Premium Content
⚠️ Dskyz[Dafe]_collective indicators are proprietary  
⚠️ Do not modify premium indicator logic  
✅ Premium indicators remain in original location

### Library Format
✅ Functions are exported for reuse  
✅ No auto-plotting (libraries don't plot by default)  
✅ Compatible with TradingView v6  
✅ Can be imported across multiple scripts

## Troubleshooting

### Library Not Found
Make sure you're using the correct path:
```pine
// Correct: Use function name directly
rsiValue = relative_strength_index(close, 14)
```

### Function Parameters
Check the library file for parameter descriptions:
```pine
//@function Calculates Relative Strength Index
//@param src Source series to calculate RSI for
//@param len Lookback period for RSI calculation
//@returns RSI value
export rsi(series float src, simple int len) =>
```

### Compilation Errors
- Ensure you're using Pine Script v6
- Check function parameter types match
- Verify all required parameters are provided

## Examples

### Example 1: RSI Strategy
```pine
//@version=6
strategy("RSI Strategy", overlay=true)

rsiValue = relative_strength_index(close, 14)

plot(rsiValue, "RSI", color.blue)
hline(70, "Overbought", color.red)
hline(30, "Oversold", color.green)

if (rsiValue < 30)
    strategy.entry("Buy", strategy.long)
    
if (rsiValue > 70)
    strategy.close("Buy")
```

### Example 2: Multi-Indicator System
```pine
//@version=6
strategy("Multi-Indicator", overlay=true)

// Moving averages
sma20 = simple_moving_average(close, 20)
ema20 = exponential_moving_average(close, 20)
hullMA = hull_moving_average(close, 20)

// Momentum
rsiVal = relative_strength_index(close, 14)
macdHist = moving_average_convergence_divergence(close, 12, 26, 9)

// Volatility
atrVal = average_true_range(14)

// Strategy
longCondition = close > hullMA and rsiVal > 50 and macdHist > 0
shortCondition = close < hullMA and rsiVal < 50 and macdHist < 0

if (longCondition)
    strategy.entry("Long", strategy.long)
    
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Plot
plot(sma20, "SMA 20", color.blue)
plot(ema20, "EMA 20", color.red)
plot(hullMA, "HMA 20", color.green)
```

### Example 3: Statistical Analysis
```pine
//@version=6
indicator("Statistical Analysis", overlay=false)

// Correlation between close and open
corr = correlation_coefficient(close, open, 20)

// Beta vs SPY (if you have SPY data)
// betaVal = beta_function(close, security("SPY", timeframe.period, close), 20)

// Standard deviation
stdDev = standard_deviation(close, 20)

plot(corr, "Correlation", color.blue)
plot(stdDev, "Std Dev", color.red)
```

## Support

For issues or questions:
1. Check the library file for function documentation
2. Review examples above
3. Verify Pine Script version is v6
4. Check parameter types and order

## License

Original indicators retain their original licenses.  
Library format conversion: © 2026 LePine Trading  
Premium Dskyz indicators: Proprietary (do not modify)

---

*Last Updated: 2026-04-26*  
*Total Libraries: 409*  
*Pine Script Version: v6*