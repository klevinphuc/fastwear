import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { getProductsByCollectionTab } from "@/lib/catalog";
import type { Product } from "@/lib/products";

const accessoryProducts = getProductsByCollectionTab("Phụ kiện");

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
    label: "Phụ kiện",
    description: "Hoàn thiện outfit với phụ kiện cao cấp, dễ phối và phù hợp từng dịp xuất hiện.",
    items: productItems(accessoryProducts),
  },
  "tui-xach": {
    label: "Túi xách",
    description: "Các mẫu túi tinh tế, dễ phối cùng trang phục công sở, dự tiệc và thường ngày.",
    items: productItems(
      accessoryProducts.filter((product) => categoryIncludes(product, ["túi"])),
    ),
  },
  giay: {
    label: "Giày",
    description: "Giày thanh lịch, bền bỉ và phù hợp với từng kiểu xuất hiện.",
    items: productItems(
      accessoryProducts.filter((product) => categoryIncludes(product, ["giày"])),
    ),
  },
  "trang-suc": {
    label: "Trang sức",
    description: "Điểm nhấn vừa đủ để hoàn thiện outfit và thể hiện dấu ấn cá nhân.",
    items: productItems(
      accessoryProducts.filter((product) =>
        categoryIncludes(product, ["trang sức", "đồng hồ", "phụ kiện nam"]),
      ),
    ),
  },
} satisfies Record<string, { label: string; description: string; items: ProductGridItem[] }>;

const viewLinks = [
  { id: "all", label: "Tất cả" },
  { id: "tui-xach", label: "Túi xách" },
  { id: "giay", label: "Giày" },
  { id: "trang-suc", label: "Trang sức" },
];

export function PhuKienTab({ view }: { view?: string }) {
  const activeId = view && view in views ? view : "all";
  const activeView = views[activeId as keyof typeof views];

  return (
    <ProductGridView
      activeId={activeId}
      description={activeView.description}
      eyebrow="PHỤ KIỆN"
      items={activeView.items}
      tab="phu-kien"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
