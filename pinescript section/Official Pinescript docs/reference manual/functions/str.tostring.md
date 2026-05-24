# str.tostring()

5 overloads

Syntax & Overloads

[```\\
str.tostring(value) → const string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring-0) [```\\
str.tostring(value, format) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring-1) [```\\
str.tostring(value, format) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring-2) [```\\
str.tostring(value) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring-3) [```\\
str.tostring(value) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring-4)

Arguments

value (const enum) Value or array ID whose elements are converted to a string.

Returns

The string representation of the `value` argument.

If the `value` argument is a string, it is returned as is.

When the `value` is na, the function returns the string "NaN".

Remarks

The formatting of float values will also round those values when necessary, e.g. str.tostring(3.99, '#') will return "4".

To display trailing zeros, use '0' instead of '#'. For example, '#.000'.

When using [format.mintick](https://www.tradingview.com/pine-script-reference/v6/#const_format.mintick), the value will be rounded to the nearest number that can be divided by [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.mintick) without the remainder. The string is returned with trailing zeros.

If the x argument is a string, the same string value will be returned.

Bool type arguments return "true" or "false".

When x is na, the function returns "NaN".
