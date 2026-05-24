# line.set_xy1()

Sets bar index/time and price of the first point.

Syntax

```
line.set_xy1(id, x, y) → void
```

Arguments

id (series line) Line object.

x (series int) Bar index or bar time. Note that objects positioned using [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) cannot be drawn further than 500 bars into the future.

y (series int/float) Price.

See also

[line.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new)
