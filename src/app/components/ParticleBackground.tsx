'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

/* =========================================================
   COLORS
========================================================= */

const DUST = '#C4B5FD'; // soft violet dust
const VIOLET = '#8B5CF6'; // wave start
const CYAN = '#22D3EE'; // wave end
const BACKGROUND = '#0A0A12';

/* =========================================================
   HOOKS
========================================================= */

type Quality = { mobile: boolean; reduced: boolean };

/** Reads screen size + reduced-motion preference (client only). */
function useQuality(): Quality | null {
  const [quality, setQuality] = useState<Quality | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () =>
      setQuality({
        mobile: mobileQuery.matches,
        reduced: reducedQuery.matches,
      });

    update();
    mobileQuery.addEventListener('change', update);
    reducedQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      reducedQuery.removeEventListener('change', update);
    };
  }, []);

  return quality;
}

/** True while the browser tab is visible. */
function usePageVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}

function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return mouse;
}

/* =========================================================
   WAVES: soft flowing aurora ribbon made of thin curved lines
   Lines fade out at both ends and glow where they overlap.
   Everything is measured against the screen size, so it looks
   the same on phones and big monitors.
========================================================= */

function Waves({ lines, points }: { lines: number; points: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const positionRef = useRef<THREE.BufferAttribute>(null);
  const mouse = useMousePosition();

  const { positions, colors, us, ys, zs } = useMemo(() => {
    const segments = lines * (points - 1);
    const positions = new Float32Array(segments * 2 * 3);
    const colors = new Float32Array(segments * 2 * 3);

    // u runs from -0.6 to 0.6 (a bit wider than the screen on both sides)
    const us = new Float32Array(points);
    for (let p = 0; p < points; p++) us[p] = -0.6 + (1.2 * p) / (points - 1);

    const violet = new THREE.Color(VIOLET);
    const cyan = new THREE.Color(CYAN);
    const tmp = new THREE.Color();

    let c = 0;
    for (let l = 0; l < lines; l++) {
      const k = lines > 1 ? l / (lines - 1) : 0.5;
      // middle lines are brighter than the outer ones
      const lineStrength = 0.4 + 0.6 * Math.sin(Math.PI * k);

      for (let p = 0; p < points - 1; p++) {
        for (let e = 0; e < 2; e++) {
          const t = (p + e) / (points - 1);
          // violet on the left -> cyan on the right
          tmp.copy(violet).lerp(cyan, t);
          // fade to nothing at both ends (works with additive blending)
          const fade = Math.pow(Math.sin(Math.PI * t), 1.5) * lineStrength;
          colors[c++] = tmp.r * fade;
          colors[c++] = tmp.g * fade;
          colors[c++] = tmp.b * fade;
        }
      }
    }

    return {
      positions,
      colors,
      us,
      ys: new Float32Array(points),
      zs: new Float32Array(points),
    };
  }, [lines, points]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const vw = state.viewport.width;
    const vh = state.viewport.height;

    // all sizes are fractions of the screen height
    const amp1 = vh * 0.13; // big slow swell
    const amp2 = vh * 0.045; // smaller ripple on top
    const spread = vh * 0.2; // how wide the ribbon is
    const centerY = -vh * 0.1; // sits a little below the middle

    let i = 0;
    for (let l = 0; l < lines; l++) {
      const k = lines > 1 ? l / (lines - 1) : 0.5;
      const baseY = centerY + (k - 0.5) * spread;
      const phase = l * 0.16;

      for (let p = 0; p < points; p++) {
        const u = us[p];
        ys[p] =
          baseY +
          Math.sin(u * 7 + t * 0.25 + phase) * amp1 +
          Math.sin(u * 13 - t * 0.18 + phase * 1.7) * amp2;
        zs[p] = Math.sin(u * 4 + phase + t * 0.1) * 0.6;
      }

      for (let p = 0; p < points - 1; p++) {
        positions[i++] = us[p] * vw;
        positions[i++] = ys[p];
        positions[i++] = zs[p];
        positions[i++] = us[p + 1] * vw;
        positions[i++] = ys[p + 1];
        positions[i++] = zs[p + 1];
      }
    }

    if (positionRef.current) positionRef.current.needsUpdate = true;

    const group = groupRef.current;
    if (group) {
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        mouse.current.x * 0.08,
        0.03
      );
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        -mouse.current.y * 0.05,
        0.03
      );
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            ref={positionRef}
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* =========================================================
   DUST: very faint tiny dots so the page doesn't feel empty
========================================================= */

function Dust({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = (Math.random() - 0.5) * 20;
      data[i * 3 + 1] = (Math.random() - 0.5) * 12;
      data[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return data;
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    points.position.x = Math.sin(time * 0.08) * 0.12;
    points.position.y = Math.cos(time * 0.12) * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        color={DUST}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Points>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene({ mobile }: { mobile: boolean }) {
  return (
    <>
      <Waves lines={mobile ? 10 : 16} points={mobile ? 70 : 110} />
      <Dust count={mobile ? 150 : 400} />
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ParticleBackground() {
  const quality = useQuality();
  const pageVisible = usePageVisible();

  // Until we know the screen size, show the plain background (no flash)
  if (!quality) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-canvas" />
    );
  }

  const { mobile, reduced } = quality;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-canvas">
      <Canvas
        dpr={mobile ? [1, 1] : [1, 1.5]}
        // reduced motion -> draw one still frame; hidden tab -> pause completely
        frameloop={reduced ? 'demand' : pageVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true, // keeps thin lines smooth
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={[BACKGROUND]} />
        <Scene mobile={mobile} />
      </Canvas>

      {/* Soft vignette: keeps the centre calm so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,18,0.7)_100%)]" />
    </div>
  );
}