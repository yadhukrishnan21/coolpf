import { useEffect, useRef } from 'react';

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  el: HTMLDivElement;
}

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailDot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Create trail particles
    const TRAIL_LENGTH = 12;
    const trail: TrailDot[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-trail-particle';
      el.style.opacity = '0';
      document.body.appendChild(el);
      trail.push({ x: 0, y: 0, alpha: 0, el });
    }
    trailRef.current = trail;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // Shift trail
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x;
        trail[i].y = trail[i - 1].y;
      }
      trail[0].x = e.clientX;
      trail[0].y = e.clientY;

      trail.forEach((t, i) => {
        const alpha = 1 - i / TRAIL_LENGTH;
        const size = Math.max(1, 4 - i * 0.25);
        t.el.style.left = `${t.x}px`;
        t.el.style.top = `${t.y}px`;
        t.el.style.opacity = `${alpha * 0.4}`;
        t.el.style.width = `${size}px`;
        t.el.style.height = `${size}px`;
        t.el.style.background = i % 2 === 0 ? 'var(--cyan)' : 'var(--violet)';
      });
    };

    const animateRing = () => {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      animRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseEnterLink = () => {
      if (dot) {
        dot.style.width = '14px';
        dot.style.height = '14px';
        dot.style.background = 'var(--violet)';
      }
      if (ring) {
        ring.style.width = '50px';
        ring.style.height = '50px';
        ring.style.borderColor = 'rgba(139,0,255,0.6)';
      }
    };

    const onMouseLeaveLink = () => {
      if (dot) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--cyan)';
      }
      if (ring) {
        ring.style.width = '30px';
        ring.style.height = '30px';
        ring.style.borderColor = 'var(--cyan-glow)';
      }
    };

    const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    window.addEventListener('mousemove', onMouseMove);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animRef.current);
      trail.forEach(t => t.el.remove());
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
