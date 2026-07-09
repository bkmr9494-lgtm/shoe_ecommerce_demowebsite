import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login({ onLoginSuccess, setView }) {
  const [isLoginState, setIsLoginState] = useState(true); // Toggle between Login and Signup modes
  const [showPassword, setShowPassword] = useState(false);

  // Form values state matrix
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(''); // Clear errors when typing
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Form submission route assignment configuration based on state
    const endpoint = isLoginState ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLoginState
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication operation failed.');
      }

      // Success logic: save user credentials data payload securely
      localStorage.setItem('solex_token', data.token);
      localStorage.setItem('solex_user', JSON.stringify({ name: data.name, email: data.email, role: data.role }));

      // Call the onLoginSuccess callback with token and role
      onLoginSuccess(data.token, data.role);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0B0F19] my-10">
      <div className="max-w-md w-full space-y-8 bg-[#1E293B] border border-gray-800 p-8 rounded-card shadow-xl transition-all duration-300">
        
        {/* Header Branding Panel Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3B82F6] tracking-wider">
            {isLoginState ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            {isLoginState ? 'Access your SoleX premium account profile' : 'Join the elite premium sneaker marketplace'}
          </p>
        </div>

        {/* Dynamic Alert Banner messaging system box */}
        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* User Interaction Form Submission Layout Block */}
        <form className="mt-8 space-y-5" onSubmit={handleFormSubmit}>
          
          {/* Conditional Name Field for Sign Up operation mode only */}
          {!isLoginState && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 block ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  name="name"
                  type="text"
                  required={!isLoginState}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="block w-full pl-10 pr-4 py-3 bg-[#0B0F19]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>
          )}

          {/* Core Email Input Field Container */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 block ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="block w-full pl-10 pr-4 py-3 bg-[#0B0F19]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </div>

          {/* Core Password Secure Input Field Container */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 block ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-3 bg-[#0B0F19]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CTA Primary Command Action processing button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-button shadow-lg shadow-[#3B82F6]/10 flex items-center justify-center gap-2 transition-all group"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{isLoginState ? 'Sign In Securely' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Horizontal Visual Divider panel splits */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-[10px] uppercase font-bold tracking-widest">System Switcher</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Navigation Action View Toggling Footer block */}
        <div className="text-center text-xs">
          <p className="text-gray-400">
            {isLoginState ? "Don't have a workspace account?" : 'Already a registered customer?'}
            <button
              onClick={() => {
                setIsLoginState(!isLoginState);
                setErrorMessage('');
              }}
              className="text-[#3B82F6] hover:underline font-bold ml-1 transition-all"
            >
              {isLoginState ? 'Sign Up Instead' : 'Login Securely'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}