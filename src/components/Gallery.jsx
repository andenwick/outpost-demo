import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    alt: 'Signature burger',
    className: 'col-span-2 row-span-2',
    speed: 30,
  },
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    alt: 'Smoked brisket',
    className: '',
    speed: -20,
  },
  {
    src: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=600&q=80',
    alt: 'Mac and cheese',
    className: '',
    speed: 15,
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    alt: 'Restaurant ambiance',
    className: '',
    speed: -25,
  },
  {
    src: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=600&q=80',
    alt: 'Homemade pie',
    className: '',
    speed: 20,
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    alt: 'BBQ spread',
    className: 'col-span-2',
    speed: -15,
  },
]

function ParallaxCell({ img, idx }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [img.speed, -img.speed])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${img.className} overflow-hidden group cursor-pointer`}
    >
      <motion.div style={{ y }} className="relative w-full h-full min-h-[200px] md:min-h-[250px]">
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-500 flex items-end p-4">
          <span className="font-accent text-cream text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            {img.alt}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-32 md:py-44 bg-cream overflow-hidden">

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
            The Scene
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-espresso text-4xl md:text-5xl font-light"
          >
            From Our Table
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-amber mx-auto mt-6"
          />
        </motion.div>

        {/* Grid with per-image parallax */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, idx) => (
            <ParallaxCell key={idx} img={img} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
