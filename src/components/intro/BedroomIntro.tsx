import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

const DUST = Array.from({ length: 14 }, (_, i) => ({
  top: (i * 29) % 100,
  left: (i * 41) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.4,
}));

export default function BedroomIntro() {
  const introComplete = useGameStore((s) => s.introComplete);
  const completeIntro = useGameStore((s) => s.completeIntro);
  const [launching, setLaunching] = useState(false);
  const [origin, setOrigin] = useState("50% 45%");
  const [scaleTarget, setScaleTarget] = useState(20);
  const roomRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);

  if (introComplete) return null;

  const handleStart = () => {
    const room = roomRef.current;
    const screen = screenRef.current;
    if (room && screen) {
      const roomRect = room.getBoundingClientRect();
      const screenRect = screen.getBoundingClientRect();
      const originX = ((screenRect.left + screenRect.width / 2 - roomRect.left) / roomRect.width) * 100;
      const originY = ((screenRect.top + screenRect.height / 2 - roomRect.top) / roomRect.height) * 100;
      setOrigin(`${originX}% ${originY}%`);

      const scaleX = window.innerWidth / screenRect.width;
      const scaleY = window.innerHeight / screenRect.height;
      setScaleTarget(Math.max(scaleX, scaleY) * 1.35);
    }
    setLaunching(true);
    window.setTimeout(() => completeIntro(), 1150);
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-[#181425]">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 20%, #26213b 0%, #181425 60%, #100e19 100%)" }}
      />

      {DUST.map((d, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-amber-200"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, animationDelay: `${d.delay}s` }}
        />
      ))}

      <motion.div
        ref={roomRef}
        className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-center px-6"
        animate={launching ? { scale: scaleTarget, opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.7, 0, 0.84, 0], opacity: { times: [0, 0.6, 1] } }}
        style={{ transformOrigin: origin }}
      >
        {/* wall posters */}
        <div className="absolute left-2 top-6 flex w-24 flex-col items-center gap-1 rounded-md bg-gradient-to-b from-rose-400/70 to-indigo-500/70 p-3 shadow-lg sm:left-8 sm:top-10">
          <span className="text-2xl">👾</span>
          <span className="font-pixel text-[7px] text-white/90">ARCADE</span>
        </div>
        <div className="absolute right-2 top-2 flex w-24 flex-col items-center gap-1 rounded-md bg-gradient-to-b from-cyan-400/70 to-violet-500/70 p-3 shadow-lg sm:right-8 sm:top-6">
          <span className="text-2xl">🕹️</span>
          <span className="font-pixel text-[7px] text-white/90">RETRO</span>
        </div>

        {/* CRT monitor */}
        <div className="relative z-10 mt-16 flex flex-col items-center sm:mt-10">
          <div className="rounded-[28px] bg-gradient-to-b from-[#e8dcc8] to-[#cdbfa4] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] sm:p-6">
            <div
              ref={screenRef}
              className="crt-flicker relative h-56 w-72 overflow-hidden rounded-xl bg-[#0c1a14] sm:h-64 sm:w-80"
            >
              {/* mini scene */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1b3a52 0%, #14304a 55%, #163c2e 55%, #0c1a14 100%)" }} />
              <div className="absolute left-10 top-6 h-8 w-8 rounded-full bg-amber-200/90" />
              <div className="absolute -left-6 top-10 h-10 w-32 rounded-full bg-white/20 animate-drift" />
              <div className="absolute right-0 top-16 h-8 w-28 rounded-full bg-white/15 animate-drift" style={{ animationDelay: "-8s" }} />
              <div className="absolute bottom-10 left-6 h-10 w-14 rounded-t-full bg-emerald-800/80" />
              <div className="absolute bottom-10 right-10 h-14 w-16 rounded-t-full bg-emerald-900/80" />
              <motion.div
                className="absolute bottom-10 left-1/2 h-4 w-3 -translate-x-1/2 bg-amber-300"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />

              <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-60" />

              {/* pixel window chrome */}
              <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 bg-black/70 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="ml-1 font-pixel text-[6px] text-white/80">VAISHNAVI.EXE</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  type="button"
                  data-cursor="button"
                  onClick={handleStart}
                  disabled={launching}
                  className="pixel-corners bg-[#e8dcc8] px-4 py-2.5 font-pixel text-[10px] text-[#181425] shadow-[3px_3px_0_0_#0c1a14]"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  PRESS START
                </motion.button>
              </div>
            </div>
          </div>
          <div className="h-6 w-10 bg-gradient-to-b from-[#cdbfa4] to-[#a89878]" />
          <div className="h-3 w-28 rounded-full bg-[#a89878]" />
        </div>

        {/* console + controller */}
        <div className="relative z-10 mt-8 flex items-end gap-6">
          <div className="flex h-10 w-24 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-rose-100 to-rose-200 shadow-md">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
          </div>
          <div className="flex h-9 w-16 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-slate-100 to-slate-300 shadow-md">
            <span className="h-3 w-3 rounded-full bg-slate-500" />
            <span className="h-2 w-2 rounded-full bg-rose-400" />
          </div>
        </div>

        <motion.p
          className="relative z-10 mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          Click Start to Begin
        </motion.p>
      </motion.div>
    </div>
  );
}
