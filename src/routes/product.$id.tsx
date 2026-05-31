import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { lazy, Suspense, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { ARTryOn } from "@/components/site/ARTryOn";
import { ARQrBadge } from "@/components/site/ARQrBadge";
import { useCart } from "@/lib/cart";
import { products, formatVND, type Product } from "@/lib/products";
import { Star, ChevronDown, Sparkles } from "lucide-react";

const ARTryOn3DLegacy = lazy(() =>
  import("@/components/site/ARTryOn3DLegacy").then((module) => ({
    default: module.ARTryOn3DLegacy,
  })),
);

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <ProductNotFound id={id} />;
  }

  return <ProductDetail product={product} />;
}

function ProductNotFound({ id }: { id: string }) {
  return (
    <SiteShell>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center md:px-8">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Không tìm thấy sản phẩm
        </div>
        <h1 className="mt-4 font-serif text-4xl">Sản phẩm này chưa có trong bộ sưu tập</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Mã sản phẩm "{id}" không tồn tại hoặc đã được gỡ khỏi FASTWear.
        </p>
        <Link
          to="/categories"
          className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Quay lại bộ sưu tập
        </Link>
      </div>
    </SiteShell>
  );
}

type ProductReview = {
  n: string;
  t: string;
  q: string;
  r: number;
  meta?: string;
};

const productSpecificReviews: Record<string, ProductReview[]> = {
  "1": [
    {
      n: "Minh Anh",
      t: "Dáng hoa rất mềm và nữ tính",
      q: "Mình thuê đi tiệc cưới ban ngày, váy ôm eo vừa đủ và phần chân váy lên hình rất nhẹ. Màu hoa mẫu đơn ngoài đời dịu hơn ảnh, hợp makeup tông hồng.",
      r: 5,
      meta: "Size S · 1m60 · 48kg",
    },
    {
      n: "Khánh Vân",
      t: "Không cần chỉnh nhiều",
      q: "Đầm được chuẩn bị sạch, thơm nhẹ và đường may phần ngực khá chắc. Mặc 4 tiếng vẫn thoải mái, chỉ cần chọn nội y phù hợp là ổn.",
      r: 5,
      meta: "Thuê cho tiệc cưới",
    },
  ],
  "2": [
    {
      n: "Tuấn Minh",
      t: "Áo khoác có điểm nhấn rõ",
      q: "Form drop vai đúng chất street style, mặc với quần đen và sneaker là nổi bật ngay. Chất áo dày vừa, không bị bí khi chụp ngoài trời.",
      r: 5,
      meta: "Size L · 1m76 · 68kg",
    },
    {
      n: "Bảo Trâm",
      t: "Unisex dễ mặc",
      q: "Mình mặc oversize để chụp lookbook, họa tiết lên ảnh rất rõ. FASTWear có nhắc trước về độ rộng vai nên chọn size không bị lỡ.",
      r: 4,
      meta: "Size M · chụp ảnh studio",
    },
  ],
  "3": [
    {
      n: "Gia Hân",
      t: "Màu beige dễ phối",
      q: "Nón sạch, đứng form và màu ngoài đời rất hợp các set trắng/kem. Mình dùng cho buổi chụp picnic, ảnh ra nhìn tự nhiên hơn hẳn.",
      r: 5,
      meta: "Phụ kiện chụp ảnh",
    },
    {
      n: "Hoàng Nam",
      t: "Không bị mềm vành",
      q: "Vành nón giữ dáng tốt, đội lâu không khó chịu. Phù hợp với outfit casual hơn là đồ quá trang trọng.",
      r: 4,
      meta: "Free size",
    },
  ],
  "4": [
    {
      n: "Ngọc Thảo",
      t: "Túi nhỏ nhưng bắt ảnh",
      q: "Màu hồng lên ảnh tiệc tối rất xinh, phần nơ tạo điểm nhấn mà không bị sến. Đựng vừa son, thẻ và điện thoại nhỏ.",
      r: 5,
      meta: "Đi tiệc tối",
    },
    {
      n: "Yến Nhi",
      t: "Hoàn thiện outfit nhanh",
      q: "Mình thuê kèm váy nude champagne, tổng thể nhìn mềm và sang hơn. Túi được bọc kỹ khi giao, không thấy trầy xước.",
      r: 5,
      meta: "Phối cùng đầm dự tiệc",
    },
  ],
};

const reviewerNames = [
  "Mai Linh",
  "Phương Nghi",
  "Anh Thư",
  "Quỳnh Trâm",
  "Bảo Châu",
  "Minh Khang",
  "Gia Bảo",
  "Hoàng Phúc",
];

function productHash(value: string) {
  return value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function reviewerFor(product: Product, offset: number) {
  const index = (productHash(product.id) + offset) % reviewerNames.length;
  return reviewerNames[index];
}

function getProductReviews(product: Product): ProductReview[] {
  const specific = productSpecificReviews[product.id];
  if (specific) return specific;

  const text = normalizeText(`${product.name} ${product.category} ${product.gender}`);
  const occasion = product.occasion[0]?.toLowerCase() ?? "sự kiện";
  const sizeMeta =
    product.sizes.length === 1 ? `Size ${product.sizes[0]}` : `Size ${product.sizes.join("/")}`;

  if (/dam|vay|da hoi|du tiec|cocktail|sequin/.test(text)) {
    return [
      {
        n: reviewerFor(product, 0),
        t: "Lên dáng và lên ảnh rất ổn",
        q: `Mình thuê ${product.name} cho ${occasion}, phần eo và vai lên form gọn, không bị nhăn khi di chuyển. Chất vải nhìn sang hơn mong đợi.`,
        r: product.rating >= 4.8 ? 5 : 4,
        meta: `${sizeMeta} · ${occasion}`,
      },
      {
        n: reviewerFor(product, 3),
        t: "Màu ngoài đời dễ mặc",
        q: "Màu thực tế không bị gắt dưới đèn tiệc, chụp ảnh vẫn giữ được độ mềm. Nhân viên tư vấn size khá sát nên mình không cần đổi.",
        r: 5,
        meta: "Thuê 4 ngày",
      },
    ];
  }

  if (/blazer|suit|ao khoac|vest|jacket/.test(text)) {
    return [
      {
        n: reviewerFor(product, 1),
        t: "Form đứng, mặc lên lịch sự",
        q: `${product.name} có vai và ve áo đứng form, hợp đi họp hoặc sự kiện bán trang trọng. Mặc với áo basic vẫn đủ chỉn chu.`,
        r: 5,
        meta: `${sizeMeta} · công sở/sự kiện`,
      },
      {
        n: reviewerFor(product, 4),
        t: "Dễ phối, không bị cứng",
        q: "Chất vải giữ phom nhưng vẫn thoải mái khi ngồi lâu. Mình thích nhất là màu thực tế dễ phối với quần đen và phụ kiện tối giản.",
        r: 4,
        meta: "Thuê đi networking",
      },
    ];
  }

  if (/so mi|lua|ao /.test(text)) {
    return [
      {
        n: reviewerFor(product, 2),
        t: "Chất mặc nhẹ và sạch sẽ",
        q: `${product.name} mặc thoáng, bề mặt vải lên ảnh gọn gàng. FASTWear giao áo đã ủi kỹ nên mình mặc được ngay.`,
        r: 5,
        meta: `${sizeMeta} · dạo phố/công sở`,
      },
      {
        n: reviewerFor(product, 5),
        t: "Đúng kiểu basic cao cấp",
        q: "Form không quá ôm, sơ vin đẹp và không bị lộ nếp nhiều sau vài tiếng. Hợp thuê khi cần một item nền để phối outfit.",
        r: 4,
        meta: "Thuê 3 ngày",
      },
    ];
  }

  if (/tui|non|bucket|phu kien|trang suc|giay|dong ho/.test(text)) {
    return [
      {
        n: reviewerFor(product, 0),
        t: "Phụ kiện tạo điểm nhấn tốt",
        q: `${product.name} giúp set đồ có điểm nhấn hơn mà không cần mua mới. Tình trạng sản phẩm sạch và được đóng gói kỹ.`,
        r: 5,
        meta: "Phối chụp ảnh",
      },
      {
        n: reviewerFor(product, 6),
        t: "Màu thực tế dễ dùng",
        q: "Màu ngoài đời gần với ảnh sản phẩm, không bị lệch tông khi phối cùng đồ sáng màu. Mình sẽ thuê lại cho các dịp chụp lookbook.",
        r: 4,
        meta: "Free size",
      },
    ];
  }

  if (product.gender === "Nam") {
    return [
      {
        n: reviewerFor(product, 1),
        t: "Form nam gọn và tôn dáng",
        q: `${product.name} vừa người, không bị rộng ở vai. Mặc đi sự kiện nhìn chỉn chu nhưng vẫn thoải mái khi di chuyển.`,
        r: 5,
        meta: `${sizeMeta} · sự kiện`,
      },
      {
        n: reviewerFor(product, 4),
        t: "Dễ phối theo nhiều dịp",
        q: "Mình phối cùng giày da và đồng hồ tối màu, tổng thể khá lịch sự. Dịch vụ giao nhận đúng giờ, sản phẩm không có mùi kho.",
        r: 5,
        meta: "Thuê cuối tuần",
      },
    ];
  }

  return [
    {
      n: reviewerFor(product, 2),
      t: "Đúng mô tả, dễ mặc",
      q: `${product.name} có form khá dễ mặc, màu thực tế gần ảnh và chất liệu sạch sẽ. Phù hợp nhất cho ${occasion}.`,
      r: 5,
      meta: `${sizeMeta} · ${occasion}`,
    },
    {
      n: reviewerFor(product, 7),
      t: "Trải nghiệm thuê gọn",
      q: "Nhân viên tư vấn nhanh, sản phẩm được chuẩn bị kỹ và trả đồ không rườm rà. Mình thấy hợp để thuê cho những dịp không mặc lại nhiều.",
      r: 4,
      meta: "Thuê 4 ngày",
    },
  ];
}

function RatingStars({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;
        if (interactive) {
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange?.(value)}
              className="rounded-full p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label={`Chọn ${value} sao`}
            >
              <Star
                className={`h-5 w-5 ${filled ? "fill-current" : "fill-none text-primary/35"}`}
              />
            </button>
          );
        }

        return (
          <Star
            key={value}
            className={`h-4 w-4 ${filled ? "fill-current" : "fill-none text-primary/30"}`}
          />
        );
      })}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <div className="rounded-2xl bg-card p-5">
      <RatingStars rating={review.r} />
      <div className="mt-2 font-serif text-lg">{review.t}</div>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{review.q}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>— {review.n}</span>
        {review.meta && <span className="rounded-full bg-secondary px-2 py-1">{review.meta}</span>}
      </div>
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const gallery = product.images ?? [product.image, product.image, product.image];
  const [active, setActive] = useState(gallery[0]);
  const [showSize, setShowSize] = useState(false);
  const [openCare, setOpenCare] = useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [show3DTryOn, setShow3DTryOn] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "Free");
  const [submittedReviews, setSubmittedReviews] = useState<ProductReview[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewName, setReviewName] = useState("");
  const today = new Date();
  const [start, setStart] = useState<string>(today.toISOString().slice(0, 10));
  const [end, setEnd] = useState<string>(
    new Date(today.getTime() + 4 * 86400000).toISOString().slice(0, 10),
  );

  const days = Math.max(1, Math.ceil((+new Date(end) - +new Date(start)) / 86400000));

  const combos = products.filter((p) => p.id !== product.id).slice(0, 3);
  const reviews = [...submittedReviews, ...getProductReviews(product)];
  const handleAddToCart = () => {
    const cartItem = addItem({
      productId: product.id,
      name: product.name,
      designer: product.designer,
      image: product.image,
      price: product.price,
      deposit: product.deposit,
      selectedSize: selectedSize || product.sizes[0] || "Free",
      selectedColor: product.colors[0],
      rentalDays: days,
      rentalStartDate: start,
      rentalEndDate: end,
      quantity: 1,
    });

    toast.success("Đã thêm vào giỏ thuê", {
      description: `${cartItem.name} — ${cartItem.rentalDays} ngày`,
    });
  };
  const handleSubmitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reviewContent.trim().length < 12) {
      toast.error("Bạn nhập nội dung đánh giá chi tiết hơn một chút nhé.");
      return;
    }

    const nextReview: ProductReview = {
      n: reviewName.trim() || "Khách FASTWear",
      t: reviewTitle.trim() || "Trải nghiệm thuê tốt",
      q: reviewContent.trim(),
      r: reviewRating,
      meta: `Đánh giá mới · ${new Date().toLocaleDateString("vi-VN")}`,
    };

    setSubmittedReviews((current) => [nextReview, ...current]);
    setReviewRating(5);
    setReviewTitle("");
    setReviewContent("");
    setReviewName("");
    toast.success("FASTWear đã nhận đánh giá của bạn.");
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="text-xs text-muted-foreground">
          <Link to="/">Trang chủ</Link> / <Link to="/categories">{product.category}</Link> /{" "}
          <span>{product.name}</span>
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-card">
              <div className="absolute left-4 top-4 z-10">
                <ARQrBadge product={product} onClick={() => setShowQRModal(true)} />
              </div>
              <img src={active} alt={product.name} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="mt-4 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(g)}
                  className={`overflow-hidden rounded-xl border ${active === g ? "border-primary" : "border-border"}`}
                >
                  <img src={g} className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {product.designer}
            </div>
            <h1 className="mt-1 font-serif text-4xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" /> {product.rating} · 128 đánh giá
            </div>

            <div className="mt-6 flex items-end gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Giá thuê / ngày</div>
                <div className="font-serif text-3xl text-primary">{formatVND(product.price)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Tiền cọc</div>
                <div className="text-lg">{formatVND(product.deposit)}</div>
              </div>
              <span className="ml-auto rounded-full bg-[color:var(--blush)] px-3 py-1 text-xs">
                Mới 95%
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Chọn ngày thuê</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Ngày hoàn trả</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {days} ngày × {formatVND(product.price)} ={" "}
              <strong className="text-foreground">{formatVND(days * product.price)}</strong>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Kiểm tra size phù hợp</span>
                <button
                  onClick={() => setShowSize(true)}
                  className="text-xs text-primary underline"
                >
                  Xem bảng size
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-10 min-w-10 rounded-full border px-3 text-sm transition hover:border-primary ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full bg-primary py-4 text-primary-foreground hover:opacity-90"
              >
                Đặt thuê ngay — {formatVND(days * product.price)}
              </button>
              <button
                onClick={() => setShow3DTryOn(true)}
                className="flex items-center gap-2 rounded-full border-2 border-[#6B1A33] bg-transparent px-5 py-4 text-sm font-medium text-[#6B1A33] transition hover:bg-[#6B1A33] hover:text-white"
              >
                <Sparkles className="h-4 w-4" /> Thử đồ ảo
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-border">
              <button
                onClick={() => setOpenCare(!openCare)}
                className="flex w-full items-center justify-between px-5 py-4 font-serif text-lg"
              >
                Chất liệu & chăm sóc sản phẩm
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openCare ? "rotate-180" : ""}`}
                />
              </button>
              {openCare && (
                <p className="px-5 pb-5 text-sm text-muted-foreground">
                  Sản phẩm được vệ sinh và kiểm tra trước khi giao. Sau khi bạn hoàn trả, FASTWear sẽ
                  xử lý giặt hấp và bảo quản chuyên nghiệp.
                </p>
              )}
            </div>

            <div className="mt-3 rounded-2xl border border-border">
              <button
                onClick={() => setOpenReturnPolicy(!openReturnPolicy)}
                className="flex w-full items-center justify-between px-5 py-4 font-serif text-lg"
              >
                Giá thuê, tiền cọc & đổi trả
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openReturnPolicy ? "rotate-180" : ""}`}
                />
              </button>
              {openReturnPolicy && (
                <div className="space-y-4 px-5 pb-5 text-sm leading-6 text-muted-foreground">
                  <p>
                    Giá thuê và tiền cọc được hiển thị rõ ràng trước khi xác nhận. Trong 24h đầu nếu
                    sản phẩm không đúng mô tả, FASTWear hỗ trợ đổi ngay hoặc hoàn tiền 100%.
                  </p>
                  <p>
                    Chi tiết hơn khách hàng có thể liên hệ FASTWear qua hotline{" "}
                    <span className="font-semibold text-primary">028.3512.7254</span> hoặc tại trang{" "}
                    <Link
                      to="/policy"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      Chính sách đổi trả
                    </Link>{" "}
                    tại web.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Combos */}
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Kết hợp cùng với…</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {combos.map((c) => (
              <Link
                key={c.id}
                to="/product/$id"
                params={{ id: c.id }}
                className="group overflow-hidden rounded-2xl bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.image}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="font-serif text-base">{c.name}</div>
                  <div className="text-sm text-primary">{formatVND(c.price)}/ngày</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl">Đánh giá khách hàng</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Feedback thật được chọn theo kiểu dáng, chất liệu và dịp mặc của từng sản phẩm.
              </p>
            </div>
            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              {reviews.length} đánh giá
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {reviews.map((rv, i) => (
              <ReviewCard key={`${rv.n}-${rv.t}-${i}`} review={rv} />
            ))}
          </div>

          <form
            onSubmit={handleSubmitReview}
            className="mt-8 rounded-3xl border border-border bg-card p-5 md:p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h3 className="font-serif text-2xl">Hãy để lại đánh giá của bạn</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Chia sẻ cảm nhận về form dáng, chất vải, màu sắc thực tế hoặc trải nghiệm thuê để
                  khách sau chọn size dễ hơn.
                </p>
                <div className="mt-5">
                  <div className="mb-2 text-sm font-medium">Số sao</div>
                  <RatingStars rating={reviewRating} interactive onChange={setReviewRating} />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="text-muted-foreground">Tên hiển thị</span>
                    <input
                      value={reviewName}
                      onChange={(event) => setReviewName(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                      placeholder="Ví dụ: Mai Linh"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="text-muted-foreground">Tiêu đề ngắn</span>
                    <input
                      value={reviewTitle}
                      onChange={(event) => setReviewTitle(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                      placeholder="Ví dụ: Form rất tôn dáng"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="text-muted-foreground">Nội dung đánh giá</span>
                  <textarea
                    value={reviewContent}
                    onChange={(event) => setReviewContent(event.target.value)}
                    className="mt-1 min-h-28 w-full resize-none rounded-2xl border border-border bg-background px-3 py-3 text-sm leading-6 outline-none transition focus:border-primary"
                    placeholder="Bạn thấy sản phẩm vừa vặn thế nào, chất vải ra sao, có hợp dịp mặc không?"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      {showSize && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowSize(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl">Bảng size</h3>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th>Size</th>
                  <th>Ngực</th>
                  <th>Eo</th>
                  <th>Hông</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "78", "60", "84"],
                  ["S", "82", "64", "88"],
                  ["M", "86", "68", "92"],
                  ["L", "90", "72", "96"],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-border">
                    <td className="py-2">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ARTryOn open={showQRModal} onClose={() => setShowQRModal(false)} product={product} />
      {show3DTryOn ? (
        <Suspense fallback={null}>
          <ARTryOn3DLegacy open={true} onClose={() => setShow3DTryOn(false)} product={product} />
        </Suspense>
      ) : null}
    </SiteShell>
  );
}
