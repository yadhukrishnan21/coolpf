import { useEffect, useRef, useState } from 'react';

const TIMELINE = [
  {
    type: 'work',
    title: 'Junior Software Tester & Engineer Trainee',
    org: 'SOFTWN Technologies',
    period: 'Oct 2022 – Apr 2023',
    location: 'Kerala, India',
    color: 'var(--cyan)',
    lines: [
      '> Executed manual and functional testing across multiple modules',
      '> Logged, tracked, and verified defects across STLC',
      '> Collaborated with devs to reproduce issues & validate fixes',
      '> Participated in requirement analysis and QA reviews',
    ],
  },
  {
    type: 'edu',
    title: 'B.Tech — Computer Science Engineering',
    org: 'MCET Malabar',
    period: '2023 – 2026',
    location: 'Kerala, India',
    color: 'var(--violet)',
    lines: [
      '> Specializing in software engineering and AI systems',
      '> Building production-grade projects alongside coursework',
      '> Active in tech communities and collaborative development',
    ],
  },
  {
    type: 'edu',
    title: 'Diploma — Computer Science Engineering',
    org: 'GPTC Chelakkara',
    period: '2019 – 2022',
    location: 'Thrissur, Kerala',
    color: 'var(--gold)',
    lines: [
      '> Foundational training in programming and system design',
      '> Developed core understanding of software development lifecycle',
      '> Graduated with strong practical engineering fundamentals',
    ],
  },
  {
    type: 'edu',
    title: 'Higher Secondary Education',
    org: 'GHSS Mundur',
    period: '2017 – 2019',
    location: 'Kerala, India',
    color: 'var(--plasma-dim)',
    lines: [
      '> Science stream with focus on mathematics and computing',
      '> Foundation for engineering career path established',
    ],
  },
];

interface EntryProps {
  item: typeof TIMELINE[0];
  index: number;
  visible: boolean;
  isLeft: boolean;
}

function TimelineEntry({ item, index, visible, isLeft }: EntryProps) {
  const [typed, setTyped] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          item.lines.forEach((line, i) => {
            setTimeout(() => {
              setTyped(prev => [...prev, line]);
            }, i * 300 + 200);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.lines]);

  return (
    <div
      ref={ref}
      className={`relative grid md:grid-cols-2 gap-4 md:gap-8 mb-12`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      {/* Left side content (even) or spacer (odd) */}
      {isLeft ? (
        <div className="md:text-right order-2 md:order-1">
          <EntryCard item={item} typed={typed} active={active} />
        </div>
      ) : (
        <div className="hidden md:block order-1" />
      )}

      {/* Center node */}
      <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 flex flex-col items-center" style={{ zIndex: 2 }}>
        <div
          className="timeline-node"
          style={{
            background: item.color,
            boxShadow: `0 0 12px ${item.color}, 0 0 24px ${item.color}40`,
            animation: active ? 'heartbeat 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* Right side content (odd) or spacer (even) */}
      {!isLeft ? (
        <div className="order-2 pl-6 md:pl-0">
          <EntryCard item={item} typed={typed} active={active} />
        </div>
      ) : (
        <div className="hidden md:block order-2" />
      )}
    </div>
  );
}

function EntryCard({ item, typed, active }: { item: typeof TIMELINE[0]; typed: string[]; active: boolean }) {
  return (
    <div
      className="glass rounded-xl p-5 text-left"
      style={{
        border: `1px solid ${item.color}30`,
        boxShadow: active ? `0 0 20px ${item.color}10` : 'none',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* Type badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded mb-3"
        style={{
          background: `${item.color}15`,
          border: `1px solid ${item.color}40`,
          fontFamily: 'var(--font-code)',
          fontSize: '0.58rem',
          color: item.color,
          letterSpacing: '0.15em',
        }}
      >
        {item.type === 'work' ? '◉ WORK' : '◈ EDUCATION'}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: 'var(--plasma)',
          marginBottom: '0.3rem',
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h3>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: item.color,
          fontWeight: 600,
          marginBottom: '0.25rem',
        }}
      >
        {item.org}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.62rem',
            color: 'var(--plasma-dim)',
            letterSpacing: '0.05em',
          }}
        >
          {item.period}
        </span>
        <span style={{ color: 'rgba(240,248,255,0.2)', fontSize: '0.6rem' }}>|</span>
        <span
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.62rem',
            color: 'var(--plasma-dim)',
          }}
        >
          {item.location}
        </span>
      </div>

      {/* Terminal lines */}
      <div
        className="rounded-lg p-3 space-y-1"
        style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.04)',
          fontFamily: 'var(--font-code)',
          fontSize: '0.62rem',
          minHeight: '60px',
        }}
      >
        {typed.map((line, i) => (
          <div
            key={i}
            style={{
              color: i === 0 ? item.color : 'rgba(240,248,255,0.5)',
              animation: 'boot-reveal 0.3s ease forwards',
            }}
          >
            {line}
          </div>
        ))}
        {active && typed.length < item.lines.length && (
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '0.8em',
              background: item.color,
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Animate timeline line
          let h = 0;
          const max = sectionRef.current?.querySelector('.timeline-container')?.scrollHeight || 600;
          const tick = () => {
            h += 6;
            if (h <= max) {
              setLineHeight(h);
              requestAnimationFrame(tick);
            }
          };
          setTimeout(() => requestAnimationFrame(tick), 300);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'var(--space-2)' }}
    >
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative">
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
            <span>The Journey</span>
          </div>
          <h2 className="section-heading">
            Mission{' '}
            <span className="gradient-text-cyan">Timeline</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative timeline-container">
          {/* The self-drawing line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 w-px -translate-x-px"
            style={{
              background: 'rgba(0,245,255,0.08)',
              height: '100%',
            }}
          />
          <div
            ref={lineRef}
            className="absolute left-0 md:left-1/2 top-0 w-px -translate-x-px"
            style={{
              height: lineHeight,
              background: 'linear-gradient(to bottom, var(--cyan), var(--violet), var(--gold))',
              boxShadow: '0 0 8px var(--cyan-glow)',
              transition: 'height 0.05s linear',
            }}
          />

          {TIMELINE.map((item, i) => (
            <TimelineEntry
              key={i}
              item={item}
              index={i}
              visible={visible}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>

        {/* NSS volunteer badge */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'all 0.7s ease 0.8s',
          }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full"
            style={{ border: '1px solid rgba(255,215,0,0.2)' }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>
            <span
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.7rem',
                color: 'var(--plasma-dim)',
                letterSpacing: '0.1em',
              }}
            >
              NSS Volunteer — 8 Years of Community Service
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
