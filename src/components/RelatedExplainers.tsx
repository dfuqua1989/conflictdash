import { Link } from "@tanstack/react-router";
import type { Explainer } from "@/data/explainers";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export function RelatedExplainers({ items, title = "Related explainers" }: { items: Explainer[]; title?: string }) {
  if (!items.length) return null;
  return (
    <nav aria-label={title} style={{ fontFamily: FONT, marginTop: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 12px", color: "#cdd8e3" }}>{title}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 8 }}>
        {items.map((e) => (
          <li key={e.to}>
            <Link
              to={e.to}
              style={{
                display: "block",
                background: "#111a24",
                border: "1px solid rgba(120,150,180,0.20)",
                borderLeft: "3px solid #5b8ec8",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 12.5,
                fontWeight: 700,
                color: "#5b8ec8",
                textDecoration: "none",
              }}
            >
              {e.label} →
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
