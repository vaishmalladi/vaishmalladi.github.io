import { useWorldSection } from "../../hooks/useWorldSection";
import { PROJECTS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import ChapterCard from "../project/ChapterCard";

export default function Projects() {
  const ref = useWorldSection("projects");

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
    >
      <SectionHeading
        kicker="Chapter Select"
        title="Projects"
        description="Nine chapters from six years of enterprise platforms, AI experiences, and growth systems. Pick one to begin."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ChapterCard key={project.id} project={project} chapterNumber={i + 1} />
        ))}
      </div>
    </section>
  );
}
