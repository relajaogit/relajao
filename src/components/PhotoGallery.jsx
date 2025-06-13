import { useState } from 'react';

function PhotoGallery({ images, propertyName }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="mb-10 relative">
      {/* Main image */}
      <div 
        className={`relative overflow-hidden rounded-lg ${
          isFullScreen 
            ? "fixed inset-0 z-50 bg-black flex items-center justify-center p-4" 
            : "aspect-w-5 aspect-h-9 mb-4"
        }`}
      >
        <img 
          src={images[activeImageIndex]} 
          alt={`${propertyName} - Image ${activeImageIndex + 1}`} 
          className={`${
            isFullScreen 
              ? "max-h-full max-w-full object-contain" 
              : "w-full h-full object-cover"
          }`}
        />

        {/* Navigation arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fullscreen toggle */}
        <button 
          onClick={toggleFullScreen}
          className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullScreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>

        {/* Image counter */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-md">
          {activeImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail gallery - only show in normal mode */}
      {!isFullScreen && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button 
              key={index} 
              onClick={() => setActiveImageIndex(index)}
              className={`aspect-w-16 aspect-h-9 rounded-md overflow-hidden ${
                index === activeImageIndex ? 'ring-2 ring-rose-600' : 'opacity-70'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${propertyName} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen overlay close button */}
      {isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="fixed top-4 right-4 z-50 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="Close fullscreen view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default PhotoGallery;