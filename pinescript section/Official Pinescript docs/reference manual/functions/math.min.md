# math.min()

8 overloads

Returns the smallest of multiple values.

Syntax & Overloads

[```\\
math.min(number0, number1, ...) → const int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-0) [```\\
math.min(number0, number1, ...) → const float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-1) [```\\
math.min(number0, number1, ...) → input int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-2) [```\\
math.min(number0, number1, ...) → simple int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-3) [```\\
math.min(number0, number1, ...) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-4) [```\\
math.min(number0, number1, ...) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-5) [```\\
math.min(number0, number1, ...) → simple float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-6) [```\\
math.min(number0, number1, ...) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min-7)

Arguments

number0, number1, ... (const int) A sequence of numbers to use in the calculation.

Example

```
//@version=6
indicator("math.min", overlay=true)
plot(math.min(close, open))
plot(math.min(close, math.min(open, 42)))
```

Returns

The smallest of multiple given values.

See also

[math.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.max)
