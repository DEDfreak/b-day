import { useParams, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents } from "@/lib/data";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect } from "react";

export default function MemoryPage() {
    const { id } = useParams();
    const [, setLocation] = useLocation();
    const memory = timelineEvents.find((m) => m.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!memory) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p>Memory not found.</p>
                <button onClick={() => setLocation("/")}>Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#3A000C] to-[#550B18] text-primary-foreground overflow-x-hidden">
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

                {/* Gallery Section */}
                {memory.gallery && memory.gallery.length > 0 && (
                    <div className="mt-32">
                        <h3 className="text-center font-serif text-3xl italic text-[#F2E5C5] mb-12">More Moments</h3>
                        <div className="flex gap-8 overflow-x-auto pb-12 px-4 no-scrollbar -mx-6 md:mx-0">
                            {memory.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, rotate: 0 }}
                                    className="flex-shrink-0 w-64 md:w-80 bg-white p-4 shadow-xl"
                                >
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
