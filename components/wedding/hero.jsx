export default function Hero({ onRsvpClick, data }) {
  const brideNickname = data?.brideNickname || data?.brideFullName?.split(' ')[0] || 'Sarah'
  const groomNickname = data?.groomNickname || data?.groomFullName?.split(' ')[0] || 'Michael'
  const heroTitle = data?.heroTitle || 'Together with their families'
  const heroSubtitle = data?.heroSubtitle || 'request the honour of your presence at the celebration of their marriage'
  const heroBackground = data?.heroBackground || '/placeholder.svg?height=1200&width=1920&query=elegant wedding ceremony with roses and flowers'
  const weddingDateDisplay = data?.weddingDateDisplay || 'Saturday, June 21st, 2025'
  const venueLocation = data?.venueLocation || 'The Grand Ballroom, Riverside Hotel'

  return (
    <section 
      className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="text-center max-w-2xl relative z-10">
        <div className="mb-6">
          <p className="text-white font-medium text-sm tracking-widest uppercase mb-4">{heroTitle}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            {brideNickname} & {groomNickname}
          </h1>
          <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-100 mb-8">
            {heroSubtitle}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-white/20 shadow-lg mb-8">
          <p className="text-white text-sm font-medium mb-2">{weddingDateDisplay}</p>
          <p className="text-gray-100 text-sm">{venueLocation}</p>
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
