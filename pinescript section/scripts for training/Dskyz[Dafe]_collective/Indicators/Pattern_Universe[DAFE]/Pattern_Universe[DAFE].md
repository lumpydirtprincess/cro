**DAFE Pattern Universe (DPU)**  
  
A multi-category pattern detection indicator built on a **Rolling Confidence Matrix (RCM)** — a scoring framework that accumulates evidence toward pattern completion rather than triggering on single-bar events. Includes a structural context layer (referred to symbolically as the "Brain"), reinforcement-based weight adjustment, circuit breaker logic, and real-time dashboards.  
  
**What This Indicator Does**  
DPU scans five categories of price activity simultaneously:  
  
• **Candlestick Patterns** — Engulfing, Morning/Evening Star, Three Soldiers/Crows, Harami, Piercing Line, Dark Cloud Cover, Tweezer Tops/Bottoms, plus instant single-bar formations (Hammer, Doji variants, Marubozu, Inside/Outside Bar)  
  
• **Structure (SMC)** — Break of Structure, Change of Character, Swing Failure Patterns, Fair Value Gaps  
• **Volume Spread Analysis** — Stopping Volume, Buying/Selling Climax, Absorption, Exhaustion, Supply/Demand Drying, Equal Highs/Lows  
• **Geometry** — Bull/Bear Flags, Rising/Falling Wedges, Symmetrical Triangles, Ascending Triangles  
• **Harmonics** — AB=CD, Gartley, Bat, Crab  
  
Each category can be toggled independently. Every detected pattern occupies a dedicated scoring slot within the RCM.  
  
**The Rolling Confidence Matrix (RCM) — How Scoring Works**  
This is the core mechanism. Rather than printing a signal the moment a pattern's textbook conditions appear on a single bar, DPU treats pattern detection as an **accumulation process**.  
  
**38 scoring slots** are maintained in parallel — one per pattern type. Each slot holds a confidence score from 0 to 100. Here is how a score moves through its lifecycle:  
  
**1. Seeding**  
When early evidence of a pattern appears, the slot receives its first increment. For example, a bullish engulfing candidate begins accumulating when a bearish candle is followed by a bullish candle that overlaps significantly — but it doesn't need to be textbook-perfect yet. The initial increment is sized proportionally to how closely conditions match. A strong match might seed at 25 points; a partial match at 14.  
  
**2. Building**  
On subsequent bars, if confirming evidence continues (price follows through, volume confirms, delta aligns), additional increments are added. Each increment is scaled by the **Global Sensitivity** multiplier. If contradicting evidence appears (price reverses past invalidation level), the slot is hard-reset to zero immediately — no lingering false positives.  
  
**3. Threshold Crossing**  
Each category has its own configurable threshold (default: Candle 65, Structure 60, VSA 60, Geometry 70, Harmonic 70). When a slot's accumulated score reaches or exceeds its category threshold, the pattern **triggers**.  
  
**4. Intra-Category Arbitration**  
Only the highest-scoring slot within each category can trigger per bar. If both a Bull Engulfing at 72% and a Harami Bull at 58% are ready, only the Engulfing fires. This prevents signal flooding from overlapping patterns within the same family.  
  
**5. Cross-Category Confluence**  
After arbitration selects category champions, DPU checks how many categories have active heat (scores above 50% of threshold). The signal tier (T1–T4) reflects how many categories are contributing:  
— T1: Single category  
— T2: Two categories active  
— T3: Three categories  
— T4: Four or more categories aligned  
  
**6. Expiration & Cooldown**  
Each slot has a category-specific lifespan (configurable). If the score hasn't reached threshold within that window, the slot expires, resets, and enters a cooldown period equal to half the lifespan. During cooldown, the slot cannot accumulate new evidence. This prevents the same marginal pattern from repeatedly almost-triggering.  
  
**7. Hard Resets**  
Specific invalidation conditions are coded per pattern. A Bull Engulfing building at 40% that sees price close below the prior bar's low is immediately zeroed — not decayed, not reduced, but wiped.  
  
**All increment values have been calibrated** so that default thresholds produce balanced signal generation without requiring extreme settings.  
  
**Increment Normalization — Why Defaults Work**  
Each pattern type has been assigned increment values calibrated against its category threshold. This means:  
  
• A candlestick pattern with strong textbook conditions + volume + delta confirmation can reach 65% in approximately 1–2 bars (intentional — candles are fast-forming)  
  
• A geometric pattern (flag, wedge) seeds at 38 points on initial detection, then adds only 4 points per confirming bar — requiring sustained formation over many bars to reach the 70% threshold (intentional — geometry develops slowly)  
  
• Harmonic patterns seed at 50 points on initial Fibonacci ratio match, reflecting that the ratio math itself is highly specific evidence — but still require additional ratio confirmation to trigger  
  
• VSA events like Stopping Volume or Climax conditions can seed between 38–42 points in a single bar because they represent discrete volume anomalies that either happened or didn't  
  
This normalization means a user can leave all thresholds at default and get reasonable signal density across all categories. Adjusting sensitivity up produces more triggers uniformly; adjusting it down reduces them uniformly.  
  
**Pattern Details — What Each Slot Actually Measures**  
  
**Candlestick Patterns (Slots 0–9, 36–37)**  
**Bullish/Bearish Engulfing (Slots 0–1)**  
Requires: prior bar opposite color, current bar's body overlaps prior body by at least 80% for full score (50% for partial). Context filter: bullish engulfing only scores during decline (price below EMA20, recent high retreated); bearish only during rally. Volume and delta confirmation each add supplementary increments. Follow-through on subsequent bars adds continuation evidence. Hard reset if price invalidates (closes below prior low for bull, above prior high for bear).  
  
**Morning Star / Evening Star (Slots 2–3)**  
Three-bar patterns scored in stages: first bar establishes trend direction (large body, correct direction), second bar must be small-bodied relative to both neighbors (less than 40% of each), third bar must close past the midpoint of the first bar's body. Each stage contributes roughly one-third of the total increment. Partial formations that fail to complete within lifespan expire. Hard reset if price closes past the middle bar's extreme in the wrong direction before reaching threshold.  
  
**Three White Soldiers / Three Black Crows (Slots 4–5)**  
Scored incrementally: first qualifying bar seeds 12 points, second confirming bar (same direction, higher close) adds 12 more, completion of the three-bar sequence adds 16. Volume adds 5. Each bar must show genuine body (above 0.2 ATR). Hard reset if any bar closes past the prior bar's extreme against the pattern direction.  
  
**Bullish/Bearish Harami (Slots 6–7)**  
Single-evaluation: small body contained entirely within prior bar's range, body less than 60% of prior body. Context-filtered (decline for bull, rally for bear). Seeds at 24 points. Confirmation on next bar adds 15. Invalidation if price breaks the containing bar's extreme.  
  
**Piercing Line / Dark Cloud Cover (Slots 8–9)**  
Piercing: bearish prior bar, bullish current bar, opens below prior close. Full score (26 points) if close above prior bar's midpoint; partial score (12 points) otherwise. Dark Cloud is the inverse. Follow-through adds 12 per confirming bar. Hard reset on invalidation.  
  
**Tweezer Top / Tweezer Bottom (Slots 36–37)**  
Matching highs (top) or lows (bottom) within 0.05 ATR tolerance. Requires opposite-color bars. Context-filtered by rally/decline. Seeds at 24, with delta confirmation adding 5.  
  
**Instant Patterns**  
These are single-bar formations evaluated separately: Hammer, Shooting Star, Dragonfly Doji, Gravestone Doji, Long Doji, Standard Doji, Marubozu (Bull/Bear), Inside Bar, Outside Bar.  
  
By default, instant patterns **do not fire independent signals**. Instead, they boost any rolling pattern in the same category that is already above 50% of threshold and directionally aligned. This is controlled by the "Standalone Instant Signals" toggle — when enabled, instants can trigger independently (increases noise, documented in tooltip).  
  
Each instant has specific wick/body ratio thresholds. Hammer: lower wick &gt; 2.5× body, upper wick &lt; 0.7× body. Doji: body &lt; 12% of range with minimum range requirement (0.3 ATR for long-legged variants, 0.2 ATR for standard). Marubozu: body &gt; 92% of range, both wicks &lt; 4% of range.  
  
**Structure Patterns (Slots 10–17)**  
**Break of Structure — BOS (Slots 10–11)**  
Uses adaptive-length pivot highs/lows to establish swing structure. A bullish BOS requires higher swing lows (structural bullishness established) and then a close above the last swing high where the prior bar was at or below that level — a genuine breakout, not just a wick above.  
  
Approach scoring: when price is within 1.5 ATR of the swing level but hasn't broken it, 5 points accumulate per bar — representing "loading" behavior. The actual break adds 28 points. Delta confirmation adds 5. Total potential in one sequence: approximately 38–50 depending on approach duration.  
  
Entry is set at break price, stop at last swing low, target at measured move (distance from swing low to break level projected upward). Hard reset if price violates the opposite structure level.  
  
**Change of Character — CHoCH (Slots 12–13)**  
Similar to BOS but specifically identifies trend reversal: requires the new swing to violate the established higher-high/lower-low sequence. Lower swing high during prior uptrend + break above it = bullish CHoCH. Approach scores 12 points, break scores 22. More selective than BOS by definition since it requires confirmed structural shift.  
  
**Swing Failure Pattern — SFP (Slots 14–15)**  
Wick below prior swing low that closes back above it (bullish) — a liquidity sweep that fails. Requirements: sweep depth must exceed 0.1 ATR (not just noise), close must be above the swept level, bar must close in the signal direction. Context-filtered by decline/rally. Seeds at 30 points — intentionally high because the event is either happening or it isn't. Volume and delta each add 5.  
  
**Fair Value Gap — FVG (Slots 16–17)**  
Detected when current bar's low is above the bar-two-ago high (bullish gap). The gap remains "active" until price fills to the midpoint. While active, 3 points accumulate per bar. On the bar the gap forms, 22 additional points are added. Gap midpoint fill deactivates and resets the slot.  
  
**Volume Spread Analysis Patterns (Slots 18–25)**  
All VSA patterns use a **Dynamic Volatility Scalar (DVS)** that adjusts volume thresholds based on current vs. historical volatility (ATR(30) / close normalized against its 100-bar average). This prevents the same fixed volume multiplier from being too sensitive in quiet markets and too lenient in volatile ones.  
  
**Stopping Volume (Slot 18)**  
High volume (&gt;1.8× average, DVS-adjusted) with narrow spread (&lt;0.8× average). The market absorbed selling/buying without moving price. Direction assigned opposite to bar direction (high-volume narrow-spread bear bar during decline = bullish stopping volume). Context requires the bar to occur during a decline (for bullish) or rally (for bearish). Ultra-narrow spread (&lt;0.5×) adds additional 8 points. Seeds at 38. Hard reset if followed by wide-spread high-volume bar in opposite direction.  
  
**Buying Climax / Selling Climax (Slots 19–20)**  
Extreme volume (&gt;2.5× average) with wide spread (&gt;1.5×) and bar direction matching trend — exhaustion of the current move. Buying climax: high volume + wide spread + bullish bar during rally = bearish reversal signal. Seeds at 42. Volume above 3.5× adds 6 more. Hard reset if the trend continues with high volume (directional follow-through invalidates the climax thesis).  
  
**Absorption (Slot 21)**  
Price barely moves despite significant delta imbalance — someone is absorbing the order flow. Detected when body is less than 40% of what the delta/volume ratio would predict, with volume above 1.3× average. Seeds at 38. Direction assigned opposite to delta (positive delta absorbed = bearish signal). Hard reset if price subsequently moves strongly (body &gt; 1.5 ATR).  
  
**Exhaustion (Slot 22)**  
Delta reversal on high volume: current bar's delta sign is opposite to prior bar's delta sign, with both bars showing elevated volume (&gt;1.8×) and spread (&gt;1.2×). The aggressive side switched. Seeds at 40.  
  
**Supply Drying / Demand Drying (Slots 23–24)**  
Low volume (&lt;0.6× average) with narrow spread (&lt;0.7×) and bar direction suggesting the opposing side is withdrawing. Supply drying: bullish bar, low volume, narrow spread, below prior high = sellers are stepping away. Seeds at 15 per detection — intentionally modest because this is a gradual, cumulative signal. Hard reset if volume surges above 2×.  
  
**Equal Highs/Lows (Slot 25)**  
Uses the same pivot system as structure patterns. When a swing high matches a prior swing high within 0.05 ATR tolerance, tests are counted. Two or more tests at the same level seed at 28 points; additional tests at that level add 8 points each. This identifies liquidity pools above equal highs or below equal lows.  
  
**Geometry Patterns (Slots 26–31)**  
Geometric patterns use **linear regression** over an adaptive-length window (default ~20 bars, adjusted by DVS) to measure the slope of highs and lows independently. This produces two slope values: one for the upper boundary, one for the lower boundary. Pattern classification derives from the relationship between these slopes.  
  
**Bull Flag / Bear Flag (Slots 26–27)**  
Parallel channel (slopes within 0.1 ATR of each other) with both slopes descending (bull flag — pullback within uptrend) or ascending (bear flag). Context: bull flag requires price above EMA200; bear flag requires below. Seeds at 38 on initial detection, then adds 4 per confirming bar — designed to require sustained channel behavior. Hard reset if price crosses EMA200 against the flag direction.  
  
**Rising Wedge / Falling Wedge (Slots 28–29)**  
Converging slopes: rising wedge has both slopes positive but the high slope is less steep than the low slope (converging upward). Falling wedge: both slopes negative, high slope less steep than low slope (converging downward). Non-parallel requirement explicitly checked. Same seeding/continuation structure as flags.  
  
**Symmetrical Triangle (Slot 30)**  
High slope negative, low slope positive (converging from both sides). The difference between slopes must be near-zero (within 0.05 ATR) to confirm symmetry. Direction assigned based on EMA200 position — breakout direction predicted by the prevailing trend.  
  
**Ascending Triangle (Slot 31)**  
Flat highs (high slope within 0.03 ATR of zero) with rising lows (low slope positive). Textbook ascending triangle definition translated to slope measurements.  
  
**Harmonic Patterns (Slots 32–35)**  
Harmonics use adaptive pivot detection (shorter lookback than structure pivots) to identify X-A-B-C-D points. Fibonacci ratios are measured between legs with a tolerance of ±0.10:  

<header class="header-vQcoxVNe"><span aria-hidden="true" role="img" class="blockIcon-JMh4y6KH"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="m16.51 15.41-2.26-3.23a.38.38 0 0 0-.5-.1l-2.37 1.53a.37.37 0 0 1-.43-.02l-3.6-2.71a.38.38 0 0 0-.34-.06l-2.94 1.02a.37.37 0 0 0-.18.14l-2.4 3.43c-.18.25 0 .59.3.59h14.42c.3 0 .48-.34.3-.59Z"></path><path fill="currentColor" fill-rule="evenodd" d="m7.38 8.76 4.05 3.5 3.7-2.4a.37.37 0 0 0 .09-.55L9.3 2.14a.38.38 0 0 0-.59.01L3.25 9.51c-.22.3.08.7.43.58l3.7-1.33Zm-.7-1.34 1.02-.37 3.86 3.33 1.7-1.1-4.2-5.08-2.39 3.22Z"></path></svg></span><span>Pine Script®</span><button aria-describedby=":R6b9l59:" class="copyButton-vQcoxVNe lightButton-bYDQcOkp noContent-bYDQcOkp withStartSlot-bYDQcOkp quiet-primary-PVWoXu5j gray-PVWoXu5j small-bYDQcOkp typography-regular16px-bYDQcOkp"><span class="slot-bYDQcOkp"><span role="img" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="M11 6.5h10c.28 0 .5.22.5.5v10a.5.5 0 0 1-.5.5H11a.5.5 0 0 1-.5-.5V7c0-.28.22-.5.5-.5ZM9 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V7Zm-2 3.5h1V9H7a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-1h-1.5v1a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V11c0-.28.22-.5.5-.5Z"></path></svg></span></span></button></header>
'''
AB=CD (Slot 32): AB/XA ≈ 0.618, BC/AB ≈ 0.618  
Gartley (Slot 33): AB/XA ≈ 0.618, BC/AB ≈ 0.786  
Bat (Slot 34): AB/XA between 0.33–0.55, BC/AB ≈ 0.886  
Crab (Slot 35): AB/XA between 0.33–0.65, BC/XA between 1.50–1.75 (extension)  

Initial ratio match seeds at 50 points. Second ratio confirmation adds 15. These high initial seeds reflect that Fibonacci ratio matching is already highly specific evidence — the math either fits or it doesn't.  
  
**The Structural Context Layer ("Brain")**  
The term "Brain" is used symbolically throughout the code and documentation — it refers to a **multi-bucket evidence accumulation system** that provides structural context to the RCM. It is not artificial intelligence, neural network, or machine learning. It is a rules-based state engine built from price action heuristics.  
  
**Purpose**  
The RCM detects patterns. The structural context layer answers: **"Given the current market environment, should this pattern be trusted?"**  
  
A bullish engulfing at 70% confidence means something different when it occurs within a structurally intact uptrend versus during a deteriorating market with damaged support levels. The context layer provides that distinction.  
  
**Five Evidence Buckets (Per Side)**  
Ten buckets total — five bullish, five bearish:  
  
**1. Impulse** (cap: 25 per side)  
Measures directional momentum. Incremented when the current bar has a body larger than the 10-bar average body by 15%+, closes in the top 30% of range (bull) or bottom 30% (bear), and range exceeds the 10-bar average. Volume above 1.2× adds supplementary impulse. This captures whether the market is producing genuine directional bars.  
  
**2. Structure** (cap: 30 per side)  
Measures breakout behavior. Incremented when price breaks above the 5-bar high (bull) or below the 5-bar low (bear). Also captures reclaim events — when price dips below a low but closes back above it (bullish structural reclaim). Structure increments are the largest (up to 6 points per event) because structural breaks are the strongest single-bar evidence of directional commitment.  
  
**3. Exhaustion** (cap: 20 per side)  
Measures rejection and reversal behavior. Bearish bar with a lower wick exceeding 45% of range and volume above 1.2× = bullish exhaustion evidence (sellers tried but were absorbed). Reclaim events also contribute here. Captures the "trying and failing" dynamic.  
  
**4. Continuation** (cap: 20 per side)  
Measures trend persistence. Incremented when price is above the 21-EMA anchor with positive slope and closing higher (bull). Subject to **active degradation**: if price moves below the anchor, continuation evidence is multiplied by 0.62 per bar. If price crosses the anchor against the trend, continuation is halved immediately. This ensures continuation evidence reflects current behavior, not memory of past behavior.  
  
**5. Compression** (cap: 15 per side)  
Measures narrowing conditions. Incremented when bars are narrow (range below 80% of average) and ATR is contracting relative to its 30-bar moving average. Bullish compression accumulates above the anchor; bearish below it. Compression evidence feeds into the substate classification during transition periods.  
  
**Exponential Decay**  
Every bucket decays by the configurable decay rate (default 0.82) per bar **before** new evidence is added. This means:  
— Evidence from 1 bar ago retains 82% of its value  
— Evidence from 5 bars ago retains ~37%  
— Evidence from 10 bars ago retains ~14%  
— Evidence from 20 bars ago retains ~2%  
  
This creates a naturally weighted recency bias without requiring a fixed lookback window.  
  
**Weighted Confidence Calculation**  
Each bucket is weighted differently in the total confidence score:  
— Impulse: 1.20× (momentum matters but can be noise)  
— Structure: 1.35× (structural breaks are the highest-conviction evidence)  
— Exhaustion: 1.15× (rejection is meaningful but secondary)  
— Continuation: 1.00× (baseline weight — confirms but doesn't lead)  
— Compression: 0.90× (potential energy, not kinetic — lowest weight)  
  
Bull Confidence = Σ(bull bucket × weight)  
Bear Confidence = Σ(bear bucket × weight)  
Net Confidence = Bull - Bear  
Dominance = Net / (Bull + Bear)  
  
**Three-State Engine with Hysteresis**  
The state engine has three states: **Bull (1)**, **Bear (-1)**, **Transition (0)**.  
  
**Entry requires both:**  
— Net confidence exceeding the Enter Threshold (default 12)  
— Dominance exceeding the Dominance Threshold (default 0.18)  
  
**Holding requires:**  
— Net confidence above the Hold Threshold (default 5) — deliberately lower than the enter threshold  
— Opposing pressure below 0.58  
— Erosion (peak confidence minus current) below 35% of current confidence  
  
The gap between enter and hold thresholds creates **hysteresis** — it takes more evidence to enter a state than to maintain it. This prevents the state from flickering rapidly between bull and bear when evidence is marginal.  
  
**Transition substates:**  
When in Transition (0), the system further classifies the type of transition:  
— **Early** (substate 1): just exited a directional state (within 3 bars)  
— **Contested** (substate 2): both bull and bear confidence are above 50% of enter threshold  
— **Rotation** (substate 3): exhaustion evidence dominates (&gt;35% of total evidence)  
— **Compression** (substate 4): compression evidence dominates, impulse is low — potential breakout setup  
  
**Damage Detection**  
While in a directional state, the system checks for **structural damage** — evidence that the trend is deteriorating:  
  
Damage factors (Bull state example):  
— Price below the 21-EMA anchor: +1.5  
— Bearish impulse candle detected: +1.0  
— Upper wick ratio &gt; 35%: +0.75  
— Anchor slope negative: +1.0  
— Bear pressure above 45%: +1.0  
— Lower close and lower high vs prior bar: +0.75  
— Price crossed below anchor: +1.25  
  
Total damage score is compared against the Damage Threshold (default 4.0). When exceeded:  
— Continuation evidence is reduced by ~44%  
— Impulse evidence is reduced by 12%  
— Structure evidence is reduced by 8%  
— Opposing side gets 1.5 exhaustion + 1.0 impulse bonus  
— Damaged status enables signals in the opposing direction even during a directional state  
  
**Erosion Tracking**  
The system tracks peak confidence (with slow 0.985 decay) and measures how far current confidence has fallen from its peak. This "erosion" metric captures trends that are slowly losing steam even without acute damage events.  
  
**Integrity Score**  
A composite 0–1 score reflecting how healthy the current state is:  
  
Deductions (Bull state example):  
— Erosion from peak: up to -0.30 (proportional to erosion/peak ratio)  
— Damage score: up to -0.30 (proportional to damage/threshold ratio)  
— Bear pressure: up to -0.20  
  
During Transition: baseline deductions of -0.15 and -0.10, plus time-based decay (-0.01 per bar in transition).  
  
**Directional Permissions**  
The structural context layer outputs:  
— **allowLong / allowShort**: boolean gates  
— **preferLong / preferShort**: scaled 0–1 preference values  
  
**Bull state:** allows long, blocks short (unless damaged — then short allowed)  
**Bear state:** allows short, blocks long (unless damaged — then long allowed)  
**Transition:** both allowed, with mild preference based on which side has more evidence  
  
**How the Context Layer Modifies RCM Signals**  
Two configurable interactions:  
  
**1. Gate Signals by State** (toggle)  
When enabled: bull patterns are suppressed during Bear state; bear patterns suppressed during Bull state. This is the primary filter. During Transition, both directions are allowed.  
  
**2. Integrity Modulates Tier** (toggle)  
When enabled: integrity above 0.8 in a directional state with aligned signal direction boosts tier by +1 (max T4). Integrity below 0.4 demotes tier by -1 (min T1). Compression substate (potential breakout) also boosts tier by +1.  
  
**Reinforcement-Based Weight Adjustment**  
DPU includes a simple reinforcement mechanism that adjusts per-category weight multipliers over time.  
  
**How it works:**  
  
When a pattern triggers, a trade record is stored with category, direction, and entry price  
After a configurable number of bars (default 12), the system checks if price moved in the signal direction  
If yes: the category's weight increases by the plasticity value (default 0.03)  
If no: the weight decreases by the same amount  
If the trade exceeds the memory timeout (default 60 bars) without evaluation, it expires with no weight change  
Weights are clamped between 0.5 and 2.0. They affect signal triangle opacity (higher weight = more visible) and serve as a running performance record per category. They do **not** affect the RCM scoring thresholds or increment values — they only modulate visual emphasis and provide performance tracking data.  
  
**Circuit Breaker**  
Three-level protection against anomalous market events:  
  
**Level 1** (range &gt; 1.5 ATR): All increments halved. Scores still accumulate but more slowly. Dashboard shows ⚠.  
  
**Level 2** (range &gt; configurable L2 threshold, default 2× ATR, OR gap &gt; configurable gap threshold): Scoring paused entirely. Cooldown timer starts. Upon cooldown completion, all existing scores are reduced by 30%. Dashboard shows 🔶 with countdown.  
  
**Level 3** (range &gt; configurable L3 threshold, default 3× ATR): All slots hard-reset to zero. Longer cooldown. Dashboard shows 🔴. This handles flash crashes, news spikes, or market breaks where all prior pattern analysis is invalidated.  
  
A **volume floor** check (default 0.15× average volume) also pauses scoring during periods of negligible volume where price action is unreliable.  
  
**Dynamic Volatility Scalar (DVS)**  
Current ATR(30)/close normalized against its 100-bar average. When volatility is elevated (DVS &gt; 1.0), the system adapts by:  
— Shortening adaptive lookback lengths for pivots and geometry  
— Adjusting VSA volume thresholds (higher volatility requires proportionally higher volume for significance)  
  
Clamped between 0.5 and 2.5 to prevent extreme distortion.  
  
**Footprint Data Integration**  
When footprint data is available (requires compatible data feed), DPU uses actual buy/sell volume and delta calculations. When footprint data is unavailable, delta is estimated from bar position: delta ≈ volume × (2 × (close - low)/(high - low) - 1). The dashboard indicates which mode is active (✅ FP or ⚡ Est).  
  
Delta is used as supplementary confirmation only — it never triggers patterns independently. It adds or subtracts small increments (typically 5 points) to patterns that have already met primary conditions.  
  
**Visual System**  
**Bar Boxes**: Colored by category (Candle, Structure, VSA, Geometry, Harmonic — each has a distinct color per theme). Box style configurable: body only, wick, or full bar. Opacity configurable. History length configurable.  
[![snapshot](https://www.tradingview.com/x/jMtk5gQc/)](https://www.tradingview.com/x/jMtk5gQc/)  
 




 
**Pattern Badges**: Two-letter abbreviations positioned at box edges with tooltip showing full pattern name, category, confidence %, tier, and (if enabled) structural context integrity.  
[![snapshot](https://www.tradingview.com/x/a9CmrcjC/)](https://www.tradingview.com/x/a9CmrcjC/)  
  
**Instant Pattern Boxes**: Dashed borders distinguish single-bar formations from rolling patterns.  
  
**Range Zones**: When a pattern triggers, a box is drawn from the bar where accumulation started to the trigger bar, spanning the high-to-low of that formation period. Labeled with pattern name, duration, and peak confidence.  
[![snapshot](https://www.tradingview.com/x/mnupgHk9/)](https://www.tradingview.com/x/mnupgHk9/)  
  
**Signal Triangles**: ▲ below bar for bull signals, ▼ above bar for bear signals. Opacity is modulated by category weight (higher RL weight = more opaque) and tier (T3+ = more visible).  
[![snapshot](https://www.tradingview.com/x/JsW0L9PI/)](https://www.tradingview.com/x/JsW0L9PI/)  
  
**Six themes** available: Quantum, Stealth, Bloomberg, Amber, Arctic, DAFE Signature.  
  
**Dashboards**  
**Mixing Board (top-right)**: Displays all 38 rolling slots grouped by category. Each slot shows a confidence bar (█░ format), percentage, and status (Dev → Build → Near → TRIG, or cooldown countdown). Categories can be individually toggled on/off. Slots below the configurable "Hide Below" threshold show minimal formatting. Shows data source, DVS, circuit breaker status, structural context state, and global confluence level.  
[![snapshot](https://www.tradingview.com/x/EPbguc2c/)](https://www.tradingview.com/x/EPbguc2c/)  
  
**RL + Context Dashboard (bottom-left)**: Shows structural context state/substate, integrity bar, damage status, dominance, directional permissions with pressure values, per-category RL weights with win/total/win-rate, overall performance (W/L/Exp), active trade count, and narration section.  
  
**Narration Engine**: Contextual text suggestions generated from current state:  
— Category firing too frequently → suggests raising threshold  
— Low win-rate category → suggests review  
— Silent category → suggests lowering threshold  
— High/low signal rate → suggests sensitivity adjustment  
— Structural damage detected → reports with integrity level  
— Compression detected → notes breakout preparation  
— High confluence → notes multi-category alignment  
— RL weight anomalies → reports faded categories  
[![snapshot](https://www.tradingview.com/x/72DBisuJ/)](https://www.tradingview.com/x/72DBisuJ/)  
  
**Alerts**  
Six alert conditions:  
— Bull Signal (any triggered pattern, bull direction)  
— Bear Signal (any triggered pattern, bear direction)  
— High Confluence (T3+ signal)  
— Structural Context → Bull (state enters Bull)  
— Structural Context → Bear (state enters Bear)  
— Structural Damage Detected  
  
**Data Export**  
Seven hidden plots for external system integration: Best Score, Confluence %, Circuit Breaker Level, Delta, DVS, Integrity %, State, Net Confidence.  
  
**Configuration Notes**  
• All defaults are calibrated. Start with defaults and adjust based on dashboard feedback.  
• **Global Sensitivity** is the single most impactful setting — it scales all increments uniformly.  
• Raising a category threshold reduces that category's triggers; lowering increases them.  
• Lifespans control how long patterns have to complete. Shorter lifespans = only fast-forming patterns trigger. Longer = more patient accumulation allowed.  
• The structural context layer can be fully disabled via the toggle if you prefer raw RCM signals without environmental filtering.  
• Plasticity controls how aggressively RL weights adjust. 0.03 is stable. Higher values respond faster to performance changes but are more volatile.  
  
**Terminology Disclaimer**  
Terms like "Brain," "Intelligence," "Learning," and "Memory" used throughout this indicator and its documentation are **symbolic labels** for rules-based programming constructs. They refer to conditional logic, arrays, decay functions, and state variables — standard programming techniques. No artificial intelligence, neural networks, or machine learning algorithms are employed. The "Brain" is an evidence accumulation and state classification system. "Learning" refers to simple weight adjustment based on outcome tracking. "Memory" refers to an array of trade records.  
  
— Dskyz, Trade with insight. Trade with anticipation. (Don't follow the trend, be the trend)