import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

export default function App() {
  const [view, setView] = useState('home'); // home, detail, checkout, admin, login
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('solex_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('solex_token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('solex_role') || 'customer');

  useEffect(() => {
    localStorage.setItem('solex_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id && item.size === size);
      if (exists) {
        return prev.map(item => item._id === product._id && item.size === size ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, size, qty }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id && item.size === size) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  const handleLoginSuccess = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
    localStorage.setItem('solex_token', newToken);
    localStorage.setItem('solex_role', role);
    setView(role === 'admin' ? 'admin' : 'home');
  };

  const handleLogout = () => {
    setToken(null);
    setUserRole('customer');
    localStorage.removeItem('solex_token');
    localStorage.removeItem('solex_role');
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-darkBg select-none">
      {/* Decorative Aurora Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-electricCyan/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-neonViolet/10 blur-[150px] pointer-events-none"></div>

      <Navbar setView={setView} cartCount={cart.reduce((a,c) => a + c.qty, 0)} setIsCartOpen={setIsCartOpen} token={token} handleLogout={handleLogout} userRole={userRole} />
      
      <main className="flex-grow z-10">
        {view === 'home' && <Home setView={setView} setSelectedProductId={setSelectedProductId} />}
        {view === 'detail' && <ProductDetail productId={selectedProductId} addToCart={addToCart} setView={setView} />}
        {view === 'checkout' && <Checkout cart={cart} clearCart={clearCart} setView={setView} token={token} />}
        {view === 'admin' && <AdminDashboard token={token} setView={setView} />}
        {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} setView={setView} />}
      </main>

      <Footer setView={setView} />
      
      <CartSidebar isOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} updateQty={updateQty} setView={setView} />
    </div>
  );
}