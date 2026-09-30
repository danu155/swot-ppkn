import { useMemo, useRef } from 'react'

import { Float, Icosahedron } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

/**
 * Orb "inti" — ikon abstrak modal/kapital.
 *
 * Susunan lapisan (dari dalam ke luar):
 *   1. Inti emissive      → sumber cahaya, titik bloom paling terang.
 *   2. Permata ikosahedron→ polihedron gelap matte (tinta), facet flat.
 *   3. Sangkar wireframe  → rusuk aksen menyala, berputar berlawanan arah.
 *   4. Partikel pengorbit → titik-titik halus yang mengelilingi orb.
 *
 * Catatan material: permata sengaja dibuat NON-logam (metalness 0) dan kasar
 * (roughness tinggi) supaya tetap terbaca sebagai objek gelap di atas kertas
 * terang — bukan memantulkan seluruh studio jadi putih. Aksen "menyala" hanya
 * pada inti + sangkar (meshBasicMaterial + toneMapped:false) agar bloom tepat
 * sasaran.
 */

const PARTICLES = 380

/**
 * Dibuat sekali di lingkup modul (bukan saat render) agar posisi partikel tetap
 * stabil di seluruh siklus hidup aplikasi dan tidak melanggar aturan purity.
 */
function buatPosisiOrbit(count, radius) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = radius * (0.92 + Math.random() * 0.16)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.cos(phi) * (0.35 + Math.random() * 0.4)
    arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  return arr
}

const POSISI_ORBIT = buatPosisiOrbit(PARTICLES, 2.05)

export function Orb({ dark = false }) {
  const group = useRef(null)
  const shell = useRef(null)
  const cage = useRef(null)
  const particles = useRef(null)
  const core = useRef(null)
  const { pointer } = useThree()

  const palette = useMemo(
    () =>
      dark
        ? {
            gem: '#120f10',
            edge: '#ff6f60',
            core: '#ff8a7a',
            dot: '#f0a79c',
          }
        : {
            gem: '#26211d',
            edge: '#d0342a',
            core: '#ff4d40',
            dot: '#c4553f',
          },
    [dark],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (shell.current) {
      shell.current.rotation.y += delta * 0.16
      shell.current.rotation.x = Math.sin(t * 0.25) * 0.12
    }
    if (cage.current) {
      cage.current.rotation.y -= delta * 0.26
      cage.current.rotation.z += delta * 0.05
    }
    if (particles.current) {
      particles.current.rotation.y += delta * 0.06
      particles.current.rotation.x = Math.sin(t * 0.18) * 0.08
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.7) * 0.08
      core.current.scale.setScalar(s)
    }

    // Paralaks lembut mengikuti kursor (ditulis ke ref, tanpa re-render).
    if (group.current) {
      const targetX = pointer.x * 0.3
      const targetY = pointer.y * 0.24
      group.current.rotation.y +=
        (targetX - group.current.rotation.y) * Math.min(1, delta * 2.2)
      group.current.rotation.x +=
        (-targetY - group.current.rotation.x) * Math.min(1, delta * 2.2)
    }
  })

  return (
    <group ref={group} dispose={null}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        {/* Inti emissive — titik bloom */}
        <mesh ref={core}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshBasicMaterial color={palette.core} toneMapped={false} />
        </mesh>

        {/* Permata ikosahedron — gelap matte, facet flat */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.32, 1]} />
          <meshStandardMaterial
            color={palette.gem}
            metalness={0}
            roughness={0.92}
            flatShading
          />
        </mesh>

        {/* Sangkar wireframe aksen, berputar berlawanan arah */}
        <Icosahedron ref={cage} args={[1.74, 1]}>
          <meshBasicMaterial
            color={palette.edge}
            wireframe
            transparent
            opacity={dark ? 0.9 : 0.8}
            toneMapped={false}
          />
        </Icosahedron>

        {/* Partikel pengorbit */}
        <points ref={particles}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[POSISI_ORBIT, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color={palette.dot}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
            toneMapped={false}
          />
        </points>
      </Float>
    </group>
  )
}

export default Orb
