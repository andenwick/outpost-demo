import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tue – Thu', time: '11am – 9pm' },
  { day: 'Fri – Sat', time: '11am – 10pm' },
  { day: 'Sunday', time: '10am – 8pm' },
]

export default function Location() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map slides in from left, info from right
  const mapX = useTransform(scrollYProgress, [0.1, 0.4], [-60, 0])
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const infoX = useTransform(scrollYProgress, [0.15, 0.45], [60, 0])
  const infoOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])

  // Map desaturation clears as section scrolls in
  const mapFilter = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    ['grayscale(100%) contrast(1.1)', 'grayscale(0%) contrast(1)']
  )
  const mapImgOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.7, 1])

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-parchment overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <span className="font-accent text-amber text-xs uppercase tracking-[0.4em] block mb-4">
            Find Us
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-espresso text-4xl md:text-5xl font-light"
          >
            Worth the Drive
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-amber mx-auto mt-6"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Map — slides in from left */}
          <motion.div
            style={{ x: mapX, opacity: mapOpacity }}
            className="md:col-span-2"
          >
            <div className="aspect-[16/10] overflow-hidden relative group">
              <motion.iframe
                style={{ filter: mapFilter, opacity: mapImgOpacity }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48476!2d-112.1!3d40.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528e16aa12e6fb%3A0x3b1cfa2be5e3b90f!2sMagna%2C%20UT!5e0!3m2!1sen!2sus!4v1"
                className="w-full h-full border-0 group-hover:!filter-none group-hover:!opacity-100 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
                title="The Outpost location"
              />
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-amber/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Info — slides in from right */}
          <motion.div style={{ x: infoX, opacity: infoOpacity }}>
            {/* Address */}
            <div className="mb-10">
              <h3 className="font-accent text-amber text-xs uppercase tracking-[0.4em] mb-4">
                Address
              </h3>
              <p className="font-body text-espresso text-base leading-relaxed">
                8450 W Frontier Road
                <br />
                Magna, UT 84044
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-accent text-xs uppercase tracking-[0.2em] text-forest mt-3 hover:text-amber transition-colors border-b border-forest/30 hover:border-amber pb-px"
              >
                Get Directions
              </a>
            </div>

            {/* Hours — stagger each row */}
            <div className="mb-10">
              <h3 className="font-accent text-amber text-xs uppercase tracking-[0.4em] mb-4">
                Hours
              </h3>
              <div className="space-y-2.5">
                {hours.map((h, i) => (
                  <motion.div
                    key={h.day}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex justify-between items-baseline font-body"
                  >
                    <span className="text-warmGray text-sm">{h.day}</span>
                    <span
                      className={`text-sm ${
                        h.time === 'Closed'
                          ? 'text-warmGray/50 italic'
                          : 'text-espresso font-medium'
                      }`}
                    >
                      {h.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-accent text-amber text-xs uppercase tracking-[0.4em] mb-4">
                Contact
              </h3>
              <p className="font-body text-espresso text-base">(801) 555-0187</p>
              <p className="font-body text-warmGray text-sm mt-1">
                hello@theoutpostslc.com
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
