# ticker.heikinashi()

2 overloads

Creates a ticker identifier for requesting Heikin Ashi bar values.

Syntax & Overloads

[```\\
ticker.heikinashi(symbol) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.heikinashi-0) [```\\
ticker.heikinashi(symbol) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.heikinashi-1)

Arguments

symbol (simple string) Symbol ticker identifier.

Example

```
//@version=6
indicator("ticker.heikinashi", overlay=true)
heikinashi_close = request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close)

heikinashi_aapl_60_close = request.security(ticker.heikinashi("AAPL"), "60", close)
plot(heikinashi_close)
plot(heikinashi_aapl_60_close)
```

Returns

String value of ticker id, that can be supplied to [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) function.

See also

[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [ticker.renko()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.renko) [ticker.linebreak()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.linebreak) [ticker.kagi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.kagi) [ticker.pointfigure()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.pointfigure)
