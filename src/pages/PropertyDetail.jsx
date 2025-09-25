import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import properties from '../data/properties';
import BookingForm from '../components/BookingForm';
import PhotoGallery from '../components/PhotoGallery';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import { convertFromCOP, formatPrice } from '../utils/currencyUtils';
import PropertyMap from '../components/PropertyMap';
import { BADGES } from '../data/badges';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, currency } = useSettings();
  const t = translations[language] || translations.en;

  useEffect(() => {
    const found = properties.find(p => String(p.id) === String(id));
    if (found) {
      setProp(found);
      setLoading(false);
      document.title = `${found.name || found.title?.[language] || found.title?.en || 'Property'} – Relajao`;
    } else {
      navigate('/properties');
    }
    return () => {
      document.title = 'Relajao - Comfortable & Stylish Stays in Colombia';
    };
  }, [id, navigate, language]);

  if (loading || !prop) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  const displayLocation = typeof prop.location === 'string' ? prop.location : (prop.city || '');
  const priceCOP = Number(prop?.pricePerNightCOP ?? prop?.price ?? 0);
  const convertedPrice = convertFromCOP(priceCOP, currency);
  const formattedPrice = formatPrice(convertedPrice, currency);
  const titleText = prop.name || prop.title?.[language] || prop.title?.en || 'Property';
  const images = Array.isArray(prop.images) ? prop.images : [];

  const capacity = prop?.maxGuests ?? prop?.capacity ?? null;
  const bedrooms = prop?.bedrooms ?? null;
  const bathrooms = prop?.bathrooms ?? null;
  const amenities = Array.isArray(prop?.amenities) ? prop.amenities : [];
  const descriptionText =
    (typeof prop.description === 'string' && prop.description) ||
    prop.description?.[language] ||
    prop.description?.en ||
    '';

  const mapAmenity = (key) => {
    const map = t.amenitiesMap || {};
    return map[key] || key;
  };

  // Resolve badges keys per property with fallback & i18n
  const resolveBadgeKeys = () => {
    const max = 5;
    let keys = Array.isArray(prop.badges) ? prop.badges.slice(0, max) : [];
    const fallback = ['guest_favorite', 'fast_stable_wifi', 'strategic_location'];
    for (const fb of fallback) {
      if (keys.length >= 3) break;
      if (!keys.includes(fb)) keys.push(fb);
    }
    // Filter any unknown keys
    keys = keys.filter(k => BADGES[k]);
    // Ensure min 3, max 5
    if (keys.length < 3) {
      for (const fb of fallback) {
        if (keys.length >= 3) break;
        if (!keys.includes(fb)) keys.push(fb);
      }
    }
    return keys.slice(0, max);
  };

  const badgeKeys = resolveBadgeKeys();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/properties')}
        className="flex items-center text-rose-600 hover:text-rose-800 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {t.propertyDetail.backToProperties}
      </button>

      {/* Property name and location */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{titleText}</h1>
        <p className="text-gray-600 text-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {displayLocation}
        </p>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery images={images} propertyName={titleText} />

      {/* Property details and booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column: Details */}
        <div className="lg:col-span-2">
          {/* Basic info */}
          <div className="mb-8 flex flex-wrap gap-y-4">
            {capacity != null && (
              <div className="w-1/2 md:w-1/3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-base md:text-lg font-medium">{capacity} {t.propertyDetail.guests}</span>
              </div>
            )}
            {bedrooms != null && (
              <div className="w-1/2 md:w-1/3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{bedrooms} {t.propertyDetail.bedrooms}</span>
              </div>
            )}
            {bathrooms != null && (
              <div className="w-1/2 md:w-1/3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{bathrooms} {t.propertyDetail.bathrooms}</span>
              </div>
            )}
          </div>

          {/* Badges Section between basic info and description */}
          {badgeKeys.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">
                {language === 'es' ? 'Destacados' : 'Highlights'}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {badgeKeys.map((k, i) => {
                  const meta = BADGES[k];
                  if (!meta) return null;
                  const text = meta.label?.[language] || meta.label?.es || k;
                  return (
                    <div
                      key={`badge-${k}-${i}`}
                      className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                      title={text}
                    >
                      <span aria-hidden="true">{meta.icon}</span>
                      <span className="leading-tight">{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.propertyDetail.aboutThisPlace}</h2>
            <p className="text-gray-600 whitespace-pre-line">{descriptionText}</p>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t.propertyDetail.amenities}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{mapAmenity(amenity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.propertyDetail.location}</h2>
            <PropertyMap property={prop} />
          </div>
        </div>

        {/* Right column: Booking/Price card */}
        <div className="lg:col-span-1">
          <div className="p-6 border border-gray-200 rounded-lg shadow-lg sticky top-24">
            <div className="text-2xl font-bold mb-4">
              {formattedPrice} <span className="text-sm font-normal text-gray-500">{t.propertyDetail.perNight}</span>
            </div>

            <BookingForm propertyName={titleText} propertyPrice={convertedPrice} />

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>{t.bookingForm.directBook}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;