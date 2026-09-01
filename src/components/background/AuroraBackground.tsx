import { useMemo } from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
}

function useStars(count: number): Star[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: (i * 37) % 100,
        left: (i * 53) % 100,
        size: 1.5 + ((i * 7) % 3),
        delay: (i % 10) * 0.34,
      })),
    [count],
  );
}

export default function AuroraBackground() {
  const stars = useStars(36);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-canvas)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas-deep) 52%, var(--color-canvas) 100%)",
        }}
      />

      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(color-mix(in_srgb,var(--color-cyan)_10%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-cyan)_10%,transparent)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="absolute inset-0 opacity-55">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute animate-twinkle bg-[var(--color-cyan)]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-[var(--color-violet)]/45 to-transparent shadow-[0_0_18px_color-mix(in_srgb,var(--color-violet)_45%,transparent)]"
      />
      <div
        className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/35 to-transparent shadow-[0_0_18px_color-mix(in_srgb,var(--color-cyan)_35%,transparent)]"
      />

      <div
        className="absolute inset-x-0 top-0 h-[55vh] opacity-45"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, color-mix(in srgb, var(--color-violet) 8%, transparent) 34%, transparent 48%, color-mix(in srgb, var(--color-cyan) 6%, transparent) 68%, transparent 84%)",
        }}
      />
    </div>
  );
}
