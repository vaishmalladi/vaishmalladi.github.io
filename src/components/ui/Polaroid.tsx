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
      className="w-56 flex-none rounded-lg bg-white p-3 pb-6 shadow-[0_16px_40px_-12px_rgba(20,19,31,0.25)]"
    >
      <div className="flex h-40 items-center justify-center rounded bg-gradient-to-br from-violet-100 via-cyan-50 to-amber-50 text-5xl">
        {item.emoji}
      </div>
      <p className="mt-3 text-center font-display text-sm font-semibold">{item.title}</p>
      <p className="mt-1 text-center text-[11px] text-[var(--color-ink-soft)]">{item.description}</p>
    </motion.div>
  );
}
