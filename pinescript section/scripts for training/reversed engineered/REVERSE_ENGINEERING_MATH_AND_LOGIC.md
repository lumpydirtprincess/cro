# Pine Script Reverse Engineering: Mathematical and Logic Guide

This guide provides a comprehensive mathematical, architectural, and visual explanation of the reverse-engineered technical indicators located in this directory. 

Historically, technical analysis has been **reactive**:
$$\text{Price} \longrightarrow \text{Indicator Calculation} \longrightarrow \text{Indicator Value}$$
Reverse engineering transforms this into a **proactive** methodology:
$$\text{Target Indicator Value} \longrightarrow \text{Algebraic Inversion} \longrightarrow \text{Required Price Target}$$

By solving technical indicators backwards, we determine the exact closing price needed on the **current candle** (real-time fluctuating) or the **next candle** (projected) to trigger specific indicator values, zero crossings, or moving average crossovers.

---

## 🏛️ On-Chart (`overlay = true`) vs. On-Pane (`overlay = false`)

The fundamental difference between these two indicator types lies entirely in the **visual mapping of the mathematical output**.

### 1. On-Pane Indicators (`overlay = false`)
* **Display Style**: Plotted in a separate workspace window beneath the main price chart.
* **Visualization**: Plots the standard, normalized oscillator lines (e.g., RSI on a scale of $0$ to $100$, Stochastic $\%K$ and $\%D$, MACD histogram).
* **Target Delivery**: Because the vertical axis represents the oscillator value, the reverse-engineered price targets cannot be plotted as lines directly on the oscillator pane. Instead, they are presented to the user via floating text labels, info boxes, or data tables.
* **Use Case**: Best for traders who want to preserve a clean main chart and are accustomed to viewing traditional oscillators, using the text overlay to read specific price levels.
* **Example**: `Reverse_Cutlers_RsI_on_pane.pine` plots Cutler's RSI on a $0\text{--}100$ scale and displays crossover levels in an information box.

### 2. On-Chart Indicators (`overlay = true`)
* **Display Style**: Plotted directly over the main price candles.
* **Visualization**: Takes the static threshold levels of the oscillator (e.g., RSI Overbought at $70$, Midline at $50$, Oversold at $30$) and converts them into their absolute price equivalents for each bar. These price equivalents are plotted as dynamic, bending bands or channels alongside price action.
* **Target Delivery**: The visual bands on the chart *are* the calculated price levels. The indicator "paints the oscillator onto the price chart."
* **Use Case**: Ideal for visual traders who want to see support, resistance, and breakout boundaries derived directly from oscillator math without looking down at a separate pane.
* **Example**: `Reverse Cutlers Relative Strength Index On Chart.pine` plots the RSI overbought, midline, and oversold price equivalents as bands around the price candles.

---

## 🧮 Detailed Mathematical Derivations

To reverse engineer any indicator, we isolate the current price variable $P$ (representing the close of the current bar) from the indicator's algebraic equation. Let $P_i$ denote historical close prices (where $P_1 = \text{close}[1]$, $P_2 = \text{close}[2]$, etc.).

### 1. Simple Moving Average (SMA)
The formula for an SMA of length $N$ on the current bar is:
$$\text{SMA} = \frac{P + \sum_{i=1}^{N-1} P_i}{N}$$
Let $S_{prev} = \sum_{i=1}^{N-1} P_i$ be the sum of the previous $N-1$ close prices. To find the price $P$ required to reach a target SMA value ($T_{\text{SMA}}$):
$$T_{\text{SMA}} = \frac{P + S_{prev}}{N} \implies P = N \cdot T_{\text{SMA}} - S_{prev}$$

---

### 2. Exponential Moving Average (EMA)
The EMA formula uses a multiplier $\alpha = \frac{2}{N+1}$. On the current bar:
$$\text{EMA} = \alpha \cdot P + (1 - \alpha) \cdot \text{EMA}_{prev}$$
To find the price $P$ required to reach a target EMA value ($T_{\text{EMA}}$):
$$T_{\text{EMA}} = \alpha \cdot P + (1 - \alpha) \cdot \text{EMA}_{prev}$$
$$P = \frac{T_{\text{EMA}} - (1 - \alpha) \cdot \text{EMA}_{prev}}{\alpha}$$

---

### 3. Relative Moving Average (RMA)
The RMA (Wilder's Moving Average) is mathematically identical to an EMA but uses $\alpha = \frac{1}{N}$.
$$P = \frac{T_{\text{RMA}} - (1 - \alpha) \cdot \text{RMA}_{prev}}{\alpha}$$

---

### 4. Weighted Moving Average (WMA)
A WMA of length $N$ assigns linearly decreasing weights ($N, N-1, \ldots, 1$) to prices. On the current bar:
$$\text{WMA} = \frac{N \cdot P + \sum_{i=1}^{N-1} (N-i) \cdot P_i}{\text{Norm}(N)}$$
Where the normalization factor (sum of weights) is:
$$\text{Norm}(N) = \frac{N(N+1)}{2}$$
Let $W_{prev} = \sum_{i=1}^{N-1} (N-i) \cdot P_i$. To find the price $P$ required to reach a target WMA value ($T_{\text{WMA}}$):
$$T_{\text{WMA}} = \frac{N \cdot P + W_{prev}}{\text{Norm}(N)} \implies P = \frac{T_{\text{WMA}} \cdot \text{Norm}(N) - W_{prev}}{N}$$

---

### 5. Hull Moving Average (HMA)
The HMA is a highly complex moving average that double-smoothes price using WMAs to reduce lag:
$$\text{HMA} = \text{WMA}\left(2 \cdot \text{WMA}(Price, N/2) - \text{WMA}(Price, N), \sqrt{N}\right)$$
Let $L_1 = \lfloor N/2 \rfloor$, $L_2 = N$, and $L_3 = \lfloor \sqrt{N} \rfloor$. We represent each WMA component on the current bar:
$$W_1 = \text{WMA}(Price, L_1) = \frac{L_1 \cdot P + W_{prev,1}}{\text{Norm}(L_1)}$$
$$W_2 = \text{WMA}(Price, L_2) = \frac{L_2 \cdot P + W_{prev,2}}{\text{Norm}(L_2)}$$
The raw combination series is:
$$\text{RawHMA} = 2 \cdot W_1 - W_2 = P \cdot A_{raw} + B_{raw}$$
Where:
$$A_{raw} = \frac{2 L_1}{\text{Norm}(L_1)} - \frac{L_2}{\text{Norm}(L_2)}$$
$$B_{raw} = \frac{2 W_{prev,1}}{\text{Norm}(L_1)} - \frac{W_{prev,2}}{\text{Norm}(L_2)}$$
Now, the outer WMA of length $L_3$ is applied to the $\text{RawHMA}$ series:
$$\text{HMA} = \frac{L_3 \cdot \text{RawHMA}_0 + \sum_{i=1}^{L_3-1} (L_3 - i) \cdot \text{RawHMA}_i}{\text{Norm}(L_3)}$$
Let $C = \sum_{i=1}^{L_3-1} (L_3 - i) \cdot \text{RawHMA}_i$ be the historical sum. Substituting $\text{RawHMA}_0 = P \cdot A_{raw} + B_{raw}$:
$$\text{HMA} = \frac{L_3(P \cdot A_{raw} + B_{raw}) + C}{\text{Norm}(L_3)}$$
Isolating $P$ for a target HMA value ($T_{\text{HMA}}$):
$$P = \frac{T_{\text{HMA}} \cdot \text{Norm}(L_3) - L_3 \cdot B_{raw} - C}{L_3 \cdot A_{raw}}$$

---

### 6. Least Squares Moving Average (LSMA)
The LSMA (Linear Regression Curve endpoint) fits a least-squares regression line to the past $N$ bars and returns the value at the current bar. It is algebraically related to WMA and SMA by:
$$\text{LSMA}(N) = 3 \cdot \text{WMA}(Price, N) - 2 \cdot \text{SMA}(Price, N)$$
Substituting WMA and SMA price equations on the current bar:
$$\text{LSMA} = 3 \left( \frac{N \cdot P + W_{prev}}{\text{Norm}(N)} \right) - 2 \left( \frac{P + S_{prev}}{N} \right)$$
Using $\text{Norm}(N) = \frac{N(N+1)}{2}$:
$$\text{LSMA} = P \left( \frac{6}{N+1} - \frac{2}{N} \right) + \frac{6 W_{prev}}{N(N+1)} - \frac{2 S_{prev}}{N}$$
$$\text{LSMA} = P \left( \frac{4N - 2}{N(N+1)} \right) + \frac{6 W_{prev}}{N(N+1)} - \frac{2 S_{prev}}{N}$$
Let:
$$A_{lsma} = \frac{4N - 2}{N(N+1)}, \quad B_{lsma} = \frac{6 W_{prev}}{N(N+1)} - \frac{2 S_{prev}}{N}$$
Isolating $P$ for a target LSMA value ($T_{\text{LSMA}}$):
$$P = \frac{T_{\text{LSMA}} - B_{lsma}}{A_{lsma}}$$

---

### 7. Cutler's Relative Strength Index (RSI)
Traditional RSI uses Wilder's smoothed averages, which have infinite memory. Cutler's RSI (CRSI) solves this by using simple moving averages of up moves ($U$) and down moves ($D$) over length $N-1$, making it perfectly finite and easier to reverse-engineer.
Let:
$$U_i = \max(P_i - P_{i+1}, 0), \quad D_i = \max(P_{i+1} - P_i, 0)$$
Let $U_{sum} = \sum_{i=1}^{N-1} U_i$ and $D_{sum} = \sum_{i=1}^{N-1} D_i$ be the sums of moves up to the previous bar.
The current bar's moves are:
$$U_0 = \max(P - P_1, 0), \quad D_0 = \max(P_1 - P, 0)$$
CRSI formula:
$$\text{CRSI} = 100 - \frac{100}{1 + \frac{U_{sum} + U_0}{D_{sum} + D_0}}$$
To solve for the price $P$ that yields a target CRSI ($T$):
* **Case 1: Bullish Move ($P \ge P_1 \implies U_0 = P - P_1, D_0 = 0$)**
  $$T = 100 - \frac{100}{1 + \frac{U_{sum} + P - P_1}{D_{sum}}}$$
  $$1 + \frac{U_{sum} + P - P_1}{D_{sum}} = \frac{100}{100-T}$$
  $$P = P_1 - U_{sum} + D_{sum} \cdot \left(\frac{T}{100 - T}\right)$$
  *(This is valid only if the calculated $P \ge P_1$)*.

* **Case 2: Bearish Move ($P < P_1 \implies U_0 = 0, D_0 = P_1 - P$)**
  $$T = 100 - \frac{100}{1 + \frac{U_{sum}}{D_{sum} + P_1 - P}}$$
  $$P = P_1 + D_{sum} - U_{sum} \cdot \left(\frac{100 - T}{T}\right)$$
  *(This is valid only if the calculated $P < P_1$)*.

---

### 8. Stochastic Oscillator
The Stochastic Oscillator $\%K$ is defined as:
$$\%K = 100 \cdot \frac{P - L}{H - L}$$
Where $H = \text{highest}(\text{high}, N)$ and $L = \text{lowest}(\text{low}, N)$.
Assuming smoothing length $S_K$ is applied via SMA to obtain the smoothed line $K = \text{SMA}(\%K, S_K)$:
$$K = \frac{\sum_{i=1}^{S_K-1} %K_i + %K_0}{S_K}$$
Let $KSum = \sum_{i=1}^{S_K-1} \%K_i$. We substitute $\%K_0 = 100 \cdot \frac{P - L}{H - L}$ and solve for $P$ given target level $T$:
$$T = \frac{KSum + 100 \cdot \frac{P - L}{H - L}}{S_K}$$
$$P = L + \frac{S_K \cdot T - KSum}{100} \cdot (H - L)$$

#### Stochastic Signal Line Crossover ($K = D$)
The signal line is $D = \text{SMA}(K, L_D)$. Equating $K = D$ to find the crossover:
$$K = D \implies K = \frac{\sum_{i=1}^{L_D-1} K_i + K_0}{L_D} \implies K_0 = \frac{\sum_{i=1}^{L_D-1} K_i}{L_D-1}$$
Let $DSum = \sum_{i=1}^{L_D-1} K_i$. We set the target level $T$ for the smoothed line $K$ to equal this crossover threshold:
$$T_{\text{cross}} = \frac{DSum}{L_D-1}$$
Substituting $T_{\text{cross}}$ into the price formula:
$$P_{\text{cross}} = L + \frac{S_K \cdot \left(\frac{DSum}{L_D-1}\right) - KSum}{100} \cdot (H - L)$$

---

### 9. Stochastic Momentum Index (SMI)
Unlike the Stochastic Oscillator, which calculates price relative to the low, SMI calculates the distance of price from the center of the range.
Let:
$$\text{Center} = \frac{H + L}{2}, \quad D = P - \text{Center}$$
Let $DS(X)$ represent double exponential smoothing of a series $X$ with lengths $L_1$ and $L_2$:
$$DS(X)_0 = \text{EMA}(\text{EMA}(X, L_1), L_2)$$
$$DS(X)_0 = \alpha_1 \alpha_2 X_0 + \alpha_2(1-\alpha_1)\text{EMA}(X, L_1)_{prev} + (1-\alpha_2)\text{EMA}(\text{EMA}(X, L_1), L_2)_{prev}$$
We can write this as:
$$DS(X)_0 = A_{ds} \cdot X_0 + B_{ds}$$
Where:
$$A_{ds} = \alpha_1 \alpha_2$$
$$B_{ds} = \alpha_2(1-\alpha_1)\text{EMA}(X, L_1)_{prev} + (1-\alpha_2)\text{EMA}(\text{EMA}(X, L_1), L_2)_{prev}$$
SMI is calculated as:
$$\text{SMI} = 100 \cdot \frac{DS(D)_0}{0.5 \cdot DS(R)_0} = 200 \cdot \frac{DS(D)_0}{DS(R)_0}$$
Where $R = H - L$. Assuming $R_0 = H - L$ is constant on the current bar:
$$\text{SMI} = 200 \cdot \frac{A_{ds} \cdot D_0 + B_{ds}}{DS(R)_0}$$
To find the required price $P$ for a target SMI value ($T_{\text{SMI}}$), we solve for $D_0$:
$$D_0 = \frac{\frac{T_{\text{SMI}} \cdot DS(R)_0}{200} - B_{ds}}{A_{ds}}$$
$$P = \text{Center} + \frac{\frac{T_{\text{SMI}} \cdot DS(R)_0}{200} - B_{ds}}{A_{ds}}$$

---

### 10. MACD (Moving Average Convergence Divergence)
MACD is the difference between two EMAs:
$$\text{MACD} = \text{EMA}(Price, F) - \text{EMA}(Price, S)$$
$$\text{MACD} = \left[\alpha_f P + (1-\alpha_f)\text{EMA}_f\right] - \left[\alpha_s P + (1-\alpha_s)\text{EMA}_s\right]$$
$$\text{MACD} = P(\alpha_f - \alpha_s) + (1-\alpha_f)\text{EMA}_{f,prev} - (1-\alpha_s)\text{EMA}_{s,prev}$$
To find the price $P$ for a target MACD level ($T$):
$$P = \frac{T + (1 - \alpha_s)\text{EMA}_{s,prev} - (1 - \alpha_f)\text{EMA}_{f,prev}}{\alpha_f - \alpha_s}$$

#### Proving the Signal Line Crossover Shortcut
Traders use the EMA of MACD as a signal line:
$$\text{Sig} = \alpha_z \cdot \text{MACD} + (1-\alpha_z)\cdot \text{Sig}_{prev}$$
If MACD crosses its signal line, then $\text{MACD} = \text{Sig}$.
$$\text{MACD} = \alpha_z \cdot \text{MACD} + (1-\alpha_z)\cdot \text{Sig}_{prev}$$
$$\text{MACD}(1-\alpha_z) = (1-\alpha_z)\cdot \text{Sig}_{prev}$$
Dividing both sides by $(1-\alpha_z)$ (which is valid since $\alpha_z < 1$ for any length $Z > 1$):
$$\text{MACD} = \text{Sig}_{prev}$$
> [!IMPORTANT]
> This is a crucial algebraic simplification! To cause a MACD crossover on the current bar, the current MACD simply needs to equal the **previous bar's signal line value**. 

Setting the target $T = \text{Sig}_{prev}$ in the MACD price equation:
$$P_{\text{cross}} = \frac{\text{Sig}_{prev} + (1 - \alpha_s)\text{EMA}_{s,prev} - (1 - \alpha_f)\text{EMA}_{f,prev}}{\alpha_f - \alpha_s}$$

For an SMA signal line of length $Z$:
$$P_{\text{cross\_sma}} = \frac{\frac{\text{Sum}(\text{MACD}_{prev}, Z-1)}{Z-1} + (1 - \alpha_s)\text{EMA}_{s,prev} - (1 - \alpha_f)\text{EMA}_{f,prev}}{\alpha_f - \alpha_s}$$

---

### 11. CT Moving Average Crossover Indicator
The "Beast" calculates the crossover intersection price of *any two* moving averages from a set of 9, supporting 36 combination pairs of SMA, EMA, WMA, RMA, HMA, and LSMA.

To solve for the crossover, the script equates their next-value formulas:
$$\text{MA}_{1}(P) = \text{MA}_{2}(P)$$
Since all supported moving averages are linear functions of the current price $P$, they can be represented as:
$$\text{MA}_{1} = A_1 \cdot P + B_1, \quad \text{MA}_{2} = A_2 \cdot P + B_2$$
Equating them:
$$A_1 \cdot P + B_1 = A_2 \cdot P + B_2 \implies P = \frac{B_2 - B_1}{A_1 - A_2}$$
Below are the isolated coefficients $A$ and constants $B$ for each MA type:

| MA Type | Coefficient $A$ | Constant $B$ |
| :--- | :--- | :--- |
| **SMA** ($L$) | $\frac{1}{L}$ | $\frac{\text{Sum}(Price_{prev}, L-1)}{L}$ |
| **EMA** ($L$, $\alpha$) | $\alpha$ | $(1-\alpha)\text{EMA}_{prev}$ |
| **WMA** ($L$) | $\frac{L}{\text{Norm}(L)}$ | $\frac{W_{prev}}{\text{Norm}(L)}$ |
| **RMA** ($L$, $\alpha=1/L$) | $\alpha$ | $(1-\alpha)\text{RMA}_{prev}$ |
| **HMA** ($L$, $L_1, L_2, L_3$) | $\frac{L_3 \cdot A_{raw}}{\text{Norm}(L_3)}$ | $\frac{L_3 \cdot B_{raw} + C}{\text{Norm}(L_3)}$ |
| **LSMA** ($L$) | $\frac{4L - 2}{L(L+1)}$ | $\frac{6 W_{prev}}{L(L+1)} - \frac{2 S_{prev}}{L}$ |

*Example: Crossover of SMA ($L_1$) and EMA ($L_2, \alpha_2$)*
$$P = \frac{(1-\alpha_2)\text{EMA}_{prev} - \frac{S_{prev}}{L_1}}{\frac{1}{L_1} - \alpha_2} = \frac{L_1(1-\alpha_2)\text{EMA}_{prev} - S_{prev}}{1 - L_1 \alpha_2}$$
This matches the exact logic in the script's `f_ma_cross_price` function.

---

## ⏳ Current Candle vs. Next Candle Projections

Understanding projection indexing is critical to avoid off-by-one errors when writing or interpreting these scripts.

```
       Bar t-1                    Bar t (Current)                  Bar t+1 (Next)
   [Confirmed Close]         [Fluctuating Close: P]            [Unformed Candle]
           |                            |                              |
           |---- f_calc(close[1]) ------|                              |
           |   (Plots at offset=0)      |                              |
           |                            |---- f_calc(close[0]) --------|
           |                            |   (Plots at offset=1)        |
```

### Current Candle (`offset = 0`)
* **Mathematical Basis**: Uses historical data up to `close[1]` (the last confirmed bar) and treats the real-time fluctuating `close[0]` as the unknown variable $P$.
* **Pine Script Logic**: In a recursive indicator function, the historical sums and averages must be evaluated at index `[1]`.
  * *Example*: `_uSum[1]` and `_dSum[1]` in Cutler's RSI.
* **Plotting**: Plotted on the current forming candle. Since it updates in real time with the current bar's ticks, the plot offset is set to `0`.

### Next Candle (`offset = 1`)
* **Mathematical Basis**: Treats the current bar as confirmed history (using `close[0]` in the historical sums) and calculates what the price *will need to be* on the upcoming unformed candle.
* **Pine Script Logic**: Historical terms are evaluated at index `[0]`.
  * *Example*: `_uSum[0]` and `_dSum[0]`.
* **Plotting**: Projected into the empty space on the right of the chart. In Pine Script, this is done by plotting the value at index `[0]` with an offset:
  `plot(level, offset = 1, show_last = 1)`

---

## 🎨 Modern UI Tables (Pine Script v6)

Older scripts in this folder use crude `label.new()` blocks with string concatenation (`\n\n`) to output results. This causes overlapping text, cannot be styled dynamically, and looks basic.
Pine Script v6 supports advanced `table` structures which should be used to display these results cleanly.

### 1. On-Pane Table Template (e.g., for RSI or Stochastics)
This table displays the target values, required prices, and the distance from the current price. It should be positioned at the top or bottom right of the pane.

```pine
// @version=6
// Modern On-Pane Table styling snippet
var table_bg    = color.new(#15151a, 15)
var table_frame = color.new(#808080, 50)
var text_color  = color.new(#ffffff, 0)

var table ui_table = table.new(position.top_right, 4, 6, bgcolor=table_bg, frame_color=table_frame, frame_width=1, border_color=table_frame, border_width=1)

if barstate.islast
    // Header Row
    table.cell(ui_table, 0, 0, "Target Level", text_color=text_color, text_formatting=text.format_bold)
    table.cell(ui_table, 1, 0, "RSI Target",    text_color=text_color, text_formatting=text.format_bold)
    table.cell(ui_table, 2, 0, "Required Price",text_color=text_color, text_formatting=text.format_bold)
    table.cell(ui_table, 3, 0, "Distance %",    text_color=text_color, text_formatting=text.format_bold)

    // Populate levels (Example for RSI Overbought)
    float req_price = 65420.50 // Calculated target price
    float pct_dist  = ((req_price - close) / close) * 100
    color cell_col  = req_price > close ? color.new(color.lime, 10) : color.new(color.red, 10)

    table.cell(ui_table, 0, 1, "Overbought",    text_color=text_color)
    table.cell(ui_table, 1, 1, "70.00",         text_color=text_color)
    table.cell(ui_table, 2, 1, str.tostring(req_price, format.mintick), text_color=cell_col, text_formatting=text.format_bold)
    table.cell(ui_table, 3, 1, str.tostring(pct_dist, "+#.##;-#.##") + "%", text_color=cell_col)
```

### 2. On-Chart Table Template (e.g., for Moving Average Crossover)
For crossovers, a multi-row matrix layout works best. It can be set to hide columns or rows dynamically depending on user inputs.

```pine
// @version=6
// Modern On-Chart Matrix Table styling snippet
var table ui_matrix = table.new(position.top_right, 5, 4, bgcolor=color.new(#0c0c0f, 10), frame_color=color.new(#444, 50), frame_width=2, border_color=color.new(#444, 80), border_width=1)

if barstate.islast
    // Title row
    table.cell(ui_matrix, 0, 0, "MA Crossover Matrix", text_color=color.orange, text_formatting=text.format_bold)
    table.merge_cells(ui_matrix, 0, 0, 4, 0)
    
    // Headers
    table.cell(ui_matrix, 0, 1, "Pair",            text_color=color.white, text_formatting=text.format_bold)
    table.cell(ui_matrix, 1, 1, "MA Fast",          text_color=color.white, text_formatting=text.format_bold)
    table.cell(ui_matrix, 2, 1, "MA Slow",          text_color=color.white, text_formatting=text.format_bold)
    table.cell(ui_matrix, 3, 1, "Crossover Price", text_color=color.white, text_formatting=text.format_bold)
    table.cell(ui_matrix, 4, 1, "Condition",        text_color=color.white, text_formatting=text.format_bold)

    // Data Row 1 (e.g., EMA 9 / SMA 21)
    float cross_price = 64320.00
    string cond_txt   = close > cross_price ? "Close Below" : "Close Above"
    color cond_color  = close > cross_price ? color.red : color.green

    table.cell(ui_matrix, 0, 2, "Pair 1",           text_color=color.white)
    table.cell(ui_matrix, 1, 2, "9 EMA",            text_color=color.aqua)
    table.cell(ui_matrix, 2, 2, "21 SMA",           text_color=color.yellow)
    table.cell(ui_matrix, 3, 2, str.tostring(cross_price, format.mintick), text_color=color.white, text_formatting=text.format_bold)
    table.cell(ui_matrix, 4, 2, cond_txt,           text_color=color.white, bgcolor=color.new(cond_color, 40))
```

---

## 🔮 Recommendations for Future Enhancements

These scripts can be upgraded to measure market structure with greater precision by adding the following calculations:

### 1. Reversing Bollinger Bands (Exact Mathematical Inversion)
The existing Bollinger Band script only calculates the bands resulting from an arbitrary *Test Price*. It does not calculate the actual price needed to cross the bands.
By utilizing the algebraic relationship of the sum of squared deviations around a mean, we can solve for the exact price $P$ where price intersects the upper or lower band ($P = \text{SMA} \pm M \cdot \text{StDev}$):

$$P = \mu_{N-1} \pm M \cdot \sigma_{N-1} \sqrt{\frac{N}{N - 1 - M^2}}$$

Where:
* $\mu_{N-1}$ is the SMA of price over the prior $N-1$ bars.
* $\sigma_{N-1}$ is the Standard Deviation of price over the prior $N-1$ bars.
* $M$ is the Bollinger Band standard deviation multiplier (typically $2.0$).
* $N$ is the period length (typically $20$).

> [!CAUTION]
> This equation has a real solution only if the denominator is positive: $N - 1 - M^2 > 0 \implies M < \sqrt{N-1}$.
> If the multiplier $M \ge \sqrt{N-1}$, it is mathematically impossible for price to touch the band on the current bar, because the standard deviation expands faster than the price can move. This boundary condition should be coded as a safeguard.

### 2. Volatility Integration via Average True Range (ATR)
Instead of simply showing the target price, calculate the **probability** of the target price being reached within the current bar using ATR.
* Calculate the distance: $\text{Dist} = |P_{\text{target}} - \text{close}|$.
* Express distance as a ratio of ATR: $\text{ATR\_Ratio} = \frac{\text{Dist}}{\text{ATR}(14)}$.
* If $\text{ATR\_Ratio} \le 1.0$, the target is highly achievable within the current session.
* If $\text{ATR\_Ratio} > 2.0$, the target is highly unlikely to be reached on the current candle, signaling an extreme, low-probability tail event. This ratio can be displayed in the UI table as a **Feasibility Index**.

### 3. Volume-Weighted Average Price (VWAP) Crossover
Include VWAP as one of the crossover options in the moving average crossover indicator.
Since VWAP is calculated as:
$$\text{VWAP} = \frac{\text{Cumulative}(Price \cdot Volume)}{\text{Cumulative}(Volume)}$$
Let $PV_{cum}$ be the cumulative sum of $Price \cdot Volume$ up to the previous bar, and $V_{cum}$ be the cumulative sum of $Volume$ up to the previous bar. Let $V$ be the current bar's volume.
On the current bar:
$$\text{VWAP} = \frac{PV_{cum} + P \cdot V}{V_{cum} + V}$$
This is a linear equation in $P$, allowing it to be easily solved in crossovers against any other moving average.

### 4. Multi-Timeframe (MTF) Reverse Indicators
Calculate the required price on the *current* timeframe to cause an indicator signal on a *higher* timeframe.
* For example: "What price does the 5-minute chart need to close at to force a bullish crossover on the 4-hour MACD?"
* This can be accomplished by projecting the current timeframe's price into the higher-timeframe EMA calculations.
