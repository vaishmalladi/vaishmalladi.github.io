import { useEffect, useRef, useState } from "react";

/** Eye socket positions/sizes as % of the character image, sampled from the artwork. */
const EYES = [
  { xPct: 50.6, yPct: 19.8, wPct: 5, hPct: 3.4 },
  { xPct: 62.4, yPct: 19.8, wPct: 5.2, hPct: 3.5 },
] as const;

const SCLERA_COLOR = "#f2ddc0";
const SKIN_COLOR = "#f0a047";
const PUPIL_RANGE = 22; // % of eye-socket radius the pupil can travel

/**
 * Overlays animated pupils on the static character portrait so its eyes
 * track the cursor, with a simple periodic top-down eyelid blink.
 */
export default function CursorEyes() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        const originX = rect.left + rect.width * 0.56;
        const originY = rect.top + rect.height * 0.2;
        const dx = event.clientX - originX;
        const dy = event.clientY - originY;
        const dist = Math.hypot(dx, dy) || 1;
        setPupil({ x: dx / dist, y: dy / dist });
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let timeout = 0;
    const scheduleBlink = () => {
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 150);
        scheduleBlink();
      }, 12000 + Math.random() * 10000);
    };
    scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {EYES.map((eye, index) => (
        <div
          key={index}
          className="absolute overflow-hidden rounded-[45%]"
          style={{
            left: `${eye.xPct}%`,
            top: `${eye.yPct}%`,
            width: `${eye.wPct}%`,
            height: `${eye.hPct}%`,
            backgroundColor: SCLERA_COLOR,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute rounded-full bg-[#231815]"
            style={{
              width: "48%",
              height: "58%",
              left: `calc(50% + ${pupil.x * PUPIL_RANGE}%)`,
              top: `calc(50% + ${pupil.y * PUPIL_RANGE}%)`,
              transform: "translate(-50%, -50%)",
              transition: "left 90ms ease-out, top 90ms ease-out",
            }}
          />
          {/* Simple eyelid: slides down from the top to cover the eye during a blink. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: SKIN_COLOR,
              transformOrigin: "top",
              transform: `scaleY(${blink ? 1 : 0})`,
              transition: "transform 150ms ease-in-out",
            }}
          />
        </div>
      ))}
    </div>
  );
}
