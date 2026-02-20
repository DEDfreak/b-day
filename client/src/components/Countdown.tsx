import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

// Set target to Feb 22, 2026, midnight
const TARGET_DATE = new Date("2026-02-22T00:00:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = TARGET_DATE - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isZero = timeLeft <= 0;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <section 
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-foreground text-background"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(58, 0, 12, 0.7), rgba(85, 11, 24, 0.9)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      data-testid="section-countdown"
    >
      {/* Floating particles - soft animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30 blur-sm"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              y: -100,
              x: `calc(${Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)}px + ${Math.random() * 100 - 50}px)`,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center gap-10 md:gap-16">
        {!isZero ? (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-primary-foreground tracking-wide italic"
              data-testid="text-countdown-heading"
            >
              Something special is almost here...
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
            >
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((item, i) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="bg-primary/20 backdrop-blur-md border border-primary/40 text-primary-foreground rounded-2xl w-24 h-28 sm:w-28 sm:h-32 md:w-36 md:h-40 flex items-center justify-center shadow-2xl mb-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-5xl sm:text-6xl md:text-8xl font-serif tracking-tighter" data-testid={`text-timer-${item.label.toLowerCase()}`}>
                      {item.value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-sans tracking-[0.25em] uppercase text-primary-foreground/70">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="text-center"
          >
            {/* Sparkles effect */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 bg-primary-foreground rounded-full shadow-[0_0_10px_#F2E5C5]"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0,
                  scale: Math.random() * 3
                }}
                transition={{
                  duration: Math.random() * 2 + 1.5,
                  ease: "easeOut",
                }}
              />
            ))}
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-primary-foreground via-[#F2E5C5] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(242,229,197,0.4)] leading-tight"
              data-testid="text-happy-birthday"
            >
              Happy Birthday, <br/><span className="italic">My Love!</span> 🎂
            </h1>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 cursor-pointer text-primary-foreground/60 hover:text-primary-foreground transition-colors z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
        }}
        data-testid="button-scroll-down"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans">Scroll</span>
        <ChevronDown size={20} strokeWidth={1.5} className="mt-1" />
      </motion.div>
    </section>
  );
}