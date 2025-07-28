'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles() {
  const ref = useRef();

  const { geometry, material } = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(30);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(30);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(30);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#ffffff'),
      size: 0.2,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
      ref.current.rotation.x += 0.0002;
    }
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Subtle animated gradient background */}
      <div
        className="absolute w-full h-full"
        style={{
          background:
            'linear-gradient(135deg,rgb(255, 129, 129) 0%,rgb(161, 103, 255) 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradientFlow 18s ease infinite',
        }}
      />

      {/* Particle canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <FloatingParticles />
      </Canvas>

      {/* Gradient animation */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
