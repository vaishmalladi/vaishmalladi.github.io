import { motion } from "framer-motion";
import { useGameStore, levelFromXp } from "../../store/gameStore";
import { scrollToSection } from "../../lib/smoothScroll";
import { cn } from "../../lib/utils";

const LINKS = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "behance", label: "Behance" },
  { id: "contact", label: "Contact Me" },
];

export default function Navbar() {
  const introComplete = useGameStore((s) => s.introComplete);
  const replayIntro = useGameStore((s) => s.replayIntro);
  const activeWorld = useGameStore((s) => s.activeWorld);
  const xp = useGameStore((s) => s.xp);
  const { level, progress } = levelFromXp(xp);

  if (!introComplete) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-1/2 top-3 z-40 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 sm:top-4 sm:w-[calc(100%-2rem)]"
    >
      <div className="flex h-14 items-center justify-between gap-2 border border-[var(--color-hairline)]/15 bg-[var(--color-surface)]/90 px-3 text-[var(--color-ink)] shadow-[0_12px_35px_rgba(0,0,0,.35)] backdrop-blur-xl sm:px-5">
        <button
          type="button"
          data-cursor="button"
          onClick={() => scrollToSection("home")}
          className="flex flex-none items-center gap-2 font-pixel text-[9px] text-[var(--color-ink)] sm:text-[10px]"
        >
          <span className="flex size-7 items-center justify-center bg-[var(--color-violet)] text-[var(--color-ink-on-accent)]">VM</span>
          <span className="hidden text-[var(--color-ink)]/80 sm:inline">PLAYER 01</span>
        </button>

        <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-3">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              data-cursor="button"
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "relative px-2 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)] sm:px-4 sm:text-xs sm:tracking-[0.14em]",
                activeWorld === link.id
                  ? "text-[var(--color-cyan)] after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:bg-[var(--color-cyan)] after:shadow-[0_0_8px_var(--color-cyan)]"
                  : "text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]",
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex" title={`Level ${level}`}>
            <span className="size-1.5 bg-[var(--color-mint)] shadow-[0_0_7px_var(--color-mint)]" />
            <span className="font-mono text-[9px] font-semibold text-[var(--color-ink)]/60">LVL {String(level).padStart(2, "0")}</span>
            <div className="h-1 w-14 overflow-hidden bg-[var(--color-veil)]/12">
              <motion.div
                className="h-full bg-[var(--color-gold)]"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
          <button
            type="button"
            data-cursor="button"
            onClick={() => {
              scrollToSection("home");
              replayIntro();
            }}
            className="flex size-8 items-center justify-center border border-[var(--color-hairline)]/15 bg-[var(--color-veil)]/[0.04] font-mono text-base text-[var(--color-ink)]/70 transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)]"
            aria-label="Replay landing page"
            title="Replay landing page"
          >
            ↺
          </button>
        </div>
      </div>
    </motion.header>
  );
}
