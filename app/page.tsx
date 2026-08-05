"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  DoorOpen,
  HeartHandshake,
  House,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Shirt,
  WashingMachine,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

const faqs = [
  ["What is your turnaround time?", "Standard wash-and-fold orders are returned within 48 hours. Your pickup and return windows are confirmed when you schedule."],
  ["What detergents and products do you use?", "You can select your preferred detergent, fabric softener, wash temperature, and any special instructions when placing your order. We follow the preferences attached to your account."],
  ["What areas and ZIP codes do you serve?", "Enter your ZIP code above to confirm service. If it is not currently listed, contact us—we may still be able to accommodate your address."],
  ["How do payments work?", "Payment is processed securely through our booking system. Your final charge is based on the completed order, the $37.50 minimum, and any add-on services you selected."],
  ["Do I have to be home for pickup?", "No. Most customers leave their laundry at their apartment door or another approved building location. Add your instructions when scheduling."],
  ["What happens if something is damaged or lost?", "Contact us within 48 hours so we can review the order promptly under Laundry Farm’s service policy. Cleaning-quality concerns are covered by our free re-clean guarantee."],
  ["What if I am unhappy with the cleaning?", "Tell us within 48 hours and we will re-clean the affected items free—no hassle."],
  ["Can I add more items after scheduling?", "Contact us before pickup whenever possible. Additional items may be included if they are ready when the driver arrives and meet the service requirements."],
];

const steps = [
  [CalendarDays, "Schedule Pickup", "Choose a pickup time that works for you."],
  [DoorOpen, "Leave Laundry at Your Door", "Place your bag outside your apartment door or at your building’s designated pickup location."],
  [WashingMachine, "We Wash and Fold", "Your laundry is carefully washed, dried, and folded according to your preferences."],
  [House, "Returned to Your Door", "Fresh, folded laundry is delivered right back to you within 48 hours."],
];

const benefits = [
  [DoorOpen, "Door-to-Door Convenience", "No hauling bags. No laundromat. No waiting. We come directly to you."],
  [Shirt, "Customize Your Wash", "Choose your detergent, fabric softener, wash temperature, and special instructions. Your laundry, your way."],
  [Clock3, "Back in 48 Hours", "Clean, folded, and returned in two days—with updates along the way."],
  [MessageCircle, "Text a Real Local Person", "Questions? A real Los Angeles team member answers by text, phone, or email. No bots or call centers."],
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Laundry Farm home">
      <Image src="/assets/laundry-farm-basket-icon.png" width={82} height={64} alt="" priority />
      <span>Laundry Farm</span>
    </a>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [zipMessage, setZipMessage] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  function checkZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const zip = String(data.get("zip") || "").trim();
    setZipMessage(/^\d{5}$/.test(zip) ? "Thanks—we’ll confirm service for this address during scheduling." : "Please enter a 5-digit ZIP code.");
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingMessage("Checking availability…");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/cleancloud/booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setBookingMessage(result.message || "We couldn’t complete that request. Please call or text us.");
  }

  const openBooking = () => {
    setBookingMessage("");
    setBookingOpen(true);
  };

  return (
    <main id="top">
      <div className="utility">
        <div className="shell utility-inner">
          <span><MapPin size={14} /> Los Angeles, California</span>
          <a href="tel:+13238074661"><Phone size={14} /> 323-807-4661</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-wrap">
          <Logo />
          <nav className={navOpen ? "nav-links nav-open" : "nav-links"} aria-label="Primary navigation">
            {[["How It Works", "#how"], ["Pricing", "#pricing"], ["Service Area", "#service-area"], ["FAQ", "#faq"], ["Local Team", "#local-team"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setNavOpen(false)}>{label}</a>
            ))}
            <button className="button button-small" onClick={openBooking}>Schedule My Pickup</button>
          </nav>
          <button className="menu-button" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation" aria-expanded={navOpen}>
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero">
        <Image className="hero-image" src="/assets/laundry-farm-founders-hero.png" fill priority sizes="100vw" alt="The Laundry Farm founders beside their green delivery van in Los Angeles" />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Local laundry care, delivered</p>
            <h1>Laundry Pickup and Delivery for Los Angeles Apartments</h1>
            <p className="hero-lead">Door-to-door wash and fold for busy LA residents. We pick up, wash, fold to your preferences, and return everything within 48 hours—so you get your weekend back.</p>
            <div className="offer"><span className="offer-icon">$10</span><strong>New customers: $10 off your first order of $50 or more</strong></div>
            <div className="service-pills">
              <span>$2.50 per pound</span><span>$37.50 minimum</span><span>Pickup and delivery included</span><span>Los Angeles service</span>
            </div>
            <button className="button hero-button" onClick={openBooking}>Schedule My Pickup <ArrowRight size={19} /></button>
            <p className="microcopy">Takes about 60 seconds. No subscription. No commitment.</p>
            <div className="trust-row">
              <div><span className="google-g">G</span><strong>5.0 Google rating</strong><small>10 reviews</small></div>
              <div><ShieldCheck /><strong>100% Happiness Guarantee</strong><small>Tell us within 48 hours and we’ll make it right—no hassle.</small></div>
            </div>
            <aside className="hero-proof" aria-label="Verified Google customer review">
              <div className="proof-rating"><span className="proof-stars" aria-label="5 out of 5 stars">★★★★★</span><strong>5.0</strong><Image src="/assets/google-g.svg" width={20} height={20} alt="Google" /></div>
              <q>Absolutely stellar customer service! Adam and team are so quick, thoughtful, and take great care of their customers. Laundry always comes back so clean and nicely organized.</q>
              <p>— Chloe P., verified Google customer</p>
              <small>10+ verified Google reviews</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="section how" id="how">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">Simple from start to finish</p><h2>How It Works</h2><p>Laundry day made simple.</p></div>
          <div className="steps">
            {steps.map(([Icon, title, body], index) => (
              <article className="step" key={String(title)}>
                <div className="step-icon"><Icon /></div>
                <span className="step-number">{index + 1}</span>
                <h3>{String(title)}</h3><p>{String(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell guarantee">
        <div className="guarantee-mark"><ShieldCheck /></div>
        <div><h2>Your Laundry, Guaranteed</h2><p className="green-text">The Laundry Farm Happiness Guarantee</p></div>
        <div className="guarantee-copy">
          <p>If anything comes back less than perfect, tell us within 48 hours and we’ll make it right—no hassle. We treat your clothes like our own.</p>
          <ul><li><Check /> Free re-clean if you are not happy</li><li><Check /> Careful handling according to your instructions</li><li><Check /> A real local team you can text anytime</li></ul>
        </div>
      </section>

      <section className="section benefits">
        <div className="shell">
          <div className="section-heading"><h2>Why Apartment Residents Use Laundry Farm</h2></div>
          <div className="benefit-grid">
            {benefits.map(([Icon, title, body]) => <article className="card" key={String(title)}><div className="round-icon"><Icon /></div><h3>{String(title)}</h3><p>{String(body)}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">Know the price before pickup</p><h2>Simple, Transparent Pricing</h2><p>No hidden fees. Just clear pricing before you schedule.</p></div>
          <div className="price-grid">
            <article className="price-card featured"><span className="popular">Most popular</span><WashingMachine /><div><h3>Wash and Fold</h3><p className="price">From $2.50 per pound</p><p>Washed, dried, and neatly folded according to your preferences.</p><p><strong>$37.50 minimum order</strong></p><p className="deal">New customers receive $10 off their first order of $50 or more.</p></div></article>
            <article className="price-card"><PackageCheck /><div><h3>Comforters and Bedding</h3><p className="price">From $35</p><p>Comforters, blankets, quilts, duvet covers, sheets, and other washable bedding.</p><p>Pricing varies by item and size.</p></div></article>
            <article className="price-card"><Shirt /><div><h3>Dry Cleaning</h3><p className="price">Available as an add-on service</p><p>Professional dry cleaning can be added to your pickup.</p><p>Contact us for item-specific pricing.</p></div></article>
          </div>
          <p className="pricing-footer">Pickup and delivery are included. $37.50 minimum order. No subscription. You only pay when you place an order.</p>
        </div>
      </section>

      <section className="section service-area" id="service-area">
        <div className="shell narrow">
          <div className="section-heading"><p className="eyebrow">Door-to-door across select neighborhoods</p><h2>Proudly Serving Los Angeles</h2><p>We provide door-to-door laundry pickup and delivery across select Los Angeles neighborhoods.</p></div>
          <form className="zip-form" onSubmit={checkZip}><MapPin /><input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="Enter your ZIP code to verify service" aria-label="ZIP code" required /><button className="button" type="submit">Check</button></form>
          <p className="form-message" aria-live="polite">{zipMessage}</p>
          <p>Don’t see your ZIP code? <a href="tel:+13238074661">Contact us</a>—we may still be able to help.</p>
        </div>
      </section>

      <section className="section local-team" id="local-team">
        <div className="shell local-card">
          <div className="local-photo"><Image src="/assets/laundry-farm-founders-hero.png" fill sizes="(max-width: 800px) 100vw, 42vw" alt="The local Laundry Farm team beside their delivery van" /></div>
          <div className="local-copy"><p className="eyebrow">Local LA Team</p><h2>A Local LA Team, Not a Faceless App</h2><p>Laundry Farm is run by real Angelenos who wash every order like it is our own. When you text us, you are texting a real person here in the city—not a call center.</p><div className="local-points"><span><House />Your neighbors, not an app</span><span><HeartHandshake />Community first</span><span><ShieldCheck />Professional care</span><span><MapPin />Proudly based in Los Angeles</span></div></div>
        </div>
      </section>

      <section className="section reviews">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">Real words from real customers</p><h2>LA Renters Are Ditching the Laundromat</h2></div>
          <div className="review-grid">
            <blockquote><div className="review-top"><span className="google-g">G</span><span className="stars">★★★★★</span></div><p>“Absolutely stellar customer service! Adam and team are so quick, thoughtful, and take great care of their customers. Laundry always comes back so clean and nicely organized. The most efficient laundry service in LA. Super affordable, no crazy rates or hidden fees. Always reliable. Seriously just the best!”</p><cite>— Chloe Pace, verified Google customer</cite></blockquote>
            <blockquote><div className="review-top"><span className="google-g">G</span><span className="stars">★★★★★</span></div><p>“Laundry Farm is great! Elizabeth is the best!”</p><cite>— J. Liang, verified Google Reviews Local Guide &amp; weekly customer</cite></blockquote>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="shell narrow"><div className="section-heading"><h2>Frequently Asked Questions</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta" id="schedule">
        <div className="shell"><p className="eyebrow">Your weekend starts here</p><h2>Get Your First Pickup—$10 Off</h2><p>Schedule in about 60 seconds. We will pick up, wash, fold, and return everything within 48 hours.</p><p>Backed by the Laundry Farm Happiness Guarantee.</p><button className="button button-light" onClick={openBooking}>Schedule My Pickup <ArrowRight size={19} /></button><small>$10 off your first order of $50 or more</small><span>5.0 on Google · 10 reviews · Serving select Los Angeles neighborhoods</span></div>
      </section>

      <footer><div className="shell footer-inner"><Logo compact /><p>Door-to-door laundry pickup and delivery in Los Angeles.</p><a href="tel:+13238074661">323-807-4661</a></div></footer>

      <button className="mobile-sticky-cta" onClick={openBooking}><CalendarDays /> Schedule My Pickup</button>

      {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setBookingOpen(false)}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X /></button><p className="eyebrow">Pickup request</p><h2 id="booking-title">Schedule in about 60 seconds</h2><p>Enter your details and we’ll check your Laundry Farm route and available pickup times.</p><form onSubmit={submitBooking}><label>Full name<input name="name" autoComplete="name" required /></label><label>Mobile phone<input name="phone" type="tel" autoComplete="tel" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Pickup address<input name="address" autoComplete="street-address" required /></label><label>ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} required /></label><button className="button" type="submit">Check pickup availability <ArrowRight size={18} /></button></form><p className="form-message" aria-live="polite">{bookingMessage}</p><small>Your information is used only to coordinate your Laundry Farm service.</small></section></div>}
    </main>
  );
}
