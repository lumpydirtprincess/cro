# matrix.mode()

2 overloads

The function calculates the [mode](https://en.wikipedia.org/wiki/Mode_(statistics)) of the matrix, which is the most frequently occurring value from the matrix elements. When there are multiple values occurring equally frequently, the function returns the smallest of those values.

Syntax & Overloads

[```\\
matrix.mode(id) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.mode-0) [```\\
matrix.mode(id) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.mode-1)

Arguments

id (matrix<int/float>) A matrix object.

Example

```
//@version=6
indicator("`matrix.mode()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 0)
matrix.set(m, 0, 1, 0)
matrix.set(m, 1, 0, 1)
matrix.set(m, 1, 1, 1)

// Get the mode of the matrix.
var x = matrix.mode(m)

plot(x, 'Mode of the matrix')
```

Returns

The most frequently occurring value from the `id` matrix. If none exists, returns the smallest value instead.

Remarks

Note that [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) elements of the matrix are not considered when calculating the mode.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.median()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.median) [matrix.sort()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.sort) [matrix.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg)
