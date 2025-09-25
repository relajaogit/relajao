import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';

function Navbar() {
  const { language, toggleLanguage, currency, toggleCurrency } = useSettings();
  const t = translations[language] || translations.en; // Fallback to English if the language is not available
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
            <span className="text-2xl font-bold text-rose-600">Relajao</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-rose-600 px-3 py-2 rounded-md font-medium"
              >
                {t.navbar?.home || 'Home'}
              </Link>
              <Link
                to="/properties"
                className="text-gray-800 hover:text-rose-600 px-3 py-2 rounded-md font-medium"
              >
                {t.navbar?.properties || 'Properties'}
              </Link>
              <Link
                to="/about"
                className="text-gray-800 hover:text-rose-600 px-3 py-2 rounded-md font-medium"
              >
                {t.navbar?.about || 'About Us'}
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-rose-600 px-3 py-2 rounded-md font-medium"
              >
                {t.navbar?.contact || 'Contact'}
              </Link>
            </div>
          </div>

          {/* Language and currency toggles */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={toggleLanguage}
                className="p-1 rounded-full text-gray-800 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mr-4"
              >
                <span className="text-sm font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
              </button>
              <button
                onClick={toggleCurrency}
                className="p-1 rounded-full text-gray-800 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                <span className="text-sm font-medium">{currency}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle main menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="bg-white p-2 inline-flex items-center justify-center text-gray-800 hover:text-rose-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        id="mobile-menu"
        className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-rose-600"
          >
            {t.navbar?.home || 'Home'}
          </Link>
          <Link
            to="/properties"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-rose-600"
          >
            {t.navbar?.properties || 'Properties'}
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-rose-600"
          >
            {t.navbar?.about || 'About Us'}
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-rose-600"
          >
            {t.navbar?.contact || 'Contact'}
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-around px-5">
            <button
              onClick={() => { toggleLanguage(); closeMenu(); }}
              className="p-1 rounded-full text-gray-800 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <span className="text-sm font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <button
              onClick={() => { toggleCurrency(); closeMenu(); }}
              className="p-1 rounded-full text-gray-800 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <span className="text-sm font-medium">{currency}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;