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

const SYSTEM_PROMPT = `Bạn là FastHelp, trợ lý tư vấn thuê trang phục của FASTWear.

Luôn trả lời bằng tiếng Việt, thân thiện, ngắn gọn và hữu ích.

Bạn chỉ được tư vấn dựa trên PRODUCT_CATALOG được cung cấp. Không tự bịa sản phẩm, giá, size, cọc, tình trạng còn hàng hoặc chính sách.

Khi người dùng hỏi gợi ý outfit/sản phẩm:
- BẮT BUỘC đề xuất 2-4 sản phẩm thật có trong PRODUCT_CATALOG.
- CẤM trả lời chỉ bằng một câu mở đầu như "mình có vài gợi ý" mà không liệt kê sản phẩm.
- Bắt đầu thẳng bằng danh sách gợi ý.
- Chọn sản phẩm phù hợp nhất từ PRODUCT_CATALOG, ưu tiên đúng giới tính, dịp, category và budget.
- Dùng đúng format này cho từng sản phẩm:
  1. Product name
  - Giá thuê:
  - Cọc:
  - Size:
  - Lý do phù hợp:
- Nếu người dùng nêu số ngày thuê, tính tổng tiền thuê = giá/ngày x số ngày cho từng món và cho cả combo.
- Nếu người dùng nêu budget, nói rõ combo có nằm trong budget thuê hay không. Nếu vượt budget, nói rõ vượt bao nhiêu và đề xuất phương án rẻ hơn từ catalog.
- Với yêu cầu combo, có thể phối 2-4 món từ PRODUCT_CATALOG nhưng không bịa phụ kiện nếu catalog không có.
- Kết thúc bằng 1 câu hỏi ngắn để chốt size/ngày thuê nếu cần.

Nếu không có sản phẩm phù hợp, nói thật rằng hiện catalog chưa có lựa chọn chính xác và gợi ý liên hệ nhân viên FASTWear.`;

const FALLBACK_REPLY =
  "FastHelp xin lỗi, hiện mình chưa kết nối được AI. Bạn có thể hỏi về outfit, size, tiền cọc, thời gian thuê hoặc liên hệ nhân viên FASTWear để được tư vấn chính xác hơn nhé.";

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
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 600),
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
    .map((item) => `${item.role === "assistant" ? "FastHelp" : "Khách"}: ${item.content}`)
    .join("\n");

  return [
    "PRODUCT_CATALOG của FASTWear hiện có:",
    buildProductContext(catalogProducts),
    transcript ? `\nLịch sử trò chuyện gần đây:\n${transcript}` : "",
    `\nCâu hỏi mới của khách: ${message}`,
  ].join("\n");
}

function normalizeGeminiModel(value: string) {
  return value.replace(/^models\//, "");
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

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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
  return trimmed.length < 180 || trimmed.endsWith(":") || trimmed.endsWith("1.");
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

function buildDeterministicRecommendation(
  message: string,
  catalogProducts: FastHelpCatalogProduct[],
) {
  const { products: selected, budget, days } = chooseFallbackProducts(message, catalogProducts);
  const picks = selected.slice(0, Math.max(2, Math.min(4, selected.length)));

  if (!picks.length) {
    return "Hiện FastHelp chưa tìm thấy sản phẩm phù hợp trong catalog. Bạn liên hệ nhân viên FASTWear để được tư vấn thêm nhé.";
  }

  const rentalTotal = picks.reduce((sum, product) => sum + product.price * days, 0);
  const depositTotal = picks.reduce((sum, product) => sum + (product.deposit ?? 0), 0);
  const budgetLine =
    budget == null
      ? ""
      : rentalTotal <= budget
        ? `\nTổng tiền thuê ${days} ngày khoảng ${formatVND(rentalTotal)}, nằm trong budget ${formatVND(budget)}. Cọc dự kiến: ${formatVND(depositTotal)}.`
        : `\nTổng tiền thuê ${days} ngày khoảng ${formatVND(rentalTotal)}, vượt budget ${formatVND(budget)} khoảng ${formatVND(rentalTotal - budget)}. Bạn có thể giảm còn 2 món rẻ hơn hoặc nhờ nhân viên FASTWear phối lại sát ngân sách. Cọc dự kiến: ${formatVND(depositTotal)}.`;

  const lines = picks.map((product, index) =>
    [
      `${index + 1}. ${product.name}`,
      `- Giá thuê: ${formatVND(product.price)}/ngày${days > 1 ? `, ${days} ngày: ${formatVND(product.price * days)}` : ""}`,
      `- Cọc: ${formatOptionalVND(product.deposit)}`,
      `- Size: ${product.sizes.join("/")}`,
      `- Lý do phù hợp: ${product.gender} - ${product.category}; hợp với ${product.occasion.join(", ")} và giúp outfit đúng bối cảnh bạn mô tả.`,
    ].join("\n"),
  );

  return `${lines.join("\n\n")}${budgetLine}\n\nBạn muốn FastHelp ưu tiên size nào để chốt combo?`;
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
            { reply: "FastHelp chưa đọc được nội dung tin nhắn. Bạn thử gửi lại giúp mình nhé." },
            400,
          );
        }

        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!message) {
          return jsonResponse({ reply: "Bạn vui lòng nhập câu hỏi để FastHelp hỗ trợ nhé." }, 400);
        }

        const catalogProducts = getCatalogProducts();
        console.info("FastHelp product catalog context", {
          hasProducts: catalogProducts.length > 0,
          count: catalogProducts.length,
        });

        const apiKey = getServerEnv("GEMINI_API_KEY");

        if (!apiKey) {
          console.warn("FastHelp Gemini request skipped: GEMINI_API_KEY is missing.");
          return jsonResponse({ reply: FALLBACK_REPLY });
        }

        try {
          const model = normalizeGeminiModel(
            getServerEnv("GEMINI_MODEL") || "gemini-3-flash-preview",
          );
          console.info("FastHelp Gemini model used:", model);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
            {
              method: "POST",
              headers: {
                "x-goog-api-key": apiKey,
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
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
                          normalizeHistory(body.history),
                          catalogProducts,
                        ),
                      },
                    ],
                  },
                ],
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: 1024,
                },
              }),
            },
          );

          console.info("FastHelp Gemini response status:", response.status);

          if (!response.ok) {
            console.error(
              `FastHelp Gemini request failed: ${response.status} ${await response.text()}`,
            );
            return jsonResponse({ reply: FALLBACK_REPLY });
          }

          const payload = (await response.json()) as GeminiGenerateContentPayload;
          const reply = extractReply(payload);
          console.info(
            "FastHelp Gemini finishReason:",
            payload.candidates?.[0]?.finishReason ?? "unknown",
          );
          console.info("FastHelp parsed reply length:", reply?.length ?? 0);

          if (shouldUseDeterministicFallback(reply)) {
            console.warn("FastHelp Gemini reply incomplete; using deterministic catalog fallback.");
            return jsonResponse({
              reply: buildDeterministicRecommendation(message, catalogProducts),
            });
          }

          return jsonResponse({ reply });
        } catch (error) {
          console.error(error);
          return jsonResponse({ reply: FALLBACK_REPLY });
        }
      },
    },
  },
});
