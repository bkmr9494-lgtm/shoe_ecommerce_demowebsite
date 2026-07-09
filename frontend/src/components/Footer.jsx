import React from 'react';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RefreshCw 
} from 'lucide-react';

export default function Footer({ setView }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (viewName) => {
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0F19] border-t border-gray-800 text-gray-400 text-sm mt-auto">
      
      {/* 🛡️ TOP VALUE PROP STRIP */}
      <div className="border-b border-gray-800 bg-[#1E293B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 px-4">
            <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Free Secure Delivery</h4>
              <p className="text-xs text-gray-500 mt-0.5">Complimentary express shipping on all orders over $100.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 px-4 border-y md:border-y-0 md:border-x border-gray-800 py-6 md:py-0">
            <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Authenticity Guaranteed</h4>
              <p className="text-xs text-gray-500 mt-0.5">100% verified authentic premium products sourced directly.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 px-4">
            <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">30-Day Returns</h4>
              <p className="text-xs text-gray-500 mt-0.5">Hassle-free size exchanges and physical item drop-offs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 MAIN FOOTER LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <button onClick={() => handleNavClick('home')} className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3B82F6]">
            SoleX
          </button>
          <p className="text-xs leading-relaxed text-gray-500">
            Experience precision engineering wrapped in premium design aesthetics. Elite high-performance footwear crafted for the modern athlete and sneaker enthusiast.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-[#1E293B] border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-[#3B82F6]/40 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-[#1E293B] border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-[#3B82F6]/40 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-[#1E293B] border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-[#3B82F6]/40 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories Navigation */}
        <div>
          <h3 className="text-white font-semibold tracking-wider text-xs uppercase mb-4">Collections</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#shop" className="hover:text-white transition-colors">Running & Speed</a></li>
            <li><a href="#shop" className="hover:text-white transition-colors">Basketball Performance</a></li>
            <li><a href="#shop" className="hover:text-white transition-colors">Casual Streetwear</a></li>
            <li><a href="#shop" className="hover:text-white transition-colors">Limited Drop Releases</a></li>
          </ul>
        </div>

        {/* Account & Administration Links */}
        <div>
          <h3 className="text-white font-semibold tracking-wider text-xs uppercase mb-4">Customer Care</h3>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => handleNavClick('login')} className="hover:text-white transition-colors">Account Sign In</button></li>
            <li><button onClick={() => handleNavClick('checkout')} className="hover:text-white transition-colors">View Cart Checkout</button></li>
            <li><button onClick={() => handleNavClick('admin')} className="hover:text-white transition-colors">Management Dashboard</button></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Shipment Status</a></li>
          </ul>
        </div>

        {/* Official Store Contact Info */}
        <div className="space-y-3.5 text-xs">
          <h3 className="text-white font-semibold tracking-wider text-xs uppercase mb-1">Store Head Office</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
            <span className="text-gray-500 leading-relaxed">Sector 11, Rohini, New Delhi, Delhi 110085</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
            <span className="text-gray-500">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
            <span className="text-gray-500">support@solex-retail.com</span>
          </div>
        </div>

      </div>

      {/* 🏁 BOTTOM COPYRIGHT BAR */}
      <div className="bg-[#070A10] border-t border-gray-900 py-6 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {currentYear} SoleX Premium Retail. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Configurations</a>
          </div>
        </div>
      </div>

    </footer>
  );
}