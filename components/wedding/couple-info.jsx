export default function CoupleInfo({ data }) {
  const brideNickname = data?.brideNickname || data?.brideFullName?.split(' ')[0] || 'Sarah'
  const groomNickname = data?.groomNickname || data?.groomFullName?.split(' ')[0] || 'Michael'
  const bridePhoto = data?.bridePhoto || '/elegant-bride-portrait.jpg'
  const groomPhoto = data?.groomPhoto || '/elegant-groom-portrait.jpg'
  const brideBio = data?.brideBio || 'A passionate photographer and nature lover who believes in capturing life\'s beautiful moments. Known for her creativity and warm smile.'
  const groomBio = data?.groomBio || 'An architect with a passion for design and sustainable living. He brings thoughtfulness and dedication to everything he does.'
  const coupleStory = data?.coupleStory || `${brideNickname} and ${groomNickname} met at a coffee shop in Portland while they were both waiting for the perfect latte. What started as a conversation about art and architecture blossomed into a beautiful love story. Today, they're excited to share this special moment with everyone they love.`

  return (
    <section id="couple" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-foreground">
          Our Story
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bride */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg bg-muted mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src={bridePhoto} 
                alt={brideNickname} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{brideNickname}</h3>
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              {brideBio}
            </p>
          </div>

          {/* Groom */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg bg-muted mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src={groomPhoto} 
                alt={groomNickname} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{groomNickname}</h3>
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              {groomBio}
            </p>
          </div>
        </div>

        {/* Meeting Story */}
        <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg border border-border">
          <p className="text-center text-muted-foreground leading-relaxed mb-4">
            {coupleStory}
          </p>
          <div className="text-center">
            <span className="text-primary font-serif text-2xl">✦</span>
          </div>
        </div>
      </div>
    </section>
  )
}
