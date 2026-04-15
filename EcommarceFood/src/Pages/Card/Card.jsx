import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Card() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from API
  useEffect(() => {
    fetch('https://dummyjson.com/recipes?limit=5')
      .then((res) => res.json())
      .then((data) => {
        // Adding a 'qty' property since the API doesn't provide one for a cart
        const cartMapped = data.recipes.map(recipe => ({
          ...recipe,
          qty: 1,
          price: recipe.caloriesPerServing // Using calories as a placeholder for price
        }));
        setItems(cartMapped);
        setLoading(false);
      });
  }, []);

  // 2. Handlers
  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 lg:py-24 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- LEFT: DYNAMIC LIST --- */}
        <div className="lg:col-span-8">
          <header className="mb-12">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900"
            >
              SELECTED <span className="text-orange-500 italic">EATS.</span>
            </motion.h2>
          </header>

          <div className="space-y-8 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all"
                >
                  {/* Recipe Image */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-[2.5rem] shadow-lg group-hover:rotate-3 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                      {item.cuisine} • {item.difficulty}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1 mb-4 leading-tight">{item.name}</h3>
                    
                    {/* Controls Row */}
                    <div className="flex items-center justify-center md:justify-start gap-6">
                       <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-orange-500 shadow-sm transition-all"><i className="fas fa-minus text-[10px]"></i></button>
                          <span className="w-10 text-center font-black text-slate-900">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-orange-500 shadow-sm transition-all"><i className="fas fa-plus text-[10px]"></i></button>
                       </div>
                       <p className="text-xl font-black text-slate-900">{item.price * item.qty} <small className="text-[10px]">EGP</small></p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-6 right-8 md:relative md:top-0 md:right-0 text-slate-200 hover:text-red-500 transition-colors p-2"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- RIGHT: THE GLOSSY SUMMARY --- */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-10">Checkout Info</h4>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                <span>Items Subtotal</span>
                <span className="text-white text-base">{subtotal} EGP</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                <span>Delivery Charge</span>
                <span className="text-white text-base">+ 20 EGP</span>
              </div>
              
              <div className="pt-10 mt-10 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">Total Amount</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter">{subtotal > 0 ? subtotal + 20 : 0}</span>
                  <span className="text-sm font-black uppercase text-slate-400">EGP</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-orange-500 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 mt-8"
              >
                Confirm Order
              </motion.button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-white/20 text-xl">
              <i className="fab fa-cc-apple-pay"></i>
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}