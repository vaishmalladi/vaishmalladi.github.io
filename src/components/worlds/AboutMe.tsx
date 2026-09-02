import { motion } from "framer-motion";
import { useWorldSection } from "../../hooks/useWorldSection";
import { PROFILE_STATS, SKILL_RADAR, SKILL_GROUPS, TIMELINE, ACHIEVEMENTS } from "../../data/content";
import { useGameStore, levelFromXp } from "../../store/gameStore";
import SectionHeading from "../ui/SectionHeading";
import SkillRadar from "../ui/SkillRadar";
import Timeline from "../ui/Timeline";
import GlassPanel from "../ui/GlassPanel";

export default function AboutMe() {
  const ref = useWorldSection("about");
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const xp = useGameStore((s) => s.xp);
  const { level, progress } = levelFromXp(xp);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center gap-10 px-4 py-20 sm:gap-14 sm:px-6 sm:py-28"
    >
      <SectionHeading
        kicker="Character Profile"
        title="About Me"
        description="XP earned, achievements unlocked, and the skills behind shipping enterprise and AI products."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <GlassPanel strong className="flex flex-col gap-7 p-5 sm:gap-8 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border border-[var(--color-hairline)]/20 bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-pixel text-sm font-bold text-white">
              VM
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold">Vaishnavi Malladi</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Product & Visual Designer</p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-soft)]">
                XP Earned
              </p>
              <span className="font-display text-sm font-bold text-[var(--color-violet-deep)]">Level {level}</span>
            </div>
            <div className="h-3 w-full overflow-hidden border border-[var(--color-hairline)]/10 bg-[var(--color-veil)]/[0.04]">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-violet)] via-[var(--color-cyan)] to-[var(--color-mint,#4fe0b8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-soft)]">
              Achievements
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.values(ACHIEVEMENTS).map((ach, i) => {
                const unlocked = unlockedAchievements.includes(ach.id);
                return (
                  <motion.div
                    key={ach.id}
                    title={unlocked ? ach.description : "Keep exploring to unlock"}
                    animate={unlocked ? { y: [0, -4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2.4, delay: (i % 5) * 0.3 }}
                    className={`flex items-center gap-2 border px-2.5 py-1.5 text-[11px] font-medium sm:px-3 sm:text-xs ${
                      unlocked ? "glass-panel border-[var(--color-hairline)]/15 text-[var(--color-ink)]" : "border-[var(--color-hairline)]/[0.06] bg-[var(--color-veil)]/[0.02] text-[var(--color-ink-faint)] opacity-50 grayscale"
                    }`}
                  >
                    <span>{ach.icon}</span>
                    <span>{ach.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-soft)]">
              Player Stats
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs sm:gap-3">
              {PROFILE_STATS.map((stat) => (
                <div key={stat.label} className="min-w-0 border border-[var(--color-hairline)]/10 bg-[var(--color-veil)]/[0.04] p-2 text-center sm:p-3">
                  <p className="font-display text-sm font-bold text-[var(--color-violet-deep)] sm:text-base">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-[var(--color-ink)]/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="flex min-w-0 flex-col items-center justify-center p-5 sm:p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
            Skill Radar
          </p>
          <SkillRadar axes={SKILL_RADAR} />
        </GlassPanel>
      </div>

      <GlassPanel className="p-5 sm:p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Journey Timeline
        </p>
        <Timeline entries={TIMELINE} />
      </GlassPanel>

      <GlassPanel className="p-5 sm:p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Skills
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-display text-sm font-bold text-[var(--color-violet-deep)]">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[var(--color-hairline)]/15 bg-[var(--color-veil)]/[0.04] px-3 py-1.5 text-xs text-[var(--color-ink)]/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}
