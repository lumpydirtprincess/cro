# syminfo.basecurrency

Returns a string containing the code representing the symbol's base currency (i.e., the traded currency or coin) if the instrument is a Forex or Crypto pair or a derivative based on such a pair. Otherwise, it returns an empty string. For example, this variable returns "EUR" for "EURJPY", "BTC" for "BTCUSDT", "CAD" for "CME:6C1!", and "" for "NASDAQ:AAPL".

Type

simple string

See also

[syminfo.currency](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.currency) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker)
