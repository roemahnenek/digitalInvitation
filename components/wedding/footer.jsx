import { MapPin } from 'lucide-react'

export default function Footer({ data }) {
  const brideNickname = data?.brideNickname || data?.brideFullName?.split(' ')[0] || 'Sarah'
  const groomNickname = data?.groomNickname || data?.groomFullName?.split(' ')[0] || 'Michael'
  const venueLocation = data?.venueLocation || 'Wedding Venue'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          {/* Location */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-serif text-lg font-bold mb-4">Venue</h3>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} />
              <span>{venueLocation}</span>
            </div>
          </div>

          {/* Names */}
          <div className="flex flex-col items-center sm:items-end">
            <h3 className="font-serif text-2xl font-bold mb-2">
              {brideNickname} & {groomNickname}
            </h3>
            <p className="text-sm opacity-80">Together Forever</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>© {currentYear} {brideNickname} & {groomNickname}. All moments treasured.</p>
        </div>
      </div>
    </footer>
  )
}
