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
    label: "Carta",
    href: "#menu",
    image: `${assetRoot}/64b30c39412940e3.jpg`,
    caption: "Recién horneado cada mañana",
  },
  {
    label: "Catering",
    href: "#catering",
    image: `${assetRoot}/5a5fb6ad0c2dff8f.jpg`,
    caption: "Una mesa hecha para compartir",
  },
  {
    label: "Visítanos",
    href: "#contacto",
    image: `${assetRoot}/de2e0b19d937fb62.jpg`,
    caption: "Te esperamos en Chamberí",
  },
] as const;

type MenuItem = (typeof menuItems)[number];

const languages = ["ES", "EN", "FR"] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#inicio");

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
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
        behavior: "smooth",
        block: "start",
      });
    }, 1100);
  };

  const controlColor = isOpen || !isPastHero
    ? "text-madie-cream"
    : "text-madie-burgundy";

  return (
    <>
      <header className="pointer-events-none fixed top-7 left-5 z-[60] w-1/2 sm:left-7 lg:top-12">
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            type="button"
            className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-[color,background-color,transform] duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none ${controlColor} ${
              isOpen
                ? "bg-madie-burgundy-dark/30"
                : "bg-madie-cream/10 backdrop-blur-[2px]"
            }`}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="madie-menu-overlay"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? (
              <CloseIcon className="size-7" />
            ) : (
              <MenuIcon className="size-7" />
            )}
          </button>

          <Image
            src={`${assetRoot}/4bc97f9a582e1ac1.png`}
            alt="Madie"
            width={94}
            height={32}
            preload
            className={`h-8 w-[93.7px] object-contain transition-[filter] duration-300 ${
              isOpen || !isPastHero ? "brightness-0 invert" : ""
            }`}
          />
        </div>
      </header>

      <div
        id="madie-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[linear-gradient(135deg,rgba(19,167,178,0.95),rgba(7,81,91,0.95))] text-madie-cream backdrop-blur-[3px] transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.83,0,.17,1)] ${
          isOpen
            ? "pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="madie-grain" aria-hidden="true" />

        <div className="absolute top-7 right-6 z-10 flex h-10 items-center rounded-full border border-madie-cream/20 p-1 madie-eyebrow lg:top-12 lg:right-12">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className={`flex h-8 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-madie-cream ${
                language === "ES"
                  ? "bg-madie-cream text-madie-burgundy"
                  : "text-madie-cream/60 hover:text-madie-cream"
              }`}
              aria-current={language === "ES" ? "true" : undefined}
              aria-label={`Cambiar idioma a ${language}`}
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
                Navegar
              </p>

              <nav aria-label="Navegación principal">
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
                    Contacto
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
                    Encuéntranos
                  </p>
                  <address className="not-italic">
                    C/ de Donoso Cortés, 62, Chamberí,
                    <br />
                    28015 Madrid
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
                    Horario
                  </p>
                  <p>
                    Lun · 11:00–20:30
                    <br />
                    Mar–Jue · Cerrado
                    <br />
                    Vie · 13:00–20:30
                    <br />
                    Sáb · 17:00–20:30
                    <br />
                    Dom · 13:30–20:30
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
            Site by RyanMac
          </a>
        </div>
      </div>
    </>
  );
}
