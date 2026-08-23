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
    label: "Madeleines",
    groups: [
      {
        title: "Clásicos",
        products: [
          {
            name: "Vainilla",
            description:
              "La receta clásica francesa: tierna, esponjosa y con un delicado aroma a vainilla. Simple, auténtica y perfecta para acompañar el café.",
            image: "a141bf8a7536a154.png",
          },
          {
            name: "Chocolate",
            description:
              "Madeleine de cacao intenso con interior suave y esponjoso. Un clásico para los amantes del chocolate más puro.",
            image: "e7e2d6c9b7c5cbd1.png",
          },
          {
            name: "Marmoleada",
            description:
              "La mezcla perfecta entre vainilla y chocolate en una madeleine suave y esponjosa. Clásica, nostálgica y adictiva.",
            image: "01d642bf49256cd4.png",
          },
        ],
      },
      {
        title: "Especiales",
        products: [
          {
            name: "White Pistacho",
            description:
              "Cobertura cremosa de chocolate blanco con pistacho troceado. Suave, elegante y con el toque tostado perfecto para los amantes del pistacho.",
            image: "9e09fc284006ddbd.png",
            badge: "Best seller",
          },
          {
            name: "Rosa",
            description:
              "Cobertura afrutada con notas florales y un interior esponjoso que la hace delicada y especial. Una madeleine diferente, dulce y muy visual.",
            image: "7daeb867e3fc2cde.png",
          },
          {
            name: "Matcha",
            description:
              "Madeleine cubierta de chocolate de matcha con un sabor equilibrado entre dulzor y té verde japonés. Cremosa, intensa y muy especial.",
            image: "9432c0cb28480de0.png",
            badge: "Best seller",
          },
          {
            name: "Arándanos",
            description:
              "Cobertura cremosa de arándanos con topping de fruta natural. Dulce, fresca y con un ligero toque ácido irresistible.",
            image: "fbaf039fb9decc77.png",
          },
          {
            name: "Limón",
            description:
              "Madeleine con un glaseado de limón suave y refrescante.",
            image: "26100ef699035982.png",
          },
          {
            name: "Coco Con Carbón Activo",
            description:
              "Una combinación sorprendente de coco dulce y cacao negro con carbón activo. Exótica, cremosa y diferente a cualquier otra.",
            image: "22918087e8b1a3f8.png",
            note: "Frutos de cáscara",
          },
          {
            name: "Chai",
            description:
              "Inspirada en el clásico té chai, con notas especiadas de canela, vainilla y cardamomo. Aromática, cálida y muy reconfortante.",
            image: "0b29af24c9ebd195.png",
          },
          {
            name: "Fresa",
            description:
              "Cobertura de chocolate de fresa con topping crujiente de fruta. Dulce, intensa y con sabor a golosina elegante.",
            image: "398ac48acc24b977.png",
          },
          {
            name: "Naranja",
            description:
              "Madeleine glaseada con naranja natural y un toque cítrico refrescante. Ligera, aromática y muy jugosa.",
            image: "2b4bd6eb8b03786e.png",
          },
          {
            name: "Mango",
            description:
              "Cobertura cremosa de mango con un sabor tropical suave y dulce. Fresca, exótica y perfecta para cualquier momento.",
            image: "aeef5a80884f14cb.png",
          },
          {
            name: "Spirulina Azul",
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
        title: "Café de especialidad",
        products: [
          {
            name: "Latte",
            description:
              "Café espresso combinado con leche cremosa y suave latte art. Equilibrado, cálido y perfecto para cualquier momento.",
            image: "9fa05e7aac8e3863.png",
          },
          {
            name: "Capuchino",
            description:
              "Espresso intenso con espuma cremosa y un toque de cacao o canela. Clásico, elegante y reconfortante.",
            image: "aeea95e2935f849e.png",
          },
          {
            name: "Expresso",
            description:
              "Café espresso de sabor intenso y aroma profundo. Corto, potente y lleno de carácter.",
            image: "9f516bc2485e6c75.png",
          },
          {
            name: "Americano",
            description:
              "Espresso suavizado con agua caliente para un café más ligero y aromático. Perfecto para disfrutar lentamente.",
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
              "Matcha japonés de sabor suave y equilibrado combinado con leche cremosa. Refrescante, delicado y perfecto para amantes del té verde.",
            image: "a8541c71504da466.png",
          },
          {
            name: "Chai Latte",
            description:
              "Bebida cremosa con especias chai como canela, vainilla y cardamomo. Dulce, aromática y muy reconfortante.",
            image: "31cebb4682e01ce7.png",
          },
          {
            name: "Ube Matcha Latte",
            description:
              "La mezcla más especial de Le Petit Bleu: ube dulce y cremoso combinado con matcha japonés. Visual, diferente y sorprendentemente adictivo.",
            image: "d3cff6c5c4973034.png",
          },
          {
            name: "Matcha",
            description:
              "Matcha puro con leche y hielo para disfrutar todo el sabor auténtico del té verde japonés. Intenso, fresco y energético.",
            image: "5c974c6dd9c9e6bb.png",
          },
          {
            name: "Thai Tea Latte",
            description:
              "Té tailandés tradicional con leche cremosa y un sabor dulce y especiado muy característico. Exótico y refrescante.",
            image: "52d9734e7feb3b8f.png",
          },
          {
            name: "Ube Latte",
            description:
              "Bebida cremosa de ube con un suave sabor dulce y vainilla natural. Color vibrante y textura irresistible.",
            image: "9b7dced6e9e5190d.png",
          },
        ],
      },
    ],
  },
  {
    label: "Para llevar",
    groups: [
      {
        title: "Le Petit Bleu Packs",
        products: [
          {
            name: "Le Petit Bleu Vainilla",
            description: "3 madeleines clásicas de vainilla",
            image: "c5352357afa3358d.png",
          },
          {
            name: "Le Petit Bleu Chocolate",
            description: "3 madeleines clásicas de chocolate",
            image: "b39844ef0a1136eb.png",
          },
          {
            name: "Mix Mini Le Petit Bleu Chocolate & Vainilla",
            description:
              "Mix de madeleines clásicas de chocolate y vainilla",
            image: "adb9edd773e0c191.png",
          },
          {
            name: "Mix Le Petit Bleu Chocolate Y Vainilla",
            description:
              "3 madeleines clásicas mix chocolate y vainilla",
            image: "35d703f4e04e7407.png",
          },
          {
            name: "Le Petit Bleu Box",
            description:
              "Madeleines artesanales en pack de 6, 12 o 24 piezas.",
            image: "1e6de299a4c8261a.png",
          },
          {
            name: "Le Petit Bleu for Doggies",
            description: "¡Solo por tiempo limitado!",
            image: "304158a5505a1cf5.png",
          },
        ],
      },
      {
        title: "Café & té en bolsa",
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
          <span className="madie-text-stroke-thin">El</span> Menú
        </h2>

        <div className="lg:pt-2">
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-madie-burgundy/80">
            Descubre nuestra selección de madeleines artesanales, cafés de
            especialidad y bebidas únicas. Todo preparado a diario en nuestro
            obrador de Chamberí.
          </p>

          <div
            className="mt-7 flex flex-wrap gap-2.5"
            role="tablist"
            aria-label="Categorías del menú"
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
