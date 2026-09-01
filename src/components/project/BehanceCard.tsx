import { motion } from "framer-motion";
import type { BehanceProject } from "../../data/content";
import { useGameStore } from "../../store/gameStore";

interface BehanceCardProps {
  project: BehanceProject;
}

export default function BehanceCard({ project }: BehanceCardProps) {
  const openBehanceProject = useGameStore((s) => s.openBehanceProject);

  return (
    <motion.button
      type="button"
      data-cursor="project"
      onClick={() => openBehanceProject(project.id)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden border border-[var(--color-hairline)]/18 bg-[var(--color-surface)] text-left shadow-[0_20px_45px_-24px_rgba(0,0,0,.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cyan)]"
      aria-label={`Open overview: ${project.title}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-canvas)]">
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 border border-white/30 bg-black/55 px-2 py-1 font-pixel text-[7px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          Behance
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">
          {project.fields.slice(0, 2).join(" // ")}
        </p>
        <h3 className="font-display text-lg font-black leading-tight text-[var(--color-heading)]">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-5 text-[var(--color-ink)]/70">{project.description}</p>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 origin-left scale-x-0 bg-[var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan)] transition-transform duration-300 group-hover:scale-x-100" />
    </motion.button>
  );
}
