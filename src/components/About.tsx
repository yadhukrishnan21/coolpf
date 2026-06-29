import { useEffect, useRef, useState } from 'react';
import { Bug, Cpu, Shield, Zap, Code, TestTube } from 'lucide-react';

const TESTER_STATS = [
  { label: 'Test Cases Designed', value: '500+', icon: <TestTube size={16} /> },
  { label: 'Defects Logged', value: '200+', icon: <Bug size={16} /> },
  { label: 'Testing Methodologies', value: '6', icon: <Shield size={16} /> },
  { label: 'STLC Coverage', value: '100%', icon: <Zap size={16} /> },
];

const ENGINEER_STATS = [
  { label: 'Projects Built', value: '4+', icon: <Code size={16} /> },
  { label: 'Tech Stack', value: 'Full-Stack', icon: <Cpu size={16} /> },
  { label: 'AI Integration', value: 'LLM/NLP', icon: <Zap size={16} /> },
  { label: 'APIs Built', value: 'REST', icon: <Shield size={16} /> },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'tester' | 'engineer'>('tester');
  const [flipping, setFlipping] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMode = () => {
    setFlipping(true);
    setTimeout(() => {
      setMode(m => m === 'tester' ? 'engineer' : 'tester');
      setFlipping(false);
    }, 300);
  };

  const stats = mode === 'tester' ? TESTER_STATS : ENGINEER_STATS;
  const isTester = mode === 'tester';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'var(--space-2)' }}
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />

      {/* Diagonal separator top */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom right, var(--space) 50%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-tag justify-center mb-4">
            <span>The Core</span>
          </div>
          <h2 className="section-heading">
            Dual Identity.{' '}
            <span className="gradient-text-cyan">One Mission.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--plasma-dim)',
              lineHeight: 1.8,
            }}
          >
            Computer Science engineer with a rare superpower: I think like a destroyer AND a creator simultaneously.
            While others pick a side, I live at the intersection — where quality and engineering converge.
          </p>
        </div>

        {/* Mode Toggle */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="relative flex glass rounded-full p-1"
            style={{ border: '1px solid rgba(0,245,255,0.15)' }}
          >
            <div
              className="absolute top-1 bottom-1 rounded-full transition-all duration-300"
              style={{
                width: 'calc(50% - 4px)',
                left: isTester ? '4px' : 'calc(50%)',
                background: isTester
                  ? 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,245,255,0.08))'
                  : 'linear-gradient(135deg, rgba(139,0,255,0.2), rgba(139,0,255,0.08))',
                border: isTester ? '1px solid var(--cyan)' : '1px solid var(--violet)',
                boxShadow: isTester ? '0 0 12px var(--cyan-glow)' : '0 0 12px var(--violet-glow)',
              }}
            />
            {['tester', 'engineer'].map(m => (
              <button
                key={m}
                onClick={toggleMode}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.6rem 1.8rem',
                  position: 'relative',
                  zIndex: 1,
                  color: mode === m
                    ? m === 'tester' ? 'var(--cyan)' : 'var(--violet)'
                    : 'var(--plasma-dim)',
                  transition: 'color 0.3s',
                  minWidth: '120px',
                }}
              >
                {m === 'tester' ? '🔬 Tester' : '⚙ Engineer'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Split */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: Identity card */}
          <div
            className="glass rounded-2xl p-8 relative overflow-hidden"
            style={{
              border: `1px solid ${isTester ? 'rgba(0,245,255,0.2)' : 'rgba(139,0,255,0.2)'}`,
              boxShadow: isTester
                ? '0 0 30px rgba(0,245,255,0.05)'
                : '0 0 30px rgba(139,0,255,0.05)',
              transition: 'all 0.5s ease',
              transform: flipping ? 'rotateY(90deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Mode badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: isTester ? 'rgba(0,245,255,0.1)' : 'rgba(139,0,255,0.1)',
                border: `1px solid ${isTester ? 'var(--cyan)' : 'var(--violet)'}`,
                fontFamily: 'var(--font-code)',
                fontSize: '0.65rem',
                color: isTester ? 'var(--cyan)' : 'var(--violet)',
                letterSpacing: '0.15em',
              }}
            >
              <span>{isTester ? '◉' : '◈'}</span>
              <span>{isTester ? 'TESTER MODE' : 'ENGINEER MODE'}</span>
            </div>

            <h3
              className="mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: isTester ? 'var(--cyan)' : 'var(--violet)',
                textShadow: isTester ? '0 0 10px var(--cyan)' : '0 0 10px var(--violet)',
              }}
            >
              {isTester ? 'The Bug Hunter' : 'The Architect'}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--plasma-dim)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              {isTester
                ? "With a forensic eye for detail and a relentless pursuit of edge cases, I dissect software from the inside out. I execute manual and functional tests, trace defects across the STLC, and ensure nothing ships until it's truly battle-ready."
                : "Armed with Python, JavaScript, and full-stack intuition, I build systems that don't just work — they scale. From AI-powered legal assistants to location-based platforms, I architect software for the real world."}
            </p>

            {/* Skills list */}
            <div className="flex flex-wrap gap-2">
              {(isTester
                ? ['Manual Testing', 'API Testing', 'STLC', 'Postman', 'Jira', 'JMeter', 'Regression', 'Defect Tracking']
                : ['Python', 'JavaScript', 'SQL', 'REST APIs', 'Full-Stack', 'Generative AI', 'Web Apps']
              ).map(skill => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.65rem',
                    padding: '0.3rem 0.75rem',
                    background: isTester ? 'rgba(0,245,255,0.06)' : 'rgba(139,0,255,0.06)',
                    border: `1px solid ${isTester ? 'rgba(0,245,255,0.2)' : 'rgba(139,0,255,0.2)'}`,
                    borderRadius: '4px',
                    color: isTester ? 'rgba(0,245,255,0.8)' : 'rgba(139,0,255,0.9)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Decorative corner */}
            <div
              className="absolute top-4 right-4 w-12 h-12 opacity-20"
              style={{
                background: `radial-gradient(circle, ${isTester ? 'var(--cyan)' : 'var(--violet)'}, transparent)`,
                borderRadius: '50%',
                filter: 'blur(8px)',
              }}
            />
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-5 flex flex-col gap-2 group cursor-default"
                style={{
                  border: `1px solid ${isTester ? 'rgba(0,245,255,0.1)' : 'rgba(139,0,255,0.1)'}`,
                  transition: 'all 0.3s ease',
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = isTester ? 'rgba(0,245,255,0.4)' : 'rgba(139,0,255,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow = isTester ? '0 0 20px rgba(0,245,255,0.1)' : '0 0 20px rgba(139,0,255,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = isTester ? 'rgba(0,245,255,0.1)' : 'rgba(139,0,255,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ color: isTester ? 'var(--cyan)' : 'var(--violet)' }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: isTester ? 'var(--cyan)' : 'var(--violet)',
                    textShadow: isTester ? '0 0 8px var(--cyan)' : '0 0 8px var(--violet)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.62rem',
                    color: 'var(--plasma-dim)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Personal info */}
        <div
          className={`mt-12 glass rounded-2xl p-8 grid md:grid-cols-3 gap-8 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {[
            {
              label: 'Location',
              value: 'Palakkad, Kerala',
              icon: '📍',
            },
            {
              label: 'Education',
              value: 'B.Tech CSE @ MCET Malabar',
              icon: '🎓',
            },
            {
              label: 'Languages',
              value: 'English · Malayalam · Tamil',
              icon: '🌐',
            },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.6rem',
                    color: 'var(--cyan)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--plasma)',
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
