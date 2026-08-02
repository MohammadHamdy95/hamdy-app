import type { Metadata } from "next";
import { FlowDiagram, ProjectPage } from "../../../themes/serif/ProjectPage";

export const metadata: Metadata = {
  title: "s.hamdy.app — architecture",
  description:
    "Architecture and design of s.hamdy.app, an anonymous URL shortener built on Spring Boot and DynamoDB.",
};

export default function ShortenerArchitecture() {
  return (
    <ProjectPage
      name="s.hamdy.app"
      tagline="An anonymous URL shortener — paste a long link, share a short one."
      liveUrl="https://s.hamdy.app"
      overview={
        <>
          <p>
            Anyone can create a short link — no account, no tracking. The
            service generates an unguessable slug, stores the mapping, and
            302-redirects visitors while counting clicks atomically. Links
            expire after five years by default via DynamoDB&apos;s native TTL.
          </p>
          <p>
            The app is deliberately hybrid: the containers run on my own
            server, but storage is AWS DynamoDB — chosen to keep real-world
            AWS operations (IAM, Terraform, on-demand billing) in the picture.
            The backend talks to it through the AWS SDK&apos;s DynamoDB
            Enhanced Client, and the table, plus a narrowly-scoped IAM user
            that can touch only that table, are provisioned with Terraform.
          </p>
        </>
      }
      diagram={
        <FlowDiagram
          uiLines={["React SPA", "(static, Caddy)"]}
          uiRoute="/ · /assets"
          apiLines={["Spring Boot API", "(Java 25)"]}
          apiRoute="/api · /:slug"
          storeLines={["DynamoDB", "links table"]}
          storeNote="AWS · us-west-2"
          storeOnServer={false}
        />
      }
      diagramCaption="No inbound ports on the server: cloudflared dials out to Cloudflare, and all traffic rides that tunnel. Caddy routes by path — the SPA for the UI, the API for creation and redirects."
      stack={[
        { what: "backend", detail: "Java 25 · Spring Boot · AWS SDK v2 (DynamoDB Enhanced Client)" },
        { what: "frontend", detail: "React · TypeScript · Vite — recent links kept only in localStorage" },
        { what: "storage", detail: "DynamoDB on-demand, atomic click counters, native TTL expiry" },
        { what: "infra", detail: "Docker Compose · Caddy · Cloudflare Tunnel · Terraform (AWS + Cloudflare)" },
        { what: "testing", detail: "Testcontainers integration tests against real DynamoDB Local" },
      ]}
      endpoints={[
        { method: "POST", path: "/api/v1/links", what: "Create a short link (anonymous)" },
        { method: "GET", path: "/api/v1/links/{slug}", what: "Link details and click stats" },
        { method: "GET", path: "/{slug}", what: "302 redirect to the original URL" },
        { method: "GET", path: "/api/v1/health", what: "Liveness probe" },
      ]}
    />
  );
}
