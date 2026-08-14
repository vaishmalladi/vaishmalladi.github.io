import { useWorldSection } from "../../hooks/useWorldSection";
import { PROJECTS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../project/MissionCard";

export default function EnterprisePlatform() {
  const ref = useWorldSection("enterprise");
  const projects = PROJECTS.filter((p) => p.world === "enterprise");

  return (
    <section
      id="enterprise"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
    >
      <SectionHeading
        kicker="World 02 · Control Room"
        title="Enterprise Platform"
        description="A large futuristic control room where multi-tenant systems, security policy, and license flows are commanded from one console."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MissionCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
