import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { products } from "@/lib/products";

const badgeById: Record<string, string> = {
  "3": "Nón",
  "4": "Túi xách",
  "pk-cao-got-vien-da": "Giày",
  "pk-cao-got-dolce-gabbana": "Giày",
  "pk-ysl-slingback-trang": "Giày",
  "pk-valentino-garavani": "Giày",
  "pk-tabby-shoulder-coach": "Túi xách",
  "pk-kissblock-pouch-coach": "Túi xách",
  "pk-bucket-monogram-tory-burch": "Túi xách",
  "pk-trang-suc-bac-swaroski": "Trang sức",
  "pk-trang-suc-ngoc-trai": "Trang sức",
  "pk-dong-ho-daniel-wellington": "Đồng hồ",
  "pk-giay-nam-john-lobb": "Giày",
  "pk-giay-tay-nam-bitis": "Giày",
  "pk-dong-ho-nam-seiko": "Đồng hồ",
  "pk-kep-caravat": "Phụ kiện nam",
  "pk-khuy-mang-set-tron": "Phụ kiện nam",
  "pk-ghim-cai-ao": "Phụ kiện nam",
};

const accessoryProductIds = [
  "3",
  "4",
  "pk-cao-got-vien-da",
  "pk-cao-got-dolce-gabbana",
  "pk-ysl-slingback-trang",
  "pk-valentino-garavani",
  "pk-tabby-shoulder-coach",
  "pk-kissblock-pouch-coach",
  "pk-bucket-monogram-tory-burch",
  "pk-trang-suc-bac-swaroski",
  "pk-trang-suc-ngoc-trai",
  "pk-dong-ho-daniel-wellington",
  "pk-giay-nam-john-lobb",
  "pk-giay-tay-nam-bitis",
  "pk-dong-ho-nam-seiko",
  "pk-kep-caravat",
  "pk-khuy-mang-set-tron",
  "pk-ghim-cai-ao",
];

const bagProductIds = [
  "4",
  "pk-tabby-shoulder-coach",
  "pk-kissblock-pouch-coach",
  "pk-bucket-monogram-tory-burch",
];

const shoeProductIds = [
  "pk-cao-got-vien-da",
  "pk-cao-got-dolce-gabbana",
  "pk-ysl-slingback-trang",
  "pk-valentino-garavani",
  "pk-giay-nam-john-lobb",
  "pk-giay-tay-nam-bitis",
];

const jewelryProductIds = [
  "pk-trang-suc-bac-swaroski",
  "pk-trang-suc-ngoc-trai",
  "pk-dong-ho-daniel-wellington",
  "pk-dong-ho-nam-seiko",
  "pk-kep-caravat",
  "pk-khuy-mang-set-tron",
  "pk-ghim-cai-ao",
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
    label: "Phụ kiện",
    description: "Hoàn thiện phong cách của bạn với bộ sưu tập phụ kiện cao cấp.",
    items: productItems(accessoryProductIds),
  },
  "tui-xach": {
    label: "Túi xách",
    description: "Các mẫu túi tinh tế, dễ phối cùng trang phục công sở, dự tiệc và thường ngày.",
    items: productItems(bagProductIds),
  },
  giay: {
    label: "Giày",
    description: "Những lựa chọn giày thanh lịch, bền bỉ và phù hợp với từng kiểu xuất hiện.",
    items: productItems(shoeProductIds),
  },
  "trang-suc": {
    label: "Trang sức",
    description: "Điểm nhấn vừa đủ để hoàn thiện outfit và thể hiện dấu ấn cá nhân.",
    items: productItems(jewelryProductIds),
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
