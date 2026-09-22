import { useWorldSection } from "../../hooks/useWorldSection";
import { SKILL_RADAR, SKILL_GROUPS, TIMELINE } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import SkillRadar from "../ui/SkillRadar";
import Timeline from "../ui/Timeline";
import GlassPanel from "../ui/GlassPanel";

export default function AboutMe() {
  const ref = useWorldSection("about");

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center gap-10 px-4 py-20 sm:gap-14 sm:px-8 sm:py-28 lg:px-12"
    >
      <SectionHeading
        kicker="Character Profile"
        title="About Me"
        description="The skills and journey behind shipping enterprise platforms, AI products, and design systems."
      />

      <GlassPanel strong className="p-5 sm:p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Skills
        </p>
        <div className="grid gap-10 lg:grid-cols-[minmax(280px,1fr)_minmax(0,3fr)] lg:gap-14">
          <div className="flex min-w-0 flex-col items-center justify-center">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-faint)]">
              Skill Radar
            </p>
            <SkillRadar axes={SKILL_RADAR} size={340} />
          </div>
          <div className="grid min-w-0 gap-x-10 gap-y-8 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="font-display text-base font-bold text-[var(--color-violet-deep)]">{group.label}</p>
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
        </div>
      </GlassPanel>

      <GlassPanel className="p-5 sm:p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
          Journey Timeline
        </p>
        <Timeline entries={TIMELINE} />
      </GlassPanel>
    </section>
  );
}
