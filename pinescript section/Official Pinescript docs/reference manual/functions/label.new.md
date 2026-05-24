# label.new()

2 overloads

Creates new label object.

Syntax & Overloads

[```\\
label.new(point, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip, text_font_family, force_overlay, text_formatting) → series label\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_label.new-0) [```\\
label.new(x, y, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip, text_font_family, force_overlay, text_formatting) → series label\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_label.new-1)

Arguments

point (chart.point) A [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object that specifies the label's location.

text (series string) Label text. Default is empty string.

xloc (series string) See description of **x** argument. Possible values: [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) and [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time). Default is [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index).

yloc (series string) Possible values are [yloc.price](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.price), [yloc.abovebar](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.abovebar), [yloc.belowbar](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.belowbar). If yloc= [yloc.price](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.price), **y** argument specifies the price of the label position. If yloc= [yloc.abovebar](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.abovebar), label is located above bar. If yloc= [yloc.belowbar](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.belowbar), label is located below bar. Default is [yloc.price](https://www.tradingview.com/pine-script-reference/v6/#const_yloc.price).

color (series color) Color of the label border and arrow

style (series string) Label style. Possible values: [label.style_none](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_none), [label.style_xcross](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_xcross), [label.style_cross](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_cross), [label.style_triangleup](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_triangleup), [label.style_triangledown](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_triangledown), [label.style_flag](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_flag), [label.style_circle](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_circle), [label.style_arrowup](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_arrowup), [label.style_arrowdown](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_arrowdown), [label.style_label_up](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_up), [label.style_label_down](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_down), [label.style_label_left](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_left), [label.style_label_right](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_right), [label.style_label_lower_left](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_lower_left), [label.style_label_lower_right](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_lower_right), [label.style_label_upper_left](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_upper_left), [label.style_label_upper_right](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_upper_right), [label.style_label_center](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_center), [label.style_square](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_square), [label.style_diamond](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_diamond), [label.style_text_outline](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_text_outline). Default is [label.style_label_down](https://www.tradingview.com/pine-script-reference/v6/#const_label.style_label_down).

textcolor (series color) Text color.

size (series int/string) Optional. Size of the label. Accepts a positive [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) value or one of the built-in `size.*` constants. The constants and their equivalent numeric sizes are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) (0), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) (~7), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) (~10), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) (12), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) (18), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) (24). The default value is [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal), which represents the numeric size of 12.

textalign (series string) Label text alignment. Possible values: [text.align_left](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_left), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_right](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_right). Default value is [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center).

tooltip (series string) Hover to see tooltip label.

text_font_family (series string) The font family of the text. Optional. The default value is [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default). Possible values: [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default), [font.family_monospace](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_monospace).

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

Example

```
//@version=6
indicator("label.new")
var label1 = label.new(bar_index, low, text="Hello, world!", style=label.style_circle)
label.set_x(label1, 0)
label.set_xloc(label1, time, xloc.bar_time)
label.set_color(label1, color.red)
label.set_size(label1, size.large)
```

Returns

Label ID object which may be passed to label.setXXX and label.getXXX functions.

See also

[label.delete()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.delete) [label.set_x()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_x) [label.set_y()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_y) [label.set_xy()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_xy) [label.set_xloc()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_xloc) [label.set_yloc()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_yloc) [label.set_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_color) [label.set_textcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_textcolor) [label.set_style()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_style) [label.set_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_size) [label.set_textalign()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_textalign) [label.set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_tooltip) [label.set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_text) [label.set_text_formatting()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_text_formatting)
