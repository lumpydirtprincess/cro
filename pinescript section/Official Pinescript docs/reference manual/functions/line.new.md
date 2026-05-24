# line.new()

2 overloads

Creates new line object.

Syntax & Overloads

[```\\
line.new(first_point, second_point, xloc, extend, color, style, width, force_overlay) → series line\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new-0) [```\\
line.new(x1, y1, x2, y2, xloc, extend, color, style, width, force_overlay) → series line\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new-1)

Arguments

first_point (chart.point) A [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object that specifies the line's starting coordinate.

second_point (chart.point) A [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object that specifies the line's ending coordinate.

xloc (series string) See description of **x1** argument. Possible values: [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) and [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time). Default is [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index).

extend (series string) If extend= [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none), draws segment starting at point (x1, y1) and ending at point (x2, y2). If extend is equal to [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right) or [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left), draws a ray starting at point (x1, y1) or (x2, y2), respectively. If extend= [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both), draws a straight line that goes through these points. Default value is [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none).

color (series color) Line color.

style (series string) Line style. Possible values: [line.style_solid](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_solid), [line.style_dotted](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_dotted), [line.style_dashed](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_dashed), [line.style_arrow_left](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_arrow_left), [line.style_arrow_right](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_arrow_right), [line.style_arrow_both](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_arrow_both).

width (series int) Line width in pixels.

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

Example

```
//@version=6
indicator("line.new")
var line1 = line.new(0, low, bar_index, high, extend=extend.right)
var line2 = line.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, style=line.style_dashed)
line.set_x2(line1, 0)
line.set_xloc(line1, time, time + 60 * 60 * 24, xloc.bar_time)
line.set_color(line2, color.green)
line.set_width(line2, 5)
```

Returns

Line ID object which may be passed to line.setXXX and line.getXXX functions.

See also

[line.delete()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.delete) [line.set_x1()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_x1) [line.set_y1()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_y1) [line.set_xy1()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_xy1) [line.set_x2()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_x2) [line.set_y2()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_y2) [line.set_xy2()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_xy2) [line.set_xloc()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_xloc) [line.set_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_color) [line.set_extend()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_extend) [line.set_style()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_style) [line.set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.set_width)
