# Skeleton Key - Comprehensive LLM Description

## Purpose of This Document
This description is optimized for **LLM/AI comprehension**. It provides a complete, structured explanation of the Skeleton Key trading strategy creation tool that can be easily pasted into new Claude conversations or other AI contexts to give instant, full understanding of the system.

---

## 1. SYSTEM OVERVIEW

### What is Skeleton Key?
**Skeleton Key** is a hyper-configurable, modular trading strategy framework for TradingView, built in Pine Script v6. It is a **strategy** (not an indicator).

### Core Philosophy
**Configuration Over Hard-Coding**: Instead of writing 100 different hard-coded strategies, Skeleton Key provides ONE powerful template with 50+ configurable parameters. Users create infinite strategy variations by adjusting configuration inputs, not by writing new code.

### System Architecture
```
ONE TEMPLATE → INFINITE STRATEGIES
   ↓
Configuration Inputs (50+ parameters)
   ↓
Modular Signal Groupings (Threshold, External Sources, etc.)
   ↓
Parallel Logic Groups (AND-A, AND-B, OR)
   ↓
Signal Tuners (Historical Bar Index, Validity Windows, Profit Filters)
   ↓
Entry/Exit Orders
   ↓
Strategy Management (Direction, Pyramiding)
```

### Design Goal
Enable **systematic optimization** where every aspect of the strategy is parameterized and can be tested via TradingView's strategy optimizer. Turn trading strategies into data-driven systems.

### Reference Implementation
Working prototype: `skeleton key take 2.ps` (646 lines)
- Currently implements: Threshold A, Threshold B (partial), External Sources A
- Planned expansion: Threshold C, D, E + External Sources B, C, D, E, F

---

## 2. TERMINOLOGY DICTIONARY

Critical terms used throughout the system:

### STRATEGY
The entire Skeleton Key tool itself. Declared as a Pine Script v6 `strategy()`.

### SIGNAL
A complete configuration representing one conditional rule (e.g., "Threshold A" with all its parameters).
- Multiple signals can be active simultaneously
- When a signal evaluates to TRUE → Creates an **ORDER**
- Signals act like "mini trades" within the larger strategy
- Each signal can be configured for entry, exit, or both

### ORDER
The result of a signal becoming TRUE:
- **Entry Order**: Opens a position (when Entry checkbox is enabled)
- **Exit Order**: Closes a position (when Exit checkbox is enabled)

### SIGNAL GROUPING
Categories of signals with similar functionality. Examples:
- **Threshold Signals** (A, B, C, D, E): Comparison-based signals (`source operator value`)
- **External Sources Signals** (A, B, C, D, E, F): Two-source comparison (`source1 operator source2`), includes crossover/crossunder

### SIGNAL INSTANCE
Individual copies within a grouping. Example: Threshold A, Threshold B, Threshold C, Threshold D, Threshold E are 5 instances of the Threshold signal grouping.

### TUNERS / STRATEGY TUNERS / TUNING KNOBS
Individual parameters that modify the behavior of a signal. Think of these as "dials" that adjust how a signal operates:
- **Historical Bar Index**: Shift evaluation to past bars
- **Bars Signal is Valid**: Validity window (signal memory)
- **Profit Filter**: Filter based on position P&L (ANY/PROFIT/LOSS)
- **Entry/Exit checkboxes**: Control entry/exit behavior
- **Logic Group assignment**: AND-A / AND-B / OR

### LOGIC GROUP
One of three parallel, independent evaluation systems:
- **AND-A**: Confluence Group A (all assigned signals must be TRUE together)
- **AND-B**: Confluence Group B (all assigned signals must be TRUE together, independent from AND-A)
- **OR**: Complete independence (each signal fires when TRUE)

### STRATEGY MANAGEMENT AREA
Separate from signal groupings, handles:
- Strategy Direction (Long/Short)
- Pyramiding (multiple simultaneous positions)
- Visual feedback (entry/exit markers)

---

## 3. ARCHITECTURE & COMPONENT RELATIONSHIPS

### Signal Flow
```
1. USER CONFIGURATION
   ↓
2. SIGNAL DEFINITION
   - Threshold: "Close > 3000"
   - External Sources: "Close crossover Open"
   ↓
3. SIGNAL TUNERS APPLIED
   - Historical Bar Index: Check Close[2] instead of Close[0]?
   - Bars Signal Valid: Stay active for 5 bars after becoming TRUE?
   - Profit Filter: Only fire when position is in profit?
   ↓
4. SIGNAL EVALUATION (every bar)
   - Condition TRUE or FALSE?
   ↓
5. BARS VALID TRACKING
   - If TRUE: Start validity window countdown
   - If within window: Signal considered valid
   ↓
6. PROFIT FILTER CHECK
   - Does current position P&L match filter?
   ↓
7. LOGIC GROUP EVALUATION
   - If AND-A: Are ALL AND-A signals valid?
   - If AND-B: Are ALL AND-B signals valid?
   - If OR: Is THIS signal valid?
   ↓
8. ORDER GENERATION
   - Entry Order (if Entry checkbox enabled)
   - Exit Order (if Exit checkbox enabled)
   ↓
9. STRATEGY EXECUTION
   - Direction filter (Long/Short)
   - Position management
   - Visual markers
```

### Component Hierarchy
```
SKELETON KEY STRATEGY
│
├── SIGNAL GROUPING: Threshold
│   ├── Signal Instance: Threshold A
│   │   ├── Configuration: SOURCE=Close, OPERATOR=>=, VALUE=0.0
│   │   ├── Entry/Exit: [x] Entry, [ ] Exit
│   │   ├── Tuners:
│   │   │   ├── Historical Bar Index = 0
│   │   │   ├── Bars Signal Valid = 0
│   │   │   ├── Profit Filter = ANY
│   │   │   ├── Entry Logic Group = AND-A
│   │   │   └── Exit Logic Group = OR
│   │   └── Evaluation Result: TRUE/FALSE → Entry Order
│   │
│   ├── Signal Instance: Threshold B
│   │   └── [Same structure as A]
│   │
│   └── Planned Instances: C, D, E
│
├── SIGNAL GROUPING: External Sources
│   ├── Signal Instance: External Sources A
│   │   ├── Configuration: SOURCE1=Close, OPERATOR=crossover, SOURCE2=Open
│   │   ├── Entry/Exit: [x] Entry, [ ] Exit
│   │   ├── Tuners:
│   │   │   ├── Source 1 Offset % = 0.0
│   │   │   ├── Source 2 Offset % = 0.0
│   │   │   ├── Historical Bar Index 1 = 0
│   │   │   ├── Historical Bar Index 2 = 1
│   │   │   ├── Bars Signal Valid = 0
│   │   │   ├── Profit Filter = ANY
│   │   │   ├── Entry Logic Group = AND-A
│   │   │   └── Exit Logic Group = OR
│   │   └── Evaluation Result: TRUE/FALSE → Entry Order
│   │
│   └── Planned Instances: B, C, D, E, F
│
└── STRATEGY MANAGEMENT
    ├── Direction: Long/Short
    ├── Pyramiding: 5 orders
    └── Visual Feedback
```

---

## 4. SIGNAL GROUPINGS - DETAILED

### 4.1 THRESHOLD SIGNALS

**Purpose**: Comparison-based conditional signals using SOURCE, OPERATOR, VALUE structure.

**Instances**: Currently A and B (partial), planned C, D, E

**Structure**: `{source} {operator} {value}`

#### 3-Part Comparison System
```
[SOURCE] [OPERATOR] [VALUE]
```

#### Part 1: SOURCE (Input Source)
The data source to evaluate:
- **Price data**: Close, Open, High, Low
- **Any on-chart indicator output**:
  - Stochastic K, Stochastic D
  - RSI, MACD, Volume
  - Moving Averages
  - Custom indicators
  - *Anything visible on the chart*

Uses Pine Script's `input.source()` function - same as TradingView alert system.

#### Part 2: OPERATOR (Dropdown)
The comparison operator:
- `<` (Less than)
- `>` (Greater than)
- `<=` (Less than or equal to)
- `>=` (Greater than or equal to)
- `==` (Equal to)

**Note**: Threshold signals do NOT include crossover/crossunder - use External Sources for that.

#### Part 3: VALUE (Float Input)
- Float/integer value to compare against
- User-defined threshold level
- Default: 0.0

#### Examples
```
Threshold A: Close >= 50000
Threshold B: RSI < 30
Threshold C: Volume > 1000000
```

---

### 4.2 EXTERNAL SOURCES SIGNALS

**Purpose**: Two-source comparison signals with crossover/crossunder support.

**Instances**: Currently A, planned B, C, D, E, F

**Structure**: `{source1} {operator} {source2}`

This is the BREAKTHROUGH feature that Threshold signals don't have - **crossover and crossunder detection**.

#### Two-Source Comparison System
```
[SOURCE 1] [OPERATOR] [SOURCE 2]
```

#### Source 1 (Input Source)
- Any on-chart data source
- Has percentage offset option (can add/subtract %)
- Has separate historical bar index

#### Operator (Dropdown)
Includes **all** comparison operators plus crossover detection:
- `<`, `>`, `<=`, `>=`, `==` (standard comparison)
- **`crossover`**: TRUE only when Source 1 crosses ABOVE Source 2
- **`crossunder`**: TRUE only when Source 1 crosses BELOW Source 2

#### Source 2 (Input Source)
- Any on-chart data source
- Has percentage offset option (can add/subtract %)
- Has separate historical bar index

#### Unique Features

**Percentage Offsets**:
- Source 1 Offset %: -100% to +100%
- Source 2 Offset %: -100% to +100%
- Applied before comparison
- Example: Close with +5% offset = Close * 1.05

**Dual Historical Bar Indices**:
- Historical Bar Index 1: Offset for Source 1 (default: 0)
- Historical Bar Index 2: Offset for Source 2 (default: 1)
- Allows comparing current bar vs previous bar, or any combination

#### Crossover/Crossunder Logic

**Implementation** (from code):
```pine
crossover:  src1_prev < src2_prev AND src1 > src2
crossunder: src1_prev > src2_prev AND src1 < src2
```

This is TRUE only on the **crossing bar**, not continuously like threshold comparisons.

#### Examples
```
External A: Close crossover Open
External B: EMA(9) crossunder EMA(21)
External C: Close > Open (with Close offset +2%, Open offset 0%)
External D: RSI[0] < RSI[1] (using historical bar indices)
```

---

### 4.3 SIGNAL EVALUATION BEHAVIOR

**CRITICAL DISTINCTION**:

**Threshold Signals**: **Conditional state checks** (continuous)
- Signal is TRUE whenever condition is met
- Signal is FALSE whenever condition is not met
- Signal **remains TRUE as long as condition stays true**

**Example**:
```
Threshold A: Close > 3000

Bar 1: Close = 2900 → FALSE
Bar 2: Close = 3100 → TRUE
Bar 3: Close = 3200 → TRUE (still true)
Bar 4: Close = 3150 → TRUE (still true)
Bar 5: Close = 2950 → FALSE
```

**External Sources with Crossover/Crossunder**: **Event detection** (single bar)
- Crossover/crossunder is TRUE only on the crossing bar
- After the crossing bar, condition goes back to FALSE (unless Bars Valid extends it)

**Example**:
```
External A: Close crossover Open

Bar 1: Close < Open → FALSE
Bar 2: Close crosses above Open → TRUE (crossover event!)
Bar 3: Close still > Open → FALSE (not a crossover anymore)
```

---

## 5. PARALLEL LOGIC GROUPS - CRITICAL INNOVATION

### Overview
The breakthrough feature of Skeleton Key: **Three completely isolated, parallel logic evaluation systems** that run simultaneously without waiting for each other.

### The Three Groups

#### 5.1 AND-A (Confluence Group A)
**Behavior**: ALL signals assigned to AND-A must be valid simultaneously to fire an entry/exit.

**Example**:
```
Threshold A: Close > 3000, Entry, Logic: AND-A
External A: Close crossover Open, Entry, Logic: AND-A

Result: Entry fires ONLY when BOTH conditions are valid at the same time
```

Creates a **confluence/confirmation system** within the AND-A group.

#### 5.2 AND-B (Confluence Group B)
**Behavior**: ALL signals assigned to AND-B must be valid simultaneously to fire an entry/exit.

**Example**:
```
Threshold B: RSI < 30, Entry, Logic: AND-B
External B: Volume > 1M, Entry, Logic: AND-B

Result: Entry fires ONLY when BOTH conditions are valid at the same time
```

Creates a **separate, independent confluence system** within the AND-B group.

**CRITICAL**: AND-A and AND-B groups **do NOT wait for each other**. They run in parallel.

#### 5.3 OR (Complete Independence)
**Behavior**: Each OR signal fires independently whenever its condition is valid.

**Example**:
```
Threshold C: Close < 2500, Entry, Logic: OR

Result: Entry fires whenever Close < 2500, regardless of any other signals
```

OR signals:
- Don't require confirmation
- Don't wait for other signals
- Fire immediately when condition is met
- Each OR signal acts like its own mini-strategy

---

### 5.4 Logic Group Isolation Rules

**AND-A signals**:
- Only care about OTHER AND-A signals
- Completely ignore AND-B signals
- Completely ignore OR signals

**AND-B signals**:
- Only care about OTHER AND-B signals
- Completely ignore AND-A signals
- Completely ignore OR signals

**OR signals**:
- Don't care about ANY other signals
- Completely independent
- Fire whenever their condition is valid

---

### 5.5 Parallel Execution Example

**Configuration**:
```
Threshold A: Close > 50000, Entry, AND-A
External A: Close crossover Open, Entry, AND-A

Threshold B: RSI < 30, Entry, AND-B
External B: Volume > 1M, Entry, AND-B

Threshold C: Close < 40000, Entry, OR
```

**What Happens on a Single Bar**:

**AND-A Group (Threshold A + External A)**:
- Evaluates: Are BOTH valid?
- If yes → Fires Entry #1
- If no → Does nothing

**AND-B Group (Threshold B + External B)** (runs in parallel):
- Evaluates: Are BOTH valid?
- If yes → Fires Entry #2
- If no → Does nothing
- Does NOT wait for AND-A group

**OR Signal (Threshold C)** (runs in parallel):
- Evaluates: Is it valid?
- If yes → Fires Entry #3
- Does NOT wait for anything

**Result with Pyramiding = 5**: You could have **3 simultaneous positions** from these three independent logic systems firing at different times or even on the same bar.

---

### 5.6 Logic Group Implementation

From the code (`skeleton key take 2.ps`):

**Entry Logic Groups**:
```pine
// Count how many signals are assigned to each entry group
entry_andA_count = (thresh_entry and thresh_entry_logic == "AND-A" ? 1 : 0) +
                   (ext_entry and ext_entry_logic == "AND-A" ? 1 : 0)

// Count how many signals are TRUE in each entry group
entry_andA_true = (thresh_signal_entry and thresh_entry_logic == "AND-A" ? 1 : 0) +
                  (ext_signal_entry and ext_entry_logic == "AND-A" ? 1 : 0)

// AND-A Entry: All AND-A signals must be true (and at least 1 must exist)
entry_andA_trigger = entry_andA_count > 0 and entry_andA_true == entry_andA_count

// OR Entry: Any OR signal can trigger independently
entry_or_trigger = (thresh_signal_entry and thresh_entry_logic == "OR") or
                   (ext_signal_entry and ext_entry_logic == "OR")

// Final entry signal (any of the 3 tracks can trigger)
entry_signal = entry_andA_trigger or entry_andB_trigger or entry_or_trigger
```

Same structure applies to exit logic groups.

---

### 5.7 Entry vs Exit Logic Independence

**CRITICAL CONCEPT**: Entry Logic and Exit Logic operate **independently** based on checkboxes.

**Example**:
```
Threshold A Configuration:
[x] Entry checked → Entry Logical Group is ACTIVE
[ ] Exit unchecked → Exit Logical Group is NULLIFIED (dropdown ignored)

Entry Logical Group: AND-A (active)
Exit Logical Group: OR (nullified, does nothing)
```

**Rules**:
- If only Entry checked: Exit Logic dropdown is ignored completely
- If only Exit checked: Entry Logic dropdown is ignored completely
- If both checked: Both logic systems are active independently

This allows signals to use different logic groups for entries vs exits.

---

## 6. STRATEGY TUNERS - SIGNAL PARAMETERS

These are the "tuning knobs" that modify the behavior of individual signals. Each signal instance has access to these tuners.

---

### 6.1 HISTORICAL BAR INDEX

**What it does**: Shifts which bar the signal evaluates - uses historical bar data instead of current bar.

**Default**: 0 (current bar)

**How it works**:

**Threshold Signals** (single Historical Bar Index):
```
Threshold A: Close > 3000
Historical Bar Index = 0

Evaluates: Close[0] > 3000  (current bar's closing price)
```

```
Threshold A: Close > 3000
Historical Bar Index = 2

Evaluates: Close[2] > 3000  (closing price from 2 bars ago)
```

**External Sources Signals** (dual Historical Bar Indices):
```
External A: Close crossover Open
Historical Bar Index 1 = 0  (Source 1: Close[0])
Historical Bar Index 2 = 1  (Source 2: Open[1])

Compares current Close against previous Open
```

**Use cases**:
- Delayed signals
- Historical confirmation ("Was RSI oversold 3 bars ago?")
- Past state checks
- Comparing current vs previous bar values

---

### 6.2 BARS SIGNAL IS VALID

**What it does**: Creates a validity window - once signal goes TRUE, it stays "active/valid" for X bars even if condition falls back to FALSE.

**Tooltip**: "Signal stays active for N bars after becoming true. Allows AND conditions to sync up."

**Default**: 0 (signal must be true/valid on current bar)

**This is signal memory/buffer functionality.**

#### How It Works - Implementation from Code

```pine
// Bars valid tracking
var int thresh_bars_since_true = 999999

if thresh_raw  // If raw condition is TRUE
    thresh_bars_since_true := 0  // Reset counter
else
    thresh_bars_since_true := thresh_bars_since_true + 1  // Increment counter

thresh_signal_valid = thresh_enabled and thresh_bars_since_true <= thresh_bars_valid
```

**Logic**:
- When raw condition becomes TRUE → Counter resets to 0
- When raw condition is FALSE → Counter increments
- Signal is "valid" if counter ≤ bars_valid setting

#### Detailed Example - Signal Validity Window

**Scenario Setup**:
```
Threshold A: Close > 50000
  [x] Entry
  Entry Logic: AND-A
  Bars Signal is Valid: 5

External A: Close crossover Open
  [x] Entry
  Entry Logic: AND-A
  Bars Signal is Valid: 0

Both must be valid for AND-A to fire entry
```

**Timeline**:

**Bar 1**:
- Threshold A: Close = 51000 → Raw condition **TRUE**
- Threshold A bars_since_true: 0 (reset)
- Threshold A valid: TRUE (0 <= 5)
- External A: No crossover → FALSE
- AND-A: Not all signals valid → No entry

**Bar 2**:
- Threshold A: Close = 52000 → Raw condition **TRUE**
- Threshold A bars_since_true: 0 (stays reset)
- Threshold A valid: TRUE (0 <= 5)
- External A: No crossover → FALSE
- AND-A: Not all signals valid → No entry

**Bar 3**:
- Threshold A: Close = 48000 → Raw condition **FALSE** (price dropped!)
- Threshold A bars_since_true: 1 (incremented from 0)
- **Threshold A valid: STILL TRUE** (1 <= 5, within validity window!)
- External A: No crossover → FALSE
- AND-A: Not all signals valid → No entry

**Bar 4**:
- Threshold A: Close = 47000 → Raw condition **FALSE**
- Threshold A bars_since_true: 2
- **Threshold A valid: STILL TRUE** (2 <= 5)
- External A: No crossover → FALSE
- AND-A: Not all signals valid → No entry

**Bar 5**:
- Threshold A: Close = 46000 → Raw condition **FALSE**
- Threshold A bars_since_true: 3
- **Threshold A valid: STILL TRUE** (3 <= 5)
- External A: Close crosses above Open → **TRUE**
- **AND-A: BOTH signals valid → ✅ ENTRY FIRES!**
- Even though Threshold A raw condition is FALSE, its validity window keeps it active!

**Bar 6**:
- Threshold A: Close = 45000 → Raw condition **FALSE**
- Threshold A bars_since_true: 4
- **Threshold A valid: STILL TRUE** (4 <= 5, last bar!)
- External A: No crossover (not an event anymore) → FALSE
- AND-A: External no longer valid → No entry

**Bar 7**:
- Threshold A: Close = 44000 → Raw condition **FALSE**
- Threshold A bars_since_true: 5
- **Threshold A valid: STILL TRUE** (5 <= 5, exactly at limit!)
- External A: FALSE
- AND-A: External no longer valid → No entry

**Bar 8**:
- Threshold A: Close = 43000 → Raw condition **FALSE**
- Threshold A bars_since_true: 6
- **Threshold A valid: FALSE** (6 > 5, validity expired!)
- External A: FALSE
- AND-A: Threshold A no longer valid → No entry

**Key Insight**: The signal stays "active" for X bars after first becoming TRUE, regardless of whether the condition falls back to FALSE. This allows slower signals to "wait" for faster signals in AND logic groups.

**Use cases**:
- Allow slower signals to "catch up" with faster signals for confluence
- Create flexible confirmation systems without requiring perfect bar-level synchronization
- Extend crossover events (which only last 1 bar) to have a longer validity window
- Build signals that "remember" recent states

---

### 6.3 PROFIT FILTER

**What it does**: Filters signals based on current position profit/loss state.

**Tooltip**: "Signal only active if profit filter matches current position state"

**Default**: ANY

**Options**:

**ANY** (Default):
- Signal fires regardless of current position P&L
- No filtering based on profit/loss

**PROFIT**:
- Signal only fires when current position is profitable (in the green)
- **Use cases**:
  - Only add to winning trades (pyramiding)
  - Only exit when in profit (take profit scenarios)
  - Prevent adding risk to losing positions

**LOSS**:
- Signal only fires when current position is at a loss (in the red)
- **Use cases**:
  - Average down on losing trades
  - Only exit when in loss (stop loss scenarios)
  - DCA (Dollar Cost Averaging) into losing positions

#### Implementation (from code)

```pine
f_profit_filter(string filter) =>
    if filter == "ANY"
        true
    else if filter == "PROFIT"
        strategy.position_size != 0 ? strategy.openprofit > 0 : true
    else if filter == "LOSS"
        strategy.position_size != 0 ? strategy.openprofit < 0 : true
    else
        true
```

**Logic**:
- If no position open: Always returns TRUE (allows first entry)
- If position open: Checks `strategy.openprofit` against filter
  - PROFIT: Only TRUE if `strategy.openprofit > 0`
  - LOSS: Only TRUE if `strategy.openprofit < 0`

#### Example
```
Threshold A: RSI < 30, Entry, Profit Filter = LOSS
Threshold B: RSI > 70, Exit, Profit Filter = PROFIT

Entry signal (A) only fires when current position is losing
Exit signal (B) only fires when current position is profitable
```

---

### 6.4 ENTRY/EXIT CHECKBOXES

**Entry Checkbox**:
- Enables/disables this signal for entry orders
- When unchecked: Entry Logic Group dropdown is nullified

**Exit Checkbox**:
- Enables/disables this signal for exit orders
- When unchecked: Exit Logic Group dropdown is nullified

**Both checked**: Signal can trigger both entries AND exits (with independent logic groups)

---

### 6.5 ENTRY LOGICAL GROUP

**What it does**: Assigns this signal's entry behavior to one of three logic groups.

**Options**: AND-A, AND-B, OR

**Note**: Only active when Entry checkbox is checked.

---

### 6.6 EXIT LOGICAL GROUP

**What it does**: Assigns this signal's exit behavior to one of three logic groups.

**Options**: AND-A, AND-B, OR

**Note**: Only active when Exit checkbox is checked.

---

### 6.7 SOURCE OFFSETS (External Sources Only)

**Source 1 Offset %**: -100% to +100%
**Source 2 Offset %**: -100% to +100%

**What it does**: Applies percentage offset to source values before comparison.

**Formula**: `source_value * (1 + offset / 100)`

**Examples**:
```
Close with +5% offset = Close * 1.05
Open with -2% offset = Open * 0.98
```

**Use cases**:
- Create threshold bands around price levels
- Adjust moving average values for comparison
- Build dynamic support/resistance levels

---

## 7. EXECUTION MODEL

### Bar-by-Bar Execution
Pine Script strategies execute once per historical bar, and multiple times per realtime bar. Skeleton Key follows this model:

1. **New bar closes**
2. **Signal evaluation**:
   - Each signal evaluates its raw condition
   - Threshold: `source[hist_bar] operator value`
   - External: `source1[hist_bar1] operator source2[hist_bar2]` (with offsets and crossover logic)
3. **Bars Valid tracking**:
   - If raw condition TRUE → Reset counter to 0
   - If raw condition FALSE → Increment counter
   - Signal is "valid" if counter <= bars_valid setting
4. **Profit Filter check**:
   - Does current position P&L match the filter?
5. **Logic Group evaluation**:
   - AND-A: Count assigned signals, count valid signals, trigger if counts match
   - AND-B: Count assigned signals, count valid signals, trigger if counts match
   - OR: Any OR signal valid triggers independently
6. **Order generation**:
   - If logic group triggers + Entry checkbox enabled + direction matches → Entry order
   - If logic group triggers + Exit checkbox enabled + position exists → Exit order
7. **Strategy execution**:
   - `strategy.entry()` or `strategy.close()` called
   - Visual markers plotted

### State vs Event Detection

**Threshold Signals** (State checking):
- Continuously TRUE while condition is met
- Example: `Close > 3000` is TRUE on every bar where Close > 3000

**External Sources with Crossover/Crossunder** (Event detection):
- TRUE only on the crossing bar
- Example: `Close crossover Open` is TRUE only when the cross happens
- After the crossing bar, returns to FALSE
- Use Bars Valid to extend the signal beyond the single crossing bar

### Signal Validity Timing

**Validity window lifecycle**:
1. **Raw condition becomes TRUE** → Counter resets to 0, signal valid
2. **Raw condition goes FALSE** → Counter starts incrementing, signal still valid if counter <= bars_valid
3. **Counter exceeds bars_valid** → Signal no longer valid
4. **Raw condition becomes TRUE again** → Counter resets to 0, fresh validity window starts

**Validity windows don't "stack"** - each TRUE trigger starts a fresh X-bar window.

---

## 8. CONCRETE EXAMPLES

### Example 1: Simple Threshold Entry (OR Logic)
```
Configuration:
Threshold A:
  SOURCE: Close
  OPERATOR: >=
  VALUE: 50000
  [x] Entry, [ ] Exit
  Entry Logic: OR
  Historical Bar Index: 0
  Bars Signal Valid: 0
  Profit Filter: ANY

Behavior:
- Entry order fires whenever Close >= 50000
- No exit signal configured
- OR logic: Fires independently, doesn't wait for other signals
- No validity window: Condition must be true on current bar
- No profit filtering: Fires regardless of position P&L
```

---

### Example 2: Crossover with Validity Window
```
Configuration:
External A:
  SOURCE 1: Close
  OPERATOR: crossover
  SOURCE 2: Open
  [x] Entry, [ ] Exit
  Entry Logic: OR
  Bars Signal Valid: 3

Behavior:
- Entry fires when Close crosses above Open
- Crossover is TRUE only on crossing bar
- BUT validity window extends it for 3 bars
- Result: If Close crosses above Open on bar 1, signal stays valid through bar 4
- Allows the crossover "event" to remain active longer
```

---

### Example 3: Multi-Signal AND-A Confluence
```
Configuration:
Threshold A:
  SOURCE: Close
  OPERATOR: >
  VALUE: 50000
  [x] Entry, [ ] Exit
  Entry Logic: AND-A
  Bars Signal Valid: 0

External A:
  SOURCE 1: RSI
  OPERATOR: crossover
  SOURCE 2: 30 (constant via threshold)
  [x] Entry, [ ] Exit
  Entry Logic: AND-A
  Bars Signal Valid: 0

Behavior:
- Entry fires ONLY when BOTH are valid simultaneously:
  - Close > 50000 (continuous state check)
  - RSI crossover 30 (single-bar event)
- Problem: Crossover only lasts 1 bar, Close > 50000 might not be true on that exact bar
- Solution: Use Bars Valid on one or both signals to create sync window
```

---

### Example 4: Parallel Logic Groups with Pyramiding
```
Configuration:
Threshold A: Close > 50000, Entry, AND-A, Valid: 5
External A: Close crossover Open, Entry, AND-A, Valid: 0

Threshold B: RSI < 30, Entry, AND-B, Valid: 0
External B: Volume > 1000000, Entry, AND-B, Valid: 0

Strategy Settings:
Pyramiding: 5 orders allowed
Direction: Long

Behavior:
- Two independent entry systems running in parallel
- Entry System 1 (AND-A):
  - Fires when Close > 50000 (valid for 5 bars) AND Close crossover Open
  - Close breakout "waits" for crossover confirmation
- Entry System 2 (AND-B):
  - Fires when RSI < 30 AND Volume > 1M
  - Separate oversold + volume confirmation system
- Both systems can fire on same bar or different bars
- Up to 2 simultaneous long positions from these independent systems
- Neither system waits for the other
```

---

### Example 5: Profit Filtering for Pyramiding
```
Configuration:
Threshold A:
  SOURCE: RSI
  OPERATOR: <
  VALUE: 30
  [x] Entry
  Entry Logic: OR
  Profit Filter: LOSS

Threshold B:
  SOURCE: RSI
  OPERATOR: >
  VALUE: 70
  [x] Exit
  Exit Logic: OR
  Profit Filter: PROFIT

Behavior:
- Entry signal (A) ONLY fires when:
  - RSI < 30 (oversold)
  - AND current position is losing
  - Result: Average down / add to losing position when oversold

- Exit signal (B) ONLY fires when:
  - RSI > 70 (overbought)
  - AND current position is profitable
  - Result: Take profit on overbought, but ONLY if in profit

Use Case:
Asymmetric behavior - DCA into losers on dips, but only exit winners on strength.
```

---

### Example 6: Offset Bands with External Sources
```
Configuration:
External A:
  SOURCE 1: Close
  SOURCE 1 OFFSET: +2%
  OPERATOR: >
  SOURCE 2: Open
  SOURCE 2 OFFSET: -2%
  [x] Entry
  Entry Logic: OR

Behavior:
- Compares: (Close * 1.02) > (Open * 0.98)
- Creates a 4% total band between adjusted Close and Open
- Entry fires when Close with +2% buffer exceeds Open with -2% reduction
- Useful for filtering out noise and requiring stronger signals
```

---

## 9. SYSTEM BOUNDARIES

### What is Fully Implemented (in skeleton key take 2.ps)

**Signal Groupings**:
- ✅ Threshold Signal A: Complete
- ⚠️ Threshold Signal B: Inputs exist, logic partially implemented
- ❌ Threshold Signals C, D, E: Planned, not yet implemented

- ✅ External Sources Signal A: Complete with crossover/crossunder
- ❌ External Sources Signals B, C, D, E, F: Planned, not yet implemented

**Logic Groups**:
- ✅ AND-A, AND-B, OR: Fully implemented for both entry and exit
- ✅ Parallel execution model: Complete
- ✅ Entry/Exit independence: Complete

**Strategy Tuners**:
- ✅ Historical Bar Index: Complete (single for Threshold, dual for External Sources)
- ✅ Bars Signal Valid: Complete with counter tracking
- ✅ Profit Filter (ANY/PROFIT/LOSS): Complete
- ✅ Entry/Exit checkboxes: Complete
- ✅ Logic Group assignment: Complete
- ✅ Source Offsets (External Sources only): Complete

**Strategy Management**:
- ✅ Direction filter (Long/Short): Complete
- ✅ Pyramiding: Configured (5 orders)
- ✅ Visual feedback: Entry/exit markers, debug data window

---

### What is Planned / Not Yet Documented

**Signal Groupings** (mentioned in various docs but not in current prototype):
- Range Signals (A, B, C, D, E)
- Slope Signals (A, B, C, D, E)
- Divergence Signals
- KROWN CROSS Signals

**Strategy Management** (mentioned but not detailed):
- Take Profit / Stop Loss levels
- Trailing Stops
- Risk Management
- Time/Session Filters
- Additional position sizing options

---

### Known Limitations

**Crossover/Crossunder**:
- ✅ Available in External Sources signals
- ❌ NOT available in Threshold signals
- Threshold signals are state checks only, not event detection

**Current Implementation Status**:
- Only 1 Threshold signal fully functional (A)
- Only 1 External Sources signal fully functional (A)
- Planned: 5 Threshold instances + 6 External Sources instances

---

## 10. QUICK REFERENCE

### File Locations

**Working Prototype**:
- `F:\Kirbys litter box\clean litter\skeleton key\skeleton key  take 2.ps` (646 lines)

**Documentation**:
- `F:\Kirbys litter box\clean litter\skeleton key\SKELETON_KEY_OVERVIEW.md` (579 lines)
- `F:\Kirbys litter box\clean litter\skeleton key\Pine_Script_v6_Strategy_Master_Reference_Guide.md`

**Templates & Building Blocks**:
- `F:\Kirbys litter box\clean litter\skeleton key\skellyBuildingBlocksTemplatesTitsPUS\`
  - `hyper_configurable_strategy_template.pine`
  - `hyper_configurable_indicator_template.pine`
  - `universal_functions.pine`
  - `HYPER_CONFIGURABLE_SYSTEM.md`
  - `OPTIMIZATION_GUIDE.md`

**Visual Examples** (VERY IMPORTANT - reference these!):
- `F:\Kirbys litter box\clean litter\skeleton key\example pics sof input options and sole influence behind skeleton key external\` (40+ screenshots)
- Screenshots show input configurations, logic groups, threshold parameters, validity windows, profit filters, etc.

---

### Key Concepts Summary

**Architecture**:
- ONE template → INFINITE strategies via configuration
- Configuration over hard-coding
- Systematic optimization-focused design

**Signal Groupings**:
- Threshold: `source operator value` (state checking)
- External Sources: `source1 operator source2` (includes crossover/crossunder event detection)

**Logic Groups**:
- AND-A: Confluence group A (all must be valid)
- AND-B: Confluence group B (all must be valid, independent from AND-A)
- OR: Complete independence (fires when valid)

**Signal Tuners**:
- Historical Bar Index: Time-shift evaluation (dual indices for External Sources)
- Bars Signal Valid: Validity window (signal memory/buffer)
- Profit Filter: ANY / PROFIT / LOSS
- Source Offsets: Percentage adjustments (External Sources only)
- Entry/Exit checkboxes: Control which logic system is active
- Logic Group assignment: AND-A / AND-B / OR

**Signal Evaluation**:
- Threshold: Conditional state checking (continuous while true)
- External crossover/crossunder: Event detection (single bar)
- Bars Valid extends signals beyond their raw condition duration
- Profit Filter gates signals based on position P&L

**Pyramiding**:
- Parallel logic groups enable multiple simultaneous positions
- Each logic group acts like an independent strategy within the same script

---

### Visual ASCII Reference

```
SKELETON KEY ARCHITECTURE

┌─────────────────────────────────────────────────────────────┐
│                   SKELETON KEY STRATEGY                       │
│              (skeleton key  take 2.ps - 646 lines)            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  SIGNAL GROUPINGS                             │
│  ┌─────────────┐           ┌─────────────────┐              │
│  │ THRESHOLD   │           │ EXTERNAL SOURCES│              │
│  │  A, (B)     │           │       A         │              │
│  │             │           │                 │              │
│  │ source op   │           │ src1 op src2    │              │
│  │  value      │           │ + crossover/    │              │
│  │             │           │   crossunder    │              │
│  │ (Planned:   │           │                 │              │
│  │  C, D, E)   │           │ (Planned:       │              │
│  └─────────────┘           │  B, C, D, E, F) │              │
│                            └─────────────────┘              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    SIGNAL TUNERS                              │
│  • Historical Bar Index (time-shift)                         │
│  • Bars Signal Valid (validity window/memory)                │
│  • Profit Filter (ANY/PROFIT/LOSS)                           │
│  • Source Offsets (External Sources: %)                      │
│  • Entry/Exit checkboxes                                     │
│  • Logic Group assignment (AND-A/AND-B/OR)                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              PARALLEL LOGIC GROUPS                            │
│                                                               │
│  ┌─────────┐      ┌─────────┐      ┌─────────┐              │
│  │ AND-A   │      │ AND-B   │      │   OR    │              │
│  │Confluence│      │Confluence│      │Independent│            │
│  │Group A  │      │Group B  │      │ Signals │              │
│  │         │      │         │      │         │              │
│  │All must │      │All must │      │Each fires│             │
│  │be valid │      │be valid │      │when valid│             │
│  └─────────┘      └─────────┘      └─────────┘              │
│       ↓                ↓                 ↓                   │
│  (parallel)       (parallel)        (parallel)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   ORDER GENERATION                            │
│             Entry Orders  |  Exit Orders                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                STRATEGY EXECUTION                             │
│  • Direction Filter (Long/Short)                             │
│  • Pyramiding (5 orders)                                     │
│  • Visual Feedback (entry/exit markers)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## USAGE INSTRUCTIONS FOR LLMs

When this description is provided to you (an LLM):

1. **Understand the architecture**: Skeleton Key is a single Pine Script strategy with highly parameterized configuration based on `skeleton key  take 2.ps`

2. **Know the terminology**:
   - SIGNAL = complete configuration
   - ORDER = result of signal being valid
   - TUNER = parameter that modifies signal behavior

3. **Recognize the innovation**:
   - Three parallel logic groups (AND-A, AND-B, OR) running simultaneously
   - External Sources with crossover/crossunder (Threshold signals don't have this)
   - Bars Valid creates signal "memory" for confluence systems

4. **Understand signal evaluation**:
   - Threshold: Conditional state checks (continuous while true)
   - External crossover/crossunder: Event detection (single bar, extend with Bars Valid)
   - Bars Valid: Validity window counter system

5. **Know what's implemented**:
   - Threshold A: ✅ Full
   - Threshold B: ⚠️ Partial
   - External Sources A: ✅ Full (with crossover/crossunder)
   - C, D, E, F instances: Planned, not yet built

6. **Apply the tuners**:
   - Historical Bar Index: Time-shift (dual indices for External Sources)
   - Bars Signal Valid: Memory/buffer with counter tracking
   - Profit Filter: P&L-based gating (ANY/PROFIT/LOSS)
   - Source Offsets: Percentage adjustments (External Sources only)

7. **Respect isolation**: AND-A, AND-B, and OR groups don't interact - completely independent

**When helping users with Skeleton Key**:
- Reference `skeleton key  take 2.ps` as the working prototype
- Remember External Sources have crossover/crossunder (Threshold doesn't)
- Understand Bars Valid uses a counter system (resets to 0 when TRUE, increments when FALSE)
- Know that only A instances are fully implemented, B-F are planned expansions
- **VERY IMPORTANT**: Reference the screenshot examples in the skeleton key folders - they show the actual input configurations

---

**Last Updated**: 2025-12-26
**Status**: Comprehensive LLM description based on `skeleton key  take 2.ps` working prototype
**Source**: `F:\Kirbys litter box\clean litter\skeleton key\skeleton key  take 2.ps`
