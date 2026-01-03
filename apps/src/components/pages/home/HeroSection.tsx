"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";


gsap.registerPlugin(ScrollTrigger);


const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const inventoRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { 
                opacity: 1,
                y: 0,
                delay: 3, 
            },
            {
                opacity: 1,
                y: 400,
                duration: 1,
            }
        );
        gsap.fromTo(
            inventoRef.current,
            {
                scale: 1.5,
                opacity: 1,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
            }
        );

        gsap.fromTo(
            logoRef.current,
            {
                rotateZ: 55,
            },
            {
                rotateZ: 0,
                duration: 1,
            }
        )

    }, []);


    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"],
    });

    const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);

    const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const leftY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
    const rightOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const rightY = useTransform(scrollYProgress, [0, 0.3], [0,-150]);

    return (
        <motion.section
            ref={scrollRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >

            {/* Hero Image */}
            <div
                ref={heroRef} 
                className="absolute z-20 -bottom-28 "
            >
                <Image
                    src="/home/hero1.svg"
                    alt="Fan Art"
                    priority
                    width={1380}
                    height={200}
                />
            </div>
    
            {/* Left Image */}
            <motion.div
                style={{
                    opacity: leftOpacity,
                    y: leftY
                }}
                className="absolute left-0"
            >
                <Image
                    src="/home/left-side.svg"
                    alt="Left Visual"
                    width={350}
                    height={460}
                    className="object-contain opacity-80"
                />
            </motion.div>

            {/* Right Image */}
            <motion.div
                className="absolute right-0"
                style={{
                    opacity: rightOpacity,
                    y: rightY
                }}
            >
                <Image
                    src="/home/right-side.svg"
                    alt="Left Visual"
                    width={350}
                    height={460}
                    className="object-contain opacity-80"
                />
            </motion.div>

            <motion.div 
                style={{
                    scale: titleScale,
                    opacity: titleOpacity,
                    y: titleY
                }} 
                className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl"
            >
                <div ref={logoRef}>
                    <Image
                        src="/home/LOGO.svg"
                        alt="Center Visual"
                        width={300}
                        height={220}
                        className="mt-3"
                    />
                </div>

                <motion.div
                    className="absolute">
                    <h1 
                        ref={inventoRef}
                        className="m-0 p-0 leading-none tracking-tighter"
                    >
                        INVENTO
                    </h1>

                    <h3 className="text-[#FF0000] text-center">
                        JAN 29, 30, 31
                    </h3>
                </motion.div>
            </motion.div>

        </motion.section>
    );
}

export default HeroSection;