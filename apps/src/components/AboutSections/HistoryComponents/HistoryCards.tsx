"use client";
import HistoryCard from "./HistoryCard";

const historyImages = [
  "/about/history/cards/img1.png",
  "/about/history/cards/img2.png",
  "/about/history/cards/img3.png",
  "/about/history/cards/img4.png",
  "/about/history/cards/img5.png",
  "/about/history/cards/img6.png",
  "/about/history/cards/img7.png",
];

const CARD_CONFIG = {
  highlighted: {
    width: "w-[22vw]",
    height: "h-[64vh]",
    variant: "large" as const,
  },
  normal: {
    width: "w-[12vw]",
    height: "h-[35vh]",
    variant: "small" as const,
  },
};

export default function HistoryCards() {
  return (
    <div className="flex flex-row items-start justify-between w-full">
      {historyImages.map((src, index) => {
        const isHighlighted = index === 2;
        const config = isHighlighted ? CARD_CONFIG.highlighted : CARD_CONFIG.normal;

        return (
          <HistoryCard
            key={index}
            imageSrc={src}
            year={`201${index + 2}`}
            className={`${config.width} ${config.height}`}
            variant={config.variant}
          />
        );
      })}
    </div>
  );
}
