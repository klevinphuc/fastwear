import { Link } from "@tanstack/react-router";
import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { RentCard } from "../RentCard";
import { menAccessories, womenAccessories, type CatalogItem } from "@/lib/catalog";

const accessories = [...womenAccessories, ...menAccessories];

const views = {
  all: {
    label: "Tất cả sản phẩm",
    description: "Toàn bộ phụ kiện được tuyển chọn để hoàn thiện phong cách cho nhiều dịp khác nhau.",
    items: accessories,
  },
  "tui-xach": {
    label: "Túi xách",
    description: "Các mẫu túi tinh tế, dễ phối cùng trang phục công sở, dự tiệc và thường ngày.",
    items: accessories.filter((item) => item.cat === "tui"),
  },
  giay: {
    label: "Giày",
    description: "Những lựa chọn giày thanh lịch, bền bỉ và phù hợp với từng kiểu xuất hiện.",
    items: accessories.filter((item) => item.cat === "giay"),
  },
  "trang-suc": {
    label: "Trang sức",
    description: "Điểm nhấn vừa đủ để hoàn thiện outfit và thể hiện dấu ấn cá nhân.",
    items: accessories.filter((item) => item.cat === "trang-suc"),
  },
} satisfies Record<string, { label: string; description: string; items: CatalogItem[] }>;

const viewLinks = [
  { id: "tui-xach", label: "Túi xách" },
  { id: "giay", label: "Giày" },
  { id: "trang-suc", label: "Trang sức" },
  { id: "all", label: "Tất cả" },
];

const landing = {
  eyebrow: "PHỤ KIỆN",
  heading: "Dòng sản phẩm",
  cards: [
    {
      title: "Túi xách",
      description: "Thiết kế tinh tế, chất liệu cao cấp hoàn thiện phong cách.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Túi xách cao cấp cho thuê tại FASTWear",
      target: { tab: "phu-kien", view: "tui-xach" },
    },
    {
      title: "Giày",
      description: "Êm ái, bền bỉ và thời thượng trong từng bước đi.",
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Giày thời trang cao cấp",
      target: { tab: "phu-kien", view: "giay" },
    },
    {
      title: "Trang sức",
      description: "Điểm nhấn tinh tế, thể hiện dấu ấn cá nhân.",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang sức tinh tế cho outfit cao cấp",
      target: { tab: "phu-kien", view: "trang-suc" },
    },
  ],
  allProducts: {
    eyebrow: "PHỤ KIỆN",
    heading: "Tất cả sản phẩm",
    description: "Khám phá toàn bộ phụ kiện được tuyển chọn kỹ lưỡng, nâng tầm phong cách của bạn.",
    ctaLabel: "Xem tất cả sản phẩm",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1500&q=85",
    imageAlt: "Bộ sưu tập phụ kiện FASTWear",
    target: { tab: "phu-kien", view: "all" },
  },
};

export function PhuKienTab({ view }: { view?: string }) {
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
            <div className="text-xs font-semibold uppercase text-[#1d4e3f]">PHỤ KIỆN</div>
            <h1 className="mt-1 font-serif text-4xl font-medium text-[#1C1410] md:text-5xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1C1410]/65 md:text-base">{description}</p>
          </div>
          <span className="text-xs font-semibold uppercase text-[#1C1410]/60">{items.length} sản phẩm</span>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          <Link
            to="/"
            search={{ tab: "phu-kien" }}
            className="rounded-md border border-[#d8cdb5] bg-white/70 px-3 py-2 text-xs font-semibold text-[#565149] transition hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
          >
            Dòng sản phẩm
          </Link>
          {viewLinks.map((option) => (
            <Link
              key={option.id}
              to="/"
              search={{ tab: "phu-kien", view: option.id }}
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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
