import { useParams, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents, isMemoryUnlocked } from "@/lib/data";
import { ArrowLeft, Heart, Lock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface MemoryPageProps {
    id?: string;
    onLock?: () => void;
}

export default function MemoryPage({ id: propId, onLock }: MemoryPageProps) {
    const params = useParams();
    const id = propId || params.id;
    const [, setLocation] = useLocation();

    // Check for preview mode in URL
    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = searchParams.get('preview') === 'true';

    const memoryIndex = timelineEvents.findIndex((m) => m.id === id);
    const memory = memoryIndex !== -1 ? timelineEvents[memoryIndex] : null;
    const isUnlocked = isPreview || (memoryIndex !== -1 && isMemoryUnlocked(memoryIndex));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!memory) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <p className="text-2xl font-serif mb-4">Memory not found.</p>
                    <button
                        onClick={() => setLocation("/")}
                        className="text-primary hover:underline font-sans uppercase tracking-widest text-xs"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!isUnlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#3A000C] text-[#F2E5C5] p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                        <Lock size={40} className="text-[#F2E5C5]/40" />
                    </div>
                    <h2 className="text-4xl font-serif italic">Not Yet...</h2>
                    <p className="text-primary-foreground/60 leading-relaxed">
                        This memory is still precious and being kept safe. Check back again later to unlock this chapter of our story.
                    </p>
                    <button
                        onClick={() => setLocation("/")}
                        className="px-8 py-3 bg-[#F2E5C5] text-[#3A000C] rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                    >
                        Back to Timeline
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#3A000C] to-[#550B18] text-primary-foreground overflow-x-hidden relative">
            {/* Background Texture & Decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3F%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Golden Floating Petals */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[#F2E5C5]/10"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "-10%",
                            rotate: Math.random() * 360,
                            scale: Math.random() * 0.5 + 0.3
                        }}
                        animate={{
                            y: "110%",
                            x: (Math.random() * 100 - 50) + "%",
                            rotate: 360
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 15
                        }}
                    >
                        <Heart size={20} fill="currentColor" stroke="none" />
                    </motion.div>
                ))}
            </div>

            {/* Twinkling Golden Dust */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={`dust-${i}`}
                        className="absolute w-1 h-1 bg-[#F2E5C5] rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0
                        }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            {/* Artistic Golden Vines Decor */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#F2E5C5]">
                    <path d="M0 200 C 200 100, 400 300, 600 200 S 900 400, 1000 300" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M1000 700 C 800 800, 600 600, 400 700 S 100 500, 0 600" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="150" cy="180" r="2" fill="currentColor" />
                    <circle cx="450" cy="280" r="1.5" fill="currentColor" />
                    <circle cx="850" cy="380" r="2" fill="currentColor" />
                </svg>
            </div>

            {onLock && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onLock}
                    className="fixed top-6 right-6 z-[100] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-[#F2E5C5] hover:bg-white/20 transition-all shadow-xl"
                >
                    <Lock size={20} />
                </motion.button>
            )}
            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <motion.img
                        src={memory.image}
                        alt={memory.title}
                        animate={{
                            scale: [1, 1.1],
                            x: [0, 20],
                            y: [0, 10]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3A000C]/40 to-[#3A000C]" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-end items-center pb-20 px-6 text-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-5xl md:text-8xl font-serif text-[#F2E5C5] drop-shadow-2xl italic leading-tight"
                    >
                        {memory.title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-primary-foreground/70 uppercase tracking-[0.4em] text-sm md:text-base mt-4"
                    >
                        {memory.date}
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-10 pb-32">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="bg-[#F2E5C5] text-[#3A000C] p-10 md:p-20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                    {/* Decorative element */}
                    <div className="flex justify-center mb-10 text-[#75162E]/20">
                        <Heart size={48} strokeWidth={0.5} />
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-center mb-12 border-b border-[#75162E]/10 pb-12">
                            "{memory.message}"
                        </p>
                        <div className="font-sans text-lg md:text-xl leading-loose whitespace-pre-wrap opacity-90 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#75162E]">
                            {memory.fullStory}
                        </div>
                    </div>

                    {/* Letter closing decorative element */}
                    <div className="mt-16 pt-8 border-t border-[#75162E]/10 text-center italic font-serif text-[#75162E]/60">
                        With all my love
                    </div>
                </motion.div>

                {/* Innovation: Interactive 3D Stack Gallery */}
                {memory.gallery && memory.gallery.length > 0 && (
                    <div className="mt-20 md:mt-40 relative flex flex-col items-center overflow-x-hidden">
                        <h3 className="text-center font-serif text-3xl italic text-[#F2E5C5] mb-12 md:mb-24 px-6">Captured Moments</h3>

                        {/* Mobile Scrollable View / Desktop Stacked View */}
                        <div className="md:hidden w-full flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-10 pb-20 pt-10 gap-10">
                            {memory.gallery.map((img, i) => (
                                <motion.div
                                    key={`mobile-${i}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ margin: "-20%" }}
                                    whileTap={{
                                        scale: 1.05,
                                        rotate: 0,
                                        zIndex: 10,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex-shrink-0 w-[280px] snap-center bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                >
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-3">
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover"
                                            alt={`Moment ${i}`}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="h-4 flex items-center justify-center">
                                        <div className="w-10 h-1 bg-gray-100 rounded-full" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop Stacked View */}
                        <div className="hidden md:flex relative w-full max-w-4xl h-[450px] justify-center items-center">
                            {memory.gallery.map((img, i) => {
                                const rotation = (i - (memory.gallery!.length - 1) / 2) * 20;
                                const xOffset = (i - (memory.gallery!.length - 1) / 2) * 110;

                                return (
                                    <motion.div
                                        key={`desktop-${i}`}
                                        initial={{ opacity: 0, y: 100, rotate: 0, x: 0 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            rotate: rotation,
                                            x: xOffset,
                                            zIndex: i
                                        }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: 0,
                                            y: -50,
                                            x: xOffset,
                                            zIndex: 200,
                                            transition: { duration: 0.4, ease: "easeOut" }
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 60,
                                            damping: 18,
                                            delay: i * 0.1
                                        }}
                                        className="absolute w-80 bg-white p-5 shadow-[0_25px_60px_rgba(0,0,0,0.5)] cursor-pointer"
                                        style={{
                                            transformOrigin: "center center",
                                        }}
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-3">
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover"
                                                alt={`Moment ${i}`}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="h-6 flex items-center justify-center">
                                            <div className="w-12 h-1 bg-gray-100 rounded-full" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <p className="mt-12 md:mt-28 text-[#F2E5C5]/40 text-[10px] tracking-[0.6em] uppercase animate-pulse text-center px-6">
                            {"swipe or tap to explore the memories"}
                        </p>
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-32 flex justify-center">
                    <button
                        onClick={() => setLocation(`/#memory-${memory.id}`)}
                        className="group flex items-center gap-4 text-[#F2E5C5] font-sans tracking-widest uppercase text-sm border border-[#F2E5C5]/20 px-8 py-4 rounded-full hover:bg-[#F2E5C5] hover:text-[#3A000C] transition-all duration-500"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                        Back to Our Story
                    </button>
                </div>
            </section>

            {/* Styled scrollbar for horizontal gallery */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
