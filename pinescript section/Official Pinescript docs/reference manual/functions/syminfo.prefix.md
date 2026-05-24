# syminfo.prefix()

2 overloads

Returns exchange prefix of the `symbol`, e.g. "NASDAQ".

Syntax & Overloads

[```\\
syminfo.prefix(symbol) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_syminfo.prefix-0) [```\\
syminfo.prefix(symbol) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_syminfo.prefix-1)

Arguments

symbol (simple string) Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL".

Example

```
//@version=6
indicator("syminfo.prefix fun", overlay=true)
i_sym = input.symbol("NASDAQ:AAPL")
pref = syminfo.prefix(i_sym)
tick = syminfo.ticker(i_sym)
t = ticker.new(pref, tick, session.extended)
s = request.security(t, "1D", close)
plot(s)
```

Returns

Returns exchange prefix of the `symbol`, e.g. "NASDAQ".

Remarks

The result of the function is used in the [ticker.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.new)/ [ticker.modify()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.modify) and [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security).

See also

[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [syminfo.prefix](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.prefix) [syminfo.ticker()](https://www.tradingview.com/pine-script-reference/v6/#fun_syminfo.ticker) [ticker.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.new)
