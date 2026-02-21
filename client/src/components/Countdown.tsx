import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

// Set target to Feb 22, 2026, midnight
const TARGET_DATE = new Date("2026-02-22T00:00:00").getTime();

interface CountdownProps {
  forceOver?: boolean;
  onFinished?: () => void;
}

export default function Countdown({ forceOver = false, onFinished }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - Date.now());

  useEffect(() => {
    if (forceOver) return;

    const timer = setInterval(() => {
      const remaining = TARGET_DATE - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        onFinished?.();
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [forceOver, onFinished]);

  const isZero = forceOver || timeLeft <= 0;

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
      {/* Floating particles - Dynamic based on state */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!isZero ? (
          // Countdown Bubbles
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/30 blur-sm"
              initial={{
                x: Math.random() * 100 + "%",
                y: "110%",
                scale: Math.random() * 2 + 1,
              }}
              animate={{ y: "-10%" }}
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
          ))
        ) : (
          <>
            {/* Birthday Hearts */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-primary/40"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "110%",
                  scale: Math.random() * 1 + 0.5,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: "-10%",
                  rotate: Math.random() * 360 + 180,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 10,
                }}
              >
                <Heart fill="currentColor" size={Math.random() * 20 + 10} />
              </motion.div>
            ))}

            {/* Birthday Sparkles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-primary-foreground rounded-full shadow-[0_0_8px_#F2E5C5]"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
        {!isZero ? (
          <div className="flex flex-col items-center gap-10 md:gap-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-primary-foreground tracking-wide italic"
              data-testid="text-countdown-heading"
            >
              Leeshaa's Birthday Countdown...
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
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-6 flex gap-2 text-[#F2E5C5]"
            >
              <Heart fill="currentColor" size={24} className="animate-pulse" />
              <span className="uppercase tracking-[0.5em] text-sm">Today is the day</span>
              <Heart fill="currentColor" size={24} className="animate-pulse" />
            </motion.div>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-primary-foreground via-[#F2E5C5] to-[#D4AF37] drop-shadow-[0_0_30px_rgba(242,229,197,0.4)] leading-tight mb-8"
              data-testid="text-happy-birthday"
            >
              Happy Birthday, <br /><span className="italic">Leeshaa!</span> 🎂
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-primary-foreground/80 font-sans text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed"
            >
              "To the girl, I love the most."
            </motion.p>
          </motion.div>
        )}
      </div>

      {isZero && (
        <motion.div
          className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-4 cursor-pointer text-primary-foreground/60 hover:text-primary-foreground transition-colors z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
          }}
          data-testid="button-scroll-down"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-sans">
            Our Story Starts Here
          </span>
          <div className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center">
            <ChevronDown size={20} strokeWidth={1.5} />
          </div>
        </motion.div>
      )}
    </section>
  );
}
