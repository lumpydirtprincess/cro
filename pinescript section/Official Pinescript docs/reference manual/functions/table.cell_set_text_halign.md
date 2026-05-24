# table.cell_set_text_halign()

The function sets the horizontal alignment of the cell's text.

Syntax

```
table.cell_set_text_halign(table_id, column, row, text_halign) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text_halign (series string) The horizontal alignment of a cell's text. Possible values: [text.align_left](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_left), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_right](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_right).

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_size) [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_valign) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip)
