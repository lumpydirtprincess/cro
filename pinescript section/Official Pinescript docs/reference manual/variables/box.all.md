# box.all

Returns an array filled with all the current boxes drawn by the script.

Type

array<box>

Example

```
//@version=6
indicator("box.all")
//delete all boxes
box.new(time, open, time + 60 * 60 * 24, close, xloc=xloc.bar_time, border_style=line.style_dashed)
a_allBoxes = box.all
if array.size(a_allBoxes) > 0
    for i = 0 to array.size(a_allBoxes) - 1
        box.delete(array.get(a_allBoxes, i))
```

Remarks

The array is read-only. Index zero of the array is the ID of the oldest object on the chart.

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [line.all](https://www.tradingview.com/pine-script-reference/v6/#var_line.all) [label.all](https://www.tradingview.com/pine-script-reference/v6/#var_label.all) [table.all](https://www.tradingview.com/pine-script-reference/v6/#var_table.all)
