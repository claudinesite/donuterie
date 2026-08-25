"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowRightIcon } from "../shared/icons";
import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

const hangingDonut =
  "/sites/madie-es-a92149a5/root-8a5edab2/assets/hanging-blue-donut-long-rope.png";

function HeroLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="group inline-flex h-11 items-center gap-3 border-b border-white/70 font-heading text-[12px] leading-none font-bold tracking-[0.12em] text-white uppercase transition-[gap,border-color,opacity] duration-200 hover:gap-5 hover:border-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      href={href}
    >
      <span>{label}</span>
      <ArrowRightIcon className="size-4 shrink-0" />
    </a>
  );
}

export function HeroTicker() {
  const { language } = useLanguage();
  const tickerItems = language === "fr"
    ? ["Donuts artisanaux", "Café de spécialité", "Préparés chaque jour", "Moncton"]
    : ["Handmade donuts", "Specialty coffee", "Fresh every day", "Moncton"];

  return (
    <div className="relative z-20 flex h-12 items-center overflow-hidden bg-[#07515B] text-white">
      <div className="flex min-w-max [animation:madie-marquee_24s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
            key={copy}
          >
            {tickerItems.map((item) => (
              <span
                className="flex shrink-0 items-center gap-6 px-6 font-heading text-[13px] font-bold tracking-[0.11em] uppercase sm:px-8 sm:text-[14px]"
                key={`${copy}-${item}`}
              >
                {item}
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#13A7B2]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const donutMotionRef = useRef<HTMLDivElement>(null);
  const donutPointerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const donutMotion = donutMotionRef.current;
      const donutPointer = donutPointerRef.current;

      if (!hero || !donutMotion || !donutPointer) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const desktop = context.conditions?.desktop ?? false;
          const reducedMotion = context.conditions?.reducedMotion ?? false;

          if (reducedMotion) {
            return;
          }

          const timeline = gsap.timeline({
            defaults: { ease: MOTION.easeOut },
          });
          const swingRotation = desktop ? 5.2 : 3.4;
          const swingOffset = desktop ? 7 : 4;
          const idleDonut = gsap.timeline({
            defaults: { ease: MOTION.easeOrganic },
            paused: true,
            repeat: -1,
          });

          gsap.set(donutMotion, { transformOrigin: "50% 0%" });
          idleDonut
            .to(donutMotion, {
              duration: 1.15,
              rotation: -swingRotation,
              y: -swingOffset / 2,
            })
            .to(donutMotion, {
              duration: desktop ? 2.45 : 2.2,
              rotation: swingRotation,
              y: swingOffset,
            })
            .to(donutMotion, {
              duration: desktop ? 2.45 : 2.2,
              rotation: -swingRotation,
              y: -swingOffset / 2,
            });

          timeline
            .from("[data-hero-donut]", {
              autoAlpha: 0,
              duration: desktop ? 1.45 : 1.2,
              rotation: desktop ? -4 : -2,
              y: desktop ? -170 : -105,
            }, 0.1)
            .from("[data-hero-title-line]", {
              duration: 0.9,
              stagger: MOTION.staggerFast,
              yPercent: 105,
            }, 0.25)
            .from("[data-hero-copy]", {
              autoAlpha: 0,
              duration: 0.62,
              y: 16,
            }, 0.47)
            .from("[data-hero-cta]", {
              autoAlpha: 0,
              duration: 0.58,
              scale: 0.98,
              stagger: 0.08,
              y: 10,
            }, 0.67)
            .from("[data-hero-meta]", {
              autoAlpha: 0,
              duration: 0.5,
              y: 8,
            }, 0.82)
            .to(donutMotion, {
              duration: 0.45,
              rotation: -1,
            }, 1.02)
            .add(() => idleDonut.play());

          if (!desktop) {
            return;
          }

          const xTo = gsap.quickTo(donutPointer, "x", {
            duration: 0.7,
            ease: MOTION.easeOut,
          });
          const yTo = gsap.quickTo(donutPointer, "y", {
            duration: 0.7,
            ease: MOTION.easeOut,
          });
          const rotationTo = gsap.quickTo(donutPointer, "rotation", {
            duration: 0.7,
            ease: MOTION.easeOut,
          });
          const handlePointerMove = (event: PointerEvent) => {
            const bounds = hero.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;

            xTo(x);
            yTo(y);
            rotationTo(x / 6);
          };
          const resetPointer = () => {
            xTo(0);
            yTo(0);
            rotationTo(0);
          };

          hero.addEventListener("pointermove", handlePointerMove);
          hero.addEventListener("pointerleave", resetPointer);

          return () => {
            hero.removeEventListener("pointermove", handlePointerMove);
            hero.removeEventListener("pointerleave", resetPointer);
          };
        },
      );

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <section
      className="relative isolate min-h-[640px] overflow-hidden bg-[#13A7B2] text-white sm:min-h-[680px] lg:h-[82svh] lg:min-h-[620px] lg:max-h-[760px]"
      id="inicio"
      ref={heroRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_34%)]"
      />
      <div aria-hidden="true" className="madie-grain-ivory z-0" />
      <div aria-hidden="true" className="absolute top-[82px] right-10 left-10 z-10 hidden h-px bg-[#F4EAD8]/40 lg:block" />

      <div
        ref={donutMotionRef}
        data-hero-donut
        className="pointer-events-none absolute top-0 left-1/2 z-20 w-[180px] -translate-x-1/2 will-change-transform sm:w-[240px] lg:w-[clamp(330px,25vw,380px)]"
      >
        <div ref={donutPointerRef} className="will-change-transform">
        <Image
          alt="Donut artisanal bleu suspendu à une corde"
          className="h-auto w-full drop-shadow-[0_26px_30px_rgba(7,81,91,0.3)]"
          height={1756}
          priority
          sizes="(max-width: 639px) 250px, (max-width: 1023px) 300px, 25vw"
          src={hangingDonut}
          width={1024}
        />
        </div>
      </div>

      <div className="relative z-10 hidden h-full min-h-[620px] grid-cols-[minmax(0,1fr)_clamp(250px,21vw,320px)_minmax(0,1fr)] px-10 pt-20 pb-20 lg:grid xl:px-16">
        <div className="flex min-w-0 flex-col justify-center pr-10 xl:pr-16">
          <h1 className="ml-auto max-w-[560px] text-right font-heading text-[clamp(58px,5.6vw,88px)] leading-[0.94] font-bold tracking-[-0.035em] uppercase">
            <span className="block overflow-hidden">
              <span data-hero-title-line className="block will-change-transform">{language === "fr" ? "Une" : "A"}</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-title-line className="block will-change-transform">{language === "fr" ? "donuterie" : "donut shop"}</span>
            </span>
          </h1>

          <p data-hero-copy className="mt-8 ml-auto max-w-[34ch] text-right font-sans text-[16px] leading-[1.45] text-white/85">
            {language === "fr"
              ? "Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité."
              : "Handmade donuts every day, generous glazes and specialty coffee."}
          </p>
        </div>

        <div aria-hidden="true" />

        <div className="flex min-w-0 flex-col justify-center pl-10 xl:pl-16">
          <h1 className="max-w-[600px] font-heading text-[clamp(54px,5vw,84px)] leading-[0.94] font-bold tracking-[-0.035em] uppercase">
            <span className="block overflow-hidden">
              <span data-hero-title-line className="block will-change-transform">{language === "fr" ? "Artisanale" : "Handmade"}</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-title-line className="block will-change-transform">
                {language === "fr" ? "à Moncton" : "in Moncton"}
              </span>
            </span>
          </h1>

          <div data-hero-cta className="mt-8 flex flex-wrap items-start gap-x-7 gap-y-2">
            <HeroLink href="#menu" label={language === "fr" ? "Commander en ligne" : "Order online"} />
            <HeroLink href="#catering" label={language === "fr" ? "Événements" : "Events"} />
          </div>
        </div>
      </div>

      <div data-hero-meta className="pointer-events-none absolute right-10 bottom-[68px] left-10 z-10 hidden items-end justify-between border-t border-[#F4EAD8]/40 pt-3 font-sans text-[10px] leading-none tracking-[0.2em] text-white/70 uppercase lg:flex xl:right-16 xl:left-16">
        <span>Moncton · Nouveau-Brunswick</span>
        <span>{language === "fr" ? "Donuts artisanaux · Café de spécialité" : "Handmade donuts · Specialty coffee"}</span>
      </div>

      <div className="relative z-10 flex min-h-[640px] flex-col px-5 pt-[310px] pb-20 sm:min-h-[680px] sm:px-8 sm:pt-[410px] lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="font-heading text-[26px] leading-[0.9] font-bold tracking-[-0.025em] uppercase sm:text-[48px]">
            <span data-hero-title-line className="block will-change-transform">{language === "fr" ? "Une" : "A"}</span>
            <span data-hero-title-line className="block whitespace-nowrap will-change-transform">{language === "fr" ? "donuterie" : "donut shop"}</span>
          </h1>

          <h1 className="text-right font-heading text-[26px] leading-[0.9] font-bold tracking-[-0.025em] uppercase sm:text-[48px]">
            <span data-hero-title-line className="block whitespace-nowrap will-change-transform">{language === "fr" ? "Artisanale" : "Handmade"}</span>
            <span className="block whitespace-nowrap">{language === "fr" ? "à Moncton" : "in Moncton"}</span>
          </h1>
        </div>

        <div className="mt-auto pt-10">
          <p data-hero-copy className="max-w-[420px] font-sans text-[17px] leading-[1.3] text-white/85">
            {language === "fr"
              ? "Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité."
              : "Handmade donuts every day, generous glazes and specialty coffee."}
          </p>
          <div data-hero-cta className="mt-6 flex flex-wrap gap-3">
            <HeroLink href="#menu" label={language === "fr" ? "Commander" : "Order"} />
            <HeroLink href="#catering" label={language === "fr" ? "Événements" : "Events"} />
          </div>
        </div>
      </div>

    </section>
  );
}
