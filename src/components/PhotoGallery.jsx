import { useState } from 'react';

function PhotoGallery({ images = [], propertyName = 'Property' }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const mainImage = images[0];
  const secondaryImages = images.slice(1, 5);

  const openFullScreenAt = (index) => {
    setActiveImageIndex(index);
    setIsFullScreen(true);
  };

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
      {/* Collage layout: main image takes half width, four images fill the other half */}
      <div className="hidden md:grid grid-cols-2 gap-2 mb-2">
        {/* Left: Main image (takes half width) */}
        <button
          type="button"
          onClick={() => openFullScreenAt(0)}
          className="relative w-full overflow-hidden rounded-lg group"
          aria-label="Open main image"
        >
          <div className="aspect-w-16 aspect-h-12">
            <img
              src={mainImage}
              alt={`${propertyName} - Image 1`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>

        {/* Right: 2 x 2 grid for up to 4 images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {secondaryImages.map((img, idx) => {
            const realIndex = idx + 1;
            return (
              <button
                type="button"
                key={realIndex}
                onClick={() => openFullScreenAt(realIndex)}
                className="relative overflow-hidden rounded-lg group"
                aria-label={`Open image ${realIndex + 1}`}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={img}
                    alt={`${propertyName} - Image ${realIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </button>
            );
          })}
          {/* If there are less than 4 secondary images, fill remaining cells with empty blocks to keep grid shape */}
          {Array.from({ length: Math.max(0, 4 - secondaryImages.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="rounded-lg bg-gray-100" />
          ))}
        </div>
      </div>

      {/* Mobile: show collage stacked (main image first, then 2x2 grid) */}
      <div className="md:hidden space-y-2">
        <button
          type="button"
          onClick={() => openFullScreenAt(0)}
          className="relative w-full overflow-hidden rounded-lg group"
          aria-label="Open main image"
        >
          <div className="aspect-w-16 aspect-h-12">
            <img
              src={mainImage}
              alt={`${propertyName} - Image 1`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-2">
          {secondaryImages.slice(0, 4).map((img, idx) => {
            const realIndex = idx + 1;
            return (
              <button
                type="button"
                key={`m-${realIndex}`}
                onClick={() => openFullScreenAt(realIndex)}
                className="relative overflow-hidden rounded-lg group"
                aria-label={`Open image ${realIndex + 1}`}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={img}
                    alt={`${propertyName} - Image ${realIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expand to fullscreen button (top-right over the collage area on desktop) */}
      <button
        type="button"
        onClick={() => openFullScreenAt(0)}
        className="hidden md:flex absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-md text-sm items-center gap-1 transition"
        aria-label="View all photos"
        title="View all photos"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
        Ver todas
      </button>

      {/* Fullscreen overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Current image */}
            <img
              src={images[activeImageIndex]}
              alt={`${propertyName} - Image ${activeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-4 bg-white/10 text-white text-sm px-2 py-1 rounded-md">
              {activeImageIndex + 1} / {images.length}
            </div>

            {/* Close fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;