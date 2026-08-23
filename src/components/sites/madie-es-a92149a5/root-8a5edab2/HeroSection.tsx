import { ArrowRightIcon } from "../shared/icons";

function HeroAction({
  detail,
  href,
  label,
}: {
  detail: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <a
        className="group inline-flex h-11 items-center gap-3 rounded-full bg-[#07515B] px-6 font-heading text-[12px] leading-none font-bold tracking-[0.1em] text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:gap-4 hover:bg-[#13A7B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07515B]"
        href={href}
      >
        <span>{label}</span>
        <ArrowRightIcon className="size-4 shrink-0" />
      </a>
      <p className="mt-3 font-sans text-[16px] leading-[1.15] text-[#07515B]/80">
        {detail}
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[720px] overflow-hidden bg-white/55 backdrop-blur-[48px] sm:min-h-[760px] lg:min-h-[820px]"
      id="inicio"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(222,248,249,0.58)_45%,rgba(19,167,178,0.16))]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-48 right-[8%] -z-10 size-[620px] rounded-full bg-[#13A7B2]/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 left-[28%] -z-10 size-[540px] rounded-full bg-white/90 blur-[100px]"
      />

      <div className="relative flex min-h-[720px] items-end px-6 pt-32 pb-12 sm:min-h-[760px] sm:px-10 sm:pt-36 sm:pb-14 lg:min-h-[820px] lg:px-16 lg:pt-40 lg:pb-20">
        <div className="max-w-[690px] text-left text-[#07515B]">
          <h1 className="max-w-[620px] font-heading text-[44px] leading-[0.97] font-bold tracking-[-0.02em] sm:text-[62px] lg:text-[78px]">
            Une donuterie artisanale à Madrid
          </h1>

          <p className="mt-5 max-w-[540px] font-sans text-[18px] leading-[1.32] text-[#07515B]/85 sm:mt-6 sm:text-[21px]">
            Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité.
          </p>

          <div className="mt-9 flex flex-col gap-7 sm:mt-11 sm:flex-row sm:gap-12">
            <HeroAction
              detail="Retrait local et livraison"
              href="#menu"
              label="Commander en ligne"
            />
            <HeroAction
              detail="Pour vos moments gourmands"
              href="#catering"
              label="Événements"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
