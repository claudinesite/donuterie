"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useLanguage } from "./LanguageProvider";
import { gsap, MOTION, useGSAP } from "./motion";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

type Product = {
  name: string;
  description?: string;
  image: string;
  imagePosition?: string;
  badge?: string;
  note?: string;
};

type ProductGroup = {
  title: string;
  products: Product[];
};

type MenuPanel = {
  label: string;
  groups: ProductGroup[];
};

const menuPanels: MenuPanel[] = [
  {
    label: "Donuts",
    groups: [
      {
        title: "Les classiques",
        products: [
          {
            name: "Vanille",
            description:
              "Le grand classique : un donut moelleux, léger et délicatement parfumé à la vanille. Simple, authentique et parfait avec un café.",
            image: "donut-menu-grid.png",
            imagePosition: "0% 0%",
          },
          {
            name: "Chocolate",
            description:
              "Un donut au cacao intense, avec un cœur tendre et moelleux. Un incontournable pour les amoureux du chocolat.",
            image: "donut-menu-grid.png",
            imagePosition: "25% 0%",
          },
          {
            name: "Marbré",
            description:
              "Le mariage de la vanille et du chocolat dans un donut tendre et marbré. Classique, réconfortant et irrésistible.",
            image: "donut-menu-grid.png",
            imagePosition: "50% 0%",
          },
        ],
      },
      {
        title: "Créations",
        products: [
          {
            name: "Pistache blanche",
            description:
              "Un glaçage crémeux au chocolat blanc et des éclats de pistache. Doux, élégant et délicatement torréfié.",
            image: "donut-menu-grid.png",
            imagePosition: "75% 0%",
            badge: "Meilleure vente",
          },
          {
            name: "Rose",
            description:
              "Un glaçage fruité aux notes florales et un cœur moelleux. Un donut délicat, gourmand et très coloré.",
            image: "donut-menu-grid.png",
            imagePosition: "100% 0%",
          },
          {
            name: "Matcha",
            description:
              "Un donut enrobé de chocolat au matcha, au parfait équilibre entre douceur et thé vert japonais.",
            image: "donut-menu-grid.png",
            imagePosition: "0% 100%",
            badge: "Meilleure vente",
          },
          {
            name: "Myrtille",
            description:
              "Un glaçage crémeux à la myrtille, relevé de fruits naturels. Doux, frais et légèrement acidulé.",
            image: "donut-menu-grid.png",
            imagePosition: "25% 100%",
          },
          {
            name: "Citron",
            description:
              "Un donut avec un glaçage citron doux et rafraîchissant.",
            image: "donut-menu-grid.png",
            imagePosition: "50% 100%",
          },
          {
            name: "Coco au charbon actif",
            description:
              "Une alliance surprenante de coco, cacao noir et charbon actif. Exotique, crémeuse et singulière.",
            image: "donut-menu-grid.png",
            imagePosition: "75% 100%",
            note: "Fruits à coque",
          },
          {
            name: "Chai",
            description:
              "Inspiré du chai, avec des notes de cannelle, vanille et cardamome. Aromatique, chaleureux et réconfortant.",
            image: "donut-menu-grid.png",
            imagePosition: "100% 100%",
          },
          {
            name: "Fresa",
            description:
              "Un glaçage au chocolat à la fraise, avec un topping fruité croquant. Doux, intense et joyeux.",
            image: "398ac48acc24b977.png",
          },
          {
            name: "Orange",
            description:
              "Un donut glacé à l’orange naturelle, léger, parfumé et délicatement acidulé.",
            image: "2b4bd6eb8b03786e.png",
          },
          {
            name: "Mango",
            description:
              "Un glaçage crémeux à la mangue, doux et tropical. Frais, exotique et parfait à tout moment.",
            image: "aeef5a80884f14cb.png",
          },
          {
            name: "Spiruline bleue",
            description:
              "Un glaçage naturellement bleu à la spiruline, doux, velouté et relevé d’une note de coco.",
            image: "43fcfc4ca22de4c3.png",
          },
        ],
      },
    ],
  },
  {
    label: "Café",
    groups: [
      {
        title: "Café de spécialité",
        products: [
          {
            name: "Latte",
            description:
              "Un espresso et du lait crémeux, avec un latte art tout en douceur. Équilibré, chaleureux et parfait à tout moment.",
            image: "9fa05e7aac8e3863.png",
          },
          {
            name: "Capuchino",
            description:
              "Un espresso intense, une mousse crémeuse et une touche de cacao ou de cannelle. Classique et réconfortant.",
            image: "aeea95e2935f849e.png",
          },
          {
            name: "Espresso",
            description:
              "Un espresso court au goût intense et à l’arôme profond. Puissant et plein de caractère.",
            image: "9f516bc2485e6c75.png",
          },
          {
            name: "Americano",
            description:
              "Un espresso adouci à l’eau chaude, pour un café léger et aromatique à savourer lentement.",
            image: "e2d3114a5a42a1fb.png",
          },
        ],
      },
      {
        title: "Premium",
        products: [
          {
            name: "Coco Matcha",
            description:
              "Un matcha japonais doux et équilibré, mélangé à du lait crémeux. Rafraîchissant et délicat.",
            image: "a8541c71504da466.png",
          },
          {
            name: "Chai Latte",
            description:
              "Une boisson onctueuse aux épices chai : cannelle, vanille et cardamome. Douce et réconfortante.",
            image: "31cebb4682e01ce7.png",
          },
          {
            name: "Ube Matcha Latte",
            description:
              "La création signature de Le Petit Bleu : ube doux et crémeux avec du matcha japonais. Colorée, étonnante et addictive.",
            image: "d3cff6c5c4973034.png",
          },
          {
            name: "Matcha",
            description:
              "Du matcha pur, du lait et des glaçons pour une boisson intense, fraîche et énergisante.",
            image: "5c974c6dd9c9e6bb.png",
          },
          {
            name: "Thai Tea Latte",
            description:
              "Un thé thaï traditionnel au lait crémeux, doux et délicatement épicé.",
            image: "52d9734e7feb3b8f.png",
          },
          {
            name: "Ube Latte",
            description:
              "Une boisson onctueuse à l’ube, avec une touche naturelle de vanille. Une couleur vibrante et une texture irrésistible.",
            image: "9b7dced6e9e5190d.png",
          },
        ],
      },
    ],
  },
  {
    label: "À emporter",
    groups: [
      {
        title: "Packs Le Petit Bleu",
        products: [
          {
            name: "Le Petit Bleu Vanille",
            description: "3 donuts classiques à la vanille",
            image: "c5352357afa3358d.png",
          },
          {
            name: "Le Petit Bleu Chocolat",
            description: "3 donuts classiques au chocolat",
            image: "b39844ef0a1136eb.png",
          },
          {
            name: "Mini mix Le Petit Bleu chocolat & vanille",
            description:
              "Un mix de mini donuts classiques au chocolat et à la vanille",
            image: "adb9edd773e0c191.png",
          },
          {
            name: "Mix Le Petit Bleu chocolat & vanille",
            description:
              "Un assortiment de donuts classiques au chocolat et à la vanille",
            image: "35d703f4e04e7407.png",
          },
          {
            name: "Boîte Le Petit Bleu",
            description:
              "Des donuts artisanaux en boîte de 6, 12 ou 24 pièces.",
            image: "1e6de299a4c8261a.png",
          },
          {
            name: "Le Petit Bleu pour les chiens",
            description: "Édition limitée !",
            image: "304158a5505a1cf5.png",
          },
        ],
      },
      {
        title: "Café & thé en sachet",
        products: [
          {
            name: "Le Petit Bleu Guatemala Café Nica",
            image: "eb255236e2f9e81a.png",
          },
        ],
      },
    ],
  },
];

const slideClasses = [
  "translate-x-0",
  "-translate-x-full",
  "-translate-x-[200%]",
] as const;

const englishDescriptions: Record<string, string> = {
  Americano: "Espresso softened with hot water for a light, aromatic coffee to savour slowly.",
  Capuchino: "Intense espresso, creamy foam and a touch of cocoa or cinnamon. Classic and comforting.",
  Chai: "Inspired by chai, with cinnamon, vanilla and cardamom. Aromatic, warm and comforting.",
  "Chai Latte": "A creamy chai-spiced drink with cinnamon, vanilla and cardamom. Soft and comforting.",
  Chocolate: "A deep cocoa donut with a tender, fluffy centre. An essential for chocolate lovers.",
  Citron: "A donut with a sweet, refreshing lemon glaze.",
  "Coco Matcha": "A soft, balanced Japanese matcha blended with creamy milk. Refreshing and delicate.",
  "Coco au charbon actif": "A surprising blend of coconut, dark cocoa and activated charcoal. Exotic and singular.",
  Espresso: "A short espresso with an intense taste and deep aroma. Powerful and full of character.",
  Fresa: "Strawberry chocolate glaze with a crisp fruit topping. Sweet, intense and joyful.",
  Latte: "Espresso and creamy milk with a soft latte art finish. Balanced and perfect any time.",
  Mango: "A creamy mango glaze, soft and tropical. Fresh, exotic and perfect any time.",
  Matcha: "Pure matcha, milk and ice for an intense, fresh and energising drink.",
  Marbré: "Vanilla and chocolate meet in a tender marbled donut. Classic, comforting and irresistible.",
  Myrtille: "A creamy blueberry glaze lifted with natural fruit. Soft, fresh and lightly tart.",
  Orange: "A donut glazed with natural orange, light, fragrant and delicately tangy.",
  "Pistache blanche": "Creamy white chocolate glaze with pistachio pieces. Soft, elegant and gently toasted.",
  Rose: "A fruity glaze with floral notes and a tender centre. Delicate, indulgent and colourful.",
  Vanille: "The great classic: a soft vanilla donut, light and delicately fragrant. Perfect with coffee.",
  "Spiruline bleue": "A naturally blue spirulina glaze, soft and velvety with a hint of coconut.",
  "Thai Tea Latte": "Traditional Thai tea with creamy milk, soft and delicately spiced.",
  "Ube Latte": "A creamy ube drink with a touch of natural vanilla. Vibrant and irresistible.",
  "Ube Matcha Latte": "Le Petit Bleu's signature: soft, creamy ube with Japanese matcha. Colourful and surprising.",
};

const englishGroupTitles: Record<string, string> = {
  "Café & thé en sachet": "Coffee & tea bags",
  "Café de spécialité": "Specialty coffee",
  Créations: "Creations",
  "Les classiques": "Classics",
  "Packs Le Petit Bleu": "Le Petit Bleu packs",
  Premium: "Premium",
};

function ProductCard({ product }: { product: Product }) {
  const { language } = useLanguage();
  const description = language === "en"
    ? englishDescriptions[product.name] ?? product.description
    : product.description;

  return (
    <article data-menu-product className="group grid min-h-[172px] grid-cols-[96px_minmax(0,1fr)] gap-4 pb-8 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5">
      {product.imagePosition ? (
        <div
          role="img"
          aria-label={`${product.name} donut`}
          data-menu-donut
          className="size-24 bg-no-repeat drop-shadow-[0_6px_14px_rgba(7,81,91,0.18)] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:rotate-[3deg] sm:size-[140px]"
          style={{
            backgroundImage: `url(${assetRoot}/${product.image})`,
            backgroundPosition: product.imagePosition,
            backgroundSize: "500% 200%",
          }}
        />
      ) : (
        <Image
          src={`${assetRoot}/${product.image}`}
          alt=""
          width={140}
          height={140}
          sizes="140px"
          data-menu-donut
          className="size-24 object-contain drop-shadow-[0_6px_14px_rgba(7,81,91,0.18)] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:rotate-[3deg] sm:size-[140px]"
        />
      )}

      <div data-menu-product-copy className="min-w-0 pt-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h4 className="madie-display text-[18px] leading-[1.05] font-bold tracking-[0.04em] uppercase">
            {product.name}
          </h4>
          {product.badge ? (
            <span className="rounded-full bg-madie-rose px-2.5 py-1 font-sans text-[9px] leading-none font-semibold tracking-[0.12em] uppercase">
              {language === "en" && product.badge === "Meilleure vente"
                ? "Best seller"
                : product.badge}
            </span>
          ) : null}
        </div>

        {product.note ? (
          <p className="mb-2 font-sans text-[9px] leading-none font-medium tracking-[0.12em] text-madie-burgundy/60 uppercase">
            {product.note}
          </p>
        ) : null}

          {description ? (
            <p className="text-[14px] leading-[1.5] text-black">
            {description}
            </p>
        ) : null}
      </div>
    </article>
  );
}

function ProductPanel({
  panel,
  panelIndex,
}: {
  panel: MenuPanel;
  panelIndex: number;
}) {
  const { language } = useLanguage();

  return (
    <div className="space-y-16 lg:space-y-20">
      {panel.groups.map((group, groupIndex) => (
        <section
          key={group.title}
          aria-labelledby={`menu-group-${panelIndex}-${groupIndex}`}
        >
          <h3
            id={`menu-group-${panelIndex}-${groupIndex}`}
            className="madie-display madie-text-stroke-thin mb-8 text-2xl leading-8 font-bold tracking-[0.05em] uppercase"
          >
            {language === "en" ? englishGroupTitles[group.title] ?? group.title : group.title}
          </h3>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {(panel.label === "Donuts" && groupIndex === 1
              ? group.products.slice(0, 7)
              : group.products
            ).map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  const measureActivePanel = useCallback(() => {
    const viewport = viewportRef.current;
    const activePanel = panelRefs.current[activeIndex];

    if (!viewport || !activePanel) {
      return;
    }

    viewport.style.height = `${activePanel.scrollHeight}px`;
  }, [activeIndex]);

  useLayoutEffect(() => {
    const activePanel = panelRefs.current[activeIndex];

    if (!activePanel) {
      return;
    }

    measureActivePanel();
    const resizeObserver = new ResizeObserver(measureActivePanel);
    resizeObserver.observe(activePanel);

    return () => resizeObserver.disconnect();
  }, [activeIndex, measureActivePanel]);

  useGSAP(
    () => {
      const activePanel = panelRefs.current[activeIndex];

      if (!activePanel) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reducedMotion) {
            return;
          }

          const isDesktop = context.conditions?.desktop ?? false;
          const products = activePanel.querySelectorAll<HTMLElement>("[data-menu-product]");
          const donuts = activePanel.querySelectorAll<HTMLElement>("[data-menu-donut]");
          const stripeLayer = sectionRef.current?.querySelector<HTMLElement>("[data-menu-stripe-layer]");

          gsap.from(products, {
            autoAlpha: 0,
            duration: 0.72,
            ease: MOTION.easeOut,
            stagger: MOTION.staggerFast,
            x: (index) => (isDesktop && index % 2 === 0 ? -10 : isDesktop ? 10 : 0),
            y: isDesktop ? 22 : 14,
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: activePanel,
            },
          });

          gsap.from(donuts, {
            duration: 0.76,
            ease: MOTION.easeOut,
            rotation: (index) => (index % 2 === 0 ? -4 : 4),
            scale: 0.95,
            stagger: MOTION.staggerFast,
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: activePanel,
            },
          });

          if (stripeLayer) {
            gsap.fromTo(
              stripeLayer,
              { y: -6 },
              {
                y: 6,
                ease: "none",
                scrollTrigger: {
                  end: "bottom top",
                  scrub: 1,
                  start: "top bottom",
                  trigger: sectionRef.current,
                },
              },
            );
          }
        },
      );

      return () => media.revert();
    },
    { dependencies: [activeIndex], revertOnUpdate: true, scope: sectionRef },
  );

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative madie-menu-stripes scroll-mt-20 overflow-hidden pb-20 pt-12 text-madie-burgundy lg:pb-32 lg:pt-20"
    >
      <div
        data-menu-stripe-layer
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(19,167,178,0.045)_0,rgba(19,167,178,0.045)_80px,transparent_80px,transparent_160px)]"
      />
      <div className="relative z-10 mx-auto mb-12 grid w-full max-w-[1200px] grid-cols-1 gap-8 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-12">
        <h2 className="madie-display text-5xl leading-none font-bold tracking-[0.01em] uppercase lg:text-[96px] lg:leading-[96px]">
          {language === "en" ? "The menu" : <><span className="madie-text-stroke-thin">Le</span> menu</>}
        </h2>

        <div className="lg:pt-2">
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-madie-burgundy/85">
            {language === "fr"
              ? "Découvrez notre sélection de donuts artisanaux, de cafés de spécialité et de boissons créatives. Tout est préparé chaque jour dans notre atelier à Moncton."
              : "Discover our selection of handmade donuts, specialty coffee and creative drinks. Everything is prepared fresh each day in our Moncton kitchen."}
          </p>

          <div
            className="mt-7 flex flex-wrap gap-2.5"
            role="tablist"
            aria-label={language === "fr" ? "Catégories du menu" : "Menu categories"}
          >
            {menuPanels.map((panel, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={panel.label}
                  id={`menu-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`menu-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`madie-display flex h-[38px] cursor-pointer items-center justify-center rounded-full border px-5 py-2.5 text-xs leading-none font-bold tracking-[1.2px] uppercase transition-[background-color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-madie-burgundy ${
                    isActive
                      ? "border-madie-rose bg-madie-rose"
                      : "border-white/70 bg-white/45 backdrop-blur-md hover:bg-white/65"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {language === "fr"
                    ? panel.label
                    : ["Donuts", "Coffee", "Take away"][index]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative z-10 overflow-hidden transition-[height] duration-[650ms] ease-[cubic-bezier(.34,1.15,.64,1)]"
      >
        <div
          className={`flex items-start transition-transform duration-[650ms] ease-[cubic-bezier(.34,1.15,.64,1)] ${slideClasses[activeIndex]}`}
        >
          {menuPanels.map((panel, index) => (
            <div
              key={panel.label}
              ref={(element) => {
                panelRefs.current[index] = element;
              }}
              id={`menu-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${index}`}
              aria-hidden={index !== activeIndex}
              className="w-full shrink-0"
            >
              <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <ProductPanel panel={panel} panelIndex={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
