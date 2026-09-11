export function InfoStrip() {
  return (
    <div className="border-y border-line bg-paper-warm">
      <div className="mx-auto flex max-w-[1080px] flex-wrap justify-between gap-4.5 px-7 py-5 text-sm text-moss">
        <div>
          📍 171 Lumban–Caliraya–Cavinti Rd, Cavinti, Laguna —{' '}
          <strong className="text-forest-deep">road access, not tawid-lawa</strong>
        </div>
        <div>
          Overnight check-in <strong className="text-forest-deep">10 AM</strong> · Day tour{' '}
          <strong className="text-forest-deep">7 AM–6 PM</strong>
        </div>
      </div>
    </div>
  )
}
