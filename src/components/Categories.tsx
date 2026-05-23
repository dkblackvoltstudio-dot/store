import React from 'react';
import { Smartphone, Laptop, TabletSmartphone, Tv, Headphones, Camera, Wind, WashingMachine, Refrigerator, Gamepad2, Watch, Plug } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { name: 'Smartphones', count: '40+ Products', icon: <Smartphone className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" /> },
  { name: 'Laptops', count: '25+ Products', icon: <Laptop className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" /> },
  { name: 'Tablets', count: '12+ Products', icon: <TabletSmartphone className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" /> },
  { name: 'Smart TVs', count: '18+ Products', icon: <Tv className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" /> },
  { name: 'Audio & Earbuds', count: '20+ Products', icon: <Headphones className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors" /> },
  { name: 'Cameras', count: '10+ Products', icon: <Camera className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" /> },
  { name: 'Air Conditioners', count: '15+ Products', icon: <Wind className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" /> },
  { name: 'Washing Machines', count: '10+ Products', icon: <WashingMachine className="w-8 h-8 text-pink-400 group-hover:text-pink-300 transition-colors" /> },
  { name: 'Refrigerators', count: '8+ Products', icon: <Refrigerator className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors" /> },
  { name: 'Gaming', count: '14+ Products', icon: <Gamepad2 className="w-8 h-8 text-violet-500 group-hover:text-violet-400 transition-colors" /> },
  { name: 'Smart Watches', count: '12+ Products', icon: <Watch className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" /> },
  { name: 'Accessories', count: '30+ Products', icon: <Plug className="w-8 h-8 text-[#ffb800] group-hover:text-yellow-300 transition-colors" /> },
];

export function Categories({ setCurrentView }: { setCurrentView?: (v: string) => void }) {
  return (
    <div className="py-12 bg-[#0B101E]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        <h2 className="text-2xl font-bold text-white mb-8">
          Browse Shop Categories
        </h2>
        
        <div className="relative flex overflow-x-hidden py-4 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-6 pr-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[...categories, ...categories].map((cat, i) => (
              <motion.div 
                key={i} 
                onClick={() => setCurrentView?.('shop')}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center p-6 w-[180px] shrink-0 rounded-2xl bg-[#141A29] hover:bg-[#1A2235] transition-colors border border-white/5 hover:border-white/10 cursor-pointer group shadow-lg"
              >
                <div className="mb-4 w-16 h-16 rounded-2xl bg-[#0B101E] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-1 text-center">{cat.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{cat.count}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
