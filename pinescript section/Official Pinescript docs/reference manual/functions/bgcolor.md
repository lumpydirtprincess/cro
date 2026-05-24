# bgcolor()

Fill background of bars with specified color.

Syntax

```
bgcolor(color, offset, editable, show_last, title, display, force_overlay) → void
```

Arguments

color (series color) Color of the filled background. You can use constants like 'red' or '#ff001a' as well as complex expressions like 'close >= open ? color.green : color.red'. Required argument.

offset (simple int) Shifts the color series to the left or to the right on the given number of bars. Default is 0.

editable (input bool) If true then bgcolor style will be editable in Format dialog. Default is true.

show_last (input int) Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.

title (const string) Title of the bgcolor. Optional argument.

display (input plot_simple_display) Controls where the bgcolor is displayed. Possible values are: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Default is [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all).

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the plotted results will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

Example

```
//@version=6
indicator("bgcolor example", overlay=true)
bgcolor(close < open ? color.new(color.red,70) : color.new(color.green, 70))
```

See also

[barcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_barcolor) [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill)
