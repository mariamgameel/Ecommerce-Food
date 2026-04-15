import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Asset Imports
import burgerImage from "../../../assets/image/burgerRemovebg.png";
import pizzaImage from "../../../assets/image/pizzaRemovebg.png";
import pastaImage from "../../../assets/image/pasta2Remover.png";

export default function Hero() {
    const [items, setItems] = useState([
        { id: 1, src: burgerImage, color: "#f59e0b", title: "Premium", tag: "Beef" },
        { id: 2, src: pizzaImage, color: "#ef4444", title: "Authentic", tag: "Wood-fired" },
        { id: 3, src: pastaImage, color: "#10b981", title: "Fresh", tag: "Handmade" },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setItems((prev) => {
                const newArr = [...prev];
                const lastItem = newArr.pop();
                newArr.unshift(lastItem);
                return newArr;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const getPositionStyles = (index) => {
        switch (index) {
            case 0: return { x: "-85%", scale: 0.6, zIndex: 10, opacity: 0.2, rotate: -20, filter: "blur(8px)" };
            case 1: return { x: "0%", scale: 1.1, zIndex: 30, opacity: 1, rotate: 0, filter: "blur(0px)" };
            case 2: return { x: "85%", scale: 0.6, zIndex: 10, opacity: 0.2, rotate: 20, filter: "blur(8px)" };
            default: return {};
        }
    };

    return (
        <section className="relative w-screen h-screen overflow-hidden bg-[#fafaf9] flex items-center justify-center ">

            {/* Dynamic Background Mesh */}
            <Motion.div
                animate={{ backgroundColor: items[1].color }}
                className="absolute top-[-10%] right-[-10%] w-[50%] h-[70%] opacity-[0.07] blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"
            />

            <div className="px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-[90%] relative z-20 ">

                {/* LEFT SIDE: Enhanced Typography */}
                <div className="flex flex-col justify-center space-y-10 text-center lg:text-left pt-20 lg:pt-0">
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                            <span className="h-[2px] w-12 bg-orange-500/30"></span>
                            <Motion.span
                                key={items[1].title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-orange-600 font-bold tracking-[0.4em] uppercase text-xs"
                            >
                                {items[1].title} Selection
                            </Motion.span>
                        </div>

                        <h1 className="text-7xl lg:text-[100px] font-black text-slate-900 leading-[0.8] tracking-tighter mb-10">
                            Pure <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">Cravings.</span>
                        </h1>

                        <p className="text-slate-500 text-sm lg:text-md max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed opacity-80">
                            The ultimate destination for foodies.<br />
                            Discover handmade delicacies delivered with premium precision.
                        </p>
                    </Motion.div>

                    {/* NEW: Button Design (Pill Shape) */}
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 "
                    >
                        <button className="group relative w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-2xl shadow-slate-200 flex items-center justify-center">
                            <span className="relative z-10">Order Now</span>
                            <i className="fas fa-arrow-right absolute right-4 opacity-0 group-hover:opacity-100 transition-all pt-0"></i>
                        </button>

                        <button className="w-full sm:w-auto bg-white/50 backdrop-blur-sm text-slate-800 border-2 border-slate-200 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                            Explore Menu
                        </button>
                    </Motion.div>

                    {/* NEW: Social Proof / Stats Space Utilization */}
                    <div className="hidden lg:flex items-center gap-10 pt-6 border-t border-slate-100 ">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-600 text-sm font-semibold">
                            <span className="text-orange-600">5k+</span> Happy Customers <br />
                            <span className="text-xs text-slate-400 font-normal">in your neighborhood</span>
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: 3D Stage with Floating Badges */}
                <div className="relative flex justify-center items-center h-full">

                    {/* Floating Info Badge 1 */}
                    <Motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-1/4 -right-4 lg:right-0 bg-white p-2 rounded-3xl shadow-xl z-50 hidden lg:flex items-center gap-4 border border-slate-50"
                    >
                        <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                            <i className="fas fa-bolt"></i>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-bold uppercase">Delivery</p>
                            <p className="text-sm font-black text-slate-800">30 Minutes</p>
                        </div>
                    </Motion.div>

                    {/* Floating Info Badge 2 */}
                    <Motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                        className="absolute bottom-1/4 -left-4 lg:left-0 bg-white p-2 rounded-3xl shadow-xl z-50 hidden lg:flex items-center gap-4 border border-slate-50"
                    >
                        <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                            <i className="fas fa-leaf"></i>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-bold uppercase">Quality</p>
                            <p className="text-sm font-black text-slate-800">100% Organic</p>
                        </div>
                    </Motion.div>

                    <div className="relative w-full h-[70%] flex justify-center items-center">
                        {items.map((item, index) => (
                            <Motion.div
                                key={item.id}
                                layout
                                animate={getPositionStyles(index)}
                                transition={{ type: "spring", stiffness: 70, damping: 14, mass: 1.2 }}
                                className="absolute flex flex-col items-center "
                            >
                                <Motion.div
                                    animate={{ y: [0, -30, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <img
                                        src={item.src}
                                        alt="Food"
                                        className="w-60 h-60 lg:w-[520px] lg:h-[520px] object-contain drop-shadow-[0_80px_70px_rgba(0,0,0,0.15)] "
                                    />
                                    {index === 1 && (
                                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[40%] h-12 bg-black/5 blur-[40px] rounded-full " />
                                    )}
                                </Motion.div>
                            </Motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Aesthetic Lines */}
            <div className="absolute left-0 top-0 h-full w-[1px] bg-slate-100 hidden lg:block ml-20" />
        </section>
    );
}