export type Product = {
  id: string;
  name: string;
  designer: string;
  price: number;
  deposit: number;
  category: string;
  gender: "Nữ" | "Nam" | "Unisex";
  occasion: string[];
  sizes: string[];
  colors: string[];
  available: boolean;
  rating: number;
  image: string;
  images?: string[];
};

const img = (q: string, i = 1) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=80&v=${i}`;

export const products: Product[] = [
  {
    id: "1", name: "Đầm Lụa Ánh Trăng", designer: "MISCHA", price: 350000, deposit: 1500000,
    category: "Đầm Dự Tiệc", gender: "Nữ", occasion: ["Tiệc / Sự Kiện", "Cưới"], sizes: ["XS","S","M","L"],
    colors: ["#E8D5C4","#1A1A1A"], available: true, rating: 4.9,
    image: img("photo-1572804013309-59a88b7e92f1"),
    images: [img("photo-1572804013309-59a88b7e92f1"), img("photo-1469334031218-e382a71b716b"), img("photo-1490481651871-ab68de25d43d")],
  },
  {
    id: "2", name: "Suit Lụa Bordeaux", designer: "PEDRO", price: 480000, deposit: 2000000,
    category: "Suit Nam", gender: "Nam", occasion: ["Công Sở", "Tiệc / Sự Kiện"], sizes: ["S","M","L","XL"],
    colors: ["#6B1A33","#1A1A1A"], available: true, rating: 4.8,
    image: img("photo-1594938298603-c8148c4dae35"),
    images: [img("photo-1594938298603-c8148c4dae35"), img("photo-1593030761757-71fae45fa0e7")],
  },
  {
    id: "3", name: "Áo Dài Cẩm Tú", designer: "NEM", price: 420000, deposit: 1800000,
    category: "Áo Dài", gender: "Nữ", occasion: ["Cưới", "Tết"], sizes: ["S","M","L"],
    colors: ["#F2C4CE","#6B1A33"], available: true, rating: 5.0,
    image: img("photo-1583391733956-3750e0ff4e8b"),
  },
  {
    id: "4", name: "Túi Xách Da Vintage", designer: "URBAN REVIVO", price: 180000, deposit: 800000,
    category: "Phụ kiện", gender: "Nữ", occasion: ["Hàng Ngày"], sizes: ["Free"],
    colors: ["#3a2a1a"], available: true, rating: 4.6,
    image: img("photo-1584917865442-de89df76afd3"),
  },
  {
    id: "5", name: "Đầm Maxi Bãi Biển", designer: "Reformation", price: 290000, deposit: 1200000,
    category: "Đi biển", gender: "Nữ", occasion: ["Du Lịch"], sizes: ["XS","S","M"],
    colors: ["#F2C4CE"], available: false, rating: 4.7,
    image: img("photo-1515886657613-9f3515b0c78f"),
  },
  {
    id: "6", name: "Blazer Công Sở Camel", designer: "YODY", price: 250000, deposit: 1000000,
    category: "Công sở", gender: "Nữ", occasion: ["Công Sở"], sizes: ["S","M","L"],
    colors: ["#c9a27a"], available: true, rating: 4.5,
    image: img("photo-1591047139829-d91aecb6caea"),
  },
  {
    id: "7", name: "Đầm Đen Tiệc Tối", designer: "SIMKHAI", price: 520000, deposit: 2200000,
    category: "Đầm Dự Tiệc", gender: "Nữ", occasion: ["Tiệc / Sự Kiện"], sizes: ["XS","S","M","L"],
    colors: ["#1A1A1A"], available: true, rating: 4.9,
    image: img("photo-1566174053879-31528523f8ae"),
  },
  {
    id: "8", name: "Sơ Mi Nam Linen", designer: "LOCAL BRAND", price: 150000, deposit: 600000,
    category: "Áo", gender: "Nam", occasion: ["Hàng Ngày", "Du Lịch"], sizes: ["M","L","XL"],
    colors: ["#ffffff","#cfe3e2"], available: true, rating: 4.4,
    image: img("photo-1602810318383-e386cc2a3ccf"),
  },
  {
    id: "9", name: "Quần Tây Slim", designer: "PEDRO", price: 180000, deposit: 700000,
    category: "Quần", gender: "Nam", occasion: ["Công Sở"], sizes: ["S","M","L","XL"],
    colors: ["#1A1A1A","#3a3a3a"], available: true, rating: 4.5,
    image: img("photo-1473966968600-fa801b6f7f7f"),
  },
  {
    id: "10", name: "Đồng Hồ Da Cổ Điển", designer: "URBAN REVIVO", price: 120000, deposit: 1500000,
    category: "Phụ kiện", gender: "Nam", occasion: ["Công Sở","Hàng Ngày"], sizes: ["Free"],
    colors: ["#3a2a1a"], available: true, rating: 4.8,
    image: img("photo-1524805444758-089113d48a6d"),
  },
  {
    id: "11", name: "Giày Cao Gót Đỏ", designer: "MISCHA", price: 200000, deposit: 900000,
    category: "Giày", gender: "Nữ", occasion: ["Tiệc / Sự Kiện","Prom"], sizes: ["35","36","37","38"],
    colors: ["#6B1A33"], available: true, rating: 4.7,
    image: img("photo-1543163521-1bf539c55dd2"),
  },
  {
    id: "12", name: "Đầm Prom Pastel", designer: "VERONICA BEARD", price: 460000, deposit: 1900000,
    category: "Đầm Dự Tiệc", gender: "Nữ", occasion: ["Prom","Sinh nhật"], sizes: ["XS","S","M"],
    colors: ["#F2C4CE","#e7d4ff"], available: true, rating: 4.9,
    image: img("photo-1469334031218-e382a71b716b"),
  },
];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(n) + "₫";
