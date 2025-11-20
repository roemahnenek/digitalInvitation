import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Mail size={18} />
              <a href="mailto:hello@sarahndmichael.com" className="hover:opacity-80 transition-opacity">
                hello@sarahndmichael.com
              </a>
            </div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Phone size={18} />
              <span>(555) 123-4567</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg font-bold mb-4">Venue</h3>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={18} />
              <span>Riverside Hotel<br />123 River Road</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center sm:items-end">
            <h3 className="font-serif text-lg font-bold mb-4">Follow</h3>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:opacity-80 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>© 2025 Sarah & Michael. All moments treasured.</p>
        </div>
      </div>
    </footer>
  )
}
