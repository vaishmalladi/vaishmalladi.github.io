import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import type { Group } from "three";

function Figure() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* head */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#f4c9a0" roughness={0.5} />
      </mesh>
      {/* visor accent */}
      <mesh position={[0, 1.55, 0.3]}>
        <boxGeometry args={[0.4, 0.12, 0.05]} />
        <meshStandardMaterial color="#5B3DF0" emissive="#7C6CFF" emissiveIntensity={0.6} />
      </mesh>
      {/* torso */}
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.32, 0.55, 8, 16]} />
        <meshStandardMaterial color="#7C6CFF" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* belt accent */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.33, 0.03, 8, 24]} />
        <meshStandardMaterial color="#2FD6E8" emissive="#2FD6E8" emissiveIntensity={0.3} />
      </mesh>
      {/* arms */}
      <mesh position={[-0.46, 0.85, 0]} rotation={[0, 0, 0.25]}>
        <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
        <meshStandardMaterial color="#5B3DF0" roughness={0.5} />
      </mesh>
      <mesh position={[0.46, 0.85, 0]} rotation={[0, 0, -0.25]}>
        <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
        <meshStandardMaterial color="#5B3DF0" roughness={0.5} />
      </mesh>
      {/* legs */}
      <mesh position={[-0.16, 0.15, 0]}>
        <capsuleGeometry args={[0.13, 0.55, 6, 12]} />
        <meshStandardMaterial color="#2A2740" roughness={0.6} />
      </mesh>
      <mesh position={[0.16, 0.15, 0]}>
        <capsuleGeometry args={[0.13, 0.55, 6, 12]} />
        <meshStandardMaterial color="#2A2740" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Stage() {
  const ring = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z -= delta * 0.15;
  });

  return (
    <group ref={ring} position={[0, -0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[1.05, 1.15, 48]} />
        <meshBasicMaterial color="#7C6CFF" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.3, 1.32, 48]} />
        <meshBasicMaterial color="#2FD6E8" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function RotatingAvatar({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 3.6], fov: 42 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[-3, 2, 3]} intensity={40} color="#7C6CFF" />
        <pointLight position={[3, 1, 2]} intensity={35} color="#2FD6E8" />
        <spotLight position={[0, 4, 2]} intensity={60} angle={0.5} penumbra={0.6} color="#ffffff" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0} floatIntensity={0.5}>
            <Figure />
          </Float>
          <Stage />
          <ContactShadows position={[0, -0.68, 0]} opacity={0.35} scale={4} blur={2.4} far={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
