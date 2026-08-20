import type { Metadata } from "next";
import { FlowDiagram, ProjectPage } from "../../../themes/serif/ProjectPage";

export const metadata: Metadata = {
  title: "docs.hamdy.app — architecture",
  description:
    "Architecture and design of OpenShare, an anonymous service for publishing versioned OpenAPI documentation.",
};

export default function OpenShareArchitecture() {
  return (
    <ProjectPage
      name="docs.hamdy.app"
      tagline="Publish an OpenAPI contract as clean, unlisted, versioned documentation."
      liveUrl="https://docs.hamdy.app"
      overview={
        <>
          <p>
            OpenShare turns an OpenAPI 3.0 or 3.1 YAML/JSON document into a
            shareable API reference without requiring an account. Each update
            creates an immutable revision, so an existing revision link never
            changes silently. The publisher receives a separate management
            capability whose 256-bit secret is shown once and stored by the
            backend only as a SHA-256 hash.
          </p>
          <p>
            The service treats specifications as hostile input. It validates
            size and structure, warns about likely secrets, and rejects every
            external <code>$ref</code>. The backend
            never follows a URL supplied by a document, closing the SSRF path
            to private services and cloud metadata endpoints. API execution is
            deliberately disabled; this is a publishing service, not a request
            proxy.
          </p>
        </>
      }
      diagram={
        <FlowDiagram
          uiLines={["React + Scalar", "Monaco editor"]}
          uiRoute="/ · /d/:id"
          apiLines={["Spring Boot API", "validation + revisions"]}
          apiRoute="/api/v1/*"
          storeLines={["PostgreSQL 18", "documents + revisions"]}
          storeNote="same host"
          storeOnServer={true}
        />
      }
      diagramCaption="Cloudflare Tunnel carries requests to Caddy, which path-routes the static publishing interface and Spring Boot API. PostgreSQL is isolated on the Compose internal network and backed up nightly to the server's second disk."
      stack={[
        { what: "backend", detail: "Java 25 · Spring Boot 4.1 · Swagger Parser · Flyway" },
        { what: "frontend", detail: "React · TypeScript · Vite · Monaco · Scalar API Reference" },
        { what: "storage", detail: "PostgreSQL 18 — exact source, normalized content, immutable revisions, expiration metadata" },
        { what: "security", detail: "Unlisted random IDs · hashed management capabilities · no remote $ref fetching · no request proxy" },
        { what: "testing", detail: "Full lifecycle integration tests against PostgreSQL 18 with Testcontainers" },
        { what: "infra", detail: "Docker Compose · Caddy · Cloudflare Tunnel · Terraform-managed DNS · nightly pg_dump" },
      ]}
      endpoints={[
        { method: "POST", path: "/api/v1/validations", what: "Validate and scan a document without storing it" },
        { method: "POST", path: "/api/v1/documents", what: "Publish a new anonymous, unlisted document" },
        { method: "GET", path: "/api/v1/documents/{id}", what: "Read the latest published revision" },
        { method: "PUT", path: "/api/v1/documents/{id}", what: "Publish an immutable revision using the management key" },
        { method: "GET", path: "/api/v1/documents/{id}/revisions", what: "List revision history" },
        { method: "DELETE", path: "/api/v1/documents/{id}", what: "Permanently delete the document and all revisions" },
      ]}
      contractUrl="https://github.com/MohammadHamdy95/apidocs-backend/blob/main/api/openapi.yaml"
      repos={[
        { what: "backend", label: "MohammadHamdy95/apidocs-backend", url: "https://github.com/MohammadHamdy95/apidocs-backend" },
        { what: "frontend", label: "MohammadHamdy95/apidocs-frontend", url: "https://github.com/MohammadHamdy95/apidocs-frontend" },
        { what: "infra", label: "MohammadHamdy95/hamdy-infra", url: "https://github.com/MohammadHamdy95/hamdy-infra" },
      ]}
    />
  );
}
