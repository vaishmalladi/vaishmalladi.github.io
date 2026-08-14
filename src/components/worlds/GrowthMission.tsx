import { useWorldSection } from "../../hooks/useWorldSection";
import { PROJECTS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../project/MissionCard";

export default function GrowthMission() {
  const ref = useWorldSection("growth");
  const projects = PROJECTS.filter((p) => p.world === "growth");

  return (
    <section
      id="growth"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
    >
      <SectionHeading
        kicker="World 04 · Mission Control"
        title="Growth"
        description="A mission control dashboard where every metric tells a story about sellers, renewals, and the opportunities hiding in plain sight."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MissionCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
