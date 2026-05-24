# label.set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

Syntax

```
label.set_text_formatting(id, text_formatting) → void
```

Arguments

id (series label) Label object.

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

See also

[label.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.new) [label.set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.set_text)
