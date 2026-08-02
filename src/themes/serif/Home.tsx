import Link from "next/link";
import resume from "../../data/resume.json";
import apps from "../../data/apps.json";

/** Classic serif theme: print-résumé masthead + rules, fully static. */
export function SerifHome() {
  const { github, linkedin, email, resume: cv } = resume.contact;
  return (
    <div className="page">
      <header className="masthead">
        <h1>{resume.name}</h1>
        <p className="role">Backend engineer — Java, Spring, AWS, distributed systems</p>
        <p className="where">Columbus, Ohio</p>
        <nav className="links">
          <a href={github.url}>GitHub</a>
          <a href={linkedin.url}>LinkedIn</a>
          <a href={email.url}>Email</a>
          <a href={cv.url}>Résumé (PDF)</a>
        </nav>
      </header>

      <hr className="orn" />

      <section>
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

      <section>
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

      <section>
        <h2>Projects</h2>
        <div className="apps">
          {apps.map((app) => (
            <div className="app" key={app.bin}>
              <div className="app-line">
                <a href={app.url}>{app.bin}</a>
                <span className="desc">{app.desc}</span>
              </div>
              <p className="arch-link">
                <Link href={`/projects/${app.slug}`}>architecture &amp; design →</Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="colophon">MOHAMMAD HAMDY · COLUMBUS, OHIO</footer>
    </div>
  );
}
