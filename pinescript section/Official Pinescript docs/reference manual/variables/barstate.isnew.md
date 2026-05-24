# barstate.isnew

Returns true if script is currently calculating on new bar, false otherwise. This variable is true when calculating on historical bars or on first update of a newly generated real-time bar.

Type

series bool

Remarks

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](https://www.tradingview.com/pine-script-docs/concepts/repainting/).

See also

[barstate.isfirst](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isfirst) [barstate.islast](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islast) [barstate.ishistory](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.ishistory) [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isrealtime) [barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isconfirmed) [barstate.islastconfirmedhistory](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islastconfirmedhistory)
