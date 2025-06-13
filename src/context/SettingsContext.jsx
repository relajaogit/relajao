import { createContext, useContext, useState, useEffect } from 'react';

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
    return savedCurrency || 'USD'; // Default to USD if no preference is saved
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('relajao-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('relajao-currency', currency);
  }, [currency]);

  // Helper function to toggle language between English and Spanish
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  // Helper function to toggle currency between USD and COP
  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'COP' : 'USD');
  };

  // Set page direction based on language (useful for future RTL language support)
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Combine all settings and functions to be provided through context
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    currency,
    setCurrency,
    toggleCurrency
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}