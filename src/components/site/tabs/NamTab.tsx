import { Link } from "@tanstack/react-router";
import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { RentCard } from "../RentCard";
import { menItems, type CatalogItem } from "@/lib/catalog";

const views = {
  all: {
    label: "Tất cả sản phẩm",
    description: "Toàn bộ bộ sưu tập nam được tuyển chọn cho công việc, sự kiện và phong cách mỗi ngày.",
    items: menItems,
  },
  "cong-so": {
    label: "Công sở",
    description: "Những lựa chọn chỉn chu cho lịch họp, gặp đối tác và ngày làm việc quan trọng.",
    items: menItems.filter((item) => item.cat === "cong-so"),
  },
  "hen-ho": {
    label: "Hẹn hò",
    description: "Các thiết kế lịch lãm, dễ gây thiện cảm cho buổi tối và những dịp cần tạo dấu ấn.",
    items: menItems.filter((item) => item.cat === "su-kien" || item.cat === "moi-ngay"),
  },
  "moi-ngay": {
    label: "Thanh lịch thường ngày",
    description: "Trang phục thoải mái, tinh tế cho lịch trình hằng ngày nhưng vẫn giữ nét chỉn chu.",
    items: menItems.filter((item) => item.cat === "moi-ngay"),
  },
} satisfies Record<string, { label: string; description: string; items: CatalogItem[] }>;

const viewLinks = [
  { id: "cong-so", label: "Công sở" },
  { id: "hen-ho", label: "Hẹn hò" },
  { id: "moi-ngay", label: "Thanh lịch thường ngày" },
  { id: "all", label: "Tất cả" },
];

const landing = {
  eyebrow: "NAM",
  heading: "Dịp đặc biệt",
  cards: [
    {
      title: "Công sở",
      description: "Chỉn chu, chuyên nghiệp, tự tin trong mọi cuộc họp.",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nam công sở lịch lãm",
      target: { tab: "nam", view: "cong-so" },
    },
    {
      title: "Hẹn hò",
      description: "Lịch lãm, cuốn hút, ghi điểm trong mọi khoảnh khắc.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nam lịch lãm cho buổi hẹn",
      target: { tab: "nam", view: "hen-ho" },
    },
    {
      title: "Thanh lịch thường ngày",
      description: "Thoải mái, tinh tế, phong cách mỗi ngày.",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nam thường ngày tinh tế",
      target: { tab: "nam", view: "moi-ngay" },
    },
  ],
  allProducts: {
    eyebrow: "NAM",
    heading: "Tất cả sản phẩm",
    description: "Khám phá toàn bộ bộ sưu tập dành cho nam.",
    ctaLabel: "Xem tất cả sản phẩm",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1500&q=85",
    imageAlt: "Bộ sưu tập trang phục nam FASTWear",
    target: { tab: "nam", view: "all" },
  },
};

export function NamTab({ view }: { view?: string }) {
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
            <div className="text-xs font-semibold uppercase text-[#1d4e3f]">NAM</div>
            <h1 className="mt-1 font-serif text-4xl font-medium text-[#1C1410] md:text-5xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1C1410]/65 md:text-base">{description}</p>
          </div>
          <span className="text-xs font-semibold uppercase text-[#1C1410]/60">{items.length} sản phẩm</span>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          <Link
            to="/"
            search={{ tab: "nam" }}
            className="rounded-md border border-[#d8cdb5] bg-white/70 px-3 py-2 text-xs font-semibold text-[#565149] transition hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
          >
            Lựa chọn dịp
          </Link>
          {viewLinks.map((option) => (
            <Link
              key={option.id}
              to="/"
              search={{ tab: "nam", view: option.id }}
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
