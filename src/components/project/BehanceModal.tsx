import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BEHANCE_PROJECTS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";

export default function BehanceModal() {
  const activeBehanceId = useGameStore((s) => s.activeBehanceId);
  const closeBehanceProject = useGameStore((s) => s.closeBehanceProject);
  const project = BEHANCE_PROJECTS.find((p) => p.id === activeBehanceId) ?? null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBehanceProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeBehanceProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[#010204]/90 p-2 backdrop-blur-md sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeBehanceProject()}
        >
          <motion.div
            key={project.id}
            initial={{ scale: 0.92, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden border border-[var(--color-hairline)]/18 bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[0_35px_100px_rgba(0,0,0,.75)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="behance-title"
          >
            <div className="relative aspect-[16/9] w-full flex-none overflow-hidden bg-[var(--color-surface)]">
              <img src={project.cover} alt="" className="size-full object-cover" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-canvas)] via-transparent to-transparent" />
              <button
                type="button"
                data-cursor="button"
                onClick={() => closeBehanceProject()}
                className="absolute right-3 top-3 flex size-9 items-center justify-center border border-white/25 bg-black/50 text-xl leading-none text-white backdrop-blur-sm transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)]"
                aria-label="Close overview"
              >
                ×
              </button>
              <span className="absolute left-4 top-3 border-2 border-[var(--color-cyan)] bg-[var(--color-canvas)]/80 px-2 py-1 font-pixel text-[8px] uppercase tracking-[0.14em] text-[var(--color-cyan)]">
                Behance // Personal Work
              </span>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-ink)]/55">
                {project.year} {project.credit ? `// ${project.credit}` : ""}
              </p>
              <h2 id="behance-title" className="mt-3 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black leading-[0.95]">
                {project.title}
              </h2>
              <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-[var(--color-ink)]/78">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.fields.map((field) => (
                  <span
                    key={field}
                    className="border border-[var(--color-hairline)]/15 bg-[var(--color-veil)]/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink)]/70"
                  >
                    {field}
                  </span>
                ))}
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-cyan)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="pixel-corners mt-8 inline-flex items-center gap-2 border-2 border-[var(--color-ink)] bg-[var(--color-cyan)] px-6 py-3.5 font-pixel text-[9px] text-[var(--color-ink-on-accent)] shadow-[5px_5px_0_var(--color-violet)] transition-transform hover:-translate-y-0.5 sm:text-[10px]"
              >
                View Full Project on Behance ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
