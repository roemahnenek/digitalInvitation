'use client'

import { useState } from 'react'
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

export default function Home() {
  const [showRsvp, setShowRsvp] = useState(false)

  return (
    <main className="bg-background">
      <Navigation onRsvpClick={() => setShowRsvp(true)} />
      <Hero onRsvpClick={() => setShowRsvp(true)} />
      <CoupleInfo />
      <LoveStory />
      <EventDetails />
      <LocationMap />
      <Reminder />
      <Gallery />
      <Guestbook />
      {showRsvp && <RSVPForm onClose={() => setShowRsvp(false)} />}
      <Footer />
    </main>
  )
}
