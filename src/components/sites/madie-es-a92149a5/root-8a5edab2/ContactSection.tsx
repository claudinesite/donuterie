"use client";

import { useRef, useState } from "react";

import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

const zoomClasses = [
  "scale-[0.85]",
  "scale-100",
  "scale-[1.15]",
  "scale-[1.3]",
  "scale-[1.45]",
] as const;

export function ContactSection() {
  const [zoomIndex, setZoomIndex] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reducedMotion) {
            return;
          }

          const isDesktop = context.conditions?.desktop ?? false;
          const trigger = {
            once: true,
            start: "top 80%",
            trigger: section,
          };

          gsap.from("[data-contact-heading]", {
            autoAlpha: 0,
            duration: 0.7,
            ease: MOTION.easeOut,
            y: 14,
            scrollTrigger: { ...trigger },
          });
          gsap.from("[data-contact-map]", {
            autoAlpha: 0,
            duration: 0.76,
            ease: MOTION.easeOut,
            y: 20,
            scrollTrigger: {
              ...trigger,
              start: "top 70%",
            },
          });
          gsap.from("[data-contact-details]", {
            autoAlpha: 0,
            duration: 0.72,
            ease: MOTION.easeOut,
            x: isDesktop ? 12 : 0,
            y: isDesktop ? 0 : 16,
            scrollTrigger: {
              ...trigger,
              start: "top 68%",
            },
          });
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  const zoomIn = () => {
    setZoomIndex((current) => Math.min(current + 1, zoomClasses.length - 1));
  };

  const zoomOut = () => {
    setZoomIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden bg-white pt-12 pb-20 text-madie-ink lg:pt-16 lg:pb-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <header data-contact-heading className="mx-auto mb-16 max-w-[600px] text-center">
          <p className="madie-eyebrow mb-4 text-madie-burgundy">
            {language === "fr" ? "Passe nous voir" : "Come see us"}
          </p>
          <h2 className="madie-display text-[36px] leading-[1.1] font-bold tracking-[0.01em] text-madie-burgundy uppercase lg:text-[72px] lg:leading-[79.2px]">
            <span className="madie-text-stroke-thin">{language === "fr" ? "Retrouve-nous" : "Find us"}</span>
            <br />
            <span>{language === "fr" ? "à Moncton." : "in Moncton."}</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div data-contact-map className="relative h-[480px] overflow-hidden rounded-[24px] border border-madie-burgundy-dark bg-madie-burgundy-dark lg:h-[568px]">
            <div
              className={`absolute inset-0 origin-center transition-transform duration-500 ease-out ${zoomClasses[zoomIndex]}`}
            >
              <iframe
                title={language === "fr" ? "Carte de Le Petit Bleu à Moncton" : "Map of Le Petit Bleu in Moncton"}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-64.86%2C46.03%2C-64.70%2C46.15&layer=mapnik&marker=46.0878%2C-64.7782"
                loading="lazy"
                className="absolute inset-0 size-full border-0"
              />

              <span
                className="absolute top-[47%] left-[53%] size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-madie-rose/55 [animation:madie-map-pulse_2.4s_cubic-bezier(0,0,.2,1)_infinite] motion-reduce:[animation:none]"
                aria-hidden="true"
              />
              <div
                className="absolute top-[47%] left-[53%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                aria-label="Le Petit Bleu"
                role="img"
              >
                <span className="flex size-16 items-center justify-center rounded-full border-4 border-white bg-[#07515B] shadow-[0_5px_12px_rgba(7,81,91,0.3)]">
                  <span className="size-5 rounded-full border-[3px] border-white bg-[#13A7B2]" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-white px-3 py-1 font-sans text-[10px] font-semibold tracking-[0.08em] text-[#07515B] uppercase shadow-sm">
                  Le Petit Bleu
                </span>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20 flex flex-col overflow-hidden rounded-xl border border-madie-cream/15 bg-madie-burgundy-dark/85 text-madie-cream shadow-lg backdrop-blur-sm">
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center border-b border-madie-cream/10 text-xl leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={language === "fr" ? "Zoomer sur la carte" : "Zoom in on map"}
                disabled={zoomIndex === zoomClasses.length - 1}
                onClick={zoomIn}
              >
                +
              </button>
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center border-b border-madie-cream/10 text-xl leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={language === "fr" ? "Dézoomer la carte" : "Zoom out on map"}
                disabled={zoomIndex === 0}
                onClick={zoomOut}
              >
                −
              </button>
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center text-sm leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-default disabled:opacity-40"
                aria-label={language === "fr" ? "Réinitialiser la carte" : "Reset map"}
                disabled={zoomIndex === 1}
                onClick={() => setZoomIndex(1)}
              >
                ◆
              </button>
            </div>

            <div className="absolute bottom-5 left-5 z-20 max-w-[290px] rounded-[18px] border border-madie-cream/10 bg-madie-burgundy-dark/90 px-5 py-4 text-madie-cream shadow-xl backdrop-blur-sm">
              <p className="madie-display text-[17px] leading-[1.15] font-bold tracking-[0.035em] uppercase">
                Moncton
                <br />
                Nouveau-Brunswick, Canada
              </p>
            </div>
          </div>

          <aside data-contact-details className="rounded-[24px] border border-madie-burgundy-dark/20 bg-white px-7 py-8 text-madie-ink lg:min-h-[568px] lg:px-9">
            <div className="border-b border-madie-ink/15 pb-6">
              <p className="madie-eyebrow mb-3 text-madie-ink/60">
                {language === "fr" ? "Horaires" : "Hours"}
              </p>
              <p className="text-[17px] leading-[1.75]">
                {language === "fr" ? "Lun. 11 h 00 – 20 h 30" : "Mon. 11:00 am – 8:30 pm"}
                <br />
                {language === "fr" ? "Mar.–Jeu. fermé" : "Tue.–Thu. closed"}
                <br />
                {language === "fr" ? "Ven. 13 h 00 – 20 h 30" : "Fri. 1:00 pm – 8:30 pm"}
                <br />
                {language === "fr" ? "Sam. 17 h 00 – 20 h 30" : "Sat. 5:00 pm – 8:30 pm"}
                <br />
                {language === "fr" ? "Dim. 13 h 30 – 20 h 30" : "Sun. 1:30 pm – 8:30 pm"}
              </p>
            </div>

            <div className="border-b border-madie-ink/15 py-6">
              <p className="madie-eyebrow mb-3 text-madie-ink/60">
                {language === "fr" ? "Téléphone" : "Phone"}
              </p>
              <a
                href="tel:+34603861349"
                className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
              >
                +34 603 861 349
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 border-b border-madie-ink/15 py-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="madie-eyebrow mb-3 text-madie-ink/60">
                  Email
                </p>
                <a
                  href="mailto:info@lepetitbleu.com"
                  className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
                >
                  info@lepetitbleu.com
                </a>
              </div>
              <div>
                <p className="madie-eyebrow mb-3 text-madie-ink/60">
                  {language === "fr" ? "Commandes" : "Orders"}
                </p>
                <a
                  href="mailto:orders@lepetitbleu.com"
                  className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
                >
                  orders@lepetitbleu.com
                </a>
              </div>
            </div>

            <div className="pt-6">
              <p className="madie-eyebrow mb-4 text-madie-ink/60">
                {language === "fr" ? "Suivez-nous" : "Follow us"}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[17px]">
                <a
                  href="https://www.instagram.com/claudine_eyram/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-madie-ink/30 underline-offset-4 transition-colors hover:text-madie-rose"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/34603861349"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-madie-ink/30 underline-offset-4 transition-colors hover:text-madie-rose"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
