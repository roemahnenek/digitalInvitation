"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Hero Section Configuration
const heroSectionConfig = {
  background: "gradient",
  gradientColors: "from-slate-100 via-gray-100 to-slate-200",
  decorativeElements: [
    {
      icon: "◆",
      position: "top-10 left-10",
      size: "text-6xl",
      color: "text-slate-300",
      delay: "0s",
    },
    {
      icon: "◇",
      position: "top-20 right-16",
      size: "text-5xl",
      color: "text-slate-300",
      delay: "0.5s",
    },
    {
      icon: "◆",
      position: "bottom-16 left-20",
      size: "text-7xl",
      color: "text-slate-300",
      delay: "1s",
    },
    {
      icon: "◇",
      position: "bottom-24 right-10",
      size: "text-6xl",
      color: "text-slate-300",
      delay: "1.5s",
    },
  ],
  topIcon: "◆",
  topIconColor: "text-slate-600",
  title: "THE WEDDING OF",
  titleColor: "text-slate-900",
  nameColor: "text-slate-700",
  dividerColor: "bg-slate-400",
  dividerIcon: "◆",
  dividerIconColor: "text-slate-500",
  invitationText: "Dengan penuh sukacita, kami mengundang Anda",
  invitationSubtext: "untuk berbagi kebahagiaan di hari istimewa kami",
  invitationTextColor: "text-gray-700",
  invitationSubtextColor: "text-gray-600",
  buttonColor: "bg-slate-700 hover:bg-slate-800",
  buttonGradient: "from-slate-800 to-gray-800",
  guestCardBg: "bg-white/70",
  guestCardBorder: "border-slate-300",
  guestCardTextColor: "text-slate-900",
  guestLabelColor: "text-slate-700",
  bottomIcon: "◆",
  bottomIconColor: "text-slate-600",
};
import Hero from "@/components/wedding/hero";
import CoupleInfo from "@/components/wedding/couple-info";
import LoveStory from "@/components/wedding/love-story";
import EventDetails from "@/components/wedding/event-details";
import Gallery from "@/components/wedding/gallery";
import LocationMap from "@/components/wedding/location-map";
import Reminder from "@/components/wedding/reminder";
import Guestbook from "@/components/wedding/guestbook";
import RSVPForm from "@/components/wedding/rsvp-form";
import Footer from "@/components/wedding/footer";
import Navigation from "@/components/wedding/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Wedding01({ data }) {
  const [showRsvp, setShowRsvp] = useState(false);

  return (
    <main className="bg-background">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Navigation onRsvpClick={() => setShowRsvp(true)} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Hero onRsvpClick={() => setShowRsvp(true)} data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <CoupleInfo data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <LoveStory data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <EventDetails data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <LocationMap data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Reminder data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Gallery data={data} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Guestbook slug={data?.slug} />
      </motion.div>
      {showRsvp && (
        <RSVPForm onClose={() => setShowRsvp(false)} slug={data?.slug} />
      )}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Footer data={data} />
      </motion.div>
    </main>
  );
}

// Attach hero config
Wedding01.heroSection = heroSectionConfig;

export default Wedding01;
