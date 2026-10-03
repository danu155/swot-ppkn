import { useEffect, useId, useState } from 'react'

import {
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Loader2,
  MessageSquare,
  Radio,
  Send,
} from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Rule } from '@/components/Rule'
import { Section, SectionHeading } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { meta } from '@/data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

// Data contoh awal untuk presentasi jika tabel Supabase masih kosong atau belum terhubung
const contohKomentarAwal = [
  {
    id: 'demo-1',
    nama: 'Budi Santoso',
    kategori: 'Pertanyaan',
    pesan:
      'Bagaimana mitigasi konkrit untuk perlindungan satwa endemik di luar kawasan inti IKN?',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'demo-2',
    nama: 'Kelompok 3',
    kategori: 'Pandangan',
    pesan:
      'Konsep Smart Forest City sangat visioner untuk mengurangi beban ekologis Jakarta yang kian padat.',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
]

function formatWaktu(waktuStr) {
  try {
    const waktu = new Date(waktuStr)
    const selisihMenit = Math.floor((Date.now() - waktu.getTime()) / (1000 * 60))

    if (selisihMenit < 1) return 'Baru saja'
    if (selisihMenit < 60) return `${selisihMenit} mnt lalu`

    return waktu.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return 'Baru saja'
  }
}

function lencanaKategori(kategori) {
  switch (kategori) {
    case 'Pertanyaan':
      return {
        ikon: HelpCircle,
        kelas:
          'text-swot-opportunities bg-swot-opportunities/10 border-swot-opportunities/20',
      }
    case 'Saran':
      return {
        ikon: Lightbulb,
        kelas: 'text-accent-brass bg-accent-brass/10 border-accent-brass/20',
      }
    default:
      return {
        ikon: MessageSquare,
        kelas: 'text-accent-ikn bg-accent-ikn/10 border-accent-ikn/20',
      }
  }
}

export default function DiskusiKomentar() {
  const { judul, deskripsi, kategoriOpsi } = meta.section.diskusi
  const formId = useId()

  const [komentarList, setKomentarList] = useState([])
  const [loading, setLoading] = useState(true)
  const [kirimLoading, setKirimLoading] = useState(false)
  const [suksesKirim, setSuksesKirim] = useState(false)
  const [filterKategori, setFilterKategori] = useState('Semua')

  // State form
  const [nama, setNama] = useState('')
  const [kategori, setKategori] = useState(kategoriOpsi[0] || 'Pertanyaan')
  const [pesan, setPesan] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // 1. Ambil data awal dan aktifkan Supabase Realtime
  useEffect(() => {
    let channel = null

    async function muatKomentar() {
      if (!isSupabaseConfigured || !supabase) {
        // Fallback demo lokal bila env belum diisi
        setKomentarList(contohKomentarAwal)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('komentar')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setKomentarList(data || [])
      } catch (err) {
        console.error('Gagal mengambil data komentar:', err)
        setKomentarList(contohKomentarAwal)
      } finally {
        setLoading(false)
      }

      // Langganan pembaruan realtime
      channel = supabase
        .channel('komentar-live')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'komentar' },
          (payload) => {
            setKomentarList((prev) => {
              // Hindari duplikasi jika sudah ada di state
              if (prev.some((k) => k.id === payload.new.id)) return prev
              return [payload.new, ...prev]
            })
          },
        )
        .subscribe()
    }

    muatKomentar()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  // 2. Handler kirim komentar
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!nama.trim() || !pesan.trim()) {
      setErrorMsg('Mohon isi nama dan pesan Anda.')
      return
    }

    setKirimLoading(true)

    const dataBaru = {
      nama: nama.trim(),
      kategori,
      pesan: pesan.trim(),
    }

    if (!isSupabaseConfigured || !supabase) {
      // Simulasi lokal jika belum menghubungkan Supabase
      const itemLokal = {
        ...dataBaru,
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
      }
      setKomentarList((prev) => [itemLokal, ...prev])
      setPesan('')
      setSuksesKirim(true)
      setKirimLoading(false)
      setTimeout(() => setSuksesKirim(false), 4000)
      return
    }

    try {
      const { data, error } = await supabase
        .from('komentar')
        .insert([dataBaru])
        .select()
        .single()

      if (error) throw error

      if (data) {
        setKomentarList((prev) => {
          if (prev.some((k) => k.id === data.id)) return prev
          return [data, ...prev]
        })
      }

      setPesan('')
      setSuksesKirim(true)
      setTimeout(() => setSuksesKirim(false), 4000)
    } catch (err) {
      console.error('Gagal mengirim komentar:', err)
      setErrorMsg(
        'Gagal mengirim ke Supabase. Pastikan tabel "komentar" sudah dibuat.',
      )
    } finally {
      setKirimLoading(false)
    }
  }

  const listTertampil = komentarList.filter((k) => {
    if (filterKategori === 'Semua') return true
    return k.kategori === filterKategori
  })

  return (
    <Section id="diskusi" className="border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Rule className="mt-2" />

        {/* Kepala bagian */}
        <div className="mt-12 grid items-end gap-8 sm:mt-14 lg:grid-cols-12">
          <SectionHeading
            bab="04"
            eyebrow="Tanggapan Publik"
            judul={judul}
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {deskripsi}
            </p>
          </Reveal>
        </div>

        {/* Banner info jika belum setup .env */}
        {!isSupabaseConfigured && (
          <div className="mt-8 rounded-xl border border-dashed border-accent-brass/40 bg-accent-brass/[0.04] p-4 text-sm text-foreground/80 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-accent-brass" />
              <p>
                <strong className="font-medium text-foreground">Mode Simulasi Lokal:</strong>{' '}
                Kredensial Supabase belum terdeteksi di <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>. Komentar saat ini disimpan di sesi lokal.
              </p>
            </div>
            <span className="label-mono text-muted-foreground mt-2 block sm:mt-0">
              Perlu .env untuk cloud
            </span>
          </div>
        )}

        {/* Konten 2 kolom (kiri: form input, kanan: feed komentar) */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom Kiri: Form Input Editorial */}
          <Reveal className="lg:col-span-5" delay={60}>
            <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <span className="label-mono text-accent-ikn">Form Tanggapan</span>
                <span className="text-muted-foreground text-xs">Presentasi PPKN</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                Sampaikan Pendapat Anda
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
                Tanggapan Anda akan langsung ditampilkan pada layar presentasi.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Input Nama */}
                <div>
                  <label
                    htmlFor={`${formId}-nama`}
                    className="label-mono text-muted-foreground block"
                  >
                    Nama / Kelompok
                  </label>
                  <input
                    id={`${formId}-nama`}
                    type="text"
                    required
                    placeholder="Contoh: Rian / Kelompok 2"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="mt-2 w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent-ikn focus:ring-1 focus:ring-accent-ikn focus:outline-none"
                  />
                </div>

                {/* Pemilihan Kategori */}
                <div>
                  <label className="label-mono text-muted-foreground block">
                    Kategori Tanggapan
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {kategoriOpsi.map((kat) => {
                      const aktif = kategori === kat
                      return (
                        <button
                          key={kat}
                          type="button"
                          onClick={() => setKategori(kat)}
                          className={cn(
                            'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                            aktif
                              ? 'bg-foreground text-background'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
                          )}
                        >
                          {kat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Pesan Komentar */}
                <div>
                  <label
                    htmlFor={`${formId}-pesan`}
                    className="label-mono text-muted-foreground block"
                  >
                    Isi Pertanyaan / Argumen
                  </label>
                  <textarea
                    id={`${formId}-pesan`}
                    required
                    rows={4}
                    placeholder="Tuliskan argumen, masukan, atau pertanyaan terkait materi IKN..."
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    className="mt-2 w-full resize-none rounded-lg border bg-background p-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent-ikn focus:ring-1 focus:ring-accent-ikn focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-swot-weaknesses">{errorMsg}</p>
                )}

                {suksesKirim && (
                  <div className="flex items-center gap-2 rounded-lg bg-swot-strengths/10 p-3 text-xs text-swot-strengths">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <span>Tanggapan Anda berhasil dikirim ke layar!</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={kirimLoading}
                  className="w-full rounded-full"
                >
                  {kirimLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Tanggapan
                      <Send className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Kolom Kanan: Feed Tanggapan (Ledger Style) */}
          <div className="lg:col-span-7">
            {/* Header Feed */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-ikn opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-accent-ikn" />
                </span>
                <span className="label-mono text-foreground font-semibold">
                  Live Feed ({listTertampil.length})
                </span>
                <span className="text-muted-foreground hidden items-center gap-1 text-xs sm:flex">
                  <Radio className="size-3 text-accent-ikn" />
                  Realtime
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1">
                {['Semua', ...kategoriOpsi].map((kat) => (
                  <button
                    key={kat}
                    type="button"
                    onClick={() => setFilterKategori(kat)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs transition-colors',
                      filterKategori === kat
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {kat}
                  </button>
                ))}
              </div>
            </div>

            {/* List Komentar */}
            {loading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin" />
                <span className="text-sm">Memuat tanggapan...</span>
              </div>
            ) : listTertampil.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquare className="size-10 text-muted-foreground/30" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Belum ada tanggapan untuk kategori ini
                </p>
                <p className="text-muted-foreground mt-1 max-w-xs text-xs">
                  Silakan tuliskan tanggapan pertama melalui formulir di samping.
                </p>
              </div>
            ) : (
              <ol className="divide-y">
                {listTertampil.map((item, index) => {
                  const badge = lencanaKategori(item.kategori)
                  const BadgeIcon = badge.ikon
                  const nomor = String(index + 1).padStart(2, '0')

                  return (
                    <li
                      key={item.id || index}
                      className="group py-6 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="label-mono text-muted-foreground/80 tabular-nums">
                            {nomor}
                          </span>
                          <span className="text-base font-semibold tracking-tight text-foreground">
                            {item.nama}
                          </span>
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium',
                              badge.kelas,
                            )}
                          >
                            <BadgeIcon className="size-3" />
                            {item.kategori}
                          </span>
                        </div>

                        <span className="text-muted-foreground flex shrink-0 items-center gap-1 font-mono text-[0.6875rem]">
                          <Clock className="size-3" />
                          {formatWaktu(item.created_at)}
                        </span>
                      </div>

                      <p className="text-foreground/90 mt-3 pl-7 text-sm leading-relaxed text-pretty sm:text-base">
                        {item.pesan}
                      </p>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
