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
      className="relative min-h-[639.25px] overflow-hidden bg-white py-24 lg:min-h-[689.14px] lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/sites/madie-es-a92149a5/root-8a5edab2/assets/67a0d73c790a0445.jpg')] opacity-10 mix-blend-multiply"
      />

      <div
        className={`madie-reveal relative mx-auto max-w-[800px] px-6 md:px-10 ${isVisible ? "is-visible" : ""}`}
      >
        <p className="madie-eyebrow mb-7 text-center text-madie-burgundy/70">
          Nuestra historia
        </p>

        <h2 className="madie-display madie-text-stroke text-center text-[36px] leading-none text-madie-burgundy sm:text-[44px] md:text-[56px] lg:text-[72px] lg:leading-[72px]">
          Una tradición{" "}
          <span className="inline-block italic [-webkit-text-fill-color:currentColor] [-webkit-text-stroke:0]">
            reinventada
          </span>
        </h2>

        <div className="mx-auto mt-12 max-w-[58ch] space-y-5 text-[16px] leading-6 text-madie-ink/75 md:text-[17.28px] md:leading-[28.08px]">
          <p>
            En Madie creemos que una madeleine puede contar mucho más que una
            receta.
          </p>
          <p>
            Todo empieza con una receta francesa tradicional, transmitida de
            generación en generación. Una elaboración sencilla, delicada y
            cuidada, inspirada en esas pastelerías donde el olor a mantequilla
            recién horneada forma parte de los recuerdos.
          </p>
          <p>Esa receta original es el corazón de MADIE.</p>
        </div>
      </div>
    </section>
  );
}
