# table.cell_set_text()

The function sets the text in the specified cell.

Syntax

```
table.cell_set_text(table_id, column, row, text) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text (series string) The text to be displayed inside the cell.

Example

```
//@version=6
indicator("TABLE example")
var tLog = table.new(position = position.top_left, rows = 1, columns = 2, bgcolor = color.yellow, border_width=1)
table.cell(tLog, row = 0, column = 0, text = "sometext", text_color = color.blue)
table.cell_set_text(tLog, row = 0, column = 0, text = "sometext")
```

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_halign) [table.cell_set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_size) [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_valign) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip) [table.cell_set_text_formatting()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_formatting)
