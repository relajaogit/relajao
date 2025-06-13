import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const { id, name, location, images, shortDescription, price } = property;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <Link to={`/property/${id}`}>
        <div className="h-64 relative">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
            <p className="text-white font-medium">{location}</p>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{shortDescription}</p>
          <p className="text-lg font-bold text-gray-800">${price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/property/${id}`} className="block w-full text-center py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;