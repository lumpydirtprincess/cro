**🔶 OVERVIEW**  
The **Supply & Demand: CVD Flow** indicator is a high-performance structural analysis tool that merges classic price-action Supply and Demand (S&D) zones with real-time order flow data.  
  
Unlike traditional S&D indicators that only show price boxes, this tool embeds a **Cumulative Volume Delta (CVD) Wave** directly inside every active zone. This allows traders to see not just where the market turned, but the intensity of the volume delta that has accumulated within that zone since its creation.  
  
**🔶 CORE CONCEPT — VOLUME DELTA WITHIN STRUCTURE**  
  
Supply and Demand zones represent areas where a significant imbalance between buyers and sellers occurred.  

- **Demand Zones:** Created when a bearish "base" candle is followed by a high-momentum bullish breakout.
- **Supply Zones:** Created when a bullish "base" candle is followed by a high-momentum bearish breakout.

By integrating CVD, the indicator tracks the net buying vs. selling volume (Delta) that occurs as price lives within or returns to these zones. This provides a "live" look at whether a zone is being defended by big players or if interest is fading.  
  
**🔶 THE CVD FLOW WAVE (POLYLINE ENGINE)**  
  
The standout feature of this indicator is the **CVD Polyline Wave** drawn inside the boxes:  

- **Visualizing Order Flow:** The wave oscillates within the zone's boundaries based on cumulative volume delta.
- **Demand CVD (Cyan):** A rising wave suggests aggressive market buying is supporting the demand zone.
- **Supply CVD (Orange):** A falling wave suggests aggressive market selling is reinforcing the supply zone.
- **Real-time Updates:** The wave and the numerical CVD value in the label update dynamically with every bar, providing a clear view of the "Volume Flow" inside the structure.

**🔶 SMART DETECTION & MITIGATION**  
  
To maintain technical accuracy and chart clarity, the script employs several advanced management logic:  

- **ATR-Based Momentum:** Breakouts are validated using a **Momentum Multiplier**. A zone is only formed if the breakout candle is significantly larger than the recent Average True Range (ATR), ensuring only high-conviction moves are captured.
- **Overlap Protection:** The script automatically checks for redundant zones. If a new zone forms over an existing one, it filters the overlap to keep the chart clean.
- **Dynamic Mitigation:** A Demand Zone is deleted instantly if price closes below its bottom (failed demand). A Supply Zone is deleted instantly if price closes above its top (failed supply).

**🔶 INDICATOR INPUTS**  

- **ATR Length & Momentum Multiplier:** Fine-tune the sensitivity of zone detection. Higher multipliers filter for "Power" breakouts.
- **Max Active Zones:** Limits the number of zones displayed to prevent performance lag and visual clutter.
- **Custom Colors:** Full control over zone fills, borders, and the internal CVD wave colors.
- **Show Signals:** Toggle the "△" and "▽" markers that appear at the moment of breakout.

**🔶 HOW TO USE**  

- **Zone Validation:** When price returns to a Demand zone, look at the CVD label. If the CVD is strongly positive and the wave is rising, it indicates that buyers are actively defending the level.
- **Absorption Detection:** If price is sitting in a Demand zone but the CVD wave is making lower lows, it may indicate "absorption"—where sellers are exhausting the available buy orders, potentially leading to a zone failure.
- **Targeting:** Use Supply zones as logical take-profit areas for longs, and Demand zones for shorts, while using the internal CVD flow to judge if price is likely to bounce or break through.

**🔶 CONCLUSION**  
  
**Supply & Demand: CVD Flow [ChartPrime]** represents a new evolution in structural trading. By moving beyond simple price boxes and incorporating a high-fidelity Cumulative Volume Delta engine, it gives traders an "X-ray" view of the order flow dynamics driving supply and demand.  
  
It is an essential tool for traders who want to combine the reliability of market structure with the precision of volume-based order flow analysis.
