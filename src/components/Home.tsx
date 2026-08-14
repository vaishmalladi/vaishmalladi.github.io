import { useEffect, lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useWorldSection } from "../hooks/useWorldSection";
import { scrollToSection } from "../lib/smoothScroll";
import MagneticButton from "./ui/MagneticButton";

const RotatingAvatar = lazy(() => import("./RotatingAvatar"));

const COMPLEX = "complex".split("");

function WordTransform() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="relative inline-flex h-[1.15em] min-w-[6ch] items-center justify-center align-bottom">
      {!revealed ? (
        <span aria-hidden={revealed} className="absolute inset-0 flex justify-center">
          {COMPLEX.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block text-gradient-aurora"
              animate={{
                opacity: 0,
                x: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
                y: -18 - i * 3,
                rotate: (i % 2 === 0 ? 1 : -1) * (14 + i * 4),
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.03, ease: "easeIn" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ) : (
        <motion.span
          className="text-gradient-aurora"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          simple
        </motion.span>
      )}
    </span>
  );
}

export default function Home() {
  const ref = useWorldSection("home");

  return (
    <section
      id="home"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-4 px-6 pb-16 pt-32 lg:flex-row lg:gap-8 lg:pt-24"
    >
      <div className="relative z-10 flex-1 text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full glass-panel px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-deep)]"
        >
          Player One
        </motion.span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
          Hi, I'm Vaishnavi.
          <br />
          I simplify <WordTransform /> enterprise systems.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm text-[var(--color-ink-soft)] sm:text-base lg:mx-0">
          Product & Visual Designer with six years of shipping enterprise platforms, AI copilots, and the
          design systems that hold them together.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <MagneticButton
            onClick={() => scrollToSection("projects")}
            className="rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("contact")}
            className="glass-panel rounded-full px-7 py-3.5 font-display text-sm font-semibold text-[var(--color-violet-deep)]"
          >
            Contact Me
          </MagneticButton>
        </div>
      </div>

      <div className="relative z-10 h-[26rem] w-full flex-1 sm:h-[30rem]">
        <Suspense fallback={null}>
          <RotatingAvatar className="h-full w-full" />
        </Suspense>
        <p className="-mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Character select · always rotating
        </p>
      </div>

      <motion.div
        className="absolute bottom-6 z-10 hidden flex-col items-center gap-1 text-[var(--color-ink-faint)] lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll to Explore</span>
        <span>⌄</span>
      </motion.div>
    </section>
  );
}
