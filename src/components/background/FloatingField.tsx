import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";

interface FloatingFieldProps {
  className?: string;
  variant?: "hero" | "lab";
}

function Island({
  position,
  scale,
  color,
  geometry,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  geometry: "icosahedron" | "octahedron" | "dodecahedron";
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color={color}
          distort={0.28}
          speed={1.5}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingField({ className, variant = "hero" }: FloatingFieldProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#7c6cff" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#2fd6e8" />

        <Suspense fallback={null}>
          <Island position={[-2.4, 0.8, 0]} scale={1.1} color="#a99bff" geometry="icosahedron" />
          <Island position={[2.6, -0.6, -1]} scale={0.8} color="#7fe6ef" geometry="octahedron" />
          <Island position={[0.4, 1.6, -2]} scale={0.55} color="#ffd48a" geometry="dodecahedron" />
          {variant === "lab" && (
            <Island position={[-1.2, -1.4, -1.5]} scale={0.6} color="#7ce8c4" geometry="octahedron" />
          )}
          <Sparkles count={variant === "lab" ? 90 : 60} scale={[8, 5, 4]} size={2} speed={0.3} opacity={0.6} color="#7c6cff" />
        </Suspense>
      </Canvas>
    </div>
  );
}
