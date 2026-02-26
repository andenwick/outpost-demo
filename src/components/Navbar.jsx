import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Our Story', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-cream text-xl font-semibold tracking-wide"
        >
          The Outpost
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-accent text-cream/80 text-sm uppercase tracking-[0.2em] hover:text-amber transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#location"
            className="font-accent text-sm uppercase tracking-[0.15em] px-5 py-2 border border-amber text-amber hover:bg-amber hover:text-charcoal transition-all duration-300"
          >
            Reserve
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-cream flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-charcoal/98 backdrop-blur-md px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-accent text-cream text-lg uppercase tracking-[0.2em] hover:text-amber transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#location"
            onClick={() => setMenuOpen(false)}
            className="font-accent text-sm uppercase tracking-[0.15em] px-5 py-3 border border-amber text-amber text-center hover:bg-amber hover:text-charcoal transition-all duration-300"
          >
            Reserve
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
