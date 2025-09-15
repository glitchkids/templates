import { input, select } from "@inquirer/prompts";
import degit from "degit";

//#region src/index.ts
(async () => {
	const templates = await fetch("https://raw.githubusercontent.com/glitchkids/templates/refs/heads/development/templates.json").then((res) => res.json()).then((r) => r);
	const template = await select({
		message: "Select template to import",
		choices: templates.map(({ name, url }) => ({
			name,
			value: url
		}))
	});
	if (await select({
		message: "Copy in current directory ?",
		choices: [{
			name: "Yes",
			value: true
		}, {
			name: "No",
			value: false
		}]
	})) {
		await degit(template).clone("./");
		process.exit(0);
	}
	const folderName = await input({ message: "Enter project name" });
	await degit(template).clone("./" + folderName);
	process.exit(0);
})();

//#endregion
export {  };