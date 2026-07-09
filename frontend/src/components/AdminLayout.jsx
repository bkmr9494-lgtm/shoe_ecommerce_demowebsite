import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Active link helper function
  const isActive = (path) => location.pathname === path;

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', path: '/admin/products', icon: ShoppingBag },
    { label: 'Orders Registry', path: '/admin/orders', icon: ClipboardList },
    { label: 'User Base', path: '/admin/users', icon: Users },
  ];

  const handleLogout = () => {
    // Clear auth credentials from state/localStorage here
    localStorage.removeItem('solex_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex">
      
      {/* 📱 Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🧭 SIDEBAR COMPONENT */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1E293B] border-r border-gray-800 flex flex-col justify-between 
        transform transition-transform duration-300 md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div>
          <div className="h-16 px-6 border-b border-gray-800 flex items-center justify-between">
            <Link to="/" className="text-xl font-extrabold text-white tracking-wider flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3B82F6]">SoleX</span>
              <span className="text-[10px] bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-0.5 rounded-full font-semibold border border-[#3B82F6]/30">ADMIN</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group
                    ${active 
                      ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20' 
                      : 'text-gray-400 hover:bg-[#0B0F19]/40 hover:text-white border border-transparent hover:border-gray-800/50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-[#3B82F6]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all ${active ? 'opacity-100 translate-x-0' : 'group-hover:opacity-60 group-hover:translate-x-0'}`} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Account Logout */}
        <div className="p-4 border-t border-gray-800 bg-[#0B0F19]/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Management Header */}
        <header className="h-16 bg-[#1E293B]/60 backdrop-blur-md border-b border-gray-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-sm font-semibold text-gray-400 hidden sm:block">
              Control Panel &bull; <span className="text-white font-normal">System Overview</span>
            </h1>
          </div>

          {/* Admin Avatar Profile Wrapper */}
          <div className="flex items-center gap-3 bg-[#0B0F19]/40 border border-gray-800/80 px-3 py-1.5 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-left hidden xs:block">
              <p className="text-xs font-bold text-white leading-none">Vikas</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Super Admin</p>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content Panel Render Space */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}