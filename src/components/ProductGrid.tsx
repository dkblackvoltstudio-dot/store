import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="shop">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="group relative border border-white/5 bg-[#0D0D0D] p-6 lg:p-8 flex flex-col h-full">
            <div className="aspect-square w-full overflow-hidden bg-[#1A1A1A] mb-8 relative border border-white/5 animate-pulse"></div>
            <div className="flex flex-col flex-grow">
              <div className="flex flex-col items-start mb-6 gap-2 w-full">
                <div className="h-3 w-20 bg-white/10 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse mt-2"></div>
              </div>
              <div className="space-y-2 mb-10 w-full flex-grow">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

