import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { ChatBubble } from "./ChatBubble";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      {/* Fixed glass background layers */}
      <div className="glass-bg" aria-hidden />
      <div className="glass-orb orb-1" aria-hidden />
      <div className="glass-orb orb-2" aria-hidden />
      <div className="glass-orb orb-3" aria-hidden />
      <div className="glass-noise" aria-hidden />

      <AnnouncementBar />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <ChatBubble />
      <Toaster position="top-center" />
    </div>
  );
}
