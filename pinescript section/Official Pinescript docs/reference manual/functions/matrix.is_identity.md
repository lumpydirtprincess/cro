# matrix.is_identity()

The function determines if a matrix is an [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix) (elements with ones on the [main diagonal](https://en.wikipedia.org/wiki/Main_diagonal) and zeros elsewhere).

Syntax

```
matrix.is_identity(id) → series bool
```

Arguments

id (matrix<int/float>) Matrix object to test.

Returns

Returns true if `id` is an identity matrix, false otherwise.

Remarks

Returns false with non-square matrices.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.is_square()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_square) [matrix.is_diagonal()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_diagonal)
