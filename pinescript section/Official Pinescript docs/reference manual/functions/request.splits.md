# request.splits()

Requests splits data for the specified symbol.

Syntax

```
request.splits(ticker, field, gaps, lookahead, ignore_invalid_symbol) → series float
```

Arguments

ticker (series string) Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL". Using [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) will cause an error. Use [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) instead.

field (series string) Input string. Possible values include: [splits.denominator](https://www.tradingview.com/pine-script-reference/v6/#const_splits.denominator), [splits.numerator](https://www.tradingview.com/pine-script-reference/v6/#const_splits.numerator).

gaps (simple barmerge_gaps) Merge strategy for the requested data (requested data automatically merges with the main series OHLC data). Possible values: [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on), [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off). [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on) \- requested data is merged with possible gaps ( [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values). [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off) \- requested data is merged continuously without gaps, all the gaps are filled with the previous nearest existing values. Default value is [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off).

lookahead (simple barmerge_lookahead) Merge strategy for the requested data position. Possible values: [barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_on), [barmerge.lookahead_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_off). Default value is [barmerge.lookahead_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_off) starting from version 3. Note that behavour is the same on real-time, and differs only on history.

ignore_invalid_symbol (input bool) An optional parameter. Determines the behavior of the function if the specified symbol is not found: if false, the script will halt and return a runtime error; if true, the function will return na and execution will continue. The default value is false.

Example

```
//@version=6
indicator("request.splits")
s1 = request.splits("NASDAQ:BELFA", splits.denominator)
plot(s1)
s2 = request.splits("NASDAQ:BELFA", splits.denominator, gaps=barmerge.gaps_on, lookahead=barmerge.lookahead_on)
plot(s2)
```

Returns

Requested series, or n/a if there is no splits data for the specified symbol.

See also

[request.earnings()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.earnings) [request.dividends()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.dividends) [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid)
