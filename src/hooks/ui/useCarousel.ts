import { useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  total: number;
  autoplay?: boolean;
  interval?: number;
}

export function useCarousel({ total, autoplay = true, interval = 4000 }: UseCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cambio manual
  const goTo = (idx: number) => setActiveIndex(idx);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, autoplay, interval, total]);

  return {
    activeIndex,
    goTo,
  };
}
