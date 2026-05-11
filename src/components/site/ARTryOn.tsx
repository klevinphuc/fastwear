import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  ShoppingCart,
  ChevronDown,
  ThumbsUp,
  RotateCw,
  Plus,
  Minus,
} from "lucide-react";
import { formatVND, type Product } from "@/lib/products";
import { toast } from "sonner";
import avatarFemale from "@/assets/avatar-female.png";
import avatarMale from "@/assets/avatar-male.png";

type Gender = "female" | "male";
type SlotKey = "tops" | "bags" | "jewelry" | "shoes" | "others";

type ClothingItem = {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  color: string;
  thumbnail: string;
  size?: string[];
};

const AVATAR_IMG: Record<Gender, string> = {
  female: avatarFemale,
  male: avatarMale,
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=200&q=80`;

const CLOTHING: Record<Gender, Record<SlotKey, ClothingItem[]>> = {
  female: {
    tops: [
      { id: "f-top-1", name: "Đầm Midi Hoa Nhí", price: "250k/ngày", priceNum: 250000, color: "#E8B4C8", thumbnail: img("photo-1572804013309-59a88b7e92f1"), size: ["XS","S","M","L"] },
      { id: "f-top-2", name: "Áo Crop Linen Trắng", price: "150k/ngày", priceNum: 150000, color: "#F5F0EB", thumbnail: img("photo-1434389677669-e08b4cac3105"), size: ["XS","S","M","L"] },
      { id: "f-top-3", name: "Váy Satin Đỏ", price: "300k/ngày", priceNum: 300000, color: "#C0392B", thumbnail: img("photo-1515886657613-9f3515b0c78f"), size: ["XS","S","M"] },
      { id: "f-top-4", name: "Blazer Kem", price: "200k/ngày", priceNum: 200000, color: "#F2EBE0", thumbnail: img("photo-1591047139829-d91aecb6caea"), size: ["S","M","L"] },
      { id: "f-top-5", name: "Đầm Dạ Tiệc Tím", price: "400k/ngày", priceNum: 400000, color: "#7D3C98", thumbnail: img("photo-1566174053879-31528523f8ae"), size: ["XS","S","M"] },
      { id: "f-top-6", name: "Set Coordinated Be", price: "280k/ngày", priceNum: 280000, color: "#D4B896", thumbnail: img("photo-1617922001439-4a2e6562f328"), size: ["S","M","L"] },
    ],
    bags: [
      { id: "f-bag-1", name: "Túi Tote Canvas", price: "80k/ngày", priceNum: 80000, color: "#8B7355", thumbnail: img("photo-1548036328-c9fa89d128fa") },
      { id: "f-bag-2", name: "Clutch Vàng", price: "120k/ngày", priceNum: 120000, color: "#D4AF37", thumbnail: img("photo-1553062407-98eeb64c6a62") },
      { id: "f-bag-3", name: "Mini Bag Đen", price: "150k/ngày", priceNum: 150000, color: "#1A1A1A", thumbnail: img("photo-1584917865442-de89df76afd3") },
      { id: "f-bag-4", name: "Shoulder Bag Nâu", price: "130k/ngày", priceNum: 130000, color: "#6B3A2A", thumbnail: img("photo-1590874103328-eac38a683ce7") },
    ],
    jewelry: [
      { id: "f-jwl-1", name: "Dây Chuyền Ngọc Trai", price: "50k/ngày", priceNum: 50000, color: "#F8F4F0", thumbnail: img("photo-1599643478518-a784e5dc4c8f") },
      { id: "f-jwl-2", name: "Bông Tai Vàng", price: "40k/ngày", priceNum: 40000, color: "#D4AF37", thumbnail: img("photo-1535632066927-ab7c9ab60908") },
      { id: "f-jwl-3", name: "Vòng Tay Bạc", price: "30k/ngày", priceNum: 30000, color: "#C0C0C0", thumbnail: img("photo-1573408301185-9519f94815fe") },
      { id: "f-jwl-4", name: "Set Đá Quý Burgundy", price: "90k/ngày", priceNum: 90000, color: "#6B1A33", thumbnail: img("photo-1611085583191-a3b181a88401") },
    ],
    shoes: [
      { id: "f-shoe-1", name: "Cao Gót Nude", price: "100k/ngày", priceNum: 100000, color: "#D4A88A", thumbnail: img("photo-1543163521-1bf539c55dd2") },
      { id: "f-shoe-2", name: "Sandal Quai Vàng", price: "80k/ngày", priceNum: 80000, color: "#D4AF37", thumbnail: img("photo-1515347619252-60a4bf4fff4f") },
      { id: "f-shoe-3", name: "Boot Cổ Thấp", price: "120k/ngày", priceNum: 120000, color: "#1A1A1A", thumbnail: img("photo-1608256246200-53e635b5b65f") },
      { id: "f-shoe-4", name: "Sneaker Trắng", price: "90k/ngày", priceNum: 90000, color: "#F5F5F5", thumbnail: img("photo-1542291026-7eec264c27ff") },
    ],
    others: [
      { id: "f-oth-1", name: "Trench Camel", price: "200k/ngày", priceNum: 200000, color: "#C19A6B", thumbnail: img("photo-1539533018447-63fcce2678e3") },
      { id: "f-oth-2", name: "Mũ Bucket Trắng", price: "40k/ngày", priceNum: 40000, color: "#F5F5F5", thumbnail: img("photo-1556306535-0f09a537f0a3") },
      { id: "f-oth-3", name: "Kính Cat-eye", price: "35k/ngày", priceNum: 35000, color: "#1A1A1A", thumbnail: img("photo-1511499767150-a48a237f0083") },
      { id: "f-oth-4", name: "Khăn Lụa", price: "45k/ngày", priceNum: 45000, color: "#E8C5A0", thumbnail: img("photo-1601924994987-69e26d50dc26") },
    ],
  },
  male: {
    tops: [
      { id: "m-top-1", name: "Suit Đen Classic", price: "350k/ngày", priceNum: 350000, color: "#1A1A1A", thumbnail: img("photo-1507003211169-0a1dd7228f2d"), size: ["S","M","L","XL"] },
      { id: "m-top-2", name: "Suit Xám Tro", price: "320k/ngày", priceNum: 320000, color: "#808080", thumbnail: img("photo-1500648767791-00dcc994a43e"), size: ["S","M","L","XL"] },
      { id: "m-top-3", name: "Sơ Mi Trắng Premium", price: "120k/ngày", priceNum: 120000, color: "#F5F5F5", thumbnail: img("photo-1596755094514-f87e34085b2c"), size: ["S","M","L","XL"] },
      { id: "m-top-4", name: "Polo Navy", price: "100k/ngày", priceNum: 100000, color: "#1B3A6B", thumbnail: img("photo-1581655353564-df123a1eb820"), size: ["S","M","L","XL"] },
      { id: "m-top-5", name: "Suit Linen Kem", price: "300k/ngày", priceNum: 300000, color: "#F2EBE0", thumbnail: img("photo-1555069519-127aadecd318"), size: ["M","L","XL"] },
      { id: "m-top-6", name: "Thun Basic Đen", price: "80k/ngày", priceNum: 80000, color: "#2C2C2C", thumbnail: img("photo-1521572163474-6864f9cf17ab"), size: ["S","M","L","XL"] },
    ],
    bags: [
      { id: "m-bag-1", name: "Briefcase Da Nâu", price: "150k/ngày", priceNum: 150000, color: "#5C3A1E", thumbnail: img("photo-1553062407-98eeb64c6a62") },
      { id: "m-bag-2", name: "Tote Canvas Đen", price: "70k/ngày", priceNum: 70000, color: "#1A1A1A", thumbnail: img("photo-1548036328-c9fa89d128fa") },
      { id: "m-bag-3", name: "Backpack Da Premium", price: "180k/ngày", priceNum: 180000, color: "#3D2B1F", thumbnail: img("photo-1622560480605-d83c853bc5c3") },
    ],
    jewelry: [
      { id: "m-jwl-1", name: "Đồng Hồ Bạc", price: "100k/ngày", priceNum: 100000, color: "#C0C0C0", thumbnail: img("photo-1523275335684-37898b6baf30") },
      { id: "m-jwl-2", name: "Đồng Hồ Vàng", price: "150k/ngày", priceNum: 150000, color: "#D4AF37", thumbnail: img("photo-1547996160-81dfa63595aa") },
      { id: "m-jwl-3", name: "Vòng Tay Da", price: "40k/ngày", priceNum: 40000, color: "#6B3A2A", thumbnail: img("photo-1573408301185-9519f94815fe") },
      { id: "m-jwl-4", name: "Cà Vạt Lụa Đỏ", price: "60k/ngày", priceNum: 60000, color: "#8B0000", thumbnail: img("photo-1589756823695-278bc923f962") },
    ],
    shoes: [
      { id: "m-shoe-1", name: "Oxford Da Đen", price: "120k/ngày", priceNum: 120000, color: "#1A1A1A", thumbnail: img("photo-1614252369475-531eba835eb1") },
      { id: "m-shoe-2", name: "Derby Da Nâu", price: "110k/ngày", priceNum: 110000, color: "#5C3A1E", thumbnail: img("photo-1533867617858-e7b97e060509") },
      { id: "m-shoe-3", name: "Sneaker Trắng", price: "90k/ngày", priceNum: 90000, color: "#F5F5F5", thumbnail: img("photo-1542291026-7eec264c27ff") },
      { id: "m-shoe-4", name: "Loafer Camel", price: "100k/ngày", priceNum: 100000, color: "#C19A6B", thumbnail: img("photo-1582588678413-dbf45f4823e9") },
    ],
    others: [
      { id: "m-oth-1", name: "Bomber Đen", price: "180k/ngày", priceNum: 180000, color: "#1A1A1A", thumbnail: img("photo-1591047139829-d91aecb6caea") },
      { id: "m-oth-2", name: "Mũ Fedora Nâu", price: "50k/ngày", priceNum: 50000, color: "#5C3A1E", thumbnail: img("photo-1521369909029-2afed882baee") },
      { id: "m-oth-3", name: "Kính Vuông Đen", price: "35k/ngày", priceNum: 35000, color: "#1A1A1A", thumbnail: img("photo-1516714435131-44d6b64dc6a2") },
      { id: "m-oth-4", name: "Thắt Lưng Da", price: "45k/ngày", priceNum: 45000, color: "#1A1A1A", thumbnail: img("photo-1624222247344-550fb60583dc") },
    ],
  },
};

const SLOT_META: { key: SlotKey; label: string; icon: string }[] = [
  { key: "tops", label: "Trang phục chính", icon: "👗" },
  { key: "bags", label: "Túi xách", icon: "👜" },
  { key: "jewelry", label: "Trang sức", icon: "💍" },
  { key: "shoes", label: "Giày dép", icon: "👠" },
  { key: "others", label: "Khác (áo khoác, mũ,...)", icon: "🧣" },
];

// Where each slot's clothing overlay sits on the avatar (% of stage)
const SLOT_ANCHOR: Record<SlotKey, { top: string; left: string; w: number; h: number; blend: "tops" | "bags" | "jewelry" | "shoes" | "others" }> = {
  tops:    { top: "30%", left: "50%", w: 180, h: 280, blend: "tops" },
  bags:    { top: "58%", left: "76%", w: 90,  h: 90,  blend: "bags" },
  jewelry: { top: "22%", left: "50%", w: 70,  h: 70,  blend: "jewelry" },
  shoes:   { top: "92%", left: "50%", w: 150, h: 60,  blend: "shoes" },
  others:  { top: "10%", left: "50%", w: 110, h: 80,  blend: "others" },
};

export function ARTryOn({ open, onClose, product }: { open: boolean; onClose: () => void; product: Product }) {
  const [gender, setGender] = useState<Gender>(product.gender === "Nam" ? "male" : "female");
  const [showMeasures, setShowMeasures] = useState(false);
  const [measurements, setMeasurements] = useState({ height: 162, weight: 52 });
  const [worn, setWorn] = useState<Partial<Record<SlotKey, ClothingItem>>>({});
  const [score, setScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showHint, setShowHint] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setWorn({});
    setZoom(1);
  }, [gender]);

  const wornCount = Object.values(worn).filter(Boolean).length;

  useEffect(() => {
    if (wornCount < 2) {
      setScore(null);
      setDisplayScore(0);
      return;
    }
    const items = Object.values(worn).filter(Boolean) as ClothingItem[];
    const uniq = new Set(items.map((i) => i.color)).size;
    const base = 75 + Math.floor(Math.random() * 8);
    const bonus = uniq <= 2 ? 12 : uniq === 3 ? 6 : 0;
    setScore(Math.min(98, base + bonus));
  }, [wornCount, worn]);

  useEffect(() => {
    if (score == null) return;
    let raf = 0;
    let v = 0;
    const step = () => {
      v += Math.max(1, (score - v) * 0.15);
      if (v >= score) {
        setDisplayScore(score);
        return;
      }
      setDisplayScore(Math.round(v));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const handleScreenshot = () => {
    toast.success("Đã lưu ảnh outfit ✨", { description: "FASTWear_outfit.png" });
  };

  const handleRentAll = () => {
    const items = Object.values(worn).filter(Boolean) as ClothingItem[];
    if (!items.length) {
      toast.error("Hãy chọn ít nhất 1 món trước");
      return;
    }
    toast.success(`Đã thêm ${items.length} món vào giỏ`, {
      description: items.map((i) => i.name).join(", "),
    });
    onClose();
  };

  const wear = (slot: SlotKey, item: ClothingItem) => {
    setWorn((w) => ({ ...w, [slot]: item }));
  };
  const remove = (slot: SlotKey) => setWorn((w) => ({ ...w, [slot]: undefined }));

  const totalPrice = useMemo(
    () => (Object.values(worn).filter(Boolean) as ClothingItem[]).reduce((s, x) => s + x.priceNum, 0),
    [worn],
  );

  if (!open) return null;

  const inventory = CLOTHING[gender];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="absolute inset-0 flex flex-col overflow-hidden bg-[#0D0D0D] text-white md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Avatar stage */}
          <div
            ref={stageRef}
            className="relative h-[55vh] w-full overflow-hidden md:h-full md:w-[60%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(60,55,52,0.95) 0%, rgba(13,13,13,1) 75%)",
            }}
          >
            <div className="pointer-events-none absolute left-5 top-5 z-20 font-serif text-2xl text-white/90">FASTWear</div>

            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="absolute bottom-24 right-5 z-20 flex flex-col gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-20 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur"
                >
                  Chọn món bên phải để mặc lên avatar
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar image with worn overlays */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={gender}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoom }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className="relative h-full"
                style={{ aspectRatio: "3/4" }}
              >
                <motion.img
                  src={AVATAR_IMG[gender]}
                  alt={gender === "female" ? "Avatar nữ" : "Avatar nam"}
                  className="h-full w-full select-none object-contain"
                  draggable={false}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Clothing overlays */}
                {(Object.entries(worn) as [SlotKey, ClothingItem | undefined][]).map(([slot, item]) => {
                  if (!item) return null;
                  const a = SLOT_ANCHOR[slot];
                  return (
                    <motion.div
                      key={slot + item.id}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: a.top, left: a.left }}
                    >
                      <div
                        className="overflow-hidden rounded-2xl border-2 shadow-2xl"
                        style={{
                          width: a.w,
                          height: a.h,
                          borderColor: item.color,
                          boxShadow: `0 10px 40px ${item.color}55, 0 0 0 4px rgba(0,0,0,0.25)`,
                        }}
                      >
                        <div className="relative h-full w-full">
                          <img src={item.thumbnail} className="h-full w-full object-cover" />
                          <div
                            className="absolute inset-0 mix-blend-multiply"
                            style={{ background: item.color, opacity: 0.35 }}
                          />
                        </div>
                      </div>
                      <div className="mt-1 text-center font-mono text-[9px] uppercase tracking-widest text-white/80">
                        {item.name}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <AnimatePresence>
              {score != null && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B1A33]">
                    <ThumbsUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">FASTHelp nói</div>
                    <div className="font-serif text-lg">
                      Bộ này hợp nhau ✨ <span className="text-[#F2C4CE]">{displayScore}/100</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel */}
          <div className="flex h-[45vh] w-full flex-col bg-[#FAF6F1] text-[#1C1410] md:h-full md:w-[40%]">
            <div className="flex items-start justify-between border-b border-black/5 px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl">Phòng Thử Đồ Ảo 👗</h2>
                <p className="text-xs text-[#1C1410]/60">Chọn từng món để thử lên avatar</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="mb-5">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1C1410]/60">Avatar</div>
                <div className="relative flex rounded-full border border-black/10 bg-white p-1">
                  {(["female", "male"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className="relative z-10 flex-1 rounded-full py-2 text-sm font-medium transition-colors"
                      style={{ color: gender === g ? "#fff" : "#1C1410" }}
                    >
                      {gender === g && (
                        <motion.div
                          layoutId="gender-pill"
                          className="absolute inset-0 rounded-full bg-[#6B1A33]"
                          style={{ zIndex: -1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      <span className="relative">{g === "female" ? "👩 Nữ" : "👨 Nam"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-black/5 bg-white">
                <button
                  onClick={() => setShowMeasures((s) => !s)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm"
                >
                  <span>Nhập số đo để mặc đúng hơn</span>
                  <ChevronDown className={`h-4 w-4 transition ${showMeasures ? "rotate-180" : ""}`} />
                </button>
                {showMeasures && (
                  <div className="grid grid-cols-2 gap-3 border-t border-black/5 px-4 py-4 text-xs">
                    {([
                      ["Chiều cao (cm)", "height", measurements.height],
                      ["Cân nặng (kg)", "weight", measurements.weight],
                    ] as const).map(([l, k, v]) => (
                      <label key={k} className="block">
                        <span className="text-[#1C1410]/60">{l}</span>
                        <input
                          type="number"
                          value={v}
                          onChange={(e) => setMeasurements((m) => ({ ...m, [k]: Number(e.target.value) || 0 }))}
                          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {SLOT_META.map((s) => {
                  const items = inventory[s.key];
                  const w = worn[s.key];
                  return (
                    <div key={s.key} className="rounded-2xl border border-black/5 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span className="text-lg">{s.icon}</span>
                          {s.label}
                        </div>
                        {w && (
                          <button onClick={() => remove(s.key)} className="text-xs text-[#6B1A33] hover:underline">
                            ✕ Bỏ
                          </button>
                        )}
                      </div>

                      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                        {items.map((it) => {
                          const active = w?.id === it.id;
                          return (
                            <button
                              key={it.id}
                              onClick={() => wear(s.key, it)}
                              title={it.name}
                              className="shrink-0 overflow-hidden rounded-xl border-2 transition"
                              style={{
                                borderColor: active ? "#6B1A33" : "rgba(0,0,0,0.06)",
                                boxShadow: active ? "0 0 0 3px rgba(107,26,51,0.15)" : "none",
                              }}
                            >
                              <img src={it.thumbnail} alt={it.name} className="h-16 w-16 object-cover" />
                            </button>
                          );
                        })}
                      </div>

                      {w && (
                        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#FAF6F1] p-2">
                          <img src={w.thumbnail} className="h-12 w-12 rounded-lg object-cover" />
                          <div className="flex-1 text-xs">
                            <div className="font-medium">{w.name}</div>
                            <div className="font-mono text-[10px] text-[#1C1410]/60">
                              {w.price}
                              {w.size ? ` · ${w.size[0]}` : ""}
                            </div>
                          </div>
                          <div
                            className="h-5 w-5 rounded-full border border-black/10"
                            style={{ background: w.color }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-black/5 bg-white px-6 py-4">
              <div className="mb-2 flex items-center justify-between text-xs text-[#1C1410]/60">
                <span>{wornCount} món</span>
                <span className="font-mono text-[#1C1410]">{formatVND(totalPrice)}/ngày</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleScreenshot}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white py-3 text-sm hover:bg-black/5"
                >
                  <Camera className="h-4 w-4" /> Chụp ảnh
                </button>
                <button
                  onClick={handleRentAll}
                  className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-[#6B1A33] py-3 text-sm text-white hover:bg-[#8B2442]"
                >
                  <ShoppingCart className="h-4 w-4" /> Thuê cả bộ này
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#1C1410]/40">
                <RotateCw className="h-3 w-3" /> Avatar FASTWear · 2 mẫu mặc định
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
