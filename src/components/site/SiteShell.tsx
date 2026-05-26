import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FastHelp } from "./FastHelp";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <div className="site-bg" aria-hidden />
      <div className="site-bg-overlay" aria-hidden />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <FastHelp />
      <Toaster position="top-center" />
    </div>
  );
}
