"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Intersection Observer hook for scroll reveals
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Reveal wrapper component
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG placeholder for atmospheric images
   (greyscale gradient shapes simulating photo mood)
───────────────────────────────────────────── */
function AtmosBg({ dark = false }: { dark?: boolean }) {
  const bg = dark ? "#1C1C1A" : "#E8E0D0";
  const accent = dark ? "#3D4F3A" : "#C4924A";
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="600" fill={bg} />
      <ellipse cx="200" cy="500" rx="320" ry="200" fill={accent} opacity="0.15" />
      <ellipse cx="650" cy="100" rx="250" ry="180" fill={accent} opacity="0.1" />
      <circle cx="400" cy="280" r="220" fill={dark ? "#2A3828" : "#D9CEB8"} opacity="0.3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Inline SVG mountain ink-wash illustration
───────────────────────────────────────────── */
function InkMountain({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 160 Q80 60 160 90 Q220 110 260 40 Q300 -20 340 70 Q380 130 420 80 Q460 40 500 60 L500 160Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M0 160 Q60 100 120 120 Q180 140 220 80 Q260 30 300 90 Q340 140 380 100 Q420 70 500 90 L500 160Z"
        fill="currentColor"
        opacity="0.08"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Product bottle SVG illustration
───────────────────────────────────────────── */
function ProductBottle({ color = "#C4924A", label = "養" }: { color?: string; label?: string }) {
  return (
    <svg viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cap */}
      <rect x="28" y="10" width="24" height="18" rx="4" fill="#1C1C1A" />
      {/* Neck */}
      <rect x="32" y="26" width="16" height="20" rx="2" fill="#D9CEB8" />
      {/* Body */}
      <rect x="16" y="44" width="48" height="130" rx="8" fill="#F2EDE3" stroke={color} strokeWidth="1.5" />
      {/* Label area */}
      <rect x="20" y="70" width="40" height="80" rx="4" fill={color} opacity="0.15" />
      {/* Chinese character */}
      <text x="40" y="116" textAnchor="middle" fontFamily="serif" fontSize="24" fill={color} fontWeight="300">{label}</text>
      {/* Brand line */}
      <text x="40" y="138" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#897367" letterSpacing="2">HKAHKU</text>
      {/* Thin stripe */}
      <line x1="24" y1="78" x2="56" y2="78" stroke={color} strokeWidth="0.5" opacity="0.6" />
      <line x1="24" y1="148" x2="56" y2="148" stroke={color} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Herb/Ingredient illustration (abstract organic shape)
───────────────────────────────────────────── */
function HerbShape({ index = 0 }: { index?: number }) {
  const shapes = [
    /* Ginseng root */
    <svg key={0} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="60" cy="60" rx="28" ry="42" fill="#8B6F4E" opacity="0.9" />
      <path d="M60 100 Q40 130 35 160" stroke="#6B5235" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 100 Q80 140 82 165" stroke="#6B5235" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 100 Q60 145 58 170" stroke="#7A6040" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="60" cy="55" rx="18" ry="28" fill="#A0845E" opacity="0.4" />
    </svg>,
    /* Reishi mushroom */
    <svg key={1} viewBox="0 0 140 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="70" cy="55" rx="55" ry="35" fill="#8B3A2A" opacity="0.9" />
      <ellipse cx="70" cy="52" rx="42" ry="25" fill="#A84A38" opacity="0.7" />
      <ellipse cx="70" cy="49" rx="28" ry="15" fill="#C4604A" opacity="0.5" />
      <rect x="62" y="85" width="16" height="40" rx="6" fill="#6B4A2A" />
      <ellipse cx="70" cy="56" rx="50" ry="30" stroke="#7A2A1A" strokeWidth="0.5" fill="none" opacity="0.4" />
    </svg>,
    /* Astragalus slices */
    <svg key={2} viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="50" cy="60" rx="35" ry="18" fill="#C4924A" opacity="0.9" transform="rotate(-15 50 60)" />
      <ellipse cx="90" cy="55" rx="35" ry="18" fill="#B87A38" opacity="0.85" transform="rotate(5 90 55)" />
      <ellipse cx="70" cy="75" rx="32" ry="16" fill="#D4A855" opacity="0.8" transform="rotate(-8 70 75)" />
      <ellipse cx="50" cy="60" rx="22" ry="10" fill="#E8C98A" opacity="0.3" transform="rotate(-15 50 60)" />
      <ellipse cx="90" cy="55" rx="22" ry="10" fill="#E8C98A" opacity="0.3" transform="rotate(5 90 55)" />
    </svg>,
    /* Wolfberry */
    <svg key={3} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {[
        [30, 45], [65, 35], [100, 42], [135, 38],
        [45, 75], [80, 68], [115, 72], [60, 98], [95, 95]
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="14" ry="10" fill="#C13B2A" opacity="0.85" />
      ))}
      {[
        [30, 45], [65, 35], [100, 42], [135, 38],
        [45, 75], [80, 68], [115, 72], [60, 98], [95, 95]
      ].map(([cx, cy], i) => (
        <ellipse key={i + 9} cx={cx} cy={cy} rx="7" ry="5" fill="#E05A45" opacity="0.4" />
      ))}
    </svg>,
  ];
  return shapes[index % shapes.length];
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.5s ease, padding 0.4s ease",
        background: scrolled ? "rgba(242,237,227,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(217,206,184,0.5)" : "none",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "22px",
            fontWeight: 400,
            color: scrolled ? "var(--charcoal)" : "var(--ivory)",
            letterSpacing: "0.05em",
          }}
        >
          養
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: scrolled ? "var(--brown-light)" : "rgba(255,255,255,0.7)",
          }}
        >
          HKAHKU
        </span>
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: scrolled ? "var(--brown-light)" : "rgba(255,255,255,0.75)",
        }}
      >
        {["Essence", "Collection", "Formula", "Ritual"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "80px",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div className="hero-zoom" style={{ position: "absolute", inset: 0 }}>
          <AtmosBg dark={true} />
          {/* Atmospheric overlay texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 30% 60%, rgba(42,56,40,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(196,146,74,0.15) 0%, transparent 50%), linear-gradient(180deg, rgba(15,15,14,0.3) 0%, rgba(28,28,26,0.7) 100%)",
            }}
          />
        </div>
      </div>

      {/* Ink mountain illustration */}
      <InkMountain
        className="absolute bottom-0 left-0 right-0 text-amber-200"
        // @ts-expect-error style on svg
        style={{ color: "var(--amber-light)", opacity: 0.15 }}
      />

      {/* Vertical text — Chinese */}
      <div
        style={{
          position: "absolute",
          right: "52px",
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "13px",
          letterSpacing: "0.4em",
          color: "rgba(232,201,138,0.45)",
          fontWeight: 300,
        }}
      >
        東方養生 · 以方養人
      </div>

      {/* Small left label */}
      <div
        style={{
          position: "absolute",
          left: "52px",
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
        }}
      >
        Eastern Wellness · Since 400 Years
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 80px", width: "100%" }}>
        {/* Label */}
        <div
          className="animate-fade-up opacity-0"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.35em",
            color: "var(--amber-light)",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          養精蓄銳 &nbsp;·&nbsp; Nourish &amp; Fortify
        </div>

        {/* Hero headline */}
        <div
          className="animate-fade-up opacity-0 delay-200"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(60px, 9vw, 120px)",
            fontWeight: 300,
            color: "var(--ivory)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          The Ancient
          <br />
          <em style={{ fontStyle: "italic", color: "var(--amber-pale)" }}>Art of</em>
          <br />
          Vitality
        </div>

        {/* Chinese sub-headline */}
        <div
          className="animate-fade-up opacity-0 delay-400"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 300,
            color: "rgba(232,201,138,0.6)",
            marginTop: "12px",
            letterSpacing: "0.12em",
          }}
        >
          養精蓄銳 能量「加油站」
        </div>

        {/* Divider + description */}
        <div
          className="animate-fade-up opacity-0 delay-600"
          style={{
            marginTop: "36px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "var(--amber-light)", opacity: 0.6 }} />
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.05em",
              maxWidth: "400px",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            Rooted in 400 years of classical Chinese medicine.
            <br />
            Refined for the modern spirit.
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up opacity-0 delay-800" style={{ marginTop: "48px" }}>
          <button
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              background: "var(--amber-light)",
              border: "none",
              padding: "16px 40px",
              cursor: "pointer",
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--amber-pale)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--amber-light)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Collection
          </button>
          <button
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 40px",
              cursor: "pointer",
              marginLeft: "16px",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in opacity-0 delay-800"
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PHILOSOPHY / MA-STYLE SECTION
───────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section
      id="essence"
      style={{
        background: "var(--ivory)",
        padding: "140px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}
    >
      {/* Left — large Chinese character */}
      <Reveal>
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "clamp(160px, 20vw, 240px)",
              fontWeight: 300,
              color: "var(--cream-deep)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            養
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "8px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--sage)",
            }}
          >
            Yǎng · To Nourish
          </div>
        </div>
      </Reveal>

      {/* Right — philosophy text */}
      <div>
        <Reveal delay={100}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "28px",
            }}
          >
            Our Philosophy
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 300,
              color: "var(--charcoal)",
              lineHeight: 1.2,
              marginBottom: "32px",
            }}
          >
            养 is the space
            <br />
            that <em style={{ fontStyle: "italic", color: "var(--amber)" }}>restores</em> us.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "17px",
              color: "var(--brown-light)",
              lineHeight: 1.85,
              marginBottom: "24px",
              maxWidth: "420px",
            }}
          >
            养 IS THE NOURISHMENT THAT STAYS WITH US. A QUIET PRESENCE BETWEEN
            WORK, REST AND PURPOSE.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "17px",
              color: "var(--brown-light)",
              lineHeight: 1.85,
              marginBottom: "24px",
              maxWidth: "420px",
              fontStyle: "italic",
            }}
          >
            Inspired by the classical concept of 養生 — nourishing life — each
            formula is created to replenish from within.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "17px",
              color: "var(--brown-light)",
              lineHeight: 1.85,
              maxWidth: "420px",
            }}
          >
            Not to treat.
            <br />
            But to sustain.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--parchment)" }} />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--sage)",
              }}
            >
              配方源自400年前 · Formula from 400 years ago
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   THREE ATMOSPHERES / COLLECTION
───────────────────────────────────────────── */
function CollectionSection() {
  const products = [
    {
      char: "精",
      name: "JING",
      sub: "essence / focus / clarity",
      desc: "Restore depleted reserves. Ginseng, Astragalus, Deer Antler Velvet.",
      color: "#C4924A",
    },
    {
      char: "氣",
      name: "QI",
      sub: "energy / flow / warmth",
      desc: "Invigorate vital energy. Reishi, Cordyceps, Schisandra Berry.",
      color: "#5C8C5C",
    },
    {
      char: "神",
      name: "SHEN",
      sub: "spirit / calm / sleep",
      desc: "Quieten the restless mind. Polygala, Ziziphus, Longan Fruit.",
      color: "#5A6A8A",
    },
  ];

  return (
    <section
      id="collection"
      style={{
        background: "var(--cream)",
        padding: "140px 80px",
      }}
    >
      {/* Header */}
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "20px",
            }}
          >
            Three Essences
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(44px, 5vw, 64px)",
              fontWeight: 300,
              color: "var(--charcoal)",
              lineHeight: 1.1,
            }}
          >
            精 · 氣 · 神
          </h2>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "16px",
              color: "var(--sage)",
              marginTop: "16px",
              fontStyle: "italic",
              letterSpacing: "0.05em",
            }}
          >
            The three pillars of Chinese wellness tradition
          </p>
        </div>
      </Reveal>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px",
          alignItems: "end",
        }}
      >
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 150}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "40px 24px",
              }}
              onMouseEnter={(e) => {
                const bottle = e.currentTarget.querySelector(".product-bottle") as HTMLElement;
                if (bottle) bottle.style.transform = "translateY(-16px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const bottle = e.currentTarget.querySelector(".product-bottle") as HTMLElement;
                if (bottle) bottle.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* Product image area */}
              <div
                className="product-bottle"
                style={{
                  width: "90px",
                  height: "220px",
                  marginBottom: "40px",
                  transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))",
                }}
              >
                <ProductBottle color={p.color} label={p.char} />
              </div>

              {/* Product info */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: "var(--sage)",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {p.sub}
              </div>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: "var(--charcoal)",
                  marginBottom: "12px",
                  letterSpacing: "0.15em",
                }}
              >
                {p.name}
              </div>

              <p
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "15px",
                  color: "var(--brown-light)",
                  textAlign: "center",
                  lineHeight: 1.7,
                  maxWidth: "200px",
                  fontStyle: "italic",
                }}
              >
                {p.desc}
              </p>

              {/* Underline */}
              <div
                style={{
                  marginTop: "24px",
                  width: "32px",
                  height: "1px",
                  background: p.color,
                  opacity: 0.6,
                }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FORMULA / INGREDIENTS — dark forest section
───────────────────────────────────────────── */
function FormulaSection() {
  const herbs = [
    { name: "人參", roman: "Ginseng", role: "清 —", action: "Clears & Detoxifies", note: "Panax Ginseng Root 1.5g", index: 0 },
    { name: "靈芝", roman: "Reishi", role: "補 +", action: "Tonifies & Nourishes", note: "Ganoderma Lucidum 1.5g", index: 1 },
    { name: "黃精", roman: "Astragalus", role: "抗 ×", action: "Adaptogenic Shield", note: "Polygonatum Sibiricum 1.5g", index: 2 },
    { name: "枸杞", roman: "Wolfberry", role: "養 ·", action: "Essence Replenishment", note: "Lycium Barbarum 2.0g", index: 3 },
  ];

  return (
    <section
      id="formula"
      style={{
        background: "var(--forest)",
        padding: "140px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 80% 50%, rgba(196,146,74,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Reveal>
        <div style={{ marginBottom: "100px" }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "20px",
            }}
          >
            方解 · Formula Analysis
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "32px", flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(44px, 5vw, 72px)",
                fontWeight: 300,
                color: "var(--ivory)",
                lineHeight: 1.0,
              }}
            >
              6味草本加乘
              <br />
              <em style={{ fontStyle: "italic", color: "var(--amber-light)", fontSize: "0.7em" }}>
                6 herbs, warm inside &amp; nourish outside
              </em>
            </h2>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.3)",
                maxWidth: "240px",
                lineHeight: 2,
              }}
            >
              尊重人身內在節奏與需求
              <br />
              守護 1+1&gt;1 的複方邏輯
            </div>
          </div>
        </div>
      </Reveal>

      {/* Herbs grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2px",
        }}
      >
        {herbs.map((herb, i) => (
          <Reveal key={herb.roman} delay={i * 100}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px",
                gap: "40px",
                alignItems: "center",
                padding: "56px 48px",
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Text side */}
              <div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--amber-light)",
                    marginBottom: "12px",
                  }}
                >
                  {herb.role} &nbsp; {herb.action}
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: "52px",
                    fontWeight: 300,
                    color: "var(--ivory)",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {herb.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "16px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {herb.roman}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  {herb.note}
                </div>
              </div>

              {/* Herb illustration */}
              <div
                className="animate-float"
                style={{ width: "120px", height: "120px" }}
              >
                <HerbShape index={herb.index} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Stats row */}
      <Reveal delay={200}>
        <div
          style={{
            marginTop: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "60px",
          }}
        >
          {[
            { num: "0", label: "六大無添加", sub: "Zero artificial additives" },
            { num: "1.5g", label: "人參含量", sub: "Per serving, guaranteed" },
            { num: "400+", label: "年配方傳承", sub: "Years of formulation heritage" },
            { num: "12×", label: "倍濃縮萃取", sub: "Concentrated extraction" },
          ].map((stat) => (
            <div key={stat.num} style={{ padding: "0 24px" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "48px",
                  fontWeight: 300,
                  color: "var(--amber-light)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "14px",
                  color: "var(--ivory)",
                  marginBottom: "6px",
                  fontWeight: 300,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RITUAL SECTION — cream with floating product
───────────────────────────────────────────── */
function RitualSection() {
  return (
    <section
      id="ritual"
      style={{
        background: "var(--cream-deep)",
        padding: "140px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "100px",
        alignItems: "center",
      }}
    >
      {/* Left — ritual steps */}
      <div>
        <Reveal>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "20px",
            }}
          >
            方用 · Daily Ritual
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 300,
              color: "var(--charcoal)",
              lineHeight: 1.2,
              marginBottom: "48px",
            }}
          >
            開袋即飲
            <br />
            <em style={{ fontStyle: "italic", color: "var(--amber)" }}>
              Convenient Nourishment
            </em>
          </h2>
        </Reveal>

        {[
          { step: "01", cn: "晨間", en: "Morning", desc: "Take 1 sachet on an empty stomach, 30 min before breakfast. Stir into warm water." },
          { step: "02", cn: "午後", en: "Afternoon", desc: "Optional second sachet between meals for sustained afternoon energy." },
          { step: "03", cn: "夜間", en: "Evening", desc: "For Shen formula: take 1 sachet 1 hour before sleep with warm water." },
        ].map((item, i) => (
          <Reveal key={item.step} delay={200 + i * 100}>
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginBottom: "36px",
                paddingBottom: "36px",
                borderBottom: i < 2 ? "1px solid rgba(217,206,184,0.6)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: "var(--amber)",
                  letterSpacing: "0.1em",
                  paddingTop: "4px",
                  minWidth: "28px",
                }}
              >
                {item.step}
              </div>
              <div>
                <div style={{ display: "flex", gap: "10px", alignItems: "baseline", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "var(--charcoal)",
                    }}
                  >
                    {item.cn}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "var(--sage)",
                    }}
                  >
                    {item.en}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "16px",
                    color: "var(--brown-light)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Right — product floating */}
      <Reveal delay={300}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Main product */}
          <div
            className="animate-float"
            style={{
              width: "120px",
              height: "300px",
              filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.15))",
            }}
          >
            <ProductBottle color="#C4924A" label="精" />
          </div>

          {/* Details card */}
          <div
            style={{
              background: "var(--ivory)",
              padding: "32px",
              width: "100%",
              maxWidth: "340px",
              borderLeft: "2px solid var(--amber-light)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.3em",
                color: "var(--sage)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              Usage Notes
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                fontFamily: "'EB Garamond', Georgia, serif",
              }}
            >
              {[
                { label: "每天用量", val: "1–2 sachets" },
                { label: "規格", val: "3g × 30 sachets" },
                { label: "保存方式", val: "Cool & dry" },
                { label: "適用人群", val: "Adults 18+" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: "11px", color: "var(--sage)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginBottom: "3px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "15px", color: "var(--charcoal)", fontStyle: "italic" }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GALLERY / MOOD BOARD — dark navy
───────────────────────────────────────────── */
function GallerySection() {
  const moods = [
    { label: "方材", cn: "原料產地", bg: "#2A3828", accent: "#C4924A" },
    { label: "萃取", cn: "十二倍濃縮", bg: "#1A2235", accent: "#5A6A8A" },
    { label: "方萃", cn: "清晨第一杯", bg: "#3D2A1A", accent: "#C4924A" },
    { label: "養生", cn: "簡約日常", bg: "#1C2A1A", accent: "#5C8C5C" },
    { label: "自然", cn: "天然來源", bg: "#2A2010", accent: "#D4A855" },
    { label: "精純", cn: "零添加配方", bg: "#1A1C2A", accent: "#8A6AAA" },
  ];

  return (
    <section
      style={{
        background: "var(--charcoal)",
        padding: "0",
      }}
    >
      {/* Top label */}
      <Reveal>
        <div
          style={{
            padding: "80px 80px 60px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.15)" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Designed to Stay Close
          </span>
        </div>
      </Reveal>

      {/* Masonry-style grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "280px 180px",
          gap: "2px",
        }}
      >
        {moods.map((mood, i) => (
          <Reveal key={mood.label} delay={i * 80}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector(".mood-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector(".mood-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              {/* Background SVG */}
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 400 300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="400" height="300" fill={mood.bg} />
                <circle cx="200" cy="150" r="200" fill={mood.accent} opacity="0.07" />
                <circle cx={i % 2 === 0 ? "300" : "100"} cy={i < 3 ? "80" : "220"} r="120" fill={mood.accent} opacity="0.05" />
              </svg>

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: "32px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {mood.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: mood.accent,
                    opacity: 0.8,
                  }}
                >
                  {mood.cn}
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="mood-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `${mood.accent}22`,
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL / QUOTE SECTION
───────────────────────────────────────────── */
function QuoteSection() {
  return (
    <section
      style={{
        background: "var(--navy)",
        padding: "140px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(196,146,74,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Large background character */}
      <div
        style={{
          position: "absolute",
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "400px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.02)",
          userSelect: "none",
          lineHeight: 1,
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        養
      </div>

      <Reveal>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--amber)",
            marginBottom: "48px",
          }}
        >
          方適 · For Those Who Know
        </div>
      </Reveal>

      <Reveal delay={150}>
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--ivory)",
            lineHeight: 1.5,
            maxWidth: "760px",
            marginBottom: "40px",
          }}
        >
          &ldquo;有時候，身外之物才是找到自己的開始&rdquo;
        </blockquote>
      </Reveal>

      <Reveal delay={250}>
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "16px",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "60px",
          }}
        >
          Sometimes, things outside ourselves are the beginning of finding ourselves
        </p>
      </Reveal>

      <Reveal delay={350}>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { cn: "放鬆頭腦", en: "Clear the mind", num: "①" },
            { cn: "平復心情", en: "Calm the spirit", num: "②" },
          ].map((item) => (
            <div key={item.en} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "28px",
                  fontWeight: 300,
                  color: "var(--amber-light)",
                  lineHeight: 1,
                }}
              >
                {item.num}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: "16px",
                    color: "var(--ivory)",
                    fontWeight: 300,
                    marginBottom: "4px",
                  }}
                >
                  {item.cn}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {item.en}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        padding: "80px 80px 48px",
        color: "rgba(255,255,255,0.25)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "60px",
          marginBottom: "80px",
          paddingBottom: "60px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" }}>
            <span
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: "28px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              養
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              HKAHKU
            </span>
          </div>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.8,
              maxWidth: "280px",
            }}
          >
            Premium Traditional Chinese Wellness. Crafted from 400-year-old formulas. Rooted in nature, refined by time.
          </p>
        </div>

        {/* Links */}
        {[
          { title: "Collection", items: ["Jing · 精", "Qi · 氣", "Shen · 神", "Gift Sets"] },
          { title: "Discover", items: ["Our Story", "Formula", "Ingredients", "Ritual Guide"] },
          { title: "Connect", items: ["Instagram", "WeChat", "小紅書", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--amber)",
                marginBottom: "20px",
              }}
            >
              {col.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.15em" }}>
          © 2024 HKAHKU · 養精蓄銳 · All rights reserved
        </span>
        <span
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "12px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.3em",
          }}
        >
          東方養生 · 以方養人
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PhilosophySection />
        <CollectionSection />
        <FormulaSection />
        <RitualSection />
        <GallerySection />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
