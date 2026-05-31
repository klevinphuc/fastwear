import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  return (
    <SiteShell>
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[color:var(--cream)] px-4 py-20 text-center">
        <div className="max-w-5xl">
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Cảm ơn bạn đã tin chọn FASTWear, hẹn gặp lại bạn một ngày không xa.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Thanh toán thành công. Email xác nhận có thể đến chậm trong vài phút.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
