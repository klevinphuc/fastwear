import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Về FASTWear" },
      { name: "description", content: "Câu chuyện thương hiệu và sứ mệnh của FASTWear: thời trang tuần hoàn cho người Việt." },
    ],
  }),
  component: AboutPage,
});

const team = [
  { n: "Mai Linh", r: "Founder & CEO", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { n: "Quốc Bảo", r: "Head of Style", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { n: "Hà Anh", r: "Head of Tech", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80" },
  { n: "Khánh Vy", r: "Lead Designer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
];

function AboutPage() {
  return (
    <SiteShell>
      <section className="relative h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full items-end p-10">
          <h1 className="font-serif text-5xl text-white md:text-7xl">Mặc thời trang.<br />Giảm rác thải.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h2 className="font-serif text-3xl">Tại sao FASTWear ra đời?</h2>
        <p className="mt-4 text-muted-foreground">
          Chúng tôi sinh ra ở Sài Gòn năm 2024 với một niềm tin đơn giản: bạn không cần sở hữu để đẹp. Mỗi tủ đồ ở Việt Nam có 60% quần áo chỉ mặc dưới 5 lần. FASTWear biến những outfit ấy thành tủ đồ sống — luân chuyển, được nâng niu, và mặc trọn vẹn vòng đời.
        </p>
        <blockquote className="mt-8 border-l-2 border-primary pl-6 font-serif text-xl">
          "Khi bạn thuê một chiếc đầm thay vì mua, bạn không chỉ tiết kiệm 70% chi phí — bạn còn giúp ngành thời trang thải ra ít hơn 80% CO₂ cho mỗi lần mặc."
          <div className="mt-3 text-sm text-muted-foreground not-italic">— Mai Linh, Founder</div>
        </blockquote>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8">
        <h2 className="font-serif text-3xl">Đội ngũ</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map((t) => (
            <div key={t.n}>
              <div className="overflow-hidden rounded-2xl">
                <img src={t.img} className="aspect-square w-full object-cover" />
              </div>
              <div className="mt-3 font-serif text-lg">{t.n}</div>
              <div className="text-xs text-muted-foreground">{t.r}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
