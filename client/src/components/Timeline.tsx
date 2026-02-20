import { motion } from "framer-motion";
import img1 from "@/assets/images/placeholder-1.png";
import img2 from "@/assets/images/placeholder-2.png";
import img3 from "@/assets/images/placeholder-3.png";

const timelineEvents = [
  {
    date: "First Hello",
    title: "Where it all started",
    message: "[Write your message here about how you first met, the butterflies you felt, and the instant connection.]",
    image: img1,
  },
  {
    date: "Our First Date",
    title: "Coffee & Conversation",
    message: "[Write your message here about that first official date, the coffee, the endless talking, and not wanting the night to end.]",
    image: img2,
  },
  {
    date: "First Trip Together",
    title: "Chasing Sunsets",
    message: "[Write your message here about your first getaway. The laughs, the getting lost, the perfect sunset.]",
    image: img3,
  },
  {
    date: "The 'I Love You'",
    title: "Three Little Words",
    message: "[Write your message here about the moment you said I love you. The setting, the feeling, the absolute certainty.]",
    image: img1, 
  },
  {
    date: "Meeting the Family",
    title: "Nerves & Smiles",
    message: "[Write your message here about meeting the family. The nervous laughs, the warm welcomes, the feeling of belonging.]",
    image: img2,
  },
  {
    date: "Moving In",
    title: "Our Own Space",
    message: "[Write your message here about building a home together. The Ikea furniture assembly, the messy cooking, the lazy Sundays.]",
    image: img3,
  },
  {
    date: "First Anniversary",
    title: "One Year Down",
    message: "[Write your message here reflecting on the first year. The growth, the memories, the promise of many more.]",
    image: img1,
  },
  {
    date: "Today",
    title: "Celebrating You",
    message: "[Write your final message here. How much she means to you, your hopes for her birthday, and looking forward to the future.]",
    image: img2,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 md:py-40 px-4 md:px-8 bg-background relative overflow-hidden" data-testid="section-timeline">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground mb-6 italic tracking-tight"
          >
            Our Journey
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "anticipate" }}
            className="w-32 h-[1px] bg-primary mx-auto origin-center"
          />
        </div>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 transform md:-translate-x-1/2" />

          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            // More subtle tilting to look natural
            const tiltAngle = (index % 3 === 0) ? -2 : (index % 2 === 0) ? 3 : -3;

            return (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center mb-24 md:mb-40 ${isEven ? 'md:flex-row-reverse' : ''}`}
                data-testid={`card-timeline-${index}`}
              >
                {/* Timeline Marker (Diamond) */}
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 45 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-sm bg-primary transform -translate-x-[7px] md:-translate-x-1/2 shadow-[0_0_0_6px_rgba(117,22,46,0.15)] z-10"
                />

                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 flex flex-col items-center md:items-start justify-center mt-6 md:mt-0">
                  <div className={`w-full max-w-md flex flex-col ${isEven ? 'md:items-end md:text-right md:pr-20' : 'md:items-start md:text-left md:pl-20'}`}>
                    
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="w-full"
                    >
                      <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-primary/70 mb-3 font-semibold">
                        {event.date}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-6 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-lg md:text-xl font-sans text-foreground/80 leading-relaxed font-light italic">
                        {event.message}
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* Image Side */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 mt-12 md:mt-0 flex justify-center ${isEven ? 'md:justify-start md:pl-20' : 'md:justify-end md:pr-20'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 60, rotate: tiltAngle + 15 }}
                    whileInView={{ opacity: 1, y: 0, rotate: tiltAngle }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                    className="relative"
                  >
                    {/* PHOTO PLACEHOLDER ${index + 1} */}
                    <div className="polaroid max-w-[260px] md:max-w-sm cursor-pointer group">
                      <div className="aspect-[4/5] overflow-hidden mb-5 bg-muted">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                      <p className="font-serif text-center text-foreground/70 italic text-sm md:text-base">
                        {event.date}
                      </p>
                    </div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}