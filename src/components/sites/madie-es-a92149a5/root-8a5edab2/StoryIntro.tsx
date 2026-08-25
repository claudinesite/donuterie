"use client";

import { useRef } from "react";

import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

export function StoryIntro() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-story-line]", {
          duration: 0.86,
          ease: MOTION.easeOut,
          stagger: MOTION.staggerFast,
          yPercent: 105,
          scrollTrigger: {
            once: true,
            start: "top 80%",
            trigger: section,
          },
        });
        gsap.from("[data-story-copy]", {
          autoAlpha: 0,
          duration: 0.68,
          ease: MOTION.easeOut,
          y: 16,
          scrollTrigger: {
            once: true,
            start: "top 74%",
            trigger: section,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden px-6 py-16 text-center sm:px-10 lg:min-h-[calc(clamp(620px,82svh,760px)-48px)] lg:px-[clamp(48px,6vw,96px)] lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/sites/madie-es-a92149a5/root-8a5edab2/assets/67a0d73c790a0445.jpg')] opacity-10 mix-blend-multiply"
          />

          <div className="relative w-full max-w-[660px]">
            <p className="madie-eyebrow mb-5 text-[9px] text-madie-burgundy/70 lg:text-[10px]">
              {language === "fr" ? "Notre histoire" : "Our story"}
            </p>

            <h2 className="madie-display madie-text-stroke overflow-hidden text-[44px] leading-[0.9] text-madie-burgundy sm:text-[54px] lg:text-[clamp(56px,4.8vw,72px)]">
              <span data-story-line className="block will-change-transform">{language === "fr" ? "Une tradition" : "A tradition"}</span>
              <span data-story-line className="block italic will-change-transform [-webkit-text-fill-color:currentColor] [-webkit-text-stroke:0]">
                {language === "fr" ? "réinventée" : "reinvented"}
              </span>
            </h2>

            <div data-story-copy className="mx-auto mt-8 max-w-[56ch] space-y-4 text-left text-[14px] leading-[1.55] text-madie-ink/75 md:text-[15px]">
              <p>
                {language === "fr"
                  ? "Chez Le Petit Bleu, nous pensons qu’un donut peut raconter bien plus qu’une simple recette."
                  : "At Le Petit Bleu, we believe a donut can tell a story far beyond a simple recipe."}
              </p>
              <p>
                {language === "fr"
                  ? "Tout commence avec le goût des vitrines de quartier : une pâte légère, un glaçage généreux et le parfum réconfortant des fournées du matin. Chaque donut est préparé avec soin, pour retrouver ce plaisir simple à chaque bouchée."
                  : "It starts with the taste of neighbourhood bakeries: a light dough, generous glaze and the comforting scent of the morning bake. Every donut is made with care, bringing a simple pleasure to every bite."}
              </p>
              <p>{language === "fr" ? "Cette gourmandise est au cœur de LE PETIT BLEU." : "That generous spirit is at the heart of LE PETIT BLEU."}</p>
            </div>
          </div>
      </div>
    </section>
  );
}
