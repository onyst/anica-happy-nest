import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function Location() {
  return (
    <section id="location" className="py-22">
      <div className="mx-auto max-w-[1160px] px-7">
        <SectionHead kicker="Getting here" title="On Lumot Lake, by road." />
        <Reveal className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
          <iframe
            src="https://www.google.com/maps?q=14.2594599,121.5400127&z=15&output=embed"
            loading="lazy"
            allowFullScreen
            title="Map showing AniCa Happy Nest Campsite location on Lumot Lake, Cavinti, Laguna"
            className="min-h-[340px] w-full border-0 grayscale-[0.15] contrast-[1.02]"
          />
          <div className="bg-white p-9">
            <h3 className="mb-3.5 text-[19px]">AniCa Happy Nest Campsite</h3>
            <p className="mb-2.5 text-[14.5px] text-moss">171 Lumban-Caliraya-Cavinti Rd, Cavinti, Laguna</p>
            <p className="mb-2.5 text-[14.5px] text-moss">
              Contact:{' '}
              <a href="tel:+639178713106" className="underline">
                0917 871 3106
              </a>{' '}
              (Rodel B.)
            </p>
            <div className="mt-4.5 rounded-xl border-l-2 border-ember bg-paper-warm px-3.5 py-3 text-[13.5px] text-ink">
              We are <strong>not</strong> a tawid-lawa (boat-crossing) site. You can drive
              straight in. The last stretch is unpaved, so plan for that if it has rained.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
