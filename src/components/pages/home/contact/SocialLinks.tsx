"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  href: string;
  src: string;
  alt: string;
  left: string;
  mobileLeft?: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/invento_gecpalakkad",
    src: "/contact/ig.svg",
    alt: "Instagram",
    left: "192px",
    mobileLeft: "20px",
  },
  {
    href: "https://youtube.com/@inventogecpalakkad2600",
    src: "/contact/yt.svg",
    alt: "YouTube",
    left: "320px",
    mobileLeft: "95px",
  },
  {
    href: "https://www.facebook.com/share/17kUJeAfrY/",
    src: "/contact/fb.svg",
    alt: "Facebook",
    left: "456px",
    mobileLeft: "170px",
  },
  {
    href: "#",
    src: "/contact/in.svg",
    alt: "LinkedIn",
    left: "592px",
    mobileLeft: "245px",
  },
];

export default function SocialLinks({ showElements }: { showElements: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Set initial state for all links - from top
    linksRefs.current.forEach((link) => {
      if (link) {
        gsap.set(link, {
          y: -150,
          opacity: 0,
        });
      }
    });

    // Create scroll trigger for animation
    const firstLink = linksRefs.current[0];
    if (!firstLink) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: firstLink.parentElement,
      start: "top bottom",
      onEnter: () => {
        if (showElements) {
          linksRefs.current.forEach((link, index) => {
            if (link) {
              gsap.to(link, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: index * 0.1,
              });
            }
          });
        }
      },
      onLeaveBack: () => {
        linksRefs.current.forEach((link) => {
          if (link) {
            gsap.to(link, {
              y: -150,
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

  return (
    <>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          ref={(el) => {
            linksRefs.current[index] = el;
          }}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: isMobile ? link.mobileLeft : link.left,
            top: isMobile ? "110px" : "240px",
            zIndex: 20,
            cursor: "pointer",
            textDecoration: "none",
            visibility: showElements ? "visible" : "hidden",
          }}
        >
          <img
            src={link.src}
            alt={link.alt}
            style={{
              width: "auto",
              height: "40px",
              display: "block",
            }}
          />
        </a>
      ))}
    </>
  );
}

