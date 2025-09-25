/**
 * Google Maps JS API Loader (singleton)
 * Loads Google Maps using @googlemaps/js-api-loader and returns the google namespace.
 * Throws an Error('NO_GOOGLE_MAPS_API_KEY') if the env var is missing.
 */
import { Loader } from '@googlemaps/js-api-loader';

let loadPromise = null;

export async function getGoogle() {
  if (loadPromise) return loadPromise;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('NO_GOOGLE_MAPS_API_KEY');
  }

  const loader = new Loader({
    apiKey,
    version: 'weekly',
  });

  // loader.load() resolves to the google namespace
  loadPromise = loader.load();
  return loadPromise;
}

export default getGoogle;