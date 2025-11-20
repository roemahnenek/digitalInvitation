export default function LoveStory() {
  const timeline = [
    {
      year: '2020',
      title: 'First Meeting',
      description: 'Sarah and Michael met at a cozy coffee shop in Portland. A chance conversation about art and architecture sparked an instant connection.',
      image: '/couple-first-coffee.jpg'
    },
    {
      year: '2021',
      title: 'First Adventure',
      description: 'They took their first road trip to the coast, watching the sunset and dreaming about their future together.',
      image: '/couple-sunset-beach.jpg'
    },
    {
      year: '2022',
      title: 'Moving In Together',
      description: 'Took the big step and moved into their dream apartment filled with natural light and minimalist design.',
      image: '/modern-apartment.png'
    },
    {
      year: '2024',
      title: 'The Proposal',
      description: 'Michael proposed under the stars at their favorite hiking spot. Sarah said YES! The adventure continues...',
      image: '/romantic-proposal-moment.jpg'
    }
  ]

  return (
    <section id="love-story" className="py-16 sm:py-24 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-foreground">
          Our Love Story
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-sm sm:text-base">
          A journey of love, laughter, and beautiful memories
        </p>

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              {/* Image */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <div className="inline-block mb-4">
                    <span className="text-primary font-serif text-3xl font-bold">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
