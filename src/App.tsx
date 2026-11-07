import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  AudiLogo,
  BMWLogo,
  FordLogo,
  HondaLogo,
  HyundaiLogo,
  LandroverLogo,
  LexusLogo,
  MBLogo,
  PorscheLogo,
  ToyotaLogo,
} from "@cardog-icons/react";

type BrandLogo = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

const services = [
  {
    name: "Installation",
    tags: ["Fitment", "OEM+"],
    desc: "Precision fitment for lights, kits, and modules — done right the first time.",
    image: "/installation.jpeg",
    focus: "center 62%",
  },
  {
    name: "Interior Upgrade",
    tags: ["Trim", "Audio, lighting"],
    desc: "Cabin refresh with trim, lighting, and audio that feels factory-correct.",
    image: "/interior.jpeg",
    focus: "center 40%",
  },
  {
    name: "Exterior Upgrade",
    tags: ["Body", "Stance, presence"],
    desc: "Stance and presence — from fenders and lips to full visual builds.",
    image: "/exterior.jpeg",
    focus: "center 48%",
  },
];

const parts = [
  {
    name: "Headlights",
    note: "Digital projectors & signature DRLs",
    image: "/headlight.jpeg",
    focus: "center 42%",
  },
  {
    name: "Taillights",
    note: "Sequential & smoked finishes",
    image: "/tailight.jpeg",
    focus: "center 48%",
  },
  {
    name: "Fenders",
    note: "Carbon aero & widebody kits",
    image: "/fender.jpeg",
    focus: "center 28%",
  },
  {
    name: "Rims",
    note: "Forged & flow-formed sets",
    image: "/rims.jpeg",
    focus: "center 55%",
  },
];

const brands: { name: string; Logo: BrandLogo }[] = [
  { name: "Mercedes", Logo: MBLogo },
  { name: "Range Rover", Logo: LandroverLogo },
  { name: "BMW", Logo: BMWLogo },
  { name: "Audi", Logo: AudiLogo },
  { name: "Lexus", Logo: LexusLogo },
  { name: "Ford", Logo: FordLogo },
  { name: "Porsche", Logo: PorscheLogo },
  { name: "Honda", Logo: HondaLogo },
  { name: "Toyota", Logo: ToyotaLogo },
  { name: "Hyundai", Logo: HyundaiLogo },
];

function Reveal({
  className = "",
  style,
  children,
  as: Tag = "div",
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  const navItems = [
    { href: "#parts", label: "Parts", external: true },
    { href: "#services", label: "Services" },
    { href: "#brands", label: "Brands" },
    { href: "#contact", label: "Install" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="site">
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </div>

      <main>
        <section className="hero-wrap" id="top">
          <div className="hero">
            <div className="hero-media" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2200&q=80"
                alt=""
                width={2200}
                height={1400}
              />
            </div>

            <header className="hero-top">
              <a href="#top" className="hero-brand">
                Specing Plug
              </a>
              <div className="hero-top-actions">
                <a className="hero-contact" href="#contact">
                  Contact Us
                </a>
                <button
                  className={`nav-toggle${menuOpen ? " open" : ""}`}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </header>

            <nav className="hero-side-nav" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                  {item.external && (
                    <svg className="nav-arrow" viewBox="0 0 12 12" aria-hidden="true">
                      <path
                        d="M3 9L9 3M9 3H4.5M9 3V7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>
              ))}
            </nav>

            <div className="hero-bottom">
              <h1 className="hero-headline">
                Specing Plug — upgrades that look built, not bolted.
              </h1>
              <div className="hero-actions">
                <a className="btn-hero btn-hero-ghost" href="#parts">
                  Explore Parts
                  <span className="btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <a className="btn-hero btn-hero-solid" href="#contact">
                  Book an Install
                  <span className="btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </section>

        <section className="brand-bar" id="brands" aria-label="Supported car brands">
          <div className="brand-bar-track">
            {[...brands, ...brands].map(({ name, Logo }, i) => (
              <div className="brand-bar-item" key={`${name}-${i}`}>
                <Logo size={56} aria-hidden="true" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section services" id="services">
          <Reveal>
            <p className="section-label">What we do</p>
            <h2 className="section-title">Full-spectrum car upgrades</h2>
            <p className="section-lead">
              From first consult to final torque — Specing Plug handles the install and the look.
            </p>
          </Reveal>
          <div className="service-grid">
            {services.map((s, i) => (
              <Reveal
                as="article"
                key={s.name}
                className="service-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="service-card-media">
                  <img
                    src={s.image}
                    alt=""
                    width={735}
                    height={640}
                    loading="lazy"
                    style={{ objectPosition: s.focus }}
                  />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{s.name}</h3>
                  <ul className="service-tags">
                    {s.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="service-card-desc">{s.desc}</p>
                  <a className="service-card-cta" href="#contact">
                    Book
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section parts" id="parts">
          <div className="parts-header">
            <Reveal>
              <p className="section-label">Parts catalog</p>
              <h2 className="section-title">Gear that changes the stance</h2>
              <p className="section-lead">
                Headlights, taillights, fenders, rims, and more — sourced and fitted for your platform.
              </p>
            </Reveal>
            <a className="parts-header-cta" href="#contact">
              Request parts
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="parts-grid">
            {parts.map((part, i) => (
              <Reveal
                key={part.name}
                className="part"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <a className="part-link" href="#contact" aria-label={`Inquire about ${part.name}`}>
                  <img
                    src={part.image}
                    alt=""
                    width={736}
                    height={960}
                    loading="lazy"
                    style={{ objectPosition: part.focus }}
                  />
                  <div className="part-meta">
                    <span className="part-index">0{i + 1}</span>
                    <h3 className="part-name">{part.name}</h3>
                    <p className="part-note">{part.note}</p>
                    <span className="part-action">
                      Inquire
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=80"
              alt=""
              width={2200}
              height={1400}
              loading="lazy"
            />
          </div>
          <div className="contact-inner">
            <Reveal>
              <p className="section-label">Book with us</p>
              <h2 className="section-title">Plug in your next upgrade</h2>
              <p className="section-lead">
                Tell us the vehicle and the look you want. We’ll map parts, install time, and a clear quote.
              </p>
            </Reveal>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Email" required />
              <select name="interest" required defaultValue="">
                <option value="" disabled>
                  What do you need?
                </option>
                <option value="installation">Installation</option>
                <option value="interior">Interior upgrade</option>
                <option value="exterior">Exterior upgrade</option>
                <option value="parts">Parts only</option>
              </select>
              <textarea name="message" placeholder="Vehicle make, model, year & notes" required />
              <button type="submit" className="btn btn-primary">
                Request a quote
              </button>
              {sent && (
                <p className="form-success" role="status">
                  Got it — we’ll be in touch shortly.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a href="#top" className="footer-brand">
              Specing Plug
            </a>
            <p className="footer-tagline">
              Installation, interior & exterior upgrades, and parts — fitted for your platform.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <p className="footer-heading">Explore</p>
            <a href="#services">Services</a>
            <a href="#parts">Parts</a>
            <a href="#brands">Brands</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-contact">
            <p className="footer-heading">Get in touch</p>
            <a href="mailto:hello@specingplug.com">hello@specingplug.com</a>
            <a href="tel:+233000000000">+233 00 000 0000</a>
            <p className="footer-hours">Mon–Sat · 9am–6pm</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Specing Plug. All rights reserved.</p>
          <p className="footer-services">Installation · Interior · Exterior · Parts</p>
        </div>
      </footer>
    </div>
  );
}
