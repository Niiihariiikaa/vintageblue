import type { FormEvent, MouseEvent } from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './ContactLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'

const details = [
  { icon: Mail, n: 'Email', label: 'Write To Us', value: 'hello@vintageblue.in', href: 'mailto:hello@vintageblue.in' },
  { icon: Phone, n: 'Call', label: '10am – 6pm IST', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, n: 'Visit', label: 'Studio', value: 'Industrial Area, Ludhiana, Punjab', href: undefined },
]

const faqs = [
  {
    q: 'Are you open to retail or private-label partnerships?',
    a: 'Yes — we work with retail and fashion brands as a manufacturing and private-label partner. Reach out with a brief and we’ll follow up within a few days.',
  },
  {
    q: 'Where can I find sizing help for an order?',
    a: 'Each product page has a size guide under Details. For anything specific to your fit, email us and we’ll help directly.',
  },
  {
    q: 'Do you ship outside Northern and Eastern India?',
    a: 'Our distribution network is strongest there today, but we’re expanding steadily — message us and we’ll confirm what’s possible for your location.',
  },
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function ContactLanding() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="cx-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="cx-hero">
        <Reveal>
          <p className="cx-eyebrow">
            Get In Touch <span className="cx-rule" aria-hidden="true" /> Ludhiana
          </p>
          <h1 className="cx-title">
            <span>Contact</span>
            <span className="cx-title-accent">Us</span>
          </h1>
        </Reveal>

        <Reveal delay={80} className="cx-lede">
          <p>
            Questions about an order, a partnership, or just want to talk
            denim — we'd like to hear from you.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Details bar ---------------- */}
      <section className="cx-stats">
        {details.map((d, i) => {
          const Icon = d.icon
          const content = (
            <>
              <span className="cx-stat-top">
                <Icon size={16} strokeWidth={1.6} />
                <span className="cx-stat-n">{d.n}</span>
              </span>
              <span className="cx-stat-value">{d.value}</span>
              <span className="cx-stat-label">{d.label}</span>
            </>
          )
          return d.href ? (
            <Reveal key={d.n} delay={i * 60} className="cx-stat-cell">
              <a className="cx-stat" href={d.href}>
                {content}
              </a>
            </Reveal>
          ) : (
            <Reveal key={d.n} delay={i * 60} className="cx-stat-cell">
              <div className="cx-stat">{content}</div>
            </Reveal>
          )
        })}
      </section>

      {/* ---------------- 01 — Send a message ---------------- */}
      <section className="cx-main">
        <div className="cx-main-copy">
          <Reveal>
            <p className="cx-eyebrow cx-eyebrow-dark">
              01 <span className="cx-rule cx-rule-dark" aria-hidden="true" /> Send A Message
            </p>
            <h2 className="cx-main-heading">Tell Us What You Need.</h2>
            <p className="cx-main-lede">
              Orders, partnerships, press, or just a question about a
              fit — write in and someone from the studio will get back
              to you directly.
            </p>
          </Reveal>

          <Reveal delay={80} className="cx-social">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
          </Reveal>
        </div>

        <Reveal delay={100} className="cx-form-cell">
          <form className="cx-form" onSubmit={handleSubmit}>
            <div className="cx-field-row">
              <label className="cx-field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label className="cx-field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <label className="cx-field">
              <span>Subject</span>
              <input type="text" name="subject" placeholder="What's this about?" />
            </label>

            <label className="cx-field">
              <span>Message</span>
              <textarea name="message" rows={5} placeholder="Tell us a bit more…" required />
            </label>

            <button type="submit" className="cx-submit">
              Send Message
            </button>
            <p className="cx-form-note">
              This is a demo form — nothing is actually sent yet.
            </p>
          </form>
        </Reveal>
      </section>

      {/* ---------------- 02 — FAQ ---------------- */}
      <section className="cx-faq">
        <Reveal>
          <p className="cx-eyebrow cx-eyebrow-dark">
            02 <span className="cx-rule cx-rule-dark" aria-hidden="true" /> Before You Write In
          </p>
          <h2 className="cx-faq-heading">A Few Common Questions.</h2>
        </Reveal>

        <div className="cx-faq-list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70} className="cx-faq-item">
              <span className="cx-faq-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="cx-cta">
        <Reveal>
          <h2>Prefer To Browse First?</h2>
          <a href="/shop/popular" className="cx-cta-link" onClick={go('/shop/popular')}>
            Shop Popular <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="cx-footer">
        <div className="cx-footer-brand">
          <p className="cx-footer-wordmark">
            <span className="script-initial">V</span>intage Blue
          </p>
          <p className="cx-footer-tag">Menswear built on fit, fabric, and finish. Ludhiana, Punjab — since 2006.</p>
        </div>

        <div className="cx-footer-col">
          <h3>Shop</h3>
          <a href="/shop/popular" onClick={go('/shop/popular')}>Popular</a>
          <a href="/drop" onClick={go('/drop')}>New Drop</a>
          <a href="/shop/men" onClick={go('/shop/men')}>Men</a>
          <a href="/shop/unisex" onClick={go('/shop/unisex')}>Unisex</a>
        </div>

        <div className="cx-footer-col">
          <h3>Brand</h3>
          <a href="/about" onClick={go('/about')}>About Us</a>
          <a href="/lookbook" onClick={go('/lookbook')}>Lookbook</a>
          <a href="/story" onClick={go('/story')}>Our Story</a>
          <a href="/contact" onClick={go('/contact')}>Contact Us</a>
        </div>

        <div className="cx-footer-col">
          <h3>Help</h3>
          <a href="#">Sizing &amp; Fit</a>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Denim Care</a>
        </div>

        <div className="cx-footer-bottom">© 2026 Vintage Blue — All Rights Reserved</div>
      </footer>
    </div>
  )
}

export default ContactLanding
