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
      className="island-backdrop relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center gap-10 px-4 py-20 sm:gap-12 sm:px-6 sm:py-28"
      style={{ "--island-accent-soft": "#E5FAF0" } as React.CSSProperties}
    >
      <SectionHeading
        kicker="Side Quest 🎪"
        title="Beyond Design"
        description="An interactive scrapbook of everything else — dance, community, and the hackathons that keep the craft playful."
      />
      <div className="flex flex-wrap justify-center gap-5 py-4 sm:gap-8 sm:py-6">
        {BEYOND_ITEMS.map((item) => (
          <Polaroid key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
