import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WORLDS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";
import { completionPercent } from "../../store/gameStore";
import { scrollToSection } from "../../lib/smoothScroll";
import { cn } from "../../lib/utils";

const RADIUS = 118;

export default function HoloNav() {
  const [open, setOpen] = useState(false);
  const activeWorld = useGameStore((s) => s.activeWorld);
  const exploredWorlds = useGameStore((s) => s.exploredWorlds);
  const introComplete = useGameStore((s) => s.introComplete);
  const pct = completionPercent(exploredWorlds);

  if (!introComplete) return null;

  const circumference = 2 * Math.PI * 26;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <>
      {/* Minimap dock */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
        <div className="glass-panel flex flex-col items-center gap-3 rounded-full px-2.5 py-4">
          {WORLDS.map((world) => {
            const explored = exploredWorlds.includes(world.id);
            const active = activeWorld === world.id;
            return (
              <button
                key={world.id}
                type="button"
                data-cursor="button"
                onClick={() => scrollToSection(world.id)}
                title={world.name}
                className="group relative flex h-3.5 w-3.5 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    active
                      ? "scale-[1.8] bg-[var(--color-violet)] shadow-[0_0_10px_var(--color-violet)]"
                      : explored
                        ? "bg-[var(--color-violet)]/70"
                        : "bg-[var(--color-ink-faint)]/40",
                  )}
                />
                <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {world.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radial menu */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative h-16 w-16">
          <AnimatePresence>
            {open &&
              WORLDS.map((world, i) => {
                const angle = (Math.PI / 2) * (i / (WORLDS.length - 1)) + Math.PI;
                const x = Math.cos(angle) * RADIUS;
                const y = Math.sin(angle) * RADIUS;
                const explored = exploredWorlds.includes(world.id);
                return (
                  <motion.button
                    key={world.id}
                    type="button"
                    data-cursor="button"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                    animate={{ x, y, opacity: 1, scale: 1 }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.03 }}
                    onClick={() => {
                      scrollToSection(world.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "glass-panel-strong absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg",
                      explored ? "text-[var(--color-violet-deep)]" : "text-[var(--color-ink-faint)]",
                    )}
                    title={world.name}
                  >
                    {world.icon}
                  </motion.button>
                );
              })}
          </AnimatePresence>

          <motion.button
            type="button"
            data-cursor="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            className="glass-panel-strong relative flex h-16 w-16 items-center justify-center rounded-full"
            aria-label="Toggle navigation"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(124,108,255,0.15)" strokeWidth="3" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="var(--color-violet)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              className="font-display text-xl font-semibold text-[var(--color-violet-deep)]"
            >
              {open ? "×" : "◇"}
            </motion.span>
          </motion.button>
        </div>
        <span className="mt-2 block text-center font-mono text-[10px] text-[var(--color-ink-faint)]">{pct}%</span>
      </div>
    </>
  );
}
