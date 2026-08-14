import { lazy, Suspense } from "react";
import { useWorldSection } from "../../hooks/useWorldSection";
import { PROJECTS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../project/MissionCard";

const FloatingField = lazy(() => import("../background/FloatingField"));

export default function AILab() {
  const ref = useWorldSection("ai");
  const projects = PROJECTS.filter((p) => p.world === "ai");

  return (
    <section
      id="ai"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
    >
      <Suspense fallback={null}>
        <FloatingField className="pointer-events-none absolute inset-0 -z-10 opacity-50" variant="lab" />
      </Suspense>
      <SectionHeading
        kicker="World 03 · Hologram Lab"
        title="AI Experiences"
        description="A glass laboratory where recommendations float, prompts are shared, and agents learn to act with earned trust."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MissionCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
