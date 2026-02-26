import { motion } from 'framer-motion'

export default function Footer() {
  const quickLinks = [
    { label: 'Our Story', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit', href: '#location' },
  ]

  return (
    <footer className="relative bg-charcoal py-20 md:py-28">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-cream text-2xl font-light mb-3">
              The Outpost
            </h3>
            <p className="font-body text-warmGray/60 text-sm leading-relaxed max-w-xs">
              American comfort kitchen on the western edge of the Salt Lake
              Valley. Honest food, made from scratch, worth the&nbsp;drive.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h4 className="font-accent text-amber text-xs uppercase tracking-[0.4em] mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-cream/50 text-sm hover:text-amber transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h4 className="font-accent text-amber text-xs uppercase tracking-[0.4em] mb-4">
              Stay in the Loop
            </h4>
            <p className="font-body text-warmGray/60 text-sm mb-4">
              Weekly specials and seasonal&nbsp;updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 bg-cream/5 border border-warmGray/20 text-cream placeholder:text-warmGray/30 px-4 py-2.5 font-body text-sm focus:outline-none focus:border-amber transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-amber text-charcoal font-accent text-xs uppercase tracking-[0.15em] px-5 hover:bg-amber/80 transition-colors shrink-0"
              >
                Join
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-warmGray/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-accent text-warmGray/30 text-xs uppercase tracking-[0.2em]">
            &copy; 2026 The Outpost. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Facebook', 'Yelp'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-accent text-warmGray/30 text-xs uppercase tracking-[0.2em] hover:text-amber transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
