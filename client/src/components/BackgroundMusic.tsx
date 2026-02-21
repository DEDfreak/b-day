import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import bgMusic from "@/assets/audio/love_bg.mp3";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const attemptPlay = () => {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    console.log("Autoplay blocked, waiting for interaction");
                    setIsPlaying(false);
                });
        };

        // Try immediately
        attemptPlay();

        // Also try on first interaction anywhere on the document
        const handleFirstInteraction = () => {
            if (audio.paused) {
                attemptPlay();
            }
            window.removeEventListener('click', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);

        // Show the button after a small delay
        const timer = setTimeout(() => setIsVisible(true), 1500);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            clearTimeout(timer);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={bgMusic}
                loop
                preload="auto"
            />

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
                    >
                        {/* Status Label - Hidden on small mobile, visible on hover */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileHover={{ width: "auto", opacity: 1 }}
                            className="bg-black/40 backdrop-blur-lg border border-white/10 px-3 py-2 rounded-full hidden md:flex items-center gap-2 overflow-hidden whitespace-nowrap text-white text-xs font-sans tracking-widest uppercase"
                        >
                            <Music size={12} className={isPlaying ? "animate-spin-slow" : ""} />
                            <span>{isPlaying ? "Now Playing: L.O.V.E" : "Music Paused"}</span>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlay}
                            className="w-12 h-12 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.4)] group relative"
                        >
                            <AnimatePresence mode="wait">
                                {isPlaying ? (
                                    <motion.div
                                        key="playing"
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Volume2 size={20} />
                                        {/* Visual Waveform Animation */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 h-3 items-end opacity-40 group-hover:opacity-100 transition-opacity">
                                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-0.5 bg-current rounded-full" />
                                            <motion.div animate={{ height: [8, 4, 8] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-0.5 bg-current rounded-full" />
                                            <motion.div animate={{ height: [4, 10, 4] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-0.5 bg-current rounded-full" />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="muted"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <VolumeX size={20} className="opacity-60" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
