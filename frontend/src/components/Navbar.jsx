import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';

export default function Navbar({ setView, cartCount, setIsCartOpen, token, handleLogout, userRole }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setView(viewName);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => handleNavClick('home')} className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3B82F6]">
              SoleX
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => handleNavClick('home')} className="text-[#3B82F6] transition-colors">Home</button>
            <button onClick={() => { handleNavClick('home'); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-gray-400 hover:text-white transition-colors">Shop</button>
            <button onClick={() => handleNavClick('admin')} className="text-gray-400 hover:text-white transition-colors">Admin</button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsCartOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#3B82F6] rounded-full scale-90">
                  {cartCount}
                </span>
              )}
            </button>
            
            {token ? (
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={() => handleNavClick('login')} className="p-2 text-gray-400 hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0F19]/95 border-b border-gray-800 px-4 pt-2 pb-4 space-y-2">
          <button onClick={() => handleNavClick('home')} className="block py-2 text-[#3B82F6] font-medium">Home</button>
          <button onClick={() => { handleNavClick('home'); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="block py-2 text-gray-400 hover:text-white font-medium">Shop</button>
          <button onClick={() => handleNavClick('admin')} className="block py-2 text-gray-400 hover:text-white font-medium">Admin</button>
        </div>
      )}
    </nav>
  );
}