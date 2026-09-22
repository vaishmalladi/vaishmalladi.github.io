import { motion } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import GlassPanel from "../ui/GlassPanel";

interface AiEntry {
  title: string;
  body: string;
  tags: string[];
}

const AI_IN_PRODUCTS: AiEntry[] = [
  {
    title: "Copilot for Governance",
    body: "Designed the Security → Governance surfaces where admins delegate tasks to Copilot and stay in control of the outcome.",
    tags: ["Copilot", "Enterprise", "Trust"],
  },
  {
    title: "AI recommendations at scale",
    body: "Shaped how AI-generated recommendations show up inside partner workflows — with clear rationale, safe defaults, and easy overrides.",
    tags: ["Recommendations", "Explainability"],
  },
  {
    title: "AI-assisted workflows",
    body: "Explored how AI collapses multi-step admin flows into intent-based interactions without hiding the underlying system.",
    tags: ["Workflow", "Intent-based UI"],
  },
];

const AI_IN_WORKFLOW: AiEntry[] = [
  {
    title: "Figma Make",
    body: "Use Figma Make to jump from mid-fi frames to interactive prototypes in hours, so we can test flows with real product managers and engineers.",
    tags: ["Prototyping", "Handoff"],
  },
  {
    title: "Vibe coding & rapid POCs",
    body: "Ship working prototypes with Copilot, Cursor, and Claude to pressure-test design decisions in real code, not just clickable flows.",
    tags: ["Copilot", "Cursor", "Claude"],
  },
  {
    title: "Design system exploration",
    body: "Use AI to generate variants, stress-test components, and explore edge cases faster than manual iteration allows.",
    tags: ["Design Systems", "Iteration"],
  },
];

function AICard({ entry }: { entry: AiEntry }) {
  return (
    <div className="flex flex-col gap-3 border border-[var(--color-hairline)]/18 bg-[var(--color-canvas)]/60 p-5 sm:p-6">
      <h4 className="font-display text-lg font-bold text-[var(--color-violet-deep)] sm:text-xl">
        {entry.title}
      </h4>
      <p className="font-mono text-xs leading-6 text-[var(--color-ink)]/72 sm:text-sm">{entry.body}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="border border-[var(--color-hairline)]/25 bg-[var(--color-veil)]/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink)]/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DesigningWithAI() {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section
      id="ai"
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-[var(--color-canvas)] px-4 py-20 text-[var(--color-ink)] sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(color-mix(in_srgb,var(--color-ink)_3%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_3%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-12">
        <SectionHeading
          kicker="Designing with AI"
          title="Designing AI. Designing with AI."
          description="I design AI experiences inside products at Microsoft — and I use AI every day to explore, prototype, and ship faster."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <GlassPanel className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
                01 · AI in products
              </p>
              <p className="max-w-md font-mono text-xs leading-5 text-[var(--color-ink)]/60">
                How I design AI features that feel useful, trustworthy, and legible to real users.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AI_IN_PRODUCTS.map((entry) => (
                <AICard key={entry.title} entry={entry} />
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <GlassPanel className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
                02 · AI in my workflow
              </p>
              <p className="max-w-md font-mono text-xs leading-5 text-[var(--color-ink)]/60">
                The tools and habits I use to move from idea to working prototype faster.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AI_IN_WORKFLOW.map((entry) => (
                <AICard key={entry.title} entry={entry} />
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
