import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products as allProducts, Product } from '../data/products';

interface FlashDealsProps {
  onProductClick: (product: Product) => void;
}

export function FlashDeals({ onProductClick }: FlashDealsProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Pick some trending products to show on the home page
  const trendingProducts = allProducts.filter(p => ['ap1', 'ss1', 'op1', 'sn1'].includes(p.id)).slice(0, 8);

  return (
    <div className="py-12 bg-[#0B101E]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Trending Bestsellers</h2>
          <a href="#" className="font-semibold text-[#e08b00] hover:text-[#ffb800] transition-colors">
            View All Products
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);
            return (
            <div key={product.id} className="bg-[#141A29] rounded-2xl border border-white/5 overflow-hidden flex flex-col group">
              
              <div className="relative p-4 bg-[length:10px_10px] bg-[#0d1221] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
                </button>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/5 bg-black/20">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#ffb800] fill-[#ffb800]" />
                    <span className="text-xs font-bold text-[#ffb800]">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-white mb-6 leading-snug text-sm">{product.name}</h3>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => onProductClick(product)}
                    className="px-4 py-2 rounded-lg bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold text-sm transition-colors"
                  >
                    Buy +
                  </button>
                </div>
              </div>

            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
