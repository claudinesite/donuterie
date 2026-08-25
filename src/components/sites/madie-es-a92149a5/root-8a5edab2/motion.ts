"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const MOTION = {
  easeOut: "power3.out",
  easeSoft: "power2.out",
  easeOrganic: "sine.inOut",
  revealDuration: 0.78,
  staggerFast: 0.08,
} as const;

export { gsap, ScrollTrigger, useGSAP };
