import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { EXPLAINERS, relatedExplainers } from "@/data/explainers";
import { RelatedExplainers } from "@/components/RelatedExplainers";

const BASE = "https://conflictdash.lovable.app";
const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

// Shared wrapper for every /background/* explainer: breadcrumb trail above,
// related explainers + back-links below. Adds internal links between pages.
export const Route = createFileRoute("/background")({
  component: BackgroundLayout,
});

function BackgroundLayout() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");
  const current = EXPLAINERS.find((e) => e.to === path);
  const related = current ? relatedExplainers(current.tags, path, 6) : [];

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Dashboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Background explainers", item: `${BASE}/conflicts` },
      ...(current ? [{ "@type": "ListItem", position: 3, name: current.label, item: `${BASE}${path}` }] : []),
    ],
  };

  return (
    <div style={{ background: "#0a1017", fontFamily: FONT }}>
      <nav aria-label="Breadcrumb" style={{ maxWidth: 860, margin: "0 auto", padding: "16px 16px 0", fontSize: 11, color: "#8496a8" }}>
        <Link to="/" style={{ color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>Dashboard</Link>
        {" › "}
        <Link to="/conflicts" style={{ color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>Background explainers</Link>
        {current && <>{" › "}<span aria-current="page">{current.label}</span></>}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <Outlet />
      {related.length > 0 && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px 56px" }}>
          <RelatedExplainers items={related} />
          <p style={{ fontSize: 12, color: "#8496a8", marginTop: 16, lineHeight: 1.7 }}>
            Follow these stories day by day in the{" "}
            <Link to="/briefing" style={{ color: "#5b8ec8", fontWeight: 700 }}>daily briefing archive</Link>
            {" "}or see every active war on the{" "}
            <Link to="/conflicts" style={{ color: "#5b8ec8", fontWeight: 700 }}>all-conflicts page</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
