'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

export default function Guestbook() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Emma & James',
      message: 'So happy for you both! What a beautiful love story. Can\'t wait to celebrate with you!',
      date: 'November 10, 2024',
      likes: 12
    },
    {
      id: 2,
      name: 'David',
      message: 'Wishing you a lifetime of happiness together. See you at the wedding!',
      date: 'November 8, 2024',
      likes: 8
    },
    {
      id: 3,
      name: 'Sarah\'s Mom',
      message: 'Watching my daughter marry the man of her dreams is the best gift ever. Love you both!',
      date: 'November 5, 2024',
      likes: 25
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [newName, setNewName] = useState('')
  const [liked, setLiked] = useState(new Set())

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim() && newName.trim()) {
      const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      setMessages([
        {
          id: messages.length + 1,
          name: newName,
          message: newMessage,
          date: today,
          likes: 0
        },
        ...messages
      ])
      setNewMessage('')
      setNewName('')
    }
  }

  const toggleLike = (id) => {
    const newLiked = new Set(liked)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLiked(newLiked)
  }

  return (
    <section id="guestbook" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-foreground">
          Wishes & Blessings
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Share your love and wishes for the happy couple
        </p>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg border border-border mb-12">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 text-sm"
            />
            <textarea
              placeholder="Write your wishes and blessings..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm"
          >
            Post Your Message
          </button>
        </form>

        {/* Messages Display */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-secondary p-6 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-serif font-bold text-foreground">{msg.name}</h4>
                  <p className="text-xs text-muted-foreground">{msg.date}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {msg.message}
              </p>
              <button
                onClick={() => toggleLike(msg.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition text-sm"
              >
                <Heart
                  className={`w-4 h-4 ${liked.has(msg.id) ? 'fill-primary text-primary' : ''}`}
                />
                <span>{msg.likes + (liked.has(msg.id) ? 1 : 0)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
