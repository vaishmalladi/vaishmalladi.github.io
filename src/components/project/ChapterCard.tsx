import { motion } from "framer-motion";
import type { ProjectMission } from "../../data/content";
import { WORLDS } from "../../data/content";
import { useGameStore } from "../../store/gameStore";

interface ChapterCardProps {
  project: ProjectMission;
  chapterNumber: number;
}

const POSTER_PALETTES = [
  { night: "#07111f", haze: "#1d4860", accent: "#00f0ff", signal: "#ff2b86" },
  { night: "#100a18", haze: "#442346", accent: "#ff2b86", signal: "#ffcc00" },
  { night: "#061419", haze: "#16494b", accent: "#55f0be", signal: "#ff7e42" },
  { night: "#0b0a20", haze: "#293264", accent: "#8f82ff", signal: "#00f0ff" },
  { night: "#130b19", haze: "#4c2143", accent: "#ff5aa0", signal: "#70f4ff" },
  { night: "#071118", haze: "#183b52", accent: "#00d8ff", signal: "#ffcc00" },
  { night: "#141006", haze: "#5a3b16", accent: "#ffcc00", signal: "#ff5e57" },
  { night: "#071612", haze: "#1c4e40", accent: "#55f0be", signal: "#c7ff61" },
  { night: "#0b0d1c", haze: "#293863", accent: "#7ea6ff", signal: "#ff4f91" },
] as const;

function PosterRelic({ variant, accent, signal }: { variant: number; accent: string; signal: string }) {
  if (variant === 0) {
    return (
      <g>
        <path d="M118 372 150 120h60l32 252Z" fill="#071018" stroke={accent} strokeWidth="3" />
        <path d="m150 120 30-42 30 42" fill="none" stroke={signal} strokeWidth="5" />
        {[158, 198, 238, 278, 318].map((y) => <rect key={y} x="155" y={y} width="50" height="8" fill={y % 80 === 38 ? signal : accent} opacity=".72" />)}
        <path d="M78 372h204" stroke={accent} strokeWidth="5" />
      </g>
    );
  }

  if (variant === 1) {
    return (
      <g>
        <path d="M180 92 273 130v93c0 73-40 123-93 151-53-28-93-78-93-151v-93Z" fill="#090d18" stroke={accent} strokeWidth="5" />
        <path d="m180 141 43 20v53c0 41-18 73-43 92-25-19-43-51-43-92v-53Z" fill={signal} opacity=".2" stroke={signal} strokeWidth="3" />
        <circle cx="180" cy="216" r="16" fill={accent} />
        <path d="M174 228h12l8 48h-28Z" fill={accent} />
      </g>
    );
  }

  if (variant === 2) {
    return (
      <g>
        <circle cx="150" cy="188" r="72" fill="none" stroke={accent} strokeWidth="16" />
        <circle cx="150" cy="188" r="28" fill={signal} />
        <path d="m203 237 91 91-27 27-35-35-18 18-22-22 18-18-34-34Z" fill={accent} stroke="#071018" strokeWidth="5" />
        <path d="M92 352h176" stroke={signal} strokeWidth="4" opacity=".65" />
      </g>
    );
  }

  if (variant === 3) {
    return (
      <g>
        <path d="M84 121h192v92H168l-48 38 10-38H84Z" fill="#0b1020" stroke={accent} strokeWidth="4" />
        <path d="M106 244h164v78H154l-42 32 9-32h-15Z" fill="#0b1020" stroke={signal} strokeWidth="4" />
        <path d="M116 153h96M116 177h130M136 273h104M136 295h66" stroke={accent} strokeWidth="7" opacity=".72" />
      </g>
    );
  }

  if (variant === 4) {
    return (
      <g>
        <path d="M53 226s49-94 127-94 127 94 127 94-49 94-127 94S53 226 53 226Z" fill="#0b0b18" stroke={accent} strokeWidth="5" />
        <circle cx="180" cy="226" r="57" fill={signal} opacity=".18" stroke={signal} strokeWidth="4" />
        <circle cx="180" cy="226" r="25" fill={accent} />
        <path d="M180 176v100M130 226h100" stroke="#fff" strokeWidth="2" opacity=".45" />
      </g>
    );
  }

  if (variant === 5) {
    return (
      <g>
        <path d="M102 150h156v142H102Z" fill="#071018" stroke={accent} strokeWidth="5" />
        <path d="M180 150V99M157 99h46" stroke={signal} strokeWidth="6" />
        <rect x="128" y="184" width="38" height="24" fill={accent} />
        <rect x="194" y="184" width="38" height="24" fill={accent} />
        <path d="M139 248h82" stroke={signal} strokeWidth="7" />
        <path d="M82 190H54v96h48M278 190h28v96h-48M134 292v69M226 292v69" fill="none" stroke={accent} strokeWidth="10" />
      </g>
    );
  }

  if (variant === 6) {
    return (
      <g>
        <circle cx="180" cy="221" r="112" fill="#10120e" stroke={accent} strokeWidth="4" />
        <circle cx="180" cy="221" r="82" fill="none" stroke={signal} strokeWidth="3" strokeDasharray="8 10" />
        <path d="m180 109 31 84 84 28-84 29-31 83-30-83-85-29 85-28Z" fill={accent} opacity=".9" />
        <path d="m180 157 18 56-18 59-18-59Z" fill="#07090f" />
      </g>
    );
  }

  if (variant === 7) {
    return (
      <g>
        <path d="M260 165a102 102 0 1 0 8 111" fill="none" stroke={accent} strokeWidth="18" />
        <path d="m245 125 42 36-55 22Z" fill={accent} />
        <path d="M100 282a92 92 0 0 0 160 0" fill="none" stroke={signal} strokeWidth="5" strokeDasharray="10 8" />
        <path d="M180 171v58l45 29" fill="none" stroke="#fff" strokeWidth="7" />
        <circle cx="180" cy="229" r="14" fill={signal} />
      </g>
    );
  }

  return (
    <g>
      <path d="M62 356V119h104v237M194 356V119h104v237" fill="#08101d" stroke={accent} strokeWidth="5" />
      <path d="m166 119 28 21v216h-28Z" fill={signal} opacity=".5" />
      <path d="M90 151h48M90 187h48M90 223h48M222 151h48M222 187h48M222 223h48" stroke={accent} strokeWidth="6" opacity=".7" />
      <path d="m180 178 34 61-34 79-34-79Z" fill={accent} opacity=".8" />
      <path d="M45 356h270" stroke={signal} strokeWidth="5" />
    </g>
  );
}

function PosterArt({ projectId, chapterNumber }: { projectId: string; chapterNumber: number }) {
  const palette = POSTER_PALETTES[(chapterNumber - 1) % POSTER_PALETTES.length];
  const gradientId = `poster-${projectId}`;

  return (
    <svg viewBox="0 0 360 480" aria-hidden="true" className="absolute inset-0 size-full [image-rendering:auto]" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradientId} x1="180" y1="0" x2="180" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.night} />
          <stop offset=".58" stopColor={palette.haze} />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
      </defs>
      <rect width="360" height="480" fill={`url(#${gradientId})`} />
      <path d="M0 338 66 286l51 35 54-65 57 58 52-39 80 66v139H0Z" fill="#05080d" opacity=".72" />
      <g opacity=".15" stroke={palette.accent}>
        {[36, 72, 108, 144, 180, 216, 252, 288, 324].map((x) => <path key={x} d={`M${x} 0v480`} />)}
        {[48, 96, 144, 192, 240, 288, 336, 384, 432].map((y) => <path key={y} d={`M0 ${y}h360`} />)}
      </g>
      <PosterRelic variant={chapterNumber - 1} accent={palette.accent} signal={palette.signal} />
      <path d="M0 389h360v91H0Z" fill="#05070b" opacity=".88" />
      <path d="M0 388h360" stroke={palette.signal} strokeWidth="2" opacity=".72" />
    </svg>
  );
}

export default function ChapterCard({ project, chapterNumber }: ChapterCardProps) {
  const openProject = useGameStore((s) => s.openProject);
  const missionsRead = useGameStore((s) => s.missionsRead);
  const completed = missionsRead.includes(project.id);
  const world = WORLDS.find((item) => item.id === project.world);

  const chapterLabel = String(chapterNumber).padStart(2, "0");
  const hasCover = Boolean(project.screens && project.screens.length > 0);

  return (
    <motion.button
      type="button"
      data-cursor="project"
      onClick={() => openProject(project.id)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -7, scale: 1.01 }}
      className="group relative flex aspect-video flex-col justify-between overflow-hidden border border-[var(--color-hairline)]/18 bg-[var(--color-canvas)] p-5 text-left shadow-[0_24px_55px_-22px_rgba(0,0,0,.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cyan)]"
      aria-label={`Open chapter ${chapterNumber}: ${project.title}`}
    >
      {project.screens && project.screens.length > 0 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#05070b]">
          <img src={project.screens[0].src} alt="" aria-hidden="true" className="size-full object-contain" />
        </div>
      ) : (
        <PosterArt projectId={project.id} chapterNumber={chapterNumber} />
      )}
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 ${
          hasCover ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""
        }`}
      />
      {hasCover && (
        <span className="pointer-events-none absolute inset-0 bg-black/78 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="border border-white/30 bg-black/55 px-2.5 py-1.5 font-pixel text-[8px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          Ch. {chapterLabel}
        </span>
        {completed && <span className="bg-[var(--color-mint)] px-2 py-1 font-pixel text-[7px] text-[var(--color-ink-on-accent)]">CLEARED</span>}
      </div>

      <div
        className={`relative z-10 ${
          hasCover ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""
        }`}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
          {world?.shortLabel} // {project.year}
        </p>
        <h3 className="mt-2 max-w-[90%] font-display text-[clamp(1.5rem,3vw,2.35rem)] font-black leading-[0.95] text-white">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/78 sm:text-sm">{project.tagline}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[10px] text-white/78">
          <span title={`Difficulty ${project.difficulty}/5`}>
            <span className="text-[var(--color-gold)]">{"★".repeat(project.difficulty)}</span>
            <span className="text-white/18">{"★".repeat(5 - project.difficulty)}</span>
          </span>
          <span>EST. {project.estimatedMinutes} MIN</span>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 origin-left scale-x-0 bg-[var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan)] transition-transform duration-300 group-hover:scale-x-100" />
      <span className="pointer-events-none absolute right-4 top-14 z-20 translate-x-3 font-pixel text-[7px] text-[var(--color-cyan)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        ENTER CHAPTER +
      </span>
    </motion.button>
  );
}
