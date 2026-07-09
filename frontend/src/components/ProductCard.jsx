import React from 'react';

export default function ProductCard({ product, setView, setSelectedProductId }) {
  return (
    <div 
      onClick={() => { setSelectedProductId(product._id); setView('detail'); }}
      className="group relative glass-panel rounded-card overflow-hidden p-4 cursor-pointer hover:shadow-glow-violet transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="absolute top-3 right-3 z-20 bg-darkBg/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-electricCyan border border-electricCyan/30">
        New
      </div>
      
      <div className="relative w-full aspect-square rounded-xl bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center overflow-hidden mb-4">
        <img 
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'} 
          alt={product.name} 
          className="w-4/5 h-4/5 object-contain transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-xs font-bold tracking-wider uppercase bg-white text-darkBg px-4 py-2 rounded-btn shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Quick View</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category || 'Lifestyle'}</span>
        <h3 className="font-semibold text-white group-hover:text-electricCyan transition-colors line-clamp-1 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-lg font-black text-white">${product.price}</span>
          <div className="flex items-center space-x-1 text-amber-400 text-xs">
            <span>★</span><span className="text-gray-400 font-medium">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}