import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative border border-white/5 bg-[#0D0D0D] p-6 lg:p-8 transition-all hover:border-[#F27D26]/50 flex flex-col h-full hover:bg-[#151515]">
      <div className="aspect-square w-full overflow-hidden bg-[#1A1A1A] mb-8 relative border border-white/5">
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
        </button>
        <div className="absolute bottom-4 left-4 z-10 text-[60px] md:text-[80px] font-black text-white/5 uppercase select-none leading-none pointer-events-none">
          {product.category.substring(0,3)}
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center mix-blend-luminosity opacity-40 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col items-start mb-6 gap-2">
          <h3 className="text-[10px] text-[#F27D26] font-bold tracking-[0.3em] uppercase">{product.category}</h3>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#F5F5F5]">{product.name}</h2>
        </div>
        <p className="text-sm opacity-50 mb-10 flex-grow leading-relaxed line-clamp-2 md:line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-bold tracking-tight text-[#F5F5F5]">${product.price.toFixed(2)}</p>
          <button
            onClick={() => {
              addToCart(product);
              setIsCartOpen(true);
            }}
            className="px-6 py-4 bg-[#1A1A1A] text-[#F5F5F5] font-black uppercase text-[10px] tracking-widest hover:bg-[#F5F5F5] hover:text-[#0D0D0D] transition-colors border border-white/5 group-hover:border-white/20"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
