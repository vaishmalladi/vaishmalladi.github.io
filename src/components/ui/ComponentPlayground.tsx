import { motion } from "framer-motion";
import { DESIGN_TOKENS } from "../../data/content";
import GlassPanel from "./GlassPanel";

export default function ComponentPlayground() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassPanel className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-deep)]">
          Component Playground
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            data-cursor="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pixel-corners bg-[var(--color-violet-deep)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Primary
          </motion.button>
          <motion.button
            data-cursor="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-panel border border-[var(--color-hairline)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-violet-deep)]"
          >
            Secondary
          </motion.button>
          <span className="h-9 w-9 animate-spin-slow rounded-full border-2 border-[var(--color-violet)]/25 border-t-[var(--color-violet)]" />
        </div>

        <div className="h-2.5 w-full overflow-hidden border border-[var(--color-hairline)]/10 bg-[var(--color-veil)]/[0.04]">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "72%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
          {["Notification", "Metric Card"].map((label) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="glass-panel border border-[var(--color-hairline)]/10 p-4"
            >
              <p className="text-xs font-semibold text-[var(--color-ink)]">{label}</p>
              <p className="text-[11px] text-[var(--color-ink-faint)]">Morphs into place on scroll</p>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="flex flex-col gap-4 p-4 sm:p-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-deep)]">
          Design Tokens
        </span>
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3">
          {DESIGN_TOKENS.map((token) => (
            <div key={token.name} className="flex items-center gap-2 border border-[var(--color-hairline)]/10 bg-[var(--color-veil)]/[0.04] p-2.5">
              {token.swatch && (
                <span
                  className="h-6 w-6 flex-none rounded-full border border-[var(--color-hairline)]/70 shadow-sm"
                  style={{ background: token.swatch }}
                />
              )}
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-[var(--color-ink)]">{token.name}</p>
                <p className="truncate font-mono text-[10px] text-[var(--color-ink-faint)]">{token.value}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
