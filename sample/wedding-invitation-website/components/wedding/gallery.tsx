export default function Gallery() {
  const photos = [
    { id: 1, query: "couple holding hands in garden" },
    { id: 2, query: "sunset romantic couple photo" },
    { id: 3, query: "bride and groom smiling together" },
    { id: 4, query: "couple dancing at reception" },
    { id: 5, query: "intimate couple moment" },
    { id: 6, query: "newly wed couple kiss" },
  ]

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-foreground">
          Our Memories
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Moments captured throughout our journey together
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`/.jpg?height=400&width=400&query=${encodeURIComponent(photo.query)}`}
                alt={`Wedding moment ${photo.id}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
