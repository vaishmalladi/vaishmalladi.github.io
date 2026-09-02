import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ kicker, title, description, align = "left" }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-violet-deep)] sm:text-xs sm:tracking-[0.35em]"
      >
        {kicker}
      </motion.span>
      <h2 className="flex flex-wrap gap-x-2 font-display text-[clamp(2rem,10vw,3rem)] font-bold sm:gap-x-3 sm:text-5xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={cn("max-w-xl text-sm leading-6 text-[var(--color-ink-soft)] sm:text-base", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
