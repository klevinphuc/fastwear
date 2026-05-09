import { useState } from "react";
import { MessageCircle, X, Phone, Bot, MessageSquare } from "lucide-react";

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"live" | "bot" | "hotline">("live");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-strong fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 text-sm text-[#1C1410] hover:scale-105 transition"
        style={{ borderRadius: 9999 }}
      >
        <MessageCircle className="h-4 w-4 text-[#6B1A33]" />
        FASTHelp
      </button>
      {open && (
        <div className="glass-strong fixed bottom-6 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#6B1A33]">FASTHELP MASCOT</div>
              <div className="font-serif text-xl text-[#1C1410]">Xin chào ✨</div>
            </div>
            <button onClick={() => setOpen(false)} className="glass-soft flex h-8 w-8 items-center justify-center"><X className="h-4 w-4" /></button>
          </div>
          <div className="px-4">
            <div className="glass-soft flex items-center gap-1 p-1">
              {([
                ["live", "Chat", MessageSquare],
                ["bot", "FAQ", Bot],
                ["hotline", "Hotline", Phone],
              ] as const).map(([k, label, Icon]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className="pill-tab flex flex-1 items-center justify-center gap-1.5"
                  data-active={tab === k ? "true" : "false"}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {tab === "live" && (
              <>
                <div className="glass-soft max-w-[80%] px-4 py-2 text-[#1C1410]" style={{ borderRadius: 18 }}>Chào bạn 👋 Mình là Linh. Bạn cần tư vấn outfit cho dịp gì?</div>
                <div className="ml-auto max-w-[80%] px-4 py-2 text-white" style={{ borderRadius: 18, background: "rgba(107,26,51,0.85)", backdropFilter: "blur(16px)" }}>Mình cần đầm đi tiệc cuối tuần</div>
              </>
            )}
            {tab === "bot" && (
              <div className="glass-soft px-4 py-3" style={{ borderRadius: 18 }}>🤖 Chọn nhanh: <br />• Gợi ý theo dịp <br />• Bảng size <br />• Tra cứu đơn hàng</div>
            )}
            {tab === "hotline" && (
              <div className="space-y-2 text-center">
                <Phone className="mx-auto h-10 w-10 text-[#6B1A33]" />
                <div className="font-serif text-2xl text-[#1C1410]">0909-FAST-WR</div>
                <div className="text-[#1C1410]/60 text-xs">8:00 — 22:00 mỗi ngày</div>
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="glass-dark flex items-center gap-2 px-4 py-2.5">
              <input
                placeholder="Nhập tin nhắn…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button className="rounded-full bg-[#6B1A33] px-3 py-1 text-xs text-white">Gửi</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
