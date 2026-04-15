import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    
    // Parallax movement for the background outline text
    const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

    return (
        <main className="bg-[#fafaf9] text-slate-900 overflow-hidden selection:bg-orange-500 selection:text-white">
            
            {/* 1. CLEAN KINETIC HERO */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20">
                {/* Massive Parallax Background Text (Subtle Gray) */}
                <motion.div 
                    style={{ x: textX }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 opacity-[0.1]"
                >
                    <h2 className="text-[25vw] font-black leading-none uppercase ">
                        Fresh • Fast  
                    </h2>
                </motion.div>

                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        >
                            <span className="inline-block px-5 py-2 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                                Established 2026
                            </span>
                            <h1 className="text-7xl lg:text-[140px] font-black leading-[0.8] tracking-tighter mb-16">
                                BOLD BY <br />
                                <span className="text-orange-500 italic">NATURE.</span>
                            </h1>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8"
                            >
                                We believe fast food shouldn't be a compromise. It should be a celebration of crisp vegetables, prime cuts, and high-speed culinary engineering.
                            </motion.p>
                            
                            <motion.div 
                                whileHover={{ scale: 1.02, rotate: 2 }}
                                className="relative aspect-video rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)]"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
                                    className="w-full h-full object-cover" 
                                    alt="Fresh Salad" 
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE MODERN BENTO GRID (Light Mode) */}
            <section className="py-32 container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Bento 01: Freshness */}
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 80 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white rounded-[4rem] p-12 lg:p-20 relative overflow-hidden group border border-slate-100 shadow-sm"
                    >
                        <div className="relative z-10">
                            <h3 className="text-6xl font-black mb-8 leading-none italic text-slate-900">01/ <br/>FIELD TO <br/>FORK.</h3>
                            <p className="text-slate-500 text-lg max-w-sm font-medium">Daily harvests from local Ismailia farms delivered to our kitchen before the sun sets.</p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-100/50 blur-3xl rounded-full" />
                    </motion.div>

                    {/* Bento 02: Speed */}
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 80 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-4 bg-slate-900 rounded-[4rem] p-12 flex flex-col justify-between shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                            <i className="fas fa-bolt text-2xl text-white"></i>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white uppercase leading-tight">Lightning <br/>Speed.</h3>
                            <p className="text-slate-400 font-medium mt-4">Average 18-minute delivery window.</p>
                        </div>
                    </motion.div>

                    {/* Bento 03: Massive Counter */}
                    <div className="lg:col-span-12 py-24 bg-white rounded-[4rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-around gap-12 text-center">
                        <div>
                            <p className="text-8xl font-black text-slate-900">50K<span className="text-orange-500">+</span></p>
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mt-2">Active Eaters</p>
                        </div>
                        <div className="h-20 w-[1px] bg-slate-100 hidden lg:block" />
                        <div>
                            <p className="text-8xl font-black text-slate-900">100<span className="text-orange-500">%</span></p>
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mt-2">Natural Items</p>
                        </div>
                        <div className="h-20 w-[1px] bg-slate-100 hidden lg:block" />
                        <div className="max-w-xs">
                            <p className="text-lg font-bold italic text-slate-600">"The digital architecture of this flavor experience is unmatched."</p>
                            <p className="text-[10px] text-orange-500 font-black uppercase mt-4">— TechCrunch Food</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE TEAM (Creative Minimalist) */}
            <section className="py-32">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-8">
                        <h2 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none text-slate-900">
                            THE <span className="text-orange-500">TEAM.</span>
                        </h2>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-slate-900 text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl"
                        >
                            Work with us
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[1, 2, 3].map((i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden mb-8 border border-slate-100">
                                    <img 
                                        src={`https://i.pravatar.cc/800?u=chef_ziad${i}`} 
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                                        alt="Team Member" 
                                    />
                                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900">ZIAD AL-MASRI</h4>
                                <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mt-1">Founder & Head Chef</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}