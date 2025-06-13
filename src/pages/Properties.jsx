import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import properties from '../data/properties';

function Properties() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState(500);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Get unique locations and price range on component mount
  useEffect(() => {
    if (properties.length > 0) {
      const prices = properties.map(property => property.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setPriceRange(Math.max(...prices));
      
      // Initialize with all properties
      setFilteredProperties(properties);
    }
  }, []);

  // Filter properties based on selected location and price range
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    // Filter by price
    filtered = filtered.filter(property => property.price <= priceRange);
    
    setFilteredProperties(filtered);
  }, [selectedLocation, priceRange]);

  // Get unique locations for the filter
  const locations = ['all', ...new Set(properties.map(property => {
    // Extract city name from location
    const locationParts = property.location.split(',');
    return locationParts[0].trim();
  }))];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Properties</h1>
      <p className="text-gray-600 text-lg mb-10">Discover our comfortable and stylish stays across Colombia</p>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location filter */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Price range filter */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Max Price: ${priceRange}
              </label>
            </div>
            <input
              type="range"
              id="price"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Properties grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No properties match your current filters. Try adjusting your selection.</p>
        </div>
      )}
    </div>
  );
}

export default Properties;