import { useEffect, useState, useCallback } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

interface Bug {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  emoji: string;
}

const BUG_EMOJIS = ['🐛', '🦗', '🪲', '🐞', '🐜', '🦟'];

export default function KonamiEgg() {
  const [seq, setSeq] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<'bugs' | 'fix' | 'done'>('bugs');
  const [bugs, setBugs] = useState<Bug[]>([]);

  const trigger = useCallback(() => {
    setActive(true);
    setPhase('bugs');

    const newBugs: Bug[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 720 - 360,
      emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
    }));
    setBugs(newBugs);

    setTimeout(() => setPhase('fix'), 2000);
    setTimeout(() => {
      setPhase('done');
      setTimeout(() => {
        setActive(false);
        setPhase('bugs');
        setBugs([]);
      }, 2000);
    }, 3500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          trigger();
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [trigger]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[200000] flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={() => {
        setActive(false);
        setPhase('bugs');
        setBugs([]);
      }}
    >
      {/* Flying bugs */}
      {phase === 'bugs' && bugs.map(bug => (
        <div
          key={bug.id}
          style={{
            position: 'absolute',
            left: `${bug.x}%`,
            top: `${bug.y}%`,
            fontSize: '2rem',
            animation: `particle-fly 2s ease-out forwards`,
            '--dx': `${bug.dx}px`,
            '--dy': `${bug.dy}px`,
          } as React.CSSProperties}
        >
          {bug.emoji}
        </div>
      ))}

      {/* Fix phase */}
      {phase === 'fix' && (
        <div className="text-center">
          <div
            style={{
              fontSize: '5rem',
              animation: 'pulse-cyan 0.5s ease infinite',
              marginBottom: '1rem',
            }}
          >
            🔬
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 4vw, 2rem)',
              color: 'var(--cyan)',
              textShadow: '0 0 20px var(--cyan)',
              letterSpacing: '0.2em',
            }}
          >
            RUNNING BUG FIX...
          </div>
          <div
            className="mt-4 neon-progress-track mx-auto"
            style={{ width: '300px', height: '6px' }}
          >
            <div
              className="neon-progress-fill"
              style={{ width: '100%', transition: 'width 1.2s ease' }}
            />
          </div>
        </div>
      )}

      {/* Done phase */}
      {phase === 'done' && (
        <div className="text-center">
          <div
            style={{
              fontSize: '6rem',
              marginBottom: '1rem',
              animation: 'heartbeat 0.5s ease 3',
            }}
          >
            ✅
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
              color: 'var(--cyan)',
              textShadow: '0 0 30px var(--cyan)',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}
          >
            ALL BUGS FIXED!
          </div>
          <div
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              color: 'var(--plasma-dim)',
              letterSpacing: '0.1em',
            }}
          >
            0 bugs remaining · 100% coverage · System stable
          </div>
        </div>
      )}

      {/* Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontFamily: 'var(--font-code)',
          fontSize: '0.65rem',
          color: 'rgba(240,248,255,0.3)',
          letterSpacing: '0.1em',
        }}
      >
        Click anywhere to close
      </div>
    </div>
  );
}
