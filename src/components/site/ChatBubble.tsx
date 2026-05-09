import { useState } from "react";
import { MessageCircle, X, Phone, Bot, MessageSquare } from "lucide-react";

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"live" | "bot" | "hotline">("live");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-105"
      >
        <MessageCircle className="h-4 w-4" />
        Chat tư vấn ngay
      </button>
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="font-serif text-lg">FASTWear Care</div>
            <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-3 border-b border-border text-xs">
            {([
              ["live", "Live Chat", MessageSquare],
              ["bot", "Chatbot", Bot],
              ["hotline", "Hotline", Phone],
            ] as const).map(([k, label, Icon]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex items-center justify-center gap-1 py-3 ${tab === k ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {tab === "live" && (
              <>
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2">Chào bạn 👋 Mình là Linh. Bạn cần tư vấn outfit cho dịp gì?</div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-primary-foreground">Mình cần đầm đi tiệc cuối tuần</div>
              </>
            )}
            {tab === "bot" && (
              <div className="rounded-2xl bg-muted px-3 py-2">🤖 Chọn nhanh: <br />• Gợi ý theo dịp <br />• Bảng size <br />• Tra cứu đơn hàng</div>
            )}
            {tab === "hotline" && (
              <div className="space-y-2 text-center">
                <Phone className="mx-auto h-10 w-10 text-primary" />
                <div className="font-serif text-2xl">0909-FAST-WR</div>
                <div className="text-muted-foreground">8:00 — 22:00 mỗi ngày</div>
              </div>
            )}
          </div>
          <div className="border-t border-border p-3">
            <input
              placeholder="Nhập tin nhắn…"
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      )}
    </>
  );
}
