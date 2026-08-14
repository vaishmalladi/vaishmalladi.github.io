import { useEffect, useMemo, useRef } from "react";

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
  const glowRef = useRef<HTMLDivElement | null>(null);
  const stars = useStars(36);

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      const el = glowRef.current;
      if (!el) return;
      el.style.setProperty("--mx", `${event.clientX}px`);
      el.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-canvas)]">
      {/* sky base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #f8faff 0%, #f1f2ff 55%, #eef0ff 100%)" }}
      />

      {/* tiny stars */}
      <div className="absolute inset-0 opacity-70">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-[var(--color-violet)]"
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

      {/* drifting cloud shadows */}
      <div className="absolute -left-1/4 top-[8%] h-40 w-[60%] rounded-full bg-white/70 blur-3xl animate-drift" />
      <div
        className="absolute -right-1/4 top-[38%] h-56 w-[70%] rounded-full bg-white/60 blur-3xl animate-drift"
        style={{ animationDelay: "-14s", animationDuration: "48s" }}
      />
      <div
        className="absolute left-1/3 top-[70%] h-44 w-[55%] rounded-full bg-white/70 blur-3xl animate-drift"
        style={{ animationDelay: "-26s", animationDuration: "44s" }}
      />

      {/* cursor-reactive light */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx, 50%) var(--my, 30%), color-mix(in srgb, var(--color-violet) 12%, transparent), transparent 70%)",
        }}
      />

      {/* aurora ribbon */}
      <div className="absolute left-[-10%] top-[-14%] h-[36rem] w-[36rem] rounded-full bg-violet-200/50 blur-[110px] animate-float-slower" />
      <div className="absolute right-[-14%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-cyan-100/60 blur-[100px] animate-float-slow" />
      <div
        className="absolute bottom-[-16%] left-[18%] h-[32rem] w-[32rem] rounded-full bg-emerald-100/50 blur-[110px] animate-float-slower"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-[8%] right-[6%] h-56 w-56 rounded-full bg-amber-100/50 blur-[90px] animate-float-slow"
        style={{ animationDelay: "-2s" }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[55vh] opacity-25 mix-blend-multiply"
        style={{
          background:
            "conic-gradient(from 200deg at 50% -20%, transparent 0deg, color-mix(in srgb, var(--color-violet) 18%, transparent) 40deg, transparent 90deg, color-mix(in srgb, var(--color-cyan) 14%, transparent) 160deg, transparent 220deg)",
        }}
      />
    </div>
  );
}
