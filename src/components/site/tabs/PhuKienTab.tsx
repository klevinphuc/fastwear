import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { ProductGridView } from "../ProductGridView";
import { menAccessories, womenAccessories, type CatalogItem } from "@/lib/catalog";

const accessories = [...womenAccessories, ...menAccessories];

const views = {
  all: {
    label: "Phụ kiện",
    description: "Hoàn thiện phong cách của bạn với bộ sưu tập phụ kiện cao cấp.",
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
  { id: "all", label: "Tất cả" },
  { id: "tui-xach", label: "Túi xách" },
  { id: "giay", label: "Giày" },
  { id: "trang-suc", label: "Trang sức" },
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
    <ProductGridView
      activeId={view ?? "all"}
      description={activeView.description}
      eyebrow="PHỤ KIỆN"
      imageFit="contain"
      items={activeView.items}
      landingLinkLabel="Dòng sản phẩm"
      tab="phu-kien"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
