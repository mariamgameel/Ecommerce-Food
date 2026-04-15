import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Global CSS import for Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import Card from '../../Pages/Card/Card';
import Sign from '../../Pages/Sign/Sign';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const closePanels = () => setActiveSidePanel(null);

  return (
    <>
      <Motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-10 lg:px-20 ${
          isScrolled
            ? 'py-3 bg-white/95 backdrop-blur-md shadow-md'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          
          {/* 1. LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group z-[110]">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12">
              <i className="fas fa-utensils text-sm md:text-lg"></i>
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
              CRAVE<span className="text-orange-500">BITS</span>
            </span>
          </NavLink>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      text-sm font-bold uppercase tracking-widest transition-colors
                      ${isActive ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SHARED ACTION BUTTONS (Mobile & Desktop) */}
          <div className="flex items-center gap-4 md:gap-6 z-[110]">
            {/* CART ICON */}
            <button 
              onClick={() => setActiveSidePanel('cart')}
              className="relative text-slate-800 hover:text-orange-500 transition-colors p-2"
            >
              <i className="fas fa-shopping-bag text-xl"></i>
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-bold">
                2
              </span>
            </button>
            
            {/* SIGN IN - Hidden on small mobile, visible on tablet/desktop */}
            <button 
              onClick={() => setActiveSidePanel('auth')}
              className="hidden md:block bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-orange-600 transition-all shadow-lg"
            >
              Sign In
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="lg:hidden text-slate-900 text-xl p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden"
            >
              <ul className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-black text-slate-700 hover:text-orange-500 block py-2 uppercase tracking-tight"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <hr className="border-slate-50" />
                {/* SIGN IN FOR MOBILE ONLY */}
                <li className="md:hidden">
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setActiveSidePanel('auth'); }}
                    className="flex items-center gap-3 text-lg font-black text-orange-500 py-2"
                  >
                    <i className="fas fa-user-circle"></i> SIGN IN
                  </button>
                </li>
              </ul>
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.nav>

      {/* SIDE PANEL SYSTEM */}
      <AnimatePresence>
        {activeSidePanel && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanels}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150]"
            />

            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-[100dvh] w-full md:w-[70vw] lg:w-[70vw] bg-white  z-[200] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-1 md:p-1 border-b border-slate-50 ">
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                  {activeSidePanel === 'cart' ? 'My Basket' : 'Welcome'}
                </h2>
                <button 
                  onClick={closePanels}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Dynamic Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {activeSidePanel === 'cart' ? <Card /> : <Sign />}
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}