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
    <>
      <div className="pointer-events-none fixed inset-0 -z-[5]">
        <motion.div
          className="cursor-aura-glow fixed left-0 top-0 rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            mixBlendMode: "multiply",
          }}
          animate={{
            width: isExpanded ? 380 : 300,
            height: isExpanded ? 380 : 300,
            opacity: variant === "text" ? 0.08 : 0.28,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[300]">
        <motion.div
          className="fixed left-0 top-0 select-none"
          style={{ x: springX, y: springY, translateX: "0%", translateY: "0%" }}
          animate={{ width: isExpanded ? 26 : 18, height: isExpanded ? 32.5 : 22.5, opacity: variant === "text" ? 0 : 1 }}
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
    </>
  );
}
