import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type FastHelpMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Gợi ý đầm đi tiệc",
  "Tư vấn size giúp mình",
  "Tiền cọc tính thế nào?",
  "Thời gian thuê bao lâu?",
  "FASTWear có giao nhận không?",
];

const welcomeMessage: FastHelpMessage = {
  role: "assistant",
  content:
    "Chào bạn, mình là FastHelp. Mình có thể tư vấn outfit, size, tiền cọc, thời gian thuê, giao nhận và các lựa chọn bền vững của FASTWear.",
};

const clientFallback =
  "FastHelp đang hơi bận. Bạn thử hỏi lại sau ít phút, hoặc liên hệ nhân viên FASTWear để được tư vấn chính xác hơn nhé.";

export function FastHelp() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<FastHelpMessage[]>([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage(value = input) {
    const message = value.trim();
    if (!message || loading) return;

    const history = messages.slice(-8);
    const nextMessages: FastHelpMessage[] = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fasthelp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = (await response.json().catch(() => null)) as { reply?: string } | null;

      if (!response.ok) {
        throw new Error(data?.reply || "Không thể gửi tin nhắn lúc này.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data?.reply?.trim() || clientFallback },
      ]);
    } catch (sendError) {
      const fallback = sendError instanceof Error ? sendError.message : clientFallback;
      setError(fallback);
      setMessages((current) => [...current, { role: "assistant", content: clientFallback }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-strong fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 text-sm text-[#1C1410] transition hover:scale-105"
        style={{ borderRadius: 9999 }}
        aria-label="Mở FastHelp"
      >
        <MessageCircle className="h-4 w-4 text-[#6B1A33]" />
        FASTHelp
      </button>

      {open && (
        <div className="glass-strong fixed bottom-6 right-4 z-50 flex h-[min(560px,calc(100vh-48px))] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden md:right-6">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#6B1A33]">
                <Sparkles className="h-3.5 w-3.5" />
                GenAI FASTHELP
              </div>
              <div className="font-serif text-xl text-[#1C1410]">Tư vấn nhanh</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="glass-soft flex h-8 w-8 shrink-0 items-center justify-center"
              aria-label="Đóng FastHelp"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-y border-white/30 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                  className="glass-soft shrink-0 px-3 py-1.5 text-xs text-[#1C1410]/80 transition hover:text-[#6B1A33] disabled:opacity-60"
                  style={{ borderRadius: 9999 }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[84%] px-4 py-2.5 leading-relaxed ${
                    isUser ? "ml-auto text-white" : "glass-soft text-[#1C1410]"
                  }`}
                  style={{
                    borderRadius: 18,
                    background: isUser ? "rgba(107,26,51,0.88)" : undefined,
                    backdropFilter: isUser ? "blur(16px)" : undefined,
                  }}
                >
                  {message.content}
                </div>
              );
            })}

            {loading && (
              <div
                className="glass-soft inline-flex items-center gap-2 px-4 py-2.5 text-[#1C1410]/70"
                style={{ borderRadius: 18 }}
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#6B1A33]" />
                FastHelp đang trả lời...
              </div>
            )}

            {error && <div className="text-xs text-[#6B1A33]">{error}</div>}
          </div>

          <form
            className="p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="glass-dark flex items-center gap-2 px-3 py-2.5">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Nhập câu hỏi về outfit, size, tiền cọc..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B1A33] text-white transition hover:bg-[#8B2442] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Gửi tin nhắn"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
