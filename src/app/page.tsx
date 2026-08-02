import { Terminal } from "../components/Terminal";
import { Apps, Contact, Experience, Stats, Whoami } from "../components/sections";

const COMMANDS = [
  "whoami",
  "stats --career",
  "cat experience.md",
  "ls ~/apps",
  "contact --all",
];

export default function Home() {
  return (
    <Terminal
      commands={COMMANDS}
      sections={[
        <Whoami key="whoami" />,
        <Stats key="stats" />,
        <Experience key="xp" />,
        <Apps key="apps" />,
        <Contact key="contact" />,
      ]}
    />
  );
}
