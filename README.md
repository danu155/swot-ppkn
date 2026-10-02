# Analisis SWOT Ibu Kota Nusantara (IKN)

Website statis satu halaman berisi analisis SWOT pembangunan Ibu Kota Nusantara,
lengkap dengan latar belakang dan timeline pembangunan hingga 2045.

- Tanpa backend, tanpa database, tanpa login.
- React + Vite + Tailwind CSS, komponen bergaya shadcn/ui (kompatibel 21st.dev).
- Hasil build berupa berkas statis siap dideploy ke Vercel / Netlify / GitHub Pages.
- Desain modern-formal bertema putih bersih, animasi reveal halus saat scroll,
  dan peta Indonesia SVG beranimasi dengan penanda lokasi IKN.

## Menjalankan secara lokal

```bash
npm install       # pasang dependensi
npm run dev       # jalankan server pengembangan (http://localhost:5173)
```

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # pratinjau hasil build secara lokal
npm run lint      # jalankan oxlint
```

## Mengubah konten

Seluruh isi halaman berada di **satu berkas**: `src/data.js`.
Komponen hanya membaca dari berkas tersebut, jadi materi bisa diganti tanpa
menyentuh kode komponen.

| Ekspor           | Dipakai oleh          | Isi                                    |
| ---------------- | --------------------- | -------------------------------------- |
| `meta`           | Hero, Footer, header  | Teks antarmuka (judul, tombol, label)  |
| `latarBelakang`  | LatarBelakang         | 3 kartu konteks                        |
| `swot`           | AnalisisSwot, Marquee | 4 aspek SWOT + definisi teori + 3 poin |
| `timeline`       | Timeline              | 4 tahap pembangunan                    |

Angka sorotan pada bagian Latar Belakang (`meta.section.latarBelakang.stats`)
merupakan penyajian ulang dari kalimat yang sama di `latarBelakang` (57%, 75%,
2045) — bukan data baru.

Nilai `warna` pada `swot` (`green` / `red` / `blue` / `orange`) dipetakan ke
token warna di `src/index.css` (`--swot-strengths`, `--swot-weaknesses`,
`--swot-opportunities`, `--swot-threats`).

## Deploy statis

Hasil build (`dist/`) adalah berkas statis murni.

### Vercel

1. Impor repositori di <https://vercel.com/new>.
2. Vercel mendeteksi Vite secara otomatis (sudah dikonfirmasi oleh `vercel.json`).
3. Klik **Deploy**. Build command: `npm run build`, output: `dist`.

Atau lewat CLI:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Impor repositori di <https://app.netlify.com/start>.
2. Setelan sudah disediakan di `netlify.toml` (build `npm run build`, publish `dist`).
3. Klik **Deploy**.

Atau lewat CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

Aset sudah memakai `base: './'` sehingga aman untuk subpath.

Cara termudah — deploy folder `dist` ke branch `gh-pages`:

```bash
npm run build
npx gh-pages -d dist
```

Lalu di **Settings → Pages**, pilih branch `gh-pages` sebagai sumber.

> Catatan: bila memakai subpath khusus, Anda bisa mengatur `base` di
> `vite.config.js` (mis. `base: '/nama-repo/'`) sebelum build.

## Struktur proyek

```
├─ index.html                 # HTML + meta
├─ src/
│  ├─ data.js                 # SATU sumber konten
│  ├─ App.jsx                 # Susunan halaman
│  ├─ index.css               # Tailwind + token warna + keyframes animasi
│  ├─ lib/
│  │  ├─ utils.js             # Helper cn()
│  │  └─ swot-style.js        # Peta warna & ikon tiap aspek
│  └─ components/
│     ├─ SiteHeader.jsx       # Header sticky + navigasi + progres baca
│     ├─ ScrollProgress.jsx   # Garis progres baca di header
│     ├─ Hero.jsx             # Bagian 1 (latar foto + judul + angka kunci)
│     ├─ HeroBackground.jsx   # Foto IKN full-bleed (WebP + fallback JPG)
│     ├─ PanelLokasi.jsx      # Pelat lokasi tipografis (pengganti peta)
│     ├─ LatarBelakang.jsx    # Bagian 2 (panel lokasi + daftar alasan editorial)
│     ├─ AspekMarquee.jsx     # Pita bergulir nama aspek
│     ├─ Marquee.jsx          # Komponen marquee (CSS keyframes)
│     ├─ AnalisisSwot.jsx     # Bagian 3 (kartu + popup detail)
│     ├─ Timeline.jsx         # Bagian 4
│     ├─ Footer.jsx           # Bagian 5
│     ├─ Section.jsx          # Pembantu pembungkus & judul section
│     ├─ EditorialHeading.jsx # Judul bagian
│     ├─ Reveal.jsx           # Animasi fade/slide-in saat scroll
│     ├─ Logomark.jsx         # Monogram IKN (SVG)
│     ├─ Rule.jsx             # Garis pemisah
│     └─ ui/                  # Komponen dasar (button, dialog, aspect-card)
├─ vercel.json
├─ netlify.toml
└─ .nvmrc
```

## Aksesibilitas & performa

- Animasi menghormati `prefers-reduced-motion`.
- Detail tiap aspek SWOT dibuka lewat dialog (Radix) yang ramah keyboard dan
  mengunci fokus.
- Warna teks diuji memenuhi kontras WCAG AA pada latar putih.
- Tanpa WebGL/three.js: seluruh visual (peta) berupa SVG/CSS sehingga
  bundel ringan dan tajam di semua layar.
# swot-ppkn
# swot-ppkn
