import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion as Motion } from 'framer-motion';

export default function PopularItems() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/recipes?limit=6');
                setRecipes(response.data.recipes);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section className="py-32 bg-[#fafaf9] relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 blur-[120px] rounded-full -mr-48 -mt-48" />

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                
                {/* Header: Minimalist & Bold */}
                <div className="max-w-2xl mb-20">
                    <Motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <span className="w-12 h-[2px] bg-orange-500"></span>
                        <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs">Trending Now</span>
                    </Motion.div>
                    <h2 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                        Crafted <br /> 
                        <span className="text-orange-500">Masterpieces.</span>
                    </h2>
                </div>

                {/* Grid: 3-Column Luxury Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24">
                    {recipes.map((item, idx) => (
                        <PopularCard key={item.id} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PopularCard({ item, index }) {
    const price = (item.id + 15.99).toFixed(2);
    const rating = Number(item.rating ?? 0);
    const fullStars = Math.max(0, Math.min(5, Math.round(rating)));

    return (
        <Motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -1 }}
            className="group"
        >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-200/30">
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Gradient for text legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                    {/* Cuisine badge */}
                    <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                            {item.cuisine}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-sm font-bold text-slate-900 shadow-sm">
                        <span className="text-orange-500">★</span>
                        <span>{rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-medium">
                            ({fullStars}/5)
                        </span>
                    </div>

                    {/* Decorative index */}
                    <span className="absolute -right-2 -top-6 select-none text-[88px] font-black tracking-tighter text-white/15">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {item.name}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Calories</p>
                            <p className="mt-1 font-bold text-slate-900">{item.caloriesPerServing} kcal</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Difficulty</p>
                            <p className="mt-1 font-bold text-slate-900">{item.difficulty}</p>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Price</p>
                            <p className="mt-1 text-2xl font-black text-slate-900">${price}</p>
                        </div>

                        <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-black text-white transition-colors hover:bg-orange-500 active:scale-[0.98]">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Motion.div>
    );
}