import { motion } from "framer-motion";
import type { BeyondItem } from "../../data/content";

interface PolaroidProps {
  item: BeyondItem;
}

export default function Polaroid({ item }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
      whileHover={{ rotate: 0, scale: 1.05, y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      data-cursor="project"
      className="w-full max-w-56 flex-none border border-[var(--color-hairline)]/15 bg-[var(--color-surface-2)] p-3 pb-5 shadow-[0_20px_45px_-16px_rgba(0,0,0,.75)]"
    >
      <div className="flex h-36 items-center justify-center border border-[var(--color-hairline)]/10 bg-[linear-gradient(145deg,var(--color-surface),var(--color-surface-2))] text-5xl sm:h-40">
        {item.emoji}
      </div>
      <p className="mt-3 text-center font-display text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
      <p className="mt-1 text-center text-[11px] text-[var(--color-ink-soft)]">{item.description}</p>
    </motion.div>
  );
}
