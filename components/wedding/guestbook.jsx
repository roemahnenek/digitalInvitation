'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function Guestbook({ slug }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(new Set()) // Keep for local UI state, not persisted

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/guestbook/${slug}`)
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to fetch guestbook messages');
      }
      const data = await res.json()
      setMessages(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchMessages()
    }
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !newName.trim()) {
      setError('Name and message cannot be empty.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/guestbook/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, message: newMessage }),
      })

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to post message');
      }

      setNewMessage('')
      setNewName('')
      fetchMessages() // Refresh messages after posting
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = (id) => {
    // This is currently only for local UI state.
    // To persist likes, an API endpoint to update likes would be needed.
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

        {error && (
          <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ padding: '12px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '6px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', border: '2px solid #1e40af', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <span>Loading messages...</span>
          </div>
        )}

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg border border-border mb-12">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 text-sm"
              disabled={loading}
            />
            <textarea
              placeholder="Write your wishes and blessings..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Your Message'}
          </button>
        </form>

        {/* Messages Display */}
        <div className="space-y-4">
          {messages.length === 0 && !loading && !error && (
            <p className="text-center text-muted-foreground">No messages yet. Be the first to leave a wish!</p>
          )}
          {messages.map((msg) => (
            <div key={msg._id} className="bg-secondary p-6 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-serif font-bold text-foreground">{msg.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {msg.message}
              </p>
              <button
                onClick={() => toggleLike(msg._id)} // Use _id for consistency
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition text-sm"
              >
                <Heart
                  className={`w-4 h-4 ${liked.has(msg._id) ? 'fill-primary text-primary' : ''}`}
                />
                <span>{msg.likes + (liked.has(msg._id) ? 1 : 0)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
