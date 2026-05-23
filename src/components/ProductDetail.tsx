import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, Bell, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../data/products';

export function ProductDetail({ product, onBack, onProductClick }: { product: Product, onBack: () => void, onProductClick?: (p: Product) => void }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const isWishlisted = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPriceDropModal, setShowPriceDropModal] = useState(false);
  const [email, setEmail] = useState('');
  const [priceDropConfirmed, setPriceDropConfirmed] = useState(false);
  
  const images = product.additionalImages 
    ? [product.image, ...product.additionalImages] 
    : [product.image, product.image, product.image];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://electroworld.com';
  const shareText = `Check out the ${product.name} on ElectroWorld!`;

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = (platform: string) => {
    let url = '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    switch (platform) {
      case 'x':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  return (
    <div className="bg-[#0B101E] min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium border-b border-transparent hover:border-white w-fit pb-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Products Grid
        </button>

        <div className="bg-[#141A29] rounded-3xl border border-white/5 p-5 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 dark:bg-[#0d1221] border border-white/5 relative group cursor-crosshair flex items-center justify-center">
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-125 transition-transform duration-700 ease-out origin-center bg-white" 
              />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                HOVER IMAGE WINDOW TO ZOOM
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-colors flex items-center justify-center bg-white ${selectedImage === i ? 'border-[#ffb800]' : 'border-transparent hover:border-white/20'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2">
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">CATEGORY: {product.category.toUpperCase()}</span>
              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">SKU-100{product.id}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#ffb800] fill-[#ffb800]" />
                <span className="font-bold text-[#ffb800]">{product.rating}</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-emerald-500 font-medium">In Stock (8 items remaining)</span>
            </div>

            <div className="bg-[#0B101E] border border-white/5 rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
              <span className="text-4xl font-black text-white font-mono tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
              <button 
                onClick={() => setShowPriceDropModal(true)}
                className="text-xs font-bold text-[#ffb800] border border-[#ffb800]/20 hover:bg-[#ffb800]/10 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Alert on Price Drop
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">PRODUCT DESCRIPTION & SPECS</h3>
              <div className="bg-[#0B101E] rounded-2xl border border-white/5 p-6 text-sm text-gray-400 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="sm:col-span-2">
                  <span className="text-gray-200 font-bold">Details:</span> {product.description || "Experience incredible fidelity and processing performance with this top-rated product model. Fully covered by our 3-year store guarantee policy."}
                </div>
                <div>
                  <span className="text-gray-200 font-bold block mb-1">Model Generation:</span>
                  v1.30 Release
                </div>
                <div>
                  <span className="text-gray-200 font-bold block mb-1">Power Supply:</span>
                  100W SuperCharge
                </div>
                <div className="sm:col-span-2 mt-2">
                  <span className="text-gray-200 font-bold block mb-1">Compliance Seals:</span>
                  BIS Indian Regulatory Standard Approved
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">COLOR VARIANT</label>
                <select className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800]">
                  <option>Obsidian Black (Default)</option>
                  <option>Lunar Silver</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">STORAGE CLASS</label>
                <select className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800]">
                  <option>Standard Edition</option>
                  <option>Pro Edition</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto">
              <button 
                onClick={() => {
                  addToCart(product);
                  setIsCartOpen(true);
                }}
                className="w-full sm:flex-1 bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 sm:flex-none sm:w-16 h-16 shrink-0 rounded-xl border border-white/10 flex items-center justify-center transition-colors ${isWishlisted ? 'bg-pink-500/10 border-pink-500/50' : 'bg-[#0B101E] hover:bg-white/5'}`}
                >
                  <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`} />
                </button>
                
                <div className="relative flex-1 sm:flex-none">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className={`w-full sm:w-16 h-16 shrink-0 rounded-xl border border-white/10 flex items-center justify-center transition-colors bg-[#0B101E] hover:bg-white/5`}
                  >
                    <Share2 className="w-6 h-6 text-gray-400" />
                  </button>

                {showShareMenu && (
                  <div className="absolute bottom-full right-0 mb-4 w-48 bg-[#141A29] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20 flex flex-col py-2 backdrop-blur-xl">
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 tracking-wider mb-1 border-b border-white/5">SHARE ON</div>
                    <button onClick={() => handleShare('x')} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" /> X (Twitter)
                    </button>
                    <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                      <Facebook className="w-4 h-4 text-[#4267B2]" /> Facebook
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" /> LinkedIn
                    </button>
                    <div className="h-px bg-white/5 my-1" />
                    <button onClick={() => handleShare('copy')} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <LinkIcon className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
                
                {/* Backdrop handler to close menu when clicking outside */}
                {showShareMenu && (
                  <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
                )}
              </div>
            </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => {
                const isRelatedWishlisted = isInWishlist(related.id);
                return (
                  <div key={related.id} className="bg-[#141A29] rounded-2xl border border-white/5 overflow-hidden flex flex-col group cursor-pointer" onClick={() => onProductClick && onProductClick(related)}>
                    <div className="relative p-4 bg-[length:10px_10px] bg-[#0d1221] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(related); }}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${isRelatedWishlisted ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
                      </button>
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-black/20">
                        <img 
                          src={related.image} 
                          alt={related.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-400 font-medium">{related.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#ffb800] fill-[#ffb800]" />
                          <span className="text-xs font-bold text-[#ffb800]">{related.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold text-white mb-6 leading-snug">{related.name}</h3>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-lg font-bold text-white">₹{related.price.toLocaleString('en-IN')}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onProductClick && onProductClick(related); }}
                          className="px-4 py-2 rounded-lg bg-[#e08b00] hover:bg-[#ffb800] text-black font-bold text-xs transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {showPriceDropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPriceDropModal(false)} />
          <div className="relative bg-[#141A29] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0B101E]">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#ffb800]" />
                Price Drop Alert
              </h3>
              <button 
                onClick={() => setShowPriceDropModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              {priceDropConfirmed ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">You're all set!</h4>
                  <p className="text-sm text-gray-400">
                    We'll email you at <span className="text-white font-medium">{email}</span> when the price for this product drops.
                  </p>
                  <button 
                    onClick={() => {
                      setShowPriceDropModal(false);
                      setTimeout(() => setPriceDropConfirmed(false), 300);
                    }}
                    className="mt-6 w-full bg-[#1A2235] hover:bg-[#202940] text-white font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Set up an alert for <span className="text-white font-bold">{product.name}</span>. We'll let you know as soon as the price drops below <span className="text-white font-medium font-mono">₹{product.price.toLocaleString('en-IN')}</span>.
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffb800] placeholder:text-gray-600"
                    />
                  </div>
                  <button 
                    disabled={!email}
                    onClick={() => setPriceDropConfirmed(true)}
                    className="w-full bg-[#e08b00] hover:bg-[#ffb800] disabled:bg-[#e08b00]/50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition-colors text-sm mt-2"
                  >
                    Confirm Alert
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
