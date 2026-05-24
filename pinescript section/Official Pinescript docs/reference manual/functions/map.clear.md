# map.clear()

Clears the map, removing all key-value pairs from it.

Syntax

```
map.clear(id) → void
```

Arguments

id (any map type) A map object.

Example

```
//@version=6
indicator("map.clear example")
oddMap = map.new<int, bool>()
oddMap.put(1, true)
oddMap.put(2, false)
oddMap.put(3, true)
map.clear(oddMap)
plot(oddMap.size())
```

See also

[map.new<type,type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.new%3Ctype,type%3E) [map.put_all()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put_all) [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys) [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values) [map.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.remove)
