import { Terminal } from "../components/Terminal";
import { Apps, Contact, Experience, Whoami } from "../components/sections";

const COMMANDS = [
  "whoami",
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
        <Experience key="xp" />,
        <Apps key="apps" />,
        <Contact key="contact" />,
      ]}
    />
  );
}
