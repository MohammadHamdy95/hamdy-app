import { Terminal } from "../components/Terminal";
import { Contact, Experience, Whoami } from "../components/sections";

const COMMANDS = ["whoami", "cat experience.md", "contact --all"];

export default function Home() {
  return (
    <Terminal
      commands={COMMANDS}
      sections={[
        <Whoami key="whoami" />,
        <Experience key="xp" />,
        <Contact key="contact" />,
      ]}
    />
  );
}
