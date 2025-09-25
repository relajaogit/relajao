import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import properties from '../data/properties';
import PropertyMapPreview from '../components/PropertyMapPreview';
import { convertFromCOP } from '../utils/currencyUtils';

function Properties() {
  const { language, currency } = useSettings();
  const t = translations[language];
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    location: '',
    priceMin: 0,
    priceMax: 100000000, // defaults in selected currency; large max to include all by default
    amenities: []
  });
  // Default Map View to false so List view is the default as requested
  const [showMap, setShowMap] = useState(false);

  // NEW: mobile filter modal visibility
  const [showFilters, setShowFilters] = useState(false);

  // Get unique cities for filter dropdown
  const cities = [...new Set(properties.map(p => (p.city || '').trim()).filter(Boolean))];

  // Get all unique amenities for filter checkboxes
  const allAmenities = [...new Set(properties.flatMap(p => p.amenities || []))];

  useEffect(() => {
    document.title = `${t.seo.propertiesTitle}`;
    return () => {
      document.title = 'Relajao - Comfortable & Stylish Stays in Colombia';
    };
  }, [language, t.seo.propertiesTitle]);

  useEffect(() => {
    // Filter properties based on selected filters
    const filtered = properties.filter(property => {
      // Filter by city (location filter)
      const cityStr = (property.city || '').toLowerCase();
      const locationMatch = !filters.location || cityStr.includes(filters.location.toLowerCase());

      // Filter by price using selected currency (convert COP to selected currency)
      const priceCOP = Number(property.pricePerNightCOP ?? property.price ?? 0);
      const priceInSelected = convertFromCOP(priceCOP, currency);
      const min = Number(filters.priceMin) || 0;
      const max = Number(filters.priceMax) || Number.MAX_SAFE_INTEGER;
      const priceMatch = priceInSelected >= min && priceInSelected <= max;

      // Filter by amenities
      const propAmenities = property.amenities || [];
      const amenitiesMatch = filters.amenities.length === 0 ||
        filters.amenities.every(a => propAmenities.includes(a));

      return locationMatch && priceMatch && amenitiesMatch;
    });

    setFilteredProperties(filtered);
  }, [filters, currency]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => {
      const currentAmenities = [...prev.amenities];
      if (currentAmenities.includes(amenity)) {
        return {
          ...prev,
          amenities: currentAmenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, amenity]
        };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      priceMin: 0,
      priceMax: 100000000,
      amenities: []
    });
  };

  // Amenity label translator
  const mapAmenity = (key) => {
    const map = t.amenitiesMap || {};
    return map[key] || key;
  };

  const FilterPanel = ({ onAfterAction }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t.properties.filters || 'Filter Properties'}</h2>

      {/* Location (City) filter */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">{t.properties.location || 'Location'}</label>
        <select
          name="location"
          value={filters.location}
          onChange={(e) => { handleFilterChange(e); }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">{t.properties.allLocations || 'All Locations'}</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">{t.properties.priceRange || 'Price Range'}</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t.properties.min || 'Min'}</label>
            <input
              type="number"
              name="priceMin"
              min="0"
              value={filters.priceMin}
              onChange={(e) => { handleFilterChange(e); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t.properties.max || 'Max'}</label>
            <input
              type="number"
              name="priceMax"
              min="0"
              value={filters.priceMax}
              onChange={(e) => { handleFilterChange(e); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">({currency})</p>
      </div>

      {/* Amenities filter */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">{t.properties.amenities || 'Amenities'}</label>
        <div className="max-h-48 overflow-y-auto">
          {allAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                id={`amenity-${index}`}
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => { handleAmenityToggle(amenity); }}
                className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
              />
              <label htmlFor={`amenity-${index}`} className="ml-2 text-gray-700">{mapAmenity(amenity)}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset filters button */}
      <button
        onClick={() => { resetFilters(); if (onAfterAction) onAfterAction(); }}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
      >
        {t.properties.resetFilters || 'Reset Filters'}
      </button>
    </div>
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.properties.title}</h1>

      {/* View toggle and mobile filters trigger */}
      <div className="flex items-center justify-between mb-6">
        {/* Mobile filter trigger (Search icon) */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          aria-label={t.properties.filters || 'Filter Properties'}
          onClick={() => setShowFilters(true)}
        >
          {/* Magnifying glass icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span>{t.properties.filters || 'Filter Properties'}</span>
        </button>

        {/* View toggle buttons */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${!showMap ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setShowMap(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {t.properties.listView || 'List View'}
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${showMap ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setShowMap(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {t.properties.mapView || 'Map View'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar - hidden on mobile, shown on large screens */}
        <div className="lg:col-span-1 hidden lg:block">
          <FilterPanel />
        </div>

        {/* Properties list or map */}
        <div className="lg:col-span-3">
          {showMap ? (
            <PropertyMapPreview properties={filteredProperties} />
          ) : (
            <>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-yellow-700">{t.properties.noResults || 'No properties match your criteria'}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowFilters(false)}
        >
          {/* Modal card */}
          <div
            className="w-full sm:max-w-lg sm:rounded-lg sm:mx-4 bg-white shadow-xl rounded-t-2xl sm:rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <h2 className="text-lg font-semibold">{t.properties.filters || 'Filter Properties'}</h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                onClick={() => setShowFilters(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Body */}
            <div className="p-4">
              <FilterPanel onAfterAction={() => setShowFilters(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Properties;