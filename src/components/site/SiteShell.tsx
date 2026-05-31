import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { FastHelp, type FastHelpPageContext } from "./FastHelp";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({
  children,
  fastHelpContext,
}: {
  children: React.ReactNode;
  fastHelpContext?: FastHelpPageContext;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="site-bg" aria-hidden />
      <div className="site-bg-overlay" aria-hidden />
      <AnnouncementBar />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <FastHelp pageContext={fastHelpContext} />
      <Toaster position="top-center" />
    </div>
  );
}
