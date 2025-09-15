import { select, input } from "@inquirer/prompts";
import degit from "degit";



(async () => {
  const template = await select({
    message: "Select template to import",
    choices: [
      {
        name: "module-package",
        value: "modulePacakge",
      },
    ],
  });
  console.log(template);

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
    await degit("").clone('./')    
    process.exit(0);
  }

  const folderName = await input({ message: "Enter project name" });
})();
