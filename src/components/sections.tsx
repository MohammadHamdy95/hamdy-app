import resume from "../data/resume.json";

/**
 * Pure presentational section blocks, rendered from the data layer.
 * They are server-renderable: the full content is in the exported HTML
 * (SEO, no-JS) and the Terminal client only reveals them in sequence.
 */

export function Whoami() {
  return (
    <div className="block">
      <h1 className="whoami-name">{resume.name}</h1>
      <p className="whoami-role">{resume.role}</p>
      <p className="whoami-loc"># {resume.tagline}</p>
    </div>
  );
}

export function Experience() {
  return (
    <div className="block">
      {resume.experience.map((xp) => (
        <div className="xp" key={xp.company}>
          <div className="xp-head">
            {xp.title} <span className="at">@ {xp.company}</span>
            {xp.current && <span className="now-tag">● now</span>}
          </div>
          <div className="xp-date">{xp.date}</div>
          <ul>
            {xp.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="edu">
        {resume.education.map((e) => (
          <div key={e.school}>
            # {e.date} — <span>{e.school}</span>, {e.detail}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const { github, linkedin, email, resume: cv } = resume.contact;
  const rows: Array<[string, { label: string; url: string }]> = [
    ["github  ", github],
    ["linkedin", linkedin],
    ["email   ", email],
    ["resume  ", cv],
  ];
  return (
    <div className="block">
      {rows.map(([key, value]) => (
        <div className="contact-line" key={key}>
          {key} → <a href={value.url}>{value.label}</a>
        </div>
      ))}
    </div>
  );
}
