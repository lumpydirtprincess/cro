Market Structure Library (MSL)
A Multi-Timeframe Structural Analysis Toolkit for Pine Script
A Developer's Library for Building Advanced Structural Analysis Indicators.

🎓 THEORETICAL FOUNDATION
The Market Structure Library (MSL) is a collection of functions and data types designed for Pine Script developers to build custom structural analysis indicators. It provides a framework for analyzing market geometry, liquidity, and order flow across multiple timeframes. The library's functions handle complex calculations related to multi-timeframe data aggregation and analysis.

The system is organized around four functional pillars that work together to provide a unified structural context.
Pillar 1: Unified Liquidity Context
The library's primary function is to create a unified view of market activity. It includes logic to automatically detect if real footprint data is available.

With Footprint Data: It utilizes bid-ask volume, delta, and Value Area metrics for analysis.
Without Footprint Data: It employs a mathematical OHLCV proxy to model bar dynamics and approximate buy/sell pressure, absorption, and aggressor intent.
This dual-mode capability allows indicators built with the library to function consistently regardless of the user's data source.

Pillar 2: Multi-Timeframe Structure Aggregation
Market structure is fractal, with higher timeframe levels influencing lower timeframe price action. The MSL is designed to manage this by providing a master container (MultiTFStructure) that holds and organizes structural data—including swing points, value areas, and dynamic levels—for up to four user-defined timeframes. This allows a script to query and act on a complete, multi-layered market picture.

Pillar 3: Dynamic Structure - The Siege Corridor
The MSL introduces 'Siege Corridors,' which are dynamic trendlines projected from consecutive pivot points. These are data objects that are updated with price interaction statistics, including hit count, energy decay, order flow alignment, and the calculated probability of a break or failure.

Pillar 4: High-Probability Confluence Zones
Significant price action often occurs where structure from multiple timeframes aligns. The library's find_zones function is a discovery utility that scans all tracked levels across all timeframes. It identifies these Confluence Zones where levels cluster, calculating their combined strength, dominant type (supply/demand), and overall bias.

🔧 COMPREHENSIVE API & DATA TYPES
This library provides developers with a set of data structures (types) to utilize in their scripts. A clear understanding of these types is essential for proper implementation.

Core Data Types
MarketContext: A per-bar snapshot of liquidity, blending Footprint and OHLCV models. Includes unified_delta, absorption, spread_proxy, and vol_quality.

LevelLiquidity: A detailed analysis of order flow specifically at a structural level. Provides hold_probability, break_probability, and an action_type classifier ("defending", "absorbing", "attacking").

StructureLevel: Represents a single horizontal level (e.g., POC, VAH, Swing High/Low). Contains its price, level_type, timeframe, strength, age, and its own LevelLiquidity object.

SiegeCorridor: The complete object for a dynamic trendline. Contains anchor points, slope, hit_count, decay, and break_prob/fail_prob.

Container Types
TimeframeStructure: The container for all structural information for a single timeframe. It holds the poc, vah, val_, an array of all StructureLevel objects, and the res_corridor and sup_corridor.

MultiTFStructure: The master object that a script will primarily interact with. It holds up to four TimeframeStructure objects, providing the complete multi-timeframe view.
Analysis & State Types

ConfluenceZone: An object representing a cluster of levels. Contains the zone's average price, width, level_count, and combined_strength.

StructureState: A high-level summary for decision-making logic. Provides nearest_support, nearest_resistance, net_bias, and a boolean for whether price is inside_value.

IntrabarState: Designed for real-time, tick-level analysis. Indicates if price is currently touching a POC, VAH, Siege Corridor, or Confluence Zone.

🎨 VISUALIZING THE STRUCTURE (IMPLEMENTATION EXAMPLES)
The provided images demonstrate visualizations that can be built using the data objects from the MSL. The library supplies the calculated data; the developer controls the visual output.

Drawing Confluence Zones (Boxes)
Use the find_zones() function to get an array of ConfluenceZone objects. For each zone:
The box's vertical position is determined by zone.price.
The box's height is determined by zone.width.
The box's color can be conditional on zone.dominant_type ("supply" or "demand").
The box's styling (e.g., opacity) can be driven by zone.combined_strength.
snapshot


Drawing Siege Corridors (Channels)
Access the res_corridor and sup_corridor from a TimeframeStructure object.
The central dashed line is drawn from corr.anchor_bar_a/corr.anchor_price_a to the current bar, extended by corr.slope.
Outer boundary lines can be drawn parallel to the central line, offset by an ATR-based value.
snapshot


Drawing Value Area & Swing Levels (Horizontal Lines)
Iterate through the levels array within each TimeframeStructure.
Use level.price to draw the line.
Use get_level_color(level) to apply a consistent color scheme based on the level.level_type.
snapshot


Creating Informative Labels
Labels can be generated by combining data from library objects. A label for a resistance level could display:
Level Type & Timeframe: level.level_type + level.timeframe
Hold/Break Probabilities: Access level.liquidity.hold_probability when price interacts with the level.
Siege Stats: For a siege corridor, display corr.hit_count and corr.fail_prob.
snapshot


📚 DEVELOPER INTEGRATION GUIDE
This guide outlines the process for integrating the MSL into a Pine Script indicator.

Step 1: Import & Initialization
Import the library and initialize the master MultiTFStructure container in the script's global scope.
Pine Script®

import DskyzInvestments/MarketStructureLib/1 as msl
var msl.MultiTFStructure structure = msl.create_structure()


Step 2: Define Timeframes & Collect Data
Define the timeframes for analysis. Use request.security to retrieve the required OHLCV and pivot data for each timeframe.
Pine Script®

// --- INPUTS ---
tf1 = input.timeframe("15", "Timeframe 1")
pivot_len = input.int(15, "Pivot Lookback")

// --- DATA COLLECTION ---
// Request TF1 data using request.security()
// Collect historical arrays of highs, lows, pivots, etc. for TF1

Expand 2 lines


Step 3: Get Unified Market Context
Once per bar, generate the fused liquidity context. This object is passed to other functions for liquidity calculations.
Pine Script®

// --- MAIN LOGIC ---
float atr_val = ta.atr(14)
footprint fp = request.footprint(100, 70) // Optional: use 'na' if not using footprint
msl.MarketContext ctx = msl.get_market_context(open, high, low, close, volume, fp, ta.sma(volume, 20), nz(structure.tf1.poc[1]), atr_val)


Step 4: Update the Structure Container
On each bar, update the respective TimeframeStructure object within the master container.
Pine Script®

// Calculate TF1's Value Area from historical arrays
[poc1, vah1, val1] = msl.calc_unified_poc_va(h_arr1, l_arr1, c_arr1, v_arr1, 24, fp)

// Update the structure object for TF1
structure.tf1 := msl.update_structure(structure.tf1, poc1, vah1, val1, sh_p1, sh_b1, sl_p1, sl_b1, tf1, atr_val, ctx)
// Repeat for structure.tf2, etc.

Expand 1 line


Step 5: Analyze and Use the Data
With the structure updated, perform high-level analysis using the state and zone functions.
Pine Script®

// Find Confluence Zones with a 0.3% price tolerance
array<msl.ConfluenceZone> zones = msl.find_zones(structure, 0.3) 

// Get the high-level summary state
msl.StructureState state = msl.get_structure_state(structure, close, false)
// Use state.net_bias, state.nearest_support, etc. for indicator logic

// Get Real-Time Intra-Bar State for precise alerts
float alert_tolerance = atr_val * 0.1
msl.IntrabarState ib_state = msl.scan_intrabar_levels(structure, zones, close, alert_tolerance)
if ib_state.at_confluence
    alert("Price is at " + ib_state.active_level_name, alert.freq_once_per_bar)

Expand 7 lines


Step 6: Visualization
Use the data from the structure, zones, and state objects to implement the script's visual elements (lines, boxes, tables, labels).

🔮 CONCLUSION
The Market Structure Library (MSL) library provides a structured set of tools for developers working with multi-timeframe market structure. By encapsulating complex calculations for data aggregation, liquidity modeling, and geometric analysis, it allows developers to focus on the specific logic and visualization of their custom indicators. The library is designed to serve as a foundational component for building detailed and context-aware analysis tools in Pine Script.
Pine library

In true TradingView spirit, the author has published this Pine code as an open-source library so that other Pine programmers from our community can reuse it. Cheers to the author! You may use this library privately or in other open-source publications, but reuse of this code in publications is governed by House Rules.


DskyzInvestments

Follow
Also on:
Disclaimer
The information and publications are not meant to be, and do not constitute, financial, investment, trading, or other types of advice or recommendations supplied or endorsed by T