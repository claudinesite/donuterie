import Image from "next/image";

import { ArrowRightIcon } from "../shared/icons";

const hangingDonut =
  "/sites/madie-es-a92149a5/root-8a5edab2/assets/hanging-blue-donut-long-rope.png";

function HeroLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="group inline-flex h-11 items-center gap-3 rounded-full bg-[#07515B] px-6 font-heading text-[12px] leading-none font-bold tracking-[0.1em] text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:gap-4 hover:bg-white hover:text-[#07515B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      href={href}
    >
      <span>{label}</span>
      <ArrowRightIcon className="size-4 shrink-0" />
    </a>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[640px] overflow-hidden bg-[#13A7B2] text-white sm:min-h-[680px] lg:h-[82svh] lg:min-h-[620px] lg:max-h-[760px]"
      id="inicio"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_34%)]"
      />
      <div aria-hidden="true" className="madie-grain-ivory z-0" />

      <div className="pointer-events-none absolute top-0 left-1/2 z-20 w-[180px] -translate-x-1/2 sm:w-[240px] lg:w-[clamp(230px,20vw,300px)]">
        <Image
          alt="Donut artisanal bleu suspendu à une corde"
          className="h-auto w-full drop-shadow-[0_26px_30px_rgba(7,81,91,0.3)]"
          height={1756}
          priority
          sizes="(max-width: 639px) 250px, (max-width: 1023px) 300px, 23vw"
          src={hangingDonut}
          width={1024}
        />
      </div>

      <div className="relative z-10 hidden h-full min-h-[620px] grid-cols-[minmax(0,1fr)_clamp(250px,21vw,320px)_minmax(0,1fr)] px-10 pt-20 pb-20 lg:grid xl:px-16">
        <div className="flex min-w-0 flex-col justify-center pr-10 xl:pr-16">
          <h1 className="ml-auto max-w-[520px] text-right font-heading text-[clamp(48px,4.9vw,74px)] leading-[0.88] font-bold tracking-[-0.025em] uppercase">
            Une
            <br />
            donuterie
          </h1>

          <p className="mt-10 ml-auto max-w-[410px] text-right font-sans text-[18px] leading-[1.3] text-white/85">
            Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité.
          </p>
        </div>

        <div aria-hidden="true" />

        <div className="flex min-w-0 flex-col justify-center pl-10 xl:pl-16">
          <h1 className="max-w-[560px] font-heading text-[clamp(48px,4.9vw,74px)] leading-[0.88] font-bold tracking-[-0.025em] uppercase">
            Artisanale
            <br />
            à Moncton
          </h1>

          <div className="mt-10 flex flex-wrap items-start gap-4">
            <HeroLink href="#menu" label="Commander en ligne" />
            <HeroLink href="#catering" label="Événements" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-[640px] flex-col px-5 pt-[310px] pb-20 sm:min-h-[680px] sm:px-8 sm:pt-[410px] lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="font-heading text-[26px] leading-[0.9] font-bold tracking-[-0.025em] uppercase sm:text-[48px]">
            <span className="block">Une</span>
            <span className="block whitespace-nowrap">donuterie</span>
          </h1>

          <h1 className="text-right font-heading text-[26px] leading-[0.9] font-bold tracking-[-0.025em] uppercase sm:text-[48px]">
            <span className="block whitespace-nowrap">Artisanale</span>
            <span className="block whitespace-nowrap">à Moncton</span>
          </h1>
        </div>

        <div className="mt-auto pt-10">
          <p className="max-w-[420px] font-sans text-[17px] leading-[1.3] text-white/85">
            Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <HeroLink href="#menu" label="Commander" />
            <HeroLink href="#catering" label="Événements" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex h-12 items-center overflow-hidden bg-[#07515B] text-white">
        <div className="flex min-w-max [animation:madie-marquee_18s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
              key={copy}
            >
              {["Donuts artisanaux", "Café de spécialité", "Préparés chaque jour", "Moncton"].map((item) => (
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
    </section>
  );
}
