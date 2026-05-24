# matrix.row()

The function creates a one-dimensional array from the elements of a matrix row.

Syntax

```
matrix.row(id, row) → array<type>
```

Arguments

id (any matrix type) A matrix object.

row (series int) Index of the required row.

Example

```
//@version=6
indicator("`matrix.row()` Example", "", true)

// Create a 2x3 "float" matrix from `hlc3` values.
m = matrix.new<float>(2, 3, hlc3)

// Return an array with the values of the first row of the matrix.
a = matrix.row(m, 0)

// Plot the first value from the array `a`.
plot(array.get(a, 0))
```

Returns

An array ID containing the `row` values of the `id` matrix.

Remarks

Indexing of rows starts at 0.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get) [matrix.col()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.col) [matrix.rows()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.rows)
