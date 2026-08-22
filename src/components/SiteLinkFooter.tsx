import { Link } from "@tanstack/react-router";
import { BRIEFINGS } from "@/data/briefings";

const BACKGROUNDERS: { to: string; label: string }[] = [
  { to: "/ukraine-war-map", label: "Ukraine war map: where the frontline stands" },
  { to: "/background/strait-of-hormuz", label: "Strait of Hormuz: why it matters" },
  { to: "/background/world-war-3-risk", label: "How close are we to World War 3?" },
  { to: "/background/russian-casualties-ukraine", label: "Russian casualties in Ukraine" },
  { to: "/background/will-china-invade-taiwan", label: "Will China invade Taiwan?" },
  { to: "/background/nuclear-weapons-by-country", label: "Nuclear weapons by country" },
  { to: "/background/hezbollah-capabilities", label: "Hezbollah's capabilities" },
  { to: "/background/is-the-us-at-war", label: "Is the US at war?" },
  { to: "/background/why-sudan-is-at-war", label: "Why Sudan is at war" },
  { to: "/background/will-india-pakistan-go-to-war-again", label: "India vs Pakistan: next war?" },
  { to: "/background/pakistan-afghanistan-war-explained", label: "Pakistan–Afghanistan conflict" },
  { to: "/background/venezuela-cuba-crisis-explained", label: "US intervention in Venezuela and Cuba" },
  { to: "/background/is-the-gaza-ceasefire-holding", label: "Is the Gaza ceasefire holding?" },
  { to: "/background/us-china-great-power-rivalry-explained", label: "US-China military rivalry" },
  { to: "/background/drc-m23-conflict-explained", label: "The DRC-M23 conflict, explained" },
];

const linkStyle: React.CSSProperties = {
  color: "#9ad1ff",
  textDecoration: "none",
  fontSize: 13,
  lineHeight: 1.6,
};

const headingStyle: React.CSSProperties = {
  color: "#e6edf3",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  margin: "0 0 10px",
  fontWeight: 700,
};

function fmt(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function SiteLinkFooter() {
  const latest = BRIEFINGS.slice(0, 6);

  return (
    <nav
      id="site-link-footer"
      aria-label="Site sections"
      style={{
        background: "#07090d",
        borderTop: "1px solid #1b2430",
        padding: "28px 18px 40px",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
      }}
    >
      <style>
        {`body[data-active-view="theaters"] #site-link-footer,
body[data-active-view="deepdive"] #site-link-footer {
  display: none;
}`}
      </style>
      <div style={{ maxWidth: 1100, margin: "0 auto 24px" }}>
        <Link
          to="/ukraine-war-map"
          style={{
            display: "block",
            textDecoration: "none",
            background: "linear-gradient(180deg,#101a26,#0b1119)",
            border: "1px solid #24384d",
            borderLeft: "3px solid #ffb84d",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ffb84d",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Theater reference
          </span>
          <span style={{ display: "block", color: "#e6edf3", fontSize: 15, fontWeight: 700 }}>
            Ukraine War Map — where the frontline stands in 2026
          </span>
          <span
            style={{
              display: "block",
              color: "#9fb0c2",
              fontSize: 12.5,
              lineHeight: 1.6,
              marginTop: 6,
            }}
          >
            Axis-by-axis frontline read, how to interpret live war maps, and answers to the
            questions people actually ask about the war. →
          </span>
        </Link>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gap: 28,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <div>
          <h2 style={headingStyle}>Recent daily briefings</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {latest.map((b) => (
              <li key={b.date} style={{ marginBottom: 8 }}>
                <Link to="/briefing/$date" params={{ date: b.date }} style={linkStyle}>
                  {fmt(b.date)} — {b.title}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: 10 }}>
              <Link to="/briefing" style={{ ...linkStyle, color: "#ffb84d" }}>
                Browse the full briefing archive →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 style={headingStyle}>Background explainers</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {BACKGROUNDERS.map((b) => (
              <li key={b.to} style={{ marginBottom: 6 }}>
                <Link to={b.to} style={linkStyle}>
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={headingStyle}>Explore</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ marginBottom: 6 }}>
              <Link to="/conflicts" style={linkStyle}>
                All active conflicts hub
              </Link>
            </li>
            <li style={{ marginBottom: 6 }}>
              <a href="/feed.xml" style={linkStyle}>
                RSS feed of daily briefings
              </a>
            </li>
            <li style={{ marginBottom: 6 }}>
              <a href="/sitemap.xml" style={linkStyle}>
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
