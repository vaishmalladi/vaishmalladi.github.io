import { motion } from "framer-motion";
import type { TimelineEntry } from "../../data/content";

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative flex flex-col gap-8 pl-6">
      <div className="absolute bottom-0 left-[7px] top-1 w-px bg-gradient-to-b from-[var(--color-violet)] via-[var(--color-cyan)] to-transparent" />
      {entries.map((entry, i) => (
        <motion.div
          key={entry.year}
          className="relative"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-[var(--color-violet)] shadow-[0_0_0_4px_rgba(124,108,255,0.18)]" />
          <span className="font-mono text-xs text-[var(--color-violet-deep)]">{entry.year}</span>
          <h4 className="font-display text-lg font-semibold">{entry.title}</h4>
          <p className="text-sm text-[var(--color-ink-soft)]">{entry.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
