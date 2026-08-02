# Terminal theme (retired, kept for switching back)

The original hamdy.app look: a macOS-style terminal window that "boots" by
typing commands and revealing each section, ending in a real interactive
prompt. Replaced by the classic-serif theme, but fully working.

To switch back:

1. `src/app/page.tsx` — render the terminal again:

   ```tsx
   import { Terminal } from "../themes/terminal/Terminal";
   import { Contact, Experience, Whoami } from "../themes/terminal/sections";

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
   ```

2. `src/app/layout.tsx` — swap the theme stylesheet import:

   ```tsx
   import "../themes/terminal/terminal.css"; // instead of ../themes/serif/serif.css
   ```

Both themes read from the same `src/data/resume.json` / `src/data/apps.json`,
so content changes apply to whichever theme is active. (The serif theme's
project architecture pages under `/projects/*` are theme-agnostic and can stay.)
