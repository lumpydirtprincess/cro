# request.currency_rate()

Provides a daily rate that can be used to convert a value expressed in the `from` currency to another in the `to` currency.

Syntax

```
request.currency_rate(from, to, ignore_invalid_currency) → series float
```

Arguments

from (series string) The currency in which the value to be converted is expressed. Possible values: a three-letter string with the [currency code in the ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) (e.g. "USD"), or one of the built-in variables that return currency codes, like [syminfo.currency](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.currency) or [currency.USD](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USD).

to (series string) The currency in which the value is to be converted. Possible values: a three-letter string with the [currency code in the ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) (e.g. "USD"), or one of the built-in variables that return currency codes, like [syminfo.currency](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.currency) or [currency.USD](https://www.tradingview.com/pine-script-reference/v6/#const_currency.USD).

ignore_invalid_currency (series bool) Determines the behavior of the function if a conversion rate between the two currencies cannot be calculated: if [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), the script will halt and return a runtime error; if [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the function will return [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) and execution will continue. Optional. The default is [false](https://www.tradingview.com/pine-script-reference/v6/#const_false).

Example

```
//@version=6
indicator("Close in British Pounds")
rate = request.currency_rate(syminfo.currency, "GBP")
plot(close * rate)
```

Remarks

If `from` and `to` arguments are equal, function returns 1. Please note that using this variable/function can cause [indicator repainting](https://www.tradingview.com/pine-script-docs/concepts/repainting/).
