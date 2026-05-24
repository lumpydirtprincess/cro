# request.dividends()

Requests dividends data for the specified symbol.

Syntax

```
request.dividends(ticker, field, gaps, lookahead, ignore_invalid_symbol, currency) → series float
```

Arguments

ticker (series string) Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL". Using [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) will cause an error. Use [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) instead.

field (series string) Input string. Possible values include: [dividends.net](https://www.tradingview.com/pine-script-reference/v6/#const_dividends.net), [dividends.gross](https://www.tradingview.com/pine-script-reference/v6/#const_dividends.gross). Default value is [dividends.gross](https://www.tradingview.com/pine-script-reference/v6/#const_dividends.gross).

gaps (simple barmerge_gaps) Merge strategy for the requested data (requested data automatically merges with the main series OHLC data). Possible values: [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on), [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off). [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on) \- requested data is merged with possible gaps ( [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values). [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off) \- requested data is merged continuously without gaps, all the gaps are filled with the previous nearest existing values. Default value is [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off).

lookahead (simple barmerge_lookahead) Merge strategy for the requested data position. Possible values: [barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_on), [barmerge.lookahead_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_off). Default value is [barmerge.lookahead_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_off) starting from version 3. Note that behavour is the same on real-time, and differs only on history.

ignore_invalid_symbol (input bool) An optional parameter. Determines the behavior of the function if the specified symbol is not found: if false, the script will halt and return a runtime error; if true, the function will return na and execution will continue. The default value is false.

currency (series string) Currency into which the symbol's currency-related dividends values (e.g. [dividends.gross](https://www.tradingview.com/pine-script-reference/v6/#const_dividends.gross)) are to be converted. The conversion rate depends on the previous daily value of a corresponding currency pair from the most popular exchange. A spread symbol is used if no exchange provides the rate directly. Possible values: a "string" representing a valid currency code (e.g., "USD" or "USDT") or a constant from the `currency.*` namespace (e.g., [currency.USD](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USD) or [currency.USDT](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USDT)). The default is [syminfo.currency](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.currency).

Example

```
//@version=6
indicator("request.dividends")
s1 = request.dividends("NASDAQ:BELFA")
plot(s1)
s2 = request.dividends("NASDAQ:BELFA", dividends.net, gaps=barmerge.gaps_on, lookahead=barmerge.lookahead_on)
plot(s2)
```

Returns

Requested series, or n/a if there is no dividends data for the specified symbol.

See also

[request.earnings()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.earnings) [request.splits()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.splits) [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid)
