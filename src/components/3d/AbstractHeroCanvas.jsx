import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useState } from 'react';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.8}>
      <MeshDistortMaterial
        color="#8B5CF6" /* Fallback purple just in case, but using primary blue OKLCH below */
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
        wireframe={false}
        envMapIntensity={1}
      />
    </Sphere>
  );
};

export const AbstractHeroCanvas = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="absolute inset-0 z-0 opacity-[0.15] md:opacity-[0.25] pointer-events-none flex items-center justify-center translate-x-1/4">
      <Canvas dpr={dpr} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00e5ff" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};
