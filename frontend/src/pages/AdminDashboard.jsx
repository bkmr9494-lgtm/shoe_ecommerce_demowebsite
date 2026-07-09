import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ token, setView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Running',
    description: '',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop']
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price)
        })
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewProduct({
          name: '',
          price: '',
          category: 'Running',
          description: '',
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop']
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (!token) {
    return (
      <div className="px-6 max-w-7xl mx-auto pt-12 text-center">
        <h1 className="text-3xl font-black text-white">Access Denied</h1>
        <p className="text-gray-400 mt-4">Please login to access the admin dashboard.</p>
        <button onClick={() => setView('login')} className="gradient-btn px-6 py-3 rounded-btn mt-6">Login</button>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto pt-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-laserPink font-bold uppercase tracking-widest">// Command Interface</span>
          <h1 className="text-3xl font-black tracking-tight text-white mt-1">Admin Deck</h1>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="gradient-btn px-6 py-3 rounded-btn text-xs font-bold uppercase tracking-widest">
          {showAddForm ? '- Cancel' : '+ Generate New Product SKU'}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="glass-panel p-6 rounded-card">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Product Name</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan"
                >
                  <option value="Running">Running</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Casual">Casual</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Description</label>
              <textarea
                required
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full bg-darkBg border border-white/10 rounded-btn p-3 text-sm text-white focus:outline-none focus:border-electricCyan h-24"
              />
            </div>
            <button type="submit" className="gradient-btn px-6 py-3 rounded-btn text-xs font-bold uppercase tracking-widest">
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Metrics Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { l: 'Total Products', v: products.length, c: 'text-electricCyan' },
          { l: 'System Status', v: 'Online', c: 'text-emerald-400' },
          { l: 'Admin Access', v: 'Granted', c: 'text-white' }
        ].map((m, i) => (
          <div key={i} className="glass-panel p-6 rounded-card">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">{m.l}</span>
            <span className={`text-2xl font-black tracking-tight mt-2 block ${m.c}`}>{m.v}</span>
          </div>
        ))}
      </div>

      {/* Modern Horizontal Scroll Table */}
      <div className="glass-panel rounded-card overflow-hidden">
        <div className="p-6 border-b border-white/5"><h3 className="font-bold text-white text-sm uppercase tracking-wider">Product Inventory Ledger</h3></div>
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading inventory data...</div>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest font-black text-gray-400">
                <tr>
                  <th className="p-4">SKU Name</th>
                  <th className="p-4">Category Matrix</th>
                  <th className="p-4">Price System</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No products in inventory</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-white">{p.name}</td>
                      <td className="p-4 text-electricCyan">{p.category}</td>
                      <td className="p-4 font-bold text-white">${p.price}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleDeleteProduct(p._id)} className="text-xs text-red-400 hover:text-red-500 font-bold transition-all">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}