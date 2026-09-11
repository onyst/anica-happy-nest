import { Amenities } from './components/Amenities'
import { Booking } from './components/Booking'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Nav } from './components/Nav'
import { Rates } from './components/Rates'
import { Rules } from './components/Rules'
import { StatsStrip } from './components/StatsStrip'
import { WaysToStay } from './components/WaysToStay'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-forest-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav />
      <Hero />

      <main id="main">
        <StatsStrip />
        <WaysToStay />
        <Rates />
        <Amenities />
        <Gallery />
        <Booking />
        <Rules />
        <Location />
      </main>

      <Footer />
    </>
  )
}

export default App
