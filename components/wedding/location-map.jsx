export default function LocationMap({ data }) {
  const locationMapEmbed = data?.locationMapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.8904266820436!2d-122.41941542346896!3d37.77492977175749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e3b8e3e9ab%3A0x5c5c3d3e3e3e3e3e!2sGolden%20Gate%20Park!5e0!3m2!1sen!2sus&hl=en&output=embed'
  const locationMapUrl = data?.locationMapUrl || 'https://www.google.com/maps/dir/?api=1&destination=75%20Hagiwara%20Tea%20Garden%20Dr%2C%20San%20Francisco%2C%20CA%2094118'
  const locationAddress = data?.locationAddress || '75 Hagiwara Tea Garden Dr, San Francisco, CA 94118'
  const venueLocation = data?.venueLocation || 'Golden Gate Park Pavilion'

  return (
    <section id="location" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-foreground">
          Venue Location
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Tap or click the map for directions
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={locationMapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96 md:h-full"
            />
          </div>

          {/* Venue Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {/* Venue Details */}
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  Venue
                </h3>
                <p className="text-muted-foreground mb-2">
                  <strong>Location:</strong> {venueLocation}
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Address:</strong> {locationAddress}
                </p>
                <a
                  href={locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition text-sm"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
