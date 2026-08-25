"use client";

import Lenis from "lenis";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "./motion";

export function MotionProvider() {
  const scopeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          syncTouch: false,
        });

        const updateScrollTrigger = () => ScrollTrigger.update();
        const syncWithGsap = (time: number) => lenis.raf(time * 1000);

        lenis.on("scroll", updateScrollTrigger);
        gsap.ticker.add(syncWithGsap);

        return () => {
          lenis.off("scroll", updateScrollTrigger);
          gsap.ticker.remove(syncWithGsap);
          lenis.destroy();
        };
      });

      return () => media.revert();
    },
    { scope: scopeRef },
  );

  return <span ref={scopeRef} aria-hidden="true" className="contents" />;
}
