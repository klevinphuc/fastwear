// Catalog data for tab content. Uses Unsplash photos.
const u = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type CatalogItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  deposit?: number;
  image: string;
  sizes?: string[];
  cat: string; // sub-category id
  oldPrice?: number;
};

export const womenItems: CatalogItem[] = [
  // cong-so
  { id: "w-cs-1", name: "Blazer Camel Tailored", brand: "MASSIMO DUTTI", price: 280000, deposit: 1200000, image: u("photo-1591047139829-d91aecb6caea"), sizes: ["S","M","L"], cat: "cong-so" },
  { id: "w-cs-2", name: "Set Áo Sơ Mi & Quần", brand: "URBAN REVIVO", price: 320000, deposit: 1300000, image: u("photo-1551803091-e20673f15770"), sizes: ["S","M"], cat: "cong-so" },
  { id: "w-cs-3", name: "Váy Midi Công Sở", brand: "NEM", price: 240000, deposit: 1000000, image: u("photo-1572804013427-4d7ca7268217"), sizes: ["XS","S","M","L"], cat: "cong-so" },
  { id: "w-cs-4", name: "Áo Sơ Mi Lụa Trắng", brand: "REFORMATION", price: 180000, deposit: 700000, image: u("photo-1554568218-0f1715e72254"), sizes: ["S","M","L"], cat: "cong-so" },
  // moi-ngay
  { id: "w-md-1", name: "Áo Thun Oversize", brand: "LOCAL BRAND", price: 90000, deposit: 350000, image: u("photo-1503342217505-b0a15ec3261c"), sizes: ["S","M","L"], cat: "moi-ngay" },
  { id: "w-md-2", name: "Quần Jeans Wide Leg", brand: "PEDRO", price: 180000, deposit: 700000, image: u("photo-1541099649105-f69ad21f3246"), sizes: ["S","M","L"], cat: "moi-ngay" },
  { id: "w-md-3", name: "Váy Thun Mini", brand: "URBAN REVIVO", price: 150000, deposit: 600000, image: u("photo-1515886657613-9f3515b0c78f"), sizes: ["XS","S","M"], cat: "moi-ngay" },
  { id: "w-md-4", name: "Co-ord Set Casual", brand: "MISCHA", price: 220000, deposit: 900000, image: u("photo-1469334031218-e382a71b716b"), sizes: ["S","M"], cat: "moi-ngay" },
  // du-lich
  { id: "w-dl-1", name: "Đầm Maxi Bohemian", brand: "REFORMATION", price: 290000, deposit: 1200000, image: u("photo-1483985988355-763728e1935b"), sizes: ["XS","S","M"], cat: "du-lich" },
  { id: "w-dl-2", name: "Set Đi Biển Ren", brand: "MISCHA", price: 260000, deposit: 1100000, image: u("photo-1502716119720-b23a93e5fe1b"), sizes: ["S","M"], cat: "du-lich" },
  { id: "w-dl-3", name: "Áo Croptop Linen", brand: "NEM", price: 110000, deposit: 450000, image: u("photo-1485518882345-15568b007407"), sizes: ["S","M","L"], cat: "du-lich" },
  { id: "w-dl-4", name: "Quần Linen Rộng", brand: "URBAN REVIVO", price: 160000, deposit: 650000, image: u("photo-1496747611176-843222e1e57c"), sizes: ["S","M","L"], cat: "du-lich" },
  // du-tiec
  { id: "w-dt-1", name: "Đầm Dạ Hội Sequin", brand: "SIMKHAI", price: 580000, deposit: 2400000, image: u("photo-1566174053879-31528523f8ae"), sizes: ["XS","S","M"], cat: "du-tiec" },
  { id: "w-dt-2", name: "Đầm Cocktail Đỏ", brand: "VERONICA BEARD", price: 460000, deposit: 1900000, image: u("photo-1572804013309-59a88b7e92f1"), sizes: ["S","M","L"], cat: "du-tiec" },
  { id: "w-dt-3", name: "Jumpsuit Sequin", brand: "MISCHA", price: 520000, deposit: 2100000, image: u("photo-1490481651871-ab68de25d43d"), sizes: ["XS","S","M"], cat: "du-tiec" },
  // cuoi-hoi
  { id: "w-ch-1", name: "Đầm Dự Tiệc Cưới", brand: "SIMKHAI", price: 620000, deposit: 2500000, image: u("photo-1469334031218-e382a71b716b"), sizes: ["S","M","L"], cat: "cuoi-hoi" },
  { id: "w-ch-2", name: "Áo Dài Cẩm Tú", brand: "NEM", price: 420000, deposit: 1800000, image: u("photo-1583391733956-3750e0ff4e8b"), sizes: ["S","M","L"], cat: "cuoi-hoi" },
  { id: "w-ch-3", name: "Suit Nữ Lịch Sự", brand: "PEDRO", price: 480000, deposit: 2000000, image: u("photo-1594938298603-c8148c4dae35"), sizes: ["S","M"], cat: "cuoi-hoi" },
];

export const menItems: CatalogItem[] = [
  // cong-so
  { id: "m-cs-1", name: "Suit 2 Mảnh Navy", brand: "PEDRO", price: 520000, deposit: 2200000, image: u("photo-1593030761757-71fae45fa0e7"), sizes: ["M","L","XL"], cat: "cong-so" },
  { id: "m-cs-2", name: "Áo Sơ Mi Trắng Slim", brand: "URBAN REVIVO", price: 140000, deposit: 500000, image: u("photo-1602810318383-e386cc2a3ccf"), sizes: ["M","L","XL"], cat: "cong-so" },
  { id: "m-cs-3", name: "Quần Tây Slim", brand: "PEDRO", price: 180000, deposit: 700000, image: u("photo-1473966968600-fa801b6f7f7f"), sizes: ["M","L","XL"], cat: "cong-so" },
  { id: "m-cs-4", name: "Blazer Đơn Charcoal", brand: "MASSIMO DUTTI", price: 320000, deposit: 1300000, image: u("photo-1507679799987-c73779587ccf"), sizes: ["M","L"], cat: "cong-so" },
  // moi-ngay
  { id: "m-md-1", name: "Áo Polo Cotton", brand: "LOCAL BRAND", price: 100000, deposit: 400000, image: u("photo-1583743814966-8936f5b7be1a"), sizes: ["M","L","XL"], cat: "moi-ngay" },
  { id: "m-md-2", name: "Quần Chino Khaki", brand: "YODY", price: 150000, deposit: 600000, image: u("photo-1473966968600-fa801b6f7f7f"), sizes: ["M","L","XL"], cat: "moi-ngay" },
  { id: "m-md-3", name: "Áo Thun Basic", brand: "URBAN REVIVO", price: 70000, deposit: 250000, image: u("photo-1521572163474-6864f9cf17ab"), sizes: ["M","L","XL"], cat: "moi-ngay" },
  { id: "m-md-4", name: "Quần Jogger", brand: "LOCAL BRAND", price: 130000, deposit: 500000, image: u("photo-1542272604-787c3835535d"), sizes: ["M","L"], cat: "moi-ngay" },
  // du-lich
  { id: "m-dl-1", name: "Áo Linen Trắng", brand: "REFORMATION", price: 180000, deposit: 700000, image: u("photo-1602810318383-e386cc2a3ccf"), sizes: ["M","L","XL"], cat: "du-lich" },
  { id: "m-dl-2", name: "Short Kaki Be", brand: "PEDRO", price: 120000, deposit: 480000, image: u("photo-1591195853828-11db59a44f6b"), sizes: ["M","L","XL"], cat: "du-lich" },
  { id: "m-dl-3", name: "Set Resort Hè", brand: "URBAN REVIVO", price: 280000, deposit: 1100000, image: u("photo-1487222477894-8943e31ef7b2"), sizes: ["M","L"], cat: "du-lich" },
  { id: "m-dl-4", name: "Áo Bomber Nhẹ", brand: "MISCHA", price: 240000, deposit: 1000000, image: u("photo-1551028719-00167b16eac5"), sizes: ["M","L"], cat: "du-lich" },
  // su-kien
  { id: "m-sk-1", name: "Tuxedo Đen Cổ Điển", brand: "PEDRO", price: 680000, deposit: 2800000, image: u("photo-1594938298603-c8148c4dae35"), sizes: ["M","L","XL"], cat: "su-kien" },
  { id: "m-sk-2", name: "Suit Cao Cấp Bordeaux", brand: "MASSIMO DUTTI", price: 720000, deposit: 3000000, image: u("photo-1593030761757-71fae45fa0e7"), sizes: ["M","L"], cat: "su-kien" },
  { id: "m-sk-3", name: "Vest Lịch Lãm Charcoal", brand: "PEDRO", price: 480000, deposit: 2000000, image: u("photo-1507679799987-c73779587ccf"), sizes: ["M","L","XL"], cat: "su-kien" },
  // the-thao
  { id: "m-tt-1", name: "Set Gym Performance", brand: "LOCAL BRAND", price: 160000, deposit: 600000, image: u("photo-1571019613454-1cb2f99b2d8b"), sizes: ["M","L","XL"], cat: "the-thao" },
  { id: "m-tt-2", name: "Áo Jersey Bóng Đá", brand: "URBAN REVIVO", price: 140000, deposit: 500000, image: u("photo-1517466787929-bc90951d0974"), sizes: ["M","L","XL"], cat: "the-thao" },
  { id: "m-tt-3", name: "Quần Track Sọc", brand: "YODY", price: 130000, deposit: 480000, image: u("photo-1539185441755-769473a23570"), sizes: ["M","L"], cat: "the-thao" },
];

export const womenAccessories: CatalogItem[] = [
  { id: "wa-1", name: "Túi Tote Da Nâu", brand: "MISCHA", price: 180000, deposit: 800000, image: u("photo-1584917865442-de89df76afd3"), cat: "tui" },
  { id: "wa-2", name: "Clutch Sequin", brand: "PEDRO", price: 150000, deposit: 700000, image: u("photo-1566150905458-1bf1fc113f0d"), cat: "tui" },
  { id: "wa-3", name: "Shoulder Bag Mini", brand: "URBAN REVIVO", price: 220000, deposit: 900000, image: u("photo-1548036328-c9fa89d128fa"), cat: "tui" },
  { id: "wa-4", name: "Mini Bag Da Vintage", brand: "MISCHA", price: 200000, deposit: 850000, image: u("photo-1601924994987-69e26d50dc26"), cat: "tui" },
  { id: "wa-5", name: "Dây Chuyền Pearl", brand: "VERONICA BEARD", price: 90000, deposit: 600000, image: u("photo-1611591437281-460bfbe1220a"), cat: "trang-suc" },
  { id: "wa-6", name: "Bông Tai Crystal", brand: "MISCHA", price: 70000, deposit: 400000, image: u("photo-1535632066927-ab7c9ab60908"), cat: "trang-suc" },
  { id: "wa-7", name: "Vòng Tay Vàng", brand: "PEDRO", price: 80000, deposit: 500000, image: u("photo-1599643477877-530eb83abc8e"), cat: "trang-suc" },
  { id: "wa-8", name: "Nhẫn Bạc Tinh Xảo", brand: "LOCAL BRAND", price: 60000, deposit: 350000, image: u("photo-1573408301185-9146fe634ad0"), cat: "trang-suc" },
  { id: "wa-9", name: "Cao Gót Đỏ Stiletto", brand: "MISCHA", price: 200000, deposit: 900000, image: u("photo-1543163521-1bf539c55dd2"), cat: "giay" },
  { id: "wa-10", name: "Sandal Quai Mảnh", brand: "REFORMATION", price: 160000, deposit: 700000, image: u("photo-1603487742131-4160ec999306"), cat: "giay" },
  { id: "wa-11", name: "Boot Da Cao Cổ", brand: "PEDRO", price: 280000, deposit: 1200000, image: u("photo-1542838132-92c53300491e"), cat: "giay" },
  { id: "wa-12", name: "Sneaker Trắng Nữ", brand: "URBAN REVIVO", price: 180000, deposit: 800000, image: u("photo-1595950653106-6c9ebd614d3a"), cat: "giay" },
  { id: "wa-13", name: "Kính Mắt Cat-Eye", brand: "MISCHA", price: 90000, deposit: 600000, image: u("photo-1572635196237-14b3f281503f"), cat: "khac" },
  { id: "wa-14", name: "Mũ Phớt Wool", brand: "REFORMATION", price: 120000, deposit: 500000, image: u("photo-1521369909029-2afed882baee"), cat: "khac" },
  { id: "wa-15", name: "Khăn Lụa Hoa", brand: "NEM", price: 80000, deposit: 350000, image: u("photo-1601925260368-ae2f83cf8b7f"), cat: "khac" },
  { id: "wa-16", name: "Thắt Lưng Da Nữ", brand: "URBAN REVIVO", price: 70000, deposit: 300000, image: u("photo-1624222247344-550fb60583dc"), cat: "khac" },
];

export const menAccessories: CatalogItem[] = [
  { id: "ma-1", name: "Briefcase Da Bê", brand: "PEDRO", price: 280000, deposit: 1200000, image: u("photo-1547949003-9792a18a2601"), cat: "tui" },
  { id: "ma-2", name: "Backpack Canvas", brand: "URBAN REVIVO", price: 220000, deposit: 900000, image: u("photo-1553062407-98eeb64c6a62"), cat: "tui" },
  { id: "ma-3", name: "Tote Canvas Đen", brand: "LOCAL BRAND", price: 140000, deposit: 600000, image: u("photo-1622560480605-d83c853bc5c3"), cat: "tui" },
  { id: "ma-4", name: "Đồng Hồ Classic Silver", brand: "URBAN REVIVO", price: 180000, deposit: 1500000, image: u("photo-1524805444758-089113d48a6d"), cat: "dong-ho" },
  { id: "ma-5", name: "Đồng Hồ Gold Luxury", brand: "PEDRO", price: 320000, deposit: 2500000, image: u("photo-1523275335684-37898b6baf30"), cat: "dong-ho" },
  { id: "ma-6", name: "Đồng Hồ Sport Black", brand: "URBAN REVIVO", price: 150000, deposit: 1000000, image: u("photo-1542496658-e33a6d0d50f6"), cat: "dong-ho" },
  { id: "ma-7", name: "Giày Oxford Đen", brand: "PEDRO", price: 280000, deposit: 1200000, image: u("photo-1614252369475-531eba835eb1"), cat: "giay" },
  { id: "ma-8", name: "Giày Derby Nâu", brand: "MASSIMO DUTTI", price: 260000, deposit: 1100000, image: u("photo-1531310197839-ccf54634509e"), cat: "giay" },
  { id: "ma-9", name: "Loafer Da Nâu", brand: "PEDRO", price: 240000, deposit: 1000000, image: u("photo-1582897085656-c636d006a246"), cat: "giay" },
  { id: "ma-10", name: "Sneaker Nam Trắng", brand: "URBAN REVIVO", price: 200000, deposit: 800000, image: u("photo-1542291026-7eec264c27ff"), cat: "giay" },
  { id: "ma-11", name: "Cà Vạt Lụa Bordeaux", brand: "PEDRO", price: 70000, deposit: 300000, image: u("photo-1589363460779-cd717ee7c4a3"), cat: "khac" },
  { id: "ma-12", name: "Thắt Lưng Da Đen", brand: "MASSIMO DUTTI", price: 90000, deposit: 400000, image: u("photo-1624222247344-550fb60583dc"), cat: "khac" },
  { id: "ma-13", name: "Kính Mắt Aviator", brand: "URBAN REVIVO", price: 110000, deposit: 700000, image: u("photo-1577803645773-f96470509666"), cat: "khac" },
  { id: "ma-14", name: "Mũ Fedora Wool", brand: "REFORMATION", price: 140000, deposit: 600000, image: u("photo-1521369909029-2afed882baee"), cat: "khac" },
];

export const lookbooks = [
  {
    id: 1,
    title: "LUMIÈRE D'ÉTÉ",
    subtitle: "Bộ sưu tập Hè 2025",
    theme: "Ánh sáng mùa hè — tông trắng kem, vàng cát, xanh biển nhạt",
    coverImage: u("photo-1469334031218-e382a71b716b", 1400),
    items: 8,
  },
  {
    id: 2,
    title: "NUIT DORÉE",
    subtitle: "Bộ sưu tập Dạ Tiệc",
    theme: "Đêm vàng son — đen, gold, đỏ bordeaux",
    coverImage: u("photo-1515886657613-9f3515b0c78f", 1400),
    items: 6,
  },
  {
    id: 3,
    title: "FEMME MODERNE",
    subtitle: "Phụ nữ hiện đại",
    theme: "Power dressing — beige, trắng, camel, navy",
    coverImage: u("photo-1594938298603-b8968c674aa9", 1400),
    items: 10,
  },
  {
    id: 4,
    title: "ESCAPADE",
    subtitle: "Du lịch & Khám phá",
    theme: "Boho chic — đất nung, rêu, trắng kem",
    coverImage: u("photo-1483985988355-763728e1935b", 1400),
    items: 9,
  },
];

export const fmtVND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";
