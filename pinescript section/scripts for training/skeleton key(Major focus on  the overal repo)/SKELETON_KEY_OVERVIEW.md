# Skeleton Key - Trading Strategy System Overview

## What is Skeleton Key?

Skeleton Key is a comprehensive TradingView Pine Script v6 **strategy** (not an indicator) that provides multiple independent configurable signal generators with flexible logical grouping and tuning capabilities.

---

## Terminology

Understanding the language used throughout this documentation:

### STRATEGY
The entire Skeleton Key tool, declared as a Pine Script v6 **strategy**.

### SIGNAL
A complete configuration (e.g., "Threshold A" with all its parameters).
- Multiple signals can be active simultaneously
- When a signal evaluates to TRUE → Creates an **ORDER**
- Signals act like "mini trades" within the larger strategy

### ORDER
The result of a signal being TRUE:
- **Entry Order** - Opens a position
- **Exit Order** - Closes a position

### SIGNAL GROUPINGS
Categories of signals with similar functionality:
- **Threshold Signals** (A, B, C, D, E) - Comparison-based signals
- **Range Signals** (A, B, C, D, E) - Range-based signals *(not yet documented)*
- **Slope Signals** (A, B, C, D, E) - Slope-based signals *(not yet documented)*
- **External Signals** (A, B, C, D, E, F) - TradingView alert-based signals *(not yet documented)*
- Additional groupings may exist

### TUNERS / STRATEGY TUNERS / TUNING KNOBS
Individual parameters that manipulate/tune aspects of each signal:
- Historical Bar Index
- Bars Signal is Valid
- Post Entry Bars
- Profit Filter
- Entry/Exit Logic
- And more...

These are "little dials" that adjust the behavior of individual signals.

### STRATEGY MANAGEMENT AREA
Separate from signal groupings, includes:
- Risk Management
- Strategy Management
- Time Management
*(Not covered in this document yet)*

---

## Signal Groupings Overview

Currently documented groupings:

### Threshold Signals (A, B, C, D, E)
Comparison-based signals using SOURCE, OPERATOR, VALUE structure.
**Status**: Fully documented below

### Other Groupings (Not Yet Documented)
- **Range Signals** (A, B, C, D, E)
- **Slope Signals** (A, B, C, D, E)
- **External Signals** (A, B, C, D, E, F)
- **Divergence Signals**
- **KROWN CROSS Signals**

---

## Threshold Signals - Detailed Documentation

### Overview
Threshold signals are comparison-based signals that evaluate a SOURCE against a VALUE using an OPERATOR. This is built on the same Pine Script foundation (`input.source()` and comparison operators) that TradingView's alert system uses.

### 3-Part Comparison System

Each threshold signal uses a **3-part comparison system**:

```
[SOURCE] [OPERATOR] [VALUE]
```

### Part 1: SOURCE (Dropdown)
The data source to evaluate:
- **Close** - Closing price
- **Open** - Opening price
- **High** - High price
- **Low** - Low price
- **Any on-chart indicator output**:
  - Stochastic K
  - Stochastic D
  - RSI
  - MACD
  - Volume
  - Moving Averages
  - Custom indicators
  - *Any output visible on the chart*

### Part 2: OPERATOR (Dropdown)
The comparison operator:
- `<` - Less than
- `>` - Greater than
- `>=` - Greater than or equal to
- `<=` - Less than or equal to
- `==` - Equal to

### Part 3: VALUE (Numeric Input)
- Integer value to compare against
- User-defined threshold level

---

## Signal Evaluation

**IMPORTANT**: Threshold signals are **conditional state checks**, NOT crossover events.

### How It Works:
- The condition is evaluated **every bar close**
- Signal is **TRUE** when condition is met
- Signal is **FALSE** when condition is not met
- Signal remains TRUE as long as condition stays true

### Example Behavior:

```
Threshold: Close > 3000
[x] Entry checkbox enabled
```

**Bar 1**: Close = 2900 → Signal FALSE
**Bar 2**: Close = 3100 → Signal TRUE (entry may trigger)
**Bar 3**: Close = 3200 → Signal still TRUE
**Bar 4**: Close = 3150 → Signal still TRUE
**Bar 5**: Close = 2950 → Signal FALSE

The signal is **active/true whenever the condition is met**, not just when it first becomes true.

---

## Entry/Exit Checkboxes

Each signal has two checkboxes that control its behavior:

### [x] Entry
- When checked: Signal can trigger **entry** trades
- When unchecked: Signal ignored for entries

### [x] Exit
- When checked: Signal can trigger **exit** trades
- When unchecked: Signal ignored for exits

### Both Checked
- Signal can trigger both entries AND exits
- Provides flexibility for signals that work in both directions

---

## Examples

### Example 1: Price-Based Entry
```
SOURCE:   Close
OPERATOR: >
VALUE:    3000
[x] Entry
[ ] Exit

= Entry signal is TRUE when closing price is greater than $3000
```

### Example 2: Indicator-Based Entry
```
SOURCE:   Stochastic K
OPERATOR: >
VALUE:    30
[x] Entry
[ ] Exit

= Entry signal is TRUE when Stochastic K value is greater than 30
```

### Example 3: Indicator-Based Exit
```
SOURCE:   RSI
OPERATOR: >
VALUE:    70
[ ] Entry
[x] Exit

= Exit signal is TRUE when RSI value is greater than 70 (overbought)
```

### Example 4: Dual-Purpose Signal
```
SOURCE:   Close
OPERATOR: >=
VALUE:    50
[x] Entry
[x] Exit

= Signal is TRUE when Close is greater than or equal to 50
  Can trigger both entries and exits
```

---

## Multiple Signals (A, B, C, D, E)

The system supports **at least 5 independent threshold signals**:
- **Threshold A**
- **Threshold B**
- **Threshold C**
- **Threshold D**
- **Threshold E**

Each signal has **identical parameter structure**:
- Source/Operator/Value comparison
- Entry/Exit checkboxes
- Historical Bar Index
- Bars Signal is Valid
- Post Entry Bars
- Profit Filter
- Entry Logical Group
- Exit Logical Group

---

## Logical Grouping System

### Entry vs Exit Logic Independence

**CRITICAL**: Entry Logic and Exit Logic operate **independently** based on checkboxes:

```
[x] Entry checked → Entry Logical Group is ACTIVE
[ ] Exit unchecked → Exit Logical Group is NULLIFIED (does nothing)
```

If only Entry is checked, the Exit Logic dropdown setting is ignored completely.
If only Exit is checked, the Entry Logic dropdown setting is ignored completely.
If both are checked, both logic systems are active independently.

---

### The Three Logic Groups

Each signal can be assigned to one of three **completely isolated** logic groups:

1. **AND - A**
2. **AND - B**
3. **OR**

**KEY CONCEPT**: These three logic groups are **parallel, independent evaluation systems**. They do NOT interact with each other.

---

### Logic Group Isolation Rules

**AND - A signals:**
- Only care about OTHER AND - A signals
- Completely ignore AND - B signals
- Completely ignore OR signals

**AND - B signals:**
- Only care about OTHER AND - B signals
- Completely ignore AND - A signals
- Completely ignore OR signals

**OR signals:**
- Don't care about ANY other signals
- Completely independent
- Fire whenever their condition is TRUE

---

### How Each Logic Group Works

#### AND - A Logic (Confluence Group A)
**All AND - A signals must be TRUE simultaneously** to fire an entry/exit.

**Example:**
```
Threshold A: Close > 3000, Entry checked, Logic: AND - A
Threshold B: RSI < 30, Entry checked, Logic: AND - A

Result: Entry fires ONLY when BOTH conditions are true at the same time
```

This creates a **confluence/confirmation system** within the AND - A group.

---

#### AND - B Logic (Confluence Group B)
**All AND - B signals must be TRUE simultaneously** to fire an entry/exit.

**Example:**
```
Threshold C: Stoch K > 20, Entry checked, Logic: AND - B
Threshold D: Volume > 1000000, Entry checked, Logic: AND - B

Result: Entry fires ONLY when BOTH conditions are true at the same time
```

This creates a **separate confluence/confirmation system** within the AND - B group.

**IMPORTANT**: AND - A and AND - B groups **do NOT wait for each other**. They run in parallel.

---

#### OR Logic (Complete Independence)
**Each OR signal fires independently** whenever its condition is TRUE.

**Example:**
```
Threshold E: Close < 2500, Entry checked, Logic: OR

Result: Entry fires whenever Close < 2500, regardless of any other signals
```

OR signals:
- Don't require confirmation
- Don't wait for other signals
- Fire immediately when condition is met
- Each OR signal acts like its own independent strategy

---

### Parallel Logic Groups Example

```
Threshold A: Close > 3000, Entry, AND - A
Threshold B: RSI < 30, Entry, AND - A
Threshold C: Stoch K > 20, Entry, AND - B
Threshold D: Volume > 1M, Entry, AND - B
Threshold E: Close < 2500, Entry, OR
```

**What Happens:**

**AND - A Group (A + B):**
- Waits for BOTH A and B to be TRUE
- When both are TRUE → Fires Entry #1

**AND - B Group (C + D):**
- Waits for BOTH C and D to be TRUE
- When both are TRUE → Fires Entry #2
- Does NOT wait for AND - A group

**OR Signal (E):**
- When E is TRUE → Fires Entry #3
- Does NOT wait for anything

**With pyramiding enabled**, you could have **3 simultaneous positions** from these three independent logic systems.

---

### Logic Group Summary

| Logic Type | Behavior | Waits For | Independent? |
|------------|----------|-----------|--------------|
| **AND - A** | All AND - A must be TRUE | Other AND - A signals only | No (within group) |
| **AND - B** | All AND - B must be TRUE | Other AND - B signals only | No (within group) |
| **OR** | Fires when TRUE | Nothing | Yes (completely) |

**The three logic groups run in parallel and do not interact with each other.**

---

## Strategy Tuners (Signal Parameters)

These are the "tuning knobs" that adjust the behavior of each individual signal. Each threshold signal (A, B, C, D, E) has access to these tuners.

---

### Historical Bar Index

**What it does**: Shifts which bar the signal evaluates - uses historical bar data instead of current bar.

**Tooltip**: "Historical bar index for signal"

**Default**: 0 (current bar)

#### How It Works:

**Default (0) - Current Bar:**
```
Threshold A: Close > 3000
Historical Bar Index = 0

Evaluates: Close[0] > 3000  (current bar)
```

**Historical Bar (2):**
```
Threshold A: Stochastic K > 30
Historical Bar Index = 2

Evaluates: Stochastic K[2] > 30  (2 bars ago)
```

Instead of checking if Stochastic K is above 30 **now**, it checks if Stochastic K from **2 closures ago** was above 30.

#### Works with Any Source:
- `Close[2]` - Price from 2 bars ago
- `RSI[5]` - RSI from 5 bars ago
- `Volume[3]` - Volume from 3 bars ago
- `MACD[1]` - MACD from 1 bar ago

**Use Cases:**
- Delayed signals - Check if condition was true X bars ago
- Historical confirmation - "Was RSI oversold 3 bars ago?"
- Past state checks - Build logic based on historical conditions

---

### Bars Signal is Valid

**What it does**: Creates a validity window - once signal goes TRUE, it stays "active/valid" for X bars even if condition falls back to FALSE.

**Tooltip**: "Allow signal to be considered valid for a longer time"

**Default**: 0 (signal must be true on current bar)

#### How It Works - Signal Memory/Buffer:

**Scenario Setup:**
```
Threshold A: Close > 3000, AND-A logic, Bars Signal is Valid = 5
Threshold B: RSI < 30, AND-A logic, Bars Signal is Valid = 0

Both must be active for AND-A to fire
```

**Timeline:**

**Bar 1:**
- Threshold A condition becomes TRUE (Close = 3100)
- Validity window starts: A will remain "active" for next 5 bars
- Threshold B is FALSE

**Bar 3:**
- Threshold A condition falls to FALSE (Close = 2900)
- **BUT Threshold A signal is STILL VALID** (3 of 5 bars used)
- Threshold B still FALSE

**Bar 5:**
- Threshold A condition still FALSE (Close = 2850)
- **BUT Threshold A signal is STILL VALID** (5 of 5 bars - last bar)
- Threshold B becomes TRUE (RSI = 25)
- **AND-A logic met**: Both A (valid) and B (true) are active
- ✅ **Trade fires** even though A's condition is currently FALSE!

**Bar 6:**
- Threshold A validity expires (past 5 bars)
- Threshold A condition still FALSE
- Threshold B becomes TRUE
- **AND-A logic NOT met**: A is no longer valid
- ❌ **No trade**

#### Key Insight:
**Signal stays "active" for X bars after first becoming TRUE**, regardless of whether condition falls back to FALSE.

**Use Cases:**
- Allow slower signals to catch up with faster signals
- Create confluence without requiring perfect bar-level synchronization
- Reduce false signals from choppy conditions
- Build flexible confirmation systems

---

### Profit Filter

**What it does**: Filters signals based on current position profit/loss state.

**Tooltip**: "Signal only active if profit filter is true relative to the current position"

**Default**: ANY

**Options:**
- **ANY** - Signal fires regardless of current position P&L
- **PROFIT** - Signal only fires when current position is profitable (in the green)
- **LOSS** - Signal only fires when current position is at a loss (in the red)

#### How It Works:

**ANY (Default):**
- Signal always active
- No filtering based on position P&L

**PROFIT:**
- Signal only active when current position is profitable
- **Use cases:**
  - Only add to winning trades
  - Only exit when in profit
  - Prevent taking more risk on losing positions

**LOSS:**
- Signal only active when current position is at a loss
- **Use cases:**
  - Average down on losing trades
  - Only exit when in loss (stop loss scenarios)
  - DCA into losing positions

#### Example:
```
Threshold A: RSI < 30, Entry, Profit Filter = LOSS
Threshold B: RSI > 70, Exit, Profit Filter = PROFIT

Entry signal (A) only fires when current position is losing
Exit signal (B) only fires when current position is profitable
```

**Note**: Implementation details for checking position P&L in Pine Script need verification.

---

### Post Entry Bars

**What it does**: Controls how many bars to wait after entry before signal can retrigger.

**Default**: -1 (meaning to be determined)

**Status**: Detailed behavior not yet documented.

---

---

## Known Limitations / Future Enhancements

### Missing Crossover/Crossunder Functionality
The current skeleton key reference **does not include** crossover/crossunder options:
- **ta.crossover(source, value)** - TRUE only when source crosses above value
- **ta.crossunder(source, value)** - TRUE only when source crosses below value

**Note**: This functionality seems valuable and may need to be added. Will investigate why it's not currently included in the reference implementation.

---

## Reference Materials

Example screenshots demonstrating the system are located in:
```
F:\Kirbys litter box\clean litter\skeleton key\example pics sof input options and sole influence behind  skeleton key external\
```

### Available Examples:
1. Strategy Direction and Moving Average grouping
2. Divergence group
3. Threshold A overall group
4. Threshold group divided into different parameters
5. Historical bar index option
6. Valid signal for nTHs bars
7. Profit filter options
8. Entry logical group options
9. Exit logical group options
10. Multiple threshold groups (A, B, C, D, E)
11. Repeating threshold structure

---

## Development Notes

- System inspired by/based on external skeleton key reference
- Built for TradingView Pine Script v6
- Designed for maximum flexibility and configurability
- Modular structure allows independent signal operation
- Can be combined with other signal types (Divergence, KROWN CROSS, etc.)

---

**Last Updated**: 2025-11-29
**Status**:
- Terminology established
- Threshold signals fully documented (structure, logic system, basic tuners)
- Remaining: Detailed tuner behavior, Range signals, Slope signals, External signals, Strategy Management Area
