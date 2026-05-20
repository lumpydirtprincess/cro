# The Complete Pine Script v6 Guide
## A Comprehensive Reference for TradingView Script Development

**Version:** 6
**Last Updated:** December 2025
**Author:** Compiled from Official TradingView Documentation

---

## Table of Contents

1. [Introduction to Pine Script v6](#introduction)
2. [Getting Started](#getting-started)
3. [Script Structure and Syntax](#script-structure)
4. [Data Types and Type System](#data-types)
5. [Operators and Expressions](#operators)
6. [Variables and Declarations](#variables)
7. [Execution Model](#execution-model)
8. [Control Structures](#control-structures)
9. [Built-in Variables](#built-in-variables)
10. [Built-in Functions](#built-in-functions)
11. [Plotting and Visualization](#plotting)
12. [Alerts and Notifications](#alerts)
13. [Strategies and Backtesting](#strategies)
14. [Libraries and Code Reusability](#libraries)
15. [Advanced Features](#advanced-features)
16. [Common Patterns and Best Practices](#best-practices)
17. [Practical Examples](#examples)
18. [Version 6 New Features](#v6-features)
19. [Troubleshooting and Common Errors](#troubleshooting)
20. [Resources and References](#resources)

---

<a name="introduction"></a>
## 1. Introduction to Pine Script v6

### What is Pine Script?

Pine Script is TradingView's proprietary programming language designed specifically for creating custom technical analysis indicators, strategies, and visual tools for financial chart analysis. Version 6 represents the most advanced iteration of the language, offering enhanced capabilities, improved syntax, and better performance.

### Purpose and Use Cases

Pine Script enables traders and developers to:

- **Create Custom Indicators**: Build technical analysis tools tailored to specific trading methodologies
- **Develop Trading Strategies**: Backtest and automate trading logic with built-in broker simulation
- **Generate Alerts**: Set up conditional notifications based on market conditions
- **Visualize Data**: Plot lines, shapes, colors, and other visual elements on charts
- **Share Solutions**: Publish scripts to the TradingView community

### Key Characteristics

Pine Script is unique among programming languages due to its:

- **Event-Driven Execution**: Scripts execute bar-by-bar across historical and realtime data
- **Time Series Focus**: Built-in support for historical data referencing
- **Chart Integration**: Native integration with TradingView's charting platform
- **Simplified Syntax**: Designed for traders, not just programmers

---

<a name="getting-started"></a>
## 2. Getting Started

### Accessing the Pine Editor

1. Open TradingView.com
2. Navigate to any chart
3. Click "Pine Editor" at the bottom of the chart
4. Begin writing your script

### Your First Script

```pinescript
//@version=6
indicator("My First Script", overlay=true)

// Plot a simple moving average
smaValue = ta.sma(close, 14)
plot(smaValue, color=color.blue, linewidth=2)
```

**Key Components:**
- `//@version=6` - Version declaration (must be first line)
- `indicator()` - Declares this is an indicator script
- `ta.sma()` - Calculates Simple Moving Average
- `plot()` - Displays the result on the chart

### Script Types

Pine Script v6 supports three primary script types:

1. **Indicators** - Display calculated values and visualizations
2. **Strategies** - Include backtesting and order simulation
3. **Libraries** - Reusable code modules

---

<a name="script-structure"></a>
## 3. Script Structure and Syntax

### Basic Script Anatomy

```pinescript
//@version=6
indicator("Script Name", overlay=true)

// Global scope - declarations and initialization
var int counter = 0
input.int priceLength = input.int(14, "Period")

// Function definitions
calcCustomMA(src, len) =>
    ta.sma(src, len)

// Main execution logic
maValue = calcCustomMA(close, priceLength)
counter += 1

// Output
plot(maValue, "MA", color.blue)
```

### Script Declaration

Every script must begin with a version compiler directive and a declaration function:

```pinescript
//@version=6
indicator(title, shorttitle, overlay, format, precision, scale, max_bars_back,
          timeframe, timeframe_gaps, explicit_plot_zorder, max_lines_count,
          max_labels_count, max_boxes_count, max_polylines_count)
```

**Common Parameters:**
- `title` - Script name displayed in chart
- `overlay` - `true` plots on main chart, `false` creates separate pane
- `precision` - Number of decimal places for values

### Comments

```pinescript
// Single-line comment

/* Multi-line
   comment */

//@variable Custom documentation comment
float myVar = close
```

### Indentation and Formatting

Pine Script uses **indentation** for code blocks (similar to Python):

```pinescript
if close > open
    counter += 1
    label.new(bar_index, high, "Bull")
else
    counter -= 1
```

---

<a name="data-types"></a>
## 4. Data Types and Type System

### Type Categories

Pine Script v6 has a sophisticated type system with two main categories:

#### Fundamental Types
- `int` - Integer numbers (42, -17, 0)
- `float` - Floating-point numbers (3.14, -0.5)
- `bool` - Boolean values (true, false)
- `color` - Color values (#FF0000, color.blue)
- `string` - Text strings ("Hello", 'World')

#### Special Types
- `line`, `box`, `label`, `table`, `polyline` - Drawing objects
- `array<type>` - Collections of values
- `matrix<type>` - Two-dimensional arrays
- `map<type>` - Key-value pairs (v6 feature)

### Type Qualifiers

Every value has a type qualifier indicating when it's determined:

- **literal** - Known at compile time (`42`, `"text"`)
- **input** - Set via script inputs
- **const** - Calculated at compilation
- **simple** - Known at bar zero
- **series** - Can change bar-to-bar

Example:
```pinescript
int        literal_int    = 42              // literal int
float      input_float    = input.float(10.5) // input float
color      simple_color   = color.blue      // simple color
float      series_float   = close           // series float
```

### Type Conversion

Automatic conversion (widening):
```pinescript
int x = 5
float y = x  // Automatic int to float
```

Explicit conversion:
```pinescript
float price = 42.7
int rounded = int(price)      // Explicit conversion
string text = str.tostring(price, "#.##")
```

### The `na` Value

`na` represents "not available" - used for missing or undefined values:

```pinescript
float value = na
if na(value)
    value := close

// Check for na
bool isNotAvailable = na(close[100])
```

---

<a name="operators"></a>
## 5. Operators and Expressions

### Arithmetic Operators

```pinescript
result = 10 + 5    // Addition: 15
result = 10 - 5    // Subtraction: 5
result = 10 * 5    // Multiplication: 50
result = 10 / 5    // Division: 2.0
result = 10 % 3    // Modulo: 1
```

### Comparison Operators

```pinescript
close > open       // Greater than
close >= open      // Greater than or equal
close < open       // Less than
close <= open      // Less than or equal
close == open      // Equal to
close != open      // Not equal to
```

### Logical Operators

```pinescript
condition1 and condition2   // Logical AND
condition1 or condition2    // Logical OR
not condition1              // Logical NOT

// Example
bullish = close > open and volume > ta.sma(volume, 20)
```

### Ternary Operator

```pinescript
result = condition ? valueIfTrue : valueIfFalse

// Example
barColor = close > open ? color.green : color.red
```

### Assignment Operators

```pinescript
x = 10        // Declaration assignment
x := 20       // Reassignment (for var/varip)
x += 5        // Add and assign
x -= 3        // Subtract and assign
x *= 2        // Multiply and assign
x /= 4        // Divide and assign
x %= 3        // Modulo and assign
```

### History-Referencing Operator

The `[]` operator accesses historical values:

```pinescript
close[0]      // Current bar close (same as 'close')
close[1]      // Previous bar close
close[10]     // Close from 10 bars ago

// Example: Price change
priceChange = close - close[1]
```

---

<a name="variables"></a>
## 6. Variables and Declarations

### Variable Declaration

```pinescript
// Type-specified declaration
float price = close
int barCount = bar_index
string ticker = syminfo.ticker

// Type-inferred declaration
myValue = 42.5              // Inferred as float
isPositive = close > open   // Inferred as bool
```

### Declaration Modes

#### Default Mode (Re-declares Every Bar)

```pinescript
int x = 0
x += 10
plot(x)  // Always plots 10
```

#### `var` - Initialize Once

```pinescript
var int x = 0
x += 10
plot(x)  // Plots 10, 20, 30, 40... (accumulates)
```

#### `varip` - Persist Across Ticks

```pinescript
varip int tickCount = 0
tickCount += 1  // Counts every tick, not just bars
```

### Mutable vs Immutable

Variables declared without `var`/`varip` are immutable (use `=`):
```pinescript
float ma = ta.sma(close, 20)
```

Variables declared with `var`/`varip` are mutable (use `:=` to reassign):
```pinescript
var float total = 0.0
total := total + close
```

### Scope

```pinescript
//@version=6
indicator("Scope Demo")

// Global scope
int globalVar = 1

if close > open
    // Local scope
    int localVar = 2
    globalVar := localVar  // Can access both

// localVar is NOT accessible here
```

---

<a name="execution-model"></a>
## 7. Execution Model

### Bar-by-Bar Execution

**Core Principle:** Pine Script executes your entire script once for every bar in the dataset, from first to last.

```pinescript
//@version=6
indicator("Execution Demo", overlay=true)

var int barCounter = 0
barCounter += 1

// This plots 1 on first bar, 2 on second, 3 on third, etc.
plot(barCounter, "Bar Number")
```

**Key Points:**
- Script runs completely on bar 0 (first bar)
- Then runs completely on bar 1
- Continues bar-by-bar to the most recent bar
- Built-in variables update before each execution

### Time Series

As scripts execute, data automatically forms time series:

```pinescript
// 'close' is a series of all closing prices
currentClose = close      // Current bar
previousClose = close[1]  // One bar ago
weekAgoClose = close[7]   // Seven bars ago (if daily chart)
```

### Historical vs Realtime Bars

**Historical Bars:**
- Closed, confirmed data
- Script executes once per bar
- Data doesn't change

**Realtime Bar:**
- Currently forming bar
- Script executes on every tick (price update)
- Data can change until bar closes

```pinescript
//@version=6
indicator("Bar State Demo")

bgcolor(barstate.ishistory ? color.new(color.blue, 90) :
        color.new(color.orange, 90))

// Label on last bar
if barstate.islast
    label.new(bar_index, high, "This is the last bar")
```

### Rollback

On realtime bars, Pine "rolls back" to the bar's opening state before each new tick:

```pinescript
var int tickCounter = 0

if barstate.isrealtime
    tickCounter += 1

// On realtime bar: tickCounter resets to 0 each new tick
// On bar close: final value is preserved
```

### Calculation Frequency

```pinescript
//@version=6
strategy("Calc Frequency", calc_on_every_tick=true)

// With calc_on_every_tick=true:
// - Strategy recalculates on every tick
// - Without it: only calculates on bar close
```

---

<a name="control-structures"></a>
## 8. Control Structures

### If Statement

```pinescript
if condition
    // code executed if true
else if otherCondition
    // code executed if first is false, this is true
else
    // code executed if all above are false

// Example
if close > open
    label.new(bar_index, low, "Bullish", color=color.green)
else if close < open
    label.new(bar_index, high, "Bearish", color=color.red)
else
    label.new(bar_index, hl2, "Neutral", color=color.gray)
```

### If Expression (Returns Value)

```pinescript
result = if condition
    value1
else
    value2

// Example
barColor = if close > open
    color.green
else if close < open
    color.red
else
    color.gray

barcolor(barColor)
```

### Switch Statement

```pinescript
result = switch expression
    value1 => result1
    value2 => result2
    => defaultResult

// Example
timeframeText = switch timeframe.period
    "1"  => "1 minute"
    "5"  => "5 minutes"
    "D"  => "Daily"
    => "Other"
```

### For Loop

```pinescript
sum = 0.0
for i = 0 to 9
    sum += close[i]
averageOf10 = sum / 10

// With step
for i = 0 to 100 by 5
    // i = 0, 5, 10, 15... 100
    line.new(bar_index - i, low, bar_index - i, high)
```

### While Loop

```pinescript
var int counter = 0
while counter < 10
    counter += 1

// Be careful: while loops can cause performance issues
```

### For...in Loop (Arrays)

```pinescript
myArray = array.from(1, 2, 3, 4, 5)

sum = 0
for item in myArray
    sum += item
// sum = 15
```

---

<a name="built-in-variables"></a>
## 9. Built-in Variables

### Price Variables

```pinescript
open        // Opening price of current bar
high        // Highest price of current bar
low         // Lowest price of current bar
close       // Closing price of current bar
volume      // Volume of current bar
hl2         // (high + low) / 2
hlc3        // (high + low + close) / 3
ohlc4       // (open + high + low + close) / 4
hlcc4       // (high + low + close + close) / 4
```

### Bar Information

```pinescript
bar_index           // Current bar number (0-based)
time                // Opening time of current bar (Unix timestamp)
time_close          // Closing time of current bar

// Example
barsSinceLaunch = bar_index + 1
plot(barsSinceLaunch, "Bar Count")
```

### Bar State Variables

```pinescript
barstate.isfirst              // true on first bar
barstate.islast               // true on last bar
barstate.ishistory            // true on historical bars
barstate.isrealtime           // true on realtime bars
barstate.isnew                // true on first update of new bar
barstate.isconfirmed          // true on bar close
barstate.islastconfirmedhistory  // true on last historical bar
```

**Example:**
```pinescript
if barstate.isfirst
    label.new(bar_index, high, "Start", color=color.green)

if barstate.islast
    label.new(bar_index, high, "Now", color=color.blue)
```

### Symbol Information

```pinescript
syminfo.ticker          // Symbol name ("AAPL")
syminfo.tickerid        // Full symbol ID
syminfo.basecurrency    // Base currency ("USD")
syminfo.currency        // Quote currency
syminfo.description     // Full description
syminfo.type            // Instrument type ("stock", "crypto", etc.)
syminfo.timezone        // Symbol timezone
```

### Timeframe Information

```pinescript
timeframe.period        // Current timeframe ("D", "60", "1")
timeframe.multiplier    // Timeframe multiplier (int)
timeframe.isseconds     // true if timeframe in seconds
timeframe.isminutes     // true if timeframe in minutes
timeframe.isintraday    // true if less than daily
timeframe.isdaily       // true if daily
timeframe.isweekly      // true if weekly
timeframe.ismonthly     // true if monthly
```

### Display and Chart Info

```pinescript
last_bar_index      // Index of the last available bar
chart.left_visible_bar_index   // First visible bar
chart.right_visible_bar_index  // Last visible bar

chart.bg_color      // Chart background color
chart.fg_color      // Chart foreground color
```

---

<a name="built-in-functions"></a>
## 10. Built-in Functions

Pine Script v6 includes 884+ built-in functions. Here are the most essential:

### Technical Analysis Functions (ta.*)

#### Moving Averages

```pinescript
ta.sma(source, length)           // Simple Moving Average
ta.ema(source, length)           // Exponential Moving Average
ta.wma(source, length)           // Weighted Moving Average
ta.vwma(source, length)          // Volume-Weighted MA
ta.rma(source, length)           // RSI Moving Average (Wilder's)

// Example
sma20 = ta.sma(close, 20)
ema50 = ta.ema(close, 50)
plot(sma20, "SMA 20", color.blue)
plot(ema50, "EMA 50", color.orange)
```

#### Momentum Indicators

```pinescript
ta.rsi(source, length)           // Relative Strength Index
ta.macd(source, fast, slow, signal)  // MACD
ta.stoch(close, high, low, length)   // Stochastic
ta.cci(source, length)           // Commodity Channel Index
ta.mfi(source, length)           // Money Flow Index

// Example
rsiValue = ta.rsi(close, 14)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
```

#### Volatility Indicators

```pinescript
ta.atr(length)                   // Average True Range
ta.tr                            // True Range
ta.bb(source, length, mult)      // Bollinger Bands
ta.kc(source, length, mult)      // Keltner Channels

// Example
atr14 = ta.atr(14)
[bbMiddle, bbUpper, bbLower] = ta.bb(close, 20, 2)
plot(bbUpper, "BB Upper", color.red)
plot(bbLower, "BB Lower", color.green)
```

#### Price Change Functions

```pinescript
ta.change(source, length)        // Change from length bars ago
ta.roc(source, length)           // Rate of Change
ta.mom(source, length)           // Momentum

// Examples
priceChange = ta.change(close, 1)     // close - close[1]
percentChange = ta.roc(close, 1)      // % change
```

#### Crossover/Crossunder

```pinescript
ta.crossover(source1, source2)   // source1 crosses above source2
ta.crossunder(source1, source2)  // source1 crosses below source2
ta.cross(source1, source2)       // Either crossover or crossunder

// Example
fastMA = ta.ema(close, 12)
slowMA = ta.ema(close, 26)

if ta.crossover(fastMA, slowMA)
    label.new(bar_index, low, "Buy Signal", color=color.green)
if ta.crossunder(fastMA, slowMA)
    label.new(bar_index, high, "Sell Signal", color=color.red)
```

#### Highest/Lowest

```pinescript
ta.highest(source, length)       // Highest value over length bars
ta.lowest(source, length)        // Lowest value over length bars
ta.highestbars(source, length)   // Bars ago of highest value
ta.lowestbars(source, length)    // Bars ago of lowest value

// Example
highest20 = ta.highest(high, 20)
lowest20 = ta.lowest(low, 20)
```

### Math Functions (math.*)

```pinescript
math.abs(x)          // Absolute value
math.round(x)        // Round to nearest integer
math.floor(x)        // Round down
math.ceil(x)         // Round up
math.max(a, b)       // Maximum of two values
math.min(a, b)       // Minimum of two values
math.avg(a, b, ...)  // Average
math.sum(source, length)  // Sum over length bars

// Constants
math.pi              // 3.14159...
math.e               // 2.71828...

// Example
absChange = math.abs(close - open)
maxPrice = math.max(high, high[1])
```

### String Functions (str.*)

```pinescript
str.tostring(value, format)   // Convert to string
str.tonumber(string)          // Convert to number
str.format(format, args)      // Formatted string
str.length(string)            // String length
str.contains(string, substr)  // Check if contains
str.substring(string, begin, end)  // Extract substring

// Example
priceText = str.tostring(close, "#.##")
label.new(bar_index, high, "Price: " + priceText)

formattedText = str.format("Close: {0,number,#.##} Vol: {1}", close, volume)
```

### Array Functions (array.*)

```pinescript
array.new<type>(size, initial_value)  // Create array
array.from(value1, value2, ...)       // Create from values
array.push(array, value)              // Add to end
array.unshift(array, value)           // Add to beginning
array.pop(array)                      // Remove from end
array.shift(array)                    // Remove from beginning
array.get(array, index)               // Get value at index
array.set(array, index, value)        // Set value at index
array.size(array)                     // Get array size
array.avg(array)                      // Average of elements
array.max(array)                      // Maximum element
array.min(array)                      // Minimum element
array.sum(array)                      // Sum of elements

// Example
prices = array.new<float>(0)
array.push(prices, close)

if array.size(prices) > 20
    array.shift(prices)  // Keep only last 20

averagePrice = array.avg(prices)
```

### Request Functions (request.*)

```pinescript
request.security(symbol, timeframe, expression)  // Multi-symbol/timeframe data
request.dividends(ticker, field, gaps)           // Dividend data
request.earnings(ticker, field, gaps)            // Earnings data
request.splits(ticker, field, gaps)              // Stock split data

// Example
dailyClose = request.security(syminfo.tickerid, "D", close)
plot(dailyClose, "Daily Close", color.blue)
```

---

<a name="plotting"></a>
## 11. Plotting and Visualization

### Plot Function

```pinescript
plot(series, title, color, linewidth, style, trackprice, histbase,
     offset, join, editable, show_last, display)

// Basic usage
plot(close, "Close Price", color.blue, 2)

// Conditional coloring
plotColor = close > open ? color.green : color.red
plot(close, "Close", plotColor)

// Different styles
plot(close, "Line", style=plot.style_line)
plot(close, "Circles", style=plot.style_circles)
plot(close, "Histogram", style=plot.style_histogram)
plot(close, "Columns", style=plot.style_columns)
plot(close, "Area", style=plot.style_area)
```

### Plot Shapes

```pinescript
plotshape(series, title, style, location, color, offset, text,
          textcolor, editable, size, show_last, display)

// Example
buySignal = ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
plotshape(buySignal, "Buy", shape.triangleup, location.belowbar,
          color.green, size=size.small)

sellSignal = ta.crossunder(ta.ema(close, 12), ta.ema(close, 26))
plotshape(sellSignal, "Sell", shape.triangledown, location.abovebar,
          color.red, size=size.small)
```

### Plot Character

```pinescript
plotchar(series, title, char, location, color, offset, text,
         textcolor, editable, size, show_last, display)

// Example
plotchar(buySignal, "Buy", "▲", location.belowbar, color.green)
plotchar(sellSignal, "Sell", "▼", location.abovebar, color.red)
```

### Background Color

```pinescript
bgcolor(color, offset, editable, show_last, title, display, overlay)

// Example
bgcolor(close > open ? color.new(color.green, 90) :
        color.new(color.red, 90))
```

### Bar Coloring

```pinescript
barcolor(color, offset, editable, show_last, title, display)

// Example
barcolor(close > ta.sma(close, 20) ? color.green : color.red)
```

### Lines

```pinescript
line.new(x1, y1, x2, y2, xloc, extend, color, style, width)

// Example
var line trendLine = na
if barstate.islast
    trendLine := line.new(bar_index[10], low[10], bar_index, low,
                          color=color.blue, width=2)
```

### Labels

```pinescript
label.new(x, y, text, xloc, yloc, color, style, textcolor, size,
          textalign, tooltip, text_font_family)

// Example
if ta.crossover(close, ta.sma(close, 50))
    label.new(bar_index, low, "Golden Cross",
              style=label.style_label_up, color=color.green,
              textcolor=color.white)
```

### Boxes

```pinescript
box.new(left, top, right, bottom, border_color, border_width,
        border_style, extend, xloc, bgcolor, text, text_size,
        text_color, text_valign, text_halign, text_wrap, text_font_family)

// Example
var box priceBox = na
if barstate.islast
    priceBox := box.new(bar_index[20], high[20], bar_index, low,
                        border_color=color.blue, bgcolor=color.new(color.blue, 90))
```

### Tables

```pinescript
table.new(position, columns, rows, bgcolor, frame_color, frame_width,
          border_color, border_width)

// Example
var table infoTable = table.new(position.top_right, 2, 2)
if barstate.islast
    table.cell(infoTable, 0, 0, "Symbol", bgcolor=color.blue)
    table.cell(infoTable, 1, 0, syminfo.ticker)
    table.cell(infoTable, 0, 1, "Price", bgcolor=color.blue)
    table.cell(infoTable, 1, 1, str.tostring(close, "#.##"))
```

### Fill Between Plots

```pinescript
fill(plot1, plot2, color, title, editable, show_last, fillgaps, display)

// Example
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)

p1 = plot(sma20, "SMA 20", color.blue)
p2 = plot(sma50, "SMA 50", color.orange)

fill(p1, p2, color=sma20 > sma50 ? color.new(color.green, 80) :
                                     color.new(color.red, 80))
```

---

<a name="alerts"></a>
## 12. Alerts and Notifications

### Alert Function

```pinescript
alert(message, freq)

// Frequencies
alert.freq_once_per_bar        // Default
alert.freq_once_per_bar_close  // Only on bar close
alert.freq_all                 // Every call

// Example
if ta.crossover(ta.rsi(close, 14), 70)
    alert("RSI Overbought: " + str.tostring(close, "#.##"),
          alert.freq_once_per_bar)
```

### Alert Condition (Legacy, Indicators Only)

```pinescript
alertcondition(condition, title, message)

// Example
buyCondition = ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
alertcondition(buyCondition, "Buy Signal", "EMA Crossover - Go Long!")
```

### Dynamic Alert Messages

```pinescript
if ta.crossover(close, ta.sma(close, 20))
    msg = str.format("Price crossed above SMA20\nSymbol: {0}\nPrice: {1}\nTime: {2}",
                     syminfo.ticker,
                     str.tostring(close, "#.##"),
                     str.format_time(time, "yyyy-MM-dd HH:mm"))
    alert(msg, alert.freq_once_per_bar)
```

---

<a name="strategies"></a>
## 13. Strategies and Backtesting

### Strategy Declaration

```pinescript
//@version=6
strategy("My Strategy", overlay=true, pyramiding=1,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=100, initial_capital=10000,
         commission_type=strategy.commission.percent,
         commission_value=0.1)
```

### Entry Orders

```pinescript
strategy.entry(id, direction, qty, limit, stop, comment, alert_message)

// Long entry
if ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
    strategy.entry("Long", strategy.long, comment="EMA Cross")

// Short entry
if ta.crossunder(ta.ema(close, 12), ta.ema(close, 26))
    strategy.entry("Short", strategy.short, comment="EMA Cross")
```

### Exit Orders

```pinescript
strategy.close(id, when, comment, alert_message)
strategy.close_all(when, comment, alert_message)

// Exit specific position
if ta.crossunder(ta.rsi(close, 14), 70)
    strategy.close("Long", comment="RSI Exit")

// Exit all positions
if hour == 15 and minute == 45
    strategy.close_all(comment="End of Day")
```

### Stop Loss and Take Profit

```pinescript
strategy.exit(id, from_entry, qty, limit, stop, trail_price,
              trail_points, trail_offset, comment, alert_message)

// Example
if ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
    entryPrice = close
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long",
                  stop=entryPrice * 0.98,      // 2% stop loss
                  limit=entryPrice * 1.05)     // 5% take profit

// Trailing stop
if strategy.position_size > 0
    strategy.exit("Trail", "Long", trail_points=100)
```

### Position Information

```pinescript
strategy.position_size       // Current position size (positive=long, negative=short)
strategy.position_avg_price  // Average entry price
strategy.openprofit          // Open profit/loss in currency
strategy.opentrades          // Number of open trades
strategy.closedtrades        // Number of closed trades
strategy.wintrades           // Number of winning trades
strategy.losstrades          // Number of losing trades
strategy.grossprofit         // Total gross profit
strategy.grossloss           // Total gross loss
strategy.netprofit           // Net profit

// Example
if barstate.islast
    table perfTable = table.new(position.bottom_right, 2, 5)
    table.cell(perfTable, 0, 0, "Net Profit", bgcolor=color.blue)
    table.cell(perfTable, 1, 0, str.tostring(strategy.netprofit, "#.##"))
    table.cell(perfTable, 0, 1, "Win Rate", bgcolor=color.blue)
    winRate = strategy.wintrades / strategy.closedtrades * 100
    table.cell(perfTable, 1, 1, str.tostring(winRate, "#.##") + "%")
```

### Risk Management Example

```pinescript
//@version=6
strategy("Risk Managed Strategy", overlay=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=2)  // 2% per trade

// Entry signal
longCondition = ta.crossover(ta.sma(close, 50), ta.sma(close, 200))

if longCondition
    // Calculate position size based on risk
    riskPercent = 2.0  // Risk 2% per trade
    stopLossPercent = 5.0  // 5% stop loss

    // Enter position
    strategy.entry("Long", strategy.long)

    // Set stop and target
    stopPrice = close * (1 - stopLossPercent/100)
    targetPrice = close * (1 + stopLossPercent * 2 / 100)  // 2:1 reward:risk

    strategy.exit("Exit", "Long", stop=stopPrice, limit=targetPrice)
```

---

<a name="libraries"></a>
## 14. Libraries and Code Reusability

### Creating a Library

```pinescript
//@version=6
library("MyTALibrary", overlay=true)

// Export a function
export calcSMA(float source, simple int length) =>
    ta.sma(source, length)

// Export with multiple return values
export calcBollinger(float source, simple int length, float mult) =>
    basis = ta.sma(source, length)
    dev = mult * ta.stdev(source, length)
    upper = basis + dev
    lower = basis - dev
    [basis, upper, lower]

// Export a type (Pine v6)
export type Point
    int x
    float y
```

### Using a Library

```pinescript
//@version=6
indicator("Using Library")

// Import library
import username/MyTALibrary/1 as lib

// Use library functions
sma20 = lib.calcSMA(close, 20)
[bbMid, bbUp, bbLow] = lib.calcBollinger(close, 20, 2)

plot(sma20, "SMA", color.blue)
plot(bbUp, "BB Upper", color.red)
plot(bbLow, "BB Lower", color.green)
```

---

<a name="advanced-features"></a>
## 15. Advanced Features

### User-Defined Types (UDT)

```pinescript
//@version=6
indicator("UDT Example")

// Define type
type Trade
    int entryBar
    float entryPrice
    float stopLoss
    float takeProfit
    string direction

// Create instance
var Trade currentTrade = na

// Use type
if ta.crossover(close, ta.sma(close, 50))
    currentTrade := Trade.new()
    currentTrade.entryBar := bar_index
    currentTrade.entryPrice := close
    currentTrade.direction := "Long"
```

### Methods

```pinescript
//@version=6
indicator("Methods Example")

type Position
    float price
    int qty

method getValue(Position this) =>
    this.price * this.qty

method toString(Position this) =>
    str.format("Price: {0}, Qty: {1}, Value: {2}",
               this.price, this.qty, this.getValue())

// Usage
myPos = Position.new(price=100, qty=10)
totalValue = myPos.getValue()
label.new(bar_index, high, myPos.toString())
```

### Maps (Key-Value Storage)

```pinescript
//@version=6
indicator("Map Example")

// Create map
var priceMap = map.new<string, float>()

// Add/Update values
map.put(priceMap, "high", high)
map.put(priceMap, "low", low)

// Get values
highValue = map.get(priceMap, "high")

// Check if key exists
if map.contains(priceMap, "high")
    // Do something

// Size
mapSize = map.size(priceMap)
```

### Matrix Operations

```pinescript
//@version=6
indicator("Matrix Example")

// Create matrix
m = matrix.new<float>(3, 3, 0)

// Set values
matrix.set(m, 0, 0, 1.0)
matrix.set(m, 1, 1, 2.0)

// Get value
value = matrix.get(m, 0, 0)

// Matrix operations
m2 = matrix.new<float>(3, 3, 1)
sum = matrix.add(m, m2)
product = matrix.mult(m, m2)
```

---

<a name="best-practices"></a>
## 16. Common Patterns and Best Practices

### 1. Avoid Repainting

```pinescript
// BAD - Can repaint
buySignal = ta.crossover(close, ta.sma(close, 20))

// GOOD - Confirmed signals
buySignal = ta.crossover(close[1], ta.sma(close, 20)[1]) and barstate.isconfirmed
```

### 2. Efficient Calculations

```pinescript
// BAD - Recalculates SMA multiple times
if ta.sma(close, 50) > ta.sma(close, 200)
    plot(ta.sma(close, 50))

// GOOD - Calculate once
sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)
if sma50 > sma200
    plot(sma50)
```

### 3. Use Appropriate Variable Declarations

```pinescript
// When you need accumulation
var float total = 0
total += close

// When you need bar-by-bar reset
float dailyHigh = 0
dailyHigh := math.max(dailyHigh, high)
```

### 4. Limit Drawing Objects

```pinescript
// BAD - Creates unlimited labels
if close > open
    label.new(bar_index, high, "Bull")

// GOOD - Limit to last 100
var labels = array.new<label>(0)
if close > open
    lbl = label.new(bar_index, high, "Bull")
    array.push(labels, lbl)
    if array.size(labels) > 100
        label.delete(array.shift(labels))
```

### 5. Comments and Documentation

```pinescript
//@version=6
indicator("Well Documented Script", overlay=true)

//@variable The period for the moving average
input int maPeriod = input.int(20, "MA Period", minval=1)

//@variable The simple moving average of closing prices
float ma = ta.sma(close, maPeriod)

//@function Calculates a custom indicator
//@param source The price series to use
//@param length The lookback period
//@returns The calculated indicator value
calcCustom(float source, int length) =>
    sum = 0.0
    for i = 0 to length - 1
        sum += source[i]
    sum / length

plot(ma, "MA", color.blue, 2)
```

---

<a name="examples"></a>
## 17. Practical Examples

### Example 1: Moving Average Crossover System

```pinescript
//@version=6
indicator("MA Cross System", overlay=true)

// Inputs
fastLength = input.int(12, "Fast MA", minval=1)
slowLength = input.int(26, "Slow MA", minval=1)

// Calculate MAs
fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)

// Detect crosses
crossUp = ta.crossover(fastMA, slowMA)
crossDn = ta.crossunder(fastMA, slowMA)

// Plot MAs
plot(fastMA, "Fast MA", color.blue, 2)
plot(slowMA, "Slow MA", color.orange, 2)

// Plot signals
plotshape(crossUp, "Buy", shape.triangleup, location.belowbar,
          color.green, size=size.small)
plotshape(crossDn, "Sell", shape.triangledown, location.abovebar,
          color.red, size=size.small)

// Alerts
if crossUp
    alert("Buy Signal - Fast MA crossed above Slow MA", alert.freq_once_per_bar)
if crossDn
    alert("Sell Signal - Fast MA crossed below Slow MA", alert.freq_once_per_bar)

// Background coloring
bgcolor(fastMA > slowMA ? color.new(color.green, 95) :
                           color.new(color.red, 95))
```

### Example 2: Support/Resistance Levels

```pinescript
//@version=6
indicator("S/R Levels", overlay=true)

// Input
lookback = input.int(20, "Lookback", minval=5)

// Find swing highs and lows
swingHigh = ta.pivothigh(high, lookback, lookback)
swingLow = ta.pivotlow(low, lookback, lookback)

// Store levels in arrays
var resistances = array.new<float>(0)
var supports = array.new<float>(0)

// Add new levels
if not na(swingHigh)
    array.push(resistances, swingHigh)
    if array.size(resistances) > 3
        array.shift(resistances)

if not na(swingLow)
    array.push(supports, swingLow)
    if array.size(supports) > 3
        array.shift(supports)

// Draw levels
var lines = array.new<line>(0)
if barstate.islast
    // Clear old lines
    for l in lines
        line.delete(l)
    array.clear(lines)

    // Draw resistances
    for r in resistances
        l = line.new(bar_index - 100, r, bar_index + 20, r,
                     color=color.red, width=2, extend=extend.right)
        array.push(lines, l)

    // Draw supports
    for s in supports
        l = line.new(bar_index - 100, s, bar_index + 20, s,
                     color=color.green, width=2, extend=extend.right)
        array.push(lines, l)
```

### Example 3: RSI Strategy with Money Management

```pinescript
//@version=6
strategy("RSI Strategy with MM", overlay=false,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=100, initial_capital=10000)

// Inputs
rsiPeriod = input.int(14, "RSI Period", minval=1)
rsiOverbought = input.int(70, "Overbought", minval=50, maxval=100)
rsiOversold = input.int(30, "Oversold", minval=0, maxval=50)
stopLossPct = input.float(2.0, "Stop Loss %", minval=0.1)
takeProfitPct = input.float(4.0, "Take Profit %", minval=0.1)

// Calculate RSI
rsiValue = ta.rsi(close, rsiPeriod)

// Entry conditions
longCondition = ta.crossover(rsiValue, rsiOversold)
shortCondition = ta.crossunder(rsiValue, rsiOverbought)

// Strategy execution
if longCondition
    strategy.entry("Long", strategy.long)
    stopPrice = close * (1 - stopLossPct/100)
    targetPrice = close * (1 + takeProfitPct/100)
    strategy.exit("Exit Long", "Long", stop=stopPrice, limit=targetPrice)

if shortCondition
    strategy.entry("Short", strategy.short)
    stopPrice = close * (1 + stopLossPct/100)
    targetPrice = close * (1 - takeProfitPct/100)
    strategy.exit("Exit Short", "Short", stop=stopPrice, limit=targetPrice)

// Plot RSI
plot(rsiValue, "RSI", color.blue, 2)
hline(rsiOverbought, "Overbought", color.red)
hline(rsiOversold, "Oversold", color.green)
hline(50, "Midline", color.gray)

// Plot background
bgcolor(rsiValue > rsiOverbought ? color.new(color.red, 90) :
        rsiValue < rsiOversold ? color.new(color.green, 90) : na)

// Performance table
if barstate.islast
    var table perfTable = table.new(position.top_right, 2, 6,
                                     bgcolor=color.new(color.gray, 80))

    table.cell(perfTable, 0, 0, "Metric", bgcolor=color.blue, text_color=color.white)
    table.cell(perfTable, 1, 0, "Value", bgcolor=color.blue, text_color=color.white)

    table.cell(perfTable, 0, 1, "Net Profit")
    table.cell(perfTable, 1, 1, str.tostring(strategy.netprofit, "#.##"))

    table.cell(perfTable, 0, 2, "Total Trades")
    table.cell(perfTable, 1, 2, str.tostring(strategy.closedtrades))

    table.cell(perfTable, 0, 3, "Win Rate")
    winRate = strategy.closedtrades > 0 ?
              strategy.wintrades / strategy.closedtrades * 100 : 0
    table.cell(perfTable, 1, 3, str.tostring(winRate, "#.##") + "%")

    table.cell(perfTable, 0, 4, "Profit Factor")
    pf = strategy.grossloss != 0 ?
         math.abs(strategy.grossprofit / strategy.grossloss) : 0
    table.cell(perfTable, 1, 4, str.tostring(pf, "#.##"))

    table.cell(perfTable, 0, 5, "Max Drawdown")
    table.cell(perfTable, 1, 5, str.tostring(strategy.max_drawdown, "#.##"))
```

### Example 4: Multi-Timeframe Analysis

```pinescript
//@version=6
indicator("MTF Analysis", overlay=true)

// Higher timeframe data
htfTimeframe = input.timeframe("D", "Higher Timeframe")

// Request HTF data
htfClose = request.security(syminfo.tickerid, htfTimeframe, close)
htfSMA = request.security(syminfo.tickerid, htfTimeframe, ta.sma(close, 20))

// Current timeframe
ctfSMA = ta.sma(close, 20)

// Plot
plot(ctfSMA, "Current TF SMA", color.blue, 2)
plot(htfSMA, "HTF SMA", color.orange, 3, plot.style_stepline)

// Signal when both align
bullish = close > ctfSMA and htfClose > htfSMA
bearish = close < ctfSMA and htfClose < htfSMA

bgcolor(bullish ? color.new(color.green, 90) :
        bearish ? color.new(color.red, 90) : na)

// Label on alignment
if ta.change(bullish ? 1 : 0) == 1
    label.new(bar_index, low, "MTF Bullish Align",
              style=label.style_label_up, color=color.green)

if ta.change(bearish ? 1 : 0) == 1
    label.new(bar_index, high, "MTF Bearish Align",
              style=label.style_label_down, color=color.red)
```

---

<a name="v6-features"></a>
## 18. Version 6 New Features

Pine Script v6 introduced several major enhancements:

### 1. User-Defined Types (UDT)

```pinescript
type Trade
    int id
    float entryPrice
    float exitPrice
    string symbol

    method profit() =>
        this.exitPrice - this.entryPrice
```

### 2. Methods

Functions that operate on objects using dot notation:

```pinescript
type Position
    float price
    int quantity

method getValue(Position this) =>
    this.price * this.quantity

pos = Position.new(price=50, quantity=10)
value = pos.getValue()  // Dot notation
```

### 3. Maps

Key-value storage:

```pinescript
var priceData = map.new<string, float>()
map.put(priceData, "AAPL", 150.0)
applePrice = map.get(priceData, "AAPL")
```

### 4. Enhanced Switch Statements

More powerful pattern matching:

```pinescript
result = switch
    condition1 => value1
    condition2 => value2
    => defaultValue
```

### 5. Improved Type System

Better type inference and stricter type checking for more reliable code.

### 6. Performance Improvements

Faster execution, especially for complex calculations and large datasets.

### 7. Matrix Enhancements

More matrix operations and better performance.

---

<a name="troubleshooting"></a>
## 19. Troubleshooting and Common Errors

### Common Errors and Solutions

#### 1. "Cannot call 'label.new' with 'na' x value"

**Problem:** Trying to create a drawing object with invalid coordinates.

**Solution:**
```pinescript
// BAD
if someCondition
    label.new(na, high, "Text")  // na is invalid

// GOOD
if someCondition and not na(bar_index)
    label.new(bar_index, high, "Text")
```

#### 2. "Undeclared identifier"

**Problem:** Using a variable before declaring it or typo in variable name.

**Solution:**
```pinescript
// BAD
plot(myValue)  // myValue not declared yet
myValue = close

// GOOD
myValue = close
plot(myValue)
```

#### 3. "Cannot modify global variable in local scope"

**Problem:** Trying to reassign a global variable without using `:=`.

**Solution:**
```pinescript
// BAD
var total = 0
if close > open
    total = total + 1  // Wrong operator

// GOOD
var total = 0
if close > open
    total := total + 1  // Correct operator
```

#### 4. "Script could not be translated from: null"

**Problem:** Syntax error preventing compilation.

**Solution:** Check for:
- Missing closing brackets
- Incorrect indentation
- Invalid function arguments
- Missing `//@version=6` declaration

#### 5. "Loop is too long (> 500ms)"

**Problem:** Loop taking too long to execute.

**Solution:**
```pinescript
// BAD
for i = 0 to 10000
    // Complex calculation

// GOOD
maxIterations = math.min(500, dataSize)  // Limit iterations
for i = 0 to maxIterations
    // Complex calculation
```

### Performance Tips

1. **Avoid recalculating same values:**
```pinescript
// BAD
if ta.sma(close, 50) > ta.sma(close, 200)
    plot(ta.sma(close, 50) - ta.sma(close, 200))

// GOOD
sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)
if sma50 > sma200
    plot(sma50 - sma200)
```

2. **Limit drawing objects:**
```pinescript
// Use max_labels_count, max_lines_count, etc.
//@version=6
indicator("My Script", max_labels_count=100)
```

3. **Use appropriate data types:**
```pinescript
// Use int when possible (faster than float)
int counter = 0  // GOOD
float counter = 0.0  // Less efficient for counting
```

---

<a name="resources"></a>
## 20. Resources and References

### Official Documentation

**Primary Resources:**
- **TradingView Pine Script v6 Documentation**
  https://www.tradingview.com/pine-script-docs/

- **Pine Script v6 Reference Manual**
  https://www.tradingview.com/pine-script-reference/v6/

- **TradingView Pine Script User Manual**
  https://www.tradingview.com/pine-script-docs/language

### Learning Resources

- **TradingView Pine Script FAQ**
  https://www.tradingview.com/pine-script-docs/faq

- **Release Notes (2025)**
  https://www.tradingview.com/pine-script-docs/Release_notes

- **TradingView Community Scripts**
  https://www.tradingview.com/scripts/

### Getting Help

- **TradingView Pine Script Community**
  https://www.tradingview.com/u/#community-scripts

- **Stack Overflow - Pine Script Tag**
  https://stackoverflow.com/questions/tagged/pine-script

### Practice and Examples

- **TradingView Public Library**
  Browse community scripts for inspiration and learning

- **Built-in Scripts**
  Study TradingView's built-in indicators (click "Source Code" on any built-in indicator)

---

## Converting This Guide to PDF

### Method 1: Using Microsoft Word

1. Copy this markdown content
2. Open Microsoft Word
3. Paste the content
4. Format as needed (apply heading styles)
5. Go to **File → Save As**
6. Choose **PDF** from the format dropdown
7. Click **Save**

### Method 2: Using Google Docs

1. Copy this markdown content
2. Open Google Docs (docs.google.com)
3. Create new document
4. Paste the content
5. Go to **File → Download → PDF Document (.pdf)**

### Method 3: Using Online Markdown to PDF Converter

1. Visit a markdown to PDF converter:
   - https://www.markdowntopdf.com/
   - https://md2pdf.netlify.app/
   - https://cloudconvert.com/md-to-pdf

2. Upload or paste this markdown file
3. Convert and download the PDF

### Method 4: Using Visual Studio Code (Recommended for Best Formatting)

1. Install VS Code (https://code.visualstudio.com/)
2. Install "Markdown PDF" extension
3. Open this file in VS Code
4. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
5. Type "Markdown PDF: Export (pdf)"
6. Press Enter

---

## Conclusion

Pine Script v6 is a powerful language for creating custom trading tools on TradingView. This guide has covered:

- **Fundamentals**: Syntax, data types, and execution model
- **Core Features**: Variables, operators, control structures
- **Built-in Capabilities**: Functions, indicators, and strategies
- **Visualization**: Plotting, drawing objects, and UI elements
- **Advanced Topics**: Libraries, UDTs, methods, and maps
- **Best Practices**: Performance optimization and error handling
- **Practical Examples**: Real-world script implementations

### Next Steps

1. **Practice**: Start with simple indicators and gradually increase complexity
2. **Experiment**: Modify existing scripts to understand how they work
3. **Study**: Review TradingView's built-in scripts' source code
4. **Share**: Publish your scripts to get community feedback
5. **Stay Updated**: Check release notes for new features

### Remember

- Pine Script executes bar-by-bar
- Use `var` for persistent variables
- Reference historical data with `[offset]`
- Test strategies thoroughly before live trading
- Optimize for performance by avoiding redundant calculations

Happy coding!

---

**Document Version:** 1.0
**Last Updated:** December 2025
**Compiled by:** AI Assistant using Official TradingView Documentation

**Disclaimer:** This guide is for educational purposes. Trading involves risk. Always conduct thorough testing and understand the code you're using before implementing it in live trading.
