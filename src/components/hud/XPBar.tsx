import { motion } from "framer-motion";
import { useGameStore, levelFromXp } from "../../store/gameStore";

export default function XPBar() {
  const introComplete = useGameStore((s) => s.introComplete);
  const xp = useGameStore((s) => s.xp);
  const { level, progress } = levelFromXp(xp);

  if (!introComplete) return null;

  return (
    <div className="fixed left-5 top-5 z-40">
      <div className="glass-panel flex items-center gap-3 rounded-full py-2 pl-3 pr-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-display text-xs font-bold text-white">
          {level}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
            Level {level}
          </span>
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
