import Image from "next/image";
import Link from "next/link";
import EventCard from "../components/EventCard";

const SapthaEventDetails = () => {
    const groupEvents = [
        "event1.webp", "event2.webp", "event3.webp", "event4.webp", "event5.webp", "event6.webp"
    ];

    const soloEvents = [
        "event1.webp", "event2.webp", "event3.webp", "event4.webp", "event5.webp", "event6.webp"
    ];

    return (
      <div className="w-full bg-black text-white flex flex-col items-center justify-start pt-20 pb-60 relative">
        
        {/* Group Events Section */}
        <section className="w-full max-w-7xl px-4 flex flex-col items-center mt-20">
            <h1 className="font-akira text-4xl md:text-6xl text-white mb-40 mt-15 text-center">GROUP EVENTS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 w-full max-w-6xl">
                {groupEvents.map((img, index) => {
                    const isShiftedRow = Math.floor(index / 2) % 2 !== 0; 
                    return (
                        <EventCard 
                            key={index}
                            imageSrc={`/about-events/saptha/group events/${img}`}
                            title="INTER COLLEGE DANCE"
                            date="Friday | 29.Jan.2025"
                            // Adding negative margins to pull rows closer since scale-60 leaves empty space
                            // Increased shifts: Right moves more right (44), Left moves more left (-32)
                            className={`scale-50 -my-65 ${isShiftedRow ? "translate-x-29 md:translate-x-44" : "-translate-x-20 md:-translate-x-32"}`} 
                        />
                    );
                })}
            </div>
        </section>

        {/* Solo Events Section */}
        <section className="w-full max-w-7xl px-4 flex flex-col items-center mt-20">
            <h1 className="font-akira text-4xl md:text-6xl text-white mb-40 mt-25 text-center">SOLO EVENTS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 w-full max-w-6xl">
                {soloEvents.map((img, index) => {
                    const isShiftedRow = Math.floor(index / 2) % 2 !== 0;
                    return (
                        <EventCard 
                            key={index}
                            imageSrc={`/about-events/saptha/solo events/${img}`}
                            title="INTER COLLEGE DANCE"
                            date="Friday | 29.Jan.2025"
                            className={`scale-50 -my-65 ${isShiftedRow ? "translate-x-29 md:translate-x-44" : "-translate-x-20 md:-translate-x-32"}`}
                        />
                    );
                })}
            </div>
        </section>

        {/* Register Button */}
        <div className="w-full flex justify-center mt-40 z-50 relative">
            <Link href="/coming-soon">
                <button className="bg-[#A41F22] text-white font-akira text-xl md:text-3xl px-20 py-6 hover:bg-white hover:text-black transition-colors duration-300">
                    REGISTER HERE
                </button>
            </Link>
        </div>

      </div>
    );
};
  
export default SapthaEventDetails;
