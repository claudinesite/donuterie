"use client";

import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId: number | null = null;

    const updateParallax = () => {
      const section = sectionRef.current;
      const imageWrapper = imageWrapperRef.current;

      if (!section || !imageWrapper) {
        return;
      }

      if (reduceMotion.matches) {
        imageWrapper.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const bounds = section.getBoundingClientRect();
      const travel = window.innerHeight + bounds.height;
      const progress = Math.min(
        Math.max((window.innerHeight - bounds.top) / travel, 0),
        1,
      );
      const offset = (progress - 0.5) * 130;

      imageWrapper.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const queueParallaxUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateParallax();
      });
    };

    queueParallaxUpdate();
    window.addEventListener("scroll", queueParallaxUpdate, { passive: true });
    window.addEventListener("resize", queueParallaxUpdate);
    reduceMotion.addEventListener("change", queueParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", queueParallaxUpdate);
      window.removeEventListener("resize", queueParallaxUpdate);
      reduceMotion.removeEventListener("change", queueParallaxUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return { imageWrapperRef, isVisible, sectionRef };
}

export function CateringSection() {
  const { imageWrapperRef, isVisible, sectionRef } = useCateringMotion();

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
          src="/sites/madie-es-a92149a5/root-8a5edab2/assets/772c78b0d8dee890.jpg"
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
            Catering
          </p>

          <h2 className="madie-display madie-text-stroke text-[36px] leading-[1.1] text-madie-cream sm:text-[48px] lg:text-[96px] lg:leading-[105.6px]">
            <span className="block">Días grandes,</span>
            <span className="block">más dulces</span>
          <span className="block">con Le Petit Bleu</span>
          </h2>

          <p className="mx-auto mt-8 max-w-[58ch] text-[16px] leading-[1.6] text-madie-cream/85 md:text-[18px]">
            Bodas, inauguraciones, un martes en la oficina que quiere parecer
            menos un martes. Preparamos pedidos especiales y experiencias
            personalizadas para cualquier ocasión.
          </p>

          <a
            href="mailto:hola@madie.es"
            className="madie-eyebrow mt-8 inline-flex h-12 items-center justify-center rounded-full bg-madie-rose px-8 text-madie-ink transition-colors duration-300 hover:bg-madie-rose-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madie-cream"
          >
            Pedir ahora
          </a>
        </div>
      </div>
    </section>
  );
}
