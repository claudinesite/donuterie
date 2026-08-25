"use client";

import { useRef } from "react";

import { ArrowRightIcon, InstagramIcon } from "../shared/icons";
import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";
const instagramUrl = "https://www.instagram.com/claudine_eyram/";

const instagramImages = [
  "instagram-donut-pistachio.png",
  "instagram-donut-box.png",
  "instagram-packaging.png",
  "instagram-blue-cup.png",
  "instagram-blue-donut.png",
  "instagram-donut-trio.png",
] as const;

export function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-instagram-intro]", {
          autoAlpha: 0,
          duration: 0.78,
          ease: MOTION.easeOut,
          y: 18,
          scrollTrigger: {
            once: true,
            start: "top 80%",
            trigger: section,
          },
        });
        gsap.from("[data-instagram-card]", {
          autoAlpha: 0,
          duration: 0.64,
          ease: MOTION.easeOut,
          scale: 0.98,
          stagger: 0.07,
          y: 14,
          scrollTrigger: {
            once: true,
            start: "top 68%",
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
      className="relative min-h-[1077px] overflow-hidden bg-white px-6 py-24 text-[#13A7B2] lg:h-[880px] lg:min-h-0 lg:px-10 lg:py-32"
      id="instagram"
      ref={sectionRef}
    >
      <div className="madie-grain opacity-[0.1]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div data-instagram-intro>
          <p className="madie-eyebrow flex items-center gap-2.5 text-[#13A7B2]/75">
            <InstagramIcon className="size-6 stroke-[1.8]" />
            <span>{language === "fr" ? "Le Petit Bleu sur Instagram" : "Le Petit Bleu on Instagram"}</span>
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[1.5fr_.9fr] lg:gap-16">
            <h2 className="max-w-[760px] font-heading text-[44px] leading-[48.4px] font-bold tracking-[0.01em] uppercase sm:text-[60px] sm:leading-[66px] lg:text-[72px] lg:leading-[79.2px]">
              <span className="madie-text-stroke block text-[#13A7B2]">
                {language === "fr" ? "Découvre ce qui" : "Discover what"}{" "}
                <span className="[-webkit-text-fill-color:#13A7B2] [-webkit-text-stroke:0]">
                  {language === "fr" ? "sort" : "comes"}
                </span>
              </span>
              <span className="block text-[#13A7B2]">{language === "fr" ? "de notre four" : "from our oven"}</span>
              <span className="madie-text-stroke block text-[#13A7B2]">
                {language === "fr" ? "avant tout le monde." : "before everyone else."}
              </span>
            </h2>

            <div className="self-end lg:pb-2">
              <p className="max-w-[440px] text-[17px] leading-[1.6] text-[#102F35]">
                {language === "fr" ? "Rejoins les " : "Join "}
                <span className="font-bold text-[#FF8B6A]">{language === "fr" ? "1 365 gourmands" : "1,365 food lovers"}</span>
                {language === "fr"
                  ? " qui ne manquent jamais une fournée : chaque création et boisson de saison apparaît d’abord sur notre Instagram."
                  : " who never miss a fresh bake: every seasonal creation and drink appears first on our Instagram."}
              </p>

              <a
                className="group mt-6 inline-flex items-center gap-3 border-b border-[#13A7B2]/45 pb-1 font-heading text-[13px] leading-5 font-bold tracking-[0.1em] text-[#13A7B2] uppercase transition-colors duration-200 hover:border-[#FF8B6A] hover:text-[#FF8B6A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#13A7B2]"
                href={instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>{language === "fr" ? "Le Petit Bleu sur Instagram" : "Le Petit Bleu on Instagram"}</span>
                <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {instagramImages.map((image, index) => (
            <a
                data-instagram-card
                aria-label={`Voir la publication ${index + 1} de Le Petit Bleu sur Instagram`}
              className="group relative aspect-[3/4] w-[260px] shrink-0 snap-center overflow-hidden rounded-[14px] bg-[#DCEDEA] shadow-[0_10px_30px_rgba(7,81,91,0.08)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)] lg:w-auto"
              href={instagramUrl}
              key={image}
              rel="noreferrer"
              target="_blank"
            >
              <picture className="block size-full">
                <img
                  alt=""
                  className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-105"
                  decoding="async"
                  loading="lazy"
                  src={`${assetRoot}/${image}`}
                />
              </picture>

              <span className="absolute inset-0 bg-[#FF8B6A]/0 transition-colors duration-300 group-hover:bg-[#FF8B6A]/25" />
              <span className="absolute inset-0 flex scale-90 items-center justify-center text-[#F3FAF8] opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
                <InstagramIcon className="size-10 drop-shadow-[0_2px_9px_rgba(7,81,91,0.35)]" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
