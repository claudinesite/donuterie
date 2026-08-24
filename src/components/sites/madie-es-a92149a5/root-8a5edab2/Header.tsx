"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  CloseIcon,
  MenuIcon,
} from "@/components/sites/madie-es-a92149a5/shared/icons";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

const menuItems = [
  {
    label: "Menu",
    href: "#menu",
    image: `${assetRoot}/64b30c39412940e3.jpg`,
    caption: "Préparé chaque matin",
  },
  {
    label: "Événements",
    href: "#catering",
    image: `${assetRoot}/5a5fb6ad0c2dff8f.jpg`,
    caption: "Une table pensée pour partager",
  },
  {
    label: "Nous trouver",
    href: "#contacto",
    image: `${assetRoot}/de2e0b19d937fb62.jpg`,
    caption: "On t’attend à Moncton",
  },
] as const;

type MenuItem = (typeof menuItems)[number];

const languages = ["FR", "EN"] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        behavior: "smooth",
        block: "start",
      });
    }, 1100);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-5 pt-4 sm:px-7 sm:pt-5 lg:px-10 lg:pt-6">
        <div className="relative h-[42px] sm:h-[48px]">
          <a
            aria-label="Le Petit Bleu — accueil"
            className="madie-hand pointer-events-auto absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-[18px] leading-none text-white transition-opacity duration-200 hover:opacity-75 sm:text-[21px] lg:text-[24px]"
            href="#inicio"
          >
            Le petit bleu
          </a>

          <div className="pointer-events-auto absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              className="flex h-8 w-9 cursor-pointer items-center justify-center text-white transition-opacity duration-200 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="madie-menu-overlay"
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>

          <div className="pointer-events-auto absolute inset-y-0 right-16 hidden items-center sm:flex sm:right-20">
            <a
              className="font-sans text-[11px] font-semibold tracking-[0.04em] text-white uppercase transition-opacity duration-200 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="#menu"
            >
              Commander
            </a>
          </div>
        </div>
      </header>

      <div
        id="madie-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[linear-gradient(135deg,rgba(19,167,178,0.95),rgba(7,81,91,0.95))] text-madie-cream backdrop-blur-[3px] transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.83,0,.17,1)] ${
          isOpen
            ? "pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="madie-grain" aria-hidden="true" />

        <div className="absolute top-24 left-6 z-10 flex h-10 items-center rounded-full border border-madie-cream/20 p-1 madie-eyebrow sm:left-9 lg:top-28 lg:left-12">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className={`flex h-8 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-madie-cream ${
                language === "FR"
                  ? "bg-madie-cream text-madie-burgundy"
                  : "text-madie-cream/60 hover:text-madie-cream"
              }`}
              aria-current={language === "FR" ? "true" : undefined}
              aria-label={`Changer la langue vers ${language}`}
            >
              {language}
            </button>
          ))}
        </div>

        <div className="relative mx-auto flex min-h-full w-full max-w-[824px] items-center px-6 pt-32 pb-24 lg:px-0 lg:pt-28 lg:pb-20">
          <div className="grid w-full grid-cols-1 lg:grid-cols-[374px_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="relative hidden h-[500px] w-[374px] overflow-hidden rounded-[18px] lg:block">
              {menuItems.map((item) => (
                <Image
                  key={item.label}
                  src={item.image}
                  alt=""
                  fill
                  sizes="374px"
                  className={`object-cover transition-[opacity,transform] duration-500 ease-out ${
                    activeItem.label === item.label
                      ? "scale-100 opacity-100"
                      : "scale-[1.03] opacity-0"
                  }`}
                />
              ))}
              <div
                className="absolute inset-0 bg-gradient-to-t from-madie-burgundy-dark/90 via-transparent to-transparent"
                aria-hidden="true"
              />
              {menuItems.map((item) => (
                <p
                  key={item.caption}
                  className={`madie-eyebrow absolute right-7 bottom-7 left-7 text-madie-cream/70 transition-opacity duration-300 ${
                    activeItem.label === item.label
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

              <nav aria-label="Navigation principale">
                <ul className="flex flex-col">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="madie-display block w-fit text-[36px] leading-[0.95] font-bold tracking-[0.01em] text-madie-cream uppercase transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madie-cream sm:text-5xl lg:text-[72px]"
                        onMouseEnter={() => setActiveItem(item)}
                        onFocus={() => setActiveItem(item)}
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
                      href="https://www.instagram.com/madie.madrid"
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
                      href="mailto:info@madie.es"
                      className="transition-colors duration-200 hover:text-madie-cream"
                    >
                      Email
                    </a>
                  </div>
                </div>

                <div>
                  <p className="madie-eyebrow mb-4 text-madie-cream/45">
                    Nous trouver
                  </p>
                  <address className="not-italic">
                    Moncton,
                    <br />
                    Nouveau-Brunswick, Canada
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
                    Horaires
                  </p>
                  <p>
                    Lun. · 11 h 00 – 20 h 30
                    <br />
                    Mar.–Jeu. · fermé
                    <br />
                    Ven. · 13 h 00 – 20 h 30
                    <br />
                    Sam. · 17 h 00 – 20 h 30
                    <br />
                    Dim. · 13 h 30 – 20 h 30
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
