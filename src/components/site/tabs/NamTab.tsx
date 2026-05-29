import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { products } from "@/lib/products";

const badgeById: Record<string, string> = {
  "2": "Dạo phố",
  "nam-suit-toi-mau": "Suit",
  "nam-suit-sang-trong": "Suit",
  "nam-vest-du-tiec": "Dự tiệc",
  "nam-so-mi-nhieu-mau": "Sơ mi",
  "nam-quan-tay-nhieu-mau": "Quần tây",
};

const menProductIds = [
  "2",
  "nam-suit-toi-mau",
  "nam-suit-sang-trong",
  "nam-vest-du-tiec",
  "nam-so-mi-nhieu-mau",
  "nam-quan-tay-nhieu-mau",
];

const formalProductIds = ["nam-suit-toi-mau", "nam-suit-sang-trong", "nam-vest-du-tiec"];

const everydayProductIds = ["2", "nam-so-mi-nhieu-mau", "nam-quan-tay-nhieu-mau"];

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
    label: "Tất cả sản phẩm Nam",
    description:
      "Toàn bộ bộ sưu tập nam được tuyển chọn cho công việc, sự kiện và phong cách mỗi ngày.",
    items: productItems(menProductIds),
  },
  "cong-so": {
    label: "Công sở",
    description: "Những lựa chọn chỉn chu cho lịch họp, gặp đối tác và ngày làm việc quan trọng.",
    items: productItems([
      "2",
      "nam-suit-toi-mau",
      "nam-suit-sang-trong",
      "nam-so-mi-nhieu-mau",
      "nam-quan-tay-nhieu-mau",
    ]),
  },
  "du-tiec": {
    label: "Dự tiệc",
    description: "Suit, vest và áo khoác nổi bật cho tiệc cưới, gala và những dịp cần tạo dấu ấn.",
    items: productItems(formalProductIds),
  },
  "moi-ngay": {
    label: "Thanh lịch thường ngày",
    description:
      "Trang phục thoải mái, tinh tế cho lịch trình hằng ngày nhưng vẫn giữ nét chỉn chu.",
    items: productItems(everydayProductIds),
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
