import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Package, Heart, ShoppingCart, Trash2, CheckCircle2, Circle, Truck, X, Search, Filter } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../data/products';

export function Account() {
  const { wishlistItems: wishlistedProducts, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Verified Customer',
    email: 'adffffff@gmail.com',
    address: 'West Bengal, India'
  });
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [wishlistSearchQuery, setWishlistSearchQuery] = useState('');

  const filteredWishlistedProducts = wishlistedProducts.filter(p => 
    p.name.toLowerCase().includes(wishlistSearchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(wishlistSearchQuery.toLowerCase())
  );

  const trackingSteps = [
    { label: 'Order Placed', date: 'May 20, 2026', completed: true },
    { label: 'Processing', date: 'May 21, 2026', completed: true },
    { label: 'Shipped', date: 'May 22, 2026', completed: true },
    { label: 'Out for Delivery', date: 'May 23, 2026', completed: false },
    { label: 'Delivered', date: 'Estimated: May 24, 2026', completed: false },
  ];

  const pastOrders = [
    { id: 'ORD-9824', date: 'May 20, 2026', total: 114900, status: 'Shipped', items: 1 },
    { id: 'ORD-8731', date: 'Apr 12, 2026', total: 79900, status: 'Delivered', items: 2 },
    { id: 'ORD-7562', date: 'Feb 28, 2026', total: 12900, status: 'Delivered', items: 1 },
  ];

  const filteredPastOrders = pastOrders.filter(order => 
    order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
    order.status.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0B101E] min-h-[calc(100vh-80px)] pt-16 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-10">My Account Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-24 h-24 flex-shrink-0 rounded-full bg-[#ffb800]/10 flex items-center justify-center mb-6">
              <User className="w-10 h-10 text-[#ffb800]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1 truncate w-full">{profile.name}</h2>
            <p className="text-sm text-gray-400 mb-8">{profile.email}</p>
            
            <button 
              onClick={() => setIsEditProfileOpen(true)}
              className="w-full bg-[#ffb800] text-black font-bold py-2.5 rounded-xl hover:bg-[#e6a600] transition-colors mb-6 text-sm"
            >
              Edit Profile
            </button>

            <div className="w-full flex justify-between lg:flex-col lg:justify-start lg:gap-4 border-t border-white/5 pt-6 text-left">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Default Region</p>
                <p className="text-sm font-medium text-gray-300">{profile.address || 'Not Set'}</p>
              </div>
              <div className="hidden lg:block h-px w-full bg-white/5 my-2"></div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Account Class</p>
                <p className="text-sm font-medium text-gray-300">Standard Registered Shopper</p>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#ffb800]" />
                  Order History & Status
                </h3>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="bg-[#0B101E] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffb800] w-full sm:w-auto min-w-[200px]"
                  />
                </div>
              </div>
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout">
                {filteredPastOrders.length > 0 ? (
                  filteredPastOrders.map((order) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={order.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B101E] border border-white/5 p-5 rounded-2xl"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-sm font-bold text-white">{order.id}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                            'bg-[#ffb800]/10 text-[#ffb800] border border-[#ffb800]/20'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">{order.date} • {order.items} {order.items === 1 ? 'Item' : 'Items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white font-mono">₹{order.total.toLocaleString('en-IN')}</p>
                        <button className="text-xs text-[#ffb800] font-medium hover:underline mt-1">View Details</button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 text-gray-500 text-sm italic"
                  >
                    No orders found matching "{orderSearchQuery}"
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#ffb800]" />
                  Track Active Order
                </h3>
                <span className="bg-[#ffb800]/10 text-[#ffb800] text-xs font-bold px-3 py-1 rounded-full border border-[#ffb800]/20">
                  ORD-9824
                </span>
              </div>
              
              <div className="relative pt-4 pb-2">
                <div className="absolute left-[11px] top-8 bottom-8 w-[2px] bg-white/10" />
                
                <div className="space-y-8 relative">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex gap-6 items-start">
                      <div className="relative z-10 flex-shrink-0 bg-[#141A29] py-1">
                        {step.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="pt-1 flex-1">
                        <h4 className={`text-sm font-bold mb-1 ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                          {step.label}
                        </h4>
                        <p className="text-xs text-gray-500 font-mono">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#ffb800]" />
                  My Saved Wishlist Items
                </h3>
                {wishlistedProducts.length > 0 && (
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search wishlist..."
                      value={wishlistSearchQuery}
                      onChange={(e) => setWishlistSearchQuery(e.target.value)}
                      className="bg-[#0B101E] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffb800] w-full sm:w-auto min-w-[200px]"
                    />
                  </div>
                )}
              </div>
              
              {wishlistedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-[#0B101E] rounded-2xl border border-white/5">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-[#141A29] rounded-full border border-pink-500/20 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] animate-pulse" style={{ animationDuration: '3s' }}>
                      <Heart className="w-10 h-10 text-pink-500" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Your Wishlist is Empty</h4>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">Found something you like? Click the heart icon on any product to save it here for later.</p>
                </div>
              ) : (
                <motion.div layout className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredWishlistedProducts.length > 0 ? (
                      filteredWishlistedProducts.map(product => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          key={product.id} 
                          className="flex items-center gap-4 bg-[#0B101E] border border-white/5 p-4 rounded-2xl"
                        >
                          <div className="w-20 h-20 shrink-0 bg-black/20 rounded-xl overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm text-white font-bold truncate mb-1">{product.name}</h4>
                            <p className="text-emerald-500 font-mono font-medium text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleWishlist(product)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                addToCart(product);
                                setIsCartOpen(true);
                              }}
                              className="bg-[#e08b00] hover:bg-[#ffb800] text-black w-10 h-10 sm:w-auto sm:px-4 flex items-center justify-center gap-2 rounded-xl transition-colors font-bold text-sm shrink-0"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span className="hidden sm:inline">Add to Cart</span>
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 text-gray-500 text-sm italic"
                      >
                        No items found matching "{wishlistSearchQuery}"
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141A29] rounded-3xl border border-white/10 p-8 w-full max-w-md relative">
            <button 
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsEditProfileOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffb800]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffb800]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Shipping Address</label>
                <input 
                  type="text" 
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffb800]"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#ffb800] text-black font-bold py-3 rounded-xl hover:bg-[#e6a600] transition-colors mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
