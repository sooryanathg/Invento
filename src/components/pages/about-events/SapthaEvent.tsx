"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SapthaEventDetails from "./SapthaEventDetails";

gsap.registerPlugin(ScrollTrigger);

const SapthaEvent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const ladyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const natyaRef = useRef<HTMLDivElement>(null);
  const taksatiRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entry Animation: Background Image (Zoom out effect)
      gsap.from(bgImageRef.current, {
        scale: 1.3,
        duration: 1.5,
        ease: "power2.out",
      });

      // Entry Animation: Lady Image (Scale up + Fade up)
      gsap.from(ladyRef.current, {
        y: 100,
        scale: 0.5,
        autoAlpha: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      // Entry Animation: Title (Scale up + Fade up)
      gsap.from(titleRef.current, {
        y: 100,
        scale: 0.5, 
        autoAlpha: 0,
        duration: 1.5, 
        ease: "power3.out", 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Increased distance for Posters + Curtain animation
          scrub: 1, 
          pin: true,
        },
      });

      // 1. Background blurs and fades to black
      tl.to(
        bgImageRef.current,
        {
          filter: "blur(20px)",
          opacity: 0,
          duration: 1,
        },
        0
      );

      // 2. Lady image fades out and moves up slightly
      tl.fromTo(
        ladyRef.current,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: -100,
          duration: 0.8,
        },
        0
      );

      // 3. Title moves upward significantly
      tl.fromTo(
        titleRef.current,
        { y: 0, scale: 1 }, 
        {
          y: -530, 
          scale: 0.8, 
          duration: 1,
        },
        0
      );

      // 4. Description Text Fades In
      if (descriptionRef.current) {
          tl.to(descriptionRef.current, {
              autoAlpha: 1,
              duration: 0.5,
              delay: 0.5, 
          }, 0);
      }

      // 5. CLEANUP: Move Title and Description Up
      // Title moves up without fading (kept opaque)
      tl.to(titleRef.current, {
         y: -2000, 
         scale: 0.5,
         duration: 0.5, 
         ease: "power2.in"
      }, ">");

      // Description moves up and fades
      tl.to(descriptionRef.current, {
         y: -1000,
         autoAlpha: 0,
         duration: 0.5, 
         ease: "power2.in"
      }, "<");

      // 6. Natya Poster slides in from Left
      if (natyaRef.current) {
         tl.fromTo(natyaRef.current,
            { x: "-100vw", autoAlpha: 1 }, 
            { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" },
            "<" // Starts WITH Cleanup
         );
      }

      // 7. Natya Moves Up & Taksati Slides in from Right
      if (natyaRef.current && taksatiRef.current) {
          // Move Natya Up
          tl.to(natyaRef.current, {
              y: "-80vh", // Move up slightly
              duration: 1.5,
              ease: "power2.out"
          }, ">");

          // Taksati slides in (Simultaneously)
          tl.fromTo(taksatiRef.current,
            { x: "100vw", autoAlpha: 1 }, 
            { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" },
            "<" // Starts WITH Natya moving up
         );
      }

      // 8. Curtain Effect: Details Section slides up
      if (detailsRef.current) {
          tl.to(detailsRef.current, {
              y: "0%", // Slide up to cover screen
              duration: 1.5,
              ease: "power2.inOut"
          }, ">0.5"); 
      }

    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden">
      
      {/* Background Image */}
      <Image
        ref={bgImageRef}
        src="/about-events/saptha/saptha-bg.webp"
        alt="Saptha Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Container for Lady Image and Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
        
        {/* LADY IMAGE COMPONENT */}
        <div ref={ladyRef} className="relative w-[400px] h-[480px] md:w-[600px] md:h-[700px] z-10 -mt-30"> 
             <Image
                src="/about-events/saptha/sapthalady.webp"
                alt="Saptha Lady"
                fill
                className="object-contain"
                priority
            />
        </div>

        <h1 ref={titleRef} className="font-akira text-white text-6xl md:text-8xl lg:text-[11rem] tracking-wider leading-none -mt-20 z-20">
          SAPTHA
        </h1>
      </div>

      {/* Second Section: Description Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p 
            ref={descriptionRef}
            className="text-white font-urbanist text-center text-base md:text-xl lg:text-3xl w-full max-w-[95vw] px-2 md:px-0 mt-[25vh] z-30 opacity-0 leading-relaxed"
          >
            SAPTHA Art Show brings together seven powerful expressions of creativity, blending art, culture, and
            <br className="block my-2" />
            imagination into one immersive experience.
            <br className="block my-2" />
            Explore stories, emotions, and ideas crafted through colors, forms, and unique perspectives
          </p>
      </div>
      
      {/* Third Section: Posters */}
      <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
           {/* Natya Poster */}
           <div ref={natyaRef} className="absolute left-0 md:left-[5%] top-[10%] w-[90vw] h-[70vh] md:w-[90vw] md:h-[90vh]">
               <Image 
                 src="/about-events/saptha/natya-poster.webp"
                 alt="Natya Poster"
                 fill
                 className="object-contain" // Keep poster ratio
               />
           </div>

           {/* Taksati Poster */}
           <div ref={taksatiRef} className="absolute right-0 md:right-[4%] top-[12%] w-[90vw] h-[70vh] md:w-[90vw] md:h-[90vh]">
               <Image 
                 src="/about-events/saptha/taksati-poster.webp"
                 alt="Taksati Poster"
                 fill
                 className="object-contain"
               />
           </div>
      </div>

      {/* Fourth Section: Event Details (Curtain) */}
      <div 
        ref={detailsRef} 
        className="absolute inset-0 z-50 translate-y-[100%]" // Start off-screen down
      >
        <SapthaEventDetails />
      </div>

    </div>
  );
};

export default SapthaEvent;
