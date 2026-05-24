# barstate.isconfirmed

Returns true if the script is calculating the last (closing) update of the current bar. The next script calculation will be on the new bar data.

Type

series bool

Remarks

Pine Script® code that uses this variable could calculate differently on history and real-time data.

It is NOT recommended to use [barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isconfirmed) in [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) expression. Its value requested from [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) is unpredictable.

See also

[barstate.isfirst](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isfirst) [barstate.islast](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islast) [barstate.ishistory](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.ishistory) [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isrealtime) [barstate.isnew](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isnew) [barstate.islastconfirmedhistory](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islastconfirmedhistory)
