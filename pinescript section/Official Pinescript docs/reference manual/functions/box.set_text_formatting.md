# box.set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

Syntax

```
box.set_text_formatting(id, text_formatting) → void
```

Arguments

id (series box) A box object.

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

See also

[box.set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_color) [box.set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_size) [box.set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_valign) [box.set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text_halign) [box.set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.set_text)
