# Pine Script Reverse Engineering Guide

## 1. Introduction
This guide provides a comprehensive analysis of the "reverse engineered" Pine Script indicators within this directory. Reverse engineering in this context refers to algebraically isolating the price variable (`close`, or a `test price`) from a technical indicator's formula. Instead of asking "What is the RSI given the current price?", reverse engineered scripts ask "What exactly must the price be to reach an RSI of 70?".

This approach allows for the calculation of exact target prices, reversal levels, and crossover points on either the **current forming candle** or projected onto the **next candle**.

## 2. On-Chart (`overlay = true`) vs. On-Pane (`overlay = false`)

Understanding the distinction in display methodology is crucial for these scripts.

### On-Pane (`overlay = false`)
- **Display**: Rendered in a separate window below the main price chart.
- **Function**: These scripts plot the actual oscillator values (e.g., RSI on a 0-100 scale, MACD histogram) visually. 
- **Reverse Data**: The calculated reverse-engineered prices (the targets) are typically presented to the user via an information panel (InfoBox/Table) or as hovering tooltips. The main visualization remains the traditional oscillator.
- *Example*: `Reverse_Cutlers_RsI_on_pane.pine` plots the RSI line but uses a label box to state "Continues rising above: $65,000".

### On-Chart (`overlay = true`)
- **Display**: Rendered directly over the price candles.
- **Function**: These scripts "paint the oscillators onto the chart" by converting the oscillator's scale levels (like overbought 80, oversold 20, midline 50) into their exact equivalent price points and plotting them as dynamic channels or bands alongside the price action.
- **Reverse Data**: The visual lines on the chart *are* the calculated reverse-engineered reversal levels.
- *Example*: `Reverse Cutlers Relative Strength Index On Chart.pine` takes the "Critical Bull", "Control Bear", and alert levels of the RSI, calculates what price would hit them, and plots those prices as continuous lines over the candles. 

### Key Differences When Both Exist
When an indicator has both versions (e.g., `reverse_pmarp.pine` and `reverse_pmarp_onchart.pine`), the core mathematical calculation is identical. The difference lies entirely in the **visual mapping**:
- The pane version normalizes price into an oscillator bound.
- The chart version expands oscillator bounds into absolute price bands.

## 3. The Mathematical Logic

The core concept is algebraic manipulation. Let's look at the foundational math.

### Simple Moving Average (SMA) Target
The formula for SMA over length $n$ is:
$$SMA = \frac{\sum_{i=1}^{n-1} P_{i} + P_{test}}{n}$$
Where $\sum_{i=1}^{n-1} P_{i}$ is the sum of previous confirmed close prices, and $P_{test}$ is the current/next price.
To find the exact price needed to hit a target SMA level:
$$P_{test} = (SMA_{target} \times n) - \sum_{i=1}^{n-1} P_{i}$$

### Cutlers RSI Target
Cutler's RSI uses simple moving averages of Up moves ($U$) and Down moves ($D$).
$$RSI = 100 - \frac{100}{1 + \frac{SMA(U)}{SMA(D)}}$$
By isolating the current upward or downward move required to reach a specific RSI target, the scripts deduce the exact `close` price needed.

### CT Moving Average Crossover Indicator (The "Beast")
This highly dynamic script takes reverse engineering to the extreme by calculating the exact intersection price of *any two* moving averages out of 9 user-defined ones, supporting SMA, EMA, WMA, RMA, HMA, and LSMA.

To find the crossover price of two moving averages (e.g., an SMA and an EMA), the script equates their next-value formulas:
$$SMA_{next}(P_{cross}) = EMA_{next}(P_{cross})$$
It then algebraically isolates $P_{cross}$. This results in massive, complex algorithmic formulas. For instance, the script contains specific functions like `hmaSmaCross`, `hmaExpCross`, and `lsmaWmaCross`, which utilize the mathematical expansions of Hull, Least Squares, and Weighted moving averages to isolate the intersection price point.

### Current Candle vs. Next Candle Projection
Many of these scripts feature a setting to toggle between calculating for the **Current bar** or **Next bar**.
- **Current Bar**: Uses the historical data up to `close[1]` and treats the real-time fluctuating `close` as the variable $P_{test}$. 
- **Next Bar**: Treats the current bar as confirmed history (using `close[0]` in the historical sum) and calculates what the required open/close will be for the *upcoming* unformed candle.

## 4. Guide for Future Agents: Applying Logic to Any Indicator

Future AI agents can apply this methodology to any custom indicator by following these steps:

1. **Identify the Core Formula**: Write out the mathematical formula of the indicator.
2. **Isolate the Variable**: Separate the historical, confirmed data (which acts as a constant) from the current unconfirmed price variable ($P_{test}$).
3. **Define the Target**: Set the formula equal to your target condition (e.g., $Indicator = 70$, or $FastMA = SlowMA$).
4. **Solve for Price**: Algebraically isolate $P_{test}$. 
5. **Handle Edge Cases**: Ensure your Pine Script implementation protects against division-by-zero (e.g., when the denominator in a crossover calculation becomes 0 because the slopes are perfectly parallel).
6. **Implement UI**: Decide whether to plot the result as an absolute price level on the chart (`overlay=true`) or present it in an information table/tooltip (`overlay=false`).

## 5. Recommendations for Enhancements

To further enhance these scripts and their analytical depth, the following improvements are recommended:

### Enhance Measurements
- **Incorporate Volume**: Add Volume Weighted Average Price (VWAP) bounds or volume-weighted moving averages (VWMA) to the crossover matrix.
- **Volatility Integration**: Integrate ATR (Average True Range) to show not just the exact reversal price, but the probability of reaching it within the current candle based on average volatility.
- **Multi-Timeframe (MTF) Targets**: Calculate what the current timeframe's price needs to be to cause a crossover on a *higher* timeframe (e.g., what price on the 1H chart causes a daily MACD cross).

### UI Modernization: Upgrading Info Panels
Many of the older scripts use basic string concatenation inside `label.new()` to create crude text boxes. Pine Script v6 supports advanced `table` objects, which should be utilized to create good-looking, structured matrices.

**On-Pane Table Recommendation**:
- Place a subtle `table` in the `position.bottom_right` or `position.top_right`.
- Use columns: `[Target Level] | [Required Price] | [Distance %]`.
- Dynamically color the cells: green if the required price is below current (easy to hit for a bull), red if above.

**On-Chart Table Recommendation**:
- Use `table` with `frame_color` and `border_width`.
- Incorporate `color.from_gradient()` for the table backgrounds based on how close the current price is to the crossover/reversal level. 
- Example format for the CT Moving Average Crossover:
  ```
  | Pair | MA 1 | MA 2 | Crossover Price | Condition |
  |------|------|------|-----------------|-----------|
  | #3   | SMA  | EMA  | 65,400.50       | Close <   |
  ```
Using tables prevents text overlapping and provides a much cleaner, premium aesthetic aligned with modern web and charting standards.
