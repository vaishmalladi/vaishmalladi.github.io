import { useWorldSection } from "../../hooks/useWorldSection";
import SectionHeading from "../ui/SectionHeading";
import ComponentPlayground from "../ui/ComponentPlayground";

export default function DesignWorkshop() {
  const ref = useWorldSection("design-systems");

  return (
    <section
      id="design-systems"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-28"
    >
      <SectionHeading
        kicker="World 05 · Tech Workshop"
        title="Design Systems"
        description="Floating components assemble themselves into a living library — buttons, cards, spinners, and the tokens that hold it all together."
      />
      <ComponentPlayground />
    </section>
  );
}
