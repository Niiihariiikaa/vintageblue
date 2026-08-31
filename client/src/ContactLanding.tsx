import type { FormEvent, MouseEvent } from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './ContactLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@vintageblue.in',
    href: 'mailto:hello@vintageblue.in',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: 'Industrial Area, Ludhiana, Punjab',
    href: undefined,
  },
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
          <p className="cx-eyebrow">Get In Touch</p>
          <h1 className="cx-title">
            <span className="script-initial">C</span>ontact Us
          </h1>
          <p className="cx-lede">
            Questions about an order, a partnership, or just want to talk denim —
            we'd like to hear from you.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Details + form ---------------- */}
      <section className="cx-main">
        <Reveal className="cx-details">
          {details.map((d) => {
            const Icon = d.icon
            const content = (
              <>
                <span className="cx-detail-icon">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="cx-detail-label">{d.label}</span>
                  <span className="cx-detail-value">{d.value}</span>
                </span>
              </>
            )
            return d.href ? (
              <a key={d.label} className="cx-detail" href={d.href}>
                {content}
              </a>
            ) : (
              <div key={d.label} className="cx-detail">
                {content}
              </div>
            )
          })}

          <div className="cx-social">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
          </div>
        </Reveal>

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

      {/* ---------------- FAQ ---------------- */}
      <section className="cx-faq">
        <Reveal>
          <p className="cx-eyebrow cx-eyebrow-dark">Before You Write In</p>
          <h2 className="cx-faq-heading">A few common questions.</h2>
        </Reveal>

        <div className="cx-faq-list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70} className="cx-faq-item">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="cx-cta">
        <Reveal>
          <h2>Prefer To Browse First?</h2>
          <a href="/shop/popular" className="cx-cta-link" onClick={go('/shop/popular')}>
            Shop Popular <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </Reveal>
      </section>

      <a href="/" className="cx-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default ContactLanding
