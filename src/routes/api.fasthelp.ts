import { createFileRoute } from "@tanstack/react-router";
import {
  menAccessories,
  menItems,
  womenAccessories,
  womenItems,
  type CatalogItem,
} from "@/lib/catalog";
import { products } from "@/lib/products";

type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type FastHelpRequestBody = {
  message?: unknown;
  history?: unknown;
};

type FastHelpJsonResponse = {
  reply: string;
};

type GeminiGenerateContentPayload = {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

type FastHelpCatalogProduct = {
  name: string;
  brand: string;
  gender: string;
  category: string;
  price: number;
  deposit?: number;
  sizes: string[];
  occasion: string[];
  available: boolean;
};

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

const SYSTEM_PROMPT = `Bạn là FASTHelp, trợ lý tư vấn thuê trang phục cao cấp của FASTWear.

Nguyên tắc bắt buộc:
- Luôn trả lời bằng tiếng Việt.
- Giữ giọng premium, rõ ràng, ngắn gọn, hữu ích; tránh nói quá thân mật, slang Gen Z, emoji spam hoặc giọng marketplace đại trà.
- Chỉ trả lời dựa trên PRODUCT_CATALOG và FASTWEAR_SERVICE_CONTEXT được cung cấp.
- Không tự bịa tên sản phẩm, giá, size, màu, tiền cọc, tình trạng còn hàng, quy định showroom, giao nhận, đổi trả hoặc phương thức thanh toán.
- Nếu dữ liệu chưa đủ chắc chắn, nói rõ FASTHelp chưa có đủ thông tin xác nhận và gợi ý khách kiểm tra chính sách trên website hoặc liên hệ nhân viên/showroom FASTWear.

Hội thoại nhiều lượt:
- Luôn đọc Conversation history trước khi trả lời Latest user message.
- Hiểu các tham chiếu như "mẫu đó", "cái thứ 2", "option đầu", "rẻ hơn", "có size M không?", "vậy tổng bao nhiêu?" dựa trên câu trả lời gần nhất của FASTHelp.
- Nếu khách chỉ trả lời "có", "ok", "được" hoặc "tiếp", hãy tiếp tục đúng câu hỏi/đề nghị gần nhất của FASTHelp. Ví dụ: nếu FASTHelp vừa hỏi khách có muốn tìm phụ kiện đi kèm không, hãy gợi ý phụ kiện phù hợp với outfit đã đề xuất.
- Khi khách thu hẹp yêu cầu, đổi ngân sách, đổi dịp hoặc hỏi so sánh, tiếp tục từ bối cảnh trước thay vì tư vấn lại từ đầu.
- Nếu tham chiếu chưa rõ, chỉ hỏi 1 câu làm rõ ngắn gọn, ví dụ: "Bạn muốn mình kiểm tra mẫu số mấy trong danh sách vừa rồi?"
- Không hỏi lại thông tin khách đã cung cấp trong lịch sử gần đây.
- Không mở lại lời chào hoặc bắt đầu lại cuộc trò chuyện khi đang ở giữa một mạch tư vấn.
- Giữ câu trả lời hoàn chỉnh và súc tích; nếu cần rút gọn, giảm số gợi ý/lý do thay vì bỏ dở câu hoặc markdown.

Khi tư vấn sản phẩm/outfit:
- Chỉ đề xuất sản phẩm thật trong PRODUCT_CATALOG, dùng đúng tên sản phẩm từ catalog.
- Gợi ý 2-4 sản phẩm, trừ khi khách yêu cầu nhiều hơn.
- Ưu tiên đúng dịp, giới tính/phong cách, size, ngân sách và ngày thuê nếu khách đã nêu.
- Nếu thiếu thông tin quan trọng, hỏi tối đa 1-2 câu ngắn về dịp, phong cách/giới tính, size, ngân sách hoặc ngày thuê.
- Khi đã đủ thông tin để gợi ý, trả lời bằng danh sách, không gộp thành một đoạn dài.
- Mỗi sản phẩm nên có:
  1. Tên sản phẩm
  - Giá thuê:
  - Cọc:
  - Size:
  - Phù hợp vì:
- Tiền cọc là khoản riêng với phí thuê. Không nói cọc là phí thuê.
- Nếu khách nêu budget và số ngày thuê, có thể tính ước tính theo công thức trong FASTWEAR_SERVICE_CONTEXT khi đủ dữ liệu.

Khi trả lời về chính sách/dịch vụ:
- Dùng FASTWEAR_SERVICE_CONTEXT. Không tự thêm chính sách ngoài đó.
- Nếu khách hỏi về quy định đang có xung đột nguồn, trả lời an toàn: "FASTHelp đang thấy thông tin này cần được xác nhận lại theo chính sách hiển thị trên website hoặc nhân viên showroom", rồi hướng dẫn khách kiểm tra giỏ/checkout hoặc liên hệ FASTWear.
- AR Try-On chỉ là công cụ xem trước phong cách/phối đồ, không đảm bảo size vừa tuyệt đối. Khi khách băn khoăn fit/size, khuyến khích thử tại showroom hoặc hỏi nhân viên.
- Với giao nhận, thanh toán, đổi trả, mất/hỏng, trễ hạn: chỉ nêu đúng dữ liệu được cung cấp.

Nếu không có sản phẩm phù hợp, nói thật rằng catalog hiện chưa có lựa chọn chính xác và gợi ý nhân viên FASTWear hỗ trợ thêm.`;

const FALLBACK_REPLY =
  "FASTHelp xin lỗi, hiện mình chưa kết nối được AI. Bạn có thể thử lại sau ít phút hoặc liên hệ nhân viên FASTWear để được tư vấn chính xác hơn.";

const FASTWEAR_SERVICE_CONTEXT = `FASTWEAR_SERVICE_CONTEXT đã xác nhận từ mã nguồn hiện tại:
- Chính sách thuê hiển thị trên trang /policy: tối thiểu 4 ngày, tối đa 30 ngày; có thể gia hạn online trong app.
- Có xung đột với tài liệu thiết kế cũ từng ghi thời gian thuê tối thiểu 2 ngày, tối đa 7 ngày. Nếu khách hỏi quy định ngày thuê chung, hãy nói cần xác nhận lại theo chính sách đang hiển thị trên website hoặc nhân viên showroom. Khi khách yêu cầu tính chi phí cho một số ngày cụ thể, chỉ tính như ước tính theo số ngày khách đưa ra.
- Tiền cọc: catalog và giỏ hàng dùng số tiền cọc cụ thể của từng sản phẩm. Cọc là khoản riêng với phí thuê và được cộng vào tổng thanh toán.
- Trang /policy mô tả cọc bằng 80% giá trị sản phẩm và hoàn lại sau khi sản phẩm về kho 1-2 ngày; hoàn qua MoMo/chuyển khoản trong 1-2 ngày làm việc. Nếu khách hỏi cách tính cọc chung, nói theo chính sách hiển thị và khuyên xác nhận lại với nhân viên nếu cần.
- Công thức giỏ hàng đang triển khai: rentalSubtotal = giá thuê/ngày x số ngày thuê x số lượng; depositRequired = tiền cọc sản phẩm x số lượng; shippingFee mặc định trong giỏ = 30.000đ; totalPayable = rentalSubtotal + depositRequired + shippingFee.
- Checkout: nếu khách chọn nhận tại cửa hàng/pickup thì phí giao trong checkout = 0đ; nếu giao tận nơi thì dùng phí giao từ giỏ hàng.
- Giao nhận trong checkout: "Giao tận nơi" 30.000đ, 1-2 ngày tại TP.HCM/Hà Nội, 3-5 ngày tại tỉnh thành khác. "Đến cửa hàng lấy" miễn phí tại Sài Gòn/Hà Nội.
- Trả hàng trong checkout: có lựa chọn bưu điện đến lấy (Free pickup) hoặc mang đến cửa hàng (tặng 5K FASTCoin).
- Thanh toán trong checkout: MoMo, ZaloPay, chuyển khoản, COD.
- Chính sách trễ hạn trên /policy: 20% giá thuê/ngày trễ; sau 7 ngày, tiền cọc sẽ được dùng để bù đắp.
- Chính sách mất/hỏng trên /policy: hư hỏng nhẹ miễn phí; hư hỏng nặng hoặc mất: 100% giá trị sản phẩm trừ vào cọc.
- Đổi/trả trên /policy: trong 24h đầu nếu sản phẩm không đúng mô tả, đổi ngay hoặc hoàn tiền 100%.
- Showroom: website có thông điệp thử thật khi cần, kiểm tra phom/độ dài/phụ kiện trước ngày mặc; chưa có địa chỉ showroom cụ thể trong context này.
- AR Try-On: có trải nghiệm thử đồ/QR trên điện thoại và demo 3D trên trang chi tiết; dùng để xem trước phong cách/phối đồ, không đảm bảo size vừa tuyệt đối.
- Không có dữ liệu đã xác nhận về ưu đãi, giờ mở cửa showroom, số hotline cụ thể trong context API này.`;

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_FALLBACK_MODEL = "gemini-2.5-flash";
const MAX_OUTPUT_TOKENS = 1536;
const RETRYABLE_GEMINI_STATUSES = new Set([429, 503, 504]);
const TRUNCATED_REPLY =
  "FASTHelp chưa thể trả lời trọn vẹn câu này trong một lượt. Bạn chọn mẫu cụ thể hoặc gửi lại yêu cầu ngắn hơn để mình hỗ trợ chính xác hơn nhé.";
const GEMINI_OVERLOAD_REPLY =
  "FASTHelp đang hơi quá tải trong giây lát. Bạn thử gửi lại câu hỏi giúp mình nhé.";
const GEMINI_OVERLOAD_RETRY_DELAY_MS = 800;

function jsonResponse(payload: FastHelpJsonResponse, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  });
}

function formatVND(value: number) {
  return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
}

function formatOptionalVND(value?: number) {
  return typeof value === "number" ? formatVND(value) : "chưa có dữ liệu";
}

function getServerEnv(name: string) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizeHistory(value: unknown): ChatHistoryMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is ChatHistoryMessage => {
      if (!item || typeof item !== "object") return false;
      const entry = item as Record<string, unknown>;
      return (
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string" &&
        entry.content.trim().length > 0
      );
    })
    .slice(-16)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 900),
    }));
}

function occasionFromCatalogCategory(cat: string) {
  const map: Record<string, string[]> = {
    "cong-so": ["Công sở", "sự kiện trang trọng"],
    "moi-ngay": ["hằng ngày"],
    "du-lich": ["du lịch"],
    "du-tiec": ["dự tiệc", "sự kiện"],
    "cuoi-hoi": ["cưới hỏi", "sự kiện"],
    "su-kien": ["sự kiện", "khánh thành", "tiệc"],
    "the-thao": ["thể thao"],
    tui: ["phụ kiện", "đi tiệc", "sự kiện"],
    "trang-suc": ["phụ kiện", "đi tiệc", "sự kiện"],
    "dong-ho": ["phụ kiện", "công sở", "sự kiện"],
    giay: ["giày", "đi tiệc", "sự kiện"],
    khac: ["phụ kiện"],
  };

  return map[cat] ?? [cat];
}

function catalogProductFromItem(
  item: CatalogItem,
  gender: "Nữ" | "Nam",
  categoryPrefix: string,
): FastHelpCatalogProduct {
  return {
    name: item.name,
    brand: item.brand,
    gender,
    category: `${categoryPrefix}/${item.cat}`,
    price: item.price,
    deposit: item.deposit,
    sizes: item.sizes ?? ["Free"],
    occasion: occasionFromCatalogCategory(item.cat),
    available: true,
  };
}

function getCatalogProducts(): FastHelpCatalogProduct[] {
  const normalized: FastHelpCatalogProduct[] = [
    ...products.map((product) => ({
      name: product.name,
      brand: product.designer,
      gender: product.gender,
      category: product.category,
      price: product.price,
      deposit: product.deposit,
      sizes: product.sizes,
      occasion: product.occasion,
      available: product.available,
    })),
    ...womenItems.map((item) => catalogProductFromItem(item, "Nữ", "Trang phục nữ")),
    ...menItems.map((item) => catalogProductFromItem(item, "Nam", "Trang phục nam")),
    ...womenAccessories.map((item) => catalogProductFromItem(item, "Nữ", "Phụ kiện nữ")),
    ...menAccessories.map((item) => catalogProductFromItem(item, "Nam", "Phụ kiện nam")),
  ];

  const seen = new Set<string>();
  return normalized.filter((item) => {
    const key = `${item.name}|${item.gender}|${item.category}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function catalogLine(item: FastHelpCatalogProduct) {
  return [
    `- name: ${item.name}`,
    `gender: ${item.gender}`,
    `category: ${item.category}`,
    `price_per_day: ${formatVND(item.price)}`,
    `deposit: ${formatOptionalVND(item.deposit)}`,
    `sizes: ${item.sizes.join("/")}`,
    `occasion: ${item.occasion.join(", ")}`,
    `available: ${item.available ? "còn hàng" : "đã đặt"}`,
  ].join("; ");
}

function buildProductContext(catalogProducts: FastHelpCatalogProduct[]) {
  return catalogProducts.map(catalogLine).join("\n");
}

function buildUserInput(
  message: string,
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  const transcript = history
    .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.content}`)
    .join("\n");

  return [
    "FASTWEAR service context:",
    FASTWEAR_SERVICE_CONTEXT,
    "",
    "Product catalog:",
    "Catalog sản phẩm FASTWear hiện có. Chỉ dùng đúng tên sản phẩm trong danh sách này:",
    buildProductContext(catalogProducts),
    "",
    "Conversation history:",
    transcript || "No prior session history.",
    "",
    "Instruction for this turn:",
    "Use conversation history to resolve pronouns, short confirmations, option numbers, cheaper requests, size questions, and total-cost follow-ups. Do not restart the conversation.",
    "",
    "Latest user message:",
    message,
  ].join("\n");
}

function normalizeGeminiModel(value: string) {
  return value.replace(/^models\//, "");
}

function isGeminiOverload(status: number, errorText: string) {
  return status === 503 || /UNAVAILABLE|overloaded|high demand/i.test(errorText);
}

function summarizeGeminiError(errorText: string) {
  return errorText.trim().replace(/\s+/g, " ").slice(0, 500);
}

function extractReply(payload: GeminiGenerateContentPayload) {
  const candidate = payload.candidates?.[0];

  const reply =
    candidate?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? "";

  return reply || null;
}

function getFinishReason(payload: GeminiGenerateContentPayload) {
  return payload.candidates?.[0]?.finishReason ?? "unknown";
}

function normalizeRecommendationFormat(reply: string) {
  return reply.replace(/- Lý do phù hợp:/g, "- Vì sao phù hợp:");
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isRecommendationIntent(message: string) {
  const text = normalizeSearchText(message);
  return /goi y|nen thue|outfit|di tiec|tiec cuoi|tot nghiep|suit|ao dai|dam|vay|phu kien|ngan sach|duoi|combo|phoi|mac gi|le cuoi|le tot nghiep|re hon|gia mem|tiet kiem/.test(
    text,
  );
}

function normalizedCatalogNames(catalogProducts: FastHelpCatalogProduct[]) {
  return Array.from(new Set(catalogProducts.map((product) => normalizeSearchText(product.name))));
}

function stripSuggestedName(value: string) {
  return normalizeSearchText(
    value
      .replace(/\*\*/g, "")
      .replace(/^["'“”]+|["'“”:]+$/g, "")
      .replace(/\s+-\s+.*$/g, "")
      .replace(/\s+\(.+\)$/g, "")
      .trim(),
  );
}

function containsCatalogName(value: string, catalogNames: string[]) {
  const normalized = normalizeSearchText(value);
  return catalogNames.some(
    (name) => normalized.includes(name) || stripSuggestedName(value).startsWith(name),
  );
}

function extractNumberedRecommendationNames(reply: string) {
  return reply
    .split("\n")
    .map((line) => line.match(/^\s*\d+[.)]\s+(.+)$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(stripSuggestedName)
    .filter((value) => value.length > 4);
}

function findCatalogProductByNormalizedName(
  normalizedName: string,
  catalogProducts: FastHelpCatalogProduct[],
) {
  return catalogProducts.find((product) => normalizeSearchText(product.name) === normalizedName) ?? null;
}

function findCatalogProductsInText(text: string, catalogProducts: FastHelpCatalogProduct[]) {
  const normalized = normalizeSearchText(text);
  return catalogProducts.filter((product) => normalized.includes(normalizeSearchText(product.name)));
}

function lastAssistantMessage(history: ChatHistoryMessage[]) {
  return [...history].reverse().find((item) => item.role === "assistant")?.content ?? "";
}

function extractLastRecommendedProducts(
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  const recentAssistantReplies = history
    .filter((item) => item.role === "assistant")
    .slice(-4)
    .reverse()
    .map((item) => item.content);

  for (const reply of recentAssistantReplies) {
    const numbered = extractNumberedRecommendationNames(reply).flatMap((name) => {
      const product = findCatalogProductByNormalizedName(name, catalogProducts);
      return product ? [product] : [];
    });

    if (numbered.length) return numbered;

    const mentioned = findCatalogProductsInText(reply, catalogProducts).slice(0, 4);
    if (mentioned.length) return mentioned;
  }

  return [];
}

function referencedOptionIndex(message: string) {
  const text = normalizeSearchText(message);
  if (/option dau|cai dau|mau dau|lua chon dau|so dau|dau tien/.test(text)) return 0;

  const match = text.match(/(?:thu|so|option|mau|cai|lua chon)\s*(\d+)/);
  if (match) return Math.max(0, Number(match[1]) - 1);

  return null;
}

function resolveReferencedProduct(
  message: string,
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  const directMatch = findCatalogProductsInText(message, catalogProducts)[0];
  if (directMatch) return directMatch;

  const previousProducts = extractLastRecommendedProducts(history, catalogProducts);
  const index = referencedOptionIndex(message);
  if (index != null) return previousProducts[index] ?? null;

  if (previousProducts.length === 1 && /mau do|cai do|option do|san pham do/.test(normalizeSearchText(message))) {
    return previousProducts[0];
  }

  return null;
}

function extractRequestedSize(message: string) {
  const match = normalizeSearchText(message).match(/\b(xs|s|m|l|xl|xxl|free|3[5-9]|4[0-4])\b/);
  return match?.[1].toUpperCase() ?? null;
}

function asksAboutSize(message: string) {
  return /size|co vua|vua khong|con size/.test(normalizeSearchText(message));
}

function asksAboutTotal(message: string) {
  return /tong|bao nhieu|tinh tien|thanh toan|het bao nhieu|coc/.test(normalizeSearchText(message));
}

function asksForCheaper(message: string) {
  return /re hon|gia mem|tiet kiem|duoi|ngan sach thap|it tien hon/.test(normalizeSearchText(message));
}

function isShortContinuationReply(message: string) {
  const text = normalizeSearchText(message)
    .replace(/[.!?]+$/g, "")
    .trim();

  return /^(co|ok|okay|duoc|duoc nhe|duoc a|vang|uh|u|uhm|tiep|tiep di|tie[p]+|yes|yep)$/.test(
    text,
  );
}

function lastAssistantAskedForAccessories(history: ChatHistoryMessage[]) {
  const text = normalizeSearchText(lastAssistantMessage(history));
  return /phu kien/.test(text) && /muon|can|tim them|goi y|di kem|phoi kem|kem theo|them/.test(text);
}

function isAccessoryContinuationIntent(message: string, history: ChatHistoryMessage[]) {
  const text = normalizeSearchText(message);
  return /phu kien|di kem|kem theo|phoi kem/.test(text) ||
    (isShortContinuationReply(message) && lastAssistantAskedForAccessories(history));
}

function isRecommendationFlow(
  message: string,
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  return (
    isRecommendationIntent(message) ||
    asksForCheaper(message) ||
    isAccessoryContinuationIntent(message, history) ||
    (isShortContinuationReply(message) &&
      lastAssistantAskedForAccessories(history) &&
      extractLastRecommendedProducts(history, catalogProducts).length > 0)
  );
}

function shouldUseRecommendationFallback(
  message: string,
  history: ChatHistoryMessage[],
  reply: string | null,
  catalogProducts: FastHelpCatalogProduct[],
) {
  if (!isRecommendationFlow(message, history, catalogProducts)) return false;
  if (shouldUseDeterministicFallback(reply)) return true;
  if (!reply) return true;

  const catalogNames = normalizedCatalogNames(catalogProducts);
  const includesRealProduct = catalogNames.some((name) => normalizeSearchText(reply).includes(name));
  if (!includesRealProduct) return true;

  const numberedNames = extractNumberedRecommendationNames(reply);
  if (!numberedNames.length) return false;

  return numberedNames.some((name) => !containsCatalogName(name, catalogNames));
}

function extractBudget(message: string) {
  const text = normalizeSearchText(message).replace(/,/g, ".");
  const millionMatch = text.match(/(\d+(?:\.\d+)?)\s*(trieu|tr)\b/);
  if (millionMatch) return Math.round(Number(millionMatch[1]) * 1_000_000);

  const thousandMatch = text.match(/(\d+(?:\.\d+)?)\s*(nghin|k)\b/);
  if (thousandMatch) return Math.round(Number(thousandMatch[1]) * 1_000);

  return null;
}

function extractRentalDays(message: string) {
  const text = normalizeSearchText(message);
  const match = text.match(/(\d+)\s*(ngay|day|days)\b/);
  return match ? Math.max(1, Number(match[1])) : 1;
}

function extractRentalDaysFromConversation(message: string, history: ChatHistoryMessage[]) {
  const combined = [
    message,
    ...history.slice(-6).reverse().map((item) => item.content),
  ].join("\n");

  return extractRentalDays(combined);
}

function getRequestedGender(message: string) {
  const text = normalizeSearchText(message);
  if (/\bnam\b/.test(text)) return "nam";
  if (/\bnu\b/.test(text)) return "nu";
  return null;
}

function getOccasionKeywords(message: string) {
  const text = normalizeSearchText(message);
  const keywords: string[] = [];

  if (/khanh thanh|su kien|event|le |le$|tiec|khach san|formal/.test(text)) {
    keywords.push("su kien", "tiec", "khanh thanh", "cong so", "suit", "vest", "blazer");
  }
  if (/cuoi|wedding/.test(text)) keywords.push("cuoi", "tiec", "ao dai", "suit");
  if (/prom/.test(text)) keywords.push("prom", "tiec", "dam");
  if (/du lich|bien|resort/.test(text)) keywords.push("du lich", "bien", "resort");
  if (/cong so|di lam|office/.test(text)) keywords.push("cong so", "so mi", "blazer", "quan");

  return keywords.length ? keywords : text.split(/\s+/).filter((word) => word.length > 3);
}

function scoreCatalogProduct(
  product: FastHelpCatalogProduct,
  message: string,
  requestedGender: string | null,
  keywords: string[],
) {
  const haystack = normalizeSearchText(
    [
      product.name,
      product.brand,
      product.gender,
      product.category,
      product.sizes.join(" "),
      product.occasion.join(" "),
    ].join(" "),
  );
  let score = 0;

  if (product.available) score += 2;
  if (requestedGender) {
    const productGender = normalizeSearchText(product.gender);
    score += productGender.includes(requestedGender) ? 6 : -6;
  }

  for (const keyword of keywords) {
    if (haystack.includes(keyword)) score += 3;
  }

  const text = normalizeSearchText(message);
  if (/khanh thanh|su kien|event|tiec|khach san/.test(text)) {
    if (/suit|tuxedo|vest|blazer|so mi|quan|giay|dong ho|cong so|su kien|tiec/.test(haystack)) {
      score += 5;
    }
  }

  return score;
}

function shouldUseDeterministicFallback(reply: string | null) {
  if (!reply) return true;
  const trimmed = reply.trim();
  const boldMarkers = trimmed.match(/\*\*/g)?.length ?? 0;
  return (
    trimmed.length < 180 ||
    trimmed.endsWith(":") ||
    trimmed.endsWith("1.") ||
    trimmed.endsWith("-") ||
    trimmed.endsWith(",") ||
    /\*\*[^*\n]*$/.test(trimmed) ||
    boldMarkers % 2 === 1
  );
}

function isAccessoryProduct(product: FastHelpCatalogProduct) {
  const text = normalizeSearchText(
    [product.name, product.brand, product.gender, product.category, product.occasion.join(" ")].join(" "),
  );

  return /phu kien|tui|giay|trang suc|dong ho|ca vat|that lung|khuyen|vong|day chuyen|vi da/.test(
    text,
  );
}

function buildAccessoryContinuationReply(
  message: string,
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  if (!isAccessoryContinuationIntent(message, history)) return null;

  const previousProducts = extractLastRecommendedProducts(history, catalogProducts);
  const contextText = [
    message,
    lastAssistantMessage(history),
    previousProducts.map((product) => product.name).join(" "),
    previousProducts.map((product) => product.occasion.join(" ")).join(" "),
  ].join("\n");
  const requestedGender = getRequestedGender(contextText);
  const keywords = getOccasionKeywords(contextText);
  const previousProductNames = new Set(previousProducts.map((product) => product.name));

  const accessories = catalogProducts
    .filter((product) => product.available && isAccessoryProduct(product) && !previousProductNames.has(product.name))
    .map((product) => ({
      product,
      score: scoreCatalogProduct(product, contextText, requestedGender, keywords),
    }))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .map(({ product }) => product)
    .slice(0, 3);

  if (!accessories.length) {
    return "FASTHelp chưa thấy phụ kiện phù hợp đã xác nhận trong catalog hiện tại. Bạn có thể hỏi nhân viên FASTWear để được phối thêm tại showroom.";
  }

  const outfitLine = previousProducts.length
    ? `Có. Với ${previousProducts
        .slice(0, 2)
        .map((product) => product.name)
        .join(" và ")}, FASTHelp gợi ý phụ kiện đi kèm như sau:`
    : "Có. FASTHelp gợi ý vài phụ kiện đi kèm từ catalog hiện có:";

  const lines = accessories.map((product, index) =>
    [
      `${index + 1}. ${product.name}`,
      `- Giá thuê: ${formatVND(product.price)}/ngày`,
      `- Cọc: ${formatOptionalVND(product.deposit)}`,
      `- Size: ${product.sizes.join("/")}`,
      `- Tình trạng: ${product.available ? "còn hàng" : "cần kiểm tra lại"}`,
      `- Phù hợp vì: ${product.category}; hợp với ${product.occasion.join(", ")} và giúp outfit đầy đủ hơn.`,
    ].join("\n"),
  );

  return `${outfitLine}\n\n${lines.join("\n\n")}\n\nBạn muốn FASTHelp phối theo hướng tối giản hay nổi bật hơn?`;
}

function chooseFallbackProducts(message: string, catalogProducts: FastHelpCatalogProduct[]) {
  const requestedGender = getRequestedGender(message);
  const keywords = getOccasionKeywords(message);
  const budget = extractBudget(message);
  const days = extractRentalDays(message);

  const available = catalogProducts.filter((product) => product.available);
  const genderMatched = requestedGender
    ? available.filter((product) => normalizeSearchText(product.gender).includes(requestedGender))
    : available;
  const pool = genderMatched.length >= 2 ? genderMatched : available;

  const ranked = pool
    .map((product) => ({
      product,
      score: scoreCatalogProduct(product, message, requestedGender, keywords),
    }))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .map(({ product }) => product);

  if (!budget) return { products: ranked.slice(0, 4), budget, days };

  const selected: FastHelpCatalogProduct[] = [];
  let total = 0;

  for (const product of ranked) {
    const itemTotal = product.price * days;
    if (selected.length < 4 && total + itemTotal <= budget) {
      selected.push(product);
      total += itemTotal;
    }
    if (selected.length >= 2) break;
  }

  if (selected.length >= 2) return { products: selected, budget, days };

  return { products: ranked.slice(0, 4), budget, days };
}

function buildContextualFallbackReply(
  message: string,
  history: ChatHistoryMessage[],
  catalogProducts: FastHelpCatalogProduct[],
) {
  const referencedProduct = resolveReferencedProduct(message, history, catalogProducts);
  const accessoryReply = buildAccessoryContinuationReply(message, history, catalogProducts);
  if (accessoryReply) return accessoryReply;

  if (asksAboutSize(message)) {
    if (!referencedProduct) {
      return "Bạn muốn FASTHelp kiểm tra size cho mẫu số mấy trong danh sách vừa rồi?";
    }

    const requestedSize = extractRequestedSize(message);
    const sizes = referencedProduct.sizes.join("/");
    const sizeLine =
      requestedSize && referencedProduct.sizes.map((size) => size.toUpperCase()).includes(requestedSize)
        ? `Mẫu ${referencedProduct.name} có size ${requestedSize} trong catalog.`
        : requestedSize
          ? `Mẫu ${referencedProduct.name} hiện không thấy size ${requestedSize} trong catalog. Size đang có: ${sizes}.`
          : `Mẫu ${referencedProduct.name} đang có size: ${sizes}.`;

    return `${sizeLine}\n\nNếu bạn băn khoăn độ vừa, FASTHelp khuyên thử tại showroom hoặc nhờ nhân viên kiểm tra phom trước khi chốt.`;
  }

  if (asksAboutTotal(message)) {
    const productsToTotal = referencedProduct
      ? [referencedProduct]
      : extractLastRecommendedProducts(history, catalogProducts);

    if (!productsToTotal.length) {
      return "Bạn muốn FASTHelp tính tổng cho mẫu hoặc combo nào trong danh sách vừa rồi?";
    }

    const days = extractRentalDaysFromConversation(message, history);
    const rentalTotal = productsToTotal.reduce((sum, product) => sum + product.price * days, 0);
    const depositTotal = productsToTotal.reduce((sum, product) => sum + (product.deposit ?? 0), 0);
    const shippingFee = 30_000;
    const totalPayable = rentalTotal + depositTotal + shippingFee;
    const productNames = productsToTotal.map((product) => product.name).join(", ");

    return [
      `Ước tính cho ${productNames}:`,
      `- Tiền thuê ${days} ngày: ${formatVND(rentalTotal)}`,
      `- Cọc hoàn lại: ${formatVND(depositTotal)}`,
      `- Phí giao tận nơi tạm tính: ${formatVND(shippingFee)}`,
      `- Tổng thanh toán dự kiến: ${formatVND(totalPayable)}`,
      "",
      "Nếu bạn chọn nhận tại cửa hàng trong checkout, phí giao có thể về 0đ.",
    ].join("\n");
  }

  if (referencedProduct) {
    return `Mẫu bạn đang nhắc tới là ${referencedProduct.name}. Giá thuê ${formatVND(
      referencedProduct.price,
    )}/ngày, cọc ${formatOptionalVND(referencedProduct.deposit)}, size ${referencedProduct.sizes.join(
      "/",
    )}. Bạn muốn FASTHelp kiểm tra size, tính tổng hay gợi ý phối cùng mẫu này?`;
  }

  if (isShortContinuationReply(message) && lastAssistantMessage(history)) {
    return "Bạn muốn FASTHelp tiếp tục theo hướng nào: gợi ý thêm sản phẩm, phối phụ kiện, kiểm tra size hay tính tổng chi phí?";
  }

  return null;
}

function buildDeterministicRecommendation(
  message: string,
  catalogProducts: FastHelpCatalogProduct[],
  history: ChatHistoryMessage[] = [],
) {
  const contextualReply = buildContextualFallbackReply(message, history, catalogProducts);
  if (contextualReply) return contextualReply;

  const contextMessage = [
    message,
    ...history.slice(-6).reverse().map((item) => item.content),
  ].join("\n");
  const previousProducts = extractLastRecommendedProducts(history, catalogProducts);
  const cheaperThan = previousProducts.length
    ? Math.min(...previousProducts.map((product) => product.price))
    : null;
  const fallbackCatalog =
    asksForCheaper(message) && cheaperThan != null
      ? catalogProducts.filter((product) => product.available && product.price < cheaperThan)
      : catalogProducts;
  const { products: selected, budget, days } = chooseFallbackProducts(
    contextMessage,
    fallbackCatalog.length ? fallbackCatalog : catalogProducts,
  );
  const picks = selected.slice(0, Math.max(2, Math.min(4, selected.length)));

  if (!picks.length) {
    return "Hiện FASTHelp chưa tìm thấy sản phẩm phù hợp trong catalog. Bạn liên hệ nhân viên FASTWear để được tư vấn thêm nhé.";
  }

  const rentalTotal = picks.reduce((sum, product) => sum + product.price * days, 0);
  const depositTotal = picks.reduce((sum, product) => sum + (product.deposit ?? 0), 0);
  const deliveryEstimate = 30_000;
  const totalPayableEstimate = rentalTotal + depositTotal + deliveryEstimate;
  const estimateLine =
    budget == null
      ? days > 1
        ? `\nTổng tiền thuê ${days} ngày khoảng ${formatVND(rentalTotal)}. Cọc dự kiến: ${formatVND(depositTotal)}. Tổng thanh toán ước tính nếu giao tận nơi: ${formatVND(totalPayableEstimate)}.`
        : ""
      : rentalTotal <= budget
        ? `\nTổng tiền thuê ${days} ngày khoảng ${formatVND(rentalTotal)}, nằm trong budget ${formatVND(budget)}. Cọc dự kiến: ${formatVND(depositTotal)}. Tổng thanh toán ước tính nếu giao tận nơi: ${formatVND(totalPayableEstimate)}.`
        : `\nTổng tiền thuê ${days} ngày khoảng ${formatVND(rentalTotal)}, vượt budget ${formatVND(budget)} khoảng ${formatVND(rentalTotal - budget)}. Cọc dự kiến: ${formatVND(depositTotal)}. Tổng thanh toán ước tính nếu giao tận nơi: ${formatVND(totalPayableEstimate)}. Bạn có thể giảm còn 2 món hoặc nhờ nhân viên FASTWear phối lại sát ngân sách.`;

  const lines = picks.map((product, index) =>
    [
      `${index + 1}. ${product.name}`,
      `- Giá thuê: ${formatVND(product.price)}/ngày${days > 1 ? `, ${days} ngày: ${formatVND(product.price * days)}` : ""}`,
      `- Cọc: ${formatOptionalVND(product.deposit)}`,
      `- Size: ${product.sizes.join("/")}`,
      `- Tình trạng: ${product.available ? "còn hàng" : "cần kiểm tra lại"}`,
      `- Phù hợp vì: ${product.gender} - ${product.category}; hợp với ${product.occasion.join(", ")} và đúng bối cảnh bạn mô tả.`,
    ].join("\n"),
  );

  return `${lines.join("\n\n")}${estimateLine}\n\nBạn muốn FASTHelp ưu tiên size, ngày thuê hay ngân sách nào để tinh chỉnh thêm?`;
}

export const Route = createFileRoute("/api/fasthelp")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: FastHelpRequestBody;

        try {
          body = (await request.json()) as FastHelpRequestBody;
        } catch {
          return jsonResponse(
            { reply: "FASTHelp chưa đọc được nội dung tin nhắn. Bạn thử gửi lại giúp mình nhé." },
            400,
          );
        }

        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!message) {
          return jsonResponse({ reply: "Bạn vui lòng nhập câu hỏi để FASTHelp hỗ trợ nhé." }, 400);
        }

        const history = normalizeHistory(body.history);
        const catalogProducts = getCatalogProducts();
        console.info("FastHelp product catalog context", {
          hasProducts: catalogProducts.length > 0,
          count: catalogProducts.length,
        });

        const apiKey = getServerEnv("GEMINI_API_KEY");

        if (!apiKey) {
          console.warn("FastHelp Gemini request skipped: GEMINI_API_KEY is missing.");
          if (isRecommendationIntent(message)) {
            return jsonResponse({
              reply: buildDeterministicRecommendation(message, catalogProducts, history),
            });
          }
          const contextualReply = buildContextualFallbackReply(message, history, catalogProducts);
          if (contextualReply) return jsonResponse({ reply: contextualReply });
          return jsonResponse({ reply: FALLBACK_REPLY });
        }

        try {
          const configuredModel = normalizeGeminiModel(
            getServerEnv("GEMINI_MODEL") || DEFAULT_GEMINI_MODEL,
          );
          const modelsToTry = Array.from(new Set([configuredModel, GEMINI_FALLBACK_MODEL]));
          const requestBody = JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: buildUserInput(
                      message,
                      history,
                      catalogProducts,
                    ),
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: MAX_OUTPUT_TOKENS,
            },
          });

          for (const model of modelsToTry) {
            console.info("FastHelp Gemini model used:", model);

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
            const geminiRequestOptions = {
              method: "POST",
              headers: {
                "x-goog-api-key": apiKey,
                "Content-Type": "application/json; charset=utf-8",
              },
              body: requestBody,
            };

            let response = await fetch(geminiUrl, geminiRequestOptions);

            console.info("FastHelp Gemini response status:", response.status);

            if (!response.ok) {
              let errorText = await response.text();

              if (isGeminiOverload(response.status, errorText)) {
                console.warn("FastHelp Gemini overloaded; retrying once after delay.", {
                  status: response.status,
                  error: summarizeGeminiError(errorText),
                });
                await delay(GEMINI_OVERLOAD_RETRY_DELAY_MS);

                response = await fetch(geminiUrl, geminiRequestOptions);
                console.info("FastHelp Gemini retry response status:", response.status);

                if (!response.ok) {
                  errorText = await response.text();

                  if (isGeminiOverload(response.status, errorText)) {
                    console.warn("FastHelp Gemini overload persisted after retry.", {
                      status: response.status,
                      error: summarizeGeminiError(errorText),
                    });

                    if (isRecommendationFlow(message, history, catalogProducts)) {
                      return jsonResponse({
                        reply: buildDeterministicRecommendation(message, catalogProducts, history),
                      });
                    }

                    return jsonResponse({ reply: GEMINI_OVERLOAD_REPLY });
                  }
                }
              }

              if (!response.ok) {
                console.error("FastHelp Gemini request failed.", {
                  status: response.status,
                  error: summarizeGeminiError(errorText),
                });

                if (RETRYABLE_GEMINI_STATUSES.has(response.status)) {
                  continue;
                }

                const contextualReply = buildContextualFallbackReply(message, history, catalogProducts);
                if (contextualReply) return jsonResponse({ reply: contextualReply });
                return jsonResponse({ reply: FALLBACK_REPLY });
              }
            }

            const payload = (await response.json()) as GeminiGenerateContentPayload;
            const reply = extractReply(payload);
            const finishReason = getFinishReason(payload);
            console.info(
              "FastHelp Gemini finishReason:",
              finishReason,
            );
            console.info("FastHelp parsed reply length:", reply?.length ?? 0);

            if (finishReason === "MAX_TOKENS") {
              console.warn("FastHelp Gemini reply hit MAX_TOKENS; using safe complete fallback.");

              if (isRecommendationFlow(message, history, catalogProducts)) {
                return jsonResponse({
                  reply: buildDeterministicRecommendation(message, catalogProducts, history),
                });
              }

              const contextualReply = buildContextualFallbackReply(message, history, catalogProducts);
              return jsonResponse({ reply: contextualReply ?? TRUNCATED_REPLY });
            }

            if (!reply) {
              if (isRecommendationFlow(message, history, catalogProducts)) {
                console.warn("FastHelp Gemini reply empty; using deterministic catalog fallback.");
                return jsonResponse({
                  reply: buildDeterministicRecommendation(message, catalogProducts, history),
                });
              }

              const contextualReply = buildContextualFallbackReply(message, history, catalogProducts);
              if (contextualReply) return jsonResponse({ reply: contextualReply });
              return jsonResponse({ reply: FALLBACK_REPLY });
            }

            if (shouldUseRecommendationFallback(message, history, reply, catalogProducts)) {
              console.warn("FastHelp Gemini recommendation failed validation; using deterministic catalog fallback.");
              return jsonResponse({
                reply: buildDeterministicRecommendation(message, catalogProducts, history),
              });
            }

            return jsonResponse({ reply: normalizeRecommendationFormat(reply) });
          }

          return jsonResponse({ reply: FALLBACK_REPLY });
        } catch (error) {
          console.error(error);
          return jsonResponse({ reply: FALLBACK_REPLY });
        }
      },
    },
  },
});
