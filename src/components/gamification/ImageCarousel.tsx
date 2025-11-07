import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

export interface CarouselImage {
  id: string;
  url: string;
  title?: string;
  caption?: string;
  description?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number; // milliseconds
  showThumbnails?: boolean;
  allowZoom?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = false,
  interval = 5000,
  showThumbnails = true,
  allowZoom = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
    setIsZoomed(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  React.useEffect(() => {
    if (autoPlay && !isFullscreen) {
      const timer = setInterval(() => {
        paginate(1);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, currentIndex, isFullscreen, interval]);

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'bg-gray-100 rounded-lg overflow-hidden'}`}>
        {/* Image Container */}
        <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-video'} overflow-hidden`}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src={currentImage.url}
                alt={currentImage.title || `Slide ${currentIndex + 1}`}
                className={`${isZoomed ? 'scale-150' : 'scale-100'} ${isFullscreen ? 'max-h-screen' : 'w-full h-full'} object-contain cursor-pointer transition-transform duration-300`}
                onClick={() => allowZoom && setIsZoomed(!isZoomed)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
          {/* Zoom Toggle */}
          {allowZoom && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsZoomed(!isZoomed)}
              className="w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? (
                <ZoomOut className="w-5 h-5 text-gray-800" />
              ) : (
                <ZoomIn className="w-5 h-5 text-gray-800" />
              )}
            </motion.button>
          )}

          {/* Fullscreen Toggle */}
          {isFullscreen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(false)}
              className="w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Exit fullscreen"
            >
              <X className="w-5 h-5 text-gray-800" />
            </motion.button>
          )}
        </div>

        {/* Image Info Overlay */}
        {(currentImage.title || currentImage.caption) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 ${isFullscreen ? 'text-white' : 'text-white'}`}
          >
            {currentImage.title && (
              <h3 className="text-lg font-bold mb-1">{currentImage.title}</h3>
            )}
            {currentImage.caption && (
              <p className="text-sm opacity-90">{currentImage.caption}</p>
            )}
          </motion.div>
        )}

        {/* Progress Indicators */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && !isFullscreen && images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.title || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20" />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="mt-2 text-center text-sm text-gray-600">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
