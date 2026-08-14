import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const glowRef = useRef<HTMLDivElement | null>(null);

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
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-violet) 16%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute left-[-10%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-violet-300/50 blur-[110px] animate-float-slower" />
      <div className="absolute right-[-12%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-cyan-200/60 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-[-15%] left-[20%] h-[34rem] w-[34rem] rounded-full bg-emerald-200/50 blur-[110px] animate-float-slower" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-[10%] right-[8%] h-64 w-64 rounded-full bg-amber-200/40 blur-[90px] animate-float-slow" style={{ animationDelay: "-2s" }} />

      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-30 mix-blend-multiply"
        style={{
          background:
            "conic-gradient(from 200deg at 50% -20%, transparent 0deg, color-mix(in srgb, var(--color-violet) 22%, transparent) 40deg, transparent 90deg, color-mix(in srgb, var(--color-cyan) 18%, transparent) 160deg, transparent 220deg)",
        }}
      />
    </div>
  );
}
