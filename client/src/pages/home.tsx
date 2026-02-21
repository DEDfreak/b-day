import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";

interface HomeProps {
  isPreview?: boolean;
  onLock?: () => void;
}

export default function Home({ isPreview = false, onLock }: HomeProps) {
  const [isCoundownOver, setIsCountdownOver] = useState(isPreview);

  useEffect(() => {
    // Scroll to top on load
    const hash = window.location.hash;
    if (hash && isCoundownOver) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [isCoundownOver]);

  return (
    <main className="w-full overflow-hidden bg-background relative">
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
      <Countdown
        forceOver={isPreview}
        onFinished={() => setIsCountdownOver(true)}
      />
      {isCoundownOver && <Timeline />}
    </main>
  );
}