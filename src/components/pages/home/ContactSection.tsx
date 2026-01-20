"use client";

import { useRef, useState, useEffect } from "react";
import ContactBackground from "./contact/ContactBackground";
import ContactAddress from "./contact/ContactAddress";
import ContactHeader from "./contact/ContactHeader";
import SocialLinks from "./contact/SocialLinks";
import ContactInfo from "./contact/ContactInfo";
import NavigationLinks from "./contact/NavigationLinks";

const leftNavLinks = [
  { text: "The team", href: "#" },
  { text: "Events", href: "#" },
  { text: "FAQ", href: "#" },
  { text: "Contact", href: "#" },
];

const rightNavLinks = [
  { text: "The team", href: "#" },
  { text: "Events", href: "#" },
  { text: "FAQ", href: "#" },
  { text: "Contact", href: "#" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait 1 second before showing elements
          const timer = setTimeout(() => {
            setShowElements(true);
          }, 1000);
          return () => clearTimeout(timer);
        } else {
          setShowElements(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <ContactBackground sectionRef={sectionRef} showElements={showElements} />
      <ContactAddress showElements={showElements} />
      <ContactHeader showElements={showElements} />
      <SocialLinks showElements={showElements} />
      <ContactInfo showElements={showElements} />
      <NavigationLinks
        showElements={showElements}
        title="About us"
        titleRight="400px"
        titleTop="250px"
        links={leftNavLinks}
        linksRight="440px"
        linksTop="320"
      />
      <NavigationLinks
        showElements={showElements}
        title="Useful links"
        titleRight="180px"
        titleTop="250px"
        links={rightNavLinks}
        linksRight="200px"
        linksTop="320"
      />
    </section>
  );
}

