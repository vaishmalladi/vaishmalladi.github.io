import { motion } from "framer-motion";
import { useRef } from "react";
import { PROFILE_STATS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function Impact() {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-[var(--color-canvas)] px-4 py-20 text-[var(--color-ink)] sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-violet)] to-transparent" />

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading
          kicker="Selected Impact"
          title="Numbers behind the work"
          description="Measurable outcomes from the enterprise, AI, and partner experiences I've helped ship at Microsoft."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 border-l border-t border-[var(--color-hairline)]/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROFILE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 border-b border-r border-[var(--color-hairline)]/15 bg-[var(--color-veil)]/[0.035] p-6 sm:p-8"
            >
              <p className="font-display text-4xl font-black leading-[0.95] text-[var(--color-violet-deep)] sm:text-5xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-4 max-w-[26ch] font-mono text-xs leading-5 text-[var(--color-ink)]/70 sm:text-sm sm:leading-6">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
