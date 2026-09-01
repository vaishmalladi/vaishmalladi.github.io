import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";

const STAGES = [
  { key: "brief", label: "Mission Brief" },
  { key: "challenge", label: "Challenge" },
  { key: "research", label: "Research" },
  { key: "exploration", label: "Exploration" },
  { key: "iterations", label: "Iterations" },
  { key: "finalDesign", label: "Final Design" },
  { key: "impact", label: "Impact" },
  { key: "learnings", label: "Key Learnings" },
] as const;

export default function MissionModal() {
  const activeProjectId = useGameStore((s) => s.activeProjectId);
  const closeProject = useGameStore((s) => s.closeProject);
  const completeMission = useGameStore((s) => s.completeMission);
  const [scrollProgress, setScrollProgress] = useState<{ projectId: string | null; percent: number }>({
    projectId: null,
    percent: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const project = PROJECTS.find((p) => p.id === activeProjectId) ?? null;
  const chapterNumber = project ? PROJECTS.findIndex((p) => p.id === project.id) + 1 : 0;
  const scrollPct = project?.id === scrollProgress.projectId ? scrollProgress.percent : 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjectId, closeProject]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollProgress({
      projectId: activeProjectId,
      percent: max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0,
    });
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[#010204]/90 p-2 backdrop-blur-md sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeProject()}
        >
          <motion.div
            key={project.id}
            initial={{ scale: 0.92, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full max-h-[940px] w-full max-w-[1280px] flex-col overflow-hidden border border-[var(--color-hairline)]/18 bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[0_35px_100px_rgba(0,0,0,.75)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-title"
          >
            <div className="absolute inset-x-0 top-0 z-30 h-1 bg-[var(--color-veil)]/8">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-violet)] via-[var(--color-gold)] to-[var(--color-cyan)]"
                style={{ width: `${scrollPct}%` }}
              />
            </div>

            <header className="relative z-20 flex min-h-16 items-center justify-between gap-3 border-b border-[var(--color-hairline)]/12 bg-[var(--color-surface)] px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="hidden border-2 border-[var(--color-violet)] px-2 py-1 font-pixel text-[8px] text-[var(--color-violet)] sm:inline">READY</span>
                <div className="min-w-0">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--color-ink)]/55 sm:text-[9px]">
                    Mission briefing // Chapter {String(chapterNumber).padStart(2, "0")}
                  </p>
                  <h2 id="mission-title" className="truncate font-display text-base font-black uppercase sm:text-xl">
                    {project.title}
                  </h2>
                </div>
              </div>
              <div className="flex flex-none items-center gap-3">
                <span className="hidden items-center gap-2 font-mono text-[9px] text-[var(--color-ink)]/55 md:flex">
                  SYS_STATUS: ACTIVE <span className="size-1.5 bg-[var(--color-mint)] shadow-[0_0_8px_var(--color-mint)]" />
                </span>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => closeProject()}
                  className="flex size-9 items-center justify-center border border-[var(--color-hairline)]/20 bg-[var(--color-veil)]/5 text-xl leading-none text-[var(--color-ink)] transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)]"
                  aria-label="Close mission"
                >
                  ×
                </button>
              </div>
            </header>

            <div ref={containerRef} onScroll={handleScroll} data-lenis-prevent className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-7 sm:py-10">
                <div className="grid items-start gap-6 lg:grid-cols-[1fr_390px] lg:gap-10">
                  <div className="pt-1">
                    <p className="font-pixel text-[8px] uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                      {project.year} // {project.tags.join(" + ")}
                    </p>
                    <h3 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,5.8rem)] font-black leading-[0.88] tracking-normal">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-[var(--color-ink)]/78 sm:text-base">
                      {project.tagline}
                    </p>
                    <div className="mt-7 flex items-center gap-4">
                      <span className="h-px w-16 bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">Mission dossier unlocked</span>
                    </div>
                  </div>

                  <aside className="border-2 border-[var(--color-violet)] bg-[var(--color-surface-2)] p-5 shadow-[8px_8px_0_color-mix(in_srgb,var(--color-violet)_12%,transparent)] sm:p-6">
                    <div className="flex items-center justify-between border-b border-[var(--color-hairline)]/12 pb-4">
                      <h4 className="font-pixel text-[10px] text-[var(--color-heading)]">CHAPTER BRIEF</h4>
                      <span className="font-mono text-[9px] text-[var(--color-mint)]">DATA SYNCED</span>
                    </div>
                    <dl className="mt-5 grid gap-4 font-mono text-[11px]">
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[var(--color-ink)]/60">DIFFICULTY</dt>
                        <dd className="text-right text-[var(--color-gold)]">
                          {"★".repeat(project.difficulty)}<span className="text-white/15">{"★".repeat(5 - project.difficulty)}</span>
                        </dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[var(--color-ink)]/60">ROLE</dt>
                        <dd className="max-w-[62%] text-right text-[var(--color-ink)]/80">{project.role}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[var(--color-ink)]/60">PARTY</dt>
                        <dd className="max-w-[66%] text-right leading-5 text-[var(--color-cyan)]">{project.party.join(" / ")}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[var(--color-ink)]/60">EST. TIME</dt>
                        <dd className="text-right text-[var(--color-ink)]/80">{project.estimatedMinutes} MIN</dd>
                      </div>
                      <div className="border-t border-[var(--color-hairline)]/12 pt-4">
                        <dt className="text-[var(--color-ink)]/60">REWARD</dt>
                        <dd className="mt-2 text-sm leading-5 text-[var(--color-mint)]">{project.reward}</dd>
                      </div>
                    </dl>
                  </aside>
                </div>

                {project.screens && project.screens.length > 0 && (
                  <div className="mt-10 sm:mt-14">
                    <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-[var(--color-cyan)]">Presentation Deck</p>
                    <div className="mt-5 flex flex-col gap-3">
                      {project.screens.map((screen) => (
                        <div key={screen.src} className="overflow-hidden border border-[var(--color-hairline)]/16 bg-[var(--color-surface-2)]">
                          <img src={screen.src} alt={screen.alt} loading="lazy" className="w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative mt-14 sm:mt-20">
                  <div className="absolute bottom-14 left-[21px] top-4 w-px bg-[var(--color-cyan)]/35 shadow-[0_0_8px_color-mix(in_srgb,var(--color-cyan)_40%,transparent)] sm:left-[27px]" />
                  <div className="flex flex-col gap-5 sm:gap-6">
                    {STAGES.map((stage, index) => {
                      const content = project[stage.key];
                      return (
                        <motion.section
                          key={stage.key}
                          initial={{ opacity: 0, x: -18 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-70px", root: containerRef }}
                          transition={{ duration: 0.45, delay: 0.03 }}
                          className="relative grid grid-cols-[44px_1fr] items-start gap-3 sm:grid-cols-[56px_1fr] sm:gap-5"
                        >
                          <div className="relative z-10 flex size-11 items-center justify-center border-2 border-[var(--color-cyan)] bg-[var(--color-canvas)] font-pixel text-[9px] text-[var(--color-cyan)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-cyan)_25%,transparent)] sm:size-14 sm:text-[10px]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="min-w-0 border border-[var(--color-hairline)]/13 bg-[var(--color-surface-2)] p-4 transition-colors hover:border-[var(--color-cyan)]/55 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">
                                  Stage {index + 1} of {STAGES.length}
                                </p>
                                <h4 className="mt-1 font-display text-lg font-black uppercase text-[var(--color-cyan)] sm:text-xl">
                                  {stage.label}
                                </h4>
                              </div>
                              <span className="font-pixel text-[7px] text-[var(--color-mint)]">REVEALED</span>
                            </div>
                            {Array.isArray(content) ? (
                              <ul className="mt-4 grid gap-2">
                                {content.map((line) => (
                                  <li key={line} className="flex gap-3 text-sm leading-6 text-[var(--color-ink)]/78">
                                    <span className="mt-2 size-1.5 flex-none bg-[var(--color-violet)]" />
                                    <span>{line}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/78 sm:text-[15px]">{content}</p>
                            )}
                          </div>
                        </motion.section>
                      );
                    })}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px", root: containerRef }}
                  onViewportEnter={() => completeMission(project.id)}
                  className="mt-10 flex flex-col justify-between gap-4 border-2 border-[var(--color-cyan)] bg-[var(--color-cyan)]/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:px-7"
                >
                  <div>
                    <p className="font-pixel text-[11px] text-[var(--color-cyan)] sm:text-sm">MISSION COMPLETED</p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
                      Chapter archived // Achievement unlocked
                    </p>
                  </div>
                  <p className="font-pixel text-[10px] text-[var(--color-gold)]">+75 XP</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
