import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/brand-story")({
  head: () => ({
    meta: [
      { title: "Câu chuyện thương hiệu | FASTWear" },
      {
        name: "description",
        content:
          "Câu chuyện thương hiệu FASTWear, hệ sinh thái thời trang O2O và cấu trúc nhân sự vận hành.",
      },
    ],
  }),
  component: BrandStoryPage,
});

const brandValues = [
  {
    title: "Tiện lợi",
    description: "Giúp khách hàng tiết kiệm thời gian khi tìm và thuê trang phục.",
  },
  {
    title: "Minh bạch",
    description: "Cung cấp thông tin rõ ràng về sản phẩm, chính sách thuê và quy trình nhận trả.",
  },
  {
    title: "Chuyên nghiệp",
    description: "Đảm bảo trang phục được vệ sinh, bảo quản và giao nhận đúng hẹn.",
  },
  {
    title: "Cá nhân hóa",
    description: "Hỗ trợ tư vấn size, phong cách và trang phục phù hợp với từng dịp.",
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

function BrandStoryPage() {
  return (
    <SiteShell>
      <main className="bg-[#fbf8ef] text-[#211914]">
        <section className="relative min-h-[calc(100svh-3rem)] overflow-hidden">
          <img
            src="/media/brand-story-hero.webp"
            alt="Hai người mẫu trong bộ ảnh mùa hè của FASTWear"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,14,0.74)_0%,rgba(20,18,14,0.48)_42%,rgba(20,18,14,0.18)_72%,rgba(20,18,14,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,14,0.32)_0%,rgba(20,18,14,0.04)_42%,rgba(20,18,14,0.54)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] max-w-7xl flex-col justify-end px-4 py-10 md:px-6 md:py-14">
            <Link
              to="/"
              className="absolute left-4 top-8 inline-flex items-center gap-2 rounded-full border border-white/28 bg-black/22 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-black/34 md:left-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại Home
            </Link>

            <div className="max-w-4xl pb-4 text-white md:pb-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f2d99d]">
                FASTWEAR O2O
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl font-black leading-[0.96] tracking-normal text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.42)] md:text-7xl lg:text-8xl">
                Câu chuyện thương hiệu
              </h1>
              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.38)] md:text-lg">
                FASTWear được xây dựng như một hệ sinh thái thời trang O2O, kết nối trải nghiệm thuê
                trang phục từ nền tảng online đến showroom offline. Thương hiệu hướng đến việc giúp
                khách hàng dễ dàng tìm được trang phục phù hợp cho các dịp quan trọng, đồng thời đảm
                bảo sự tiện lợi, minh bạch và chuyên nghiệp trong toàn bộ quá trình thuê.
              </p>
              <div className="mt-7 max-w-2xl rounded-[24px] border border-white/28 bg-white/16 p-5 text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f2d99d]">
                  Tủ đồ sự kiện
                </p>
                <p className="mt-3 text-2xl font-extrabold leading-tight">
                  Online để chọn nhanh, showroom để thử kỹ, đội ngũ vận hành để trải nghiệm thuê rõ
                  ràng hơn.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8cdb5]/70 bg-[#f7f1e5]/72 px-4 py-14 md:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b7650]">
                Section 1
              </p>
              <h2 className="mt-3 font-serif text-4xl font-black text-[#211914]">
                FASTWear là gì?
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5f625c] md:text-lg">
              FASTWear là nền tảng hỗ trợ người dùng tìm kiếm, đặt thuê và trải nghiệm trang phục
              thông qua sự kết hợp giữa website online và showroom offline. Khách hàng có thể xem
              thông tin sản phẩm, lựa chọn trang phục phù hợp, được tư vấn size và nhận trang phục
              theo lịch hẹn.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b7650]">
              Section 2
            </p>
            <h2 className="mt-3 font-serif text-4xl font-black text-[#211914]">
              Giá trị thương hiệu
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandValues.map((value) => (
              <article
                key={value.title}
                className="rounded-[24px] border border-[#d8cdb5]/80 bg-white/68 p-5 shadow-[0_14px_32px_rgba(43,35,27,0.055)]"
              >
                <h3 className="font-serif text-2xl font-extrabold text-[#6b1a33]">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f625c]">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b7650]">
              Section 3
            </p>
            <h2 className="mt-3 font-serif text-4xl font-black text-[#211914]">Cấu trúc nhân sự</h2>
            <p className="mt-4 text-base leading-8 text-[#5f625c]">
              Cấu trúc nhân sự của FASTWear được tổ chức theo các nhóm phụ trách chiến lược,
              marketing, showroom, vận hành đơn hàng, chăm sóc khách hàng, nền tảng số và kho.
            </p>
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

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cdb5] bg-white/70 px-6 py-3 text-sm font-semibold text-[#2d2a24] transition hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
            >
              Quay lại Home
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d4e3f] px-6 py-3 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#28634f]"
            >
              Khám phá trang phục
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
