# label.set_xy()

Sets bar index/time and price of the label position.

Syntax

```
label.set_xy(id, x, y) → void
```

Arguments

id (series label) Label object.

x (series int) New bar index or bar time of the label position. Note that objects positioned using [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) cannot be drawn further than 500 bars into the future.

y (series int/float) New price of the label position.

See also

[label.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.new)
