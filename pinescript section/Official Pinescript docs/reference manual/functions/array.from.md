# array.from()

12 overloads

The function takes a variable number of arguments with one of the types: int, float, bool, string, label, line, color, box, table, linefill, and returns an array of the corresponding type.

Syntax & Overloads

[```\\
array.from(arg0, arg1, ...) → array<type>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-0) [```\\
array.from(arg0, arg1, ...) → array<enum>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-1) [```\\
array.from(arg0, arg1, ...) → array<label>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-2) [```\\
array.from(arg0, arg1, ...) → array<line>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-3) [```\\
array.from(arg0, arg1, ...) → array<box>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-4) [```\\
array.from(arg0, arg1, ...) → array<table>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-5) [```\\
array.from(arg0, arg1, ...) → array<linefill>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-6) [```\\
array.from(arg0, arg1, ...) → array<string>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-7) [```\\
array.from(arg0, arg1, ...) → array<color>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-8) [```\\
array.from(arg0, arg1, ...) → array<int>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-9) [```\\
array.from(arg0, arg1, ...) → array<float>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-10) [```\\
array.from(arg0, arg1, ...) → array<bool>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from-11)

Arguments

arg0, arg1, ... (<arg..._type>) Array arguments.

Example

```
//@version=6
indicator("array.from_example", overlay = false)
arr = array.from("Hello", "World!") // arr (array<string>) will contain 2 elements: {Hello}, {World!}.
plot(close)
```

Returns

The array element's value.

Remarks

This function can accept up to 4,000 'int', 'float', 'bool', or 'color' arguments. For all other types, including user-defined types, the limit is 999.
