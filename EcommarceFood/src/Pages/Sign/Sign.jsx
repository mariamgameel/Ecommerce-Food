import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sign() {
  const [isLogin, setIsLogin] = useState(true);

  // Desktop sliding variants
  const panelVariants = {
    login: { x: '0%', borderRadius: "40px 100px 100px 40px" },
    signup: { x: '100%', borderRadius: "100px 40px 40px 100px" }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafaf9] flex items-center justify-center p-4 md:p-8">
      
      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-[1000px] min-h-[550px] lg:h-[600px] bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ==========================================
            1. MOBILE DESIGN (Visible only on < lg)
           ========================================== */}
        <div className="lg:hidden w-full flex flex-col h-full">
          {/* Mobile Top Header (Yellow Section) */}
          <div className="bg-orange-400 p-8 text-white text-center rounded-b-[3rem] shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'h-login' : 'h-signup'}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              >
                <h3 className="text-2xl font-black">{isLogin ? 'Welcome Back!' : 'Create Account'}</h3>
                <p className="text-sm text-white/80 mt-1">
                  {isLogin ? 'Sign in to start eating.' : 'Join the flavor revolution.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Form Area */}
          <div className="flex-1 p-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div 
                  key="m-login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none font-bold text-sm" />
                  <input type="password" placeholder="Password" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none font-bold text-sm" />
                  <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl">SIGN IN</button>
                  <p className="text-center text-sm font-bold text-slate-400 mt-4">
                    New here? <span onClick={() => setIsLogin(false)} className="text-orange-500 cursor-pointer underline">Create Account</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="m-signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none font-bold text-sm" />
                  <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none font-bold text-sm" />
                  <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-sm shadow-xl">JOIN NOW</button>
                  <p className="text-center text-sm font-bold text-slate-400 mt-4">
                    Have an account? <span onClick={() => setIsLogin(true)} className="text-orange-500 cursor-pointer underline">Sign In</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ==========================================
            2. DESKTOP DESIGN (Visible only on >= lg)
           ========================================== */}
        {/* Desktop Sign In Form */}
        <div className="hidden lg:flex w-1/2 h-full flex-col justify-center px-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Sign In.</h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">Access your CraveBits dashboard.</p>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm" />
            <input type="password" placeholder="Password" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm" />
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">SIGN IN</button>
          </div>
        </div>

        {/* Desktop Sign Up Form */}
        <div className="hidden lg:flex w-1/2 h-full flex-col justify-center px-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Sign Up.</h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">Be part of the flavor revolution.</p>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm" />
            <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm" />
            <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">CREATE ACCOUNT</button>
          </div>
        </div>

        {/* The Desktop Sliding Panel */}
        <motion.div
          variants={panelVariants}
          animate={isLogin ? "signup" : "login"}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="hidden lg:flex absolute top-0 left-0 w-1/2 h-full bg-orange-400 z-20 flex-col items-center justify-center text-white text-center p-12"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="toS" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                <h3 className="text-3xl font-black mb-4">Hello, Friend!</h3>
                <p className="text-white/80 mb-8">Enter your details and start your journey with us.</p>
                <button onClick={() => setIsLogin(false)} className="px-10 py-3 border-2 border-white rounded-full font-black text-xs uppercase hover:bg-white hover:text-orange-500 transition-all">Sign Up</button>
              </motion.div>
            ) : (
              <motion.div key="toL" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                <h3 className="text-3xl font-black mb-4">Welcome Back!</h3>
                <p className="text-white/80 mb-8">Keep connected with us by signing in with your info.</p>
                <button onClick={() => setIsLogin(true)} className="px-10 py-3 border-2 border-white rounded-full font-black text-xs uppercase hover:bg-white hover:text-orange-500 transition-all">Sign In</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}