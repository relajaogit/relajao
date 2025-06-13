import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import { getCurrencyName } from '../utils/currencyUtils';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, currency, toggleCurrency } = useSettings();
  
  const t = translations[language];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-rose-600">Relajao</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-gray-50">
                {t.nav.home}
              </Link>
              <Link to="/properties" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-gray-50">
                {t.nav.properties}
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-gray-50">
                {t.nav.about}
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-gray-50">
                {t.nav.contact}
              </Link>
            </div>
          </div>
          
          {/* Settings: Language & Currency */}
          <div className="hidden sm:flex sm:items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 transition-colors"
              title={t.settings.language}
            >
              <span className="flex items-center justify-center h-6 w-6 border rounded-full bg-gray-100 text-xs mr-1">
                {language.toUpperCase()}
              </span>
              <span className="hidden md:inline">{language === 'en' ? 'English' : 'Español'}</span>
            </button>
            
            <button 
              onClick={toggleCurrency}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 transition-colors"
              title={t.settings.currency}
            >
              <span className="flex items-center justify-center h-6 w-6 border rounded-full bg-gray-100 text-xs mr-1">
                {currency === 'USD' ? '$' : '$'}
              </span>
              <span className="hidden md:inline">{currency}</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {t.nav.home}
            </Link>
            <Link 
              to="/properties" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {t.nav.properties}
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {t.nav.about}
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {t.nav.contact}
            </Link>
            
            {/* Mobile settings */}
            <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  toggleLanguage();
                  toggleMenu();
                }}
                className="flex items-center justify-center space-x-1 text-gray-500 hover:text-rose-600"
              >
                <span className="flex items-center justify-center h-6 w-6 border rounded-full bg-gray-100 text-xs">
                  {language.toUpperCase()}
                </span>
                <span>{language === 'en' ? 'English' : 'Español'}</span>
              </button>
              
              <button 
                onClick={() => {
                  toggleCurrency();
                  toggleMenu();
                }}
                className="flex items-center justify-center space-x-1 text-gray-500 hover:text-rose-600"
              >
                <span className="flex items-center justify-center h-6 w-6 border rounded-full bg-gray-100 text-xs">
                  {currency === 'USD' ? '$' : '$'}
                </span>
                <span>{currency}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;