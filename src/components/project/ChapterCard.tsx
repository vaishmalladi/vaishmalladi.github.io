import { motion } from "framer-motion";
import type { ProjectMission } from "../../data/content";
import { WORLDS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";

interface ChapterCardProps {
  project: ProjectMission;
  chapterNumber: number;
}

export default function ChapterCard({ project, chapterNumber }: ChapterCardProps) {
  const openProject = useGameStore((s) => s.openProject);
  const missionsRead = useGameStore((s) => s.missionsRead);
  const completed = missionsRead.includes(project.id);
  const palette = WORLDS.find((w) => w.id === project.world)?.palette;
  const accentDeep = palette?.accentDeep ?? "#5B3DF0";

  const chapterLabel = String(chapterNumber).padStart(2, "0");

  return (
    <motion.button
      type="button"
      data-cursor="project"
      onClick={() => openProject(project.id)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl p-6 text-left shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: `linear-gradient(160deg, ${accentDeep} 0%, #14131f 78%)` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[9rem] font-bold leading-none text-white/10 transition-colors group-hover:text-white/15"
      >
        {chapterLabel}
      </span>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          Chapter {chapterLabel}
        </span>
        {completed && <span className="text-xs text-white/80">✅ Cleared</span>}
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-white/70">{project.tagline}</p>

        <div className="mt-5 flex items-center gap-3 text-[11px] text-white/50">
          <span title={`Difficulty ${project.difficulty}/5`}>
            {"★".repeat(project.difficulty)}
            <span className="opacity-30">{"★".repeat(5 - project.difficulty)}</span>
          </span>
          <span>·</span>
          <span>~{project.estimatedMinutes} min</span>
        </div>

        <div className="mt-4 h-px w-full bg-white/15" />
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
          {project.role} · {project.year}
        </p>
      </div>

      <span className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-white/20 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}
