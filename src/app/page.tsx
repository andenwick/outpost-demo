"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ───────── Scroll fade-in ───────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, className = "", delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeIn();
  const delayClass = delay ? `fade-in-delay-${delay}` : "";
  return <div ref={ref} className={`fade-in ${delayClass} ${className}`}>{children}</div>;
}

/* ───────── Nav ───────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="nav-logo">The Outpost</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#visit">Visit</a></li>
      </ul>
    </nav>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (bgRef.current) {
            bgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
          }
          if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
            contentRef.current.style.opacity = String(Math.max(0, 1 - y / 600));
          }
          if (indicatorRef.current) {
            indicatorRef.current.style.opacity = String(Math.max(0, 1 - y / 200));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero">
      <div ref={bgRef} className="hero-bg">
        <Image
          src="/images/exterior.jpg"
          alt="The Outpost restaurant exterior"
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" />
      <div ref={contentRef} className="hero-content">
        <h1 className="hero-title">The Outpost</h1>
        <div className="hero-rule" />
        <p className="hero-subtitle">Grantsville&apos;s Kitchen Since Day One</p>
      </div>
      <div
        ref={indicatorRef}
        className="scroll-indicator"
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 2,
          color: "var(--color-text-muted)", fontSize: "1.25rem",
        }}
      >
        ↓
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <FadeIn>
          <div className="section-rule" />
        </FadeIn>
        <div className="about-grid">
          <FadeIn>
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-heading">Where Every Meal<br />Feels Like Home</h2>
              <div className="about-text">
                <p>
                  The Outpost isn&apos;t just a restaurant — it&apos;s Grantsville&apos;s gathering place.
                  From hearty breakfasts that fuel your morning to dinners that bring the whole family
                  together, we&apos;ve been serving up comfort food and cold drinks with a smile since day one.
                </p>
                <p>
                  Your neighbors are your family. That&apos;s how we treat everyone
                  who walks through our door. Real food, real people, no pretense — just the kind of cooking
                  that makes you want to pull up a chair and stay a while.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={1}>
            <div className="about-img-wrapper">
              <Image
                src="/images/food6-potato.jpg"
                alt="Loaded baked potato from The Outpost"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────── Parallax band ───────── */
function ParallaxBand({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="parallax-band"
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt || ""}
    >
      <div className="parallax-band-overlay" />
    </div>
  );
}

/* ───────── Menu ───────── */
const menuItems = [
  { src: "/images/food1-wings.jpg", label: "Wings", sub: "Crispy & sauced to order", alt: "Crispy wings" },
  { src: "/images/food9-burger.jpg", label: "Burgers", sub: "Half-pound, never frozen", alt: "Juicy burger" },
  { src: "/images/food3-pasta.jpg", label: "Comfort Classics", sub: "The dishes you grew up on", alt: "Pasta dish" },
  { src: "/images/food8-fried.jpg", label: "Country Fried", sub: "Golden, crispy, perfect", alt: "Country fried steak" },
];

function MenuHighlights() {
  return (
    <section id="menu" className="section section-alt">
      <div className="container">
        <FadeIn>
          <div className="section-rule" />
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label">The Menu</span>
            <h2 className="section-heading">From Our Kitchen</h2>
          </div>
        </FadeIn>

        <div className="menu-grid">
          {menuItems.map((item, i) => (
            <FadeIn key={item.label} delay={i < 4 ? (i + 1) as 1 | 2 | 3 : undefined}>
              <div className="menu-item">
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="menu-item-overlay">
                  <span className="menu-item-label">{item.label}</span>
                  <span className="menu-item-sub">{item.sub}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <a href="#" className="cta-btn">View Full Menu</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── Testimonials ───────── */
const testimonials = [
  { text: "The stuffed bell peppers at The Outpost has to be the best peppers I have ever eaten. Highly recommend!", author: "Bob Logan" },
  { text: "100% recommend! Great food, friendly staff, and it just feels like home. We eat here at least once a week.", author: "Facebook Review" },
  { text: "Best comfort food in the valley. The portions are huge and everything is made fresh. Don't sleep on this place.", author: "Local Regular" },
];

function Testimonials() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <FadeIn>
          <div className="section-rule" />
          <div style={{ marginBottom: "3.5rem" }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-heading">What People Are Saying</h2>
          </div>
        </FadeIn>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i < 3 ? (i + 1) as 1 | 2 | 3 : undefined}>
              <div className="testimonial-card">
                <span className="testimonial-quote-mark">"</span>
                <p className="testimonial-text">{t.text}</p>
                <span className="testimonial-author">{t.author}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Location ───────── */
const hours = [
  { day: "Monday", time: "11 AM – 9 PM" },
  { day: "Tuesday", time: "11 AM – 9 PM" },
  { day: "Wednesday", time: "11 AM – 9 PM" },
  { day: "Thursday", time: "11 AM – 9 PM" },
  { day: "Friday", time: "11 AM – 9 PM" },
  { day: "Saturday", time: "11 AM – 9 PM" },
  { day: "Sunday", time: "11 AM – 8 PM" },
];

function Location() {
  return (
    <section id="visit" className="section section-alt">
      <div className="container">
        <FadeIn>
          <div className="section-rule" />
          <div style={{ marginBottom: "3.5rem" }}>
            <span className="section-label">Find Us</span>
            <h2 className="section-heading">Come By Anytime</h2>
          </div>
        </FadeIn>

        <div className="location-grid">
          <FadeIn>
            <div>
              <h3 style={{ fontFamily: "var(--ff-body)", fontSize: "0.7rem", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>
                Hours
              </h3>
              <div>
                {hours.map((h) => (
                  <div key={h.day} className="hours-row">
                    <span className="hours-day">{h.day}</span>
                    <span className="hours-time">{h.time}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: "var(--ff-body)", fontSize: "0.7rem", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1.25rem" }}>
                Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                <span>58 West Main St, Grantsville, UT 84029</span>
                <a href="tel:+14352490396" className="contact-link">(435) 249-0396</a>
                <a href="mailto:outposteats@gmail.com" className="contact-link">outposteats@gmail.com</a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.8!2d-112.4633!3d40.5997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s58+W+Main+St%2C+Grantsville%2C+UT+84029!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="The Outpost location"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span className="footer-logo">The Outpost</span>
        <div style={{ marginTop: "1rem" }}>
          <a
            href="https://www.facebook.com/profile.php?id=100075872236123"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}
          >
            Facebook
          </a>
        </div>
        <p className="footer-credit">
          © {new Date().getFullYear()} The Outpost · Built by <a href="https://andenwick.dev">Anden Wickstrand</a>
        </p>
      </div>
    </footer>
  );
}

/* ───────── Page ───────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ParallaxBand src="/images/food7-steak.jpg" alt="Comfort food at The Outpost" />
        <MenuHighlights />
        <Testimonials />
        <ParallaxBand src="/images/food2-breakfast.jpg" alt="Breakfast at The Outpost" />
        <Location />
      </main>
      <Footer />
    </>
  );
}
