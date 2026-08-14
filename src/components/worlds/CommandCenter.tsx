import { motion } from "framer-motion";
import { useWorldSection } from "../../hooks/useWorldSection";
import { PROFILE_STATS, SKILL_RADAR, TIMELINE, ACHIEVEMENTS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";
import SectionHeading from "../ui/SectionHeading";
import StatCounter from "../ui/StatCounter";
import SkillRadar from "../ui/SkillRadar";
import Timeline from "../ui/Timeline";
import GlassPanel from "../ui/GlassPanel";

export default function CommandCenter() {
  const ref = useWorldSection("about");
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-14 px-6 py-28"
    >
      <SectionHeading
        kicker="World 01 · Command Center"
        title="The designer behind the console"
        description="A futuristic HQ built from six years of enterprise and AI product design — stats, skills, and the path that led here."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <GlassPanel strong className="flex flex-col gap-8 p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-display text-2xl font-bold text-white">
              VM
            </div>
            <div>
              <p className="font-display text-lg font-bold">Vaishnavi Malladi</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Product & Visual Designer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {PROFILE_STATS.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
              Unlocked Achievements
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.values(ACHIEVEMENTS).map((ach, i) => {
                const unlocked = unlockedAchievements.includes(ach.id);
                return (
                  <motion.span
                    key={ach.id}
                    title={unlocked ? ach.description : "Keep exploring to unlock"}
                    animate={unlocked ? { y: [0, -4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2.4, delay: (i % 5) * 0.3 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                      unlocked ? "glass-panel" : "bg-black/5 opacity-40 grayscale"
                    }`}
                  >
                    {ach.icon}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-col items-center justify-center p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
            Skill Radar
          </p>
          <SkillRadar axes={SKILL_RADAR} />
        </GlassPanel>
      </div>

      <GlassPanel className="p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Journey Timeline
        </p>
        <Timeline entries={TIMELINE} />
      </GlassPanel>
    </section>
  );
}
