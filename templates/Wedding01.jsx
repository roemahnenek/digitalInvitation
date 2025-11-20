'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/wedding/hero'
import CoupleInfo from '@/components/wedding/couple-info'
import LoveStory from '@/components/wedding/love-story'
import EventDetails from '@/components/wedding/event-details'
import Gallery from '@/components/wedding/gallery'
import LocationMap from '@/components/wedding/location-map'
import Reminder from '@/components/wedding/reminder'
import Guestbook from '@/components/wedding/guestbook'
import RSVPForm from '@/components/wedding/rsvp-form'
import Footer from '@/components/wedding/footer'
import Navigation from '@/components/wedding/navigation'

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Wedding01({ data }) {
  const [showRsvp, setShowRsvp] = useState(false)

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
        <Hero 
          onRsvpClick={() => setShowRsvp(true)} 
          data={data}
        />
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
      {showRsvp && <RSVPForm onClose={() => setShowRsvp(false)} slug={data?.slug} />}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Footer data={data} />
      </motion.div>
    </main>
  )
}

