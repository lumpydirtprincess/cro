# label.set_size()

Sets arrow and text size of the specified label object.

Syntax

```
label.set_size(id, size) → void
```

Arguments

id (series label) Label object.

size (series int/string) Size of the label. Accepts a positive [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) value or one of the built-in `size.*` constants. The constants and their equivalent numeric sizes are: [size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) (0), [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) (~7), [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) (~10), [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) (12), [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) (18), [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) (24). The default value is [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal), which represents the numeric size of 12.

See also

[size.auto](https://www.tradingview.com/pine-script-reference/v6/#const_size.auto) [size.tiny](https://www.tradingview.com/pine-script-reference/v6/#const_size.tiny) [size.small](https://www.tradingview.com/pine-script-reference/v6/#const_size.small) [size.normal](https://www.tradingview.com/pine-script-reference/v6/#const_size.normal) [size.large](https://www.tradingview.com/pine-script-reference/v6/#const_size.large) [size.huge](https://www.tradingview.com/pine-script-reference/v6/#const_size.huge) [label.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_label.new)
