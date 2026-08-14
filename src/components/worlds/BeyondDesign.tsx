import { useWorldSection } from "../../hooks/useWorldSection";
import { BEYOND_ITEMS } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import Polaroid from "../ui/Polaroid";

export default function BeyondDesign() {
  const ref = useWorldSection("beyond");

  return (
    <section
      id="beyond"
      ref={ref as React.RefObject<HTMLElement>}
      className="island-backdrop relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
      style={{ "--island-accent-soft": "#E5FAF0" } as React.CSSProperties}
    >
      <SectionHeading
        kicker="Side Quest 🎪"
        title="Beyond Design"
        description="An interactive scrapbook of everything else — dance, community, and the hackathons that keep the craft playful."
      />
      <div className="flex flex-wrap justify-center gap-8 py-6">
        {BEYOND_ITEMS.map((item) => (
          <Polaroid key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
