import {
  Lightbulb,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'

/**
 * Peta gaya per aspek SWOT. Kunci mengikuti field `warna` pada data.js
 * (green / red / blue / orange). Murni presentasional — konten tetap dari data.js.
 *
 * Setiap aspek juga membawa singkatan (mis. "S") untuk grafik SWOT besar.
 */
export const gayaAspek = {
  green: {
    Icon: ShieldCheck,
    singkatan: 'S',
    teks: 'text-swot-strengths',
    latarIkon: 'bg-swot-strengths/10',
    garis: 'before:bg-swot-strengths',
    hex: 'var(--swot-strengths)',
  },
  red: {
    Icon: TriangleAlert,
    singkatan: 'W',
    teks: 'text-swot-weaknesses',
    latarIkon: 'bg-swot-weaknesses/10',
    garis: 'before:bg-swot-weaknesses',
    hex: 'var(--swot-weaknesses)',
  },
  blue: {
    Icon: Lightbulb,
    singkatan: 'O',
    teks: 'text-swot-opportunities',
    latarIkon: 'bg-swot-opportunities/10',
    garis: 'before:bg-swot-opportunities',
    hex: 'var(--swot-opportunities)',
  },
  orange: {
    Icon: ShieldAlert,
    singkatan: 'T',
    teks: 'text-swot-threats',
    latarIkon: 'bg-swot-threats/10',
    garis: 'before:bg-swot-threats',
    hex: 'var(--swot-threats)',
  },
}

export function gayaUntuk(warna) {
  return gayaAspek[warna] ?? gayaAspek.green
}
