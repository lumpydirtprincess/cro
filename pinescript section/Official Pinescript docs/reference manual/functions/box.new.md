# box.new()

2 overloads

Creates a new box object.

Syntax & Overloads

[```\\
box.new(top_left, bottom_right, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family, force_overlay, text_formatting) → series box\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new-0) [```\\
box.new(left, top, right, bottom, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family, force_overlay, text_formatting) → series box\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new-1)

Arguments

top_left (chart.point) A [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object that specifies the top-left corner location of the box.

bottom_right (chart.point) A [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object that specifies the bottom-right corner location of the box.

border_color (series color) Color of the four borders. Optional. The default is [color.blue](https://www.tradingview.com/pine-script-reference/v6/#const_color.blue).

border_width (series int) Width of the four borders, in pixels. Optional. The default is 1 pixel.

border_style (series string) Style of the four borders. Possible values: [line.style_solid](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_solid), [line.style_dotted](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_dotted), [line.style_dashed](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_dashed). Optional. The default value is [line.style_solid](https://www.tradingview.com/pine-script-reference/v6/#const_line.style_solid).

extend (series string) When [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none) is used, the horizontal borders start at the left border and end at the right border. With [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left) or [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right), the horizontal borders are extended indefinitely to the left or right of the box, respectively. With [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both), the horizontal borders are extended on both sides. Optional. The default value is [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none).

xloc (series string) Determines whether the arguments to 'left' and 'right' are a bar index or a time value. If xloc = [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index), the arguments must be a bar index. If xloc = [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time), the arguments must be a UNIX time. Possible values: [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) and [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time). Optional. The default is [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index).

bgcolor (series color) Background color of the box. Optional. The default is [color.blue](https://www.tradingview.com/pine-script-reference/v6/#const_color.blue).

text (series string) The text to be displayed inside the box. Optional. The default is empty string.

text_size (series int/string) Optional. Size of the box's text. The size can be any positive integer, or one of the `size.*` built-in constant strings. The constant strings and their equivalent integer values are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) (0), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) (8), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) (10), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) (14), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) (20), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) (36). The default value is [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) or 0.

text_color (series color) The color of the text. Optional. The default is [color.black](https://www.tradingview.com/pine-script-reference/v6/#const_color.black).

text_halign (series string) The horizontal alignment of the box's text. Optional. The default value is [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center). Possible values: [text.align_left](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_left), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_right](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_right).

text_valign (series string) The vertical alignment of the box's text. Optional. The default value is [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center). Possible values: [text.align_top](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_top), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_bottom](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_bottom).

text_wrap (series string) Optional. Whether to wrap text. Wrapped text starts a new line when it reaches the side of the box. Wrapped text lower than the bottom of the box is not displayed. Unwrapped text stays on a single line and _is displayed_ past the width of the box if it is too long. If the `text_size` is 0 or [text.wrap_auto](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_auto), this setting has no effect. The default value is [text.wrap_none](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_none). Possible values: [text.wrap_none](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_none), [text.wrap_auto](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_auto).

text_font_family (series string) The font family of the text. Optional. The default value is [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default). Possible values: [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default), [font.family_monospace](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_monospace).

force_overlay (const bool) If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the drawing will display on the main chart pane, even when the script occupies a separate pane. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

Example

```
//@version=6
indicator("box.new")
var b = box.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, border_style=line.style_dashed)
box.set_lefttop(b, time, 100)
box.set_rightbottom(b, time + 60 * 60 * 24, 500)
box.set_bgcolor(b, color.green)
```

Returns

The ID of a box object which may be used in box.set_\*() and box.get_\*() functions.

See also

[box.delete()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.delete) [box.get_left()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_left) [box.get_top()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_top) [box.get_right()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_right) [box.get_bottom()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_bottom) [box.set_top_left_point()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_top_left_point) [box.set_left()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_left) [box.set_top()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_top) [box.set_bottom_right_point()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_bottom_right_point) [box.set_right()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_right) [box.set_bottom()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_bottom) [box.set_border_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_border_color) [box.set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_bgcolor) [box.set_border_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_border_width) [box.set_border_style()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_border_style) [box.set_extend()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_extend) [box.set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text) [box.set_text_formatting()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_formatting) [box.set_xloc()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_xloc)
