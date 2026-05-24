# map.put_all()

Puts all key-value pairs from the `id2` map into the `id` map.

Syntax

```
map.put_all(id, id2) → void
```

Arguments

id (any map type) A map object to append to.

id2 (any map type) A map object to be appended.

Example

```
//@version=6
indicator("map.put_all example")
a = map.new<string, float>()
b = map.new<string, float>()
a.put("first", 10)
a.put("second", 15)
b.put("third", 20)
map.put_all(a, b)
plot(a.get("third"))
```

See also

[map.new<type,type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.new%3Ctype,type%3E) [map.put()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put) [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys) [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values) [map.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.remove)
