import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const SOCIALS = [
  { icon: <Github size={16} />, href: 'https://linkedin.com/in/yadhu-krishnan-t-u-90526a226', label: 'GitHub' },
  { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/yadhu-krishnan-t-u-90526a226', label: 'LinkedIn' },
  { icon: <Mail size={16} />, href: 'mailto:krishnayadhu2090@gmail.com', label: 'Email' },
  { icon: <Phone size={16} />, href: 'tel:+917594890581', label: 'Phone' },
];

export default function Footer() {
  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: 'var(--space)',
        borderColor: 'rgba(0,245,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--cyan)',
                textShadow: '0 0 10px var(--cyan)',
                letterSpacing: '0.1em',
                marginBottom: '0.25rem',
              }}
            >
              YADHU KRISHNAN T U
            </div>
            <div
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.62rem',
                color: 'var(--plasma-dim)',
                letterSpacing: '0.15em',
              }}
            >
              Software Engineer & QA Expert · Antigravity Platform
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: '38px',
                  height: '38px',
                  border: '1px solid rgba(0,245,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--plasma-dim)',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--cyan)';
                  el.style.borderColor = 'var(--cyan)';
                  el.style.boxShadow = '0 0 15px var(--cyan-glow)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--plasma-dim)';
                  el.style.borderColor = 'rgba(0,245,255,0.15)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.6rem',
              color: 'rgba(240,248,255,0.3)',
              letterSpacing: '0.1em',
              textAlign: 'right',
            }}
          >
            <div>© 2026 Yadhu Krishnan T U</div>
            <div style={{ marginTop: '0.2rem', color: 'rgba(0,245,255,0.3)' }}>
              Built with precision. Tested to perfection.
            </div>
          </div>
        </div>

        {/* Easter egg hint */}
        <div
          className="text-center mt-8"
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.55rem',
            color: 'rgba(0,245,255,0.15)',
            letterSpacing: '0.1em',
          }}
        >
          // try the konami code for a surprise ↑↑↓↓←→←→BA
        </div>
      </div>
    </footer>
  );
}
