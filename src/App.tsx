import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FlashDeals } from './components/FlashDeals';
import { Advantages } from './components/Advantages';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetail } from './components/ProductDetail';
import { Product } from './types';

import { About } from './components/About';
import { Contact } from './components/Contact';
import { Account } from './components/Account';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product' | 'about' | 'contact' | 'account'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#0B101E] text-white font-sans selection:bg-[#ffb800] selection:text-black">
          <Header currentView={currentView} setCurrentView={setCurrentView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <main className="overflow-hidden">
            <AnimatePresence mode="wait">
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero setCurrentView={setCurrentView} />
                  <Advantages />
                  <Categories setCurrentView={setCurrentView} />
                  <FlashDeals onProductClick={handleProductClick} />
                  <Testimonials />
                  <Newsletter />
                </motion.div>
              )}
              {currentView === 'shop' && (
                <motion.div
                  key="shop"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShopCatalog onProductClick={handleProductClick} searchQuery={searchQuery} />
                </motion.div>
              )}
              {currentView === 'product' && selectedProduct && (
                <motion.div
                  key="product"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductDetail product={selectedProduct} onBack={() => setCurrentView('shop')} onProductClick={handleProductClick} />
                </motion.div>
              )}
              {currentView === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <About />
                </motion.div>
              )}
              {currentView === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Contact />
                </motion.div>
              )}
              {currentView === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Account />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          <Footer setCurrentView={setCurrentView} />
          <CartDrawer />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}


