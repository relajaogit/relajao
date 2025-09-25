const FX_CACHE_KEY = 'fx_rates_v1';
const FX_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Sensible default fallback rates (base COP -> quote in target currency)
// Approx: 1 USD ≈ 4000 COP => 1 COP ≈ 0.00025 USD
//        1 EUR ≈ 4300 COP => 1 COP ≈ ~0.0002326 EUR
const DEFAULT_RATES = {
  COP: 1,
  USD: 0.00025,
  EUR: 0.0002326,
};

function now() {
  return Date.now();
}

function readCache() {
  try {
    const raw = localStorage.getItem(FX_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    localStorage.setItem(FX_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore write failures (e.g., Safari private mode)
  }
}

/**
 * Fetch and cache exchange rates using exchangerate.host
 * Base: COP
 * Symbols: USD, EUR, COP
 * Cache for 12h
 */
export async function getExchangeRates() {
  const cached = readCache();
  const freshEnough =
    cached && typeof cached.ts === 'number' && now() - cached.ts < FX_TTL_MS;

  if (freshEnough) {
    return cached;
  }

  try {
    const url =
      'https://api.exchangerate.host/latest?base=COP&symbols=USD,EUR,COP';
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error('fx http error');
    const data = await res.json();
    // Normalize structure
    const rates = {
      COP: 1,
      USD:
        data?.rates?.USD && Number.isFinite(Number(data.rates.USD))
          ? Number(data.rates.USD)
          : DEFAULT_RATES.USD,
      EUR:
        data?.rates?.EUR && Number.isFinite(Number(data.rates.EUR))
          ? Number(data.rates.EUR)
          : DEFAULT_RATES.EUR,
    };
    const payload = {
      base: 'COP',
      rates,
      ts: now(),
    };
    writeCache(payload);
    return payload;
  } catch {
    // Fallbacks:
    // 1) stale cache is acceptable
    if (cached) return cached;
    // 2) no cache available: return defaults
    const payload = {
      base: 'COP',
      rates: { ...DEFAULT_RATES },
      ts: now(),
    };
    writeCache(payload);
    return payload;
  }
}

/**
 * Get the most recent cached rates without fetching.
 */
export function getCachedRates() {
  const cached = readCache();
  if (cached && cached.rates) {
    // Ensure defaults filled if any missing
    const rates = { ...DEFAULT_RATES, ...cached.rates };
    return { ...cached, rates };
  }
  return { base: 'COP', rates: { ...DEFAULT_RATES }, ts: 0 };
}

/**
 * Convert currency amounts using COP as base in the cache.
 * General conversion:
 * - If from === COP and to !== COP: amount * rate[to]
 * - If to === COP and from !== COP: amount / rate[from]
 * - If both !== COP: convert via COP (amount / rate[from]) * rate[to]
 */
export function convertCurrency(amount, from = 'COP', to = 'COP') {
  const n = Number(amount);
  if (!Number.isFinite(n)) return 0;
  if (from === to) return n;

  const { rates } = getCachedRates();

  const rFrom = rates[from];
  const rTo = rates[to];

  // Normalize everything through base COP
  if (from === 'COP' && to !== 'COP') {
    return n * rTo;
  }
  if (to === 'COP' && from !== 'COP') {
    return n / rFrom;
  }
  // from !== COP && to !== COP
  const inCOP = n / rFrom;
  return inCOP * rTo;
}

/**
 * Legacy helper: convert from COP to the target currency.
 */
export function convertFromCOP(amountCOP, toCurrency) {
  return convertCurrency(amountCOP, 'COP', toCurrency);
}

/**
 * Intl.NumberFormat-based formatting
 * - COP: es-CO, currencyDisplay: 'code', 0 decimals => "COP 1.234.000"
 * - USD: en-US, symbol, 2 decimals => "$1,234.56"
 * - EUR: en-US, symbol, 2 decimals => "€1,234.56"
 */
export function formatCurrency(amount, currency, language = 'en') {
  const n = Number(amount) || 0;

  if (currency === 'COP') {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);
  }

  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }

  if (currency === 'EUR') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }

  // Fallback generic
  try {
    return new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(n);
  } catch {
    return String(n);
  }
}

/**
 * Legacy helper: keep compatibility with existing imports.
 */
export function formatPrice(amount, currency, language) {
  return formatCurrency(amount, currency, language);
}

export function convertAndFormat(amountCOP, toCurrency, language) {
  return formatCurrency(
    convertFromCOP(amountCOP, toCurrency),
    toCurrency,
    language
  );
}