import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { useEffect } from "react";

export default function CompletionModal() {
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const [dismissed, setDismissed] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const hasExplorer = unlockedAchievements.includes("explorer");

  useEffect(() => {
    if (hasExplorer && !dismissed) {
      const timer = window.setTimeout(() => setShouldShow(true), 500);
      return () => window.clearTimeout(timer);
    }
  }, [hasExplorer, dismissed]);

  return (
    <AnimatePresence>
      {shouldShow && !dismissed && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDismissed(true)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-strong relative max-w-sm rounded-3xl px-8 py-10 text-center"
          >
            <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-3xl bg-gradient-to-br from-violet-300/40 via-cyan-200/30 to-amber-200/30 blur-2xl" />
            <span className="text-5xl">🏆</span>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-violet-deep)]">
              Achievement Unlocked
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-gradient-aurora">Game Complete</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              You've cleared every chapter in the game — Enterprise, AI, and Growth. Thanks for playing all the
              way through.
            </p>
            <button
              type="button"
              data-cursor="button"
              onClick={() => setDismissed(true)}
              className="mt-6 rounded-full bg-[var(--color-violet-deep)] px-6 py-2.5 text-sm font-semibold text-white"
            >
              Continue Exploring
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
