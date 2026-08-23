export function Footer() {
  return (
    <footer className="min-h-[337.5px] bg-[#07515B] px-6 text-madie-cream/70 lg:h-[337.5px]">
      <div className="mx-auto flex min-h-[337.5px] max-w-[1200px] flex-col lg:h-full">
        <div className="flex flex-1 items-center justify-center py-10">
          {/* The source is an extensionless AVIF payload, so browser-native decoding is intentional. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sites/madie-es-a92149a5/root-8a5edab2/assets/bc5aa74e53815ca3"
            alt="Madie"
            width="240"
            height="96"
            decoding="async"
            className="h-20 w-auto brightness-0 invert lg:h-24"
          />
        </div>

        <div className="madie-eyebrow flex min-h-[73px] flex-col items-center justify-center gap-3 border-t border-madie-cream/10 py-6 text-center md:flex-row md:justify-between md:py-0 md:text-left">
          <p>© 2026 Madie — Todos los derechos reservados</p>

          <nav aria-label="Enlaces legales">
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="/privacidad"
                  className="text-madie-cream/70 transition-colors duration-150 hover:text-madie-cream focus-visible:text-madie-cream"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-madie-cream/70 transition-colors duration-150 hover:text-madie-cream focus-visible:text-madie-cream"
                >
                  Términos
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
