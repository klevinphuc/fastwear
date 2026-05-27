import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { HomePage } from "@/components/site/HomePage";

type IndexSearch = { tab?: string; view?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): IndexSearch => ({
    tab: typeof s.tab === "string" ? s.tab : undefined,
    view: typeof s.view === "string" ? s.view : undefined,
  }),
  component: IndexPage,
});

function IndexPage() {
  const { tab, view } = Route.useSearch();
  return (
    <SiteShell>
      <HomePage tab={tab ?? "gioi-thieu"} view={view} />
    </SiteShell>
  );
}
