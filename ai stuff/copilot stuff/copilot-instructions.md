# Dskyz[Dafe] Trading Systems — Project Guidelines

**Language**: Pine Script 6 (TradingView only — no build system, no tests, no package manager)  
**Publisher**: `DskyzInvestments` on TradingView  
**Purpose**: A modular, regime-aware structural confidence framework for manual and algorithmic trading.

## Architecture

The codebase follows a **Library → Indicator** pattern:

- `Dskyz[Dafe]_collective/Libraries/` — Exportable Pine Script libraries (e.g., `DafeRCMLib`, `DafeVisLib`)
- `Dskyz[Dafe]_collective/Indicators/` — Chart indicators that import and consume libraries
- `Dskyz[Dafe]_collective/Stratagies/` — TradingView strategy scripts (note: folder name is intentionally kept as-is)
- `Dskyz[Dafe]_collective/Snippets/` — Reusable code fragments not yet promoted to libraries

Libraries are published to TradingView with versioned imports:
```pine
import DskyzInvestments/DafeRCMLib/1 as rcm
```

Indicators never duplicate library logic — they call exported functions and pass through configuration.

## Core System: Rolling Confidence Matrix (RCM)

The RCM is the central engine. It accumulates evidence into 5 **per-side buckets** (Bull and Bear):

| Bucket | Captures |
|---|---|
| `impulse` | Large conviction bars |
| `structure` | Swing breaks and reclaims |
| `exhaustion` | Reversal pressure signals |
| `continuation` | Trend persistence |
| `compression` | Range contraction |

Evidence **decays every bar** (`var := nz(var[1]) * decayRate`) and is capped per bucket. State transitions require crossing entry thresholds; holding requires lower hold thresholds (hysteresis). A **damage layer** degrades the active trend when opposing evidence accumulates.

The three output states are: `Bull (1)`, `Transition (0)`, `Bear (-1)` with 4 substates (`Early`, `Contested`, `Rotational`, `Compression`).

## Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| Variables | `camelCase` | `bullImpulse`, `netConf` |
| Functions | `snake_case` | `get_band_mod()`, `conf_bar()` |
| UDTs (types) | `PascalCase` | `RCMState`, `RCMConfig` |
| Parameters / fields | `lowercase_snake_case` | `enterNetTh`, `decayRate` |
| Internal aliases | Short abbreviations | `st` = state, `cfg` = config, `ev` = evidence |

## Key Pine Script Patterns

```pine
// Decay (use on every accumulation variable)
bull_impulse := nz(bull_impulse[1]) * decayRate + new_evidence

// Hard cap (always cap bucket values)
bull_impulse := math.min(bull_impulse, maxImpulse)

// Null-safe prior bar access
prev := nz(value[1])

// Conditional evidence accumulation
if condition
    st.bullImpulse += weight
```

- Always use `nz()` when referencing prior-bar values (`[1]`)
- Always cap buckets with `math.min/max` after accumulation
- Use `var` for persistent (bar-to-bar) variables
- Visual markup uses Unicode symbols: `▲ ▼ ◆ █ ░ ✅ ⚡`

## Configuration Presets

Three presets are defined in `DafeRCMLib` — use them as the baseline:

| Preset | Timeframe | Decay | Enter Threshold |
|---|---|---|---|
| `default_config()` | Any | 0.82 | 12.0 |
| `scalp_config()` | 1m–5m | 0.75 | 8.0 |
| `swing_config()` | 4H–D | 0.88 | 16.0 |

When tuning parameters, change one at a time — small changes have large behavioral effects.

## Pitfalls

- **`[1]` on bar 0**: Lookback operators fail on the first bar; always guard with `bar_index > 0` or `nz()`
- **Hard object limits**: TradingView caps labels at 200, boxes at 50 — long chart history will silently drop old objects
- **Footprint data**: `request.footprint()` requires a paid TradingView plan; always implement a graceful fallback
- **Color objects in loops**: `color.new()` inside loops is expensive; pre-compute theme color objects once
- **External injection**: `inject()` adds evidence additively — never call it more than once per bar per signal source or you will double-count
