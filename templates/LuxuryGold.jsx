"use client";

import { useState, useEffect } from "react";

// Hero Section Configuration
const heroSectionConfig = {
  background: "gradient",
  gradientColors: "from-amber-50 via-yellow-50 to-amber-50",
  decorativeElements: [
    {
      icon: "◆",
      position: "top-10 left-10",
      size: "text-6xl",
      color: "text-yellow-600",
      delay: "0s",
    },
    {
      icon: "✦",
      position: "top-20 right-16",
      size: "text-5xl",
      color: "text-amber-500",
      delay: "0.5s",
    },
    {
      icon: "❖",
      position: "bottom-16 left-20",
      size: "text-7xl",
      color: "text-yellow-600",
      delay: "1s",
    },
    {
      icon: "◆",
      position: "bottom-24 right-10",
      size: "text-6xl",
      color: "text-amber-500",
      delay: "1.5s",
    },
  ],
  topIcon: "✦",
  topIconColor: "text-yellow-600",
  title: "THE WEDDING OF",
  titleColor: "text-gray-900",
  nameColor: "text-yellow-700",
  dividerColor: "bg-yellow-600",
  dividerIcon: "◆",
  dividerIconColor: "text-yellow-600",
  invitationText: "Dengan penuh kehormatan, kami mengundang Anda",
  invitationSubtext: "untuk merayakan pernikahan istimewa kami",
  invitationTextColor: "text-gray-700",
  invitationSubtextColor: "text-gray-600",
  buttonColor: "bg-yellow-600 hover:bg-yellow-700",
  buttonGradient: "from-yellow-700 to-amber-700",
  guestCardBg: "bg-amber-50",
  guestCardBorder: "border-yellow-600",
  guestCardTextColor: "text-gray-900",
  guestLabelColor: "text-yellow-700",
  bottomIcon: "❖",
  bottomIconColor: "text-yellow-600",
};

function LuxuryGoldWedding({ data = {}, guestName = "Guest" }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showGuestbookForm, setShowGuestbookForm] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [guestbookSuccess, setGuestbookSuccess] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [rsvpFormData, setRsvpFormData] = useState({
    name: guestName,
    attendance: "hadir",
    guestCount: 1,
    message: "",
  });
  const [guestbookFormData, setGuestbookFormData] = useState({
    name: guestName,
    message: "",
  });

  // Calculate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!data.weddingDate) return;

      const weddingDate = new Date(data.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.weddingDate]);

  // Fetch guestbook entries
  useEffect(() => {
    const fetchGuestbook = async () => {
      if (!data.slug) return;
      try {
        const res = await fetch(`/api/guestbook/${data.slug}`);
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setGuestbookEntries(result.data || []);
          }
        }
      } catch (error) {
        console.error("Error fetching guestbook:", error);
      }
    };

    fetchGuestbook();
  }, [data.slug]);

  // Handle RSVP submission
  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpFormData.name || !data.slug) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/rsvp/${data.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpFormData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setRsvpSuccess(true);
        setRsvpFormData({
          name: guestName,
          attendance: "hadir",
          guestCount: 1,
          message: "",
        });
        setTimeout(() => {
          setRsvpSuccess(false);
          setShowRsvpModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle guestbook submission
  const handleGuestbookSubmit = async (e) => {
    e.preventDefault();
    if (!guestbookFormData.name || !guestbookFormData.message || !data.slug)
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/guestbook/${data.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guestbookFormData),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setGuestbookEntries([result.data, ...guestbookEntries]);
          setGuestbookSuccess(true);
          setGuestbookFormData({
            name: guestName,
            message: "",
          });
          setTimeout(() => {
            setGuestbookSuccess(false);
            setShowGuestbookForm(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error submitting guestbook:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF0" }}>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lora:wght@400;500;600&display=swap");

        :root {
          --gold: #d4af37;
          --cream: #fffbf0;
          --dark-cream: #f5f1e8;
          --text-dark: #2c2c2c;
          --gold-light: #e8d5b5;
        }

        * {
          font-family: "Lora", serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .pulse-gold {
          animation: pulseGold 2s ease-in-out infinite;
        }

        @keyframes pulseGold {
          0%,
          100% {
            color: var(--gold);
          }
          50% {
            color: var(--gold-light);
          }
        }

        .gold-text {
          color: var(--gold);
        }
        .cream-bg {
          background-color: var(--cream);
        }
        .light-cream-bg {
          background-color: var(--dark-cream);
        }
      `}</style>

      {/* Header Section */}
      <header
        className="fade-in py-12 px-4 md:py-20 text-center"
        style={{ backgroundColor: "#FFFBF0" }}
      >
        <div className="mb-6 text-4xl" style={{ color: "#D4AF37" }}>
          ◆ ✦ ❖
        </div>
        <h1
          className="text-5xl md:text-6xl mb-3"
          style={{
            color: "#2C2C2C",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
          }}
        >
          {data.brideNickname && data.groomNickname
            ? `${data.brideNickname} & ${data.groomNickname}`
            : "Together Forever"}
        </h1>
        <p
          className="text-xl md:text-2xl"
          style={{ color: "#D4AF37", fontFamily: "'Lora', serif" }}
        >
          ✦
        </p>
      </header>

      {/* Countdown Timer */}
      <section className="py-12 px-4 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl text-center mb-12"
            style={{ color: "#2C2C2C" }}
          >
            Getting Married In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6"
                style={{ backgroundColor: "#F5F1E8", borderRadius: "8px" }}
              >
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#D4AF37" }}
                >
                  {String(item.value).padStart(2, "0")}
                </p>
                <p
                  className="text-sm md:text-base mt-2"
                  style={{ color: "#2C2C2C" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Photos Section */}
      {(data.bridePhoto || data.groomPhoto) && (
        <section
          className="py-12 px-4 md:py-16"
          style={{ backgroundColor: "#F5F1E8" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-4xl text-center mb-12"
              style={{ color: "#2C2C2C" }}
            >
              The Happy Couple
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.bridePhoto && (
                <div className="text-center">
                  <img
                    src={data.bridePhoto || "/placeholder.svg"}
                    alt={data.brideFullName || "Bride"}
                    className="w-full h-96 object-cover rounded-lg shadow-lg float"
                    style={{ maxWidth: "100%" }}
                  />
                  <h3 className="mt-4 text-2xl" style={{ color: "#2C2C2C" }}>
                    {data.brideFullName || "The Bride"}
                  </h3>
                </div>
              )}
              {data.groomPhoto && (
                <div className="text-center">
                  <img
                    src={data.groomPhoto || "/placeholder.svg"}
                    alt={data.groomFullName || "Groom"}
                    className="w-full h-96 object-cover rounded-lg shadow-lg float"
                    style={{ maxWidth: "100%" }}
                  />
                  <h3 className="mt-4 text-2xl" style={{ color: "#2C2C2C" }}>
                    {data.groomFullName || "The Groom"}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Love Story Timeline */}
      {data.loveStory && data.loveStory.length > 0 && (
        <section className="py-12 px-4 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-4xl text-center mb-12"
              style={{ color: "#2C2C2C" }}
            >
              Our Love Story
            </h2>
            <div className="space-y-8">
              {data.loveStory.map((event, index) => (
                <div key={index} className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full"
                      style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
                    >
                      ◆
                    </div>
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#D4AF37" }}
                    >
                      {event.year}
                    </p>
                    <h3
                      className="text-2xl mt-1 mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      {event.title}
                    </h3>
                    <p style={{ color: "#2C2C2C", opacity: 0.8 }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events/Schedule Section */}
      {(data.events || data.weddingDate) && (
        <section
          className="py-12 px-4 md:py-16"
          style={{ backgroundColor: "#F5F1E8" }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-4xl text-center mb-12"
              style={{ color: "#2C2C2C" }}
            >
              Event Details
            </h2>
            <div className="space-y-6">
              {data.events && data.events.length > 0 ? (
                data.events.map((event, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: "#FFFBF0" }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl" style={{ color: "#D4AF37" }}>
                        {event.icon || "✦"}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="text-2xl mb-2"
                          style={{ color: "#2C2C2C" }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="font-semibold"
                          style={{ color: "#D4AF37" }}
                        >
                          {event.time}
                        </p>
                        <p
                          className="mt-2"
                          style={{ color: "#2C2C2C", opacity: 0.8 }}
                        >
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "#FFFBF0" }}
                >
                  <h3 className="text-2xl mb-2" style={{ color: "#2C2C2C" }}>
                    Wedding Ceremony
                  </h3>
                  <p className="font-semibold" style={{ color: "#D4AF37" }}>
                    {data.weddingDate
                      ? new Date(data.weddingDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Date to be confirmed"}
                  </p>
                  {data.venueLocation && (
                    <p
                      className="mt-2"
                      style={{ color: "#2C2C2C", opacity: 0.8 }}
                    >
                      {data.venueLocation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Couple Story */}
      {data.coupleStory && (
        <section className="py-12 px-4 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-8" style={{ color: "#2C2C2C" }}>
              Our Story
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#2C2C2C", opacity: 0.9 }}
            >
              {data.coupleStory}
            </p>
          </div>
        </section>
      )}

      {/* Location Map */}
      {data.locationMapEmbed && (
        <section
          className="py-12 px-4 md:py-16"
          style={{ backgroundColor: "#F5F1E8" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl text-center mb-12"
              style={{ color: "#2C2C2C" }}
            >
              Venue Location
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={
                  data.locationMapEmbed.match(/src="([^"]+)"/)?.[1] ||
                  data.locationMapEmbed
                }
                width="100%"
                height={400}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {data.locationMapUrl && (
              <div className="text-center mt-6">
                <a
                  href={data.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
                >
                  Open in Maps
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-12 px-4 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-4xl text-center mb-12"
              style={{ color: "#2C2C2C" }}
            >
              Our Gallery
            </h2>

            {/* Featured image */}
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  typeof data.gallery[selectedGalleryImage] === "string"
                    ? data.gallery[selectedGalleryImage]
                    : data.gallery[selectedGalleryImage].url
                }
                alt="Gallery"
                className="w-full h-96 md:h-[500px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGalleryImage(index)}
                  className="rounded-lg overflow-hidden transition-transform hover:scale-105"
                  style={{
                    border:
                      selectedGalleryImage === index
                        ? "3px solid #D4AF37"
                        : "2px solid #E8D5B5",
                    opacity: selectedGalleryImage === index ? 1 : 0.7,
                  }}
                >
                  <img
                    src={typeof image === "string" ? image : image.url}
                    alt={
                      typeof image === "string"
                        ? "Gallery"
                        : image.alt || "Gallery"
                    }
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guestbook Section */}
      <section
        className="py-12 px-4 md:py-16"
        style={{ backgroundColor: "#F5F1E8" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl text-center mb-12"
            style={{ color: "#2C2C2C" }}
          >
            Guest Book
          </h2>

          {/* Guestbook form button */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowGuestbookForm(!showGuestbookForm)}
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
            >
              {showGuestbookForm ? "Close" : "Leave a Message"}
            </button>
          </div>

          {/* Guestbook form */}
          {showGuestbookForm && (
            <div
              className="mb-12 p-6 rounded-lg"
              style={{ backgroundColor: "#FFFBF0" }}
            >
              {guestbookSuccess ? (
                <div className="text-center py-8">
                  <p
                    className="text-2xl font-semibold"
                    style={{ color: "#D4AF37" }}
                  >
                    ✦ Thank you for your message! ✦
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestbookFormData.name}
                      onChange={(e) =>
                        setGuestbookFormData({
                          ...guestbookFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      value={guestbookFormData.message}
                      onChange={(e) =>
                        setGuestbookFormData({
                          ...guestbookFormData,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 h-24"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                    style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Guestbook entries */}
          <div className="space-y-4">
            {guestbookEntries.length > 0 ? (
              guestbookEntries.map((entry, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "#FFFBF0" }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold" style={{ color: "#2C2C2C" }}>
                      {entry.name}
                    </h3>
                    {entry.createdAt && (
                      <span className="text-xs" style={{ color: "#D4AF37" }}>
                        {new Date(entry.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-2"
                    style={{ color: "#2C2C2C", opacity: 0.8 }}
                  >
                    {entry.message}
                  </p>
                </div>
              ))
            ) : (
              <p
                className="text-center"
                style={{ color: "#2C2C2C", opacity: 0.6 }}
              >
                No messages yet. Be the first to share your wishes!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-12 px-4 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl mb-8" style={{ color: "#2C2C2C" }}>
            Will You Join Us?
          </h2>
          <button
            onClick={() => setShowRsvpModal(true)}
            className="px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg transform hover:scale-105"
            style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
          >
            RSVP Now
          </button>
        </div>
      </section>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => !rsvpSuccess && setShowRsvpModal(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#FFFBF0" }}
          >
            <button
              onClick={() => setShowRsvpModal(false)}
              className="float-right text-2xl"
              style={{ color: "#D4AF37" }}
            >
              ✕
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-8">
                <p
                  className="text-2xl font-semibold"
                  style={{ color: "#D4AF37" }}
                >
                  ✦ Thank You! ✦
                </p>
                <p className="mt-4" style={{ color: "#2C2C2C" }}>
                  We look forward to seeing you!
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl mb-6" style={{ color: "#2C2C2C" }}>
                  RSVP
                </h3>
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpFormData.name}
                      onChange={(e) =>
                        setRsvpFormData({
                          ...rsvpFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Will you attend? *
                    </label>
                    <select
                      value={rsvpFormData.attendance}
                      onChange={(e) =>
                        setRsvpFormData({
                          ...rsvpFormData,
                          attendance: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                    >
                      <option value="hadir">I will attend</option>
                      <option value="tidak-hadir">I cannot attend</option>
                      <option value="ragu">I'm not sure</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={rsvpFormData.guestCount}
                      onChange={(e) =>
                        setRsvpFormData({
                          ...rsvpFormData,
                          guestCount: Number.parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#2C2C2C" }}
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      value={rsvpFormData.message}
                      onChange={(e) =>
                        setRsvpFormData({
                          ...rsvpFormData,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 h-20"
                      style={{ borderColor: "#D4AF37", color: "#2C2C2C" }}
                      placeholder="Share your thoughts..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 mt-6"
                    style={{ backgroundColor: "#D4AF37", color: "#FFFBF0" }}
                  >
                    {loading ? "Submitting..." : "Confirm RSVP"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="py-8 px-4 border-t"
        style={{ backgroundColor: "#F5F1E8", borderColor: "#E8D5B5" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="mb-2 text-lg font-semibold"
            style={{ color: "#2C2C2C" }}
          >
            {data.brideFullName && data.groomFullName
              ? `${data.brideFullName} & ${data.groomFullName}`
              : "With Love"}
          </p>
          <p style={{ color: "#D4AF37" }}>◆ ✦ ❖</p>
          <p
            className="mt-4 text-sm"
            style={{ color: "#2C2C2C", opacity: 0.6 }}
          >
            {data.weddingDate
              ? `Celebrating our love on ${new Date(
                  data.weddingDate
                ).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`
              : "Celebrating our love"}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Attach hero config
LuxuryGoldWedding.heroSection = heroSectionConfig;

export default LuxuryGoldWedding;
