import React, { useState, useEffect } from 'react';
import { Star, Heart, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export function ShopCatalog({ onProductClick, searchQuery = '' }: { onProductClick: (p: Product) => void, searchQuery?: string }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  
  const categories = ['Laptops', 'Audio', 'Wearables', 'Mobiles', 'Computers', 'Tablets', 'Accessories'];
  const brands = ['Apple', 'Samsung', 'OnePlus', 'iQOO', 'Sony'];
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(q) && !product.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
  
  return (
    <div className="bg-[#0B101E] min-h-screen pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-[#141A29] p-6 rounded-2xl border border-white/5 sticky top-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#ffb800]" />
                Filter Options
              </h2>
              <button 
                onClick={() => { setActiveCategory([]); setActiveBrand([]); }}
                className="text-xs text-gray-400 hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all"
              >
                Clear All
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4">CATEGORIES</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label 
                    key={cat} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setActiveCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                  >
                    <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-[#ffb800] transition-colors flex items-center justify-center">
                       {activeCategory.includes(cat) && <div className="w-2 h-2 bg-[#ffb800] rounded-sm" />}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4">BRANDS</h3>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label 
                    key={brand} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setActiveBrand(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                  >
                    <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-[#ffb800] transition-colors flex items-center justify-center">
                       {activeBrand.includes(brand) && <div className="w-2 h-2 bg-[#ffb800] rounded-sm" />}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4">MAX PRICE</h3>
              <div className="flex items-center w-full gap-3 mt-4 mb-2">
                <input type="range" min="1000" max="56000" defaultValue="56000" className="w-full accent-[#ffb800]" />
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>₹1,000</span>
                <span className="text-[#e08b00]">₹56,000</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-4">MINIMUM RATING</h3>
              <select className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#ffb800]">
                <option>Show All Ratings</option>
                <option>4.0 & above</option>
                <option>4.5 & above</option>
              </select>
            </div>
            
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-[#141A29] p-4 rounded-xl border border-white/5 flex flex-wrap justify-between items-center gap-4 mb-6">
            <p className="text-gray-400 text-sm font-medium">Showing {filteredProducts.length} retail electronic items</p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 tracking-wider">SORT BY</span>
              <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffb800]">
                <option>Featured Collection</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#141A29] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                  <div className="relative p-4 bg-[length:10px_10px] bg-[#0d1221] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-white/5 animate-pulse"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-3 w-16 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 w-10 bg-white/10 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse mb-6"></div>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-8 w-24 bg-white/10 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((product) => {
                const isWishlisted = isInWishlist(product.id);
                return (
                  <div key={product.id} className="bg-[#141A29] rounded-2xl border border-white/5 overflow-hidden flex flex-col group cursor-pointer" onClick={() => onProductClick(product)}>
                  <div className="relative p-4 bg-[length:10px_10px] bg-[#0d1221] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                    {product.id === '3' && ( /* Just mocking the sale tag for one item */
                      <div className="absolute top-4 left-4 z-10 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                        -15% OFF
                      </div>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
                    </button>
                    
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-black/20 relative group/img">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover/img:pointer-events-auto">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            addToCart(product); 
                            setIsCartOpen(true); 
                          }}
                          className="bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-xs">Quick Add</span>
                        </button>
                      </div>
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
                    
                    <h3 className="text-sm font-bold text-white mb-6 leading-snug">{product.name}</h3>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-lg font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                        className="px-4 py-2 rounded-lg bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold text-xs transition-colors"
                      >
                        Buy +
                      </button>
                    </div>
                  </div>
                </div>
              );
            }))
            }
          </div>
        </div>

      </div>
    </div>
  );
}
