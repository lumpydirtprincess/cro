# /=

Division assignment. Applicable to numerical expressions.

Syntax

```
expr1 /= expr2
```

Example

```
//@version=6
indicator("/=")
// Equals to expr1 = expr1 / expr2.
float a = 3.0
b = 3
a /= b
// Result: a = 1.
plot(a)
```

Returns

Integer or float value, or series of values.
