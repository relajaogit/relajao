import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import { convertFromCOP, formatPrice } from '../utils/currencyUtils';
import { getGoogle } from '../lib/googleMapsLoader';

function toNumberOrNull(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function isValidLatLng(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
}
function getCoordsFromProperty(property) {
  if (!property) return null;
  const locLat = toNumberOrNull(property?.location?.lat);
  const locLng = toNumberOrNull(property?.location?.lng);
  if (isValidLatLng(locLat, locLng)) return { lat: locLat, lng: locLng };

  const cLat = toNumberOrNull(property?.coordinates?.lat);
  const cLng = toNumberOrNull(property?.coordinates?.lng);
  if (isValidLatLng(cLat, cLng)) return { lat: cLat, lng: cLng };

  return null;
}

function PropertyMap({ property }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [errorCode, setErrorCode] = useState(null);

  const { language, currency } = useSettings();
  const t = translations[language] || translations.en;

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setErrorCode(null);

      const coords = getCoordsFromProperty(property);
      if (!coords) {
        console.warn('[PropertyMap] Coordenadas inválidas o ausentes para propiedad:', property?.id || property?.name || property);
        setErrorCode('INVALID_COORDS');
        return;
      }

      try {
        const google = await getGoogle();
        if (!isMounted || !mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 15,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapInstanceRef.current = map;

        if (!infoWindowRef.current) {
          infoWindowRef.current = new google.maps.InfoWindow();
        }

        if (markerRef.current) {
          markerRef.current.setMap(null);
          markerRef.current = null;
        }

        const priceValue = property.pricePerNightCOP ?? property.price ?? 0;
        const priceStr = formatPrice(convertFromCOP(priceValue, currency), currency, language);

        const marker = new google.maps.Marker({
          position: coords,
          map,
          title: property.name || property.title?.[language] || property.title?.en || 'Property',
        });
        markerRef.current = marker;

        const content = `
          <div style="min-width:200px">
            <h3 style="margin:0 0 4px 0;font-weight:600;">${property.name || property.title?.[language] || property.title?.en || 'Property'}</h3>
            <div style="color:#475569;margin-bottom:6px;">${property.city || ''}</div>
            <div style="font-weight:600;margin-bottom:8px;">${priceStr} <span style="font-weight:400;color:#64748b;">${t.propertyDetail?.perNight || 'per night'}</span></div>
            <a href="/property/${property.id}" style="color:#e11d48;text-decoration:underline;">${t.properties?.viewDetails || 'View Details'}</a>
          </div>
        `;

        marker.addListener('click', () => {
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open({ anchor: marker, map });
        });
      } catch (err) {
        // Captura de errores típicos de Google Maps: revisar consola para mensajes exactos
        // Ejemplos: MissingKeyMapError, RefererNotAllowedMapError, ApiNotActivatedMapError, BillingNotEnabledMapError
        if (err && err.message === 'NO_GOOGLE_MAPS_API_KEY') {
          setErrorCode('NO_GOOGLE_MAPS_API_KEY');
        } else {
          console.error('[PropertyMap] Error al cargar Google Maps:', err);
          setErrorCode('GOOGLE_MAPS_ERROR');
        }
      }
    }

    init();

    return () => {
      isMounted = false;
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      mapInstanceRef.current = null;
    };
  }, [property, language, currency]);

  if (errorCode === 'NO_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="my-6">
        <h3 className="text-xl font-semibold mb-4">{t.map?.locationTitle || 'Location'}</h3>
        <div className="p-4 rounded-md border border-rose-300 bg-rose-50 text-rose-700">
          No se pudo cargar Google Maps. Falta la clave API. Configura VITE_GOOGLE_MAPS_API_KEY en tu archivo .env.local y habilita la facturación y el referer (localhost:5173).
        </div>
        <p className="mt-3 text-gray-600">{property?.city || ''}</p>
      </div>
    );
  }

  if (errorCode === 'INVALID_COORDS') {
    return (
      <div className="my-6">
        <h3 className="text-xl font-semibold mb-4">{t.map?.locationTitle || 'Location'}</h3>
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 text-amber-700">
          No se pudo mostrar el mapa porque las coordenadas de esta propiedad no son válidas.
        </div>
        <p className="mt-3 text-gray-600">{property?.city || ''}</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">{t.map?.locationTitle || 'Location'}</h3>
      <div className="overflow-hidden rounded-lg shadow-md">
        <div ref={mapRef} className="h-64 w-full" />
      </div>
      <p className="mt-3 text-gray-600">{property?.city || ''}</p>
    </div>
  );
}

export default PropertyMap;