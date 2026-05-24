# table.cell_set_text_size()

The function sets the size of the cell's text.

Syntax

```
table.cell_set_text_size(table_id, column, row, text_size) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text_size (series int/string) Size of the object. The size can be any positive integer, or one of the size.\* built-in constant strings. The constant strings and their equivalent integer values are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) (0), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) (8), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) (10), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) (14), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) (20), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) (36). The default value is [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) or 14.

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_halign) [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_valign) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip)
