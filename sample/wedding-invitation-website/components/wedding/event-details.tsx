import { Clock, MapPin, Heart } from 'lucide-react'

export default function EventDetails() {
  const events = [
    {
      icon: Clock,
      title: "Ceremony",
      time: "4:00 PM",
      description: "The vows and celebration begins"
    },
    {
      icon: MapPin,
      title: "Location",
      time: "Grand Ballroom",
      description: "Riverside Hotel, 123 River Road"
    },
    {
      icon: Heart,
      title: "Reception",
      time: "5:30 PM",
      description: "Dinner, dancing & celebration"
    }
  ]

  return (
    <section id="details" className="py-16 sm:py-24 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-foreground">
          Event Details
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => {
            const Icon = event.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-primary font-medium mb-2">{event.time}</p>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-background p-6 sm:p-8 rounded-lg border border-border max-w-2xl mx-auto">
          <h3 className="font-serif text-lg font-bold text-foreground mb-4 text-center">
            Important Information
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Parking is available on-site for all guests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Reception will include vegetarian and vegan options</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Please RSVP by June 7th for seating arrangements</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
