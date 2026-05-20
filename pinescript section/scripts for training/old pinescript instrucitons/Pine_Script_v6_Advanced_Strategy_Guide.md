# Pine Script v6 Advanced Strategy & Arrays Guide
## Complete Reference for Professional Trading System Development

**Version:** 6
**Last Updated:** December 2025
**Focus:** Advanced Strategies, Arrays, Position Management, Risk Control

---

## Table of Contents

### Part 1: Advanced Strategy Development
1. [Strategy Architecture & Design Patterns](#strategy-architecture)
2. [Order Management System](#order-management)
3. [Advanced Position Sizing](#position-sizing)
4. [Risk Management Techniques](#risk-management)
5. [Pyramiding & Scaling Strategies](#pyramiding)
6. [Trailing Stops & Dynamic Exits](#trailing-stops)
7. [Multi-Timeframe Strategies](#mtf-strategies)
8. [Portfolio & Multi-Symbol Strategies](#portfolio)
9. [Performance Optimization](#performance)
10. [Real-World Strategy Examples](#strategy-examples)

### Part 2: Comprehensive Arrays Guide
11. [Arrays Fundamentals](#arrays-fundamentals)
12. [Advanced Array Operations](#advanced-arrays)
13. [Array-Based Indicators](#array-indicators)
14. [Statistical Analysis with Arrays](#statistical-arrays)
15. [Matrix Operations](#matrix-operations)
16. [Practical Array Applications](#array-applications)

### Part 3: Integration & Best Practices
17. [Combining Arrays with Strategies](#integration)
18. [Debugging & Testing](#debugging)
19. [Strategy Best Practices](#best-practices)
20. [Production Deployment](#deployment)

---

<a name="strategy-architecture"></a>
# Part 1: Advanced Strategy Development

## 1. Strategy Architecture & Design Patterns

### Understanding the Strategy Framework

Pine Script strategies execute through a sophisticated bar-by-bar simulation engine that emulates real broker behavior. Understanding this architecture is critical for building reliable systems.

#### Strategy Declaration Advanced Parameters

```pinescript
//@version=6
strategy(
    title                   = "Advanced Strategy Template",
    shorttitle              = "AST",
    overlay                 = true,

    // Position Settings
    pyramiding              = 3,              // Allow up to 3 concurrent positions
    calc_on_order_fills     = false,          // Recalc only on bar close
    calc_on_every_tick      = false,          // Don't recalc on every tick (prevents lookahead)

    // Capital & Sizing
    initial_capital         = 100000,         // Starting capital
    default_qty_type        = strategy.cash,  // Use cash amount for sizing
    default_qty_value       = 10000,          // $10k per trade
    currency                = currency.USD,

    // Commission & Slippage
    commission_type         = strategy.commission.percent,
    commission_value        = 0.1,            // 0.1% commission
    slippage                = 2,              // 2 ticks slippage

    // Order Behavior
    process_orders_on_close = false,          // Fill orders intrabar
    close_entries_rule      = "ANY",          // How opposite signals close positions

    // Risk Controls
    margin_long             = 100,            // 100% margin for longs
    margin_short            = 100,            // 100% margin for shorts
    max_bars_back           = 5000,           // Lookback limit

    // Display
    fill_orders_on_standard_ohlc = true
)
```

### Strategy State Management Pattern

```pinescript
//@version=6
strategy("State Management", overlay=true)

// ═══════════════════════════════════════════════════════════
// STATE TRACKING TYPE
// ═══════════════════════════════════════════════════════════

type StrategyState
    // Position tracking
    bool inPosition
    string positionType      // "LONG", "SHORT", "NONE"
    float entryPrice
    int entryBar
    float stopLoss
    float takeProfit

    // Trade statistics
    int totalTrades
    int winningTrades
    float totalProfit

    // Session tracking
    bool newSession
    float sessionHigh
    float sessionLow

// Initialize state
var StrategyState state = StrategyState.new(
    inPosition    = false,
    positionType  = "NONE",
    entryPrice    = na,
    entryBar      = na,
    stopLoss      = na,
    takeProfit    = na,
    totalTrades   = 0,
    winningTrades = 0,
    totalProfit   = 0.0,
    newSession    = false,
    sessionHigh   = na,
    sessionLow    = na
)

// ═══════════════════════════════════════════════════════════
// STATE UPDATE METHODS
// ═══════════════════════════════════════════════════════════

method updatePosition(StrategyState this, string direction, float entry, float sl, float tp) =>
    this.inPosition   := true
    this.positionType := direction
    this.entryPrice   := entry
    this.entryBar     := bar_index
    this.stopLoss     := sl
    this.takeProfit   := tp

method closePosition(StrategyState this, float exitPrice) =>
    if this.inPosition
        // Calculate P&L
        profit = this.positionType == "LONG" ?
                 (exitPrice - this.entryPrice) :
                 (this.entryPrice - exitPrice)

        // Update statistics
        this.totalTrades   += 1
        this.totalProfit   += profit

        if profit > 0
            this.winningTrades += 1

        // Reset position state
        this.inPosition   := false
        this.positionType := "NONE"
        this.entryPrice   := na
        this.entryBar     := na

method getWinRate(StrategyState this) =>
    this.totalTrades > 0 ? (this.winningTrades / this.totalTrades) * 100 : 0.0

// ═══════════════════════════════════════════════════════════
// USAGE EXAMPLE
// ═══════════════════════════════════════════════════════════

// Entry conditions
bullish = ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
bearish = ta.crossunder(ta.ema(close, 12), ta.ema(close, 26))

// Enter long
if bullish and not state.inPosition
    entryPrice = close
    stopPrice = entryPrice - (ta.atr(14) * 2)
    targetPrice = entryPrice + (ta.atr(14) * 3)

    strategy.entry("LONG", strategy.long)
    strategy.exit("EXIT_LONG", "LONG", stop=stopPrice, limit=targetPrice)

    state.updatePosition("LONG", entryPrice, stopPrice, targetPrice)

// Track exits
if state.inPosition and (strategy.position_size == 0)
    state.closePosition(close)

// Display state
if barstate.islast
    var table stateTable = table.new(position.top_right, 2, 5)
    table.cell(stateTable, 0, 0, "Metric", bgcolor=color.blue, text_color=color.white)
    table.cell(stateTable, 1, 0, "Value", bgcolor=color.blue, text_color=color.white)
    table.cell(stateTable, 0, 1, "Position")
    table.cell(stateTable, 1, 1, state.positionType)
    table.cell(stateTable, 0, 2, "Total Trades")
    table.cell(stateTable, 1, 2, str.tostring(state.totalTrades))
    table.cell(stateTable, 0, 3, "Win Rate")
    table.cell(stateTable, 1, 3, str.tostring(state.getWinRate(), "#.##") + "%")
```

---

<a name="order-management"></a>
## 2. Order Management System

### Complete Order Flow Control

Pine Script v6 provides comprehensive order management functions. Understanding the differences between them is crucial.

#### Order Types & Their Behavior

```pinescript
//@version=6
strategy("Complete Order Management", overlay=true)

// ═══════════════════════════════════════════════════════════
// 1. ENTRY ORDERS - Open new positions
// ═══════════════════════════════════════════════════════════

// Basic market entry
if ta.crossover(close, ta.sma(close, 50))
    strategy.entry(
        id      = "Long_Entry",
        direction = strategy.long,
        qty     = na,                // Use default_qty_value
        limit   = na,                // Market order
        stop    = na,                // Market order
        comment = "MA Cross Long",
        alert_message = "LONG: MA Crossover"
    )

// Limit order entry (buy at specific price or better)
longLimitPrice = close * 0.98  // 2% below current price
if close > ta.sma(close, 200)
    strategy.entry(
        id      = "Long_Limit",
        direction = strategy.long,
        qty     = 10,
        limit   = longLimitPrice,
        comment = "Limit Buy"
    )

// Stop order entry (buy breakout above resistance)
resistance = ta.highest(high, 20)
if close < resistance
    strategy.entry(
        id      = "Breakout_Long",
        direction = strategy.long,
        stop    = resistance,
        comment = "Breakout Entry"
    )

// ═══════════════════════════════════════════════════════════
// 2. EXIT ORDERS - Close positions with precision
// ═══════════════════════════════════════════════════════════

// Basic exit by ID
if ta.crossunder(close, ta.sma(close, 50))
    strategy.close(
        id      = "Long_Entry",
        comment = "MA Cross Exit",
        alert_message = "EXIT: MA Cross"
    )

// Exit all positions
if hour == 15 and minute == 45  // End of day
    strategy.close_all(
        comment = "EOD Close"
    )

// Partial exit
if strategy.position_size > 0
    profitPercent = (close - strategy.position_avg_price) / strategy.position_avg_price * 100

    if profitPercent > 5  // Take partial profits at 5%
        strategy.close(
            id  = "Long_Entry",
            qty_percent = 50,  // Close 50% of position
            comment = "Partial Profit"
        )

// ═══════════════════════════════════════════════════════════
// 3. STRATEGY.EXIT - Advanced exit management
// ═══════════════════════════════════════════════════════════

atrValue = ta.atr(14)

if ta.crossover(ta.rsi(close, 14), 30)
    strategy.entry("RSI_Long", strategy.long)

    // Complex exit with multiple conditions
    strategy.exit(
        id         = "Exit_RSI_Long",
        from_entry = "RSI_Long",

        // Price-based exits
        limit      = close * 1.03,           // Take profit 3% above
        stop       = close - (atrValue * 2), // Stop loss 2 ATR below

        // Trailing stop
        trail_price  = na,                   // Activate trail after price
        trail_points = atrValue * 3,         // Trail 3 ATR from peak
        trail_offset = atrValue * 0.5,       // Offset from trail

        // Quantity
        qty        = na,                     // Exit full position
        qty_percent = 100,                   // 100% of position

        // Alerts
        comment    = "RSI Exit",
        alert_message = str.format("EXIT RSI Long: P&L={0}",
                                   strategy.openprofit)
    )

// ═══════════════════════════════════════════════════════════
// 4. STRATEGY.ORDER - Maximum flexibility
// ═══════════════════════════════════════════════════════════

// Custom order logic
if barstate.isconfirmed
    currentPos = strategy.position_size

    // Custom pyramiding logic
    if currentPos == 0
        // First entry
        strategy.order("Position_1", strategy.long, qty=10)
    else if currentPos == 10 and close > strategy.position_avg_price * 1.02
        // Add to winner
        strategy.order("Position_2", strategy.long, qty=10)
    else if currentPos == 20 and close > strategy.position_avg_price * 1.04
        // Final add
        strategy.order("Position_3", strategy.long, qty=10)
    else if currentPos > 0 and close < strategy.position_avg_price * 0.98
        // Exit all on 2% drawdown
        strategy.order("Exit_All", strategy.short, qty=math.abs(currentPos))

// ═══════════════════════════════════════════════════════════
// 5. POSITION INFORMATION
// ═══════════════════════════════════════════════════════════

// Real-time position tracking
posSize = strategy.position_size
avgPrice = strategy.position_avg_price
openProfit = strategy.openprofit
openTrades = strategy.opentrades

// Display position info
if posSize != 0 and barstate.islast
    positionText = str.format(
        "Position: {0}\nSize: {1}\nAvg: {2}\nP&L: {3}",
        posSize > 0 ? "LONG" : "SHORT",
        math.abs(posSize),
        avgPrice,
        openProfit
    )

    label.new(
        bar_index, high,
        positionText,
        style = label.style_label_down,
        color = openProfit > 0 ? color.green : color.red,
        textcolor = color.white
    )
```

### Order Cancellation & Management

```pinescript
//@version=6
strategy("Order Cancellation", overlay=true)

// ═══════════════════════════════════════════════════════════
// CANCEL PENDING ORDERS
// ═══════════════════════════════════════════════════════════

var int limitOrderBar = na
limitPrice = ta.lowest(low, 10) * 0.99

// Place limit order
if ta.crossover(ta.rsi(close, 14), 50) and strategy.position_size == 0
    strategy.entry("Limit_Long", strategy.long, limit=limitPrice)
    limitOrderBar := bar_index

// Cancel if not filled within 5 bars
if not na(limitOrderBar) and bar_index - limitOrderBar > 5 and strategy.position_size == 0
    strategy.cancel("Limit_Long")
    limitOrderBar := na

// Cancel all orders at end of session
if hour == 15 and minute == 50
    strategy.cancel_all()
```

---

<a name="position-sizing"></a>
## 3. Advanced Position Sizing

Position sizing is the most critical aspect of risk management. Pine Script v6 provides multiple sophisticated approaches.

### Dynamic Position Sizing Methods

```pinescript
//@version=6
strategy("Advanced Position Sizing", overlay=true, default_qty_type=strategy.cash)

// ═══════════════════════════════════════════════════════════
// INPUTS
// ═══════════════════════════════════════════════════════════

sizingMethod = input.string("ATR Risk", "Sizing Method",
    options=["Fixed", "Percent Equity", "ATR Risk", "Volatility Adjusted", "Kelly Criterion"])
fixedSize = input.float(1.0, "Fixed Size")
equityPercent = input.float(2.0, "Risk % of Equity", minval=0.1, maxval=100)
atrPeriod = input.int(14, "ATR Period")
atrMultiplier = input.float(2.0, "ATR Multiplier for Stop")

// ═══════════════════════════════════════════════════════════
// POSITION SIZING FUNCTIONS
// ═══════════════════════════════════════════════════════════

//@function Calculate position size based on fixed quantity
//@returns Fixed position size
calcFixedSize() =>
    fixedSize

//@function Calculate position size as percentage of equity
//@param riskPercent Percentage of equity to risk
//@param stopDistance Distance to stop loss in price
//@returns Position size in contracts/shares
calcPercentEquity(float riskPercent, float stopDistance) =>
    riskAmount = strategy.equity * (riskPercent / 100)
    positionSize = stopDistance > 0 ? math.floor(riskAmount / stopDistance) : 0
    math.max(positionSize, 1)  // Minimum 1 contract

//@function Calculate position size using ATR-based risk
//@param atrValue Current ATR value
//@param atrMult ATR multiplier for stop distance
//@param riskPercent Percentage of equity to risk
//@returns Position size in contracts/shares
calcATRSize(float atrValue, float atrMult, float riskPercent) =>
    stopDistance = atrValue * atrMult
    riskAmount = strategy.equity * (riskPercent / 100)
    positionSize = stopDistance > 0 ? math.floor(riskAmount / stopDistance) : 0
    math.max(positionSize, 1)

//@function Volatility-adjusted position sizing
//@param currentVol Current volatility measure
//@param normalVol Normal/average volatility
//@param baseSize Base position size
//@returns Adjusted position size
calcVolatilitySize(float currentVol, float normalVol, float baseSize) =>
    // Reduce size when volatility is high
    volRatio = currentVol / normalVol
    adjustedSize = baseSize / volRatio
    math.max(math.floor(adjustedSize), 1)

//@function Kelly Criterion position sizing
//@param winRate Historical win rate (0-1)
//@param avgWin Average winning trade
//@param avgLoss Average losing trade (positive number)
//@returns Kelly percentage (0-1)
calcKellyCriterion(float winRate, float avgWin, float avgLoss) =>
    if avgLoss > 0
        b = avgWin / avgLoss  // Win/loss ratio
        kelly = (winRate * (b + 1) - 1) / b
        // Use fractional Kelly for safety
        fractionalKelly = kelly * 0.25  // Quarter Kelly
        math.max(0, math.min(fractionalKelly, 0.25))  // Cap at 25%
    else
        0.0

// ═══════════════════════════════════════════════════════════
// CALCULATE CURRENT POSITION SIZE
// ═══════════════════════════════════════════════════════════

atr = ta.atr(atrPeriod)
volatility = ta.stdev(close, 20)
normalVolatility = ta.sma(volatility, 100)

// Get historical performance for Kelly
winRate = strategy.closedtrades > 0 ? strategy.wintrades / strategy.closedtrades : 0.5
avgWin = strategy.wintrades > 0 ? strategy.grossprofit / strategy.wintrades : 0
avgLoss = strategy.losstrades > 0 ? math.abs(strategy.grossloss) / strategy.losstrades : 0

// Calculate size based on selected method
positionSize = switch sizingMethod
    "Fixed" => calcFixedSize()
    "Percent Equity" => calcPercentEquity(equityPercent, close * 0.02)
    "ATR Risk" => calcATRSize(atr, atrMultiplier, equityPercent)
    "Volatility Adjusted" => calcVolatilitySize(volatility, normalVolatility, 10)
    "Kelly Criterion" =>
        kellyPercent = calcKellyCriterion(winRate, avgWin, avgLoss)
        math.floor(strategy.equity * kellyPercent / close)
    => 1.0

// ═══════════════════════════════════════════════════════════
// ADVANCED: DOLLAR-BASED POSITION SIZING
// ═══════════════════════════════════════════════════════════

//@function Calculate dollar-based position size
//@param dollarRisk Amount of dollars to risk
//@param entryPrice Entry price
//@param stopPrice Stop loss price
//@returns Number of shares/contracts
calcDollarSize(float dollarRisk, float entryPrice, float stopPrice) =>
    stopDistance = math.abs(entryPrice - stopPrice)
    shares = stopDistance > 0 ? math.floor(dollarRisk / stopDistance) : 0
    math.max(shares, 1)

// Example: Risk $500 per trade
dollarRisk = 500
entryPrice = close
stopPrice = close - (atr * atrMultiplier)
dollarBasedSize = calcDollarSize(dollarRisk, entryPrice, stopPrice)

// ═══════════════════════════════════════════════════════════
// POSITION SIZE CONSTRAINTS
// ═══════════════════════════════════════════════════════════

//@function Apply constraints to position size
//@param size Calculated position size
//@param minSize Minimum allowed size
//@param maxSize Maximum allowed size
//@param maxPortfolioPercent Maximum % of portfolio
//@returns Constrained position size
applyConstraints(float size, float minSize, float maxSize, float maxPortfolioPercent) =>
    // Check minimum
    constrainedSize = math.max(size, minSize)

    // Check maximum
    constrainedSize := math.min(constrainedSize, maxSize)

    // Check portfolio concentration
    dollarValue = constrainedSize * close
    maxDollarValue = strategy.equity * (maxPortfolioPercent / 100)
    if dollarValue > maxDollarValue
        constrainedSize := math.floor(maxDollarValue / close)

    constrainedSize

// Apply constraints
finalSize = applyConstraints(positionSize, 1, 100, 25)  // 1-100 shares, max 25% portfolio

// ═══════════════════════════════════════════════════════════
// EXECUTION
// ═══════════════════════════════════════════════════════════

longSignal = ta.crossover(ta.ema(close, 12), ta.ema(close, 26))

if longSignal and strategy.position_size == 0
    stopLossPrice = close - (atr * atrMultiplier)
    takeProfitPrice = close + (atr * atrMultiplier * 1.5)

    strategy.entry("LONG", strategy.long, qty=finalSize)
    strategy.exit("EXIT", "LONG", stop=stopLossPrice, limit=takeProfitPrice)

    // Log sizing decision
    if barstate.isconfirmed
        label.new(bar_index, low,
            str.format("Size: {0}\nMethod: {1}\nRisk: ${2}",
                finalSize, sizingMethod, finalSize * (close - stopLossPrice)),
            style=label.style_label_up,
            color=color.blue,
            textcolor=color.white,
            size=size.small)

// Display sizing info
if barstate.islast
    var table sizeTable = table.new(position.bottom_right, 2, 6)
    table.cell(sizeTable, 0, 0, "Sizing Info", bgcolor=color.blue, text_color=color.white)
    table.cell(sizeTable, 1, 0, "", bgcolor=color.blue)
    table.cell(sizeTable, 0, 1, "Method")
    table.cell(sizeTable, 1, 1, sizingMethod)
    table.cell(sizeTable, 0, 2, "Calculated Size")
    table.cell(sizeTable, 1, 2, str.tostring(positionSize, "#"))
    table.cell(sizeTable, 0, 3, "Final Size")
    table.cell(sizeTable, 1, 3, str.tostring(finalSize, "#"))
    table.cell(sizeTable, 0, 4, "Position Value")
    table.cell(sizeTable, 1, 4, "$" + str.tostring(finalSize * close, "#,###"))
    table.cell(sizeTable, 0, 5, "% of Equity")
    pctEquity = (finalSize * close / strategy.equity) * 100
    table.cell(sizeTable, 1, 5, str.tostring(pctEquity, "#.##") + "%")
```

---

<a name="risk-management"></a>
## 4. Risk Management Techniques

### Multi-Level Risk Control System

```pinescript
//@version=6
strategy("Advanced Risk Management", overlay=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=10)

// ═══════════════════════════════════════════════════════════
// RISK PARAMETERS
// ═══════════════════════════════════════════════════════════

// Per-trade risk
maxRiskPerTrade = input.float(2.0, "Max Risk Per Trade %", minval=0.1, maxval=10)
maxRiskPerDay = input.float(6.0, "Max Risk Per Day %", minval=0.1, maxval=20)

// Position limits
maxPositionSize = input.float(25, "Max Position Size % of Equity", minval=1, maxval=100)
maxOpenTrades = input.int(3, "Max Concurrent Trades", minval=1, maxval=10)

// Drawdown controls
maxDrawdown = input.float(15, "Max Drawdown %", minval=1, maxval=50)
pauseAfterLosses = input.int(3, "Pause After N Consecutive Losses", minval=1, maxval=10)

// Stop loss types
stopType = input.string("ATR", "Stop Loss Type", options=["ATR", "Percent", "Fixed", "Chandelier"])
atrPeriod = input.int(14, "ATR Period")
atrMultiplier = input.float(2.0, "ATR Multiplier")
percentStop = input.float(2.0, "Percent Stop %")
fixedStop = input.float(10, "Fixed Stop Points")

// ═══════════════════════════════════════════════════════════
// RISK TRACKING
// ═══════════════════════════════════════════════════════════

type RiskManager
    float dailyLoss
    int dailyTrades
    int consecutiveLosses
    float peakEquity
    float currentDrawdown
    bool tradingPaused
    int lastResetDay

var RiskManager risk = RiskManager.new(
    dailyLoss = 0.0,
    dailyTrades = 0,
    consecutiveLosses = 0,
    peakEquity = strategy.initial_capital,
    currentDrawdown = 0.0,
    tradingPaused = false,
    lastResetDay = dayofmonth
)

// Reset daily counters
if dayofmonth != risk.lastResetDay
    risk.dailyLoss := 0.0
    risk.dailyTrades := 0
    risk.lastResetDay := dayofmonth

// Update peak equity and drawdown
if strategy.equity > risk.peakEquity
    risk.peakEquity := strategy.equity

risk.currentDrawdown := ((risk.peakEquity - strategy.equity) / risk.peakEquity) * 100

// ═══════════════════════════════════════════════════════════
// STOP LOSS CALCULATORS
// ═══════════════════════════════════════════════════════════

//@function Calculate ATR-based stop loss
calcATRStop(float entry, string direction) =>
    atr = ta.atr(atrPeriod)
    direction == "long" ? entry - (atr * atrMultiplier) : entry + (atr * atrMultiplier)

//@function Calculate percentage-based stop loss
calcPercentStop(float entry, string direction) =>
    direction == "long" ? entry * (1 - percentStop/100) : entry * (1 + percentStop/100)

//@function Calculate fixed point stop loss
calcFixedStop(float entry, string direction) =>
    direction == "long" ? entry - fixedStop : entry + fixedStop

//@function Calculate Chandelier stop
calcChandelierStop(string direction, int period=22, float mult=3.0) =>
    atr = ta.atr(period)
    if direction == "long"
        ta.highest(high, period) - (atr * mult)
    else
        ta.lowest(low, period) + (atr * mult)

//@function Get stop loss based on selected type
getStopLoss(float entry, string direction) =>
    switch stopType
        "ATR" => calcATRStop(entry, direction)
        "Percent" => calcPercentStop(entry, direction)
        "Fixed" => calcFixedStop(entry, direction)
        "Chandelier" => calcChandelierStop(direction)
        => calcATRStop(entry, direction)

// ═══════════════════════════════════════════════════════════
// RISK CHECKS
// ═══════════════════════════════════════════════════════════

//@function Check if trade is allowed based on risk rules
//@returns true if trade is allowed
canTrade() =>
    // Check daily loss limit
    if math.abs(risk.dailyLoss) >= (strategy.equity * (maxRiskPerDay/100))
        false

    // Check max drawdown
    else if risk.currentDrawdown >= maxDrawdown
        risk.tradingPaused := true
        false

    // Check consecutive losses
    else if risk.consecutiveLosses >= pauseAfterLosses
        false

    // Check max open trades
    else if strategy.opentrades >= maxOpenTrades
        false

    else
        true

//@function Validate position size against risk limits
//@param qty Proposed position size
//@param entry Entry price
//@param stop Stop loss price
//@returns Adjusted position size
validatePositionSize(float qty, float entry, float stop) =>
    stopDistance = math.abs(entry - stop)
    riskAmount = qty * stopDistance
    maxRiskAmount = strategy.equity * (maxRiskPerTrade / 100)

    if riskAmount > maxRiskAmount
        // Reduce size to meet risk limit
        qty := math.floor(maxRiskAmount / stopDistance)

    // Check max position value
    positionValue = qty * entry
    maxPositionValue = strategy.equity * (maxPositionSize / 100)

    if positionValue > maxPositionValue
        qty := math.floor(maxPositionValue / entry)

    math.max(qty, 1)  // Minimum 1 contract

// ═══════════════════════════════════════════════════════════
// TRADE EXECUTION WITH RISK CONTROLS
// ═══════════════════════════════════════════════════════════

// Entry signals
emaFast = ta.ema(close, 12)
emaSlow = ta.ema(close, 26)
longSignal = ta.crossover(emaFast, emaSlow)
shortSignal = ta.crossunder(emaFast, emaSlow)

// Execute long trade with risk management
if longSignal and canTrade()
    entryPrice = close
    stopPrice = getStopLoss(entryPrice, "long")
    targetPrice = entryPrice + (math.abs(entryPrice - stopPrice) * 2)  // 2:1 R:R

    // Calculate position size
    atr = ta.atr(atrPeriod)
    riskAmount = strategy.equity * (maxRiskPerTrade / 100)
    stopDistance = entryPrice - stopPrice
    qty = math.floor(riskAmount / stopDistance)

    // Validate size
    qty := validatePositionSize(qty, entryPrice, stopPrice)

    // Enter trade
    strategy.entry("LONG", strategy.long, qty=qty,
                   comment=str.format("Long {0} @ {1}", qty, entryPrice))

    strategy.exit("EXIT_LONG", "LONG",
                  stop=stopPrice,
                  limit=targetPrice,
                  comment="Long Exit")

    risk.dailyTrades += 1

// Execute short trade with risk management
if shortSignal and canTrade()
    entryPrice = close
    stopPrice = getStopLoss(entryPrice, "short")
    targetPrice = entryPrice - (math.abs(entryPrice - stopPrice) * 2)

    atr = ta.atr(atrPeriod)
    riskAmount = strategy.equity * (maxRiskPerTrade / 100)
    stopDistance = stopPrice - entryPrice
    qty = math.floor(riskAmount / stopDistance)
    qty := validatePositionSize(qty, entryPrice, stopPrice)

    strategy.entry("SHORT", strategy.short, qty=qty)
    strategy.exit("EXIT_SHORT", "SHORT", stop=stopPrice, limit=targetPrice)

    risk.dailyTrades += 1

// ═══════════════════════════════════════════════════════════
// TRACK TRADE OUTCOMES
// ═══════════════════════════════════════════════════════════

var float lastEquity = strategy.equity

if strategy.closedtrades > strategy.closedtrades[1]
    tradeProfit = strategy.equity - lastEquity

    // Update daily loss
    risk.dailyLoss += tradeProfit

    // Update consecutive losses
    if tradeProfit < 0
        risk.consecutiveLosses += 1
    else
        risk.consecutiveLosses := 0

    lastEquity := strategy.equity

// Resume trading after cooldown
if risk.consecutiveLosses == 0
    risk.tradingPaused := false

// ═══════════════════════════════════════════════════════════
// DISPLAY RISK STATUS
// ═══════════════════════════════════════════════════════════

if barstate.islast
    var table riskTable = table.new(position.top_left, 2, 8, bgcolor=color.new(color.gray, 90))

    table.cell(riskTable, 0, 0, "Risk Monitor", bgcolor=color.navy, text_color=color.white, text_size=size.normal)
    table.cell(riskTable, 1, 0, risk.tradingPaused ? "⚠ PAUSED" : "✓ Active",
               bgcolor=risk.tradingPaused ? color.red : color.green,
               text_color=color.white, text_size=size.normal)

    table.cell(riskTable, 0, 1, "Daily Trades")
    table.cell(riskTable, 1, 1, str.tostring(risk.dailyTrades))

    table.cell(riskTable, 0, 2, "Daily P&L")
    table.cell(riskTable, 1, 2, "$" + str.tostring(risk.dailyLoss, "#,###.##"),
               text_color=risk.dailyLoss >= 0 ? color.green : color.red)

    table.cell(riskTable, 0, 3, "Consecutive Losses")
    table.cell(riskTable, 1, 3, str.tostring(risk.consecutiveLosses),
               text_color=risk.consecutiveLosses >= pauseAfterLosses ? color.red : color.white)

    table.cell(riskTable, 0, 4, "Current DD %")
    table.cell(riskTable, 1, 4, str.tostring(risk.currentDrawdown, "#.##") + "%",
               text_color=risk.currentDrawdown > maxDrawdown * 0.7 ? color.orange : color.white)

    table.cell(riskTable, 0, 5, "Peak Equity")
    table.cell(riskTable, 1, 5, "$" + str.tostring(risk.peakEquity, "#,###"))

    table.cell(riskTable, 0, 6, "Current Equity")
    table.cell(riskTable, 1, 6, "$" + str.tostring(strategy.equity, "#,###"))

    table.cell(riskTable, 0, 7, "Open Trades")
    table.cell(riskTable, 1, 7, str.tostring(strategy.opentrades) + " / " + str.tostring(maxOpenTrades))

// Visual alerts
bgcolor(risk.tradingPaused ? color.new(color.red, 80) : na, title="Trading Paused")
bgcolor(risk.currentDrawdown > maxDrawdown * 0.5 ? color.new(color.orange, 90) : na, title="High Drawdown Warning")
```

---

<a name="pyramiding"></a>
## 5. Pyramiding & Scaling Strategies

Pyramiding allows adding to winning positions. This is a powerful technique when used correctly.

### Advanced Pyramiding System

```pinescript
//@version=6
strategy("Advanced Pyramiding", overlay=true, pyramiding=5,
         default_qty_type=strategy.cash, default_qty_value=10000)

// ═══════════════════════════════════════════════════════════
// PYRAMIDING CONFIGURATION
// ═══════════════════════════════════════════════════════════

pyramidLevels = input.int(3, "Pyramid Levels", minval=1, maxval=5)
addOnPercent = input.float(2.0, "Add On Profit %", minval=0.5, maxval=10)
scalingMethod = input.string("Equal", "Scaling Method",
    options=["Equal", "Decreasing", "Increasing", "ATR-Based"])
initialSize = input.float(10000, "Initial Position Size $")

// ═══════════════════════════════════════════════════════════
// PYRAMIDING TYPE
// ═══════════════════════════════════════════════════════════

type PyramidPosition
    int level                // Current pyramid level
    float[] entryPrices      // Entry price for each level
    float[] quantities       // Quantity at each level
    float avgEntry           // Average entry price
    float totalQty           // Total position size
    float unrealizedPL       // Unrealized P&L

var PyramidPosition pyramid = PyramidPosition.new(
    level = 0,
    entryPrices = array.new<float>(0),
    quantities = array.new<float>(0),
    avgEntry = 0.0,
    totalQty = 0.0,
    unrealizedPL = 0.0
)

// ═══════════════════════════════════════════════════════════
// SCALING CALCULATORS
// ═══════════════════════════════════════════════════════════

//@function Calculate position size for next pyramid level
//@param level Current level (0-indexed)
//@param baseSize Initial position size
//@returns Size for this level
calcScalingSize(int level, float baseSize) =>
    switch scalingMethod
        "Equal" => baseSize
        "Decreasing" => baseSize / (level + 1)
        "Increasing" => baseSize * (level + 1)
        "ATR-Based" =>
            atr = ta.atr(14)
            volatilityRatio = atr / ta.sma(ta.atr(14), 50)
            baseSize / volatilityRatio  // Reduce size in high volatility
        => baseSize

// ═══════════════════════════════════════════════════════════
// PYRAMID ENTRY LOGIC
// ═══════════════════════════════════════════════════════════

emaFast = ta.ema(close, 12)
emaSlow = ta.ema(close, 50)
trend = emaFast > emaSlow

// Initial entry signal
initialEntry = ta.crossover(emaFast, emaSlow)

// Calculate profit percent from average entry
profitPercent = pyramid.avgEntry > 0 ?
                ((close - pyramid.avgEntry) / pyramid.avgEntry) * 100 : 0

// Add-on conditions
canAddOn = pyramid.level > 0 and
           pyramid.level < pyramidLevels and
           profitPercent > (addOnPercent * pyramid.level)  // Increasing thresholds

// ═══════════════════════════════════════════════════════════
// EXECUTE PYRAMIDING
// ═══════════════════════════════════════════════════════════

// First entry
if initialEntry and strategy.position_size == 0
    qty = initialSize / close
    strategy.entry("Long_1", strategy.long, qty=qty)

    // Reset pyramid
    array.clear(pyramid.entryPrices)
    array.clear(pyramid.quantities)
    array.push(pyramid.entryPrices, close)
    array.push(pyramid.quantities, qty)

    pyramid.level := 1
    pyramid.avgEntry := close
    pyramid.totalQty := qty

    label.new(bar_index, low, "Entry L1\n" + str.tostring(qty, "#.##"),
              style=label.style_label_up, color=color.green, textcolor=color.white)

// Add-on entries
if canAddOn and trend
    currentLevel = pyramid.level + 1
    qty = calcScalingSize(currentLevel - 1, initialSize / close)

    entryId = "Long_" + str.tostring(currentLevel)
    strategy.entry(entryId, strategy.long, qty=qty)

    // Update pyramid
    array.push(pyramid.entryPrices, close)
    array.push(pyramid.quantities, qty)

    pyramid.level := currentLevel
    pyramid.totalQty += qty

    // Recalculate average entry
    totalCost = 0.0
    for i = 0 to array.size(pyramid.entryPrices) - 1
        totalCost += array.get(pyramid.entryPrices, i) * array.get(pyramid.quantities, i)
    pyramid.avgEntry := totalCost / pyramid.totalQty

    label.new(bar_index, low,
              str.format("Add L{0}\nQty: {1}\nAvg: {2}",
                        currentLevel, qty, pyramid.avgEntry),
              style=label.style_label_up, color=color.blue, textcolor=color.white)

// ═══════════════════════════════════════════════════════════
// PYRAMID EXIT MANAGEMENT
// ═══════════════════════════════════════════════════════════

// Trail stop for entire position
atr = ta.atr(14)
var float trailStop = na

if pyramid.level > 0
    // Initialize trail stop after first add-on
    if pyramid.level >= 2 and na(trailStop)
        trailStop := pyramid.avgEntry + (atr * 1.0)

    // Update trail stop
    if not na(trailStop)
        newTrail = close - (atr * 2.5)
        trailStop := math.max(trailStop, newTrail)

    // Exit if trail stop hit
    if not na(trailStop) and close < trailStop
        strategy.close_all(comment="Trail Stop")
        pyramid.level := 0
        trailStop := na

// Hard stop at break-even after 2 pyramids
if pyramid.level >= 2
    breakEvenStop = pyramid.avgEntry
    if close < breakEvenStop
        strategy.close_all(comment="Break Even")
        pyramid.level := 0
        trailStop := na

// Exit on trend reversal
if pyramid.level > 0 and ta.crossunder(emaFast, emaSlow)
    strategy.close_all(comment="Trend Reversal")
    pyramid.level := 0
    trailStop := na

// ═══════════════════════════════════════════════════════════
// VISUALIZATION
// ═══════════════════════════════════════════════════════════

// Plot average entry
plot(pyramid.level > 0 ? pyramid.avgEntry : na, "Avg Entry",
     color.new(color.blue, 0), 2, plot.style_linebr)

// Plot trail stop
plot(trailStop, "Trail Stop", color.new(color.red, 0), 2, plot.style_linebr)

// Display pyramid info
if pyramid.level > 0 and barstate.islast
    var table pyramidTable = table.new(position.middle_right, 2, 6)

    table.cell(pyramidTable, 0, 0, "Pyramid Status",
               bgcolor=color.blue, text_color=color.white, text_size=size.normal)
    table.cell(pyramidTable, 1, 0, "Level " + str.tostring(pyramid.level),
               bgcolor=color.blue, text_color=color.white)

    table.cell(pyramidTable, 0, 1, "Total Qty")
    table.cell(pyramidTable, 1, 1, str.tostring(pyramid.totalQty, "#.##"))

    table.cell(pyramidTable, 0, 2, "Avg Entry")
    table.cell(pyramidTable, 1, 2, "$" + str.tostring(pyramid.avgEntry, "#.##"))

    table.cell(pyramidTable, 0, 3, "Current")
    table.cell(pyramidTable, 1, 3, "$" + str.tostring(close, "#.##"))

    table.cell(pyramidTable, 0, 4, "Profit %")
    table.cell(pyramidTable, 1, 4, str.tostring(profitPercent, "#.##") + "%",
               text_color=profitPercent > 0 ? color.green : color.red)

    table.cell(pyramidTable, 0, 5, "Unrealized P&L")
    unrealizedPL = (close - pyramid.avgEntry) * pyramid.totalQty
    table.cell(pyramidTable, 1, 5, "$" + str.tostring(unrealizedPL, "#,###"),
               text_color=unrealizedPL > 0 ? color.green : color.red)
```

### Scaling Out (Partial Exits)

```pinescript
//@version=6
strategy("Scaling Out Strategy", overlay=true)

// ═══════════════════════════════════════════════════════════
// SCALING OUT CONFIGURATION
// ═══════════════════════════════════════════════════════════

scaleOutLevels = input.int(3, "Scale Out Levels", minval=1, maxval=5)
firstTarget = input.float(2.0, "First Target %", minval=0.5)
targetIncrement = input.float(1.5, "Target Increment %", minval=0.5)
qtyPercent1 = input.float(40, "First Exit %", minval=10, maxval=90)
qtyPercent2 = input.float(30, "Second Exit %", minval=10, maxval=90)
// Remainder stays until final exit

// ═══════════════════════════════════════════════════════════
// ENTRY
// ═══════════════════════════════════════════════════════════

longSignal = ta.crossover(ta.ema(close, 12), ta.ema(close, 26))

var float entryPrice = na
var int exitLevel = 0

if longSignal and strategy.position_size == 0
    strategy.entry("Long", strategy.long)
    entryPrice := close
    exitLevel := 0

// ═══════════════════════════════════════════════════════════
// SCALING OUT EXITS
// ═══════════════════════════════════════════════════════════

if strategy.position_size > 0 and not na(entryPrice)
    profitPct = ((close - entryPrice) / entryPrice) * 100

    // First target
    target1 = entryPrice * (1 + firstTarget/100)
    if exitLevel == 0 and close >= target1
        strategy.close("Long", qty_percent=qtyPercent1, comment="Target 1")
        exitLevel := 1
        label.new(bar_index, high, "Exit 1: " + str.tostring(qtyPercent1) + "%",
                  style=label.style_label_down, color=color.green)

    // Second target
    target2 = entryPrice * (1 + (firstTarget + targetIncrement)/100)
    if exitLevel == 1 and close >= target2
        strategy.close("Long", qty_percent=qtyPercent2, comment="Target 2")
        exitLevel := 2
        label.new(bar_index, high, "Exit 2: " + str.tostring(qtyPercent2) + "%",
                  style=label.style_label_down, color=color.blue)

    // Trail remainder
    if exitLevel >= 2
        atr = ta.atr(14)
        trailStop = close - (atr * 2)
        strategy.exit("Trail_Exit", "Long", stop=trailStop, comment="Trail Stop")

    // Hard stop for entire position
    stopLoss = entryPrice * 0.98
    if close < stopLoss
        strategy.close_all(comment="Stop Loss")
        exitLevel := 0
```

---

<a name="trailing-stops"></a>
## 6. Trailing Stops & Dynamic Exits

### Advanced Trailing Stop Techniques

```pinescript
//@version=6
strategy("Advanced Trailing Stops", overlay=true)

// ═══════════════════════════════════════════════════════════
// TRAILING STOP TYPES
// ═══════════════════════════════════════════════════════════

trailType = input.string("ATR Trail", "Trailing Method",
    options=["ATR Trail", "Percent Trail", "Chandelier", "Parabolic SAR", "Swing Points", "Moving Average"])

atrPeriod = input.int(14, "ATR Period")
atrMult = input.float(2.5, "ATR Multiplier")
pctTrail = input.float(3.0, "Percent Trail %")
sarStart = input.float(0.02, "SAR Start")
sarMax = input.float(0.2, "SAR Max")
maPeriod = input.int(20, "MA Period")
swingLookback = input.int(10, "Swing Lookback")

// ═══════════════════════════════════════════════════════════
// TRAILING STOP CALCULATORS
// ═══════════════════════════════════════════════════════════

//@function ATR-based trailing stop
//@returns Stop price
calcATRTrail() =>
    atr = ta.atr(atrPeriod)
    var float trail = na

    if strategy.position_size > 0  // Long position
        newTrail = close - (atr * atrMult)
        trail := na(trail) ? newTrail : math.max(trail, newTrail)
    else if strategy.position_size < 0  // Short position
        newTrail = close + (atr * atrMult)
        trail := na(trail) ? newTrail : math.min(trail, newTrail)
    else
        trail := na

    trail

//@function Percentage trailing stop
//@returns Stop price
calcPercentTrail() =>
    var float trail = na
    var float highestPrice = na
    var float lowestPrice = na

    if strategy.position_size > 0
        highestPrice := na(highestPrice) ? close : math.max(highestPrice, close)
        trail := highestPrice * (1 - pctTrail/100)
    else if strategy.position_size < 0
        lowestPrice := na(lowestPrice) ? close : math.min(lowestPrice, close)
        trail := lowestPrice * (1 + pctTrail/100)
    else
        highestPrice := na
        lowestPrice := na
        trail := na

    trail

//@function Chandelier stop
//@returns Stop price
calcChandelierTrail() =>
    atr = ta.atr(atrPeriod)

    if strategy.position_size > 0
        ta.highest(high, atrPeriod) - (atr * atrMult)
    else if strategy.position_size < 0
        ta.lowest(low, atrPeriod) + (atr * atrMult)
    else
        float(na)

//@function Parabolic SAR trailing stop
//@returns Stop price
calcSARTrail() =>
    sar = ta.sar(sarStart, sarStart, sarMax)

    if strategy.position_size > 0 and sar < close
        sar
    else if strategy.position_size < 0 and sar > close
        sar
    else
        float(na)

//@function Swing point trailing stop
//@returns Stop price
calcSwingTrail() =>
    var float trail = na

    if strategy.position_size > 0
        swingLow = ta.lowest(low, swingLookback)
        trail := na(trail) ? swingLow : math.max(trail, swingLow)
    else if strategy.position_size < 0
        swingHigh = ta.highest(high, swingLookback)
        trail := na(trail) ? swingHigh : math.min(trail, swingHigh)
    else
        trail := na

    trail

//@function Moving average trailing stop
//@returns Stop price
calcMATrail() =>
    ma = ta.ema(close, maPeriod)

    if strategy.position_size > 0 and close > ma
        ma
    else if strategy.position_size < 0 and close < ma
        ma
    else
        float(na)

// ═══════════════════════════════════════════════════════════
// SELECT TRAILING METHOD
// ═══════════════════════════════════════════════════════════

trailStop = switch trailType
    "ATR Trail" => calcATRTrail()
    "Percent Trail" => calcPercentTrail()
    "Chandelier" => calcChandelierTrail()
    "Parabolic SAR" => calcSARTrail()
    "Swing Points" => calcSwingTrail()
    "Moving Average" => calcMATrail()
    => calcATRTrail()

// ═══════════════════════════════════════════════════════════
// ENTRY & EXIT
// ═══════════════════════════════════════════════════════════

longSignal = ta.crossover(ta.ema(close, 12), ta.ema(close, 50))
shortSignal = ta.crossunder(ta.ema(close, 12), ta.ema(close, 50))

if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// Use trailing stop for exits
if strategy.position_size > 0 and not na(trailStop)
    strategy.exit("Trail_Long", "Long", stop=trailStop)

if strategy.position_size < 0 and not na(trailStop)
    strategy.exit("Trail_Short", "Short", stop=trailStop)

// ═══════════════════════════════════════════════════════════
// VISUALIZATION
// ═══════════════════════════════════════════════════════════

plot(trailStop, "Trailing Stop",
     color=strategy.position_size > 0 ? color.red :
           strategy.position_size < 0 ? color.green : color.gray,
     linewidth=2, style=plot.style_linebr)

// Mark when stop is hit
bgcolor(strategy.position_size == 0 and strategy.position_size[1] != 0 ?
        color.new(color.orange, 85) : na, title="Exit Highlight")
```

---

<a name="mtf-strategies"></a>
## 7. Multi-Timeframe Strategies

### Advanced MTF Strategy Framework

```pinescript
//@version=6
strategy("Multi-Timeframe Strategy", overlay=true)

// ═══════════════════════════════════════════════════════════
// MTF CONFIGURATION
// ═══════════════════════════════════════════════════════════

htf1 = input.timeframe("D", "Higher TF 1")
htf2 = input.timeframe("W", "Higher TF 2")
enableHTF1 = input.bool(true, "Enable HTF1 Filter")
enableHTF2 = input.bool(true, "Enable HTF2 Filter")

// ═══════════════════════════════════════════════════════════
// MTF DATA REQUESTS
// ═══════════════════════════════════════════════════════════

// Request HTF data
[htf1Close, htf1High, htf1Low] = request.security(syminfo.tickerid, htf1,
    [close, high, low], lookahead=barmerge.lookahead_on)

[htf2Close, htf2High, htf2Low] = request.security(syminfo.tickerid, htf2,
    [close, high, low], lookahead=barmerge.lookahead_on)

// HTF indicators
htf1EMA20 = request.security(syminfo.tickerid, htf1, ta.ema(close, 20))
htf1EMA50 = request.security(syminfo.tickerid, htf1, ta.ema(close, 50))
htf2EMA20 = request.security(syminfo.tickerid, htf2, ta.ema(close, 20))
htf2EMA50 = request.security(syminfo.tickerid, htf2, ta.ema(close, 50))

// HTF trend determination
htf1Bullish = htf1Close > htf1EMA20 and htf1EMA20 > htf1EMA50
htf1Bearish = htf1Close < htf1EMA20 and htf1EMA20 < htf1EMA50
htf2Bullish = htf2Close > htf2EMA20 and htf2EMA20 > htf2EMA50
htf2Bearish = htf2Close < htf2EMA20 and htf2EMA20 < htf2EMA50

// ═══════════════════════════════════════════════════════════
// CURRENT TIMEFRAME SIGNALS
// ═══════════════════════════════════════════════════════════

// Current TF indicators
rsi = ta.rsi(close, 14)
emaFast = ta.ema(close, 12)
emaSlow = ta.ema(close, 26)

// Current TF entry signals
ctfLongSignal = ta.crossover(emaFast, emaSlow) and rsi < 70
ctfShortSignal = ta.crossunder(emaFast, emaSlow) and rsi > 30

// ═══════════════════════════════════════════════════════════
// MTF FILTERING
// ═══════════════════════════════════════════════════════════

//@function Check if all timeframe conditions align
//@param direction "long" or "short"
//@returns true if all enabled MTF filters confirm
mtfConfirm(string direction) =>
    htf1OK = not enableHTF1 or (direction == "long" ? htf1Bullish : htf1Bearish)
    htf2OK = not enableHTF2 or (direction == "long" ? htf2Bullish : htf2Bearish)
    htf1OK and htf2OK

// Final filtered signals
longSignal = ctfLongSignal and mtfConfirm("long")
shortSignal = ctfShortSignal and mtfConfirm("short")

// ═══════════════════════════════════════════════════════════
// EXECUTION
// ═══════════════════════════════════════════════════════════

if longSignal
    strategy.entry("MTF_Long", strategy.long)
    atr = ta.atr(14)
    strategy.exit("Exit_Long", "MTF_Long",
                  stop=close - (atr * 2),
                  limit=close + (atr * 3))

if shortSignal
    strategy.entry("MTF_Short", strategy.short)
    atr = ta.atr(14)
    strategy.exit("Exit_Short", "MTF_Short",
                  stop=close + (atr * 2),
                  limit=close - (atr * 3))

// ═══════════════════════════════════════════════════════════
// VISUALIZATION
// ═══════════════════════════════════════════════════════════

// Background color for HTF trend
bgcolor(enableHTF1 ? (htf1Bullish ? color.new(color.green, 95) :
                      htf1Bearish ? color.new(color.red, 95) : na) : na)

// Display MTF status
if barstate.islast
    var table mtfTable = table.new(position.bottom_left, 3, 4)

    table.cell(mtfTable, 0, 0, "Timeframe", bgcolor=color.blue, text_color=color.white)
    table.cell(mtfTable, 1, 0, "Trend", bgcolor=color.blue, text_color=color.white)
    table.cell(mtfTable, 2, 0, "Status", bgcolor=color.blue, text_color=color.white)

    table.cell(mtfTable, 0, 1, "Current")
    table.cell(mtfTable, 1, 1, emaFast > emaSlow ? "▲ Bull" : "▼ Bear",
               text_color=emaFast > emaSlow ? color.green : color.red)
    table.cell(mtfTable, 2, 1, "Active")

    table.cell(mtfTable, 0, 2, htf1)
    table.cell(mtfTable, 1, 2, htf1Bullish ? "▲ Bull" : htf1Bearish ? "▼ Bear" : "→ Neutral",
               text_color=htf1Bullish ? color.green : htf1Bearish ? color.red : color.gray)
    table.cell(mtfTable, 2, 2, enableHTF1 ? "Filter ON" : "OFF")

    table.cell(mtfTable, 0, 3, htf2)
    table.cell(mtfTable, 1, 3, htf2Bullish ? "▲ Bull" : htf2Bearish ? "▼ Bear" : "→ Neutral",
               text_color=htf2Bullish ? color.green : htf2Bearish ? color.red : color.gray)
    table.cell(mtfTable, 2, 3, enableHTF2 ? "Filter ON" : "OFF")
```

---

Due to length constraints, I'll now create the second part of the guide focusing on arrays, matrices, and more advanced strategy examples. Let me continue...

