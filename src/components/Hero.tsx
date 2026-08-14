import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorldSection } from "../hooks/useWorldSection";
import { scrollToSection } from "../lib/smoothScroll";
import MagneticButton from "./ui/MagneticButton";
import { PROFILE_STATS } from "../data/content";
import StatCounter from "./ui/StatCounter";

const FloatingField = lazy(() => import("./background/FloatingField"));

const ROLES = ["Product Designer", "Visual Designer", "Systems Thinker", "AI Explorer", "Builder"];

export default function Hero() {
  const ref = useWorldSection("hero");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <Suspense fallback={null}>
        <FloatingField className="pointer-events-none absolute inset-0 opacity-90" variant="hero" />
      </Suspense>

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 rounded-full glass-panel px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-deep)]"
      >
        Player One Has Entered
      </motion.span>

      <h1 className="relative z-10 mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
        Designing worlds where
        <br />
        <span className="text-gradient-aurora">enterprise meets AI</span>
      </h1>

      <div className="relative z-10 mt-5 h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={ROLES[roleIndex]}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="font-display text-lg font-semibold text-[var(--color-ink-soft)] sm:text-xl"
          >
            {ROLES[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="relative z-10 mt-4 max-w-xl text-sm text-[var(--color-ink-soft)] sm:text-base">
        I'm Vaishnavi — I design enterprise platforms, AI copilots, and design systems that make complex
        products feel effortless. Explore my journey as an interactive world below.
      </p>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          onClick={() => scrollToSection("about")}
          className="rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
        >
          Begin the Journey
        </MagneticButton>
        <MagneticButton
          onClick={() => scrollToSection("enterprise")}
          className="glass-panel rounded-full px-7 py-3.5 font-display text-sm font-semibold text-[var(--color-violet-deep)]"
        >
          View Projects
        </MagneticButton>
      </div>

      <div className="relative z-10 mt-14 grid w-full max-w-2xl grid-cols-3 gap-6">
        {PROFILE_STATS.slice(0, 3).map((stat) => (
          <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-[var(--color-ink-faint)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll to Explore</span>
        <span>⌄</span>
      </motion.div>
    </section>
  );
}
