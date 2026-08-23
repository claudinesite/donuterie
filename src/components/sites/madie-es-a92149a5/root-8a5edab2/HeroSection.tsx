import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon } from "../shared/icons";

const donutStack =
  "/sites/madie-es-a92149a5/root-8a5edab2/assets/le-petit-bleu-donut-stack.png";

function HeroPagination() {
  return (
    <div className="absolute bottom-7 left-6 z-30 flex items-center gap-3 text-white sm:left-9 lg:bottom-10 lg:left-12">
      <button
        aria-label="Donut précédent"
        className="flex size-9 items-center justify-center rounded-full bg-[#087F89]/55 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#13A7B2] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        type="button"
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <button
        aria-label="Donut suivant"
        className="flex size-9 items-center justify-center rounded-full bg-[#087F89]/55 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#13A7B2] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        type="button"
      >
        <ArrowRightIcon className="size-4" />
      </button>
      <p className="ml-2 flex items-baseline [font-family:var(--font-inter),system-ui,sans-serif] font-bold">
        <span className="text-[15px]">02</span>
        <span className="ml-1 text-[25px] leading-none text-white/14">03</span>
      </p>
    </div>
  );
}

function RecipeCard() {
  return (
    <aside className="absolute right-0 bottom-6 z-30 hidden w-[190px] rounded-l-[16px] bg-[#087F89]/60 p-3 text-white shadow-[0_18px_45px_rgba(4,71,77,0.16)] backdrop-blur-md sm:block lg:bottom-8 lg:w-[225px] lg:p-5">
      <p className="[font-family:var(--font-inter),system-ui,sans-serif] text-[9px] font-medium tracking-[0.04em] text-white/60 uppercase">
        La recette du jour
      </p>
      <h2 className="mt-1.5 [font-family:var(--font-inter),system-ui,sans-serif] text-[14px] leading-none font-bold lg:text-[16px]">
        Donut caramel
      </h2>
      <a
        className="mt-3.5 flex items-center justify-between [font-family:var(--font-inter),system-ui,sans-serif] text-[9px] font-semibold text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-[10px]"
        href="#menu"
      >
        <span>Découvrir la recette</span>
        <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#13A7B2] lg:size-8">
          <span className="ml-0.5 block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-[#13A7B2]" />
        </span>
      </a>
    </aside>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-[#13A7B2] text-white"
      id="inicio"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-0 aspect-square w-[min(33vw,500px)] min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B8690]/55"
      />
      <div
        aria-hidden="true"
        className="madie-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
      />

      <h1 className="absolute top-1/2 left-1/2 z-10 hidden w-[72%] -translate-x-1/2 -translate-y-1/2 items-center justify-between [font-family:var(--font-inter),system-ui,sans-serif] text-[clamp(52px,6vw,94px)] leading-none font-bold tracking-[-0.055em] sm:flex">
        <span>Caramel</span>
        <span className="-translate-x-7">Donuts</span>
      </h1>

      <h1 className="pointer-events-none absolute inset-x-5 top-28 bottom-36 z-30 flex flex-col justify-between [font-family:var(--font-inter),system-ui,sans-serif] text-[44px] leading-[0.9] font-bold tracking-[-0.055em] sm:hidden">
        <span className="self-start">Caramel</span>
        <span className="self-end">Donuts</span>
      </h1>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center">
        <Image
          alt="Pile verticale de donuts artisanaux au caramel et au chocolat"
          className="h-[70%] w-auto max-w-none object-contain drop-shadow-[0_26px_28px_rgba(4,72,77,0.24)] sm:h-[82%]"
          height={1672}
          priority
          sizes="(max-width: 639px) 66vw, 34vw"
          src={donutStack}
          width={941}
        />
      </div>

      <HeroPagination />
      <RecipeCard />
    </section>
  );
}
