import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Send, MapPin } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'krishnayadhu2090@gmail.com',
    href: 'mailto:krishnayadhu2090@gmail.com',
    color: 'var(--cyan)',
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: '+91 7594890581',
    href: 'tel:+917594890581',
    color: 'var(--violet)',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: 'yadhu-krishnan-t-u-90526a226',
    href: 'https://linkedin.com/in/yadhu-krishnan-t-u-90526a226',
    color: 'var(--cyan)',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'Palakkad, Kerala, India',
    href: '#',
    color: 'var(--violet)',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let angle = 0;
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Rings
      [40, 70, 100].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,245,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Cross hairs
      ctx.beginPath();
      ctx.moveTo(cx - 110, cy);
      ctx.lineTo(cx + 110, cy);
      ctx.moveTo(cx, cy - 110);
      ctx.lineTo(cx, cy + 110);
      ctx.strokeStyle = 'rgba(0,245,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweep
      const gradient = ctx.createConicalGradient
        ? null
        : null;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, 100, 0);
      grad.addColorStop(0, 'rgba(0,245,255,0.5)');
      grad.addColorStop(1, 'rgba(0,245,255,0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 100, -0.3, 0.3);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Blips
      const blipPositions = [
        { a: 0.8, r: 55 },
        { a: 2.1, r: 80 },
        { a: 4.5, r: 35 },
      ];
      blipPositions.forEach(b => {
        const diff = ((angle - b.a + Math.PI * 2) % (Math.PI * 2));
        if (diff < 0.8) {
          const alpha = 1 - diff / 0.8;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(b.a) * b.r, cy + Math.sin(b.a) * b.r, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,245,255,${alpha})`;
          ctx.shadowColor = 'var(--cyan)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      angle += 0.025;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'var(--space-2)' }}
    >
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div className="section-tag justify-center mb-4">
            <span>Transmit Signal</span>
          </div>
          <h2 className="section-heading">
            Open{' '}
            <span className="gradient-text-cyan">Comms</span>
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--plasma-dim)',
            }}
          >
            Ready to deploy. Signal received — we make contact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Radar + contact info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            {/* Radar */}
            <div className="flex justify-center mb-10 relative">
              <div className="relative">
                {/* Pulse rings */}
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: 'rgba(0,245,255,0.15)',
                      animation: `radar-pulse ${2 + i}s ease-out infinite`,
                      animationDelay: `${i * 0.7}s`,
                    }}
                  />
                ))}
                <canvas
                  ref={canvasRef}
                  className="rounded-full"
                  style={{
                    border: '1px solid rgba(0,245,255,0.2)',
                    boxShadow: '0 0 30px rgba(0,245,255,0.1)',
                  }}
                />
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              {CONTACT_INFO.map(info => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-xl px-5 py-4 group"
                  style={{
                    border: '1px solid rgba(0,245,255,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = info.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${info.color}20`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${info.color}10`,
                      border: `1px solid ${info.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: info.color,
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-code)',
                        fontSize: '0.58rem',
                        color: info.color,
                        letterSpacing: '0.15em',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {info.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--plasma)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s ease 0.3s',
            }}
          >
            <div
              className="glass rounded-2xl p-8"
              style={{ border: '1px solid rgba(0,245,255,0.12)' }}
            >
              <h3
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--cyan)',
                  letterSpacing: '0.1em',
                }}
              >
                &gt; INITIATE TRANSMISSION
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      color: 'var(--cyan)',
                      textShadow: '0 0 20px var(--cyan)',
                      marginBottom: '1rem',
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: '0.8rem',
                      color: 'var(--cyan)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    SIGNAL TRANSMITTED SUCCESSFULLY
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-code)',
                          fontSize: '0.62rem',
                          color: 'var(--cyan)',
                          letterSpacing: '0.15em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.3)',
                          border: '1px solid rgba(0,245,255,0.15)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          color: 'var(--plasma)',
                          outline: 'none',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                        }}
                        onFocus={e => {
                          (e.target as HTMLElement).style.borderColor = 'var(--cyan)';
                          (e.target as HTMLElement).style.boxShadow = '0 0 10px rgba(0,245,255,0.15)';
                        }}
                        onBlur={e => {
                          (e.target as HTMLElement).style.borderColor = 'rgba(0,245,255,0.15)';
                          (e.target as HTMLElement).style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-code)',
                        fontSize: '0.62rem',
                        color: 'var(--cyan)',
                        letterSpacing: '0.15em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Your message here..."
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(0,245,255,0.15)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--plasma)',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                      onFocus={e => {
                        (e.target as HTMLElement).style.borderColor = 'var(--cyan)';
                        (e.target as HTMLElement).style.boxShadow = '0 0 10px rgba(0,245,255,0.15)';
                      }}
                      onBlur={e => {
                        (e.target as HTMLElement).style.borderColor = 'rgba(0,245,255,0.15)';
                        (e.target as HTMLElement).style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    style={{ clipPath: 'none', borderRadius: '8px' }}
                  >
                    <span className="flex items-center gap-2">
                      {sending ? (
                        <>
                          <div
                            style={{
                              width: '14px',
                              height: '14px',
                              border: '2px solid var(--cyan)',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin-slow 0.8s linear infinite',
                            }}
                          />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          TRANSMIT SIGNAL
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
