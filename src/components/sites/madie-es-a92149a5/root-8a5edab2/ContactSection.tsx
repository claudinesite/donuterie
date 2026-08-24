"use client";

import { useState } from "react";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

const zoomClasses = [
  "scale-[0.85]",
  "scale-100",
  "scale-[1.15]",
  "scale-[1.3]",
  "scale-[1.45]",
] as const;

type StationPillProps = {
  name: string;
  position: string;
};

function StationPill({ name, position }: StationPillProps) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-madie-cream px-2 py-1 font-sans text-[8px] leading-none font-semibold whitespace-nowrap text-madie-burgundy shadow-sm ${position}`}
    >
      {/* Native image keeps the tiny station decoration coupled to the map canvas. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${assetRoot}/2a3b5a08862f1128.svg`}
        alt=""
        width={15}
        height={9}
        className="h-[9px] w-[15px] object-contain"
      />
      <span>{name}</span>
    </div>
  );
}

export function ContactSection() {
  const [zoomIndex, setZoomIndex] = useState(1);

  const zoomIn = () => {
    setZoomIndex((current) => Math.min(current + 1, zoomClasses.length - 1));
  };

  const zoomOut = () => {
    setZoomIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 overflow-hidden bg-white pt-12 pb-16 text-madie-ink lg:pt-16 lg:pb-0"
    >
      <div className="madie-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <header className="mx-auto mb-16 max-w-[600px] text-center">
          <p className="madie-eyebrow mb-4 text-madie-ink/60">
            Passe nous voir
          </p>
          <h2 className="madie-display text-[36px] leading-[1.1] font-bold tracking-[0.01em] uppercase lg:text-[72px] lg:leading-[79.2px]">
            <span className="madie-text-stroke-thin">Retrouve-nous</span>
            <br />
            <span>à Moncton.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative h-[480px] overflow-hidden rounded-[24px] border border-madie-burgundy-dark bg-madie-burgundy-dark lg:h-[568px]">
            <div
              className={`absolute inset-0 origin-center transition-transform duration-500 ease-out ${zoomClasses[zoomIndex]}`}
            >
              {/* Native image is intentional: the local file is an extensionless AVIF payload. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${assetRoot}/2627c1191ccf1fa9`}
                alt="Plan illustré autour de Le Petit Bleu à Moncton"
                className="absolute inset-0 size-full object-cover object-center"
              />

              <StationPill
                name="Islas Filipinas"
                position="top-[28%] left-[38%]"
              />
              <StationPill name="Canal" position="top-[30%] left-[91%]" />
              <StationPill name="Moncloa" position="top-[72%] left-[8%]" />
              <StationPill name="Quevedo" position="top-[82%] left-[88%]" />

              <span
                className="absolute top-[47%] left-[53%] size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-madie-rose/55 [animation:madie-map-pulse_2.4s_cubic-bezier(0,0,.2,1)_infinite]"
                aria-hidden="true"
              />
              {/* Native image is intentional: the local file is an extensionless AVIF payload. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${assetRoot}/9133fcfa121b28e4`}
                alt="Le Petit Bleu"
                className="absolute top-[47%] left-[53%] w-[116px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_5px_12px_rgba(7,81,91,0.3)]"
              />
            </div>

            <div className="absolute top-4 right-4 z-20 flex flex-col overflow-hidden rounded-xl border border-madie-cream/15 bg-madie-burgundy-dark/85 text-madie-cream shadow-lg backdrop-blur-sm">
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center border-b border-madie-cream/10 text-xl leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Zoomer sur la carte"
                disabled={zoomIndex === zoomClasses.length - 1}
                onClick={zoomIn}
              >
                +
              </button>
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center border-b border-madie-cream/10 text-xl leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Dézoomer la carte"
                disabled={zoomIndex === 0}
                onClick={zoomOut}
              >
                −
              </button>
              <button
                type="button"
                className="flex size-10 cursor-pointer items-center justify-center text-sm leading-none transition-colors hover:bg-madie-cream/10 disabled:cursor-default disabled:opacity-40"
                aria-label="Réinitialiser la carte"
                disabled={zoomIndex === 1}
                onClick={() => setZoomIndex(1)}
              >
                ◆
              </button>
            </div>

            <div className="absolute bottom-5 left-5 z-20 max-w-[290px] rounded-[18px] border border-madie-cream/10 bg-madie-burgundy-dark/90 px-5 py-4 text-madie-cream shadow-xl backdrop-blur-sm">
              <p className="madie-display text-[17px] leading-[1.15] font-bold tracking-[0.035em] uppercase">
                Moncton
                <br />
                Nouveau-Brunswick, Canada
              </p>
            </div>
          </div>

          <aside className="rounded-[24px] border border-madie-burgundy-dark/20 bg-white px-7 py-8 lg:min-h-[568px] lg:px-9">
            <div className="border-b border-madie-ink/15 pb-6">
              <p className="madie-eyebrow mb-3 text-madie-ink/60">
                Horaires
              </p>
              <p className="text-[17px] leading-[1.75]">
                Lun. 11 h 00 – 20 h 30
                <br />
                Mar.–Jeu. fermé
                <br />
                Ven. 13 h 00 – 20 h 30
                <br />
                Sam. 17 h 00 – 20 h 30
                <br />
                Dim. 13 h 30 – 20 h 30
              </p>
            </div>

            <div className="border-b border-madie-ink/15 py-6">
              <p className="madie-eyebrow mb-3 text-madie-ink/60">
                Téléphone
              </p>
              <a
                href="tel:+34603861349"
                className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
              >
                +34 603 861 349
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 border-b border-madie-ink/15 py-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="madie-eyebrow mb-3 text-madie-ink/60">
                  Email
                </p>
                <a
                  href="mailto:info@madie.es"
                  className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
                >
                  info@madie.es
                </a>
              </div>
              <div>
                <p className="madie-eyebrow mb-3 text-madie-ink/60">
                  Commandes
                </p>
                <a
                  href="mailto:orders@madie.es"
                  className="text-[17px] leading-[1.6] transition-colors hover:text-madie-rose"
                >
                  orders@madie.es
                </a>
              </div>
            </div>

            <div className="pt-6">
              <p className="madie-eyebrow mb-4 text-madie-ink/60">
                Suivez-nous
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[17px]">
                <a
                  href="https://www.instagram.com/madie.madrid"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-madie-ink/30 underline-offset-4 transition-colors hover:text-madie-rose"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/34603861349"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-madie-ink/30 underline-offset-4 transition-colors hover:text-madie-rose"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
