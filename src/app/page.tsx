"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

/* ───────── Parallax hook ───────── */
function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            // Only calculate when element is near viewport
            if (rect.bottom > -200 && rect.top < viewH + 200) {
              setOffset((rect.top - viewH / 2) * speed);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return { ref, offset };
}

/* ───────── Scroll fade-in ───────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
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

/* ───────── Tilt card hook ───────── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-2px)`;
  }, [intensity]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }, []);

  return { ref, onMove, onLeave };
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

/* ───────── Hero with parallax ───────── */
function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax: image moves at 40% of scroll speed, content fades out
  const imgY = scrollY * 0.4;
  const contentOpacity = Math.max(0, 1 - scrollY / 600);
  const contentY = scrollY * 0.15;

  return (
    <section className="hero">
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${imgY}px)`, willChange: "transform" }}>
        <Image src="/images/exterior.jpg" alt="The Outpost restaurant exterior at dusk" fill priority style={{ objectFit: "cover" }} quality={90} />
      </div>
      <div className="hero-overlay" />
      <div
        className="hero-content"
        style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)`, willChange: "transform, opacity" }}
      >
        <h1 className="hero-title">The Outpost</h1>
        <div className="hero-divider" />
        <p className="hero-subtitle">Grantsville&apos;s Kitchen Since Day One</p>
      </div>
      <div
        className="scroll-indicator"
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 1,
          color: "var(--color-text-muted)", fontSize: "1.25rem",
          opacity: Math.max(0, 1 - scrollY / 300),
        }}
      >
        ↓
      </div>
    </section>
  );
}

/* ───────── About with parallax image ───────── */
function About() {
  const { ref: imgRef, offset: imgOffset } = useParallax(0.15);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <FadeIn>
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-heading">Where Every Meal Feels Like Coming Home</h2>
              <div className="about-text">
                <p>
                  The Outpost isn&apos;t just a restaurant — it&apos;s Grantsville&apos;s gathering place.
                  From hearty breakfasts that fuel your morning to dinners that bring the whole family
                  together, we&apos;ve been serving up comfort food and cold drinks with a smile since day one.
                </p>
                <p>
                  In a town like Grantsville, your neighbors are your family. That&apos;s how we treat everyone
                  who walks through our door. Real food, real people, no pretense — just the kind of cooking
                  that makes you want to pull up a chair and stay a while.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={1}>
            <div ref={imgRef} className="about-img-wrapper" style={{ overflow: "hidden" }}>
              <div style={{ transform: `translateY(${imgOffset}px)`, transition: "transform 0.1s linear", width: "100%", height: "120%", position: "relative", top: "-10%" }}>
                <Image src="/images/food6-potato.jpg" alt="Loaded baked potato from The Outpost" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────── Full-width parallax divider ───────── */
function ParallaxDivider({ src, alt }: { src: string; alt: string }) {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              setScrollY(rect.top * 0.3);
            }
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
    <div ref={ref} className="parallax-divider">
      <div style={{ transform: `translateY(${scrollY}px)`, willChange: "transform", position: "absolute", inset: "-20% 0", height: "140%" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="100vw" />
      </div>
      <div className="parallax-divider-overlay" />
    </div>
  );
}

/* ───────── Menu Highlights ───────── */
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
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="#" className="cta-btn">View Full Menu</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── Testimonials with tilt ───────── */
const testimonials = [
  { text: "The stuffed bell peppers at The Outpost has to be the best peppers I have ever eaten. Highly recommend!", author: "Bob Logan" },
  { text: "100% recommend! Great food, friendly staff, and it just feels like home. We eat here at least once a week.", author: "Facebook Review" },
  { text: "Best comfort food in the valley. The portions are huge and everything is made fresh. Don't sleep on this place.", author: "Local Regular" },
];

function TestimonialCard({ text, author }: { text: string; author: string }) {
  const { ref, onMove, onLeave } = useTilt(6);
  return (
    <div
      ref={ref}
      className="testimonial-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.2s ease-out, border-color 0.3s ease" }}
    >
      <span className="testimonial-quote-mark">&ldquo;</span>
      <p className="testimonial-text">{text}</p>
      <span className="testimonial-author">— {author}</span>
    </div>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-heading">What People Are Saying</h2>
          </div>
        </FadeIn>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i < 3 ? (i + 1) as 1 | 2 | 3 : undefined}>
              <TestimonialCard text={t.text} author={t.author} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Location ───────── */
const hours = [
  { day: "Monday", time: "11:00 AM – 9:00 PM" },
  { day: "Tuesday", time: "11:00 AM – 9:00 PM" },
  { day: "Wednesday", time: "11:00 AM – 9:00 PM" },
  { day: "Thursday", time: "11:00 AM – 9:00 PM" },
  { day: "Friday", time: "11:00 AM – 9:00 PM" },
  { day: "Saturday", time: "11:00 AM – 9:00 PM" },
  { day: "Sunday", time: "11:00 AM – 8:00 PM" },
];

function Location() {
  return (
    <section id="visit" className="section section-alt">
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">Find Us</span>
            <h2 className="section-heading">Visit Us</h2>
          </div>
        </FadeIn>

        <div className="location-grid">
          <FadeIn>
            <div>
              <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "1.25rem", color: "var(--color-text)", marginBottom: "1.25rem", fontWeight: 600 }}>
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

              <h3 style={{ fontFamily: "var(--ff-heading)", fontSize: "1.25rem", color: "var(--color-text)", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 600 }}>
                Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem", color: "var(--color-text-muted)" }}>
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
        <span style={{ fontFamily: "var(--ff-heading)", fontSize: "1.35rem", color: "var(--color-primary)" }}>
          The Outpost
        </span>
        <div style={{ marginTop: "0.75rem" }}>
          <a href="https://www.facebook.com/profile.php?id=100075872236123" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", transition: "color 0.3s" }}
            onMouseOver={e => (e.currentTarget.style.color = "var(--color-primary)")}
            onMouseOut={e => (e.currentTarget.style.color = "var(--color-text-muted)")}>
            Follow us on Facebook
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
        <ParallaxDivider src="/images/food7-steak.jpg" alt="Comfort food at The Outpost" />
        <MenuHighlights />
        <Testimonials />
        <ParallaxDivider src="/images/food2-breakfast.jpg" alt="Breakfast at The Outpost" />
        <Location />
      </main>
      <Footer />
    </>
  );
}
