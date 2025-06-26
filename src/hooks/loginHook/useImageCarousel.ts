import { useState, useEffect } from 'react';

interface UseImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

interface UseImageCarouselReturn {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
}

export const useImageCarousel = ({ 
  images, 
  autoPlayInterval = 4000 
}: UseImageCarouselProps): UseImageCarouselReturn => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

  useEffect(() => {
    if (!isAutoPlayActive || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isAutoPlayActive]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const pauseAutoPlay = () => {
    setIsAutoPlayActive(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlayActive(true);
  };

  return {
    currentImageIndex,
    setCurrentImageIndex,
    nextImage,
    prevImage,
    pauseAutoPlay,
    resumeAutoPlay
  };
};