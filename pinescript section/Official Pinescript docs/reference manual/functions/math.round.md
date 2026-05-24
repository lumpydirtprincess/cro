# math.round()

8 overloads

Returns the value of `number` rounded to the nearest integer, with ties rounding up. If the `precision` parameter is used, returns a float value rounded to that amount of decimal places.

Syntax & Overloads

[```\\
math.round(number) → const int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-0) [```\\
math.round(number) → input int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-1) [```\\
math.round(number) → simple int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-2) [```\\
math.round(number) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-3) [```\\
math.round(number, precision) → const float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-4) [```\\
math.round(number, precision) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-5) [```\\
math.round(number, precision) → simple float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-6) [```\\
math.round(number, precision) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_math.round-7)

Arguments

number (const int/float) The value to be rounded.

Returns

The value of `number` rounded to the nearest integer, or according to precision.

Remarks

Note that for 'na' values function returns 'na'.

See also

[math.ceil()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.ceil) [math.floor()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.floor)
