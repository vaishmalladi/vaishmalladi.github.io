import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-violet-500"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: isExpanded ? 10 : 8, height: isExpanded ? 10 : 8, opacity: variant === "text" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "color-mix(in srgb, var(--color-violet) 55%, transparent)",
        }}
        animate={{
          width: isExpanded ? 64 : variant === "text" ? 90 : 36,
          height: isExpanded ? 64 : variant === "text" ? 40 : 36,
          borderRadius: variant === "text" ? 12 : 999,
          backgroundColor: isExpanded
            ? "color-mix(in srgb, var(--color-violet) 14%, transparent)"
            : "transparent",
          borderWidth: variant === "text" ? 1 : 1.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      />
    </div>
  );
}
