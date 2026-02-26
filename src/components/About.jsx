import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax depths — images and text move at different rates
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const overlayY = useTransform(scrollYProgress, [0, 1], [90, -90])
  const overlayRotate = useTransform(scrollYProgress, [0, 1], [4, -2])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const frameY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-cream overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <span className="font-accent text-amber text-xs uppercase tracking-[0.4em]">
            Our Story
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Images with parallax */}
          <div className="relative">
            <motion.div style={{ y: imageY }} className="relative">
              <motion.img
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80"
                alt="Rustic restaurant interior"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>

            {/* Overlapping photo — faster parallax + rotation */}
            <motion.img
              style={{ y: overlayY, rotate: overlayRotate }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80"
              alt="Chef preparing food"
              className="absolute -bottom-8 -right-8 w-48 md:w-56 aspect-square object-cover border-4 border-cream shadow-2xl hidden sm:block"
            />

            {/* Decorative frame — own parallax rate */}
            <motion.div
              style={{ y: frameY }}
              className="absolute top-4 left-4 -right-4 -bottom-4 border border-amber/30 -z-10"
            />
          </div>

          {/* Text with parallax offset */}
          <motion.div style={{ y: textY }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl md:text-4xl text-espresso font-light mb-8 leading-tight"
            >
              A frontier post
              <br />
              <span className="italic text-forest">for the hungry</span>
            </motion.h2>

            <div className="space-y-5 text-warmGray font-body text-base leading-relaxed">
              {[
                'Tucked into the western edge of the Salt Lake Valley, The Outpost was born from a simple belief: the best meals are the ones worth driving for. We\'re not on Main Street, and that\'s the point.',
                'Our kitchen runs on cast iron and conviction. Every brisket gets its full fourteen hours. Every pie crust is rolled by hand. We source from ranches and farms across the Wasatch Front, because great comfort food starts with ingredients that actually taste like something.',
                'Pull up a chair, order too much, and stay a while. Out here, nobody\'s rushing you.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 pt-8 border-t border-espresso/10"
            >
              <p className="font-display italic text-espresso text-base">
                &mdash; The Mercer Family
              </p>
              <p className="font-accent text-warmGray/60 text-xs uppercase tracking-[0.3em] mt-1">
                Owners &amp; Operators since 2019
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
