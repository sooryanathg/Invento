"use client";

import { useEffect, useState, useRef } from "react";
import { akira } from "@/src/lib/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactAddress({ showElements }: { showElements: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const addressRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!addressRef.current) return;

    const address = addressRef.current;

    // Set initial state - from right
    gsap.set(address, {
      x: 300,
      opacity: 0,
    });

    // Create scroll trigger for animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: address.parentElement,
      start: "top center",
      onEnter: () => {
        gsap.to(address, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      },
      onLeaveBack: () => {
        gsap.to(address, {
          x: 300,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });

    return () => scrollTrigger.kill();
  }, [showElements]);

  return (
    <p
      ref={addressRef}
      className={akira.className}
      style={{
        position: "absolute",
        width: isMobile ? "200px" : "598px",
        height: "auto",
        top: isMobile ? "220px" : "30px",
        right: isMobile ? "20px" : "0",
        left: isMobile ? "auto" : "auto",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: isMobile ? "12px" : "20px",
        lineHeight: isMobile ? "20px" : "30px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
        padding: isMobile ? "10px" : "20px",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        textAlign: isMobile ? "left" : "left",
        visibility: showElements ? "visible" : "hidden",
      }}
    >
      Government Engineering College Sreekrishnapuram, Palakkad, Kerala - 678633
    </p>
  );
}

