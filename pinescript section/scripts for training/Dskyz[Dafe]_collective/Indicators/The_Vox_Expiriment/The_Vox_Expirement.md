The VoVix Experiment** is a next-generation, regime-aware, volatility-adaptive trading strategy for futures, indices, and more. It combines a proprietary VoVix (volatility-of-volatility) anomaly detector with price structure clustering and critical point logic, only trading when multiple independent signals align. The system is designed for robustness, transparency, and real-world execution.  
  
**Logic:**  
  
**VoVix Regime Engine:** Detects pre-move volatility anomalies using a fast/slow ATR ratio, normalized by Z-score. Only trades when a true regime spike is detected, not just random volatility.  
**Cluster & Critical Point Filters:** Price structure and volatility clustering must confirm the VoVix signal, reducing false positives and whipsaws.  
**Adaptive Sizing:** Position size scales up for “super-spikes” and down for normal events, always within user-defined min/max.  
**Session Control:** Trades only during user-defined hours and days, avoiding illiquid or high-risk periods.  
**Visuals:** Aurora Flux Bands (From another Original of Mine (Options Flux Flow): glow and change color on signals, with a live dashboard, regime heatmap, and VoVix progression bar for instant insight.  
  
**Backtest Settings**  
**Initial capital:** $10,000  
**Commission:** Conservative, realistic roundtrip cost:  
15–20 per contract (including slippage per side)** I set this to $25**  
**Slippage:** 3 ticks per trade  
**Symbol:** CME\_MINI:NQ1!  
**Timeframe:** 15 min (but works on all timeframes)  
**Order size:** Adaptive, 1–2 contracts  
**Session:** 5:00–15:00 America/Chicago (default, fully adjustable)  

**Why these settings?**  
These settings are intentionally strict and realistic, reflecting the true costs and risks of live trading. The 10,000 account size is accessible for most retail traders. 25/contract including 3 ticks of slippage are on the high side for MNQ, ensuring the strategy is not curve-fit to perfect fills. If it works here, it will work in real conditions.  
  
**Forward Testing:** (This is no guarantee. I've provided these results to show that executions perform as intended. Test were done on Tradovate)  
  
**ALL TRADES**  
**Gross P/L: **$12,907.50  
**# of Trades:** 64  
**# of Contracts:** 186  
**Avg. Trade Time:** 1h 55min 52sec  
**Longest Trade Time:** 55h 46min 53sec  
**% Profitable Trades: **59.38%  
**Expectancy:** $201.68  
**Trade Fees & Comm.:** $(330.95)  
**Total P/L: **$12,576.55  
  
**Winning Trades:** 59.38%  
**Breakeven Trades: **3.12%  
**Losing Trades:** 37.50%  
  
**Link:** [dropbox.com/scl/fi/f549yhwaae5l0ztu3xeha/Performance.20250512.070835.pdf?rlkey=4hw5ixhemi7f7mhswwdiqjikb&st=6lvv7rhm&dl=0<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M4.5 3A1.5 1.5 0 0 0 3 4.5v9A1.5 1.5 0 0 0 4.5 15h9a1.5 1.5 0 0 0 1.5-1.5V10h-1v3.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H8V3zM11 4h2.293L9.146 8.146l.708.708L14 4.707V7h1V3h-4z"></path></svg>](https://www.dropbox.com/scl/fi/f549yhwaae5l0ztu3xeha/Performance.20250512.070835.pdf?rlkey=4hw5ixhemi7f7mhswwdiqjikb&amp;st=6lvv7rhm&amp;dl=0)  
  
**Inputs & Tooltips**  
  
**VoVix Regime Execution:** Enable/disable the core VoVix anomaly detector.  
**Volatility Clustering:** Require price/volatility clusters to confirm VoVix signals.  
**Critical Point Detector:** Require price to be at a statistically significant distance from the mean (regime break).  
**VoVix Fast ATR Length:** Short ATR for fast volatility detection (lower = more sensitive).  
**VoVix Slow ATR Length:** Long ATR for baseline regime (higher = more stable).  
**VoVix Z-Score Window: **Lookback for Z-score normalization (higher = smoother, lower = more reactive).  
**VoVix Entry Z-Score:** Minimum Z-score for a VoVix spike to trigger a trade.  
**VoVix Exit Z-Score: **Z-score below which the regime is considered decayed (exit).  
**VoVix Local Max Window:** Bars to check for local maximum in VoVix (higher = stricter).  
**VoVix Super-Spike Z-Score:** Z-score for “super” regime events (scales up position size).  
**Min/Max Contracts:** Adaptive position sizing range.  
**Session Start/End Hour:** Only trade between these hours (exchange time).  
**Allow Weekend Trading:** Enable/disable trading on weekends.  
**Session Timezone:** Timezone for session filter (e.g., America/Chicago for CME).  
**Show Trade Labels:** Show/hide entry/exit labels on chart.  
**Flux Glow Opacity:** Opacity of Aurora Flux Bands (0–100).  
**Flux Band EMA Length:** EMA period for band center.  
**Flux Band ATR Multiplier: **Width of bands (higher = wider).  
  
**Compliance & Transparency**  
\* No hidden logic, no repainting, no pyramiding.  
\* All signals, sizing, and exits are fully explained and visible.  
\* Backtest settings are stricter than most real accounts.  
\* All visuals are directly tied to the strategy logic.  
\* This is not a mashup or cosmetic overlay; every component is original and justified.  
  
**Disclaimer**  
Trading is risky. This script is for educational and research purposes only. Do not trade with money you cannot afford to lose. Past performance is not indicative of future results. Always test in simulation before live trading.  
  
**Proprietary Logic & Originality Statement**  
  
This script, “The VoVix Experiment,” is the result of original research and development. All core logic, algorithms, and visualizations—including the VoVix regime detection engine, adaptive execution, volatility/divergence bands, and dashboard—are proprietary and unique to this project.  
  
**1. VoVix Regime Logic**  
The concept of “volatility of volatility” (VoVix) is an original quant idea, not a standard indicator. The implementation here (fast/slow ATR ratio, Z-score normalization, local max logic, super-spike scaling) is custom and not found in public TradingView scripts.  
  
**2. Cluster & Critical Point Logic**  
Volatility clustering and “critical point” detection (using price distance from a rolling mean and standard deviation) are general quant concepts, but the way they are combined and filtered here is unique to this script. The specific logic for “clustered chop” and “critical point” is not a copy of any public indicator.  
  
**3. Adaptive Sizing**  
The adaptive sizing logic (scaling contracts based on regime strength) is custom and not a standard TradingView feature or public script.  
  
**4. Time Block/Session Control**  
The session filter is a common feature in many strategies, but the implementation here (with timezone and weekend control) is written from scratch.  
  
**5. Aurora Flux Bands (From another Original of Mine (Options Flux Flow)**  
The “glowing” bands are inspired by the idea of volatility bands (like Bollinger Bands or Keltner Channels), but the visual effect, color logic, and integration with regime signals are original to this script.  
  
**6. Dashboard, Watermark, and Metrics**  
The dashboard, real-time Sharpe/Sortino, and VoVix progression bar are all custom code, not copied from any public script.  
  
**What is “standard” or “common quant practice”?**  
  
Using ATR, EMA, and Z-score are standard quant tools, but the way they are combined, filtered, and visualized here is unique. The structure and logic of this script are original and not a mashup of public code.  
  
This script is 100% original work. All logic, visuals, and execution are custom-coded for this project. No code or logic is directly copied from any public or private script.  
  
Use with discipline. Trade your edge.  
— Dskyz, for DAFE Trading Systems

<time datetime="Tue, 20 May 2025 03:06:51 GMT" class="apply-common-tooltip date-_PPhhqv6" title="May 19, 2025, 20:06 PDT">May 19, 2025</time>

Release Notes
**The VoVix Experiment – Update Statement**  
  
**Display Bubbles Improved:**  
- Buy (long) signals now show as a green bubble with an up arrow below the bar.  
- Sell (short) signals now show as a red bubble above the bar.  
- This makes trade direction and execution zones instantly clear on the chart.  
  
**Backtest Settings Updated for Compliance:**  
**Commission set to:** 12.50 perside (12.50perside(25 round-trip per contract) to reflect realistic trading costs.  
- Slippage set to 3 ticks per trade (NQ = $15 per contract per trade).  
**Initial capital:** $10,000.  
**Order size:** Adaptive, 1–2 contracts.  
**No pyramiding, no hidden DCA.**  
**Symbol:** CME\_MINI:NQ1!, Timeframe: 1 min (works on all timeframes).  
- All user inputs and logic are fully explained in the description.  
- All visuals are directly tied to the strategy logic—no cosmetic overlays.  
- No hidden logic, repainting, or pyramiding.  
- This script is 100% original work.  
  
**Why these settings?**  
These settings are intentionally strict and realistic, reflecting the true costs and risks of live trading. If it works here, it will work in real conditions.  
  
**Disclaimer:**  
Trading is risky. This script is for educational and research purposes only. Do not trade with money you cannot afford to lose. Past performance is not indicative of future results. Always test in simulation before live trading.  
  
Use with discipline. Trade your edge.  
— **Dskyz**, for DAFE Trading Systems