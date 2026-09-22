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
        description="I'm a Product Designer at Microsoft. I enjoy taking complicated systems — enterprise platforms, AI experiences, partner ecosystems — and finding the simple idea hiding underneath."
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
          How I Work
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { step: "01", title: "Understand", body: "Start with the user, business context, and constraints." },
            { step: "02", title: "Simplify", body: "Turn complex workflows into clear mental models and journeys." },
            { step: "03", title: "Explore", body: "Prototype early, test assumptions, iterate quickly." },
            { step: "04", title: "Align", body: "Partner closely with PM, engineering, and cross-functional teams." },
            { step: "05", title: "Measure", body: "Connect design decisions to product and user outcomes." },
          ].map((item) => (
            <div key={item.step} className="border-l border-[var(--color-hairline)]/20 pl-4">
              <p className="font-pixel text-[10px] text-[var(--color-gold)]">{item.step}</p>
              <p className="mt-2 font-display text-base font-bold text-[var(--color-violet-deep)]">{item.title}</p>
              <p className="mt-2 font-mono text-xs leading-5 text-[var(--color-ink)]/70">{item.body}</p>
            </div>
          ))}
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
