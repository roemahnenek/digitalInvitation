"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hero Section Configuration
const heroSectionConfig = {
  background: "gradient",
  gradientColors: "from-rose-50 via-white to-rose-100",
  decorativeElements: [
    {
      icon: "❀",
      position: "top-10 left-10",
      size: "text-6xl",
      color: "text-rose-200",
      delay: "0s",
    },
    {
      icon: "✿",
      position: "top-20 right-16",
      size: "text-5xl",
      color: "text-rose-200",
      delay: "0.5s",
    },
    {
      icon: "❁",
      position: "bottom-16 left-20",
      size: "text-7xl",
      color: "text-rose-200",
      delay: "1s",
    },
    {
      icon: "❀",
      position: "bottom-24 right-10",
      size: "text-6xl",
      color: "text-rose-200",
      delay: "1.5s",
    },
  ],
  topIcon: "❁",
  topIconColor: "text-rose-400",
  title: "THE WEDDING OF",
  titleColor: "text-rose-900",
  nameColor: "text-rose-600",
  dividerColor: "bg-rose-300",
  dividerIcon: "❀",
  dividerIconColor: "text-rose-400",
  invitationText: "Dengan penuh sukacita, kami mengundang Anda",
  invitationSubtext: "untuk berbagi kebahagiaan di hari istimewa kami",
  invitationTextColor: "text-gray-600",
  invitationSubtextColor: "text-gray-500",
  buttonColor: "bg-rose-500 hover:bg-rose-600",
  buttonGradient: "from-rose-600 to-pink-600",
  guestCardBg: "bg-white/60",
  guestCardBorder: "border-rose-200",
  guestCardTextColor: "text-rose-800",
  guestLabelColor: "text-rose-700",
  bottomIcon: "❁",
  bottomIconColor: "text-rose-400",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

function ElegantFloralV2({ data, guestName }) {
  const [showRsvp, setShowRsvp] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attendance: "",
    guestCount: 1,
    message: "",
  });
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(data.weddingDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
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

  const handleGuestbookSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;

    try {
      const res = await fetch(`/api/guestbook/${data.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setGuestbookEntries([result.data, ...guestbookEntries]);
          setNewMessage({ name: "", message: "" });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRsvpSubmit = async (e) => {
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
        setRsvpForm({ name: "", attendance: "", guestCount: 1, message: "" });

        // Auto close after 2 seconds
        setTimeout(() => {
          setShowRsvp(false);
          setRsvpSuccess(false);
        }, 2000);
      } else {
        alert(result.error || "Gagal mengirim RSVP. Silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setRsvpSubmitting(false);
    }
  };

  // Memoize expensive computations
  const backgroundStyle = useMemo(
    () =>
      data.cover
        ? {
            backgroundImage: `url(${data.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : { background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" },
    [data.cover]
  );

  const mapEmbedSrc = useMemo(() => {
    if (!data.locationMapEmbed) return null;
    const match = data.locationMapEmbed.match(/src="([^"]+)"/);
    return match ? match[1] : data.locationMapEmbed;
  }, [data.locationMapEmbed]);

  return (
    <div className="font-serif-body relative overflow-x-hidden">
      {/* Section 1: Hero dengan Border Floral */}
      <motion.div
        className="min-h-screen bg-cover bg-center relative"
        style={backgroundStyle}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-white/60 to-rose-50/80"></div>

        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center">
          <motion.div className="max-w-2xl w-full" variants={fadeInUp}>
            <motion.div
              className="text-6xl text-rose-400 mb-6"
              variants={scaleIn}
            >
              ❁
            </motion.div>

            {guestName && (
              <motion.div className="mb-8" variants={fadeInUp}>
                <p className="text-sm text-gray-600 tracking-wide">
                  Kepada Yth.
                </p>
                <p className="text-2xl font-semibold text-rose-700 mt-2">
                  {guestName}
                </p>
              </motion.div>
            )}

            <motion.p
              className="text-sm text-gray-500 tracking-[0.3em] uppercase mb-4"
              variants={fadeInUp}
            >
              The Wedding of
            </motion.p>

            <motion.h1
              className="text-6xl sm:text-8xl font-script text-rose-600 my-6"
              variants={fadeInUp}
            >
              {data.brideNickname || data.brideFullName}
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-4 my-8"
              variants={scaleIn}
            >
              <div className="w-20 h-px bg-rose-300"></div>
              <span className="text-4xl text-rose-400">❀</span>
              <div className="w-20 h-px bg-rose-300"></div>
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-8xl font-script text-rose-600 my-6"
              variants={fadeInUp}
            >
              {data.groomNickname || data.groomFullName}
            </motion.h1>

            <motion.p
              className="mt-8 text-xl text-gray-700"
              variants={fadeInUp}
            >
              {new Date(data.weddingDate).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>

            <motion.div
              className="text-6xl text-rose-400 mt-6"
              variants={scaleIn}
            >
              ❁
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        className="bg-white py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-script text-rose-600 text-center mb-8">
            Menghitung Hari
          </h3>
          <div className="flex justify-center gap-4 sm:gap-8">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center bg-rose-50 rounded-lg p-4 sm:p-6 min-w-[70px] sm:min-w-[100px]"
                variants={fadeInUp}
                custom={index}
              >
                <span className="text-3xl sm:text-5xl font-bold text-rose-600">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 mt-2">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 2: Couple Photos with Floral Frame */}
      <motion.div
        className="bg-gradient-to-b from-white to-rose-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-5xl font-script text-rose-600 mb-4"
              variants={fadeInUp}
            >
              Mempelai
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-12 italic"
              variants={fadeInUp}
            >
              Yang berbahagia
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
              {/* Bride Info */}
              <motion.div
                className="flex flex-col items-center gap-4"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-rose-300 animate-pulse">
                    ✿
                  </div>
                  <div
                    className="absolute -top-4 -right-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    ✿
                  </div>

                  {data.bridePhoto ? (
                    <img
                      src={data.bridePhoto}
                      alt={data.brideFullName}
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-8 border-rose-100 shadow-xl"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-rose-100 border-8 border-rose-200"></div>
                  )}

                  <div
                    className="absolute -bottom-4 -left-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.25s" }}
                  >
                    ✿
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.75s" }}
                  >
                    ✿
                  </div>
                </div>
                <h3 className="text-4xl font-script text-rose-700 mt-4">
                  {data.brideFullName}
                </h3>
                <p className="text-gray-600 italic">Putri dari</p>
                <p className="text-gray-700">
                  {data.brideParents || "Bapak & Ibu"}
                </p>
                {data.brideBio && (
                  <p className="text-sm text-gray-600 mt-2 max-w-xs text-center italic">
                    {data.brideBio}
                  </p>
                )}
              </motion.div>

              <motion.span
                className="text-6xl font-script text-rose-400 hidden sm:block"
                variants={scaleIn}
              >
                &
              </motion.span>
              <span className="text-4xl text-rose-300 sm:hidden">❀</span>

              {/* Groom Info */}
              <motion.div
                className="flex flex-col items-center gap-4"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-rose-300 animate-pulse">
                    ✿
                  </div>
                  <div
                    className="absolute -top-4 -right-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    ✿
                  </div>

                  {data.groomPhoto ? (
                    <img
                      src={data.groomPhoto}
                      alt={data.groomFullName}
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-8 border-rose-100 shadow-xl"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-rose-100 border-8 border-rose-200"></div>
                  )}

                  <div
                    className="absolute -bottom-4 -left-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.25s" }}
                  >
                    ✿
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 text-4xl text-rose-300 animate-pulse"
                    style={{ animationDelay: "0.75s" }}
                  >
                    ✿
                  </div>
                </div>
                <h3 className="text-4xl font-script text-rose-700 mt-4">
                  {data.groomFullName}
                </h3>
                <p className="text-gray-600 italic">Putra dari</p>
                <p className="text-gray-700">
                  {data.groomParents || "Bapak & Ibu"}
                </p>
                {data.groomBio && (
                  <p className="text-sm text-gray-600 mt-2 max-w-xs text-center italic">
                    {data.groomBio}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Love Story Section */}
      {data.loveStory && data.loveStory.length > 0 && (
        <motion.div
          className="bg-white py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-5xl font-script text-rose-600 text-center mb-4"
              variants={fadeInUp}
            >
              Kisah Cinta Kami
            </motion.h2>
            <motion.p
              className="text-center text-gray-600 mb-12 italic"
              variants={fadeInUp}
            >
              {data.coupleStory || "Perjalanan cinta yang indah"}
            </motion.p>

            <div className="space-y-12">
              {data.loveStory.map((story, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 items-start"
                  variants={fadeInUp}
                  custom={index}
                >
                  <div className="flex-shrink-0 md:w-20 text-center md:text-right">
                    <div className="text-3xl md:text-2xl text-rose-400">❀</div>
                    <p className="text-sm text-gray-500 mt-2 font-semibold">
                      {story.year}
                    </p>
                  </div>
                  <div className="flex-1 bg-rose-50 rounded-2xl p-6 md:p-8 shadow-lg">
                    <h3 className="text-3xl font-script text-rose-700 mb-3">
                      {story.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {story.description}
                    </p>
                    {story.image && (
                      <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Event Details */}
      <motion.div
        className="bg-rose-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-5xl font-script text-rose-600 text-center mb-12"
              variants={fadeInUp}
            >
              Detail Acara
            </motion.h2>

            {data.events && data.events.length > 0 ? (
              <div className="space-y-6">
                {data.events.map((event, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border-4 border-rose-100"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center space-y-4">
                      <div className="text-5xl text-rose-400 mb-4">✿</div>
                      <h3 className="text-3xl font-semibold text-rose-700 font-script">
                        {event.title}
                      </h3>
                      {event.time && (
                        <p className="text-xl text-gray-700 font-medium">
                          {event.time}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-gray-600 mt-4 leading-relaxed max-w-xl mx-auto">
                          {event.description}
                        </p>
                      )}
                      <div className="text-3xl text-rose-400 mt-6">❀</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border-4 border-rose-100"
                variants={scaleIn}
              >
                <div className="text-center space-y-6">
                  <div className="text-5xl text-rose-400 mb-4">✿</div>

                  <div>
                    <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
                      Tanggal
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {new Date(data.weddingDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="py-4">
                    <div className="w-24 h-px bg-rose-300 mx-auto"></div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
                      Lokasi
                    </p>
                    <p className="text-xl text-gray-800 font-semibold">
                      {data.venueLocation}
                    </p>
                    {data.locationAddress && (
                      <p className="text-gray-600 mt-2 text-sm">
                        {data.locationAddress}
                      </p>
                    )}
                  </div>

                  <div className="text-5xl text-rose-400 mt-4">✿</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Location Map */}
      {data.locationMapEmbed && (
        <motion.div
          className="bg-white py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          onViewportEnter={() => setMapLoaded(true)}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-5xl font-script text-rose-600 text-center mb-12"
              variants={fadeInUp}
            >
              Lokasi Acara
            </motion.h2>
            <motion.div
              className="aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-rose-100 bg-gray-100 flex items-center justify-center"
              variants={scaleIn}
            >
              {mapLoaded && mapEmbedSrc ? (
                <iframe
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Location Map"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <svg
                    className="animate-spin h-12 w-12 mx-auto mb-3 text-rose-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-sm">Loading map...</p>
                </div>
              )}
            </motion.div>
            {data.locationMapUrl && (
              <motion.div className="text-center mt-6" variants={fadeInUp}>
                <a
                  href={data.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                >
                  Buka di Google Maps
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <motion.div
          className="bg-gradient-to-b from-rose-50 to-white py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-5xl font-script text-rose-600 text-center mb-12"
              variants={fadeInUp}
            >
              Galeri Foto
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <motion.div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden shadow-lg"
                  variants={scaleIn}
                  custom={index}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                >
                  <img
                    src={photo.url || photo}
                    alt={photo.caption || `Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Guestbook */}
      <motion.div
        className="bg-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            className="text-5xl font-script text-rose-600 text-center mb-4"
            variants={fadeInUp}
          >
            Buku Tamu
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-8 italic"
            variants={fadeInUp}
          >
            Tinggalkan ucapan dan doa untuk kami
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={handleGuestbookSubmit}
            className="bg-rose-50 rounded-2xl p-6 mb-8"
            variants={fadeInUp}
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama Anda"
                value={newMessage.name}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none bg-white text-gray-900"
                required
              />
              <textarea
                placeholder="Tulis ucapan & doa..."
                value={newMessage.message}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, message: e.target.value })
                }
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none resize-none bg-white text-gray-900"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-colors"
              >
                Kirim Ucapan
              </button>
            </div>
          </motion.form>

          {/* Entries */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {guestbookEntries && guestbookEntries.length > 0 ? (
              guestbookEntries.map((entry, index) => (
                <motion.div
                  key={entry._id || index}
                  className="bg-rose-50 rounded-lg p-4"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-rose-400">❀</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {entry.name}
                      </p>
                      <p className="text-gray-600 mt-1">{entry.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(entry.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* RSVP Section */}
      <motion.div
        className="bg-gradient-to-b from-white to-rose-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="py-20 text-center px-4">
          <motion.h2
            className="text-5xl font-script text-rose-600 mb-6"
            variants={fadeInUp}
          >
            Konfirmasi Kehadiran
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 max-w-md mx-auto"
            variants={fadeInUp}
          >
            Kehadiran dan doa Anda merupakan kebahagiaan bagi kami
          </motion.p>
          <motion.button
            onClick={() => setShowRsvp(true)}
            className="inline-block px-12 py-4 bg-rose-500 text-white font-semibold rounded-full tracking-wider uppercase transition-transform shadow-lg hover:shadow-xl"
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RSVP Sekarang
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="bg-rose-600 text-white py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.p className="text-5xl font-script mb-3" variants={fadeInUp}>
          {data.brideNickname || data.brideFullName} &{" "}
          {data.groomNickname || data.groomFullName}
        </motion.p>
        <motion.p className="text-sm tracking-widest mb-6" variants={fadeInUp}>
          Thank You
        </motion.p>
        <motion.div className="text-4xl" variants={scaleIn}>
          ❁
        </motion.div>
      </motion.div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRsvp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRsvp(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-script text-rose-600 mb-4 text-center">
                Konfirmasi Kehadiran
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Silakan konfirmasi kehadiran Anda
              </p>

              {rsvpSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✓</div>
                  <h4 className="text-2xl font-semibold text-rose-600 mb-2">
                    Terima Kasih!
                  </h4>
                  <p className="text-gray-600">
                    Konfirmasi Anda berhasil dikirim
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none bg-white text-gray-900"
                    required
                    disabled={rsvpSubmitting}
                  />
                  <select
                    value={rsvpForm.attendance}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, attendance: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none bg-white text-gray-900"
                    required
                    disabled={rsvpSubmitting}
                  >
                    <option value="">Pilih Kehadiran</option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak-hadir">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Jumlah Tamu"
                    min="1"
                    value={rsvpForm.guestCount}
                    onChange={(e) =>
                      setRsvpForm({
                        ...rsvpForm,
                        guestCount: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none bg-white text-gray-900"
                    disabled={rsvpSubmitting}
                  />
                  <textarea
                    placeholder="Pesan (Optional)"
                    rows="3"
                    value={rsvpForm.message}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none resize-none bg-white text-gray-900"
                    disabled={rsvpSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={rsvpSubmitting}
                    className="w-full py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {rsvpSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Konfirmasi"
                    )}
                  </button>
                </form>
              )}

              <button
                onClick={() => setShowRsvp(false)}
                className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Attach hero config
ElegantFloralV2.heroSection = heroSectionConfig;

export default ElegantFloralV2;
