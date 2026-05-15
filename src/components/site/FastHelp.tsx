import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type FastHelpMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = ["Gợi ý đi tiệc", "Tư vấn size", "Tiền cọc", "Thời gian thuê", "Giao nhận"];

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
        <div className="glass-strong fixed inset-x-3 bottom-3 z-50 flex h-[min(640px,calc(100dvh-24px))] flex-col overflow-hidden sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[min(460px,calc(100vw-48px))]">
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4">
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

          <div className="shrink-0 border-y border-white/30 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                  className="glass-soft px-3 py-1.5 text-[11px] leading-none text-[#1C1410]/80 transition hover:text-[#6B1A33] disabled:opacity-60"
                  style={{ borderRadius: 9999 }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`break-words px-4 py-3 text-[13px] leading-6 shadow-sm ${
                    isUser
                      ? "ml-auto max-w-[78%] text-white"
                      : "glass-soft max-w-[88%] whitespace-pre-line text-[#1C1410]"
                  }`}
                  style={{
                    borderRadius: isUser ? 18 : 16,
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
                className="glass-soft inline-flex max-w-[88%] items-center gap-2 px-4 py-3 text-[13px] text-[#1C1410]/70"
                style={{ borderRadius: 16 }}
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#6B1A33]" />
                FastHelp đang trả lời...
              </div>
            )}

            {error && <div className="text-xs text-[#6B1A33]">{error}</div>}
          </div>

          <form
            className="shrink-0 border-t border-white/25 bg-white/10 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="glass-dark flex items-center gap-2 px-3 py-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Nhập câu hỏi về outfit, size, tiền cọc..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-white/45 outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6B1A33] text-white transition hover:bg-[#8B2442] disabled:cursor-not-allowed disabled:opacity-50"
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
