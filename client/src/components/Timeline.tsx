import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import img1 from "@/assets/images/placeholder-1.png";
import img2 from "@/assets/images/placeholder-2.png";
import img3 from "@/assets/images/placeholder-3.png";

const timelineEvents = [
  {
    date: "First Hello",
    title: "Where it all started",
    message: "That first message that changed everything. I still remember the butterflies.",
    image: img1,
  },
  {
    date: "Our First Date",
    title: "Coffee & Conversation",
    message: "Hours felt like minutes. I knew then that you were someone incredibly special.",
    image: img2,
  },
  {
    date: "First Trip Together",
    title: "Chasing Sunsets",
    message: "Exploring the world is better with you by my side. Every sunset felt magical.",
    image: img3,
  },
  {
    date: "The 'I Love You'",
    title: "Three Little Words",
    message: "The moment the world stood still and I finally said what my heart already knew.",
    image: img1, 
  },
  {
    date: "Meeting the Family",
    title: "Nerves & Smiles",
    message: "Seeing you fit so perfectly into my world made me love you even more.",
    image: img2,
  },
  {
    date: "Moving In",
    title: "Our Own Space",
    message: "Turning a house into a home, one memory at a time. I love our life together.",
    image: img3,
  },
  {
    date: "First Anniversary",
    title: "One Year Down",
    message: "A year of growth, laughter, and so much love. Here's to forever.",
    image: img1,
  },
  {
    date: "Today",
    title: "Celebrating You",
    message: "Happy Birthday to my favorite person. You make every day a gift.",
    image: img2,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathData, setPathData] = useState("");
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate winding path based on height and width
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const height = containerRef.current.offsetHeight;
      const width = containerRef.current.offsetWidth;
      const centerX = width / 2;
      const amplitude = Math.min(width * 0.25, 150);
      const frequency = height / 4;

      let d = `M ${centerX} 0`;
      for (let y = 0; y <= height; y += 20) {
        const x = centerX + Math.sin(y / frequency) * amplitude;
        d += ` L ${x} ${y}`;
      }
      setPathData(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathData]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (pathRef.current && pathLength) {
        const point = pathRef.current.getPointAtLength(latest * pathLength);
        setDotPos({ x: point.x, y: point.y });
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, pathLength]);

  return (
    <section 
      id="timeline" 
      ref={containerRef}
      className="py-32 md:py-48 px-4 md:px-8 bg-background relative overflow-hidden" 
      data-testid="section-timeline"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 timeline-vignette" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-32 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-foreground mb-6 italic"
          >
            Our Winding Path
          </motion.h2>
          <p className="text-primary/70 font-sans tracking-widest uppercase text-sm">Every curve tells a story</p>
        </div>

        {/* SVG Winding Path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          {/* Base Path (Dim) */}
          <path
            d={pathData}
            fill="none"
            stroke="rgba(117, 22, 46, 0.15)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glowing Lit Path */}
          <motion.path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#75162E"
            strokeWidth="4"
            strokeLinecap="round"
            className="glow-path"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: useTransform(smoothProgress, [0, 1], [pathLength, 0])
            }}
          />
          {/* Firefly Dot */}
          <motion.circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="6"
            fill="#F2E5C5"
            className="firefly"
            style={{
              filter: "drop-shadow(0 0 10px #C8843A)"
            }}
          />
          <motion.circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="12"
            fill="rgba(200, 132, 58, 0.2)"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        <div className="relative z-10">
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={index} 
              event={event} 
              index={index} 
              pathRef={pathRef}
              pathLength={pathLength}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index, pathRef, pathLength, progress }: any) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false, margin: "-20% 0px -20% 0px" });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  // Calculate vertical position to place along the curve
  useEffect(() => {
    if (pathRef.current && pathLength) {
      const step = pathLength / (timelineEvents.length + 1);
      const point = pathRef.current.getPointAtLength((index + 1) * step);
      setPos({ x: point.x, y: point.y });
    }
  }, [pathLength, index]);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={itemRef}
      className="relative mb-48 md:mb-64 min-h-[400px]"
      style={{ top: 0 }}
    >
      {/* Node Heart Burst */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: '50%' }}
      >
        {isInView && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
            className="text-primary"
          >
            <Heart fill="currentColor" size={32} />
          </motion.div>
        )}
      </div>

      <div className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Photo Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0.05, y: -50, rotate: isEven ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: isEven ? -2 : 2 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2
            }}
            className="polaroid max-w-[280px] md:max-w-sm group"
          >
            <div className="aspect-[4/5] overflow-hidden mb-5">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="font-serif text-center italic text-foreground/60">{event.date}</p>
          </motion.div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 px-6">
          <motion.div
            initial={{ opacity: 0.05, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}
          >
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-primary font-bold mb-4 block">
              {event.date}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
              {event.title}
            </h3>
            <p className="text-lg md:text-2xl font-sans text-foreground/80 font-light italic leading-relaxed">
              "{event.message}"
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}