import { createContext, useContext, useState, useEffect } from 'react';
import { getExchangeRates, getCachedRates } from '../utils/currencyUtils';

// Create the Settings context
const SettingsContext = createContext();

// Custom hook for using the settings
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Provider component for wrapping the app
export function SettingsProvider({ children }) {
  // Initialize state with values from localStorage if available
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('relajao-language');
    return savedLanguage || 'en'; // Default to English if no preference is saved
  });

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem('relajao-currency');
    return savedCurrency || 'COP'; // Default to COP if no preference is saved
  });

  // FX rates state (auto fetched, cached for 12h)
  const [rates, setRates] = useState({ COP: 1 });
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('relajao-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('relajao-currency', currency);
  }, [currency]);

  // Helper function to toggle language between English and Spanish
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'es' : 'en'));
  };

  // Helper function to cycle currency among COP -> USD -> EUR -> COP
  const toggleCurrency = () => {
    setCurrency(prev => {
      if (prev === 'COP') return 'USD';
      if (prev === 'USD') return 'EUR';
      return 'COP';
    });
  };

  // Preload FX rates on mount and when currency preference changes
  useEffect(() => {
    // Hydrate from cache first for immediate availability
    const cached = getCachedRates();
    if (cached?.rates) {
      setRates(cached.rates);
      setLastUpdatedAt(cached.ts || 0);
    }

    let mounted = true;
    (async () => {
      const payload = await getExchangeRates();
      if (!mounted) return;
      setRates(payload?.rates || { COP: 1 });
      setLastUpdatedAt(payload?.ts || Date.now());
    })();
    return () => {
      mounted = false;
    };
  }, [currency]);

  // Set page direction based on language (useful for future RTL language support)
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Combine all settings and functions to be provided through context
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    currency, // default COP
    setCurrency,
    toggleCurrency,
    rates,
    lastUpdatedAt,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}