import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { getProductsByCollectionTab } from "@/lib/catalog";
import type { Product } from "@/lib/products";

const menProducts = getProductsByCollectionTab("Nam");

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
    label: "Tất cả sản phẩm Nam",
    description:
      "Trang phục nam được tuyển chọn cho công việc, sự kiện, tiệc cưới và những lịch trình cần tạo dấu ấn.",
    items: productItems(menProducts),
  },
  "cong-so": {
    label: "Công sở",
    description: "Trang phục chỉn chu cho lịch họp, gặp đối tác và ngày làm việc quan trọng.",
    items: productItems(
      menProducts.filter((product) =>
        categoryIncludes(product, ["suit", "vest", "áo sơ mi", "quần tây", "áo khoác"]),
      ),
    ),
  },
  "du-tiec": {
    label: "Dự tiệc",
    description: "Suit, vest và áo khoác nổi bật cho tiệc cưới, gala và những dịp cần tạo dấu ấn.",
    items: productItems(
      menProducts.filter(
        (product) =>
          includesAny(product.occasion, ["Tiệc cưới", "Dạ hội"]) ||
          categoryIncludes(product, ["suit", "vest"]),
      ),
    ),
  },
  "moi-ngay": {
    label: "Thanh lịch thường ngày",
    description:
      "Trang phục thoải mái, tinh tế cho lịch trình hằng ngày nhưng vẫn giữ nét chỉn chu.",
    items: productItems(
      menProducts.filter((product) => includesAny(product.occasion, ["Dạo phố", "Chụp ảnh"])),
    ),
  },
} satisfies Record<string, { label: string; description: string; items: ProductGridItem[] }>;

const viewLinks = [
  { id: "all", label: "Tất cả" },
  { id: "cong-so", label: "Công sở" },
  { id: "du-tiec", label: "Dự tiệc" },
  { id: "moi-ngay", label: "Hằng ngày" },
];

export function NamTab({ view }: { view?: string }) {
  const activeId = view && view in views ? view : "all";
  const activeView = views[activeId as keyof typeof views];

  return (
    <ProductGridView
      activeId={activeId}
      description={activeView.description}
      eyebrow="NAM"
      items={activeView.items}
      tab="nam"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
