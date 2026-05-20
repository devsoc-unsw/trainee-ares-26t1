import { useEffect, useRef, useState } from "react";

const REEL_VISIBLE = 3;
const SYMBOL_H = 48;

interface ReelProps {
  symbols: string[];
  spinning: boolean;
  delay: number;
  onDone?: () => void;
}

const Reel = ({ symbols, spinning, delay, onDone }: ReelProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!spinning) return;

    let start: number | null = null;
    const totalH = symbols.length * SYMBOL_H;
    const target = -(totalH - REEL_VISIBLE * SYMBOL_H);
    const duration = 1200 + delay;

    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);

      const ease =
        progress < 0.7
          ? progress / 0.7
          : 1 - Math.pow(1 - (progress - 0.7) / 0.3, 3);

      setOffset(target * ease);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setOffset(target);
        onDone?.();
      }
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [spinning]);

  // Reset when not spinning
  useEffect(() => {
    if (!spinning) setOffset(0);
  }, [symbols]);

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-theme-brown-dark border-2 border-theme-purple"
      style={{
        width: SYMBOL_H + 16,
        height: REEL_VISIBLE * SYMBOL_H,
      }}
    >
      {/* Centre line highlight */}
      <div
        className="absolute inset-x-0 z-10 pointer-events-none bg-theme-yellow/10 border-theme-yellow/25 border-t-1 border-b-1"
        style={{
          top: SYMBOL_H,
          height: SYMBOL_H,
        }}
      />

      {/* Symbol strip */}
      <div ref={stripRef} style={{ transform: `translateY(${offset}px)` }}>
        {symbols.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-center select-none text-theme-yellow"
            style={{
              width: SYMBOL_H + 16,
              height: SYMBOL_H,
              fontSize: 24,
              textShadow: "0px 0px 4px rgba(36, 20, 71, 0.8)",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;
