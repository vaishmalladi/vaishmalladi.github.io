import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

const STARS = Array.from({ length: 18 }, (_, index) => ({
  top: 5 + ((index * 37) % 52),
  left: 3 + ((index * 53) % 94),
  size: index % 4 === 0 ? 3 : 2,
  delay: (index % 6) * 0.35,
}));

export default function BedroomIntro() {
  const introComplete = useGameStore((s) => s.introComplete);
  const completeIntro = useGameStore((s) => s.completeIntro);
  const [launching, setLaunching] = useState(false);
  const [origin, setOrigin] = useState("50% 45%");
  const [scaleTarget, setScaleTarget] = useState(20);
  const roomRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (introComplete) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [introComplete]);

  if (introComplete) return null;

  const handleStart = () => {
    if (launching) return;

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
    window.setTimeout(() => {
      setLaunching(false);
      completeIntro();
    }, 1150);
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 28%, rgba(0,240,255,.12), transparent 32%), radial-gradient(circle at 82% 34%, rgba(255,0,122,.12), transparent 30%), var(--color-canvas-deep)",
        }}
      />

      {STARS.map((star, index) => (
        <span
          key={index}
          className="absolute z-[1] animate-twinkle bg-cyan-100"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <motion.div
        ref={roomRef}
        className="relative mx-auto h-full w-full max-w-[1600px] overflow-hidden"
        animate={launching ? { scale: scaleTarget, opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.7, 0, 0.84, 0], opacity: { times: [0, 0.6, 1] } }}
        style={{ transformOrigin: origin }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[31%] border-t-4 border-[#1a1010] bg-[#2a1915] [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_42px,rgba(0,0,0,.28)_43px,rgba(0,0,0,.28)_47px),repeating-linear-gradient(90deg,transparent_0,transparent_150px,rgba(0,0,0,.18)_151px,rgba(0,0,0,.18)_155px)]" />
        <div className="absolute inset-x-0 top-[69%] h-16 bg-gradient-to-b from-black/35 to-transparent" />

        <div className="absolute left-[5%] top-[8%] hidden w-[clamp(110px,12vw,180px)] rotate-[-2deg] border-4 border-[#4e515b] bg-[#111722] p-2 shadow-[8px_10px_0_rgba(0,0,0,.32)] sm:block">
          <svg viewBox="0 0 160 118" role="img" aria-label="Pixel city poster" className="block aspect-[1.35] w-full bg-[#03070b] [image-rendering:pixelated]">
            <rect width="160" height="118" fill="#050913" />
            <rect x="18" y="34" width="28" height="84" fill="#0d2630" />
            <rect x="53" y="16" width="38" height="102" fill="#10202f" />
            <rect x="99" y="44" width="44" height="74" fill="#17182d" />
            <path d="M0 98h160v20H0z" fill="#07100f" />
            <path d="M80 32 94 60 80 73 66 60Z" fill="#a5bcd6" opacity=".9" />
            <path d="M80 38 87 59 80 66 73 59Z" fill="#d9a99a" />
            <g fill="#a5bcd6" opacity=".65">
              <rect x="23" y="43" width="5" height="7" /><rect x="34" y="57" width="5" height="7" />
              <rect x="59" y="27" width="6" height="7" /><rect x="75" y="43" width="6" height="7" />
              <rect x="108" y="54" width="6" height="7" /><rect x="126" y="69" width="6" height="7" />
            </g>
          </svg>
          <p className="mt-2 font-pixel text-[7px] text-[#a5bcd6]">SYSTEM DREAMS</p>
        </div>

        <div className="absolute right-[5%] top-[7%] hidden w-[clamp(105px,11vw,170px)] rotate-[2deg] border-4 border-[#4e515b] bg-[#111722] p-2 shadow-[-8px_10px_0_rgba(0,0,0,.32)] sm:block">
          <svg viewBox="0 0 150 118" role="img" aria-label="Pixel sunset poster" className="block aspect-[1.27] w-full bg-[#10091c] [image-rendering:pixelated]">
            <rect width="150" height="118" fill="#10091c" />
            <rect y="72" width="150" height="46" fill="#081623" />
            <circle cx="76" cy="50" r="25" fill="#ff2f93" />
            <path d="M0 84 27 60l23 18 27-16 26 18 20-14 27 22v30H0Z" fill="#0a3040" />
            <g stroke="#a5bcd6" strokeWidth="1" opacity=".65">
              <path d="M0 90h150M0 102h150M21 80 8 118M50 79 46 118M76 76v42M102 79l5 39M128 81l14 37" />
            </g>
          </svg>
          <p className="mt-2 font-pixel text-[7px] text-[#ff3c96]">AFTER HOURS</p>
        </div>

        <div className="absolute bottom-[16%] left-[2%] hidden h-[19%] w-[23%] border-4 border-[#120b09] bg-[#211413] shadow-[10px_12px_0_rgba(0,0,0,.25)] md:block">
          <div className="absolute -top-8 left-0 h-10 w-full border-4 border-[#120b09] bg-[#3d2225]" />
          <div className="absolute bottom-0 left-[12%] h-[74%] w-[34%] bg-[#49252c]" />
          <div className="absolute bottom-0 right-[12%] h-[74%] w-[34%] bg-[#332039]" />
        </div>

        <div className="absolute bottom-[22%] right-[3%] hidden h-[17%] w-[19%] border-4 border-[#12131a] bg-[#171b25] shadow-[-10px_12px_0_rgba(0,0,0,.28)] lg:block">
          <div className="absolute -top-5 left-[8%] h-7 w-[84%] border-4 border-[#12131a] bg-[#292f3b]" />
          <div className="absolute left-[13%] top-[28%] h-3 w-[38%] bg-[#a5bcd6]/50" />
          <div className="absolute bottom-[18%] right-[13%] flex gap-2"><span className="size-3 bg-[#d9a99a]" /><span className="size-3 bg-[#f5efc6]" /></div>
        </div>

        <div className="absolute left-1/2 top-[10%] bottom-[31%] z-10 flex w-[min(76vw,690px)] -translate-x-1/2 flex-col items-center sm:top-[8%]">
          <div className="w-full shrink-0 rounded-[18px] border-[10px] border-[#1c1e25] bg-[#4d5059] p-3 shadow-[0_28px_55px_rgba(0,0,0,.72),0_0_50px_rgba(0,240,255,.08)] sm:rounded-[28px] sm:border-[14px] sm:p-5">
            <div
              ref={screenRef}
              className="crt-flicker relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border-[6px] border-[#20222a] bg-[#07111c] shadow-[inset_0_0_45px_rgba(0,0,0,.85)] sm:rounded-[18px] sm:border-[10px]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#08162b_0%,#102b49_52%,#143d3c_52%,#091a20_100%)]" />
              <div className="absolute inset-x-0 top-0 flex h-7 items-center justify-between bg-black/65 px-3 font-pixel text-[clamp(5px,1vw,8px)] text-white/80">
                <span>VAISH.EXE</span>
                <span className="text-[#f5efc6]">SIGNAL 24</span>
                <span className="text-[#a5bcd6]">NIGHT 01</span>
              </div>

              <div className="absolute left-[12%] top-[19%] size-[12%] rounded-full bg-[#ffd46a] shadow-[0_0_24px_rgba(255,212,106,.65)]" />
              <motion.div className="absolute left-[5%] top-[31%] h-[7%] w-[26%] bg-white/15" animate={{ x: [0, 42, 0] }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }} />
              <motion.div className="absolute right-[5%] top-[22%] h-[6%] w-[20%] bg-cyan-100/10" animate={{ x: [0, -32, 0] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} />

              <div className="absolute inset-x-0 bottom-[18%] h-[24%] bg-[#0d2d31] [clip-path:polygon(0_70%,14%_15%,27%_61%,41%_5%,56%_70%,70%_25%,84%_66%,100%_13%,100%_100%,0_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[19%] border-t-4 border-[#00b8b0]/45 bg-[#071315] [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_28px,rgba(0,240,255,.12)_29px,rgba(0,240,255,.12)_31px)]" />
              <div className="absolute bottom-[28%] right-[16%] h-[4%] w-[18%] bg-[#315f68] shadow-[0_-4px_0_#55b3be]" />

              <motion.div
                className="absolute bottom-[17%] left-[7%] z-[3] h-[38%] sm:left-[9%]"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              >
                <img
                  src="/vaishnavi-sprite-walk.png"
                  alt="Pixel-art character of Vaishnavi standing on the screen"
                  className="h-full w-auto select-none object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,.6)] [image-rendering:pixelated]"
                  draggable="false"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-[20%] left-[48%] h-[11%] w-[5%] bg-[#f5efc6] shadow-[inset_0_-7px_0_#d9a99a,5px_0_0_#10202b,-5px_0_0_#10202b]"
                animate={{ y: [0, -12, 0], x: [-22, 22, -22] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              >
                <span className="absolute -top-[28%] left-0 h-[32%] w-full bg-[#ffde8a]" />
              </motion.div>

              <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-70" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.11),transparent_28%,transparent_74%,rgba(0,240,255,.04))]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  type="button"
                  autoFocus
                  data-cursor="button"
                  onClick={handleStart}
                  disabled={launching}
                  className="pixel-corners border-2 border-[#231815] bg-[#a5bcd6] px-4 py-3 font-pixel text-[clamp(7px,1.2vw,11px)] text-[#231815] shadow-[5px_5px_0_#d9a99a,0_0_22px_rgba(165,188,214,.7)] disabled:pointer-events-none sm:px-7 sm:py-4"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  whileHover={{ scale: 1.05, x: -2, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                >
                  PRESS START
                </motion.button>
              </div>
            </div>
          </div>
          <div className="w-[12%] flex-1 bg-[#30323a]" />
          <div className="h-3 w-[38%] shrink-0 border-x-4 border-[#1c1e25] bg-[#4d5059]" />
        </div>

        <div className="absolute inset-x-4 bottom-[3.5%] z-20 text-center sm:inset-x-8">
          <h1 className="font-pixel text-[clamp(13px,2.6vw,30px)] leading-relaxed text-[var(--color-canvas)] [text-shadow:0_0_12px_#a5bcd6]">
            VAISHNAVI <span className="text-[#a5bcd6]">//</span> PRODUCT DESIGNER
          </h1>
          <motion.p
            className="mt-2 font-mono text-[clamp(8px,1.2vw,12px)] uppercase tracking-[0.18em] text-[#f5efc6]/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            A portfolio in nine chapters · click the screen to continue
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
