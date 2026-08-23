"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const assetRoot = "/sites/madie-es-a92149a5/root-8a5edab2/assets";

type Product = {
  name: string;
  description?: string;
  image: string;
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
            image: "a141bf8a7536a154.png",
          },
          {
            name: "Chocolate",
            description:
              "Un donut au cacao intense, avec un cœur tendre et moelleux. Un incontournable pour les amoureux du chocolat.",
            image: "e7e2d6c9b7c5cbd1.png",
          },
          {
            name: "Marbré",
            description:
              "Le mariage de la vanille et du chocolat dans un donut tendre et marbré. Classique, réconfortant et irrésistible.",
            image: "01d642bf49256cd4.png",
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
            image: "9e09fc284006ddbd.png",
            badge: "Meilleure vente",
          },
          {
            name: "Rose",
            description:
              "Un glaçage fruité aux notes florales et un cœur moelleux. Un donut délicat, gourmand et très coloré.",
            image: "7daeb867e3fc2cde.png",
          },
          {
            name: "Matcha",
            description:
              "Un donut enrobé de chocolat au matcha, au parfait équilibre entre douceur et thé vert japonais.",
            image: "9432c0cb28480de0.png",
            badge: "Meilleure vente",
          },
          {
            name: "Myrtille",
            description:
              "Un glaçage crémeux à la myrtille, relevé de fruits naturels. Doux, frais et légèrement acidulé.",
            image: "fbaf039fb9decc77.png",
          },
          {
            name: "Citron",
            description:
              "Un donut avec un glaçage citron doux et rafraîchissant.",
            image: "26100ef699035982.png",
          },
          {
            name: "Coco au charbon actif",
            description:
              "Une alliance surprenante de coco, cacao noir et charbon actif. Exotique, crémeuse et singulière.",
            image: "22918087e8b1a3f8.png",
            note: "Fruits à coque",
          },
          {
            name: "Chai",
            description:
              "Inspiré du chai, avec des notes de cannelle, vanille et cardamome. Aromatique, chaleureux et réconfortant.",
            image: "0b29af24c9ebd195.png",
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

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="grid min-h-[172px] grid-cols-[140px_minmax(0,1fr)] gap-5 border-b border-madie-burgundy/15 pb-8">
      <Image
        src={`${assetRoot}/${product.image}`}
        alt=""
        width={140}
        height={140}
        sizes="140px"
        className="size-[140px] object-contain drop-shadow-[0_6px_14px_rgba(7,81,91,0.18)]"
      />

      <div className="min-w-0 pt-2">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h4 className="madie-display text-[18px] leading-[1.05] font-bold tracking-[0.04em] uppercase">
            {product.name}
          </h4>
          {product.badge ? (
            <span className="rounded-full bg-madie-rose px-2.5 py-1 font-sans text-[9px] leading-none font-semibold tracking-[0.12em] uppercase">
              {product.badge}
            </span>
          ) : null}
        </div>

        {product.note ? (
          <p className="mb-2 font-sans text-[9px] leading-none font-medium tracking-[0.12em] text-madie-burgundy/60 uppercase">
            {product.note}
          </p>
        ) : null}

        {product.description ? (
          <p className="text-[14px] leading-[1.5] text-black">
            {product.description}
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
            {group.title}
          </h3>
          <div className="grid grid-cols-1 gap-x-14 lg:grid-cols-2">
            {group.products.map((product) => (
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

  return (
    <section
      id="menu"
      className="scroll-mt-20 overflow-hidden bg-white py-20 text-madie-burgundy lg:py-32"
    >
      <div className="mx-auto mb-12 grid w-full max-w-[1200px] grid-cols-1 gap-8 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-12">
        <h2 className="madie-display text-5xl leading-none font-bold tracking-[0.01em] uppercase lg:text-[96px] lg:leading-[96px]">
          <span className="madie-text-stroke-thin">Le</span> menu
        </h2>

        <div className="lg:pt-2">
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-madie-burgundy/80">
            Découvrez notre sélection de donuts artisanaux, de cafés de
            spécialité et de boissons créatives. Tout est préparé chaque jour
            dans notre atelier à Madrid.
          </p>

          <div
            className="mt-7 flex flex-wrap gap-2.5"
            role="tablist"
            aria-label="Catégories du menu"
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
                      : "border-madie-burgundy/30 bg-transparent hover:bg-madie-rose/20"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {panel.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="overflow-hidden transition-[height] duration-[650ms] ease-[cubic-bezier(.34,1.15,.64,1)]"
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
