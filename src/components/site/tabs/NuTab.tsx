import { IntermediateCategoryLanding } from "../IntermediateCategoryLanding";
import { ProductGridView } from "../ProductGridView";
import type { ProductGridItem } from "../ProductGridCard";
import { products } from "@/lib/products";

const badgeById: Record<string, string> = {
  "1": "Dự tiệc",
  "5": "Du lịch",
  "6": "Công sở",
  "7": "Dự tiệc",
  "11": "Dự tiệc",
  "12": "Dự tiệc",
  "13": "Cưới hỏi",
};

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
    items: productItems(["1", "5", "6", "7", "11", "12", "13"]),
  },
  "du-tiec": {
    label: "Dự tiệc",
    description: "Các thiết kế thanh lịch và nổi bật cho tiệc tối, sự kiện và những khoảnh khắc đáng nhớ.",
    items: productItems(["1", "7", "11", "12", "13"]),
  },
  "du-lich": {
    label: "Du lịch",
    description: "Trang phục nhẹ nhàng, thoải mái và lên hình đẹp cho mọi hành trình.",
    items: productItems(["5"]),
  },
  "cuoi-hoi": {
    label: "Cưới hỏi",
    description: "Lựa chọn trang nhã cho lễ cưới, tiệc thân mật và những ngày trọng đại.",
    items: productItems(["1", "13"]),
  },
} satisfies Record<string, { label: string; description: string; items: ProductGridItem[] }>;

const viewLinks = [
  { id: "all", label: "Tất cả" },
  { id: "du-tiec", label: "Dự tiệc" },
  { id: "du-lich", label: "Du lịch" },
  { id: "cuoi-hoi", label: "Cưới hỏi" },
];

const landing = {
  eyebrow: "NỮ",
  heading: "Dịp đặc biệt",
  cards: [
    {
      title: "Dự tiệc",
      description: "Thanh lịch và nổi bật cho những khoảnh khắc đáng nhớ.",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ dự tiệc thanh lịch",
      target: { tab: "nu", view: "du-tiec" },
    },
    {
      title: "Du lịch",
      description: "Thoải mái, thời trang, đồng hành cùng mọi hành trình.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ du lịch thời trang",
      target: { tab: "nu", view: "du-lich" },
    },
    {
      title: "Cưới hỏi",
      description: "Tinh tế và trang nhã cho ngày trọng đại.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Trang phục nữ cưới hỏi trang nhã",
      target: { tab: "nu", view: "cuoi-hoi" },
    },
  ],
  allProducts: {
    eyebrow: "NỮ",
    heading: "Tất cả sản phẩm",
    description: "Khám phá toàn bộ bộ sưu tập nữ với những thiết kế thời thượng và đa dạng phong cách.",
    ctaLabel: "Xem tất cả sản phẩm",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1500&q=85",
    imageAlt: "Bộ sưu tập trang phục nữ FASTWear",
    target: { tab: "nu", view: "all" },
  },
};

export function NuTab({ view }: { view?: string }) {
  const activeView = view && view in views ? views[view as keyof typeof views] : undefined;

  if (!activeView) {
    return <IntermediateCategoryLanding {...landing} />;
  }

  return (
    <ProductGridView
      activeId={view ?? "all"}
      description={activeView.description}
      eyebrow="NỮ"
      items={activeView.items}
      landingLinkLabel="Lựa chọn dịp"
      tab="nu"
      title={activeView.label}
      viewLinks={viewLinks}
    />
  );
}
