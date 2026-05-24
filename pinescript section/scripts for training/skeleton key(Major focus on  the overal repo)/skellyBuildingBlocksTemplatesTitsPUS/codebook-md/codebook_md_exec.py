print("!!output-start-cell")
import tradingview_api  # hypothetical
fast_ma_range = range(5, 25, 5)
slow_ma_range = range(20, 100, 20)
ma_types = ['SMA', 'EMA', 'RMA']
results = []
for fast in fast_ma_range:
    for slow in slow_ma_range:
        for ma_type in ma_types:
            # Update strategy parameters
            params = {
                'fast_ma': fast,
                'slow_ma': slow,
                'ma_type': ma_type
            }
            # Run backtest
            result = tradingview_api.run_backtest(strategy_id, params)
            # Store results
            results.append({
                'params': params,
                'net_profit': result.net_profit,
                'sharpe': result.sharpe_ratio,
                'max_dd': result.max_drawdown
            })
best = max(results, key=lambda x: x['sharpe'])
print(f"Best parameters: {best['params']}")

print("!!output-end-cell")