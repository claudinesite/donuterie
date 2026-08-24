const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

export function StoryGallery() {
  return (
    <section
      aria-label="L'atelier Le Petit Bleu"
      className="madie-stripes relative flex min-h-[720px] items-center justify-center overflow-hidden border-b border-[#102F35]/15 px-6 py-16 text-[#102F35] sm:px-10 lg:min-h-[780px] lg:px-12"
      id="historia"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="pointer-events-none h-40 w-40 object-contain opacity-80 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source
          src={`${assetRoot}/le-petit-bleu-animation.mp4`}
          type="video/mp4"
        />
      </video>
    </section>
  );
}
