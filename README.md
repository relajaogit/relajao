# Relajao - Comfortable & Stylish Stays in Colombia

This project is a dynamic online platform for renting furnished apartments in Colombia, providing a user-friendly experience similar to Airbnb. It allows users to discover and book stylish vacation properties seamlessly through WhatsApp, connecting travelers with authentic Colombian experiences while enabling property owners to list their properties easily.

## Technology Stack

- React + Vite
- Tailwind CSS
- React Router
- Google Maps JavaScript API (via @googlemaps/js-api-loader)
- MarkerClusterer (@googlemaps/markerclusterer)
- Python (for data normalization)

## Available Scripts

- `pnpm i` - Install dependencies
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Lint source files

## Normalize Property Data

Run the normalization script to process uploaded property data:

```bash
python3 /workspace/normalize_props.py
```

## Configure Google Maps

To enable Google Maps across the Properties and Property Detail pages, follow these steps:

1. Create a `.env.local` file at the project root (`/workspace/react_template/.env.local`) and set your API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```
   For this environment, the provided key has been set:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyA9zbSUeZIMv6N78_wBZCy1dHbucYoKvQ4
   ```

2. Ensure the following dependencies are installed (already included in package.json):
   - `@googlemaps/js-api-loader`
   - `@googlemaps/markerclusterer`

3. Do NOT add script tags to `index.html` for Google Maps. The API is loaded dynamically in code via `@googlemaps/js-api-loader`.

4. Enable the following in your Google Cloud Console for the project associated with your API key:
   - Maps JavaScript API
   - Billing
   - Optional but recommended: Restrict the key by HTTP referrer (add your local dev URL `http://localhost:5173/*` and your production domain) and by API.

5. Common errors and how to fix:
   - `InvalidKeyMapError`: The API key is malformed. Re-copy it exactly.
   - `RefererNotAllowedMapError`: Add your current origin (e.g., `http://localhost:5173/*`) to the HTTP referrer restrictions in the key settings or remove referrer restrictions while testing.
   - `ApiNotActivatedMapError`: Enable “Maps JavaScript API” for your project in Google Cloud Console.
   - `BillingNotEnabledMapError`: Enable billing on the Google Cloud project.

Components:
- `src/components/PropertyMap.jsx`: shows a single property marker (detail page).
- `src/components/PropertyMapPreview.jsx`: shows clustered markers for multiple properties (listing page).
- Both load Google Maps using a singleton loader in `src/lib/googleMapsLoader.js`, which reads the key from `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`.

Data:
- Coordinates are read from `property.location.lat/lng` or `property.coordinates.lat/lng` in `src/data/properties.js`.

## Development

1. Install:
   ```bash
   pnpm i
   ```
2. Lint:
   ```bash
   pnpm run lint
   ```
3. Run:
   ```bash
   pnpm run dev
   ```
4. Build:
   ```bash
   pnpm run build
   ```

Open the dev server URL (usually http://localhost:5173) to verify:
- On `/properties`, the map renders with clustered markers.
- On a property detail page, the map centers on the property and shows a marker.
- No console errors related to Google Maps.

## Asignar badges por propiedad

Controla qué “badges” (chips con icono + texto) se muestran para cada propiedad editando el archivo `src/data/properties.js`. Añade un campo opcional `badges: string[]` con hasta 5 claves. Si defines menos de 3, el sistema completa automáticamente con valores por defecto.

- Ejemplo:
  ```js
  // En una propiedad dentro de src/data/properties.js
  badges: ["guest_favorite","fast_stable_wifi","strategic_location","quiet_relaxed"]
  ```

- Claves disponibles (ES | EN):
  - guest_favorite → ⭐ Muy elegido por los huéspedes | Guest favorite
  - park_view → 🌿 Vista al parque | Park view
  - elevator_access → 🏢 Con ascensor | Elevator access
  - double_bed_sofa_bed → 🛏️ Cama doble y sofá cama | Double bed & sofa bed
  - nearby_parking → 🚗 Parqueadero cercano | Nearby parking
  - fast_stable_wifi → 📶 WiFi rápido y estable | Fast & stable WiFi
  - modern_bath_hot_water → 🛁 Baño moderno con agua caliente | Modern bathroom with hot water
  - spotless_spaces → 🧼 Espacios impecables | Spotless spaces
  - perfect_remote_work → ☕ Perfecto para teletrabajo | Perfect for remote work
  - quiet_relaxed → 🏡 Ambiente tranquilo y relajado | Quiet & relaxed atmosphere
  - reception_7_5 → 🛎️ Recepción 7 am – 5 pm | Reception 7 am – 5 pm
  - strategic_location → 📍 Ubicación estratégica | Strategic location
  - cozy_living_sofa → 🛋️ Sala cómoda con sofá | Cozy living room with sofa
  - natural_light_all_day → 🌅 Luz natural todo el día | Natural light all day
  - secure_building_24_7 → 🔐 Edificio seguro 24 h | Secure building 24/7

Notas:
- En la vista de detalle, los badges se muestran entre 3 y 5 chips, son responsivos (móvil: 2 columnas; escritorio: en una fila con wrap) y el texto cambia según el idioma (ES/EN).
- Para cambiar el idioma usa el selector del sitio; no es necesario modificar componentes.