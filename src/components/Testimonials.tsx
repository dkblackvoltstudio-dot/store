import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The premium laptop we bought for office work runs perfectly. Delivery to our Kolkata address was extremely fast and securely packaged.",
    author: "DEVENDRA S., TECH LEAD"
  },
  {
    quote: "Studio-grade monitors and audio accessories met every requirement. The custom support team is highly responsive and friendly.",
    author: "PRIYAN M., CONTENT CREATOR"
  },
  {
    quote: "High stock accuracy, instant checkout, and clean downloadable invoice bills make this my absolute favorite shopping site.",
    author: "ANANYA R., FREELANCER"
  }
];

export function Testimonials() {
  return (
    <div className="py-12 bg-[#0B101E]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white text-center mb-8">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="bg-[#141A29] p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-[#ffb800] fill-[#ffb800]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">
                  "{test.quote}"
                </p>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                — {test.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
