import { Clock, MapPin } from 'lucide-react' 

export default function EventDetails({ data }) {
  const defaultEvents = [
    {
      icon: 'Clock',
      title: "Ceremony",
      time: "4:00 PM",
      description: "The vows and celebration begins"
    },
    {
      icon: 'MapPin',
      title: "Location",
      time: "Grand Ballroom",
      description: "Riverside Hotel, 123 River Road"
    },
    {
      icon: 'Clock', // Changed from Heart to Clock for consistency
      title: "Reception",
      time: "5:30 PM",
      description: "Dinner, dancing & celebration"
    }
  ]

  const events = data?.events && data.events.length > 0 ? data.events : defaultEvents

  const iconMap = {
    Clock: Clock,
    MapPin: MapPin,
    // Tambahkan ikon lain jika diperlukan
  }

  return (
    <section id="details" className="py-16 sm:py-24 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-foreground">
          Event Details
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => {
            const IconComponent = iconMap[event.icon] || Clock // Gunakan IconComponent dari iconMap
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <IconComponent size={24} className="text-primary-foreground" />
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

        {/* Remove Additional Info for now, as it's not implemented in create.js */}
      </div>
    </section>
  )
}
