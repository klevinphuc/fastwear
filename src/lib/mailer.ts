import { Resend } from "resend";

export type MailResult =
  | { ok: true; id?: string }
  | {
      ok: false;
      reason: "missing_api_key" | "missing_recipient" | "invalid_recipient" | "send_failed";
    };

export type WelcomeEmailUser = {
  name?: string;
  email: string;
};

export type OrderConfirmationEmail = {
  orderId: string;
  customerName?: string;
  customerEmail: string;
  productName?: string;
  productNames?: string[];
  rentalDate?: string;
  returnDate?: string;
  rentalPrice?: number | string;
  deposit?: number | string;
  totalAmount?: number | string;
  pickupMethod?: string;
  paymentMethod?: string;
  orderStatus?: string;
};

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const resendApiKey = getServerEnv("RESEND_API_KEY");
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const emailFrom = getServerEnv("EMAIL_FROM") || "FASTWear <onboarding@resend.dev>";
const appUrl = trimTrailingSlash(getServerEnv("APP_URL") || "http://localhost:5173");
let warnedMissingApiKey = false;

function getServerEnv(name: string) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function safeText(value: string | undefined, fallback = "Đang cập nhật") {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCurrency(value: number | string | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return "Đang cập nhật";
}

function productSummary(order: OrderConfirmationEmail) {
  if (order.productNames?.length) {
    return order.productNames
      .map((name) => name.trim())
      .filter(Boolean)
      .join(", ");
  }

  return safeText(order.productName);
}

function orderRows(order: OrderConfirmationEmail) {
  return [
    ["Mã đơn", safeText(order.orderId)],
    ["Trang phục", productSummary(order)],
    ["Ngày nhận", safeText(order.rentalDate)],
    ["Ngày trả", safeText(order.returnDate)],
    ["Giá thuê", formatCurrency(order.rentalPrice)],
    ["Tiền cọc", formatCurrency(order.deposit)],
    ["Tổng thanh toán", formatCurrency(order.totalAmount)],
    ["Hình thức nhận đồ", safeText(order.pickupMethod)],
    ["Phương thức thanh toán", safeText(order.paymentMethod)],
    ["Trạng thái", safeText(order.orderStatus)],
  ] as const;
}

function baseCardHtml(content: string) {
  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FASTWear</title>
  </head>
  <body style="margin:0;background:#fbf8ef;color:#1c1a16;font-family:Arial,'Helvetica Neue',sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fbf8ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border:1px solid #ded3bd;border-radius:24px;background:#fffdfa;overflow:hidden;">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildWelcomeText(name: string) {
  return [
    `Xin chào ${name},`,
    "",
    "Cảm ơn bạn đã đăng ký tài khoản FASTWear.",
    "",
    "Từ hôm nay, bạn có thể khám phá các trang phục cao cấp cho tiệc cưới, sự kiện, prom, công sở, du lịch và những khoảnh khắc quan trọng khác mà không cần mua mới.",
    "",
    "FASTWear giúp bạn mặc đúng dịp, đúng phong cách và đúng ngân sách.",
    "",
    "Bạn có thể bắt đầu bằng cách khám phá bộ sưu tập hoặc đặt lịch thử đồ tại showroom.",
    "",
    `Khám phá FASTWear tại: ${appUrl}`,
    "",
    "Thân mến,",
    "FASTWear",
  ].join("\n");
}

function buildWelcomeHtml(name: string) {
  const safeName = escapeHtml(name);
  const safeAppUrl = escapeHtml(appUrl);

  return baseCardHtml(`
    <tr>
      <td style="padding:28px 32px 12px;">
        <div style="font-size:26px;font-weight:800;letter-spacing:0;color:#1d4e3f;">FASTWear</div>
        <div style="margin-top:6px;font-size:11px;font-weight:700;letter-spacing:1.8px;color:#8b7d68;">THUÊ TRANG PHỤC CAO CẤP</div>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 32px 30px;">
        <h1 style="margin:0;color:#1c1a16;font-family:Georgia,serif;font-size:32px;line-height:1.18;">Chào mừng bạn đến với FASTWear</h1>
        <p style="margin:24px 0 0;font-size:16px;line-height:1.7;">Xin chào <strong>${safeName}</strong>,</p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;">Cảm ơn bạn đã đăng ký tài khoản FASTWear.</p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;">Từ hôm nay, bạn có thể khám phá các trang phục cao cấp cho tiệc cưới, sự kiện, prom, công sở, du lịch và những khoảnh khắc quan trọng khác mà không cần mua mới.</p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;">FASTWear giúp bạn mặc đúng dịp, đúng phong cách và đúng ngân sách.</p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;">Bạn có thể bắt đầu bằng cách khám phá bộ sưu tập hoặc đặt lịch thử đồ tại showroom.</p>
        <a href="${safeAppUrl}" style="display:inline-block;margin-top:24px;border-radius:999px;background:#1d4e3f;color:#fbf8ef;font-size:14px;font-weight:700;text-decoration:none;padding:13px 22px;">Khám phá bộ sưu tập</a>
      </td>
    </tr>
    <tr>
      <td style="border-top:1px solid #eadfca;padding:18px 32px;color:#6a6258;font-size:13px;">
        Mặc đúng dịp. Tự tin xuất hiện.
      </td>
    </tr>`);
}

function buildOrderText(order: OrderConfirmationEmail, name: string) {
  const details = orderRows(order).map(([label, value]) => `- ${label}: ${value}`);

  return [
    `Xin chào ${name},`,
    "",
    "FASTWear đã nhận đơn thuê của bạn.",
    "",
    "Thông tin đơn thuê:",
    ...details,
    "",
    "Mỗi sản phẩm sẽ được FASTWear vệ sinh và kiểm tra kỹ trước khi đến tay bạn.",
    "",
    "Nếu bạn cần đổi size, thêm phụ kiện hoặc đặt lịch thử đồ, FastHelp luôn sẵn sàng hỗ trợ.",
    "",
    "Cảm ơn bạn đã chọn FASTWear cho khoảnh khắc quan trọng sắp tới.",
    "",
    "Thân mến,",
    "FASTWear",
  ].join("\n");
}

function buildOrderHtml(order: OrderConfirmationEmail, name: string) {
  const safeName = escapeHtml(name);
  const accountUrl = `${appUrl}/account`;
  const safeAccountUrl = escapeHtml(accountUrl);
  const detailRows = orderRows(order)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;color:#6a6258;font-size:14px;border-bottom:1px solid #efe6d6;">${escapeHtml(label)}</td>
          <td style="padding:12px 0;color:#1c1a16;font-size:14px;font-weight:700;text-align:right;border-bottom:1px solid #efe6d6;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return baseCardHtml(`
    <tr>
      <td style="padding:28px 32px 12px;">
        <div style="font-size:26px;font-weight:800;letter-spacing:0;color:#1d4e3f;">FASTWear</div>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 32px 30px;">
        <h1 style="margin:0;color:#1c1a16;font-family:Georgia,serif;font-size:30px;line-height:1.2;">FASTWear đã nhận đơn thuê của bạn</h1>
        <p style="margin:20px 0 0;font-size:16px;line-height:1.7;">Xin chào <strong>${safeName}</strong>, cảm ơn bạn đã hoàn tất đơn thuê tại FASTWear.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border:1px solid #eadfca;border-radius:18px;background:#fbf8ef;padding:4px 18px;">
          ${detailRows}
        </table>
        <p style="margin:22px 0 0;font-size:15px;line-height:1.7;">Mỗi sản phẩm sẽ được FASTWear vệ sinh và kiểm tra kỹ trước khi đến tay bạn.</p>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.7;">Nếu cần hỗ trợ, bạn có thể mở FastHelp trên website hoặc liên hệ FASTWear.</p>
        <a href="${safeAccountUrl}" style="display:inline-block;margin-top:24px;border-radius:999px;background:#1d4e3f;color:#fbf8ef;font-size:14px;font-weight:700;text-decoration:none;padding:13px 22px;">Xem lại đơn thuê</a>
      </td>
    </tr>
    <tr>
      <td style="border-top:1px solid #eadfca;padding:18px 32px;color:#6a6258;font-size:13px;">
        Đúng dịp, đúng phong cách, đúng ngân sách.
      </td>
    </tr>`);
}

async function sendEmail(message: EmailMessage): Promise<MailResult> {
  if (!message.to.trim()) {
    return { ok: false, reason: "missing_recipient" };
  }

  const recipient = normalizeEmail(message.to);

  if (!isEmail(recipient)) {
    return { ok: false, reason: "invalid_recipient" };
  }

  if (!resend) {
    if (!warnedMissingApiKey) {
      console.warn("FASTWear email skipped: RESEND_API_KEY is missing.");
      warnedMissingApiKey = true;
    }

    return { ok: false, reason: "missing_api_key" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: recipient,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });

    if (error) {
      console.error("FASTWear email send failed", error);
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("FASTWear email send failed", error);
    return { ok: false, reason: "send_failed" };
  }
}

export async function sendWelcomeEmail(user: WelcomeEmailUser): Promise<MailResult> {
  const name = safeText(user.name, "bạn");

  return sendEmail({
    to: user.email,
    subject: "Chào mừng bạn đến với FASTWear",
    text: buildWelcomeText(name),
    html: buildWelcomeHtml(name),
  });
}

export async function sendOrderConfirmationEmail(
  order: OrderConfirmationEmail,
): Promise<MailResult> {
  const name = safeText(order.customerName, "bạn");

  return sendEmail({
    to: order.customerEmail,
    subject: "FASTWear đã nhận đơn thuê của bạn",
    text: buildOrderText(order, name),
    html: buildOrderHtml(order, name),
  });
}
