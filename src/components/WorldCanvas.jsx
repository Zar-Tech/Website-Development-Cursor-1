import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';
import { games } from '../data/content';

function ParticleNebula() {
  const count = 1200;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.9, 0.55);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function GameOrb({ index, total }) {
  const meshRef = useRef();
  const game = games[index];
  const angle = (index / total) * Math.PI * 2;
  const radius = 5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const a = angle + t * 0.15;
    meshRef.current.position.x = Math.cos(a) * radius;
    meshRef.current.position.z = Math.sin(a) * radius;
    meshRef.current.position.y = Math.sin(t * 0.8 + index) * 0.8;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.6;
  });

  return (
    <Float speed={2} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={game.color}
          emissive={game.color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function CentralCore() {
  const ref = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.2;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.3;
      innerRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      <Torus ref={ref} args={[2.2, 0.08, 16, 100]}>
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} metalness={1} roughness={0} />
      </Torus>
      <Sphere ref={innerRef} args={[0.9, 32, 32]}>
        <MeshDistortMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={0.3} distort={0.35} speed={3} metalness={0.8} roughness={0.1} />
      </Sphere>
      <Icosahedron args={[1.4, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} wireframe transparent opacity={0.3} />
      </Icosahedron>
    </group>
  );
}

function SceneContent() {
  const { scrollProgress, mouse } = useApp();
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 10 });

  useFrame(() => {
    target.current.x = mouse.x * 1.5;
    target.current.y = mouse.y * 1 + 1;
    target.current.z = 10 - scrollProgress * 4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.current.z, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
      <pointLight position={[-10, -5, 5]} intensity={1.5} color="#ff00aa" />
      <pointLight position={[0, -10, 10]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 15, 0]} intensity={1} angle={0.4} penumbra={1} color="#ffffff" />

      <CentralCore />
      {games.map((_, i) => (
        <GameOrb key={i} index={i} total={games.length} />
      ))}
      <ParticleNebula />
      <Stars radius={80} depth={60} count={3000} factor={4} saturation={0.6} fade speed={0.3} />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0008, 0.0008]} />
      </EffectComposer>
    </>
  );
}

export default function WorldCanvas() {
  return (
    <div className="world-canvas" id="world-canvas">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
