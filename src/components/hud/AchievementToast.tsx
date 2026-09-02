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
    <div className="pointer-events-none fixed bottom-3 left-1/2 z-[90] w-[calc(100%-1rem)] max-w-72 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:right-6 sm:top-6 sm:w-full sm:max-w-xs sm:translate-x-0 sm:px-4">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="glass-panel-strong flex items-center gap-2 rounded-2xl px-3 py-2 sm:gap-3 sm:px-4 sm:py-3"
          >
            <span className="text-xl sm:text-2xl">{current.icon}</span>
            <div className="min-w-0 flex-1">
              <span className="block truncate font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--color-violet-deep)] sm:text-[10px] sm:tracking-[0.25em]">
                Achievement Unlocked
              </span>
              <span className="block truncate font-display text-xs font-semibold sm:text-sm">{current.title}</span>
              <span className="hidden text-xs text-[var(--color-ink-soft)] sm:block">{current.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
