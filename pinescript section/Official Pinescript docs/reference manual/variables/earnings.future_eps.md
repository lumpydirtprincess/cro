# earnings.future_eps

Returns the estimated Earnings per Share of the next earnings report in the currency of the instrument, or [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if this data isn't available.

Type

series float

Remarks

This value is only fetched once during the script's initial calculation. The variable will return the same value until the script is recalculated, even after the expected time of the next earnings report.

See also

[request.earnings()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.earnings)
