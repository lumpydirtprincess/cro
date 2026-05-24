# map.new<type,type>()

Creates a new map object: a collection that consists of key-value pairs, where all keys are of the `keyType`, and all values are of the `valueType`.

`keyType` can be a primitive type or enum. For example: [int](https://www.tradingview.com/pine-script-reference/v6/#type_int), [float](https://www.tradingview.com/pine-script-reference/v6/#type_float), [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool), [string](https://www.tradingview.com/pine-script-reference/v6/#type_string), [color](https://www.tradingview.com/pine-script-reference/v6/#type_color).

`valueType` can be of any type except `array<>`, `matrix<>`, and `map<>`. User-defined types are allowed, even if they have `array<>`, `matrix<>`, or `map<>` as one of their fields.

Syntax

```
map.new<keyType, valueType>() → map<keyType, valueType>
```

Example

```
//@version=6
indicator("map.new<string, int> example")
a = map.new<string, int>()
a.put("example", 1)
label.new(bar_index, close, str.tostring(a.get("example")))
```

Returns

The ID of a map object which may be used in other map.\*() functions.

Remarks

Each key is unique and can only appear once. When adding a new value with a key that the map already contains, that value replaces the old value associated with the key.

Maps maintain insertion order. Note that the order does not change when inserting a pair with a `key` that's already in the map. The new pair replaces the existing pair with the `key` in such cases.

See also

[map.put()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put) [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys) [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values) [map.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.get) [array.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new%3Ctype%3E)
