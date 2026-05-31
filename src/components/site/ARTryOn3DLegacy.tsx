import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import gsap from "gsap";
import { X, Camera, ChevronDown, Sparkles, ThumbsUp, RotateCw, Plus, Minus } from "lucide-react";
import { products, formatVND, type Product } from "@/lib/products";
import { toast } from "sonner";

THREE.ColorManagement.enabled = true;

type Gender = "female" | "male";
type SlotKey = "main" | "bag" | "jewelry" | "shoes" | "other";
type WornItem = { product: Product; color: string };

const SLOT_META: {
  key: SlotKey;
  label: string;
  icon: string;
  categoryFilter: (p: Product) => boolean;
}[] = [
  {
    key: "main",
    label: "Trang phục chính",
    icon: "01",
    categoryFilter: (p) => /Đầm|Áo|Suit|Sơ|Quần|Blazer/i.test(p.category),
  },
  {
    key: "bag",
    label: "Túi xách",
    icon: "02",
    categoryFilter: (p) => /Phụ kiện|Túi/i.test(p.name.toLowerCase() + p.category.toLowerCase()),
  },
  {
    key: "jewelry",
    label: "Trang sức",
    icon: "03",
    categoryFilter: (p) => /Phụ kiện/i.test(p.category),
  },
  { key: "shoes", label: "Giày dép", icon: "04", categoryFilter: (p) => /Giày/i.test(p.category) },
  {
    key: "other",
    label: "Khác (áo khoác, mũ,...)",
    icon: "05",
    categoryFilter: (p) => /Blazer|Áo/i.test(p.category),
  },
];

function pickFor(slot: SlotKey, exclude?: string): Product[] {
  const meta = SLOT_META.find((s) => s.key === slot)!;
  let list = products.filter((p) => meta.categoryFilter(p) && p.id !== exclude);
  if (list.length < 3) list = products.filter((p) => p.id !== exclude);
  return list.slice(0, 6);
}

const AVATAR_MODELS: Record<Gender, { label: string; src: string; height: number }> = {
  female: {
    label: "Nữ",
    src: "/models/woman-3d-model.glb",
    height: 1.72,
  },
  male: {
    label: "Nam",
    src: "/models/male-3d-model.glb",
    height: 1.82,
  },
};

/* ---------------- Local GLB Avatar ---------------- */

function FallbackAvatar({ color = "#6B1A33" }: { color?: string }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#f3c7b8" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.7, 8, 24]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[-0.16, 0.48, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1C1410" roughness={0.6} />
      </mesh>
      <mesh position={[0.16, 0.48, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1C1410" roughness={0.6} />
      </mesh>
    </group>
  );
}

function normalizeAvatar(object: THREE.Group, targetHeight: number) {
  object.updateMatrixWorld(true);
  const originalBox = new THREE.Box3().setFromObject(object);
  const originalSize = originalBox.getSize(new THREE.Vector3());
  const scale = originalSize.y > 0 ? targetHeight / originalSize.y : 1;
  object.scale.setScalar(scale);

  object.updateMatrixWorld(true);
  const fittedBox = new THREE.Box3().setFromObject(object);
  const center = fittedBox.getCenter(new THREE.Vector3());
  object.position.set(-center.x, -fittedBox.min.y, -center.z);
}

function prepareAvatarMaterial(material: THREE.Material) {
  const prepared = material.clone();
  const maybeTextured = prepared as THREE.Material & {
    color?: THREE.Color;
    emissiveMap?: THREE.Texture | null;
    envMapIntensity?: number;
    map?: THREE.Texture | null;
  };

  if (maybeTextured.map) {
    maybeTextured.map.colorSpace = THREE.SRGBColorSpace;
    maybeTextured.map.needsUpdate = true;
  }
  if (maybeTextured.emissiveMap) {
    maybeTextured.emissiveMap.colorSpace = THREE.SRGBColorSpace;
    maybeTextured.emissiveMap.needsUpdate = true;
  }
  if ("envMapIntensity" in maybeTextured) {
    maybeTextured.envMapIntensity = 0.9;
  }

  prepared.side = THREE.FrontSide;
  prepared.needsUpdate = true;
  return prepared;
}

function AvatarModel({
  gender,
  worn,
  onLoad,
}: {
  gender: Gender;
  worn: Partial<Record<SlotKey, WornItem>>;
  onLoad?: () => void;
}) {
  const model = AVATAR_MODELS[gender];
  const gltf = useGLTF(model.src);
  const avatar = useMemo(() => {
    const scene = clone(gltf.scene) as THREE.Group;

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((material) => prepareAvatarMaterial(material))
        : prepareAvatarMaterial(mesh.material);
    });

    normalizeAvatar(scene, model.height);
    return scene;
  }, [gltf.scene, model.height]);

  useEffect(() => {
    onLoad?.();
  }, [avatar, onLoad]);

  // Apply clothing colors heuristically by mesh name
  useEffect(() => {
    if (!avatar) return;
    const colors: Record<string, string | undefined> = {
      tops: worn.main?.color ?? worn.other?.color,
      bottoms: worn.main?.color,
      shoes: worn.shoes?.color,
    };
    avatar.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (!m.isMesh) return;
      const name = (m.name || "").toLowerCase();
      const matchKey = Object.keys(colors).find((k) => name.includes(k));
      if (!matchKey || !colors[matchKey]) return;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat: any) => {
        if (mat && "color" in mat && mat.color?.set) {
          mat.color.set(colors[matchKey]!);
          mat.needsUpdate = true;
        }
      });
    });
  }, [avatar, worn]);

  return (
    <group position={[0, 0, 0]}>
      <primitive object={avatar} />
    </group>
  );
}

useGLTF.preload(AVATAR_MODELS.female.src);
useGLTF.preload(AVATAR_MODELS.male.src);

function AvatarLoadFallback({ color = "#6B1A33" }: { color?: string }) {
  return (
    <mesh position={[0, 0.9, 0]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

type ErrorBoundaryInnerProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError?: () => void;
  resetKey: string;
};

type ErrorBoundaryInnerState = {
  hasError: boolean;
};

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, ErrorBoundaryInnerState> {
  state: ErrorBoundaryInnerState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  componentDidUpdate(previousProps: ErrorBoundaryInnerProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ---------------- Camera Rig ---------------- */

type Preset = { x: number; y: number; z: number; tx: number; ty: number; tz: number };
const PRESETS: Record<string, Preset> = {
  full: { x: 0, y: 1.0, z: 3.2, tx: 0, ty: 0.9, tz: 0 },
  upper: { x: 0, y: 1.4, z: 1.9, tx: 0, ty: 1.3, tz: 0 },
  face: { x: 0, y: 1.55, z: 1.1, tx: 0, ty: 1.5, tz: 0 },
  detail: { x: 0.4, y: 0.6, z: 1.4, tx: 0, ty: 0.5, tz: 0 },
};

function CameraRig({
  preset,
  controlsRef,
}: {
  preset: Preset;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  useEffect(() => {
    gsap.to(camera.position, {
      x: preset.x,
      y: preset.y,
      z: preset.z,
      duration: 0.8,
      ease: "power2.inOut",
    });
    if (controlsRef.current?.target) {
      gsap.to(controlsRef.current.target, {
        x: preset.tx,
        y: preset.ty,
        z: preset.tz,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => controlsRef.current?.update?.(),
      });
    }
  }, [preset, camera, controlsRef]);
  return null;
}

/* ---------------- Modal ---------------- */

export function ARTryOn3DLegacy({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
}) {
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
  const [autoRotate, setAutoRotate] = useState(true);
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("full");
  const [showHint, setShowHint] = useState(true);
  const [modelLoadFailed, setModelLoadFailed] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const handleModelLoaded = useCallback(() => setModelLoadFailed(false), []);
  const handleModelLoadError = useCallback(() => setModelLoadFailed(true), []);

  useEffect(() => {
    if (!open) return;
    setShowHint(true);
    setModelLoadFailed(false);
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setModelLoadFailed(false);
  }, [gender]);

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
    const canvas = canvasWrapRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "FASTWear_outfit.png";
    a.click();
    toast.success("Đã lưu ảnh outfit");
  };

  const handleFinish = () => {
    const items = Object.values(worn).filter(Boolean) as WornItem[];
    toast.success(`Đã lưu phối đồ ${items.length} món`, {
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
    () =>
      (Object.values(worn).filter(Boolean) as WornItem[]).reduce((s, x) => s + x.product.price, 0),
    [worn],
  );

  const handleZoom = (delta: number) => {
    const c = controlsRef.current;
    if (!c) return;
    const cam = c.object as THREE.PerspectiveCamera;
    const dir = new THREE.Vector3().subVectors(cam.position, c.target).normalize();
    const next = cam.position.clone().add(dir.multiplyScalar(delta));
    gsap.to(cam.position, { x: next.x, y: next.y, z: next.z, duration: 0.4, ease: "power2.out" });
  };

  if (!open) return null;

  const presetButtons: { key: keyof typeof PRESETS; label: string }[] = [
    { key: "full", label: "Toàn thân" },
    { key: "upper", label: "Thân trên" },
    { key: "face", label: "Khuôn mặt" },
    { key: "detail", label: "Chi tiết" },
  ];

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
          <div
            ref={canvasWrapRef}
            className="relative h-[55vh] w-full md:h-full md:w-[60%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(255,240,245,0.18), rgba(20,15,18,0.95) 65%)",
            }}
          >
            <div className="pointer-events-none absolute left-5 top-5 z-10 font-serif text-2xl text-white/90">
              FASTWear
            </div>
            <div className="absolute left-5 top-14 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
              <span>TP. HỒ CHÍ MINH · STUDIO 3D</span>
            </div>

            <button
              onClick={() => setAutoRotate((v) => !v)}
              className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur hover:bg-white/20"
            >
              <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`} />
              {autoRotate ? "Đang xoay" : "Xoay tự động"}
            </button>
            <button
              onClick={onClose}
              className="absolute right-5 top-16 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:hidden"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Zoom buttons */}
            <div className="absolute bottom-24 right-5 z-10 flex flex-col gap-2">
              <button
                onClick={() => handleZoom(-0.4)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleZoom(0.4)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Instruction toast */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur"
                >
                  Kéo để xoay · Cuộn để zoom
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 z-[5] opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
              }}
            />

            <Canvas
              camera={{ position: [0, 1.0, 3.2], fov: 30 }}
              gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
              shadows
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.25;
                gl.outputColorSpace = THREE.SRGBColorSpace;
              }}
            >
              <ambientLight intensity={1.2} />
              <hemisphereLight intensity={1.5} groundColor="#f4efe7" color="#ffffff" />
              <directionalLight
                position={[4, 6, 5]}
                intensity={2}
                color="#fff5f0"
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight position={[-3, 3, -2]} intensity={0.75} color="#f0f5ff" />
              <directionalLight position={[0, 4, -3]} intensity={0.55} color="#ffffff" />
              <Suspense fallback={<AvatarLoadFallback color={worn.main?.color ?? "#6B1A33"} />}>
                <ErrorBoundaryInner
                  resetKey={gender}
                  fallback={<FallbackAvatar color={worn.main?.color ?? "#6B1A33"} />}
                  onError={handleModelLoadError}
                >
                  <AvatarModel gender={gender} worn={worn} onLoad={handleModelLoaded} />
                </ErrorBoundaryInner>
                <Environment preset="studio" environmentIntensity={0.9} />
              </Suspense>
              {/* Floor shadow gradient */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
                <circleGeometry args={[0.9, 48]} />
                <meshBasicMaterial color="#000" transparent opacity={0.35} />
              </mesh>
              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom
                minDistance={1.0}
                maxDistance={5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate={autoRotate}
                autoRotateSpeed={1.5}
                target={[0, 0.9, 0]}
                onStart={() => setAutoRotate(false)}
              />
              <CameraRig preset={PRESETS[presetKey]} controlsRef={controlsRef} />
            </Canvas>

            {modelLoadFailed && (
              <div className="pointer-events-none absolute left-5 top-24 z-10 max-w-[16rem] rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-xs leading-5 text-white/85 backdrop-blur">
                Không tải được người mẫu 3D từ asset local. FASTWear đang hiển thị mô hình thay thế.
              </div>
            )}

            {/* Camera preset pills */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {presetButtons.map((b) => (
                <button
                  key={b.key}
                  onClick={() => setPresetKey(b.key)}
                  className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur transition"
                  style={{
                    background: presetKey === b.key ? "#fff" : "rgba(255,255,255,0.08)",
                    color: presetKey === b.key ? "#1C1410" : "rgba(255,255,255,0.85)",
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {score != null && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B1A33]">
                    <ThumbsUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      FASTHelp gợi ý
                    </div>
                    <div className="font-serif text-lg">
                      Bộ này hợp nhau <span className="text-[#F2C4CE]">{displayScore}/100</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-[45vh] w-full flex-col bg-[#FAF6F1] text-[#1C1410] md:h-full md:w-[40%]">
            <div className="flex items-start justify-between border-b border-black/5 px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl">Phòng thử đồ ảo</h2>
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
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1C1410]/60">
                  Avatar
                </div>
                <div className="flex gap-2">
                  {(
                    [
                      ["female", "Nữ", "Nữ"],
                      ["male", "Nam", "Nam"],
                    ] as const
                  ).map(([g, ic, l]) => (
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
                  <ChevronDown
                    className={`h-4 w-4 transition ${showMeasures ? "rotate-180" : ""}`}
                  />
                </button>
                {showMeasures && (
                  <div className="grid grid-cols-2 gap-3 border-t border-black/5 px-4 py-4 text-xs">
                    {(
                      [
                        ["Chiều cao (cm)", "height", measurements.height],
                        ["Cân nặng (kg)", "weight", measurements.weight],
                      ] as const
                    ).map(([l, k, v]) => (
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
                    <button className="col-span-2 mt-1 rounded-full bg-primary py-2 text-xs text-primary-foreground">
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
                          <button
                            onClick={() => remove(s.key)}
                            className="text-xs text-[#6B1A33] hover:underline"
                          >
                            Bỏ
                          </button>
                        )}
                      </div>
                      {w ? (
                        <div className="mt-3 flex items-center gap-3">
                          <img
                            src={w.product.image}
                            className="h-14 w-14 rounded-lg object-cover"
                          />
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
                  onClick={handleFinish}
                  className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  <Sparkles className="h-4 w-4" /> Hoàn tất phối đồ
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
