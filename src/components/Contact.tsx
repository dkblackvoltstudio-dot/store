import React from 'react';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-[#0B101E] min-h-[calc(100vh-80px)] pt-16 pb-16 flex items-center justify-center">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-black text-white mb-4">Contact Customer Service</h2>
            <p className="text-gray-400 mb-10">Our helpdesk channels are active and monitored around the clock.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl border border-[#ffb800]/20 bg-[#ffb800]/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#ffb800]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-1">Call Support Line</h4>
                  <p className="text-white font-medium font-mono text-lg">7964123580</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-1">Direct Chat via WhatsApp</h4>
                  <p className="text-emerald-500 font-medium cursor-pointer hover:underline text-sm">Open Official WhatsApp Chat</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl border border-[#ffb800]/20 bg-[#ffb800]/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#ffb800]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-1">Official Help Email</h4>
                  <p className="text-white font-medium font-mono text-sm">electroworld@official.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl border border-[#ffb800]/20 bg-[#ffb800]/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#ffb800]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-1">Physical Store Headquarters</h4>
                  <p className="text-white font-medium text-sm leading-relaxed max-w-[280px]">Central Avenue, Biplabi Anukul Chandra St, Bowbazar, Kolkata, West Bengal 700072</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#141A29] rounded-3xl border border-white/5 p-8 lg:p-12">
            <h2 className="text-xl font-bold text-white mb-8">Send Us a Message</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800] placeholder:text-gray-600 transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800] placeholder:text-gray-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message Body</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800] placeholder:text-gray-600 transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold py-3.5 rounded-xl transition-colors mt-2">
                Submit Message Form
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
