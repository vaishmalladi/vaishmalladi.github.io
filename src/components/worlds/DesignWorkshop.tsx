import { useWorldSection } from "../../hooks/useWorldSection";
import SectionHeading from "../ui/SectionHeading";
import ComponentPlayground from "../ui/ComponentPlayground";

export default function DesignWorkshop() {
  const ref = useWorldSection("design-systems");

  return (
    <section
      id="design-systems"
      ref={ref as React.RefObject<HTMLElement>}
      className="island-backdrop relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center gap-10 px-4 py-20 sm:gap-12 sm:px-6 sm:py-28"
      style={{ "--island-accent-soft": "#E4FBF9" } as React.CSSProperties}
    >
      <SectionHeading
        kicker="Bonus Level 🏗️"
        title="Design Systems"
        description="Floating components assemble themselves into a living library — buttons, cards, spinners, and the tokens that hold it all together."
      />
      <ComponentPlayground />
    </section>
  );
}
