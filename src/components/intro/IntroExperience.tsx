import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

type Phase = "loading" | "ready" | "launching";

export default function IntroExperience() {
  const introComplete = useGameStore((s) => s.introComplete);
  const completeIntro = useGameStore((s) => s.completeIntro);
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (introComplete) return;
    const start = performance.now();
    const duration = 1800;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("ready");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [introComplete]);

  if (introComplete) return null;

  const handleStart = () => {
    setPhase("launching");
    window.setTimeout(() => completeIntro(), 900);
  };

  return (
    <AnimatePresence>
      {phase !== "launching" || !introComplete ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-canvas)]"
          initial={{ opacity: 1 }}
          animate={
            phase === "launching"
              ? { opacity: 0, scale: 1.4, filter: "blur(12px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-overlay opacity-60" />
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-400/40 blur-[90px] animate-pulse-glow" />
          <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/40 blur-[100px] animate-pulse-glow" />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
            animate={phase === "launching" ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--color-ink-faint)]">
              Loading Experience
            </span>
            <h1 className="font-display text-4xl font-semibold sm:text-6xl">
              <span className="text-gradient-aurora">Vaishnavi Malladi</span>
            </h1>
            <p className="max-w-md text-sm text-[var(--color-ink-soft)] sm:text-base">
              Product & Visual Designer — step inside an interactive world built from six years of shipping
              enterprise and AI experiences.
            </p>

            <AnimatePresence mode="wait">
              {phase === "loading" ? (
                <motion.div
                  key="bar"
                  className="flex w-64 flex-col items-center gap-3"
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] via-[var(--color-cyan)] to-[var(--color-mint)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-[var(--color-ink-faint)]">{progress}%</span>
                </motion.div>
              ) : (
                <motion.button
                  key="start"
                  data-cursor="button"
                  onClick={handleStart}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="glass-panel-strong relative rounded-full px-10 py-4 font-display text-lg font-semibold tracking-wide text-[var(--color-violet-deep)]"
                >
                  <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-violet-400/50 blur-2xl" />
                  Press Start
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
