export type WelcomeEmailInput = {
  fullName: string;
  email: string;
};

type SendGridMailPayload = {
  personalizations: Array<{
    to: Array<{ email: string; name?: string }>;
    subject: string;
  }>;
  from: { email: string; name: string };
  content: Array<{
    type: "text/plain" | "text/html";
    value: string;
  }>;
};

function getServerEnv(name: string) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildWelcomeEmailPayload(input: WelcomeEmailInput): SendGridMailPayload | null {
  const fromEmail = getServerEnv("SENDGRID_FROM_EMAIL");

  if (!fromEmail) return null;

  const safeName = escapeHtml(input.fullName);

  return {
    personalizations: [
      {
        to: [{ email: input.email, name: input.fullName }],
        subject: "Chào mừng bạn đến với FASTWear",
      },
    ],
    from: {
      email: fromEmail,
      name: getServerEnv("SENDGRID_FROM_NAME") || "FASTWear",
    },
    content: [
      {
        type: "text/plain",
        value: [
          `Xin chào ${input.fullName},`,
          "",
          "FASTWear đã tạo tài khoản của bạn thành công.",
          "Bạn có thể đăng nhập để quản lý hồ sơ, theo dõi đơn thuê và tích lũy FASTCoin.",
          "",
          "Cảm ơn bạn đã đồng hành cùng FASTWear.",
        ].join("\n"),
      },
      {
        type: "text/html",
        value: [
          `<p>Xin chào <strong>${safeName}</strong>,</p>`,
          "<p>FASTWear đã tạo tài khoản của bạn thành công.</p>",
          "<p>Bạn có thể đăng nhập để quản lý hồ sơ, theo dõi đơn thuê và tích lũy FASTCoin.</p>",
          "<p>Cảm ơn bạn đã đồng hành cùng FASTWear.</p>",
        ].join(""),
      },
    ],
  };
}

export async function sendWelcomeEmail(input: WelcomeEmailInput) {
  const apiKey = getServerEnv("SENDGRID_API_KEY");
  const payload = buildWelcomeEmailPayload(input);

  if (!apiKey || !payload) {
    console.warn(
      "FASTWear welcome email skipped: SENDGRID_API_KEY or SENDGRID_FROM_EMAIL is missing.",
    );
    return false;
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid request failed (${response.status}): ${errorText.slice(0, 500)}`);
  }

  return true;
}
