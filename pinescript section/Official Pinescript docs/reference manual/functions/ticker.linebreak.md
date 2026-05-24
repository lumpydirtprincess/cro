# ticker.linebreak()

2 overloads

Creates a ticker identifier for requesting Line Break values.

Syntax & Overloads

[```\\
ticker.linebreak(symbol, number_of_lines) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.linebreak-0) [```\\
ticker.linebreak(symbol, number_of_lines) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.linebreak-1)

Arguments

symbol (simple string) Symbol ticker identifier.

number_of_lines (simple int) Number of line.

Example

```
//@version=6
indicator("ticker.linebreak", overlay=true)
linebreak_tickerid = ticker.linebreak(syminfo.tickerid, 3)
linebreak_close = request.security(linebreak_tickerid, timeframe.period, close)
plot(linebreak_close)
```

Returns

String value of ticker id, that can be supplied to [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) function.

See also

[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [ticker.heikinashi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.heikinashi) [ticker.renko()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.renko) [ticker.kagi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.kagi) [ticker.pointfigure()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.pointfigure)
