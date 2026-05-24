![](../3. Language/language_identifiers.md)

# [Identifiers](../3. Language/language_identifiers.md#identifiers)

Identifiers are names used for user-defined variables and functions:

- They must begin with an uppercase (`A-Z`) or lowercase (`a-z`)
letter, or an underscore (`_`).
- The next characters can be letters, underscores or digits (`0-9`).
- They are case-sensitive.

Here are some examples:

```pine
myVar
_myVar
my123Var
functionName
MAX_LEN
max_len
maxLen
3barsDown  // NOT VALID!
```

The Pine Script® [Style Guide](../4. Writing_Scripts/writing_style-guide.md) recommends using uppercase SNAKE\_CASE for constants, and
camelCase for other identifiers:

```pine
GREEN_COLOR = #4CAF50
MAX_LOOKBACK = 100
int fastLength = 7
// Returns 1 if the argument is `true`, 0 if it is `false` or `na`.
zeroOne(boolValue) => boolValue ? 1 : 0
```

[Previous 
**Script structure**](../3. Language/language_script-structure.md) [Next 
**Declaration statements**](../3. Language/language_declaration-statements.md)