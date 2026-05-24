# table.cell_set_text_valign()

The function sets the vertical alignment of a cell's text.

Syntax

```
table.cell_set_text_valign(table_id, column, row, text_valign) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text_valign (series string) The vertical alignment of the cell's text. Possible values: [text.align_top](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_top), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_bottom](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_bottom).

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_halign) [table.cell_set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_size) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip)
