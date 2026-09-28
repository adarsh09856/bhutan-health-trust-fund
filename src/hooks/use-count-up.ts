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
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
}: UseCountUpOptions) {
  const [value] = useState(end);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Clean, instantaneous rendering: no artificial counter animations
  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart !== undefined ? `${withSep}.${decPart}` : withSep;
  };

  return {
    value,
    formatted: `${prefix}${formatNumber(value)}${suffix}`,
    ref: elementRef,
    reset: () => {},
    start: () => {},
  };
}

