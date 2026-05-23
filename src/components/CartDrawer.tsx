import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col text-gray-900"
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 shrink-0">
              <h2 className="text-lg md:text-xl font-black uppercase tracking-widest">
                Cart ({items.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40 space-y-8">
                  <div className="text-[60px] md:text-[80px] font-black uppercase tracking-tighter text-gray-300">EMPTY</div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#ffb800] font-bold uppercase tracking-widest text-[10px] hover:opacity-80 transition-opacity"
                  >
                    Return to Shop →
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="h-28 w-24 md:h-32 md:w-28 flex-shrink-0 overflow-hidden bg-gray-100 rounded-xl border border-gray-200 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center relative z-10"
                        />
                      </div>

                      <div className="flex flex-1 flex-col py-2">
                        <div>
                          <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">{item.category}</p>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug">{item.name}</h3>
                            <p className="text-sm font-extrabold text-[#ffb800]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-500 hover:text-black transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 font-bold text-xs text-gray-900 border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-500 hover:text-black transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 shrink-0">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Total</p>
                    <p className="text-2xl md:text-3xl font-black tracking-tighter text-[#ffb800]">₹{cartTotal.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <button
                  className="w-full flex items-center justify-center rounded-full bg-[#ffb800] px-6 py-4 md:py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-[#e6a600] shadow-lg shadow-[#ffb800]/20"
                  onClick={() => setIsCartOpen(false)}
                >
                  Initiate Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
