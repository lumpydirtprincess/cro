# Strategy.NameSpace
## Pine Script v6 Strategy Capabilities - Master Reference Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Strategy Function Overview](#strategy-function-overview)
3. [The strategy() Declaration](#the-strategy-declaration)
4. [Entry Logic Patterns](#entry-logic-patterns)
5. [Exit Logic Patterns](#exit-logic-patterns)
6. [Position Management](#position-management)
7. [Advanced Strategy Parameters](#advanced-strategy-parameters)
8. [Order Types](#order-types)
9. [OCA Groups (One-Cancels-All)](#oca-groups-one-cancels-all)
10. [Advanced Code Examples](#advanced-code-examples)
11. [Best Practices and Common Pitfalls](#best-practices-and-common-pitfalls)
12. [Quick Reference Tables](#quick-reference-tables)

---

## Introduction

Pine Script v6 is TradingView's most powerful scripting language for creating custom trading strategies. This comprehensive guide covers everything you need to build sophisticated trading systems, from basic entry/exit logic to advanced position management techniques.

**Key Updates in Pine Script v6:**
- Enhanced type safety and type inference
- Improved `varip` functionality for real-time calculations
- Dynamic requests enabled by default
- Better error handling
- Switch statements for conditional logic
- Default margin percentage of 100% (vs 0% in v5)

---

## Strategy Function Overview

Pine Script v6 provides four core functions for order management:

| Function | Purpose | Reverses Position | Respects Pyramiding |
|----------|---------|-------------------|---------------------|
| `strategy.entry()` | Open/add to positions | Yes (auto) | Yes |
| `strategy.exit()` | Exit with TP/SL/Trailing | N/A | N/A |
| `strategy.order()` | Basic order placement | No | No |
| `strategy.close()` | Close specific entry | N/A | N/A |
| `strategy.close_all()` | Close all positions | N/A | N/A |

 wise thst dtrat===@kilo just wnant to brign to you attentio f that for the mosst part  the strategy. order iis the order  style we want  that be st works with  yh pyramiding in and out  multiple orders  otherwise its very easy for your etrade to open and  close for a singlr round but  w will never 
 
---

## The strategy() Declaration

### Complete Function Signature

```pinescript
strategy(
    title, shorttitle, overlay, format, precision, scale, pyramiding,
    calc_on_order_fills, calc_on_every_tick, max_bars_back,
    backtest_fill_limits_assumption, default_qty_type, default_qty_value,
    initial_capital, currency, slippage, commission_type, commission_value,
    process_orders_on_close, close_entries_rule, margin_long, margin_short,
    explicit_plot_zorder, max_lines_count, max_labels_count, max_boxes_count,
    max_polylines_count, risk_free_rate, use_bar_magnifier,
    fill_orders_on_standard_ohlc, dynamic_requests, behind_chart,
    calc_bars_count
)
```
TODO: i hould hv an agent and use firecrawl scraping all of the strstegy. nsmedpsces   sd  
### Essential Parameters

#### Display Settings
- **title** (string): Strategy name shown on chart
- **shorttitle** (string): Abbreviated name
- **overlay** (bool): `true` overlays on price chart; `false` creates separate pane
- **format** (string): Number format for values
- **precision** (int): Decimal places
- **scale** (scale.*): Scale type for the pane

#### Capital & Position Sizing
- **initial_capital** (float): Starting capital (default: 1,000,000)
- **currency** (string): Account currency (Default, USD, EUR, GBP, JPY, etc.)
- **default_qty_type** (string): Order sizing method
  - `strategy.fixed`: Fixed contracts
  - `strategy.cash`: Dollar amount
  - `strategy.percent_of_equity`: Percentage of equity
- **default_qty_value** (float): Default order size value

#### Risk Management
- **margin_long** (float): Long margin percentage (default v6: 100)
- **margin_short** (float): Short margin percentage (default v6: 100)
- **pyramiding** (int): Max consecutive entries same direction (default: 1)
- **risk_free_rate** (float): Risk-free rate for calculations

#### Commission & Slippage
- **commission_type** (string):
  - `strategy.commission.percent`: Percentage of trade value
  - `strategy.commission.cash_per_order`: Fixed per order
  - `strategy.commission.cash_per_contract`: Fixed per contract
- **commission_value** (float): Commission amount
- **slippage** (int): Slippage in ticks

#### Execution Behavior
- **calc_on_order_fills** (bool): Recalculate when orders fill
- **calc_on_every_tick** (bool): Recalculate on every tick (causes repainting!)
- **process_orders_on_close** (bool): Execute orders at bar close vs next bar open
- **calc_bars_count** (int): Historical bars to calculate

#### Advanced Settings
- **close_entries_rule** (string): "FIFO" or "LIFO" - order for closing trades
- **backtest_fill_limits_assumption** (int): How limit orders fill
- **use_bar_magnifier** (bool): Use lower timeframe for accurate fills
- **fill_orders_on_standard_ohlc** (bool): Use standard OHLC on Heikin Ashi
- **dynamic_requests** (bool): Enable dynamic request.*() calls (default v6: true)
- **max_bars_back** (int): Maximum historical bars reference
- **max_lines_count**, **max_labels_count**, **max_boxes_count**, **max_polylines_count** (int): Display limits

### Example: Complete Strategy Declaration

```pinescript
//@version=6
strategy(
    "Advanced Trading System",
    shorttitle = "ATS",
    overlay = true,
    pyramiding = 3,
    initial_capital = 100000,
    currency = currency.USD,
    default_qty_type = strategy.percent_of_equity,
    default_qty_value = 25,
    commission_type = strategy.commission.percent,
    commission_value = 0.075,
    slippage = 2,
    process_orders_on_close = false,
    calc_on_order_fills = true,
    use_bar_magnifier = true,
    margin_long = 100,
    margin_short = 100
)
```

---

## Entry Logic Patterns

### 1. Basic Entry - Single Condition

```pinescript
//@version=6
strategy("Simple MA Cross", overlay = true)

fastMA = ta.sma(close, 10)
slowMA = ta.sma(close, 30)

// Single condition entry
if ta.crossover(fastMA, slowMA)
    strategy.entry("Long", strategy.long)

if ta.crossunder(fastMA, slowMA)
    strategy.entry("Short", strategy.short)
```

### 2. AND Logic - All Conditions Must Be True

```pinescript
//@version=6
strategy("AND Logic Entry", overlay = true)

// Define individual conditions
priceAboveEMA = close > ta.ema(close, 200)
rsiOversold = ta.rsi(close, 14) < 30
volumeHigh = volume > ta.sma(volume, 20)
macdBullish = ta.macd(close, 12, 26, 9)[0] > ta.macd(close, 12, 26, 9)[1]

// Combine with AND - ALL must be true
longCondition = priceAboveEMA and rsiOversold and volumeHigh and macdBullish

if longCondition
    strategy.entry("Long - All Conditions", strategy.long)
```

### 3. OR Logic - Any Condition Can Trigger

```pinescript
//@version=6
strategy("OR Logic Entry", overlay = true)

// Multiple trigger conditions
rsiOversold = ta.rsi(close, 14) < 30
priceBounceSupport = low <= ta.lowest(low[1], 10) and close > open
macdCross = ta.crossover(ta.macd(close, 12, 26, 9)[0], ta.macd(close, 12, 26, 9)[1])

// Trigger on ANY condition
longCondition = rsiOversold or priceBounceSupport or macdCross

if longCondition
    strategy.entry("Long - Any Trigger", strategy.long)
```

### 4. Mixed AND/OR Logic

```pinescript
//@version=6
strategy("Mixed Logic Entry", overlay = true)

// Trend filters (must both be true)
uptrend = close > ta.ema(close, 200)
strongTrend = ta.atr(14) > ta.atr(14)[10]

// Entry signals (any can trigger)
rsiSignal = ta.rsi(close, 14) < 30
macdSignal = ta.crossover(ta.macd(close, 12, 26, 9)[0], 0)
priceSignal = ta.crossover(close, ta.sma(close, 50))

// Combined: Trend filter AND any signal
longCondition = (uptrend and strongTrend) and (rsiSignal or macdSignal or priceSignal)

if longCondition
    strategy.entry("Long - Mixed Logic", strategy.long)
```

### 5. Voting System - "N out of M" Signals

```pinescript
//@version=6
strategy("Voting System - 2 out of 3", overlay = true)

// Define individual signals
rsiSignal = ta.rsi(close, 14) < 30
macdSignal = ta.crossover(ta.macd(close, 12, 26, 9)[0], ta.macd(close, 12, 26, 9)[1])
stochSignal = ta.stoch(close, high, low, 14) < 20

// Count true conditions (true = 1, false = 0)
signalCount = (rsiSignal ? 1 : 0) + (macdSignal ? 1 : 0) + (stochSignal ? 1 : 0)

// Enter when at least 2 out of 3 signals are true
if signalCount >= 2
    strategy.entry("Long - 2/3 Signals", strategy.long)

// Alternative method using switch (v6 feature)
signalStrength = switch
    rsiSignal and macdSignal and stochSignal => 3
    rsiSignal and macdSignal => 2
    rsiSignal and stochSignal => 2
    macdSignal and stochSignal => 2
    => 0

if signalStrength >= 2
    strategy.entry("Long - Switch Method", strategy.long)
```

### 6. Advanced Voting System - Weighted Signals

```pinescript
//@version=6
strategy("Weighted Voting System", overlay = true)

// Define signals with different weights
rsiSignal = ta.rsi(close, 14) < 30
macdSignal = ta.crossover(ta.macd(close, 12, 26, 9)[0], 0)
volumeSignal = volume > ta.sma(volume, 20) * 1.5
trendSignal = close > ta.ema(close, 200)

// Assign weights to each signal
rsiWeight = rsiSignal ? 2 : 0       // Weight: 2
macdWeight = macdSignal ? 3 : 0     // Weight: 3
volumeWeight = volumeSignal ? 1 : 0 // Weight: 1
trendWeight = trendSignal ? 2 : 0   // Weight: 2

// Calculate total score
totalScore = rsiWeight + macdWeight + volumeWeight + trendWeight

// Enter when score exceeds threshold (e.g., 5 out of 8 possible)
if totalScore >= 5
    strategy.entry("Long - Weighted", strategy.long)
```

### 7. Time-Based Entry Restrictions

```pinescript
//@version=6
strategy("Time-Based Entry", overlay = true)

// Define allowed trading hours (9:30 AM - 3:00 PM EST)
allowedHours = (hour >= 9 and minute >= 30) or (hour >= 10 and hour < 15)

// Only Monday through Thursday
allowedDays = dayofweek >= dayofweek.monday and dayofweek <= dayofweek.thursday

// Entry condition
maCondition = ta.crossover(ta.sma(close, 10), ta.sma(close, 30))

// Only enter during allowed times
if maCondition and allowedHours and allowedDays
    strategy.entry("Long - Time Restricted", strategy.long)
```

### 8. Multi-Timeframe Entry Conditions

```pinescript
//@version=6
strategy("Multi-Timeframe Entry", overlay = true)

// Higher timeframe trend filter
htfTrend = request.security(syminfo.tickerid, "D", close > ta.ema(close, 50))

// Current timeframe signal
ctfSignal = ta.crossover(ta.rsi(close, 14), 30)

// Only enter when higher timeframe confirms
if ctfSignal and htfTrend
    strategy.entry("Long - MTF Confirmed", strategy.long)
```

### 9. Signal Filtering and Confirmation

```pinescript
//@version=6
strategy("Signal Confirmation", overlay = true)

// Primary signal
primarySignal = ta.crossover(ta.sma(close, 10), ta.sma(close, 30))

// Confirmation filters
volumeConfirmation = volume > ta.sma(volume, 20)
priceConfirmation = close > open  // Bullish candle
trendConfirmation = close > ta.ema(close, 200)

// Only enter when signal is confirmed
if primarySignal and volumeConfirmation and priceConfirmation and trendConfirmation
    strategy.entry("Long - Confirmed", strategy.long)
```

### 10. User-Configurable Entry Logic

```pinescript
//@version=6
strategy("Configurable Entry Logic", overlay = true)

// User inputs for enabling/disabling conditions
useRSI = input.bool(true, "Use RSI Signal")
useMACD = input.bool(true, "Use MACD Signal")
useVolume = input.bool(true, "Use Volume Signal")
requiredSignals = input.int(2, "Required Signals (out of 3)", minval=1, maxval=3)

// Define signals
rsiSignal = ta.rsi(close, 14) < 30
macdSignal = ta.crossover(ta.macd(close, 12, 26, 9)[0], 0)
volumeSignal = volume > ta.sma(volume, 20) * 1.5

// Count enabled and true signals
signalCount = 0
if useRSI and rsiSignal
    signalCount += 1
if useMACD and macdSignal
    signalCount += 1
if useVolume and volumeSignal
    signalCount += 1

// Enter when required number of signals are met
if signalCount >= requiredSignals
    strategy.entry("Long - Configurable", strategy.long)
```

---

## Exit Logic Patterns

### 1. strategy.exit() - Complete Parameter List

```pinescript
strategy.exit(
    id,                    // Exit order identifier
    from_entry,           // Entry ID to exit from (optional)
    qty,                  // Quantity to exit
    qty_percent,          // Percentage to exit
    profit,               // Take-profit in ticks from entry
    limit,                // Take-profit absolute price
    loss,                 // Stop-loss in ticks from entry
    stop,                 // Stop-loss absolute price
    trail_price,          // Trailing stop activation price
    trail_points,         // Trailing stop activation in ticks
    trail_offset,         // Trailing stop offset in ticks
    oca_name,            // OCA group name
    comment,             // Order comment
    comment_profit,      // Comment when profit target hit
    comment_loss,        // Comment when stop-loss hit
    comment_trailing,    // Comment when trailing stop hit
    alert_message,       // Custom alert message
    alert_profit,        // Alert message for profit target
    alert_loss,          // Alert message for stop-loss
    alert_trailing,      // Alert message for trailing stop
    disable_alert        // Disable alert for this exit
)
```

### 2. Basic Take-Profit and Stop-Loss

```pinescript
//@version=6
strategy("Basic TP/SL", overlay = true)

// Entry
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // Exit with fixed tick distances
    strategy.exit("Exit Long", "Long",
        profit = 100,    // 100 ticks profit
        loss = 50)       // 50 ticks stop-loss
```

### 3. Price-Based Take-Profit and Stop-Loss

```pinescript
//@version=6
strategy("Price-Based TP/SL", overlay = true)

var float entryPrice = na

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)
    entryPrice := close

    // Calculate TP and SL prices
    float tpPrice = entryPrice * 1.02  // 2% profit
    float slPrice = entryPrice * 0.99  // 1% stop-loss

    strategy.exit("Exit Long", "Long",
        limit = tpPrice,
        stop = slPrice)
```

### 4. ATR-Based Dynamic Stops

```pinescript
//@version=6
strategy("ATR-Based Exits", overlay = true)

atrMultiplier = input.float(2.0, "ATR Multiplier for SL")
atrProfitMult = input.float(3.0, "ATR Multiplier for TP")
atrLength = input.int(14, "ATR Length")

atrValue = ta.atr(atrLength)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // ATR-based dynamic levels
    tpDistance = atrValue * atrProfitMult / syminfo.mintick
    slDistance = atrValue * atrMultiplier / syminfo.mintick

    strategy.exit("Exit Long", "Long",
        profit = tpDistance,
        loss = slDistance)
```

### 5. Partial Exits - Multiple Take-Profit Levels

```pinescript
//@version=6
strategy("Partial Exits", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    // Enter with 3 contracts
    strategy.entry("Long", strategy.long, qty = 3)

    // First exit: 1 contract at 1% profit
    strategy.exit("Exit 1", "Long",
        qty = 1,
        limit = close * 1.01,
        stop = close * 0.99)

    // Second exit: 1 contract at 2% profit
    strategy.exit("Exit 2", "Long",
        qty = 1,
        limit = close * 1.02,
        stop = close * 0.99)

    // Third exit: 1 contract at 3% profit
    strategy.exit("Exit 3", "Long",
        qty = 1,
        limit = close * 1.03,
        stop = close * 0.99)
```

### 6. Percentage-Based Partial Exits

```pinescript
//@version=6
strategy("Percentage Partial Exits", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // Exit 50% at first target
    strategy.exit("Exit 50%", "Long",
        qty_percent = 50,
        limit = close * 1.015,
        stop = close * 0.99)

    // Exit remaining 50% at second target
    strategy.exit("Exit Final", "Long",
        qty_percent = 50,
        limit = close * 1.03,
        stop = close * 0.995)  // Tighter stop
```

### 7. Trailing Stop - Basic

```pinescript
//@version=6
strategy("Basic Trailing Stop", overlay = true)

trailOffset = input.int(50, "Trail Offset (ticks)")
trailActivation = input.int(100, "Trail Activation (ticks)")

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // Trailing stop activates after 100 ticks profit
    strategy.exit("Trailing Exit", "Long",
        trail_points = trailActivation,
        trail_offset = trailOffset)
```

### 8. Trailing Stop - Price-Based Activation

```pinescript
//@version=6
strategy("Price-Based Trailing Stop", overlay = true)

var float entryPrice = na

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)
    entryPrice := close

    // Activate trail when price reaches 2% profit
    activationPrice = entryPrice * 1.02
    offsetTicks = 50

    strategy.exit("Trailing Exit", "Long",
        trail_price = activationPrice,
        trail_offset = offsetTicks)
```

### 9. ATR-Based Trailing Stop

```pinescript
//@version=6
strategy("ATR Trailing Stop", overlay = true)

atrLength = input.int(14, "ATR Length")
atrMultiplier = input.float(2.0, "ATR Multiplier")

var float trailStop = na
var float entryPrice = na

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)
    entryPrice := close
    trailStop := na

// Update trailing stop
if strategy.position_size > 0
    atrValue = ta.atr(atrLength)
    currentStop = high - (atrValue * atrMultiplier)

    // Only move stop up, never down
    trailStop := na(trailStop) ? currentStop : math.max(trailStop, currentStop)

    // Exit when price hits trailing stop
    if close <= trailStop
        strategy.close("Long", comment = "ATR Trail Hit")

plot(strategy.position_size > 0 ? trailStop : na, "ATR Trail Stop", color.red, 2, plot.style_linebr)
```

### 10. Moving Stop to Breakeven

```pinescript
//@version=6
strategy("Breakeven Stop", overlay = true)

breakevenTrigger = input.float(1.5, "Breakeven Trigger %")
breakevenOffset = input.float(0.1, "Breakeven Offset %")

var float entryPrice = na
var bool breakevenSet = false

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)
    entryPrice := close
    breakevenSet := false

    // Initial stop-loss
    strategy.exit("Initial SL", "Long",
        stop = close * 0.98)

// Move to breakeven after profit threshold
if strategy.position_size > 0 and not breakevenSet
    profitPercent = (close - entryPrice) / entryPrice * 100

    if profitPercent >= breakevenTrigger
        // Cancel previous exit and set new breakeven stop
        strategy.cancel("Initial SL")

        bePrice = entryPrice * (1 + breakevenOffset / 100)
        strategy.exit("Breakeven Stop", "Long",
            stop = bePrice)

        breakevenSet := true
```

### 11. Conditional Exit Based on Indicator

```pinescript
//@version=6
strategy("Indicator-Based Exit", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

// Exit when RSI becomes overbought
if strategy.position_size > 0 and ta.rsi(close, 14) > 70
    strategy.close("Long", comment = "RSI Overbought")

// Exit on opposite signal
if strategy.position_size > 0 and ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    strategy.close("Long", comment = "MA Crossunder")
```

### 12. Time-Based Exit

```pinescript
//@version=6
strategy("Time-Based Exit", overlay = true)

maxBarsInTrade = input.int(10, "Max Bars in Trade")

// Track bars since entry
barsSinceEntry() =>
    strategy.opentrades > 0 ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) : na

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // Set initial stop-loss
    strategy.exit("Exit", "Long", stop = close * 0.98)

// Exit after max bars
if strategy.position_size > 0 and barsSinceEntry() >= maxBarsInTrade
    strategy.close("Long", comment = "Time Exit")
```

### 13. End-of-Day Exit

```pinescript
//@version=6
strategy("End-of-Day Exit", overlay = true)

exitHour = input.int(15, "Exit Hour (24h)", minval=0, maxval=23)
exitMinute = input.int(45, "Exit Minute", minval=0, maxval=59)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

// Close all positions at specified time
if strategy.position_size > 0 and hour == exitHour and minute >= exitMinute
    strategy.close_all(comment = "End of Day")
```

### 14. Combined Exit Strategy - Multiple Conditions

```pinescript
//@version=6
strategy("Advanced Multi-Exit", overlay = true)

var float entryPrice = na
var float trailStop = na

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)
    entryPrice := close
    trailStop := na

    // Partial exit at 1% profit
    strategy.exit("Exit 1", "Long",
        qty_percent = 30,
        limit = close * 1.01)

    // Partial exit at 2% profit
    strategy.exit("Exit 2", "Long",
        qty_percent = 30,
        limit = close * 1.02)

// Update trailing stop for remaining position
if strategy.position_size > 0
    atrValue = ta.atr(14)
    currentStop = high - (atrValue * 2)
    trailStop := na(trailStop) ? currentStop : math.max(trailStop, currentStop)

    if close <= trailStop
        strategy.close_all(comment = "Trail Stop")

// Exit on opposite signal
if strategy.position_size > 0 and ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    strategy.close_all(comment = "Opposite Signal")

// Time-based exit
if strategy.position_size > 0 and hour == 15 and minute >= 45
    strategy.close_all(comment = "End of Day")

plot(strategy.position_size > 0 ? trailStop : na, "Trail Stop", color.red, 2)
```

---

## Position Management

### 1. Pyramiding - Adding to Winning Positions

```pinescript
//@version=6
strategy("Pyramiding Example", overlay = true, pyramiding = 3)

fastMA = ta.sma(close, 10)
slowMA = ta.sma(close, 30)

// Initial entry
if ta.crossover(fastMA, slowMA) and strategy.opentrades == 0
    strategy.entry("Long 1", strategy.long)

// Add to position on continued strength
if strategy.position_size > 0 and close > strategy.position_avg_price * 1.01
    if strategy.opentrades == 1
        strategy.entry("Long 2", strategy.long)
    else if strategy.opentrades == 2
        strategy.entry("Long 3", strategy.long)

// Exit all on opposite signal
if ta.crossunder(fastMA, slowMA)
    strategy.close_all()
```

### 2. Scaling In - Multiple Entry Levels

```pinescript
//@version=6
strategy("Scaling In", overlay = true, pyramiding = 3)

var float level1 = na
var float level2 = na
var float level3 = na

// Define entry levels on initial signal
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30)) and strategy.opentrades == 0
    level1 := close
    level2 := close * 0.99
    level3 := close * 0.98

    // Place scaled entries
    strategy.entry("Entry 1", strategy.long, limit = level1)
    strategy.entry("Entry 2", strategy.long, limit = level2)
    strategy.entry("Entry 3", strategy.long, limit = level3)

    // Single exit for all entries
    strategy.exit("Exit All", loss = 150, profit = 300)

// Cancel pending orders on opposite signal
if ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    strategy.cancel_all()
    strategy.close_all()
```

### 3. Scaling Out - Multiple Exit Levels

```pinescript
//@version=6
strategy("Scaling Out", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    // Enter with 100 shares
    strategy.entry("Long", strategy.long, qty = 100)

    // Scale out at different levels
    strategy.exit("Exit 1", "Long", qty = 25, limit = close * 1.01)  // 25% at +1%
    strategy.exit("Exit 2", "Long", qty = 25, limit = close * 1.02)  // 25% at +2%
    strategy.exit("Exit 3", "Long", qty = 25, limit = close * 1.03)  // 25% at +3%
    strategy.exit("Exit 4", "Long", qty = 25, limit = close * 1.05)  // 25% at +5%
```

### 4. Average Entry Price Management

```pinescript
//@version=6
strategy("Average Entry Management", overlay = true, pyramiding = 3)

// Track average entry price
avgEntry = strategy.position_avg_price

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

// Add to position if price pulls back to average
if strategy.position_size > 0 and close <= avgEntry * 0.99 and strategy.opentrades < 3
    strategy.entry("Long", strategy.long)

// Exit when price is 2% above average entry
if strategy.position_size > 0 and close >= avgEntry * 1.02
    strategy.close_all()

plot(avgEntry, "Avg Entry Price", color.yellow, 2)
```

### 5. Signal Validity - Signal Stays Active for X Bars

```pinescript
//@version=6
strategy("Signal Validity", overlay = true)

signalValidBars = input.int(5, "Signal Valid for N Bars")

var int signalBar = na
var bool signalActive = false

// Detect entry signal
entrySignal = ta.crossover(ta.rsi(close, 14), 30)

if entrySignal
    signalBar := bar_index
    signalActive := true

// Check if signal is still valid
barsFromSignal = bar_index - signalBar
signalValid = signalActive and barsFromSignal <= signalValidBars

// Enter only while signal is valid
if signalValid and strategy.opentrades == 0
    strategy.entry("Long", strategy.long)
    signalActive := false  // Deactivate after entry

// Visual indication
bgcolor(signalValid ? color.new(color.green, 90) : na)
```

### 6. Position Size Based on Volatility

```pinescript
//@version=6
strategy("Volatility-Based Position Sizing", overlay = true)

riskPerTrade = input.float(2.0, "Risk Per Trade %", minval = 0.1, maxval = 10)
atrLength = input.int(14, "ATR Length")
atrMultiplier = input.float(2.0, "ATR Stop Multiplier")

// Calculate position size based on ATR
atrValue = ta.atr(atrLength)
stopDistance = atrValue * atrMultiplier
accountEquity = strategy.equity
riskAmount = accountEquity * (riskPerTrade / 100)
positionSize = riskAmount / stopDistance

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long, qty = positionSize)

    // Set stop based on ATR
    stopPrice = close - stopDistance
    strategy.exit("Exit", "Long", stop = stopPrice)
```

### 7. Pyramiding with Risk Management

```pinescript
//@version=6
strategy("Controlled Pyramiding", overlay = true, pyramiding = 4)

maxPositionSize = input.float(10000, "Max Position Size (USD)")
entrySize = input.float(2500, "Entry Size per Add (USD)")

// Calculate current position value
currentPositionValue = strategy.position_size * strategy.position_avg_price

// Only add if under max position size
canAddToPosition = currentPositionValue + entrySize <= maxPositionSize

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30)) and strategy.opentrades == 0
    strategy.entry("Long", strategy.long, qty = entrySize / close)

// Add on continued strength
if strategy.position_size > 0
    if close > strategy.position_avg_price * 1.01 and canAddToPosition
        strategy.entry("Long", strategy.long, qty = entrySize / close)
```

### 8. Tracking Multiple Entry Points

```pinescript
//@version=6
strategy("Track Multiple Entries", overlay = true, pyramiding = 3)

var array<float> entryPrices = array.new<float>()
var array<int> entryBars = array.new<int>()

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long)

    // Track each entry
    if ta.change(strategy.opentrades) > 0
        array.push(entryPrices, close)
        array.push(entryBars, bar_index)

// Exit when oldest entry reaches 2% profit
if strategy.opentrades > 0 and array.size(entryPrices) > 0
    oldestEntry = array.get(entryPrices, 0)
    if close >= oldestEntry * 1.02
        strategy.close_all()
        array.clear(entryPrices)
        array.clear(entryBars)

// Plot all entry points
if array.size(entryPrices) > 0
    for i = 0 to array.size(entryPrices) - 1
        line.new(array.get(entryBars, i), array.get(entryPrices, i),
                 bar_index, array.get(entryPrices, i),
                 color = color.yellow, style = line.style_dashed)
```

---

## Advanced Strategy Parameters

### strategy.entry() - Complete Parameters

```pinescript
strategy.entry(
    id,              // Order identifier (required)
    direction,       // strategy.long or strategy.short (required)
    qty,            // Order quantity (optional)
    limit,          // Limit price (optional)
    stop,           // Stop price (optional)
    oca_name,       // OCA group name (optional)
    oca_type,       // OCA type (optional)
    comment,        // Order comment (optional)
    alert_message   // Custom alert message (optional)
)
```

**Parameters Explained:**
- **id**: Unique string identifier. Orders with same ID modify/replace previous orders
- **direction**: `strategy.long` for buy, `strategy.short` for sell
- **qty**: Number of contracts/shares. Defaults to strategy default_qty_value
- **limit**: Creates limit order at specified price
- **stop**: Creates stop order at specified price
- **oca_name**: Assigns order to OCA group
- **oca_type**: `strategy.oca.none`, `strategy.oca.cancel`, or `strategy.oca.reduce`
- **comment**: Comment shown in trade list
- **alert_message**: Custom message for alerts

### strategy.exit() - Complete Parameters

```pinescript
strategy.exit(
    id,                    // Exit order identifier (required)
    from_entry,           // Entry ID to exit (optional)
    qty,                  // Quantity to exit (optional)
    qty_percent,          // Percentage to exit (optional)
    profit,               // TP in ticks from entry (optional)
    limit,                // TP absolute price (optional)
    loss,                 // SL in ticks from entry (optional)
    stop,                 // SL absolute price (optional)
    trail_price,          // Trail activation price (optional)
    trail_points,         // Trail activation in ticks (optional)
    trail_offset,         // Trail offset in ticks (optional)
    oca_name,            // OCA group name (optional)
    comment,             // Order comment (optional)
    comment_profit,      // Comment for TP (optional)
    comment_loss,        // Comment for SL (optional)
    comment_trailing,    // Comment for trail (optional)
    alert_message,       // Alert message (optional)
    alert_profit,        // Alert for TP (optional)
    alert_loss,          // Alert for SL (optional)
    alert_trailing,      // Alert for trail (optional)
    disable_alert        // Disable alert (optional)
)
```

**Key Behavior:**
- Must have at least one of: profit, limit, loss, stop, trail_price, or trail_points
- If `from_entry` not specified, exits ALL entries (even future ones)
- `qty` and `qty_percent` control partial exits
- Cannot use both `profit` and `limit` (same for `loss`/`stop`)
- Trailing stop and stop-loss: only places whichever would trigger first

### strategy.order() - Complete Parameters

```pinescript
strategy.order(
    id,              // Order identifier (required)
    direction,       // strategy.long or strategy.short (required)
    qty,            // Order quantity (optional)
    limit,          // Limit price (optional)
    stop,           // Stop price (optional)
    oca_name,       // OCA group name (optional)
    oca_type,       // OCA type (optional)
    comment,        // Order comment (optional)
    alert_message   // Custom alert message (optional)
)
```

**Key Differences from strategy.entry():**
- Does NOT respect pyramiding limits
- Does NOT automatically reverse positions
- Net position = open position + order qty (additive)

### strategy.close() - Complete Parameters

```pinescript
strategy.close(
    id,              // Entry ID to close (required)
    comment,        // Order comment (optional)
    qty,            // Quantity to close (optional)
    qty_percent,    // Percentage to close (optional)
    alert_message,  // Custom alert message (optional)
    immediately     // Close at current price (optional, v6)
)
```

### strategy.close_all() - Complete Parameters

```pinescript
strategy.close_all(
    comment,        // Order comment (optional)
    alert_message,  // Custom alert message (optional)
    immediately     // Close at current price (optional, v6)
)
```

**New in v6:** The `immediately` parameter closes positions at the current price rather than waiting for next bar open.

---

## Order Types

### 1. Market Orders

**Executes immediately at best available price**

```pinescript
//@version=6
strategy("Market Orders", overlay = true)

// Market order - executes at next bar open (historical) or current price (realtime)
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long Market", strategy.long)

// Close at market
if ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    strategy.close("Long Market")
```

### 2. Limit Orders

**Executes at specified price or better**

```pinescript
//@version=6
strategy("Limit Orders", overlay = true)

// Buy limit: executes at limit price or LOWER
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    limitPrice = close * 0.99  // Buy 1% below current price
    strategy.entry("Long Limit", strategy.long, limit = limitPrice)

// Sell limit: executes at limit price or HIGHER
if ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    limitPrice = close * 1.01  // Sell 1% above current price
    strategy.entry("Short Limit", strategy.short, limit = limitPrice)
```

### 3. Stop Orders

**Activates when price crosses stop level**

```pinescript
//@version=6
strategy("Stop Orders", overlay = true)

// Buy stop: activates when price moves ABOVE stop price
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    stopPrice = high  // Buy on breakout above current high
    strategy.entry("Long Stop", strategy.long, stop = stopPrice)

// Sell stop: activates when price moves BELOW stop price
if ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    stopPrice = low  // Sell on breakdown below current low
    strategy.entry("Short Stop", strategy.short, stop = stopPrice)
```

### 4. Stop-Limit Orders

**Combines stop and limit: activates at stop, executes at limit**

```pinescript
//@version=6
strategy("Stop-Limit Orders", overlay = true)

// Entry: stop-limit buy
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    stopPrice = high * 1.001     // Activate 0.1% above high
    limitPrice = high * 1.002    // Execute up to 0.2% above high
    strategy.entry("Long Stop-Limit", strategy.long,
        stop = stopPrice,
        limit = limitPrice)
```

**Important:** When using BOTH stop and limit in strategy.entry():
- Creates a stop-limit order
- For LONG: stop > current price, limit >= stop
- For SHORT: stop < current price, limit <= stop

When using BOTH in strategy.exit():
- Creates TWO separate orders (take-profit limit AND stop-loss)

### 5. Order Modification Example

```pinescript
//@version=6
strategy("Order Modification", overlay = true)

var int orderCount = 0

// First order
if ta.crossover(ta.sma(close, 10), ta.sma(close, 30)) and orderCount == 0
    strategy.entry("Long", strategy.long, limit = close * 0.99)
    orderCount := 1

// Modify order with same ID
if orderCount == 1 and close < close[1]
    // This modifies the previous "Long" order
    strategy.entry("Long", strategy.long, limit = close * 0.98)  // New limit price
```

---

## OCA Groups (One-Cancels-All)

### OCA Types

- **strategy.oca.none**: Orders execute independently (default for entry)
- **strategy.oca.cancel**: When one fills, all others in group are cancelled
- **strategy.oca.reduce**: When one fills, all others reduce quantity (default for exit)

### 1. Basic Bracket Order Using strategy.order()

```pinescript
//@version=6
strategy("Bracket Order - OCA", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30)) and strategy.position_size == 0
    // Enter at market
    strategy.order("Entry", strategy.long, qty = 10)

// After position opens, place bracket
if strategy.position_size > 0 and strategy.position_size[1] == 0
    entryPrice = strategy.position_avg_price

    // Take-profit and stop-loss in same OCA group
    strategy.order("TP", strategy.short, qty = 10,
        limit = entryPrice * 1.02,
        oca_name = "Bracket",
        oca_type = strategy.oca.cancel)

    strategy.order("SL", strategy.short, qty = 10,
        stop = entryPrice * 0.98,
        oca_name = "Bracket",
        oca_type = strategy.oca.cancel)
```

### 2. Multiple Entry Points with OCA

```pinescript
//@version=6
strategy("Multiple Entry OCA", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30)) and strategy.opentrades == 0
    // Place multiple entry orders - only ONE will fill
    strategy.entry("Long 1", strategy.long,
        limit = close * 0.99,
        oca_name = "Entries",
        oca_type = strategy.oca.cancel)

    strategy.entry("Long 2", strategy.long,
        limit = close * 0.98,
        oca_name = "Entries",
        oca_type = strategy.oca.cancel)

    strategy.entry("Long 3", strategy.long,
        limit = close * 0.97,
        oca_name = "Entries",
        oca_type = strategy.oca.cancel)
```

### 3. Advanced: Multiple Take-Profit Levels with OCA Reduce

```pinescript
//@version=6
strategy("Scaled TP with OCA Reduce", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    // Enter with 100 shares
    strategy.entry("Long", strategy.long, qty = 100)

    // Multiple TP levels in same OCA reduce group
    // When one fills for 25 shares, others reduce by 25
    strategy.exit("TP1", "Long",
        qty = 25,
        limit = close * 1.01,
        oca_name = "TPs",
        oca_type = strategy.oca.reduce)

    strategy.exit("TP2", "Long",
        qty = 25,
        limit = close * 1.02,
        oca_name = "TPs",
        oca_type = strategy.oca.reduce)

    strategy.exit("TP3", "Long",
        qty = 25,
        limit = close * 1.03,
        oca_name = "TPs",
        oca_type = strategy.oca.reduce)

    strategy.exit("TP4", "Long",
        qty = 25,
        limit = close * 1.05,
        oca_name = "TPs",
        oca_type = strategy.oca.reduce)
```

### 4. Separate OCA Groups for TP and SL

```pinescript
//@version=6
strategy("Separate OCA Groups", overlay = true)

if ta.crossover(ta.sma(close, 10), ta.sma(close, 30))
    strategy.entry("Long", strategy.long, qty = 100)

    // Take-profit orders in one OCA group
    strategy.exit("TP1", "Long", qty = 50, limit = close * 1.02,
        oca_name = "TakeProfit", oca_type = strategy.oca.cancel)
    strategy.exit("TP2", "Long", qty = 50, limit = close * 1.03,
        oca_name = "TakeProfit", oca_type = strategy.oca.cancel)

    // Stop-loss in separate OCA group (or none)
    strategy.exit("SL", "Long", qty = 100, stop = close * 0.98)
```

---

## Advanced Code Examples

### 1. Complete Multi-Timeframe Strategy with All Features

```pinescript
//@version=6
strategy("Complete MTF Strategy",
    overlay = true,
    pyramiding = 3,
    initial_capital = 100000,
    default_qty_type = strategy.percent_of_equity,
    default_qty_value = 25,
    commission_type = strategy.commission.percent,
    commission_value = 0.1,
    use_bar_magnifier = true)

// ============================================
// INPUTS
// ============================================
// Entry Settings
useRSI = input.bool(true, "Use RSI Signal", group = "Entry")
useMACD = input.bool(true, "Use MACD Signal", group = "Entry")
useVolume = input.bool(true, "Use Volume Signal", group = "Entry")
requiredSignals = input.int(2, "Required Signals", minval = 1, maxval = 3, group = "Entry")
htfTimeframe = input.timeframe("D", "Higher Timeframe", group = "Entry")

// Exit Settings
atrLength = input.int(14, "ATR Length", group = "Exit")
atrMultSL = input.float(2.0, "ATR Multiplier SL", group = "Exit")
atrMultTP = input.float(3.0, "ATR Multiplier TP", group = "Exit")
useTrailing = input.bool(true, "Use Trailing Stop", group = "Exit")
trailActivation = input.float(1.5, "Trail Activation %", group = "Exit")
beLevel = input.float(1.0, "Breakeven Trigger %", group = "Exit")

// Position Management
maxBarsInTrade = input.int(50, "Max Bars in Trade", group = "Position")
allowPyramiding = input.bool(true, "Allow Pyramiding", group = "Position")
minBarsBetweenEntries = input.int(10, "Min Bars Between Entries", group = "Position")
min
// ============================================
// INDICATORS
// ============================================
rsi = ta.rsi(close, 14)
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
volumeMA = ta.sma(volume, 20)
atrValue = ta.atr(atrLength)

// Higher timeframe trend
htfTrend = request.security(syminfo.tickerid, htfTimeframe, close > ta.ema(close, 50))

// ============================================
// ENTRY LOGIC
// ============================================
// Individual signals
rsiSignal = rsi < 30
macdSignal = ta.crossover(macdLine, signalLine)
volumeSignal = volume > volumeMA * 1.2

// Count active signals
signalCount = 0
if useRSI and rsiSignal
    signalCount += 1
if useMACD and macdSignal
    signalCount += 1
if useVolume and volumeSignal
    signalCount += 1

// Entry condition
longCondition = signalCount >= requiredSignals and htfTrend

// ============================================
// POSITION MANAGEMENT VARIABLES
// ============================================
var float entryPrice = na
var float trailStop = na
var bool breakevenSet = false
var int entryBar = na

// Bars since entry
barsSinceEntry() =>
    strategy.opentrades > 0 ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) : na

// ============================================
// ENTRY EXECUTION
// ============================================
if longCondition and strategy.opentrades == 0
    strategy.entry("Long 1", strategy.long)
    entryPrice := close
    entryBar := bar_index
    trailStop := na
    breakevenSet := false

// Pyramiding
if allowPyramiding and strategy.position_size > 0
    if close > strategy.position_avg_price * 1.02 and strategy.opentrades == 1
        strategy.entry("Long 2", strategy.long)
    if close > strategy.position_avg_price * 1.04 and strategy.opentrades == 2
        strategy.entry("Long 3", strategy.long)

// ============================================
// EXIT LOGIC
// ============================================
if strategy.position_size > 0
    // Calculate TP/SL levels
    tpDistance = atrValue * atrMultTP / syminfo.mintick
    slDistance = atrValue * atrMultSL / syminfo.mintick

    // Initial stop-loss
    if not breakevenSet
        strategy.exit("Initial SL", loss = slDistance)

    // Move to breakeven
    profitPercent = (close - entryPrice) / entryPrice * 100
    if profitPercent >= beLevel and not breakevenSet
        strategy.cancel("Initial SL")
        bePrice = entryPrice * 1.001
        if useTrailing
            activationPrice = entryPrice * (1 + trailActivation / 100)
            strategy.exit("BE Trail",
                stop = bePrice,
                trail_price = activationPrice,
                trail_offset = int(slDistance / 2))
        else
            strategy.exit("BE Stop", stop = bePrice, profit = tpDistance)
        breakevenSet := true

    // Partial exits
    if profitPercent >= 2.0 and strategy.position_size == strategy.position_size[1]
        strategy.close("Long 1", qty_percent = 33, comment = "TP1 +2%")
    if profitPercent >= 4.0
        strategy.close_all(qty_percent = 50, comment = "TP2 +4%")

// ============================================
// ADDITIONAL EXIT CONDITIONS
// ============================================
// Time-based exit
if strategy.position_size > 0 and barsSinceEntry() >= maxBarsInTrade
    strategy.close_all(comment = "Time Exit")

// Opposite signal
if strategy.position_size > 0 and ta.crossunder(ta.sma(close, 10), ta.sma(close, 30))
    strategy.close_all(comment = "Opposite Signal")

// RSI overbought
if strategy.position_size > 0 and rsi > 70
    strategy.close_all(comment = "RSI Overbought")

// ============================================
// PLOTTING
// ============================================
plot(strategy.position_avg_price, "Avg Entry", color.yellow, 2, plot.style_linebr)
bgcolor(longCondition ? color.new(color.green, 90) : na)
plotchar(signalCount >= requiredSignals, "Entry Signal", "▲", location.belowbar, color.lime)
```

### 2. Advanced Breakout Strategy with Confirmation

```pinescript
//@version=6
strategy("Advanced Breakout Strategy",
    overlay = true,
    pyramiding = 2,
    initial_capital = 50000,
    default_qty_type = strategy.cash,
    default_qty_value = 10000)

// Inputs
lookbackBars = input.int(20, "Breakout Lookback")
volumeThreshold = input.float(1.5, "Volume Threshold")
confirmationBars = input.int(2, "Confirmation Bars")
useDynamicSL = input.bool(true, "Use Dynamic Stop-Loss")

// Variables
var float breakoutLevel = na
var int breakoutBar = na
var int confirmBars = 0
var bool waitingConfirmation = false

// Calculate levels
highestHigh = ta.highest(high, lookbackBars)
volumeAvg = ta.sma(volume, 20)

// Detect breakout
breakout = close > highestHigh[1] and volume > volumeAvg * volumeThreshold

// Confirmation logic
if breakout and not waitingConfirmation
    breakoutLevel := highestHigh[1]
    breakoutBar := bar_index
    waitingConfirmation := true
    confirmBars := 0

if waitingConfirmation
    if close > breakoutLevel
        confirmBars += 1
    else
        waitingConfirmation := false
        confirmBars := 0

// Entry on confirmation
if waitingConfirmation and confirmBars >= confirmationBars and strategy.opentrades == 0
    strategy.entry("Breakout Long", strategy.long)
    waitingConfirmation := false

// Dynamic stop-loss
if strategy.position_size > 0
    if useDynamicSL
        swingLow = ta.lowest(low[1], 5)
        strategy.exit("Exit", "Breakout Long",
            stop = swingLow,
            limit = strategy.position_avg_price * 1.05)
    else
        strategy.exit("Exit", "Breakout Long",
            loss = 100,
            profit = 200)

// Visualization
plot(breakoutLevel, "Breakout Level", color.orange, 2, plot.style_linebr)
bgcolor(waitingConfirmation ? color.new(color.blue, 90) : na)
```

### 3. Mean Reversion Strategy with Multiple Exits

```pinescript
//@version=6
strategy("Mean Reversion Multi-Exit",
    overlay = true,
    initial_capital = 100000,
    default_qty_type = strategy.percent_of_equity,
    default_qty_value = 30)

// Inputs
bbLength = input.int(20, "BB Length")
bbStdDev = input.float(2.0, "BB StdDev")
rsiLength = input.int(14, "RSI Length")
rsiOversold = input.int(30, "RSI Oversold")

// Indicators
[bbMiddle, bbUpper, bbLower] = ta.bb(close, bbLength, bbStdDev)
rsi = ta.rsi(close, rsiLength)

// Entry: Price touches lower BB + RSI oversold
entryCondition = close <= bbLower and rsi < rsiOversold

if entryCondition and strategy.opentrades == 0
    strategy.entry("Mean Reversion", strategy.long)

    // Multiple exit orders
    // 1. Quick scalp at BB middle
    strategy.exit("Exit 1", "Mean Reversion",
        qty_percent = 40,
        limit = bbMiddle)

    // 2. Momentum exit at BB upper
    strategy.exit("Exit 2", "Mean Reversion",
        qty_percent = 30,
        limit = bbUpper)

    // 3. Runner with trailing stop
    strategy.exit("Exit 3", "Mean Reversion",
        qty_percent = 30,
        trail_price = bbMiddle,
        trail_offset = 20)

// Emergency exit if price breaks down further
if strategy.position_size > 0 and close < bbLower * 0.98
    strategy.close_all(comment = "Breakdown")

// Plot
plot(bbMiddle, "BB Middle", color.blue)
plot(bbUpper, "BB Upper", color.red)
plot(bbLower, "BB Lower", color.green)
```

### 4. Swing Trading Strategy with Session Filters

```pinescript
//@version=6
strategy("Swing Trading with Session Filter",
    overlay = true,
    pyramiding = 1,
    initial_capital = 50000)

// Session Settings
tradeSession = input.session("0930-1600", "Trading Session")
exitSession = input.session("1545-1600", "Exit Session")
allowOvernight = input.bool(false, "Allow Overnight Positions")

// Indicators
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
atr = ta.atr(14)

// Session checks
inTradeSession = time(timeframe.period, tradeSession)
inExitSession = time(timeframe.period, exitSession)

// Entry logic
bullishSetup = close > ema20 and ema20 > ema50 and ta.rsi(close, 14) > 50
pullback = low <= ema20 and close > ema20
entrySignal = bullishSetup and pullback

// Execute entry during trading session
if entrySignal and inTradeSession and strategy.opentrades == 0
    stopPrice = low - atr
    targetPrice = close + (close - stopPrice) * 2  // 2:1 R/R

    strategy.entry("Swing Long", strategy.long)
    strategy.exit("Exit", "Swing Long",
        limit = targetPrice,
        stop = stopPrice)

// Force exit if not allowing overnight
if not allowOvernight and inExitSession and strategy.position_size > 0
    strategy.close_all(comment = "EOD Exit")

// Exit on opposite setup
if strategy.position_size > 0 and ta.crossunder(close, ema20)
    strategy.close_all(comment = "Signal Reversal")

// Visualization
plot(ema20, "EMA 20", color.blue, 2)
plot(ema50, "EMA 50", color.red, 2)
bgcolor(inTradeSession ? color.new(color.green, 95) : na)
bgcolor(inExitSession ? color.new(color.red, 95) : na)
```

### 5. Volatility Breakout with ATR Position Sizing

```pinescript
//@version=6
strategy("Volatility Breakout + ATR Sizing",
    overlay = true,
    initial_capital = 100000,
    default_qty_type = strategy.cash)

// Inputs
atrPeriod = input.int(14, "ATR Period")
atrMultiplier = input.float(1.5, "ATR Multiplier for Entry")
riskPercent = input.float(1.0, "Risk % per Trade")
useATRSizing = input.bool(true, "Use ATR Position Sizing")

// Calculate ATR and volatility breakout levels
atr = ta.atr(atrPeriod)
upperBreakout = close[1] + atr[1] * atrMultiplier
lowerBreakout = close[1] - atr[1] * atrMultiplier

// Detect breakouts
longBreakout = close > upperBreakout and high == ta.highest(high, 1)
shortBreakout = close < lowerBreakout and low == ta.lowest(low, 1)

// ATR-based position sizing
calculatePositionSize(stopDistance) =>
    if useATRSizing
        riskAmount = strategy.equity * (riskPercent / 100)
        posSize = riskAmount / stopDistance
        posSize
    else
        strategy.default_qty_value

// Long entry
if longBreakout and strategy.opentrades == 0
    stopDistance = atr * 2
    stopPrice = close - stopDistance
    positionSize = calculatePositionSize(stopDistance)

    strategy.entry("Long", strategy.long, qty = positionSize)
    strategy.exit("Exit Long", "Long",
        stop = stopPrice,
        trail_offset = int(atr / syminfo.mintick))

// Short entry
if shortBreakout and strategy.opentrades == 0
    stopDistance = atr * 2
    stopPrice = close + stopDistance
    positionSize = calculatePositionSize(stopDistance)

    strategy.entry("Short", strategy.short, qty = positionSize)
    strategy.exit("Exit Short", "Short",
        stop = stopPrice,
        trail_offset = int(atr / syminfo.mintick))

// Visualization
plot(upperBreakout, "Upper Breakout", color.green, 1, plot.style_stepline)
plot(lowerBreakout, "Lower Breakout", color.red, 1, plot.style_stepline)
plotchar(longBreakout, "Long Breakout", "▲", location.belowbar, color.lime, size = size.small)
plotchar(shortBreakout, "Short Breakout", "▼", location.abovebar, color.red, size = size.small)
```

---

## Best Practices and Common Pitfalls

### Best Practices

1. **Always Use Realistic Settings**

```pinescript
   strategy("My Strategy",
       commission_type = strategy.commission.percent,
       commission_value = 0.1,  // 0.1% per trade
       slippage = 2)            // 2 ticks slippage
```

2. **Avoid Repainting**
   - Don't use `calc_on_every_tick = true` unless necessary
   - Use `barstate.isconfirmed` for confirmed signals
   - Be cautious with `request.security()` on higher timeframes

3. **Test with Bar Magnifier**

```pinescript
   strategy("My Strategy", use_bar_magnifier = true)
```

4. **Use Proper Position Sizing**

```pinescript
   // Risk-based sizing
   riskAmount = strategy.equity * 0.02  // 2% risk
   stopDistance = close - stopPrice
   positionSize = riskAmount / stopDistance
```

5. **Always Include Stop-Losses**

```pinescript
   strategy.entry("Long", strategy.long)
   strategy.exit("Exit", "Long", loss = 100)  // Always protect capital
```

6. **Track Performance Metrics**

```pinescript
   // Display key metrics
   var table perfTable = table.new(position.top_right, 2, 5)
   if barstate.islastconfirmedhistory
       table.cell(perfTable, 0, 0, "Net Profit")
       table.cell(perfTable, 1, 0, str.tostring(strategy.netprofit, format.currency))
       table.cell(perfTable, 0, 1, "Win Rate")
       table.cell(perfTable, 1, 1, str.tostring(strategy.wintrades / strategy.closedtrades * 100, "#.##") + "%")
```

### Common Pitfalls

#### 1. Repainting Issues

**WRONG:**

```pinescript
// This repaints!
strategy("Repainting", calc_on_every_tick = true)
if ta.crossover(close, ta.sma(close, 20))
    strategy.entry("Long", strategy.long)
```

**CORRECT:**

```pinescript
strategy("Non-Repainting")
if ta.crossover(close, ta.sma(close, 20)) and barstate.isconfirmed
    strategy.entry("Long", strategy.long)
```

#### 2. Incorrect Position Sizing

**WRONG:**

```pinescript
// Same size for every trade regardless of volatility
strategy.entry("Long", strategy.long, qty = 100)
```

**CORRECT:**

```pinescript
// Adjust for volatility
atr = ta.atr(14)
riskAmount = strategy.equity * 0.02
posSize = riskAmount / (atr * 2)
strategy.entry("Long", strategy.long, qty = posSize)
```

#### 3. Not Handling Multiple Entries Properly

**WRONG:**

```pinescript
// This creates new exit for EVERY entry, causing issues
if condition
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit", "Long", profit = 100)  // Called every bar!
```

**CORRECT:**

```pinescript
// Set exit only once when entering
if condition and strategy.opentrades == 0
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit", "Long", profit = 100)
```

#### 4. Misunderstanding from_entry Behavior

**WRONG ASSUMPTION:**

```pinescript
// Exit only affects entries AFTER this line runs
strategy.exit("Exit", profit = 100)  // No from_entry
// Later entry - people think this won't be affected, but it WILL
strategy.entry("Long", strategy.long)
```

**CORRECT UNDERSTANDING:**

```pinescript
// Without from_entry, exit affects ALL entries (past and future)
// Use from_entry to target specific entries
strategy.exit("Exit", "Long", profit = 100)  // Only exits "Long" entries
```

#### 5. Ignoring Order Execution Timing

**WRONG:**

```pinescript
// Thinking order executes immediately
if condition
    strategy.entry("Long", strategy.long)
    stopPrice = strategy.position_avg_price * 0.98  // This is WRONG!
    strategy.exit("Exit", stop = stopPrice)  // position_avg_price not set yet!
```

**CORRECT:**

```pinescript
// Set exit after position opens
if condition and strategy.opentrades == 0
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit", "Long", loss = 100)  // Use relative stop

// Or detect position change
if ta.change(strategy.position_size) > 0
    stopPrice = strategy.position_avg_price * 0.98
    strategy.exit("Exit", stop = stopPrice)
```

#### 6. Overlapping OCA Groups

**WRONG:**

```pinescript
// Same OCA name for different purposes
strategy.exit("TP", oca_name = "Exit", oca_type = strategy.oca.cancel)
strategy.exit("SL", oca_name = "Exit", oca_type = strategy.oca.reduce)  // Conflict!
```

**CORRECT:**

```pinescript
// Different OCA names or consistent types
strategy.exit("TP", oca_name = "Exit", oca_type = strategy.oca.cancel)
strategy.exit("SL", oca_name = "Exit", oca_type = strategy.oca.cancel)
```

#### 7. Not Accounting for Commission and Slippage

**WRONG:**

```pinescript
strategy("My Strategy")  // No commission or slippage
```

**CORRECT:**

```pinescript
strategy("My Strategy",
    commission_type = strategy.commission.percent,
    commission_value = 0.075,  // 0.075% per side
    slippage = 2)
```

---

## Quick Reference Tables

### Strategy Order Functions

| Function | Reverses Position | Respects Pyramiding | Creates Market Order | Use Case |
|----------|-------------------|---------------------|----------------------|----------|
| `strategy.entry()` | Yes (auto) | Yes | Yes (default) | Standard entries |
| `strategy.order()` | No | No | Yes (default) | Low-level control |
| `strategy.exit()` | N/A | N/A | No | TP/SL/Trailing |
| `strategy.close()` | N/A | N/A | Yes | Close specific entry |
| `strategy.close_all()` | N/A | N/A | Yes | Close all positions |

### OCA Types

| Type | Behavior | Use Case |
|------|----------|----------|
| `strategy.oca.none` | Orders independent | Default for entries |
| `strategy.oca.cancel` | One fills, others cancel | Bracket orders |
| `strategy.oca.reduce` | One fills, others reduce qty | Partial exits (default for strategy.exit) |

### Order Types

| Type | Entry Logic | Exit Logic |
|------|-------------|------------|
| **Market** | No limit/stop | `strategy.close()`, `strategy.close_all()` |
| **Limit** | `limit = price` | `limit = price` or `profit = ticks` |
| **Stop** | `stop = price` | `stop = price` or `loss = ticks` |
| **Stop-Limit** | Both limit AND stop | N/A (creates 2 orders in exit) |

### Default Qty Types

| Type | Description | Example |
|------|-------------|---------|
| `strategy.fixed` | Fixed number of contracts | `default_qty_value = 10` |
| `strategy.cash` | Dollar amount | `default_qty_value = 10000` |
| `strategy.percent_of_equity` | % of account | `default_qty_value = 25` (25%) |

### Commission Types

| Type | Description |
|------|-------------|
| `strategy.commission.percent` | Percentage of trade value |
| `strategy.commission.cash_per_order` | Fixed amount per order |
| `strategy.commission.cash_per_contract` | Fixed amount per contract |

### Key Built-in Variables

| Variable | Type | Description |
|----------|------|-------------|
| `strategy.position_size` | float | Current position (+ long, - short, 0 flat) |
| `strategy.position_avg_price` | float | Average entry price |
| `strategy.opentrades` | int | Number of open trades |
| `strategy.closedtrades` | int | Number of closed trades |
| `strategy.equity` | float | Current equity |
| `strategy.netprofit` | float | Net profit |
| `strategy.wintrades` | int | Number of winning trades |
| `strategy.losstrades` | int | Number of losing trades |

### Entry Condition Patterns

| Pattern | Code Example |
|---------|--------------|
| **AND Logic** | `condition1 and condition2 and condition3` |
| **OR Logic** | `condition1 or condition2 or condition3` |
| **Mixed** | `(cond1 and cond2) or (cond3 and cond4)` |
| **2 of 3 Signals** | `(c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0) >= 2` |
| **Weighted Voting** | `(c1 ? 3 : 0) + (c2 ? 2 : 0) + (c3 ? 1 : 0) >= 4` |

### Exit Strategies Summary

| Strategy | Code Pattern |
|----------|--------------|
| **Fixed TP/SL** | `strategy.exit("x", profit = 100, loss = 50)` |
| **Price-based** | `strategy.exit("x", limit = tp_price, stop = sl_price)` |
| **Partial Exit** | `strategy.exit("x", qty_percent = 50, limit = tp1)` |
| **Trailing Stop** | `strategy.exit("x", trail_points = 100, trail_offset = 20)` |
| **Time-based** | `if barsSinceEntry() >= 10 then strategy.close_all()` |
| **Indicator-based** | `if rsi > 70 then strategy.close_all()` |
| **Breakeven** | Move stop to entry after X% profit |

---

## Resources and Documentation

This guide was compiled from the following sources:

### Official TradingView Documentation
- [Concepts / Strategies](https://www.tradingview.com/pine-script-docs/concepts/strategies/)
- [Pine Script Language Reference Manual](https://www.tradingview.com/pine-script-reference/v6/)
- [Strategy Properties](https://www.tradingview.com/support/solutions/43000628599-strategy-properties/)

### Community Resources
- [Pine Script v6 Strategy Examples - Pineify Blog](https://pineify.app/resources/blog/pine-script-v6-strategy-examples)
- [Pine Script's strategy.exit() function - TradingCode](https://www.tradingcode.net/tradingview/strategy-exit-function/)
- [Set TradingView Pine Script pyramiding - TradingCode](https://www.tradingcode.net/tradingview/pyramiding-strategy-setting/)
- [Pine Script Multiple Conditions Guide - Pineify Blog](https://pineify.app/resources/blog/pine-script-multiple-conditions-complete-guide)
- [How to Code A Trailing Stop Loss in Pine Script - The Art of Trading](https://courses.theartoftrading.com/pages/how-to-code-a-trailing-stop-loss-in-pine-script)
- [Get bars since last entry in Pine Script - TradingCode](https://www.tradingcode.net/tradingview/bars-since-last-entry/)

---

**Document Version:** 1.0
**Last Updated:** November 27, 2025
**Pine Script Version:** v6
**Created For:** Advanced strategy development and reference

---

## Final Notes

This comprehensive guide covers the essential and advanced aspects of Pine Script v6 strategy development. Remember:

1. Always backtest thoroughly with realistic settings
2. Use proper risk management and position sizing
3. Account for commission and slippage
4. Be aware of repainting issues
5. Test strategies across different market conditions
6. Keep strategies simple and robust
7. Document your logic and assumptions

Happy coding and trading!