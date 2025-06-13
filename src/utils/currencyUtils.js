// Currency exchange rates and utility functions
// Exchange rate: 1 USD = 3800 COP (Colombian Peso) - example rate
const EXCHANGE_RATES = {
  USD: 1,
  COP: 3800
};

/**
 * Convert price from USD to specified currency
 * @param {number} price - Price in USD
 * @param {string} targetCurrency - Target currency code (USD or COP)
 * @returns {number} - Converted price in target currency
 */
export const convertCurrency = (price, targetCurrency) => {
  if (!price) return 0;
  return price * EXCHANGE_RATES[targetCurrency];
};

/**
 * Format price with currency symbol and proper formatting
 * @param {number} price - Price in the target currency
 * @param {string} currency - Currency code (USD or COP)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency) => {
  if (!price) return '';
  
  // Format based on currency
  if (currency === 'USD') {
    return `$${price.toLocaleString('en-US')}`;
  } else if (currency === 'COP') {
    // Colombian Peso uses a different format
    return `COP ${price.toLocaleString('es-CO')}`;
  }
  
  return `${price}`;
};

/**
 * Get currency name based on currency code
 * @param {string} currencyCode - Currency code (USD or COP)
 * @returns {string} - Full name of the currency
 */
export const getCurrencyName = (currencyCode) => {
  const names = {
    USD: 'US Dollar',
    COP: 'Colombian Peso'
  };
  
  return names[currencyCode] || currencyCode;
};

/**
 * Get currency symbol based on currency code
 * @param {string} currencyCode - Currency code
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: '$',
    COP: 'COP $'
  };
  
  return symbols[currencyCode] || currencyCode;
};