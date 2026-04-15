import React from 'react';
import { motion } from 'framer-motion';

// Asset Imports
import burgerImg from "../../../assets/image/burgerRemovebg.png";
import pizzaImg from "../../../assets/image/pizzaRemovebg.png";
import drinkImg from "../../../assets/image/drinkCategories.jpeg";

export default function Offers() {
    return (
        <section className="py-32 bg-[#fafaf9] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-20">
                
                {/* Minimalist Modern Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="w-12 h-[2px] bg-orange-500"></span>
                            <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs">Limited Edition</span>
                        </motion.div>
                        <h2 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                            Big Taste. <br />
                            <span className="text-orange-500">Small Price.</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 font-medium md:text-right max-w-xs leading-relaxed">
                        Our digital-only exclusives are crafted to disappear fast. Grab yours before the timer hits zero.
                    </p>
                </div>

                {/* Bento Grid 2.0 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:h-[700px]">
                    
                    {/* The "Power Card" (Main Offer) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="md:col-span-8 relative rounded-[4rem] bg-slate-900 overflow-hidden group border border-white/10"
                    >
                        {/* Background Animated Gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#f9731633,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="relative z-20 p-12 lg:p-16 h-full flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl mb-8">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Active Now</span>
                                </div>
                                <h3 className="text-white text-6xl lg:text-[100px] font-black leading-none tracking-tighter">
                                    SAVE <span className="text-orange-500 underline decoration-white/20 underline-offset-8">50%</span>
                                </h3>
                                <p className="text-slate-400 text-2xl font-bold mt-6">Double Patty Madness</p>
                            </div>

                            <button className="w-fit bg-orange-500 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-white hover:text-slate-900 transition-all duration-500 active:scale-95 shadow-xl shadow-orange-500/20">
                                Claim My Discount
                            </button>
                        </div>

                        {/* High-End Image Treatment */}
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="absolute -right-16 -bottom-16 w-[60%] pointer-events-none z-10"
                        >
                            <img src={burgerImg} alt="Burger" className="w-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]" />
                        </motion.div>
                    </motion.div>

                    {/* The "Side Stack" */}
                    <div className="md:col-span-4 flex flex-col gap-8">
                        
                        {/* Pizza Reveal Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex-1 bg-white rounded-[3.5rem] p-10 relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100"
                        >
                            <div className="relative z-10">
                                <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">BOGO Offer</span>
                                <h4 className="text-4xl font-black text-slate-900 mt-2">Family <br /> Night</h4>
                            </div>

                            <motion.img 
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                src={pizzaImg} 
                                className="absolute -right-10 -bottom-10 w-52 object-contain"
                            />
                            
                            <button className="absolute bottom-10 left-10 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all group-hover:rotate-12">
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </motion.div>

                        {/* Glass/Utility Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex-1 bg-orange-500 rounded-[3.5rem] p-10 flex flex-col justify-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                            
                            <h4 className="text-white text-3xl font-black leading-tight mb-4 relative z-10">
                                Free Delivery <br />
                                <span className="text-orange-200">On all Combos</span>
                            </h4>
                            <div className="bg-white/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl inline-block w-fit relative z-10">
                                <p className="text-white font-bold text-xs uppercase tracking-widest">Code: FASTFOOD</p>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Newsletter: The "Minimalist Bar" */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white border border-slate-100 rounded-[3rem] p-4 pr-4 pl-12 shadow-sm">
                    <p className="text-slate-900 font-black text-lg">Join the Elite Club</p>
                    <div className="lg:col-span-2 flex gap-4">
                        <input 
                            type="text" 
                            placeholder="Drop your email for secret deals..." 
                            className="flex-1 bg-slate-50 px-8 py-5 rounded-[2rem] outline-none text-slate-900 font-medium border border-transparent focus:border-orange-200 transition-all"
                        />
                        <button className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black hover:bg-orange-500 transition-all">
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}