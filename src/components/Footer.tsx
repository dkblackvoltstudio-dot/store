import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MessageCircle, Phone, Mail, MapPin, ChevronUp, Zap } from 'lucide-react';

export function Footer({ setCurrentView }: { setCurrentView?: (v: string) => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer className="bg-[#05080F] text-gray-400 pt-20 pb-8 relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[#ffb800] flex items-center justify-center">
                <Zap className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">ElectroWorld</span>
            </div>
            
            <p className="text-sm font-medium leading-relaxed max-w-sm text-gray-400">
              Your trusted destination for premium electronics since 2008. We bring the world's best technology to your doorstep.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-[#141A29] flex items-center justify-center hover:bg-[#ffb800] hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#141A29] flex items-center justify-center hover:bg-[#ffb800] hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#141A29] flex items-center justify-center hover:bg-[#ffb800] hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#141A29] flex items-center justify-center hover:bg-[#ffb800] hover:text-black transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#141A29] flex items-center justify-center hover:bg-[#ffb800] hover:text-black transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setCurrentView && setCurrentView('home')} className="hover:text-[#ffb800] transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentView && setCurrentView('shop')} className="hover:text-[#ffb800] transition-colors">Shop Catalog</button></li>
              <li><button onClick={() => setCurrentView && setCurrentView('about')} className="hover:text-[#ffb800] transition-colors">About Us</button></li>
              <li><button onClick={() => setCurrentView && setCurrentView('contact')} className="hover:text-[#ffb800] transition-colors">Contact Us</button></li>
              <li><a href="#" className="hover:text-[#ffb800] transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Categories</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#ffb800] transition-colors">Mobiles</a></li>
              <li><a href="#" className="hover:text-[#ffb800] transition-colors">Laptops</a></li>
              <li><a href="#" className="hover:text-[#ffb800] transition-colors">Audio</a></li>
              <li><a href="#" className="hover:text-[#ffb800] transition-colors">Wearables</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-5 text-sm font-medium text-gray-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ffb800] shrink-0" />
                <span>+91 9641253844</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ffb800] shrink-0" />
                <span>support@electroworld.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ffb800] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Silicon City Tech Park,<br/>Bangalore, KA 560100</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p>© 2024 ElectroWorld. All rights reserved.</p>
          <p>Powered by Next-Gen Cloud Commerce</p>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className="absolute -top-6 right-8 md:right-16 w-12 h-12 bg-[#ffb800] rounded-lg flex items-center justify-center text-black shadow-lg hover:-translate-y-1 transition-transform"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
