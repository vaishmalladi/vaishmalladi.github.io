import { motion } from "framer-motion";
import { useWorldSection } from "../../hooks/useWorldSection";
import { ACHIEVEMENTS, PROJECTS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";
import ChapterCard from "../project/ChapterCard";

export default function Projects() {
  const ref = useWorldSection("projects");
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[var(--color-canvas)] px-4 py-20 text-[var(--color-ink)] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(color-mix(in_srgb,var(--color-ink)_3.5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_3.5%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent shadow-[0_0_20px_var(--color-cyan)]" />

      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-[var(--color-hairline)]/12 pb-6 sm:mb-10 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-pixel text-[9px] uppercase tracking-[0.22em] text-[var(--color-cyan)]"
            >
              Microsoft // Chapter select
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-black leading-[0.85] tracking-normal"
            >
              SELECT A <span className="text-[var(--color-violet)]">MISSION</span>
            </motion.h2>
          </div>
          <div className="max-w-md md:text-right">
            <p className="font-mono text-sm leading-6 text-[var(--color-ink)]/75">
              Stories from my time at Microsoft — enterprise platforms, AI experiences, and design systems.
              Every chapter opens into the decisions behind the final design.
            </p>
            <p className="mt-3 font-pixel text-[10px] text-[var(--color-gold)]">{PROJECTS.length} CHAPTERS // MICROSOFT</p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ChapterCard key={project.id} project={project} chapterNumber={index + 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 border-t border-[var(--color-hairline)]/15 pt-8 sm:mt-16 sm:pt-10"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-black sm:text-3xl">Achievements</h3>
            <p className="font-pixel text-[9px] uppercase text-[var(--color-gold)]">
              {unlockedAchievements.length} / {Object.keys(ACHIEVEMENTS).length} unlocked
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Object.values(ACHIEVEMENTS).map((ach, i) => {
              const unlocked = unlockedAchievements.includes(ach.id);
              return (
                <motion.div
                  key={ach.id}
                  title={unlocked ? ach.description : "Keep exploring to unlock"}
                  animate={unlocked ? { y: [0, -4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2.4, delay: (i % 5) * 0.3 }}
                  className={`flex items-center gap-2 border px-3 py-2 text-xs font-medium sm:text-sm ${
                    unlocked
                      ? "border-[var(--color-hairline)]/25 bg-[var(--color-veil)]/[0.06] text-[var(--color-ink)]"
                      : "border-[var(--color-hairline)]/[0.08] bg-[var(--color-veil)]/[0.02] text-[var(--color-ink-faint)] opacity-50 grayscale"
                  }`}
                >
                  <span>{ach.icon}</span>
                  <span>{ach.title}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
