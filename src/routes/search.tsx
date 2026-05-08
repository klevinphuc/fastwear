import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/lib/products";
import { ProductCard } from "./categories";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = q
    ? products.filter((p) => (p.name + p.designer + p.category).toLowerCase().includes(q.toLowerCase()))
    : products;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="font-serif text-4xl">Tìm kiếm</h1>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm đầm, suit, áo dài, designer…"
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">{results.length} kết quả</div>

        {results.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-card p-10 text-center">
            <h3 className="font-serif text-2xl">Không tìm thấy?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Thử "đầm dự tiệc", "suit", "áo dài Tết" hoặc xem gợi ý bên dưới.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
