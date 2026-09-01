import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWorldSection } from "../hooks/useWorldSection";
import { scrollToSection } from "../lib/smoothScroll";
import { useGameStore } from "../store/gameStore";
import MagneticButton from "./ui/MagneticButton";
import RotatingAvatar from "./RotatingAvatar";

const COMPLEX = "complex".split("");

function WordTransform({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setRevealed(true), 1650);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <span className="relative inline-flex h-[1.12em] min-w-[7.2ch] items-center justify-center border-b-4 border-[var(--color-heading-alt)] align-bottom">
      {!active ? (
        <span className="text-[var(--color-heading-alt)]">complex</span>
      ) : !revealed ? (
        <span aria-hidden={revealed} className="absolute inset-0 flex justify-center">
          {COMPLEX.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block text-[var(--color-heading-alt)]"
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
              animate={{
                opacity: 0,
                x: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
                y: -18 - i * 3,
                rotate: (i % 2 === 0 ? 1 : -1) * (14 + i * 4),
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.65, delay: 0.8 + i * 0.035, ease: "easeIn" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ) : (
        <motion.span
          className="text-[var(--color-heading-alt)] [text-shadow:0_0_18px_color-mix(in_srgb,var(--color-heading-alt)_45%,transparent)]"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          simple
        </motion.span>
      )}
    </span>
  );
}

export default function Home() {
  const ref = useWorldSection("home");
  const introComplete = useGameStore((state) => state.introComplete);

  return (
    <section
      id="home"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[var(--color-canvas)] px-5 pb-16 pt-28 text-[var(--color-ink)] sm:px-8 lg:px-10 lg:pb-10 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(color-mix(in_srgb,var(--color-cyan)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-cyan)_18%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[58%] h-px bg-[var(--color-cyan)]/45 shadow-[0_0_18px_var(--color-cyan)]" />
      <div className="pointer-events-none absolute -bottom-[22vw] left-1/2 h-[38vw] w-[110vw] -translate-x-1/2 [transform:translateX(-50%)_perspective(480px)_rotateX(68deg)] border-t border-[var(--color-cyan)]/40 bg-[repeating-linear-gradient(90deg,color-mix(in_srgb,var(--color-cyan)_16%,transparent)_0,color-mix(in_srgb,var(--color-cyan)_16%,transparent)_1px,transparent_1px,transparent_8%),repeating-linear-gradient(0deg,color-mix(in_srgb,var(--color-violet)_12%,transparent)_0,color-mix(in_srgb,var(--color-violet)_12%,transparent)_1px,transparent_1px,transparent_10%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)_minmax(0,1fr)] lg:gap-5">
        <motion.div
          className="relative z-20 order-2 mx-auto w-full max-w-2xl pb-4 text-center lg:order-1 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left"
          animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
            <span className="border-2 border-[var(--color-violet)] bg-[var(--color-violet)] px-2 py-1 font-pixel text-[8px] text-[var(--color-ink-on-accent)]">P1</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-cyan)] sm:text-xs">
              Product designer
            </span>
          </div>

          <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/60 sm:text-xs">Character selected</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5.6vw,5.6rem)] font-black leading-[0.9] tracking-normal">
            VAISHNAVI
            <span className="mt-2 block text-[.44em] font-semibold leading-tight text-[var(--color-ink)]/75">makes the</span>
            <span className="mt-1 block text-[.68em] leading-tight">
              <WordTransform active={introComplete} /> clear.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-7 text-[var(--color-ink)]/75 sm:text-base lg:mx-0">
            Shaping enterprise platforms, AI copilots, and design systems into products people can
            understand at a glance.
          </p>
        </motion.div>

        <motion.div
          className="relative order-1 h-[48vh] min-h-[380px] w-full lg:order-2 lg:h-[76vh] lg:min-h-[590px]"
          animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(13rem,34vw,34rem)] font-black leading-none text-[var(--color-ink)]/[0.025]">
            01
          </span>
          <div className="absolute inset-x-[10%] top-[8%] h-px bg-gradient-to-r from-transparent via-[var(--color-violet)]/60 to-transparent" />
          <div className="absolute inset-x-[10%] bottom-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/60 to-transparent" />
          <span className="absolute left-[8%] top-[8%] size-10 border-l-2 border-t-2 border-[var(--color-cyan)]" />
          <span className="absolute bottom-[10%] right-[8%] size-10 border-b-2 border-r-2 border-[var(--color-violet)]" />

          <RotatingAvatar className="h-full w-full" />

          <div className="absolute bottom-[1%] left-1/2 w-[min(92%,420px)] -translate-x-1/2 border-x-2 border-[var(--color-violet)] bg-[var(--color-surface-2)]/90 px-4 py-3 text-center backdrop-blur-sm">
            <p className="font-pixel text-[11px] text-[var(--color-ink)] sm:text-sm">VAISHNAVI M.</p>
            <div className="mt-2 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink)]/60">
              <span>Systems thinker</span><span className="text-[var(--color-violet)]">//</span><span>Visual craft</span>
            </div>
          </div>
        </motion.div>

        <motion.aside
          className="order-3 mx-auto w-full max-w-lg border-y border-[var(--color-hairline)]/15 py-5 text-left lg:mx-0 lg:max-w-none lg:pl-7"
          animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-pixel text-[9px] uppercase text-[var(--color-ink)]/60">Player loadout</p>
            <span className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-mint)]">
              <span className="size-1.5 bg-[var(--color-mint)] shadow-[0_0_8px_var(--color-mint)]" /> Ready
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 border-y border-[var(--color-hairline)]/12 py-4">
            {[
              ["02+", "Years"],
              ["24+", "Products"],
              ["08M+", "Users"],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-[var(--color-hairline)]/12 px-3 first:pl-0 last:border-r-0 last:pr-0">
                <p className="font-pixel text-[clamp(11px,1.2vw,15px)] text-[var(--color-gold)]">{value}</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-[var(--color-ink)]/55">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <MagneticButton
              onClick={() => scrollToSection("projects")}
              className="pixel-corners w-full border-2 border-[var(--color-ink)] bg-[var(--color-cyan)] px-5 py-3.5 font-pixel text-[9px] text-[var(--color-ink-on-accent)] shadow-[5px_5px_0_var(--color-violet)] sm:text-[10px]"
            >
              View Chapters
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="w-full border-2 border-[var(--color-hairline)]/25 bg-[var(--color-veil)]/[0.06] px-5 py-3.5 font-pixel text-[9px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] sm:text-[10px]"
            >
              Contact Me
            </MagneticButton>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
