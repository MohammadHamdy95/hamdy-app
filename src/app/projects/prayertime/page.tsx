import type { Metadata } from "next";
import { Node, ProjectPage, arrow, smallLabel } from "../../../themes/serif/ProjectPage";

export const metadata: Metadata = {
  title: "prayertime — architecture",
  description:
    "Architecture of prayertime: a self-rescheduling adhan system that rewrites its own crontab every morning, built with Spring Boot.",
};

function PrayertimeDiagram() {
  return (
    <svg viewBox="0 0 720 255" width={720} role="img" aria-label="Architecture diagram">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#8a8071" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* outside world */}
      <Node x={8} y={40} w={160} h={52} lines={["AlAdhan API", "public prayer times"]} />

      {/* home server boundary */}
      <rect x={230} y={10} width={482} height={230} fill="none" stroke="#c9c1b2" strokeWidth={1} strokeDasharray="5 5" rx={6} />
      <text x={240} y={232} {...smallLabel} textAnchor="start" fontStyle="italic">home server</text>

      <Node x={270} y={40} w={180} h={52} lines={["prayertime", "Spring Boot · Java 21"]} />
      <Node x={520} y={40} w={170} h={52} lines={["daily schedule email", "Jakarta Mail"]} />
      <Node x={270} y={150} w={170} h={52} lines={["system crontab", "10 jobs · adhan + iqamah"]} />
      <Node x={520} y={150} w={170} h={52} lines={["speakers", "adhan · Fajr variant"]} />

      {/* app fetches times */}
      <line x1={268} y1={66} x2={170} y2={66} {...arrow} />
      <text x={219} y={58} {...smallLabel}>fetches today&apos;s times</text>

      {/* app emails */}
      <line x1={452} y1={66} x2={518} y2={66} {...arrow} />

      {/* app writes crontab */}
      <line x1={390} y1={94} x2={390} y2={148} {...arrow} />
      <text x={400} y={124} {...smallLabel} textAnchor="start">writes the day&apos;s jobs</text>

      {/* crontab re-runs the app */}
      <line x1={330} y1={148} x2={330} y2={96} {...arrow} />
      <text x={322} y={118} {...smallLabel} textAnchor="end">last job re-runs</text>
      <text x={322} y={132} {...smallLabel} textAnchor="end">the app next morning</text>

      {/* crontab plays audio */}
      <line x1={442} y1={176} x2={518} y2={176} {...arrow} />
      <text x={480} y={168} {...smallLabel}>at each prayer</text>
    </svg>
  );
}

export default function PrayertimeArchitecture() {
  return (
    <ProjectPage
      name="prayertime"
      tagline="A self-rescheduling adhan system — the call to prayer, automated end to end."
      liveUrl="https://github.com/MohammadHamdy95/prayertime"
      visitLabel="view on GitHub →"
      overview={
        <>
          <p>
            Every morning, this app fetches the day&apos;s Islamic prayer times
            for its configured city, layers on iqamah times at per-prayer
            offsets, and installs a fresh crontab — ten jobs, adhan and iqamah
            for each of the five prayers. When one fires, the server plays the
            adhan through the house speakers, with a distinct recording for
            Fajr. A summary of the day&apos;s schedule lands in my inbox.
          </p>
          <p>
            The interesting constraint is that prayer times drift a little
            every day, so a static schedule can never be right. The solution:
            the last cron entry the app writes is the one that re-runs the app
            itself the next morning. The schedule regenerates in perpetuity —
            it has run unattended on the same home server that hosts this
            site, no dashboard, no maintenance.
          </p>
        </>
      }
      diagram={<PrayertimeDiagram />}
      diagramCaption="A program whose output is its own next execution: each generated crontab ends with the entry that re-runs the generator the following morning."
      stack={[
        { what: "runtime", detail: "Java 21 · Spring Boot · Lombok" },
        { what: "scheduling", detail: "system crontab, rewritten daily — the app schedules its own next run" },
        { what: "data", detail: "AlAdhan public API via OkHttp + Gson · Joda-Time for the date math" },
        { what: "email", detail: "Jakarta Mail — the day's schedule, delivered every morning" },
        { what: "testing", detail: "JUnit 5 · Mockito" },
      ]}
      repos={[
        { what: "source", label: "MohammadHamdy95/prayertime", url: "https://github.com/MohammadHamdy95/prayertime" },
      ]}
    />
  );
}
