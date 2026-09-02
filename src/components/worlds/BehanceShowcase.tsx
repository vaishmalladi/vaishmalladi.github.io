import { motion } from "framer-motion";
import { BEHANCE_PROJECTS } from "../../data/content";
import BehanceCard from "../project/BehanceCard";

export default function BehanceShowcase() {
  return (
    <section
      id="behance"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[var(--color-surface)] px-4 py-20 text-[var(--color-ink)] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(color-mix(in_srgb,var(--color-ink)_3.5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_3.5%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-violet)] to-transparent shadow-[0_0_20px_var(--color-violet)]" />

      <div className="relative mx-auto max-w-[1400px]">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-[var(--color-hairline)]/12 pb-6 sm:mb-10 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-pixel text-[9px] uppercase tracking-[0.22em] text-[var(--color-violet)]"
            >
              Behance // Personal archive
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-[clamp(2.4rem,6.5vw,6rem)] font-black leading-[0.85] tracking-normal"
            >
              SIDE <span className="text-[var(--color-cyan)]">QUESTS</span>
            </motion.h2>
          </div>
          <div className="max-w-md md:text-right">
            <p className="font-mono text-sm leading-6 text-[var(--color-ink)]/75">
              Independent explorations from my Behance — apps, redesigns, branding, and illustration built outside
              of work hours.
            </p>
            <p className="mt-3 font-pixel text-[10px] text-[var(--color-gold)]">
              {BEHANCE_PROJECTS.length} PROJECTS // BEHANCE.NET
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {BEHANCE_PROJECTS.map((project) => (
            <BehanceCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.behance.net/vaishmalladi"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="button"
            className="glass-panel inline-flex items-center gap-2 border border-[var(--color-hairline)]/15 px-6 py-3 font-pixel text-[9px] text-[var(--color-cyan)]"
          >
            View Full Behance Profile ↗
          </a>
        </div>
      </div>
    </section>
  );
}
