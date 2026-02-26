import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const menuCategories = [
  {
    name: 'Starters',
    items: [
      {
        name: 'Campfire Queso',
        desc: 'Smoked cheddar, roasted green chile, grilled sourdough',
        price: '12',
      },
      {
        name: 'Cast Iron Cornbread',
        desc: 'Whipped honey butter, flaky sea salt',
        price: '8',
      },
      {
        name: 'Crispy Fried Pickles',
        desc: 'Buttermilk batter, house ranch, hot honey drizzle',
        price: '10',
      },
    ],
  },
  {
    name: 'Mains',
    items: [
      {
        name: 'The Outpost Burger',
        desc: 'Double smash patty, aged cheddar, caramelized onion, special sauce, brioche',
        price: '18',
      },
      {
        name: 'Slow-Smoked Brisket',
        desc: '14-hour oak smoke, house BBQ, vinegar slaw, bread & butter pickles',
        price: '24',
      },
      {
        name: 'Chicken Fried Steak',
        desc: 'Hand-breaded, country pepper gravy, whipped potatoes, roasted green beans',
        price: '21',
      },
      {
        name: 'Cast Iron Mac & Cheese',
        desc: 'Four-cheese blend, smoked breadcrumb crust, chive oil',
        price: '16',
      },
    ],
  },
  {
    name: 'Sweet Endings',
    items: [
      {
        name: 'Skillet Cookie',
        desc: 'Brown butter chocolate chip, vanilla bean ice cream, salted caramel',
        price: '11',
      },
      {
        name: 'Seasonal Pie',
        desc: 'Rotating selection — ask your server. Always made that morning.',
        price: '9',
      },
    ],
  },
]

// Precompute the starting index for each category so stagger delays
// are globally sequential. Static data, so computed once at module level.
const categoryOffsets = menuCategories.reduce((offsets, _cat, i) => {
  offsets.push(i === 0 ? 0 : offsets[i - 1] + menuCategories[i - 1].items.length)
  return offsets
}, [])

export default function Menu() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Ambient glow drifts with scroll
  const glowX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const glowScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1.2, 0.9])

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-charcoal overflow-hidden"
    >

      {/* Ambient glow — drifts with scroll */}
      <motion.div
        style={{ x: glowX, y: glowY, scale: glowScale }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24"
        >
          <span className="font-accent text-amber text-xs uppercase tracking-[0.4em] block mb-4">
            From the Kitchen
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cream text-4xl md:text-5xl font-light"
          >
            Menu Highlights
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-amber mx-auto mt-6"
          />
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {menuCategories.map((category, catIdx) => (
            <div key={category.name}>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="font-accent text-amber/70 text-xs uppercase tracking-[0.4em] mb-8 text-center"
              >
                {category.name}
              </motion.h3>

              <div className="space-y-6">
                {category.items.map((item, itemIdx) => {
                  const globalIdx = categoryOffsets[catIdx] + itemIdx
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.6,
                        delay: (globalIdx % 4) * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group"
                    >
                      <div className="flex items-baseline gap-4">
                        <h4 className="font-display text-cream text-lg md:text-xl font-light group-hover:text-amber transition-colors duration-300 shrink-0">
                          {item.name}
                        </h4>
                        <div className="flex-1 border-b border-dotted border-warmGray/20 translate-y-[-4px] min-w-[2rem]" />
                        <span className="font-accent text-amber text-sm shrink-0">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-warmGray/60 font-body text-sm mt-1.5 max-w-lg">
                        {item.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <p className="font-body text-warmGray/40 italic text-sm mb-6">
            Full menu available in-house &mdash; seasonal items rotate weekly
          </p>
          <motion.a
            href="#location"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block font-accent text-sm uppercase tracking-[0.2em] text-amber border border-amber/40 px-8 py-3 hover:bg-amber hover:text-charcoal transition-all duration-300"
          >
            Come Visit
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
