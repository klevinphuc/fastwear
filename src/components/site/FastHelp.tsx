import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, X } from "lucide-react";

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

const mascotImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cdefs%3E%3CradialGradient id='gold' cx='34%25' cy='22%25' r='76%25'%3E%3Cstop offset='0%25' stop-color='%23fff3a3'/%3E%3Cstop offset='42%25' stop-color='%23f2bf35'/%3E%3Cstop offset='100%25' stop-color='%23b97915'/%3E%3C/radialGradient%3E%3ClinearGradient id='visor' x1='20%25' x2='80%25'%3E%3Cstop stop-color='%230d477c'/%3E%3Cstop offset='100%25' stop-color='%231167a4'/%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='4' result='blur'/%3E%3CfeMerge%3E%3CfeMergeNode in='blur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='110' cy='200' rx='72' ry='13' fill='%237af5ee' opacity='.34'/%3E%3Ccircle cx='110' cy='105' r='88' fill='url(%23gold)'/%3E%3Cpath d='M63 88c5-18 20-29 40-24 5 1 9 1 14 0 20-5 36 6 40 24 5 21-9 39-31 39H94c-22 0-36-18-31-39Z' fill='url(%23visor)' stroke='%2380eeff' stroke-width='5'/%3E%3Cg fill='%2385fff7' filter='url(%23glow)'%3E%3Ccircle cx='88' cy='95' r='12'/%3E%3Ccircle cx='132' cy='95' r='12'/%3E%3C/g%3E%3Cpath d='M86 124c12 14 36 14 48 0' fill='none' stroke='%2385fff7' stroke-width='5' stroke-linecap='round'/%3E%3Ccircle cx='110' cy='154' r='25' fill='%230e6ea4' stroke='%2385fff7' stroke-width='4'/%3E%3Ctext x='110' y='160' text-anchor='middle' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EAI%3C/text%3E%3Cpath d='M56 176h108' stroke='%237af5ee' stroke-width='4' stroke-linecap='round' filter='url(%23glow)'/%3E%3C/svg%3E";

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
        className="fasthelp-mascot-button"
        aria-label="Mở FastHelp"
      >
        <span className="fasthelp-mascot-orbit" aria-hidden="true" />
        <img src={mascotImage} alt="" />
        <span>FastHelp</span>
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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
