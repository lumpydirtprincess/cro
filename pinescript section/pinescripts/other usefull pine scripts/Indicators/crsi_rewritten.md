# cRSI - Cyclic RSI

## Architectural problem

Real-time chart analysis needs deterministic updates per bar and explicit handling of warm-up periods. Cyclic RSI addresses this by implementing cycle-aware RSI smoothing with dynamic percentile-based bands, using parameterized inputs and direct state progression without hidden warm-up dependencies.

## Design decision

This implementation favors streaming execution over batch recomputation. The trade-off is more attention to state initialization and explicit circular buffer management, but latency stays predictable when charts scale. Unlike the original implementation that relied on `ta.rma()` and `ta.change()` with implicit warm-up behavior, this version implements all smoothing logic explicitly.

## Original concept

Based on work by Lars von Thienen (CC BY 4.0)  
Source: *Decoding The Hidden Market Rhythm - Part 1: Dynamic Cycles* (2017)  
Chapter 4: Fine-tuning technical indicators - the cRSI Indicator

The cyclic RSI applies cycle-aware smoothing to traditional RSI and uses dynamic percentile bands calculated over a cyclic memory window, making it more responsive to market rhythm changes.

## API surface

### Functions

- `Calculates Cyclic RSI with explicit streaming logic and no warm-up dependencies`

### Parameters

| Parameter | Purpose |
|---|---|
| `src` | Source series to calculate cRSI for |
| `cyclelen` | Half of dominant cycle length for RSI calculation |
| `vibration` | Smoothing parameter for cyclic adjustment |
| `leveling` | Percentile threshold for dynamic bands (0-100) |
| `cyclicmemory` | Lookback period for band calculation (typically 2x dominant cycle) |

### Returns

- Tuple of `[crsi_value, lower_band, upper_band]`
  - `crsi_value`: Cycle-smoothed RSI value
  - `lower_band`: Dynamic lower percentile band
  - `upper_band`: Dynamic upper percentile band

## Input configuration

| Input variable | Type | Configuration |
|---|---|---|
| `i_domcycle` | `input.int` | default: `20`, label: "Dominant Cycle Length", minval: `10` |
| `i_source` | `input.source` | default: `close`, label: "Source" |
| `i_vibration` | `input.int` | default: `10`, label: "Vibration (Smoothing)", minval: `1` |
| `i_leveling` | `input.float` | default: `10.0`, label: "Leveling (Percentile %)", minval: `0`, maxval: `100` |

## Derived parameters

- `cyclelen = i_domcycle / 2` - RSI calculation period
- `cyclicmemory = i_domcycle * 2` - Band calculation lookback

## Runtime profile

- **Declared optimization**: Circular buffer for O(1) updates, explicit state management
- **Streaming model**: Single-pass update on each new bar with no recalculation
- **Warm-up behavior**: 
  - RSI stabilizes after `cyclelen` bars
  - Cyclic smoothing stabilizes after `vibration` bars
  - Dynamic bands stabilize after `cyclicmemory` bars
  - All warm-up periods are explicit and deterministic
- **Memory model**: 
  - Fixed-size circular buffer for cyclic memory (`cyclicmemory` elements)
  - Persistent state variables for smoothing (`var` declarations)
  - No hidden series dependencies

## Implementation details

### RSI calculation
Uses Wilder's smoothing with explicit alpha calculation:
- `alpha = 1 / cyclelen`
- Separate tracking of up and down movements
- Explicit initialization for bars < cyclelen

### Cyclic smoothing
Applies torque-based smoothing with phase adjustment:
- `torque = 2.0 / (vibration + 1)`
- `phasingLag = (vibration - 1) / 2.0`
- Combines current RSI, lagged RSI, and previous cRSI

### Dynamic bands
Percentile-based bands calculated from circular buffer:
- Maintains `cyclicmemory` most recent cRSI values
- Calculates min/max range from valid buffer values
- Iterates through 100 steps to find percentile thresholds
- Lower band: percentile from bottom (leveling %)
- Upper band: percentile from top (leveling %)

## Trade-offs

**Advantages:**
- Deterministic initialization with no hidden warm-up
- Predictable memory usage (fixed circular buffer)
- Stable per-bar execution cost
- No dependency on Pine's built-in functions with opaque behavior
- Explicit state management for debugging and verification

**Disadvantages:**
- More verbose code compared to using `ta.*` functions
- Manual circular buffer management
- Nested loops for percentile calculation (O(n²) but bounded)
- Requires understanding of streaming algorithms

Streaming logic keeps incremental cost stable, but initialization and edge-case handling become first-class concerns. That is a deliberate choice: predictable execution beats opaque recalculation spikes in live charts.

## Verification checklist

1. Open the script in TradingView and confirm it compiles under Pine Script v6
2. Validate warm-up behavior on sparse data and short histories
3. Compare output against original cRSI implementation for same parameters
4. Verify dynamic bands adjust correctly as market conditions change
5. Confirm parameter bounds reject invalid values without silent fallback
6. Test with different dominant cycle lengths (10, 20, 40) to verify scaling
7. Verify circular buffer wraps correctly after `cyclicmemory` bars
8. Check that percentile bands converge as buffer fills

## Usage notes

**Determining dominant cycle:**
The dominant cycle length should be derived from cycle analysis as described in Chapter 4 of the source material. Common approaches:
- Spectral analysis (FFT, periodogram)
- Autocorrelation methods
- Ehlers cycle indicators (MAMA, HT_DCPERIOD)
- Visual inspection of price swings

**Parameter tuning:**
- `Dominant Cycle Length`: 10-40 bars typical, depends on timeframe and market
- `Vibration`: Higher values = smoother but more lag (5-15 typical)
- `Leveling`: Lower values = tighter bands (5-15% typical)

## References

- Source code: `other usefull pine scripts/Indicators/crsi_rewritten.pine`
- Documentation file: `other usefull pine scripts/Indicators/crsi_rewritten.md`
- Original implementation: `other usefull pine scripts/Indicators/crsi.ps`
- Original concept: Lars von Thienen, *Decoding The Hidden Market Rhythm* (2017)
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Rewritten implementation: MIT License
