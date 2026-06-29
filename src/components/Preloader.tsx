import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '> INITIALIZING SYSTEM CORE...',
  '> LOADING NEURAL INTERFACE...',
  '> CALIBRATING TEST PROTOCOLS...',
  '> MOUNTING ENGINEERING MODULES...',
  '> ESTABLISHING QUANTUM LINK...',
  '> SYSTEM READY.',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 3 + 1;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
      setProgress(Math.floor(pct));
    }, 40);

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, i * 420);
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="preloader"
      className={done ? 'hidden' : ''}
    >
      <div className="w-full max-w-lg px-8">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div
            className="inline-block font-display text-2xl font-black tracking-widest glow-cyan"
            style={{ color: 'var(--cyan)', fontFamily: 'var(--font-display)' }}
          >
            YK.SYS
          </div>
          <div
            className="mt-2 text-xs tracking-widest"
            style={{ color: 'var(--plasma-dim)', fontFamily: 'var(--font-code)' }}
          >
            ANTIGRAVITY PLATFORM v2.0.26
          </div>
        </div>

        {/* Boot lines */}
        <div
          className="mb-8 space-y-1.5 min-h-[140px]"
          style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem' }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                color: i === lines.length - 1 ? 'var(--cyan)' : 'rgba(0,245,255,0.5)',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="neon-progress-track mb-3">
          <div
            className="neon-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="flex justify-between items-center">
          <span
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.65rem',
              color: 'rgba(0,245,255,0.5)',
              letterSpacing: '0.2em',
            }}
          >
            LOADING COSMOS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--cyan)',
              textShadow: '0 0 10px var(--cyan)',
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Animated corner decorations */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t border-l" style={{ borderColor: 'var(--cyan)' }} />
        <div className="absolute top-8 right-8 w-8 h-8 border-t border-r" style={{ borderColor: 'var(--violet)' }} />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l" style={{ borderColor: 'var(--violet)' }} />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r" style={{ borderColor: 'var(--cyan)' }} />
      </div>
    </div>
  );
}
