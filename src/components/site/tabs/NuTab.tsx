import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { products } from "@/lib/products";

const badgeById: Record<string, string> = {
  "1": "Dự tiệc",
  "nu-blazer-hobbs": "Công sở",
  "nu-blazer-massimo-dutti": "Công sở",
  "nu-so-mi-urban-revivo": "Công sở",
  "nu-vay-midi-nem": "Công sở",
  "nu-so-mi-lua-reformation": "Công sở",
  "nu-dam-sequin-zara": "Dạ hội",
  "nu-dam-cocktail-do": "Dự tiệc",
  "nu-dam-nude-champagne": "Dự tiệc",
  "nu-dam-satin-xanh-ngoc": "Dự tiệc",
  "nu-dam-lech-vai-den": "Dạ hội",
  "nu-da-hoi-trang-xe-ta": "Dạ hội",
  "nu-dam-da-hoi-tay-dai": "Dạ hội",
  "nu-suit-cong-so-kem": "Công sở",
  "nu-suit-cong-so-nau": "Công sở",
  "nu-set-cong-so-burgundy": "Công sở",
};

const womenProductIds = [
  "1",
  "nu-blazer-hobbs",
  "nu-blazer-massimo-dutti",
  "nu-so-mi-urban-revivo",
  "nu-vay-midi-nem",
  "nu-so-mi-lua-reformation",
  "nu-dam-sequin-zara",
  "nu-dam-cocktail-do",
  "nu-dam-nude-champagne",
  "nu-dam-satin-xanh-ngoc",
  "nu-dam-lech-vai-den",
  "nu-da-hoi-trang-xe-ta",
  "nu-dam-da-hoi-tay-dai",
  "nu-suit-cong-so-kem",
  "nu-suit-cong-so-nau",
  "nu-set-cong-so-burgundy",
];

const partyProductIds = [
  "1",
  "nu-dam-sequin-zara",
  "nu-dam-cocktail-do",
  "nu-dam-nude-champagne",
  "nu-dam-satin-xanh-ngoc",
  "nu-dam-lech-vai-den",
  "nu-da-hoi-trang-xe-ta",
  "nu-dam-da-hoi-tay-dai",
];

const officeProductIds = [
  "nu-blazer-hobbs",
  "nu-blazer-massimo-dutti",
  "nu-so-mi-urban-revivo",
  "nu-vay-midi-nem",
  "nu-so-mi-lua-reformation",
  "nu-suit-cong-so-kem",
  "nu-suit-cong-so-nau",
  "nu-set-cong-so-burgundy",
];

const productItems = (ids: string[]): ProductGridItem[] =>
  ids.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    if (!product) return [];
    return {
      id: product.id,
      name: product.name,
      brand: product.designer,
      price: product.price,
      deposit: product.deposit,
      image: product.image,
      badge: badgeById[id],
    };
  });

const views = {
  all: {
    label: "Nữ",
    description: "Khám phá bộ sưu tập thời trang nữ cao cấp cho mọi khoảnh khắc đáng nhớ.",
    items: productItems(womenProductIds),
  },
  "du-tiec": {
    label: "Dự tiệc",
    description:
      "Các thiết kế thanh lịch và nổi bật cho tiệc tối, sự kiện và những khoảnh khắc đáng nhớ.",
    items: productItems(partyProductIds),
  },
  "cong-so": {
    label: "Công sở",
    description: "Blazer, sơ mi, suit và set công sở dành cho những ngày cần xuất hiện chỉn chu.",
    items: productItems(officeProductIds),
  },
  "chup-anh": {
    label: "Chụp ảnh",
    description: "Các lựa chọn dễ lên hình, giữ phom tốt và tạo điểm nhấn trong từng khung ảnh.",
    items: productItems(["1", ...partyProductIds.slice(1), ...officeProductIds.slice(0, 4)]),
  },
} satisfies Record<string, { label: string; description: string; items: ProductGridItem[] }>;

const viewLinks = [
  { id: "all", label: "Tất cả" },
  { id: "du-tiec", label: "Dự tiệc" },
  { id: "cong-so", label: "Công sở" },
  { id: "chup-anh", label: "Chụp ảnh" },
];

export function NuTab({ view }: { view?: string }) {
  const activeId = view && view in views ? view : "all";
  const activeView = views[activeId as keyof typeof views];

  return (
    <ProductGridView
      activeId={activeId}
      description={activeView.description}
      eyebrow="NỮ"
      items={activeView.items}
      tab="nu"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
