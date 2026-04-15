import React from 'react';
import { motion } from 'framer-motion';

const footerLinks = [
    {
        title: "Explore",
        links: [
            { name: "Our Story", path: "#" },
            { name: "Menu Gallery", path: "#" },
            { name: "Merch Shop", path: "#" },
            { name: "Gift Cards", path: "#" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "FAQ", path: "#" },
            { name: "Delivery Zone", path: "#" },
            { name: "Contact Us", path: "#" },
            { name: "Track Order", path: "#" },
        ],
    },
];

const socialLinks = [
    { icon: "fab fa-instagram", color: "#e1306c", label: "Instagram" },
    { icon: "fab fa-tiktok", color: "#000000", label: "TikTok" },
    { icon: "fab fa-facebook-f", color: "#1877f2", label: "Facebook" },
    { icon: "fab fa-whatsapp", color: "#25d366", label: "WhatsApp" },
];

export default function Footer() {
    return (
        <footer className="relative pt-24 pb-12 bg-white overflow-hidden border-t border-slate-100">
            {/* Background Ambient Glows */}
            <motion.div 
                animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-orange-100 rounded-full blur-[100px] opacity-40 -z-10" 
            />
            <motion.div 
                animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-10 right-10 w-64 h-64 bg-teal-100 rounded-full blur-[80px] opacity-30 -z-10" 
            />

            <div className=" px-6 lg:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-100">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12">
                                <i className="fas fa-utensils text-sm"></i>
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                                Crave<span className="text-orange-500">bits</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mb-8">
                            Redefining fast food by blending gourmet craftsmanship with lightning-fast delivery. Your hunger, handled.
                        </p>
                        
                        <div className="flex gap-3">
                            <motion.button whileHover={{ y: -5 }} className="w-32 bg-slate-900 text-white p-2 rounded-xl flex items-center gap-2 border border-slate-800 shadow-xl">
                                <i className="fab fa-apple text-xl"></i>
                                <div className="text-left">
                                    <p className="text-[8px] opacity-60 uppercase font-bold leading-none">iOS</p>
                                    <p className="text-[10px] font-black">App Store</p>
                                </div>
                            </motion.button>
                            <motion.button whileHover={{ y: -5 }} className="w-32 bg-white text-slate-900 p-2 rounded-xl flex items-center gap-2 border border-slate-200 shadow-md">
                                <i className="fab fa-google-play text-xl"></i>
                                <div className="text-left">
                                    <p className="text-[8px] text-slate-400 uppercase font-bold leading-none">Android</p>
                                    <p className="text-[10px] font-black">Play Store</p>
                                </div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="lg:col-span-2 text-center md:text-left">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.path} className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Block */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black text-white mb-2 italic">Join the Flavors.</h4>
                                <p className="text-slate-400 text-xs mb-6 font-medium">Get exclusive discounts & secret menu access.</p>
                                
                                <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="bg-transparent text-white text-sm px-4 outline-none flex-1 placeholder:text-slate-500"
                                    />
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-orange-500 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                                    >
                                        Join
                                    </motion.button>
                                </div>
                            </div>
                            {/* Decorative internal glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full group-hover:bg-orange-500/40 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
                        © 2026 Cravebits Ismailia. Built for the boldest appetites.
                    </p>
                    
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a 
                                key={social.label}
                                href="#"
                                whileHover={{ y: -5, backgroundColor: social.color }}
                                className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                <i className={social.icon}></i>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}