import Image from "next/image";

export default function Gallery({ data }) {
  const { gallery } = data;

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold font-parisienne text-white-800 mb-12">
          Our Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {gallery.map((item, index) => {
            console.log(
              "Caption data type:",
              typeof item.caption,
              "Caption value:",
              item.caption
            );
            return (
              <div
                key={index}
                className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg group"
              >
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-lg font-semibold">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
