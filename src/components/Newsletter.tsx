import React from 'react';

export function Newsletter() {
  return (
    <div className="py-20 bg-[#0B101E]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Get early alerts for store sales, premium catalog updates, holiday coupons, and new releases directly to your email inbox.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="w-full sm:w-96 px-5 py-3.5 bg-[#141A29] border border-white/5 rounded-lg text-white font-medium focus:outline-none focus:border-[#ffb800] transition-colors placeholder:text-gray-500"
          />
          <button className="w-full sm:w-auto px-8 py-3.5 bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold rounded-lg transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
