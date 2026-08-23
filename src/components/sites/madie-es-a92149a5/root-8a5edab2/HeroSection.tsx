import { ArrowRightIcon } from "../shared/icons";

function ActionBlock({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-sans text-[17px] leading-none font-bold tracking-[-0.02em] text-[#13A7B2] uppercase sm:text-[20px]">
        {label}
      </p>
      <p className="mt-2 font-heading text-[18px] leading-none text-[#13A7B2]/85 sm:text-[20px]">
        {detail}
      </p>
      <a
        className="group mt-5 inline-flex h-11 items-center gap-3 rounded-[5px] border border-[#13A7B2] bg-[#13A7B2] px-6 font-sans text-[13px] leading-none font-bold tracking-[0.03em] text-white transition-colors duration-200 hover:bg-white hover:text-[#13A7B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#13A7B2]"
        href={href}
      >
        <span>{label}</span>
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-[745px] overflow-hidden bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_82px,#13A7B2_82px,#13A7B2_124px)] px-4 pt-[122px] pb-14 text-[#13A7B2] sm:min-h-[780px] sm:px-8 sm:pt-[145px] lg:min-h-[820px] lg:px-12 lg:pt-[158px]"
      id="inicio"
    >
      <div className="relative z-10 mx-auto flex min-h-[590px] w-full max-w-[960px] flex-col items-center text-center sm:min-h-[620px]">
        <h1 className="max-w-[800px] font-heading text-[53px] leading-[0.95] tracking-[-0.035em] text-[#13A7B2] sm:text-[74px] sm:leading-[0.92] lg:text-[92px]">
          Une donuterie
          <br />
          artisanale à Madrid
        </h1>

        <p className="mt-8 max-w-[440px] font-heading text-[21px] leading-[1.2] text-[#13A7B2]/85 sm:mt-10 sm:text-[25px]">
          Des donuts préparés chaque jour, des glaçages généreux et du café de spécialité.
        </p>

        <div className="mt-auto grid w-full max-w-[600px] grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
          <ActionBlock
            detail="Retrait local et livraison"
            href="#menu"
            label="Commander en ligne"
          />
          <ActionBlock
            detail="Pour vos moments gourmands"
            href="#catering"
            label="Événements"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-[#13A7B2]/25" />
    </section>
  );
}
