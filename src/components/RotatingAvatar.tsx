import CursorEyes from "./ui/CursorEyes";

const AVATAR_IMAGE = "/vaishnavi-voxel-transparent.png";

/** Static pixel-character portrait whose eyes track the cursor. */
export default function RotatingAvatar({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-cyan)]/20 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-cyan)_14%,transparent)_0%,color-mix(in_srgb,var(--color-violet)_7%,transparent)_36%,transparent_68%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--color-violet)]/20" />

      <div className="relative aspect-[880/1258] max-h-full w-full max-w-md">
        <img
          src={AVATAR_IMAGE}
          alt="Pixel-art 3D character of Vaishnavi"
          className="absolute inset-0 size-full select-none object-contain"
          draggable="false"
        />
        <CursorEyes />
      </div>

      <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-6 w-[52%] -translate-x-1/2 rounded-full bg-[var(--color-cyan)]/25 blur-xl" />
    </div>
  );
}
