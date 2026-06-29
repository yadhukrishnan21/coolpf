import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Bug, Code, Layers, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    name: 'Plane Ticket Booking',
    subtitle: 'Manual Testing Project',
    type: 'testing',
    icon: <Bug size={20} />,
    tagline: 'End-to-end QA on a flight booking platform',
    tech: ['Manual Testing', 'Test Case Design', 'Regression Testing', 'Defect Reporting', 'API Testing'],
    description:
      'Performed comprehensive end-to-end testing of a flight booking system — covering search, booking flows, payment gateway integration, ticket cancellation, and booking history. Designed 200+ test cases, executed functional and regression test suites, and validated all bug fixes for a seamless user journey.',
    impact: ['500+ test scenarios executed', 'Payment gateway fully validated', 'Zero critical bugs at release'],
    color: 'var(--cyan)',
    accentColor: 'rgba(0,245,255,0.1)',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.03))',
  },
  {
    id: 2,
    name: 'Lexi Assist',
    subtitle: 'AI Legal Research Assistant',
    type: 'engineering',
    icon: <Cpu size={20} />,
    tagline: 'LLM-powered legal intelligence platform',
    tech: ['Python', 'LLMs', 'NLP', 'Generative AI', 'REST API'],
    description:
      'Developed a Python-based AI assistant leveraging Large Language Models to automate legal query resolution, document analysis, and statute summarization. Improved information retrieval efficiency for legal professionals through AI-powered natural language processing and intelligent document parsing.',
    impact: ['80%+ faster legal research', 'Multi-document analysis', 'Natural language querying'],
    color: 'var(--violet)',
    accentColor: 'rgba(139,0,255,0.1)',
    gradient: 'linear-gradient(135deg, rgba(139,0,255,0.15), rgba(139,0,255,0.03))',
  },
  {
    id: 3,
    name: 'EV Mech Finder',
    subtitle: 'Location-Based Service Discovery',
    type: 'engineering',
    icon: <Layers size={20} />,
    tagline: 'Connecting EV owners with certified mechanics',
    tech: ['JavaScript', 'REST APIs', 'Geolocation', 'Full-Stack', 'SQL'],
    description:
      'Built a location-based service discovery platform that connects electric vehicle owners with certified EV mechanics in their area. Implemented proximity-based search algorithms and real-time availability features to simplify access to specialized EV repair services at scale.',
    impact: ['Real-time proximity search', 'Certified mechanic network', 'Mobile-first experience'],
    color: 'var(--cyan)',
    accentColor: 'rgba(0,245,255,0.1)',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.12), rgba(139,0,255,0.08))',
  },
  {
    id: 4,
    name: 'KSRTC Holiday Booking',
    subtitle: 'Ticket Reservation System',
    type: 'engineering',
    icon: <Code size={20} />,
    tagline: 'High-traffic bus booking web platform',
    tech: ['HTML', 'JavaScript', 'SQL', 'Web App', 'Responsive Design'],
    description:
      'Developed a responsive web application for KSRTC holiday bus ticket reservations. Engineered user-friendly booking workflows, efficient ticket management systems, and a scalable backend capable of handling peak-season traffic surges during major Kerala holidays.',
    impact: ['Handles peak traffic loads', 'Intuitive booking UX', 'Full ticket lifecycle management'],
    color: 'var(--violet)',
    accentColor: 'rgba(139,0,255,0.1)',
    gradient: 'linear-gradient(135deg, rgba(139,0,255,0.12), rgba(0,245,255,0.08))',
  },
];

interface CardProps {
  project: typeof PROJECTS[0];
  delay: number;
  visible: boolean;
}

function ProjectCard({ project, delay, visible }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="project-card-wrapper"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        height: '360px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`project-card w-full h-full ${flipped ? 'flipped' : ''}`}
        style={{
          transform: flipped
            ? 'rotateY(180deg)'
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: flipped ? 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' : 'transform 0.15s ease',
        }}
      >
        {/* Front */}
        <div
          className="card-front absolute inset-0 rounded-2xl overflow-hidden p-6 flex flex-col"
          style={{
            background: project.gradient,
            border: `1px solid ${project.color}25`,
            boxShadow: `0 4px 30px ${project.color}08`,
          }}
        >
          {/* Scan line on hover */}
          <div className="card-scan-line" />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {project.icon}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.58rem',
                padding: '0.25rem 0.6rem',
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
                borderRadius: '4px',
                color: project.color,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {project.type}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'var(--plasma)',
              marginBottom: '0.25rem',
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: project.color,
              marginBottom: '0.75rem',
              fontWeight: 500,
            }}
          >
            {project.subtitle}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: 'var(--plasma-dim)',
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {project.tagline}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.56rem',
                  padding: '0.2rem 0.5rem',
                  background: `${project.color}08`,
                  border: `1px solid ${project.color}20`,
                  borderRadius: '3px',
                  color: 'var(--plasma-dim)',
                  letterSpacing: '0.05em',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Flip button */}
          <button
            onClick={() => setFlipped(true)}
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.62rem',
              color: project.color,
              letterSpacing: '0.1em',
              background: 'transparent',
              border: `1px solid ${project.color}30`,
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${project.color}15`;
              (e.currentTarget as HTMLElement).style.borderColor = project.color;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${project.color}40`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = `${project.color}30`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            &gt; Open Case File
          </button>
        </div>

        {/* Back */}
        <div
          className="card-back rounded-2xl overflow-hidden p-6 flex flex-col"
          style={{
            background: 'rgba(10,10,25,0.98)',
            border: `1px solid ${project.color}35`,
            boxShadow: `0 0 30px ${project.color}15`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: project.color,
                letterSpacing: '0.15em',
              }}
            >
              CASE FILE: {project.name.toUpperCase()}
            </span>
            <button
              onClick={() => setFlipped(false)}
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.6rem',
                color: 'var(--plasma-dim)',
                background: 'transparent',
                border: '1px solid rgba(240,248,255,0.1)',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--plasma-dim)',
              lineHeight: 1.7,
              flex: 1,
              marginBottom: '1rem',
            }}
          >
            {project.description}
          </p>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.6rem',
                color: project.color,
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}
            >
              // IMPACT METRICS
            </p>
            <ul className="space-y-1.5">
              {project.impact.map(item => (
                <li
                  key={item}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.68rem',
                    color: 'var(--plasma-dim)',
                  }}
                >
                  <span style={{ color: project.color, fontSize: '0.5rem' }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'var(--space)' }}
    >
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

      {/* Ambient glows */}
      <div
        className="absolute top-1/3 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.05), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,255,0.05), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

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
            <span>The Lab</span>
          </div>
          <h2 className="section-heading">
            Deployed{' '}
            <span className="gradient-text-violet">Missions</span>
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'rgba(0,245,255,0.4)',
              letterSpacing: '0.1em',
            }}
          >
            &gt; Click any card to open its case file
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 100}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
