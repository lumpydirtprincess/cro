# matrix.is_antidiagonal()

The function determines if the matrix is [anti-diagonal](https://en.wikipedia.org/wiki/Anti-diagonal_matrix) (all elements outside the secondary diagonal are zero).

Syntax

```
matrix.is_antidiagonal(id) → series bool
```

Arguments

id (matrix<int/float>) Matrix object to test.

Returns

Returns true if the `id` matrix is ​​anti-diagonal, false otherwise.

Remarks

Returns false with non-square matrices.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.is_square()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_square) [matrix.is_identity()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_identity) [matrix.is_diagonal()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_diagonal)
