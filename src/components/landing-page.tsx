"use client";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Orchestrate",
    description: "Spin up autonomous agents that plan, adapt, and execute — so you never have to babysit a workflow again.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Adapt",
    description: "Tasks that evolve mid-flight. Boomerang re-routes, re-prioritises, and bounces back without skipping a beat.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Monitor",
    description: "Live task streams and real-time traces so you always know exactly what your agents are doing and why.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Integrate",
    description: "Connect to any tool, API, or browser. Boomerang speaks the language of the web, natively.",
  },
];

const STEPS = [
  { number: "01", label: "Describe your goal", sub: "Plain language. No config files." },
  { number: "02", label: "Agents get to work", sub: "Parallel, autonomous execution." },
  { number: "03", label: "Review & iterate", sub: "Real-time control at every step." },
];

export function BoomerangLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Boomerang logo"
    >
      <path
        d="M8 34 C8 34 6 20 20 14 C34 8 36 20 24 26 C18 29 20 34 20 34"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="20" cy="34" r="2" fill="#111" />
    </svg>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.floor(eased * target));
            if (t < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function LandingPage() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const checkRedirect = (val: string) => {
    if (val.trim().toLowerCase() === "samanyu.goyal2010@gmail.com") {
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (checkRedirect(email)) return;
    setSubmitted(true);
  };

  return (
    <div className="landing-root">
      {/* ─── NAV ─── */}
      <nav className="landing-nav">
        <a href="/" className="landing-brand" aria-label="Boomerang home">
          <BoomerangLogo size={28} />
          <span className="landing-brand-name">Boomerang</span>
        </a>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#how" className="landing-nav-link">How it works</a>
          <a href="#waitlist" className="landing-nav-cta">Get early access</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="landing-hero" id="hero">
        <div className="landing-hero-eyebrow">
          <span className="eyebrow-dot" />
          Autonomous agent platform
        </div>

        <h1 className="landing-hero-title">
          Work that&nbsp;comes
          <br />
          <em className="hero-italic">back to you.</em>
        </h1>

        <p className="landing-hero-sub">
          Boomerang launches AI agents that plan, execute, and adapt — delivering
          results right back in your hands. Set a goal. Walk away. Let it fly.
        </p>

        <div className="landing-hero-actions">
          <a href="#waitlist" className="btn-primary" id="hero-cta">
            Join the waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#how" className="btn-ghost" id="hero-how">
            See how it works
          </a>
        </div>

        {/* floating boomerang graphic */}
        <div className="hero-graphic" aria-hidden="true">
          <div className="hero-boomerang-wrap">
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 180 C40 180 30 100 110 70 C190 40 200 100 130 130 C90 148 100 180 100 180"
                stroke="#111"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="hero-path"
              />
              <circle cx="100" cy="180" r="8" fill="#111" className="hero-dot" />
            </svg>
          </div>
          {/* orbit rings */}
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="landing-stats" id="stats">
        {[
          { value: 3, suffix: "×", label: "faster task completion" },
          { value: 98, suffix: "%", label: "uptime across agents" },
          { value: 40, suffix: "+", label: "integrations out of the box" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES ─── */}
      <section className="landing-features" id="features">
        <div className="section-header">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-title">Everything agents need to fly</h2>
          <p className="section-sub">
            A complete runtime for autonomous work — from spawning to completion.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card ${hoveredFeature === i ? "feature-card--hovered" : ""}`}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              id={`feature-${i}`}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="landing-how" id="how">
        <div className="section-header">
          <p className="section-eyebrow">Process</p>
          <h2 className="section-title">Three steps to done</h2>
        </div>

        <div className="how-steps">
          {STEPS.map((step, i) => (
            <div key={i} className="how-step" id={`step-${i}`}>
              <div className="how-step-inner">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <div className="step-label">{step.label}</div>
                  <div className="step-sub">{step.sub}</div>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="step-connector" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* terminal mockup */}
        <div className="terminal-wrap">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
              <span className="t-title">boomerang session</span>
            </div>
            <div className="terminal-body">
              <p><span className="t-prompt">$</span> boomerang run <span className="t-arg">&quot;Research competitors and draft a comparison report&quot;</span></p>
              <p className="t-muted">↳ Spawning 3 agents&hellip;</p>
              <p className="t-muted">↳ Agent 1: Browsing competitor sites</p>
              <p className="t-muted">↳ Agent 2: Extracting pricing data</p>
              <p className="t-muted">↳ Agent 3: Drafting report structure</p>
              <p className="t-success">✓ Task complete — report.md delivered</p>
              <p className="t-cursor">▊</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <section className="landing-waitlist" id="waitlist">
        <div className="waitlist-inner">
          <div className="waitlist-logo" aria-hidden="true">
            <BoomerangLogo size={48} />
          </div>
          <h2 className="waitlist-title">Be first to fly.</h2>
          <p className="waitlist-sub">
            Boomerang is in private beta. Join the waitlist and we&apos;ll reach out when your spot opens up.
          </p>

          {submitted ? (
            <div className="waitlist-success" id="waitlist-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You&apos;re on the list — we&apos;ll be in touch.
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleWaitlist} id="waitlist-form">
              <input
                id="waitlist-email"
                type="email"
                placeholder="your@email.com"
                className="waitlist-input"
                value={email}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  checkRedirect(val);
                }}
                required
                aria-label="Email address"
              />
              <button type="submit" className="waitlist-btn" id="waitlist-submit">
                Request access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <BoomerangLogo size={20} />
          <span>Boomerang</span>
        </div>
        <p className="footer-copy">© 2026 Boomerang. All rights reserved.</p>
      </footer>
    </div>
  );
}
