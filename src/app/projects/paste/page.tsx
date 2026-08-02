import type { Metadata } from "next";
import { FlowDiagram, ProjectPage } from "../../../themes/serif/ProjectPage";

export const metadata: Metadata = {
  title: "paste.hamdy.app — architecture",
  description:
    "Architecture and design of paste.hamdy.app, an anonymous pastebin built on Spring Boot and Cassandra.",
};

export default function PasteArchitecture() {
  return (
    <ProjectPage
      name="paste.hamdy.app"
      tagline="An anonymous pastebin — share text or code, optionally burn after reading."
      liveUrl="https://paste.hamdy.app"
      overview={
        <>
          <p>
            Create a paste, get a link, share it — that&apos;s the whole
            product. No accounts, no history, no tracking. Pastes get a
            10-character base62 id (~8 × 10¹⁷ combinations), can expire on a
            timer, and support burn-after-reading: the first view deletes the
            paste atomically.
          </p>
          <p>
            Storage is Apache Cassandra, self-managed in a container on the
            same server — chosen over a managed database for the operational
            learning that comes with running it: schema design around
            partition keys, TTL-based expiry, and backup scripts. The UI and
            API share one origin; Caddy routes <code>/v1/*</code> to the
            backend, so there is no CORS surface at all.
          </p>
        </>
      }
      diagram={
        <FlowDiagram
          uiLines={["React SPA", "(static, Caddy)"]}
          uiRoute="/ · /:id"
          apiLines={["Spring Boot API", "(Java 25)"]}
          apiRoute="/v1/*"
          storeLines={["Cassandra 5", "pastes keyspace"]}
          storeNote="same host"
          storeOnServer={true}
        />
      }
      diagramCaption="No inbound ports on the server: cloudflared dials out to Cloudflare, and all traffic rides that tunnel. Everything — UI, API, and Cassandra — runs in one Docker Compose stack."
      stack={[
        { what: "backend", detail: "Java 25 · Spring Boot · Spring Data Cassandra" },
        { what: "frontend", detail: "React · TypeScript · Vite · highlight.js for syntax highlighting" },
        { what: "storage", detail: "Cassandra 5 — pastes keyed by id, row-level TTL for expiry, nightly snapshots" },
        { what: "infra", detail: "Docker Compose · Caddy · Cloudflare Tunnel · Terraform (Cloudflare)" },
        { what: "testing", detail: "Testcontainers integration tests against a real Cassandra 5 container" },
      ]}
      endpoints={[
        { method: "POST", path: "/v1/pastes", what: "Create a paste (anonymous)" },
        { method: "GET", path: "/v1/pastes/{id}", what: "Fetch a paste (burn-after-reading deletes on first view)" },
        { method: "GET", path: "/v1/pastes/{id}/raw", what: "Raw plain-text content" },
        { method: "GET", path: "/v1/health", what: "Liveness probe" },
      ]}
      contractUrl="https://github.com/MohammadHamdy95/paste-backend/blob/main/api/openapi.yaml"
      repos={[
        { what: "backend", label: "MohammadHamdy95/paste-backend", url: "https://github.com/MohammadHamdy95/paste-backend" },
        { what: "frontend", label: "MohammadHamdy95/paste-frontend", url: "https://github.com/MohammadHamdy95/paste-frontend" },
        { what: "infra", label: "MohammadHamdy95/hamdy-infra", url: "https://github.com/MohammadHamdy95/hamdy-infra" },
      ]}
    />
  );
}
