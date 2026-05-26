import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Heart, Share2, X } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

const campaigns = [
  {
    id: 1,
    title: "Tủ Quần Áo Cho Em",
    description: "Quyên góp quần áo cũ còn tốt cho trẻ em vùng cao Tây Bắc",
    icon: "👗",
    raised: 12500000,
    goal: 20000000,
    backers: 342,
    daysLeft: 15,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80",
    category: "Trẻ em",
    color: "#E8B4C8",
  },
  {
    id: 2,
    title: "Xanh Hóa Thời Trang",
    description: "Tái chế 1000kg vải thừa thành sản phẩm mới, giảm rác thải thời trang",
    icon: "♻️",
    raised: 8200000,
    goal: 15000000,
    backers: 218,
    daysLeft: 23,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80",
    category: "Môi trường",
    color: "#A8D8A8",
  },
  {
    id: 3,
    title: "Tự Tin Tỏa Sáng",
    description: "Hỗ trợ trang phục cho phụ nữ hoàn cảnh khó khăn đi phỏng vấn việc làm",
    icon: "✨",
    raised: 5800000,
    goal: 10000000,
    backers: 156,
    daysLeft: 31,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    category: "Cộng đồng",
    color: "#FFD700",
  },
];

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{v.toLocaleString("vi-VN")}</span>;
}

function CampaignCard({ c, onSupport }: { c: (typeof campaigns)[number]; onSupport: () => void }) {
  const pct = Math.round((c.raised / c.goal) * 100);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="glass-mid glass-card-hover overflow-hidden">
      <div className="relative aspect-[5/3] overflow-hidden">
        <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 glass-dark px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white" style={{ borderRadius: 999 }}>
          {c.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-[#1C1410]">
          <span className="mr-2">{c.icon}</span>{c.title}
        </h3>
        <p className="mt-2 text-sm text-[#1C1410]/65">{c.description}</p>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: inView ? `${pct}%` : 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="h-full"
              style={{ background: "linear-gradient(90deg,#6B1A33,#a93962)" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#6B1A33]">{pct}%</span>
            <span className="text-[#1C1410]/70">{fmt(c.raised)} / {fmt(c.goal)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#1C1410]/65">
          <span><CountUp to={c.backers} /> người ủng hộ</span>
          <span>{c.daysLeft} ngày còn</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={onSupport} className="flex-1 rounded-full bg-primary px-3 py-2 text-xs text-primary-foreground hover:bg-primary/90">
            <Heart className="mr-1 inline h-3 w-3" /> Ủng hộ ngay
          </button>
          <button className="glass-soft flex h-9 w-9 items-center justify-center text-[#1C1410]/70" aria-label="Chia sẻ">
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DonateModal({ open, onClose, campaign }: { open: boolean; onClose: () => void; campaign: (typeof campaigns)[number] | null }) {
  const [amount, setAmount] = useState(50000);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("MoMo");
  if (!campaign) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-md p-6"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-2xl text-[#1C1410]">💚 Ủng hộ "{campaign.title}"</h3>
              <button onClick={onClose} className="glass-soft flex h-8 w-8 items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5">
              <div className="font-mono text-[11px] uppercase text-[#1C1410]/60">Chọn mức đóng góp</div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[20000, 50000, 100000, 200000].map((a) => (
                  <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className={`rounded-full px-2 py-2 font-mono text-xs ${amount === a && !custom ? "bg-[#6B1A33] text-white" : "glass-soft text-[#1C1410]/80"}`}>
                    {a / 1000}k
                  </button>
                ))}
              </div>
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                placeholder="Hoặc nhập số tiền..."
                className="glass-soft mt-2 w-full px-3 py-2 font-mono text-sm placeholder-[#1C1410]/40"
                style={{ borderRadius: 999 }}
              />
            </div>

            <div className="mt-4 glass-soft p-3 text-xs text-[#1C1410]/75" style={{ borderRadius: 14 }}>
              👗 Hoặc thuê đồ để tự động góp <span className="font-mono text-[#6B1A33]">5%</span> mỗi đơn.
            </div>

            <div className="mt-4">
              <div className="font-mono text-[11px] uppercase text-[#1C1410]/60">Phương thức</div>
              <div className="mt-2 flex gap-2">
                {["MoMo", "ZaloPay", "ATM"].map((m) => (
                  <button key={m} onClick={() => setMethod(m)} className={`flex-1 rounded-full px-3 py-2 text-xs ${method === m ? "bg-[#6B1A33] text-white" : "glass-soft text-[#1C1410]/80"}`}>{m}</button>
                ))}
              </div>
            </div>

            <input placeholder="Tên hiển thị" className="glass-soft mt-3 w-full px-3 py-2 text-sm" style={{ borderRadius: 999 }} />
            <textarea placeholder="Lời nhắn..." className="glass-soft mt-2 w-full px-3 py-2 text-sm" rows={2} style={{ borderRadius: 14 }} />

            <button onClick={onClose} className="mt-5 w-full rounded-full bg-primary py-3 text-sm text-primary-foreground hover:bg-primary/90">
              💚 Xác nhận ủng hộ {fmt(custom ? Number(custom) : amount)}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GivesBackSection() {
  const [active, setActive] = useState<(typeof campaigns)[number] | null>(null);
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
      <div className="glass-strong p-8 md:p-12">
        <div className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6B1A33]">💚 FASTWear Gives Back</div>
          <h2 className="mt-2 font-serif text-4xl text-[#1C1410] md:text-5xl">Thời trang có trách nhiệm</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#1C1410]/65">Mỗi đơn thuê, một hành động ý nghĩa — 5% giá trị mỗi đơn được dành cho cộng đồng.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} c={c} onSupport={() => setActive(c)} />
          ))}
        </div>

        {/* Impact counters */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { v: 1247, l: "Lượt ủng hộ" },
            { v: 26500000, l: "Tổng đã quyên (₫)", money: true },
            { v: 890, l: "Bộ đồ đã trao tặng" },
          ].map((s, i) => (
            <div key={i} className="glass-mid p-6 text-center">
              <div className="font-mono text-3xl text-[#6B1A33]">
                <CountUp to={s.v} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#1C1410]/65">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <DonateModal open={!!active} onClose={() => setActive(null)} campaign={active} />
    </section>
  );
}
