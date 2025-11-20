interface HeroProps {
  onRsvpClick: () => void
}

export default function Hero({ onRsvpClick }: HeroProps) {
  return (
    <section 
      className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/placeholder.svg?height=1200&width=1920&query=elegant wedding ceremony with roses and flowers)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="text-center max-w-2xl relative z-10">
        <div className="mb-6">
          <p className="text-white font-medium text-sm tracking-widest uppercase mb-4">Together with their families</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            Sarah & Michael
          </h1>
          <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-100 mb-8">
            request the honour of your presence at the celebration of their marriage
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-white/20 shadow-lg mb-8">
          <p className="text-white text-sm font-medium mb-2">Saturday, June 21st, 2025</p>
          <p className="text-gray-100 text-sm">The Grand Ballroom, Riverside Hotel</p>
        </div>

        <button
          onClick={onRsvpClick}
          className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          RSVP Now
        </button>
      </div>
    </section>
  )
}
