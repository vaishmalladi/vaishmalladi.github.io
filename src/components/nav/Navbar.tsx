import { motion } from "framer-motion";
import { useGameStore, levelFromXp } from "../../store/gameStore";
import { scrollToSection } from "../../lib/smoothScroll";
import { cn } from "../../lib/utils";

const LINKS = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact Me" },
];

export default function Navbar() {
  const introComplete = useGameStore((s) => s.introComplete);
  const activeWorld = useGameStore((s) => s.activeWorld);
  const xp = useGameStore((s) => s.xp);
  const { level, progress } = levelFromXp(xp);

  if (!introComplete) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-1/2 top-5 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2"
    >
      <div className="glass-panel-strong flex items-center justify-between gap-3 rounded-full px-4 py-2.5">
        <button
          type="button"
          data-cursor="button"
          onClick={() => scrollToSection("home")}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-display text-sm font-bold text-white"
        >
          VM
        </button>

        <nav className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              data-cursor="button"
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                activeWorld === link.id ? "bg-white/70 text-[var(--color-violet-deep)]" : "text-[var(--color-ink-soft)] hover:bg-white/40",
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden flex-none items-center gap-2 rounded-full bg-white/40 px-3 py-1.5 sm:flex" title={`Level ${level}`}>
          <span className="font-mono text-[10px] font-semibold text-[var(--color-violet-deep)]">Lv.{level}</span>
          <div className="h-1.5 w-14 overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
