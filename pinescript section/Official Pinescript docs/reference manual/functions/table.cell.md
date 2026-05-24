# table.cell()

The function defines a cell in the table and sets its attributes.

Syntax

```
table.cell(table_id, column, row, text, width, height, text_color, text_halign, text_valign, text_size, bgcolor, tooltip, text_font_family, text_formatting) → void
```

Arguments

table_id (series table) A table object.

column (series int) The index of the cell's column. Numbering starts at 0.

row (series int) The index of the cell's row. Numbering starts at 0.

text (series string) The text to be displayed inside the cell. Optional. The default is empty string.

width (series int/float) The width of the cell as a % of the indicator's visual space. Optional. By default, auto-adjusts the width based on the text inside the cell. Value 0 has the same effect.

height (series int/float) The height of the cell as a % of the indicator's visual space. Optional. By default, auto-adjusts the height based on the text inside of the cell. Value 0 has the same effect.

text_color (series color) The color of the text. Optional. The default is [color.black](https://www.tradingview.com/pine-script-reference/v6/#const_color.black).

text_halign (series string) The horizontal alignment of the cell's text. Optional. The default value is [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center). Possible values: [text.align_left](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_left), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_right](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_right).

text_valign (series string) The vertical alignment of the cell's text. Optional. The default value is [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center). Possible values: [text.align_top](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_top), [text.align_center](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_center), [text.align_bottom](https://www.tradingview.com/pine-script-reference/v6/#const_text.align_bottom).

text_size (series int/string) Size of the object. The size can be any positive integer, or one of the size.\* built-in constant strings. The constant strings and their equivalent integer values are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) (0), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) (8), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) (10), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) (14), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) (20), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) (36). The default value is [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) or 14.

bgcolor (series color) The background color of the text. Optional. The default is no color.

tooltip (series string) The tooltip to be displayed inside the cell. Optional.

text_font_family (series string) The font family of the text. Optional. The default value is [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default). Possible values: [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default), [font.family_monospace](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_monospace).

text_formatting (series text_format) The formatting of the displayed text. Formatting options support addition. For example, `text.format_bold + text.format_italic` will make the text both bold and italicized. Possible values: [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none), [text.format_bold](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_bold), [text.format_italic](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_italic). Optional. The default is [text.format_none](https://www.tradingview.com/pine-script-reference/v6/#var_text.format_none).

Remarks

This function does not create the table itself, but defines the table’s cells. To use it, you first need to create a table object with [table.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.new).

Each [table.cell()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell) call overwrites all previously defined properties of a cell. If you call [table.cell()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell) twice in a row, e.g., the first time with text='Test Text', and the second time with text_color= [color.red](https://www.tradingview.com/pine-script-reference/v6/#const_color.red) but without a new text argument, the default value of the 'text' being an empty string, it will overwrite 'Test Text', and your cell will display an empty string. If you want, instead, to modify any of the cell's properties, use the table.cell_set_\*() functions.

A single script can only display one table in each of the possible locations. If [table.cell()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell) is used on several bars to change the same attribute of a cell (e.g. change the background color of the cell to red on the first bar, then to yellow on the second bar), only the last change will be reflected in the table, i.e., the cell’s background will be yellow. Avoid unnecessary setting of cell properties by enclosing function calls in an [if](https://www.tradingview.com/pine-script-reference/v6/#kw_if) [barstate.islast](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islast) block whenever possible, to restrict their execution to the last bar of the series.

See also

[table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_bgcolor) [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_height) [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text) [table.cell_set_text_formatting()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_formatting) [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_color) [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_halign) [table.cell_set_text_size()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_size) [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_text_valign) [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_width) [table.cell_set_tooltip()](https://www.tradingview.com/pine-script-reference/v6/#fun_table.cell_set_tooltip)
