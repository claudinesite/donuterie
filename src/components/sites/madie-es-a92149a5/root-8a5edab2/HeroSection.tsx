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
      className="relative min-h-[720px] overflow-hidden bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_80px,#13A7B2_80px,#13A7B2_160px)] p-2 sm:min-h-[760px] sm:p-4 lg:min-h-[820px] lg:p-5"
      id="inicio"
    >
      <div className="relative min-h-[704px] overflow-hidden rounded-[18px] border border-white/60 bg-white/[0.32] shadow-[0_20px_55px_rgba(7,81,91,0.16)] backdrop-blur-2xl sm:min-h-[728px] sm:rounded-[24px] lg:min-h-[780px] lg:rounded-[28px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32),rgba(255,255,255,0.06)_52%,rgba(19,167,178,0.12))]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 size-[440px] rounded-full bg-white/20 blur-3xl"
        />

        <div className="relative flex min-h-[704px] items-end px-6 pt-32 pb-10 sm:min-h-[728px] sm:px-10 sm:pt-36 sm:pb-12 lg:min-h-[780px] lg:px-12 lg:pt-40 lg:pb-[72px]">
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
      </div>
    </section>
  );
}
