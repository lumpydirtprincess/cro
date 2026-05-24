# line.set_extend()

Sets extending type of this line object. If extend= [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none), draws segment starting at point (x1, y1) and ending at point (x2, y2). If extend is equal to [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right) or [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left), draws a ray starting at point (x1, y1) or (x2, y2), respectively. If extend= [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both), draws a straight line that goes through these points.

Syntax

```
line.set_extend(id, extend) → void
```

Arguments

id (series line) Line object.

extend (series string) New extending type.

See also

[extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none) [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right) [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left) [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both) [line.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new)
