import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import { convertFromCOP, formatPrice } from '../utils/currencyUtils';

function PropertyCard({ property }) {
  const { language, currency } = useSettings();
  const t = translations[language] || translations.en;

  const {
    id,
    name,
    city,
    location,
    images = [],
    coverImage,
    description,
    pricePerNightCOP,
    title,
    amenities = [],
    featuredAmenities = [],
    maxGuests,
    bedrooms,
    bathrooms,
    beds, // optional in data; we'll gracefully fallback
    propertyType, // optional: e.g., 'Aparta Estudio', 'Apartamento', 'Casa', 'Habitación' or 'studio','apartment','house','room'
    type, // alternative key some data may use
  } = property;

  const displayLocation = typeof location === 'string' ? location : (city || '');
  const priceCOP = Number(pricePerNightCOP ?? property?.price ?? 0);
  const displayPrice = formatPrice(convertFromCOP(priceCOP, currency), currency, language);
  const titleText = name || title?.[language] || title?.en || 'Property';
  const cover = coverImage || images[0] || '';

  const mapAmenity = (key) => {
    const map = t.amenitiesMap || {};
    return map[key] || key;
  };

  // Only show featured amenities as requested. If none provided, show none (strict).
  const amenitiesToShow = Array.isArray(featuredAmenities) ? featuredAmenities : [];

  const labelGuests = t.propertyDetail?.guests || 'guests';
  const labelBeds = t.propertyDetail?.beds || 'beds';
  const labelBedrooms = t.propertyDetail?.bedrooms || 'bedrooms';
  const labelbathrooms = t.propertyDetail?.bathrooms || 'bathrooms';

  const displayedBeds = typeof beds === 'number' ? beds : (typeof bedrooms === 'number' ? bedrooms : null);
   const displayedBaths = typeof bathrooms === 'number' ? bathrooms : (typeof bathrooms === 'number' ? bathrooms : null);
  // Property type mapping and inference
  const typeInput = (propertyType || type || '').toString().trim().toLowerCase();
  const typeMap = {
    'studio': { es: 'Aparta Estudio', en: 'Studio' },
    'aparta estudio': { es: 'Aparta Estudio', en: 'Studio' },
    'aparta-estudio': { es: 'Aparta Estudio', en: 'Studio' },
    'apartaestudio': { es: 'Aparta Estudio', en: 'Studio' },
    'apartment': { es: 'Apartamento', en: 'Apartment' },
    'apartamento': { es: 'Apartamento', en: 'Apartment' },
    'house': { es: 'Casa', en: 'House' },
    'casa': { es: 'Casa', en: 'House' },
    'room': { es: 'Habitación', en: 'Room' },
    'habitacion': { es: 'Habitación', en: 'Room' },
    'habitación': { es: 'Habitación', en: 'Room' },
  };
  let typeDisplay = '';
  if (typeInput && typeMap[typeInput]) {
    typeDisplay = typeMap[typeInput][language] || typeMap[typeInput].en;
  } else {
    // Infer: 0 bedrooms => Studio, >=1 => Apartment
    if (typeof bedrooms === 'number') {
      if (bedrooms === 0) {
        typeDisplay = language === 'es' ? 'Aparta Estudio' : 'Studio';
      } else {
        typeDisplay = language === 'es' ? 'Apartamento' : 'Apartment';
      }
    } else {
      // Fallback generic
      typeDisplay = language === 'es' ? 'Apartamento' : 'Apartment';
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <Link to={`/property/${id}`}>
        <div className="h-64 relative">
          {cover ? (
            <img
              src={cover}
              alt={titleText}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
            <p className="text-white font-medium">{displayLocation}</p>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{titleText}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {(typeof description === 'string' && description) ||
              description?.[language] ||
              description?.en ||
              ''}
          </p>

          {/* Key info row: guests, beds (or bedrooms), type */}
          <div className="mt-2 mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700">
               {/* Guest */}
            {typeof maxGuests === 'number' && (
              <div className="flex items-center" aria-label={`${maxGuests} ${labelGuests}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{maxGuests} {labelGuests}</span>
              </div>
            )}
             {/* beds*/}
            {displayedBeds != null ? (
              <div className="flex items-center" aria-label={`${displayedBeds} ${labelBeds}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 10V7a3 3 0 013-3h5a3 3 0 013 3v3h3a2 2 0 012 2v6h-2v-2H4v2H2v-6a2 2 0 012-2h0zM7 7a1 1 0 00-1 1v2h8V8a1 1 0 00-1-1H7z" />
                </svg>
                <span>{displayedBeds} {labelBeds}</span>
              </div>
            ) : (typeof bedrooms === 'number' && (
              <div className="flex items-center" aria-label={`${bedrooms} ${labelBedrooms}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{bedrooms} {labelBedrooms}</span>
              </div>
            ))}
            {/* baths*/}
            {displayedBaths != null ? (
              <div className="flex items-center" aria-label={`${displayedBaths} ${labelbathrooms}`}>
               <svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 64 64" 
     fill="none" 
     stroke="currentColor" 
     strokeWidth="3" 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     className="h-6 w-6 text-gray-500">
  
  <rect x="10" y="8" width="20" height="18" rx="2" />
  
  <path d="M20 26h24c0 10-6 18-14 18s-14-8-14-18z" />
 
  <path d="M26 44v6c0 2 2 4 6 4s6-2 6-4v-6" />
</svg>

                <span>{displayedBaths} {labelbathrooms}</span>
              </div>
            ) : (typeof bathrooms === 'number' && (
              <div className="flex items-center" aria-label={`${bathrooms} ${labelbathrooms}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{bathrooms} {labelbathrooms}</span>
              </div>
            ))}
            {typeDisplay && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5H7a2 2 0 01-2-2V7l4-4h6l4 4v12a2 2 0 01-2 2z" />
                </svg>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-800">{typeDisplay}</span>
              </div>
            )}
          </div>

          <p className="text-lg font-bold text-gray-800">
            {displayPrice}{' '}
            <span className="text-sm font-normal text-gray-500">
              {t.properties?.perNight || 'per night'}
            </span>
          </p>

          {/* Featured amenity badges only */}
          {amenitiesToShow.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {amenitiesToShow.map((amenity, idx) => (
                <span
                  key={`${amenity}-${idx}`}
                  className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {mapAmenity(amenity)}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link
          to={`/property/${id}`}
          className="block w-full text-center py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
        >
          {t.properties?.viewDetails || 'View Details'}
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;