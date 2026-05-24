# color.g()

4 overloads

Retrieves the value of the color's green component.

Syntax & Overloads

[```\\
color.g(color) → const float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.g-0) [```\\
color.g(color) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.g-1) [```\\
color.g(color) → simple float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.g-2) [```\\
color.g(color) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.g-3)

Arguments

color (const color) Color.

Example

```
//@version=6
indicator("color.g", overlay=true)
plot(color.g(color.green))
```

Returns

The value (0 to 255) of the color's green component.
