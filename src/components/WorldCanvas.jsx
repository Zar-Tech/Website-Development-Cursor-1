import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Torus, Icosahedron, Ring } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';
import { games } from '../data/content';

function ParticleNebula() {
  const count = 2000;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const hue = 0.48 + Math.random() * 0.25;
      const c = new THREE.Color().setHSL(hue, 1, 0.55 + Math.random() * 0.2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function GameOrb({ index, total }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const game = games[index];
  const angle = (index / total) * Math.PI * 2;
  const radius = 5.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const a = angle + t * 0.12;
    meshRef.current.position.x = Math.cos(a) * radius;
    meshRef.current.position.z = Math.sin(a) * radius;
    meshRef.current.position.y = Math.sin(t * 0.7 + index * 1.2) * 1;
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.7;
    if (ringRef.current) ringRef.current.rotation.z = -t * 0.3;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color={game.color}
            emissive={game.color}
            emissiveIntensity={1}
            metalness={0.95}
            roughness={0.05}
            wireframe
          />
        </mesh>
        <Ring ref={ringRef} args={[0.9, 1.05, 32]}>
          <meshBasicMaterial color={game.color} transparent opacity={0.25} side={THREE.DoubleSide} />
        </Ring>
      </Float>
    </group>
  );
}

function CentralCore() {
  const torusRef = useRef();
  const torus2Ref = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) torusRef.current.rotation.y = t * 0.25;
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = t * 0.18;
      torus2Ref.current.rotation.z = t * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.35;
      innerRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      <Torus ref={torusRef} args={[2.5, 0.06, 16, 100]}>
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.2} metalness={1} roughness={0} />
      </Torus>
      <Torus ref={torus2Ref} args={[1.8, 0.04, 16, 80]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={0.9} metalness={1} roughness={0} />
      </Torus>
      <Sphere ref={innerRef} args={[1, 48, 48]}>
        <MeshDistortMaterial
          color="#ff00aa"
          emissive="#ff00aa"
          emissiveIntensity={0.5}
          distort={0.45}
          speed={4}
          metalness={0.9}
          roughness={0.05}
        />
      </Sphere>
      <Icosahedron args={[1.6, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.35} wireframe transparent opacity={0.25} />
      </Icosahedron>
    </group>
  );
}

function SceneContent() {
  const { scrollProgress, mouse } = useApp();
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 10 });

  useFrame(() => {
    target.current.x = mouse.x * 2;
    target.current.y = mouse.y * 1.2 + 0.5;
    target.current.z = 10 - scrollProgress * 5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.current.z, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={['#030508', 12, 35]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#00f0ff" />
      <pointLight position={[-10, -5, 5]} intensity={2} color="#ff00aa" />
      <pointLight position={[0, -10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[5, 5, -5]} intensity={0.8} color="#f59e0b" />
      <spotLight position={[0, 15, 0]} intensity={1.2} angle={0.35} penumbra={1} color="#ffffff" />

      <CentralCore />
      {games.map((_, i) => (
        <GameOrb key={i} index={i} total={games.length} />
      ))}
      <ParticleNebula />
      <Stars radius={100} depth={80} count={5000} factor={5} saturation={0.8} fade speed={0.4} />

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.15} luminanceSmoothing={0.85} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0012, 0.0012]} />
        <Vignette offset={0.2} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default function WorldCanvas() {
  return (
    <div className="world-canvas" id="world-canvas">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
