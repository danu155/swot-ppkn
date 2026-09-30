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
 * Setiap aspek juga membawa singkatan (mis. "S") untuk grafik SWOT besar, serta
 * kelas-kelas untuk cover kartu (tint latar + warna ikon/cakram).
 */
export const gayaAspek = {
  green: {
    Icon: ShieldCheck,
    singkatan: 'S',
    teks: 'text-swot-strengths',
    latarIkon: 'bg-swot-strengths/10',
    garis: 'before:bg-swot-strengths',
    hex: 'var(--swot-strengths)',
    coverBg: 'bg-gradient-to-br from-swot-strengths/18 via-swot-strengths/6 to-transparent',
    pill: 'border-swot-strengths/35 text-swot-strengths',
  },
  red: {
    Icon: TriangleAlert,
    singkatan: 'W',
    teks: 'text-swot-weaknesses',
    latarIkon: 'bg-swot-weaknesses/10',
    garis: 'before:bg-swot-weaknesses',
    hex: 'var(--swot-weaknesses)',
    coverBg:
      'bg-gradient-to-br from-swot-weaknesses/18 via-swot-weaknesses/6 to-transparent',
    pill: 'border-swot-weaknesses/35 text-swot-weaknesses',
  },
  blue: {
    Icon: Lightbulb,
    singkatan: 'O',
    teks: 'text-swot-opportunities',
    latarIkon: 'bg-swot-opportunities/10',
    garis: 'before:bg-swot-opportunities',
    hex: 'var(--swot-opportunities)',
    coverBg:
      'bg-gradient-to-br from-swot-opportunities/18 via-swot-opportunities/6 to-transparent',
    pill: 'border-swot-opportunities/35 text-swot-opportunities',
  },
  orange: {
    Icon: Flame,
    singkatan: 'T',
    teks: 'text-swot-threats',
    latarIkon: 'bg-swot-threats/10',
    garis: 'before:bg-swot-threats',
    hex: 'var(--swot-threats)',
    coverBg: 'bg-gradient-to-br from-swot-threats/18 via-swot-threats/6 to-transparent',
    pill: 'border-swot-threats/35 text-swot-threats',
  },
}

export function gayaUntuk(warna) {
  return gayaAspek[warna] ?? gayaAspek.green
}
