import { createFileRoute } from "@tanstack/react-router";
import { sendWelcomeEmail } from "@/lib/mailer";

type RegisterRequestBody = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  password?: unknown;
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function createUserId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const Route = createFileRoute("/api/auth/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: RegisterRequestBody;

        try {
          body = (await request.json()) as RegisterRequestBody;
        } catch {
          return jsonResponse({ message: "Request body không hợp lệ." }, 400);
        }

        const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
        const phone = typeof body.phone === "string" ? body.phone.trim() : "";
        const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
        const password = typeof body.password === "string" ? body.password : "";

        if (fullName.length < 2) {
          return jsonResponse({ message: "Họ tên cần tối thiểu 2 ký tự." }, 400);
        }

        if (phone.length < 9) {
          return jsonResponse({ message: "Số điện thoại chưa hợp lệ." }, 400);
        }

        if (!isEmail(email)) {
          return jsonResponse({ message: "Email chưa đúng định dạng." }, 400);
        }

        if (password.length < 6) {
          return jsonResponse({ message: "Mật khẩu cần tối thiểu 6 ký tự." }, 400);
        }

        const user = {
          id: createUserId(),
          fullName,
          phone,
          email,
          fastCoin: 0,
        };

        let mailSent = false;

        try {
          const result = await sendWelcomeEmail({ name: fullName, email });
          mailSent = result.ok;
        } catch (error) {
          console.error("FASTWear welcome email failed", error);
        }

        return jsonResponse(
          {
            user,
            mailSent,
            message:
              "Đăng ký thành công. FASTWear đã gửi email xác nhận nếu hệ thống email được cấu hình.",
          },
          201,
        );
      },
    },
  },
});
