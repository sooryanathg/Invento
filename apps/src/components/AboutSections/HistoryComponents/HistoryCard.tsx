"use client";
import Image from "next/image";

export default function HistoryCard({
  imageSrc,
  year,
  className,
  variant = "small"
}: {
  imageSrc: string;
  year?: string;
  className?: string;
  variant?: "small" | "large";
}) {
  const isLarge = variant === "large";

  // Sizes based on variant
  const paddingClass = isLarge ? "p-3 rounded-[2.5rem]" : "p-1.5 rounded-[1rem]";
  const innerRounded = isLarge ? "rounded-[2rem]" : "rounded-[0.8rem]";
  
  const symbolSize = isLarge ? "w-14 h-14" : "w-8 h-8";
  const offset = isLarge ? "top-5 left-2" : "top-3 left-0.5";
  const bottomOffset = isLarge ? "bottom-5 right-2" : "bottom-3 right-0.5";

  return (
    <div
      className={`relative shrink-0 z-10 bg-[#171717] flex flex-col justify-between ${paddingClass} ${className || "w-[13vw] h-[40vh]"}`.trim()}
    >
      {/* Top Left Symbol */}
      <div className={`absolute ${offset} z-20`}>
        <div className={`relative ${symbolSize}`}>
          <Image 
            src="/about/card-symbol-v2.png" 
            alt="Card Symbol" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>

      {/* Image Container */}
      <div className={`relative w-full h-full ${innerRounded} overflow-hidden bg-[#171717]`}>
        <Image
          src={imageSrc}
          alt={`History ${year || "moment"}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 30vw, 15vw"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      </div>

       {/* Bottom Right Symbol */}
       <div className={`absolute ${bottomOffset} z-20`}>
        <div className={`relative ${symbolSize} rotate-180`}>
          <Image 
            src="/about/card-symbol-v2.png" 
            alt="Card Symbol" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>
    </div>
  );
}
