"use client"

import { useEffect, useState } from "react"

const LEAF_IMAGES = [
  "/coming-soon/sakura_flower__1_-removebg-preview.png",
  "/coming-soon/sakura_flower__2_-removebg-preview.png",
  "/coming-soon/sakura_flower__3_-removebg-preview.png",

  "/coming-soon/sakura_flower__4_-removebg-preview.png",
  "/coming-soon/sakura_flower__5_-removebg-preview.png",
  "/coming-soon/sakura_flower__6_-removebg-preview.png",

]

type Leaf = {
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  rotate: number
  tilt: number
  img: string
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 640

    const generated: Leaf[] = Array.from({ length: 42 }).map(() => {
      const img =
        LEAF_IMAGES[Math.floor(Math.random() * LEAF_IMAGES.length)]

      const isPetal = img.includes("sakura") // renamed logic mentally 🌸

      return {
        img,
        left: Math.random() * 60,

        // 👇 THIS is the magic
        size: isPetal
          ? isMobile
            ? 6 + Math.random() * 8    // 🌸 smaller petals on mobile
            : 10 + Math.random() * 14  // 🌸 normal on desktop
          : isMobile
            ? 12 + Math.random() * 10
            : 18 + Math.random() * 20,

        delay: Math.random() * 8,

        duration: isPetal
          ? 18 + Math.random() * 14
          : 14 + Math.random() * 10,

        drift: isPetal
          ? isMobile
            ? 20 + Math.random() * 40
            : 40 + Math.random() * 80
          : 80 + Math.random() * 140,

        rotate: isPetal
          ? 200 + Math.random() * 260
          : 120 + Math.random() * 180,

        tilt: isPetal
          ? 40 + Math.random() * 40
          : 10 + Math.random() * 20,
      }
    })

    // Wrap in setTimeout to avoid synchronous setState warning
    setTimeout(() => setLeaves(generated), 0)
  }, [])


  if (!leaves.length) return null

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-[90%] overflow-hidden z-[15]">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className={`leaf absolute ${
            leaf.img.includes("momiji")
              ? "leaf-petal"
              : "leaf-maple"
          }`}
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            ...({
              "--drift": `${leaf.drift}px`,
              "--rotate": `${leaf.rotate}deg`,
              "--tilt": `${leaf.tilt}deg`,
            } as React.CSSProperties),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={leaf.img} alt="" className="w-full h-auto opacity-90" />
        </span>
      ))}
    </div>
  )
}
