import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "./lib/smoothScroll";
import AuroraBackground from "./components/background/AuroraBackground";
import CustomCursor from "./components/cursor/CustomCursor";
import BedroomIntro from "./components/intro/BedroomIntro";
import Navbar from "./components/nav/Navbar";
import AchievementToast from "./components/hud/AchievementToast";
import CompletionModal from "./components/hud/CompletionModal";
import MissionModal from "./components/project/MissionModal";
import BehanceModal from "./components/project/BehanceModal";
import Home from "./components/Home";
import AboutMe from "./components/worlds/AboutMe";
import Projects from "./components/worlds/Projects";
import BehanceShowcase from "./components/worlds/BehanceShowcase";
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
      <BedroomIntro />
      <Navbar />
      <AchievementToast />
      <CompletionModal />
      <MissionModal />
      <BehanceModal />

      <main className="relative">
        <Home />
        <AboutMe />
        <Projects />
        <BehanceShowcase />
        <DesignWorkshop />
        <BeyondDesign />
        <ContactPortal />
      </main>
    </>
  );
}

export default App;
