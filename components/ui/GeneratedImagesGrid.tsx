import React from 'react';
import Image from 'next/image';
import { Download, Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import GradientHeading from '@/components/ui/GradientHeading';

interface GeneratedImagesGridProps {
  images: string[];
  aspectRatio: string;
}

const GeneratedImagesGrid: React.FC<GeneratedImagesGridProps> = ({ images, aspectRatio }) => {
  const getGridColumns = () => {
    switch (images.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3:
      case 4: return 'grid-cols-2';
      default: return 'grid-cols-2';
    }
  };

  const getGridRows = () => {
    switch (images.length) {
      case 1:
      case 2: return 'grid-rows-1';
      case 3:
      case 4: return 'grid-rows-2';
      default: return 'grid-rows-2';
    }
  };

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case '1:1': return 'aspect-square';
      case '16:9': return 'aspect-[16/9]';
      case '4:3': return 'aspect-[4/3]';
      default: return 'aspect-square';
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <GradientHeading className="mb-2">Generated Images</GradientHeading>
        <p className="text-gray-400 text-sm mb-6 text-center">View your AI-generated images in a grid layout</p>
        <div className={`grid ${getGridColumns()} ${getGridRows()} gap-4`}>
          {images.map((image, index) => (
            <div key={index} className={`relative ${getAspectRatio()} w-full overflow-hidden rounded-lg group`}>
              <Image
                src={image}
                alt={`Generated image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
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
      </CardContent>
    </Card>
  );
};

export default GeneratedImagesGrid;