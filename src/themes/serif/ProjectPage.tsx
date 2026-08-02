import Link from "next/link";
import type { ReactNode } from "react";

export interface Endpoint {
  method: string;
  path: string;
  what: string;
}

export interface StackRow {
  what: string;
  detail: string;
}

export interface RepoLink {
  label: string;
  url: string;
  what: string;
}

/** Shared shell for the per-project architecture pages (serif theme). */
export function ProjectPage({
  name,
  tagline,
  liveUrl,
  overview,
  diagram,
  diagramCaption,
  stack,
  endpoints,
  repos,
  contractUrl,
}: {
  name: string;
  tagline: string;
  liveUrl: string;
  overview: ReactNode;
  diagram: ReactNode;
  diagramCaption: string;
  stack: StackRow[];
  endpoints: Endpoint[];
  repos: RepoLink[];
  contractUrl: string;
}) {
  return (
    <div className="proj-page">
      <nav className="crumbs">
        <Link href="/">Mohammad Hamdy</Link>
        <span className="sep">/</span>
        <span>projects</span>
        <span className="sep">/</span>
        <span>{name}</span>
      </nav>

      <header className="proj-head">
        <h1>{name}</h1>
        <p className="sub">{tagline}</p>
        <p className="visit">
          <a href={liveUrl}>visit {name} →</a>
        </p>
      </header>

      <hr className="orn" />

      <section>
        <h2>Overview</h2>
        {overview}
      </section>

      <hr className="orn" />

      <section>
        <h2>Architecture</h2>
        <div className="diagram">{diagram}</div>
        <p style={{ marginTop: 14, fontSize: 15, color: "var(--muted)", fontStyle: "italic" }}>
          {diagramCaption}
        </p>
      </section>

      <hr className="orn" />

      <section>
        <h2>Stack</h2>
        <ul className="stack-list">
          {stack.map((s) => (
            <li key={s.what}>
              <span className="what">{s.what}</span>
              <span>{s.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="orn" />

      <section>
        <h2>API</h2>
        <p style={{ marginBottom: 18 }}>
          Designed contract-first: an{" "}
          <a href={contractUrl} style={{ color: "var(--accent)" }}>
            OpenAPI 3.1 spec
          </a>{" "}
          is the source of truth, written and reviewed before any
          implementation. Anonymous by design — no auth, no accounts, no
          tracking. Errors follow RFC 9457 Problem Details.
        </p>
        <table className="endpoints">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((e) => (
              <tr key={e.method + e.path}>
                <td className="method">{e.method}</td>
                <td className="path">{e.path}</td>
                <td className="what-col">{e.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr className="orn" />

      <section>
        <h2>Source</h2>
        <ul className="stack-list">
          {repos.map((r) => (
            <li key={r.url}>
              <span className="what">{r.what}</span>
              <span>
                <a href={r.url} style={{ color: "var(--accent)" }}>
                  {r.label}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="colophon">MOHAMMAD HAMDY · COLUMBUS, OHIO</footer>
    </div>
  );
}

const box = {
  fill: "#ffffff",
  stroke: "#8a8071",
  strokeWidth: 1.2,
  rx: 3,
} as const;

const boxLabel = {
  fontFamily: "Charter, Georgia, serif",
  fontSize: 13.5,
  fill: "#1c1c1c",
  textAnchor: "middle",
} as const;

const smallLabel = {
  fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
  fontSize: 10.5,
  fill: "#948a7b",
  textAnchor: "middle",
} as const;

const arrow = { stroke: "#8a8071", strokeWidth: 1.2, markerEnd: "url(#arr)" } as const;

/** Node: a rect with one or two centered lines of text. */
function Node({ x, y, w, h, lines }: { x: number; y: number; w: number; h: number; lines: string[] }) {
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...box} />
      {lines.length === 1 ? (
        <text x={x + w / 2} y={cy + 4.5} {...boxLabel}>{lines[0]}</text>
      ) : (
        <>
          <text x={x + w / 2} y={cy - 3} {...boxLabel}>{lines[0]}</text>
          <text x={x + w / 2} y={cy + 13} {...boxLabel} fontSize={12} fill="#6b6255">{lines[1]}</text>
        </>
      )}
    </g>
  );
}

/**
 * Platform-flow diagram shared by both projects: edge → tunnel → Caddy,
 * fanning out to the app's SPA + API containers, API down to its datastore.
 * `storeOnServer` controls whether the datastore sits inside the dashed
 * home-server boundary (Cassandra) or outside it (DynamoDB in AWS).
 */
export function FlowDiagram({
  uiLines,
  uiRoute,
  apiLines,
  apiRoute,
  storeLines,
  storeNote,
  storeOnServer,
}: {
  uiLines: string[];
  uiRoute: string;
  apiLines: string[];
  apiRoute: string;
  storeLines: string[];
  storeNote: string;
  storeOnServer: boolean;
}) {
  const boundaryH = storeOnServer ? 310 : 220;
  const storeY = storeOnServer ? 244 : 252;
  return (
    <svg viewBox="0 0 720 345" width={720} role="img" aria-label="Architecture diagram">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#8a8071" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* top row: edge path */}
      <Node x={8} y={30} w={130} h={52} lines={["Visitor's", "browser"]} />
      <Node x={198} y={30} w={130} h={52} lines={["Cloudflare edge", "TLS · CDN · DNS"]} />
      <Node x={388} y={30} w={130} h={52} lines={["cloudflared", "tunnel"]} />
      <Node x={578} y={30} w={134} h={52} lines={["Caddy", "reverse proxy"]} />

      <line x1={138} y1={56} x2={196} y2={56} {...arrow} />
      <text x={167} y={48} {...smallLabel}>HTTPS</text>
      <line x1={328} y1={56} x2={386} y2={56} {...arrow} />
      <line x1={518} y1={56} x2={576} y2={56} {...arrow} />
      <text x={547} y={48} {...smallLabel}>outbound-only</text>

      {/* home server boundary */}
      <rect x={370} y={10} width={342} height={boundaryH} fill="none" stroke="#c9c1b2" strokeWidth={1} strokeDasharray="5 5" rx={6} />
      <text x={380} y={10 + boundaryH - 8} {...smallLabel} textAnchor="start" fontStyle="italic">
        home server · Docker Compose
      </text>

      {/* fan-out from Caddy */}
      <Node x={398} y={150} w={140} h={52} lines={uiLines} />
      <Node x={562} y={150} w={150} h={52} lines={apiLines} />

      <path d="M 620 84 Q 590 110 505 148" fill="none" {...arrow} />
      <text x={512} y={122} {...smallLabel}>{uiRoute}</text>
      <line x1={645} y1={84} x2={640} y2={148} {...arrow} />
      <text x={672} y={122} {...smallLabel}>{apiRoute}</text>

      {/* datastore */}
      <Node x={562} y={storeY} w={150} h={52} lines={storeLines} />
      <line x1={637} y1={204} x2={637} y2={storeY - 2} {...arrow} />
      <text x={676} y={storeY - 18} {...smallLabel}>{storeNote}</text>
    </svg>
  );
}
