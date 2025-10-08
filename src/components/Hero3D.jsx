import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sparkles, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TranslationProvider, LanguageSwitcher, useTranslation } from './LanguageSwitcher'; // <-- import the shared translation module

function MatrixRain({ count = 120 }) {
  const group = useRef();
  const drops = useMemo(() => {
    return new Array(count).fill().map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 8,
      z: (Math.random() - 0.5) * 6,
      speed: 0.02 + Math.random() * 0.04,
      size: 0.12 + Math.random() * 0.2,
      char: String.fromCharCode(33 + Math.floor(Math.random() * 94)),
      hue: 140 + Math.random() * 60,
    }));
  }, [count]);

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((m, i) => {
      const d = drops[i];
      d.y -= d.speed;
      if (d.y < -4.5) {
        d.y = 4.5 + Math.random() * 1.5;
        d.x = (Math.random() - 0.5) * 10;
      }
      m.position.set(d.x, d.y, d.z);
      m.scale.set(d.size, d.size, 1);
      if (m.material && m.material.color) m.material.color.setHSL(d.hue / 360, 0.9, 0.5);
    });
  });

  return (
    <group ref={group}>
      {drops.map((d, i) => (
        <Text
          key={i}
          position={[d.x, d.y, d.z]}
          fontSize={0.35}
          color={`#00ff88`}
          anchorX="center"
          anchorY="middle"
          depthWrite={false}
        >
          {d.char}
        </Text>
      ))}
    </group>
  );
}

function NeonGrid() {
  return (
    <group position={[0, -1.6, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 40, 40]} />
        <meshStandardMaterial color="#040511" emissive="#071424" metalness={0.6} roughness={0.1} />
      </mesh>

      {Array.from({ length: 21 }).map((_, i) => {
        const x = -10 + i;
        return (
          <mesh key={`vx-${i}`} position={[x, -1.59, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.02, 20]} />
            <meshBasicMaterial color="#00334d" transparent opacity={0.18} />
          </mesh>
        );
      })}
      {Array.from({ length: 21 }).map((_, i) => {
        const z = -10 + i;
        return (
          <mesh key={`vz-${i}`} position={[0, -1.59, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 0.02]} />
            <meshBasicMaterial color="#00334d" transparent opacity={0.18} />
          </mesh>
        );
      })}
    </group>
  );
}

function CodeCube() {
  const faceColors = [
    '#f7df1e',
    '#61dafb',
    '#37a0ff',
    '#e34c26',
    '#563d7c',
    '#0ea5e9',
  ];

  const edgeRef = useRef();

  useFrame(({ clock }) => {
    if (edgeRef.current) edgeRef.current.rotation.y = clock.getElapsedTime() * 0.35;
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={1.8} floatIntensity={1}>
        <group>
          <mesh scale={2} rotation={[Math.PI / 6, Math.PI / 6, 0]}>
            <boxGeometry args={[1.6, 1.6, 1.6]} />
            {faceColors.map((color, i) => (
              <MeshDistortMaterial
                key={i}
                attach={`material-${i}`}
                color={color}
                distort={0.28}
                speed={1 + i * 0.12}
                roughness={0.12}
                metalness={0.75}
                emissive={color}
                emissiveIntensity={0.08}
              />
            ))}
          </mesh>

          <mesh ref={edgeRef} scale={2.06}>
            <boxGeometry args={[1.62, 1.62, 1.62]} />
            <meshBasicMaterial wireframe color="#00e5ff" transparent opacity={0.65} />
          </mesh>

          <group position={[0, 0.9, 0]}>
            <Text fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
              SamCode
            </Text>
          </group>

          <Sparkles size={4} scale={[3, 1.2, 3]} color="#0ea5e9" opacity={0.6} />
        </group>
      </Float>

      <MatrixRain count={150} />
      <NeonGrid />
    </>
  );
}

function Background3D() {
  return (
    <Canvas
      className="hero-bg-canvas"
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.7} color="#0ea5e9" />
      <CodeCube />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}

export default function Hero3D() {
  const imgRef = useRef(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  function onPointerDown(e) {
    const img = imgRef.current;
    if (!img) return;
    draggingRef.current = true;
    const rect = img.getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
    img.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!draggingRef.current) return;
    const img = imgRef.current;
    if (!img) return;
    const parentRect = img.parentElement?.getBoundingClientRect();
    let left = e.clientX - offsetRef.current.x - (parentRect ? parentRect.left : 0);
    let top = e.clientY - offsetRef.current.y - (parentRect ? parentRect.top : 0);

    if (parentRect) {
      left = Math.max(0, Math.min(left, parentRect.width - img.offsetWidth));
      top = Math.max(0, Math.min(top, parentRect.height - img.offsetHeight));
    }

    img.style.left = `${left}px`;
    img.style.top = `${top}px`;
  }

  function onPointerUp(e) {
    draggingRef.current = false;
    const img = imgRef.current;
    if (img && e.pointerId && img.releasePointerCapture) img.releasePointerCapture(e.pointerId);
    window.removeEventListener('pointermove', onPointerMove);
    if (img) img.style.cursor = 'grab';
  }

  return (
    <InnerHero imgRef={imgRef} onPointerDown={onPointerDown} />
  );
}

function InnerHero({ imgRef, onPointerDown }) {
  const { t } = useTranslation();

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <Background3D />
      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <img
          ref={imgRef}
          src="/samcode.png"
          alt="SamCode"
          onPointerDown={onPointerDown}
          style={{
            position: 'absolute',
            left: '70%',
            top: '-12%',
            width: 200,
            height: 500,
            objectFit: 'cover',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            cursor: 'grab',
            touchAction: 'none',
            zIndex: 2,
          }}
        />

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('greet')} <span className="highlight">SamCode</span>
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t('desc')}
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', gap: 12, alignItems: 'center' }}
          >
            <a href="#projects" className="btn-primary">{t('projectBtn')}</a>
            <a href="#contact" className="btn-secondary">{t('contactBtn')}</a>
          </motion.div>

          {/* use the shared language switcher */}
          <LanguageSwitcher style={{ marginTop: 10 }} />
        </motion.div>
      </div>
    </section>
  );
}
