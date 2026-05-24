# table.cell_set_text_formatting()

Sets the formatting attributes the drawing applies to displayed text.

Syntax

```
table.cell_set_text_formatting(table_id, column, row, text_formatting) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_halign) [table.cell_set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_size) [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_valign) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip) [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text)
