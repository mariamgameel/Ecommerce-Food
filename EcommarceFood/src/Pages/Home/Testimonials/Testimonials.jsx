import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const reviewsData = [
    {
        id: 1,
        name: "Samantha R.",
        handle: "@sami_bites",
        text: "The Double Patty is life-changing. I don't know what secret spice they use, but I'm absolutely addicted. Fastest delivery too!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=samantha",
        color: "#f97316"
    },
    {
        id: 2,
        name: "Carlos M.",
        handle: "@carloscooks",
        text: "Authentic Italian Pizza vibes in my own living room. The crust is charred perfectly, and the BOGO offer is a total steal.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=carlos",
        color: "#10b981"
    },
    {
        id: 3,
        name: "Priya K.",
        handle: "@priya_eats_daily",
        text: "Found this place via an exclusive offer, and I'm so glad I did. The chicken broast is crispy on the outside, juicy inside. 10/10.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=priya",
        color: "#ef4444"
    },
    {
        id: 4,
        name: "Liam T.",
        handle: "@liam_tasty",
        text: "Their drinks collection is crazy. The hand-crafted lemonade is so refreshing, I order it every day. Pure quality, always fresh.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=liam",
        color: "#3b82f6"
    },
];

export default function Testimonials() {
    const [reviews, setReviews] = useState(reviewsData);

    const swapToNext = () => {
        setReviews((prev) => {
            const nextArr = [...prev];
            const firstItem = nextArr.shift();
            nextArr.push(firstItem);
            return nextArr;
        });
    };

    const swapToPrev = () => {
        setReviews((prev) => {
            const nextArr = [...prev];
            const lastItem = nextArr.pop();
            nextArr.unshift(lastItem);
            return nextArr;
        });
    };

    return (
        <section className="py-32 bg-[#fafaf9] overflow-hidden relative min-h-[850px] flex items-center">
            {/* Minimalist Background Quote */}
            <div className="absolute top-10 left-10 text-[20vw] font-black text-slate-100 select-none pointer-events-none -z-10 leading-none">
                “
            </div>

            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
                
                {/* Text Content */}
                <div className="text-center lg:text-left space-y-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                        <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Our Food Family</span>
                        <h2 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                            Pure <span className="text-orange-500">Love.</span><br />Pure Talk.
                        </h2>
                        <p className="text-slate-400 font-medium text-lg mt-6 max-w-md mx-auto lg:mx-0">
                            Don't just take our word for it—listen to our community. Drag the cards or use the arrows to explore.
                        </p>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                        <button 
                            onClick={swapToPrev}
                            className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm active:scale-90"
                        >
                            <i className="fas fa-chevron-left text-sm"></i>
                        </button>
                        <button 
                            onClick={swapToNext}
                            className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-sm active:scale-90"
                        >
                            <i className="fas fa-chevron-right text-sm"></i>
                        </button>
                    </div>
                </div>

                {/* 3D Drag Deck */}
                <div className="relative h-[480px] w-full flex justify-center items-center">
                    <div className="relative w-full max-w-[480px] h-full">
                        <AnimatePresence mode="popLayout">
                            {reviews.slice(0, 3).reverse().map((review, index) => {
                                const isFront = index === 2;
                                return (
                                    <TestimonialCard 
                                        key={review.id}
                                        review={review}
                                        index={index}
                                        isFront={isFront}
                                        swapToNext={swapToNext}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ review, index, isFront, swapToNext }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-20, 20]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // Stack Logic (Restored to previous structured offset)
    const stackY = index === 2 ? 0 : index === 1 ? 25 : 50;
    const stackScale = index === 2 ? 1 : index === 1 ? 0.94 : 0.88;
    const stackZ = index === 2 ? 30 : index === 1 ? 20 : 10;

    return (
        <motion.div
            style={{ 
                x, 
                rotate: isFront ? rotate : (index === 1 ? -3 : -6), 
                opacity: isFront ? opacity : (index === 1 ? 0.6 : 0.3),
                zIndex: stackZ,
                cursor: isFront ? 'grab' : 'default'
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) swapToNext();
            }}
            whileActive={isFront ? { cursor: "grabbing" } : {}}
            animate={{ y: stackY, scale: stackScale }}
            exit={{ 
                x: x.get() > 0 ? 400 : -400, 
                opacity: 0, 
                scale: 0.5, 
                transition: { duration: 0.3 } 
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute inset-0 bg-white rounded-[3rem] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between"
        >
            <div className="flex items-center gap-5">
                <img src={review.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-sm" />
                <div>
                    <h4 className="font-black text-slate-900 text-lg leading-none">{review.name}</h4>
                    <p className="text-slate-400 text-xs mt-1 font-bold">{review.handle}</p>
                </div>
            </div>

            <p className="text-slate-600 text-xl font-medium leading-relaxed italic pr-4">
                "{review.text}"
            </p>

            <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                <div className="flex gap-1 text-orange-500">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-[10px]"></i>
                    ))}
                </div>
                <span className="text-4xl font-black text-slate-100 select-none">
                    0{review.id}
                </span>
            </div>
        </motion.div>
    );
}