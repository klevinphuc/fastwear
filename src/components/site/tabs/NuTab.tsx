import { Link } from "@tanstack/react-router";
import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { RentCard } from "../RentCard";
import { womenItems, type CatalogItem } from "@/lib/catalog";

const views = {
  all: {
    label: "Tất cả sản phẩm",
    description: "Toàn bộ bộ sưu tập nữ cho tiệc, du lịch, cưới hỏi và những dịp cần xuất hiện chỉn chu.",
    items: womenItems,
  },
  "du-tiec": {
    label: "Dự tiệc",
    description: "Các thiết kế thanh lịch và nổi bật cho tiệc tối, sự kiện và những khoảnh khắc đáng nhớ.",
    items: womenItems.filter((item) => item.cat === "du-tiec"),
  },
  "du-lich": {
    label: "Du lịch",
    description: "Trang phục nhẹ nhàng, thoải mái và lên hình đẹp cho mọi hành trình.",
    items: womenItems.filter((item) => item.cat === "du-lich"),
  },
  "cuoi-hoi": {
    label: "Cưới hỏi",
    description: "Lựa chọn trang nhã cho lễ cưới, tiệc thân mật và những ngày trọng đại.",
    items: womenItems.filter((item) => item.cat === "cuoi-hoi"),
  },
} satisfies Record<string, { label: string; description: string; items: CatalogItem[] }>;

const viewLinks = [
  { id: "du-tiec", label: "Dự tiệc" },
  { id: "du-lich", label: "Du lịch" },
  { id: "cuoi-hoi", label: "Cưới hỏi" },
  { id: "all", label: "Tất cả" },
];

const landing = {
  eyebrow: "NỮ",
  heading: "Dịp đặc biệt",
  cards: [
    {
      title: "Dự tiệc",
      description: "Thanh lịch và nổi bật cho những khoảnh khắc đáng nhớ.",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ dự tiệc thanh lịch",
      target: { tab: "nu", view: "du-tiec" },
    },
    {
      title: "Du lịch",
      description: "Thoải mái, thời trang, đồng hành cùng mọi hành trình.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ du lịch thời trang",
      target: { tab: "nu", view: "du-lich" },
    },
    {
      title: "Cưới hỏi",
      description: "Tinh tế và trang nhã cho ngày trọng đại.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ cưới hỏi trang nhã",
      target: { tab: "nu", view: "cuoi-hoi" },
    },
  ],
  allProducts: {
    eyebrow: "NỮ",
    heading: "Tất cả sản phẩm",
    description: "Khám phá toàn bộ bộ sưu tập nữ với những thiết kế thời thượng và đa dạng phong cách.",
    ctaLabel: "Xem tất cả sản phẩm",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1500&q=85",
    imageAlt: "Bộ sưu tập trang phục nữ FASTWear",
    target: { tab: "nu", view: "all" },
  },
};

export function NuTab({ view }: { view?: string }) {
  const activeView = view && view in views ? views[view as keyof typeof views] : undefined;

  if (!activeView) {
    return <IntermediateCategoryLanding {...landing} />;
  }

  return (
    <CatalogView
      activeId={view as keyof typeof views}
      description={activeView.description}
      items={activeView.items}
      title={activeView.label}
    />
  );
}

function CatalogView({
  activeId,
  description,
  items,
  title,
}: {
  activeId: keyof typeof views;
  description: string;
  items: CatalogItem[];
  title: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-6">
      <div className="border border-[#d8cdb5]/75 bg-white/72 p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase text-[#1d4e3f]">NỮ</div>
            <h1 className="mt-1 font-serif text-4xl font-medium text-[#1C1410] md:text-5xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1C1410]/65 md:text-base">{description}</p>
          </div>
          <span className="text-xs font-semibold uppercase text-[#1C1410]/60">{items.length} sản phẩm</span>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          <Link
            to="/"
            search={{ tab: "nu" }}
            className="rounded-md border border-[#d8cdb5] bg-white/70 px-3 py-2 text-xs font-semibold text-[#565149] transition hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
          >
            Lựa chọn dịp
          </Link>
          {viewLinks.map((option) => (
            <Link
              key={option.id}
              to="/"
              search={{ tab: "nu", view: option.id }}
              className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
                activeId === option.id
                  ? "border-[#1d4e3f] bg-[#1d4e3f] text-[#fbf8ef]"
                  : "border-[#d8cdb5] bg-white/70 text-[#565149] hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <RentCard
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                deposit: item.deposit,
                image: item.image,
                sizes: item.sizes,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
