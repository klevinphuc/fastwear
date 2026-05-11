import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { X, Camera, ShoppingCart, ChevronDown, Sparkles, ThumbsUp } from "lucide-react";
import { products, formatVND, type Product } from "@/lib/products";
import { toast } from "sonner";

type Gender = "female" | "male" | "neutral";
type SlotKey = "main" | "bag" | "jewelry" | "shoes" | "other";

type WornItem = { product: Product; color: string };

const SLOT_META: { key: SlotKey; label: string; icon: string; categoryFilter: (p: Product) => boolean }[] = [
  { key: "main", label: "Trang phục chính", icon: "👗", categoryFilter: (p) => /Đầm|Áo|Suit|Sơ|Quần|Blazer/i.test(p.category) },
  { key: "bag", label: "Túi xách", icon: "👜", categoryFilter: (p) => /Phụ kiện|Túi/i.test(p.name.toLowerCase() + p.category.toLowerCase()) },
  { key: "jewelry", label: "Trang sức", icon: "💍", categoryFilter: (p) => /Phụ kiện/i.test(p.category) },
  { key: "shoes", label: "Giày dép", icon: "👠", categoryFilter: (p) => /Giày/i.test(p.category) },
  { key: "other", label: "Khác (áo khoác, mũ,...)", icon: "🧣", categoryFilter: (p) => /Blazer|Áo/i.test(p.category) },
];

function pickFor(slot: SlotKey, exclude?: string): Product[] {
  const meta = SLOT_META.find((s) => s.key === slot)!;
  let list = products.filter((p) => meta.categoryFilter(p) && p.id !== exclude);
  if (list.length < 3) list = products.filter((p) => p.id !== exclude);
  return list.slice(0, 6);
}

/* ---------------- 3D Avatar ---------------- */

function Avatar({
  gender,
  worn,
  measurements,
}: {
  gender: Gender;
  worn: Partial<Record<SlotKey, WornItem>>;
  measurements: { height: number; weight: number };
}) {
  const group = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useFrame((_, dt) => {
    if (autoRotate && group.current) group.current.rotation.y += dt * 0.4;
  });

  const scaleY = measurements.height / 165;
  const widthFactor = Math.max(0.85, Math.min(1.2, measurements.weight / 55));
  const torsoColor = gender === "female" ? "#f1d3c2" : gender === "male" ? "#e8c2a8" : "#e8d2bf";

  const mainColor = worn.main?.color ?? null;
  const shoesColor = worn.shoes?.color ?? null;
  const bagColor = worn.bag?.color ?? null;
  const jewelColor = worn.jewelry?.color ?? "#e8c46b";
  const otherColor = worn.other?.color ?? null;

  return (
    <group
      ref={group}
      scale={[widthFactor, scaleY, widthFactor]}
      onPointerOver={() => setAutoRotate(false)}
      onPointerOut={() => setAutoRotate(true)}
    >
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color={torsoColor} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.12, 16]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.28, 0.55, 8, 16]} />
        <meshStandardMaterial color={torsoColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.42, 0.95, 0]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.08, 0.7, 6, 12]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>
      <mesh position={[0.42, 0.95, 0]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.08, 0.7, 6, 12]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.26, 0.15, 6, 16]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>
      <mesh position={[-0.13, -0.05, 0]}>
        <capsuleGeometry args={[0.11, 0.7, 6, 12]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>
      <mesh position={[0.13, -0.05, 0]}>
        <capsuleGeometry args={[0.11, 0.7, 6, 12]} />
        <meshStandardMaterial color={torsoColor} />
      </mesh>

      <AnimatePresence>
        {mainColor && (
          <ClothingMesh key={`main-${worn.main?.product.id}-${mainColor}`}>
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.34, 0.5, 1.1, 24, 1, true]} />
              <meshStandardMaterial color={mainColor} side={THREE.DoubleSide} roughness={0.5} metalness={0.1} />
            </mesh>
            <mesh position={[0, 1.18, 0]}>
              <cylinderGeometry args={[0.3, 0.34, 0.18, 24, 1, true]} />
              <meshStandardMaterial color={mainColor} side={THREE.DoubleSide} roughness={0.5} />
            </mesh>
          </ClothingMesh>
        )}
      </AnimatePresence>

      {otherColor && (
        <ClothingMesh key={`other-${worn.other?.product.id}-${otherColor}`}>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.36, 0.4, 0.55, 24, 1, true]} />
            <meshStandardMaterial color={otherColor} side={THREE.DoubleSide} roughness={0.6} transparent opacity={0.92} />
          </mesh>
        </ClothingMesh>
      )}

      {shoesColor && (
        <ClothingMesh key={`shoes-${worn.shoes?.product.id}-${shoesColor}`}>
          <mesh position={[-0.13, -0.5, 0.04]}>
            <boxGeometry args={[0.16, 0.08, 0.28]} />
            <meshStandardMaterial color={shoesColor} roughness={0.4} />
          </mesh>
          <mesh position={[0.13, -0.5, 0.04]}>
            <boxGeometry args={[0.16, 0.08, 0.28]} />
            <meshStandardMaterial color={shoesColor} roughness={0.4} />
          </mesh>
        </ClothingMesh>
      )}

      {bagColor && (
        <ClothingMesh key={`bag-${worn.bag?.product.id}-${bagColor}`}>
          <mesh position={[0.42, 0.55, 0.05]}>
            <boxGeometry args={[0.18, 0.14, 0.06]} />
            <meshStandardMaterial color={bagColor} roughness={0.5} />
          </mesh>
        </ClothingMesh>
      )}

      {worn.jewelry && (
        <ClothingMesh key={`jw-${worn.jewelry.product.id}-${jewelColor}`}>
          <mesh position={[0, 1.28, 0.06]} rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[0.1, 0.012, 12, 32]} />
            <meshStandardMaterial color={jewelColor} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-0.18, 1.5, 0.05]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color={jewelColor} metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0.18, 1.5, 0.05]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color={jewelColor} metalness={0.9} roughness={0.15} />
          </mesh>
        </ClothingMesh>
      )}
    </group>
  );
}

function ClothingMesh({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const [t, setT] = useState(0);
  useFrame((_, dt) => setT((v) => Math.min(1, v + dt * 3)));
  const s = 0.85 + 0.15 * t;
  return (
    <group ref={ref} scale={[s, s, s]}>
      {children}
    </group>
  );
}

/* ---------------- Modal ---------------- */

export function ARTryOn({ open, onClose, product }: { open: boolean; onClose: () => void; product: Product }) {
  const [gender, setGender] = useState<Gender>(product.gender === "Nam" ? "male" : "female");
  const [showMeasures, setShowMeasures] = useState(false);
  const [measurements, setMeasurements] = useState({ height: 162, weight: 52 });
  const [activeColor, setActiveColor] = useState(product.colors[0] ?? "#6B1A33");
  const [worn, setWorn] = useState<Partial<Record<SlotKey, WornItem>>>({
    main: { product, color: product.colors[0] ?? "#6B1A33" },
  });
  const [openSlot, setOpenSlot] = useState<SlotKey | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorn((w) => (w.main ? { ...w, main: { ...w.main, color: activeColor } } : w));
  }, [activeColor]);

  const wornCount = Object.values(worn).filter(Boolean).length;
  useEffect(() => {
    if (wornCount < 2) {
      setScore(null);
      setDisplayScore(0);
      return;
    }
    const colors = Object.values(worn).map((w) => w!.color);
    const uniq = new Set(colors).size;
    const base = 75 + Math.floor(Math.random() * 8);
    const bonus = uniq <= 2 ? 12 : uniq === 3 ? 6 : 0;
    const final = Math.min(98, base + bonus);
    setScore(final);
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
    const canvas = canvasWrapRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "FASTWear_outfit.png";
    a.click();
    toast.success("Đã lưu ảnh outfit ✨");
  };

  const handleRentAll = () => {
    const items = Object.values(worn).filter(Boolean) as WornItem[];
    toast.success(`Đã thêm ${items.length} món vào giỏ`, {
      description: items.map((i) => i.product.name).join(", "),
    });
    onClose();
  };

  const wear = (slot: SlotKey, p: Product) => {
    setWorn((w) => ({ ...w, [slot]: { product: p, color: p.colors[0] ?? "#6B1A33" } }));
    setOpenSlot(null);
  };

  const remove = (slot: SlotKey) => setWorn((w) => ({ ...w, [slot]: undefined }));

  const totalPrice = useMemo(
    () => (Object.values(worn).filter(Boolean) as WornItem[]).reduce((s, x) => s + x.product.price, 0),
    [worn]
  );

  if (!open) return null;

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
          <div ref={canvasWrapRef} className="relative h-[55vh] w-full bg-[#0D0D0D] md:h-full md:w-[60%]">
            <div className="pointer-events-none absolute left-5 top-5 z-10 font-serif text-2xl text-white/90">FASTWear</div>
            <div className="absolute left-5 top-14 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
              <span>☀️</span>
              <span>HO CHI MINH · 33° · SUNNY</span>
            </div>
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:hidden"
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className="pointer-events-none absolute inset-0 z-[5] opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
              }}
            />

            <Canvas camera={{ position: [0, 0.9, 3.2], fov: 35 }} gl={{ preserveDrawingBuffer: true, antialias: true }} shadows>
              <color attach="background" args={["#0D0D0D"]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 4]} intensity={1.1} />
              <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#6B1A33" />
              <Suspense fallback={null}>
                <Avatar gender={gender} worn={worn} measurements={measurements} />
              </Suspense>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
                <circleGeometry args={[1.4, 48]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
              <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.9} />
            </Canvas>

            <AnimatePresence>
              {score != null && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md"
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

          <div className="flex h-[45vh] w-full flex-col bg-[#FAF6F1] text-[#1C1410] md:h-full md:w-[40%]">
            <div className="flex items-start justify-between border-b border-black/5 px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl">Phòng Thử Đồ Ảo 👗</h2>
                <p className="text-xs text-[#1C1410]/60">Chọn từng món để thử lên hình</p>
              </div>
              <button
                onClick={onClose}
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black/5 md:flex"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="mb-5">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1C1410]/60">Avatar</div>
                <div className="flex gap-2">
                  {([
                    ["female", "👩", "Nữ"],
                    ["male", "👨", "Nam"],
                    ["neutral", "🧍", "Trung tính"],
                  ] as const).map(([g, ic, l]) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className="flex flex-1 flex-col items-center gap-1 rounded-2xl border py-3 text-xs transition"
                      style={{
                        background: gender === g ? "#6B1A33" : "white",
                        color: gender === g ? "white" : "#1C1410",
                        borderColor: gender === g ? "#6B1A33" : "rgba(0,0,0,0.08)",
                      }}
                    >
                      <span className="text-xl">{ic}</span>
                      {l}
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
                          onChange={(e) =>
                            setMeasurements((m) => ({ ...m, [k]: Number(e.target.value) || 0 }))
                          }
                          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none"
                        />
                      </label>
                    ))}
                    <button className="col-span-2 mt-1 rounded-full bg-[#6B1A33] py-2 text-xs text-white">
                      Áp dụng
                    </button>
                  </div>
                )}
              </div>

              {product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1C1410]/60">
                    Màu sản phẩm
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setActiveColor(c)}
                        className="h-9 w-9 rounded-full border-2 transition"
                        style={{
                          background: c,
                          borderColor: activeColor === c ? "#6B1A33" : "rgba(0,0,0,0.1)",
                          transform: activeColor === c ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {SLOT_META.map((s) => {
                  const w = worn[s.key];
                  return (
                    <div key={s.key} className="rounded-2xl border border-black/5 bg-white p-4">
                      <div className="flex items-center justify-between">
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
                      {w ? (
                        <div className="mt-3 flex items-center gap-3">
                          <img src={w.product.image} className="h-14 w-14 rounded-lg object-cover" />
                          <div className="flex-1 text-xs">
                            <div className="font-medium">{w.product.name}</div>
                            <div className="font-mono text-[10px] text-[#1C1410]/60">
                              {formatVND(w.product.price)} · {w.product.sizes[0]}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setOpenSlot(openSlot === s.key ? null : s.key)}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-black/15 py-2 text-xs text-[#1C1410]/70 hover:border-[#6B1A33] hover:text-[#6B1A33]"
                        >
                          <Sparkles className="h-3 w-3" /> Thêm phụ kiện
                        </button>
                      )}
                      <AnimatePresence>
                        {openSlot === s.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              {pickFor(s.key, product.id).map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => wear(s.key, p)}
                                  className="overflow-hidden rounded-xl border border-black/5 bg-[#FAF6F1] text-left transition hover:border-[#6B1A33]"
                                >
                                  <img src={p.image} className="h-20 w-full object-cover" />
                                  <div className="p-1.5">
                                    <div className="truncate text-[10px]">{p.name}</div>
                                    <div className="font-mono text-[9px] text-[#6B1A33]">
                                      {formatVND(p.price)}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-black/5 bg-white px-6 py-4">
              <div className="mb-2 flex items-center justify-between text-xs text-[#1C1410]/60">
                <span>{Object.values(worn).filter(Boolean).length} món</span>
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
                  <ShoppingCart className="h-4 w-4" /> Thuê ngay bộ này
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
