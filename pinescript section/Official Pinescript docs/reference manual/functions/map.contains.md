# map.contains()

Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if the `key` was found in the `id` map, [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise.

Syntax

```
map.contains(id, key) → series bool
```

Arguments

id (any map type) A map object.

key (series <type of the map's elements>) The key to search in the map.

Example

```
//@version=6
indicator("map.includes example")
a = map.new<string, float>()
a.put("open", open)
p = close
if map.contains(a, "open")
    p := a.get("open")
plot(p)
```

See also

[map.new<type,type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.new%3Ctype,type%3E) [map.put()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put) [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys) [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values) [map.size()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.size)
