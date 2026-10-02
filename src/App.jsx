import AnalisisSwot from '@/components/AnalisisSwot'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import LatarBelakang from '@/components/LatarBelakang'
import SiteHeader from '@/components/SiteHeader'
import Timeline from '@/components/Timeline'

export default function App() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <main>
        <LatarBelakang />
        <AnalisisSwot />
        <Timeline />
      </main>
      <Footer />
    </>
  )
}
