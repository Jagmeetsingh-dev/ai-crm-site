import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  /** Optional prefix/suffix, e.g. "$" / "%" / "x". */
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
};

/**
 * Animated KPI counter that runs once when scrolled into view.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1400,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    let start = 0;

    const run = () => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / durationMs, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(to * eased);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
