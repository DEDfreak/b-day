import img1 from "@/assets/images/placeholder-1.png";
import img2 from "@/assets/images/placeholder-2.png";
import img3 from "@/assets/images/placeholder-3.png";
import img4 from "@/assets/images/Lb.jpeg";
import img5 from "@/assets/images/lb2.jpeg";

export interface Memory {
    id: string;
    date: string;
    title: string;
    message: string;
    fullStory: string;
    image: string;
    gallery?: string[];
}

export const timelineEvents: Memory[] = [
    {
        id: "first-hello",
        date: "First Hello",
        title: "Where it all started",
        message: "That first message that changed everything. I still remember the butterflies.",
        fullStory: "It was a quiet evening when that notification popped up. A simple 'hello' that I didn't know would become the most important word in my life. We talked for hours, finding connections in the smallest things. The way you described your day, your passion for music, and that subtle wit—I was hooked before we even met in person.",
        image: img4,
        gallery: [img4, img5, img3]
    },
    {
        id: "first-date",
        date: "Our First Date",
        title: "Coffee & Conversation",
        message: "Hours felt like minutes. I knew then that you were someone incredibly special.",
        fullStory: "I arrived ten minutes early, checking my reflection in every shop window. When you walked in, everything else faded away. We shared a corner table and lost track of time. One coffee turned into a walk in the park, which turned into dinner. I didn't want the night to end, because for the first time, I felt completely 'heard'.",
        image: img2,
        gallery: [img2, img3, img1]
    },
    {
        id: "first-trip",
        date: "First Trip Together",
        title: "Chasing Sunsets",
        message: "Exploring the world is better with you by my side. Every sunset felt magical.",
        fullStory: "Our first weekend away was a whirlwind of maps, snacks, and laughter. We got lost twice, but with you, even being lost felt like an adventure. I remember sitting on that cliffside, watching the sun dip below the horizon, and thinking that no matter where the road goes, as long as you're there, I'm home.",
        image: img3,
        gallery: [img3, img1, img2]
    },
    {
        id: "i-love-you",
        date: "The 'I Love You'",
        title: "Three Little Words",
        message: "The moment the world stood still and I finally said what my heart already knew.",
        fullStory: "It wasn't a grand gesture or a planned speech. It happened on a random Tuesday, while we were just sitting on the couch. I looked at you and realized my life was infinitely better because you were in it. The words just fell out, and when you said them back, I felt a peace I'd never known before.",
        image: img1,
        gallery: [img1, img2]
    },
    {
        id: "meeting-family",
        date: "Meeting the Family",
        title: "Nerves & Smiles",
        message: "Seeing you fit so perfectly into my world made me love you even more.",
        fullStory: "I was so nervous to introduce you, not because I doubted you, but because I wanted them to see the magic I saw. Within minutes, you were laughing with my mom and debating movies with my brother. Seeing you embrace my world so effortlessly made me realize just how perfect we are together.",
        image: img2,
    },
    {
        id: "moving-in",
        date: "Moving In",
        title: "Our Own Space",
        message: "Turning a house into a home, one memory at a time. I love our life together.",
        fullStory: "Boxes everywhere, mismatched furniture, and the smell of fresh paint. It was chaotic and perfect. Learning your morning routines, finding where you like to hide the spare keys, and waking up next to you every day—it's the best chapter yet. Our home is my favorite place in the world.",
        image: img3,
    },
    {
        id: "first-anniversary",
        date: "One Year Down",
        title: "One Year Down",
        message: "A year of growth, laughter, and so much love. Here's to forever.",
        fullStory: "365 days of being yours. We've grown together, supported each other through the hard days, and celebrated the small wins. Looking back at our first photos compared to now, I see two people who found their missing piece. I can't wait for all the years still to come.",
        image: img1,
    },
    {
        id: "today",
        date: "Today",
        title: "Celebrating You",
        message: "Happy Birthday to my favorite person. You make every day a gift.",
        fullStory: "Today is all about you, Leeshaa. The world became a brighter place the day you were born. I'm so grateful I get to walk through life by your side. You are my best friend, my rock, and my greatest love. Happy Birthday, beautiful. Here's to making a million more memories.",
        image: img2,
    },
];
