import { akira } from "@/src/lib/fonts";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavigationLinksProps {
  showElements: boolean;
  title: string;
  titleRight: string;
  titleTop: string;
  links: { text: string; href: string }[];
  linksRight: string;
  linksTop: string;
}

export default function NavigationLinks({
  showElements,
  title,
  titleRight,
  titleTop,
  links,
  linksRight,
  linksTop,
}: NavigationLinksProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallPhone, setIsSmallPhone] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSmallPhone(window.innerWidth < 400);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const titleElement = titleRef.current;

    // Set initial state - from right
    gsap.set(titleElement, {
      x: 300,
      opacity: 0,
    });

    // Set initial state for links - from right with stagger
    linksRefs.current.forEach((link) => {
      if (link) {
        gsap.set(link, {
          x: 300,
          opacity: 0,
        });
      }
    });

    // Create scroll trigger for animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: titleElement.parentElement,
      start: "top center",
      onEnter: () => {
        // Animate title
        gsap.to(titleElement, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });

        // Animate links with stagger
        linksRefs.current.forEach((link, index) => {
          if (link) {
            gsap.to(link, {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.4 + index * 0.1,
            });
          }
        });
      },
      onLeaveBack: () => {
        gsap.to(titleElement, {
          x: 300,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        linksRefs.current.forEach((link) => {
          if (link) {
            gsap.to(link, {
              x: 300,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            });
          }
        });
      },
    });

    return () => scrollTrigger.kill();
  }, [showElements]);

  // For small phones like iPhone SE, move content up
  const titleMobileOffset = isSmallPhone 
    ? (title === "Useful links" ? 240 : title === "About us" ? 110 : 0)
    : (title === "Useful links" ? 350 : title === "About us" ? 200 : 0);
  const linksMobileOffset = isSmallPhone 
    ? (title === "Useful links" ? 210 : title === "About us" ? 80 : 0)
    : (title === "Useful links" ? 320 : title === "About us" ? 170 : 0);
  const titleRightOffset = isMobile ? (title === "Useful links" ? "30px" : title === "About us" ? "30px" : "0px") : titleRight;
  const linksRightOffset = isMobile ? (title === "Useful links" ? "75px" : title === "About us" ? "70px" : "0px") : linksRight;
  
  const finalTitleTop = isMobile ? `${parseInt(titleTop) + titleMobileOffset}px` : titleTop;
  const finalLinksTop = isMobile ? parseInt(linksTop) + linksMobileOffset : parseInt(linksTop);
  const finalTitleRight = isMobile ? titleRightOffset : titleRight;
  const finalLinksRight = isMobile ? linksRightOffset : linksRight;
  const linkGap = isSmallPhone ? 24 : (isMobile ? 30 : 40);

  return (
    <>
      {/* Title */}
      <p
        ref={titleRef}
        className={akira.className}
        style={{
          position: "absolute",
          width: "172px",
          height: "40px",
          right: finalTitleRight,
          top: finalTitleTop,
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "20px",
          lineHeight: isMobile ? "20px" : "40px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          padding: 0,
          whiteSpace: "nowrap",
          visibility: showElements ? "visible" : "hidden",
        }}
      >
        {title}
      </p>
      
      {/* Links */}
      {links.map((link, index) => (
        <a
          key={index}
          ref={(el) => {
            linksRefs.current[index] = el;
          }}
          href={link.href}
          style={{
            position: "absolute",
            width: "131px",
            height: "36px",
            right: finalLinksRight,
            top: `${finalLinksTop + index * linkGap}px`,
            fontFamily: "'Urbanist', sans-serif",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: isMobile ? "16px" : "24px",
            lineHeight: "0px",
            color: "#9E9E9E",
            zIndex: 20,
            margin: 0,
            padding: 0,
            textDecoration: "none",
            whiteSpace: "nowrap",
            visibility: showElements ? "visible" : "hidden",
          }}
        >
          {link.text}
        </a>
      ))}
    </>
  );
}

