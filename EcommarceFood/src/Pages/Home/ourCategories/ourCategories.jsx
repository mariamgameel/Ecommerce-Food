import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules';
import { motion as Motion } from 'framer-motion';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/free-mode';

// Asset Imports
import pizzaImg from "../../../assets/image/pizzaCategories.jpeg";
import burgerImg from "../../../assets/image/burgerCategories.jpeg";
import pieImg from "../../../assets/image/pieCategories.jpeg";
import chickenImg from "../../../assets/image/chickenCategories.jpeg";
import pastaImg from "../../../assets/image/pastaCategories.jpeg";
import broastImg from "../../../assets/image/broastCategories.jpeg";
import shawarmaImg from "../../../assets/image/shawarmaCategories.jpeg";
import sandwichesImg from "../../../assets/image/sandwichesCategories.jpeg";
import saladImg from "../../../assets/image/saladCategories.jpeg";
import drinkImg from "../../../assets/image/drinkCategories.jpeg";

const categories = [
    { id: 1, title: 'Pizza', img: pizzaImg, count: '24 Items', color: 'from-orange-500/20' },
    { id: 2, title: 'Burgers', img: burgerImg, count: '18 Items', color: 'from-amber-500/20' },
    { id: 3, title: 'Pies', img: pieImg, count: '12 Items', color: 'from-yellow-500/20' },
    { id: 4, title: 'Chicken', img: chickenImg, count: '15 Items', color: 'from-red-500/20' },
    { id: 5, title: 'Pasta', img: pastaImg, count: '20 Items', color: 'from-emerald-500/20' },
    { id: 6, title: 'Broast', img: broastImg, count: '10 Items', color: 'from-orange-600/20' },
    { id: 7, title: 'Shawarma', img: shawarmaImg, count: '22 Items', color: 'from-yellow-600/20' },
    { id: 8, title: 'Sandwich', img: sandwichesImg, count: '30 Items', color: 'from-slate-500/20' },
    { id: 9, title: 'Salads', img: saladImg, count: '14 Items', color: 'from-green-500/20' },
    { id: 10, title: 'Drinks', img: drinkImg, count: '40 Items', color: 'from-blue-500/20' },
];

export default function OurCategories() {
    return (
        <section className="py-24 bg-[#fafaf9] overflow-hidden relative">
            {/* Artistic Background Text */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-200/30 select-none pointer-events-none uppercase tracking-tighter">
                CATEGORIES
            </div>

            <div className="container mx-auto px-6 relative z-10 mb-16 text-center lg:text-left">
                <Motion.span 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                    Premium Selection
                </Motion.span>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mt-4 tracking-tight">
                    Choose Your <span className="text-orange-500">Vibe.</span>
                </h2>
            </div>

            <div className="relative cursor-grab active:cursor-grabbing">
                <Swiper
                    modules={[Autoplay, FreeMode, Mousewheel]}
                    loop={true}
                    freeMode={{ enabled: true, momentum: true, velocityAllowance: 0.5 }}
                    grabCursor={true}
                    centeredSlides={false}
                    spaceBetween={30}
                    slidesPerView={1.5}
                    speed={8000}
                    autoplay={{ delay: 1, disableOnInteraction: false }}
                    mousewheel={{ forceToAxis: true }}
                    breakpoints={{
                        640: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 4.5 },
                        1440: { slidesPerView: 5.5 },
                    }}
                    className="creative-swiper !overflow-visible"
                >
                    {categories.map((cat, index) => (
                        <SwiperSlide key={cat.id} className="pb-12 pt-12">
                            <Motion.div
                                // Adding vertical stagger based on index
                                animate={{ y: index % 2 === 0 ? [0, -20, 0] : [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 5 + index, ease: "easeInOut" }}
                                className="relative group"
                            >
                                {/* The Card Container */}
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-200 group-hover:-translate-y-4">
                                    
                                    {/* Image with Parallax Hover */}
                                    <img 
                                        src={cat.img} 
                                        alt={cat.title} 
                                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />
                                    
                                    {/* Glassmorphism Content Box */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-[2rem] border border-white/30 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-[10px] pl-4 font-black text-orange-600 uppercase tracking-widest mb-1">{cat.count}</p>
                                        <h3 className="text-xl pl-4 font-black text-slate-900 leading-none">{cat.title}</h3>
                                        
                                        {/* Hidden "Explore" button that pops up */}
                                        {/* <div className="pl-4 h-0 overflow-hidden group-hover:h-8 transition-all duration-500 mt-0 group-hover:mt-3">
                                            <button className="text-xs font-bold flex items-center gap-2 text-slate-800">
                                                VIEW MENU <i className="fas fa-chevron-right text-[10px] text-orange-500"></i>
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </Motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    );
}