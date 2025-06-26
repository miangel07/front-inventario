import { motion, AnimatePresence } from 'framer-motion';
import { useImageCarousel } from '@/hooks/loginHook/useImageCarousel';

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
  showIndicators?: boolean;
  className?: string;
  children?: React.ReactNode; // Para contenido superpuesto
}

const ImageCarousel = ({ 
  images, 
  autoPlayInterval = 4000,
  showIndicators = true,
  className = "",
  children 
}: ImageCarouselProps) => {
  const {
    currentImageIndex,
    setCurrentImageIndex,
    pauseAutoPlay,
    resumeAutoPlay
  } = useImageCarousel({ images, autoPlayInterval });

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Carousel de imágenes */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Overlay para contenido superpuesto */}
      {children && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          {children}
        </div>
      )}

      {/* Indicadores */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;