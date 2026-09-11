import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  startOnView?: boolean;
}

export function useCountUp({
  end,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  startOnView = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!startOnView) {
      startAnimation();
      return;
    }

    if (!el || typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, hasAnimated, startOnView]);

  const startAnimation = () => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out expo / cubic for a smooth institutional glide
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * end;
      setValue(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    window.requestAnimationFrame(step);
  };

  const formatNumber = (val: number) => {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return `${prefix}${parts.join(".")}${suffix}`;
  };

  return {
    ref: elementRef,
    formatted: formatNumber(value),
    rawValue: value,
  };
}
