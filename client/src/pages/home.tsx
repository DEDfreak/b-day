import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";

interface HomeProps {
  isPreview?: boolean;
}

export default function Home({ isPreview = false }: HomeProps) {
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
    <main className="w-full overflow-hidden bg-background">
      <Countdown
        forceOver={isPreview}
        onFinished={() => setIsCountdownOver(true)}
      />
      {isCoundownOver && <Timeline />}
    </main>
  );
}