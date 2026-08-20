import type { Metadata } from "next";
import { FlowDiagram, ProjectPage } from "../../../themes/serif/ProjectPage";

export const metadata: Metadata = {
  title: "spec.hamdy.app — architecture",
  description:
    "Architecture and design of spec.hamdy.app, an OpenAPI and Swagger document host built on Spring Boot and Cassandra.",
};

export default function SpecArchitecture() {
  return (
    <ProjectPage
      name="spec.hamdy.app"
      tagline="Paste an OpenAPI or Swagger document, get a rendered link you can share."
      liveUrl="https://spec.hamdy.app"
      overview={
        <>
          <p>
            Paste a spec as JSON or YAML — the format is detected, not
            declared — and it comes back as browsable reference documentation
            at a 10-character link. Three dialects are accepted: Swagger 2.0,
            OpenAPI 3.0 and OpenAPI 3.1. A document that isn&apos;t a valid
            spec is rejected with the parser&apos;s reasons rather than
            rendered as junk.
          </p>
          <p>
            What separates this from a pastebin is that specs move. Creating
            one returns a secret edit token, shown exactly once; every later
            revision presents that token, and the share link never changes.
            Old versions stay reachable, so a link sent last month still shows
            what its sender meant — and any two versions can be compared with
            a <em>semantic diff</em>{" "}
            that classifies each change as compatible or breaking. That last part is a library, not a build: comparing
            parsed API models rather than text is what makes &ldquo;you
            removed an endpoint&rdquo; a statement the service can actually
            make.
          </p>
        </>
      }
      diagram={
        <FlowDiagram
          uiLines={["React SPA", "(static, Caddy)"]}
          uiRoute="/ · /:id"
          apiLines={["Spring Boot API", "(Java 23)"]}
          apiRoute="/v1/*"
          storeLines={["Cassandra 5", "spec keyspace"]}
          storeNote="shared node"
          storeOnServer={true}
        />
      }
      diagramCaption="The same shape as paste, and deliberately the same Cassandra node — under its own keyspace, so the two apps share an operational burden without sharing a schema. No inbound ports: cloudflared dials out to Cloudflare and all traffic rides that tunnel."
      stack={[
        { what: "backend", detail: "Java 23 · Spring Boot 4 · Spring Data Cassandra" },
        { what: "parsing", detail: "swagger-parser — validates Swagger 2.0, OpenAPI 3.0 and 3.1, and reports where a document is wrong rather than just that it is" },
        { what: "diffing", detail: "openapi-diff — semantic comparison of parsed models, each change classified compatible or breaking" },
        { what: "frontend", detail: "React 19 · TypeScript · Vite · two renderers (Scalar and Swagger UI), both lazy-loaded so the editor doesn't pay for panes you haven't opened" },
        { what: "storage", detail: "Cassandra 5 — versions clustered newest-first under the spec id, row-level TTL for optional expiry" },
        { what: "infra", detail: "Docker Compose · Caddy · Cloudflare Tunnel · Terraform (Cloudflare)" },
      ]}
      apiNote={
        <>
          The contract is{" "}
          <a href="https://spec.hamdy.app/7ljE0iyP5y" style={{ color: "var(--accent)" }}>
            published on the service it describes
          </a>{" "}
          (
          <a
            href="https://github.com/MohammadHamdy95/spec-backend/blob/main/api/openapi.yaml"
            style={{ color: "var(--accent)" }}
          >
            source
          </a>
          ) — which doubles as the cheapest end-to-end test available: if it
          parses, renders in both viewers and diffs cleanly against the
          previous revision, the pipeline works. Unlike tiny and paste it was
          written from the implementation rather than before it.
          <br />
          <br />
          Served same-origin under <code>/v1/*</code>, so there is no CORS
          surface — and not on a two-level subdomain, which Cloudflare&apos;s
          free Universal SSL does not cover. Publishing is anonymous; editing
          is not. External references are never resolved at parse time, so a
          hostile <code>$ref</code> cannot make the server fetch a URL of its
          choosing. Errors follow RFC 9457 Problem Details.
        </>
      }
      endpoints={[
        { method: "POST", path: "/v1/specs", what: "Publish a spec — returns the share link and the one-time edit token" },
        { method: "PUT", path: "/v1/specs/{id}", what: "Publish a revision (requires X-Edit-Token)" },
        { method: "GET", path: "/v1/specs/{id}", what: "Latest version, with title, dialect and operation count" },
        { method: "GET", path: "/v1/specs/{id}/versions", what: "Version history, newest first" },
        { method: "GET", path: "/v1/specs/{id}/diff", what: "Semantic diff between two versions, changes classified" },
        { method: "GET", path: "/v1/specs/{id}/json", what: "The document as JSON, whatever it arrived as" },
        { method: "GET", path: "/v1/specs/{id}/yaml", what: "The document as YAML, whatever it arrived as" },
      ]}
      repos={[
        { what: "backend", label: "MohammadHamdy95/spec-backend", url: "https://github.com/MohammadHamdy95/spec-backend" },
        { what: "frontend", label: "MohammadHamdy95/spec-frontend", url: "https://github.com/MohammadHamdy95/spec-frontend" },
        { what: "infra", label: "MohammadHamdy95/hamdy-infra", url: "https://github.com/MohammadHamdy95/hamdy-infra" },
      ]}
    />
  );
}
