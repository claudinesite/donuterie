import { CateringSection } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/CateringSection";
import { ContactSection } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/ContactSection";
import { Footer } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/Footer";
import { Header } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/Header";
import { HeroSection } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/HeroSection";
import { InstagramSection } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/InstagramSection";
import { MenuSection } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/MenuSection";
import { StoryGallery } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/StoryGallery";
import { StoryIntro } from "@/components/sites/madie-es-a92149a5/root-8a5edab2/StoryIntro";

interface WaveDividerProps {
  reverse?: boolean;
  flip?: boolean;
}

function WaveDivider({
  reverse = false,
  flip = false,
}: WaveDividerProps) {
  const sectionColor = "bg-white";
  const wavePath = reverse
    ? "M0 54C188 100 346 103 526 82C733 58 906 68 1062 80C1213 92 1332 88 1440 102V140H0V54Z"
    : "M0 54C188 100 346 103 526 82C733 58 906 68 1062 80C1213 92 1332 88 1440 102V0H0V54Z";

  return (
    <div
      aria-hidden="true"
      className={`relative h-[74px] overflow-hidden sm:h-[104px] lg:h-[138px] ${sectionColor}`}
    >
      <svg
        className={`absolute inset-0 size-full ${flip ? "-scale-x-100" : ""}`}
        preserveAspectRatio="none"
        viewBox="0 0 1440 140"
      >
        <path
          className="fill-white"
          d={wavePath}
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="madie-site">
      <Header />
      <main>
        <HeroSection />
        <StoryIntro />
        <WaveDivider />
        <StoryGallery />
        <WaveDivider reverse flip />
        <MenuSection />
        <CateringSection />
        <InstagramSection />
        <WaveDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
