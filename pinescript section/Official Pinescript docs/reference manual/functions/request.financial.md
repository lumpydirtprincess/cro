# request.financial()

Requests financial series for symbol.

Syntax

```
request.financial(symbol, financial_id, period, gaps, ignore_invalid_symbol, currency) → series float
```

Arguments

symbol (series string) Symbol. Note that the symbol should be passed with a prefix. For example: "NASDAQ:AAPL" instead of "AAPL".

financial_id (series string) Financial identifier. You can find the list of available ids via our [Help Center](https://www.tradingview.com/?solution=43000564727).

period (series string) Reporting period. Possible values are "TTM", "FY", "FQ", "FH", "D".

gaps (simple barmerge_gaps) Merge strategy for the requested data (requested data automatically merges with the main series: OHLC data). Possible values include: [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on), [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off). [barmerge.gaps_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_on) \- requested data is merged with possible gaps ( [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values). [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off) \- requested data is merged continuously without gaps, all the gaps are filled with the previous, nearest existing values. Default value is [barmerge.gaps_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.gaps_off).

ignore_invalid_symbol (input bool) An optional parameter. Determines the behavior of the function if the specified symbol is not found: if false, the script will halt and return a runtime error; if true, the function will return na and execution will continue. The default value is false.

currency (series string) Optional. Currency into which the symbol's financial metrics (e.g. Net Income) are to be converted. The conversion rate depends on the previous daily value of a corresponding currency pair from the most popular exchange. A spread symbol is used if no exchange provides the rate directly. Possible values: a "string" representing a valid currency code (e.g., "USD" or "USDT") or a constant from the `currency.*` namespace (e.g., [currency.USD](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USD) or [currency.USDT](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USDT)). The default is [syminfo.currency](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.currency).

Example

```
//@version=6
indicator("request.financial")
f = request.financial("NASDAQ:MSFT", "ACCOUNTS_PAYABLE", "FY")
plot(f)
```

Returns

Requested series.

See also

[request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid)
