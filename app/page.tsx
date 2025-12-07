import LandingHero from "@/components/LandingHero";
import CharacterGallery from "@/components/CharacterGallery";
import StatsBoard from "@/components/StatsBoard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <LandingHero />
      <StatsBoard />
      <div className="relative z-10 bg-gradient-to-b from-dark-bg to-black">
        <CharacterGallery />
      </div>
    </div>
  );
}
