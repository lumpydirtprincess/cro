# box.set_extend()

Sets extending type of the border of this box object. When [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none) is used, the horizontal borders start at the left border and end at the right border. With [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left) or [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right), the horizontal borders are extended indefinitely to the left or right of the box, respectively. With [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both), the horizontal borders are extended on both sides.

Syntax

```
box.set_extend(id, extend) → void
```

Arguments

id (series box) A box object.

extend (series string) New extending type.

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [extend.none](https://www.tradingview.com/pine-script-reference/v6/#const_extend.none) [extend.right](https://www.tradingview.com/pine-script-reference/v6/#const_extend.right) [extend.left](https://www.tradingview.com/pine-script-reference/v6/#const_extend.left) [extend.both](https://www.tradingview.com/pine-script-reference/v6/#const_extend.both)
