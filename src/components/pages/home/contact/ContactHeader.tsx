"use client";

import { useEffect, useState, useRef } from "react";
import { akira } from "@/src/lib/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHeader({ showElements }: { showElements: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const title = titleRef.current;

    // Set initial state - from top
    gsap.set(title, {
      y: -150,
      opacity: 0,
    });

    // Create scroll trigger for animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: title.parentElement,
      start: "top bottom",
      onEnter: () => {
        if (showElements) {
          gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      },
      onLeaveBack: () => {
        gsap.to(title, {
          y: -150,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });

    return () => scrollTrigger.kill();
  }, [showElements]);

  return (
    <h1
      ref={titleRef}
      className={akira.className}
      style={{
        position: "absolute",
        width: isMobile ? "90%" : "770px",
        height: "auto",
        left: isMobile ? "10px" : "192px",
        top: isMobile ? "50px" : "130px",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: isMobile ? "36px" : "75px",
        lineHeight: isMobile ? "44px" : "90px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
        visibility: showElements ? "visible" : "hidden",
      }}
    >
      CONTACT US
    </h1>
  );
}

