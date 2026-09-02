import { motion } from "framer-motion";
import { useGameStore, levelFromXp } from "../../store/gameStore";
import { scrollToSection } from "../../lib/smoothScroll";
import { cn } from "../../lib/utils";

const LINKS = [
  { id: "about", label: "About Me", mobileLabel: "About" },
  { id: "projects", label: "Projects", mobileLabel: "Work" },
  { id: "behance", label: "Behance", mobileLabel: "Behance" },
  { id: "contact", label: "Contact Me", mobileLabel: "Contact" },
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
      className="fixed left-1/2 top-2 z-40 w-[calc(100%-1rem)] max-w-7xl -translate-x-1/2 sm:top-4 sm:w-[calc(100%-2rem)]"
    >
      <div className="flex h-14 items-center justify-between gap-1 border border-[var(--color-hairline)]/15 bg-[var(--color-surface)]/90 px-2 text-[var(--color-ink)] shadow-[0_12px_35px_rgba(0,0,0,.35)] backdrop-blur-xl sm:gap-2 sm:px-5">
        <button
          type="button"
          data-cursor="button"
          onClick={() => scrollToSection("home")}
          className="flex min-h-11 flex-none items-center gap-2 font-pixel text-[9px] text-[var(--color-ink)] lg:min-h-0 lg:text-[10px]"
        >
          <span className="flex size-7 items-center justify-center bg-[var(--color-violet)] text-[var(--color-ink-on-accent)]">VM</span>
          <span className="hidden text-[var(--color-ink)]/80 lg:inline">PLAYER 01</span>
        </button>

        <nav className="flex min-w-0 flex-1 items-center justify-evenly md:justify-center md:gap-3">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              data-cursor="button"
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "relative flex min-h-11 items-center whitespace-nowrap px-1 font-mono text-[9px] font-bold uppercase tracking-normal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)] md:min-h-0 md:px-4 md:py-3 md:text-xs md:tracking-[0.14em]",
                activeWorld === link.id
                  ? "text-[var(--color-cyan)] after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:bg-[var(--color-cyan)] after:shadow-[0_0_8px_var(--color-cyan)] md:after:inset-x-2"
                  : "text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]",
              )}
            >
              <span className="md:hidden">{link.mobileLabel}</span>
              <span className="hidden md:inline">{link.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex" title={`Level ${level}`}>
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
            className="flex size-10 items-center justify-center border border-[var(--color-hairline)]/15 bg-[var(--color-veil)]/[0.04] font-mono text-base text-[var(--color-ink)]/70 transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)] sm:size-8"
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
