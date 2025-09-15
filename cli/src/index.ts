import { select, input } from "@inquirer/prompts";
import degit from "degit";

type Templates = { name: string; url: string }[];

(async () => {
  const templates = await fetch(
    "https://raw.githubusercontent.com/glitchkids/templates/refs/heads/development/templates.json"
  )
    .then((res) => res.json())
    .then((r) => r as Templates);

  const template = await select({
    message: "Select template to import",
    choices: templates.map(({ name, url }) => ({
      name,
      value: url,
    })),
  });
  const toCurrentDirectory = await select({
    message: "Copy in current directory ?",
    choices: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  });

  if (toCurrentDirectory) {
    await degit(template).clone("./");
    process.exit(0);
  }

  const folderName = await input({ message: "Enter project name" });
  await degit(template).clone("./" + folderName);
  process.exit(0);
})();
