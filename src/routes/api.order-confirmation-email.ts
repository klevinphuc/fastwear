import { createFileRoute } from "@tanstack/react-router";
import { sendOrderConfirmationEmail, type OrderConfirmationEmail } from "@/lib/mailer";

type OrderConfirmationRequestBody = {
  orderId?: unknown;
  customerName?: unknown;
  customerEmail?: unknown;
  productName?: unknown;
  productNames?: unknown;
  rentalDate?: unknown;
  returnDate?: unknown;
  rentalPrice?: unknown;
  deposit?: unknown;
  totalAmount?: unknown;
  pickupMethod?: unknown;
  paymentMethod?: unknown;
  orderStatus?: unknown;
};

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  });
}

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : undefined;
}

function moneyValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function stringList(value: unknown) {
  if (!Array.isArray(value)) return undefined;

  const normalized = value.flatMap((item) => {
    const text = textValue(item);
    return text ? [text] : [];
  });

  return normalized.length ? normalized.slice(0, 20) : undefined;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function normalizeOrder(body: OrderConfirmationRequestBody): OrderConfirmationEmail | null {
  const orderId = textValue(body.orderId);
  const customerEmail = textValue(body.customerEmail)?.toLowerCase();

  if (!orderId || !customerEmail || !isEmail(customerEmail)) return null;

  return {
    orderId,
    customerName: textValue(body.customerName),
    customerEmail,
    productName: textValue(body.productName),
    productNames: stringList(body.productNames),
    rentalDate: textValue(body.rentalDate),
    returnDate: textValue(body.returnDate),
    rentalPrice: moneyValue(body.rentalPrice),
    deposit: moneyValue(body.deposit),
    totalAmount: moneyValue(body.totalAmount),
    pickupMethod: textValue(body.pickupMethod),
    paymentMethod: textValue(body.paymentMethod),
    orderStatus: textValue(body.orderStatus),
  };
}

export const Route = createFileRoute("/api/order-confirmation-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length") || 0);

        if (contentLength > 12000) {
          return jsonResponse({ message: "Request body quá lớn." }, 413);
        }

        let body: OrderConfirmationRequestBody;

        try {
          body = (await request.json()) as OrderConfirmationRequestBody;
        } catch {
          return jsonResponse({ message: "Request body không hợp lệ." }, 400);
        }

        const order = normalizeOrder(body);

        if (!order) {
          return jsonResponse({ message: "Thông tin đơn thuê hoặc email chưa hợp lệ." }, 400);
        }

        const result = await sendOrderConfirmationEmail(order);

        return jsonResponse({
          success: true,
          mailSent: result.ok,
          reason: result.ok ? undefined : result.reason,
          message: result.ok
            ? "FASTWear đã gửi email xác nhận đơn thuê."
            : "Thanh toán thành công. Email xác nhận có thể đến chậm trong vài phút.",
        });
      },
    },
  },
});
