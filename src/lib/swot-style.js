import {
  Flame,
  Lightbulb,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'

/**
 * Peta gaya per aspek SWOT. Kunci mengikuti field `warna` pada data.js
 * (green / red / blue / orange). Murni presentasional — konten tetap dari data.js.
 *
 * Setiap aspek membawa ikon, singkatan (untuk tipografi besar), serta kelas
 * warna untuk teks, lencana ikon, garis aksen, dan gradien permukaan kartu.
 */
export const gayaAspek = {
  green: {
    Icon: ShieldCheck,
    singkatan: 'S',
    teks: 'text-swot-strengths',
    latarIkon: 'bg-swot-strengths/10',
    garis: 'bg-swot-strengths',
    lengkung: 'from-swot-strengths/70',
    hex: 'var(--swot-strengths)',
    coverBg:
      'bg-gradient-to-br from-swot-strengths/[0.16] via-swot-strengths/[0.05] to-transparent',
    kaca: 'ring-swot-strengths/25',
  },
  red: {
    Icon: TriangleAlert,
    singkatan: 'W',
    teks: 'text-swot-weaknesses',
    latarIkon: 'bg-swot-weaknesses/10',
    garis: 'bg-swot-weaknesses',
    lengkung: 'from-swot-weaknesses/70',
    hex: 'var(--swot-weaknesses)',
    coverBg:
      'bg-gradient-to-br from-swot-weaknesses/[0.16] via-swot-weaknesses/[0.05] to-transparent',
    kaca: 'ring-swot-weaknesses/25',
  },
  blue: {
    Icon: Lightbulb,
    singkatan: 'O',
    teks: 'text-swot-opportunities',
    latarIkon: 'bg-swot-opportunities/10',
    garis: 'bg-swot-opportunities',
    lengkung: 'from-swot-opportunities/70',
    hex: 'var(--swot-opportunities)',
    coverBg:
      'bg-gradient-to-br from-swot-opportunities/[0.16] via-swot-opportunities/[0.05] to-transparent',
    kaca: 'ring-swot-opportunities/25',
  },
  orange: {
    Icon: Flame,
    singkatan: 'T',
    teks: 'text-swot-threats',
    latarIkon: 'bg-swot-threats/10',
    garis: 'bg-swot-threats',
    lengkung: 'from-swot-threats/70',
    hex: 'var(--swot-threats)',
    coverBg:
      'bg-gradient-to-br from-swot-threats/[0.16] via-swot-threats/[0.05] to-transparent',
    kaca: 'ring-swot-threats/25',
  },
}

export function gayaUntuk(warna) {
  return gayaAspek[warna] ?? gayaAspek.green
}
