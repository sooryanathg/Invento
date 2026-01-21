"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQTable from "@/src/components/pages/faq/FAQTable";
import { akira } from "@/src/lib/fonts";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    id: 1,
    question: "What is Invento?",
    answer:
      "Invento, the annual techno-cultural fest of Government Engineering College, Palakkad, is where innovation, creativity, and collaboration collide.",
  },
  {
    id: 2,
    question: "What does Invento offer?",
    answer:
      "Invento offers vibrant mix of events ranging from hackathons and workshops to cultural nights and intellectual games, Invento celebrates the spirit of learning, building, and exploring beyond classrooms.",
  },
  {
    id: 3,
    question: "What is the purpose of Invento?",
    answer:
      "It brings together students from all departments and colleges to showcase their technical skills, creative ideas, and passion for discovery.",
  },
  {
    id: 4,
    question: "Is there customer support?",
    answer:
      "Yes, we offer 24/7 customer support via email, chat, and phone to ensure your success with our platform.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLImageElement>(null);
  const bottomRightRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const spacer = spacerRef.current;
    const bg = bgRef.current;
    const topLeft = topLeftRef.current;
    const bottomRight = bottomRightRef.current;
    const title = titleRef.current;
    const table = tableRef.current;

    if (!container || !spacer || !bg) return;

    const ctx = gsap.context(() => {
      // Initial states with transforms - only set if elements exist
      if (bg) gsap.set(bg, { opacity: 1 });
      if (topLeft) gsap.set(topLeft, { opacity: 0, x: -100 });
      if (bottomRight) gsap.set(bottomRight, { opacity: 0, x: 100, y: 100 });
      if (title) gsap.set(title, { opacity: 0, y: 100 });
      if (table) gsap.set(table, { opacity: 0, y: -100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
          invalidateOnRefresh: true,
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
        },
      });

      // All elements animate simultaneously
      if (bg) tl.to(bg, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0);
      if (topLeft) tl.to(topLeft, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }, 0);
      if (bottomRight) tl.to(bottomRight, { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" }, 0);
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0);
      if (table) tl.to(table, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative w-full h-screen pointer-events-none" />
      <div ref={spacerRef} className="relative w-full h-[400vh] pointer-events-none" />

      <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-20" style={{ display: isVisible ? "block" : "none" }}>
        <div ref={containerRef} className="absolute w-full h-full">
          <div
            ref={bgRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage: "url('/faq/bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Top Left Decoration */}
          <img
            ref={topLeftRef}
            src={typeof window !== "undefined" && window.innerWidth < 1024 ? "/faq/top-left-mob.webp" : "/faq/top-left.webp"}
            alt=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 5,
              pointerEvents: "none",
              width: typeof window !== "undefined" && window.innerWidth < 1024 ? "180px" : "280px",
              height: "auto",
              aspectRatio: "426/480",
            }}
          />

          {/* Bottom Right Decoration */}
          <img
            ref={bottomRightRef}
            src="/faq/bottom-right.webp"
            alt=""
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: 5,
              pointerEvents: "none",
              width: "100%",
              maxWidth: typeof window !== "undefined" && window.innerWidth < 1024 ? "250px" : "426px",
              height: "auto",
              aspectRatio: "426/343",
            }}
          />

          <h1
            ref={titleRef}
            className={akira.className}
            style={{
              position: "absolute",
              width: "291px",
              height: "160px",
              left: typeof window !== "undefined" && window.innerWidth < 1024 ? "20px" : "160px",
              top: typeof window !== "undefined" && window.innerWidth < 1024 ? "140px" : "80px",
              fontStyle: "normal",
              fontWeight: "800",
              fontSize: typeof window !== "undefined" && window.innerWidth < 1024 ? "50px" : "87.94px",
              lineHeight: "160px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              letterSpacing: "2px",
              color: "#FF0000",
              margin: "0",
              zIndex: 10,
            }}
          >
            FAQ<span style={{ fontSize: "0.6em" }}>s</span>
          </h1>

          <div 
            ref={tableRef}
            className="relative z-10 px-4 h-full pt-8 md:-mt-16 pb-32"
          >
            <FAQTable items={faqItems} />
          </div>

          {/* Mobile Contact Button */}
          {typeof window !== "undefined" && window.innerWidth < 1024 && (
            <div
              style={{
                position: "absolute",
                bottom: "32px",
                left: "32px",
                zIndex: 50,
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  marginBottom: "12px",
                  fontFamily: "Inter",
                  width: "128px",
                }}
              >
                Still have any doubts?
              </p>
              <button
                style={{
                  width: "128px",
                  backgroundColor: "#FF0000",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  border: "1px solid #FF0000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Contact us
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

