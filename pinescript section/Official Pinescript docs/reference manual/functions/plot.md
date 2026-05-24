# plot()

Plots a series of data on the chart.

Syntax

```
plot(series, title, color, linewidth, style, trackprice, histbase, offset, join, editable, show_last, display, format, precision, force_overlay, linestyle) → plot
```

Arguments

series (series int/float) Series of data to be plotted. Required argument.

title (const string) Title of the plot.

color (series color) Color of the plot. You can use constants like 'color=color.red' or 'color=#ff001a' as well as complex expressions like 'color = close >= open ? color.green : color.red'. Optional argument.

linewidth (input int) Width of the plotted line. Default value is 1. Not applicable to every style.

style (input plot_style) Type of plot. Possible values are: [plot.style_line](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_line), [plot.style_stepline](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_stepline), [plot.style_stepline_diamond](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_stepline_diamond), [plot.style_histogram](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_histogram), [plot.style_cross](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_cross), [plot.style_area](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_area), [plot.style_columns](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_columns), [plot.style_circles](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_circles), [plot.style_linebr](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_linebr), [plot.style_areabr](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_areabr), [plot.style_steplinebr](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_steplinebr). Default value is [plot.style_line](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_line).

trackprice (input bool) If true then a horizontal price line will be shown at the level of the last indicator value. Default is false.

histbase (input int/float) The price value used as the reference level when rendering plot with [plot.style_histogram](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_histogram), [plot.style_columns](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_columns) or [plot.style_area](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_area) style. Default is 0.0.

offset (simple int) Shifts the plot to the left or to the right on the given number of bars. Default is 0.

join (input bool) If true then plot points will be joined with line, applicable only to [plot.style_cross](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_cross) and [plot.style_circles](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_circles) styles. Default is false.

editable (input bool) If true then plot style will be editable in Format dialog. Default is true.

show_last (input int) Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.

display (input plot_display) Controls where the plot's information is displayed. Display options support addition and subtraction, meaning that using `display.all - display.status_line` will display the plot's information everywhere except in the script's status line. `display.price_scale + display.status_line` will display the plot only in the price scale and status line. When `display` arguments such as `display.price_scale` have user-controlled chart settings equivalents, the relevant plot information will only appear when all settings allow for it. Possible values: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.pane](https://www.tradingview.com/pine-script-reference/v6/#const_display.pane), [display.data_window](https://www.tradingview.com/pine-script-reference/v6/#const_display.data_window), [display.price_scale](https://www.tradingview.com/pine-script-reference/v6/#const_display.price_scale), [display.status_line](https://www.tradingview.com/pine-script-reference/v6/#const_display.status_line), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Optional. The default is [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all).

format (input string) Determines whether the script formats the plot's values as prices, percentages, or volume values. The argument passed to this parameter supersedes the `format` parameter of the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator), and [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) functions. Optional. The default is the `format` value used by the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator)/ [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) function. Possible values: [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price), [format.percent](https://www.tradingview.com/pine-script-reference/v6/#const_format.percent), [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume).

precision (input int) The number of digits after the decimal point the plot's values show on the chart pane's y-axis, the script's status line, and the Data Window. Accepts a non-negative integer less than or equal to 16. The argument passed to this parameter supersedes the `precision` parameter of the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) and [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) functions. When the function's `format` parameter uses [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume), the `precision` parameter will not affect the result, as the decimal precision rules defined by [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume) supersede other precision settings. Optional. The default is the `precision` value used by the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator)/ [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) function.

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

linestyle (input plot_line_style) Optional. A modifier for plot styles that display lines. It specifies whether the plotted line is solid ( [plot.linestyle_solid](https://www.tradingview.com/pine-script-reference/v6/#const_plot.linestyle_solid)), dashed ( [plot.linestyle_dashed](https://www.tradingview.com/pine-script-reference/v6/#const_plot.linestyle_dashed)), or dotted ( [plot.linestyle_dotted](https://www.tradingview.com/pine-script-reference/v6/#const_plot.linestyle_dotted)). The modifier applies only when the function uses one of the following `style` arguments: [plot.style_line](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_line), [plot.style_linebr](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_linebr), [plot.style_stepline](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_stepline), [plot.style_stepline_diamond](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_stepline_diamond), and [plot.style_area](https://www.tradingview.com/pine-script-reference/v6/#const_plot.style_area). The default is [plot.linestyle_solid](https://www.tradingview.com/pine-script-reference/v6/#const_plot.linestyle_solid).

Example

```
//@version=6
indicator("plot")
plot(high+low, title='Title', color=color.new(#00ffaa, 70), linewidth=2, style=plot.style_area, offset=15, trackprice=true)

// You may fill the background between any two plots with a fill() function:
p1 = plot(open)
p2 = plot(close)
fill(p1, p2, color=color.new(color.green, 90))
```

Returns

A plot object, that can be used in [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill)

See also

[plotshape()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotshape) [plotchar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotchar) [plotarrow()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotarrow) [barcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_barcolor) [bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_bgcolor) [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill)
