import { motion } from "framer-motion";
import type { SkillAxis } from "../../data/content";

interface SkillRadarProps {
  axes: SkillAxis[];
  size?: number;
}

function pointFor(index: number, total: number, radius: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * radius;
  return [Math.cos(angle) * r, Math.sin(angle) * r] as const;
}

export default function SkillRadar({ axes, size = 280 }: SkillRadarProps) {
  const radius = size / 2 - 64;
  const center = size / 2;
  const points = axes.map((axis, i) => pointFor(i, axes.length, radius, axis.value));
  const path = points.map(([x, y]) => `${center + x},${center + y}`).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];
  const summary = axes.map((axis) => `${axis.label} ${axis.value} out of 100`).join(", ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto h-auto w-full max-w-[280px] overflow-visible"
      role="img"
      aria-label={`Skill radar chart: ${summary}`}
    >
      {rings.map((r) => (
        <circle
          key={r}
          cx={center}
          cy={center}
          r={radius * r}
          fill="none"
          stroke="color-mix(in srgb, var(--color-violet) 15%, transparent)"
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pointFor(i, axes.length, radius, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + x}
            y2={center + y}
            stroke="color-mix(in srgb, var(--color-violet) 15%, transparent)"
            strokeWidth={1}
          />
        );
      })}
      <motion.polygon
        points={path}
        fill="color-mix(in srgb, var(--color-violet) 30%, transparent)"
        stroke="var(--color-violet)"
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: `${center}px ${center}px` }}
      />
      {axes.map((axis, i) => {
        const [x, y] = pointFor(i, axes.length, radius + 22, 100);
        return (
          <text
            key={axis.label}
            x={center + x}
            y={center + y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="var(--color-ink)"
            className="font-sans"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
