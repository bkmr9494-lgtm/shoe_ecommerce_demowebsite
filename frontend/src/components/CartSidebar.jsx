import React from 'react';

export default function CartSidebar({ isOpen, setIsCartOpen, cart, updateQty, setView }) {
  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      
      <div className="relative w-full max-w-md h-full bg-darkBg/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-slideLeft">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <h2 className="text-xl font-black tracking-tight text-white">YOUR CART ({cart.length})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-white">✕</button>
          </div>

          <div className="overflow-y-auto max-h-[60vh] space-y-4 mt-6 pr-2 no-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-4">Your dynamic cart is empty.</p>
                <button onClick={() => { setIsCartOpen(false); setView('home'); }} className="gradient-btn px-6 py-2 rounded-btn text-xs font-bold uppercase tracking-wider">Shop Now</button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="glass-panel p-3 rounded-card flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center p-1">
                    <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop'} alt="" className="object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-electricCyan mt-0.5">Size: {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-white">${item.price * item.qty}</span>
                      <div className="flex items-center bg-darkBg rounded-btn border border-white/10">
                        <button onClick={() => updateQty(item._id, item.size, -1)} className="px-2.5 py-1 text-xs hover:text-electricCyan">-</button>
                        <span className="px-2 text-xs font-bold text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.size, 1)} className="px-2.5 py-1 text-xs hover:text-electricCyan">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-white">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => { setIsCartOpen(false); setView('checkout'); }}
              className="w-full gradient-btn py-4 rounded-btn font-bold tracking-wider uppercase text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}