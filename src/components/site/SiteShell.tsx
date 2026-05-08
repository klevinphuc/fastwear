import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { ChatBubble } from "./ChatBubble";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatBubble />
      <Toaster position="top-center" />
    </div>
  );
}
