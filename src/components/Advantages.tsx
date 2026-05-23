import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

const advantages = [
  {
    icon: <Truck className="w-5 h-5 text-[#ffb800]" />,
    title: "Insured Shipping",
    desc: "Safe and trackable express delivery direct to your home."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#ffb800]" />,
    title: "3-Year Warranty",
    desc: "Full protection policy on your catalog hardware items."
  },
  {
    icon: <RefreshCcw className="w-5 h-5 text-[#ffb800]" />,
    title: "7-Day Return",
    desc: "Easy return option if anything doesn't meet your expectations."
  },
  {
    icon: <PhoneCall className="w-5 h-5 text-[#ffb800]" />,
    title: "24/7 Support",
    desc: "Direct priority helpdesk access for your hardware needs."
  }
];

export function Advantages() {
  return (
    <div className="py-12 bg-[#0B101E]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, i) => (
            <div 
              key={i} 
              className="flex items-center gap-5 p-6 bg-[#141A29] rounded-2xl border border-white/5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1d263b] flex items-center justify-center shrink-0">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">{adv.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
