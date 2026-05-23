import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
];

interface HeroProps {
  setCurrentView?: (view: 'home' | 'shop' | 'product' | 'about' | 'contact' | 'account') => void;
}

export function Hero({ setCurrentView }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#0B101E] text-white pt-16 pb-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 max-w-2xl text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center"
          >
            <span className="px-4 py-1.5 rounded-full border border-[#ffb800]/30 text-[#ffb800] text-sm font-medium tracking-wide">
              Exclusive Electronics Store
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white"
          >
            Premium Electronics. Uncompromising Quality.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed font-medium"
          >
            Discover top-tier electronics curated for high performance. Enjoy multi-year store warranties, fast shipping across India, and authentic global brands.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button 
              onClick={() => setCurrentView?.('shop')}
              className="flex items-center gap-2 bg-[#e08b00] hover:bg-[#d07f00] text-black px-8 py-3.5 rounded-lg font-bold transition-all shadow-md"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
            
            <button className="flex items-center gap-2 bg-[#141A29] hover:bg-[#1E2538] border border-white/5 text-white px-8 py-3.5 rounded-lg font-semibold transition-all">
              Get 10% First Order Coupon
            </button>
          </motion.div>
        </div>

        {/* Right Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
          className="flex-1 w-full flex justify-end"
        >
          <div className="w-full max-w-[700px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative gradient-mask border border-white/5 bg-black/40">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                src={heroImages[currentImage]} 
                alt="Premium Electronics" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
              {heroImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImage ? 'bg-[#ffb800] w-6' : 'bg-white/50 hover:bg-white/80 w-2'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
