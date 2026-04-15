import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    
    const steps = [
        { title: "Pick Your Crave", desc: "Browse our dynamic menu and select your vibe.", icon: "fa-utensils" },
        { title: "Quick Checkout", desc: "Secure payment via Card, Apple Pay, or Cash.", icon: "fa-credit-card" },
        { title: "Live Tracking", desc: "Watch our riders fly to your door in real-time.", icon: "fa-map-marker-alt" }
    ];

    const contactMethods = [
        { label: "WhatsApp", val: "+20 123 456 789", icon: "fab fa-whatsapp", color: "#25D366" },
        { label: "Phone", val: "010-CRAVE-BITS", icon: "fas fa-phone", color: "#f97316" },
        { label: "Email", val: "hello@cravebits.com", icon: "fas fa-envelope", color: "#3b82f6" }
    ];

    return (
        <main className="bg-[#fafaf9] pt-32 pb-20 overflow-hidden text-slate-900">
            <div className="container mx-auto px-6 lg:px-20">
                
                {/* 1. HEADER */}
                <header className="mb-20 text-center lg:text-left">
                    <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-6xl lg:text-9xl font-black tracking-tighter mt-4"
                    >
                        LET'S <span className="text-orange-500">TALK.</span>
                    </motion.h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* 2. HOW TO ORDER (Left Column) */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        className="lg:col-span-7 bg-white rounded-[4rem] p-10 lg:p-16 shadow-sm border border-slate-100"
                    >
                        <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
                            <span className="w-10 h-1 border-t-4 border-orange-500"></span>
                            HOW TO ORDER
                        </h3>
                        
                        <div className="space-y-12 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-slate-100 -z-10" />
                            
                            {steps.map((step, i) => (
                                <motion.div 
                                    whileHover={{ x: 10 }}
                                    key={i} className="flex gap-8 group"
                                >
                                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors shadow-lg">
                                        <i className={`fas ${step.icon}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black">{step.title}</h4>
                                        <p className="text-slate-400 font-medium mt-1">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* APP ICONS SECTION */}
                        <div className="mt-20 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <p className="font-black text-lg">Pocket Your Cravings</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Available for iOS & Android</p>
                            </div>
                            <div className="flex gap-4">
                                <motion.button whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-100 text-slate-900">
                                    <i className="fab fa-apple text-xl"></i>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-100 text-slate-900">
                                    <i className="fab fa-google-play text-lg"></i>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. LOCATION & CONTACT (Right Column) */}
                    <div className="lg:col-span-5 space-y-10">
                        
                        {/* THE LOCATION CARD */}
                        <motion.div 
                            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                            className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl"
                        >
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-4">Location</h3>
                            <p className="text-3xl font-black leading-tight">
                                Sultan Hussein St, <br/>
                                Ismailia, Egypt.
                            </p>
                            <p className="text-slate-400 mt-6 font-medium">Open Daily: 11:00 AM — 02:00 AM</p>
                            
                            <motion.div 
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="mt-10 w-full aspect-video rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center relative overflow-hidden"
                            >
                                {/* Placeholder for a Stylized Map */}
                                <i className="fas fa-map-marked-alt text-6xl text-white/10"></i>
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                                <button className="absolute bottom-4 right-4 bg-white text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase shadow-xl">
                                    Open Maps
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* CONTACT BUTTONS */}
                        <div className="grid grid-cols-1 gap-4">
                            {contactMethods.map((method, i) => (
                                <motion.a 
                                    href="#" key={i}
                                    whileHover={{ y: -5, borderColor: method.color }}
                                    className="flex items-center justify-between p-8 bg-white rounded-3xl border border-slate-100 shadow-sm group transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div 
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                                            style={{ backgroundColor: method.color }}
                                        >
                                            <i className={method.icon}></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{method.label}</p>
                                            <p className="text-lg font-black">{method.val}</p>
                                        </div>
                                    </div>
                                    <i className="fas fa-arrow-right text-slate-200 group-hover:text-orange-500 transition-colors"></i>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}