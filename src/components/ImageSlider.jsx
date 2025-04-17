import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function ImageSlider({ images, className = '', imgClassName = '' }) {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!images || images.length === 0) return null;

  useEffect(() => {
    setIsLoading(true);
  }, [current, images]);

  // Görsel zaten yüklenmişse, onLoad hemen tetiklenmeyebilir, bu yüzden fallback:
  useEffect(() => {
    const img = new window.Image();
    img.src = images[current];
    img.onload = () => setIsLoading(false);
  }, [current, images]);

  const prev = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrent((current - 1 + images.length) % images.length);
  };
  const next = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative w-full flex justify-center items-center" style={{ minHeight: 96 }}>
        {isLoading && (
          <div className="absolute flex items-center justify-center w-full h-full bg-white/70 z-10">
            <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          key={images[current]}
          src={images[current]}
          alt={`Ürün görseli ${current + 1}`}
          className={`h-80 ${imgClassName} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 items-center">
          <button onClick={prev} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"><ChevronLeft size={16} /></button>
          <span className="text-sm font-bold">{current + 1}/{images.length}</span>
          <button onClick={next} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"><ChevronRight size={16} /></button>
        </div>
      )}
      {images.length > 1 && (
        <div className="flex gap-1 mt-1">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-700' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}