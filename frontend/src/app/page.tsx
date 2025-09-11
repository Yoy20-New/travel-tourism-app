import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import CulturalHighlights from '@/components/home/CulturalHighlights'
import Testimonials from '@/components/home/Testimonials'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CulturalHighlights />
      <Testimonials />
      <Footer />
    </main>
  )
}
