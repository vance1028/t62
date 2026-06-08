import { useMemo } from 'react';

interface StarFieldProps {
  count?: number;
}

export default function StarField({ count = 120 }: StarFieldProps) {
  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number; o: number; delay: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 4,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.r}px`,
            height: `${s.r}px`,
            opacity: s.o,
            animation: `pulseGlow ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
