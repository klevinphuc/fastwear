import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  component: () => (
    <SiteShell>
      <HomePage />
    </SiteShell>
  ),
});
