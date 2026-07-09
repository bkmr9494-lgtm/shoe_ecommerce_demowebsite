import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ setView, setSelectedProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => {
        // Fallback Mock Data if server is not online yet
        setProducts([
          { _id: '1', name: 'SoleX Neon Cyberpunk Runner', price: 189, category: 'Running', description: 'Quantum engineered responsive foam.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'] },
          { _id: '2', name: 'Vortex Quantum Stealth High-Top', price: 245, category: 'Basketball', description: 'Carbon fiber anti-torsion tech.', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop'] },
          { _id: '3', name: 'AeroGlide Prism Minimalist', price: 150, category: 'Casual', description: 'Ultra breathable structural mesh.', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop'] },
          { _id: '4', name: 'HyperDrive Laser Volt Pro', price: 210, category: 'Lifestyle', description: 'Glow adaptive side profile mechanics.', images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop'] }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 max-w-7xl mx-auto space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-between pt-12">
        <div className="max-w-2xl space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electricCyan/10 to-neonViolet/10 border border-electricCyan/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-electricCyan uppercase">
            ⚡ Next-Gen Footwear Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white">
            STEP INTO <br />
            <span className="bg-gradient-to-r from-electricCyan via-laserPink to-neonViolet bg-clip-text text-transparent">PERFORMANCE</span> <br />
            & PURE STYLE.
          </h1>
          <p className="text-base text-gray-400 max-w-lg leading-relaxed">
            Engineered hyper-reactive cushioning meets structural cyberpunk aesthetics. Created for athletes navigating physical and digital terrain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <button onClick={() => {document.getElementById('catalog').scrollIntoView({behavior: 'smooth'})}} className="gradient-btn px-8 py-4 rounded-btn text-xs font-black tracking-widest uppercase w-full sm:w-auto">Shop Collection</button>
            <button className="glass-panel hover:bg-white/10 text-white px-8 py-4 rounded-btn text-xs font-black tracking-widest uppercase transition-all w-full sm:w-auto">Explore Lab</button>
          </div>
        </div>

        {/* Hero Central Graphic Frame */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mt-12 md:mt-0">
          <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-electricCyan to-neonViolet opacity-20 blur-[60px] animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
            alt="Hero Sneaker" 
            className="relative w-full h-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-700 select-none pointer-events-none drop-shadow-[0_35px_35px_rgba(0,240,255,0.3)]"
          />
        </div>
      </section>

      {/* 2. BRAND VALUES SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { t: 'Free Warp Delivery', d: 'Zero logistics charges globally.', icon: '🚀' },
          { t: 'Premium Spec Build', d: 'High durability verified tier materials.', icon: '💎' },
          { t: '30-Day Evaluation', d: 'Hassle-free exchange loops.', icon: '🔄' }
        ].map((v, i) => (
          <div key={i} className="glass-panel p-6 rounded-card hover:border-electricCyan/30 transition-all flex items-start space-x-4">
            <div className="text-3xl p-2 bg-white/5 rounded-xl">{v.icon}</div>
            <div>
              <h4 className="font-bold text-white text-sm tracking-wide">{v.t}</h4>
              <p className="text-xs text-gray-400 mt-1">{v.d}</p>
              <div className="w-8 h-[2px] bg-electricCyan mt-3" />
            </div>
          </div>
        ))}
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section id="catalog" className="scroll-mt-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-electricCyan tracking-widest uppercase">// Curated Core dropped drops</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">Featured Sneakers</h2>
          </div>
          <div className="flex space-x-2">
            {['All', 'Running', 'Basketball', 'Casual'].map((cat, idx) => (
              <button key={idx} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${idx === 0 ? 'bg-electricCyan text-darkBg' : 'glass-panel text-gray-400 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(n => <div key={n} className="glass-panel h-80 rounded-card animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} setView={setView} setSelectedProductId={setSelectedProductId} />
            ))}
          </div>
        )}
      </section>

      {/* 4. CATEGORY FLASH CARDS */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-widest text-center text-white uppercase">// Specialized Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: 'Speed Circuit', c: 'Running', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop' },
            { n: 'Court Domination', c: 'Basketball', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop' },
            { n: 'Cyber Neon Street', c: 'Lifestyle', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop' }
          ].map((cat, i) => (
            <div key={i} className="group relative h-64 rounded-card overflow-hidden cursor-pointer shadow-lg" onClick={() => {document.getElementById('catalog').scrollIntoView({behavior:'smooth'})}}>
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/40 to-transparent z-10" />
              <img src={cat.img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[10px] font-black tracking-widest text-electricCyan uppercase">{cat.c}</span>
                <h3 className="text-xl font-black text-white mt-1">{cat.n}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}