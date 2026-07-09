import React, { useState } from 'react';

export default function Checkout({ cart, clearCart, setView, token }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', pin: '', payment: 'cod' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [genId, setGenId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalize Order with Backend API
      setLoading(true);
      setErrorMessage('');

      try {
        const orderData = {
          items: cart.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            size: item.size,
            qty: item.qty
          })),
          shippingAddress: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            pin: formData.pin
          },
          paymentMethod: formData.payment,
          totalAmount: total
        };

        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
          setGenId(data._id || 'SLX-' + Math.floor(Math.random() * 900000 + 100000));
          setOrderSuccess(true);
          clearCart();
        } else {
          throw new Error(data.message || 'Order processing failed');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-6 space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-4xl text-emerald-400 animate-bounce">✓</div>
        <h1 className="text-3xl font-black text-white tracking-tight">TRANSACTION SECURED</h1>
        <p className="text-xs text-gray-400">Your footwear drop configuration request was locked successfully.</p>
        <div className="glass-panel p-4 rounded-card border-dashed border-white/20">
          <span className="text-[10px] block uppercase tracking-widest text-gray-500">Order Manifest ID</span>
          <span className="text-lg font-mono font-bold text-electricCyan">{genId}</span>
        </div>
        <button onClick={() => setView('home')} className="w-full gradient-btn py-4 rounded-btn text-xs font-bold uppercase tracking-widest">Continue Exploration</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-6">
        <h1 className="text-3xl font-black text-white">Cart Empty</h1>
        <p className="text-gray-400 mt-4">Your fleet cart is currently empty.</p>
        <button onClick={() => setView('home')} className="gradient-btn px-6 py-3 rounded-btn mt-6">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* Form Engine */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8 glass-panel p-8 rounded-card">
        <div className="flex items-center space-x-4 border-b border-white/5 pb-4">
          {[1,2,3].map(n => (
            <div key={n} className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${step === n ? 'text-electricCyan' : 'text-gray-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-[11px] ${step === n ? 'border-electricCyan bg-electricCyan/10' : 'border-gray-700'}`}>{n}</span>
              <span className="hidden sm:inline">{n === 1 ? 'Identity' : n === 2 ? 'Logistics' : 'Settlement'}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white">1. Core User Identity Information</h3>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Secure Email Router</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white">2. Shipping Destination Nodes</h3>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Street Address</label>
              <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">City Vector</label>
                <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Zip Grid Area</label>
                <input required type="text" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value})} className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white">3. Secure Payment Infrastructure</h3>
            <div className="space-y-3">
              {[
                { id: 'cod', n: 'Cash / Pay on Delivery Vault', d: 'Zero transaction friction.' },
                { id: 'card', n: 'Quantum Encrypted Credit Card', d: 'Visa, Master, AMEX support.' }
              ].map(pay => (
                <div key={pay.id} onClick={() => setFormData({...formData, payment: pay.id})} className={`p-4 rounded-card border glass-panel cursor-pointer flex items-center justify-between ${formData.payment === pay.id ? 'border-electricCyan bg-electricCyan/5' : 'border-white/5'}`}>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pay.n}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{pay.d}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.payment === pay.id ? 'border-electricCyan' : 'border-gray-600'}`}>
                    {formData.payment === pay.id && <div className="w-2 h-2 rounded-full bg-electricCyan" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-between pt-6 border-t border-white/5">
          {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-white/10 rounded-btn text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white">Back</button>}
          <button type="submit" disabled={loading} className="gradient-btn px-8 py-3 rounded-btn text-xs font-bold uppercase tracking-widest ml-auto disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : step === 3 ? 'Authorize Drop Order' : 'Continue Matrix Setup'}
          </button>
        </div>
      </form>

      {/* Summary Stream */}
      <div className="glass-panel p-6 rounded-card h-fit space-y-6">
        <h3 className="text-md font-black tracking-widest uppercase text-white border-b border-white/5 pb-3">Manifest Summary</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-white line-clamp-1">{item.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Size: {item.size} | Qty: {item.qty}</p>
              </div>
              <span className="font-bold text-white">${item.price * item.qty}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-gray-400"><span>Sub-Logistics</span><span>${total}</span></div>
          <div className="flex justify-between text-gray-400"><span>Warp Carrier Routing</span><span className="text-emerald-400 font-bold">FREE</span></div>
          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/5"><span>Total System Cost</span><span>${total}</span></div>
        </div>
      </div>

    </div>
  );
}