import { useEffect, useRef } from "react";
import type { WorldId } from "../data/content";
import { useGameStore } from "../store/gameStore";

export function useWorldSection(id: WorldId | "hero" | "contact") {
  const ref = useRef<HTMLElement | null>(null);
  const setActiveWorld = useGameStore((s) => s.setActiveWorld);
  const exploreWorld = useGameStore((s) => s.exploreWorld);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (id !== "hero" && id !== "contact") {
              setActiveWorld(id);
              exploreWorld(id);
            } else {
              setActiveWorld(id);
            }
          }
        }
      },
      { threshold: [0, 0.5, 0.75] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id, setActiveWorld, exploreWorld]);

  return ref;
}
