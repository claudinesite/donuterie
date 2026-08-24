"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "../shared/icons";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";
const dragThreshold = 60;

type StoryMedia =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string };

type StoryState = {
  lead: string;
  emphasis: string;
  tail: string;
  media: StoryMedia;
};

const storyStates: readonly StoryState[] = [
  {
    lead: "LE PETIT BLEU est né de l’envie de ",
    emphasis: "réinventer les classiques.",
    tail: " Mélanger le savoir-faire, la créativité et l’inattendu autour d’un bon donut.",
    media: { kind: "image", src: `${assetRoot}/dbf2832577ec8d08` },
  },
  {
    lead: "C’est pourquoi notre vitrine réunit ",
    emphasis: "plus de 15 recettes originales",
    tail: " qui changent, évoluent et surprennent chaque semaine.",
    media: { kind: "video", src: `${assetRoot}/le-petit-bleu-animation.mp4` },
  },
  {
    lead: "Chaque donut est préparé chaque jour avec des ingrédients choisis, à la recherche du ",
    emphasis: "juste équilibre entre texture, goût et couleur.",
    tail: "",
    media: { kind: "image", src: `${assetRoot}/a91c3e23425caf55` },
  },
  {
    lead: "Parce que Le Petit Bleu n’est pas qu’une donuterie. C’est un lieu où ",
    emphasis: "la gourmandise se réinvente.",
    tail: "",
    media: { kind: "image", src: `${assetRoot}/c6c18df4fa64c020` },
  },
] as const;

const stackPositionClasses = [
  "z-50 translate-x-0 translate-y-0 rotate-0 brightness-100",
  "z-40 translate-x-[14px] translate-y-[6px] rotate-[5deg] brightness-[.85]",
  "z-30 translate-x-[28px] translate-y-[12px] rotate-[8deg] brightness-[.85]",
  "z-20 translate-x-[42px] translate-y-[18px] rotate-[11deg] brightness-[.85]",
] as const;

function StoryMedia({ media }: { media: StoryMedia }) {
  if (media.kind === "video") {
    return (
      <video
        aria-hidden="true"
        autoPlay
        className="size-full object-cover"
        draggable={false}
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <picture className="block size-full">
      <source srcSet={media.src} type="image/avif" />
      <img
        alt=""
        className="size-full object-cover"
        decoding="async"
        draggable={false}
        src={media.src}
      />
    </picture>
  );
}

function clearDragStyles(element: HTMLDivElement) {
  element.style.removeProperty("transform");
  element.style.removeProperty("transition");
}

export function StoryGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const changeStory = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      return (current + direction + storyStates.length) % storyStates.length;
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;

    pointerIdRef.current = event.pointerId;
    pointerStartRef.current = event.clientX;
    dragOffsetRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.setProperty("transition", "none");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const offset = event.clientX - pointerStartRef.current;
    dragOffsetRef.current = offset;
    event.currentTarget.style.setProperty(
      "transform",
      `translate3d(${offset}px, 0, 0) rotate(${offset * 0.02}deg)`,
    );
  };

  const finishDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled = false,
  ) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const offset = dragOffsetRef.current;
    pointerIdRef.current = null;
    dragOffsetRef.current = 0;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    clearDragStyles(event.currentTarget);

    if (!cancelled && Math.abs(offset) >= dragThreshold) {
      changeStory(offset < 0 ? 1 : -1);
    }
  };

  const currentStory = storyStates[activeIndex];

  return (
    <div
      className="madie-stripes relative flex min-h-[720px] overflow-hidden px-6 py-16 text-[#102F35] sm:px-10 lg:min-h-[780px] lg:px-12"
      id="historia"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="pointer-events-none absolute top-5 left-5 z-0 h-24 w-24 object-contain opacity-80 sm:h-28 sm:w-28 lg:top-8 lg:left-8 lg:h-32 lg:w-32"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source
          src={`${assetRoot}/8cb64c4b2cd18888.webm`}
          type="video/webm"
        />
      </video>

      <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col justify-center">
        <div className="relative mx-auto h-[380px] w-full max-w-[540px] sm:h-[460px] lg:h-[500px]">
          <p className="madie-eyebrow absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#102F35]/65">
            Fais glisser →
          </p>

          {storyStates.map((story, index) => {
            const position =
              (index - activeIndex + storyStates.length) % storyStates.length;
            const isActive = position === 0;

            return (
              <div
                aria-hidden={!isActive}
                className="pointer-events-none absolute inset-0 flex justify-center"
                key={story.media.src}
              >
                <div
                  aria-label={
                    isActive
                      ? `Histoire Le Petit Bleu ${activeIndex + 1} sur ${storyStates.length}`
                      : undefined
                  }
                  className={`relative aspect-[3/4] w-[78%] origin-center overflow-hidden rounded-[18px] border border-[#102F35]/30 bg-white shadow-[0_18px_42px_rgba(4,29,34,0.2)] transition-all duration-[550ms] ease-[cubic-bezier(.2,.7,.3,1)] will-change-transform sm:w-[72%] ${stackPositionClasses[position]} ${isActive ? "pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing" : ""}`}
                  onPointerCancel={(event) => finishDrag(event, true)}
                  onPointerDown={isActive ? handlePointerDown : undefined}
                  onPointerMove={isActive ? handlePointerMove : undefined}
                  onPointerUp={isActive ? finishDrag : undefined}
                  role={isActive ? "img" : undefined}
                >
                  <StoryMedia media={story.media} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_70%,rgba(30,0,10,0.12)_100%)]" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-[60] mx-auto -mt-3 w-full max-w-[480px] bg-[#F4EAD8] px-5 py-5 shadow-[0_18px_36px_rgba(4,29,34,0.16)] sm:px-6">
          <div aria-live="polite" key={activeIndex}>
            <p className="animate-in fade-in slide-in-from-bottom-2 text-[15px] leading-[1.5] duration-300 sm:text-[16px]">
              {currentStory.lead}
              <strong className="font-bold">{currentStory.emphasis}</strong>
              {currentStory.tail}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              aria-label="Histoire précédente"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FF8B6A] text-[#13A7B2] transition-colors duration-150 hover:bg-[#FFD1C4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#102F35]"
              onClick={() => changeStory(-1)}
              type="button"
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              aria-label="Histoire suivante"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FF8B6A] text-[#13A7B2] transition-colors duration-150 hover:bg-[#FFD1C4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#102F35]"
              onClick={() => changeStory(1)}
              type="button"
            >
              <ArrowRightIcon className="size-5" />
            </button>
            <span className="madie-mono ml-1 text-[11px] leading-none tracking-[0.04em] text-[#102F35]/75">
              {String(activeIndex + 1).padStart(2, "0")} / 04
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
