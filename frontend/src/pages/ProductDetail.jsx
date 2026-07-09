import React, { useState, useEffect } from 'react';

export default function ProductDetail({ productId, addToCart, setView }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('UK 9');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // Dynamic single fetch fallback
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => {
        setProduct({
          _id: productId || '1',
          name: 'SoleX Neon Cyberpunk Runner Premium Edition',
          price: 189,
          category: 'Running',
          description: 'Engineered with custom light-conductive structural overlays and zero-gravity return soles. Built to maximize kinetics under multi-axial shock loads.',
          images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop'
          ],
          sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10']
        });
      });
  }, [productId]);

  if (!product) return <div className="text-center py-24 text-gray-500">Initializing Core Engine Config...</div>;

  return (
    <div className="px-6 max-w-7xl mx-auto pt-12">
      <button onClick={() => setView('home')} className="mb-8 flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-400 hover:text-electricCyan transition-colors">
        <span>← Back to Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="glass-panel w-full aspect-square rounded-card flex items-center justify-center p-6 bg-gradient-to-br from-white/5 to-transparent">
            <img src={product.images[0]} alt="" className="w-5/6 h-5/6 object-contain transform hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="glass-panel aspect-square rounded-xl p-2 cursor-pointer border-electricCyan/30">
                <img src={img} alt="" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Stack */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-electricCyan uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-1 leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-black text-white">${product.price}</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">In Stock</span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>

          {/* Size Variant Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Matrix Size</label>
            <div className="grid grid-cols-4 gap-3">
              {(product.sizes || ['UK 7', 'UK 8', 'UK 9', 'UK 10']).map(size => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-btn text-xs font-bold uppercase tracking-wider transition-all border ${selectedSize === size ? 'bg-electricCyan text-darkBg border-electricCyan shadow-glow-cyan' : 'glass-panel border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty & Add Loop */}
          <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
            <div className="flex items-center bg-darkSurface rounded-btn border border-white/10 h-14">
              <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)} className="px-4 text-lg hover:text-electricCyan font-black">-</button>
              <span className="px-2 font-bold text-white text-sm w-8 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-4 text-lg hover:text-electricCyan font-black">+</button>
            </div>

            <button 
              onClick={() => addToCart(product, selectedSize, qty)}
              className="flex-grow gradient-btn h-14 rounded-btn font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
            >
              <span>Add To Fleet Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}