import { useEffect, useRef, useState } from 'react';

const TESTING_SKILLS = [
  { name: 'Manual Testing', level: 90 },
  { name: 'API Testing', level: 85 },
  { name: 'STLC', level: 88 },
  { name: 'Regression Testing', level: 82 },
  { name: 'Functional Testing', level: 87 },
  { name: 'Test Case Design', level: 90 },
  { name: 'Defect Tracking', level: 85 },
  { name: 'Postman', level: 88 },
  { name: 'Jira', level: 80 },
  { name: 'JMeter', level: 75 },
];

const ENGINEERING_SKILLS = [
  { name: 'Python', level: 85 },
  { name: 'JavaScript', level: 82 },
  { name: 'SQL', level: 80 },
  { name: 'HTML/CSS', level: 88 },
  { name: 'REST APIs', level: 80 },
  { name: 'Full-Stack Dev', level: 75 },
  { name: 'Generative AI', level: 72 },
  { name: 'Git', level: 80 },
  { name: 'Web Apps', level: 82 },
];

interface HexProps {
  name: string;
  level: number;
  color: string;
  glowColor: string;
  delay: number;
  visible: boolean;
}

function Hexagon({ name, level, color, glowColor, delay, visible }: HexProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="hexagon"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 90 104" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="45,2 88,26 88,78 45,102 2,78 2,26"
          fill={hovered ? `${color}20` : 'rgba(10,10,20,0.8)'}
          stroke={color}
          strokeWidth={hovered ? '1.5' : '1'}
          style={{
            filter: hovered ? `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 16px ${glowColor})` : 'none',
            transition: 'all 0.3s ease',
          }}
        />
        {/* Level arc */}
        <circle
          cx="45"
          cy="52"
          r="18"
          fill="none"
          stroke={`${color}30`}
          strokeWidth="2"
        />
        <circle
          cx="45"
          cy="52"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={`${(level / 100) * 113} 113`}
          strokeLinecap="round"
          transform="rotate(-90 45 52)"
          style={{
            filter: hovered ? `drop-shadow(0 0 4px ${glowColor})` : 'none',
            transition: 'stroke-dasharray 1s ease',
          }}
        />
      </svg>
      <div className="hex-content" style={{ color, fontFamily: 'var(--font-code)' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '2px' }}>{level}%</div>
        <div style={{ fontSize: '0.5rem', lineHeight: 1.2, color: hovered ? color : 'rgba(240,248,255,0.7)' }}>
          {name}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setBooted(true), 200);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'var(--space)' }}
    >
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

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
            <span>The Matrix</span>
          </div>
          <h2 className="section-heading">
            Skill{' '}
            <span className="gradient-text-cyan">Arsenal</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              color: 'rgba(0,245,255,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            &gt; LOADING CAPABILITY MATRIX... {booted ? 'COMPLETE' : 'PROCESSING...'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Testing column */}
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.6s ease 0.2s',
              }}
            >
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, var(--cyan), transparent)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--cyan)',
                  letterSpacing: '0.2em',
                  textShadow: '0 0 10px var(--cyan)',
                }}
              >
                TESTER ARSENAL
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to left, var(--cyan), transparent)' }}
              />
            </div>

            <div className="hex-wrapper">
              {TESTING_SKILLS.map((skill, i) => (
                <Hexagon
                  key={skill.name}
                  {...skill}
                  color="var(--cyan)"
                  glowColor="rgba(0,245,255,0.6)"
                  delay={booted ? i * 60 : 9999}
                  visible={booted}
                />
              ))}
            </div>

            {/* Progress bars */}
            <div className="mt-10 space-y-3">
              {TESTING_SKILLS.slice(0, 4).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--plasma-dim)' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--cyan)' }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="neon-progress-track">
                    <div
                      className="neon-progress-fill"
                      style={{
                        width: booted ? `${skill.level}%` : '0%',
                        transitionDelay: `${i * 150 + 300}ms`,
                        background: 'linear-gradient(90deg, var(--cyan), rgba(0,245,255,0.4))',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering column */}
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.6s ease 0.2s',
              }}
            >
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, var(--violet), transparent)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--violet)',
                  letterSpacing: '0.2em',
                  textShadow: '0 0 10px var(--violet)',
                }}
              >
                ENGINEER ARSENAL
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to left, var(--violet), transparent)' }}
              />
            </div>

            <div className="hex-wrapper">
              {ENGINEERING_SKILLS.map((skill, i) => (
                <Hexagon
                  key={skill.name}
                  {...skill}
                  color="var(--violet)"
                  glowColor="rgba(139,0,255,0.6)"
                  delay={booted ? i * 60 + 200 : 9999}
                  visible={booted}
                />
              ))}
            </div>

            {/* Progress bars */}
            <div className="mt-10 space-y-3">
              {ENGINEERING_SKILLS.slice(0, 4).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--plasma-dim)' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--violet)' }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="neon-progress-track">
                    <div
                      className="neon-progress-fill"
                      style={{
                        width: booted ? `${skill.level}%` : '0%',
                        transitionDelay: `${i * 150 + 300}ms`,
                        background: 'linear-gradient(90deg, var(--violet), rgba(139,0,255,0.4))',
                        boxShadow: '0 0 8px var(--violet-glow)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools row */}
        <div
          className="mt-16 glass rounded-2xl p-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.5s',
            border: '1px solid rgba(0,245,255,0.1)',
          }}
        >
          <p
            className="text-center mb-6"
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.65rem',
              color: 'var(--cyan)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            // TOOLS & TECHNOLOGIES //
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Postman', 'Jira', 'JMeter', 'Git', 'Python', 'JavaScript', 'SQL', 'HTML5', 'REST APIs', 'LLM/AI', 'STLC', 'Full-Stack', 'Linux'].map(tool => (
              <span
                key={tool}
                className="group"
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.7rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(0,245,255,0.04)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  borderRadius: '4px',
                  color: 'var(--plasma-dim)',
                  cursor: 'default',
                  transition: 'all 0.3s',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--cyan)';
                  (e.target as HTMLElement).style.borderColor = 'var(--cyan)';
                  (e.target as HTMLElement).style.boxShadow = '0 0 8px var(--cyan-glow)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--plasma-dim)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(0,245,255,0.15)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
