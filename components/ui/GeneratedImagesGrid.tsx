import React from 'react';
import Image from 'next/image';
import { Download, Heart } from 'lucide-react';

interface GeneratedImagesGridProps {
  images: string[];
  aspectRatio: string;
}

const GeneratedImagesGrid: React.FC<GeneratedImagesGridProps> = ({ images, aspectRatio }) => {
  console.log('Rendering GeneratedImagesGrid', { images, aspectRatio });

  const getGridColumns = () => {
    switch (images.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-2 md:grid-cols-4';
      default: return 'grid-cols-2 md:grid-cols-4';
    }
  };

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case '1:1': return 'aspect-square';
      case '16:9': return 'aspect-video';
      case '4:3': return 'aspect-[4/3]';
      default: return 'aspect-square';
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-4 mt-8`}>
      {images.map((image, index) => (
        <div key={index} className={`relative ${getAspectRatio()} w-full h-64 md:h-80 overflow-hidden rounded-lg group`}>
          <Image
            src={image}
            alt={`Generated image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="p-2 bg-white rounded-full mr-2" onClick={() => window.open(image, '_blank')}>
              <Download className="w-5 h-5 text-gray-800" />
            </button>
            <button className="p-2 bg-white rounded-full">
              <Heart className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneratedImagesGrid;