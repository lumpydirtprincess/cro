# %=

Modulo assignment. Applicable to numerical expressions.

Syntax

```
expr1 %= expr2
```

Example

```
//@version=6
indicator("%=")
// Equals to expr1 = expr1 % expr2.
a = 3
b = 3
a %= b
// Result: a = 0.
plot(a)
```

Returns

Integer or float value, or series of values.
