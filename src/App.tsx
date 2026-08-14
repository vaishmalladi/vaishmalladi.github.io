import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "./lib/smoothScroll";
import AuroraBackground from "./components/background/AuroraBackground";
import CustomCursor from "./components/cursor/CustomCursor";
import IntroExperience from "./components/intro/IntroExperience";
import HoloNav from "./components/nav/HoloNav";
import XPBar from "./components/hud/XPBar";
import AchievementToast from "./components/hud/AchievementToast";
import CompletionModal from "./components/hud/CompletionModal";
import MissionModal from "./components/project/MissionModal";
import Hero from "./components/Hero";
import CommandCenter from "./components/worlds/CommandCenter";
import EnterprisePlatform from "./components/worlds/EnterprisePlatform";
import AILab from "./components/worlds/AILab";
import GrowthMission from "./components/worlds/GrowthMission";
import DesignWorkshop from "./components/worlds/DesignWorkshop";
import BeyondDesign from "./components/worlds/BeyondDesign";
import ContactPortal from "./components/ContactPortal";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenisInstance(lenis);

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <>
      <AuroraBackground />
      <div className="noise-overlay" />
      <CustomCursor />
      <IntroExperience />
      <XPBar />
      <HoloNav />
      <AchievementToast />
      <CompletionModal />
      <MissionModal />

      <main className="relative">
        <Hero />
        <CommandCenter />
        <EnterprisePlatform />
        <AILab />
        <GrowthMission />
        <DesignWorkshop />
        <BeyondDesign />
        <ContactPortal />
      </main>
    </>
  );
}

export default App;
