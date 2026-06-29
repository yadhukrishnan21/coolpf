import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import photoSrc from '/images/WhatsApp_Image_2026-05-15_at_4.42.40_PM.jpeg';

const ROLES = ['Software Tester', 'Software Engineer', 'QA Architect', 'Bug Hunter'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  baseX: number;
  baseY: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Particle field
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 8000));
    const colors = ['#00f5ff', '#8b00ff', 'rgba(0,245,255,0.4)', 'rgba(139,0,255,0.4)'];
    particlesRef.current = Array.from({ length: count }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.8;
          p.vy += (dy / dist) * force * 0.8;
        }

        // Return to base
        p.vx += (p.baseX - p.x) * 0.005;
        p.vy += (p.baseY - p.y) * 0.005;

        // Damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grd.addColorStop(0, p.color.replace('0.4', '0.15'));
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayRole.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayRole(current.slice(0, displayRole.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayRole.length > 0) {
        timeout = setTimeout(() => {
          setDisplayRole(current.slice(0, displayRole.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex(i => (i + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, roleIndex]);

  // Stagger reveal
  useEffect(() => {
    setTimeout(() => setShowSubtitle(true), 800);
    setTimeout(() => setShowCTA(true), 1400);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--space)' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none circuit-bg"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-20"
        style={{ zIndex: 2 }}
      >
        {/* Left: Text */}
        <div>
          {/* Mission tag */}
          <div className="section-tag mb-6">
            <span>Mission Briefing</span>
          </div>

          {/* Name */}
          <h1
            className="mb-4 animate-slide-up"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: 'var(--plasma)' }}>YADHU</span>
            <br />
            <span className="gradient-text-cyan">KRISHNAN</span>
            <br />
            <span style={{ color: 'var(--plasma)' }}>T U</span>
          </h1>

          {/* Role typewriter */}
          <div
            className="flex items-center gap-2 mb-6 animate-slide-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                fontWeight: 600,
                color: 'var(--cyan)',
                letterSpacing: '0.05em',
                textShadow: '0 0 10px var(--cyan)',
              }}
            >
              {displayRole}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                background: 'var(--cyan)',
                boxShadow: '0 0 6px var(--cyan)',
                animation: 'blink 1s step-end infinite',
              }}
            />
          </div>

          {/* Tagline */}
          {showSubtitle && (
            <div
              className="mb-8 animate-slide-up"
              style={{ animationDelay: '0s' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 600,
                  color: 'var(--plasma)',
                  marginBottom: '0.5rem',
                }}
              >
                "I break things to make them{' '}
                <span style={{ color: 'var(--glitch)', textShadow: '0 0 8px var(--glitch)' }}>
                  unbreakable.
                </span>
                "
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.8rem',
                  color: 'var(--plasma-dim)',
                  letterSpacing: '0.1em',
                }}
              >
                Engineering systems. Testing boundaries.
              </p>
            </div>
          )}

          {/* Stats */}
          {showSubtitle && (
            <div className="flex gap-8 mb-8">
              {[
                { value: '4+', label: 'Projects Built' },
                { value: '1+', label: 'Year Testing' },
                { value: '∞', label: 'Bugs Squashed' },
              ].map(s => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--cyan)',
                      textShadow: '0 0 10px var(--cyan)',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: '0.62rem',
                      color: 'var(--plasma-dim)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          {showCTA && (
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>View Projects</span>
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Transmit Signal</span>
              </button>
            </div>
          )}

          {/* Social links */}
          {showCTA && (
            <div className="flex gap-5">
              {[
                { icon: <Github size={16} />, href: 'https://linkedin.com/in/yadhu-krishnan-t-u-90526a226', label: 'GitHub' },
                { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/yadhu-krishnan-t-u-90526a226', label: 'LinkedIn' },
                { icon: <Mail size={16} />, href: 'mailto:krishnayadhu2090@gmail.com', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(0,245,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--plasma-dim)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--cyan)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--cyan)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px var(--cyan-glow)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--plasma-dim)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.2)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: Holographic photo */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 280, height: 280 }}>
            {/* Outer rotating ring */}
            <div
              className="absolute inset-[-30px] rounded-full border border-dashed animate-spin-slow"
              style={{ borderColor: 'rgba(0,245,255,0.2)' }}
            />
            {/* Inner rotating ring */}
            <div
              className="absolute inset-[-15px] rounded-full border animate-spin-reverse"
              style={{ borderColor: 'rgba(139,0,255,0.3)' }}
            />

            {/* Orbiting tech icons */}
            {['⚙', '🔬', '⚡', '🛡', '🔧', '💻'].map((icon, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '28px',
                  height: '28px',
                  marginTop: '-14px',
                  marginLeft: '-14px',
                  animation: `orbit ${8 + i}s linear infinite`,
                  animationDelay: `${-i * 1.4}s`,
                  transformOrigin: '14px 14px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    background: 'rgba(10,10,20,0.9)',
                    border: '1px solid rgba(0,245,255,0.4)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    boxShadow: '0 0 8px rgba(0,245,255,0.3)',
                  }}
                >
                  {icon}
                </div>
              </div>
            ))}

            {/* Photo container */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden animate-hologram"
              style={{
                border: '2px solid rgba(0,245,255,0.5)',
                boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(139,0,255,0.15), inset 0 0 30px rgba(0,245,255,0.05)',
              }}
            >
              <img
                src={photoSrc}
                alt="Yadhu Krishnan T U"
                className="w-full h-full object-cover object-center"
                style={{ filter: 'saturate(0.9) brightness(0.95)' }}
              />

              {/* Scan line overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.03) 3px, rgba(0,245,255,0.03) 4px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Moving scan line */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  boxShadow: '0 0 8px var(--cyan)',
                  animation: 'scan-v 3s ease-in-out infinite',
                  zIndex: 3,
                }}
              />

              {/* Hologram overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,245,255,0.1) 100%)',
                  zIndex: 1,
                }}
              />
            </div>

            {/* Corner brackets */}
            {[
              { top: -4, left: -4 },
              { top: -4, right: -4 },
              { bottom: -4, left: -4 },
              { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-5 h-5"
                style={{
                  ...pos,
                  border: '2px solid var(--cyan)',
                  borderRadius: '2px',
                  ...(i === 0 ? { borderRight: 'none', borderBottom: 'none' }
                    : i === 1 ? { borderLeft: 'none', borderBottom: 'none' }
                    : i === 2 ? { borderRight: 'none', borderTop: 'none' }
                    : { borderLeft: 'none', borderTop: 'none' }),
                  boxShadow: '0 0 6px var(--cyan)',
                }}
              />
            ))}

            {/* Name badge */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 glass"
              style={{
                borderRadius: '4px',
                border: '1px solid rgba(0,245,255,0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.65rem',
                  color: 'var(--cyan)',
                  letterSpacing: '0.15em',
                }}
              >
                ID: YK_2090 // ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        style={{ zIndex: 2 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.6rem',
            color: 'rgba(0,245,255,0.5)',
            letterSpacing: '0.2em',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <ChevronDown
          size={20}
          style={{ color: 'var(--cyan)', animation: 'float 2s ease-in-out infinite' }}
        />
      </button>
    </section>
  );
}
