'use client'

import { Calendar } from 'lucide-react'

export default function Reminder() {
  const addToCalendar = () => {
    const eventTitle = "Sarah & Michael's Wedding"
    const eventDate = '20240915' // Format: YYYYMMDD
    const eventTime = '160000' // Format: HHMMSS (4:00 PM)
    const eventEndTime = '230000' // Format: HHMMSS (11:00 PM)
    const eventLocation = 'Golden Gate Park, San Francisco, CA'
    const eventDescription = 'Join us for our special day!'

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}T${eventTime}Z/${eventDate}T${eventEndTime}Z&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}`

    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <section className="py-12 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <Calendar className="w-12 h-12 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              Don't forget our special day!
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Add our wedding to your calendar so you don't miss it.
            </p>
          </div>
          <button
            onClick={addToCalendar}
            className="flex-shrink-0 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap text-sm sm:text-base"
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  )
}
