import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { products, formatVND, type Product } from "@/lib/products";
import { SectionHeader } from "./SectionHeader";
import { GivesBackSection } from "./GivesBackSection";
import { NuTab } from "./tabs/NuTab";
import { NamTab } from "./tabs/NamTab";
import { PhuKienTab } from "./tabs/PhuKienTab";
import { LookbookTab } from "./tabs/LookbookTab";
import { SaleTab } from "./tabs/SaleTab";

const HERO_VIDEO = "/media/fastwear-hero-video.mov";
const EDITORIAL_PANORAMA = "/media/fastwear-editorial-panorama.jpg";
const SHOWROOM_VIDEO = "/media/showroom-vertical.mp4";
const CTA_VIDEO = "/media/cta-wide.mp4";

const occasions = [
  {
    title: "Tiệc cưới",
    description: "Đầm dự tiệc, suit lịch lãm và phụ kiện hoàn thiện.",
    image: "/media/occasion-wedding-purple.png",
  },
  {
    title: "Sự kiện",
    description: "Trang phục nổi bật cho gala, ra mắt, networking.",
    image: "/media/occasion-event-teal.png",
  },
  {
    title: "Prom & tốt nghiệp",
    description: "Khoảnh khắc quan trọng, lên hình chỉn chu.",
    image: "/media/occasion-prom-pink.png",
  },
  {
    title: "Áo dài & lễ Tết",
    description: "Tôn dáng, trang trọng, phù hợp văn hóa Việt.",
    image: "/media/occasion-ao-dai-white.png",
  },
  {
    title: "Du lịch",
    description: "Resort, tiệc biển, cuối tuần nhẹ nhàng.",
    image: "/media/occasion-travel-shorts.png",
  },
  {
    title: "Công sở cao cấp",
    description: "Blazer, suit, đầm thanh lịch cho lịch gặp quan trọng.",
    image: "/media/occasion-office-jeans.png",
  },
];

const featured = products.filter((product) => product.available).slice(0, 4);

const brandNames = [
  "Barbour",
  "AGOLDE",
  "ANTHROPOLOGIE",
  "FREE PEOPLE",
  "Reformation",
  "Urban Outfitters",
  "Lâm Gia Khang",
  "Gia Studios",
  "Subtle Studios",
];

const subscriptionSteps = [
  {
    number: "01",
    title: "Chọn 5 món cho lịch thuê",
    description:
      "Lướt qua hàng trăm thiết kế theo dịp mặc, size và phong cách, rồi thêm những món bạn muốn thử vào shipment.",
    art: "closet",
  },
  {
    number: "02",
    title: "Mặc đẹp khi ra ngoài",
    description:
      "FASTWear giao đồ đã vệ sinh và kiểm tra kỹ, để bạn luôn có outfit phù hợp cho cà phê, tiệc tối hay chuyến đi cuối tuần.",
    art: "scooter",
  },
  {
    number: "03",
    title: "Đổi, trả, rồi lặp lại",
    description:
      "Khi sẵn sàng đổi phong cách, gửi trả món cũ và chọn set mới. Tủ đồ của bạn luôn mới mà không cần mua thêm.",
    art: "wardrobe",
  },
] as const;

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function PrimaryLink({
  to,
  children,
}: {
  to: "/categories" | "/account";
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  to,
  children,
}: {
  to: "/categories" | "/account" | "/about";
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full border border-[#d8cdb5] bg-white/65 px-6 py-3 text-sm font-semibold text-[#2d2a24] transition hover:border-[#b99a55] hover:text-primary"
    >
      {children}
    </Link>
  );
}

function FeaturedRentalCard({ product }: { product: Product }) {
  return (
    <Link to="/product/$id" params={{ id: product.id }} className="featured-rental-card group">
      <div className="featured-rental-media">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="featured-rental-tag">{product.category}</div>
      </div>
      <div className="featured-rental-body">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7650]">
          {product.designer}
        </div>
        <h3 className="mt-1 truncate font-serif text-xl font-medium leading-tight text-foreground">
          {product.name}
        </h3>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tabular-nums text-primary">
              {formatVND(product.price)}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">/ ngày thuê</div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d2a24]">
            Xem chi tiết <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function HeroVideo() {
  return (
    <section className="hero-video" aria-label="FASTWear giới thiệu">
      <video
        className="hero-video-media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={EDITORIAL_PANORAMA}
      >
        <source src={HERO_VIDEO} type="video/quicktime" />
      </video>
      <div className="hero-slider-shade" aria-hidden />

      <div className="hero-content">
        <div className="hero-kicker">FASTWEAR VIỆT NAM</div>
        <h1>
          Thuê outfit cao cấp cho
          <br />
          những dịp quan trọng.
        </h1>
        <p>
          Chọn nhanh. Thử dễ. Mặc đẹp đúng dịp. FASTWear giúp bạn thuê trang phục sự kiện, áo dài,
          suit và phụ kiện cao cấp với trải nghiệm rõ ràng từ online đến showroom.
        </p>
        <div className="hero-actions">
          <Link to="/categories" className="hero-primary-link">
            Khám phá bộ sưu tập
          </Link>
          <Link to="/account" className="hero-secondary-link">
            Đặt lịch thử
          </Link>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const renderBrands = () =>
    brandNames.map((brand) => (
      <span className="brand-marquee-name" key={brand}>
        {brand}
      </span>
    ));

  return (
    <section className="brand-marquee-section" aria-labelledby="brand-marquee-title">
      <h2 id="brand-marquee-title">+ 100s of Brands to Browse</h2>
      <div className="brand-marquee-window">
        <div className="brand-marquee-track">
          <div className="brand-marquee-group">{renderBrands()}</div>
          <div className="brand-marquee-group" aria-hidden="true">
            {renderBrands()}
          </div>
        </div>
      </div>
    </section>
  );
}

function LineArt({ type }: { type: (typeof subscriptionSteps)[number]["art"] }) {
  if (type === "scooter") {
    return (
      <svg viewBox="0 0 420 180" role="img" aria-label="Minh họa xe giao đồ">
        <path d="M88 122c14-34 47-43 77-22 21 15 32 24 56 24h52c28 0 44-9 58-29" />
        <path d="M119 123h97c7 0 11-4 11-11v-19c0-9-7-16-16-16h-41" />
        <path d="M169 77l18-36h55l23 36" />
        <path d="M265 77h35c20 0 37 13 43 32" />
        <circle cx="127" cy="130" r="28" />
        <circle cx="319" cy="130" r="28" />
        <path d="M324 72c22 0 30-9 38-28m-16 14 26 21" />
        <path d="M64 129c-21-8-30-21-25-39" />
      </svg>
    );
  }

  if (type === "wardrobe") {
    return (
      <svg viewBox="0 0 420 180" role="img" aria-label="Minh họa tủ đồ">
        <path d="M151 30h128l16 17v106H135V47z" />
        <path d="M151 30c14 13 14 110 0 123m128-123c-14 13-14 110 0 123M215 40v113" />
        <path d="M178 72c23-20 46-20 69 0" />
        <path d="M210 72c-22 16-32 39-28 69h62c3-30-8-53-29-69" />
        <path d="M182 141c18 9 40 9 62 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 180" role="img" aria-label="Minh họa dây treo quần áo">
      <path d="M38 45h344" />
      <path d="M106 45c0 10-10 11-19 13l-23 6v85h76l-20-85-17-6c-8-3-13-7-13-13" />
      <path d="M192 45c0 9-9 10-18 12l-16 5 21 88 51-10-4-82-20-4c-7-1-10-4-10-9" />
      <path d="M280 45c0 9-9 10-18 12l-28 7v44h70V64l-21-7c-8-2-12-4-12-12" />
      <path d="M341 45c0 9-8 10-17 12l-21 7-8 80h70l-8-80-17-7c-7-3-10-5-10-12" />
    </svg>
  );
}

function SubscriptionWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="subscription-section" aria-labelledby="subscription-title">
      <div className="subscription-media-card">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=90"
          alt="Hai người mẫu đang cười rạng rỡ trong buổi chụp lifestyle ngoài trời"
        />
        <div className="subscription-media-overlay">
          <h2 id="subscription-title">Quy trình thuê đồ</h2>
          <div>
            <Link to="/account">Tham gia ngay</Link>
            <Link to="/policy">Tìm hiểu thêm</Link>
          </div>
        </div>
      </div>

      <div className="subscription-accordion">
        {subscriptionSteps.map((step, index) => {
          const isActive = index === active;
          return (
            <article
              className={`subscription-step ${isActive ? "is-active" : ""}`}
              key={step.number}
            >
              <button type="button" onClick={() => setActive(index)} aria-expanded={isActive}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <ChevronRight className={isActive ? "is-open" : ""} />
              </button>
              <div className="subscription-panel" aria-hidden={!isActive}>
                <p>{step.description}</p>
                <LineArt type={step.art} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function GioiThieuTab() {
  return (
    <div className="pb-20">
      <HeroVideo />
      <BrandMarquee />

      <section className="occasion-scroll-section" aria-labelledby="occasion-title">
        <div className="occasion-scroll-copy">
          <p>CHỌN THEO DỊP</p>
          <h2 id="occasion-title">Mặc đúng khoảnh khắc, không cần mua mới.</h2>
          <span>
            FASTWear gợi ý trang phục theo bối cảnh, mức trang trọng và phong cách cá nhân.
          </span>
          <SecondaryLink to="/categories">Xem tất cả dịp mặc</SecondaryLink>
        </div>
        <div className="occasion-scroll-track" aria-label="Danh mục dịp mặc">
          {occasions.map((occasion, index) => (
            <Link key={occasion.title} to="/categories" className="occasion-scroll-card group">
              <img src={occasion.image} alt={occasion.title} />
              <div>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{occasion.title}</h3>
                <p>{occasion.description}</p>
                <span>
                  Khám phá <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Bộ sưu tập thuê"
          title="Những lựa chọn nổi bật cho tuần này."
          titleClassName="font-extrabold"
          description="Một vài thiết kế đang sẵn sàng cho lịch tiệc, sự kiện, áo dài và công sở cao cấp."
          action={<PrimaryLink to="/categories">Xem bộ sưu tập</PrimaryLink>}
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <FeaturedRentalCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <SubscriptionWorks />

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <div className="showroom-experience-section">
          <div className="showroom-experience-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Video trải nghiệm thử trang phục FASTWear"
            >
              <source src={SHOWROOM_VIDEO} type="video/mp4" />
            </video>
          </div>
          <div className="showroom-experience-content">
            <SectionHeader
              eyebrow="Tự tin trước khi thuê"
              title="Online tiện, showroom vững tâm."
              description="Thử thật khi cần, thử ảo khi muốn nhanh. FASTWear giữ mọi bước rõ ràng trước ngày bạn cần xuất hiện."
            />
            <div className="showroom-feature-list">
              {[
                {
                  icon: <MapPin className="h-4 w-4" />,
                  label: "Showroom",
                  title: "Thử trước khi chốt",
                  description: "Kiểm tra phom, độ dài và phụ kiện đi kèm trước ngày mặc.",
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: "AR Try-On",
                  title: "Ướm dáng nhanh",
                  description: "Xem cảm giác phối đồ trước khi thêm vào giỏ thuê.",
                },
                {
                  icon: <MessageCircle className="h-4 w-4" />,
                  label: "FASTHelp",
                  title: "Tư vấn theo dịp",
                  description: "Gợi ý size, phụ kiện và lựa chọn an toàn cho bối cảnh.",
                },
                {
                  icon: <PackageCheck className="h-4 w-4" />,
                  label: "Rõ tiền cọc",
                  title: "Minh bạch trước đặt",
                  description: "Giá thuê, tiền cọc và điều kiện trả đồ được trình bày sớm.",
                },
              ].map((item) => (
                <article className="showroom-feature-row" key={item.title}>
                  <span>{item.icon}</span>
                  <div>
                    <small>{item.label}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="smart-consumption-banner" aria-labelledby="smart-consumption-title">
        <img
          src={EDITORIAL_PANORAMA}
          alt="Photoshoot ba người mẫu trong trang phục sự kiện cao cấp"
        />
        <div className="smart-consumption-content">
          <p>TIÊU DÙNG THÔNG MINH</p>
          <h2 id="smart-consumption-title">Phong cách nổi bật, tủ đồ nhẹ hơn.</h2>
          <span>
            Thuê những món chỉ cần cho đúng dịp, giữ hình ảnh chỉn chu mà không phải sở hữu quá
            nhiều.
          </span>
          <div>
            <Leaf className="h-4 w-4 shrink-0" />
            <small>Mỗi thiết kế được chăm sóc để xuất hiện đẹp trong nhiều khoảnh khắc.</small>
          </div>
        </div>
      </section>

      <GivesBackSection />

      <section className="cta-glass-section">
        <video className="cta-background-video" autoPlay muted loop playsInline preload="metadata">
          <source src={CTA_VIDEO} type="video/mp4" />
        </video>
        <div className="cta-glass-panel">
          <div className="mx-auto flex max-w-xl justify-center gap-1 text-[#d9c48f]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight text-[#fbf8ef] md:text-6xl">
            Sẵn sàng mặc đẹp cho lịch hẹn tiếp theo?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#fbf8ef]/78 md:text-base">
            Khám phá tủ đồ sự kiện của FASTWear hoặc đặt lịch thử để được tư vấn outfit phù hợp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-full bg-[#fbf8ef] px-6 py-3 text-sm font-semibold text-[#1d4e3f] transition hover:bg-white"
            >
              Bắt đầu thuê
            </Link>
            <Link
              to="/account"
              className="inline-flex items-center justify-center rounded-full border border-[#fbf8ef]/35 px-6 py-3 text-sm font-semibold text-[#fbf8ef] transition hover:border-[#fbf8ef]"
            >
              Đặt lịch thử
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function HomePage({ tab = "gioi-thieu" }: { tab?: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {tab === "nu" && <NuTab />}
        {tab === "nam" && <NamTab />}
        {tab === "phu-kien" && <PhuKienTab />}
        {tab === "lookbook" && <LookbookTab />}
        {tab === "sale" && <SaleTab />}
        {tab === "gioi-thieu" && <GioiThieuTab />}
      </motion.div>
    </AnimatePresence>
  );
}
