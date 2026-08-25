"use client";

import { useRef } from "react";

import { HeroSection, HeroTicker } from "./HeroSection";
import { gsap, ScrollTrigger, useGSAP } from "./motion";
import { StoryIntro } from "./StoryIntro";

export function HeroStoryOverlap() {
  const overlapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const story = storyRef.current;

      if (!hero || !story) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions?.desktop || context.conditions.reducedMotion) {
            return;
          }

          const overlap = ScrollTrigger.create({
            anticipatePin: 1,
            end: "bottom bottom",
            endTrigger: story,
            id: "hero-story-overlap",
            invalidateOnRefresh: true,
            pin: hero,
            pinSpacing: false,
            refreshPriority: -10,
            start: "top top",
            trigger: hero,
          });

          return () => overlap.kill();
        },
      );

      return () => media.revert();
    },
    { scope: overlapRef },
  );

  return (
    <div ref={overlapRef} className="relative isolate">
      <div ref={heroRef} className="relative z-0">
        <HeroSection />
      </div>
      <div ref={storyRef} className="relative z-10 bg-white">
        <HeroTicker />
        <StoryIntro />
      </div>
    </div>
  );
}
