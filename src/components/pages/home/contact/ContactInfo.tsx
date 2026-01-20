"use client";

import { useEffect, useState, useRef } from "react";
import { akira } from "@/src/lib/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactInfo({ showElements }: { showElements: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!emailRef.current || !phoneRef.current) return;

    const email = emailRef.current;
    const phone = phoneRef.current;

    // Set initial state - fade in with opacity only
    gsap.set([email, phone], {
      opacity: 0,
    });

    // Create scroll trigger for animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: email.parentElement,
      start: "top bottom",
      onEnter: () => {
        // Animate email and phone with late appearance
        gsap.to(email, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });

        gsap.to(phone, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      },
      onLeaveBack: () => {
        gsap.to([email, phone], {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    return () => scrollTrigger.kill();
  }, [showElements]);

  return (
    <>
      {/* Email */}
      <p
        ref={emailRef}
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "160px" : "320px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          visibility: showElements ? "visible" : "hidden",
        }}
      >
        inventogec@gmail.com
      </p>
      
      {/* Phone Number */}
      <p
        ref={phoneRef}
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "190px" : "370px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          visibility: showElements ? "visible" : "hidden",
        }}
      >
        1234567890
      </p>
    </>
  );
}

