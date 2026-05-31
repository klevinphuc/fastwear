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
const BRAND_STORY_IMAGE = "/media/fastwear-brand-story-model.png";
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
    description:
      "Chỉn chu và tự tin trong ngày vui quan trọng với váy, suit và phụ kiện được tuyển chọn.",
    image: "/media/occasion-wedding-purple.png",
  },
  {
    title: "Sự kiện",
    description:
      "Khẳng định vị thế và phong cách chuyên nghiệp tại mọi buổi gala, hội nghị và sự kiện doanh nghiệp.",
    image: "/media/occasion-event-teal.png",
  },
  {
    title: "Prom & Tốt nghiệp",
    description: "Lưu giữ những khoảnh khắc đáng nhớ với trang phục nổi bật trong từng khung hình.",
    image: "/media/occasion-prom-pink.png",
  },
  {
    title: "Áo dài & Lễ Tết",
    description: "Trang trọng, tinh tế và phù hợp với những dịp mang đậm giá trị truyền thống.",
    image: "/media/occasion-ao-dai-white.png",
  },
  {
    title: "Du lịch",
    description: "Thoải mái tận hưởng chuyến đi với những trang phục phù hợp từ resort đến tiệc biển.",
    image: "/media/occasion-travel-shorts.png",
  },
  {
    title: "Công sở cao cấp",
    description: "Chỉn chu hơn trong mọi cuộc họp, gặp gỡ đối tác và sự kiện công việc.",
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
    title: "Chọn trang phục cho dịp của bạn",
    description:
      "Khám phá hàng trăm thiết kế từ váy dự tiệc, suit, áo dài đến phụ kiện cao cấp. Lọc theo yêu cầu của bạn để nhanh chóng tìm được lựa chọn phù hợp.",
    video: FITTING_SHUFFLE_VIDEO,
    tone: "shuffle",
  },
  {
    number: "02",
    title: "Chọn ngày thuê và nhận trang phục",
    description:
      "Đặt lịch thuê trực tuyến, nhận tại showroom hoặc giao tận nơi với thông tin giá thuê và tiền cọc minh bạch. Mỗi sản phẩm đều được vệ sinh và kiểm tra kỹ trước khi đến tay bạn.",
    video: FITTING_SCOOTER_VIDEO,
    tone: "scooter",
  },
  {
    number: "03",
    title: "Hoàn trả và sẵn sàng cho dịp tiếp theo",
    description:
      "Trả sản phẩm theo lịch hẹn, FASTWear sẽ xử lý khâu vệ sinh và bảo quản để bạn sẵn sàng cho lần thuê tiếp theo. Khi cần một diện mạo mới cho sự kiện đặc biệt, bạn luôn có thêm nhiều lựa chọn để khám phá.",
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
          <span className="hero-title-line">Thuê phong cách, tỏa sáng</span>
          <br />
          <span className="hero-title-line">từng khoảnh khắc</span>
        </h1>
        <p>
          Hệ sinh thái thời trang O2O tiên phong tại Việt Nam. Từ tiệc cưới, sự kiện, prom đến công
          sở cao cấp, FASTWear giúp bạn tìm được trang phục phù hợp mà không cần chi hàng triệu đồng
          để mua mới. Đúng dịp, đúng phong cách, đúng ngân sách.
        </p>
        <div className="hero-actions">
          <Link to="/categories" className="hero-primary-link">
            Tìm trang phục cho sự kiện của bạn
          </Link>
          <button type="button" onClick={onBookFitting} className="hero-secondary-link">
            Đặt lịch thử đồ
          </button>
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  const storyValues = [
    "Sinh viên Ngoại Thương CSII",
    "Thời trang bền vững",
    "Outfit cho mọi dịp",
    "Thuê nhanh, mặc đẹp",
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f3] px-4 py-16 md:px-8 md:py-20 xl:px-12"
      aria-labelledby="brand-story-title"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8cdb5] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.98),rgba(250,248,243,0.9)_48%,rgba(238,229,213,0.72))]"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto min-h-[720px] max-w-[1780px] overflow-hidden md:min-h-[820px] xl:min-h-[900px]"
      >
        <motion.img
          src={BRAND_STORY_IMAGE}
          alt="Người mẫu đứng giữa nền trắng trong tinh thần editorial của FASTWear"
          initial={{ opacity: 0, scale: 0.992 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-contain object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,0.9)_0%,rgba(250,248,243,0.38)_24%,rgba(250,248,243,0)_42%,rgba(250,248,243,0)_58%,rgba(250,248,243,0.38)_76%,rgba(250,248,243,0.9)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(250,248,243,0.92),rgba(250,248,243,0))] md:hidden"
          aria-hidden="true"
        />

        <div className="relative z-10 grid min-h-[720px] content-between gap-8 px-1 py-4 md:min-h-[820px] md:px-2 md:py-8 lg:grid-cols-[minmax(300px,0.85fr)_minmax(420px,1.2fr)_minmax(300px,0.85fr)] lg:content-center lg:items-center lg:gap-8 xl:min-h-[900px] xl:grid-cols-[minmax(340px,0.9fr)_minmax(560px,1.35fr)_minmax(340px,0.9fr)] xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
            className="max-w-[500px] text-[#211f1a] [text-shadow:0_1px_16px_rgba(255,255,255,0.78)] lg:self-start xl:self-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#725f3e]">
              SINH RA TỪ NHỮNG DỊP QUAN TRỌNG
            </p>
            <h2
              id="brand-story-title"
              className="mt-4 max-w-xl font-serif text-4xl font-extrabold leading-tight text-[#211f1a] sm:text-5xl xl:text-6xl"
            >
              Câu chuyện của FASTWear
            </h2>
            <div className="mt-6 h-px w-24 bg-[#b99a55]" aria-hidden="true" />

            <p className="mt-6 text-sm leading-7 text-[#3f392f] sm:text-[15px] sm:leading-8">
              FASTWear bắt đầu từ một ý tưởng rất gần gũi của một nhóm bạn trẻ đang theo học tại
              Trường Đại học Ngoại Thương – Cơ sở II tại TP.HCM: làm sao để ai cũng có thể xuất hiện
              thật chỉn chu trong những khoảnh khắc quan trọng, mà không cần phải mua một bộ trang
              phục đắt tiền chỉ để mặc một lần.
            </p>
          </motion.div>

          <div className="hidden lg:block" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
            className="max-w-[500px] text-[#211f1a] [text-shadow:0_1px_16px_rgba(255,255,255,0.78)] lg:justify-self-end lg:self-end xl:self-center"
          >
            <div className="space-y-4 text-sm leading-7 text-[#3f392f] sm:text-[15px] sm:leading-8">
              <p>
                Từ những buổi thuyết trình, phỏng vấn, lễ tốt nghiệp, tiệc cưới cho đến những buổi
                hẹn đặc biệt, chúng tôi nhận ra rằng trang phục không chỉ là thứ bạn mặc lên người.
                Nó còn là sự tự tin, là ấn tượng đầu tiên, và đôi khi là cách bạn ghi dấu một cột mốc
                trong cuộc sống.
              </p>
              <p>
                Vì vậy, FASTWear được tạo ra như một giải pháp thuê trang phục cao cấp nhanh chóng,
                tinh tế và bền vững hơn.
              </p>
            </div>

            <blockquote className="mt-6 border-l-2 border-[#b99a55] pl-5 text-base font-semibold leading-7 text-[#214637] sm:text-lg sm:leading-8">
              “Mặc đẹp không nhất thiết phải sở hữu nhiều hơn. Đôi khi, chỉ cần chọn đúng outfit cho
              đúng khoảnh khắc.”
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {storyValues.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center border-b border-[#b99a55]/50 pb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2f4438]"
                >
                  {value}
                </span>
              ))}
            </div>

            <Link
              to="/categories"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(30,78,63,0.22)] transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Thuê đồ ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
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
          <h2 id="subscription-title">Quy Trình Thuê Đồ</h2>
          <div>
            <Link to="/categories">Tìm trang phục</Link>
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
      <BrandStorySection />
      <BrandMarquee />

      <section className="occasion-scroll-section" aria-labelledby="occasion-title">
        <div className="occasion-scroll-copy">
          <p>CHỌN THEO DỊP</p>
          <h2 id="occasion-title">Mặc đúng dịp. Tự tin xuất hiện.</h2>
          <span>
            Với từng khoảnh khắc, FASTWear giúp bạn lựa chọn trang phục phù hợp mà không cần tốn
            thời gian tìm kiếm hay chi nhiều tiền để mua mới.
          </span>
          <SecondaryLink to="/categories">Tìm trang phục theo sự kiện</SecondaryLink>
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
                  Xem trang phục phù hợp{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="BỘ SƯU TẬP NỔI BẬT"
          title="Trang phục yêu thích cho các sự kiện sắp tới"
          titleClassName="font-extrabold"
          description="Khám phá ngay những thiết kế đang sẵn sàng để bạn đặt thuê cho lịch trình quan trọng."
          action={<PrimaryLink to="/categories">Xem trang phục đang có sẵn</PrimaryLink>}
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
              eyebrow="TỰ TIN TRƯỚC KHI THUÊ"
              title="Thuê dễ hơn khi mọi thông tin đều rõ ràng."
              description="Từ thử đồ trực tiếp tại showroom đến AR Try-On và tư vấn cá nhân hóa, FASTWear giúp bạn lựa chọn outfit phù hợp trước ngày cần xuất hiện."
            />
            <div className="showroom-feature-list">
              {[
                {
                  icon: <MapPin className="h-4 w-4" />,
                  label: "Showroom",
                  title: "Thử trực tiếp trước khi thuê",
                  description: "Kiểm tra tận mắt chất liệu, độ dài trang phục và phụ kiện đi kèm.",
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: "AR Try-On",
                  title: "Thử đồ ảo chỉ trong 3 giây",
                  description:
                    "Ướm thử outfit bằng công nghệ AR để hình dung phong cách và lựa chọn phù hợp hơn ngay trên điện thoại.",
                },
                {
                  icon: <MessageCircle className="h-4 w-4" />,
                  label: "FastHelp",
                  title: "Stylist của riêng bạn",
                  description:
                    "FASTHelp gợi ý outfit, size và phụ kiện phù hợp với sự kiện, phong cách và ngân sách của bạn.",
                },
                {
                  icon: <PackageCheck className="h-4 w-4" />,
                  label: "Tiền cọc",
                  title: "Chi phí rõ ràng",
                  description:
                    "Giá thuê, tiền cọc và các điều kiện liên quan được hiển thị rõ ràng trước khi bạn xác nhận đơn hàng.",
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
          <h2 id="smart-consumption-title">
            Mặc đẹp cho mọi dịp mà không cần sở hữu quá nhiều đồ.
          </h2>
          <span>
            Thuê những trang phục bạn chỉ cần trong những khoảnh khắc quan trọng. Giữ hình ảnh chỉn
            chu, tối ưu chi phí và góp phần kéo dài vòng đời của mỗi thiết kế với thời trang tuần
            hoàn.
          </span>
          <div>
            <Leaf className="h-4 w-4 shrink-0" />
            <small>
              Một trang phục, nhiều câu chuyện tiếp nối. Mỗi thiết kế được chăm sóc để xuất hiện đẹp
              trong nhiều khoảnh khắc.
            </small>
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
          <h2 className="mx-auto mt-5 max-w-6xl font-serif text-4xl font-extrabold leading-[1.02] text-[#fbf8ef] md:text-[clamp(3rem,4.6vw,5rem)]">
            <span>Trang phục cho sự kiện</span>
            <br className="hidden md:block" /> <span>tiếp theo của bạn đã sẵn sàng</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#fbf8ef]/78 md:text-base">
            Hãy để FASTWear giúp bạn xuất hiện chỉn chu và tự tin với trang phục phù hợp cho từng
            dịp đặc biệt mà không cần mua mới.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-full bg-[#fbf8ef] px-6 py-3 text-sm font-semibold text-[#1d4e3f] transition hover:bg-white"
            >
              Khám phá bộ sưu tập ngay
            </Link>
            <button
              type="button"
              onClick={onBookFitting}
              className="inline-flex items-center justify-center rounded-full border border-[#fbf8ef]/35 px-6 py-3 text-sm font-semibold text-[#fbf8ef] transition hover:border-[#fbf8ef]"
            >
              Đặt lịch thử đồ
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
