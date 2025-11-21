"use client";

import { useState, useEffect } from "react";

// Hero Section Configuration
const heroSectionConfig = {
  background: "gradient",
  gradientColors: "from-pink-50 via-white to-rose-50",
  decorativeElements: [
    {
      icon: "🌸",
      position: "top-10 left-5",
      size: "text-4xl",
      color: "text-pink-300",
      delay: "0s",
    },
    {
      icon: "🌹",
      position: "top-32 right-8",
      size: "text-3xl",
      color: "text-rose-300",
      delay: "0.5s",
    },
    {
      icon: "🌷",
      position: "bottom-20 left-12",
      size: "text-3xl",
      color: "text-pink-300",
      delay: "1s",
    },
    {
      icon: "💐",
      position: "bottom-24 right-10",
      size: "text-4xl",
      color: "text-rose-300",
      delay: "1.5s",
    },
  ],
  topIcon: "✨",
  topIconColor: "text-pink-400",
  title: "WE ARE GETTING MARRIED",
  titleColor: "text-gray-900",
  nameColor: "text-gray-900",
  dividerColor: "bg-pink-300",
  dividerIcon: "💕",
  dividerIconColor: "text-pink-400",
  invitationText: "Mengundang Anda merayakan pernikahan kami",
  invitationSubtext: "Bersama keluarga dan teman-teman tercinta",
  invitationTextColor: "text-gray-600",
  invitationSubtextColor: "text-gray-500",
  buttonColor: "bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-lg",
  buttonGradient: "from-pink-600 to-rose-600",
  guestCardBg: "bg-pink-100",
  guestCardBorder: "border-pink-200",
  guestCardTextColor: "text-pink-900",
  guestLabelColor: "text-pink-700",
  bottomIcon: "💕",
  bottomIconColor: "text-pink-400",
};

function RomanticFloral({ data, guestName }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attendance: "hadir",
    guestCount: 1,
    message: "",
  });
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newGuestbookEntry, setNewGuestbookEntry] = useState({
    name: "",
    message: "",
  });
  const [galleryView, setGalleryView] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
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

  // Fetch guestbook
  useEffect(() => {
    if (data.slug) {
      fetch(`/api/guestbook/${data.slug}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setGuestbookEntries(result.data || []);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [data.slug]);

  // Handle RSVP form submission
  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpForm.name || !rsvpForm.attendance) return;

    setRsvpSubmitting(true);

    try {
      const res = await fetch(`/api/rsvp/${data.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpForm),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setRsvpSuccess(true);
        setRsvpForm({
          name: "",
          attendance: "hadir",
          guestCount: 1,
          message: "",
        });

        setTimeout(() => {
          setShowRSVPModal(false);
          setRsvpSuccess(false);
        }, 2000);
      } else {
        alert(result.error || "Gagal mengirim RSVP");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setRsvpSubmitting(false);
    }
  };

  // Handle guestbook submission
  const handleGuestbookSubmit = async (e) => {
    e.preventDefault();
    if (!newGuestbookEntry.name || !newGuestbookEntry.message) return;

    try {
      const res = await fetch(`/api/guestbook/${data.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuestbookEntry),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setGuestbookEntries([result.data, ...guestbookEntries]);
          setNewGuestbookEntry({ name: "", message: "" });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const galleryImages =
    data.gallery && data.gallery.length > 0
      ? data.gallery
      : [
          { url: "/couple-engagement-photo-1.jpg", alt: "Engagement 1" },
          { url: "/couple-engagement-photo-2.jpg", alt: "Engagement 2" },
          { url: "/couple-wedding-preparation.jpg", alt: "Wedding Prep" },
        ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      {/* Countdown Timer */}
      <section className="py-16 bg-white/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Menghitung Hari Istimewa
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Hari", value: countdown.days },
              { label: "Jam", value: countdown.hours },
              { label: "Menit", value: countdown.minutes },
              { label: "Detik", value: countdown.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-rose-600 font-serif">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-700 font-medium mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Photos Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Pasangan Bahagia
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                {data.bridePhoto ? (
                  <img
                    src={data.bridePhoto}
                    alt={data.brideFullName}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-pink-100"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <p className="text-white font-serif text-2xl font-bold">
                    {data.brideNickname || data.brideFullName}
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                {data.groomPhoto ? (
                  <img
                    src={data.groomPhoto}
                    alt={data.groomFullName}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-rose-100"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <p className="text-white font-serif text-2xl font-bold">
                    {data.groomNickname || data.groomFullName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl mx-auto">
              {data.coupleStory ||
                '"Cinta adalah ketika jiwa Anda merasa telah menemukan rumahnya."'}
            </p>
          </div>
        </div>
      </section>

      {/* Love Story Timeline */}
      {data.loveStory && data.loveStory.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-16">
              Kisah Cinta Kami
            </h2>

            <div className="space-y-12">
              {data.loveStory.map((event, idx) => (
                <div key={idx} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-rose-500 rounded-full" />
                    {idx !== data.loveStory.length - 1 && (
                      <div className="w-1 h-16 bg-gradient-to-b from-rose-300 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="inline-block px-4 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Details */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-16">
            Detail Acara
          </h2>

          {data.events && data.events.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {data.events.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100"
                >
                  <div className="text-4xl mb-4">{event.icon || "💐"}</div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    {event.title}
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    {event.time && (
                      <p className="font-semibold text-lg text-rose-600">
                        {event.time}
                      </p>
                    )}
                    {event.description && (
                      <p className="text-sm italic">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
              <div className="text-4xl mb-4">💍</div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Pernikahan
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="text-lg">
                  {new Date(data.weddingDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="font-medium">{data.venueLocation}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Location with Map */}
      {data.locationMapEmbed && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
              Lokasi Acara
            </h2>

            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src={
                    data.locationMapEmbed.match(/src="([^"]+)"/)?.[1] ||
                    data.locationMapEmbed
                  }
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              {data.locationMapUrl && (
                <div className="text-center">
                  <a
                    href={data.locationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
              Galeri Foto
            </h2>

            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
                <img
                  src={
                    galleryImages[galleryView].url || galleryImages[galleryView]
                  }
                  alt={
                    galleryImages[galleryView].alt ||
                    `Gallery ${galleryView + 1}`
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {galleryImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryView(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      galleryView === idx
                        ? "border-rose-500 shadow-lg scale-105"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url || image}
                      alt={image.alt || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guestbook */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Buku Tamu
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
                Tinggalkan Pesan
              </h3>
              <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={newGuestbookEntry.name}
                  onChange={(e) =>
                    setNewGuestbookEntry({
                      ...newGuestbookEntry,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                />
                <textarea
                  placeholder="Pesan untuk pengantin..."
                  rows={4}
                  value={newGuestbookEntry.message}
                  onChange={(e) =>
                    setNewGuestbookEntry({
                      ...newGuestbookEntry,
                      message: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {guestbookEntries && guestbookEntries.length > 0 ? (
                guestbookEntries.map((entry, idx) => (
                  <div
                    key={entry._id || idx}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {entry.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{entry.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Belum ada pesan
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-rose-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-gray-600 mb-8">
            Kehadiran Anda sangat berarti bagi kami
          </p>
          <button
            onClick={() => setShowRSVPModal(true)}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            RSVP Sekarang
          </button>
        </div>
      </section>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">RSVP</h2>
              <button
                onClick={() => setShowRSVPModal(false)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-rose-600 mb-2">
                  Terima Kasih!
                </h3>
                <p className="text-gray-600">
                  Konfirmasi Anda berhasil dikirim
                </p>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kehadiran
                  </label>
                  <select
                    value={rsvpForm.attendance}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, attendance: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak-hadir">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Tamu
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rsvpForm.guestCount}
                    onChange={(e) =>
                      setRsvpForm({
                        ...rsvpForm,
                        guestCount: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    value={rsvpForm.message}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, message: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 resize-none"
                    rows={3}
                    placeholder="Pesan untuk pengantin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300 disabled:opacity-50"
                >
                  {rsvpSubmitting ? "Mengirim..." : "Konfirmasi Kehadiran"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-900 to-rose-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-2xl mb-2">
            {data.brideNickname || data.brideFullName} &{" "}
            {data.groomNickname || data.groomFullName}
          </p>
          <p className="text-pink-200 mb-6">
            Terima kasih telah menjadi bagian dari hari istimewa kami
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <span className="text-2xl">💕</span>
            <span className="text-2xl">💍</span>
            <span className="text-2xl">💕</span>
          </div>
          <p className="text-sm text-pink-300">© 2025 Wedding Invitation</p>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Attach hero config
RomanticFloral.heroSection = heroSectionConfig;

export default RomanticFloral;
