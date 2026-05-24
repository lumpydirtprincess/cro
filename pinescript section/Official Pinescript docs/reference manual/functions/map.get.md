# map.get()

Returns the value associated with the specified `key` in the `id` map.

Syntax

```
map.get(id, key) → <value_type>
```

Arguments

id (any map type) A map object.

key (series <type of the map's elements>) The key of the value to retrieve.

Example

```
//@version=6
indicator("map.get example")
a = map.new<int, int>()
size = 10
for i = 0 to size
    a.put(i, size-i)
plot(map.get(a, 1))
```

See also

[map.new<type,type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.new%3Ctype,type%3E) [map.put()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put) [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys) [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values) [map.contains()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.contains)
