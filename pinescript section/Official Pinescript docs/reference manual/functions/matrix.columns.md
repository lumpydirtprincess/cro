# matrix.columns()

The function returns the number of columns in the matrix.

Syntax

```
matrix.columns(id) → series int
```

Arguments

id (any matrix type) A matrix object.

Example

```
//@version=6
indicator("`matrix.columns()` Example")

// Create a 2x6 matrix with values `0`.
var m = matrix.new<int>(2, 6, 0)

// Get the quantity of columns in matrix `m`.
var x = matrix.columns(m)

// Display using a label.
if barstate.islastconfirmedhistory
    label.new(bar_index, high, "Columns: " + str.tostring(x) + "\n" + str.tostring(m))
```

Returns

The number of columns in the matrix `id`.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.col()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.col) [matrix.row()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.row) [matrix.rows()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.rows)
