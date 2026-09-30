import { Suspense, useState } from 'react'

import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Environment, Lightformer, Preload } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

import { Orb } from '@/components/three/Orb'
import { useTheme } from '@/components/theme-provider'
import { usePrefersReducedMotion } from '@/lib/use-canvas'

/**
 * Isi scene: pencahayaan studio + orb. Lingkungan dibentuk dari Lightformer
 * (tanpa unduhan HDR) sehingga tetap ringan dan offline-friendly.
 */
function SceneContent({ dark }) {
  return (
    <>
      {/* Kanvas transparan: kertas + grain dari CSS tetap terlihat, dan bloom
          hanya menyala pada bagian emissive orb (bukan seluruh latar).
          Cahaya sengaja lembut & berarah agar permata matte tetap terbaca
          gelap di atas kertas terang. Environment dipakai hanya untuk kilau
          halus pada sangkar/partikel — bukan memantulkan studio jadi putih. */}
      <ambientLight intensity={dark ? 0.4 : 0.35} />
      <directionalLight position={[4, 5, 3]} intensity={dark ? 1.3 : 1.35} />
      <directionalLight
        position={[-5, -2, -4]}
        intensity={0.35}
        color={dark ? '#8fb7ff' : '#b9c9ff'}
      />

      <Environment resolution={64} frames={1}>
        <Lightformer
          form="ring"
          intensity={dark ? 1.2 : 0.6}
          color={dark ? '#ff6a5c' : '#e0322a'}
          position={[0, 2, -4]}
          scale={4}
        />
        <Lightformer
          form="rect"
          intensity={dark ? 0.6 : 0.35}
          color={dark ? '#6f8bff' : '#9fb2ff'}
          position={[-4, 0, 2]}
          scale={[3, 3, 1]}
        />
      </Environment>

      <Orb dark={dark} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={dark ? 1.35 : 1.1}
          luminanceThreshold={0.72}
          luminanceSmoothing={0.18}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  )
}

/**
 * Focal point 3D pada Hero. Dimuat lazy dari Hero supaya three.js tidak masuk
 * ke bundel awal. Kanvas disembunyikan sampai frame pertama siap (anti-kedip).
 * Saat `prefers-reduced-motion`, loop dibekukan (frameloop="demand") sehingga
 * hanya ada bingkai diam — tetap indah, tanpa gerak kontinu.
 */
export default function HeroScene({ className }) {
  const { theme } = useTheme()
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const dark = theme === 'dark'

  return (
    <div
      className={className}
      role="img"
      aria-label="Visualisasi tiga dimensi: bola berfaset dengan cincin partikel yang berputar pelan, melambangkan inti Ibu Kota Nusantara."
    >
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        frameloop={reduced ? 'demand' : 'always'}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.05
          // Beri satu frame untuk kompilasi shader, lalu tampilkan.
          requestAnimationFrame(() => setReady(true))
        }}
        className={`h-full w-full transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Suspense fallback={null}>
          <SceneContent dark={dark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
