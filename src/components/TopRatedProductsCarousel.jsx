import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopRatedProductsCarousel({ products }) {
  const [current, setCurrent] = useState(0);

  if (!products || products.length === 0) return null;

  const prev = () => setCurrent((current - 1 + products.length) % products.length);
  const next = () => setCurrent((current + 1) % products.length);
  const product = products[current];

  return (
    <div className="relative min-w-[45%] min-h-[800px] mx-auto mb-18 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-600 w-full h-20 text-4xl font-bold flex items-center justify-center animate-pulse transition duration-100">
        Most Liked Products
      </div>
      <div className="flex flex-col items-center p-6">
        {/* Sabit ölçülü görsel alanı */}
        <div className="relative w-full flex justify-center items-center h-[450px] rounded">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-contain h-full w-auto max-w-full max-h-full mx-auto rounded"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold mb-1">{product.title}</h3>
          <div className="text-yellow-600 font-semibold mb-1">Rating: {product.rating}</div>
          <div className="text-blue-700 font-bold text-xl mb-1">${product.price}</div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={prev} className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"><ChevronLeft size={20} /></button>
          <span className="text-sm font-bold">{current + 1}/{products.length}</span>
          <button onClick={next} className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"><ChevronRight size={20} /></button>
        </div>
        <Link to={`/product/${product.id}`} className="mt-4 inline-block text-blue-700 hover:underline font-medium">Detay</Link>
      </div>
    </div>
  );
}
