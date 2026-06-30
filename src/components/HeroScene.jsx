import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry, speed = 1, distort = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'torus' && <torusGeometry args={[1, 0.35, 16, 48]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.2]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1]} />}
        {geometry === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 800;
  const mesh = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.15, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function CentralOrb() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#22d3ee"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#22d3ee"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Scene({ mouse }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouse.current.x * 2,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.current.y * 1.5 + 1,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#a855f7" />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} color="#ffffff" />

      <CentralOrb />
      <FloatingShape position={[-4, 2, -2]} color="#a855f7" geometry="torus" speed={0.8} />
      <FloatingShape position={[4, -1, -3]} color="#22d3ee" geometry="octahedron" speed={1.2} />
      <FloatingShape position={[-3, -2, 1]} color="#6366f1" geometry="icosahedron" speed={0.6} />
      <FloatingShape position={[3.5, 2.5, 0]} color="#ec4899" geometry="box" speed={1} distort={0.15} />
      <ParticleField />
      <Stars radius={50} depth={50} count={2000} factor={3} saturation={0.5} fade speed={0.5} />
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  return (
    <div className="hero-canvas" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 1, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
