"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import resume from "../../data/resume.json";
import apps from "../../data/apps.json";

const TYPE_MS = 34;
const PAUSE_MS = 260;

function Prompt() {
  return (
    <span className="prompt">
      <span className="user">mohammad</span>@hamdy.app{" "}
      <span className="path">~</span> $
    </span>
  );
}

/**
 * Orchestrates the boot sequence: types each command, then reveals the
 * (already-rendered) section below it. Skippable via the bar button or
 * the Esc key; prefers-reduced-motion skips automatically. Ends in a
 * real interactive prompt.
 */
export function Terminal({
  commands,
  sections,
}: {
  commands: string[];
  sections: ReactNode[];
}) {
  const [step, setStep] = useState(0); // sections fully revealed
  const [typed, setTyped] = useState(""); // current command progress
  const [done, setDone] = useState(false);
  const skipped = useRef(false);
  const doneRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.key === "Enter" && !doneRef.current)) skip();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Follow the boot output as it reveals.
  useEffect(() => {
    if (!skipped.current && step > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [step]);

  useEffect(() => {
    if (done || skipped.current || step >= commands.length) return;
    const cmd = commands[step];
    if (typed.length < cmd.length) {
      const t = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      setTyped("");
      if (next >= commands.length) {
        setDone(true);
        doneRef.current = true;
      }
    }, PAUSE_MS);
    return () => clearTimeout(t);
  }, [typed, step, done, commands]);

  function skip() {
    skipped.current = true;
    doneRef.current = true;
    setStep(commands.length);
    setTyped("");
    setDone(true);
  }

  return (
    <div className="term">
      <div className="term-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="term-title">mohammad@hamdy.app — zsh</span>
        <div className="bar-links">
          {apps.map((app) =>
            app.url ? (
              <a
                key={app.bin}
                className="bar-btn live"
                href={app.url}
                target="_blank"
                rel="noreferrer"
              >
                ● {app.bin}
              </a>
            ) : (
              <span key={app.bin} className="bar-btn disabled">
                ◌ {app.bin}
              </span>
            ),
          )}
          {!done && (
            <button className="bar-btn" onClick={skip}>
              skip ⏎
            </button>
          )}
        </div>
      </div>
      <div className="screen">
        {commands.map((cmd, i) => {
          if (i > step) {
            // Not reached yet: keep content in the DOM but hidden.
            return (
              <div className="section-hidden" key={cmd}>
                <div>
                  <Prompt /> <span className="cmd">{cmd}</span>
                </div>
                {sections[i]}
              </div>
            );
          }
          if (i === step && !done) {
            // Currently typing this command.
            return (
              <div key={cmd}>
                <div>
                  <Prompt /> <span className="cmd">{typed}</span>
                  <span className="cursor" />
                </div>
                <div className="section-hidden">{sections[i]}</div>
              </div>
            );
          }
          // Fully revealed.
          return (
            <div key={cmd}>
              <div>
                <Prompt /> <span className="cmd">{cmd}</span>
              </div>
              {sections[i]}
            </div>
          );
        })}
        {done && <InteractivePrompt />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

const HELP = `commands: help · whoami · stack · apps · open <app> · resume · uptime · coffee · clear`;

function runCommand(cmd: string): string | null {
  const [name, arg] = cmd.split(/\s+/);
  switch (name) {
    case "help":
      return HELP;
    case "whoami":
      return `${resume.name} — ${resume.experience[0].title} @ ${resume.experience[0].company}\n${resume.tagline}`;
    case "stack":
      return "java · spring boot · aws · dynamodb · cassandra · terraform · docker";
    case "apps":
      return apps
        .map((a) => `${a.bin.padEnd(17)}${a.desc.padEnd(50)}[${a.status}]`)
        .join("\n");
    case "open": {
      const app = apps.find((a) => a.bin.startsWith(arg ?? ""));
      if (arg && app?.url) {
        window.open(app.url, "_blank");
        return `opening ${app.bin}…`;
      }
      return `usage: open <s|paste> — e.g. \`open s\``;
    }
    case "resume":
      window.open("/resume.pdf", "_blank");
      return "opening resume.pdf…";
    case "uptime":
      return "this site runs on a machine in my house.\nuptime: surprisingly good.";
    case "coffee":
      return "☕ brewing... done. productivity +15% (measured, like the latency).";
    default:
      return `command not found: ${name} — try \`help\``;
  }
}

function InteractivePrompt() {
  const [history, setHistory] = useState<Array<{ cmd: string; out: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  function submit(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }
    const out = runCommand(trimmed);
    setHistory((h) => [...h, { cmd: trimmed, out: out ?? "" }]);
  }

  return (
    <div onClick={() => inputRef.current?.focus()}>
      {history.map(({ cmd, out }, i) => (
        <div className="out" key={i}>
          <span className="g">$ {cmd}</span>
          {"\n"}
          {out}
        </div>
      ))}
      <div className="shell-line">
        <Prompt />
        <input
          ref={inputRef}
          aria-label="terminal input — type help"
          autoComplete="off"
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="hintbar">
        <button className="chip" onClick={() => submit("help")}>help</button>
        <button className="chip" onClick={() => submit("open s")}>open s.hamdy.app</button>
        <button className="chip" onClick={() => submit("open paste")}>open paste.hamdy.app</button>
        <a className="chip" href="/resume.pdf">curl resume.pdf</a>
      </div>
      <div ref={endRef} />
    </div>
  );
}
