import HeroSection from "../components/pages/home/HeroSection";
import FAQSection from "../components/pages/home/FAQSection";
import ContactSection from "../components/pages/home/ContactSection";
import Preview from "../components/pages/home/preview/Preview";
import ProShow from "../components/pages/home/preview/ProShow";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ProShow />
      <Preview />
      {/*<FAQSection />*/}
      {/*<ContactSection />*/}
    </div>
  );
}
