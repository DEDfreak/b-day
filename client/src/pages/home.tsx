import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-background">
      <Countdown />
      <Timeline />
    </main>
  );
}