# str.tonumber()

4 overloads

Converts a value represented in `string` to its "float" equivalent.

Syntax & Overloads

[```\\
str.tonumber(string) → const float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tonumber-0) [```\\
str.tonumber(string) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tonumber-1) [```\\
str.tonumber(string) → simple float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tonumber-2) [```\\
str.tonumber(string) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tonumber-3)

Arguments

string (const string) String containing the representation of an integer or floating point value.

Returns

A "float" equivalent of the value in `string`. If the value is not a properly formed integer or floating point value, the function returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).
