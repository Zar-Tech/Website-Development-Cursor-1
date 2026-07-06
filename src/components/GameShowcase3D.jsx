import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { games } from '../data/content';

function RotatingGameCube({ color, index }) {
  const meshRef = useRef();
  const offset = index * 2.5;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + offset;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + offset;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={[index * 3 - 7.5, Math.sin(index) * 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={2}
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function GameShowcase3D() {
  const colors = games.slice(0, 6).map((g) => g.color);

  return (
    <div className="showcase-3d">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#2b7fff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4d9aff" />
        {colors.map((color, i) => (
          <RotatingGameCube key={i} color={color} index={i} />
        ))}
      </Canvas>
    </div>
  );
}
