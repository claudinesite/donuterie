"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  CloseIcon,
  MenuIcon,
} from "@/components/sites/madie-es-a92149a5/shared/icons";

import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";
const menuImage = `${assetRoot}/menu-cafe-interior.png`;

const menuItems = [
  {
    key: "menu",
    href: "#menu",
    fr: { label: "Menu", caption: "Préparé chaque matin" },
    en: { label: "Menu", caption: "Prepared every morning" },
  },
  {
    key: "events",
    href: "#catering",
    fr: { label: "Événements", caption: "Une table pensée pour partager" },
    en: { label: "Events", caption: "A table made for sharing" },
  },
  {
    key: "find-us",
    href: "#contacto",
    fr: { label: "Nous trouver", caption: "On t’attend à Moncton" },
    en: { label: "Find us", caption: "Waiting for you in Moncton" },
  },
] as const;

type MenuItem = (typeof menuItems)[number];

const languages = [
  { code: "FR", value: "fr" },
  { code: "EN", value: "en" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemKey, setActiveItemKey] = useState<MenuItem["key"]>(menuItems[0].key);
  const [isLightSection, setIsLightSection] = useState(false);
  const { language, setLanguage } = useLanguage();
  const localizedMenuItems = menuItems.map((item) => ({
    ...item,
    ...item[language],
  }));
  const headerRef = useRef<HTMLElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: MOTION.easeOut } })
          .from("[data-header-logo]", { autoAlpha: 0, duration: 0.52, y: -8 })
          .from("[data-header-language]", { autoAlpha: 0, duration: 0.42, y: -6 }, 0.08)
          .from("[data-header-menu]", { autoAlpha: 0, duration: 0.42, y: -6 }, 0.14);
      });

      return () => media.revert();
    },
    { scope: headerRef },
  );

  useEffect(() => {
    const darkSectionIds = new Set(["inicio", "catering"]);
    const sectionIds = ["inicio", "story", "menu", "catering", "instagram", "contacto", "site-footer"];
    let frame: number | null = null;

    const updateHeaderTone = () => {
      frame = null;
      const probeY = 36;
      const activeSection = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom > probeY;
        })
        .at(-1);

      setIsLightSection(activeSection ? !darkSectionIds.has(activeSection.id) : true);
    };

    const scheduleHeaderToneUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(updateHeaderTone);
    };

    updateHeaderTone();
    window.addEventListener("scroll", scheduleHeaderToneUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeaderToneUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleHeaderToneUpdate);
      window.removeEventListener("resize", scheduleHeaderToneUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleMenuLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: MenuItem["href"],
  ) => {
    event.preventDefault();
    setIsOpen(false);

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = setTimeout(() => {
      document.querySelector<HTMLElement>(href)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }, 1100);
  };

  const useLightHeader = isLightSection && !isOpen;

  return (
    <>
      <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-5 pt-4 sm:px-7 sm:pt-5 lg:px-10 lg:pt-6">
        <div className="relative h-[42px] sm:h-[48px]">
          <a
            data-header-logo
            aria-label="Le Petit Bleu — accueil"
            className={`madie-hand pointer-events-auto absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-[18px] leading-none transition-[color,opacity] duration-300 hover:opacity-75 sm:text-[21px] lg:text-[24px] ${useLightHeader ? "text-madie-ink" : "text-white"}`}
            href="#inicio"
          >
            Le petit bleu
          </a>

          <div data-header-menu className="pointer-events-auto absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              className={`flex h-8 w-9 cursor-pointer items-center justify-center transition-[color,opacity] duration-300 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 ${useLightHeader ? "text-madie-ink focus-visible:outline-madie-ink" : "text-white focus-visible:outline-white"}`}
              aria-label={isOpen
                ? language === "fr" ? "Fermer le menu" : "Close menu"
                : language === "fr" ? "Ouvrir le menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="madie-menu-overlay"
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>

          <div data-header-language className="pointer-events-auto absolute inset-y-0 right-12 flex items-center sm:right-20">
            <div className={`flex items-center gap-0.5 rounded-full border p-0.5 transition-colors duration-300 ${useLightHeader ? "border-madie-ink/25" : "border-white/35"}`}>
              {languages.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`flex h-7 min-w-8 cursor-pointer items-center justify-center rounded-full px-2 font-sans text-[10px] font-semibold tracking-[0.08em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    language === option.value
                      ? useLightHeader
                        ? "bg-madie-burgundy text-white"
                        : "bg-white text-madie-burgundy"
                      : useLightHeader
                        ? "text-madie-ink/70 hover:bg-madie-burgundy/10 hover:text-madie-ink"
                        : "text-white/75 hover:bg-white/15 hover:text-white"
                  }`}
                  aria-current={language === option.value ? "true" : undefined}
                  aria-label={`Changer la langue vers ${option.code}`}
                  onClick={() => setLanguage(option.value)}
                >
                  {option.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div
        id="madie-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={language === "fr" ? "Menu principal" : "Main menu"}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[linear-gradient(135deg,rgba(19,167,178,0.95),rgba(7,81,91,0.95))] text-madie-cream backdrop-blur-[3px] transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.83,0,.17,1)] ${
          isOpen
            ? "pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="madie-grain" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-full w-full max-w-[824px] items-center px-6 pt-32 pb-24 lg:px-0 lg:pt-28 lg:pb-20">
          <div className="grid w-full grid-cols-1 lg:grid-cols-[374px_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="relative hidden h-[500px] w-[374px] overflow-hidden rounded-[18px] lg:block">
              <Image
                src={menuImage}
                alt={language === "fr" ? "Intérieur de la donuterie Le Petit Bleu" : "Inside Le Petit Bleu donut shop"}
                fill
                sizes="374px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-madie-burgundy-dark/90 via-transparent to-transparent"
                aria-hidden="true"
              />
              {localizedMenuItems.map((item) => (
                <p
                  key={item.caption}
                  className={`madie-eyebrow absolute right-7 bottom-7 left-7 text-madie-cream/70 transition-opacity duration-300 ${
                    activeItemKey === item.key
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {item.caption}
                </p>
              ))}
            </div>

            <div className="min-w-0">
              <p className="madie-eyebrow mb-8 flex items-center gap-4 text-madie-cream/45 before:h-px before:w-7 before:bg-current before:content-['']">
                Navigation
              </p>

              <nav aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>
                <ul className="flex flex-col">
                  {localizedMenuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="madie-display block w-fit text-[36px] leading-[0.95] font-bold tracking-[0.01em] text-madie-cream uppercase transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madie-cream sm:text-5xl lg:text-[72px]"
                        onMouseEnter={() => setActiveItemKey(item.key)}
                        onFocus={() => setActiveItemKey(item.key)}
                        onClick={(event) => handleMenuLink(event, item.href)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 grid grid-cols-1 gap-8 text-[15px] leading-[1.55] text-madie-cream/75 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-[140px_1fr] lg:gap-9">
                <div className="hidden lg:block">
                  <p className="madie-eyebrow mb-4 text-madie-cream/45">
                    Contact
                  </p>
                  <div className="flex flex-col items-start gap-1.5">
                    <a
                      href="https://www.instagram.com/claudine_eyram/"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-madie-cream"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://wa.me/34603861349"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-200 hover:text-madie-cream"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="mailto:info@lepetitbleu.com"
                      className="transition-colors duration-200 hover:text-madie-cream"
                    >
                      Email
                    </a>
                  </div>
                </div>

                <div>
                  <p className="madie-eyebrow mb-4 text-madie-cream/45">
                    {language === "fr" ? "Nous trouver" : "Find us"}
                  </p>
                  <address className="not-italic">
                    Moncton,
                    <br />
                    {language === "fr" ? "Nouveau-Brunswick, Canada" : "New Brunswick, Canada"}
                  </address>
                  <a
                    href="tel:+34603861349"
                    className="mt-2 inline-block transition-colors duration-200 hover:text-madie-cream"
                  >
                    +34 603 861 349
                  </a>
                </div>

                <div className="sm:col-start-2 lg:col-start-2">
                  <p className="madie-eyebrow mb-4 text-madie-cream/45">
                    {language === "fr" ? "Horaires" : "Hours"}
                  </p>
                  <p>
                    {language === "fr" ? "Lun. · 11 h 00 – 20 h 30" : "Mon. · 11:00 am – 8:30 pm"}
                    <br />
                    {language === "fr" ? "Mar.–Jeu. · fermé" : "Tue.–Thu. · closed"}
                    <br />
                    {language === "fr" ? "Ven. · 13 h 00 – 20 h 30" : "Fri. · 1:00 pm – 8:30 pm"}
                    <br />
                    {language === "fr" ? "Sam. · 17 h 00 – 20 h 30" : "Sat. · 5:00 pm – 8:30 pm"}
                    <br />
                    {language === "fr" ? "Dim. · 13 h 30 – 20 h 30" : "Sun. · 1:30 pm – 8:30 pm"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden h-[58px] items-center justify-end border-t border-madie-cream/10 px-12 lg:flex">
          <a
            href="https://ryanmac.com"
            target="_blank"
            rel="noreferrer"
            className="madie-eyebrow text-madie-cream/45 transition-colors duration-200 hover:text-madie-cream"
          >
            Site par RyanMac
          </a>
        </div>
      </div>
    </>
  );
}
