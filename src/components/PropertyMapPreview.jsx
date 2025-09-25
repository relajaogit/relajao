import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
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
function pickCoords(p) {
  const clat = toNumberOrNull(p?.coordinates?.lat);
  const clng = toNumberOrNull(p?.coordinates?.lng);
  if (isValidLatLng(clat, clng)) return { lat: clat, lng: clng };

  const llat = toNumberOrNull(p?.location?.lat);
  const llng = toNumberOrNull(p?.location?.lng);
  if (isValidLatLng(llat, llng)) return { lat: llat, lng: llng };

  return null;
}

function PropertyMapPreview({ properties }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const clustererRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [errorCode, setErrorCode] = useState(null);

  const { language, currency } = useSettings();
  const t = translations[language] || translations.en;

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setErrorCode(null);

      const validItems = [];
      const invalidItems = [];

      (properties || []).forEach((p) => {
        const c = pickCoords(p);
        if (c) validItems.push({ p, coords: c });
        else invalidItems.push(p);
      });

      if (invalidItems.length) {
        console.warn('[PropertyMapPreview] Items con coordenadas inválidas u ausentes omitidos:', invalidItems.map(x => x?.id || x?.slug || x?.name || x));
      }

      if (!validItems.length) {
        setErrorCode('NO_VALID_COORDS');
        return;
      }

      try {
        const google = await getGoogle();
        if (!isMounted || !mapRef.current) return;

        const center = { lat: 4.5709, lng: -74.2973 }; // Colombia
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 11,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapInstanceRef.current = map;

        if (clustererRef.current) {
          clustererRef.current.clearMarkers();
          clustererRef.current = null;
        }
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        if (!infoWindowRef.current) {
          infoWindowRef.current = new google.maps.InfoWindow();
        }

        const markers = validItems.map(({ p, coords }) => {
          const marker = new google.maps.Marker({
            position: { lat: coords.lat, lng: coords.lng },
            title: p.name || p.title?.[language] || p.title?.en || 'Property',
          });

          const priceValue = p.pricePerNightCOP ?? p.price ?? 0;
          const priceStr = formatPrice(convertFromCOP(priceValue, currency), currency, language);
          const content = `
            <div style="min-width:200px">
              <h3 style="margin:0 0 4px 0;font-weight:600;">${p.name || p.title?.[language] || p.title?.en || 'Property'}</h3>
              <div style="color:#475569;margin-bottom:6px;">${p.city || ''}</div>
              <div style="font-weight:600;margin-bottom:8px;">${priceStr} <span style="font-weight:400;color:#64748b;">${t.propertyDetail?.perNight || 'per night'}</span></div>
              <a href="/property/${p.id}" style="color:#e11d48;text-decoration:underline;">${t.properties?.viewDetails || 'View Details'}</a>
            </div>
          `;

          marker.addListener('click', () => {
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open({ anchor: marker, map });
          });

          return marker;
        });

        markersRef.current = markers;

        clustererRef.current = new MarkerClusterer({ map, markers });

        // Ajuste de vista a todos los marcadores
        try {
          const bounds = new google.maps.LatLngBounds();
          validItems.forEach(({ coords }) => bounds.extend(coords));
          map.fitBounds(bounds);
        } catch (_) {
          // ignorar si falla fitBounds
        }
      } catch (err) {
        // Captura de errores típicos de Google Maps: revisar consola para mensajes exactos
        // Ejemplos: MissingKeyMapError, RefererNotAllowedMapError, ApiNotActivatedMapError, BillingNotEnabledMapError
        if (err && err.message === 'NO_GOOGLE_MAPS_API_KEY') {
          setErrorCode('NO_GOOGLE_MAPS_API_KEY');
        } else {
          console.error('[PropertyMapPreview] Error al cargar Google Maps:', err);
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
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
        clustererRef.current = null;
      }
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, [properties, language, currency]);

  if (errorCode === 'NO_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="my-6">
        <div className="p-4 rounded-md border border-rose-300 bg-rose-50 text-rose-700">
          No se pudo cargar Google Maps. Falta la clave API. Configura VITE_GOOGLE_MAPS_API_KEY en tu archivo .env.local y habilita la facturación y el referer (localhost:5173).
        </div>
      </div>
    );
  }

  if (errorCode === 'NO_VALID_COORDS') {
    return (
      <div className="my-6">
        <div className="p-4 rounded-md border border-amber-300 bg-amber-50 text-amber-700">
          No hay propiedades con coordenadas válidas para mostrar en el mapa.
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg shadow-md">
      <div ref={mapRef} className="h-64 w-full" />
    </div>
  );
}

export default PropertyMapPreview;