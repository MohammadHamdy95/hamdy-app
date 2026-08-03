import Link from "next/link";
import resume from "../../data/resume.json";
import apps from "../../data/apps.json";

const SKILLS: Array<{ group: string; items: string }> = [
  { group: "Languages", items: "Java · TypeScript · SQL" },
  { group: "Backend", items: "Spring Boot · REST APIs · OpenAPI (contract-first design)" },
  { group: "Cloud & infra", items: "AWS · Terraform · Docker · CI/CD · Cloudflare" },
  { group: "Databases", items: "DynamoDB · Cassandra" },
  { group: "Engineering", items: "Distributed systems · system design · API performance · service migrations · integration testing" },
];

/** Classic serif theme: print-résumé feel, structured for a 10-second read. */
export function SerifHome() {
  const { github, linkedin, email, resume: cv } = resume.contact;
  return (
    <>
      <nav className="site-nav" aria-label="Main">
        <a className="nav-name" href="#top">
          {resume.name}
        </a>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
          <a className="nav-resume" href={cv.url}>
            Résumé
          </a>
        </div>
      </nav>

      <div className="page" id="top">
        <header className="hero">
          <h1>Backend engineer building reliable systems at scale</h1>
          <p className="hero-name">
            {resume.name} · Columbus, Ohio
          </p>
          <p className="hero-desc">
            Backend engineer with 4 years of experience building Java, Spring,
            and AWS systems at Amazon and JPMorgan Chase. My work has supported
            APIs processing tens of millions of monthly requests, reduced
            latency, and delivered measurable revenue and operational
            improvements.
          </p>
          <div className="hero-ctas">
            <a className="cta cta-primary" href="#experience">
              View Experience
            </a>
            <a className="cta" href="#projects">
              View Projects
            </a>
            <a className="cta" href={cv.url}>
              Download Résumé
            </a>
          </div>
        </header>

        <hr className="orn" />

        <section id="experience">
          <h2>Experience</h2>
          {resume.experience.map((xp) => (
            <div className="entry" key={xp.company}>
              <div className="top">
                <h3>
                  {xp.title} · <span className="co">{xp.company}</span>
                </h3>
                <span className="date">{xp.date}</span>
              </div>
              <ul>
                {xp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="orn" />

        <section id="projects">
          <h2>Selected Projects</h2>
          <div className="proj-cards">
            {apps.map((app) => (
              <article className="proj-card" key={app.bin}>
                <h3>{app.bin}</h3>
                <p className="proj-desc">{app.desc}</p>
                <p className="proj-focus">{app.focus}</p>
                <ul className="tags" aria-label="Technologies">
                  {app.tags.map((t) => (
                    <li className="tag" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="proj-links">
                  {app.url && <a href={app.url}>Live app →</a>}
                  {app.github && <a href={app.github}>GitHub →</a>}
                  <Link href={`/projects/${app.slug}`}>Architecture &amp; design →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className="orn" />

        <section id="about">
          <h2>About</h2>
          <p className="about-text">
            I&apos;m a backend engineer focused on distributed systems, API
            performance, and cloud infrastructure. At Amazon and JPMorgan
            Chase, I&apos;ve worked on high-scale systems supporting millions
            of customers and tens of millions of monthly requests. Outside of
            work, I build practical backend projects and document their
            architecture to explore databases, reliability, and system design.
          </p>
        </section>

        <hr className="orn" />

        <section id="skills">
          <h2>Core Skills</h2>
          <ul className="stack-list">
            {SKILLS.map((s) => (
              <li key={s.group}>
                <span className="what">{s.group}</span>
                <span>{s.items}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="orn" />

        <section id="education">
          <h2>Education</h2>
          {resume.education.map((e) => (
            <div className="edu" key={e.school}>
              <div>
                <strong>{e.school}</strong> · <span className="detail">{e.detail}</span>
              </div>
              <span className="date">{e.date}</span>
            </div>
          ))}
        </section>

        <hr className="orn" />

        <section id="contact">
          <h2>Contact</h2>
          <nav className="links contact-links" aria-label="Contact links">
            <a href={github.url}>GitHub</a>
            <a href={linkedin.url}>LinkedIn</a>
            <a href={email.url}>{email.label}</a>
            <a href={cv.url}>Résumé (PDF)</a>
          </nav>
        </section>

        <footer className="colophon">MOHAMMAD HAMDY · COLUMBUS, OHIO</footer>
      </div>
    </>
  );
}
