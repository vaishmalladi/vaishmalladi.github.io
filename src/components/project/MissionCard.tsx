import { motion } from "framer-motion";
import type { ProjectMission } from "../../data/content";
import { useGameStore } from "../../store/gameStore";
import { cn } from "../../lib/utils";

interface MissionCardProps {
  project: ProjectMission;
}

export default function MissionCard({ project }: MissionCardProps) {
  const openProject = useGameStore((s) => s.openProject);
  const missionsRead = useGameStore((s) => s.missionsRead);
  const completed = missionsRead.includes(project.id);

  return (
    <motion.button
      type="button"
      data-cursor="project"
      onClick={() => openProject(project.id)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl p-6 text-left glass-panel"
    >
      <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", project.gradient)} />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
          {project.year}
        </span>
        {completed && <span className="text-xs">✅</span>}
      </div>
      <h3 className="mt-3 font-display text-xl font-bold">{project.title}</h3>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/50 px-2.5 py-1 text-[10px] font-medium text-[var(--color-ink-soft)]">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-violet-deep)]">
        Open Mission
        <motion.span className="inline-block" animate={{ x: 0 }} whileHover={{ x: 4 }}>
          →
        </motion.span>
      </span>
    </motion.button>
  );
}
