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
import { FittingBookingModal } from "./FittingBookingModal";

const HERO_VIDEO_MP4 = "/media/fastwear-hero-video.mp4";
const HERO_VIDEO_MOV = "/media/fastwear-hero-video.mov";
const EDITORIAL_PANORAMA = "/media/fastwear-editorial-panorama.jpg";
const SHOWROOM_VIDEO = "/media/showroom-vertical.mp4";
const CTA_VIDEO = "/media/cta-wide.mp4";
const HIW_EDITORIAL_IMAGE = "/media/home-hiw-editorial.webp";
const FITTING_SHUFFLE_VIDEO = "/media/fitting-shuffle.mov";
const FITTING_SCOOTER_VIDEO = "/media/fitting-scooter.mov";
const FITTING_CLOSET_RETURN_VIDEO = "/media/fitting-closet-return.mov";

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
    video: FITTING_SHUFFLE_VIDEO,
    tone: "shuffle",
  },
  {
    number: "02",
    title: "Mặc đẹp khi ra ngoài",
    description:
      "FASTWear giao đồ đã vệ sinh và kiểm tra kỹ, để bạn luôn có outfit phù hợp cho cà phê, tiệc tối hay chuyến đi cuối tuần.",
    video: FITTING_SCOOTER_VIDEO,
    tone: "scooter",
  },
  {
    number: "03",
    title: "Đổi, trả, rồi lặp lại",
    description:
      "Khi sẵn sàng đổi phong cách, gửi trả món cũ và chọn set mới. Tủ đồ của bạn luôn mới mà không cần mua thêm.",
    video: FITTING_CLOSET_RETURN_VIDEO,
    tone: "closet",
  },
] as const;

const teamRoot = {
  department: "Ban điều hành",
  name: "Nguyễn Lê Thảo Phương",
  role: "CEO / Founder",
  description: "Quản lý chiến lược tổng thể",
};

const teamBranches = [
  {
    department: "Marketing & Social Media",
    name: "Võ Thị Quỳnh Nhi",
    role: "Brand Growth",
    description: "Quảng bá thương hiệu, chạy quảng cáo, KOL/KOC",
  },
  {
    department: "Quản lý cửa hàng",
    name: "Nguyễn Huỳnh Như Phương",
    role: "Showroom Lead",
    description: "Điều hành showroom",
  },
  {
    department: "Vận hành đơn hàng",
    name: "Nguyễn Ngọc Quý & La Bảo Lê Quỳnh",
    role: "Rental Operations",
    description: "Kiểm tra sản phẩm, xử lý thuê - trả",
  },
  {
    department: "CSKH online và offline",
    name: "Lê Anh Thư & Dương Đỗ Quỳnh Trâm",
    role: "Customer Styling",
    description: "Tư vấn size, hỗ trợ đơn hàng",
  },
  {
    department: "Kỹ thuật Website / App",
    name: "Nguyễn Thiên Phúc & Trần Nguyễn Cảnh Phú",
    role: "Product Tech",
    description: "Phát triển và bảo trì nền tảng",
  },
  {
    department: "Vận hành kho",
    name: "Lâm Tường Trân",
    role: "Wardrobe Care",
    description: "Kiểm tra, giặt hấp và chăm sóc sản phẩm",
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

function HeroVideo({ onBookFitting }: { onBookFitting: () => void }) {
  return (
    <section className="hero-video" aria-label="FASTWear giới thiệu">
      <video
        className="hero-video-media"
        autoPlay
        loop
        muted={true}
        playsInline
        preload="auto"
        poster={EDITORIAL_PANORAMA}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
        <source src={HERO_VIDEO_MOV} type="video/quicktime" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
      <div className="hero-slider-shade" aria-hidden />

      <div className="hero-content">
        <div className="hero-kicker">FASTWEAR VIỆT NAM</div>
        <h1>
          <span className="hero-title-line">Thuê outfit cao cấp cho</span>
          <br />
          <span className="hero-title-line">những dịp quan trọng.</span>
        </h1>
        <p>
          Chọn nhanh. Thử dễ. Mặc đẹp đúng dịp. FASTWear giúp bạn thuê trang phục sự kiện, áo dài,
          suit và phụ kiện cao cấp với trải nghiệm rõ ràng từ online đến showroom.
        </p>
        <div className="hero-actions">
          <Link to="/categories" className="hero-primary-link">
            Khám phá bộ sưu tập
          </Link>
          <button type="button" onClick={onBookFitting} className="hero-secondary-link">
            Đặt lịch thử
          </button>
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

function StepVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="subscription-panel-video">
      <video autoPlay loop muted playsInline preload="metadata" aria-label={title}>
        <source src={src} type="video/quicktime" />
      </video>
    </div>
  );
}

function SubscriptionWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="subscription-section" aria-labelledby="subscription-title">
      <div className="subscription-media-card">
        <img
          src={HIW_EDITORIAL_IMAGE}
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
              className={`subscription-step subscription-step-${step.tone} ${isActive ? "is-active" : ""}`}
              key={step.number}
            >
              <button type="button" onClick={() => setActive(index)} aria-expanded={isActive}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <ChevronRight className={isActive ? "is-open" : ""} />
              </button>
              <div className="subscription-panel" aria-hidden={!isActive}>
                <p>{step.description}</p>
                <StepVideo src={step.video} title={`Video minh họa: ${step.title}`} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="team-section" aria-labelledby="team-title">
      <div className="team-header">
        <p>OUR TEAM</p>
        <h2 id="team-title">Cấu trúc nhân sự</h2>
        <span>
          Những người đứng sau từng lần tư vấn, kiểm đồ và hoàn thiện trải nghiệm thuê thời trang
          cao cấp của FASTWear.
        </span>
      </div>

      <div className="team-org-chart">
        <article className="team-org-node team-org-root">
          <p>{teamRoot.department}</p>
          <h3>{teamRoot.name}</h3>
          <strong>{teamRoot.role}</strong>
          <span>{teamRoot.description}</span>
        </article>

        <div className="team-org-connector" aria-hidden="true" />

        <div className="team-org-branches">
          {teamBranches.map((member) => (
            <article className="team-org-node" key={member.department}>
              <p>{member.department}</p>
              <h3>{member.name}</h3>
              <strong>{member.role}</strong>
              <span>{member.description}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GioiThieuTab({ onBookFitting }: { onBookFitting: () => void }) {
  return (
    <div className="pb-20">
      <HeroVideo onBookFitting={onBookFitting} />
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
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-extrabold leading-tight text-[#fbf8ef] md:text-6xl">
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
            <button
              type="button"
              onClick={onBookFitting}
              className="inline-flex items-center justify-center rounded-full border border-[#fbf8ef]/35 px-6 py-3 text-sm font-semibold text-[#fbf8ef] transition hover:border-[#fbf8ef]"
            >
              Đặt lịch thử
            </button>
          </div>
        </div>
      </section>

      <TeamSection />
    </div>
  );
}

export function HomePage({ tab = "gioi-thieu", view }: { tab?: string; view?: string }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {tab === "nu" && <NuTab view={view} />}
          {tab === "nam" && <NamTab view={view} />}
          {tab === "phu-kien" && <PhuKienTab view={view} />}
          {tab === "lookbook" && <LookbookTab />}
          {tab === "sale" && <SaleTab />}
          {tab === "gioi-thieu" && <GioiThieuTab onBookFitting={() => setBookingOpen(true)} />}
        </motion.div>
      </AnimatePresence>
      <FittingBookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
