import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { ProductGridView } from "../ProductGridView";
import { menItems, type CatalogItem } from "@/lib/catalog";

const views = {
  all: {
    label: "Tất cả sản phẩm Nam",
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
  { id: "all", label: "Tất cả" },
  { id: "cong-so", label: "Công sở" },
  { id: "hen-ho", label: "Hẹn hò" },
  { id: "moi-ngay", label: "Hằng ngày" },
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
    <ProductGridView
      activeId={view ?? "all"}
      description={activeView.description}
      eyebrow="NAM"
      items={activeView.items}
      landingLinkLabel="Lựa chọn dịp"
      tab="nam"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
