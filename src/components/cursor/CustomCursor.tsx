import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Blocky pixel-arrow silhouette traced as a single staircase outline (8x10 grid units, in %). */
const CURSOR_CLIP_PATH =
  "polygon(0% 0%, 12.5% 0%, 12.5% 10%, 25% 10%, 25% 20%, 37.5% 20%, 37.5% 30%, 50% 30%, 50% 40%, " +
  "62.5% 40%, 62.5% 50%, 75% 50%, 75% 60%, 87.5% 60%, 87.5% 70%, 100% 70%, 100% 80%, 62.5% 80%, " +
  "62.5% 90%, 25% 90%, 25% 100%, 0% 100%)";

function PixelCursorIcon() {
  return (
    <div className="relative h-full w-full" style={{ filter: "drop-shadow(2px 3px 3px rgba(0,0,0,.45))" }}>
      <div
        className="absolute inset-0"
        style={{ clipPath: CURSOR_CLIP_PATH, backgroundColor: "var(--color-ink)", transform: "scale(1.2)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: CURSOR_CLIP_PATH,
          background:
            "linear-gradient(135deg, rgba(255,255,255,.85), rgba(255,255,255,.35) 45%, color-mix(in srgb, var(--color-heading-alt) 55%, transparent) 100%)",
          backdropFilter: "blur(3px) saturate(160%)",
          WebkitBackdropFilter: "blur(3px) saturate(160%)",
          border: "1.5px solid rgba(255,255,255,.9)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,.9), inset 0 -3px 4px color-mix(in srgb, var(--color-heading) 35%, transparent)",
        }}
      />
    </div>
  );
}

/** Scattered sparkle particles trailing the cursor at different lag speeds for a whimsical, dust-like feel. */
const AURA_PARTICLES = [
  { dx: -42, dy: -26, size: 10, blur: 1.5, color: "#ff2f93", stiffness: 170, damping: 16, mass: 0.5, delay: "0s" },
  { dx: 34, dy: -44, size: 8, blur: 1.5, color: "#a5bcd6", stiffness: 120, damping: 18, mass: 0.6, delay: "0.5s" },
  { dx: 46, dy: 22, size: 12, blur: 2, color: "#ffd46a", stiffness: 80, damping: 20, mass: 0.8, delay: "1s" },
  { dx: -22, dy: 44, size: 7, blur: 1.5, color: "#00c2b8", stiffness: 140, damping: 17, mass: 0.55, delay: "1.5s" },
  { dx: 8, dy: -54, size: 9, blur: 1.5, color: "#c792ea", stiffness: 60, damping: 22, mass: 1, delay: "2s" },
] as const;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [variant, setVariant] = useState<"default" | "button" | "project" | "text">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 160, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 160, mass: 0.6 });
  const particleX0 = useSpring(cursorX, AURA_PARTICLES[0]);
  const particleY0 = useSpring(cursorY, AURA_PARTICLES[0]);
  const particleX1 = useSpring(cursorX, AURA_PARTICLES[1]);
  const particleY1 = useSpring(cursorY, AURA_PARTICLES[1]);
  const particleX2 = useSpring(cursorX, AURA_PARTICLES[2]);
  const particleY2 = useSpring(cursorY, AURA_PARTICLES[2]);
  const particleX3 = useSpring(cursorX, AURA_PARTICLES[3]);
  const particleY3 = useSpring(cursorY, AURA_PARTICLES[3]);
  const particleX4 = useSpring(cursorX, AURA_PARTICLES[4]);
  const particleY4 = useSpring(cursorY, AURA_PARTICLES[4]);
  const particlePositions = [
    [particleX0, particleY0],
    [particleX1, particleY1],
    [particleX2, particleY2],
    [particleX3, particleY3],
    [particleX4, particleY4],
  ] as const;
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleMediaChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);

        const target = event.target as HTMLElement;
        const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        setVariant((cursorType as typeof variant) ?? "default");
      });
    };

    window.addEventListener("mousemove", move);
    document.documentElement.classList.add("cursor-none-desktop");
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const isExpanded = variant === "button" || variant === "project";

  return (
    <div className="pointer-events-none fixed inset-0 z-[300]">
      <motion.div
        animate={{ opacity: variant === "text" ? 0 : 1, scale: isExpanded ? 1.4 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {AURA_PARTICLES.map((particle, index) => {
          const [x, y] = particlePositions[index];
          return (
            <motion.div
              key={index}
              className="cursor-particle fixed left-0 top-0 rounded-full"
              style={{
                x,
                y,
                translateX: `calc(-50% + ${particle.dx}px)`,
                translateY: `calc(-50% + ${particle.dy}px)`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                opacity: 0.7,
                animationDelay: particle.delay,
                ["--particle-blur" as string]: `${particle.blur}px`,
              }}
            />
          );
        })}
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 select-none"
        style={{ x: springX, y: springY, translateX: "0%", translateY: "0%" }}
        animate={{ width: isExpanded ? 34 : 24, height: isExpanded ? 42.5 : 30, opacity: variant === "text" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <PixelCursorIcon />
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "color-mix(in srgb, var(--color-heading-alt) 82%, transparent)",
          boxShadow: "0 0 14px color-mix(in srgb, var(--color-heading-alt) 35%, transparent)",
        }}
        animate={{
          width: isExpanded ? 64 : variant === "text" ? 90 : 36,
          height: isExpanded ? 64 : variant === "text" ? 40 : 36,
          borderRadius: variant === "text" ? 12 : 999,
          backgroundColor: isExpanded
            ? "color-mix(in srgb, var(--color-heading-alt) 14%, transparent)"
            : "transparent",
          borderWidth: variant === "text" ? 1 : 1.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      />
    </div>
  );
}
