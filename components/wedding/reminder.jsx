'use client'

import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

export default function Reminder({ data }) {
  const brideNickname = data?.brideNickname || data?.brideFullName?.split(' ')[0] || 'Sarah'
  const groomNickname = data?.groomNickname || data?.groomFullName?.split(' ')[0] || 'Michael'
  const reminderMessage = data?.reminderMessage || "We can't wait to celebrate with you!"
  
  const addToCalendar = () => {
    const eventTitle = `${brideNickname} & ${groomNickname}'s Wedding`
    
    let eventDate = '20250621'
    let eventTime = '160000'
    let eventEndTime = '230000'
    
    if (data?.weddingDate) {
      const date = new Date(data.weddingDate)
      eventDate = format(date, 'yyyyMMdd')
    }
    
    const eventLocation = data?.venueLocation || 'Wedding Venue'
    const eventDescription = reminderMessage

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
              {reminderMessage}
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
