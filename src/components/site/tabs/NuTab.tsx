import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { getProductsByCollectionTab } from "@/lib/catalog";
import type { Product } from "@/lib/products";

const womenProducts = getProductsByCollectionTab("Nữ");

const includesAny = (values: string[], needles: string[]) =>
  values.some((value) => needles.includes(value));

const categoryIncludes = (product: Product, keywords: string[]) => {
  const category = product.category.toLowerCase();

  return keywords.some((keyword) => category.includes(keyword));
};

const productItems = (source: Product[]): ProductGridItem[] =>
  source.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.designer,
    price: product.price,
    deposit: product.deposit,
    image: product.image,
    badge: product.category,
  }));

const views = {
  all: {
    label: "Nữ",
    description: "Khám phá bộ sưu tập thời trang nữ cao cấp cho mọi khoảnh khắc đáng nhớ.",
    items: productItems(womenProducts),
  },
  "du-tiec": {
    label: "Dự tiệc",
    description:
      "Các thiết kế thanh lịch và nổi bật cho tiệc tối, sự kiện và những khoảnh khắc đáng nhớ.",
    items: productItems(
      womenProducts.filter(
        (product) =>
          includesAny(product.occasion, ["Tiệc cưới", "Dạ hội"]) ||
          categoryIncludes(product, ["dự tiệc", "dạ hội"]),
      ),
    ),
  },
  "cong-so": {
    label: "Công sở",
    description: "Blazer, sơ mi, suit và set công sở dành cho những ngày cần xuất hiện chỉn chu.",
    items: productItems(
      womenProducts.filter((product) =>
        categoryIncludes(product, ["công sở", "suit", "set công sở", "áo sơ mi", "chân váy"]),
      ),
    ),
  },
  "chup-anh": {
    label: "Chụp ảnh",
    description: "Các lựa chọn dễ lên hình, giữ phom tốt và tạo điểm nhấn trong từng khung ảnh.",
    items: productItems(womenProducts.filter((product) => product.occasion.includes("Chụp ảnh"))),
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
