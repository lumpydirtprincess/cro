# indicator()

A declaration statement that identifies the script as an indicator and sets specific script-wide properties.

Syntax

```
indicator(title, shorttitle, overlay, format, precision, scale, max_bars_back, timeframe, timeframe_gaps, explicit_plot_zorder, max_lines_count, max_labels_count, max_boxes_count, calc_bars_count, max_polylines_count, dynamic_requests, behind_chart) → void
```

Arguments

title (const string) A string representing the script's title. The script displays the string's text in all possible locations if the declaration statement does not include a `shorttitle` argument. Additionally, the "Publish script" window uses the text as the default title for a [script publication](https://www.tradingview.com/pine-script-docs/writing/publishing/).

shorttitle (const string) Optional. A string representing the script's display name on charts. If specified and not an empty string, the value's text replaces the `title` string in most chart locations, including the "Settings" window, the script's status line, the Data Window, and the "Create alert" dialog box. Otherwise, the `title` string appears as the script's title in all locations. The default is an empty string.

overlay (const bool) Optional. If `true`, the script's visuals appear on the main chart pane if the user adds it to the chart directly, or in another script's pane if the user applies it to that script. If `false`, the script's visuals appear in a separate pane. However, if a function call that creates [visuals](https://www.tradingview.com/pine-script-docs/visuals/overview/) includes `force_overlay = true`, its output always appears on the main chart pane, even if the script occupies a separate pane. Changes to this argument apply only after the user adds the script to the chart again. Additionally, if the user moves the script to another pane by selecting a "Move to" option in the script's "More" menu, the script does not move back to its original pane after any updates to the source code. The default is `false`.

format (const string) Optional. Specifies the format of the script's plotted values. Possible values are [format.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_format.inherit), [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price), [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume), and [format.percent](https://www.tradingview.com/pine-script-reference/v6/#const_format.percent). The default is [format.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_format.inherit).

precision (const int) Optional. Specifies the number of fractional digits that the script shows for plotted numbers. The value must be an integer from 0 to 16. If specified and the `format` argument is [format.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_format.inherit), the script uses [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price) as the formatting option instead. If the `format` argument is {format.volume}, the script ignores the `precision` value, because the decimal precision rules specified by [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume) supersede other precision settings. By default, the script inherits the precision settings of the chart.

scale (const scale_type) Optional. Determines the location of the script's price scale and the scaling behavior of the script's visuals. Possible values are [scale.right](https://www.tradingview.com/pine-script-reference/v6/#const_scale.right), [scale.left](https://www.tradingview.com/pine-script-reference/v6/#const_scale.left), and [scale.none](https://www.tradingview.com/pine-script-reference/v6/#const_scale.none). If specified and the script overlays on the main chart pane or another script's pane, the script scales its visuals independently to fit the pane's visual space. If the script occupies the same pane as the main chart or another script, [scale.right](https://www.tradingview.com/pine-script-reference/v6/#const_scale.right) or [scale.left](https://www.tradingview.com/pine-script-reference/v6/#const_scale.left) adds a separate price scale for the script to the left or right side of that pane. If the script occupies a separate pane, either argument positions the price scale for that pane on the left or right side without adding a new scale. If the argument is [scale.none](https://www.tradingview.com/pine-script-reference/v6/#const_scale.none), which is valid only if the `overlay` argument is `true`, the script displays plotted numbers directly on the scale of the existing pane, or displays values on a new price scale if the user moves it to a new pane. Changes to the argument apply only after the user adds the script to the chart again. If not specified, the script uses the main price scale for the pane it occupies, and it does not scale its visuals separately if it overlays on an existing pane.

max_bars_back (const int) Optional. Sets the minimum length of all the script's historical buffers, which determine the number of bars back that the script can reference for each series using the [\[\]](https://www.tradingview.com/pine-script-reference/v6/#op_[]) operator or the functions that retrieve history internally. The value must be an integer from 0 to 5000. By default, Pine's runtime system automatically calculates appropriate historical buffer sizes for each series while loading a script. Manually setting buffer sizes is necessary only in rare cases where automatic size detection fails. See the [Historical buffers](https://www.tradingview.com/pine-script-docs/language/execution-model/#historical-buffers) section of our User Manual for advanced details.

timeframe (const string) Optional. A valid [timeframe string](https://www.tradingview.com/pine-script-docs/concepts/timeframes/#timeframe-string-specifications) that determines the main timeframe the script uses for its calculations. If specified, the script automatically adds a "Timeframe" input to the "Settings/Inputs" tab. The input's displayed default in the tab represents the same timeframe as the specified argument. If the value is an empty string or not specified, the script uses the same timeframe as the chart. An argument is allowed for this parameter only if the script does not use [drawing types](https://www.tradingview.com/pine-script-docs/language/type-system/#drawing-types) or [alert()](https://www.tradingview.com/pine-script-reference/v6/#fun_alert) function calls.

timeframe_gaps (const bool) Optional. Controls how the script displays plotted values if the `timeframe` value represents a higher timeframe than the chart's timeframe. An argument for this parameter is allowed only if the call includes a `timeframe` argument. If specified, the script adds a "Wait for timeframe closes" input, where users can change the setting, below the generated "Timeframe" input in the "Settings/Inputs" tab. If `true`, the indicator displays values only on the chart bars where new higher-timeframe data is available, and [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) on all other bars. If `false`, the indicator displays the last retrieved values on all chart bars where new data is not available. The default is `true`.

explicit_plot_zorder (const bool) Optional. Specifies which rules the script uses to determine the visual order of plots from `plot*()` calls, levels from [hline()](https://www.tradingview.com/pine-script-reference/v6/#fun_hline) calls, and fills from [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill) calls on the chart. If `true`, the indicator displays these visuals in the order of their function calls in the code. If `false`, the script uses the default [z-index](https://www.tradingview.com/pine-script-docs/visuals/overview/#z-index) rules to determine the order of the visuals. The default is `false`.

max_lines_count (const int) Optional. Determines the maximum number of [line](https://www.tradingview.com/pine-script-reference/v6/#type_line) objects that remain available to the script. The system automatically deletes the oldest [line](https://www.tradingview.com/pine-script-reference/v6/#type_line) objects when the number of lines exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 lines.

max_labels_count (const int) Optional. Determines the maximum number of [label](https://www.tradingview.com/pine-script-reference/v6/#type_label) objects that remain available to the script. The system automatically deletes the oldest [label](https://www.tradingview.com/pine-script-reference/v6/#type_label) objects when the number of labels exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 labels.

max_boxes_count (const int) Optional. Determines the maximum number of [box](https://www.tradingview.com/pine-script-reference/v6/#type_box) objects that remain available to the script. The system automatically deletes the oldest [box](https://www.tradingview.com/pine-script-reference/v6/#type_box) objects when the number of boxes exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 boxes.

calc_bars_count (const int) Optional. Determines how many of the most recent historical bars are available to the script. If specified, the script automatically adds a "Calculated bars" input to the "Settings/Inputs" tab. If the value is positive and less than the number of historical bars in the dataset, the script starts its calculations that number of bars before the most recent bar. If the value is 0, the script's calculations start on the dataset's first bar. The default is 0.

max_polylines_count (const int) Optional. Determines the maximum number of [polyline](https://www.tradingview.com/pine-script-reference/v6/#type_polyline) objects that remain available to the script. The system automatically deletes the oldest [polyline](https://www.tradingview.com/pine-script-reference/v6/#type_polyline) objects when the number of polylines exceeds the limit. The limit specified by the argument is approximate; the script might display more drawings than specified. The default is ~50 polylines.

dynamic_requests (const bool) Optional. Specifies whether the script can use dynamic `request.*()` function calls. Dynamic `request.*()` calls are allowed within the local scopes of conditional structures (e.g., [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if)), loops (e.g., [for](https://www.tradingview.com/pine-script-reference/v6/#kw_for)), and exported functions. Additionally, such calls allow "series" arguments for several parameters that otherwise require values with "simple" or weaker qualifiers. See the [Dynamic requests](https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/#dynamic-requests) section of our User Manual for more information. The default is `true`.

behind_chart (const bool) Optional. Controls whether all plots and drawings appear behind the chart display (if `true`) or in front of it (if `false`). This parameter takes effect only when the `overlay` argument is `true`. Changes to the argument apply only after the user adds the script to the chart again. The default is `true`.

Example

```
//@version=6
indicator("My script", shorttitle="Script")
plot(close)
```

Remarks

Every indicator script must include exactly one [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) statement in the code.

See also

[strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) [library()](https://www.tradingview.com/pine-script-reference/v6/#fun_library)
