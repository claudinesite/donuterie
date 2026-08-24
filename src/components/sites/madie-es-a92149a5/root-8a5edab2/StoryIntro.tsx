"use client";

import { useEffect, useRef, useState } from "react";

function useRevealOnce() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const animationFrame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return { isVisible, sectionRef };
}

export function StoryIntro() {
  const { isVisible, sectionRef } = useRevealOnce();

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden border-b border-[#102F35]/15 bg-white"
    >
      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden px-6 py-16 text-center sm:px-10 lg:min-h-[560px] lg:px-[clamp(48px,6vw,96px)] lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/sites/madie-es-a92149a5/root-8a5edab2/assets/67a0d73c790a0445.jpg')] opacity-10 mix-blend-multiply"
          />

          <div
            className={`madie-reveal relative w-full max-w-[660px] ${isVisible ? "is-visible" : ""}`}
          >
            <p className="madie-eyebrow mb-5 text-[9px] text-madie-burgundy/70 lg:text-[10px]">
              Notre histoire
            </p>

            <h2 className="madie-display madie-text-stroke text-[44px] leading-[0.9] text-madie-burgundy sm:text-[54px] lg:text-[clamp(56px,4.8vw,72px)]">
              <span className="block">Une tradition</span>
              <span className="block italic [-webkit-text-fill-color:currentColor] [-webkit-text-stroke:0]">
                réinventée
              </span>
            </h2>

            <div className="mx-auto mt-8 max-w-[56ch] space-y-4 text-left text-[14px] leading-[1.55] text-madie-ink/75 md:text-[15px]">
              <p>
                Chez Le Petit Bleu, nous pensons qu’un donut peut raconter bien plus
                qu’une simple recette.
              </p>
              <p>
                Tout commence avec le goût des vitrines de quartier : une pâte légère,
                un glaçage généreux et le parfum réconfortant des fournées du matin.
                Chaque donut est préparé avec soin, pour retrouver ce plaisir simple
                à chaque bouchée.
              </p>
              <p>Cette gourmandise est au cœur de LE PETIT BLEU.</p>
            </div>
          </div>
      </div>
    </section>
  );
}
