import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, X } from "lucide-react";

type FastHelpMessage = {
  role: "user" | "assistant";
  content: string;
};

export type FastHelpPageContext = {
  page?: string;
  productName?: string;
  category?: string;
  price?: string;
  deposit?: string;
  rentalDate?: string;
  size?: string;
  color?: string;
  rentalStatus?: string;
};

const suggestions = [
  "Tôi đi tiệc cưới nên mặc gì?",
  "Tư vấn size cho tôi",
  "Quy trình thuê đồ như thế nào?",
  "Tiền cọc được tính ra sao?",
  "Tôi muốn đặt lịch thử đồ",
  "AR Try-On dùng như thế nào?",
];

const welcomeMessage: FastHelpMessage = {
  role: "assistant",
  content:
    "Chào bạn, mình là FASTHelp. Mình có thể gợi ý outfit theo dịp, giải thích đặt cọc, showroom, giao nhận và quy trình thuê của FASTWear.",
};

const clientFallback = "FastHelp đang hơi bận một chút. Bạn thử lại sau vài giây nhé.";

const mascotImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cdefs%3E%3CradialGradient id='gold' cx='34%25' cy='22%25' r='76%25'%3E%3Cstop offset='0%25' stop-color='%23fff3a3'/%3E%3Cstop offset='42%25' stop-color='%23f2bf35'/%3E%3Cstop offset='100%25' stop-color='%23b97915'/%3E%3C/radialGradient%3E%3ClinearGradient id='visor' x1='20%25' x2='80%25'%3E%3Cstop stop-color='%230d477c'/%3E%3Cstop offset='100%25' stop-color='%231167a4'/%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='4' result='blur'/%3E%3CfeMerge%3E%3CfeMergeNode in='blur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='110' cy='200' rx='72' ry='13' fill='%237af5ee' opacity='.34'/%3E%3Ccircle cx='110' cy='105' r='88' fill='url(%23gold)'/%3E%3Cpath d='M63 88c5-18 20-29 40-24 5 1 9 1 14 0 20-5 36 6 40 24 5 21-9 39-31 39H94c-22 0-36-18-31-39Z' fill='url(%23visor)' stroke='%2380eeff' stroke-width='5'/%3E%3Cg fill='%2385fff7' filter='url(%23glow)'%3E%3Ccircle cx='88' cy='95' r='12'/%3E%3Ccircle cx='132' cy='95' r='12'/%3E%3C/g%3E%3Cpath d='M86 124c12 14 36 14 48 0' fill='none' stroke='%2385fff7' stroke-width='5' stroke-linecap='round'/%3E%3Ccircle cx='110' cy='154' r='25' fill='%230e6ea4' stroke='%2385fff7' stroke-width='4'/%3E%3Ctext x='110' y='160' text-anchor='middle' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EAI%3C/text%3E%3Cpath d='M56 176h108' stroke='%237af5ee' stroke-width='4' stroke-linecap='round' filter='url(%23glow)'/%3E%3C/svg%3E";

export function FastHelp({ pageContext }: { pageContext?: FastHelpPageContext }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<FastHelpMessage[]>([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage(value = input) {
    const message = value.trim();
    if (!message || loading) return;

    const conversation = messages.slice(-16);
    const nextMessages: FastHelpMessage[] = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const resolvedPageContext = {
        page: typeof window !== "undefined" ? window.location.pathname : undefined,
        ...pageContext,
      };

      const response = await fetch("/api/fasthelp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          conversation,
          pageContext: resolvedPageContext,
        }),
      });
      const data = (await response.json().catch(() => null)) as { reply?: string } | null;

      if (!response.ok) {
        throw new Error(data?.reply || clientFallback);
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data?.reply?.trim() || clientFallback },
      ]);
    } catch (sendError) {
      const fallback = sendError instanceof Error ? sendError.message : clientFallback;
      setMessages((current) => [
        ...current,
        { role: "assistant", content: fallback || clientFallback },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fasthelp-mascot-button"
        aria-label="Mở FASTHelp"
      >
        <span className="fasthelp-mascot-orbit" aria-hidden="true" />
        <img src={mascotImage} alt="" />
        <span>FASTHelp</span>
      </button>

      {open && (
        <div className="fixed inset-x-3 bottom-3 z-50 flex h-[min(640px,calc(100dvh-24px))] flex-col overflow-hidden rounded-[24px] border border-[#eadcc5] bg-[#fffaf2] text-[#1C1410] shadow-[0_24px_70px_rgba(28,20,16,0.2)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(460px,calc(100vw-48px))]">
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#eadcc5]/80 bg-white/55 px-5 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#00624f]">
                <Sparkles className="h-3.5 w-3.5" />
                FASTWEAR ASSISTANT
              </div>
              <div className="font-serif text-xl text-[#1C1410]">FASTHelp</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#eadcc5] bg-white text-[#1C1410] transition hover:border-[#00624f]/35"
              aria-label="Đóng FASTHelp"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="shrink-0 border-b border-[#eadcc5]/70 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                  className="rounded-full border border-[#eadcc5] bg-white/70 px-3 py-1.5 text-[11px] leading-none text-[#1C1410]/78 transition hover:border-[#00624f]/35 hover:text-[#00624f] disabled:opacity-60"
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
                  className={`break-words px-4 py-3 text-[13px] leading-6 ${
                    isUser
                      ? "ml-auto max-w-[78%] text-white"
                      : "max-w-[88%] whitespace-pre-line border border-[#eadcc5]/80 bg-white/78 text-[#1C1410]"
                  }`}
                  style={{
                    borderRadius: isUser ? 18 : 16,
                    background: isUser ? "rgba(0,98,79,0.94)" : undefined,
                  }}
                >
                  {message.content}
                </div>
              );
            })}

            {loading && (
              <div
                className="inline-flex max-w-[88%] items-center gap-2 rounded-2xl border border-[#eadcc5]/80 bg-white/78 px-4 py-3 text-[13px] text-[#1C1410]/70"
                style={{ borderRadius: 16 }}
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#00624f]" />
                FASTHelp đang trả lời...
              </div>
            )}
          </div>

          <form
            className="shrink-0 border-t border-[#eadcc5]/80 bg-white/50 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex items-center gap-2 rounded-full border border-[#d8cdb5] bg-white px-3 py-2 shadow-sm">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Hỏi về outfit, cọc, showroom, giao nhận..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1C1410] placeholder:text-[#1C1410]/42 outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00624f] text-white transition hover:bg-[#074d40] disabled:cursor-not-allowed disabled:opacity-50"
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
