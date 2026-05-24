# bar_index

Current bar index. Numbering is zero-based, index of the first bar is 0.

Type

series int

Example

```
//@version=6
indicator("bar_index")
plot(bar_index)
plot(bar_index > 5000 ? close : 0)
```

Remarks

Note that **bar_index** has replaced **n** variable in version 4.

Note that bar indexing starts from 0 on the first historical bar.

Please note that using this variable/function can cause [indicator repainting](https://www.tradingview.com/pine-script-docs/concepts/repainting/).

See also

[last_bar_index](https://www.tradingview.com/pine-script-reference/v6/#var_last_bar_index) [barstate.isfirst](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isfirst) [barstate.islast](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.islast) [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v6/#var_barstate.isrealtime)
