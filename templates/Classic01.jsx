// Hero Section Configuration
Classic01.heroSection = {
  background: "gradient",
  gradientColors: "from-amber-50 via-yellow-50 to-amber-100",
  decorativeElements: [
    {
      icon: "✦",
      position: "top-10 left-10",
      size: "text-6xl",
      color: "text-amber-300",
      delay: "0s",
    },
    {
      icon: "✧",
      position: "top-20 right-16",
      size: "text-5xl",
      color: "text-amber-300",
      delay: "0.5s",
    },
    {
      icon: "✦",
      position: "bottom-16 left-20",
      size: "text-7xl",
      color: "text-amber-300",
      delay: "1s",
    },
    {
      icon: "✧",
      position: "bottom-24 right-10",
      size: "text-6xl",
      color: "text-amber-300",
      delay: "1.5s",
    },
  ],
  topIcon: "✦",
  topIconColor: "text-amber-500",
  title: "THE WEDDING OF",
  titleColor: "text-amber-900",
  nameColor: "text-amber-700",
  dividerColor: "bg-amber-300",
  dividerIcon: "✦",
  dividerIconColor: "text-amber-400",
  invitationText: "Dengan penuh sukacita, kami mengundang Anda",
  invitationSubtext: "untuk berbagi kebahagiaan di hari istimewa kami",
  invitationTextColor: "text-gray-600",
  invitationSubtextColor: "text-gray-500",
  buttonColor: "bg-amber-600 hover:bg-amber-700",
  buttonGradient: "from-amber-700 to-yellow-700",
  guestCardBg: "bg-white/60",
  guestCardBorder: "border-amber-300",
  guestCardTextColor: "text-amber-800",
  guestLabelColor: "text-amber-700",
  bottomIcon: "✦",
  bottomIconColor: "text-amber-500",
};

export default function Classic01({ data, guestName }) {
  // Use a default gradient background if no cover image is provided
  const backgroundStyle = data.cover
    ? { backgroundImage: `url(${data.cover})` }
    : {
        background:
          "radial-gradient(circle, rgba(244,239,230,1) 0%, rgba(226,214,195,1) 100%)",
      };

  return (
    <div className="font-serif-body text-white">
      {/* --- Section 1: Welcome Screen --- */}
      <div className="min-h-screen bg-cover bg-center" style={backgroundStyle}>
        <div className="min-h-screen w-full flex flex-col items-center justify-end p-4 pb-20 text-center bg-black/50">
          <div className="max-w-2xl w-full">
            {guestName && (
              <div
                className="mb-8 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-sm text-gray-200">Kepada Yth.</p>
                <p className="text-xl font-semibold text-white mt-1">
                  {guestName}
                </p>
              </div>
            )}
            <p
              className="text-base text-gray-100 tracking-widest uppercase animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              We are getting married
            </p>
            <h1
              className="text-5xl sm:text-7xl font-script my-6 text-white animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {data.bride} &amp; {data.groom}
            </h1>
            <div
              className="w-24 h-px bg-gray-200/50 mx-auto animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <p
              className="mt-6 text-lg sm:text-xl text-gray-100 animate-fade-in"
              style={{ animationDelay: "1.0s" }}
            >
              {new Date(data.date).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p
              className="mt-2 text-sm text-gray-200 animate-fade-in"
              style={{ animationDelay: "1.2s" }}
            >
              at {data.location}
            </p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Meet the Couple --- */}
      <div className="bg-gray-900">
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-script text-white mb-12">
              Pengantin Berbahagia
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              {/* Groom's Info */}
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                {data.groom_photo_url ? (
                  <img
                    src={data.groom_photo_url}
                    alt={data.groom}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white/50"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-4 border-white/50"></div>
                )}
                <h3 className="text-3xl font-script text-white mt-2">
                  {data.groom}
                </h3>
              </div>

              <span className="text-5xl font-script text-white animate-fade-in">
                &amp;
              </span>

              {/* Bride's Info */}
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                {data.bride_photo_url ? (
                  <img
                    src={data.bride_photo_url}
                    alt={data.bride}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white/50"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-4 border-white/50"></div>
                )}
                <h3 className="text-3xl font-script text-white mt-2">
                  {data.bride}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 3: RSVP --- */}
      <div className="bg-gray-800">
        <div className="pb-24 pt-10 text-center px-4">
          <a
            className="px-10 py-4 bg-white text-gray-800 font-bold rounded-md tracking-wider uppercase transition-transform transform hover:scale-105 animate-fade-in"
            href="#rsvp"
          >
            RSVP
          </a>
        </div>
      </div>
    </div>
  );
}
