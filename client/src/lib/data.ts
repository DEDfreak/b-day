import img1 from "@/assets/images/placeholder-1.png";
import img2 from "@/assets/images/placeholder-2.png";
import img3 from "@/assets/images/placeholder-3.png";

import img6 from "@/assets/images/l-mem1.jpeg";
import img7 from "@/assets/images/minion-mem1.jpeg";
import img8 from "@/assets/images/nozu-mem1.jpeg";
import img9 from "@/assets/images/r-mem1.jpeg";
import img10 from "@/assets/images/ss-mem1.jpeg";

import img4 from "@/assets/images/Lb.jpeg";
import img5 from "@/assets/images/lb2.jpeg";
import img11 from "@/assets/images/r&n-mem2.jpeg";
import img12 from "@/assets/images/gf-mem2.jpeg";
import img13 from "@/assets/images/or-mem2.jpeg";

import img15 from "@/assets/images/bik-mem3.jpeg";
import img16 from "@/assets/images/mirror-mem3.jpeg";
import img17 from "@/assets/images/edit-cover-mem3.jpeg";
import img18 from "@/assets/images/conc-mem3.jpeg";
import img19 from "@/assets/images/kiss-mem3.jpeg";


// Set target to Feb 22, 2026, midnight
export const TARGET_DATE = new Date("2026-02-22T00:00:00").getTime();
// Transition speed is 30 minutes in milliseconds
export const UNLOCK_INTERVAL = 90 * 60 * 1000;

export function isMemoryUnlocked(index: number) {
    const now = Date.now();
    const timeSinceStart = now - TARGET_DATE;

    // If it's before the target date, none are unlocked (handled by countdown anyway)
    if (timeSinceStart < 0) return false;

    // Each memory unlocks every 30 minutes, starting 30 mins after midnight
    const unlockedCount = Math.floor(timeSinceStart / UNLOCK_INTERVAL);
    return index < unlockedCount;
}

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
        id: "official-hello",
        date: "Official Hello",
        title: "Where it all started",
        message: "Thank god for aligning all the stars.",
        fullStory: `I remember my life was very chaotic until you entered it. At first, it was just gossip and drama, you enjoyed it, and so did I. Who knew you would become my whole world so soon?

We soon bonded over texts and calls. I started to feel like a kid again. I still remember the butterflies I felt after calling you cute and pretty.

I didn’t know what image of me you had in your mind, but I wanted to show you that I wasn’t a bad person, no matter what kind of situation we were in. Eventually, I developed a huge crush on you. And I won’t lie, I questioned a lot of things, I was afraid to develop one sided feelings, but deep down I knew what I was feeling was pure.

I felt so many things for the first time, things i never thought i would feel, and somethings beyond me imagination. Secretly you were defining what love is for me. Now that i think of it, there were so many green flags. From our conversations, i could quickly gather what kind of a person you are. I had never met someone so mature, understanding, sweet and lovely human like you. Your extreme hotness and beauty were a pile of cherry on top. It felt amazing to feel like a boy again to eagerly wait for your texts and to take intentional pauses before replying, just to avoid looking desperate. And to wonder, does she like me back?`,
        image: img6,
        gallery: [img6, img7, img8, img9, img10]
    },
    {
        id: "first-meetup",
        date: "Our First Meetup",
        title: "Awkward but cute",
        message: "Hours felt like minutes. I knew then that you were special.",
        fullStory: `Telling you that Sokhal lived in Mira Road was my first lie, one I think you’ll approve of. I just wanted an excuse to meet you. I was shit scared. I don’t think I’ve ever been more conscious or nervous than I was that day. Some people might think our story is messed up or complicated, but I think it’s the most amazing love story ever. I love you so much, and I don’t regret any part of it, not even a little.

It was Diwali, and I was on my way to Bhayandar. For the record, I still doubted if liked me back. When I first saw you, I secretly wished you had come in your orange Diwali dress. But maybe it’s good you didn’t… because if you had, it would’ve been way too obvious how much I have fallen for you. Baccha, you were looking so beautiful, and i think it is one of my favourite memories, smoking weed and standing beside you. I wish i could freeze that moment and relive it.

At that point I honestly didn't think we would meet again. I already knew i had started liking you and i didn't want this to be just a fling. The way you consoled me back then, and expressed what you thought about everything is still very important to me. Again, thank god my family decided to go to Mira road and also agreed with taking nozu with us. I knew it was a very difficult day for you and all I wanted was to be there. I'm just glad i could make u feel better. But honestly SO MANY BUTTERFLIES. I mean wtf, you were laying your head on my shoulders, hugging me and feeding me a banana??? 

And then came the moment of our very first KISS. It was the perfect setting. The soft chill car's ac, nozu in your lap, you dressed in traditional, the songs and everything felt so emotional and romantic. I hesitated for a second, but obviously i would have been a fool not to kiss you that day. Things were so complicated but I'm so glad everything worked out eventually. You stayed strong through everything, that made me respect you even more. I will always admire your resolve, intentions, thought process and the things you stand for. You have so much guts. You risked things just to be with me. I knew you were the right person, i just wanted to make u feel the same about me too. Every day has been amazing since. I just had to ask you to be my girlfriend now...`,
        image: img4,
        gallery: [img4, img5, img12, img13, img11]
    },
    {
        id: "i-love-you",
        date: "I love you",
        title: "Three little words",
        message: "I wanted to say it first.",
        fullStory: `I remember when you brought me a pizza, to celebrate my selection into the Hackathon. Leeshaa, You are so goddamn supportive, and i love you so much for it. I think that day when i came back from my internship and i saw you on the road with a pizza in your hand, i think that was the day when i fell in love love with you.

I always notice how much you care about me. You remember little things about me that even I forget myself. You have a very sharp and beautiful memory when it comes to 'us' you know. I love how deeply you care about the smallest things. Somewhere inside me, I always felt the same and being with you brought back a part of me I didn’t even realize I had lost. Those little things started to matter to me again, because with you, they felt worth it. You reminded me that, in the end, it’s the smallest moments that make love feel the most real.

You know about the three little words... I regret not saying it first. I already knew I loved you and I felt that you loved me too. I remember i slipped once and said it accidentally while cutting the call. At the start, we used to almost say it out loud. ("I LIKE YOU SOOO MUCH") Genuinely, i miss that a lot. I felt used to feel so frustrated thinking about if its the right time or not? 

I had everything planned, i was going to say it to you in the Sonu Nigam concert. But ugh. I will never forget that night. 
I think you sounded so adorable on call, struggling to say it out loud. I kind off knew what you were talking about but then i thought i cant steal the moment from you. So 'I' let you say it. You were so flushed and embarassed that you had to take a timeout. hehe. 

Finally, we met at Mood Indigo and it was the first place where we said 'i love you' to each other, in person. We got our pics taken by someone else for the first time, and it was our first concert together. Wow... so many firsts in one day. I enjoy thinking about that day too. You looked stunning, as always. I couldn't keep my eyes off you.
p.s. i loved the makeout too (vvhot&spicy)`,
        image: img17,
        gallery: [img15, img16, img17, img18, img19]
    },
    {
        id: "our-home",
        date: "home",
        title: "Our little Ilaka",
        message: "My heart feels at home.",
        fullStory: `You were fitting so perfectly into my world, and it made me fall for you even more. Life felt so good I’ve always felt, and I still feel, like I have the best girlfriend in the world. 
Our date nights have always been so special to me. Every moment with you feels full. I love the way you dress, and honestly, I love how you make every outfit look so effortlessly beautiful. 

And I love your bold eyeliner skills. I love it when you send me your little “egghead forehead” pics, you look so unbelievably cute and gorgeous. But nothing beats your killer eyes (I'm a FANNN). I’ve always seen so much honesty and innocence in them, they’re sharp, beautiful, and impossible not to get lost in.

I’ll always miss you coming to meet me and Nozu in Bhopal. That used to be my favorite part of the day. All those scooty rides in Bhopal are memories I’ll cherish forever. Exploring the city with you is still one of my favorite memories, because you made everything feel special you always tend do.

There’s something about your presence… when you walk into a room, everything changes. Your aura brings this quiet sense of comfort and safety with you. I become carefree and silly around you. Quoting you, "its like when im w you i miss home a little less. like a lot less actually." I don’t think I ever told you this properly, but I feel the same, cutu. You are my home.

With you i feel like i belong exactly there. It feels warm, real and something i always longed for. I feel greatful for you. And if there is one thing that i know for sure, its that I always and forever want to be with you. Muah!`,
        image: img2,
    },
    {
        id: "secret 5",
        date: "NSFW",
        title: "Hornier than ever",
        message: "Hornier than ever",
        fullStory: `This deserves a separate section in the memory timeline. I don't think I tell you this enough; your touch is fucking electric. Fuck touch, the moment you even smile at me (even with two less tooth), my soldier snaps to attention. 

Recently i was trying to explain a friend what i feel. I eventually came down to: i don't just love you, I'm addicted to your body. You absolute goddess. You are so indulgent. You are like cake and i wanna devour you every time i lay my eyes on you. 

I absolutely love every square inch off you. I wish i could lick each and every curve of yours and suck on your nips all day. I can't wait to start living together, so that i can use as my sex doll anytime and anywhere. Thank fuck you are as freaky as me.

I think very early into our relationship we had discovered 'pleasure'. The kind of pleasure, i thought existed only in unrealistic porn and fantasies. God, i wish i could like eat u up with a spoon and a fork over and over. Honestly, it was so hard to hold back at the start. Each and every day felt like a quest. A quest to explore you lower and lower. 

And then because of your wonderfully, beautifully, gloriously horny self one fine afternoon we had SEX, and honestly? I've been hooked ever since. Addicted in the best way possible. Like nothing else compares, because nothing else does.
You ruined me, and I am so grateful.`,
        image: img3,
    },
    {
        id: "thick-n-thin",
        date: "Thick n thin",
        title: "Rough Nights",
        message: "Love n Fights",
        fullStory: `Yes, our fights are a part of my memory too, because they are just as much a part of us as the good days.
Its true we fight a lot. Fights that are mostly initiated because of my blunders. Fights which push you to break up with me. I am a very stupid person leeshaa, and I tend to do fucked up things. Things I don't mean and those things which make you feel like you hate me. 

Most of them start because of me. My blunders, my stupidity, my habit of doing and saying things I don't mean. Things that hurt you in ways I never intended. Things that make you look at me like you hate me and honestly, in those moments, I don't blame you. I've pushed you to your limit more times than I'd like  to admit. Pushed you to the edge of walking away entirely.

We are both stubborn as hell and we both refuse to back down easily. But somewhere along the way, something changed. I softened slowly and genuinely and changed my ways, and so did you. We started learning each others triggers.

We fight A LOT, sometimes to the point where everything falls apart and it seems like there is no coming back from this, but we always do. Because somewhere beneath all the anger and the hurt, we both know that this is it. You are it for me. And no matter how worse the fight gets the truth does not go anywhere.

Other couples fight too. I know that. But they don't fight for what we fight for. And they don't fight like us that ugly, everything-on-the-table kind of fighting that only happens when the stakes are real. When you love someone so much that losing them feels unbearable. 

Our fights scared me sometimes. But they never once made me want to give up on you. I am really sorry for all the trouble and hurt I have caused you and I hope you can forgive me. I love you.`,
        image: img3,
    },
    {
        id: "secret 3",
        date: "secret",
        title: "Celebrating You",
        message: "Happy Birthday to my favorite person.",
        fullStory: "Today is all about you, Leeshaa. The world became a brighter place the day you were born. I'm so grateful I get to walk through life by your side. You are my best friend, my rock, and my greatest love. Happy Birthday, beautiful. Here's to making a million more memories.",
        image: img2,
    },
];
