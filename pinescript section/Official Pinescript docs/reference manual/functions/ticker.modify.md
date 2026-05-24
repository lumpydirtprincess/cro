# ticker.modify()

2 overloads

Creates a ticker identifier for requesting additional data for the script.

Syntax & Overloads

[```\\
ticker.modify(tickerid, session, adjustment, backadjustment, settlement_as_close) → simple string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.modify-0) [```\\
ticker.modify(tickerid, session, adjustment, backadjustment, settlement_as_close) → series string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.modify-1)

Arguments

tickerid (simple string) Symbol name with exchange prefix, e.g. 'BATS:MSFT', 'NASDAQ:MSFT' or tickerid with session and adjustment from the [ticker.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.new) function.

session (simple string) Session type. Optional argument. Possible values: [session.regular](https://www.tradingview.com/pine-script-reference/v6/#const_session.regular), [session.extended](https://www.tradingview.com/pine-script-reference/v6/#const_session.extended). Session type of the current chart is [syminfo.session](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.session). If session is not given, then [syminfo.session](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.session) value is used.

adjustment (simple string) Adjustment type. Optional argument. Possible values: [adjustment.none](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.none), [adjustment.splits](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.splits), [adjustment.dividends](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.dividends). If adjustment is not given, then default adjustment value is used (can be different depending on particular instrument).

backadjustment (simple backadjustment) Specifies whether past contract data on continuous futures symbols is back-adjusted. This setting only affects the data from symbols with this option available on their charts. Optional. The default is [backadjustment.inherit](https://www.tradingview.com/pine-script-reference/v6/#var_backadjustment.inherit), meaning that the modified ticker ID inherits the setting from the ticker ID passed to the `tickerid` parameter, or it inherits the symbol's default if the `tickerid` does not specify this setting. Possible values: [backadjustment.inherit](https://www.tradingview.com/pine-script-reference/v6/#var_backadjustment.inherit), [backadjustment.on](https://www.tradingview.com/pine-script-reference/v6/#var_backadjustment.on), [backadjustment.off](https://www.tradingview.com/pine-script-reference/v6/#var_backadjustment.off).

settlement_as_close (simple settlement) Specifies whether a futures symbol's [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) value represents the actual closing price or the settlement price on "1D" and higher timeframes. This setting only affects the data from symbols with this option available on their charts. Optional. The default is [settlement_as_close.inherit](https://www.tradingview.com/pine-script-reference/v6/#var_settlement_as_close.inherit), meaning that the modified ticker ID inherits the setting from the `tickerid` passed into the function, or it inherits the chart symbol's default if the `tickerid` does not specify this setting. Possible values: [settlement_as_close.inherit](https://www.tradingview.com/pine-script-reference/v6/#var_settlement_as_close.inherit), [settlement_as_close.on](https://www.tradingview.com/pine-script-reference/v6/#var_settlement_as_close.on), [settlement_as_close.off](https://www.tradingview.com/pine-script-reference/v6/#var_settlement_as_close.off).

Example

```
//@version=6
indicator("ticker_modify", overlay=true)
t1 = ticker.new(syminfo.prefix, syminfo.ticker, session.regular, adjustment.splits)
c1 = request.security(t1, "D", close)
t2 = ticker.modify(t1, session.extended)
c2 = request.security(t2, "2D", close)
plot(c1)
plot(c2)
```

Returns

String value of ticker id, that can be supplied to [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) function.

See also

[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [syminfo.session](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.session) [session.extended](https://www.tradingview.com/pine-script-reference/v6/#const_session.extended) [session.regular](https://www.tradingview.com/pine-script-reference/v6/#const_session.regular) [ticker.heikinashi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.heikinashi) [adjustment.none](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.none) [adjustment.splits](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.splits) [adjustment.dividends](https://www.tradingview.com/pine-script-reference/v6/#const_adjustment.dividends) [backadjustment.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_backadjustment.inherit) [backadjustment.on](https://www.tradingview.com/pine-script-reference/v6/#const_backadjustment.on) [backadjustment.off](https://www.tradingview.com/pine-script-reference/v6/#const_backadjustment.off) [settlement_as_close.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_settlement_as_close.inherit) [settlement_as_close.on](https://www.tradingview.com/pine-script-reference/v6/#const_settlement_as_close.on) [settlement_as_close.off](https://www.tradingview.com/pine-script-reference/v6/#const_settlement_as_close.off)
