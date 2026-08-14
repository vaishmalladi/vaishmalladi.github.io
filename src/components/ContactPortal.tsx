import { useWorldSection } from "../hooks/useWorldSection";
import MagneticButton from "./ui/MagneticButton";

export default function ContactPortal() {
  const ref = useWorldSection("contact");

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 py-28 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-violet-deep)]">
        End of Demo
      </span>
      <h2 className="font-display text-3xl font-bold sm:text-5xl">Let's build the next world together</h2>
      <p className="max-w-md text-sm text-[var(--color-ink-soft)] sm:text-base">
        Open to product design roles, collaborations, and conversations about AI, systems, and motion.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          as="a"
          href="mailto:hello@example.com"
          className="rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 font-display text-sm font-semibold text-white"
        >
          Say Hello
        </MagneticButton>
        <MagneticButton
          as="a"
          href="https://www.linkedin.com"
          className="glass-panel rounded-full px-7 py-3.5 font-display text-sm font-semibold text-[var(--color-violet-deep)]"
        >
          LinkedIn
        </MagneticButton>
      </div>
      <p className="mt-10 font-mono text-[10px] text-[var(--color-ink-faint)]">
        © {new Date().getFullYear()} Vaishnavi Malladi — built with React, Framer Motion & Three.js
      </p>
    </section>
  );
}
