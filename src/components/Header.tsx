import React from 'react';
import { Search, ShoppingCart, User, LogOut, Zap, MoreVertical, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function Header({ currentView, setCurrentView, searchQuery, setSearchQuery }: { currentView: string, setCurrentView: (v: string) => void, searchQuery?: string, setSearchQuery?: (v: string) => void }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchQuery) setSearchQuery(e.target.value);
    if (currentView !== 'shop' && e.target.value.trim() !== '') {
      setCurrentView('shop');
    }
  };

  return (
    <header className="bg-[#0B101E] w-full z-40 relative border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#ffb800] flex items-center justify-center">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">ElectroWorld</span>
          </div>
          
          {/* Navigation & Search */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search premium electronics (e.g., iPhone, Laptop, Sony)..." 
                value={searchQuery || ''}
                onChange={handleSearchChange}
                className="pl-11 pr-4 py-2.5 bg-[#141A29] border border-white/5 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#ffb800] w-[400px] transition-all placeholder:text-gray-500"
              />
            </div>
            <nav className="flex items-center gap-8 font-medium text-sm text-gray-300">
              <button onClick={() => setCurrentView('home')} className={`${currentView === 'home' ? 'text-white' : 'hover:text-white transition-colors'}`}>Home</button>
              <button onClick={() => setCurrentView('shop')} className={`${currentView === 'shop' || currentView === 'product' ? 'text-white' : 'hover:text-white transition-colors'}`}>Shop Catalog</button>
              <button onClick={() => setCurrentView('about')} className={`${currentView === 'about' ? 'text-white' : 'hover:text-white transition-colors'}`}>About Us</button>
              <button onClick={() => setCurrentView('contact')} className={`${currentView === 'contact' ? 'text-white' : 'hover:text-white transition-colors'}`}>Contact</button>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors lg:hidden">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentView('account')} className={`transition-colors hidden sm:block ${currentView === 'account' ? 'text-[#ffb800]' : 'text-gray-300 hover:text-white'}`}>
              <User className="w-5 h-5" />
            </button>
            
            <button className="relative text-gray-300 hover:text-white transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white border-2 border-[#0B101E]">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb800] text-[10px] font-bold text-black border-2 border-[#0B101E]">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="text-pink-500 hover:text-pink-400 transition-colors hidden sm:block">
              <LogOut className="w-5 h-5" />
            </button>

            <button className="text-gray-300 hover:text-white transition-colors lg:hidden">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
