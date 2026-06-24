import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/* ── nav links ── */
const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
];

/* ── services ── */
const SERVICES = [
  {
    emoji: '🏭',
    title: 'Green Field and Brown Field Projects',
    bullets: [
      'Capacity planning, layout design, and material flow optimisation',
      'Establishing world-class manufacturing systems based on Lean & TPM',
      'Multi-plant manufacturing integration projects',
      'Building scalable processes for quality, productivity, and safety',
      'Implementing digital dashboards, traceability, and smart factory elements',
    ],
  },
  {
    emoji: '🏭',
    title: 'Plant Performance & Turnaround',
    bullets: [
      'OEE improvement & line balancing',
      'FPY & PPM reduction programs',
      'Bottleneck analysis & debottlenecking',
      'Structured daily management & reviews',
    ],
  },
  {
    emoji: '📊',
    title: 'P&L & Operations Strategy',
    bullets: [
      'Capacity planning & footprint decisions',
      'Cost-to-serve & profitability improvement',
      'KPI design & governance rhythm',
      'Make vs buy & outsourcing strategy',
    ],
  },
  {
    emoji: '🔌',
    title: 'EMS & Electronics Excellence',
    bullets: [
      'SMT line optimisation & NPI → mass production',
      'High-mix PCB manufacturing systems',
      'Repair, rework & test strategy',
      'Supplier quality & incoming controls',
    ],
  },
  {
    emoji: '👥',
    title: 'Leadership & Governance',
    bullets: [
      'Plant leadership coaching',
      'Tiered review structures',
      'Role clarity & accountability',
      'Culture of problem-solving & kaizen',
    ],
  },
  {
    emoji: '🏆',
    title: 'Business Excellence',
    bullets: [
      'Anchoring continuous improvement culture across plants and functions',
      'Leading cost reduction, quality improvement, and productivity enhancement programs',
      'Deploying Lean, Kaizen, and Six Sigma methodologies for measurable business impact',
      'Ensuring process standardisation, audit readiness, and operational governance',
    ],
  },
];

/* ── certifications ── */
const CERTS = [
  'Certified Lean Manufacturing Professional',
  'Certified Total Productive Maintenance Professional',
  'Certified Lean Six Sigma Black Belt Professional',
  'Certified Supply Chain Management Professional (IIT-Madras)',
];

/* ── focus area tags ── */
const FOCUS = [
  'Plant turnaround',
  'Manufacturing Operations Leadership',
  'OEE & throughput',
  'Business & Financial Leadership',
  'Performance & Productivity Improvement',
  'P&L & governance',
  'Leadership development',
  'Transformation Management',
  'Leadership & Organisation Development',
  'AI Integrated Manufacturing Systems',
  'Digital & Manufacturing Execution Systems',
];

/* ── impact metrics ── */
const METRICS = [
  { label: 'Yield improvement', value: 99, suffix: '%', sub: 'from 95.7% in high-volume EMS' },
  { label: 'Rejection reduction matrices', value: 0, suffix: ' PPM', sub: 'down from 46,000 PPM' },
  { label: 'Cost Saving', value: 750, suffix: 'K US$', sub: 'in 3 years' },
  { label: 'Productivity gain', value: 32, suffix: '%+', sub: 'through line balancing & SMED' },
  { label: 'Output increase', value: 40, suffix: '%', sub: 'for critical production line' },
  { label: 'BOM Cost Reduction', value: 18, suffix: '%', sub: '' },
  { label: 'Wastage Reduction', value: 25, suffix: '%', sub: '' },
  { label: 'Spare & Consumables Cost Reduction', value: 30, suffix: '%', sub: '' },
];

/* ── animated counter hook ── */
function useCounter(target: number, duration = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (target === 0) { setCount(0); return; }
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── metric card ── */
function MetricCard({ m }: { m: (typeof METRICS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCounter(m.value, 1800, visible);
  return (
    <div ref={ref} className="metric-card">
      <p className="metric-label">{m.label}</p>
      <p className="metric-value">
        {count}{m.suffix}
      </p>
      {m.sub && <p className="metric-sub">{m.sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="site-root">

      {/* ═══ NAV ═══ */}
      <header className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">KB<span>.</span></a>
          <nav className="nav-links">
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#contact" className="nav-cta">Let's Talk</a>
          </nav>
          <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>Let's Talk</a>
          </div>
        )}
      </header>

      {/* ═══ HERO ═══ */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-inner">
          {/* left */}
          <div className="hero-text">
            <span className="hero-badge">Manufacturing &amp; Operations Consultant</span>
            <p className="hero-tagline">Helping plants scale profitably and reliably</p>
            <blockquote className="hero-quote">
              "Topline may fluctuate — the bottom line must stay strong"
            </blockquote>
            <p className="hero-desc">
              Partnering with CXOs and Plant Heads to turn complex operations into predictable,
              high-performance, and profitable systems.
            </p>
            <div className="hero-stats">
              <span>15+ years</span><span className="divider">|</span>
              <span>India &amp; Middle East</span><span className="divider">|</span>
              <span>P&amp;L Ownership</span><span className="divider">|</span>
              <span>Electronics &amp; EMS</span><span className="divider">|</span>
              <span>Automotive</span>
            </div>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">Schedule a conversation</a>
              <a href="#impact" className="btn-outline">View impact delivered</a>
            </div>
          </div>
          {/* right — photo + card */}
          <div className="hero-photo-wrap">
            <img src="/assets/image.png" alt="Khageswar Bhuyan" className="hero-photo" />
            <div className="hero-card">
              <p className="hero-card-name">Khageswar Bhuyan</p>
              <p className="hero-card-role">Manufacturing &amp; Operations Leader</p>
              <p className="hero-card-bio">
                15+ years across electronics, automotive, and engineering. Led plant operations
                with full P&amp;L responsibility across India and the Middle East.
              </p>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-hint">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="section-white">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">About</span>
            <h2 className="section-title">About Khageswar Bhuyan</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I work with promoters, CXOs, and Plant Heads to transform under-performing plants
                into stable, scalable, and profitable operations. My experience spans EMS,
                electronics, automotive, and engineered products across India and the Middle East.
              </p>
              <p>
                I combine shop-floor depth with boardroom clarity — linking OEE, PPM, and
                throughput to P&amp;L, cash flow, and strategic goals.
              </p>
              <p className="focus-heading"><strong>Focus areas:</strong></p>
              <div className="focus-tags">
                {FOCUS.map(f => <span key={f} className="focus-tag">{f}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="section-gray">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Consulting Services</span>
            <h2 className="section-title">How I Can Help</h2>
            <p className="section-sub">
              Engagements are designed to be practical, data-driven, and execution-focused —
              aligned with your plant realities and business goals.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="service-card">
                <span className="service-emoji">{s.emoji}</span>
                <h3 className="service-title">{s.title}</h3>
                <ul className="service-bullets">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="certs-block">
            <div className="service-card">
              <span className="service-emoji">🎓</span>
              <h3 className="service-title">Professional Certifications</h3>
              <ul className="service-bullets">
                {CERTS.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section className="section-white">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Work Portfolio</h2>
          </div>
          <div className="portfolio-wrap">
            <img
              src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Manufacturing portfolio"
              className="portfolio-img"
            />
          </div>
        </div>
      </section>

      {/* ═══ IMPACT ═══ */}
      <section id="impact" className="section-dark">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag-light">Impact Delivered</span>
            <h2 className="section-title-light">A Snapshot of Outcomes</h2>
            <p className="section-sub-light">
              A snapshot of outcomes from recent engagements across manufacturing plants.
            </p>
          </div>
          <div className="metrics-grid">
            {METRICS.map(m => <MetricCard key={m.label} m={m} />)}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="section-white">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Let's Talk</span>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-sub">
              If you are looking at stabilising a plant, scaling capacity, or improving
              profitability, we can start with a focused conversation.
            </p>
          </div>
          <div className="contact-links">
            <a href="tel:+917743972217" className="contact-link">
              <span>📞</span> Call: +91 77439 72217
            </a>
            <a
              href="https://www.linkedin.com/in/khageswar-bhuyan-910021297/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>🔗</span> LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Khageswar Bhuyan · Manufacturing &amp; Operations Consultant</p>
      </footer>

    </div>
  );
}
