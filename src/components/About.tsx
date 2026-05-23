import React from 'react';
import { Eye, Target } from 'lucide-react';

export function About() {
  return (
    <div className="bg-[#0B101E] min-h-[calc(100vh-80px)] pt-24 pb-16 flex items-center">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Our Story & Purpose</h1>
        <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          Founded with a single mission in mind, ElectroWorld aims to solve the marketplace problem of fake electronic accessories by providing direct manufacturing channels to Indian retail shoppers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-[#141A29] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-xl font-bold text-[#ffb800] mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5" />
              Corporate Vision
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              To create a transparent, reliable, high-speed delivery pipeline across the Indian subcontinent that equips tech enthusiasts with authentic electronic units at factory rates.
            </p>
          </div>
          
          <div className="bg-[#141A29] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-xl font-bold text-[#ffb800] mb-4 flex items-center gap-3">
              <Target className="w-5 h-5" />
              Business Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Eliminate mid-tier markups and fake retail goods by strictly sourcing from approved factories, verifying structural specifications, and managing premium technical customer service windows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
