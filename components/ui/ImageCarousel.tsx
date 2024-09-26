import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import GradientHeading from './GradientHeading';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <GradientHeading className="mb-2">Image Gallery</GradientHeading>
        <p className="text-gray-400 text-sm mb-6 text-center">Browse through your generated images in a carousel view</p>
        <div className="relative flex items-center justify-center">
          <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all">
            <ChevronLeft size={24} />
          </button>
          <div className="flex overflow-hidden">
            {[-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + images.length) % images.length;
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 ease-in-out ${
                    offset === 0 ? 'w-64 h-64 mx-4 z-20' : 'w-48 h-48 mx-2 opacity-60'
                  }`}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={`Generated image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCarousel;