# footprint.delta()

Calculates the overall volume delta for the volume footprint represented by a [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object. The value represents the difference between the footprint's total "buy" volume and "sell" volume. A positive value indicates that the total "buy" volume in the footprint exceeds the total "sell" volume, and a negative value indicates the opposite.

Syntax

```
footprint.delta(id) → series float
```

Arguments

id (footprint) The reference (ID) of the [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object to analyze.

Returns

The overall volume delta for the footprint.
