import { useEffect } from "react";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Wait for animations/load
    }
  }, []);

  return (
    <main className="w-full overflow-hidden bg-background">
      <Countdown />
      <Timeline />
    </main>
  );
}