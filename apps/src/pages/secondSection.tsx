"use client";

import Image from "next/image";
import second from "@/public/second.png";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SecondSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=500%",
          scrub: true,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      
      tl.to({}, { duration: 3 })
        .to(sectionRef.current, {
          yPercent: 0,
          duration: 2,
          ease: "none",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="fixed top-0 left-0 w-full h-screen bg-white overflow-hidden z-20"
    >
      <div className="relative w-full h-full">
        <Image
          src={second}
          fill
          className="object-cover"
          alt="Second section"
        />
      </div>
    </section>
  );
}
