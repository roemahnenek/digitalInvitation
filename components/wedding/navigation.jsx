'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation({ onRsvpClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'About Us', href: '#couple' },
    { label: 'Love Story', href: '#love-story' },
    { label: 'Event Details', href: '#details' },
    { label: 'Location', href: '#location' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Wishes', href: '#guestbook' }
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-serif font-bold text-primary">
          S & M
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="text-sm hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={onRsvpClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            RSVP
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-3 px-4 py-4">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-sm hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => {
                onRsvpClick()
                closeMobileMenu()
              }}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              RSVP
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
