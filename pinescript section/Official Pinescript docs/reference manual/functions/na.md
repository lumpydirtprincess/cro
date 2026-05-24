# na()

2 overloads

Tests if `x` is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

Syntax & Overloads

[```\\
na(x) → simple bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_na-0) [```\\
na(x) → series bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_na-1)

Arguments

x (simple int/float) Value to be tested.

Example

```
//@version=6
indicator("na")
// Use the `na()` function to test for `na`.
plot(na(close[1]) ? close : close[1])
// ALTERNATIVE
// `nz()` also tests `close[1]` for `na`. It returns `close[1]` if it is not `na`, and `close` if it is.
plot(nz(close[1], close))
```

Returns

Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if `x` is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na), [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise.

See also

[na](https://www.tradingview.com/pine-script-reference/v6/#var_na) [fixnan()](https://www.tradingview.com/pine-script-reference/v6/#fun_fixnan) [nz()](https://www.tradingview.com/pine-script-reference/v6/#fun_nz)
