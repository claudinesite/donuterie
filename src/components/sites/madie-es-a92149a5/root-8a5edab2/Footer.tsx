export function Footer() {
  return (
    <footer className="min-h-[337.5px] bg-white px-6 text-madie-ink/70 lg:h-[337.5px]">
      <div className="mx-auto flex min-h-[337.5px] max-w-[1200px] flex-col lg:h-full">
        <div className="flex flex-1 items-center justify-center py-10">
          <p className="madie-hand text-[64px] leading-none text-madie-burgundy">
            Le Petit Bleu
          </p>
        </div>

        <div className="madie-eyebrow flex min-h-[73px] flex-col items-center justify-center gap-3 border-t border-madie-ink/15 py-6 text-center md:flex-row md:justify-between md:py-0 md:text-left">
          <p>© 2026 Le Petit Bleu — Todos los derechos reservados</p>

          <nav aria-label="Enlaces legales">
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="/privacidad"
                  className="text-madie-ink/70 transition-colors duration-150 hover:text-madie-burgundy focus-visible:text-madie-burgundy"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-madie-ink/70 transition-colors duration-150 hover:text-madie-burgundy focus-visible:text-madie-burgundy"
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
