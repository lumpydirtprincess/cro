# bool

Keyword used to explicitly declare the "bool" (boolean) type of a variable or a parameter. "Bool" variables can have values [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) or [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

Example

```
//@version=6
indicator("bool")
bool b = true    // Same as `b = true`
plot(b ? open : close)
```

Remarks

Explicitly mentioning the type in a variable declaration is optional. Learn more about Pine Script® types in the User Manual page on the [Type System](https://www.tradingview.com/pine-script-docs/language/type-system/).

See also

[var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) [color](https://www.tradingview.com/pine-script-reference/v6/#type_color) [string](https://www.tradingview.com/pine-script-reference/v6/#type_string) [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) [false](https://www.tradingview.com/pine-script-reference/v6/#const_false)
