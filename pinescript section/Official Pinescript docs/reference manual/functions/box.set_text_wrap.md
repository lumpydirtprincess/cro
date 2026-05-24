# box.set_text_wrap()

The function sets the mode of wrapping of the text inside the box.

Syntax

```
box.set_text_wrap(id, text_wrap) → void
```

Arguments

id (series box) A box object.

text_wrap (series string) Whether to wrap text. Wrapped text starts a new line when it reaches the side of the box. Wrapped text lower than the bottom of the box is not displayed. Unwrapped text stays on a single line and _is displayed_ past the width of the box if it is too long. If the `text_size` is 0 or [text.wrap_auto](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_auto), this setting has no effect. Possible values: [text.wrap_none](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_none), [text.wrap_auto](https://www.tradingview.com/pine-script-reference/v6/#const_text.wrap_auto).

See also

[box.set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text) [box.set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_size) [box.set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_valign) [box.set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_halign) [box.set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_color)
