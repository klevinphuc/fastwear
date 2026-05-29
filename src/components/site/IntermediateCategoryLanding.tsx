import { Link } from "@tanstack/react-router";

export type IntermediateCategoryCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  target: {
    tab: string;
    view: string;
  };
};

export type IntermediateCategoryAllProducts = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  target: {
    tab: string;
    view: string;
  };
};

export function IntermediateCategoryLanding({
  eyebrow,
  heading,
  cards,
  allProducts,
}: {
  eyebrow: string;
  heading: string;
  cards: IntermediateCategoryCard[];
  allProducts: IntermediateCategoryAllProducts;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-6 md:pt-12">
      <section aria-labelledby={`${eyebrow}-discovery-heading`}>
        <div className="text-center">
          <h1
            id={`${eyebrow}-discovery-heading`}
            className="font-serif text-4xl font-medium leading-tight text-[#16130f] md:text-6xl"
          >
            {heading}
          </h1>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to="/"
              search={card.target}
              className="group block text-left"
              aria-label={`Xem ${card.title}`}
            >
              <div className="overflow-hidden rounded-md bg-[#eee5d5]">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-4">
                <h2 className="font-serif text-xl font-medium leading-snug text-[#17130f] md:text-2xl">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5f625c]">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby={`${eyebrow}-all-products-heading`}
        className="mx-auto mt-12 max-w-5xl border-t border-[#d8cdb5]/80 pt-8 text-center md:mt-14"
      >
        <h2
          id={`${eyebrow}-all-products-heading`}
          className="font-serif text-4xl font-medium leading-tight text-[#16130f] md:text-5xl"
        >
          {allProducts.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#5f625c] md:text-base">
          {allProducts.description}
        </p>
        <div className="mt-5">
          <Link
            to="/"
            search={allProducts.target}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {allProducts.ctaLabel}
          </Link>
        </div>
        <div className="mt-6 overflow-hidden rounded-md bg-[#eee5d5]">
          <img
            src={allProducts.image}
            alt={allProducts.imageAlt}
            className="h-[180px] w-full object-cover md:h-[220px] lg:h-[250px]"
          />
        </div>
      </section>
    </div>
  );
}
