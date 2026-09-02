import { useWorldSection } from "../hooks/useWorldSection";
import MagneticButton from "./ui/MagneticButton";

export default function ContactPortal() {
  const ref = useWorldSection("contact");

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center gap-5 px-4 py-20 text-center sm:gap-6 sm:px-6 sm:py-28"
    >
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-violet-deep)]">
        End of Demo
      </span>
      <h2 className="font-display text-[clamp(2rem,10vw,3rem)] font-bold leading-tight sm:text-5xl">Let's build the next world together</h2>
      <p className="max-w-md text-sm text-[var(--color-ink-soft)] sm:text-base">
        Open to product design roles, collaborations, and conversations about AI, systems, and motion.
      </p>
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
        <MagneticButton
          as="a"
          href="mailto:vaishmalladi@gmail.com"
          className="pixel-corners min-h-11 w-full border-2 border-[var(--color-ink)] bg-[var(--color-violet-deep)] px-7 py-3.5 font-pixel text-[9px] text-white shadow-[4px_4px_0_var(--color-cyan)] sm:w-auto"
        >
          Say Hello
        </MagneticButton>
        <MagneticButton
          as="a"
          href="https://www.linkedin.com/in/vaishnavi-malladi-b2b413174/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel min-h-11 w-full border border-[var(--color-hairline)]/15 px-7 py-3.5 font-pixel text-[9px] text-[var(--color-cyan)] sm:w-auto"
        >
          LinkedIn
        </MagneticButton>
      </div>
      <p className="mt-8 font-mono text-[10px] leading-5 text-[var(--color-ink-faint)] sm:mt-10">
        © {new Date().getFullYear()} Vaishnavi Malladi — built with React & Framer Motion
      </p>
    </section>
  );
}
