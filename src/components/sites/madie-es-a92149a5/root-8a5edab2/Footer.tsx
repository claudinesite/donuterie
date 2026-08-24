export function Footer() {
  return (
    <footer id="site-footer" className="min-h-[337.5px] bg-[#13A7B2] px-6 text-white/75 lg:h-[337.5px]">
      <div className="mx-auto flex min-h-[337.5px] max-w-[1200px] flex-col lg:h-full">
        <div className="flex flex-1 items-center justify-center py-10">
          <p className="madie-hand text-[64px] leading-none text-white">
            Le Petit Bleu
          </p>
        </div>

        <div className="madie-eyebrow flex min-h-[73px] flex-col items-center justify-center gap-3 border-t border-white/30 py-6 text-center md:flex-row md:justify-between md:py-0 md:text-left">
          <p>© 2026 Le Petit Bleu — Tous droits réservés</p>

          <nav aria-label="Liens légaux">
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="/privacidad"
                  className="text-white/75 transition-colors duration-150 hover:text-white focus-visible:text-white"
                >
                  Confidentialité
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-white/75 transition-colors duration-150 hover:text-white focus-visible:text-white"
                >
                  Mentions légales
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
