"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "./LanguageProvider";
import { gsap, useGSAP } from "./motion";

function useCateringMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
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
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const imageWrapper = imageWrapperRef.current;

      if (!section || !imageWrapper) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          imageWrapper,
          { scale: 1, y: -34 },
          {
            ease: "none",
            scale: 1.07,
            y: 34,
            scrollTrigger: {
              end: "bottom top",
              scrub: 1,
              start: "top bottom",
              trigger: section,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return { imageWrapperRef, isVisible, sectionRef };
}

export function CateringSection() {
  const { imageWrapperRef, isVisible, sectionRef } = useCateringMotion();
  const { language } = useLanguage();

  return (
    <section
      ref={sectionRef}
      id="catering"
      className="relative flex min-h-[630.72px] items-center justify-center overflow-hidden py-24 text-madie-cream lg:h-[933.83px] lg:py-32"
    >
      <div
        ref={imageWrapperRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-[8%] h-[116%] w-full will-change-transform"
      >
        {/* Native image preserves the source AVIF payload stored under a .jpg filename. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sites/madie-es-a92149a5/root-8a5edab2/assets/le-petit-bleu-evenements.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/60 lg:bg-black/40" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.38)_100%)] lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-[850px] px-6 text-center md:px-10">
        <div
          className={`madie-reveal mx-auto max-w-[770px] motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "is-visible" : ""}`}
        >
          <p className="madie-eyebrow mb-6 flex items-center justify-center gap-4 text-madie-cream/85 before:h-px before:w-7 before:bg-madie-cream/50 before:content-[''] after:h-px after:w-7 after:bg-madie-cream/50 after:content-['']">
            {language === "fr" ? "Événements" : "Events"}
          </p>

          <h2 className="madie-display madie-text-stroke text-[36px] leading-[1.1] text-madie-cream sm:text-[48px] lg:text-[96px] lg:leading-[105.6px]">
            <span className="block">{language === "fr" ? "Les grands jours," : "Big days,"}</span>
            <span className="block">{language === "fr" ? "encore plus doux" : "made even sweeter"}</span>
            <span className="block">{language === "fr" ? "avec Le Petit Bleu" : "with Le Petit Bleu"}</span>
          </h2>

          <p className="mx-auto mt-8 max-w-[58ch] text-[16px] leading-[1.6] text-madie-cream/85 md:text-[18px]">
            {language === "fr"
              ? "Mariages, lancements ou un mardi au bureau qui mérite mieux : nous imaginons des boîtes de donuts sur mesure et des instants gourmands pour toutes les occasions."
              : "Weddings, launches or a Tuesday at the office that deserves better: we create custom donut boxes and sweet moments for every occasion."}
          </p>

          <a
            href="mailto:hola@lepetitbleu.com"
            className="madie-eyebrow mt-8 inline-flex h-12 items-center justify-center rounded-full bg-madie-rose px-8 text-madie-ink transition-colors duration-300 hover:bg-madie-rose-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madie-cream"
          >
            {language === "fr" ? "Commander" : "Order"}
          </a>
        </div>
      </div>
    </section>
  );
}
