# plotshape()

Plots visual shapes on the chart.

Syntax

```
plotshape(series, title, style, location, color, offset, text, textcolor, editable, size, show_last, display, format, precision, force_overlay) → void
```

Arguments

series (series int/float/bool) Series of data to be plotted as shapes. Series is treated as a series of boolean values for all location values except [location.absolute](https://www.tradingview.com/pine-script-reference/v6/#const_location.absolute). Required argument.

title (const string) Title of the plot.

style (input string) Type of plot. Possible values are: [shape.xcross](https://www.tradingview.com/pine-script-reference/v6/#const_shape.xcross), [shape.cross](https://www.tradingview.com/pine-script-reference/v6/#const_shape.cross), [shape.triangleup](https://www.tradingview.com/pine-script-reference/v6/#const_shape.triangleup), [shape.triangledown](https://www.tradingview.com/pine-script-reference/v6/#const_shape.triangledown), [shape.flag](https://www.tradingview.com/pine-script-reference/v6/#const_shape.flag), [shape.circle](https://www.tradingview.com/pine-script-reference/v6/#const_shape.circle), [shape.arrowup](https://www.tradingview.com/pine-script-reference/v6/#const_shape.arrowup), [shape.arrowdown](https://www.tradingview.com/pine-script-reference/v6/#const_shape.arrowdown), [shape.labelup](https://www.tradingview.com/pine-script-reference/v6/#const_shape.labelup), [shape.labeldown](https://www.tradingview.com/pine-script-reference/v6/#const_shape.labeldown), [shape.square](https://www.tradingview.com/pine-script-reference/v6/#const_shape.square), [shape.diamond](https://www.tradingview.com/pine-script-reference/v6/#const_shape.diamond). Default value is [shape.xcross](https://www.tradingview.com/pine-script-reference/v6/#const_shape.xcross).

location (input string) Location of shapes on the chart. Possible values are: [location.abovebar](https://www.tradingview.com/pine-script-reference/v6/#const_location.abovebar), [location.belowbar](https://www.tradingview.com/pine-script-reference/v6/#const_location.belowbar), [location.top](https://www.tradingview.com/pine-script-reference/v6/#const_location.top), [location.bottom](https://www.tradingview.com/pine-script-reference/v6/#const_location.bottom), [location.absolute](https://www.tradingview.com/pine-script-reference/v6/#const_location.absolute). Default value is [location.abovebar](https://www.tradingview.com/pine-script-reference/v6/#const_location.abovebar).

color (series color) Color of the shapes. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.

offset (simple int) Shifts shapes to the left or to the right on the given number of bars. Default is 0.

text (const string) Text to display with the shape. You can use multiline text, to separate lines use '\\n' escape sequence. Example: 'line one\\nline two'.

textcolor (series color) Color of the text. You can use constants like 'textcolor=color.red' or 'textcolor=#ff001a' as well as complex expressions like 'textcolor = close >= open ? color.green : color.red'. Optional argument.

editable (input bool) If true then plotshape style will be editable in Format dialog. Default is true.

size (const string) Size of shapes on the chart. Possible values are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge). Default is [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto).

show_last (input int) Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.

display (input plot_display) Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.pane](https://www.tradingview.com/pine-script-reference/v6/#const_display.pane), [display.data_window](https://www.tradingview.com/pine-script-reference/v6/#const_display.data_window), [display.price_scale](https://www.tradingview.com/pine-script-reference/v6/#const_display.price_scale), [display.status_line](https://www.tradingview.com/pine-script-reference/v6/#const_display.status_line), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Optional. The default is [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all).

format (input string) Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator), and [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) functions. Optional. The default is the `format` value used by the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator)/ [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) function. Possible values: [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price), [format.percent](https://www.tradingview.com/pine-script-reference/v6/#const_format.percent), [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume).

precision (input int) The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) and [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) functions. When the function's `format` parameter uses [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume), the `precision` parameter will not affect the result, as the decimal precision rules defined by [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume) supersede other precision settings. Optional. The default is the `precision` value used by the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator)/ [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) function.

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

Example

```
//@version=6
indicator("plotshape example 1", overlay=true)
data = close >= open
plotshape(data, style=shape.xcross)
```

Remarks

Use [plotshape()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotshape) function in conjunction with 'overlay=true' [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) parameter!

See also

[plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) [plotchar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotchar) [plotarrow()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotarrow) [barcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_barcolor) [bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_bgcolor)
