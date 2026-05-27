import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { products, formatVND, type Product } from "@/lib/products";
import { ProcessStep } from "./ProcessStep";
import { SectionHeader } from "./SectionHeader";
import { TrustCard } from "./TrustCard";
import { NuTab } from "./tabs/NuTab";
import { NamTab } from "./tabs/NamTab";
import { PhuKienTab } from "./tabs/PhuKienTab";
import { LookbookTab } from "./tabs/LookbookTab";
import { SaleTab } from "./tabs/SaleTab";

const HERO_IMAGE = "/images/fastwear-hero.png";
const SHOWROOM_IMAGE =
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85";
const SUSTAINABILITY_IMAGE =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85";

const occasions = [
  {
    title: "Tiệc cưới",
    description: "Đầm dự tiệc, suit lịch lãm và phụ kiện hoàn thiện.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Sự kiện",
    description: "Trang phục nổi bật cho gala, ra mắt, networking.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Prom & tốt nghiệp",
    description: "Khoảnh khắc quan trọng, lên hình chỉn chu.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Áo dài & lễ Tết",
    description: "Tôn dáng, trang trọng, phù hợp văn hóa Việt.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Du lịch",
    description: "Resort, tiệc biển, cuối tuần nhẹ nhàng.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Công sở cao cấp",
    description: "Blazer, suit, đầm thanh lịch cho lịch gặp quan trọng.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
  },
];

const featured = products.filter((product) => product.available).slice(0, 4);

const fashionReferences = [
  { label: "VOGUE", className: "font-serif text-3xl md:text-4xl" },
  { label: "ELLE", className: "font-serif text-3xl tracking-[0.14em] md:text-4xl" },
  { label: "Harper's BAZAAR", className: "font-serif text-2xl md:text-3xl" },
  { label: "GQ", className: "font-sans text-3xl font-semibold tracking-[0.08em] md:text-4xl" },
  { label: "L'OFFICIEL", className: "font-serif text-2xl tracking-[0.12em] md:text-3xl" },
  { label: "WWD", className: "font-sans text-3xl font-semibold tracking-[0.1em] md:text-4xl" },
];

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function PrimaryLink({ to, children }: { to: "/categories" | "/account"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ to, children }: { to: "/categories" | "/account" | "/about"; children: React.ReactNode }) {
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
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block overflow-hidden border border-[#d8cdb5]/70 bg-white transition hover:border-[#b99a55]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#eee5d5]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 bg-white/82 px-3 py-1 text-[11px] font-semibold text-[#2d2a24] backdrop-blur">
          {product.category}
        </div>
      </div>
      <div className="p-4 md:p-5">
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

function GioiThieuTab() {
  return (
    <div className="pb-20">
      <section className="relative min-h-[560px] w-full overflow-hidden bg-[#1c1a16] md:min-h-[700px]">
        <img
          src={HERO_IMAGE}
          alt="Người mẫu mặc trang phục dự tiệc cao cấp"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/36 to-black/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-end px-4 py-9 md:min-h-[700px] md:px-6 md:py-16 lg:px-8">
          <div className="max-w-2xl text-[#fbf8ef]">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d9c48f]">
              FASTWEAR VIỆT NAM
            </div>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-[1.06] md:text-7xl">
              Thuê outfit cao cấp cho khoảnh khắc quan trọng.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#fbf8ef]/82 md:text-base md:leading-7">
              Chọn nhanh. Thử dễ. Mặc đẹp đúng dịp. FASTWear giúp bạn thuê trang phục sự kiện, áo dài, suit và phụ kiện cao cấp với trải nghiệm rõ ràng từ online đến showroom.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Khám phá bộ sưu tập
              </Link>
              <Link
                to="/account"
                className="inline-flex items-center justify-center rounded-full border border-[#fbf8ef]/45 bg-[#fbf8ef]/10 px-6 py-3 text-sm font-semibold text-[#fbf8ef] backdrop-blur-sm transition hover:border-[#fbf8ef]"
              >
                Đặt lịch thử showroom
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8cdb5]/70 bg-[#fbfaf5]">
        <div className="mx-auto flex min-h-[104px] max-w-7xl items-center px-4 py-5 md:min-h-[116px] md:px-6">
          <div className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-5 text-center text-[#1f1d19]/72 sm:grid-cols-3 lg:grid-cols-6">
            {fashionReferences.map((item) => (
              <div key={item.label} className={item.className}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Chọn theo dịp"
          title="Mặc đúng khoảnh khắc, không cần mua mới."
          description="Bắt đầu từ dịp bạn cần xuất hiện. FASTWear gợi ý trang phục theo bối cảnh, mức trang trọng và phong cách cá nhân."
          action={<SecondaryLink to="/categories">Xem tất cả dịp mặc</SecondaryLink>}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion, index) => (
            <Link
              key={occasion.title}
              to="/categories"
              className={`group relative min-h-[320px] overflow-hidden border border-[#d8cdb5]/70 bg-[#201d18] ${
                index === 0 ? "lg:col-span-2 lg:min-h-[430px]" : ""
              }`}
            >
              <img
                src={occasion.image}
                alt={occasion.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/28 to-black/6" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 text-[#fbf8ef] md:p-7">
                <div className="max-w-sm">
                  <h3 className="font-serif text-3xl font-medium leading-tight md:text-4xl">
                    {occasion.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#fbf8ef]/80">{occasion.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f5dfaa]">
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
          description="Một vài thiết kế đang sẵn sàng cho lịch tiệc, sự kiện, áo dài và công sở cao cấp."
          action={<PrimaryLink to="/categories">Xem bộ sưu tập</PrimaryLink>}
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <FeaturedRentalCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
        <SectionHeader
          align="center"
          eyebrow="Quy trình thuê"
          title="Chọn nhanh. Thử dễ. Nhận đồ đúng lịch."
          description="FASTWear giữ hành trình thuê gọn gàng để bạn tập trung vào dịp quan trọng của mình."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {[
            {
              title: "Tìm outfit",
              description: "Chọn theo dịp mặc, giới tính, size hoặc phong cách bạn muốn xuất hiện.",
              icon: <Search className="h-4 w-4" />,
            },
            {
              title: "Thử và xác nhận",
              description: "Đặt lịch thử tại showroom hoặc dùng AR Try-On để ướm dáng nhanh.",
              icon: <CalendarDays className="h-4 w-4" />,
            },
            {
              title: "Nhận đồ đã chuẩn bị",
              description: "Trang phục được làm sạch, kiểm tra tình trạng và giao theo lịch thuê.",
              icon: <PackageCheck className="h-4 w-4" />,
            },
            {
              title: "Hoàn trả nhẹ nhàng",
              description: "Trả tại showroom hoặc theo hướng dẫn giao nhận. Tiền cọc được xử lý minh bạch.",
              icon: <RotateCcw className="h-4 w-4" />,
            },
          ].map((step, index, list) => (
            <ProcessStep
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === list.length - 1}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <div className="grid overflow-hidden border border-[#d8cdb5]/75 bg-white/72 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative min-h-[300px] overflow-hidden bg-[#eee5d5] lg:min-h-full">
          <img
            src={SHOWROOM_IMAGE}
            alt="Không gian thử trang phục FASTWear"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
        </div>
        <div className="p-7 md:p-10 lg:p-12">
          <SectionHeader
            eyebrow="Tự tin trước khi thuê"
            title="Online tiện, showroom vững tâm."
            description="Thử thật khi cần, thử ảo khi muốn nhanh. FASTWear giữ mọi bước rõ ràng trước ngày bạn cần xuất hiện."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <TrustCard
              icon={<MapPin className="h-4 w-4" />}
              label="Showroom"
              title="Thử trước khi chốt"
              description="Đặt lịch để kiểm tra phom, độ dài và phụ kiện đi kèm."
              className="bg-[#fbfaf5]/78 shadow-none"
            />
            <TrustCard
              icon={<Sparkles className="h-4 w-4" />}
              label="AR Try-On"
              title="Ướm dáng nhanh"
              description="Xem cảm giác phối đồ trước khi thêm vào giỏ thuê."
              className="bg-[#fbfaf5]/78 shadow-none"
            />
            <TrustCard
              icon={<MessageCircle className="h-4 w-4" />}
              label="FASTHelp"
              title="Tư vấn theo dịp"
              description="Gợi ý size, phụ kiện và lựa chọn an toàn cho bối cảnh."
              className="bg-[#fbfaf5]/78 shadow-none"
            />
            <TrustCard
              icon={<PackageCheck className="h-4 w-4" />}
              label="Rõ tiền cọc"
              title="Minh bạch trước đặt"
              description="Giá thuê, tiền cọc và điều kiện trả đồ được trình bày sớm."
              className="bg-[#fbfaf5]/78 shadow-none"
            />
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <div className="grid overflow-hidden border border-[#d8cdb5]/75 bg-[#f7f1e6] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12">
            <SectionHeader
              eyebrow="Tiêu dùng thông minh"
              title="Phong cách nổi bật, tủ đồ nhẹ hơn."
              description="Thuê những món chỉ cần cho đúng dịp, giữ hình ảnh chỉn chu mà không phải sở hữu quá nhiều."
            />
            <div className="mt-8 flex items-start gap-3 border-l border-[#c7ae70]/80 pl-5 text-sm leading-6 text-[#5f625c] md:text-base md:leading-7">
              <Leaf className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <p>
                Mỗi thiết kế được chăm sóc để xuất hiện đẹp trong nhiều khoảnh khắc, thay vì nằm yên trong tủ sau một lần mặc.
              </p>
            </div>
          </div>
          <img
            src={SUSTAINABILITY_IMAGE}
            alt="Trang phục được chuẩn bị cho lịch thuê"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 md:px-6">
        <div className="border border-[#1d4e3f]/20 bg-[#1d4e3f] px-6 py-12 text-center text-[#fbf8ef] md:px-12 md:py-16">
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

export function HomePage({ tab = "gioi-thieu", view }: { tab?: string; view?: string }) {
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
        {tab === "nu" && <NuTab view={view} />}
        {tab === "nam" && <NamTab view={view} />}
        {tab === "phu-kien" && <PhuKienTab view={view} />}
        {tab === "lookbook" && <LookbookTab />}
        {tab === "sale" && <SaleTab />}
        {tab === "gioi-thieu" && <GioiThieuTab />}
      </motion.div>
    </AnimatePresence>
  );
}
