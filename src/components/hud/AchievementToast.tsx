import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

export default function AchievementToast() {
  const toastQueue = useGameStore((s) => s.toastQueue);
  const dismissToast = useGameStore((s) => s.dismissToast);
  const current = toastQueue[0];

  useEffect(() => {
    if (!current) return;
    const timer = window.setTimeout(() => dismissToast(), 3200);
    return () => window.clearTimeout(timer);
  }, [current, dismissToast]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-[90] w-full max-w-xs -translate-x-1/2 px-4 sm:left-auto sm:right-6 sm:translate-x-0">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="glass-panel-strong flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            <span className="text-2xl">{current.icon}</span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-violet-deep)]">
                Achievement Unlocked
              </span>
              <span className="font-display text-sm font-semibold">{current.title}</span>
              <span className="text-xs text-[var(--color-ink-soft)]">{current.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
