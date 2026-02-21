import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock } from "lucide-react";
import { useLocation } from "wouter";

interface AuthPageProps {
    onUnlock: () => void;
}

export default function AuthPage({ onUnlock }: AuthPageProps) {
    const [, setLocation] = useLocation();
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);
    const secret = "rishit i love you so much";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === secret.toLowerCase()) {
            onUnlock();
            setLocation("/");
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#3A000C] p-6 overflow-hidden relative">
            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-primary/10"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            scale: Math.random() * 2 + 1,
                            rotate: Math.random() * 360,
                        }}
                        animate={{
                            y: ["-10%", "110%"],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <Heart fill="currentColor" size={40} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center">
                    <motion.div
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8 relative">
                            <AnimatePresence mode="wait">
                                {input.toLowerCase().trim() === secret.toLowerCase() ? (
                                    <motion.div
                                        key="unlock"
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Unlock size={32} className="text-primary" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="lock"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Lock size={32} className="text-primary/60" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif text-[#F2E5C5] mb-4">
                            Unlock Our Story
                        </h1>
                        <p className="text-primary-foreground/60 font-sans text-sm mb-10 tracking-widest uppercase">
                            Enter the secret phrase
                        </p>

                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type here..."
                                    className="w-full bg-white/5 border-b-2 border-white/10 py-3 text-center text-xl text-[#F2E5C5] placeholder:text-white/10 focus:outline-none focus:border-primary transition-colors font-serif italic"
                                    autoFocus
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-sans tracking-[.2em] uppercase text-sm font-bold shadow-lg hover:bg-primary/90 transition-all"
                            >
                                Enter
                            </motion.button>
                        </form>

                        <div className="mt-8 flex gap-2 text-primary/30">
                            <Heart size={14} fill="currentColor" />
                            <Heart size={14} fill="currentColor" />
                            <Heart size={14} fill="currentColor" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
