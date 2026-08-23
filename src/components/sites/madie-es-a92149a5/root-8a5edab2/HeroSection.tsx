import { ArrowRightIcon } from "../shared/icons";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.8 12.23c0-.71-.06-1.23-.2-1.78H12v3.48h5.64a5.06 5.06 0 0 1-2.09 3.2l-.02.12 3.04 2.36.21.02c1.93-1.79 3.02-4.42 3.02-7.4Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.78-2.47l-3.23-2.5c-.86.59-2.03 1-3.55 1-2.66 0-4.92-1.8-5.73-4.28l-.11.01-3.16 2.44-.04.11A10.24 10.24 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.27 13.75A6.22 6.22 0 0 1 5.94 12c0-.61.11-1.2.31-1.75v-.12L3.05 7.65l-.1.05A10.12 10.12 0 0 0 1.8 12c0 1.55.4 3.02 1.16 4.3l3.31-2.55Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.97c1.92 0 3.22.83 3.97 1.52l2.88-2.81A9.72 9.72 0 0 0 12 2a10.24 10.24 0 0 0-9.04 5.7l3.29 2.55C7.08 7.77 9.34 5.97 12 5.97Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function RatingRow() {
  return (
    <div
      aria-label="Valoración de Google: 5,0 de 5, basada en 83 reseñas"
      className="flex h-[18px] items-center gap-2 [font-family:var(--font-inter),system-ui,sans-serif] text-[12px] font-semibold leading-none text-[#F3FAF8]"
    >
      <GoogleMark />
      <span aria-hidden="true" className="tracking-[1.4px] text-[#fbbc04]">
        ★★★★★
      </span>
      <span>5,0</span>
      <span className="hidden text-[#F3FAF8]/70 sm:inline">83 reseñas</span>
    </div>
  );
}

function LanguagePills() {
  return (
    <nav
      aria-label="Seleccionar idioma"
      className="absolute top-5 right-5 z-20 flex h-9 items-center rounded-full border border-[#F3FAF8]/20 bg-[#041D22]/30 p-1 backdrop-blur-[2px] sm:top-7 sm:right-7 lg:top-12 lg:right-12"
    >
      <a
        aria-current="page"
        className="flex h-7 min-w-10 items-center justify-center rounded-full bg-[#F3FAF8] px-3 [font-family:var(--font-inter),system-ui,sans-serif] text-[10px] font-semibold tracking-[0.16em] text-[#13A7B2] uppercase"
        href="#inicio"
      >
        ES
      </a>
      <a
        className="flex h-7 min-w-10 items-center justify-center rounded-full px-3 [font-family:var(--font-inter),system-ui,sans-serif] text-[10px] font-semibold tracking-[0.16em] text-[#F3FAF8]/70 uppercase transition-colors duration-150 hover:text-[#F3FAF8] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F3FAF8]/70"
        href="#inicio"
        lang="en"
      >
        EN
      </a>
      <a
        className="flex h-7 min-w-10 items-center justify-center rounded-full px-3 [font-family:var(--font-inter),system-ui,sans-serif] text-[10px] font-semibold tracking-[0.16em] text-[#F3FAF8]/70 uppercase transition-colors duration-150 hover:text-[#F3FAF8] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F3FAF8]/70"
        href="#inicio"
        lang="fr"
      >
        FR
      </a>
    </nav>
  );
}

function ScrollCue() {
  return (
    <a
      aria-label="Sobre el café"
      className="group absolute right-12 bottom-12 z-20 hidden size-[140px] items-center justify-center rounded-full border border-[#F3FAF8]/30 text-[#F3FAF8] transition-transform duration-700 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3FAF8] lg:flex motion-reduce:transition-none"
      href="#story"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full [animation:madie-spin_22s_linear_infinite] motion-reduce:animate-none"
        viewBox="0 0 140 140"
      >
        <defs>
          <path
            d="M70 13a57 57 0 1 1 0 114 57 57 0 1 1 0-114"
            id="hero-scroll-circle"
          />
        </defs>
        <text
          fill="currentColor"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="2.1"
        >
          <textPath href="#hero-scroll-circle">
            SOBRE EL CAFÉ · SOBRE EL CAFÉ · SOBRE EL CAFÉ ·
          </textPath>
        </text>
      </svg>
      <ArrowRightIcon className="size-8 [animation:madie-scroll-nudge_1.3s_ease-in-out_infinite] motion-reduce:animate-none" />
    </a>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative h-[100svh] bg-white sm:min-h-[720px]"
      id="inicio"
    >
      <div className="absolute inset-2 overflow-hidden rounded-[20px] bg-[#07515B] lg:inset-5 lg:rounded-[28px]">
        <picture className="absolute inset-0 block size-full">
          <source
            media="(min-width: 640px)"
            srcSet={`${assetRoot}/17ca35115ce152ea.jpg`}
          />
          <img
            alt=""
            className="size-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
            src={`${assetRoot}/9163e53a5bad6b60.jpg`}
          />
        </picture>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,0,5,0.55)_0%,rgba(20,0,8,0.25)_30%,rgba(35,0,12,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[#05272D]/10" />

        <LanguagePills />

        <div className="absolute right-6 bottom-[136px] left-6 z-10 text-[#F3FAF8] sm:right-10 sm:bottom-[184px] sm:left-10 lg:right-12 lg:bottom-[207px] lg:left-12">
          <RatingRow />

          <h1 className="mt-[52px] max-w-[320px] font-heading text-[36px] leading-[43.2px] font-bold tracking-[0.01em] uppercase sm:mt-10 sm:max-w-[640px] sm:text-[48px] sm:leading-[57.6px] lg:max-w-[768px] lg:text-[60px] lg:leading-[72px]">
            <span className="madie-text-stroke block text-[#F3FAF8]">
              Madeleines francesas.
            </span>
            <span className="block text-[#F3FAF8]">Mañanas de Madrid.</span>
          </h1>

          <p className="mt-4 max-w-[320px] text-[16px] leading-[24px] text-[#F3FAF8]/80 sm:mt-6 sm:max-w-[576px] lg:text-[16.8px] lg:leading-[25.2px]">
            <span className="sm:hidden">
              Nuevo en <strong>Chamberí.</strong> Madeleines horneadas cada día,
              maridadas con cafés de especialidad — un sabor nuevo cada semana,
              los clásicos de siempre y caprichos para los peludos.
            </span>
            <span className="hidden sm:inline">
              Algo nuevo se hornea en Chamberí. Madeleines recién horneadas cada
              día, maridadas con cafés de especialidad. Un sabor nuevo cada
              semana, los clásicos de siempre y un pequeño capricho para los
              peludos.
            </span>
          </p>
        </div>

        <a
          className="group absolute bottom-[38px] left-6 z-20 inline-flex h-[46.72px] items-center gap-3 rounded-full bg-[#FF8B6A] px-7 py-3.5 font-heading text-[12.48px] leading-[18.72px] font-bold tracking-[1.248px] text-[#07515B] uppercase transition-all duration-150 hover:-translate-y-0.5 hover:gap-4 hover:bg-[#F3FAF8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3FAF8] sm:bottom-12 sm:left-10 lg:left-12 motion-reduce:transform-none"
          href="#menu"
        >
          <span>Encuentra tu favorita</span>
          <ArrowRightIcon className="size-5 shrink-0" />
        </a>

        <ScrollCue />
      </div>
    </section>
  );
}
