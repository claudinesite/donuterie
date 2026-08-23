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
    lead: "MADIE también nace de la idea de ",
    emphasis: "reinterpretar lo clásico.",
    tail: " De mezclar tradición con creatividad, París con Madrid, lo artesanal con lo inesperado.",
    media: { kind: "image", src: `${assetRoot}/dbf2832577ec8d08` },
  },
  {
    lead: "Por eso hemos transformado la receta tradicional en una colección de ",
    emphasis: "más de 15 variedades únicas",
    tail: " que cambian, evolucionan y sorprenden constantemente.",
    media: { kind: "video", src: `${assetRoot}/story-ig.mp4` },
  },
  {
    lead: "Cada pieza se hornea a diario con ingredientes seleccionados, buscando siempre el ",
    emphasis: "equilibrio entre textura, aroma y estética.",
    tail: "",
    media: { kind: "image", src: `${assetRoot}/a91c3e23425caf55` },
  },
  {
    lead: "Porque MADIE no es solo una cafetería. Es un lugar donde ",
    emphasis: "la tradición se reinventa.",
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
    <section
      className="relative min-h-[788.5px] overflow-hidden bg-[linear-gradient(120deg,#63001e_0%,#500018_100%)] px-6 pt-16 pb-24 text-[#f6efe6] lg:h-[736.5px] lg:min-h-0 lg:px-10 lg:pb-20"
      id="historia"
    >
      <div className="madie-grain" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/sites/madie-es-a92149a5/root-8a5edab2/assets/4bc97f9a582e1ac1.png')] bg-repeat opacity-[0.05] [background-position:20px_10px] [background-size:220px_72px]" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1066px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_550px] lg:items-center lg:gap-10">
        <div className="order-2 w-full max-w-[440px] self-center lg:order-1 lg:self-start lg:pt-4">
          <video
            aria-hidden="true"
            autoPlay
            className="pointer-events-none hidden h-44 w-44 object-contain lg:block"
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

          <div
            aria-live="polite"
            className="mt-0 lg:mt-9"
            key={activeIndex}
          >
            <p className="animate-in fade-in slide-in-from-bottom-2 max-w-[430px] text-[16.8px] leading-[25.2px] duration-300">
              {currentStory.lead}
              <strong className="font-bold">{currentStory.emphasis}</strong>
              {currentStory.tail}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 lg:mt-11">
            <button
              aria-label="Historia anterior"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff99d3] text-[#63001e] transition-colors duration-150 hover:bg-[#ffc5e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6efe6]"
              onClick={() => changeStory(-1)}
              type="button"
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              aria-label="Historia siguiente"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff99d3] text-[#63001e] transition-colors duration-150 hover:bg-[#ffc5e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6efe6]"
              onClick={() => changeStory(1)}
              type="button"
            >
              <ArrowRightIcon className="size-5" />
            </button>
            <span className="madie-mono ml-1 text-[11px] leading-none tracking-[0.04em] text-[#f6efe6]/75">
              {String(activeIndex + 1).padStart(2, "0")} / 04
            </span>
          </div>
        </div>

        <div className="relative order-1 mx-auto h-[380px] w-full max-w-[550px] lg:order-2 lg:h-[572px]">
          <p className="madie-eyebrow absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[#f6efe6]/45 lg:block">
            Arrástrame →
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
                      ? `Historia de Madie ${activeIndex + 1} de ${storyStates.length}`
                      : undefined
                  }
                  className={`relative aspect-[3/4] w-[78%] origin-center overflow-hidden rounded-[18px] border border-[#f6efe6]/60 bg-[#3d0012] shadow-[0_18px_42px_rgba(22,0,7,0.34)] transition-all duration-[550ms] ease-[cubic-bezier(.2,.7,.3,1)] will-change-transform ${stackPositionClasses[position]} ${isActive ? "pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing" : ""}`}
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
      </div>
    </section>
  );
}
