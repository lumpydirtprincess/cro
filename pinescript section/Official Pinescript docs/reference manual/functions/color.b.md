# color.b()

4 overloads

Retrieves the value of the color's blue component.

Syntax & Overloads

[```\\
color.b(color) → const float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.b-0) [```\\
color.b(color) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.b-1) [```\\
color.b(color) → simple float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.b-2) [```\\
color.b(color) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_color.b-3)

Arguments

color (const color) Color.

Example

```
//@version=6
indicator("color.b", overlay=true)
plot(color.b(color.blue))
```

Returns

The value (0 to 255) of the color's blue component.
