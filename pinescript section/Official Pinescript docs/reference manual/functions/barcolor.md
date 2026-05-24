# barcolor()

Set color of bars.

Syntax

```
barcolor(color, offset, editable, show_last, title, display) → void
```

Arguments

color (series color) Color of bars. You can use constants like 'red' or '#ff001a' as well as complex expressions like 'close >= open ? color.green : color.red'. Required argument.

offset (simple int) Shifts the color series to the left or to the right on the given number of bars. Default is 0.

editable (input bool) If true then barcolor style will be editable in Format dialog. Default is true.

show_last (input int) Optional. The number of bars, counting backwards from the most recent bar, on which the function can draw.

title (const string) Title of the barcolor. Optional argument.

display (input plot_simple_display) Controls where the barcolor is displayed. Possible values are: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Default is [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all).

Example

```
//@version=6
indicator("barcolor example", overlay=true)
barcolor(close < open ? color.black : color.white)
```

See also

[bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_bgcolor) [plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill)
