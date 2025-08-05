import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';

// Fix Leaflet icon issue by importing images directly
import markerIcon from '../assets/ping.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function PropertyMap({ property }) {
  const { language } = useSettings();
  const t = translations[language] || translations.en;
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Set default icon for all markers
    //delete L.Icon.Default.prototype._getIconUrl;
    //const customIcon = new L.Icon({
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      //shadowUrl: markerShadow,
      //iconSize: [25, 41],
      //iconAnchor: [12, 41]
      iconSize: [32, 32], // tamaño en píxeles (ajústalo a tu imagen)
      iconAnchor: [16, 32], // punto del ícono que se ancla al mapa (centro abajo)
      popupAnchor: [0, -32], // posición del popup respecto al ícono
    });

    




    // Default position if coordinates are not provided
    const position = property.coordinates 
      ? [property.coordinates.lat, property.coordinates.lng] 
      : [4.7110, -74.0721]; // Default to Bogotá, Colombia

    // Initialize map if it doesn't exist
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(position, 15);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Add marker with popup
      L.marker(position)
        .addTo(mapInstanceRef.current)
        .bindPopup(`<div>
          <h3 style="font-weight: bold;">${property.name}</h3>
          <p>${property.location}</p>
        </div>`);
    }

    // Clean up on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [property]);

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">{t.map?.locationTitle || "Location"}</h3>
      <div className="overflow-hidden rounded-lg shadow-md">
        <div 
          ref={mapRef} 
          className="h-[400px] w-full z-10"
          style={{ zIndex: 1 }}
        ></div>
      </div>
      <p className="mt-3 text-gray-600">{property.location}</p>
    </div>
  );
}

export default PropertyMap;