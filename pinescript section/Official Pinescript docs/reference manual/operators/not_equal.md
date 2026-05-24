# !=

Inequality operator. Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if the operands are considered not equal, and [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise. This operator is compatible with all value types, including "int", "float", "bool", "color", and "string". The operator can also compare two line or label IDs.

Syntax

```
expr1 != expr2
```

Returns

Boolean value, or series of boolean values.

Remarks

This operator rounds "float" operands to nine fractional digits.
