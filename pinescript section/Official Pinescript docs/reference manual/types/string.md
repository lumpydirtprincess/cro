# string

Keyword used to explicitly declare the "string" type of a variable or a parameter.

Example

```
//@version=6
indicator("string")
string s = "Hello World!"    // Same as `s = "Hello world!"`
// string s = na // same as ""
plot(na, title=s)
```

Remarks

Explicitly mentioning the type in a variable declaration is optional, except when it is initialized with [na](https://www.tradingview.com/pine-script-reference/v6/#var_na). Learn more about Pine Script® types in the User Manual page on the [Type System](https://www.tradingview.com/pine-script-docs/language/type-system/).

See also

[var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) [varip](https://www.tradingview.com/pine-script-reference/v6/#kw_varip) [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool) [str.tostring()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring) [str.format()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.format)
