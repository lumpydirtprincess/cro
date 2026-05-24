# table.delete()

The function deletes a table.

Syntax

```
table.delete(table_id) → void
```

Arguments

table_id (series table) A table object.

Example

```
//@version=6
indicator("table.delete example")
var testTable = table.new(position = position.top_right, columns = 2, rows = 1, bgcolor = color.yellow, border_width = 1)
if barstate.islast
    table.cell(table_id = testTable, column = 0, row = 0, text = "Open is " + str.tostring(open))
    table.cell(table_id = testTable, column = 1, row = 0, text = "Close is " + str.tostring(close), bgcolor=color.teal)
if barstate.isrealtime
    table.delete(testTable)
```

See also

[table.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.new) [table.clear()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.clear)
