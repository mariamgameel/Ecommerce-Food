import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Replace with your actual asset path
import burgerImg from "../../../assets/image/burgerRemovebg.png";

export default function CTASection() {
    // Mouse Interaction for the spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event) => {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const xPct = (event.clientX - left) / width;
        const yPct = (event.clientY - top) / height;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
    const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

    return (
        <section className="py-24 bg-[#fafaf9] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-20">
                
                {/* Main Interactive Container */}
                <motion.div 
                    onMouseMove={handleMouseMove}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] bg-slate-900 overflow-hidden group border border-slate-800 shadow-2xl min-h-[600px] flex items-center"
                >
                    {/* Interactive Spotlight Overlay */}
                    <motion.div 
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(249, 115, 22, 0.15), transparent 80%)`
                        }}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full p-10 lg:p-20 relative z-10">
                        
                        {/* Left Content */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full mb-8"
                            >
                                <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Unlimited Flavor</span>
                            </motion.div>

                            <h2 className="text-5xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                                Ready to <br />
                                <span className="text-orange-500">Crave More?</span>
                            </h2>
                            
                            <p className="text-slate-400 text-lg lg:text-xl font-medium mt-8 max-w-lg leading-relaxed">
                                Join 10,000+ foodies getting gourmet meals delivered in record time. Your first delivery is on us.
                            </p>

                            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-orange-500 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-orange-500/20 transition-colors hover:bg-white hover:text-slate-900"
                                >
                                    Order Now
                                </motion.button>
                                <motion.button 
                                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                    className="border border-white/10 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all"
                                >
                                    View Menu
                                </motion.button>
                            </div>
                        </div>

                        {/* Right Content - Visual Portal */}
                        <div className="lg:col-span-5 flex justify-center items-center relative">
                            {/* Swirling SVG Text Path */}
                            <div className="absolute inset-0 flex items-center justify-center animate-[spin_15s_linear_infinite] pointer-events-none">
                                <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] opacity-20">
                                    <path id="circlePath" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="transparent" />
                                    <text className="text-[14px] font-black uppercase tracking-[1em] fill-white">
                                        <textPath href="#circlePath">
                                            • Fresh • Fast • Delicious • Local • 
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            {/* Masked Image with 3D Tilt */}
                            <motion.div 
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent p-4"
                            >
                                <img 
                                    src={burgerImg} 
                                    alt="Burger" 
                                    className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Trust Bar */}
                <div className="mt-8 flex flex-wrap justify-center gap-12 lg:gap-24">
                    {['24/7 Support', 'Fast Delivery', 'High Quality'].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <i className="fas fa-check-circle text-orange-500 text-sm"></i>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}