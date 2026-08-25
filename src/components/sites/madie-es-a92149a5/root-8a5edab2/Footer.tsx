"use client";

import { useRef } from "react";

import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useGSAP(
    () => {
      const footer = footerRef.current;

      if (!footer) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-footer-logo]", {
          autoAlpha: 0,
          duration: 0.7,
          ease: MOTION.easeOut,
          y: 8,
          scrollTrigger: {
            once: true,
            start: "top 82%",
            trigger: footer,
          },
        });
        gsap.from("[data-footer-meta]", {
          autoAlpha: 0,
          duration: 0.56,
          ease: MOTION.easeOut,
          y: 8,
          scrollTrigger: {
            once: true,
            start: "top 70%",
            trigger: footer,
          },
        });
      });

      return () => media.revert();
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} id="site-footer" className="madie-footer-stripes min-h-[337.5px] border-t border-madie-ink/20 px-6 text-madie-ink lg:h-[337.5px]">
      <div className="mx-auto flex min-h-[337.5px] max-w-[1200px] flex-col lg:h-full">
        <div className="flex flex-1 items-center justify-center py-10">
          <p data-footer-logo className="madie-hand text-[64px] leading-none text-madie-burgundy-dark">
            Le Petit Bleu
          </p>
        </div>

        <div data-footer-meta className="madie-eyebrow flex min-h-[73px] flex-col items-center justify-center gap-3 border-t border-madie-ink/25 py-6 text-center md:flex-row md:justify-between md:py-0 md:text-left">
          <p>{language === "fr" ? "© 2026 Le Petit Bleu — Tous droits réservés" : "© 2026 Le Petit Bleu — All rights reserved"}</p>

            <nav aria-label={language === "fr" ? "Liens légaux" : "Legal links"}>
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="/privacidad"
                  className="text-madie-ink/75 transition-colors duration-150 hover:text-madie-burgundy-dark focus-visible:text-madie-burgundy-dark"
                >
                  {language === "fr" ? "Confidentialité" : "Privacy"}
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-madie-ink/75 transition-colors duration-150 hover:text-madie-burgundy-dark focus-visible:text-madie-burgundy-dark"
                >
                  {language === "fr" ? "Mentions légales" : "Legal notice"}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
