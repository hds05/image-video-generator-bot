'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints() {
  const pointsRef = useRef();
  const numPoints = 1500;
  const positions = new Float32Array(numPoints * 3);

  for (let i = 0; i < numPoints * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0009;
      pointsRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <Points ref={pointsRef} geometry={geometry}>
      <PointMaterial
        transparent
        color="#00ccff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <AnimatedPoints />
      </Canvas>
    </div>
  );
}
