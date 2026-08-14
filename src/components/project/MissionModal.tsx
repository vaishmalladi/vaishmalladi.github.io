import { useRef, useState } from "react";
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
  const [scrollPct, setScrollPct] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const project = PROJECTS.find((p) => p.id === activeProjectId) ?? null;

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeProject()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-strong relative flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
          >
            {/* progress bar */}
            <div className="absolute inset-x-0 top-0 z-10 h-1 bg-black/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                style={{ width: `${scrollPct}%` }}
              />
            </div>

            <button
              type="button"
              data-cursor="button"
              onClick={() => closeProject()}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-lg"
              aria-label="Close mission"
            >
              ×
            </button>

            <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
              <span className={`inline-block rounded-full bg-gradient-to-r ${project.gradient} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white`}>
                {project.world} · {project.year}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{project.title}</h2>
              <p className="mt-2 text-[var(--color-ink-soft)]">{project.tagline}</p>
              <p className="mt-1 font-mono text-xs text-[var(--color-ink-faint)]">Role: {project.role}</p>

              <div className="mt-10 flex flex-col gap-10">
                {STAGES.map((stage, i) => {
                  const content = project[stage.key];
                  return (
                    <motion.section
                      key={stage.key}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px", root: containerRef }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="font-mono text-[10px] text-[var(--color-ink-faint)]">
                        STAGE {i + 1} / {STAGES.length}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-semibold text-[var(--color-violet-deep)]">
                        {stage.label}
                      </h3>
                      {Array.isArray(content) ? (
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {content.map((line) => (
                            <li key={line} className="flex gap-2 text-sm text-[var(--color-ink-soft)]">
                              <span className="text-[var(--color-mint,#4fe0b8)]">✓</span>
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{content}</p>
                      )}
                    </motion.section>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px", root: containerRef }}
                  onViewportEnter={() => completeMission(project.id)}
                  className="glass-panel flex flex-col items-center gap-2 rounded-2xl py-8 text-center"
                >
                  <span className="text-3xl">🏁</span>
                  <p className="font-display text-lg font-bold text-gradient-aurora">Mission Completed</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">+75 XP earned</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
