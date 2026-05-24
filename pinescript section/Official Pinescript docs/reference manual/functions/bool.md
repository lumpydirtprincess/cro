# bool()

4 overloads

Converts the `x` value to a [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool) value. Returns [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) if `x` is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na), [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), or an [int](https://www.tradingview.com/pine-script-reference/v6/#type_int)/ [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) value equal to 0. Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) for all other possible values.

Syntax & Overloads

[```\\
bool(x) → const bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_bool-0) [```\\
bool(x) → input bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_bool-1) [```\\
bool(x) → simple bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_bool-2) [```\\
bool(x) → series bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_bool-3)

Arguments

x (simple int/float/bool) The value to convert to the specified type, usually [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

Returns

The value of the argument after casting to bool.

See also

[float()](https://www.tradingview.com/pine-script-reference/v6/#fun_float) [int()](https://www.tradingview.com/pine-script-reference/v6/#fun_int) [color()](https://www.tradingview.com/pine-script-reference/v6/#fun_color) [string()](https://www.tradingview.com/pine-script-reference/v6/#fun_string) [line()](https://www.tradingview.com/pine-script-reference/v6/#fun_line) [label()](https://www.tradingview.com/pine-script-reference/v6/#fun_label)
