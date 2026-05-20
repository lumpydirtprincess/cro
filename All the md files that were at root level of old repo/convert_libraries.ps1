# Pine Script Library Converter
# Converts quantitative indicators to TradingView v6 Libraries

$sourceBase = "Model Indicators/quantitative/indicators"
$targetBase = "Model Indicators/quantitative/libraries"

$mappings = @{
    "bbands" = "bollinger_bands"
    "bbw" = "bollinger_band_width"
    "bbwn" = "bollinger_band_width_normalized"
    "bbwp" = "bollinger_band_width_percentile"
    "cci" = "commodity_channel_index"
    "cma" = "cumulative_moving_average"
    "cmf" = "chaikin_money_flow"
    "crsi" = "connors_rsi"
    "cti" = "correlation_trend_indicator"
    "dema" = "double_exponential_moving_average"
    "ema" = "exponential_moving_average"
    "hma" = "hull_moving_average"
    "ichimoku" = "ichimoku_cloud"
    "kama" = "kaufman_adaptive_moving_average"
    "macd" = "moving_average_convergence_divergence"
    "mfi" = "money_flow_index"
    "mom" = "momentum_oscillator"
    "obv" = "on_balance_volume"
    "ppo" = "percentage_price_oscillator"
    "rsi" = "relative_strength_index"
    "sar" = "parabolic_stop_and_reverse"
    "sma" = "simple_moving_average"
    "stoch" = "stochastic_oscillator"
    "super" = "supertrend_indicator"
    "tema" = "triple_exponential_moving_average"
    "trima" = "triangular_moving_average"
    "trix" = "triple_exponential_average"
    "tsi" = "true_strength_index"
    "vwap" = "volume_weighted_average_price"
    "vwma" = "volume_weighted_moving_average"
    "willr" = "williams_percent_r"
    "zscore" = "z_score_statistic"
    "avgprice" = "average_price"
    "ha" = "heikin_ashi"
    "hl2" = "high_low_midpoint"
    "hlc3" = "high_low_close_midpoint"
    "hlcc4" = "high_low_close_close_midpoint"
    "medprice" = "median_price"
    "midpoint" = "midpoint_price"
    "midprice" = "middle_price"
    "ohlc3" = "ohlc_midpoint"
    "ohlc4" = "ohlc_average"
    "olc3" = "olc_midpoint"
    "typprice" = "typical_price"
    "wclprice" = "weighted_close_price"
    "alma" = "arnaud_legoux_moving_average"
    "blma" = "boxcar_least_mean_square_average"
    "bwma" = "backward_weighted_moving_average"
    "conv" = "convergence_divergence_filter"
    "crma" = "cumulative_regression_moving_average"
    "dwma" = "double_weighted_moving_average"
    "epma" = "end_point_moving_average"
    "fwma" = "forward_weighted_moving_average"
    "gwma" = "gaussian_weighted_moving_average"
    "hamma" = "hull_3ma_moving_average"
    "hanma" = "hann_moving_average"
    "hend" = "henderson_moving_average"
    "ilrs" = "integrated_linear_regression_slope"
    "kaiser" = "kaiser_window_filter"
    "lanczos" = "lanczos_resampling_filter"
    "lsma" = "least_squares_moving_average"
    "nlma" = "nonlinear_moving_average"
    "nyqma" = "nyquist_moving_average"
    "parzen" = "parzen_window_filter"
    "pma" = "projected_moving_average"
    "pwma" = "parabolic_weighted_moving_average"
    "qrma" = "quadratic_regression_moving_average"
    "rain" = "rainbow_moving_average"
    "rwma" = "recursive_weighted_moving_average"
    "sgma" = "savitzky_golay_moving_average"
    "sinema" = "sine_moving_average"
    "sp15" = "symmetrically_weighted_filter"
    "swma" = "symmetrically_weighted_moving_average"
    "tsf" = "time_series_forecast"
    "tukey_w" = "tukey_window_filter"
    "wma" = "weighted_moving_average"
    "adxvma" = "adx_weighted_moving_average"
    "ahrens" = "ahrens_filter"
    "coral" = "coral_trend_indicator"
    "decycler" = "decycler_filter"
    "dsma" = "dual_smoothed_moving_average"
    "frama" = "fractal_adaptive_moving_average"
    "gdema" = "gann_double_exponential_moving_average"
    "hema" = "hull_exponential_moving_average"
    "holt" = "holt_winters_filter"
    "htit" = "hilbert_transform_instantaneous_trendline"
    "hwma" = "hull_wilder_moving_average"
    "jma" = "jurik_moving_average"
    "lema" = "linear_exponential_moving_average"
    "ltma" = "lead_trend_moving_average"
    "mama" = "mesa_adaptive_moving_average"
    "mavp" = "moving_average_variable_period"
    "mcnma" = "modified_center_of_gravity_ma"
    "mgdi" = "ma_gradient_descent_indicator"
    "mma" = "smoothed_moving_average"
    "nma" = "nonlinear_moving_average_iir"
    "qema" = "quadruple_exponential_moving_average"
    "rema" = "recursive_moving_average"
    "rgma" = "recursive_gaussian_moving_average"
    "rma" = "running_moving_average"
    "t3" = "triple_exponential_moving_average_t3"
    "trama" = "triangular_moving_average_t3"
    "vama" = "variable_index_dynamic_average"
    "vidya" = "variable_index_dynamic_average_vidya"
    "yzvama" = "zero_lag_vama"
    "zldema" = "zero_lag_double_exponential_ma"
    "zlema" = "zero_lag_exponential_moving_average"
    "zltema" = "zero_lag_triple_exponential_ma"
    "asi" = "accumulation_swings_indicator"
    "bias" = "bias_indicator"
    "bop" = "balance_of_power"
    "cfb" = "chande_fractal_bands"
    "cmo" = "chande_momentum_oscillator"
    "pmo" = "percentage_momentum_oscillator"
    "prs" = "price_rate_of_change_strength"
    "roc" = "rate_of_change"
    "rocp" = "rate_of_change_percentage"
    "rocr" = "rate_of_change_ratio"
    "rsx" = "relative_strength_x"
    "sam" = "schaff_absolute_momentum"
    "si" = "smoothed_impulse"
    "ac" = "acceleration_oscillator"
    "ao" = "awesome_oscillator"
    "apo" = "absolute_price_oscillator"
    "bbb" = "bollinger_band_bounce"
    "bbi" = "bollinger_band_indicator"
    "bbs" = "bollinger_band_squeeze"
    "brar" = "brar_oscillator"
    "cfo" = "chande_forecast_oscillator"
    "coppock" = "coppock_curve"
    "deco" = "decreasing_oscillator"
    "dem" = "demarker_oscillator"
    "dosc" = "detrended_oscillator"
    "dymoi" = "dynamic_momentum_oscillator"
    "er" = "efficiency_ratio"
    "eri" = "elder_ray_index"
    "fi" = "force_index"
    "fisher" = "fisher_transform"
    "fisher04" = "fisher_transform_04"
    "gator" = "gator_oscillator"
    "imi" = "intraday_momentum_index"
    "inertia" = "inertia_indicator"
    "kdj" = "kdj_stochastic"
    "kri" = "kri_oscillator"
    "kst" = "know_sure_thing"
    "lrsi" = "larry_rsi"
    "marketfi" = "market_facilitation_index"
    "mstoch" = "modified_stochastic"
    "pgo" = "pretty_good_oscillator"
    "psl" = "percentage_scale_oscillator"
    "qqe" = "quantitative_qualitative_estimation"
    "reflex" = "reflex_indicator"
    "reverseema" = "reverse_ema_oscillator"
    "rvgi" = "relative_vigor_index"
    "smi" = "stochastic_momentum_index"
    "squeeze" = "squeeze_momentum_indicator"
    "stc" = "schaff_trend_cycle"
    "stochf" = "stochastic_fast"
    "stochrsi" = "stochastic_rsi"
    "td_seq" = "tom_demarker_sequence"
    "trendflex" = "trendflex_oscillator"
    "trix2" = "triple_exponential_oscillator"
    "ultosc" = "ultimate_oscillator"
    "willr2" = "williams_percent_r"
    "adr" = "average_daily_range"
    "atr" = "average_true_range"
    "atrn" = "average_true_range_normalized"
    "atrp" = "average_true_range_percentage"
    "bbwn2" = "bollinger_band_width_normalized"
    "bbwp2" = "bollinger_band_width_percentile"
    "ccv" = "chaikin_volatility"
    "cv" = "coefficient_of_variation"
    "cvi" = "chaikin_volatility_index"
    "etherm" = "exponential_thermometer"
    "ewma" = "exponentially_weighted_moving_average"
    "gkv" = "garman_klass_volatility"
    "hlv" = "high_low_volatility"
    "hv" = "historical_volatility"
    "jvolty" = "j_volatility"
    "jvoltyn" = "j_volatility_normalized"
    "massi" = "mass_index"
    "natr" = "normalized_average_true_range"
    "pv" = "price_volatility"
    "rsv" = "relative_strength_value"
    "rv" = "realized_volatility"
    "rvi" = "relative_vigor_index_volatility"
    "tr" = "true_range"
    "ui" = "ulcer_index"
    "vov" = "volatility_of_volatility"
    "vr" = "volume_ratio"
    "yzv" = "zero_lag_volatility"
    "adl" = "accumulation_distribution_line"
    "adosc" = "accumulation_distribution_oscillator"
    "aobv" = "archer_on_balance_volume"
    "cmf2" = "chaikin_money_flow"
    "efi" = "elder_force_index"
    "eom" = "ease_of_movement"
    "evwma" = "exponential_volume_weighted_moving_average"
    "iii" = "intraday_intensity_index"
    "kvo" = "klinger_volume_oscillator"
    "mfi2" = "money_flow_index"
    "nvi" = "negative_volume_index"
    "obv2" = "on_balance_volume"
    "pvd" = "positive_volume_disparity"
    "pvi" = "positive_volume_index"
    "pvo" = "percentage_volume_oscillator"
    "pvr" = "percentage_volume_ratio"
    "pvt" = "price_volume_trend"
    "tvi" = "trend_volume_index"
    "twap" = "time_weighted_average_price"
    "va" = "volume_accumulation"
    "vf" = "volume_flow"
    "vo" = "volume_oscillator"
    "vroc" = "volume_rate_of_change"
    "vwad" = "volume_weighted_accumulation_distribution"
    "wad" = "williams_accumulation_distribution"
    "beta" = "beta_function"
    "cointegration" = "cointegration_test"
    "correlation" = "correlation_coefficient"
    "covariance" = "covariance_matrix"
    "cummean" = "cumulative_mean"
    "entropy" = "entropy_measure"
    "geomean" = "geometric_mean"
    "granger" = "granger_causality"
    "harmean" = "harmonic_mean"
    "hurst" = "hurst_exponent"
    "iqr" = "interquartile_range"
    "jb" = "jarque_bera_test"
    "kendall" = "kendall_tau_correlation"
    "kurtosis" = "kurtosis_measure"
    "linreg" = "linear_regression"
    "meandev" = "mean_deviation"
    "median" = "median_measure"
    "mode" = "mode_measure"
    "percentile" = "percentile_calculation"
    "polyfit" = "polynomial_fit"
    "quantile" = "quantile_measure"
    "skew" = "skewness_measure"
    "spearman" = "spearman_correlation"
    "stddev" = "standard_deviation"
    "stderr" = "standard_error"
    "sum" = "summation"
    "theil" = "theil_u_statistic"
    "trim" = "trimmed_mean"
    "variance" = "variance_measure"
    "wavg" = "weighted_average"
    "wins" = "winsorized_mean"
    "ztest" = "z_test_statistic"
    "ccor" = "cyclic_correlation"
    "ccyc" = "cyclic_oscillator"
    "cg" = "center_of_gravity"
    "dsp" = "digital_signal_processor"
    "eacp" = "even_odd_cyclic_period"
    "ebsw" = "elias_business_cycle"
    "homod" = "homodyne_discriminator"
    "ht_dcperiod" = "hilbert_dc_period"
    "ht_dcphase" = "hilbert_dc_phase"
    "ht_phasor" = "hilbert_phasor"
    "ht_sine" = "hilbert_sine_wave"
    "lunar" = "lunar_cycle"
    "phasor" = "phasor_oscillator"
    "sine" = "sine_wave"
    "solar" = "solar_cycle"
    "ssfdsp" = "super_smoother_dsp"
    "adx" = "average_directional_index"
    "adxr" = "average_directional_rating_index"
    "alligator" = "bill_williams_alligator"
    "amat" = "aroon_moving_average_trend"
    "aroon" = "aroon_indicator"
    "aroonosc" = "aroon_oscillator"
    "chop" = "chop_zone_index"
    "dmx" = "directional_movement_extreme"
    "dx" = "directional_movement_index"
    "ghla" = "gann_high_low_activator"
    "ht_trendmode" = "hilbert_trend_mode"
    "pfe" = "polarized_fractal_efficiency"
    "qstick" = "qstick_candlestick_oscillator"
    "ravi" = "ravi_trend_indicator"
    "ttm" = "ttm_trend"
    "ttmtrend" = "ttm_trend_oscillator"
    "vhf" = "vertical_horizontal_filter"
    "vortex" = "vortex_indicator"
    "fractals" = "fractals_indicator"
    "pivot" = "pivot_points"
    "pivotcam" = "pivot_cam"
    "pivotdem" = "pivot_demark"
    "pivotext" = "pivot_extreme"
    "pivotfib" = "pivot_fibonacci"
    "pivotwood" = "pivot_woodie"
    "swings" = "swings_indicator"
    "ttmscalper" = "ttm_scalper"
    "agc" = "automatic_gain_control"
    "alaguerre" = "laguerre_filter"
    "baxterking" = "baxter_king_band_pass"
    "bessel" = "bessel_filter"
    "bilateral" = "bilateral_filter"
    "bpf" = "band_pass_filter"
    "butter" = "butterworth_filter"
    "butter2" = "butterworth_filter_2"
    "butter3" = "butterworth_filter_3"
    "cfitz" = "cfitz_filter"
    "cheby1" = "chebyshev_type1_filter"
    "cheby2" = "chebyshev_type2_filter"
    "edcf" = "edcf_filter"
    "elliptic" = "elliptic_filter"
    "gauss" = "gaussian_filter"
    "hann" = "hann_window_filter"
    "hp" = "high_pass_filter"
    "hpf" = "high_pass_filter_2"
    "kalman" = "kalman_filter"
    "kf" = "kalman_filter_extended"
    "laguerre" = "laguerre_filter"
    "lms" = "least_mean_squares_filter"
    "loess" = "loess_smoothing"
    "modf" = "modf_filter"
    "notch" = "notch_filter"
    "nw" = "nadaraya_watson_filter"
    "oneeuro" = "one_euro_filter"
    "rls" = "recursive_least_squares_filter"
    "rmed" = "recursive_median_filter"
    "roofing" = "roofing_filter"
    "sak" = "sak_filter"
    "sgf" = "savitzky_golay_filter"
    "spbf" = "super_position_band_pass_filter"
    "ssf" = "super_smooth_filter"
    "ssf2" = "super_smooth_filter_2"
    "ssf3" = "super_smooth_filter_3"
    "usf" = "ultra_smooth_filter"
    "voss" = "voss_filter"
    "wavelet" = "wavelet_filter"
    "wiener" = "wiener_filter"
    "afirma" = "adaptive_fuzzy_forecast"
    "mlp" = "multilayer_perceptron_forecast"
    "dirty" = "dirty_price_error"
    "huber" = "huber_loss"
    "logcosh" = "log_cosh_loss"
    "maape" = "mean_arctangent_absolute_percentage_error"
    "mae" = "mean_absolute_error"
    "mapd" = "mean_absolute_percentage_deviation"
    "mape" = "mean_absolute_percentage_error"
    "mase" = "mean_absolute_scaled_error"
    "mdae" = "median_absolute_error"
    "mdape" = "median_absolute_percentage_error"
    "me" = "mean_error"
    "mpe" = "mean_percentage_error"
    "mrae" = "mean_relative_absolute_error"
    "mse" = "mean_squared_error"
    "msle" = "mean_squared_log_error"
    "pseudohuber" = "pseudo_huber_loss"
    "quantileloss" = "quantile_loss"
    "rae" = "relative_absolute_error"
    "rmse" = "root_mean_square_error"
    "rmsle" = "root_mean_square_log_error"
    "rse" = "relative_squared_error"
    "rsquared" = "r_squared"
    "smape" = "symmetric_mean_absolute_percentage_error"
    "theilu" = "theil_u_statistic"
    "tukeybiweight" = "tukey_biweight_loss"
    "wmape" = "weighted_mean_absolute_percentage_error"
    "wrmse" = "weighted_root_mean_square_error"
}

$categories = @("channels","core","cycles","dynamics","errors","filters","forecasts","momentum","numerics","oscillators","reversals","statistics","trends_FIR","trends_IIR","volatility","volume")

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pine Script Library Converter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$totalFiles = 0
$totalConverted = 0

foreach ($category in $categories) {
    $sourceDir = Join-Path $sourceBase $category
    $targetDir = Join-Path $targetBase $category
    
    if (-not (Test-Path $sourceDir)) {
        Write-Host "[SKIP] $category - not found" -ForegroundColor Yellow
        continue
    }
    
    $files = @(Get-ChildItem $sourceDir -Filter *.pine -ErrorAction SilentlyContinue)
    if ($files.Count -eq 0) {
        Write-Host "[SKIP] $category - no .pine files" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "[PROCESSING] $category - $($files.Count) files" -ForegroundColor Green
    
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    
    foreach ($file in $files) {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $ext = [System.IO.Path]::GetExtension($file.Name)
        
        if ($mappings.ContainsKey($baseName)) {
            $newBaseName = $mappings[$baseName]
        } else {
            $newBaseName = $baseName
        }
        
        $newFileName = $newBaseName + $ext
        $targetFile = Join-Path $targetDir $newFileName
        
        $totalFiles++
        
        $content = Get-Content $file.FullName -Raw
        
        $title = ($newBaseName -split '_') | ForEach-Object {
            if ($_.Length -gt 0) { $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower() }
        } -join ' '
        
        $lines = $content -split "`n"
        $output = @()
        $inFunction = $false
        $funcLines = @()
        
        foreach ($line in $lines) {
            $trimmed = $line.Trim()
            
            if ($trimmed -match '^//@version=6') {
                $output += "//@version=6"
                $output += ""
                $output += "// $title"
                $output += "// Category: $category"
                $output += "// Auto-converted to TradingView v6 Library"
                $output += "//"
                $libTitle = $title.Replace('"', '""')
                $output += "library(`"$libTitle`", `"v1.0.0`", overlay=false)"
                $output += ""
                continue
            }
            
            if ($trimmed -match '^indicator\(') {
                continue
            }
            
            if ($trimmed -match '^(\w+)\(([^)]*)\)\s*=>\s*$' -and $trimmed -notmatch '^//') {
                $inFunction = $true
                $funcLines = @($line)
                continue
            }
            
            if ($inFunction) {
                $funcLines += $line
                
                if ($trimmed -eq "" -or $trimmed -match '^(plot|hline|fill|export|function|indicator|//)') {
                    $funcText = $funcLines -join "`n"
                    $funcText = $funcText -replace '^(\s*)(\w+)\(([^)]*)\)\s*=>', '$1export $2($3) =>'
                    $output += $funcText
                    $output += ""
                    
                    $inFunction = $false
                    $funcLines = @()
                    
                    if ($trimmed -ne "" -and $trimmed -notmatch '^(plot|hline|fill)') {
                        $output += $line
                    }
                    continue
                }
            } else {
                if ($trimmed -match '^\s*plot\(' -or $trimmed -match '^\s*hline\(') {
                    $output += "// " + $line.TrimEnd() + "  // Disabled in library"
                    continue
                }
                $output += $line
            }
        }
        
        $output -join "`n" | Set-Content $targetFile -Encoding UTF8
        
        $totalConverted++
        
        if ($newFileName -ne $file.Name) {
            Write-Host "  RENAME: $($file.Name) -> $newFileName" -ForegroundColor Yellow
        } else {
            Write-Host "  OK: $($file.Name)"
        }
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CONVERSION COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total files: $totalFiles" -ForegroundColor White
Write-Host "Converted: $totalConverted" -ForegroundColor White
Write-Host "Target: $targetBase" -ForegroundColor White
Write-Host ""
